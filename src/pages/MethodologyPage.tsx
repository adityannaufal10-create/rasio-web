import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { BookOpen, ShieldCheck, Database, FileText, AlertTriangle, Layers } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
            Transparansi Metodologis
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Audit Ekonometrika & Integritas Statistik
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <BookOpen className="size-6 text-purple-400" />
          <span>Dokumentasi Metodologi Ilmiah & Arsitektur Riset</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Seluruh kalkulasi diturunkan secara empiris menggunakan data Our World in Data (OWID) 1961–2024 tanpa imputasi atau manipulasi ad-hoc.
        </p>
      </div>

      {/* 1. DATA SOURCES & PANEL STRUCTURE */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Database className="size-5 text-emerald-400" />
          <span>1. Struktur Data Panel Seimbang</span>
        </h2>
        
        <Card className="overflow-hidden">
          <CardHeader className="p-5 sm:p-6 pb-3">
            <CardTitle className="text-base font-bold text-white">
              Data Panel Seimbang Sempurna (Balanced Panel)
            </CardTitle>
            <CardDescription>
              Mencakup <strong className="text-white">44 negara Asia-Pasifik × 64 tahun (1961–2024) = 2.816 observasi</strong> tanpa ada satu pun observasi rumpang (*zero missing values*). Sepuluh negara anggota ASEAN seluruhnya termasuk.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/90 text-slate-400 uppercase font-semibold border-b border-white/10 text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Peran</th>
                    <th className="px-4 py-3">Variabel Operasional</th>
                    <th className="px-4 py-3 font-sans">Makna Sistem Pangan</th>
                    <th className="px-4 py-3 text-right">Pangsa Ragam Antar-Negara</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 text-emerald-400 font-bold">Y (Dependen)</td>
                    <td className="px-4 py-3 text-white font-sans font-semibold">CO₂ alih guna lahan per kapita (LUC)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Tekanan konversi hutan menjadi lahan pertanian/perkebunan</td>
                    <td className="px-4 py-3 text-right text-emerald-400 font-bold">75.8%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 text-cyan-400 font-bold">X1 (Prediktor)</td>
                    <td className="px-4 py-3 text-white font-sans font-semibold">Metana per kapita (CH₄)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Emisi persawahan tergenang dan ternak ruminansia</td>
                    <td className="px-4 py-3 text-right text-cyan-400 font-bold">86.1%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 text-teal-400 font-bold">X2 (Prediktor)</td>
                    <td className="px-4 py-3 text-white font-sans font-semibold">N₂O per kapita</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Intensitas penggunaan pupuk kimia sintetis nitrogen</td>
                    <td className="px-4 py-3 text-right text-teal-400 font-bold">92.8%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 text-slate-400 font-bold">X3 (Prediktor)</td>
                    <td className="px-4 py-3 text-white font-sans font-semibold">CO₂ energi per kapita</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Mekanisasi pertanian, rantai pendingin, dan logistik</td>
                    <td className="px-4 py-3 text-right text-slate-300 font-bold">85.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. FOUR MANDATORY METHODOLOGICAL NOTES */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="size-5 text-amber-400" />
          <span>2. Empat Keputusan Metodologis Utama</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-amber-500/40 hover:shadow-amber-950/20">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 w-fit">
                KEPUTUSAN 01
              </span>
              <CardTitle className="text-base font-bold text-white mt-2">
                Mengapa Efek Tetap Waktu (Bukan Dua Arah)?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                Pada spesifikasi efek tetap dua arah (*two-way fixed effects*), seluruh struktur spasial runtuh (ρ = 0.019; LR = 0.53; R² = 0.017). Penyebabnya, efek tetap entitas negara menyerap justru variasi antar-negara yang merupakan sinyal spasial itu sendiri (76–93% variasi adalah antar-negara). Model utama memakai *Time-Fixed Effects*.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-950/20">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 w-fit">
                KEPUTUSAN 02
              </span>
              <CardTitle className="text-base font-bold text-white mt-2">
                Mengapa Sampel 44 Negara Asia-Pasifik?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                Pada ASEAN-10 saja, Moran's I tidak signifikan di seluruh spesifikasi bobot yang diuji (p &gt; 0.17). Regresi spasial pada n=10 tidak memiliki kuasa uji statistik (*statistical power*) yang memadai untuk menarik inferensi spasial yang valid.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-950/20">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
                KEPUTUSAN 03
              </span>
              <CardTitle className="text-base font-bold text-white mt-2">
                Invariansi Tipologi ASEAN (ARI = 1.000)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                Perluasan sampel tidak menggeser klaster ASEAN. Tipologi 10 negara ASEAN identik antara sampel Asia-44 dan Asia Monsun-19 dengan *Adjusted Rand Index* (ARI) tepat <strong className="text-cyan-300 font-mono">1.000</strong>. Perluasan sampel murni demi ketegasan statistik tanpa mengubah realitas empiris ASEAN.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:-translate-y-0.5 transition-all duration-300 hover:border-purple-500/40 hover:shadow-purple-950/20">
            <CardHeader className="p-5 pb-2">
              <span className="text-[10px] font-mono font-bold text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 w-fit">
                KEPUTUSAN 04
              </span>
              <CardTitle className="text-base font-bold text-white mt-2">
                Brunei Darussalam sebagai Pencilan Sejati
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-1">
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                Emisi metana Brunei mencapai 6.31 t/kapita yang berasal dari sektor minyak dan gas bumi, bukan dari persawahan atau peternakan pangan. Brunei diperlakukan terbuka sebagai anomali *petro-state* dalam klaster Peternakan/Ekstraktif Ekstensif.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. MATRIKS BOBOT SPASIAL & DIAGNOSTIK RESIDUAL */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Layers className="size-5 text-cyan-400" />
          <span>3. Matriks Pembobotan Spasial W (k-NN, k=4)</span>
        </h2>
        
        <Card className="p-5 sm:p-6 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            Matriks keterkaitan spasial dipilih menggunakan pendekatan tetangga terdekat k-NN (k = 4) dengan standarisasi baris (*row-standardized*), yang menghasilkan ketergantungan residual terkuat pada model OLS awal (Moran's I residual OLS = 0.7029).
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/10 font-mono text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">Kriteria Uji Likelihood Ratio:</strong> SAR vs OLS = 783.5 · SEM vs OLS = 795.6 · SDM vs SAR = 102.7. Nilai AIC minimum 4752.0 dicapai oleh Spatial Durbin Model (SDM).
          </div>
        </Card>
      </section>
    </div>
  );
};
