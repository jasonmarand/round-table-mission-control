"use client";

interface Metric {
  label: string;
  value: number | string;
  color?: string;
}

interface MetricsBarProps {
  metrics: Metric[];
}

export function MetricsBar({ metrics }: MetricsBarProps) {
  return (
    <div className="flex items-center gap-6 text-sm">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex items-center gap-2">
          <span className="text-white font-bold text-lg" style={{ color: metric.color }}>
            {metric.value}
          </span>
          <span className="text-gray-400">{metric.label}</span>
        </div>
      ))}
    </div>
  );
}
