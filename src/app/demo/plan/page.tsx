import { SectionHeader } from "@/components/section-header";
import { actionItems } from "@/data/santa-emilia";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Circle, Loader2 } from "lucide-react";

export default function PlanPage() {
  const statusConfig = {
    completed: { label: "Completado", icon: CheckCircle2, color: "text-rizoma-green", bg: "bg-rizoma-green/10" },
    in_progress: { label: "En progreso", icon: Loader2, color: "text-rizoma-cyan", bg: "bg-rizoma-cyan/10" },
    pending: { label: "Pendiente", icon: Circle, color: "text-muted-foreground", bg: "bg-muted" },
  };

  const completedCount = actionItems.filter((a) => a.status === "completed").length;
  const progressPct = Math.round((completedCount / actionItems.length) * 100);

  return (
    <>
      <SectionHeader
        step={7}
        title="Plan de 30 días"
        description="Acciones concretas con responsable, fechas, métricas líder y plan de contingencia."
      />

      {/* Progress overview */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Progreso general</p>
          <p className="text-sm text-muted-foreground">
            {completedCount} de {actionItems.length} acciones completadas
          </p>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-rizoma-green rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-right text-sm font-bold mt-1">{progressPct}%</p>
      </div>

      {/* Action items */}
      <div className="space-y-4 mb-8">
        {actionItems.map((action, i) => {
          const config = statusConfig[action.status];
          const Icon = config.icon;

          return (
            <div key={i} className="card p-5">
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{action.initiative}</span>
                  </div>
                  <p className="font-semibold">{action.actionDescription}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Responsable</p>
                      <p className="text-sm font-medium">{action.responsible}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Periodo</p>
                      <p className="text-sm">{action.startDate.slice(5)} → {action.endDate.slice(5)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Métrica líder</p>
                      <p className="text-sm">{action.leadMetric}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Base → Meta</p>
                      <p className="text-sm font-bold metric-highlight">{action.baselineValue} → {action.targetValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/demo/priorizacion" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Priorización
        </Link>
        <Link href="/demo/seguimiento" className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors">
          Siguiente: Seguimiento <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
