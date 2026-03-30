import { SectionHeader } from "@/components/section-header";
import { AIInsightBox } from "@/components/ai-insight-box";
import { diagnosticQuestions, aiInsights } from "@/data/santa-emilia";
import { calculateDiagnostic, getLevelLabel } from "@/lib/calculations/diagnostic";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function DiagnosticoPage() {
  const scores = diagnosticQuestions.map((q) => q.score);
  const result = calculateDiagnostic(scores);

  const categories = [...new Set(diagnosticQuestions.map((q) => q.category))];

  const categoryScores = categories.map((cat) => {
    const qs = diagnosticQuestions.filter((q) => q.category === cat);
    const avg = qs.reduce((sum, q) => sum + q.score, 0) / qs.length;
    return { category: cat, average: Math.round(avg * 100) / 100, questions: qs };
  });

  const levelColor =
    result.level === "bajo" ? "text-rizoma-red" : result.level === "medio" ? "text-amber-600" : "text-rizoma-green";

  return (
    <>
      <SectionHeader
        step={2}
        title="Diagnóstico de madurez"
        description="Evaluación de 15 preguntas en 5 categorías para determinar el nivel de madurez operativa."
      />

      {/* Summary */}
      <div className="card p-6 mb-6 flex items-center gap-8">
        <div className="text-center">
          <p className={`text-5xl font-bold metric-highlight ${levelColor}`}>{result.average}</p>
          <p className="text-sm text-muted-foreground mt-1">de 5.00</p>
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold">
            Nivel de madurez: <span className={levelColor}>{getLevelLabel(result.level)}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {result.respondedCount} preguntas evaluadas &middot; {result.total} puntos de {result.maxPossible} posibles
          </p>
          {/* Progress bar */}
          <div className="mt-3 h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${(result.average / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4 mb-6">
        {categoryScores.map((cat) => (
          <div key={cat.category} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{cat.category}</h3>
              <span className="text-sm font-bold text-muted-foreground">{cat.average} / 5</span>
            </div>
            <div className="space-y-2">
              {cat.questions.map((q, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className={`w-5 h-5 rounded-sm flex items-center justify-center text-xs font-bold ${
                          n <= q.score ? "bg-rizoma-green/20 text-rizoma-green" : "bg-muted text-muted-foreground/40"
                        }`}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                  <span className="text-foreground/80">{q.questionText}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AIInsightBox title="Hallazgos del diagnóstico">
        <p>{aiInsights.diagnostic.summary}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {aiInsights.diagnostic.findings.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-rizoma-cyan-dark">Quick wins identificados:</p>
        <ul className="list-disc list-inside space-y-1">
          {aiInsights.diagnostic.quickWins.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </AIInsightBox>

      <div className="flex justify-between mt-8">
        <Link href="/demo/contexto" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Contexto
        </Link>
        <Link href="/demo/vsm" className="inline-flex items-center gap-2 bg-rizoma-green text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors">
          Siguiente: VSM <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
