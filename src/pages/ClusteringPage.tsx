import React, { useState, useEffect } from 'react';
import { CountryCluster, ClusterProfile, LisaData } from '../types/data';
import { InteractiveMap } from '../components/dashboard/InteractiveMap';
import { ClusterSummary } from '../components/dashboard/ClusterSummary';
import { CountryTable } from '../components/dashboard/CountryTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { MapPin, X } from 'lucide-react';
import { ScientificFigureViewer, FigureItem } from '../components/dashboard/ScientificFigureViewer';

const CLUSTERING_FIGURES: FigureItem[] = [
  {
    id: "sebar",
    tabLabel: "PCA Scatter",
    title: "2-Component PCA Projection & Regional Clustering",
    subtitle: "Dimensionality reduction capturing 84.9% of total variance across 44 Asia-Pacific economies.",
    darkSrc: "/figures/01_sebar_klaster_dark.svg",
    lightSrc: "/figures/01_sebar_klaster_light.svg",
    alt: "PCA Cluster Scatter",
    badge: "84.9% Total Variance",
    metrics: [
      { label: "PC1 Variance", value: "56.6%", tone: "emerald" },
      { label: "PC2 Variance", value: "28.3%", tone: "cyan" },
      { label: "Cumulative", value: "84.9%", tone: "emerald" },
      { label: "Sample Size", value: "N = 44", tone: "violet" },
    ],
    insight: "Distribusi spasial fitur emisi memperlihatkan diferensiasi tajam antara klaster berbasis peternakan ekstensif (seperti Australia & Mongolia) dengan agrikultur intensif padi sawah (ASEAN Core).",
  },
  {
    id: "silhouette",
    tabLabel: "Silhouette Evaluation",
    title: "Cluster Silhouette Cohesion-Separation Profile",
    subtitle: "Evaluation of clustering boundary compactness and partition robustness.",
    darkSrc: "/figures/02_silhouette_dark.svg",
    lightSrc: "/figures/02_silhouette_light.svg",
    alt: "Silhouette Plot",
    badge: "Mean s(i) = 0.534",
    metrics: [
      { label: "Mean Silhouette", value: "0.5336", tone: "emerald" },
      { label: "Partitioning", value: "k = 3 Optimal", tone: "cyan" },
      { label: "Misclassified", value: "1 (Lebanon)", tone: "amber" },
      { label: "Structure Quality", value: "Strong Proof", tone: "emerald" },
    ],
    insight: "Skor siluet rata-rata 0.5336 mengonfirmasi kohesi internal yang solid. Dari 44 ekonomi, hanya 1 negara (Lebanon) yang memiliki siluet negatif, membuktikan keandalan batas klaster yang sangat tinggi.",
  },
  {
    id: "dendrogram",
    tabLabel: "Ward Dendrogram",
    title: "Hierarchical Ward Minimum Variance Dendrogram",
    subtitle: "Hierarchical linkage taxonomy confirming agrifood emission typology stability.",
    darkSrc: "/figures/06_dendrogram_dark.svg",
    lightSrc: "/figures/06_dendrogram_light.svg",
    alt: "Ward Dendrogram",
    badge: "Euclidean Ward.D2",
    metrics: [
      { label: "Linkage Method", value: "Ward's Min Variance", tone: "cyan" },
      { label: "Distance Metric", value: "Squared Euclidean", tone: "cyan" },
      { label: "ASEAN Coherence", value: "ARI = 1.000", tone: "emerald" },
      { label: "Cluster Cutoff", value: "h = 3 Partition", tone: "violet" },
    ],
    insight: "Pohon hierarki Ward mengonfirmasi koherensi struktural emisi pangan di antara negara-negara ASEAN, di mana 9 dari 10 negara ASEAN terkonsentrasi secara harmonis pada cabang agrikultur intensif.",
  },
  {
    id: "lintasan",
    tabLabel: "64-Yr ASEAN Trajectory",
    title: "ASEAN Emission Feature Trajectory Evolution (1961–2024)",
    subtitle: "Longitudinal path trace across 10 ASEAN economies over 64 years of agrarian modernization.",
    darkSrc: "/figures/07_lintasan_asean_dark.svg",
    lightSrc: "/figures/07_lintasan_asean_light.svg",
    alt: "64-Year ASEAN Trajectory",
    badge: "Longitudinal 1961–2024",
    metrics: [
      { label: "Temporal Span", value: "64 Years", tone: "cyan" },
      { label: "Member Economies", value: "10 ASEAN Nations", tone: "emerald" },
      { label: "Trajectory Drift", value: "Synthetic N₂O Driven", tone: "amber" },
      { label: "Classification", value: "Time Invariant", tone: "violet" },
    ],
    insight: "Lintasan longitudinal 64 tahun membuktikan bahwa sebagian besar negara ASEAN mempertahankan jalur emisi intensif lahan yang stabil, dengan akselerasi pupuk sintetis pasca-1990.",
  },
];

export const ClusteringPage: React.FC = () => {
  const [countries, setCountries] = useState<CountryCluster[]>([]);
  const [profiles, setProfiles] = useState<ClusterProfile[]>([]);
  const [lisaData, setLisaData] = useState<LisaData[]>([]);
  const [selectedClusterId, setSelectedClusterId] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCluster | null>(null);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-700 border border-red-500/30 uppercase tracking-wider">
              Regional Spatial Typology
            </span>
            <span className="text-xs text-neutral-600 font-mono">
              44 Asia-Pacific Economies · 2015–2024 Snapshot
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight flex items-center gap-2.5">
            <MapPin className="size-6 text-neutral-800" />
            <span>Thematic Mapping & Agrifood System Clustering</span>
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
            Classifying 44 economies across 4 agrifood emission dimensions (land-use CO₂, methane, fertilizer N₂O, and energy CO₂) using K-Means (k=5) and PCA dimensionality reduction.
          </p>
        </div>

        {selectedCountry && (
          <Card className="p-3.5 bg-surface/90 border-black/10 shadow-black/5 flex items-center gap-3.5 shrink-0">
            <div>
              <span className="text-[10px] text-neutral-600 uppercase font-mono block">Selected Economy:</span>
              <strong className="text-base text-neutral-950">{selectedCountry.country}</strong>
              <span className="text-xs text-neutral-800 block font-semibold">{selectedCountry.nama_klaster}</span>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="p-1.5 rounded-lg bg-neutral-100 text-neutral-600 hover:text-neutral-950 transition-colors"
              aria-label="Clear economy selection"
            >
              <X className="size-4" />
            </button>
          </Card>
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

      {/* 4. SCIENTIFIC AUDIT GALLERY (SVGs - NGEBLEND VIEWER) */}
      <section>
        <ScientificFigureViewer
          title="Research Methodology Vector Audit Gallery"
          subtitle="Original scientific SVGs with adaptive light and dark canvases, fullscreen inspection, zoom, and vector download."
          figures={CLUSTERING_FIGURES}
          defaultTabId="sebar"
        />
      </section>
    </div>
  );
};
