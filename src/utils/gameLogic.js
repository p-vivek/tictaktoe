import { WIN_COMBINATIONS } from '../constants/gameConstants';

export const checkBoardWin = (boardState) => {
  for (const combo of WIN_COMBINATIONS) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return { winner: boardState[a], line: combo };
    }
  }
  return null;
};

export const computeAiMove = (boardState) => {
  const emptyIndices = boardState.map((val, idx) => (val === null ? idx : null)).filter(v => v !== null);
  if (emptyIndices.length === 0) return null;

  for (const idx of emptyIndices) {
    const testBoard = [...boardState];
    testBoard[idx] = 'O';
    if (checkBoardWin(testBoard)?.winner === 'O') return idx;
  }

  for (const idx of emptyIndices) {
    const testBoard = [...boardState];
    testBoard[idx] = 'X';
    if (checkBoardWin(testBoard)?.winner === 'X') return idx;
  }

  if (boardState[4] === null) return 4;

  const openCorners = [0, 2, 6, 8].filter(idx => boardState[idx] === null);
  if (openCorners.length > 0) return openCorners[Math.floor(Math.random() * openCorners.length)];

  return emptyIndices[0];
};