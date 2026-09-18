import React from 'react';
import { BookOpen, ShieldCheck, Database, FileText, AlertTriangle, Layers } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
            Transparansi Metodologis
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Audit Ekonometrika & Integritas Statistik
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-400" />
          <span>Dokumentasi Metodologi Ilmiah & Arsitektur Riset</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Seluruh kalkulasi diturunkan secara empiris menggunakan data Our World in Data (OWID) 1961–2024 tanpa imputasi atau manipulasi ad-hoc.
        </p>
      </div>

      {/* 1. DATA SOURCES & PANEL STRUCTURE */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>1. Struktur Data Panel Seimbang</span>
        </h2>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed space-y-3">
          <p>
            Data merupakan panel seimbang sempurna mencakup <strong className="text-white">44 negara Asia-Pasifik × 64 tahun (1961–2024) = 2.816 observasi</strong> tanpa ada satu pun observasi rumpang (*zero missing values*). Sepuluh negara anggota ASEAN seluruhnya termasuk.
          </p>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2">Peran</th>
                  <th className="px-3 py-2">Variabel Operasional</th>
                  <th className="px-3 py-2">Makna Sistem Pangan</th>
                  <th className="px-3 py-2 text-right">Pangsa Ragam Antar-Negara</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="px-3 py-2 text-emerald-400 font-bold">Y (Dependen)</td>
                  <td className="px-3 py-2 text-white">CO₂ alih guna lahan per kapita (LUC)</td>
                  <td className="px-3 py-2 font-sans text-slate-300">Tekanan konversi hutan menjadi lahan pertanian/perkebunan</td>
                  <td className="px-3 py-2 text-right">75.8%</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-cyan-400 font-bold">X1 (Prediktor)</td>
                  <td className="px-3 py-2 text-white">Metana per kapita (CH₄)</td>
                  <td className="px-3 py-2 font-sans text-slate-300">Emisi persawahan tergenang dan ternak ruminansia</td>
                  <td className="px-3 py-2 text-right">86.1%</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-teal-400 font-bold">X2 (Prediktor)</td>
                  <td className="px-3 py-2 text-white">N₂O per kapita</td>
                  <td className="px-3 py-2 font-sans text-slate-300">Intensitas penggunaan pupuk kimia sintetis nitrogen</td>
                  <td className="px-3 py-2 text-right">92.8%</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-slate-400 font-bold">X3 (Prediktor)</td>
                  <td className="px-3 py-2 text-white">CO₂ energi per kapita</td>
                  <td className="px-3 py-2 font-sans text-slate-300">Mekanisasi pertanian, rantai pendingin, dan logistik</td>
                  <td className="px-3 py-2 text-right">85.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. FOUR MANDATORY METHODOLOGICAL NOTES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>2. Empat Keputusan Metodologis Utama</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400">KEPUTUSAN 01</span>
            <h3 className="font-bold text-white text-base">Mengapa Efek Tetap Waktu (Bukan Dua Arah)?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pada spesifikasi efek tetap dua arah (*two-way fixed effects*), seluruh struktur spasial runtuh (ρ = 0.019; LR = 0.53; R² = 0.017). Penyebabnya, efek tetap entitas negara menyerap justru variasi antar-negara yang merupakan sinyal spasial itu sendiri (76–93% variasi adalah antar-negara). Model utama memakai *Time-Fixed Effects*.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">KEPUTUSAN 02</span>
            <h3 className="font-bold text-white text-base">Mengapa Sampel 44 Negara Asia-Pasifik?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pada ASEAN-10 saja, Moran's I tidak signifikan di seluruh spesifikasi bobot yang diuji (p &gt; 0.17). Regresi spasial pada n=10 tidak memiliki kuasa uji statistik (*statistical power*) yang memadai untuk menarik inferensi spasial yang valid.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">KEPUTUSAN 03</span>
            <h3 className="font-bold text-white text-base">Invariansi Tipologi ASEAN (ARI = 1.000)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Perluasan sampel tidak menggeser klaster ASEAN. Tipologi 10 negara ASEAN identik antara sampel Asia-44 dan Asia Monsun-19 dengan *Adjusted Rand Index* (ARI) tepat <strong>1.000</strong>. Perluasan sampel murni demi ketegasan statistik tanpa mengubah realitas empiris ASEAN.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400">KEPUTUSAN 04</span>
            <h3 className="font-bold text-white text-base">Brunei Darussalam sebagai Pencilan Sejati</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Emisi metana Brunei mencapai 6.31 t/kapita yang berasal dari sektor minyak dan gas bumi, bukan dari persawahan atau peternakan pangan. Brunei diperlakukan terbuka sebagai anomali *petro-state* dalam klaster Peternakan/Ekstraktif Ekstensif.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MATRIKS BOBOT SPASIAL & DIAGNOSTIK RESIDUAL */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>3. Matriks Pembobotan Spasial W (k-NN, k=4)</span>
        </h2>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed space-y-3">
          <p>
            Matriks keterkaitan spasial dipilih menggunakan pendekatan tetangga terdekat k-NN (k = 4) dengan standarisasi baris (*row-standardized*), yang menghasilkan ketergantungan residual terkuat pada model OLS awal (Moran's I residual OLS = 0.7029).
          </p>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
            <strong>Kriteria Uji Likelihood Ratio:</strong> SAR vs OLS = 783.5 · SEM vs OLS = 795.6 · SDM vs SAR = 102.7. Nilai AIC minimum 4752.0 dicapai oleh Spatial Durbin Model (SDM).
          </div>
        </div>
      </section>
    </div>
  );
};
