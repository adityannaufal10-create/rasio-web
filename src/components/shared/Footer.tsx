import React from 'react';
import { ShieldCheck, Database, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#060913] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-extrabold text-white text-lg tracking-tight">GRAIN</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Karya Ilmiah & Visualisasi
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Platform interaktif klasterisasi dan ekonometrika panel-spasial sistem pangan ASEAN & Asia-Pasifik. Membedah ketergantungan spasial, fenomena alih guna lahan, dan efek limpahan lintas batas 1961–2024.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Spesifikasi SDM Efek Tetap Waktu (AIC 4752.0 · R² 0.481)</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Sumber Data</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Database className="w-3.5 h-3.5" />
              <span>Our World in Data (OWID)</span>
            </li>
            <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Database className="w-3.5 h-3.5" />
              <span>Global Carbon Budget & Jones et al.</span>
            </li>
            <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Database className="w-3.5 h-3.5" />
              <span>FAOSTAT Pangan & Pertanian</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Modul Analisis</h4>
          <ul className="text-sm space-y-2">
            <li><a href="/clustering" className="hover:text-emerald-400 transition-colors">5 Klaster Tipologi Pangan</a></li>
            <li><a href="/spasial" className="hover:text-emerald-400 transition-colors">Autokorelasi Moran & LISA</a></li>
            <li><a href="/simulator" className="hover:text-emerald-400 transition-colors">Kalkulator Limpahan Pupuk N₂O</a></li>
            <li><a href="/forecasting" className="hover:text-emerald-400 transition-colors">Proyeksi Metana ASEAN 2026+</a></li>
            <li><a href="/metodologi" className="hover:text-emerald-400 transition-colors">Dokumentasi Metodologi</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 Tim IRIS | Rasio 10.0</p>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <span className="flex items-center gap-1 text-slate-400">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Studi Kasus Ekonometrika & Data Science Terapan</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
