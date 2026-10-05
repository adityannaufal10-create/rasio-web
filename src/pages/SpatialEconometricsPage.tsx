import React, { useState, useEffect } from 'react';
import { MoranTrajectoryChart } from '../components/dashboard/MoranTrajectoryChart';
import { SpilloverChart } from '../components/dashboard/SpilloverChart';
import { SpatialModelTable } from '../components/dashboard/SpatialModelTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { MoranYear, SdmDecomposition, SpatialModel } from '../types/data';
import { Layers, TrendingUp, Award, Image, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SpatialEconometricsPage: React.FC = () => {
  const [moranData, setMoranData] = useState<MoranYear[]>([]);
  const [sdmData, setSdmData] = useState<SdmDecomposition[]>([]);
  const [modelData, setModelData] = useState<SpatialModel[]>([]);
  const [sdmCoefs, setSdmCoefs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/moran_lintasan_tahun.json')
      .then((res) => res.json())
      .then((data) => setMoranData(data))
      .catch((err) => console.error(err));

    fetch('/data/dekomposisi_efek_sdm.json')
      .then((res) => res.json())
      .then((data) => setSdmData(data))
      .catch((err) => console.error(err));

    fetch('/data/model_spasial_perbandingan.json')
      .then((res) => res.json())
      .then((data) => setModelData(data))
      .catch((err) => console.error(err));

    fetch('/data/sdm_koefisien.json')
      .then((res) => res.json())
      .then((data) => setSdmCoefs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
            Ekonometrika Spasial Lanjut
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Spatial Durbin Model (SDM) · Time-Fixed Effects
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Layers className="size-6 text-cyan-400" />
          <span>Autokorelasi Spasial & Limpahan Lintas Batas LeSage–Pace</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Menjawab apakah tekanan emisi alih guna lahan (LUC) suatu negara dipengaruhi oleh intensitas input pupuk (N₂O), ternak/padi (CH₄), dan energi di negara-negara tetangga.
        </p>
      </div>

      {/* Row 1: Moran Trajectory & Spillover Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoranTrajectoryChart data={moranData} />
        <SpilloverChart data={sdmData} />
      </div>

      {/* Row 2: Model Comparison (OLS vs SLX vs SAR vs SEM vs SDM) */}
      <section>
        <SpatialModelTable models={modelData} />
      </section>

      {/* Row 3: SDM Coefficients Table Card */}
      <section>
        <Card className="overflow-hidden">
          <CardHeader className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <span>Estimasi Parameter Spatial Durbin Model (SDM)</span>
              </CardTitle>
              <CardDescription className="mt-1">
                Seluruh koefisien signifikan pada aras signifikansi 1% (p &lt; 0.001) dengan efek tetap waktu.
              </CardDescription>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit shrink-0">
              ρ Spasial = +0.516
            </span>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950/90 border-b border-white/10 text-slate-400 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="px-4 py-3 font-sans">Variabel Prediktor</th>
                    <th className="px-4 py-3 font-sans">Tipe Pengaruh</th>
                    <th className="px-4 py-3 text-right">Koefisien (β)</th>
                    <th className="px-4 py-3 text-right">t-Statistik</th>
                    <th className="px-4 py-3 text-center">P-Value</th>
                    <th className="px-4 py-3 font-sans">Interpretasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sdmCoefs.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 text-slate-200 transition-colors">
                      <td className="px-4 py-3 font-sans font-bold text-white">{c.variabel}</td>
                      <td className="px-4 py-3 font-sans">
                        <span
                          className={cn(
                            "text-[10.5px] px-2.5 py-0.5 rounded-full font-semibold border",
                            c.tipe.includes('Limpahan')
                              ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                              : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          )}
                        >
                          {c.tipe}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-400 text-[13px]">
                        {c.beta > 0 ? `+${c.beta.toFixed(4)}` : c.beta.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-right">{c.t_stat.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center text-teal-400 font-bold">{c.p_val}</td>
                      <td className="px-4 py-3 font-sans text-slate-400 text-[11.5px] leading-snug">
                        {c.variabel.includes('N2O') && c.tipe.includes('Limpahan')
                          ? 'Limpahan pupuk tetangga memicu ekspansi lahan regional'
                          : c.variabel.includes('Metana') && c.tipe.includes('Limpahan')
                          ? 'Metana tetangga berasosiasi negatif (spesialisasi komoditas)'
                          : 'Elastisitas respon langsung terhadap konversi lahan'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Row 4: SVG Vektor Riset Spasial */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="text-center overflow-hidden">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-sm font-bold text-white">
              Diagram Pencar Moran (Moran Scatterplot 2024)
            </CardTitle>
            <CardDescription>
              Pemisahan kuadran High-High, Low-High, Low-Low, dan High-Low terhadap lag spasial Wz.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/5">
              <img
                src="/figures/04_pencar_moran.svg"
                alt="Moran Scatterplot"
                className="max-h-[340px] mx-auto rounded-xl shadow-md"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="text-center overflow-hidden">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-sm font-bold text-white">
              Visualisasi Dekomposisi Efek SDM
            </CardTitle>
            <CardDescription>
              Perbandingan visual rasio limpahan tak langsung versus dampak langsung domestik.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/5">
              <img
                src="/figures/08_dekomposisi_efek.svg"
                alt="Dekomposisi Efek SDM"
                className="max-h-[340px] mx-auto rounded-xl shadow-md"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
