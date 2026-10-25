import { renderHook, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { computeAiMove } from '../../utils/gameLogic';
import { useTicTacToe } from '../../hooks/useTicTacToe';

jest.mock('../../utils/gameLogic', () => ({
  ...jest.requireActual('../../utils/gameLogic'),
  computeAiMove: jest.fn(),
}));

describe('useTicTacToe Hook', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useTicTacToe());
    
    expect(result.current.mode).toBe('pve');
    expect(result.current.currentPlayer).toBe('X');
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.board.every(cell => cell === null)).toBe(true);
  });

  it('should handle a cell click and switch turns in pvp mode', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.applyModeSwitch('pvp');
    });

    act(() => {
      result.current.handleCellClick(0);
    });

    expect(result.current.board[0]).toBe('X');
    expect(result.current.currentPlayer).toBe('O');
    expect(result.current.moveHistory.length).toBe(1);
  });

  it('should reset the game for a new round', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.applyModeSwitch('pvp');
    });

    act(() => {
      result.current.handleCellClick(0);
    });

    expect(result.current.board[0]).toBe('X');

    act(() => {
      result.current.resetGameNewRound();
    });

    expect(result.current.board.every(cell => cell === null)).toBe(true);
    expect(result.current.currentPlayer).toBe('X');
    expect(result.current.matchCount).toBe(2);
  });

  it('should ignore a click on an already occupied cell', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.applyModeSwitch('pvp');
    });

    act(() => {
      result.current.handleCellClick(0);
    });

    act(() => {
      result.current.handleCellClick(0);
    });

    expect(result.current.board[0]).toBe('X');
    expect(result.current.moveHistory).toHaveLength(1);
    expect(result.current.currentPlayer).toBe('O');
  });

  it('should finish the round, record a winner, and increment their score', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.applyModeSwitch('pvp');
    });

    [0, 3, 1, 4, 2].forEach(index => {
      act(() => {
        result.current.handleCellClick(index);
      });
    });

    expect(result.current.isGameOver).toBe(true);
    expect(result.current.winner).toBe('X');
    expect(result.current.winningLine).toEqual([0, 1, 2]);
    expect(result.current.scores).toEqual({ X: 1, O: 0, draws: 0 });
  });

  it('should record a draw when all cells are filled without a winner', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.applyModeSwitch('pvp');
    });

    [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(index => {
      act(() => {
        result.current.handleCellClick(index);
      });
    });

    expect(result.current.isGameOver).toBe(true);
    expect(result.current.winner).toBeNull();
    expect(result.current.scores).toEqual({ X: 0, O: 0, draws: 1 });
  });

  it('should undo the last move and restore that players turn in two-player mode', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.applyModeSwitch('pvp');
    });

    act(() => {
      result.current.handleCellClick(0);
    });

    act(() => {
      result.current.handleCellClick(4);
    });

    act(() => {
      result.current.undoMove();
    });

    expect(result.current.board[4]).toBeNull();
    expect(result.current.board[0]).toBe('X');
    expect(result.current.moveHistory).toHaveLength(1);
    expect(result.current.currentPlayer).toBe('O');
  });

  it('should let the computer move and return the turn to the human', () => {
    jest.useFakeTimers();
    computeAiMove.mockReturnValue(4);
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.handleCellClick(0);
    });
    expect(result.current.isAiThinking).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.board[4]).toBe('O');
    expect(result.current.currentPlayer).toBe('X');
    expect(result.current.isAiThinking).toBe(false);
    expect(result.current.moveHistory).toHaveLength(2);
  });

  it('should end the round when the computer completes a winning line', () => {
    jest.useFakeTimers();
    [4, 2, 1, 0].forEach(index => computeAiMove.mockReturnValueOnce(index));
    const { result } = renderHook(() => useTicTacToe());

    [8, 7, 5, 3].forEach(index => {
      act(() => {
        result.current.handleCellClick(index);
      });
      act(() => {
        jest.advanceTimersByTime(300);
      });
    });

    expect(result.current.board.slice(0, 3)).toEqual(['O', 'O', 'O']);
    expect(result.current.winner).toBe('O');
    expect(result.current.scores.O).toBe(1);
    expect(result.current.isGameOver).toBe(true);
  });

  it('should ignore undo while the computer is thinking', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.handleCellClick(0);
    });
    act(() => {
      result.current.undoMove();
    });

    expect(result.current.board[0]).toBe('X');
    expect(result.current.moveHistory).toHaveLength(1);
    expect(result.current.currentPlayer).toBe('O');
    expect(result.current.isAiThinking).toBe(true);
  });

  it('should undo both the human and computer moves after the computer responds', () => {
    jest.useFakeTimers();
    computeAiMove.mockReturnValue(4);
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.handleCellClick(0);
    });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    act(() => {
      result.current.undoMove();
    });

    expect(result.current.board[0]).toBeNull();
    expect(result.current.board[4]).toBeNull();
    expect(result.current.moveHistory).toHaveLength(0);
    expect(result.current.currentPlayer).toBe('X');
  });

  it('should roll back a completed result and its score under policy B', () => {
    const { result } = renderHook(() => useTicTacToe());
    act(() => {
      result.current.applyModeSwitch('pvp');
      result.current.setUndoPolicy('B');
    });

    [0, 3, 1, 4, 2].forEach(index => {
      act(() => {
        result.current.handleCellClick(index);
      });
    });
    expect(result.current.scores.X).toBe(1);

    act(() => {
      result.current.undoMove();
    });

    expect(result.current.isGameOver).toBe(false);
    expect(result.current.winner).toBeNull();
    expect(result.current.board[2]).toBeNull();
    expect(result.current.scores.X).toBe(0);
  });

  it('should reset scores and match count when clearing the scoreboard', () => {
    const { result } = renderHook(() => useTicTacToe());
    act(() => {
      result.current.applyModeSwitch('pvp');
    });
    [0, 3, 1, 4, 2].forEach(index => {
      act(() => {
        result.current.handleCellClick(index);
      });
    });
    act(() => {
      result.current.resetGameNewRound();
      result.current.clearScoreboard();
    });

    expect(result.current.scores).toEqual({ X: 0, O: 0, draws: 0 });
    expect(result.current.matchCount).toBe(1);
    expect(result.current.dom).toEqual({ pctX: 50, pctO: 50 });
  });

  it('should request confirmation before switching modes after a move', () => {
    const { result } = renderHook(() => useTicTacToe());
    act(() => {
      result.current.applyModeSwitch('pvp');
    });
    act(() => {
      result.current.handleCellClick(0);
    });

    act(() => {
      result.current.handleModeRequest('pve');
    });
    expect(result.current.pendingMode).toBe('pve');

    act(() => {
      result.current.handleModeRequest('pvp');
    });
    expect(result.current.pendingMode).toBe('pve');

    act(() => {
      result.current.applyModeSwitch(result.current.pendingMode);
      result.current.setPendingMode(null);
    });
    expect(result.current.mode).toBe('pve');
    expect(result.current.pendingMode).toBeNull();
    expect(result.current.board.every(cell => cell === null)).toBe(true);
  });

  it('should use keyboard shortcuts while ignoring keystrokes from form fields', () => {
    const { result } = renderHook(() => useTicTacToe());
    const input = document.createElement('input');
    document.body.appendChild(input);
    act(() => {
      result.current.applyModeSwitch('pvp');
    });

    fireEvent.keyDown(input, { key: '1' });
    expect(result.current.moveHistory).toHaveLength(0);

    fireEvent.keyDown(document.body, { key: '1' });
    expect(result.current.board[0]).toBe('X');
    expect(result.current.moveHistory).toHaveLength(1);

    fireEvent.keyDown(document.body, { key: 'u' });
    expect(result.current.board[0]).toBeNull();
    expect(result.current.moveHistory).toHaveLength(0);

    fireEvent.keyDown(document.body, { key: 'r' });
    expect(result.current.matchCount).toBe(2);
    document.body.removeChild(input);
  });

  it('should confirm or cancel a pending mode switch with the keyboard', () => {
    const { result } = renderHook(() => useTicTacToe());
    act(() => {
      result.current.applyModeSwitch('pvp');
    });
    act(() => {
      result.current.handleCellClick(0);
    });
    act(() => {
      result.current.handleModeRequest('pve');
    });
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(result.current.pendingMode).toBeNull();

    act(() => {
      result.current.handleModeRequest('pve');
    });
    fireEvent.keyDown(document.body, { key: 'Enter' });
    expect(result.current.mode).toBe('pve');
    expect(result.current.pendingMode).toBeNull();
  });

  it('should dismiss the undo rules dialog with Escape', () => {
    const { result } = renderHook(() => useTicTacToe());
    act(() => {
      result.current.setShowSpecModal(true);
    });

    fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(result.current.showSpecModal).toBe(false);
  });
});