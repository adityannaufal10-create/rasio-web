import React, { useState, useEffect } from 'react';
import { ForecastingModule } from '../components/dashboard/ForecastingModule';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { TrendingUp, Image, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase tracking-wider">
            Validasi Silang Deret Waktu
          </span>
          <span className="text-xs text-slate-400 font-mono">
            2.904 Evaluasi Fold-Model · Horizon h=1 s.d. h=10
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <TrendingUp className="size-6 text-teal-400" />
          <span>Peramalan Tekanan Emisi Metana Sistem Pangan ASEAN</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Eksplorasi 12 model deret waktu (Naive, Drift, Holt, ARIMA, ARIMAX, Ridge, GBDT) dengan validasi silang bebas kebocoran data untuk memproyeksikan lintasan emisi hingga dekade mendatang.
        </p>
      </div>

      {/* Main Forecasting Module */}
      <ForecastingModule
        historicalData={historicalData}
        projectionData={projectionData}
      />

      {/* SVG Fanchart Figures Gallery Card */}
      <section>
        <Card className="overflow-hidden">
          <CardHeader className="p-5 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Image className="size-5 text-teal-400" />
                <span>Fanchart Multi-Horizon & Evaluasi Ketidakpastian</span>
              </CardTitle>
              <CardDescription className="mt-1">
                Pita ketidakpastian empiris 50%, 80%, dan 95% dari walk-forward cross-validation.
              </CardDescription>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setActiveFanTab('h3')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  activeFanTab === 'h3'
                    ? "bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-950/40"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                )}
              >
                Horizon Pendek (h=3)
              </button>
              <button
                onClick={() => setActiveFanTab('h6')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  activeFanTab === 'h6'
                    ? "bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-950/40"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                )}
              >
                Horizon Menengah (h=6)
              </button>
              <button
                onClick={() => setActiveFanTab('h11')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  activeFanTab === 'h11'
                    ? "bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-950/40"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                )}
              >
                Horizon Panjang (h=11)
              </button>
              <button
                onClick={() => setActiveFanTab('cv')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  activeFanTab === 'cv'
                    ? "bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-950/40"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                )}
              >
                Komparasi CV Model
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-6">
            <div className="flex justify-center items-center bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-white/5 min-h-[380px]">
              {activeFanTab === 'h3' && (
                <div className="text-center">
                  <img
                    src="/figures/14_fan_h3.svg"
                    alt="Fanchart Horizon h=3"
                    className="max-h-[460px] mx-auto rounded-xl shadow-lg"
                  />
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                    Pita proyeksi 3 tahun ke depan dengan MAPE <strong className="text-white font-mono">2,18%</strong>.
                  </p>
                </div>
              )}

              {activeFanTab === 'h6' && (
                <div className="text-center">
                  <img
                    src="/figures/15_fan_h6.svg"
                    alt="Fanchart Horizon h=6"
                    className="max-h-[460px] mx-auto rounded-xl shadow-lg"
                  />
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                    Pita proyeksi 6 tahun ke depan dengan MAPE <strong className="text-white font-mono">2,85%</strong>.
                  </p>
                </div>
              )}

              {activeFanTab === 'h11' && (
                <div className="text-center">
                  <img
                    src="/figures/16_fan_h11.svg"
                    alt="Fanchart Horizon h=11"
                    className="max-h-[460px] mx-auto rounded-xl shadow-lg"
                  />
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                    Pita proyeksi 11 tahun (2025–2035) menangkap ketidakpastian jangka panjang ASEAN.
                  </p>
                </div>
              )}

              {activeFanTab === 'cv' && (
                <div className="text-center">
                  <img
                    src="/figures/04_perbandingan_model_cv.svg"
                    alt="Perbandingan Model CV"
                    className="max-h-[460px] mx-auto rounded-xl shadow-lg"
                  />
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                    Distribusi galat out-of-fold membuktikan model sederhana (Drift & ARIMA) mengungguli GBDT dan Ridge.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
