import { t, type Key } from "@/lib/i18n";
import { n, type Lang, type Villa } from "@/lib/villas";

type Room = { key: Key; w: number; num?: number };
type Plan = { name: string; rows: Room[][] };

function plansFor(v: Villa, lang: Lang): Plan[] {
  const ground: Room[][] =
    v.type === "link"
      ? [
          [{ key: "room_living", w: 1 }],
          [{ key: "room_kitchen", w: 0.62 }, { key: "room_bath", w: 0.38 }],
        ]
      : [
          [{ key: "room_living", w: 0.58 }, { key: "room_kitchen", w: 0.42 }],
          [{ key: "room_garage", w: 0.42 }, { key: "room_bath", w: 0.2 }, { key: "room_store", w: 0.38 }],
        ];

  const upper = Math.max(1, v.floors - 1);
  const per: number[] = Array.from({ length: upper }, (_, i) =>
    Math.floor(v.beds / upper) + (i < v.beds % upper ? 1 : 0),
  );

  let bedNo = 0;
  const plans: Plan[] = [{ name: t("ground", lang), rows: ground }];
  per.forEach((k, i) => {
    const bed = (): Room => {
      bedNo += 1;
      return bedNo === 1 ? { key: "room_master", w: 0.55 } : { key: "room_bed", w: 0.45, num: bedNo };
    };
    let rows: Room[][];
    if (k <= 1) rows = [[bed(), { key: "room_terrace", w: 0.45 }], [{ key: "room_bath", w: 0.4 }, { key: "room_hall", w: 0.6 }]];
    else if (k === 2) rows = [[bed(), { ...bed(), w: 0.45 }], [{ key: "room_bath", w: 0.3 }, { key: "room_hall", w: 0.7 }]];
    else rows = [[bed(), { ...bed(), w: 0.45 }], [{ ...bed(), w: 0.4 }, { key: "room_bath", w: 0.25 }, { key: "room_hall", w: 0.35 }]];
    plans.push({ name: `${t("floor_n", lang)} ${n(i + 1, lang)}`, rows });
  });
  return plans;
}

export default function FloorPlan({ villa, lang }: { villa: Villa; lang: Lang }) {
  const plans = plansFor(villa, lang);
  const FW = 200;
  const FHt = Math.round((FW * villa.landL) / villa.landW / 1.7);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {plans.map((p) => {
        let y = 0;
        return (
          <figure key={p.name} className="blueprint rounded-md border border-line p-3">
            <svg viewBox={`-4 -4 ${FW + 8} ${FHt + 8}`} className="w-full" role="img" aria-label={p.name}>
              {p.rows.map((row, ri) => {
                const h = ri === 0 ? FHt * 0.58 : FHt * 0.42;
                let x = 0;
                const out = row.map((r, ci) => {
                  const w = r.w * FW;
                  const g = (
                    <g key={ci}>
                      <rect x={x} y={y} width={w} height={h} className="fill-surface stroke-ink" strokeWidth={1.4} />
                      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={lang === "kh" ? 9 : 8.5} className="fill-ink">
                        {t(r.key, lang)}
                        {r.num ? ` ${n(r.num, lang)}` : ""}
                      </text>
                      {/* door swing */}
                      <path d={`M ${x + 6} ${y + h} a 10 10 0 0 1 10 -10`} className="stroke-muted fill-none" strokeWidth={0.7} />
                    </g>
                  );
                  x += w;
                  return g;
                });
                y += h;
                return <g key={ri}>{out}</g>;
              })}
              <rect x={0} y={0} width={FW} height={FHt} className="fill-none stroke-ink" strokeWidth={2.4} />
            </svg>
            <figcaption className="mt-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>{p.name}</span>
              <span>
                {n(villa.landW, lang)} × {n(villa.landL, lang)} m
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
