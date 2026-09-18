import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  MapPin,
  Layers,
  Sliders,
  TrendingUp,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  Sparkles,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 py-6">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden text-center max-w-5xl mx-auto px-4">
        {/* Background Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-400 font-bold">RASIO 10.0</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300">Studi Ekonometrika Spasial & Sistem Pangan</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Anatomi Emisi Sistem Pangan ASEAN:{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Mendeteksi Hotspot Spasial & Limpahan Lintas Batas
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Mengurai dinamika panel seimbang <strong className="text-white">44 negara Asia-Pasifik × 64 tahun (1961–2024)</strong> dengan integrasi klastering hierarkis non-parametrik, autokorelasi spasial Moran's I, dan <strong className="text-white">Spatial Durbin Model (SDM)</strong>.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/clustering"
            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Jelajahi Peta & 5 Klaster</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/spasial"
            className="px-6 py-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Lihat Bukti Ekonometrika</span>
          </Link>
          <Link
            to="/simulator"
            className="px-6 py-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Simulator Limpahan</span>
          </Link>
        </div>

        {/* 4 Stat Highlights */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
              Pangsa Lahan Global
            </span>
            <p className="text-2xl font-black text-white font-mono mt-1">22.78%</p>
            <p className="text-xs text-slate-400 mt-1">
              Emisi alih guna lahan dunia berasal dari ASEAN (2024).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Hotspot Klaster
            </span>
            <p className="text-2xl font-black text-white font-mono mt-1">7 dari 10</p>
            <p className="text-xs text-slate-400 mt-1">
              Negara ASEAN mengelompok dalam Klaster Frontier Lahan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Global Moran's I
            </span>
            <p className="text-2xl font-black text-white font-mono mt-1">+0.729</p>
            <p className="text-xs text-slate-400 mt-1">
              Autokorelasi spasial emisi lahan sangat kuat (p = 0.002).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
              Limpahan Pupuk N₂O
            </span>
            <p className="text-2xl font-black text-white font-mono mt-1">&gt;2× Domestik</p>
            <p className="text-xs text-slate-400 mt-1">
              Efek limpahan (+1.1046) melebihi efek langsung (+0.5011).
            </p>
          </div>
        </div>
      </section>

      {/* 2. STORYTELLING: 4 BABAK NARASI UTAMA */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Scroll Storytelling
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Empat Babak Investigasi Sistem Pangan ASEAN
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Menelusuri keterkaitan antara ekspansi lahan, input nitrogen, dan limpahan ekonometrika lintas batas negara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Babak 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
                  BABAK 01
                </span>
                <span className="text-xs text-slate-500 font-mono">The Regional Imbalance</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ketimpangan Ekologis: Kontribusi Global vs Intensitas Domestik
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                ASEAN hanya menyumbang <strong className="text-white">7,44%</strong> dari total Gas Rumah Kaca (GRK) global, namun secara mengejutkan memikul <strong className="text-red-400">22,78%</strong> dari seluruh emisi alih guna lahan dunia pada tahun 2024. Indonesia sendirian menyumbang <strong className="text-white">12,57%</strong> emisi alih guna lahan dunia.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Paradoks Spearman:</strong> Korelasi antara intensitas emisi per kapita dengan pangsa emisi global praktis nol (<strong className="text-emerald-400">0.008</strong>). Negara yang paling menentukan stabilitas iklim global bukan negara dengan emisi per kapita tertinggi.
              </div>
            </div>
          </div>

          {/* Babak 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60">
                  BABAK 02
                </span>
                <span className="text-xs text-slate-500 font-mono">Tipologi 44 Negara</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Homogenitas Struktur Pangan: Dominasi Klaster Frontier
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Dari 864 konfigurasi grid search yang diuji, algoritma K-Means (k=5) menghasilkan klaster paling stabil (Silhouette <strong className="text-white">0.5336</strong>, Stabilitas ARI <strong className="text-white">0.973</strong>). Tujuh negara ASEAN—Indonesia, Vietnam, Thailand, Kamboja, Laos, Myanmar, dan Malaysia—mengelompok dalam satu klaster identik: <strong className="text-red-400">Frontier Konversi Lahan</strong>.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Tiga Pengecualian:</strong> Singapura (Industri Mapan Rendah-Lahan), Filipina (Padat Penduduk Intensitas Rendah), dan Brunei (Peternakan/Migas Ekstensif).
              </div>
            </div>
          </div>

          {/* Babak 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
                  BABAK 03
                </span>
                <span className="text-xs text-slate-500 font-mono">Spatial Autocorrelation</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Pengelompokan Spasial Menguat & Limpahan Pupuk N₂O
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Indeks Moran's I melonjak dari <strong className="text-white">+0.255</strong> (1961) menjadi <strong className="text-emerald-400">+0.729</strong> (2024). Emisi sistem pangan tidak lagi terisolasi. Melalui Spatial Durbin Model (SDM), ditemukan bahwa intensitas pupuk nitrogen N₂O menghasilkan efek limpahan lintas batas (<strong className="text-cyan-400">+1.1046</strong>) lebih dari dua kali lipat efek domestiknya (<strong className="text-white">+0.5011</strong>).
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Hotspot LISA 2024:</strong> 7 negara ASEAN terdeteksi sebagai zona <strong className="text-red-400">High-High</strong>, sementara Filipina dan Singapura berada di posisi <strong className="text-purple-400">Low-High</strong>.
              </div>
            </div>
          </div>

          {/* Babak 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800/60">
                  BABAK 04
                </span>
                <span className="text-xs text-slate-500 font-mono">Regional Policy Agenda</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Implikasi Kebijakan: Perlunya Tata Kelola Berbasis Kawasan
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Karena efek limpahan pupuk dan tekanan alih guna lahan merambat melintasi batas kedaulatan, kebijakan iklim yang hanya berorientasi target domestik (NDCs terisolasi) akan gagal mengendalikan *carbon leakage*. ASEAN membutuhkan harmonisasi standar agroekologi dan pasar sertifikasi lahan terpadu.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Simulasi Intervensi:</strong> Reduksi 20% pupuk kimia sintetis di kawasan Frontier mampu menghemat lebih dari 30 Juta Ton CO₂eq emisi tahunan melalui multiplier limpahan kawasan.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PORTAL NAVIGATION CARDS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-[#0b1220] border border-slate-800 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-black text-white tracking-tight">
              Eksplorasi Modul Platform RASIO 10.0
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Pilih modul analitis untuk memeriksa data mentah, grafik spasial interaktif, tabel diagnostik, atau melakukan simulasi skenario kebijakan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              to="/clustering"
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                Peta & 5 Klaster Pangan
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Peta kloroplet dinamis, kartu profil 5 klaster sistem pangan, dan tabel audit 44 negara Asia-Pasifik.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>Buka Dasbor Klaster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/spasial"
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                Ekonometrika Spasial
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Evaluasi model OLS vs SDM (AIC 4752.0), tren Moran's I 64 tahun, dan dekomposisi efek LeSage-Pace.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-400">
                <span>Buka Ekonometrika</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/simulator"
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                Simulator Kebijakan
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Uji skenario efisiensi pupuk kimia, pengendalian deforestasi, dan hitung efek limpahan ke negara tetangga.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400">
                <span>Coba Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
