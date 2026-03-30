import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Brain,
  GitBranch,
  Target,
  TrendingUp,
  Shield,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image src="/logo-rizoma.png" alt="Rizoma" width={360} height={120} className="h-28 w-auto" />
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-rizoma-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rizoma-green-dark transition-colors"
          >
            Ver demo interactiva
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-rizoma-green font-semibold text-sm uppercase tracking-wider mb-4">
          Transformación desde la raíz
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-6 max-w-3xl mx-auto">
          Optimiza tus operaciones con{" "}
          <span className="text-rizoma-green">ciencia de datos aplicada</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Rizoma diagnostica, cuantifica y prioriza las mejoras operativas de tu organización
          usando metodologías probadas e inteligencia artificial — con resultados medibles en 30 días.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-rizoma-green text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-rizoma-green-dark transition-colors"
          >
            Explorar caso real
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#metodologia"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
          >
            Conocer metodología
          </a>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-white border-y border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-rizoma-green metric-highlight">40%</p>
              <p className="text-sm text-muted-foreground mt-1">Reducción promedio de lead time</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-rizoma-green metric-highlight">+1,500</p>
              <p className="text-sm text-muted-foreground mt-1">Profesionales formados</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-rizoma-green metric-highlight">90%</p>
              <p className="text-sm text-muted-foreground mt-1">Retención de clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="metodologia" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-4">
            Metodología de 9 pasos con datos en el centro
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada paso genera datos que alimentan el siguiente. No improvisamos — calculamos,
            priorizamos e implementamos con evidencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: "Diagnóstico", desc: "15 preguntas calibradas que mapean tu madurez operativa en 5 dimensiones. Score automático e insights de IA." },
            { icon: GitBranch, title: "Flujo de valor (VSM)", desc: "Mapeo del proceso paso a paso: tiempos de proceso, esperas, retrabajo. Identificación de cuellos de botella con datos." },
            { icon: Shield, title: "Riesgos contextuales", desc: "Matriz probabilidad x impacto adaptada a tu contexto operativo. Exposición cuantificada y priorizada." },
            { icon: Zap, title: "Costo del desperdicio", desc: "Cuánto pierde tu organización cada mes en retrabajo, esperas y errores. Cifras que justifican la inversión." },
            { icon: Target, title: "Priorización", desc: "Scoring multi-criterio ponderado: impacto, factibilidad, esfuerzo. Clasificación automática: atacar, diseñar o postergar." },
            { icon: TrendingUp, title: "Plan + seguimiento", desc: "Acciones concretas con responsable, fechas y métricas líder. Seguimiento semanal con detección de tendencias." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="card p-6">
                <div className="w-10 h-10 rounded-lg bg-rizoma-green/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-rizoma-green" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* What makes us different */}
      <section className="bg-white border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-4">Ciencia de datos, no intuición</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lo que diferencia a Rizoma es el rigor analítico. Cada recomendación está respaldada por datos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Cálculos automatizados", desc: "Lead time, eficiencia de flujo, costo de desperdicio, scoring de iniciativas — todo calculado en tiempo real." },
              { title: "IA contextualizada", desc: "Modelos de IA que entienden tu sector, tu contexto y tus restricciones para generar recomendaciones relevantes." },
              { title: "Resultados en 30 días", desc: "Plan de acción con métricas líder, baseline, meta y contingencia. Seguimiento semanal con alertas tempranas." },
              { title: "Sin sobre-ingeniería", desc: "Soluciones pragmáticas y de bajo costo que atacan el 80% del problema con el 20% del esfuerzo." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-rizoma-green shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Demo */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="card p-12 bg-gradient-to-br from-rizoma-green/5 to-rizoma-cyan/5 border-rizoma-green/20">
          <Brain className="w-12 h-12 text-rizoma-green mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-serif mb-4">
            Mira cómo funciona con un caso real
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Explora el caso completo de Alimentos Santa Emilia — desde el diagnóstico hasta
            los resultados en 4 semanas. Todo con datos reales.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 bg-rizoma-green text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-rizoma-green-dark transition-colors"
          >
            Explorar demo interactiva
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="bg-white border-t border-border py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">
            ¿Listo para optimizar tus operaciones?
          </h2>
          <p className="text-muted-foreground mb-8">
            Agenda una sesión de diagnóstico gratuita. Te mostramos en 30 minutos
            dónde están las oportunidades de mejora en tu proceso.
          </p>
          <div className="card p-6 text-left">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Empresa</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  placeholder="correo@empresa.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">¿Qué proceso quieres optimizar?</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  rows={3}
                  placeholder="Describe brevemente el proceso o área de interés"
                />
              </div>
              <button
                type="button"
                className="w-full bg-rizoma-green text-white py-3 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors"
              >
                Solicitar sesión de diagnóstico
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <p>
            <strong className="text-foreground">Rizoma</strong> — Transformación desde la raíz.
          </p>
          <p className="mt-1">Ciencia de datos aplicada a la excelencia operativa.</p>
        </div>
      </footer>
    </div>
  );
}
