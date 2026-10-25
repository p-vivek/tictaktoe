import React from 'react';
import { useTicTacToe } from '../../hooks/useTicTacToe';
import Board from './Board';
import Scoreboard from './Scoreboard';
import MoveHistory from './MoveHistory';
import Modals from './Modals';

export default function TicTacToe() {
  const game = useTicTacToe();

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen relative overflow-x-hidden">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
        <div className="h-16 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-gutter">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container shadow-[0_0_20px_rgba(0,242,254,0.35)]">
             <span className="material-symbols-outlined text-[18px] text-primary-container">sports_esports</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary leading-none">ABB</span>
              <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase mt-space-xs">Tic Tac Toe</span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm sm:gap-gutter">
            <div className="relative flex items-center bg-surface-container-low p-1 rounded-full border border-outline-variant/40 shadow-inner">
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out shadow-[0_0_16px_rgba(0,242,254,0.35)] ${game.undoPolicy === 'A' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary text-on-secondary shadow-[0_0_16px_rgba(255,178,186,0.35)]'}`}
                style={{ left: game.undoPolicy === 'A' ? '4px' : 'calc(50% + 0px)' }}
              />
              <button onClick={() => game.setUndoPolicy('A')} className={`relative z-10 py-1 px-3 sm:px-3.5 rounded-full font-label-pill text-[12px] flex items-center justify-center gap-1.5 transition-colors ${game.undoPolicy === 'A' ? 'text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface font-semibold'}`}>
                <span className="material-symbols-outlined text-[15px]">lock</span>
                <span>A: Lock</span>
              </button>
              <button onClick={() => game.setUndoPolicy('B')} className={`relative z-10 py-1 px-3 sm:px-3.5 rounded-full font-label-pill text-[12px] flex items-center justify-center gap-1.5 transition-colors ${game.undoPolicy === 'B' ? 'text-on-secondary font-bold' : 'text-on-surface-variant hover:text-on-surface font-semibold'}`}>
                <span className="material-symbols-outlined text-[15px]">history</span>
                <span>B: Rollback</span>
              </button>
            </div>
            <button onClick={() => game.setShowSpecModal(true)} className="h-9 px-2.5 sm:px-3 rounded-full bg-surface-container flex items-center gap-1.5 text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high transition-colors text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="hidden md:inline">Undo rules</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-16 bg-background relative min-h-[calc(100vh-80px)]">
        <section className="relative w-full max-w-7xl mx-auto px-margin py-space-md sm:py-space-xl flex flex-col items-center">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-48 right-10 w-72 h-72 bg-secondary-container/15 blur-[100px] rounded-full pointer-events-none"></div>
          
          {/* MODE SELECTOR */}
          <div className="w-full max-w-md flex items-center justify-center mb-space-sm z-10">
            <div className="bg-surface-container-low p-1.5 rounded-full border border-outline-variant/30 flex items-center gap-1 shadow-lg w-full sm:w-auto" role="tablist">
              <button onClick={() => game.handleModeRequest('pve')} className={`flex-1 sm:flex-initial py-space-xs px-space-md rounded-full font-label-pill text-label-pill flex items-center justify-center gap-1.5 transition-all ${game.mode === 'pve' ? 'bg-primary-container text-on-primary-container shadow-[0_0_16px_rgba(0,242,254,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`}>
                <span className="material-symbols-outlined text-[17px]">smart_toy</span>
                <span>vs Computer</span>
              </button>
              <button onClick={() => game.handleModeRequest('pvp')} className={`flex-1 sm:flex-initial py-space-xs px-space-md rounded-full font-label-pill text-label-pill flex items-center justify-center gap-1.5 transition-all ${game.mode === 'pvp' ? 'bg-primary-container text-on-primary-container shadow-[0_0_16px_rgba(0,242,254,0.3)]' : 'text-on-surface-variant hover:text-on-surface'}`}>
                <span className="material-symbols-outlined text-[17px]">group</span>
                <span>Two Player</span>
              </button>
            </div>
          </div>

          {/* TURN & MATCH STATUS HUB */}
          <div className="w-full max-w-5xl mb-space-lg">
            {!game.isGameOver && (
              <div className="relative w-full overflow-hidden p-space-xs rounded-full bg-surface-container-low shadow-xl">
                <div className="relative grid grid-cols-2 p-1 gap-1">
                  <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out shadow-[0_0_24px_rgba(0,242,254,0.35)] ${game.isXTurn ? 'bg-primary-container/20' : 'bg-secondary-container/30 shadow-[0_0_24px_rgba(255,178,186,0.35)]'}`}
                    style={{ left: game.isXTurn ? '4px' : 'calc(50% + 0px)' }}
                  />
                  <div className={`relative z-10 flex items-center justify-center gap-space-xs py-space-sm rounded-full transition-all duration-200 ${!game.isXTurn ? 'opacity-40' : ''}`}>
                    <span className="material-symbols-outlined text-primary-container text-[20px]">close</span>
                    <div className="flex flex-col text-left leading-none">
                      <span className="font-label-pill text-label-pill text-primary tracking-wide">{game.player1Label}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">{game.isXTurn ? 'Active Turn' : 'Waiting'}</span>
                    </div>
                  </div>
                  <div className={`relative z-10 flex items-center justify-center gap-space-xs py-space-sm rounded-full transition-all duration-200 ${game.isXTurn ? 'opacity-40' : ''}`}>
                    <span className="material-symbols-outlined text-secondary text-[20px]">{game.p2Icon}</span>
                    <div className="flex flex-col text-left leading-none">
                      <span className="font-label-pill text-label-pill text-secondary tracking-wide">{game.player2Label}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">{game.isAiThinking ? 'Thinking...' : (!game.isXTurn ? 'Active Turn' : 'Waiting')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {game.isGameOver && (
              <div className={`w-full rounded-DEFAULT p-space-md flex items-center justify-between shadow-2xl transition-all duration-300 transform scale-100 opacity-100 ${game.winner === 'X' ? 'bg-on-primary-fixed-variant text-primary shadow-[0_0_30px_rgba(0,242,254,0.3)]' : game.winner === 'O' ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_30px_rgba(255,75,114,0.3)]' : 'bg-surface-container-high text-on-surface'}`}>
                <div className="flex items-center gap-space-md">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${game.winner === 'X' ? 'bg-primary-container text-on-primary-container' : game.winner === 'O' ? 'bg-secondary text-on-secondary' : 'bg-outline/20'}`}>
                    <span className="material-symbols-outlined text-[24px]">{game.winner ? (game.winner === 'O' && game.mode === 'pve' ? 'smart_toy' : 'military_tech') : 'balance'}</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight">
                      {game.winner ? (game.winner === 'X' ? (game.mode === 'pve' ? 'HUMAN PLAYER X WINS!' : 'PLAYER X WINS!') : (game.mode === 'pve' ? 'COMPUTER (BOT O) WINS!' : 'PLAYER O WINS!')) : 'GAME DRAW! // STALEMATE'}
                    </h2>
                    <p className="font-label-sm text-label-sm opacity-80">
                      {game.undoPolicy === 'B' ? `Outcome registered. Policy B active: Click Rollback or Undo to retract.` : `Match definitive. Option A active: Scoreboard finalized.`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={game.resetGameNewRound} className="font-label-pill text-label-pill px-space-md py-space-xs rounded-full bg-surface-container-highest text-on-surface hover:bg-surface-bright transition-all shadow-md">Next Round</button>
                  {game.undoPolicy === 'B' && (
                    <button onClick={game.undoMove} className="font-label-pill text-label-pill px-3 py-space-xs rounded-full bg-surface-container-low text-primary border border-primary-container/40 hover:bg-primary-container/20 transition-all shadow-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">undo</span>
                      <span>Rollback {game.winner ? 'Win' : 'Draw'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            
            <Scoreboard 
              matchCount={game.matchCount} mode={game.mode} p2Icon={game.p2Icon}
              scores={game.scores} dom={game.dom} resetGameNewRound={game.resetGameNewRound}
              undoMove={game.undoMove} canUndo={game.canUndo} clearScoreboard={game.clearScoreboard}
              undoPolicy={game.undoPolicy}
            />

            <Board 
              board={game.board} winningLine={game.winningLine} winner={game.winner}
              isGameOver={game.isGameOver} isAiThinking={game.isAiThinking} mode={game.mode}
              currentPlayer={game.currentPlayer} handleCellClick={game.handleCellClick}
            />

            <MoveHistory 
              moveHistory={game.moveHistory} mode={game.mode} isGameOver={game.isGameOver}
              winner={game.winner} currentPlayer={game.currentPlayer} isAiThinking={game.isAiThinking}
            />

          </div>
        </section>

        <Modals 
          toast={game.toast} pendingMode={game.pendingMode} setPendingMode={game.setPendingMode}
          applyModeSwitch={game.applyModeSwitch} showSpecModal={game.showSpecModal} setShowSpecModal={game.setShowSpecModal}
        />

      </main>

      <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-margin py-space-lg flex flex-col sm:flex-row items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-sm text-outline">
            <span className="material-symbols-outlined text-[18px] text-primary-container">sports_esports</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">©2026 ABB Arcade Arena.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}