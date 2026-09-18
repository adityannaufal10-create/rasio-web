import React from 'react';
import { PolicySimulator } from '../components/dashboard/PolicySimulator';
import { Sliders, ShieldCheck, AlertTriangle, Lightbulb, Users, Compass } from 'lucide-react';

export const PolicySimulatorPage: React.FC = () => {
  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
            Alat Pengambilan Keputusan
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Integrasi Parameter SDM LeSage–Pace
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Sliders className="w-6 h-6 text-amber-400" />
          <span>Laboratorium Intervensi & Dampak Limpahan Kawasan</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Simulasikan berbagai skenario efisiensi input pertanian, perlindungan hutan, dan pengairan sawah untuk mengukur dampak gabungan ke tingkat regional ASEAN.
        </p>
      </div>

      {/* Simulator Widget */}
      <PolicySimulator />

      {/* Strategic Policy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Rasionalisasi Pupuk Nitrogen</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Karena elastisitas limpahan N₂O adalah <strong className="text-cyan-300">+1.1046</strong>, subsidi pupuk yang tidak efisien di satu negara menciptakan efek persaingan harga yang mendorong perluasan lahan di negara tetangga. ASEAN memerlukan regulasi batas atas intensitas pupuk berbasis ekologis.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Koridor Hutan Lintas Batas</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tujuh negara ASEAN berada dalam satu klaster <strong className="text-red-300">Frontier Konversi Lahan</strong>. Moratorium deforestasi sepihak di Indonesia tanpa koordinasi dengan Malaysia dan Indocina hanya akan menggeser deforestasi ke wilayah frontier tetangga (*leakage effect*).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Pendanaan Transisi Adil</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Singapura yang berada di klaster industri rendah-lahan mengimpor sebagian besar pangannya dari negara-negara Frontier. Mekanisme pendanaan bersama (*ASEAN Green Agri-Fund*) harus dibentuk agar negara pengimpor ikut membiayai transisi hijau produsen pangan.
          </p>
        </div>
      </div>
    </div>
  );
};
