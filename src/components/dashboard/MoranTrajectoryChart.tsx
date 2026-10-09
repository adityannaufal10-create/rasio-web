import { useReducedMotion } from "@/landing/motion";
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { MoranYear } from '../../types/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { TrendingUp, ShieldCheck } from 'lucide-react';

interface MoranTrajectoryChartProps {
  data: MoranYear[];
}

export const MoranTrajectoryChart: React.FC<MoranTrajectoryChartProps> = ({ data }) => {
  const reduced = useReducedMotion();
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-neutral-800" />
            <span>Spatial Autocorrelation Trajectory (Moran's I 1961–2024)</span>
          </CardTitle>
          <CardDescription className="mt-1">
            Spatial clustering degree of land-use change (LUC CO₂) per capita has strengthened progressively.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-red-500/15 text-red-700 border border-red-500/30 whitespace-nowrap shadow-sm shadow-black/5">
            2024: +0.7285 (p = 0.002)
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-strong)" opacity={0.6} />
              <XAxis
                dataKey="tahun"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                domain={[0, 0.85]}
                stroke="#64748b"
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'rgba(29,29,31,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(29,29,31,0.08)',
                }}
                formatter={(val: number) => [`+${val.toFixed(4)}`, "Moran's I"]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <ReferenceLine
                y={-0.023}
                stroke="#475569"
                strokeDasharray="4 4"
                label={{ value: 'E(I) = -0.023 (Random expectation)', position: 'insideBottomRight', fill: '#64748b', fontSize: 10 }}
              />
              <Line isAnimationActive={!reduced} animationDuration={550}
                type="monotone"
                dataKey="Moran's I"
                stroke="var(--plot-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--plot-primary)', r: 3.5 }}
                activeDot={{ r: 6, fill: 'var(--plot-primary)', stroke: '#070b14', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-black/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-neutral-100/60 p-2.5 rounded-xl border border-black/5 flex flex-col justify-between">
            <span className="text-neutral-500 text-[11px] block">Baseline (1961):</span>
            <span className="font-mono font-bold text-neutral-800 mt-1">+0.2552 (Significant)</span>
          </div>
          <div className="bg-neutral-100/60 p-2.5 rounded-xl border border-black/5 flex flex-col justify-between">
            <span className="text-neutral-500 text-[11px] block">64-Year Expansion:</span>
            <span className="font-mono font-bold text-neutral-800 mt-1">+185% Cluster Tightening</span>
          </div>
          <div className="bg-neutral-100/60 p-2.5 rounded-xl border border-black/5 flex flex-col justify-between">
            <span className="text-neutral-500 text-[11px] block">Hypothesis p-Value:</span>
            <span className="font-mono font-bold text-neutral-800 mt-1">p &lt; 0.005 (All Benchmarks)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
