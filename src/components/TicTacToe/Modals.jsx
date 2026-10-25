import React from 'react';

export default function Modals({ 
  toast, 
  pendingMode, setPendingMode, applyModeSwitch, 
  showSpecModal, setShowSpecModal 
}) {
  return (
    <>
      {/* TOAST */}
      <div className={`fixed top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${toast.visible ? 'opacity-100 translate-y-2' : 'opacity-0 hidden'}`}>
        <div className="px-4 py-2 rounded-full bg-surface-container-highest border border-primary-container/40 text-primary flex items-center gap-2 shadow-[0_0_24px_rgba(0,242,254,0.4)] backdrop-blur-md text-xs font-bold tracking-wide">
          <span className="material-symbols-outlined text-[17px] text-primary-container">{toast.icon}</span>
          <span>{toast.msg}</span>
        </div>
      </div>

      {/* MODE CONFIRM MODAL */}
      {pendingMode && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-container border border-secondary/40 rounded-xl p-space-lg max-w-md w-full shadow-[0_0_50px_rgba(255,178,186,0.2)] relative animate-[zoom-in_0.15s_ease-out]">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-secondary-container/30 border border-secondary/40 flex items-center justify-center text-secondary shadow-[0_0_15px_rgba(255,178,186,0.3)]">
                  <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">Switch Game Mode?</h3>
              </div>
              <button onClick={() => setPendingMode(null)} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-bright transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-space-md space-y-space-sm text-sm text-on-surface-variant">
              <p className="leading-relaxed text-sm text-on-surface">Switching between <strong>vs Computer</strong> and <strong>Two Player</strong> will reset the current game and clear the session scoreboard.</p>
              <div className="p-space-sm bg-surface-container-low rounded-DEFAULT border border-secondary/30 text-xs text-secondary flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] shrink-0 text-secondary">warning</span>
                <span>All active board marks, move history, and recorded scores (<span className="font-mono font-bold">X Wins</span>, <span className="font-mono font-bold">Draws</span>, <span className="font-mono font-bold">O Wins</span>) will be erased.</span>
              </div>
              <p className="text-xs text-outline font-medium">Do you want to proceed?</p>
            </div>
            <div className="pt-space-sm flex items-center justify-end gap-2 border-t border-outline-variant/20">
              <button onClick={() => setPendingMode(null)} className="px-space-md py-space-xs rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-pill text-label-pill border border-outline-variant/40 transition-all active:scale-95">Cancel</button>
              <button onClick={() => { applyModeSwitch(pendingMode); setPendingMode(null); }} className="px-space-md py-space-xs rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary font-label-pill text-label-pill shadow-[0_0_20px_rgba(255,178,186,0.3)] transition-all active:scale-95 flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Confirm & Switch</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SPEC MODAL */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-container border border-outline-variant/50 rounded-xl p-space-lg max-w-xl w-full shadow-2xl relative animate-[zoom-in_0.15s_ease-out]">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[24px]">verified</span>
                <h3 className="font-headline-sm text-headline-sm text-primary">Undo Rule Specs</h3>
              </div>
              <button onClick={() => setShowSpecModal(false)} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-bright">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-space-md space-y-space-md text-sm text-on-surface-variant">
              <div>
                <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-base mb-1"><span className="w-2 h-2 rounded-full bg-primary-container"></span>Option A (Strict)</h4>
                <p className="leading-relaxed text-xs">When a round ends in a <strong>Win</strong> or <strong>Draw</strong>, Undo is disabled immediately. Outcomes are recorded definitively.</p>
              </div>
              <div className="pt-2 border-t border-outline-variant/20">
                <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-base mb-1"><span className="w-2 h-2 rounded-full bg-secondary"></span>Option B (Rollback)</h4>
                <p className="leading-relaxed text-xs">Undo remains accessible after round completion. Clicking Undo retracts the decisive move, resumes the round, and <strong>decrements the recorded tally on the scoreboard</strong>.</p>
              </div>
            </div>
            <div className="pt-space-sm flex justify-end">
              <button onClick={() => setShowSpecModal(false)} className="px-space-md py-space-xs rounded-full bg-primary-container text-on-primary-container font-label-pill text-label-pill shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:brightness-110">Got it</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}