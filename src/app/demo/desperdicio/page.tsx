import { SectionHeader } from "@/components/section-header";
import { MetricCard } from "@/components/metric-card";
import { AIInsightBox } from "@/components/ai-insight-box";
import { wasteItems, aiInsights } from "@/data/santa-emilia";
import { calculateWasteCost } from "@/lib/calculations/waste";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function DesperdicioPage() {
  const calculated = wasteItems.map((w) => ({
    ...w,
    ...calculateWasteCost({
      frequencyPerWeek: w.frequencyPerWeek,
      minutesLostPerEvent: w.minutesLostPerEvent,
      hourlyLaborCost: w.hourlyLaborCost,
      unitsAffected: w.unitsAffected,
      unitMargin: w.unitMargin,
    }),
  }));

  const totalMonthly = calculated.reduce((sum, w) => sum + w.totalCostMonthly, 0);
  const totalAnnual = totalMonthly * 12;

  const sorted = [...calculated].sort((a, b) => b.totalCostMonthly - a.totalCostMonthly);

  return (
    <>
      <SectionHeader
        step={5}
        title="Costo del desperdicio"
        description="Cuantificación económica del desperdicio operativo — mano de obra + margen perdido."
      />

      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricCard
          label="Desperdicio mensual"
          value={`$${totalMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
          subtitle="Costo de no hacer nada"
          trend="up"
          trendIsGood={false}
        />
        <MetricCard
          label="Proyección anual"
          value={`$${totalAnnual.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
          subtitle="Oportunidad de mejora"
          trend="up"
          trendIsGood={false}
        />
        <MetricCard label="Problemas identificados" value={calculated.length} unit="tipos" />
      </div>

      {/* Waste breakdown */}
      <div className="space-y-3 mb-6">
        {sorted.map((w, i) => {
          const pct = (w.totalCostMonthly / totalMonthly) * 100;
          return (
            <div key={i} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-rizoma-red metric-highlight">#{i + 1}</span>
                  <div>
                    <p className="font-semibold">{w.problemDescription}</p>
                    <p className="text-xs text-muted-foreground">
                      {w.frequencyPerWeek}x/sem &middot; {w.minutesLostPerEvent} min/evento &middot; ${w.hourlyLaborCost}/h
                    </p>
                  </div>
                </div>
                <p className="text-xl font-bold metric-highlight">
                  ${w.totalCostMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  <span className="text-sm font-normal text-muted-foreground">/mes</span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rizoma-red/70 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right">{pct.toFixed(0)}%</span>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>Mano de obra: ${w.laborCostMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                <span>Margen perdido: ${w.marginLostMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          );
        })}
      </div>

      <AIInsightBox title="Análisis de desperdicio">
        <p>{aiInsights.waste.summary}</p>
        <p className="mt-2 font-semibold">Mayor oportunidad:</p>
        <p>{aiInsights.waste.topOpportunity}</p>
      </AIInsightBox>

      <div className="flex justify-between mt-8">
        <Link href="/demo/riesgos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Riesgos
        </Link>
        <Link href="/demo/priorizacion" className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors">
          Siguiente: Priorización <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
