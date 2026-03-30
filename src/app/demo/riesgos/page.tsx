import { SectionHeader } from "@/components/section-header";
import { AIInsightBox } from "@/components/ai-insight-box";
import { risks, aiInsights } from "@/data/santa-emilia";
import { rankRisks, getRiskLevel, getRiskLevelLabel } from "@/lib/calculations/risk";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function RiesgosPage() {
  const ranked = rankRisks(risks);

  const levelColors: Record<string, string> = {
    critical: "bg-red-600 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-amber-400 text-amber-900",
    low: "bg-green-200 text-green-800",
  };

  return (
    <>
      <SectionHeader
        step={4}
        title="Riesgo contextual"
        description="Matriz de riesgos operativos contextualizados — probabilidad x impacto."
      />

      {/* Risk matrix 5x5 */}
      <div className="card p-6 mb-6">
        <h2 className="font-semibold mb-4">Matriz de riesgo 5x5</h2>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground mb-2 -rotate-90 translate-y-16 whitespace-nowrap">
              Probabilidad →
            </span>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-5 gap-1">
              {[5, 4, 3, 2, 1].map((prob) =>
                [1, 2, 3, 4, 5].map((impact) => {
                  const exposure = prob * impact;
                  const level = getRiskLevel(exposure);
                  const risksInCell = ranked.filter(
                    (r) => r.probability === prob && r.impact === impact
                  );
                  const bgOpacity =
                    level === "critical" ? "bg-red-500/80" :
                    level === "high" ? "bg-orange-400/60" :
                    level === "medium" ? "bg-amber-300/40" :
                    "bg-green-200/30";

                  return (
                    <div
                      key={`${prob}-${impact}`}
                      className={`aspect-square rounded-md flex flex-col items-center justify-center text-xs ${bgOpacity} relative`}
                    >
                      <span className="font-mono text-muted-foreground/60">{exposure}</span>
                      {risksInCell.length > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="w-6 h-6 rounded-full bg-foreground text-white flex items-center justify-center text-xs font-bold">
                            {risksInCell.length}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Impacto 1</span>
              <span>Impacto 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk list */}
      <div className="space-y-3 mb-6">
        {ranked.map((risk, i) => {
          const level = getRiskLevel(risk.exposure);
          return (
            <div key={i} className="card p-4 flex items-center gap-4">
              <span className="text-lg font-bold text-muted-foreground w-8 text-center">
                #{risk.rank}
              </span>
              <div className="flex-1">
                <p className="font-semibold">{risk.riskDescription}</p>
                <p className="text-sm text-muted-foreground">{risk.riskType}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">P×I</p>
                <p className="text-sm font-mono">{risk.probability}×{risk.impact}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${levelColors[level]}`}>
                {getRiskLevelLabel(level)} ({risk.exposure})
              </div>
            </div>
          );
        })}
      </div>

      <AIInsightBox title="Análisis de riesgos">
        <p>{aiInsights.risks.summary}</p>
        <p className="mt-2 font-semibold">Riesgo prioritario:</p>
        <p>{aiInsights.risks.topRisk}</p>
      </AIInsightBox>

      <div className="flex justify-between mt-8">
        <Link href="/demo/vsm" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> VSM
        </Link>
        <Link href="/demo/desperdicio" className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors">
          Siguiente: Desperdicio <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
