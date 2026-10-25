import { useState, useEffect, useCallback, useRef } from 'react';
import { checkBoardWin, computeAiMove } from '../utils/gameLogic';

export const useTicTacToe = () => {
  const [mode, setMode] = useState('pve');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [matchCount, setMatchCount] = useState(1);
  const [moveHistory, setMoveHistory] = useState([]);
  const [lastRecordedResult, setLastRecordedResult] = useState(null);

  const [undoPolicy, setUndoPolicy] = useState('A'); 
  const [pendingMode, setPendingMode] = useState(null);
  
  const [toast, setToast] = useState({ visible: false, msg: '', icon: '' });
  const [showSpecModal, setShowSpecModal] = useState(false);

  const stateRef = useRef({ board, currentPlayer, isGameOver, isAiThinking, moveHistory, mode, pendingMode, showSpecModal });
  
  useEffect(() => {
    stateRef.current = { board, currentPlayer, isGameOver, isAiThinking, moveHistory, mode, pendingMode, showSpecModal };
  }, [board, currentPlayer, isGameOver, isAiThinking, moveHistory, mode, pendingMode, showSpecModal]);

  const showToast = (msg, icon = 'check_circle') => {
    setToast({ visible: true, msg, icon });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 1800);
  };

  const getDominance = () => {
    const total = scores.X + scores.O;
    if (total === 0) return { pctX: 50, pctO: 50 };
    const pctX = Math.round((scores.X / total) * 100);
    return { pctX, pctO: 100 - pctX };
  };

  const executeMove = useCallback((index, playerToMark) => {
    setBoard(prev => {
      const newBoard = [...prev];
      newBoard[index] = playerToMark;
      return newBoard;
    });

    setMoveHistory(prev => [...prev, {
      moveNumber: prev.length + 1,
      player: playerToMark,
      row: Math.floor(index / 3) + 1,
      col: (index % 3) + 1,
      index
    }]);
  }, []);

  const processEndOfTurn = useCallback((currentBoardState) => {
    const winCheck = checkBoardWin(currentBoardState);
    if (winCheck) {
      setIsGameOver(true);
      setWinner(winCheck.winner);
      setWinningLine(winCheck.line);
      setLastRecordedResult(winCheck.winner);
      setScores(s => ({ ...s, [winCheck.winner]: s[winCheck.winner] + 1 }));
      return true;
    }

    if (currentBoardState.every(cell => cell !== null)) {
      setIsGameOver(true);
      setWinner(null);
      setWinningLine(null);
      setLastRecordedResult('draw');
      setScores(s => ({ ...s, draws: s.draws + 1 }));
      return true;
    }
    return false;
  }, []);

  const handleCellClick = useCallback((index) => {
    if (board[index] || isGameOver || isAiThinking || (mode === 'pve' && currentPlayer !== 'X')) return;

    executeMove(index, currentPlayer);
    
    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;

    if (processEndOfTurn(nextBoard)) return;

    if (mode === 'pvp') {
      setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
    } else {
      setCurrentPlayer('O');
      setIsAiThinking(true);
    }
  }, [board, isGameOver, isAiThinking, mode, currentPlayer, executeMove, processEndOfTurn]);

  // AI Turn Effect
  useEffect(() => {
    if (mode === 'pve' && currentPlayer === 'O' && isAiThinking && !isGameOver) {
      const timer = setTimeout(() => {
        const aiIndex = computeAiMove(board);
        if (aiIndex !== null) {
          executeMove(aiIndex, 'O');
          const nextBoard = [...board];
          nextBoard[aiIndex] = 'O';
          
          if (!processEndOfTurn(nextBoard)) {
            setCurrentPlayer('X');
          }
        }
        setIsAiThinking(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, isAiThinking, mode, isGameOver, board, executeMove, processEndOfTurn]);

  const undoMove = useCallback(() => {
    if (isAiThinking || moveHistory.length === 0) return;
    
    if (isGameOver) {
      if (undoPolicy === 'A') return; 
      if (lastRecordedResult) {
        setScores(s => {
          const newScores = { ...s };
          if (lastRecordedResult === 'draw' && newScores.draws > 0) newScores.draws--;
          else if (newScores[lastRecordedResult] > 0) newScores[lastRecordedResult]--;
          return newScores;
        });
        setLastRecordedResult(null);
      }
      setIsGameOver(false);
      setWinner(null);
      setWinningLine(null);
      showToast('Win Rolled Back (-1 Score)', 'history');
    } else {
      showToast('Move Undone', 'undo');
    }

    if (mode === 'pvp') {
      const newHistory = [...moveHistory];
      const lastMove = newHistory.pop();
      setMoveHistory(newHistory);
      setBoard(prev => { const nb = [...prev]; nb[lastMove.index] = null; return nb; });
      setCurrentPlayer(lastMove.player);
    } else {
      const newHistory = [...moveHistory];
      const lastMove = newHistory[newHistory.length - 1];
      
      if (lastMove && lastMove.player === 'O') {
        const botMove = newHistory.pop();
        const humanMove = newHistory.pop();
        setBoard(prev => { 
          const nb = [...prev]; 
          if(botMove) nb[botMove.index] = null; 
          if(humanMove) nb[humanMove.index] = null; 
          return nb; 
        });
      } else if (lastMove && lastMove.player === 'X') {
        const humanMove = newHistory.pop();
        setBoard(prev => { const nb = [...prev]; nb[humanMove.index] = null; return nb; });
      }
      setMoveHistory(newHistory);
      setCurrentPlayer('X');
    }
  }, [isAiThinking, moveHistory, isGameOver, undoPolicy, lastRecordedResult, mode]);

  const resetGameNewRound = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsGameOver(false);
    setIsAiThinking(false);
    setWinner(null);
    setWinningLine(null);
    setMoveHistory([]);
    setLastRecordedResult(null);
    setMatchCount(c => c + 1);
    showToast(`Match #${matchCount + 1} Ready`, 'replay');
  }, [matchCount]);

  const clearScoreboard = useCallback(() => {
    setScores({ X: 0, O: 0, draws: 0 });
    setMatchCount(1);
    setLastRecordedResult(null);
    showToast('Scores Cleared', 'restart_alt');
  }, []);

  const applyModeSwitch = useCallback((newMode) => {
    setMode(newMode);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsGameOver(false);
    setIsAiThinking(false);
    setWinner(null);
    setWinningLine(null);
    setMoveHistory([]);
    setLastRecordedResult(null);
    setScores({ X: 0, O: 0, draws: 0 });
    setMatchCount(1);
    showToast(newMode === 'pve' ? 'Switched to vs Computer' : 'Switched to Two Player', 'swap_horiz');
  }, []);

  const handleModeRequest = (targetMode) => {
    if (mode === targetMode) return;
    if (moveHistory.length > 0 || scores.X > 0 || scores.O > 0 || scores.draws > 0 || matchCount > 1) {
      setPendingMode(targetMode);
    } else {
      applyModeSwitch(targetMode);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { pendingMode, showSpecModal, board, isGameOver, isAiThinking, currentPlayer, mode } = stateRef.current;
      
      if (pendingMode) {
        if (e.key === 'Escape') setPendingMode(null);
        if (e.key === 'Enter') { applyModeSwitch(pendingMode); setPendingMode(null); }
        return;
      }
      if (showSpecModal && e.key === 'Escape') {
        setShowSpecModal(false);
        return;
      }
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();
      if (key >= '1' && key <= '9') {
        const idx = parseInt(key, 10) - 1;
        if (!board[idx] && !isGameOver && !isAiThinking && !(mode === 'pve' && currentPlayer !== 'X')) {
          handleCellClick(idx);
        }
      } else if (key === 'r') resetGameNewRound();
      else if (key === 'u' || (key === 'z' && !e.shiftKey)) undoMove();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [applyModeSwitch, handleCellClick, resetGameNewRound, undoMove]);

  return {
    mode, setMode, board, currentPlayer, isGameOver, isAiThinking, 
    winner, winningLine, scores, matchCount, moveHistory, 
    undoPolicy, setUndoPolicy, pendingMode, setPendingMode,
    toast, showSpecModal, setShowSpecModal,
    handleCellClick, undoMove, resetGameNewRound, 
    clearScoreboard, handleModeRequest, applyModeSwitch,
    dom: getDominance(),
    isXTurn: currentPlayer === 'X',
    player1Label: mode === 'pve' ? "HUMAN (X)" : "PLAYER X",
    player2Label: mode === 'pve' ? "COMPUTER (O)" : "PLAYER O",
    p2Icon: mode === 'pve' ? 'smart_toy' : 'radio_button_unchecked',
    canUndo: !isAiThinking && moveHistory.length > 0 && !(isGameOver && undoPolicy === 'A')
  };
};