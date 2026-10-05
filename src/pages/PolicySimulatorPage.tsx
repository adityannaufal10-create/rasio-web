import React from 'react';
import { PolicySimulator } from '../components/dashboard/PolicySimulator';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Sliders, ShieldCheck, AlertTriangle, Lightbulb, Users, Compass } from 'lucide-react';

export const PolicySimulatorPage: React.FC = () => {
  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
            Alat Pengambilan Keputusan
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Integrasi Parameter SDM LeSage–Pace
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Sliders className="size-6 text-amber-400" />
          <span>Laboratorium Intervensi & Dampak Limpahan Kawasan</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Simulasikan berbagai skenario efisiensi input pertanian, perlindungan hutan, dan pengairan sawah untuk mengukur dampak gabungan ke tingkat regional ASEAN.
        </p>
      </div>

      {/* Simulator Widget */}
      <PolicySimulator />

      {/* Strategic Policy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:-translate-y-1 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-950/20">
          <CardHeader className="p-5 sm:p-6 pb-2">
            <div className="size-11 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-3">
              <Lightbulb className="size-5" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Rasionalisasi Pupuk Nitrogen
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-1">
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              Karena elastisitas limpahan N₂O adalah <strong className="text-cyan-300 font-mono">+1.1046</strong>, subsidi pupuk yang tidak efisien di satu negara menciptakan efek persaingan harga yang mendorong perluasan lahan di negara tetangga. ASEAN memerlukan regulasi batas atas intensitas pupuk berbasis ekologis.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-all duration-300 hover:border-red-500/40 hover:shadow-red-950/20">
          <CardHeader className="p-5 sm:p-6 pb-2">
            <div className="size-11 rounded-2xl bg-red-500/15 text-red-400 border border-red-500/30 flex items-center justify-center mb-3">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Koridor Hutan Lintas Batas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-1">
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              Tujuh negara ASEAN berada dalam satu klaster <strong className="text-red-300">Frontier Konversi Lahan</strong>. Moratorium deforestasi sepihak di Indonesia tanpa koordinasi dengan Malaysia dan Indocina hanya akan menggeser deforestasi ke wilayah frontier tetangga (*leakage effect*).
            </p>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-all duration-300 hover:border-teal-500/40 hover:shadow-teal-950/20">
          <CardHeader className="p-5 sm:p-6 pb-2">
            <div className="size-11 rounded-2xl bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-3">
              <Users className="size-5" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Pendanaan Transisi Adil
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-1">
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              Singapura yang berada di klaster industri rendah-lahan mengimpor sebagian besar pangannya dari negara-negara Frontier. Mekanisme pendanaan bersama (*ASEAN Green Agri-Fund*) harus dibentuk agar negara pengimpor ikut membiayai transisi hijau produsen pangan.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
