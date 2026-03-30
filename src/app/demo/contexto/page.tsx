import { SectionHeader } from "@/components/section-header";
import { MetricCard } from "@/components/metric-card";
import { caseData } from "@/data/santa-emilia";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContextoPage() {
  const m = caseData.metrics;

  return (
    <>
      <SectionHeader
        step={1}
        title="Contexto del caso"
        description="Datos de la empresa y métricas de línea base del proceso bajo análisis."
      />

      <div className="card p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Empresa</p>
            <p className="font-semibold text-lg">{caseData.companyName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sector</p>
            <p className="font-semibold">{caseData.sector}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Proceso</p>
            <p className="font-semibold">{caseData.processFocus}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Moneda</p>
            <p className="font-semibold">{caseData.currency}</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Métricas de línea base</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Pedidos / semana" value={m.weeklyOrders} />
        <MetricCard label="Ticket promedio" value={`$${m.avgTicketUsd}`} />
        <MetricCard label="Margen de contribución" value={`${(m.contributionMargin * 100).toFixed(0)}%`} />
        <MetricCard label="OTD/OTIF" value={`${(m.otdOtif * 100).toFixed(0)}%`} subtitle="Cumplimiento bajo" trend="down" trendIsGood={false} />
        <MetricCard label="Lead time" value={m.leadTimeDays} unit="días" subtitle="Oportunidad de mejora" trend="neutral" />
        <MetricCard label="Retrabajo picking" value={`${(m.reworkPicking * 100).toFixed(0)}%`} subtitle="Por encima del benchmark" trend="up" trendIsGood={false} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard label="Pedidos modificados" value={`${(m.modifiedOrders * 100).toFixed(0)}%`} />
        <MetricCard label="Pedidos corregidos" value={`${(m.correctedOrders * 100).toFixed(0)}%`} />
        <MetricCard label="Hold financiero" value={`${(m.financialHold * 100).toFixed(0)}%`} />
      </div>

      <div className="flex justify-end">
        <Link
          href="/demo/diagnostico"
          className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors"
        >
          Siguiente: Diagnóstico
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
