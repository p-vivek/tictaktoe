import React from 'react';
import { render, screen } from '@testing-library/react';
import MoveHistory from '../../components/TicTacToe/MoveHistory';

const defaultProps = {
  moveHistory: [],
  mode: 'pvp',
  isGameOver: false,
  winner: null,
  currentPlayer: 'X',
  isAiThinking: false,
};

describe('MoveHistory', () => {
  it('shows an empty state and the initial turn', () => {
    render(<MoveHistory {...defaultProps} />);

    expect(screen.getByText('Grid Untouched')).toBeInTheDocument();
    expect(screen.getByText('TURN: PLAYER X')).toBeInTheDocument();
    expect(screen.getByText('0 / 9')).toBeInTheDocument();
  });

  it('renders move coordinates and the computer turn status', () => {
    render(
      <MoveHistory
        {...defaultProps}
        mode="pve"
        currentPlayer="O"
        isAiThinking
        moveHistory={[
          { moveNumber: 1, player: 'X', row: 1, col: 1 },
          { moveNumber: 2, player: 'O', row: 2, col: 2 },
        ]}
      />
    );

    expect(screen.getByText('Row 1, Col 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2, Col 2')).toBeInTheDocument();
    expect(screen.getByText('AI CALCULATING...')).toBeInTheDocument();
    expect(screen.getByText('2 / 9')).toBeInTheDocument();
  });

  it.each([
    ['X', 'WINNER: X'],
    ['O', 'WINNER: O'],
    [null, 'STALEMATE'],
  ])('shows the completed round result for winner %s', (winner, result) => {
    render(
      <MoveHistory
        {...defaultProps}
        isGameOver
      winner={winner}
      />
    );

    expect(screen.getByText(result)).toBeInTheDocument();
  });
});
