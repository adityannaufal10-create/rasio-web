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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
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
    <Card className="flex flex-col justify-between">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="flex items-center gap-2">
          <Layers className="size-5 text-cyan-400" />
          <span>Dekomposisi Efek LeSage–Pace (SDM Model)</span>
        </CardTitle>
        <CardDescription className="mt-1">
          Memisahkan dampak domestik murni (efek langsung) versus limpahan lintas batas ke negara tetangga (efek tak langsung).
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
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
        <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/25 text-xs flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 mt-0.5 shrink-0">
            <ArrowRight className="size-3.5" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-cyan-200 text-[12.5px]">
              Temuan Kritis: Limpahan Pupuk N₂O Lintas Batas ({">"}2× Efek Domestik)
            </p>
            <p className="text-slate-300 leading-relaxed text-[11.5px]">
              Efek tak langsung intensitas pemupukan N₂O adalah <strong className="text-white">+1.1046</strong>, jauh melampaui dampak domestiknya (<strong className="text-white">+0.5011</strong>). Artinya, ekspansi pertanian dan subsidi pupuk di satu negara ASEAN memicu efek limpahan struktural alih guna lahan di negara-negara tetangganya.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
