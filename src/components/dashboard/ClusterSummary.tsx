import React from 'react';
import { ClusterProfile } from '../../types/data';
import { AlertTriangle, CheckCircle, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>5 Klaster Tipologi Sistem Pangan</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
              Silhouette 0.5336 · ARI 0.973
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Konfigurasi terpilih dari 864 kombinasi grid search (POTRET · Standard · PCA2 · KMeans · k=5).
          </p>
        </div>

        {selectedClusterId !== null && (
          <button
            onClick={() => onSelectCluster(null)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            Reset Filter Klaster
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => {
          const isSelected = selectedClusterId === profile.id;
          const isFrontier = profile.id === 2;

          return (
            <div
              key={profile.id}
              onClick={() => onSelectCluster(isSelected ? null : profile.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              } ${isFrontier ? 'ring-1 ring-red-500/30' : ''}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1"
                    style={{
                      backgroundColor: `${profile.color}20`,
                      color: profile.color,
                      border: `1px solid ${profile.color}40`,
                    }}
                  >
                    {profile.badge}
                  </span>
                  <h4 className="font-bold text-sm text-white group-hover:text-emerald-400">
                    {profile.nama}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {profile.n_negara} negara
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-3">
                {profile.karakteristik}
              </p>

              {/* ASEAN Members */}
              <div className="mb-3 pt-2 border-t border-slate-800/60">
                <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Anggota ASEAN ({profile.asean_members.length}):
                </span>
                {profile.asean_members.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {profile.asean_members.map((m) => (
                      <span
                        key={m}
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          isFrontier
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">Tidak ada negara ASEAN</span>
                )}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-[11px]">
                <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/40">
                  <span className="text-slate-500 block">Rata-rata CO₂ Lahan:</span>
                  <span className="font-mono font-bold text-red-400">
                    {profile.avg_luc_pc.toFixed(2)} t/kap
                  </span>
                </div>
                <div className="bg-slate-950/40 p-1.5 rounded border border-slate-800/40">
                  <span className="text-slate-500 block">Rata-rata CH₄:</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {profile.avg_ch4_pc.toFixed(2)} t/kap
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
