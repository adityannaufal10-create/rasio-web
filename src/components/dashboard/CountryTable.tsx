import React, { useState } from 'react';
import { CountryCluster, LisaData } from '../../types/data';
import { Search, ArrowUpDown, Filter, CheckCircle, AlertCircle } from 'lucide-react';

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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden shadow-xl">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari negara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => setAseanOnly(!aseanOnly)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold whitespace-nowrap transition-colors ${
              aseanOnly
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {aseanOnly ? '✓ 10 Negara ASEAN' : 'Filter ASEAN-10'}
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Menampilkan <span className="text-white font-bold">{sorted.length}</span> dari {countries.length} negara
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto max-h-[460px]">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold z-10">
            <tr>
              <th
                onClick={() => handleSort('country')}
                className="px-4 py-3 cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Negara</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3">Klaster</th>
              <th className="px-4 py-3">LISA Spasial</th>
              <th
                onClick={() => handleSort('luc_pc')}
                className="px-4 py-3 cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>CO₂ Lahan (t/kap)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('ch4_pc')}
                className="px-4 py-3 cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>CH₄ (t/kap)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('n2o_pc')}
                className="px-4 py-3 cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>N₂O (t/kap)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('co2_pc')}
                className="px-4 py-3 cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>CO₂ Energi</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('populasi')}
                className="px-4 py-3 cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Populasi</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {sorted.map((c) => {
              const lisa = lisaMap.get(c.country);
              const isHighHigh = lisa?.lisa === 'High-High';
              const isLowHigh = lisa?.lisa === 'Low-High';

              return (
                <tr
                  key={c.country}
                  onClick={() => onSelectCountry(c)}
                  className="hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-2.5 font-bold text-white flex items-center gap-2">
                    <span>{c.country}</span>
                    {c.is_asean === 1 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        ASEAN
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 text-[11px]">
                      {c.nama_klaster}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    {isHighHigh ? (
                      <span className="text-[11px] font-bold text-red-400 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">
                        High-High (Hotspot)
                      </span>
                    ) : isLowHigh ? (
                      <span className="text-[11px] font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">
                        Low-High (Outlier)
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">
                        {lisa?.lisa || 'Acak'}
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
    </div>
  );
};
