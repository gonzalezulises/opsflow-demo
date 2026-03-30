import { SectionHeader } from "@/components/section-header";
import { MetricCard } from "@/components/metric-card";
import { AIInsightBox } from "@/components/ai-insight-box";
import { processSteps, aiInsights } from "@/data/santa-emilia";
import { calculateVSM } from "@/lib/calculations/vsm";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function VSMPage() {
  const vsm = calculateVSM(processSteps);

  return (
    <>
      <SectionHeader
        step={3}
        title="Mapa de flujo de valor (VSM)"
        description="Análisis del flujo actual del proceso pedido a despacho — tiempos, esperas y eficiencia."
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Lead time" value={vsm.leadTimeDays} unit="días" />
        <MetricCard label="Eficiencia de flujo" value={`${vsm.flowEfficiency}%`} subtitle="Solo 0.89% es valor" trend="down" trendIsGood={false} />
        <MetricCard label="Tiempo valor agregado" value={vsm.valueAddTimeMinutes} unit="min" />
        <MetricCard label="Retrabajo promedio" value={`${vsm.avgRework}%`} />
      </div>

      {/* Process flow visualization */}
      <div className="card p-6 mb-6">
        <h2 className="font-semibold mb-4">Flujo del proceso</h2>
        <div className="space-y-3">
          {processSteps.map((step, i) => {
            const totalMinutes = step.processTimeMinutes + step.waitTimeHours * 60;
            const waitPct = (step.waitTimeHours * 60 / totalMinutes) * 100;

            return (
              <div key={i} className="flex items-stretch gap-3">
                {/* Step info */}
                <div className="w-48 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${step.addsValue ? "bg-rizoma-green" : "bg-muted-foreground/30"}`} />
                    <p className="text-sm font-semibold truncate">{step.stepName}</p>
                  </div>
                  <p className="text-xs text-muted-foreground ml-5">{step.department}</p>
                </div>

                {/* Time bars */}
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden flex">
                    <div
                      className="bg-rizoma-green/70 h-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ width: `${100 - waitPct}%`, minWidth: "30px" }}
                    >
                      {step.processTimeMinutes}m
                    </div>
                    <div
                      className="bg-amber-400/60 h-full flex items-center justify-center text-[10px] font-bold text-amber-900"
                      style={{ width: `${waitPct}%` }}
                    >
                      {step.waitTimeHours}h espera
                    </div>
                  </div>
                  <span className={`text-xs w-14 text-right font-medium ${step.reworkPercentage > 10 ? "text-rizoma-red" : "text-muted-foreground"}`}>
                    {step.reworkPercentage}% rew.
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rizoma-green/70" /> Proceso
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400/60" /> Espera
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rizoma-green" /> Agrega valor
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" /> No agrega valor
          </span>
        </div>
      </div>

      {/* Detail table */}
      <div className="card overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-semibold">Paso</th>
              <th className="text-right p-3 font-semibold">Proceso</th>
              <th className="text-right p-3 font-semibold">Espera</th>
              <th className="text-right p-3 font-semibold">Retrabajo</th>
              <th className="text-center p-3 font-semibold">Valor</th>
              <th className="text-left p-3 font-semibold">Sistema</th>
            </tr>
          </thead>
          <tbody>
            {processSteps.map((step, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-3 font-medium">{step.stepName}</td>
                <td className="p-3 text-right metric-highlight">{step.processTimeMinutes} min</td>
                <td className="p-3 text-right metric-highlight">{step.waitTimeHours} h</td>
                <td className={`p-3 text-right metric-highlight ${step.reworkPercentage > 10 ? "text-rizoma-red font-bold" : ""}`}>
                  {step.reworkPercentage}%
                </td>
                <td className="p-3 text-center">
                  {step.addsValue ? (
                    <span className="text-rizoma-green font-bold">Si</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </td>
                <td className="p-3 text-muted-foreground">{step.systemUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AIInsightBox title="Análisis de cuellos de botella">
        <p>{aiInsights.vsm.summary}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {aiInsights.vsm.bottlenecks.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </AIInsightBox>

      <div className="flex justify-between mt-8">
        <Link href="/demo/diagnostico" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Diagnóstico
        </Link>
        <Link href="/demo/riesgos" className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors">
          Siguiente: Riesgos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
