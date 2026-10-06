"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Database, Layers, ArrowRight } from "lucide-react";
import FeaturesWithPanel, { FeatureItem } from "@/components/ui/features-with-panel";
import { FACTS, CLUSTER_COLORS } from "./facts";

function OlsVsSdmComparisonPreview() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          Uji Kelayakan Model Ekonometrika
        </span>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
          ΔAIC = -260,3
        </span>
      </div>

      <div className="space-y-3">
        {/* OLS Card */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="size-3.5" />
              Model Linear Standar (OLS)
            </span>
            <span className="font-mono text-xs text-slate-400">AIC: 5.012,3</span>
          </div>
          <p className="mt-1 text-[11.5px] text-slate-400 leading-relaxed">
            Mengasumsikan wilayah bersifat otonom. Tidak mampu mendeteksi dampak limpahan tetangga.
          </p>
        </div>

        {/* SDM Card */}
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 shadow-lg shadow-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              Spatial Durbin Model (SDM) Time-FE
            </span>
            <span className="font-mono text-xs font-bold text-emerald-400">AIC: 4.752,0</span>
          </div>
          <p className="mt-1 text-[11.5px] text-slate-300 leading-relaxed">
            Memasukkan spatial lag dependen dan independen. Uji Likelihood Ratio menolak OLS (p &lt; 0.001).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs pt-1">
        <div className="rounded-lg bg-slate-800/60 p-2 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-sans">Autoregresif Spasial (ρ)</span>
          <span className="font-bold text-white text-sm">+0,516</span>
          <span className="text-[10px] text-emerald-400 block">p &lt; 0.001</span>
        </div>
        <div className="rounded-lg bg-slate-800/60 p-2 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-sans">Bobot Spasial W</span>
          <span className="font-bold text-white text-sm">k-NN (k=4)</span>
          <span className="text-[10px] text-cyan-400 block">Robust Geodesic</span>
        </div>
      </div>
    </div>
  );
}

function CarbonLeakageEvidencePreview() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          Dekomposisi LeSage–Pace (Pupuk N₂O)
        </span>
        <span className="font-mono text-xs font-bold text-cyan-400">Rasio 2,20×</span>
      </div>

      <div className="space-y-3.5">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-300">Efek Langsung Domestik:</span>
            <span className="font-bold text-white">+0,5011 (31%)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: "31%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-cyan-400 font-semibold">Limpahan Tak Langsung Lintas Batas:</span>
            <span className="font-bold text-cyan-400">+1,1046 (69%)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]" style={{ width: "69%" }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-xs text-slate-300 leading-relaxed">
        <strong className="text-cyan-300">Temuan Kunci:</strong> Kebijakan unilateral pemangkasan subsidi pupuk tanpa koordinasi regional memicu pergeseran ekspansi lahan ke negara tetangga (*carbon leakage*).
      </div>
    </div>
  );
}

function BalancedPanelPreview() {
  return (
    <div className="flex w-full flex-col gap-4 text-center">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-left">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          Matriks Data Panel Seimbang
        </span>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
          Zero Missing
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-800/60 p-3 border border-white/5">
          <span className="font-mono text-2xl font-bold text-white block">44</span>
          <span className="text-xs text-slate-400">Negara Asia-Pasifik</span>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-3 border border-white/5">
          <span className="font-mono text-2xl font-bold text-emerald-400 block">64</span>
          <span className="text-xs text-slate-400">Tahun (1961–2024)</span>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-3 border border-white/5">
          <span className="font-mono text-2xl font-bold text-cyan-400 block">2.816</span>
          <span className="text-xs text-slate-400">Total Observasi Panel</span>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-3 border border-white/5">
          <span className="font-mono text-2xl font-bold text-purple-400 block">4</span>
          <span className="text-xs text-slate-400">Dimensi Emisi Pangan</span>
        </div>
      </div>

      <p className="text-[11.5px] text-slate-400 text-left leading-relaxed">
        Mengintegrasikan data resmi FAOSTAT, CAIT Climate Watch, dan Bank Dunia dengan verifikasi konsistensi tanpa interpolasi sintetik.
      </p>
    </div>
  );
}

function AseanClusterHomogeneityPreview() {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          K-Means Clustering (k=5)
        </span>
        <span className="rounded-full bg-red-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-red-400 border border-red-500/30">
          Silhouette 0,5336
        </span>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-red-300">Klaster 2: Frontier Konversi Lahan</span>
          <span className="font-mono text-xs font-bold text-white">7 dari 10 ASEAN</span>
        </div>
        <p className="mt-1.5 text-[11.5px] text-slate-300 leading-relaxed">
          Indonesia, Vietnam, Thailand, Malaysia, Myanmar, Kamboja, dan Laos memiliki karakteristik struktural emisi pangan yang serupa: deforestasi intensif dan ekspansi lahan.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-sans">Pangsa Lahan</span>
          <span className="font-bold text-white">22,78%</span>
        </div>
        <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-sans">Indonesia LUC</span>
          <span className="font-bold text-red-400">12,57%</span>
        </div>
        <div className="rounded-lg bg-slate-800/50 p-2 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-sans">Stabilitas ARI</span>
          <span className="font-bold text-emerald-400">0,973</span>
        </div>
      </div>
    </div>
  );
}

function RegionalCompactPreview() {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
          Implikasi Solutif: ASEAN Climate Compact
        </span>
        <span className="font-mono text-xs font-bold text-emerald-400">Mitigasi Terpadu</span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2.5 rounded-lg bg-slate-800/50 p-2.5 border border-white/5">
          <span className="size-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
          <p className="text-slate-300">
            <strong className="text-white">Standar Pupuk Regional:</strong> Mencegah persaingan harga komoditas pangan yang mendorong eksploitasi pupuk kimia.
          </p>
        </div>
        <div className="flex items-start gap-2.5 rounded-lg bg-slate-800/50 p-2.5 border border-white/5">
          <span className="size-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
          <p className="text-slate-300">
            <strong className="text-white">Moratorium Lintas Batas:</strong> Melindungi koridor ekologis hutan hujan tropis dari pergeseran deforestasi.
          </p>
        </div>
        <div className="flex items-start gap-2.5 rounded-lg bg-slate-800/50 p-2.5 border border-white/5">
          <span className="size-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
          <p className="text-slate-300">
            <strong className="text-white">ASEAN Agri-Fund:</strong> Negara pengimpor (Singapura) ikut membiayai transisi hijau negara produsen (Frontier).
          </p>
        </div>
      </div>
    </div>
  );
}

const WHY_ITEMS: FeatureItem[] = [
  {
    title: "Regresi Tradisional Gagal Mendeteksi Ruang",
    subtitle: "Uji Likelihood Ratio membuktikan model OLS bias karena mengabaikan dependensi spasial (p < 0,001).",
    badge: "SDM vs OLS",
    content: <OlsVsSdmComparisonPreview />,
    actionText: "Buka Ekonometrika Spasial",
    actionHref: "/spasial",
  },
  {
    title: "Kebocoran Karbon (Carbon Leakage) Bernilai 2,20×",
    subtitle: "Limpahan tak langsung pupuk N₂O (+1,1046) melampaui efek domestik (+0,5011) ke negara tetangga.",
    badge: "LeSage-Pace",
    content: <CarbonLeakageEvidencePreview />,
    actionText: "Periksa Dekomposisi Efek",
    actionHref: "/spasial",
  },
  {
    title: "Struktur Panel Seimbang 44 Negara × 64 Tahun",
    subtitle: "2.816 observasi murni 1961–2024 tanpa nilai hilang, menjamin kekokohan inferensi statistik.",
    badge: "2.816 Observasi",
    content: <BalancedPanelPreview />,
    actionText: "Lihat Transparansi Metodologi",
    actionHref: "/metodologi",
  },
  {
    title: "70% Negara ASEAN Terkunci di Klaster Frontier",
    subtitle: "Tujuh dari sepuluh negara ASEAN terikat masalah deforestasi dan alih guna lahan yang sama.",
    badge: "Silhouette 0,5336",
    content: <AseanClusterHomogeneityPreview />,
    actionText: "Lihat Peta Klaster",
    actionHref: "/clustering",
  },
  {
    title: "Urgensi Tata Kelola Kebijakan Iklim Kawasan",
    subtitle: "Target NDC domestik yang terisolasi gagal tanpa harmonisasi agroekologi ASEAN terpadu.",
    badge: "Solusi Kebijakan",
    content: <RegionalCompactPreview />,
    actionText: "Coba Simulator Intervensi",
    actionHref: "/simulator",
  },
];

export default function WhyGrainSection() {
  return (
    <section id="why-grain" className="border-t border-white/10 bg-[#070b14]/70">
      <FeaturesWithPanel
        badge="Urgensi Saintifik & Analisis Paradoks"
        heading="Mengapa Ekonometrika Spasial Mutlak Dibutuhkan?"
        description="Riset iklim konvensional berasumsi bahwa batas negara membatasi emisi. Lima bukti empiris berikut membuktikan mengapa pendekatan regional GRAIN adalah kunci menghentikan kebocoran karbon."
        items={WHY_ITEMS}
        aspectRatio="aspect-auto min-h-[440px]"
      />
    </section>
  );
}
