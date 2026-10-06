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
        unit=" (Strong)"
      />
      <div className="flex items-center justify-between w-full text-[11.5px] text-slate-400 border-t border-white/5 pt-2">
        <span>Random Expectation: E(I) = -0.023</span>
        <span className="text-emerald-400 font-mono font-bold">p &lt; 0.001</span>
      </div>
    </div>
  );
}

function ClusterRingPreview() {
  const clusters = [
    { name: "Land Frontier", count: 7, color: CLUSTER_COLORS[2], label: "7 ASEAN" },
    { name: "High-Density Agrarian", count: 1, color: CLUSTER_COLORS[4], label: "Philippines" },
    { name: "Established Industrial", count: 1, color: CLUSTER_COLORS[0], label: "Singapore" },
    { name: "Extensive Pastoral", count: 1, color: CLUSTER_COLORS[1], label: "Brunei" },
  ];

  return (
    <div className="flex w-full flex-col gap-3 py-1">
      <div className="flex items-center justify-between text-[12px] text-slate-300">
        <span className="font-semibold text-white">ASEAN-10 Concentration:</span>
        <span className="font-mono text-emerald-400">70% Frontier</span>
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-800">
        <div style={{ width: "70%", backgroundColor: CLUSTER_COLORS[2] }} title="Cluster 2 (Land Frontier)" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[4] }} title="Cluster 4" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[0] }} title="Cluster 0" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[1] }} title="Cluster 1" />
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
          <span>Direct Domestic Impact</span>
          <span className="text-white font-bold">+0.5011</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-slate-400 rounded-full" style={{ width: "31%" }} />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-[11.5px] font-mono text-slate-300 mb-1">
          <span className="text-cyan-400 font-semibold">Indirect Transboundary Spillover</span>
          <span className="text-cyan-400 font-bold">+1.1046 (2.20×)</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" style={{ width: "69%" }} />
        </div>
      </div>

      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-2 text-center text-[11px] text-cyan-300">
        Total LeSage–Pace Multiplier Effect: <strong>1.61×</strong>
      </div>
    </div>
  );
}

function SimulatorSnippetPreview() {
  return (
    <div className="flex w-full flex-col gap-2.5 py-1">
      <div className="flex items-center justify-between text-[12px] bg-slate-800/60 p-2 rounded-lg border border-white/5">
        <span className="text-slate-300">N₂O Fertilizer Efficiency:</span>
        <span className="font-mono text-emerald-400 font-bold">-25%</span>
      </div>
      <div className="flex items-center justify-between text-[12px] bg-slate-800/60 p-2 rounded-lg border border-white/5">
        <span className="text-slate-300">Forest & Peatland Moratorium:</span>
        <span className="font-mono text-red-400 font-bold">-40%</span>
      </div>
      <div className="flex items-center justify-between text-[12px] bg-slate-800/60 p-2 rounded-lg border border-white/5">
        <span className="text-slate-300">Paddy AWD Water Management:</span>
        <span className="font-mono text-amber-400 font-bold">-15%</span>
      </div>
    </div>
  );
}

function ForecastMiniPreview() {
  return (
    <div className="flex w-full flex-col gap-2 py-2">
      <div className="flex justify-between items-baseline text-[12px]">
        <span className="text-slate-400">Projections 2025–2035</span>
        <span className="font-mono text-purple-400 font-bold">MAPE 1.34% (h=1)</span>
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
        <span>1990 (Historical)</span>
        <span>2024 (Split)</span>
        <span>2035 (Forecast)</span>
      </div>
    </div>
  );
}

function CountryPanelPreview() {
  return (
    <div className="flex w-full flex-col gap-2 py-2 text-center">
      <div className="text-[32px] font-mono font-bold text-white tabular-nums leading-none">
        {FACTS.countries} <span className="text-[14px] font-sans text-slate-400">Economies</span>
      </div>
      <div className="text-[13px] text-emerald-400 font-semibold">
        {FACTS.timeSpan} ({FACTS.years} Years)
      </div>
      <div className="rounded-lg bg-slate-800/60 p-2 text-[11px] text-slate-300 font-mono">
        {FACTS.observations} Observations · 0 Missing
      </div>
    </div>
  );
}

export default function BentoInstruments() {
  return (
    <section
      id="inside"
      aria-label="Live Analytical Instruments"
      className="relative mx-auto max-w-[1320px] px-4 py-28 sm:px-8"
    >
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Analytical Instruments</span>
          </div>
          <h2 className="mt-2 text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold tracking-tight text-white leading-tight">
            Every Screen Is a Scientific Instrument, Not Static Slides.
          </h2>
        </div>
        <p className="max-w-[50ch] text-[15.5px] leading-relaxed text-slate-400">
          Six interconnected analytical modules. Users can directly interact with spatial cartography, verify SDM regressions, and execute ASEAN regional climate simulations.
        </p>
      </div>

      <BentoGrid>
        <BentoColumn>
          <BentoCard
            name="Spatial Autocorrelation Moran's I"
            Icon={Compass}
            href="/spasial"
            cta="Examine Spatial Econometrics"
            description="Geographical emission dependence reaches +0.729, firmly rejecting spatial independence (p < 0.001)."
            background={<MoranGaugePreview />}
          />
          <BentoCard
            name="70% of ASEAN in Land Frontier"
            Icon={Layers}
            href="/clustering"
            cta="View Cluster Cartography"
            description="Seven agrarian ASEAN nations share deforestation regimes necessitating coordinated regional pacts."
            background={<ClusterRingPreview />}
          />
        </BentoColumn>

        <BentoColumn>
          <BentoCard
            name="LeSage–Pace Transboundary Spillover"
            Icon={Activity}
            href="/spasial"
            cta="SDM Decomposition"
            description="N₂O fertilizer spillovers to neighbors equal 2.20× domestic impacts, demonstrating empirical carbon leakage."
            background={<SpilloverBarPreview />}
          />
          <BentoCard
            name="Regional Policy Simulator Lab"
            Icon={Sliders}
            href="/simulator"
            cta="Launch Policy Simulator"
            description="Dynamic computation of regional greenhouse gas mitigation across three integrated agroecological levers."
            background={<SimulatorSnippetPreview />}
          />
        </BentoColumn>

        <BentoColumn>
          <BentoCard
            name="ASEAN Methane Forecasting 2025–2035"
            Icon={TrendingUp}
            href="/forecasting"
            cta="View Forecasting Suite"
            description="Drift & ARIMA Ensemble proven leak-free across 2,904 walk-forward cross-validation folds."
            background={<ForecastMiniPreview />}
          />
          <BentoCard
            name="Balanced Panel Audit of 44 Economies"
            Icon={BarChart2}
            href="/metodologi"
            cta="View Methodology Audit"
            description="Pristine balanced panel structure with zero imputation, ensuring complete econometric integrity."
            background={<CountryPanelPreview />}
          />
        </BentoColumn>
      </BentoGrid>
    </section>
  );
}
