import React, { useState } from 'react';
import { CountryCluster, LisaData } from '../../types/data';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Search, ArrowUpDown, Filter, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountryTableProps {
  countries: CountryCluster[];
  lisaData: LisaData[];
  selectedClusterId: number | null;
  onSelectCountry: (country: CountryCluster) => void;
}

export const CountryTable: React.FC<CountryTableProps> = ({
  countries,
  lisaData,
  selectedClusterId,
  onSelectCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aseanOnly, setAseanOnly] = useState(false);
  const [sortField, setSortField] = useState<keyof CountryCluster>('luc_pc');
  const [sortAsc, setSortAsc] = useState(false);

  const lisaMap = new Map<string, LisaData>();
  lisaData.forEach((l) => lisaMap.set(l.country, l));

  const filtered = countries.filter((c) => {
    const matchSearch = c.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCluster = selectedClusterId === null || c.klaster === selectedClusterId;
    const matchAsean = !aseanOnly || c.is_asean === 1;
    return matchSearch && matchCluster && matchAsean;
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (field: keyof CountryCluster) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Table Header Controls */}
      <CardHeader className="p-4 sm:p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search economy name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all"
            />
          </div>
          <button
            onClick={() => setAseanOnly(!aseanOnly)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-xl border font-semibold whitespace-nowrap transition-all",
              aseanOnly
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-950/30"
                : "bg-slate-800/80 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800"
            )}
          >
            {aseanOnly ? "✓ 10 ASEAN Economies" : "Filter ASEAN-10"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>Showing</span>
          <span className="rounded-md bg-slate-800/80 border border-white/5 px-2 py-0.5 text-white font-bold">
            {sorted.length} / {countries.length}
          </span>
          <span>economies</span>
        </div>
      </CardHeader>

      {/* Table Content */}
      <CardContent className="p-0">
        <div className="overflow-x-auto max-h-[460px]">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="sticky top-0 bg-slate-950/95 backdrop-blur border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold z-10 text-[11px]">
              <tr>
                <th
                  onClick={() => handleSort('country')}
                  className="px-4 py-3 cursor-pointer hover:text-white transition-colors whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Economy</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap">Cluster</th>
                <th className="px-4 py-3 whitespace-nowrap">Spatial LISA</th>
                <th
                  onClick={() => handleSort('luc_pc')}
                  className="px-4 py-3 cursor-pointer hover:text-white transition-colors text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Land CO₂ (t/cap)</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('ch4_pc')}
                  className="px-4 py-3 cursor-pointer hover:text-white transition-colors text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>CH₄ (t/cap)</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('n2o_pc')}
                  className="px-4 py-3 cursor-pointer hover:text-white transition-colors text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>N₂O (t/cap)</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('co2_pc')}
                  className="px-4 py-3 cursor-pointer hover:text-white transition-colors text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Energy CO₂</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('populasi')}
                  className="px-4 py-3 cursor-pointer hover:text-white transition-colors text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Population</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {sorted.map((c) => {
                const lisa = lisaMap.get(c.country);
                const isHighHigh = lisa?.lisa === 'High-High';
                const isLowHigh = lisa?.lisa === 'Low-High';

                return (
                  <tr
                    key={c.country}
                    onClick={() => onSelectCountry(c)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-2.5 font-bold text-white flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
                      <span>{c.country}</span>
                      {c.is_asean === 1 && (
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                          ASEAN
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-slate-300">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium">
                        {c.nama_klaster}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      {isHighHigh ? (
                        <span className="text-[10.5px] font-bold text-red-400 px-2.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/30">
                          High-High (Hotspot)
                        </span>
                      ) : isLowHigh ? (
                        <span className="text-[10.5px] font-bold text-purple-400 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30">
                          Low-High (Outlier)
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">
                          {lisa?.lisa || 'Random'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-red-400">
                      {c.luc_pc.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-cyan-400">
                      {c.ch4_pc.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-emerald-400">
                      {c.n2o_pc.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-300">
                      {c.co2_pc.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-400">
                      {(c.populasi / 1e6).toFixed(1)}M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
