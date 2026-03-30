"use client";

import { SectionHeader } from "@/components/section-header";
import { MetricCard } from "@/components/metric-card";
import { weeklyMetrics } from "@/data/santa-emilia";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SeguimientoPage() {
  const first = weeklyMetrics[0];
  const last = weeklyMetrics[weeklyMetrics.length - 1];

  const leadTimeImprovement = (((first.leadTime - last.leadTime) / first.leadTime) * 100).toFixed(0);
  const otdImprovement = last.otdOtif - first.otdOtif;

  const chartData = weeklyMetrics.map((w) => ({
    name: `Sem ${w.weekNumber}`,
    "Lead time": w.leadTime,
    "OTD/OTIF": w.otdOtif,
    "Avance plan": w.planProgress,
  }));

  return (
    <>
      <SectionHeader
        step={8}
        title="Seguimiento semanal"
        description="Evolución de indicadores clave durante las primeras 4 semanas de implementación."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Lead time actual"
          value={last.leadTime}
          unit="días"
          subtitle={`-${leadTimeImprovement}% vs semana 1`}
          trend="down"
          trendIsGood={true}
        />
        <MetricCard
          label="OTD/OTIF"
          value={`${last.otdOtif}%`}
          subtitle={`+${otdImprovement}pp vs semana 1`}
          trend="up"
          trendIsGood={true}
        />
        <MetricCard
          label="Pedidos corregidos"
          value={`${last.pctOrdersCorrected}%`}
          subtitle={`Desde ${first.pctOrdersCorrected}%`}
          trend="down"
          trendIsGood={true}
        />
        <MetricCard
          label="Avance del plan"
          value={`${last.planProgress}%`}
          trend="up"
          trendIsGood={true}
        />
      </div>

      {/* Chart */}
      <div className="card p-6 mb-6">
        <h2 className="font-semibold mb-4">Evolución semanal</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4cfc7" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Lead time" stroke="#C32421" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="OTD/OTIF" stroke="#289448" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Avance plan" stroke="#1FACC0" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly detail table */}
      <div className="card overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-semibold">Semana</th>
              <th className="text-right p-3 font-semibold">Lead time</th>
              <th className="text-right p-3 font-semibold">OTD/OTIF</th>
              <th className="text-right p-3 font-semibold">Corregidos</th>
              <th className="text-right p-3 font-semibold">Retrabajos</th>
              <th className="text-right p-3 font-semibold">Plan</th>
            </tr>
          </thead>
          <tbody>
            {weeklyMetrics.map((w) => (
              <tr key={w.weekNumber} className="border-t border-border">
                <td className="p-3 font-medium">Semana {w.weekNumber}</td>
                <td className="p-3 text-right metric-highlight">{w.leadTime} d</td>
                <td className="p-3 text-right metric-highlight">{w.otdOtif}%</td>
                <td className="p-3 text-right metric-highlight">{w.pctOrdersCorrected}%</td>
                <td className="p-3 text-right metric-highlight">{w.reworkPicking}%</td>
                <td className="p-3 text-right metric-highlight font-bold text-rizoma-green">{w.planProgress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/demo/plan" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Plan
        </Link>
        <Link href="/demo/reporte" className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors">
          Siguiente: Reporte <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
