import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DemoIndex() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold font-serif mb-4">
        Caso: Alimentos Santa Emilia, C.A.
      </h1>
      <p className="text-muted-foreground max-w-lg mb-2">
        Proceso <strong>pedido a despacho</strong> en una empresa de alimentos y consumo masivo.
        Este caso demuestra cómo Rizoma aplica ciencia de datos para diagnosticar, priorizar e
        implementar mejoras operativas medibles.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Sector: Alimentos &middot; Moneda: USD &middot; 210 pedidos/semana
      </p>
      <Link
        href="/demo/contexto"
        className="inline-flex items-center gap-2 bg-rizoma-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-rizoma-green-dark transition-colors"
      >
        Comenzar recorrido
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
