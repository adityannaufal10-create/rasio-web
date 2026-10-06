"use client";

import React from "react";
import { Activity, BarChart2, Compass, Layers, Sliders, TrendingUp } from "lucide-react";
import FeaturesWithPanel, { FeatureItem } from "@/components/ui/features-with-panel";
import { Gauge } from "@/components/ui/gauge";
import { CLUSTER_COLORS, FACTS } from "./facts";

function MoranGaugeDetailPreview() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-2">
      <Gauge
        value={0.729}
        min={-0.2}
        max={1.0}
        warning={0.3}
        critical={0.6}
        className="max-w-[220px]"
        unit=" (Kuat)"
      />
      <div className="w-full space-y-2 border-t border-white/10 pt-3">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span>Global Moran's I (2024):</span>
          <span className="font-mono font-bold text-emerald-400">+0,729</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Ekspektasi Acak E(I):</span>
          <span className="font-mono text-slate-300">-0,023</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Signifikansi Statistik:</span>
          <span className="font-mono font-bold text-emerald-400">p &lt; 0,001 (Pseudo-p)</span>
        </div>
      </div>
      <p className="text-[11.5px] text-slate-400 text-center leading-relaxed">
        Pola emisi alih guna lahan terkonsentrasi sangat kuat secara geografis, menolak independensi spasial.
      </p>
    </div>
  );
}

function ClusterRingDetailPreview() {
  const clusters = [
    { name: "Frontier Konversi", count: 7, color: CLUSTER_COLORS[2], label: "7 Negara ASEAN (70%)" },
    { name: "Padat Penduduk", count: 1, color: CLUSTER_COLORS[4], label: "Filipina (10%)" },
    { name: "Industri Mapan", count: 1, color: CLUSTER_COLORS[0], label: "Singapura (10%)" },
    { name: "Peternakan Ekstensif", count: 1, color: CLUSTER_COLORS[1], label: "Brunei (10%)" },
  ];

  return (
    <div className="flex w-full flex-col gap-4 py-1">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span className="font-semibold text-white">Konsentrasi ASEAN-10:</span>
        <span className="font-mono text-emerald-400 font-bold">70% Klaster Frontier</span>
      </div>

      <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-800 p-0.5 border border-white/10">
        <div style={{ width: "70%", backgroundColor: CLUSTER_COLORS[2] }} className="rounded-l-full shadow-sm" title="Klaster 2 (Frontier)" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[4] }} title="Klaster 4" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[0] }} title="Klaster 0" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[1] }} className="rounded-r-full" title="Klaster 1" />
      </div>

      <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
        {clusters.map((c) => (
          <div key={c.name} className="flex items-center gap-2 rounded-lg bg-slate-800/50 p-2 border border-white/5">
            <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
            <span className="truncate text-[11.5px]">{c.label}</span>
          </div>
        ))}
      </div>

      <p className="text-[11.5px] text-slate-400 leading-relaxed">
        Tujuh negara agraris ASEAN terikat pola deforestasi dan alih guna lahan yang sama: Indonesia, Vietnam, Thailand, Malaysia, Myanmar, Kamboja, dan Laos.
      </p>
    </div>
  );
}

function SpilloverBarDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-4 py-1">
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
            <span>Efek Domestik Langsung</span>
            <span className="text-white font-bold">+0,5011</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: "31%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono text-cyan-400 mb-1">
            <span className="font-semibold">Limpahan Tak Langsung Lintas Batas</span>
            <span className="font-bold">+1,1046 (2,20×)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]" style={{ width: "69%" }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-center text-xs text-cyan-200">
        Total Efek Multiplier LeSage-Pace: <strong className="text-white font-mono text-sm">1,61×</strong>
        <span className="block text-[11px] text-cyan-300/80 mt-1">
          Dampak kebijakan meluas melebihi batas teritorial domestik.
        </span>
      </div>
    </div>
  );
}

function SimulatorSnippetDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-3 py-1">
      <div className="flex items-center justify-between text-xs bg-slate-800/60 p-2.5 rounded-xl border border-white/5">
        <span className="text-slate-300">Rasionalisasi Pupuk N₂O:</span>
        <span className="font-mono text-emerald-400 font-bold text-sm">-25%</span>
      </div>
      <div className="flex items-center justify-between text-xs bg-slate-800/60 p-2.5 rounded-xl border border-white/5">
        <span className="text-slate-300">Moratorium Hutan & Gambut:</span>
        <span className="font-mono text-red-400 font-bold text-sm">-40%</span>
      </div>
      <div className="flex items-center justify-between text-xs bg-slate-800/60 p-2.5 rounded-xl border border-white/5">
        <span className="text-slate-300">Pengairan AWD Padi Sawah:</span>
        <span className="font-mono text-amber-400 font-bold text-sm">-15%</span>
      </div>

      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-xs text-emerald-200">
        Estimasi Penurunan Emisi Kawasan: <strong className="text-white font-mono text-sm">&gt;30 Juta Ton CO₂eq</strong>
      </div>
    </div>
  );
}

function ForecastMiniDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-3 py-1">
      <div className="flex justify-between items-baseline text-xs">
        <span className="text-slate-400">Proyeksi Metana ASEAN 2025–2035</span>
        <span className="font-mono text-purple-400 font-bold">MAPE 1,34% (h=1)</span>
      </div>

      <div className="h-20 w-full rounded-xl bg-slate-950/80 p-2.5 flex items-end justify-between gap-1.5 border border-white/5">
        {[28, 30, 31, 33, 35, 38, 42, 45, 48, 51, 55, 58].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
            <div
              className={`w-full rounded-t transition-all ${
                i > 7 ? "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]" : "bg-slate-600"
              }`}
              style={{ height: `${v}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[11px] text-slate-400 font-mono">
        <span>1990 (Historis)</span>
        <span className="text-purple-400 font-bold">2024 (Titik Pisah)</span>
        <span>2035 (Proyeksi)</span>
      </div>

      <p className="text-[11.5px] text-slate-400 leading-relaxed text-center">
        2.904 fold evaluasi walk-forward mengonfirmasi akurasi ensemble Drift & ARIMA bebas data leakage.
      </p>
    </div>
  );
}

function CountryPanelDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-3 py-1 text-center">
      <div className="text-[36px] font-mono font-bold text-white tabular-nums leading-none">
        {FACTS.countries} <span className="text-[15px] font-sans text-slate-400">Negara</span>
      </div>
      <div className="text-xs text-emerald-400 font-semibold font-mono">
        {FACTS.timeSpan} ({FACTS.years} Tahun Panel)
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
        <div className="rounded-lg bg-slate-800/60 p-2.5 border border-white/5">
          <span className="text-slate-400 block text-[10.5px]">Total Observasi</span>
          <span className="font-bold text-white text-sm">{FACTS.observations}</span>
        </div>
        <div className="rounded-lg bg-slate-800/60 p-2.5 border border-white/5">
          <span className="text-slate-400 block text-[10.5px]">Missing Values</span>
          <span className="font-bold text-emerald-400 text-sm">0 (Nol)</span>
        </div>
      </div>

      <p className="text-[11.5px] text-slate-400 leading-relaxed">
        Seluruh data diverifikasi dengan matriks k-NN (k=4) terstandarisasi baris untuk menjamin kekokohan ekonometrika spasial.
      </p>
    </div>
  );
}

const INSTRUMENT_ITEMS: FeatureItem[] = [
  {
    title: "Autokorelasi Spasial Moran's I (+0,729)",
    subtitle: "Tingkat ketergantungan geografis emisi pangan mencapai +0,729, menolak independensi spasial (p < 0,001).",
    badge: "Moran's I",
    content: <MoranGaugeDetailPreview />,
    actionText: "Buka Ekonometrika Spasial",
    actionHref: "/spasial",
  },
  {
    title: "70% ASEAN di Klaster Frontier Konversi",
    subtitle: "Tujuh negara agraris ASEAN terikat pola deforestasi dan alih guna lahan yang memerlukan kesepakatan regional.",
    badge: "K-Means k=5",
    content: <ClusterRingDetailPreview />,
    actionText: "Lihat Peta Klaster",
    actionHref: "/clustering",
  },
  {
    title: "Limpahan Lintas Batas LeSage-Pace",
    subtitle: "Efek limpahan pupuk N₂O ke tetangga 2,20× lipat efek domestik. Bukti empiris carbon leakage.",
    badge: "Multiplier 1,61×",
    content: <SpilloverBarDetailPreview />,
    actionText: "Dekomposisi SDM",
    actionHref: "/spasial",
  },
  {
    title: "Laboratorium Simulator Intervensi Kebijakan",
    subtitle: "Kalkulasi dinamis mitigasi gas rumah kaca regional melalui tiga pilar intervensi agroekologi terpadu.",
    badge: "Real-Time",
    content: <SimulatorSnippetDetailPreview />,
    actionText: "Buka Simulator Kebijakan",
    actionHref: "/simulator",
  },
  {
    title: "Peramalan Metana ASEAN 2025–2035",
    subtitle: "Model Drift & ARIMA Ensemble teruji bebas bocor pada 2.904 fold evaluasi walk-forward.",
    badge: "Horizon 10 Th",
    content: <ForecastMiniDetailPreview />,
    actionText: "Buka Modul Proyeksi",
    actionHref: "/forecasting",
  },
  {
    title: "Audit Panel Seimbang 44 Negara Asia-Pasifik",
    subtitle: "Struktur data panel seimbang sempurna tanpa estimasi tiruan, menjamin ketelitian ekonometrika.",
    badge: "2.816 Baris",
    content: <CountryPanelDetailPreview />,
    actionText: "Lihat Transparansi Metodologi",
    actionHref: "/metodologi",
  },
];

export default function InstrumentShowcase() {
  return (
    <section id="inside" aria-label="Instrumen Analisis Langsung" className="border-t border-white/10 bg-[#070b14]/50">
      <FeaturesWithPanel
        badge="Instrumen Analitik Live"
        heading="Setiap Layar Adalah Instrumen Ilmiah, Bukan Sekadar Slide."
        description="Enam modul analitis yang terhubung secara terpadu. Pengguna dapat langsung berinteraksi dengan peta spasial, menguji regresi SDM, dan menjalankan simulasi kebijakan iklim ASEAN."
        items={INSTRUMENT_ITEMS}
        aspectRatio="aspect-auto min-h-[440px]"
      />
    </section>
  );
}
