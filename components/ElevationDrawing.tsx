import type { Variant } from "@/lib/villas";

type Props = {
  variant: Variant;
  floors: number;
  landW: number;
  className?: string;
  showDims?: boolean;
  label?: string;
};

const GROUND = 205;
const FH = 46; // floor height in drawing units (≈ 3.4 m)

/** Architect-style front elevation drawn from the villa's data. */
export default function ElevationDrawing({ variant, floors, landW, className, showDims = true, label }: Props) {
  const W = variant === "twin" ? 276 : Math.max(196, Math.min(268, 128 + landW * 7.5));
  const x0 = 236 - W / 2 + (variant === "twin" ? 0 : 6);
  const bodyFloors = floors;
  const top = GROUND - bodyFloors * FH;
  const heightM = (bodyFloors * 3.4 + (variant === "khmer" ? 3.2 : variant === "tropical" ? 1.8 : 0.4)).toFixed(1);

  return (
    <svg
      viewBox="0 0 440 250"
      className={className}
      role="img"
      aria-label={label ?? "Villa front elevation"}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* sky-side landscape */}
      <Palm x={46} />
      <Shrub x={x0 - 14} />
      <Shrub x={x0 + W + 16} />

      {variant === "modern" && <Modern x0={x0} W={W} floors={bodyFloors} top={top} />}
      {variant === "twin" && <Twin x0={x0} W={W} floors={bodyFloors} top={top} />}
      {variant === "tropical" && <Tropical x0={x0} W={W} floors={bodyFloors} top={top} />}
      {variant === "khmer" && <Khmer x0={x0} W={W} floors={bodyFloors} top={top} />}

      {/* ground line */}
      <line x1={10} y1={GROUND} x2={430} y2={GROUND} className="stroke-ink" strokeWidth={2} />
      {Array.from({ length: 28 }).map((_, i) => (
        <line key={i} x1={14 + i * 15} y1={GROUND + 1} x2={8 + i * 15} y2={GROUND + 7} className="stroke-line" strokeWidth={1} />
      ))}

      {showDims && (
        <g className="font-mono">
          {/* width */}
          <line x1={x0} y1={GROUND + 22} x2={x0 + W} y2={GROUND + 22} className="stroke-muted" strokeWidth={0.8} />
          <line x1={x0} y1={GROUND + 14} x2={x0} y2={GROUND + 28} className="stroke-muted" strokeWidth={0.8} />
          <line x1={x0 + W} y1={GROUND + 14} x2={x0 + W} y2={GROUND + 28} className="stroke-muted" strokeWidth={0.8} />
          <line x1={x0 - 3} y1={GROUND + 25} x2={x0 + 3} y2={GROUND + 19} className="stroke-muted" strokeWidth={1.2} />
          <line x1={x0 + W - 3} y1={GROUND + 25} x2={x0 + W + 3} y2={GROUND + 19} className="stroke-muted" strokeWidth={1.2} />
          <rect x={x0 + W / 2 - 26} y={GROUND + 15} width={52} height={14} className="fill-surface" />
          <text x={x0 + W / 2} y={GROUND + 25.5} textAnchor="middle" fontSize={10} className="fill-muted">
            {landW.toFixed(1)} m
          </text>
          {/* height */}
          <HeightDim x={Math.min(x0 + W + 36, 426)} top={roofTop(variant, top)} label={`${heightM} m`} />
        </g>
      )}
    </svg>
  );
}

function roofTop(variant: Variant, top: number) {
  if (variant === "khmer") return top - 58;
  if (variant === "tropical") return top - 30;
  return top - 8;
}

function HeightDim({ x, top, label }: { x: number; top: number; label: string }) {
  const mid = (top + GROUND) / 2;
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={GROUND} className="stroke-muted" strokeWidth={0.8} />
      <line x1={x - 6} y1={top} x2={x + 6} y2={top} className="stroke-muted" strokeWidth={0.8} />
      <line x1={x - 3} y1={top + 3} x2={x + 3} y2={top - 3} className="stroke-muted" strokeWidth={1.2} />
      <line x1={x - 3} y1={GROUND + 3} x2={x + 3} y2={GROUND - 3} className="stroke-muted" strokeWidth={1.2} />
      <rect x={x - 7} y={mid - 24} width={14} height={48} className="fill-surface" />
      <text x={x} y={mid} textAnchor="middle" fontSize={10} className="fill-muted" transform={`rotate(-90 ${x} ${mid})`} dy={3.5}>
        {label}
      </text>
    </g>
  );
}

function Win({ x, y, w, h, mullions = 1 }: { x: number; y: number; w: number; h: number; mullions?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="fill-glass stroke-ink" strokeWidth={1.2} />
      {Array.from({ length: mullions }).map((_, i) => {
        const mx = x + ((i + 1) * w) / (mullions + 1);
        return <line key={i} x1={mx} y1={y} x2={mx} y2={y + h} className="stroke-ink" strokeWidth={0.8} />;
      })}
      <line x1={x + 4} y1={y + h - 4} x2={x + Math.min(14, w / 3)} y2={y + 4} className="stroke-surface" strokeWidth={1} opacity={0.7} />
    </g>
  );
}

function Door({ x, w = 22 }: { x: number; w?: number }) {
  return (
    <g>
      <rect x={x} y={GROUND - 36} width={w} height={36} className="fill-roof stroke-ink" strokeWidth={1.2} />
      <line x1={x + w - 5} y1={GROUND - 20} x2={x + w - 5} y2={GROUND - 14} className="stroke-brass" strokeWidth={2} />
    </g>
  );
}

function Rail({ x, y, w }: { x: number; y: number; w: number }) {
  const n = Math.floor(w / 8);
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} className="stroke-ink" strokeWidth={1.2} />
      {Array.from({ length: n + 1 }).map((_, i) => (
        <line key={i} x1={x + (i * w) / n} y1={y} x2={x + (i * w) / n} y2={y + 12} className="stroke-ink" strokeWidth={0.6} />
      ))}
    </g>
  );
}

function Modern({ x0, W, floors, top }: { x0: number; W: number; floors: number; top: number }) {
  return (
    <g>
      {/* ground floor */}
      <rect x={x0} y={GROUND - FH} width={W} height={FH} className="fill-wall stroke-ink" strokeWidth={1.5} />
      <Win x={x0 + 12} y={GROUND - FH + 8} w={W * 0.42} h={FH - 8} mullions={3} />
      <Door x={x0 + W * 0.42 + 24} />
      <rect x={x0 + W * 0.66} y={GROUND - FH + 8} width={W * 0.3} height={FH - 8} className="fill-surface stroke-ink" strokeWidth={1} />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={x0 + W * 0.66} y1={GROUND - FH + 14 + i * 6} x2={x0 + W * 0.96} y2={GROUND - FH + 14 + i * 6} className="stroke-line" strokeWidth={1} />
      ))}
      {/* upper floors, cantilevered */}
      {Array.from({ length: floors - 1 }).map((_, i) => {
        const y = GROUND - FH * (i + 2);
        const ux = x0 + 18;
        const uw = W - 4;
        return (
          <g key={i}>
            <rect x={ux} y={y} width={uw} height={FH} className="fill-wall stroke-ink" strokeWidth={1.5} />
            <Win x={ux + 10} y={y + 9} w={uw * 0.56} h={FH - 20} mullions={2} />
            <rect x={ux + uw * 0.56 + 18} y={y + 6} width={uw * 0.34} height={FH - 6} className="fill-glass stroke-ink" strokeWidth={1.2} />
            <Rail x={ux + uw * 0.56 + 18} y={y + FH - 16} w={uw * 0.34} />
            {Array.from({ length: 4 }).map((_, k) => (
              <line key={k} x1={ux + 6 + k * 6} y1={y + 4} x2={ux + 6 + k * 6} y2={y + FH - 4} className="stroke-brass" strokeWidth={1.4} />
            ))}
          </g>
        );
      })}
      {/* roof slab */}
      <rect x={x0 - 10} y={top - 8} width={W + 34} height={8} className="fill-roof stroke-ink" strokeWidth={1.2} />
      {/* floor slabs */}
      {Array.from({ length: floors - 1 }).map((_, i) => (
        <rect key={i} x={x0 - 4} y={GROUND - FH * (i + 1) - 3} width={W + 26} height={4} className="fill-roof" />
      ))}
    </g>
  );
}

function Twin({ x0, W, floors, top }: { x0: number; W: number; floors: number; top: number }) {
  const uw = W / 2;
  const unit = (ux: number, mirror: boolean) => (
    <g>
      <rect x={ux} y={top} width={uw} height={GROUND - top} className="fill-wall stroke-ink" strokeWidth={1.5} />
      <Door x={mirror ? ux + uw - 36 : ux + 14} />
      <Win x={mirror ? ux + 14 : ux + uw - 70} y={GROUND - FH + 8} w={56} h={28} mullions={2} />
      {Array.from({ length: floors - 1 }).map((_, i) => {
        const y = GROUND - FH * (i + 2);
        return (
          <g key={i}>
            <Win x={ux + 16} y={y + 8} w={uw - 32} h={24} mullions={3} />
            <Rail x={ux + 12} y={y + FH - 14} w={uw - 24} />
            <rect x={ux + 6} y={GROUND - FH * (i + 1) - 3} width={uw - 12} height={4} className="fill-roof" />
          </g>
        );
      })}
      {/* gable */}
      <polygon
        points={`${ux - 6},${top} ${ux + uw / 2},${top - 30} ${ux + uw + 6},${top}`}
        className="fill-roof stroke-ink"
        strokeWidth={1.2}
      />
      <circle cx={ux + uw / 2} cy={top - 12} r={5} className="fill-glass stroke-ink" strokeWidth={1} />
    </g>
  );
  return (
    <g>
      {unit(x0, false)}
      {unit(x0 + uw, true)}
      <line x1={x0 + uw} y1={top - 30} x2={x0 + uw} y2={GROUND} className="stroke-ink" strokeWidth={2} />
    </g>
  );
}

function Tropical({ x0, W, floors, top }: { x0: number; W: number; floors: number; top: number }) {
  return (
    <g>
      {/* pool edge in front */}
      <rect x={x0 + W * 0.52} y={GROUND - 5} width={W * 0.5} height={5} className="fill-glass stroke-ink" strokeWidth={1} />
      <rect x={x0 + 10} y={top} width={W - 20} height={GROUND - top} className="fill-wall stroke-ink" strokeWidth={1.5} />
      {/* ground: columns + sliding doors */}
      <Win x={x0 + 22} y={GROUND - FH + 10} w={W * 0.36} h={FH - 10} mullions={3} />
      <Door x={x0 + W * 0.36 + 34} />
      <Win x={x0 + W * 0.36 + 66} y={GROUND - FH + 10} w={W - (W * 0.36 + 98)} h={FH - 10} mullions={2} />
      {Array.from({ length: floors - 1 }).map((_, i) => {
        const y = GROUND - FH * (i + 2);
        return (
          <g key={i}>
            <rect x={x0 - 2} y={GROUND - FH * (i + 1) - 4} width={W + 4} height={5} className="fill-roof" />
            {[0.14, 0.38, 0.62].map((f, k) => (
              <Win key={k} x={x0 + W * f} y={y + 8} w={W * 0.18} h={FH - 14} mullions={1} />
            ))}
            <Rail x={x0 - 2} y={y + FH - 18} w={W + 4} />
            {/* timber screen */}
            {Array.from({ length: 7 }).map((_, k) => (
              <line key={k} x1={x0 + W * 0.84 + k * 4} y1={y + 6} x2={x0 + W * 0.84 + k * 4} y2={y + FH - 6} className="stroke-brass" strokeWidth={1.6} />
            ))}
          </g>
        );
      })}
      {/* columns */}
      {[x0 + 2, x0 + W - 8].map((cx, i) => (
        <rect key={i} x={cx} y={top} width={6} height={GROUND - top} className="fill-surface stroke-ink" strokeWidth={1} />
      ))}
      {/* low hip roof with deep eaves */}
      <polygon
        points={`${x0 - 26},${top + 2} ${x0 + 34},${top - 30} ${x0 + W - 34},${top - 30} ${x0 + W + 26},${top + 2}`}
        className="fill-roof stroke-ink"
        strokeWidth={1.4}
      />
      <line x1={x0 - 26} y1={top + 2} x2={x0 + W + 26} y2={top + 2} className="stroke-brass" strokeWidth={2} />
    </g>
  );
}

function Khmer({ x0, W, floors, top }: { x0: number; W: number; floors: number; top: number }) {
  const upperTop = top;
  return (
    <g>
      {/* stilts / open ground floor */}
      {[0.06, 0.3, 0.54, 0.78, 0.94].map((f, i) => (
        <rect key={i} x={x0 + W * f - 3} y={GROUND - FH} width={7} height={FH} className="fill-roof stroke-ink" strokeWidth={0.8} />
      ))}
      {/* stair */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={x0 + W * 0.36 + i * 6} y1={GROUND - i * 7.5} x2={x0 + W * 0.36 + i * 6 + 14} y2={GROUND - i * 7.5} className="stroke-ink" strokeWidth={1} />
      ))}
      <line x1={x0 + W * 0.36} y1={GROUND} x2={x0 + W * 0.36 + 36} y2={GROUND - FH} className="stroke-ink" strokeWidth={1.2} />
      {/* lotus pond */}
      <ellipse cx={x0 + W * 0.72} cy={GROUND - 2} rx={W * 0.14} ry={3.5} className="fill-glass stroke-ink" strokeWidth={0.8} />
      {/* raised living floors */}
      {Array.from({ length: floors - 1 }).map((_, i) => {
        const y = GROUND - FH * (i + 2);
        return (
          <g key={i}>
            <rect x={x0} y={y} width={W} height={FH} className="fill-wall stroke-ink" strokeWidth={1.5} />
            {/* timber boarding */}
            {Array.from({ length: 5 }).map((_, k) => (
              <line key={k} x1={x0} y1={y + 8 + k * 8} x2={x0 + W} y2={y + 8 + k * 8} className="stroke-line" strokeWidth={0.8} />
            ))}
            {[0.1, 0.4, 0.7].map((f, k) => (
              <g key={k}>
                <rect x={x0 + W * f} y={y + 8} width={W * 0.2} height={FH - 16} className="fill-glass stroke-ink" strokeWidth={1.2} />
                <rect x={x0 + W * f - 8} y={y + 8} width={8} height={FH - 16} className="fill-brass" opacity={0.75} />
                <rect x={x0 + W * f + W * 0.2} y={y + 8} width={8} height={FH - 16} className="fill-brass" opacity={0.75} />
              </g>
            ))}
            <rect x={x0 - 8} y={y + FH - 3} width={W + 16} height={5} className="fill-roof" />
            <Rail x={x0 - 8} y={y + FH - 15} w={W * 0.3} />
          </g>
        );
      })}
      {/* two-tier Khmer roof with upturned eaves (kbach) */}
      <polygon
        points={`${x0 - 22},${upperTop} ${x0 + 22},${upperTop - 22} ${x0 + W - 22},${upperTop - 22} ${x0 + W + 22},${upperTop}`}
        className="fill-roof stroke-ink"
        strokeWidth={1.4}
      />
      <polygon
        points={`${x0 + 34},${upperTop - 22} ${x0 + W * 0.36},${upperTop - 58} ${x0 + W * 0.64},${upperTop - 58} ${x0 + W - 34},${upperTop - 22}`}
        className="fill-roof stroke-ink"
        strokeWidth={1.4}
      />
      {/* gable ornament */}
      <polygon
        points={`${x0 + W * 0.42},${upperTop - 24} ${x0 + W * 0.5},${upperTop - 50} ${x0 + W * 0.58},${upperTop - 24}`}
        className="fill-brass stroke-ink"
        strokeWidth={0.8}
      />
      <path d={`M ${x0 - 22} ${upperTop} q -9 -1 -11 -11`} className="stroke-brass fill-none" strokeWidth={2.4} />
      <path d={`M ${x0 + W + 22} ${upperTop} q 9 -1 11 -11`} className="stroke-brass fill-none" strokeWidth={2.4} />
      <path d={`M ${x0 + 34} ${upperTop - 22} q -8 -1 -10 -10`} className="stroke-brass fill-none" strokeWidth={2} />
      <path d={`M ${x0 + W - 34} ${upperTop - 22} q 8 -1 10 -10`} className="stroke-brass fill-none" strokeWidth={2} />
    </g>
  );
}

function Palm({ x }: { x: number }) {
  const topX = x + 14;
  const topY = 96;
  const fronds = [
    `M ${topX} ${topY} q -22 -12 -40 4`,
    `M ${topX} ${topY} q -18 -24 -34 -18`,
    `M ${topX} ${topY} q 2 -26 -6 -34`,
    `M ${topX} ${topY} q 20 -22 36 -14`,
    `M ${topX} ${topY} q 24 -6 38 12`,
    `M ${topX} ${topY} q -8 10 -24 24`,
    `M ${topX} ${topY} q 12 8 20 26`,
  ];
  return (
    <g>
      <path d={`M ${x} ${GROUND} C ${x + 4} 160, ${x + 16} 130, ${topX} ${topY}`} className="stroke-ink fill-none" strokeWidth={4} />
      <path d={`M ${x} ${GROUND} C ${x + 4} 160, ${x + 16} 130, ${topX} ${topY}`} className="stroke-wall fill-none" strokeWidth={1.5} strokeDasharray="2 5" />
      {fronds.map((d, i) => (
        <path key={i} d={d} className="stroke-jade fill-none" strokeWidth={2.2} />
      ))}
    </g>
  );
}

function Shrub({ x }: { x: number }) {
  return (
    <g>
      <circle cx={x} cy={GROUND - 7} r={8} className="fill-jade" opacity={0.55} />
      <circle cx={x + 8} cy={GROUND - 5} r={6} className="fill-jade" opacity={0.75} />
    </g>
  );
}
