import React from 'react';

type StatusKey = 'running' | 'available' | 'insync' | 'stopped' | 'terminated' | string;

const STATUS_MAP: Record<string, { c: string; pulse: string }> = {
  running:    { c: 'bg-green-500',  pulse: 'pulse-running' },
  available:  { c: 'bg-green-500',  pulse: 'pulse-running' },
  insync:     { c: 'bg-green-500',  pulse: 'pulse-running' },
  stopped:    { c: 'bg-yellow-500', pulse: 'pulse-stopped' },
  terminated: { c: 'bg-red-500',    pulse: '' },
};

export const StatusDot: React.FC<{ state: StatusKey }> = ({ state }) => {
  const cfg = STATUS_MAP[(state || '').toLowerCase()] || STATUS_MAP.stopped;
  return <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${cfg.c} ${cfg.pulse}`} />;
};

type Tone = 'green' | 'red' | 'blue' | 'purple' | 'yellow' | 'gray';

const TONES: Record<Tone, string> = {
  green:  'bg-green-900/30 text-green-400 border-green-800',
  red:    'bg-red-900/20 text-red-400 border-red-800',
  blue:   'bg-blue-900/40 text-blue-300 border-blue-800',
  purple: 'bg-purple-900/40 text-purple-400 border-purple-800',
  yellow: 'bg-yellow-900/40 text-yellow-400 border-yellow-800',
  gray:   'bg-slate-800/60 text-gray-400 border-gray-700',
};

export const Badge: React.FC<{
  tone?: Tone;
  mono?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ tone = 'gray', mono, children, className = '' }) => (
  <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border ${TONES[tone]} ${mono ? 'font-mono' : ''} ${className}`}>
    {children}
  </span>
);

const DNS_TONE: Record<string, Tone> = { A: 'green', CNAME: 'blue', MX: 'purple', TXT: 'yellow', NS: 'gray', SOA: 'gray' };

export const DnsBadge: React.FC<{ type: string }> = ({ type }) => (
  <Badge tone={DNS_TONE[type] || 'gray'} mono>{type}</Badge>
);
