import { useReducedMotion } from "@/landing/motion";
import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { TrendingUp, ShieldCheck, HelpCircle, Layers } from 'lucide-react';

interface ForecastingModuleProps {
  historicalData: any[];
  projectionData: any[];
}

export const ForecastingModule: React.FC<ForecastingModuleProps> = ({
  historicalData,
  projectionData,
}) => {
  const reduced = useReducedMotion();
  // Filter historical data for recent decades (e.g. 1990–2024) to keep chart focused and readable
  const recentHist = historicalData
    .filter((d) => d.year >= 1990)
    .map((d) => ({
      tahun: d.year,
      historis: d.ch4,
      ramalan: null,
      ci95_bawah: null,
      ci95_atas: null,
    }));

  // Bridge last historical year (2024) to first projection (2025)
  const lastHist = recentHist[recentHist.length - 1];

  const projFormatted = projectionData.map((d) => ({
    tahun: d.tahun,
    historis: null,
    ramalan: d.ramalan,
    ci95_bawah: d.ci95_bawah,
    ci95_atas: d.ci95_atas,
  }));

  const chartData = [
    ...recentHist,
    {
      tahun: lastHist?.tahun,
      historis: lastHist?.historis,
      ramalan: lastHist?.historis,
      ci95_bawah: lastHist?.historis,
      ci95_atas: lastHist?.historis,
    },
    ...projFormatted,
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <Card>
        <CardHeader className="p-5 sm:p-6 pb-4 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 space-y-0">
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-grain-mist text-neutral-800 border border-black/10">
              Leak-Free Time-Series Cross-Validation
            </span>
            <CardTitle className="text-lg sm:text-xl font-bold text-neutral-950 mt-2 flex items-center gap-2">
              <TrendingUp className="size-5 text-neutral-800" />
              <span>ASEAN Agrifood System Methane Emission Projections (2025–2035)</span>
            </CardTitle>
            <CardDescription className="mt-1">
              Derived from 2,904 fold-model evaluations (12 candidate models × 4 forecast horizons × 2 rolling/expanding windows). Top performers: Drift & ARIMA Ensemble.
            </CardDescription>
          </div>

          <div className="bg-neutral-100/80 px-4 py-3 rounded-2xl border border-black/10 text-left md:text-right shrink-0">
            <span className="text-[10px] text-neutral-600 block uppercase font-mono">Optimal Evaluation Horizon:</span>
            <span className="text-base sm:text-lg font-black text-neutral-800 font-mono tracking-tight">
              MAPE h=1: 1.34% · h=10: 3.10%
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 pt-4 space-y-6">
          {/* Chart */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line-strong)" opacity={0.6} />
                <XAxis dataKey="tahun" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'rgba(29,29,31,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(29,29,31,0.08)',
                  }}
                  formatter={(val: any) => [typeof val === 'number' ? val.toFixed(1) : '-', '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <ReferenceLine x={2024} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Forecast Inception 2025', fill: '#ef4444', fontSize: 10 }} />
                
                {/* 95% Confidence Interval Band */}
                <Area isAnimationActive={!reduced} animationDuration={550}
                  type="monotone"
                  dataKey="ci95_atas"
                  stroke="transparent"
                  fill="#0d9488"
                  fillOpacity={0.2}
                  name="95% Prediction Interval"
                />
                <Area isAnimationActive={!reduced} animationDuration={550}
                  type="monotone"
                  dataKey="ci95_bawah"
                  stroke="transparent"
                  fill="var(--surface)"
                  fillOpacity={1}
                  name="95% Lower Bound"
                />

                {/* Historical Line */}
                <Line isAnimationActive={!reduced} animationDuration={550}
                  type="monotone"
                  dataKey="historis"
                  stroke="var(--plot-historical)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Historical ASEAN (1990–2024)"
                />

                {/* Forecast Line */}
                <Line isAnimationActive={!reduced} animationDuration={550}
                  type="monotone"
                  dataKey="ramalan"
                  stroke="var(--plot-primary)"
                  strokeWidth={3}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: 'var(--plot-primary)' }}
                  name="Ensemble Forecast (2025–2035)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Model Ranking Matrix */}
          <div className="pt-5 border-t border-black/5">
            <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
              Cross-Validation Performance Ranking Matrix (Walk-Forward CV)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-black/5 bg-neutral-100/60">
              <table className="w-full text-left text-xs font-mono min-w-[640px]">
                <thead className="bg-neutral-100 text-neutral-600 border-b border-black/10 text-[11px]">
                  <tr>
                    <th className="px-4 py-2.5 font-sans whitespace-nowrap">Time-Series Model</th>
                    <th className="px-4 py-2.5 text-right whitespace-nowrap">MAPE h=1</th>
                    <th className="px-4 py-2.5 text-right whitespace-nowrap">MAPE h=3</th>
                    <th className="px-4 py-2.5 text-right whitespace-nowrap">MAPE h=5</th>
                    <th className="px-4 py-2.5 text-right whitespace-nowrap">MAPE h=10</th>
                    <th className="px-4 py-2.5 text-center font-sans whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr className="bg-grain-mist text-neutral-950 font-bold">
                    <td className="px-4 py-2.5 font-sans whitespace-nowrap">Drift (Linear Trend)</td>
                    <td className="px-4 py-2.5 text-right text-neutral-800">1.34%</td>
                    <td className="px-4 py-2.5 text-right text-neutral-800">2.18%</td>
                    <td className="px-4 py-2.5 text-right text-neutral-800">2.67%</td>
                    <td className="px-4 py-2.5 text-right text-neutral-800">3.10%</td>
                    <td className="px-4 py-2.5 text-center font-sans text-neutral-800 font-semibold whitespace-nowrap">Rank 1 (Selected)</td>
                  </tr>
                  <tr className="text-neutral-700 hover:bg-neutral-100/30 transition-colors">
                    <td className="px-4 py-2.5 font-sans whitespace-nowrap">ARIMA (Hannan-Rissanen AICc)</td>
                    <td className="px-4 py-2.5 text-right">1.52%</td>
                    <td className="px-4 py-2.5 text-right">2.27%</td>
                    <td className="px-4 py-2.5 text-right">2.75%</td>
                    <td className="px-4 py-2.5 text-right">3.60%</td>
                    <td className="px-4 py-2.5 text-center font-sans text-neutral-800 whitespace-nowrap">Runner-Up</td>
                  </tr>
                  <tr className="text-neutral-700 hover:bg-neutral-100/30 transition-colors">
                    <td className="px-4 py-2.5 font-sans whitespace-nowrap">Holt Linear Trend</td>
                    <td className="px-4 py-2.5 text-right">1.57%</td>
                    <td className="px-4 py-2.5 text-right">2.41%</td>
                    <td className="px-4 py-2.5 text-right">2.81%</td>
                    <td className="px-4 py-2.5 text-right">3.70%</td>
                    <td className="px-4 py-2.5 text-center font-sans text-neutral-600 whitespace-nowrap">Ensemble</td>
                  </tr>
                  <tr className="text-neutral-600 hover:bg-neutral-100/30 transition-colors">
                    <td className="px-4 py-2.5 font-sans whitespace-nowrap">Naive (Zero-Parameter Baseline)</td>
                    <td className="px-4 py-2.5 text-right">2.16%</td>
                    <td className="px-4 py-2.5 text-right">3.08%</td>
                    <td className="px-4 py-2.5 text-right">3.88%</td>
                    <td className="px-4 py-2.5 text-right text-red-700">6.58%</td>
                    <td className="px-4 py-2.5 text-center font-sans text-neutral-500 whitespace-nowrap">Benchmark</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diebold-Mariano Rationale */}
      <div className="p-4 rounded-2xl bg-surface/60 border border-black/10 text-xs text-neutral-700 flex items-start gap-3 backdrop-blur-md">
        <ShieldCheck className="size-5 text-neutral-800 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-neutral-950">Diebold–Mariano Test Justification:</strong> Differential predictive accuracy testing with Harvey–Leybourne–Newbold small-sample corrections demonstrates that the top 7 candidate specifications are not statistically distinguishable from the Drift baseline. Accordingly, the final trajectory leverages *Ensemble Averaging* to minimize individual model misspecification risk.
        </div>
      </div>
    </div>
  );
};
