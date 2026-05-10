import React, { useMemo } from 'react';
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export type MetricPattern =
  | 'cpu'
  | 'network'
  | 'disk'
  | 'status'
  | 'connections'
  | 'iops'
  | 'storage'
  | 'memory';

interface MetricChartProps {
  title: string;
  pattern: MetricPattern;
  unit?: string;
  /** Domain max — defaults to a sensible value per pattern. */
  max?: number;
  /** Number of samples (default 60 → roughly one per minute over an hour). */
  points?: number;
}

/** Tiny seeded PRNG (mulberry32). Deterministic per metric so the chart stays stable across renders. */
const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const hashString = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const PATTERN_DEFAULTS: Record<MetricPattern, number> = {
  cpu: 100,
  network: 100,
  disk: 100,
  status: 1,
  connections: 200,
  iops: 5000,
  storage: 100,
  memory: 100,
};

const PATTERN_FORMATTERS: Record<MetricPattern, (v: number) => string> = {
  cpu: (v) => `${v.toFixed(1)}%`,
  network: (v) => `${v.toFixed(0)} MB/s`,
  disk: (v) => `${v.toFixed(0)} ops`,
  status: (v) => (v >= 1 ? 'OK' : 'Failing'),
  connections: (v) => `${v.toFixed(0)}`,
  iops: (v) => `${(v / 1000).toFixed(1)}k`,
  storage: (v) => `${v.toFixed(1)}%`,
  memory: (v) => `${v.toFixed(1)}%`,
};

/** Generate realistic-looking series data for a given pattern. Deterministic given the seed. */
const generateSeries = (pattern: MetricPattern, seed: number, points: number): number[] => {
  const rand = seededRandom(seed);
  const out: number[] = [];

  switch (pattern) {
    case 'cpu': {
      // Low baseline 5–15%, occasional spikes to 40–70%, brief idle periods.
      let base = 8 + rand() * 6;
      for (let i = 0; i < points; i++) {
        base += (rand() - 0.5) * 3;
        base = Math.max(3, Math.min(25, base));
        const spike = rand() < 0.06 ? 25 + rand() * 35 : 0;
        out.push(Math.min(100, base + spike + rand() * 2));
      }
      break;
    }
    case 'network': {
      // Mostly quiet < 5 MB/s, sudden bursts up to 60–90.
      for (let i = 0; i < points; i++) {
        const burst = rand() < 0.12 ? 30 + rand() * 50 : 0;
        const baseline = 2 + rand() * 4;
        out.push(burst + baseline);
      }
      break;
    }
    case 'disk': {
      // Very spiky read IOPS — short tall events, otherwise near zero.
      for (let i = 0; i < points; i++) {
        out.push(rand() < 0.18 ? 15 + rand() * 70 : rand() * 5);
      }
      break;
    }
    case 'status': {
      // Binary status check: 1.0 normally, occasional 0 dip.
      for (let i = 0; i < points; i++) {
        out.push(rand() < 0.02 ? 0 : 1);
      }
      break;
    }
    case 'connections': {
      // Stable around 60 ± 15, slow drift.
      let v = 55 + rand() * 20;
      for (let i = 0; i < points; i++) {
        v += (rand() - 0.5) * 4;
        v = Math.max(20, Math.min(140, v));
        out.push(v);
      }
      break;
    }
    case 'iops': {
      // Smooth wave 1.5k–3.5k.
      for (let i = 0; i < points; i++) {
        const wave = Math.sin(i / 6) * 800 + Math.sin(i / 13) * 400;
        out.push(2200 + wave + (rand() - 0.5) * 200);
      }
      break;
    }
    case 'storage': {
      // Slowly increasing 40 → 55%.
      for (let i = 0; i < points; i++) {
        out.push(40 + (i / points) * 15 + (rand() - 0.5) * 0.6);
      }
      break;
    }
    case 'memory': {
      // Gradual climb with periodic GC sawtooth drops.
      let v = 35;
      for (let i = 0; i < points; i++) {
        v += 0.4 + (rand() - 0.5) * 0.3;
        if (v > 70 && rand() < 0.15) v = 35 + rand() * 5; // GC drop
        out.push(Math.max(20, Math.min(95, v)));
      }
      break;
    }
  }
  return out;
};

const FILL_GRADIENT_ID = 'metric-fill-orange';

const MetricChart: React.FC<MetricChartProps> = ({
  title,
  pattern,
  unit,
  max,
  points = 60,
}) => {
  const seed = hashString(`${title}::${pattern}`);
  const data = useMemo(() => {
    const series = generateSeries(pattern, seed, points);
    return series.map((v, i) => ({ i, v }));
  }, [pattern, seed, points]);

  const domainMax = max ?? PATTERN_DEFAULTS[pattern];
  const fmt = PATTERN_FORMATTERS[pattern];
  const current = data[data.length - 1]?.v ?? 0;
  const peak = data.reduce((m, d) => Math.max(m, d.v), 0);

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded p-3">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11px] text-gray-400 truncate">{title}</span>
        <span className="text-[11px] text-white font-mono tabular-nums">
          {fmt(current)}
          {unit ? <span className="text-gray-500"> {unit}</span> : null}
        </span>
      </div>
      <div className="h-20" style={{ minHeight: 80 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={80}>
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={FILL_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="i" hide />
            <YAxis hide domain={[0, domainMax]} />
            <Tooltip
              cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '2 2' }}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: 4,
                fontSize: 11,
                padding: '4px 8px',
              }}
              labelFormatter={() => ''}
              formatter={(v: number) => [fmt(v), '']}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#f97316"
              strokeWidth={1.25}
              fill={`url(#${FILL_GRADIENT_ID})`}
              isAnimationActive={false}
              dot={false}
              activeDot={{ r: 2.5, stroke: '#fb923c', strokeWidth: 1, fill: '#0f1117' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500 font-mono">
        <span>1h ago</span>
        <span>peak {fmt(peak)}</span>
        <span>now</span>
      </div>
    </div>
  );
};

export default MetricChart;
