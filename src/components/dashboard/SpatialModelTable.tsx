import React from 'react';
import { SpatialModel } from '../../types/data';
import { CheckCircle2, Award, Info } from 'lucide-react';

interface SpatialModelTableProps {
  models: SpatialModel[];
}

export const SpatialModelTable: React.FC<SpatialModelTableProps> = ({ models }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Spesifikasi & Kinerja Ekonometrika Spasial Panel</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluasi model dengan efek tetap waktu (Time-Fixed Effects) pada 2.816 observasi.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Model Terpilih: SDM
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-semibold">
            <tr>
              <th className="px-3.5 py-2.5">Model</th>
              <th className="px-3.5 py-2.5 text-center">Parameter</th>
              <th className="px-3.5 py-2.5 text-right">Log-Likelihood</th>
              <th className="px-3.5 py-2.5 text-right">AIC (Kriteria Seleksi)</th>
              <th className="px-3.5 py-2.5 text-center">Spasial (ρ / λ)</th>
              <th className="px-3.5 py-2.5 text-right">Pseudo R²</th>
              <th className="px-3.5 py-2.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {models.map((m) => (
              <tr
                key={m.model}
                className={
                  m.selected
                    ? 'bg-emerald-500/10 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800/40'
                }
              >
                <td className="px-3.5 py-2.5 font-sans font-bold flex items-center gap-1.5">
                  <span>{m.model}</span>
                </td>
                <td className="px-3.5 py-2.5 text-center">{m.par}</td>
                <td className="px-3.5 py-2.5 text-right">{m.logLik.toFixed(1)}</td>
                <td className="px-3.5 py-2.5 text-right">
                  <span className={m.selected ? 'text-emerald-400 font-extrabold' : ''}>
                    {m.aic.toFixed(1)}
                  </span>
                </td>
                <td className="px-3.5 py-2.5 text-center">
                  {typeof m.rho_lambda === 'number' ? m.rho_lambda.toFixed(3) : m.rho_lambda}
                </td>
                <td className="px-3.5 py-2.5 text-right">
                  <span className={m.selected ? 'text-emerald-400' : ''}>
                    {(m.r2 * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="px-3.5 py-2.5 text-center font-sans">
                  {m.selected ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3" />
                      Terpilih (AIC Minimum)
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Baseline</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          <strong>Uji Rasio Likelihood (LR):</strong> SAR vs OLS = 783.5 · SEM vs OLS = 795.6 · SDM vs SAR = 102.7 (semua p &lt; 0.001 terhadap χ² 5% = 3.84). Residual Moran's I hanya signifikan pada 2 dari 64 tahun (3%), membuktikan ketergantungan spasial terserap sempurna dalam model SDM.
        </p>
      </div>
    </div>
  );
};
