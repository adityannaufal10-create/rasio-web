import React from 'react';
import { PolicySimulator } from '../components/dashboard/PolicySimulator';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Sliders, ShieldCheck, AlertTriangle, Lightbulb, Users, Compass } from 'lucide-react';

export const PolicySimulatorPage: React.FC = () => {
  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
            Decision Support System
          </span>
          <span className="text-xs text-slate-400 font-mono">
            LeSage–Pace SDM Parameter Calibration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Sliders className="size-6 text-amber-400" />
          <span>Policy Intervention Laboratory & Regional Spillover Assessment</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Simulate policy scenarios across agricultural input efficiency, forest conservation covenants, and AWD water management to evaluate aggregate regional ASEAN emissions.
        </p>
      </div>

      {/* Simulator Widget */}
      <PolicySimulator />

      {/* Strategic Policy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:-translate-y-1 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-950/20">
          <CardHeader className="p-5 sm:p-6 pb-2">
            <div className="size-11 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-3">
              <Lightbulb className="size-5" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Nitrogen Fertilizer Rationalization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-1">
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              With an indirect N₂O spillover elasticity of <strong className="text-cyan-300 font-mono">+1.1046</strong>, untargeted synthetic fertilizer subsidies in one economy induce regional cross-border land clearing. ASEAN requires harmonized, ecologically bounded nutrient caps.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-all duration-300 hover:border-red-500/40 hover:shadow-red-950/20">
          <CardHeader className="p-5 sm:p-6 pb-2">
            <div className="size-11 rounded-2xl bg-red-500/15 text-red-400 border border-red-500/30 flex items-center justify-center mb-3">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Transboundary Forest Compact
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-1">
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              Seven ASEAN economies cluster within the <strong className="text-red-300">Land Conversion Frontier</strong>. Unilateral forest moratoria in Indonesia absent coordinated pacts with Malaysia and Indochina simply displace agricultural clearing onto neighboring frontier buffers (*carbon leakage*).
            </p>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-all duration-300 hover:border-teal-500/40 hover:shadow-teal-950/20">
          <CardHeader className="p-5 sm:p-6 pb-2">
            <div className="size-11 rounded-2xl bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-3">
              <Users className="size-5" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Just Transition Climate Finance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 pt-1">
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              Singapore, anchored in the land-sparing industrial cluster, sources nearly all agrifood intake from neighboring Frontier economies. A joint financing mechanism (*ASEAN Green Agrifood Transition Facility*) must channel consumption revenues toward decarbonizing upstream producers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
