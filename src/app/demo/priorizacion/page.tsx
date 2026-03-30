import { SectionHeader } from "@/components/section-header";
import { initiatives } from "@/data/santa-emilia";
import { calculatePrioritizationScore } from "@/lib/calculations/prioritization";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Zap, Pencil, Clock } from "lucide-react";

export default function PriorizacionPage() {
  const scored = initiatives.map((init) => {
    const { totalScore, classification } = calculatePrioritizationScore({
      impactLeadTime: init.impactLeadTime,
      impactEconomic: init.impactEconomic,
      impactResilience: init.impactResilience,
      feasibility30d: init.feasibility30d,
      effort: init.effort,
      externalDependency: init.externalDependency,
    });
    return { ...init, totalScore, classification };
  });

  const sorted = [...scored].sort((a, b) => b.totalScore - a.totalScore);

  const classColors = {
    "Atacar ya": { bg: "bg-rizoma-green/10", border: "border-rizoma-green/30", text: "text-rizoma-green", badge: "bg-rizoma-green text-white", icon: Zap },
    "Diseñar": { bg: "bg-amber-50", border: "border-amber-300/30", text: "text-amber-700", badge: "bg-amber-500 text-white", icon: Pencil },
    "Postergar": { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-500", badge: "bg-gray-400 text-white", icon: Clock },
  };

  return (
    <>
      <SectionHeader
        step={6}
        title="Priorización de iniciativas"
        description="Scoring ponderado multi-criterio: impacto (lead time, económico, resiliencia), factibilidad y restricciones."
      />

      {/* Classification summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["Atacar ya", "Diseñar", "Postergar"] as const).map((cls) => {
          const count = sorted.filter((s) => s.classification === cls).length;
          const colors = classColors[cls];
          const Icon = colors.icon;
          return (
            <div key={cls} className={`card p-4 ${colors.bg} border ${colors.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${colors.text}`} />
                <span className={`font-bold ${colors.text}`}>{cls}</span>
              </div>
              <p className="text-3xl font-bold metric-highlight">{count}</p>
              <p className="text-xs text-muted-foreground">
                {cls === "Atacar ya" ? "Score ≥ 4.0" : cls === "Diseñar" ? "Score 3.2 - 4.0" : "Score < 3.2"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Initiative cards */}
      <div className="space-y-3 mb-6">
        {sorted.map((init, i) => {
          const colors = classColors[init.classification];
          return (
            <div key={i} className={`card p-4 border ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                    {init.classification}
                  </span>
                  <p className="font-semibold">{init.name}</p>
                </div>
                <p className={`text-2xl font-bold metric-highlight ${colors.text}`}>{init.totalScore}</p>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-6 gap-2 mt-3">
                {[
                  { label: "Lead time", value: init.impactLeadTime, weight: "25%" },
                  { label: "Económico", value: init.impactEconomic, weight: "25%" },
                  { label: "Resiliencia", value: init.impactResilience, weight: "20%" },
                  { label: "Factibilidad", value: init.feasibility30d, weight: "20%" },
                  { label: "Esfuerzo", value: init.effort, weight: "5%", inverted: true },
                  { label: "Dep. ext.", value: init.externalDependency, weight: "5%", inverted: true },
                ].map((dim) => (
                  <div key={dim.label} className="text-center">
                    <div className="text-lg font-bold metric-highlight">{dim.value}</div>
                    <div className="text-[10px] text-muted-foreground">{dim.label}</div>
                    <div className="text-[10px] text-muted-foreground/60">({dim.weight})</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/demo/desperdicio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Desperdicio
        </Link>
        <Link href="/demo/plan" className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors">
          Siguiente: Plan 30 días <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
