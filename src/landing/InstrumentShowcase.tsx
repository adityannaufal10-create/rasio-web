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
        unit=" (Strong)"
      />
      <div className="w-full space-y-2 border-t border-black/10 pt-3">
        <div className="flex items-center justify-between text-xs text-neutral-700">
          <span>Global Moran's I (2024):</span>
          <span className="font-mono font-bold text-neutral-800">+0.729</span>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-600">
          <span>Random Expectation E(I):</span>
          <span className="font-mono text-neutral-700">-0.023</span>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-600">
          <span>Statistical Significance:</span>
          <span className="font-mono font-bold text-neutral-800">p &lt; 0.001 (Pseudo-p)</span>
        </div>
      </div>
      <p className="text-[11.5px] text-neutral-600 text-center leading-relaxed">
        Land-use change emission patterns are intensely clustered geographically, rejecting spatial independence.
      </p>
    </div>
  );
}

function ClusterRingDetailPreview() {
  const clusters = [
    { name: "Land Frontier", count: 7, color: CLUSTER_COLORS[2], label: "7 ASEAN Economies (70%)" },
    { name: "High-Density Agrarian", count: 1, color: CLUSTER_COLORS[4], label: "Philippines (10%)" },
    { name: "Established Industrial", count: 1, color: CLUSTER_COLORS[0], label: "Singapore (10%)" },
    { name: "Extensive Pastoral", count: 1, color: CLUSTER_COLORS[1], label: "Brunei (10%)" },
  ];

  return (
    <div className="flex w-full flex-col gap-4 py-1">
      <div className="flex items-center justify-between text-xs text-neutral-700">
        <span className="font-semibold text-neutral-950">ASEAN-10 Concentration:</span>
        <span className="font-mono text-neutral-800 font-bold">70% Land Frontier</span>
      </div>

      <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-neutral-100 p-0.5 border border-black/10">
        <div style={{ width: "70%", backgroundColor: CLUSTER_COLORS[2] }} className="rounded-l-full shadow-sm" title="Cluster 2 (Land Frontier)" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[4] }} title="Cluster 4" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[0] }} title="Cluster 0" />
        <div style={{ width: "10%", backgroundColor: CLUSTER_COLORS[1] }} className="rounded-r-full" title="Cluster 1" />
      </div>

      <div className="grid grid-cols-2 gap-2.5 text-xs text-neutral-700">
        {clusters.map((c) => (
          <div key={c.name} className="flex items-center gap-2 rounded-lg bg-neutral-100/50 p-2 border border-black/5">
            <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
            <span className="truncate text-[11.5px]">{c.label}</span>
          </div>
        ))}
      </div>

      <p className="text-[11.5px] text-neutral-600 leading-relaxed">
        Seven agrarian ASEAN nations are bound to identical deforestation and agricultural expansion patterns: Indonesia, Vietnam, Thailand, Malaysia, Myanmar, Cambodia, and Laos.
      </p>
    </div>
  );
}

function SpilloverBarDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-4 py-1">
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs font-mono text-neutral-700 mb-1">
            <span>Direct Domestic Impact</span>
            <span className="text-neutral-950 font-bold">+0.5011</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: "31%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono text-neutral-800 mb-1">
            <span className="font-semibold">Indirect Transboundary Spillover</span>
            <span className="font-bold">+1.1046 (2.20×)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full shadow-sm" style={{ width: "69%" }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-black/10 bg-grain-mist p-3 text-center text-xs text-neutral-800">
        Total LeSage–Pace Multiplier Effect: <strong className="text-neutral-950 font-mono text-sm">1.61×</strong>
        <span className="block text-[11px] text-neutral-800/80 mt-1">
          Policy impacts propagate extensively beyond sovereign domestic boundaries.
        </span>
      </div>
    </div>
  );
}

function SimulatorSnippetDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-3 py-1">
      <div className="flex items-center justify-between text-xs bg-neutral-100/60 p-2.5 rounded-xl border border-black/5">
        <span className="text-neutral-700">N₂O Fertilizer Rationalization:</span>
        <span className="font-mono text-neutral-800 font-bold text-sm">-25%</span>
      </div>
      <div className="flex items-center justify-between text-xs bg-neutral-100/60 p-2.5 rounded-xl border border-black/5">
        <span className="text-neutral-700">Forest & Peatland Moratorium:</span>
        <span className="font-mono text-red-700 font-bold text-sm">-40%</span>
      </div>
      <div className="flex items-center justify-between text-xs bg-neutral-100/60 p-2.5 rounded-xl border border-black/5">
        <span className="text-neutral-700">Paddy AWD Water Management:</span>
        <span className="font-mono text-amber-800 font-bold text-sm">-15%</span>
      </div>

      <div className="rounded-xl border border-black/10 bg-grain-mist p-3 text-center text-xs text-neutral-800">
        Estimated Regional Mitigation: <strong className="text-neutral-950 font-mono text-sm">&gt;30 Million Tons CO₂eq</strong>
      </div>
    </div>
  );
}

function ForecastMiniDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-3 py-1">
      <div className="flex justify-between items-baseline text-xs">
        <span className="text-neutral-600">ASEAN Methane Projections 2025–2035</span>
        <span className="font-mono text-neutral-800 font-bold">MAPE 1.34% (h=1)</span>
      </div>

      <div className="h-20 w-full rounded-xl bg-neutral-100/80 p-2.5 flex items-end justify-between gap-1.5 border border-black/5">
        {[28, 30, 31, 33, 35, 38, 42, 45, 48, 51, 55, 58].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
            <div
              className={`w-full rounded-t transition-all ${
                i > 7 ? "bg-purple-400 shadow-sm" : "bg-slate-600"
              }`}
              style={{ height: `${v}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[11px] text-neutral-600 font-mono">
        <span>1990 (Historical)</span>
        <span className="text-neutral-800 font-bold">2024 (Split)</span>
        <span>2035 (Forecast)</span>
      </div>

      <p className="text-[11.5px] text-neutral-600 leading-relaxed text-center">
        2,904 walk-forward evaluation folds confirm leak-free accuracy of the Drift & ARIMA Ensemble.
      </p>
    </div>
  );
}

function CountryPanelDetailPreview() {
  return (
    <div className="flex w-full flex-col gap-3 py-1 text-center">
      <div className="text-[36px] font-mono font-bold text-neutral-950 tabular-nums leading-none">
        {FACTS.countries} <span className="text-[15px] font-sans text-neutral-600">Economies</span>
      </div>
      <div className="text-xs text-neutral-800 font-semibold font-mono">
        {FACTS.timeSpan} ({FACTS.years} Panel Years)
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
        <div className="rounded-lg bg-neutral-100/60 p-2.5 border border-black/5">
          <span className="text-neutral-600 block text-[10.5px]">Total Observations</span>
          <span className="font-bold text-neutral-950 text-sm">{FACTS.observations}</span>
        </div>
        <div className="rounded-lg bg-neutral-100/60 p-2.5 border border-black/5">
          <span className="text-neutral-600 block text-[10.5px]">Missing Values</span>
          <span className="font-bold text-neutral-800 text-sm">0 (Zero)</span>
        </div>
      </div>

      <p className="text-[11.5px] text-neutral-600 leading-relaxed">
        All data validated using row-standardized k-NN (k=4) spatial weights matrix for econometric consistency.
      </p>
    </div>
  );
}

const INSTRUMENT_ITEMS: FeatureItem[] = [
  {
    title: "Spatial Autocorrelation Moran's I (+0.729)",
    subtitle: "Geographical emission dependence reaches +0.729, firmly rejecting spatial independence (p < 0.001).",
    badge: "Moran's I",
    content: <MoranGaugeDetailPreview />,
    actionText: "Examine Spatial Econometrics",
    actionHref: "/spasial",
  },
  {
    title: "70% of ASEAN in Land Frontier Cluster",
    subtitle: "Seven agrarian ASEAN nations share deforestation regimes necessitating coordinated regional pacts.",
    badge: "K-Means k=5",
    content: <ClusterRingDetailPreview />,
    actionText: "View Cluster Cartography",
    actionHref: "/clustering",
  },
  {
    title: "LeSage–Pace Transboundary Spillover",
    subtitle: "N₂O fertilizer spillovers to neighbors equal 2.20× domestic impacts, demonstrating empirical carbon leakage.",
    badge: "Multiplier 1.61×",
    content: <SpilloverBarDetailPreview />,
    actionText: "SDM Decomposition",
    actionHref: "/spasial",
  },
  {
    title: "Regional Policy Simulator Lab",
    subtitle: "Dynamic computation of regional greenhouse gas mitigation across three integrated agroecological levers.",
    badge: "Real-Time",
    content: <SimulatorSnippetDetailPreview />,
    actionText: "Launch Policy Simulator",
    actionHref: "/simulator",
  },
  {
    title: "ASEAN Methane Forecasting 2025–2035",
    subtitle: "Drift & ARIMA Ensemble proven leak-free across 2,904 walk-forward cross-validation folds.",
    badge: "10-Yr Horizon",
    content: <ForecastMiniDetailPreview />,
    actionText: "View Forecasting Suite",
    actionHref: "/forecasting",
  },
  {
    title: "Balanced Panel Audit of 44 Economies",
    subtitle: "Pristine balanced panel structure with zero imputation, ensuring complete econometric integrity.",
    badge: "2,816 Rows",
    content: <CountryPanelDetailPreview />,
    actionText: "View Methodology Audit",
    actionHref: "/metodologi",
  },
];

export default function InstrumentShowcase() {
  return (
    <section id="inside" aria-label="Live Analytical Instruments" className="border-t border-black/10 bg-neutral-100/50">
      <FeaturesWithPanel
        badge="Live Analytical Instruments"
        heading="Every Screen Is a Scientific Instrument, Not Static Slides."
        description="Six interconnected analytical modules. Users can directly interact with spatial cartography, verify SDM regressions, and execute ASEAN regional climate simulations."
        items={INSTRUMENT_ITEMS}
        aspectRatio="aspect-auto min-h-[440px]"
      />
    </section>
  );
}
