import React, { useState } from 'react';
import { Sliders, ShieldCheck, Zap, Globe2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

export const PolicySimulator: React.FC = () => {
  const [fertilizerReduction, setFertilizerReduction] = useState<number>(20);
  const [landProtection, setLandProtection] = useState<number>(15);
  const [methaneEfficiency, setMethaneEfficiency] = useState<number>(10);

  // Math based on SDM LeSage-Pace decomposition:
  const n2oDirectImpact = (fertilizerReduction * 0.5011 * 0.45).toFixed(2);
  const n2oSpilloverImpact = (fertilizerReduction * 1.1046 * 0.45).toFixed(2);
  const n2oTotalImpact = (parseFloat(n2oDirectImpact) + parseFloat(n2oSpilloverImpact)).toFixed(2);

  const methaneDirectImpact = (methaneEfficiency * 0.3486 * 0.35).toFixed(2);

  const totalAseanMtCo2eSaved = (
    (parseFloat(n2oTotalImpact) + parseFloat(methaneDirectImpact) + landProtection * 1.8) *
    1.42
  ).toFixed(1);

  return (
    <Card>
      <CardHeader className="p-5 sm:p-6 pb-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 space-y-0">
        <div>
          <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Laboratorium Kebijakan Spasial
          </span>
          <CardTitle className="text-lg sm:text-xl font-bold text-white mt-2 flex items-center gap-2">
            <Sliders className="size-5 text-emerald-400" />
            <span>Simulator Kebijakan & Limpahan Lintas Batas ASEAN</span>
          </CardTitle>
          <CardDescription className="mt-1">
            Simulasikan intervensi agrikultur di negara-negara Frontier (Indonesia, Vietnam, Thailand, Kamboja, Laos, Myanmar, Malaysia) dan lihat dampaknya secara simultan ke kawasan.
          </CardDescription>
        </div>

        <div className="bg-slate-950/80 px-4 py-3 rounded-2xl border border-white/10 text-left md:text-right shrink-0">
          <span className="text-[10px] text-slate-400 block uppercase font-mono">Estimasi Mitigasi Kawasan:</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tracking-tight">
            ~{totalAseanMtCo2eSaved} <span className="text-xs font-sans text-slate-300 font-normal">Juta Ton CO₂eq/th</span>
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sliders Area (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Slider 1: N2O */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2.5 transition-all hover:border-white/10">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>1. Efisiensi & Pengurangan Pupuk N₂O</span>
                  <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                    Multiplier 1.61×
                  </span>
                </label>
                <span className="font-mono text-emerald-400 font-black text-base">{fertilizerReduction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={fertilizerReduction}
                onChange={(e) => setFertilizerReduction(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10.5px] text-slate-500 font-mono">
                <span>0% (Status Quo)</span>
                <span>25% (Rasionalisasi)</span>
                <span>50% (Target Agroekologi)</span>
              </div>
            </div>

            {/* Slider 2: Moratorium Lahan */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2.5 transition-all hover:border-white/10">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>2. Moratorium Konversi Hutan Primer & Gambut</span>
                  <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono border border-red-500/30">
                    Frontier
                  </span>
                </label>
                <span className="font-mono text-emerald-400 font-black text-base">{landProtection}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={landProtection}
                onChange={(e) => setLandProtection(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10.5px] text-slate-500 font-mono">
                <span>0% (Bebas)</span>
                <span>25% (Sertifikasi Lahan)</span>
                <span>50% (Nol Deforestasi)</span>
              </div>
            </div>

            {/* Slider 3: Methane Persawahan */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2.5 transition-all hover:border-white/10">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>3. Adopsi AWD (Pengairan Berselang) Padi Sawah</span>
                  <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono border border-teal-500/30">
                    CH₄
                  </span>
                </label>
                <span className="font-mono text-emerald-400 font-black text-base">{methaneEfficiency}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={methaneEfficiency}
                onChange={(e) => setMethaneEfficiency(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10.5px] text-slate-500 font-mono">
                <span>0% (Genangan)</span>
                <span>25% (Berselang)</span>
                <span>50% (Presisi)</span>
              </div>
            </div>
          </div>

          {/* Real-time Calculation Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Kalkulasi Dekomposisi Efek LeSage–Pace
              </h4>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs">
                  <span className="text-slate-300 font-medium">Dampak Domestik (Langsung):</span>
                  <span className="font-mono font-bold text-emerald-400">-{n2oDirectImpact}% koef</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
                  <span className="text-cyan-200 font-semibold">Limpahan ke Tetangga (Tak Langsung):</span>
                  <span className="font-mono font-bold text-cyan-400">-{n2oSpilloverImpact}% koef</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs">
                  <span className="text-purple-200 font-bold">Total Efek Multiplier Pupuk:</span>
                  <span className="font-mono font-bold text-purple-300">-{n2oTotalImpact}% koef</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <h5 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>Rekomendasi Kebijakan Rasional</span>
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Karena efek limpahan pupuk N₂O (<span className="text-white font-mono">+1.1046</span>) dua kali lebih besar dari dampak domestik, insentif reduksi pupuk di Indonesia atau Vietnam akan secara otomatis menurunkan tekanan alih fungsi lahan di negara tetangga melalui integrasi pasar input pertanian.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
