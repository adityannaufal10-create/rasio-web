import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Globe, MapPin, Activity, Sliders, TrendingUp, BookOpen, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navItems = [
    { label: 'Beranda', path: '/', icon: Globe },
    { label: 'Peta & Klaster', path: '/clustering', icon: MapPin },
    { label: 'Ekonometrika Spasial', path: '/spasial', icon: Layers },
    { label: 'Simulator Limpahan', path: '/simulator', icon: Sliders },
    { label: 'Peramalan', path: '/forecasting', icon: TrendingUp },
    { label: 'Metodologi', path: '/metodologi', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070b14]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                GRAIN
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Pangan & Emisi
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Klasterisasi & Ekonometrika Panel-Spasial ASEAN
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Action badge */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>44 Negara · 64 Tahun (1961–2024)</span>
          </div>
          <Link
            to="/clustering"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <span>Buka Peta</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
