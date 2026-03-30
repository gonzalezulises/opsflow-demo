"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Building2,
  ClipboardCheck,
  GitBranch,
  AlertTriangle,
  Trash2,
  Target,
  CalendarDays,
  TrendingUp,
  FileText,
} from "lucide-react";

const modules = [
  { href: "/demo/contexto", label: "Contexto", icon: Building2, step: 1 },
  { href: "/demo/diagnostico", label: "Diagnóstico", icon: ClipboardCheck, step: 2 },
  { href: "/demo/vsm", label: "Flujo de valor", icon: GitBranch, step: 3 },
  { href: "/demo/riesgos", label: "Riesgos", icon: AlertTriangle, step: 4 },
  { href: "/demo/desperdicio", label: "Desperdicio", icon: Trash2, step: 5 },
  { href: "/demo/priorizacion", label: "Priorización", icon: Target, step: 6 },
  { href: "/demo/plan", label: "Plan 30 días", icon: CalendarDays, step: 7 },
  { href: "/demo/seguimiento", label: "Seguimiento", icon: TrendingUp, step: 8 },
  { href: "/demo/reporte", label: "Reporte", icon: FileText, step: 9 },
];

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-rizoma.png" alt="Rizoma" width={100} height={33} className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {modules.map((m) => {
            const isActive = pathname === m.href;
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-rizoma-green/10 text-rizoma-green font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  isActive ? "bg-rizoma-green text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {m.step}
                </span>
                <Icon className="w-4 h-4 shrink-0" />
                <span>{m.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <p className="font-semibold text-foreground">Alimentos Santa Emilia</p>
            <p>Caso de demostración</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
