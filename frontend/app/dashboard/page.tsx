'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const progress = [
  { week: 'W1', accuracy: 68 },
  { week: 'W2', accuracy: 72 },
  { week: 'W3', accuracy: 78 },
  { week: 'W4', accuracy: 85 },
];

export default function DashboardPage() {
  const chartData = useMemo(() => progress, []);
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8">
      <div className="glass-card flex flex-col gap-4 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Exam Health Snapshot</h2>
            <p className="text-sm text-slate-300">Realtime anti-cheat telemetry &amp; attempt summaries</p>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} className="glass-card px-4 py-2 text-sm">
            ⌘K Command Palette
          </motion.button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { label: 'Attempt Integrity', value: '98.4%', hint: 'Cheat detection confidence' },
            { label: 'Avg. Accuracy', value: '85%', hint: 'Last 7 days' },
            { label: 'Leaderboard Rank', value: '#12', hint: 'Weekly global' },
          ].map((stat) => (
            <motion.div key={stat.label} whileHover={{ translateY: -4 }} className="glass-card p-6">
              <p className="text-sm uppercase tracking-wide text-slate-400">{stat.label}</p>
              <p className="text-3xl font-semibold text-primary">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.hint}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="glass-card p-8">
        <h3 className="mb-4 text-lg font-semibold">Accuracy Trajectory</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#020617', borderRadius: '1rem', borderColor: '#6366f1' }} />
              <Area type="monotone" dataKey="accuracy" stroke="#6366f1" fill="url(#colorAccuracy)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
