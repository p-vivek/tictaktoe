import { checkBoardWin, computeAiMove } from '../../utils/gameLogic';

describe('Game Logic: checkBoardWin', () => {
  it('should return null for an empty board', () => {
    const board = Array(9).fill(null);
    expect(checkBoardWin(board)).toBeNull();
  });

  it('should detect a horizontal win for X', () => {
    const board = ['X', 'X', 'X', null, 'O', null, 'O', null, null];
    expect(checkBoardWin(board)).toEqual({ winner: 'X', line: [0, 1, 2] });
  });

  it('should detect a diagonal win for O', () => {
    const board = ['O', 'X', null, 'X', 'O', null, null, null, 'O'];
    expect(checkBoardWin(board)).toEqual({ winner: 'O', line: [0, 4, 8] });
  });

  it.each([
    [[0, 1, 2]],
    [[3, 4, 5]],
    [[6, 7, 8]],
    [[0, 3, 6]],
    [[1, 4, 7]],
    [[2, 5, 8]],
    [[0, 4, 8]],
    [[2, 4, 6]],
  ])('detects a winning line at indices %p', (line) => {
    const board = Array(9).fill(null);
    line.forEach(index => { board[index] = 'O'; });

    expect(checkBoardWin(board)).toEqual({ winner: 'O', line });
  });

  it('returns null when marks do not form a winning line', () => {
    const board = ['X', 'O', 'X', 'X', 'O', null, 'O', 'X', null];
    expect(checkBoardWin(board)).toBeNull();
  });
});

describe('Game Logic: computeAiMove', () => {
  it('Tier 1: should pick the winning move if available', () => {
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null];
    expect(computeAiMove(board)).toBe(2);
  });

  it('Tier 2: should block the opponent from winning', () => {
    const board = ['X', null, null, null, 'X', null, null, 'O', null];
    expect(computeAiMove(board)).toBe(8);
  });

  it('Tier 3: should take the center if available and no immediate threats/wins exist', () => {
    const board = ['X', null, null, null, null, null, null, null, null];
    expect(computeAiMove(board)).toBe(4);
  });

  it('should select an available corner when the center is occupied', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.99);
    const board = [null, null, null, null, 'X', null, null, null, null];

    try {
      expect(computeAiMove(board)).toBe(8);
    } finally {
      randomSpy.mockRestore();
    }
  });

  it('should return null when the board is full', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(computeAiMove(board)).toBeNull();
  });

  it('should not mutate the board while choosing a move', () => {
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null];
    const originalBoard = [...board];

    computeAiMove(board);

    expect(board).toEqual(originalBoard);
  });
});