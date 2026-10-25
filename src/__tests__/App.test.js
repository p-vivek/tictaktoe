import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  const playMoves = (indices) => {
    indices.forEach(index => {
      fireEvent.click(
        screen.getByRole('gridcell', {
          name: new RegExp(`Cell Row ${Math.floor(index / 3) + 1} Column ${(index % 3) + 1}`),
        })
      );
    });
  };

  const startTwoPlayerMode = () => {
    fireEvent.click(screen.getByRole('button', { name: /Two Player/ }));
  };

  it('renders the game and lets the user switch to two-player mode', () => {
    render(<App />);

    expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
    expect(screen.getByText('Score Tracker')).toBeInTheDocument();
    expect(screen.getByText('Move History')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Two Player/ }));

    expect(screen.getByText('PLAYER X')).toBeInTheDocument();
    expect(screen.getByText('PLAYER O')).toBeInTheDocument();
  });

  it('opens and closes the undo rules dialog', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Undo rules/ }));
    expect(screen.getByRole('heading', { name: 'Undo Rule Specs' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Got it' }));
    expect(screen.queryByRole('heading', { name: 'Undo Rule Specs' })).not.toBeInTheDocument();
  });

  it('shows an X victory and starts the next round', () => {
    render(<App />);
    startTwoPlayerMode();
    playMoves([0, 3, 1, 4, 2]);

    expect(screen.getByText('PLAYER X WINS!')).toBeInTheDocument();
    expect(screen.getByText(/Option A active/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next Round' }));

    expect(screen.queryByText('PLAYER X WINS!')).not.toBeInTheDocument();
    expect(screen.getByText('Match #2')).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: /Cell Row 1 Column 1 empty/ })).toBeInTheDocument();
  });

  it('shows an O victory and rolls it back under policy B', () => {
    render(<App />);
    startTwoPlayerMode();
    fireEvent.click(screen.getByRole('button', { name: /B: Rollback/ }));
    playMoves([0, 3, 1, 4, 8, 5]);

    expect(screen.getByText('PLAYER O WINS!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Rollback Win/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Rollback Win/ }));

    expect(screen.queryByText('PLAYER O WINS!')).not.toBeInTheDocument();
    expect(screen.getByText('X: 50%')).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: /Cell Row 2 Column 3 empty/ })).toBeInTheDocument();
  });

  it('shows a draw result after a full tied game', () => {
    render(<App />);
    startTwoPlayerMode();
    playMoves([0, 1, 2, 4, 3, 5, 7, 6, 8]);

    expect(screen.getByText('GAME DRAW! // STALEMATE')).toBeInTheDocument();
    expect(screen.getByText('STALEMATE')).toBeInTheDocument();
    expect(screen.getByText('Draws')).toBeInTheDocument();
  });

  it('asks for confirmation before changing mode after a move', () => {
    render(<App />);
    startTwoPlayerMode();
    playMoves([0]);
    fireEvent.click(screen.getByRole('button', { name: /vs Computer/ }));

    expect(screen.getByRole('heading', { name: 'Switch Game Mode?' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('heading', { name: 'Switch Game Mode?' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /vs Computer/ }));
    fireEvent.click(screen.getByRole('button', { name: /Confirm & Switch/ }));
    expect(screen.getByText('HUMAN (X)')).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: /Cell Row 1 Column 1 empty/ })).toBeInTheDocument();
  });
});
