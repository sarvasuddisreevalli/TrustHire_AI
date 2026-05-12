import { motion } from "framer-motion";

type Props = { value: number; label?: string; size?: number; suffix?: string };

export function GaugeMeter({ value, label, size = 160, suffix = "%" }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  const circ = Math.PI * r; 
  const offset = circ * (1 - v / 100);

  const color = v >= 75 ? "oklch(0.72 0.18 150)" : v >= 50 ? "oklch(0.85 0.15 85)" : "oklch(0.6 0.25 25)";

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors" style={{ width: "100%", maxWidth: size }}>
      <div className="relative flex items-center justify-center">
        <svg width="100%" height="auto" viewBox={`0 0 ${size} ${size / 2 + 10}`} className="overflow-visible">
          <defs>
            <linearGradient id={`g-${label}-${v}`} x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.6 0.25 25)" />
              <stop offset="50%" stopColor="oklch(0.85 0.15 85)" />
              <stop offset="100%" stopColor="oklch(0.72 0.18 150)" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={12}
            strokeLinecap="round"
          />
          <motion.path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke={`url(#g-${label}-${v})`}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
            filter="url(#shadow)"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-10%] text-center">
          <div className="text-2xl font-bold tracking-tight" style={{ color }}>{Math.round(v)}{suffix}</div>
        </div>
      </div>
      {label && <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 mt-2">{label}</div>}
    </div>
  );
}

