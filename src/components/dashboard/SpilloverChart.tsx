import { useReducedMotion } from "@/landing/motion";
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
  const reduced = useReducedMotion();
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
          <Layers className="size-5 text-neutral-800" />
          <span>LeSage–Pace Effect Decomposition (SDM Model)</span>
        </CardTitle>
        <CardDescription className="mt-1">
          Partitioning pure domestic impacts (direct effects) versus cross-border spillovers onto neighboring economies (indirect effects).
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line-strong)" opacity={0.6} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'rgba(29,29,31,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(29,29,31,0.08)',
                }}
                formatter={(val: number) => [val.toFixed(4), '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <ReferenceLine y={0} stroke="#475569" />
              <Bar isAnimationActive={!reduced} animationDuration={550} dataKey="langsung" name="Direct Effect (Domestic)" fill="var(--plot-primary)" radius={[4, 4, 0, 0]} />
              <Bar isAnimationActive={!reduced} animationDuration={550} dataKey="tak_langsung" name="Indirect Effect (Spatial Spillover)" fill="var(--plot-secondary)" radius={[4, 4, 0, 0]} />
              <Bar isAnimationActive={!reduced} animationDuration={550} dataKey="total" name="Total Multiplier Effect" fill="var(--plot-plum)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Critical Insight Box */}
        <div className="mt-4 p-4 rounded-xl bg-grain-mist border border-black/10 text-xs flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-grain-mist text-neutral-800 mt-0.5 shrink-0">
            <ArrowRight className="size-3.5" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-neutral-800 text-[12.5px]">
              Critical Finding: Cross-Border Synthetic N₂O Fertilizer Spillover ({">"}2× Domestic Effect)
            </p>
            <p className="text-neutral-700 leading-relaxed text-[11.5px]">
              The indirect effect of synthetic N₂O fertilizer intensity reaches <strong className="text-neutral-950">+1.1046</strong>, more than double its direct domestic effect (<strong className="text-neutral-950">+0.5011</strong>). This reveals that agricultural expansion and fertilizer subsidies in one ASEAN economy generate structural land conversion spillovers across neighboring territories.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
