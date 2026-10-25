import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modals from '../../components/TicTacToe/Modals';

const defaultProps = {
  toast: { visible: false, msg: '', icon: '' },
  pendingMode: null,
  setPendingMode: jest.fn(),
  applyModeSwitch: jest.fn(),
  showSpecModal: false,
  setShowSpecModal: jest.fn(),
};

describe('Modals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a visible toast message', () => {
    render(
      <Modals
        {...defaultProps}
        toast={{ visible: true, msg: 'Round ready', icon: 'check_circle' }}
      />
    );

    expect(screen.getByText('Round ready')).toBeVisible();
  });

  it('lets the user cancel a pending mode switch', () => {
    render(<Modals {...defaultProps} pendingMode="pvp" />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(defaultProps.setPendingMode).toHaveBeenCalledWith(null);
    expect(defaultProps.applyModeSwitch).not.toHaveBeenCalled();
  });

  it('confirms a pending mode switch and clears the request', () => {
    render(<Modals {...defaultProps} pendingMode="pvp" />);

    fireEvent.click(screen.getByRole('button', { name: /Confirm & Switch/ }));

    expect(defaultProps.applyModeSwitch).toHaveBeenCalledWith('pvp');
    expect(defaultProps.setPendingMode).toHaveBeenCalledWith(null);
  });

  it('closes the undo specs modal from its close and acknowledgement buttons', () => {
    const { rerender } = render(
      <Modals {...defaultProps} showSpecModal />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Got it' }));
    expect(defaultProps.setShowSpecModal).toHaveBeenCalledWith(false);

    rerender(<Modals {...defaultProps} showSpecModal />);
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(defaultProps.setShowSpecModal).toHaveBeenCalledWith(false);
  });
});
