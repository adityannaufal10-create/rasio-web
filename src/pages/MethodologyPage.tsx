import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { BookOpen, ShieldCheck, Database, FileText, AlertTriangle, Layers } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-black/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-grain-mist text-neutral-800 border border-black/10 uppercase tracking-wider">
            Methodological Rigor & Transparency
          </span>
          <span className="text-xs text-neutral-600 font-mono">
            Econometric Audit & Statistical Integrity
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight flex items-center gap-2.5">
          <BookOpen className="size-6 text-neutral-800" />
          <span>Scientific Methodology & Research Architecture</span>
        </h1>
        <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
          All econometric specifications and machine learning pipelines are empirically grounded in Our World in Data (OWID) 1961–2024 records with zero ad-hoc imputation or synthetic manipulation.
        </p>
      </div>

      {/* 1. DATA SOURCES & PANEL STRUCTURE */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-neutral-950 flex items-center gap-2">
          <Database className="size-5 text-neutral-800" />
          <span>1. Balanced Panel Structure</span>
        </h2>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-5 sm:p-6 pb-3">
            <CardTitle className="text-base font-bold text-neutral-950">
              Perfect Balanced Panel Data (N = 44, T = 64)
            </CardTitle>
            <CardDescription>
              Encompassing <strong className="text-neutral-950">44 Asia-Pacific economies × 64 years (1961–2024) = 2,816 observations</strong> with zero missing values. All 10 ASEAN member economies are fully represented.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[680px]">
                <thead className="bg-neutral-100/90 text-neutral-600 uppercase font-semibold border-b border-black/10 text-[11px]">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Role</th>
                    <th className="px-4 py-3 whitespace-nowrap">Operational Variable</th>
                    <th className="px-4 py-3 font-sans whitespace-nowrap">Agrifood System Context</th>
                    <th className="px-4 py-3 text-right whitespace-nowrap">Between-Country Variance Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-mono">
                  <tr className="hover:bg-neutral-100/30 transition-colors">
                    <td className="px-4 py-3 text-neutral-800 font-bold whitespace-nowrap">Y (Dependent)</td>
                    <td className="px-4 py-3 text-neutral-950 font-sans font-semibold">Land-use change CO₂ per capita (LUC)</td>
                    <td className="px-4 py-3 font-sans text-neutral-700">Forest-to-cropland agricultural conversion pressure</td>
                    <td className="px-4 py-3 text-right text-neutral-800 font-bold">75.8%</td>
                  </tr>
                  <tr className="hover:bg-neutral-100/30 transition-colors">
                    <td className="px-4 py-3 text-neutral-800 font-bold whitespace-nowrap">X1 (Predictor)</td>
                    <td className="px-4 py-3 text-neutral-950 font-sans font-semibold">Methane per capita (CH₄)</td>
                    <td className="px-4 py-3 font-sans text-neutral-700">Flooded paddy rice and ruminant enteric fermentation emissions</td>
                    <td className="px-4 py-3 text-right text-neutral-800 font-bold">86.1%</td>
                  </tr>
                  <tr className="hover:bg-neutral-100/30 transition-colors">
                    <td className="px-4 py-3 text-neutral-800 font-bold whitespace-nowrap">X2 (Predictor)</td>
                    <td className="px-4 py-3 text-neutral-950 font-sans font-semibold">Nitrous oxide per capita (N₂O)</td>
                    <td className="px-4 py-3 font-sans text-neutral-700">Synthetic chemical nitrogen fertilizer application intensity</td>
                    <td className="px-4 py-3 text-right text-neutral-800 font-bold">92.8%</td>
                  </tr>
                  <tr className="hover:bg-neutral-100/30 transition-colors">
                    <td className="px-4 py-3 text-neutral-600 font-bold whitespace-nowrap">X3 (Predictor)</td>
                    <td className="px-4 py-3 text-neutral-950 font-sans font-semibold">Agrifood energy CO₂ per capita</td>
                    <td className="px-4 py-3 font-sans text-neutral-700">Agricultural mechanization, cold-chain operations, and transport logistics</td>
                    <td className="px-4 py-3 text-right text-neutral-700 font-bold">85.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. FOUR MANDATORY METHODOLOGICAL NOTES */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-neutral-950 flex items-center gap-2">
          <ShieldCheck className="size-5 text-amber-800" />
          <span>2. Four Core Methodological Decisions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-amber-500/40 hover:shadow-amber-950/20">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-amber-800 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 w-fit">
                DECISION 01
              </span>
              <CardTitle className="text-base font-bold text-neutral-950 mt-2">
                Why Time-Fixed Effects (Rather than Two-Way Fixed Effects)?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                Under a two-way fixed effects (TWFE) specification, the spatial autoregressive structure collapses (ρ = 0.019; LR = 0.53; R² = 0.017). Entity-level dummies absorb cross-sectional between-country variation—which constitutes the spatial signal itself (76–93% of variance is cross-sectional). The primary model adopts *Time-Fixed Effects*.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-black/10 hover:shadow-black/5">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-neutral-800 px-2 py-0.5 rounded-full bg-grain-mist border border-black/10 w-fit">
                DECISION 02
              </span>
              <CardTitle className="text-base font-bold text-neutral-950 mt-2">
                Why the 44 Asia-Pacific Economy Sample?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                Within the ASEAN-10 isolation, Global Moran's I is not statistically significant across all candidate spatial weight matrices (p &gt; 0.17). A spatial econometric regression on n=10 lacks the statistical power required for robust, leak-free spatial inference.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-black/10 hover:shadow-black/5">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-neutral-800 px-2 py-0.5 rounded-full bg-grain-mist border border-black/10 w-fit">
                DECISION 03
              </span>
              <CardTitle className="text-base font-bold text-neutral-950 mt-2">
                ASEAN Typology Invariance (ARI = 1.000)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                Sample expansion does not alter ASEAN cluster memberships. The 10 ASEAN economies preserve identical typology assignments between the Asia-44 and Monsoon Asia-19 subsets, yielding an Adjusted Rand Index (ARI) of exactly <strong className="text-neutral-800 font-mono">1.000</strong>. Expansion serves econometric precision without distorting regional empirical reality.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-black/10 hover:shadow-black/5">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-neutral-800 px-2 py-0.5 rounded-full bg-grain-mist border border-black/10 w-fit">
                DECISION 04
              </span>
              <CardTitle className="text-base font-bold text-neutral-950 mt-2">
                Brunei Darussalam as an Empirical Outlier
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                Brunei's methane emission reaches 6.31 t/capita, originating from petroleum venting and fugitive hydrocarbons rather than agrarian paddy rice or enteric livestock. Brunei is transparently documented as a petro-economy outlier within the Extensive Pastoral & Livestock cluster.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. MATRIKS BOBOT SPASIAL & DIAGNOSTIK RESIDUAL */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-neutral-950 flex items-center gap-2">
          <Layers className="size-5 text-neutral-800" />
          <span>3. Spatial Weight Matrix W (k-NN, k=4)</span>
        </h2>
        
        <Card className="p-5 sm:p-6 space-y-4">
          <p className="text-sm text-neutral-700 leading-relaxed">
            The spatial connectivity matrix is specified using row-standardized k-nearest neighbors (k = 4), which reveals the strongest spatial residual autocorrelation under initial non-spatial OLS (OLS residual Moran's I = 0.7029).
          </p>
          <div className="p-4 bg-neutral-100/80 rounded-2xl border border-black/10 font-mono text-xs text-neutral-700 leading-relaxed">
            <strong className="text-neutral-800">Likelihood Ratio Test Criteria:</strong> SAR vs OLS = 783.5 · SEM vs OLS = 795.6 · SDM vs SAR = 102.7. The global minimum AIC of 4,752.0 is uniquely achieved by the Spatial Durbin Model (SDM).
          </div>
        </Card>
      </section>
    </div>
  );
};
