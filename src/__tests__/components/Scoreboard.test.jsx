import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from '../../components/TicTacToe/Scoreboard';

const defaultProps = {
  matchCount: 3,
  mode: 'pve',
  p2Icon: 'smart_toy',
  scores: { X: 2, O: 1, draws: 4 },
  dom: { pctX: 67, pctO: 33 },
  resetGameNewRound: jest.fn(),
  undoMove: jest.fn(),
  canUndo: true,
  clearScoreboard: jest.fn(),
  undoPolicy: 'A',
};

describe('Scoreboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays scores, win ratio, and player labels for computer mode', () => {
    render(<Scoreboard {...defaultProps} />);

    expect(screen.getByText('Match #3')).toBeInTheDocument();
    expect(screen.getByText('Human (X)')).toBeInTheDocument();
    expect(screen.getByText('Bot (O)')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('X: 67%')).toBeInTheDocument();
    expect(screen.getByText('O: 33%')).toBeInTheDocument();
  });

  it('shows two-player labels and rollback policy', () => {
    render(<Scoreboard {...defaultProps} mode="pvp" undoPolicy="B" />);

    expect(screen.getByText('P1 (X)')).toBeInTheDocument();
    expect(screen.getByText('P2 (O)')).toBeInTheDocument();
    expect(screen.getByText('Policy: Opt B')).toBeInTheDocument();
  });

  it('calls round controls and disables undo when unavailable', () => {
    render(<Scoreboard {...defaultProps} canUndo={false} />);

    fireEvent.click(screen.getByRole('button', { name: /Reset Game/ }));
    fireEvent.click(screen.getByRole('button', { name: /Clear Scoreboard/ }));

    expect(defaultProps.resetGameNewRound).toHaveBeenCalledTimes(1);
    expect(defaultProps.clearScoreboard).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /Undo Move/ })).toBeDisabled();
  });

  it('calls undo when it is enabled', () => {
    render(<Scoreboard {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Undo Move/ }));

    expect(defaultProps.undoMove).toHaveBeenCalledTimes(1);
  });
});
