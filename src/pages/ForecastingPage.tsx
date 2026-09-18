import React, { useState, useEffect } from 'react';
import { ForecastingModule } from '../components/dashboard/ForecastingModule';
import { TrendingUp, Image, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export const ForecastingPage: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [activeFanTab, setActiveFanTab] = useState<'h3' | 'h6' | 'h11' | 'cv'>('h3');

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
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase tracking-wider">
            Validasi Silang Deret Waktu
          </span>
          <span className="text-xs text-slate-400 font-mono">
            2.904 Evaluasi Fold-Model · Horizon h=1 s.d. h=10
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-teal-400" />
          <span>Peramalan Tekanan Emisi Metana Sistem Pangan ASEAN</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Eksplorasi 12 model deret waktu (Naive, Drift, Holt, ARIMA, ARIMAX, Ridge, GBDT) dengan validasi silang bebas kebocoran data untuk memproyeksikan lintasan emisi hingga dekade mendatang.
        </p>
      </div>

      {/* Main Forecasting Module */}
      <ForecastingModule
        historicalData={historicalData}
        projectionData={projectionData}
      />

      {/* SVG Fanchart Figures Gallery */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Image className="w-5 h-5 text-teal-400" />
              <span>Fanchart Multi-Horizon & Evaluasi Ketidakpastian</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pita ketidakpastian empiris 50%, 80%, dan 95% dari walk-forward cross-validation.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveFanTab('h3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFanTab === 'h3'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Horizon Pendek (h=3)
            </button>
            <button
              onClick={() => setActiveFanTab('h6')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFanTab === 'h6'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Horizon Menengah (h=6)
            </button>
            <button
              onClick={() => setActiveFanTab('h11')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFanTab === 'h11'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Horizon Panjang (h=11)
            </button>
            <button
              onClick={() => setActiveFanTab('cv')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFanTab === 'cv'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Komparasi CV Model
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 min-h-[380px]">
          {activeFanTab === 'h3' && (
            <div className="text-center">
              <img
                src="/figures/14_fan_h3.svg"
                alt="Fanchart Horizon h=3"
                className="max-h-[460px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Pita proyeksi 3 tahun ke depan dengan MAPE 2,18%.
              </p>
            </div>
          )}

          {activeFanTab === 'h6' && (
            <div className="text-center">
              <img
                src="/figures/15_fan_h6.svg"
                alt="Fanchart Horizon h=6"
                className="max-h-[460px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Pita proyeksi 6 tahun ke depan dengan MAPE 2,85%.
              </p>
            </div>
          )}

          {activeFanTab === 'h11' && (
            <div className="text-center">
              <img
                src="/figures/16_fan_h11.svg"
                alt="Fanchart Horizon h=11"
                className="max-h-[460px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Pita proyeksi 11 tahun (2025–2035) menangkap ketidakpastian jangka panjang ASEAN.
              </p>
            </div>
          )}

          {activeFanTab === 'cv' && (
            <div className="text-center">
              <img
                src="/figures/04_perbandingan_model_cv.svg"
                alt="Perbandingan Model CV"
                className="max-h-[460px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Distribusi galat out-of-fold membuktikan model sederhana (Drift & ARIMA) mengungguli GBDT dan Ridge.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
