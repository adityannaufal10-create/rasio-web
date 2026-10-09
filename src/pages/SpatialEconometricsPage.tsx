import React, { useState, useEffect } from 'react';
import { MoranTrajectoryChart } from '../components/dashboard/MoranTrajectoryChart';
import { SpilloverChart } from '../components/dashboard/SpilloverChart';
import { SpatialModelTable } from '../components/dashboard/SpatialModelTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { MoranYear, SdmDecomposition, SpatialModel } from '../types/data';
import { Layers, TrendingUp, Award, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScientificFigureViewer, FigureItem } from '../components/dashboard/ScientificFigureViewer';

const SPATIAL_FIGURES: FigureItem[] = [
  {
    id: "moran",
    tabLabel: "Moran Scatterplot",
    title: "Moran Scatterplot (2024 Cross-Section)",
    subtitle: "Quadrant partitioning across High-High, Low-High, Low-Low, and High-Low against spatial lag Wz.",
    darkSrc: "/figures/04_pencar_moran_dark.svg",
    lightSrc: "/figures/04_pencar_moran_light.svg",
    alt: "Moran Scatterplot",
    badge: "Global Moran's I = 0.441",
    metrics: [
      { label: "Global Moran's I", value: "0.4413", tone: "emerald" },
      { label: "Weight Matrix", value: "k-NN (k = 4)", tone: "cyan" },
      { label: "p-value", value: "p < 0.001", tone: "emerald" },
      { label: "Spatial Regime", value: "High-High Autocorrelation", tone: "violet" },
    ],
    insight: "Distribusi kuadran Moran memperlihatkan pengelompokan spasial yang nyata: negara-negara agrikultur beremisi tinggi bertetangga dengan sesama produsen intensif (High-High cluster).",
  },
  {
    id: "dekomposisi",
    tabLabel: "Effect Decomposition",
    title: "SDM Marginal Effect Decomposition (Direct vs Spillover)",
    subtitle: "Partitioning coefficient impacts into domestic direct impacts and cross-border spatial spillovers.",
    darkSrc: "/figures/08_dekomposisi_efek_dark.svg",
    lightSrc: "/figures/08_dekomposisi_efek_light.svg",
    alt: "SDM Effect Decomposition",
    badge: "Direct vs Spillover",
    metrics: [
      { label: "Indirect Spillover", value: "+0.371 (N₂O)", tone: "emerald" },
      { label: "Methane Spillover", value: "-0.264 (Negative)", tone: "amber" },
      { label: "Spatial Rho (ρ)", value: "0.472 (p < 0.001)", tone: "cyan" },
      { label: "Specification", value: "SDM AIC Min", tone: "violet" },
    ],
    insight: "Dekomposisi efek membuktikan limpahan lintas batas positif yang signifikan pada pupuk sintetis (N₂O), mengindikasikan perluasan pasar input regional dan efek demonstrasi kebijakan agrikultur antarnegara tetangga.",
  },
  {
    id: "lintasan_moran",
    tabLabel: "64-Yr Moran Trajectory",
    title: "Longitudinal Global Moran's I Evolution (1961–2024)",
    subtitle: "Tracking spatial autocorrelation stability across 64 years of agrarian development.",
    darkSrc: "/figures/03_moran_lintasan_dark.svg",
    lightSrc: "/figures/03_moran_lintasan_light.svg",
    alt: "64-Year Moran Trajectory",
    badge: "64-Year Stability",
    metrics: [
      { label: "Mean Moran's I", value: "0.428", tone: "emerald" },
      { label: "Time Range", value: "1961 – 2024", tone: "cyan" },
      { label: "Persistence", value: "Statistically Stable", tone: "emerald" },
      { label: "Structural Shifts", value: "Post-1990 Acceleration", tone: "amber" },
    ],
    insight: "Otokorelasi spasial terbukti persisten dan signifikan secara statistik sepanjang 6 dekade (1961–2024), menegaskan bahwa fenomena agrikultur Asia-Pasifik bukanlah kejadian acak sesaat.",
  },
  {
    id: "lisa_map",
    tabLabel: "LISA Cluster Map",
    title: "Local Indicators of Spatial Association (LISA) Map",
    subtitle: "Spatial statistical clustering and outlier detection for agrifood land conversion pressure.",
    darkSrc: "/figures/05_peta_lisa_dark.svg",
    lightSrc: "/figures/05_peta_lisa_light.svg",
    alt: "LISA Cluster Map",
    badge: "Local Moran's I",
    metrics: [
      { label: "Core High-High", value: "Mekong & Maritime ASEAN", tone: "emerald" },
      { label: "Low-Low Pockets", value: "Arid & Island Zones", tone: "cyan" },
      { label: "Permutation Tests", value: "999 Monte Carlo", tone: "violet" },
      { label: "Cluster Robustness", value: "p < 0.05", tone: "emerald" },
    ],
    insight: "Peta LISA mengonfirmasi hotspot spasial agrikultur intensif di kawasan Asia Tenggara kontinental dan kepulauan, menuntut kolaborasi kebijakan lintas batas dalam mitigasi emisi lahan.",
  },
];

export const SpatialEconometricsPage: React.FC = () => {
  const [moranData, setMoranData] = useState<MoranYear[]>([]);
  const [sdmData, setSdmData] = useState<SdmDecomposition[]>([]);
  const [modelData, setModelData] = useState<SpatialModel[]>([]);
  const [sdmCoefs, setSdmCoefs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/moran_lintasan_tahun.json')
      .then((res) => res.json())
      .then((data) => setMoranData(data))
      .catch((err) => console.error(err));

    fetch('/data/dekomposisi_efek_sdm.json')
      .then((res) => res.json())
      .then((data) => setSdmData(data))
      .catch((err) => console.error(err));

    fetch('/data/model_spasial_perbandingan.json')
      .then((res) => res.json())
      .then((data) => setModelData(data))
      .catch((err) => console.error(err));

    fetch('/data/sdm_koefisien.json')
      .then((res) => res.json())
      .then((data) => setSdmCoefs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-black/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-grain-mist text-neutral-800 border border-black/10 uppercase tracking-wider">
            Advanced Spatial Econometrics
          </span>
          <span className="text-xs text-neutral-600 font-mono">
            Spatial Durbin Model (SDM) · Time-Fixed Effects
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight flex items-center gap-2.5">
          <Layers className="size-6 text-neutral-800" />
          <span>Spatial Autocorrelation & LeSage–Pace Cross-Border Spillovers</span>
        </h1>
        <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
          Assessing whether domestic land-use change (LUC) emission pressures are driven by neighboring synthetic fertilizer (N₂O), livestock/paddy (CH₄), and energy intensities.
        </p>
      </div>

      {/* Row 1: Moran Trajectory & Spillover Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoranTrajectoryChart data={moranData} />
        <SpilloverChart data={sdmData} />
      </div>

      {/* Row 2: Model Comparison (OLS vs SLX vs SAR vs SEM vs SDM) */}
      <section>
        <SpatialModelTable models={modelData} />
      </section>

      {/* Row 3: SDM Coefficients Table Card */}
      <section>
        <Card className="overflow-hidden">
          <CardHeader className="p-5 border-b border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-neutral-800" />
                <span>Spatial Durbin Model (SDM) Parameter Estimates</span>
              </CardTitle>
              <CardDescription className="mt-1">
                All coefficients are statistically significant at the 1% level (p &lt; 0.001) under time-fixed effects.
              </CardDescription>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-grain-mist text-neutral-800 border border-black/10 w-fit shrink-0">
              Spatial ρ = +0.516
            </span>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono min-w-[720px]">
                <thead className="bg-neutral-100/90 border-b border-black/10 text-neutral-600 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="px-4 py-3 font-sans whitespace-nowrap">Predictor Variable</th>
                    <th className="px-4 py-3 font-sans whitespace-nowrap">Impact Type</th>
                    <th className="px-4 py-3 text-right whitespace-nowrap">Coefficient (β)</th>
                    <th className="px-4 py-3 text-right whitespace-nowrap">t-Statistic</th>
                    <th className="px-4 py-3 text-center whitespace-nowrap">p-Value</th>
                    <th className="px-4 py-3 font-sans whitespace-nowrap">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {sdmCoefs.map((c, i) => (
                    <tr key={i} className="hover:bg-neutral-100/40 text-neutral-800 transition-colors">
                      <td className="px-4 py-3 font-sans font-bold text-neutral-950">{c.variabel}</td>
                      <td className="px-4 py-3 font-sans">
                        <span
                          className={cn(
                            "text-[10.5px] px-2.5 py-0.5 rounded-full font-semibold border whitespace-nowrap",
                            String(c.tipe).toLowerCase().includes('spillover') || String(c.tipe).toLowerCase().includes('limpahan')
                              ? "bg-grain-mist text-neutral-800 border-black/10"
                              : "bg-grain-mist text-neutral-800 border-black/10"
                          )}
                        >
                          {c.tipe}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-neutral-800 text-[13px]">
                        {c.beta > 0 ? `+${c.beta.toFixed(4)}` : c.beta.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-right">{c.t_stat.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center text-neutral-800 font-bold">{c.p_val}</td>
                      <td className="px-4 py-3 font-sans text-neutral-600 text-[11.5px] leading-snug">
                        {(String(c.variabel).includes('N₂O') || String(c.variabel).includes('N2O')) &&
                        (String(c.tipe).toLowerCase().includes('spillover') || String(c.tipe).toLowerCase().includes('limpahan'))
                          ? 'Neighboring synthetic fertilizer intensifies regional agricultural expansion'
                          : (String(c.variabel).toLowerCase().includes('methane') || String(c.variabel).toLowerCase().includes('metana')) &&
                            (String(c.tipe).toLowerCase().includes('spillover') || String(c.tipe).toLowerCase().includes('limpahan'))
                          ? 'Negative cross-border methane association reflecting crop-livestock specialization'
                          : 'Direct domestic elasticity governing agricultural land conversion'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Row 4: Scientific Figure Audit Viewer (Ngeblend Mode) */}
      <section>
        <ScientificFigureViewer
          title="Spatial Econometrics Diagnostic & Vector Audit Gallery"
          subtitle="Empirical cross-sectional Moran distributions, SDM effect decompositions, and longitudinal spatial autocorrelation profiles seamlessly harmonized with the dashboard environment."
          figures={SPATIAL_FIGURES}
          defaultTabId="moran"
        />
      </section>
    </div>
  );
};
