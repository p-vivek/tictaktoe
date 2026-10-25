import React from 'react';

export default function Scoreboard({ 
  matchCount, mode, p2Icon, scores, dom, 
  resetGameNewRound, undoMove, canUndo, clearScoreboard, undoPolicy 
}) {
  return (
    <div className="w-full lg:col-span-4 flex flex-col gap-space-md order-2 lg:order-1">
      {/* Score Tracker */}
      <div className="p-space-lg rounded-DEFAULT bg-surface-container shadow-xl flex flex-col gap-space-md relative overflow-hidden transition-all duration-300">
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary-container text-[20px]">leaderboard</span>
            <span className="font-label-pill text-label-pill uppercase text-on-surface tracking-wider">Score Tracker</span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-high px-space-xs py-0.5 rounded text-outline uppercase">Match #{matchCount}</span>
        </div>
        <div className="grid grid-cols-3 gap-space-xs">
          <div className="p-space-md rounded-DEFAULT bg-surface-container-low flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container mb-space-xs"><span className="material-symbols-outlined text-[16px]">close</span></div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{mode === 'pve' ? 'Human (X)' : 'P1 (X)'}</span>
            <span className="font-title-score text-title-score text-primary mt-space-xs tabular-nums">{scores.X}</span>
          </div>
          <div className="p-space-md rounded-DEFAULT bg-surface-container-low flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-space-xs"><span className="material-symbols-outlined text-[16px]">balance</span></div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Draws</span>
            <span className="font-title-score text-title-score text-on-surface mt-space-xs tabular-nums">{scores.draws}</span>
          </div>
          <div className="p-space-md rounded-DEFAULT bg-surface-container-low flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-space-xs"><span className="material-symbols-outlined text-[16px]">{p2Icon}</span></div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{mode === 'pve' ? 'Bot (O)' : 'P2 (O)'}</span>
            <span className="font-title-score text-title-score text-secondary mt-space-xs tabular-nums">{scores.O}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 pt-space-xs border-t border-outline-variant/20">
          <div className="flex items-center justify-between text-[11px] font-mono text-outline">
            <span className="flex items-center gap-1 font-semibold text-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>X: {dom.pctX}%</span>
            <span className="text-[10px] uppercase tracking-wider text-outline/70">Win Ratio</span>
            <span className="flex items-center gap-1 font-semibold text-secondary">O: {dom.pctO}%<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span></span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-lowest overflow-hidden flex">
            <div className="h-full bg-primary-container transition-all duration-500 ease-out" style={{ width: `${dom.pctX}%` }}></div>
            <div className="h-full bg-secondary transition-all duration-500 ease-out" style={{ width: `${dom.pctO}%` }}></div>
          </div>
        </div>
      </div>

      {/* Match Controls */}
      <div className="p-space-lg rounded-DEFAULT bg-surface-container shadow-xl flex flex-col gap-space-sm">
        <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
          <div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary-container text-[20px]">tune</span><span className="font-label-pill text-label-pill uppercase text-on-surface tracking-wider">Match Controls</span></div>
          <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 shadow-sm ${undoPolicy === 'A' ? 'text-primary bg-primary-container/10 border-primary-container/30' : 'text-secondary bg-secondary-container/20 border-secondary/30'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${undoPolicy === 'A' ? 'bg-primary-container' : 'bg-secondary'}`}></span>Policy: Opt {undoPolicy}
          </span>
        </div>
        <div className="flex flex-col gap-space-sm pt-space-xs">
          <button onClick={resetGameNewRound} className="w-full flex items-center justify-between py-space-sm px-space-md rounded-full bg-primary-container text-on-primary-container font-label-pill text-label-pill shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:brightness-110 active:scale-95 transition-all group">
            <span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-[19px] group-hover:rotate-180 transition-transform duration-300">replay</span><span className="font-bold">Reset Game (New Round)</span></span>
            <span className="px-2 py-0.5 rounded-full bg-on-primary-container/20 text-on-primary-container font-mono text-[10px] font-bold tracking-wider">[R]</span>
          </button>
          <button onClick={undoMove} disabled={!canUndo} className="w-full flex items-center justify-between py-space-sm px-space-md rounded-full bg-surface-container-high text-on-surface border border-outline-variant/40 font-label-pill text-label-pill active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed group shadow-sm hover:border-primary-container/60 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-[18px] text-primary-container group-hover:-translate-x-0.5 transition-transform">undo</span><span>Undo Move</span></span>
            <div className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/40 text-on-surface-variant font-mono text-[10px]">Z</span><span className="px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/40 text-on-surface-variant font-mono text-[10px]">U</span></div>
          </button>
          <button onClick={clearScoreboard} className="w-full flex items-center justify-between py-space-xs px-space-md rounded-full bg-transparent hover:bg-secondary-container/15 text-outline hover:text-secondary border border-transparent hover:border-secondary/20 font-label-pill text-label-pill active:scale-95 transition-all group mt-space-xs">
            <span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-[18px] transition-colors">restart_alt</span><span className="text-[12px]">Clear Scoreboard</span></span>
            <span className="text-[10px] uppercase tracking-wider opacity-70 font-mono">Full Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}