import React, { useState, useEffect } from 'react';
import { ForecastingModule } from '../components/dashboard/ForecastingModule';
import { TrendingUp } from 'lucide-react';
import { ScientificFigureViewer, FigureItem } from '../components/dashboard/ScientificFigureViewer';

const FORECASTING_FIGURES: FigureItem[] = [
  {
    id: "h3",
    tabLabel: "Horizon h=3 (Short)",
    title: "Multi-Horizon Fanchart: Short-Term Horizon (h = 3 Years)",
    subtitle: "Empirical uncertainty fan (50%, 80%, and 95% confidence intervals) under out-of-sample walk-forward cross-validation.",
    darkSrc: "/figures/14_fan_h3_dark.svg",
    lightSrc: "/figures/14_fan_h3_light.svg",
    alt: "Fanchart Horizon h=3",
    badge: "MAPE = 2.18%",
    metrics: [
      { label: "Target Horizon", value: "h = 3 Years", tone: "cyan" },
      { label: "Mean Absolute Error", value: "MAPE 2.18%", tone: "emerald" },
      { label: "Confidence Bands", value: "50% · 80% · 95%", tone: "cyan" },
      { label: "Validation Engine", value: "Walk-Forward CV", tone: "violet" },
    ],
    insight: "Interval proyeksi jangka pendek membuktikan kestabilan model dengan MAPE hanya 2.18%, sangat ideal untuk penganggaran fiskal dan target mitigasi emisi metana 3 tahunan.",
  },
  {
    id: "h6",
    tabLabel: "Horizon h=6 (Mid)",
    title: "Multi-Horizon Fanchart: Medium-Term Horizon (h = 6 Years)",
    subtitle: "Medium-term fan projection tracking structural agrarian growth momentum across ASEAN member states.",
    darkSrc: "/figures/15_fan_h6_dark.svg",
    lightSrc: "/figures/15_fan_h6_light.svg",
    alt: "Fanchart Horizon h=6",
    badge: "MAPE = 2.85%",
    metrics: [
      { label: "Target Horizon", value: "h = 6 Years", tone: "cyan" },
      { label: "Validated MAPE", value: "2.85%", tone: "emerald" },
      { label: "Variance Expansion", value: "Controlled", tone: "emerald" },
      { label: "Policy Scope", value: "Rencana Aksi 5-Tahunan", tone: "violet" },
    ],
    insight: "Pada horizon 6 tahun, lebar kipas ketidakpastian membesar secara wajar tanpa ledakan varians (MAPE 2.85%), merefleksikan pergeseran pola panen dan dinamika ternak ruminansia.",
  },
  {
    id: "h11",
    tabLabel: "Horizon h=11 (Long)",
    title: "Multi-Horizon Fanchart: Long-Term Horizon (h = 11 Years / 2025–2035)",
    subtitle: "Decadal structural emission trajectory capturing long-term policy uncertainties and agricultural shifts.",
    darkSrc: "/figures/16_fan_h11_dark.svg",
    lightSrc: "/figures/16_fan_h11_light.svg",
    alt: "Fanchart Horizon h=11",
    badge: "Target 2025–2035",
    metrics: [
      { label: "Target Horizon", value: "h = 11 Years", tone: "amber" },
      { label: "Projection Span", value: "2025 – 2035", tone: "cyan" },
      { label: "Upper 95% Bound", value: "High Stress Scenario", tone: "amber" },
      { label: "Lower 95% Bound", value: "Aggressive Mitigation", tone: "emerald" },
    ],
    insight: "Kipas proyeksi 11 tahun menyediakan batas atas dan bawah ilmiah bagi target Nationally Determined Contributions (NDC) ASEAN 2035 untuk sektor agrikultur.",
  },
  {
    id: "cv",
    tabLabel: "CV Model Benchmark",
    title: "Out-of-Fold Model Benchmark & Error Distributions",
    subtitle: "Empirical comparison of 12 candidate forecasting models across 2,904 evaluation folds.",
    darkSrc: "/figures/04_perbandingan_model_cv_dark.svg",
    lightSrc: "/figures/04_perbandingan_model_cv_light.svg",
    alt: "CV Model Benchmark",
    badge: "2,904 Evals · Parsimony Wins",
    metrics: [
      { label: "Candidate Models", value: "12 Specifications", tone: "cyan" },
      { label: "Evaluations", value: "2,904 Folds", tone: "violet" },
      { label: "Top Architectures", value: "Drift & ARIMA", tone: "emerald" },
      { label: "Overfitting Trap", value: "GBDT / Ridge Lags", tone: "amber" },
    ],
    insight: "Distribusi error out-of-fold menunjukkan bahwa spesifikasi parsimonius (Drift & ARIMA) secara konsisten mengungguli model machine learning kompleks (GBDT & Ridge) yang rentan overfit pada deret waktu makro.",
  },
];

export const ForecastingPage: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [projectionData, setProjectionData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/agregat_asean_historis.json')
      .then((res) => res.json())
      .then((data) => setHistoricalData(data))
      .catch((err) => console.error(err));

    fetch('/data/proyeksi_metana_asean.json')
      .then((res) => res.json())
      .then((data) => setProjectionData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase tracking-wider">
            Time-Series Cross-Validation
          </span>
          <span className="text-xs text-slate-400 font-mono">
            2,904 Fold-Model Evaluations · Horizons h=1 to h=10
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <TrendingUp className="size-6 text-teal-400" />
          <span>ASEAN Agrifood System Methane Emission Pressure Forecasting</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Benchmarking 12 time-series specifications (Naive, Drift, Holt, ARIMA, ARIMAX, Ridge, GBDT) with leak-free walk-forward validation to project emissions through the next decade.
        </p>
      </div>

      {/* Main Forecasting Module */}
      <ForecastingModule
        historicalData={historicalData}
        projectionData={projectionData}
      />

      {/* Scientific Fanchart Figures Gallery (Ngeblend Viewer) */}
      <section>
        <ScientificFigureViewer
          title="Multi-Horizon Fancharts & Uncertainty Quantifications"
          subtitle="Empirical 50%, 80%, and 95% uncertainty intervals from walk-forward cross-validation seamlessly blended with your dashboard canvas."
          figures={FORECASTING_FIGURES}
          defaultTabId="h3"
        />
      </section>
    </div>
  );
};
