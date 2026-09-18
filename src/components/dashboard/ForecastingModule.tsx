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
import { TrendingUp, ShieldCheck, HelpCircle, Layers } from 'lucide-react';

interface ForecastingModuleProps {
  historicalData: any[];
  projectionData: any[];
}

export const ForecastingModule: React.FC<ForecastingModuleProps> = ({
  historicalData,
  projectionData,
}) => {
  const [selectedFigure, setSelectedFigure] = useState<string>('fan');

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
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
              Deret Waktu Bebas Kebocoran
            </span>
            <h3 className="text-xl font-extrabold text-white mt-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <span>Proyeksi Emisi Metana Sistem Pangan ASEAN (2025–2035)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Hasil 2.904 evaluasi fold-model (12 model × 4 horizon × 2 jendela rolling/expanding). Juara: Model Drift & ARIMA Ensemble.
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">Horizon Evaluasi Juara:</span>
            <span className="text-lg font-black text-teal-400 font-mono">
              MAPE h=1: 1.34% · h=10: 3.10%
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="tahun" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [typeof val === 'number' ? val.toFixed(1) : '-', '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <ReferenceLine x={2024} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Mulai Proyeksi 2025', fill: '#ef4444', fontSize: 10 }} />
              
              {/* 95% Confidence Interval Band */}
              <Area
                type="monotone"
                dataKey="ci95_atas"
                stroke="transparent"
                fill="#0d9488"
                fillOpacity={0.2}
                name="Selang Prediksi 95%"
              />
              <Area
                type="monotone"
                dataKey="ci95_bawah"
                stroke="transparent"
                fill="#080d1a"
                fillOpacity={1}
                name="Batas Bawah 95%"
              />

              {/* Historical Line */}
              <Line
                type="monotone"
                dataKey="historis"
                stroke="#38bdf8"
                strokeWidth={2.5}
                dot={false}
                name="Historis ASEAN (1990-2024)"
              />

              {/* Forecast Line */}
              <Line
                type="monotone"
                dataKey="ramalan"
                stroke="#14b8a6"
                strokeWidth={3}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#14b8a6' }}
                name="Proyeksi Ensemble (2025-2035)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Model Ranking Matrix */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Matriks Peringkat Kinerja Validasi Silang (Walk-Forward CV)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-3.5 py-2 font-sans">Model Deret Waktu</th>
                  <th className="px-3.5 py-2 text-right">MAPE h=1</th>
                  <th className="px-3.5 py-2 text-right">MAPE h=3</th>
                  <th className="px-3.5 py-2 text-right">MAPE h=5</th>
                  <th className="px-3.5 py-2 text-right">MAPE h=10</th>
                  <th className="px-3.5 py-2 text-center font-sans">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="bg-emerald-500/10 text-white font-bold">
                  <td className="px-3.5 py-2 font-sans">Drift (Linear Trend)</td>
                  <td className="px-3.5 py-2 text-right text-emerald-400">1.34%</td>
                  <td className="px-3.5 py-2 text-right text-emerald-400">2.18%</td>
                  <td className="px-3.5 py-2 text-right text-emerald-400">2.67%</td>
                  <td className="px-3.5 py-2 text-right text-emerald-400">3.10%</td>
                  <td className="px-3.5 py-2 text-center font-sans text-emerald-400">Juara 1 (Terpilih)</td>
                </tr>
                <tr className="text-slate-300">
                  <td className="px-3.5 py-2 font-sans">ARIMA (Hannan-Rissanen AICc)</td>
                  <td className="px-3.5 py-2 text-right">1.52%</td>
                  <td className="px-3.5 py-2 text-right">2.27%</td>
                  <td className="px-3.5 py-2 text-right">2.75%</td>
                  <td className="px-3.5 py-2 text-right">3.60%</td>
                  <td className="px-3.5 py-2 text-center font-sans text-teal-400">Runner-Up</td>
                </tr>
                <tr className="text-slate-300">
                  <td className="px-3.5 py-2 font-sans">Holt Linear Trend</td>
                  <td className="px-3.5 py-2 text-right">1.57%</td>
                  <td className="px-3.5 py-2 text-right">2.41%</td>
                  <td className="px-3.5 py-2 text-right">2.81%</td>
                  <td className="px-3.5 py-2 text-right">3.70%</td>
                  <td className="px-3.5 py-2 text-center font-sans text-slate-400">Ensemble</td>
                </tr>
                <tr className="text-slate-400">
                  <td className="px-3.5 py-2 font-sans">Naive (Baseline Tanpa Model)</td>
                  <td className="px-3.5 py-2 text-right">2.16%</td>
                  <td className="px-3.5 py-2 text-right">3.08%</td>
                  <td className="px-3.5 py-2 text-right">3.88%</td>
                  <td className="px-3.5 py-2 text-right text-red-400">6.58%</td>
                  <td className="px-3.5 py-2 text-center font-sans text-slate-500">Benchmark</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Diebold-Mariano Rationale */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Justifikasi Uji Diebold–Mariano:</strong> Uji signifikansi beda galat (koreksi Harvey-Leybourne-Newbold) membuktikan bahwa 7 model teratas tidak berbeda signifikan secara statistik dari model Drift. Oleh karena itu, estimasi final menggunakan pendekatan *Ensemble Averaging* untuk meminimalkan risiko salah spesifikasi model individual.
        </div>
      </div>
    </div>
  );
};
