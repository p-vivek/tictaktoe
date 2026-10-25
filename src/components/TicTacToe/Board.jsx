import React from 'react';
import { XSvg, OSvg } from './Icons';
import { CELL_CENTERS } from '../../constants/gameConstants';

export default function Board({ board, winningLine, winner, isGameOver, isAiThinking, mode, currentPlayer, handleCellClick }) {
  return (
    <div className="w-full lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
      <div className="relative w-full max-w-[390px] aspect-square p-space-md rounded-xl bg-surface-container-low shadow-[0_12px_48px_rgba(0,0,0,0.6)] flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-space-sm select-none" role="grid">
          {board.map((cell, idx) => {
            const isWinningCell = winningLine?.includes(idx);
            const isFaded = isGameOver && !isWinningCell;
            const canClick = !cell && !isGameOver && !isAiThinking && !(mode === 'pve' && currentPlayer !== 'X');
            
            return (
              <button 
                key={idx}
                onClick={() => handleCellClick(idx)}
                className={`cell relative flex items-center justify-center rounded-DEFAULT shadow-md outline-none transition-all duration-150 ${canClick ? 'bg-surface-container hover:bg-surface-container-high cursor-pointer active:scale-95 focus-visible:bg-surface-container-highest' : 'bg-surface-container cursor-default'} ${isFaded ? 'opacity-30' : ''} ${isWinningCell ? 'bg-surface-container-highest scale-105 z-10 ' + (winner === 'X' ? 'shadow-[0_0_24px_rgba(0,242,254,0.4)]' : 'shadow-[0_0_24px_rgba(255,178,186,0.4)]') : ''}`}
                aria-label={`Cell Row ${Math.floor(idx/3)+1} Column ${(idx%3)+1} ${cell ? 'marked with '+cell : 'empty'}`}
                role="gridcell"
                type="button"
              >
                <span className="pointer-events-none flex items-center justify-center w-full h-full">
                  {cell === 'X' && <XSvg />}
                  {cell === 'O' && <OSvg />}
                </span>
              </button>
            )
          })}
        </div>

        {winningLine && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 390 390">
            <line x1={CELL_CENTERS[winningLine[0]].x} y1={CELL_CENTERS[winningLine[0]].y} x2={CELL_CENTERS[winningLine[2]].x} y2={CELL_CENTERS[winningLine[2]].y} className="blur-md" opacity="0.4" stroke={winner === 'X' ? '#00f2fe' : '#ffb2ba'} strokeLinecap="round" strokeWidth="14" />
            <line x1={CELL_CENTERS[winningLine[0]].x} y1={CELL_CENTERS[winningLine[0]].y} x2={CELL_CENTERS[winningLine[2]].x} y2={CELL_CENTERS[winningLine[2]].y} stroke={winner === 'X' ? '#00f2fe' : '#ffb2ba'} strokeLinecap="round" strokeWidth="6" />
          </svg>
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="font-label-sm text-label-sm text-outline">{isAiThinking ? 'Tactical AI analyzing 5-tier strategy...' : (isGameOver ? 'Round completed.' : 'Click any open square to execute placement')}</p>
      </div>
    </div>
  );
}