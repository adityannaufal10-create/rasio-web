"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Database, Layers, ArrowRight } from "lucide-react";
import FeaturesWithPanel, { FeatureItem } from "@/components/ui/features-with-panel";
import { FACTS, CLUSTER_COLORS } from "./facts";

function OlsVsSdmComparisonPreview() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
          Econometric Model Feasibility Test
        </span>
        <span className="rounded-full border border-black/10 bg-grain-mist px-2.5 py-0.5 font-mono text-[11px] font-bold text-neutral-800">
          ΔAIC = -260.3
        </span>
      </div>

      <div className="space-y-3">
        {/* OLS Card */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 flex items-center gap-1.5">
              <AlertTriangle className="size-3.5" />
              Standard Linear Model (OLS)
            </span>
            <span className="font-mono text-xs text-neutral-600">AIC: 5,012.3</span>
          </div>
          <p className="mt-1 text-[11.5px] text-neutral-600 leading-relaxed">
            Assumes spatial units are mutually independent. Completely unable to capture transboundary spillovers.
          </p>
        </div>

        {/* SDM Card */}
        <div className="rounded-xl border border-black/10 bg-grain-mist p-3.5 shadow-lg shadow-black/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-neutral-800" />
              Spatial Durbin Model (SDM) Time-FE
            </span>
            <span className="font-mono text-xs font-bold text-neutral-800">AIC: 4,752.0</span>
          </div>
          <p className="mt-1 text-[11.5px] text-neutral-700 leading-relaxed">
            Captures endogenous and exogenous spatial lags. Likelihood Ratio test strongly rejects OLS (p &lt; 0.001).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs pt-1">
        <div className="rounded-lg bg-neutral-100/60 p-2 border border-black/5">
          <span className="text-[10px] text-neutral-600 block font-sans">Spatial Autoregressive (ρ)</span>
          <span className="font-bold text-neutral-950 text-sm">+0.516</span>
          <span className="text-[10px] text-neutral-800 block">p &lt; 0.001</span>
        </div>
        <div className="rounded-lg bg-neutral-100/60 p-2 border border-black/5">
          <span className="text-[10px] text-neutral-600 block font-sans">Spatial Weights W</span>
          <span className="font-bold text-neutral-950 text-sm">k-NN (k=4)</span>
          <span className="text-[10px] text-neutral-800 block">Robust Geodesic</span>
        </div>
      </div>
    </div>
  );
}

function CarbonLeakageEvidencePreview() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
          LeSage–Pace Decomposition (N₂O Fertilizer)
        </span>
        <span className="font-mono text-xs font-bold text-neutral-800">Ratio 2.20×</span>
      </div>

      <div className="space-y-3.5">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-neutral-700">Direct Domestic Impact:</span>
            <span className="font-bold text-neutral-950">+0.5011 (31%)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: "31%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-neutral-800 font-semibold">Indirect Transboundary Spillover:</span>
            <span className="font-bold text-neutral-800">+1.1046 (69%)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full shadow-sm" style={{ width: "69%" }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-black/10 bg-grain-mist p-3 text-xs text-neutral-700 leading-relaxed">
        <strong className="text-neutral-800">Core Finding:</strong> Unilateral fertilizer subsidy cuts without regional alignment inadvertently displace agricultural land pressure into neighboring economies (*carbon leakage*).
      </div>
    </div>
  );
}

function BalancedPanelPreview() {
  return (
    <div className="flex w-full flex-col gap-4 text-center">
      <div className="flex items-center justify-between border-b border-black/10 pb-3 text-left">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
          Balanced Panel Matrix
        </span>
        <span className="rounded-full bg-grain-mist px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-800 border border-black/10">
          Zero Missing
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-neutral-100/60 p-3 border border-black/5">
          <span className="font-mono text-2xl font-bold text-neutral-950 block">44</span>
          <span className="text-xs text-neutral-600">Asia-Pacific Economies</span>
        </div>
        <div className="rounded-xl bg-neutral-100/60 p-3 border border-black/5">
          <span className="font-mono text-2xl font-bold text-neutral-800 block">64</span>
          <span className="text-xs text-neutral-600">Years (1961–2024)</span>
        </div>
        <div className="rounded-xl bg-neutral-100/60 p-3 border border-black/5">
          <span className="font-mono text-2xl font-bold text-neutral-800 block">2,816</span>
          <span className="text-xs text-neutral-600">Balanced Panel Rows</span>
        </div>
        <div className="rounded-xl bg-neutral-100/60 p-3 border border-black/5">
          <span className="font-mono text-2xl font-bold text-neutral-800 block">4</span>
          <span className="text-xs text-neutral-600">Emission Dimensions</span>
        </div>
      </div>

      <p className="text-[11.5px] text-neutral-600 text-left leading-relaxed">
        Synthesizing FAOSTAT, CAIT Climate Watch, and World Bank datasets with comprehensive statistical validation and zero synthetic interpolation.
      </p>
    </div>
  );
}

function AseanClusterHomogeneityPreview() {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
          K-Means Clustering (k=5)
        </span>
        <span className="rounded-full bg-red-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-red-700 border border-red-500/30">
          Silhouette 0.5336
        </span>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-red-700">Cluster 2: Land Conversion Frontier</span>
          <span className="font-mono text-xs font-bold text-neutral-950">7 of 10 ASEAN</span>
        </div>
        <p className="mt-1.5 text-[11.5px] text-neutral-700 leading-relaxed">
          Indonesia, Vietnam, Thailand, Malaysia, Myanmar, Cambodia, and Laos share identical agrifood structural dynamics: intensive deforestation and land expansion.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="rounded-lg bg-neutral-100/50 p-2 border border-black/5">
          <span className="text-[10px] text-neutral-600 block font-sans">LUC Share</span>
          <span className="font-bold text-neutral-950">22.78%</span>
        </div>
        <div className="rounded-lg bg-neutral-100/50 p-2 border border-black/5">
          <span className="text-[10px] text-neutral-600 block font-sans">Indonesia LUC</span>
          <span className="font-bold text-red-700">12.57%</span>
        </div>
        <div className="rounded-lg bg-neutral-100/50 p-2 border border-black/5">
          <span className="text-[10px] text-neutral-600 block font-sans">ARI Stability</span>
          <span className="font-bold text-neutral-800">0.973</span>
        </div>
      </div>
    </div>
  );
}

function RegionalCompactPreview() {
  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
          Policy Blueprint: ASEAN Climate Compact
        </span>
        <span className="font-mono text-xs font-bold text-neutral-800">Harmonized Mitigation</span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2.5 rounded-lg bg-neutral-100/50 p-2.5 border border-black/5">
          <span className="size-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
          <p className="text-neutral-700">
            <strong className="text-neutral-950">Regional Fertilizer Benchmarks:</strong> Eliminates cross-border commodity price arbitrage driving chemical overuse.
          </p>
        </div>
        <div className="flex items-start gap-2.5 rounded-lg bg-neutral-100/50 p-2.5 border border-black/5">
          <span className="size-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
          <p className="text-neutral-700">
            <strong className="text-neutral-950">Transboundary Moratoria:</strong> Protects contiguous rainforest corridors against deforestation leakage.
          </p>
        </div>
        <div className="flex items-start gap-2.5 rounded-lg bg-neutral-100/50 p-2.5 border border-black/5">
          <span className="size-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
          <p className="text-neutral-700">
            <strong className="text-neutral-950">ASEAN Green Agri-Fund:</strong> Food-importing economies (Singapore) co-finance green transitions in producer nations.
          </p>
        </div>
      </div>
    </div>
  );
}

const WHY_ITEMS: FeatureItem[] = [
  {
    title: "Traditional Regressions Ignore Space",
    subtitle: "Likelihood Ratio test confirms OLS is severely biased by omitting spatial dependence (p < 0.001).",
    badge: "SDM vs OLS",
    content: <OlsVsSdmComparisonPreview />,
    actionText: "Examine Spatial Econometrics",
    actionHref: "/spasial",
  },
  {
    title: "Carbon Leakage Multiplier at 2.20×",
    subtitle: "Indirect N₂O fertilizer spillovers (+1.1046) surpass direct domestic effects (+0.5011) across borders.",
    badge: "LeSage–Pace",
    content: <CarbonLeakageEvidencePreview />,
    actionText: "Inspect Effect Decomposition",
    actionHref: "/spasial",
  },
  {
    title: "Balanced Panel: 44 Economies × 64 Years",
    subtitle: "2,816 pristine observations from 1961 to 2024 with zero missing values, ensuring econometric robustness.",
    badge: "2,816 Observations",
    content: <BalancedPanelPreview />,
    actionText: "View Methodology Audit",
    actionHref: "/metodologi",
  },
  {
    title: "70% of ASEAN Locked in Frontier Cluster",
    subtitle: "Seven of ten ASEAN member states share the identical structural challenge of deforestation and land conversion.",
    badge: "Silhouette 0.5336",
    content: <AseanClusterHomogeneityPreview />,
    actionText: "View Cluster Cartography",
    actionHref: "/clustering",
  },
  {
    title: "Urgent Regional Climate Governance",
    subtitle: "Isolated domestic NDC targets fail without harmonized ASEAN agroecological coordination.",
    badge: "Policy Framework",
    content: <RegionalCompactPreview />,
    actionText: "Launch Policy Simulator",
    actionHref: "/simulator",
  },
];

export default function WhyGrainSection() {
  return (
    <section id="why-grain" className="border-t border-black/10 bg-neutral-100/70">
      <FeaturesWithPanel
        badge="Scientific Urgency & Paradox Synthesis"
        heading="Why Is Spatial Econometrics Imperative?"
        description="Conventional climate models assume borders contain emissions. These five empirical pillars prove why GRAIN's regional approach is vital to halting transboundary carbon leakage."
        items={WHY_ITEMS}
        aspectRatio="aspect-auto min-h-[440px]"
      />
    </section>
  );
}
