import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <div className="text-xs text-gray-400 mb-3 flex items-center gap-1.5 flex-wrap">
    {items.map((it, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-gray-600">›</span>}
        {it.onClick ? (
          <a className="hover:text-orange-400 hover:underline cursor-pointer" onClick={it.onClick}>
            {it.label}
          </a>
        ) : (
          <span className="text-gray-300">{it.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

export const TabBar: React.FC<{
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}> = ({ tabs, active, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  useLayoutEffect(() => {
    const btn = tabRefs.current[active];
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - containerRect.left, width: btnRect.width });
  }, [active, tabs]);

  useEffect(() => {
    if (indicator) {
      const id = window.setTimeout(() => setHasMoved(true), 0);
      return () => window.clearTimeout(id);
    }
  }, [indicator]);

  return (
    <div
      ref={containerRef}
      className="border-b border-slate-700 flex gap-1 mb-4 overflow-x-auto relative"
    >
      {tabs.map((t) => (
        <button
          key={t}
          ref={(el) => {
            tabRefs.current[t] = el;
          }}
          onClick={() => onChange(t)}
          className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            active === t ? 'text-orange-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          {t}
        </button>
      ))}
      {indicator && (
        <span
          aria-hidden
          className="absolute bottom-0 h-[2px] bg-orange-500 pointer-events-none"
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: indicator.width,
            transition: hasMoved
              ? 'transform 240ms cubic-bezier(.645,.045,.355,1), width 240ms cubic-bezier(.645,.045,.355,1)'
              : 'none',
          }}
        />
      )}
    </div>
  );
};

type KV = [React.ReactNode, React.ReactNode];

export const KeyValueGrid: React.FC<{ items: KV[]; cols?: 2 | 3 | 4 }> = ({ items, cols = 4 }) => {
  const colsClass =
    cols === 2 ? 'grid-cols-2' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4';
  return (
    <div className={`grid ${colsClass} gap-x-6 gap-y-4 text-xs`}>
      {items.map(([k, v], i) => (
        <div key={i}>
          <div className="text-gray-400 mb-1">{k}</div>
          <div className="text-white font-medium break-words">{v}</div>
        </div>
      ))}
    </div>
  );
};
