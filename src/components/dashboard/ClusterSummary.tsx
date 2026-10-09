import React from 'react';
import { ClusterProfile } from '../../types/data';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Leaf, Users, Factory, Beef, Fuel } from 'lucide-react';
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
  const icons = { 0: Factory, 1: Beef, 2: Leaf, 3: Fuel, 4: Users };
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-neutral-950 tracking-tight flex items-center gap-2">
            <span>5 Agrifood System Typology Clusters</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-grain-mist text-neutral-800 border border-black/10 font-mono font-bold">
              Silhouette 0.5336 · ARI 0.973
            </span>
          </h3>
          <p className="text-xs text-neutral-600 mt-0.5">
            Optimal configuration identified across 864 grid search specifications (SNAPSHOT · Standard · PCA2 · KMeans · k=5).
          </p>
        </div>

        {selectedClusterId !== null && (
          <button
            onClick={() => onSelectCluster(null)}
            className="text-xs px-3 py-1.5 rounded-xl bg-neutral-100/80 text-neutral-700 hover:text-neutral-950 border border-neutral-300/80 transition-all hover:bg-neutral-200/80 w-fit"
          >
            Reset Cluster Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => {
          const isSelected = selectedClusterId === profile.id;
          const isFrontier = profile.id === 2;
          const Icon = icons[profile.id] || Leaf;

          return (
            <Card
              key={profile.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={"Filter " + profile.nama}
              onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectCluster(isSelected ? null : profile.id); }
              }}
              onClick={() => onSelectCluster(isSelected ? null : profile.id)}
              className={cn(
                "grain-feature-card group cursor-pointer transition-colors duration-200 relative overflow-hidden",
                isSelected
                  ? "border-black/10 bg-surface/90 shadow-sm shadow-black/5 ring-1 ring-black/5"
                  : "hover:border-neutral-300 hover:bg-surface/80",
                isFrontier && !isSelected && "border-black/10"
              )}
            >
              <CardHeader className="p-6 pb-3">
                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-800"><Icon size={20} strokeWidth={1.7} /></div>
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="inline-block text-[10px] font-medium text-neutral-600"
                  >
                    {profile.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg bg-neutral-100/80 text-neutral-700 border border-neutral-300/60">
                    {profile.n_negara} economies
                  </span>
                </div>

                <CardTitle className="text-lg font-medium text-neutral-950 mt-2">
                  {profile.nama}
                </CardTitle>
                <p className="text-[14px] text-neutral-600 leading-relaxed">
                  {profile.karakteristik}
                </p>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-3">
                {/* ASEAN Members */}
                <div className="pt-3 border-t border-black/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-neutral-700">
                      ASEAN Members:
                    </span>
                    <span className="text-[10.5px] font-mono text-neutral-600">
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
                              ? "bg-red-500/15 text-red-700 border border-red-500/30"
                              : "bg-neutral-100/80 text-neutral-700 border border-black/5"
                          )}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-neutral-500 italic block">
                      No ASEAN member economies
                    </span>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="bg-neutral-100/60 p-2.5 rounded-xl border border-black/5 flex flex-col justify-between">
                    <span className="text-neutral-500 text-[10.5px]">Mean Land CO₂:</span>
                    <span className="font-mono font-bold text-red-700 text-[13px] mt-0.5">
                      {profile.avg_luc_pc.toFixed(2)}{" "}
                      <span className="text-[10px] font-sans font-normal text-neutral-600">t/cap</span>
                    </span>
                  </div>
                  <div className="bg-neutral-100/60 p-2.5 rounded-xl border border-black/5 flex flex-col justify-between">
                    <span className="text-neutral-500 text-[10.5px]">Mean CH₄:</span>
                    <span className="font-mono font-bold text-neutral-800 text-[13px] mt-0.5">
                      {profile.avg_ch4_pc.toFixed(2)}{" "}
                      <span className="text-[10px] font-sans font-normal text-neutral-600">t/cap</span>
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
