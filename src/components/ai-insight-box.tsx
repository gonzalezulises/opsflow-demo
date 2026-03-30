import { Lightbulb } from "lucide-react";

interface AIInsightBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function AIInsightBox({ title = "Insight de IA", children }: AIInsightBoxProps) {
  return (
    <div className="rounded-xl border border-rizoma-cyan/30 bg-rizoma-cyan/5 p-5 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-rizoma-cyan" />
        <h3 className="font-semibold text-rizoma-cyan-dark">{title}</h3>
        <span className="text-xs bg-rizoma-cyan/15 text-rizoma-cyan-dark px-2 py-0.5 rounded-full">
          Ciencia de datos aplicada
        </span>
      </div>
      <div className="text-sm text-foreground/80 space-y-2">{children}</div>
    </div>
  );
}
