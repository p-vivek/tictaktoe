import React from 'react';

export default function MoveHistory({ moveHistory, mode, isGameOver, winner, currentPlayer, isAiThinking }) {
  return (
    <div className="w-full lg:col-span-3 flex flex-col gap-space-md order-3">
      <div className="p-space-lg rounded-DEFAULT bg-surface-container shadow-xl flex flex-col h-[410px]">
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-outline text-[18px]">history</span>
            <span className="font-label-pill text-label-pill uppercase text-on-surface tracking-wider">Move History</span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-high px-space-xs py-0.5 rounded text-on-surface-variant">{moveHistory.length} / 9</span>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-space-xs pr-1 flex flex-col gap-space-xs">
          {moveHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-space-md opacity-40">
              <span className="material-symbols-outlined text-[32px] mb-space-xs">grid_3x3</span>
              <span className="font-label-sm text-label-sm uppercase">Grid Untouched</span>
              <span className="font-body-md text-body-md text-outline">First move awaits</span>
            </div>
          ) : (
            moveHistory.map(item => (
              <div key={item.moveNumber} className="flex items-center justify-between p-space-xs rounded bg-surface-container-low text-body-md animate-[fade-in_0.15s_ease-out]">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm text-outline font-mono">#0{item.moveNumber}</span>
                  <span className={`w-6 h-5 rounded flex items-center justify-center text-xs font-bold ${item.player === 'X' ? 'bg-primary-container/20 text-primary-container' : 'bg-secondary/20 text-secondary'}`}>
                    {mode === 'pve' && item.player === 'O' ? 'O' : item.player}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Row {item.row}, Col {item.col}</span>
              </div>
            ))
          )}
        </div>

        <div className="pt-space-md mt-auto flex items-center justify-between font-label-sm text-label-sm text-outline border-t border-outline-variant/30">
          {isGameOver ? (
            <span className={winner === 'X' ? 'text-primary font-bold' : winner === 'O' ? 'text-secondary font-bold' : 'text-outline font-bold'}>{winner ? `WINNER: ${winner}` : 'STALEMATE'}</span>
          ) : (
            <span className={currentPlayer === 'X' ? 'text-primary font-bold' : 'text-secondary font-bold'}>{mode === 'pve' && currentPlayer === 'O' && isAiThinking ? 'AI CALCULATING...' : `TURN: ${mode === 'pve' ? (currentPlayer==='X'?'HUMAN (X)':'COMPUTER') : `PLAYER ${currentPlayer}`}`}</span>
          )}
        </div>
      </div>
    </div>
  );
}