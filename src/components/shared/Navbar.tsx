import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, MapPin, Layers, Sliders, TrendingUp, BookOpen, Home, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navItems = [
    { label: 'Overview', path: '/', icon: Home },
    { label: 'Clusters & Map', path: '/clustering', icon: Layers },
    { label: 'Spatial Econometrics', path: '/spasial', icon: Layers },
    { label: 'Policy Simulator', path: '/simulator', icon: Sliders },
    { label: 'Forecasting', path: '/forecasting', icon: TrendingUp },
    { label: 'Methodology', path: '/metodologi', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b14]/85 backdrop-blur-2xl transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Laser highlight line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 via-cyan-400/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group no-underline shrink-0">
          <div className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-1 ring-white/25 group-hover:scale-105 transition-transform duration-200">
            <Compass className="size-4.5 text-slate-950" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-[16px] tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
                GRAIN
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-1.5 bg-emerald-400" />
                </span>
                WORKSPACE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block leading-none mt-0.5">
              Agrifood Systems Clustering & Spatial Econometrics
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/35 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/70 border border-transparent hover:border-white/10'
                  }`
                }
              >
                <Icon className="size-3.5 text-emerald-400" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Action badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-xl font-mono backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>44 Economies · 1961–2024</span>
          </div>
          <Link
            to="/clustering"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-300 hover:to-teal-400 transition-all shadow-[0_0_18px_rgba(16,185,129,0.4)] flex items-center gap-1.5 no-underline group shrink-0"
          >
            <span>Open Workspace</span>
            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
