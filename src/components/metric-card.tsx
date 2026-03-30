"use client";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendIsGood?: boolean;
}

export function MetricCard({ label, value, unit, subtitle, trend, trendIsGood }: MetricCardProps) {
  const trendColor =
    trend === "neutral" || !trend
      ? "text-muted-foreground"
      : trendIsGood
        ? "text-rizoma-green"
        : "text-rizoma-red";

  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "";

  return (
    <div className="card p-5">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold metric-highlight text-foreground">
        {value}
        {unit && <span className="text-lg font-normal text-muted-foreground ml-1">{unit}</span>}
      </p>
      {subtitle && (
        <p className={`text-sm mt-1 ${trendColor}`}>
          {trendIcon} {subtitle}
        </p>
      )}
    </div>
  );
}
