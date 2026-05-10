import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const PrimaryButton: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => (
  <button
    {...rest}
    className={`bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-semibold text-[11px] tracking-tight py-1.5 px-3 rounded-[3px] inline-flex items-center gap-1 transition-colors ${className}`}
    style={{ boxShadow: '0 1px 0 0 rgba(255,255,255,0.15) inset, 0 1px 2px 0 rgba(0,0,0,0.4)' }}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => (
  <button
    {...rest}
    className={`bg-slate-800/60 hover:bg-slate-700/70 text-gray-200 font-semibold text-[11px] tracking-tight py-1.5 px-2.5 rounded-[3px] border border-slate-600/70 inline-flex items-center gap-1 transition-colors ${className}`}
  >
    {children}
  </button>
);

export const GhostIconButton: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => (
  <button
    {...rest}
    className={`text-gray-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors ${className}`}
  >
    {children}
  </button>
);

export const AdminPill: React.FC<{ children?: React.ReactNode }> = ({ children = 'Admin' }) => (
  <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-semibold tracking-wide">{children}</span>
);
