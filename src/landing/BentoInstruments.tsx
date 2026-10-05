import { Activity, BarChart2, Compass, Layers, Sliders, TrendingUp } from "lucide-react";
import { BentoCard, BentoColumn, BentoGrid } from "@/components/ui/bento-grid";
import { Gauge } from "@/components/ui/gauge";
import { CLUSTER_COLORS, FACTS } from "./facts";

function MoranGaugePreview() {
  return (
    <div className="flex w-full flex-col items-center gap-2 py-2">
      <Gauge
        value={0.729}
        min={-0.2}
        max={1.0}
        warning={0.3}
        critical={0.6}
        className="max-w-[190px]"
        unit=" (Kuat)"
      />
      <div className="flex items-center justify-between w-full text-[11.5px] text-slate-400 border-t border-white/5 pt-2">
        <span>Ekspektasi Acak: E(I) = -0,023</span>
        <span className="text-emerald-400 font-mono font-bold">p &lt; 0.001</span>
      </div>
    </div>
  );
}

function ClusterRingPreview() {
  const clusters = [
    { name: "Frontier Konversi", count: 7, color: CLUSTER_COLORS[2], label: "7 ASEAN" },
    { name: "Padat Penduduk", count: 1, color: CLUSTER_COLORS[4], label: "Filipina" },
    { name: "Industri Mapan", count: 1, color: CLUSTER_COLORS[0], label: "Singapura" },
    { name: "Peternakan Ekstensif", count: 1, color: CLUSTER_COLORS[1], label: "Brunei" },
  ];

  return (
    <div className="flex w-full flex-col gap-3 py-1">
      <div className="flex items-center justify-between text-[12px] text-slate-300">
        <span className="font-semibold text-white">Konsentrasi ASEAN-10:</span>
        <span className="font-mono text-emerald-400">70% Frontier</span>
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-800">
        <div style={{ width: "70%", backgroundColor: CLUSTER_COLORS[2] }} title="Klaster 2 (Frontier)" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[4] }} title="Klaster 4" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[0] }} title="Klaster 0" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[1] }} title="Klaster 1" />
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11.5px] text-slate-400">
        {clusters.map((c) => (
          <div key={c.name} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
            <span className="truncate">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpilloverBarPreview() {
  return (
    <div className="flex w-full flex-col gap-3 py-2">
      <div>
        <div className="flex justify-between text-[11.5px] font-mono text-slate-300 mb-1">
          <span>Efek Domestik Langsung</span>
          <span className="text-white font-bold">+0,5011</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-slate-400 rounded-full" style={{ width: "31%" }} />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[11.5px] font-mono text-slate-300 mb-1">
          <span className="text-cyan-400 font-semibold">Limpahan Tak Langsung Lintas Batas</span>
          <span className="text-cyan-400 font-bold">+1,1046 (2,20×)</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" style={{ width: "69%" }} />
        </div>
      </div>

      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-2 text-center text-[11px] text-cyan-300">
        Total Efek Multiplier LeSage-Pace: <strong>1,61×</strong>
      </div>
    </div>
  );
}

function SimulatorSnippetPreview() {
  return (
    <div className="flex w-full flex-col gap-2.5 py-1">
      <div className="flex items-center justify-between text-[12px] bg-slate-800/60 p-2 rounded-lg border border-white/5">
        <span className="text-slate-300">Efisiensi Pupuk N₂O:</span>
        <span className="font-mono text-emerald-400 font-bold">-25%</span>
      </div>
      <div className="flex items-center justify-between text-[12px] bg-slate-800/60 p-2 rounded-lg border border-white/5">
        <span className="text-slate-300">Moratorium Hutan & Gambut:</span>
        <span className="font-mono text-red-400 font-bold">-40%</span>
      </div>
      <div className="flex items-center justify-between text-[12px] bg-slate-800/60 p-2 rounded-lg border border-white/5">
        <span className="text-slate-300">Adopsi AWD Padi Sawah:</span>
        <span className="font-mono text-amber-400 font-bold">-15%</span>
      </div>
    </div>
  );
}

function ForecastMiniPreview() {
  return (
    <div className="flex w-full flex-col gap-2 py-2">
      <div className="flex justify-between items-baseline text-[12px]">
        <span className="text-slate-400">Proyeksi 2025–2035</span>
        <span className="font-mono text-purple-400 font-bold">MAPE 1,34% (h=1)</span>
      </div>
      <div className="h-16 w-full rounded-xl bg-slate-950/70 p-2 flex items-end justify-between gap-1 border border-white/5">
        {[28, 30, 31, 33, 35, 38, 42, 45, 48, 51, 55, 58].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
            <div
              className={`w-full rounded-t ${
                i > 7 ? "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]" : "bg-slate-500"
              }`}
              style={{ height: `${v}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10.5px] text-slate-500 font-mono">
        <span>1990 (Historis)</span>
        <span>2024 (Titik Pisah)</span>
        <span>2035 (Proyeksi)</span>
      </div>
    </div>
  );
}

function CountryPanelPreview() {
  return (
    <div className="flex w-full flex-col gap-2 py-2 text-center">
      <div className="text-[32px] font-mono font-bold text-white tabular-nums leading-none">
        {FACTS.countries} <span className="text-[14px] font-sans text-slate-400">Negara</span>
      </div>
      <div className="text-[13px] text-emerald-400 font-semibold">
        {FACTS.timeSpan} ({FACTS.years} Tahun)
      </div>
      <div className="rounded-lg bg-slate-800/60 p-2 text-[11px] text-slate-300 font-mono">
        {FACTS.observations} Observasi · 0 Missing Values
      </div>
    </div>
  );
}

export default function BentoInstruments() {
  return (
    <section
      id="inside"
      aria-label="Instrumen Analisis Langsung"
      className="relative mx-auto max-w-[1320px] px-4 py-28 sm:px-8"
    >
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Instrumen Analitik Live</span>
          </div>
          <h2 className="mt-2 text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold tracking-tight text-white leading-tight">
            Setiap Layar Adalah Instrumen Ilmiah, Bukan Sekadar Slide.
          </h2>
        </div>
        <p className="max-w-[50ch] text-[15.5px] leading-relaxed text-slate-400">
          Enam modul analitis yang terhubung secara terpadu. Pengguna dapat langsung berinteraksi dengan peta spasial, menguji regresi SDM, dan menjalankan simulasi kebijakan iklim ASEAN.
        </p>
      </div>

      <BentoGrid>
        <BentoColumn>
          <BentoCard
            name="Autokorelasi Spasial Moran's I"
            Icon={Compass}
            href="/spasial"
            cta="Buka Ekonometrika Spasial"
            description="Tingkat ketergantungan geografis emisi pangan mencapai +0,729, menolak independensi spasial (p < 0,001)."
            background={<MoranGaugePreview />}
          />
          <BentoCard
            name="70% ASEAN di Klaster Frontier"
            Icon={Layers}
            href="/clustering"
            cta="Lihat Peta Klaster"
            description="Tujuh negara agraris ASEAN terikat pola deforestasi dan alih guna lahan yang memerlukan kesepakatan regional bersama."
            background={<ClusterRingPreview />}
          />
        </BentoColumn>

        <BentoColumn>
          <BentoCard
            name="Limpahan Lintas Batas LeSage-Pace"
            Icon={Activity}
            href="/spasial"
            cta="Dekomposisi SDM"
            description="Efek limpahan pupuk N₂O ke negara tetangga lebih dari 2× efek domestik. Bukti nyata carbon leakage."
            background={<SpilloverBarPreview />}
          />
          <BentoCard
            name="Laboratorium Simulator Intervensi"
            Icon={Sliders}
            href="/simulator"
            cta="Buka Simulator Kebijakan"
            description="Kalkulasi dinamis mitigasi gas rumah kaca regional melalui tiga pilar intervensi agroekologi terpadu."
            background={<SimulatorSnippetPreview />}
          />
        </BentoColumn>

        <BentoColumn>
          <BentoCard
            name="Peramalan Metana ASEAN 2025–2035"
            Icon={TrendingUp}
            href="/forecasting"
            cta="Buka Modul Proyeksi"
            description="Model Drift & ARIMA Ensemble teruji bebas bocor pada 2.904 fold evaluasi walk-forward."
            background={<ForecastMiniPreview />}
          />
          <BentoCard
            name="Audit Panel Seimbang 44 Negara"
            Icon={BarChart2}
            href="/metodologi"
            cta="Lihat Transparansi Metodologi"
            description="Struktur data panel seimbang sempurna tanpa estimasi tiruan, menjamin ketelitian ekonometrika."
            background={<CountryPanelPreview />}
          />
        </BentoColumn>
      </BentoGrid>
    </section>
  );
}
