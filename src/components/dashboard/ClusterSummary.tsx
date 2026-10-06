import React from 'react';
import { ClusterProfile } from '../../types/data';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { AlertTriangle, CheckCircle, ShieldAlert, Sparkles, TrendingUp, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClusterSummaryProps {
  profiles: ClusterProfile[];
  selectedClusterId: number | null;
  onSelectCluster: (id: number | null) => void;
}

export const ClusterSummary: React.FC<ClusterSummaryProps> = ({
  profiles,
  selectedClusterId,
  onSelectCluster,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>5 Agrifood System Typology Clusters</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
              Silhouette 0.5336 · ARI 0.973
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Optimal configuration identified across 864 grid search specifications (SNAPSHOT · Standard · PCA2 · KMeans · k=5).
          </p>
        </div>

        {selectedClusterId !== null && (
          <button
            onClick={() => onSelectCluster(null)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/80 transition-all hover:bg-slate-700/80 w-fit"
          >
            Reset Cluster Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => {
          const isSelected = selectedClusterId === profile.id;
          const isFrontier = profile.id === 2;

          return (
            <Card
              key={profile.id}
              onClick={() => onSelectCluster(isSelected ? null : profile.id)}
              className={cn(
                "group cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden",
                isSelected
                  ? "border-emerald-500/80 bg-slate-900/90 shadow-2xl shadow-emerald-950/30 ring-1 ring-emerald-500/50"
                  : "hover:border-slate-700 hover:bg-slate-900/80",
                isFrontier && !isSelected && "border-red-500/30 shadow-red-950/10"
              )}
            >
              {/* Top ambient color strip */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: profile.color }}
              />

              <CardHeader className="p-5 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="inline-block text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${profile.color}15`,
                      color: profile.color,
                      border: `1px solid ${profile.color}40`,
                    }}
                  >
                    {profile.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {profile.n_negara} economies
                  </span>
                </div>

                <CardTitle className="text-[15px] font-bold text-white group-hover:text-emerald-300 transition-colors mt-2">
                  {profile.nama}
                </CardTitle>
                <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-3">
                  {profile.karakteristik}
                </p>
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-3">
                {/* ASEAN Members */}
                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-300">
                      ASEAN Members:
                    </span>
                    <span className="text-[10.5px] font-mono text-slate-400">
                      {profile.asean_members.length} Economies
                    </span>
                  </div>

                  {profile.asean_members.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {profile.asean_members.map((m) => (
                        <span
                          key={m}
                          className={cn(
                            "text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-tight transition-colors",
                            isFrontier
                              ? "bg-red-500/15 text-red-300 border border-red-500/30"
                              : "bg-slate-800/80 text-slate-300 border border-white/5"
                          )}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500 italic block">
                      No ASEAN member economies
                    </span>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 flex flex-col justify-between">
                    <span className="text-slate-500 text-[10.5px]">Mean Land CO₂:</span>
                    <span className="font-mono font-bold text-red-400 text-[13px] mt-0.5">
                      {profile.avg_luc_pc.toFixed(2)}{" "}
                      <span className="text-[10px] font-sans font-normal text-slate-400">t/cap</span>
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 flex flex-col justify-between">
                    <span className="text-slate-500 text-[10.5px]">Mean CH₄:</span>
                    <span className="font-mono font-bold text-cyan-400 text-[13px] mt-0.5">
                      {profile.avg_ch4_pc.toFixed(2)}{" "}
                      <span className="text-[10px] font-sans font-normal text-slate-400">t/cap</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
