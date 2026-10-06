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
            <span>Panel Spatial Econometric Specification & Diagnostic Benchmark</span>
          </CardTitle>
          <CardDescription className="mt-1">
            Comparative model evaluation with time-fixed effects across 2,816 balanced panel observations.
          </CardDescription>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit shrink-0">
          Selected Specification: SDM
        </span>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[680px]">
            <thead className="bg-slate-950/90 border-b border-white/10 text-slate-400 uppercase font-semibold text-[11px]">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Model</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Parameters</th>
                <th className="px-4 py-3 text-right whitespace-nowrap">Log-Likelihood</th>
                <th className="px-4 py-3 text-right whitespace-nowrap">AIC (Selection Criterion)</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Spatial Lag (ρ / λ)</th>
                <th className="px-4 py-3 text-right whitespace-nowrap">Pseudo R²</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Status</th>
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
                  <td className="px-4 py-3 font-sans font-bold flex items-center gap-1.5 whitespace-nowrap">
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
                  <td className="px-4 py-3 text-center font-sans whitespace-nowrap">
                    {m.selected ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm shadow-emerald-950/30">
                        <CheckCircle2 className="size-3" />
                        Selected (Min AIC)
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
              <strong className="text-white">Likelihood Ratio (LR) Tests:</strong> SAR vs OLS = 783.5 · SEM vs OLS = 795.6 · SDM vs SAR = 102.7 (all p &lt; 0.001 against critical χ² 5% = 3.84). Residual Moran's I is statistically significant in only 2 of 64 panel years (3%), validating that spatial error dependency is exhaustively absorbed by the SDM specification.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
