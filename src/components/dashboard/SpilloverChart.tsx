import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { SdmDecomposition } from '../../types/data';
import { Layers, ArrowRight, AlertTriangle } from 'lucide-react';

interface SpilloverChartProps {
  data: SdmDecomposition[];
}

export const SpilloverChart: React.FC<SpilloverChartProps> = ({ data }) => {
  // Format data for bar chart
  const formattedData = data.map((d) => ({
    name: d.variabel.replace('log ', '').replace('/kap', ''),
    langsung: d.langsung,
    tak_langsung: d.tak_langsung,
    total: d.total,
  }));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Dekomposisi Efek LeSage–Pace (Spatial Durbin Model)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Memisahkan dampak domestik murni (efek langsung) versus limpahan lintas batas ke negara tetangga (efek tak langsung).
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(val: number) => [val.toFixed(4), '']}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <ReferenceLine y={0} stroke="#475569" />
            <Bar dataKey="langsung" name="Efek Langsung (Domestik)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tak_langsung" name="Efek Tak Langsung (Limpahan Spasial)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="total" name="Efek Total (Multiplier)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Critical Insight Box */}
      <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs flex items-start gap-3">
        <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 mt-0.5">
          <ArrowRight className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-cyan-200">
            Temuan Kritis: Limpahan Pupuk N₂O Lintas Batas ({">"}2× Efek Domestik)
          </p>
          <p className="text-slate-300 leading-relaxed">
            Efek tak langsung intensitas pemupukan N₂O adalah <strong className="text-white">+1.1046</strong>, jauh melampaui dampak domestiknya (<strong className="text-white">+0.5011</strong>). Artinya, ekspansi pertanian dan subsidi pupuk di satu negara ASEAN memicu efek limpahan struktural alih guna lahan di negara-negara tetangganya.
          </p>
        </div>
      </div>
    </div>
  );
};
