import { SectionHeader } from "@/components/section-header";
import { MetricCard } from "@/components/metric-card";
import { caseData, processSteps, wasteItems, risks, weeklyMetrics, aiInsights } from "@/data/santa-emilia";
import { calculateVSM } from "@/lib/calculations/vsm";
import { calculateWasteCost } from "@/lib/calculations/waste";
import { rankRisks, getRiskLevel } from "@/lib/calculations/risk";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ReportePage() {
  const vsm = calculateVSM(processSteps);
  const totalWaste = wasteItems.reduce((sum, w) => {
    const result = calculateWasteCost({
      frequencyPerWeek: w.frequencyPerWeek,
      minutesLostPerEvent: w.minutesLostPerEvent,
      hourlyLaborCost: w.hourlyLaborCost,
      unitsAffected: w.unitsAffected,
      unitMargin: w.unitMargin,
    });
    return sum + result.totalCostMonthly;
  }, 0);

  const ranked = rankRisks(risks);
  const criticalRisks = ranked.filter((r) => getRiskLevel(r.exposure) === "critical").length;
  const highRisks = ranked.filter((r) => getRiskLevel(r.exposure) === "high").length;

  const last = weeklyMetrics[weeklyMetrics.length - 1];
  const first = weeklyMetrics[0];

  return (
    <>
      <SectionHeader
        step={9}
        title="Reporte ejecutivo"
        description="Resumen consolidado de hallazgos, mejoras implementadas y resultados obtenidos."
      />

      {/* Executive summary */}
      <div className="card p-6 mb-8 border-l-4 border-l-rizoma-green">
        <h2 className="font-bold text-lg mb-3 font-serif">Resumen ejecutivo</h2>
        <p className="text-foreground/80 leading-relaxed">{aiInsights.report.executiveSummary}</p>
      </div>

      {/* Key results grid */}
      <h2 className="font-semibold mb-4">Resultados clave (4 semanas)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Lead time"
          value={`${first.leadTime} → ${last.leadTime}`}
          unit="días"
          subtitle={`-${(((first.leadTime - last.leadTime) / first.leadTime) * 100).toFixed(0)}%`}
          trend="down"
          trendIsGood={true}
        />
        <MetricCard
          label="OTD/OTIF"
          value={`${first.otdOtif}% → ${last.otdOtif}%`}
          subtitle={`+${last.otdOtif - first.otdOtif}pp`}
          trend="up"
          trendIsGood={true}
        />
        <MetricCard
          label="Desperdicio mensual"
          value={`$${totalWaste.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
          subtitle="Identificado para reducción"
        />
        <MetricCard
          label="Riesgos críticos/altos"
          value={`${criticalRisks + highRisks}`}
          subtitle={`${criticalRisks} crítico, ${highRisks} altos`}
        />
      </div>

      {/* Findings by module */}
      <h2 className="font-semibold mb-4">Hallazgos por área</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card p-4">
          <h3 className="font-semibold text-sm text-rizoma-green mb-2">Diagnóstico</h3>
          <p className="text-sm text-foreground/80">Madurez media (2.53/5). Brechas en control formal y retroalimentación. Procesos informales prevalecen.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold text-sm text-rizoma-green mb-2">Flujo de valor</h3>
          <p className="text-sm text-foreground/80">Eficiencia de flujo del {vsm.flowEfficiency}%. El 97% del tiempo es espera, no proceso. Picking concentra el mayor cuello de botella.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold text-sm text-rizoma-green mb-2">Riesgos</h3>
          <p className="text-sm text-foreground/80">{criticalRisks} riesgo crítico (empaque importado), {highRisks} riesgos altos. 83% en zona alta o crítica.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold text-sm text-rizoma-green mb-2">Desperdicio</h3>
          <p className="text-sm text-foreground/80">${totalWaste.toLocaleString("en-US", { maximumFractionDigits: 0 })}/mes en 4 categorías. Corrección de pedidos y holds financieros representan el 58%.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="card p-8 bg-gradient-to-br from-rizoma-green/5 to-rizoma-cyan/5 border-rizoma-green/20 text-center mb-8">
        <h2 className="text-2xl font-bold font-serif mb-3">
          ¿Quieres ver esto con los datos de tu empresa?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Rizoma aplica ciencia de datos y metodologías probadas para diagnosticar,
          priorizar e implementar mejoras operativas con resultados medibles.
        </p>
        <Link
          href="/#contacto"
          className="inline-flex items-center gap-2 bg-rizoma-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors text-lg"
        >
          Agendar una sesión
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex justify-start mt-8">
        <Link href="/demo/seguimiento" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Seguimiento
        </Link>
      </div>
    </>
  );
}
