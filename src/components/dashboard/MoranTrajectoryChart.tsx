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
import { TrendingUp, ShieldCheck } from 'lucide-react';

interface MoranTrajectoryChartProps {
  data: MoranYear[];
}

export const MoranTrajectoryChart: React.FC<MoranTrajectoryChartProps> = ({ data }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Lintasan Autokorelasi Spasial (Global Moran's I 1961–2024)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Derajat pengelompokan spasial emisi alih guna lahan (CO₂ LUC) per kapita makin mengetat.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-red-500/15 text-red-400 border border-red-500/30">
            2024: +0.7285 (p = 0.002)
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
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
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(val: number) => [`+${val.toFixed(4)}`, "Moran's I"]}
              labelFormatter={(label) => `Tahun: ${label}`}
            />
            <ReferenceLine
              y={-0.023}
              stroke="#475569"
              strokeDasharray="4 4"
              label={{ value: 'E(I) = -0.023 (Acak)', position: 'insideBottomRight', fill: '#64748b', fontSize: 10 }}
            />
            <Line
              type="monotone"
              dataKey="Moran's I"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 7, fill: '#34d399' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
          <span className="text-slate-500 block">Titik Awal (1961):</span>
          <span className="font-mono font-bold text-slate-200">+0.2552 (Signifikan)</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
          <span className="text-slate-500 block">Kenaikan 64 Tahun:</span>
          <span className="font-mono font-bold text-emerald-400">+185% Penguatan Klaster</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
          <span className="text-slate-500 block">P-Value Pengujian:</span>
          <span className="font-mono font-bold text-cyan-400">p &lt; 0.005 (Seluruh Titik)</span>
        </div>
      </div>
    </div>
  );
};
