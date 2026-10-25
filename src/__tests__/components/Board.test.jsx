import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../../components/TicTacToe/Board';

describe('Board Component', () => {
  const mockHandleCellClick = jest.fn();
  
  const defaultProps = {
    board: Array(9).fill(null),
    winningLine: null,
    winner: null,
    isGameOver: false,
    isAiThinking: false,
    mode: 'pvp',
    currentPlayer: 'X',
    handleCellClick: mockHandleCellClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a 9-cell grid', () => {
    render(<Board {...defaultProps} />);
    const cells = screen.getAllByRole('gridcell');
    expect(cells.length).toBe(9);
  });

  it('calls handleCellClick with the correct index when a cell is clicked', () => {
    render(<Board {...defaultProps} />);
    const cells = screen.getAllByRole('gridcell');
    
    fireEvent.click(cells[4]);
    expect(mockHandleCellClick).toHaveBeenCalledWith(4);
    expect(mockHandleCellClick).toHaveBeenCalledTimes(1);
  });

  it('labels cells with their coordinates and marks', () => {
    render(
      <Board
        {...defaultProps}
        board={['X', null, 'O', null, null, null, null, null, null]}
      />
    );

    expect(screen.getByRole('gridcell', { name: 'Cell Row 1 Column 1 marked with X' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'Cell Row 1 Column 2 empty' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'Cell Row 1 Column 3 marked with O' })).toBeInTheDocument();
  });

  it('disables interactions visually when game is over', () => {
    render(<Board {...defaultProps} isGameOver={true} />);
    const cells = screen.getAllByRole('gridcell');
    expect(cells[0]).toHaveClass('cursor-default');
  });

  it('shows the AI thinking status and disables cell hover styling', () => {
    render(<Board {...defaultProps} isAiThinking={true} />);

    expect(screen.getByText('Tactical AI analyzing 5-tier strategy...')).toBeInTheDocument();
    expect(screen.getAllByRole('gridcell')[0]).toHaveClass('cursor-default');
  });

  it('prevents moves during the computer turn in player-versus-computer mode', () => {
    render(<Board {...defaultProps} mode="pve" currentPlayer="O" />);

    expect(screen.getAllByRole('gridcell')[0]).toHaveClass('cursor-default');
  });

  it('highlights winning cells and renders the winning line', () => {
    render(
      <Board
        {...defaultProps}
        board={['X', 'X', 'X', null, null, null, null, null, null]}
        winningLine={[0, 1, 2]}
        winner="X"
        isGameOver={true}
      />
    );

    const cells = screen.getAllByRole('gridcell');
    expect(cells[0]).toHaveClass('scale-105');
    expect(cells[1]).toHaveClass('scale-105');
    expect(cells[2]).toHaveClass('scale-105');
    const winningLine = screen.getByRole('grid').parentElement.querySelectorAll(
      'svg[viewBox="0 0 390 390"] line'
    );
    expect(winningLine).toHaveLength(2);
  });
});