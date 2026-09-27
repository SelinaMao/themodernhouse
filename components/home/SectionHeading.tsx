type Props = {
  index?: string;
  eyebrow: string;
  title: string;
  sub?: string;
  hc: string;
  align?: "left" | "center";
  action?: { label: string; onClick: () => void };
};

export default function SectionHeading({ index, eyebrow, title, sub, hc, align = "left", action }: Props) {
  const heading = (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">
        {index ? `${index} · ` : ""}
        {eyebrow}
      </p>
      <h2 className={`mt-2.5 text-3xl md:text-4xl ${hc}`}>{title}</h2>
      {sub && <p className={`mt-3 text-muted ${align === "center" ? "mx-auto" : "max-w-[58ch]"}`}>{sub}</p>}
    </div>
  );

  if (!action) return heading;

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      {heading}
      <button type="button" onClick={action.onClick} className="shrink-0 text-sm font-medium text-jade hover:underline">
        {action.label} ›
      </button>
    </div>
  );
}
