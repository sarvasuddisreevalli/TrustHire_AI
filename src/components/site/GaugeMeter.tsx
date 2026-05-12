import { motion } from "framer-motion";

type Props = { value: number; label?: string; size?: number; suffix?: string };

export function GaugeMeter({ value, label, size = 180, suffix = "%" }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const r = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2;
  const circ = Math.PI * r; // semicircle length
  const offset = circ * (1 - v / 100);

  // Color: red→yellow→green
  const color = v >= 75 ? "var(--success)" : v >= 50 ? "var(--warning)" : "var(--destructive)";

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size / 2 + 16} viewBox={`0 0 ${size} ${size / 2 + 16}`}>
        <defs>
          <linearGradient id={`g-${label}`} x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.22 25)" />
            <stop offset="50%" stopColor="oklch(0.82 0.16 75)" />
            <stop offset="100%" stopColor="oklch(0.7 0.16 155)" />
          </linearGradient>
        </defs>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={`url(#g-${label})`}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="-mt-10 text-center">
        <div className="text-3xl font-bold tracking-tight" style={{ color }}>{Math.round(v)}{suffix}</div>
        {label && <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</div>}
      </div>
    </div>
  );
}
