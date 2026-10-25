import React from 'react';

export const XSvg = () => (
  <svg className="w-16 h-16 sm:w-20 sm:h-20 animate-[zoom-in_0.2s_ease-out]" viewBox="0 0 64 64" fill="none">
    <line x1="16" y1="16" x2="48" y2="48" stroke="#00f2fe" strokeWidth="8" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(0,242,254,0.7)]" />
    <line x1="48" y1="16" x2="16" y2="48" stroke="#00f2fe" strokeWidth="8" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(0,242,254,0.7)]" />
  </svg>
);

export const OSvg = () => (
  <svg className="w-16 h-16 sm:w-20 sm:h-20 animate-[zoom-in_0.2s_ease-out]" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="18" stroke="#ffb2ba" strokeWidth="8" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(255,178,186,0.7)]" />
  </svg>
);