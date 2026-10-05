export interface CountryDot {
  name: string;
  cluster: number;
  clusterName: string;
  isAsean: boolean;
  luc_pc: number;
  ch4_pc: number;
  n2o_pc: number;
  co2_pc: number;
  lat: number;
  lon: number;
  highlight?: boolean;
}

export const CLUSTER_COLORS: Record<number, string> = {
  2: "#ef4444", // Frontier Konversi Lahan (Merah)
  4: "#f59e0b", // Padat Penduduk Intensitas Rendah (Amber)
  0: "#3b82f6", // Industri Mapan Rendah-Lahan (Biru)
  1: "#8b5cf6", // Peternakan Ekstensif (Ungu)
  3: "#64748b", // Petro-Ekonomi Pengimpor (Slate)
};

export const CLUSTER_NAMES: Record<number, string> = {
  2: "Frontier Konversi Lahan",
  4: "Padat Penduduk Intensitas Rendah",
  0: "Industri Mapan Rendah-Lahan",
  1: "Peternakan Ekstensif",
  3: "Petro-Ekonomi Pengimpor",
};

export const FACTS = {
  globalLUCShare: "22,78%",
  globalGHGShare: "7,44%",
  indonesiaLUC: "12,57%",
  spearman: "0,008",
  moran1961: "+0,255",
  moran2024: "+0,729",
  spilloverRatio: "2,20×",
  directEffect: "+0,5011",
  spilloverEffect: "+1,1046",
  totalMultiplier: "1,61×",
  observations: "2.816",
  countries: 44,
  aseanCountries: 10,
  years: 64,
  timeSpan: "1961–2024",
  sdmAic: "4.752,0",
  silhouette: "0,5336",
  ariStability: "0,973",
  leadCountry: {
    name: "Indonesia",
    cluster: "Frontier Konversi Lahan",
    luc: "4,64 t CO₂/kapita",
    lucShare: "12,57% Dunia",
    status: "Episentrum Spasial",
  },
};

export const COUNTRIES_44: CountryDot[] = [
  { name: "Indonesia", cluster: 2, clusterName: "Frontier Konversi Lahan", isAsean: true, luc_pc: 4.64, ch4_pc: 0.95, n2o_pc: 0.28, co2_pc: 2.15, lat: -0.7893, lon: 113.9213, highlight: true },
  { name: "Malaysia", cluster: 2, clusterName: "Frontier Konversi Lahan", isAsean: true, luc_pc: 3.82, ch4_pc: 1.12, n2o_pc: 0.42, co2_pc: 7.82, lat: 4.2105, lon: 101.9758 },
  { name: "Vietnam", cluster: 2, clusterName: "Frontier Konversi Lahan", isAsean: true, luc_pc: 1.84, ch4_pc: 0.92, n2o_pc: 0.38, co2_pc: 2.85, lat: 14.0583, lon: 108.2772 },
  { name: "Thailand", cluster: 2, clusterName: "Frontier Konversi Lahan", isAsean: true, luc_pc: 1.62, ch4_pc: 1.05, n2o_pc: 0.35, co2_pc: 3.78, lat: 15.87, lon: 100.9925 },
  { name: "Myanmar", cluster: 2, clusterName: "Frontier Konversi Lahan", isAsean: true, luc_pc: 2.91, ch4_pc: 1.28, n2o_pc: 0.31, co2_pc: 0.65, lat: 21.9162, lon: 95.956 },
  { name: "Cambodia", cluster: 2, clusterName: "Frontier Konversi Lahan", isAsean: true, luc_pc: 3.15, ch4_pc: 1.34, n2o_pc: 0.29, co2_pc: 0.72, lat: 12.5657, lon: 104.991 },
  { name: "Laos", cluster: 2, clusterName: "Frontier Konversi Lahan", isAsean: true, luc_pc: 4.12, ch4_pc: 1.15, n2o_pc: 0.24, co2_pc: 0.98, lat: 19.8563, lon: 102.4955 },
  { name: "Philippines", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: true, luc_pc: 0.45, ch4_pc: 0.58, n2o_pc: 0.18, co2_pc: 1.25, lat: 12.8797, lon: 121.774 },
  { name: "Singapore", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: true, luc_pc: 0.01, ch4_pc: 0.08, n2o_pc: 0.05, co2_pc: 8.45, lat: 1.3521, lon: 103.8198 },
  { name: "Brunei", cluster: 1, clusterName: "Peternakan Ekstensif", isAsean: true, luc_pc: 0.85, ch4_pc: 1.45, n2o_pc: 0.22, co2_pc: 18.25, lat: 4.5353, lon: 114.7277 },
  { name: "Afghanistan", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.18, ch4_pc: 0.41, n2o_pc: 0.12, co2_pc: 0.26, lat: 34.5553, lon: 69.2075 },
  { name: "Armenia", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.09, ch4_pc: 0.57, n2o_pc: 0.32, co2_pc: 2.23, lat: 40.1792, lon: 44.4991 },
  { name: "Australia", cluster: 1, clusterName: "Peternakan Ekstensif", isAsean: false, luc_pc: 2.35, ch4_pc: 5.85, n2o_pc: 2.64, co2_pc: 15.72, lat: -35.2809, lon: 149.13 },
  { name: "Azerbaijan", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: false, luc_pc: 0.44, ch4_pc: 1.22, n2o_pc: 0.33, co2_pc: 3.7, lat: 40.4093, lon: 49.8671 },
  { name: "Bangladesh", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.08, ch4_pc: 0.55, n2o_pc: 0.18, co2_pc: 0.56, lat: 23.685, lon: 90.3563 },
  { name: "Bhutan", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.12, ch4_pc: 0.72, n2o_pc: 0.21, co2_pc: 1.45, lat: 27.5142, lon: 90.4336 },
  { name: "China", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: false, luc_pc: 0.38, ch4_pc: 0.82, n2o_pc: 0.39, co2_pc: 7.95, lat: 35.8617, lon: 104.1954 },
  { name: "Cyprus", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: false, luc_pc: 0.05, ch4_pc: 0.65, n2o_pc: 0.28, co2_pc: 6.84, lat: 35.1264, lon: 33.4299 },
  { name: "Georgia", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.11, ch4_pc: 0.68, n2o_pc: 0.24, co2_pc: 2.65, lat: 42.3154, lon: 43.3569 },
  { name: "India", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.22, ch4_pc: 0.48, n2o_pc: 0.22, co2_pc: 1.95, lat: 20.5937, lon: 78.9629 },
  { name: "Iran", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.32, ch4_pc: 1.55, n2o_pc: 0.36, co2_pc: 8.52, lat: 32.4279, lon: 53.688 },
  { name: "Iraq", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.14, ch4_pc: 1.12, n2o_pc: 0.25, co2_pc: 4.85, lat: 33.2232, lon: 43.6793 },
  { name: "Israel", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: false, luc_pc: 0.02, ch4_pc: 0.52, n2o_pc: 0.22, co2_pc: 7.15, lat: 31.0461, lon: 34.8516 },
  { name: "Japan", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: false, luc_pc: 0.04, ch4_pc: 0.24, n2o_pc: 0.15, co2_pc: 8.55, lat: 36.2048, lon: 138.2529 },
  { name: "Jordan", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.05, ch4_pc: 0.42, n2o_pc: 0.18, co2_pc: 2.45, lat: 30.5852, lon: 36.2384 },
  { name: "Kazakhstan", cluster: 1, clusterName: "Peternakan Ekstensif", isAsean: false, luc_pc: 1.45, ch4_pc: 2.85, n2o_pc: 0.88, co2_pc: 12.4, lat: 48.0196, lon: 66.9237 },
  { name: "Kuwait", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.01, ch4_pc: 2.12, n2o_pc: 0.24, co2_pc: 22.5, lat: 29.3117, lon: 47.4818 },
  { name: "Kyrgyzstan", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.24, ch4_pc: 1.25, n2o_pc: 0.35, co2_pc: 1.65, lat: 41.2044, lon: 74.7661 },
  { name: "Lebanon", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.08, ch4_pc: 0.48, n2o_pc: 0.21, co2_pc: 3.85, lat: 33.8547, lon: 35.8623 },
  { name: "Mongolia", cluster: 1, clusterName: "Peternakan Ekstensif", isAsean: false, luc_pc: 1.15, ch4_pc: 6.85, n2o_pc: 1.45, co2_pc: 7.25, lat: 46.8625, lon: 103.8467 },
  { name: "Nepal", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.28, ch4_pc: 0.85, n2o_pc: 0.26, co2_pc: 0.45, lat: 28.3949, lon: 84.124 },
  { name: "New Zealand", cluster: 1, clusterName: "Peternakan Ekstensif", isAsean: false, luc_pc: 2.12, ch4_pc: 7.45, n2o_pc: 2.85, co2_pc: 6.85, lat: -40.9006, lon: 174.886 },
  { name: "Oman", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.04, ch4_pc: 2.45, n2o_pc: 0.31, co2_pc: 16.5, lat: 21.5126, lon: 55.9233 },
  { name: "Pakistan", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.21, ch4_pc: 0.78, n2o_pc: 0.28, co2_pc: 1.05, lat: 30.3753, lon: 69.3451 },
  { name: "Qatar", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.01, ch4_pc: 3.12, n2o_pc: 0.35, co2_pc: 35.2, lat: 25.3548, lon: 51.1839 },
  { name: "Saudi Arabia", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.05, ch4_pc: 1.85, n2o_pc: 0.32, co2_pc: 18.5, lat: 23.8859, lon: 45.0792 },
  { name: "South Korea", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: false, luc_pc: 0.06, ch4_pc: 0.42, n2o_pc: 0.24, co2_pc: 12.1, lat: 35.9078, lon: 127.7669 },
  { name: "Sri Lanka", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.15, ch4_pc: 0.48, n2o_pc: 0.22, co2_pc: 1.15, lat: 7.8731, lon: 80.7718 },
  { name: "Syria", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.14, ch4_pc: 0.62, n2o_pc: 0.25, co2_pc: 1.45, lat: 34.8021, lon: 38.9968 },
  { name: "Tajikistan", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.16, ch4_pc: 0.88, n2o_pc: 0.28, co2_pc: 0.95, lat: 38.861, lon: 71.2761 },
  { name: "Turkey", cluster: 0, clusterName: "Industri Mapan Rendah-Lahan", isAsean: false, luc_pc: 0.25, ch4_pc: 0.85, n2o_pc: 0.38, co2_pc: 5.12, lat: 38.9637, lon: 35.2433 },
  { name: "Turkmenistan", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.22, ch4_pc: 4.85, n2o_pc: 0.52, co2_pc: 11.8, lat: 38.9697, lon: 59.5563 },
  { name: "United Arab Emirates", cluster: 3, clusterName: "Petro-Ekonomi Pengimpor", isAsean: false, luc_pc: 0.02, ch4_pc: 2.65, n2o_pc: 0.28, co2_pc: 21.4, lat: 23.4241, lon: 53.8478 },
  { name: "Uzbekistan", cluster: 4, clusterName: "Padat Penduduk Intensitas Rendah", isAsean: false, luc_pc: 0.18, ch4_pc: 1.65, n2o_pc: 0.42, co2_pc: 3.45, lat: 41.3775, lon: 64.5853 },
];

export const WORKFLOW_PANELS = [
  {
    num: 1,
    id: "clustering",
    title: "Kartografi Tematik & 5 Klaster Pangan",
    role: "Analisis Pola Spasial Regional",
    description: "Pemetaan multidimensi 44 negara ke dalam 5 tipologi sistem pangan berbasis K-Means (k=5). Mengungkap konsentrasi 7 dari 10 negara ASEAN dalam satu klaster Frontier Konversi Lahan.",
    metrics: "Silhouette 0,5336 · ARI Stabilitas 0,973",
    actionText: "Eksplorasi Klaster & Peta",
    path: "/clustering",
    color: "#ef4444",
  },
  {
    num: 2,
    id: "country-audit",
    title: "Audit Komparatif 44 Negara Asia-Pasifik",
    role: "Database Metrik Multi-Emisi",
    description: "Tabel audit interaktif 4 dimensi emisi (LUC, CH₄, N₂O, CO₂ Energi) per kapita dengan sinkronisasi sorotan kartografi langsung saat baris negara dipilih.",
    metrics: "2.816 Baris Data · 0 Missing Values",
    actionText: "Buka Tabel Audit",
    path: "/clustering",
    color: "#3b82f6",
  },
  {
    num: 3,
    id: "spatial",
    title: "Ekonometrika Spasial Lanjut (Moran & SDM)",
    role: "Uji Autokorelasi & Spesifikasi Model",
    description: "Pelacakan lonjakan Global Moran's I 1961–2024 (+0,255 ke +0,729) dan dekomposisi efek LeSage–Pace yang membuktikan limpahan tak langsung N₂O bernilai 2,20× efek langsung.",
    metrics: "Moran's I +0,729 · Multiplier SDM 1,61×",
    actionText: "Buka Ekonometrika Spasial",
    path: "/spasial",
    color: "#06b6d4",
  },
  {
    num: 4,
    id: "simulator",
    title: "Laboratorium Simulator Kebijakan Regional",
    role: "Perhitungan Dampak Kebijakan Lintas Batas",
    description: "Tiga tuas intervensi: efisiensi pupuk nitrogen, moratorium konversi hutan/gambut, dan adopsi AWD padi. Komputasi real-time mitigasi domestik, limpahan kawasan, dan total net.",
    metrics: "Kalkulasi Efek LeSage-Pace Real-Time",
    actionText: "Buka Simulator Kebijakan",
    path: "/simulator",
    color: "#10b981",
  },
  {
    num: 5,
    id: "forecasting",
    title: "Peramalan Metana ASEAN 2025–2035",
    role: "Proyeksi Horizon 10 Tahun Bebas Bocor",
    description: "Evaluasi ketat 2.904 fold-model walk-forward CV. Model Drift & ARIMA Ensemble terbukti paling akurat dengan MAPE 1,34% (h=1) hingga 3,10% (h=10).",
    metrics: "2.904 Fold CV · MAPE 1,34% – 3,10%",
    actionText: "Buka Modul Peramalan",
    path: "/forecasting",
    color: "#8b5cf6",
  },
  {
    num: 6,
    id: "methodology",
    title: "Transparansi & Justifikasi Metodologis",
    role: "Fondasi Ilmiah & Uji Ekonometrika",
    description: "Audit struktur panel seimbang 44 negara, pembuktian mengapa time-fixed effects wajib digunakan (Uji LR p < 0,001), dan matriks bobot spasial k-NN (k=4) yang robust.",
    metrics: "Uji LR p < 0,001 · Matriks k-NN (k=4)",
    actionText: "Baca Metodologi Ilmiah",
    path: "/metodologi",
    color: "#f59e0b",
  },
];

export const EVIDENCE_CARDS = [
  {
    id: "EMP-01",
    type: "Korelasi",
    title: "Paradoks Spearman (0,008)",
    desc: "Korelasi peringkat emisi per kapita dengan pangsa emisi global mendekati nol. Emitor terbesar bukanlah negara per kapita tertinggi.",
    accent: "amber",
  },
  {
    id: "EMP-02",
    type: "Autokorelasi",
    title: "Moran's I Melonjak ke +0,729",
    desc: "Dari +0,255 (1961) naik drastis ke +0,729 (2024). Emisi sistem pangan terklasterisasi kuat secara geografis.",
    accent: "cyan",
  },
  {
    id: "EMP-03",
    type: "Ekonometrika",
    title: "Limpahan Pupuk N₂O (+1,1046)",
    desc: "Efek limpahan lintas batas LeSage-Pace bernilai lebih dari 2× lipat efek langsung domestik (+0,5011).",
    accent: "emerald",
  },
  {
    id: "EMP-04",
    type: "Klasterisasi",
    title: "Frontier Lahan ASEAN (7 dari 10)",
    desc: "Indonesia, Vietnam, Thailand, Malaysia, Myanmar, Kamboja, Laos masuk klaster frontier emisi deforestasi.",
    accent: "crimson",
  },
  {
    id: "EMP-05",
    type: "Peramalan",
    title: "Validasi Silang Bebas Bocor",
    desc: "2.904 fold walk-forward CV menghasilkan MAPE 1,34% (h=1) dan 3,10% (h=10) pada deret metana ASEAN.",
    accent: "violet",
  },
];
