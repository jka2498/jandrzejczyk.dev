import React from 'react';
import { MoreVertical, Info } from 'lucide-react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  fullHeight?: boolean;
  className?: string;
  showInfo?: boolean;
  showKebab?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  icon,
  headerAction,
  fullHeight,
  className = '',
  showInfo = true,
  showKebab = true,
}) => {
  return (
    <div
      className={`relative bg-[#161e2d]/95 border border-slate-700/80 rounded-md overflow-hidden flex flex-col ${
        fullHeight ? 'h-full' : ''
      } ${className}`}
      style={{ boxShadow: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)' }}
    >
      <div className="flex items-center justify-between pl-4 pr-3 py-2.5 border-b border-slate-700/80 bg-gradient-to-b from-[#1c2639] via-[#181f2e] to-[#161e2d]">
        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="text-orange-400 shrink-0">{icon}</span>}
          <h3 className="font-semibold text-white text-[13px] tracking-tight truncate">{title}</h3>
          {showInfo && <Info size={12} className="text-gray-500 shrink-0" />}
        </div>
        <div className="flex items-center gap-1.5">
          {headerAction}
          {showKebab && (
            <button className="text-gray-400 hover:text-white p-1 rounded hover:bg-slate-700">
              <MoreVertical size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Card;
