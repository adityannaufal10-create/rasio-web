import React, { useState, useEffect } from 'react';
import { CountryCluster, ClusterProfile, LisaData } from '../types/data';
import { InteractiveMap } from '../components/dashboard/InteractiveMap';
import { ClusterSummary } from '../components/dashboard/ClusterSummary';
import { CountryTable } from '../components/dashboard/CountryTable';
import { MapPin, Image, CheckCircle, Info, Sparkles } from 'lucide-react';

export const ClusteringPage: React.FC = () => {
  const [countries, setCountries] = useState<CountryCluster[]>([]);
  const [profiles, setProfiles] = useState<ClusterProfile[]>([]);
  const [lisaData, setLisaData] = useState<LisaData[]>([]);
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCluster | null>(null);
  const [activeSvgTab, setActiveSvgTab] = useState<'sebar' | 'silhouette' | 'dendrogram' | 'lintasan'>('sebar');

  useEffect(() => {
    fetch('/data/hasil_klaster_lengkap.json')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error('Error loading countries:', err));

    fetch('/data/klaster_profiles.json')
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error('Error loading profiles:', err));

    fetch('/data/lisa_2024.json')
      .then((res) => res.json())
      .then((data) => setLisaData(data))
      .catch((err) => console.error('Error loading lisa:', err));
  }, []);

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/30 uppercase tracking-wider">
              Tipologi Spasial Regional
            </span>
            <span className="text-xs text-slate-400 font-mono">
              44 Negara Asia-Pasifik · Potret 2015–2024
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span>Peta Tematik & Klasterisasi Sistem Pangan</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Mengelompokkan 44 negara berdasarkan 4 dimensi emisi pangan (CO₂ alih guna lahan, metana, N₂O pupuk, dan CO₂ energi) menggunakan K-Means k=5 dan reduksi dimensi PCA.
          </p>
        </div>

        {selectedCountry && (
          <div className="p-3 bg-slate-900 border border-emerald-500/40 rounded-xl flex items-center gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Negara Terpilih:</span>
              <strong className="text-base text-white">{selectedCountry.country}</strong>
              <span className="text-xs text-emerald-400 block font-semibold">{selectedCountry.nama_klaster}</span>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white"
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      {/* 1. INTERACTIVE MAP */}
      <section>
        <InteractiveMap
          countries={countries}
          lisaData={lisaData}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </section>

      {/* 2. 5 CLUSTER SUMMARY CARDS */}
      <section>
        <ClusterSummary
          profiles={profiles}
          selectedClusterId={selectedClusterId}
          onSelectCluster={setSelectedClusterId}
        />
      </section>

      {/* 3. INTERACTIVE COUNTRY TABLE */}
      <section>
        <CountryTable
          countries={countries}
          lisaData={lisaData}
          selectedClusterId={selectedClusterId}
          onSelectCountry={setSelectedCountry}
        />
      </section>

      {/* 4. SCIENTIFIC AUDIT GALLERY (SVGs) */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Image className="w-5 h-5 text-emerald-400" />
              <span>Galeri Audit Vektor Metodologi Riset</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Visualisasi saintifik asli yang diekstraksi langsung dari notebook ekonometrika spasial.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveSvgTab('sebar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSvgTab === 'sebar'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Pencar PCA
            </button>
            <button
              onClick={() => setActiveSvgTab('silhouette')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSvgTab === 'silhouette'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Evaluasi Silhouette
            </button>
            <button
              onClick={() => setActiveSvgTab('dendrogram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSvgTab === 'dendrogram'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Dendrogram Ward
            </button>
            <button
              onClick={() => setActiveSvgTab('lintasan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSvgTab === 'lintasan'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Lintasan ASEAN 64 Th
            </button>
          </div>
        </div>

        {/* Display Active SVG */}
        <div className="flex justify-center items-center bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 min-h-[380px]">
          {activeSvgTab === 'sebar' && (
            <div className="text-center">
              <img
                src="/figures/01_sebar_klaster.svg"
                alt="Sebar Klaster PCA"
                className="max-h-[460px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Proyeksi PCA 2-Komponen menjelaskan <strong>84,9% ragam</strong> data (PC1 56,6%, PC2 28,3%).
              </p>
            </div>
          )}

          {activeSvgTab === 'silhouette' && (
            <div className="text-center">
              <img
                src="/figures/02_silhouette.svg"
                alt="Plot Silhouette"
                className="max-h-[460px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Skor kohesi-separasi klaster <strong>0,5336</strong>. Hanya 1 negara (Lebanon) dengan silhouette negatif.
              </p>
            </div>
          )}

          {activeSvgTab === 'dendrogram' && (
            <div className="text-center">
              <img
                src="/figures/06_dendrogram.svg"
                alt="Dendrogram Ward"
                className="max-h-[460px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Pohon hierarkis pengelompokan Ward mengonfirmasi kedekatan struktural emisi pangan negara-negara ASEAN.
              </p>
            </div>
          )}

          {activeSvgTab === 'lintasan' && (
            <div className="text-center">
              <img
                src="/figures/07_lintasan_asean.svg"
                alt="Lintasan ASEAN 64 Tahun"
                className="max-h-[500px] mx-auto rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-400 mt-3">
                Evolusi trajektori 10 negara ASEAN sejak 1961 hingga 2024 di ruang fitur emisi.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
