import React from 'react';
import { SpatialModel } from '../../types/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { CheckCircle2, Award, Info } from 'lucide-react';

interface SpatialModelTableProps {
  models: SpatialModel[];
}

export const SpatialModelTable: React.FC<SpatialModelTableProps> = ({ models }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Award className="size-5 text-amber-400" />
            <span>Spesifikasi & Kinerja Ekonometrika Spasial Panel</span>
          </CardTitle>
          <CardDescription className="mt-1">
            Evaluasi komparatif model dengan efek tetap waktu (Time-Fixed Effects) pada 2.816 observasi panel.
          </CardDescription>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit shrink-0">
          Model Terpilih: SDM
        </span>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/90 border-b border-white/10 text-slate-400 uppercase font-semibold text-[11px]">
              <tr>
                <th className="px-4 py-3">Model</th>
                <th className="px-4 py-3 text-center">Parameter</th>
                <th className="px-4 py-3 text-right">Log-Likelihood</th>
                <th className="px-4 py-3 text-right">AIC (Kriteria Seleksi)</th>
                <th className="px-4 py-3 text-center">Spasial (ρ / λ)</th>
                <th className="px-4 py-3 text-right">Pseudo R²</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {models.map((m) => (
                <tr
                  key={m.model}
                  className={
                    m.selected
                      ? 'bg-emerald-500/10 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800/40 transition-colors'
                  }
                >
                  <td className="px-4 py-3 font-sans font-bold flex items-center gap-1.5">
                    <span>{m.model}</span>
                  </td>
                  <td className="px-4 py-3 text-center">{m.par}</td>
                  <td className="px-4 py-3 text-right">{m.logLik.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={m.selected ? 'text-emerald-400 font-extrabold text-[13px]' : ''}>
                      {m.aic.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {typeof m.rho_lambda === 'number' ? m.rho_lambda.toFixed(3) : m.rho_lambda}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={m.selected ? 'text-emerald-400 font-bold' : ''}>
                      {(m.r2 * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-sans">
                    {m.selected ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm shadow-emerald-950/30">
                        <CheckCircle2 className="size-3" />
                        Terpilih (AIC Minimum)
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">Baseline</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 sm:p-5 border-t border-white/5 bg-slate-950/40">
          <div className="p-3.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Uji Rasio Likelihood (LR):</strong> SAR vs OLS = 783.5 · SEM vs OLS = 795.6 · SDM vs SAR = 102.7 (semua p &lt; 0.001 terhadap χ² 5% = 3.84). Residual Moran's I hanya signifikan pada 2 dari 64 tahun (3%), membuktikan ketergantungan spasial terserap sempurna dalam model SDM.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
