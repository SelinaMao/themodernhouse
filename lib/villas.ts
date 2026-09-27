export type Lang = "kh" | "en";
export type L = { kh: string; en: string };

export type VillaType = "single" | "queen" | "king" | "link";
export type Variant = "modern" | "twin" | "tropical" | "khmer";
export type Status = "available" | "reserved" | "sold";
export type Area = "chroy_changvar" | "sen_sok" | "chbar_ampov" | "por_senchey";

export type Villa = {
  id: string;
  name: L;
  type: VillaType;
  image: string; // file in /public
  area: Area;
  location: L;
  price: number; // USD
  landW: number; // metres (frontage)
  landL: number; // metres (depth)
  built: number; // m² built area
  floors: number;
  beds: number;
  baths: number;
  parking: number;
  title: "hard" | "strata";
  status: Status;
  handover: L;
  blurb: L;
  features: { kh: string[]; en: string[] };
  listedDaysAgo: number;
};

export const VILLA_TYPES: VillaType[] = ["single", "queen", "king", "link"];

/** Base path for images: "/" in Next.js, overridden for the single-file preview */
export const IMG_BASE = process.env.NEXT_PUBLIC_IMG_BASE ?? "/";
export const img = (v: Villa) => IMG_BASE + v.image;

// Sample prices and specs — replace with your project's real figures.
export const villas: Villa[] = [
  {
    id: "single",
    name: { kh: "វីឡាទោល", en: "Single Villa" },
    type: "single",
    image: "villas/single.jpg",
    area: "chroy_changvar",
    location: { kh: "ជ្រោយចង្វារ, ភ្នំពេញ", en: "Chroy Changvar, Phnom Penh" },
    price: 185000,
    landW: 10,
    landL: 20,
    built: 220,
    floors: 2,
    beds: 4,
    baths: 4,
    parking: 2,
    title: "hard",
    status: "available",
    handover: { kh: "ត្រីមាសទី២ ឆ្នាំ២០២៧", en: "Q2 2027" },
    blurb: {
      kh: "វីឡាទោល ២ ជាន់ ដំបូលរាបម៉ូដទំនើប មានយ៉ររថយន្តក្នុងផ្ទះ រានហាលធំ និងផ្លូវបេតុងធំទូលាយក្នុងបុរី។",
      en: "A two-storey single villa with a modern flat roof, covered car porch, wide balcony and broad concrete roads inside the borey.",
    },
    features: {
      kh: ["យ៉ររថយន្តក្នុងផ្ទះ", "រានហាលធំជាន់លើ", "បុរីមានរបង និងសន្តិសុខ ២៤ ម៉ោង", "ផ្លូវធំក្នុងបុរី"],
      en: ["Covered car porch", "Large upstairs balcony", "Gated borey, 24-hour security", "Wide internal roads"],
    },
    listedDaysAgo: 2,
  },
  {
    id: "queen",
    name: { kh: "វីឡាឃ្វីន", en: "Queen Villa" },
    type: "queen",
    image: "villas/queen.jpg",
    area: "sen_sok",
    location: { kh: "សែនសុខ, ភ្នំពេញ", en: "Sen Sok, Phnom Penh" },
    price: 245000,
    landW: 12,
    landL: 22,
    built: 280,
    floors: 2,
    beds: 4,
    baths: 5,
    parking: 2,
    title: "hard",
    status: "available",
    handover: { kh: "ស្នាក់នៅបានភ្លាម", en: "Ready to move in" },
    blurb: {
      kh: "វីឡាសាងសង់រួច ដំបូលក្បឿងបួនជ្រុង សសរធំមុខផ្ទះ ទ្វាររបងដែក និងសួនច្បារតូចមុខផ្ទះ។ អាចមកមើលផ្ទះពិតបានភ្លាម។",
      en: "A completed villa with a four-sided tiled roof, tall front columns, a steel gate and a small front garden. You can view the finished house today.",
    },
    features: {
      kh: ["សាងសង់រួច មើលផ្ទះពិតបាន", "ដំបូលក្បឿង", "ថ្មក្រាលជញ្ជាំងមុខផ្ទះ", "ភ្លើងបំភ្លឺផ្លូវសូឡា"],
      en: ["Completed, view the real house", "Tiled hip roof", "Stone-clad facade", "Solar street lights"],
    },
    listedDaysAgo: 3,
  },
  {
    id: "king",
    name: { kh: "វីឡាឃីង", en: "King Villa" },
    type: "king",
    image: "villas/king.jpg",
    area: "chbar_ampov",
    location: { kh: "ច្បារអំពៅ, ភ្នំពេញ", en: "Chbar Ampov, Phnom Penh" },
    price: 420000,
    landW: 16,
    landL: 25,
    built: 480,
    floors: 3,
    beds: 6,
    baths: 7,
    parking: 3,
    title: "hard",
    status: "reserved",
    handover: { kh: "ត្រីមាសទី៤ ឆ្នាំ២០២៦", en: "Q4 2026" },
    blurb: {
      kh: "វីឡាធំ ៣ ជាន់ ដំបូលក្បឿងពណ៌ខៀវ សសររ៉ូម៉ាំង របងក្លោងទ្វារធំ សម្រាប់គ្រួសារច្រើនជំនាន់។",
      en: "A three-storey villa with a blue tiled roof, classical columns and a grand arched fence and gate, planned for multi-generation families.",
    },
    features: {
      kh: ["ដីធំ ១៦ × ២៥ ម", "ក្លោងទ្វារដែកចម្លាក់", "រានហាលគ្រប់ជាន់", "ចំណតរថយន្ត ៣ គ្រឿង"],
      en: ["Large 16 × 25 m plot", "Ornamental steel gate", "Balconies on every floor", "Parking for 3 cars"],
    },
    listedDaysAgo: 6,
  },
  {
    id: "link-modern",
    name: { kh: "ផ្ទះល្វែងម៉ូដទំនើប", en: "Modern Link House" },
    type: "link",
    image: "villas/link-modern.jpg",
    area: "por_senchey",
    location: { kh: "ពោធិ៍សែនជ័យ, ភ្នំពេញ", en: "Por Senchey, Phnom Penh" },
    price: 139000,
    landW: 6,
    landL: 20,
    built: 190,
    floors: 2,
    beds: 3,
    baths: 3,
    parking: 1,
    title: "hard",
    status: "available",
    handover: { kh: "ត្រីមាសទី១ ឆ្នាំ២០២៧", en: "Q1 2027" },
    blurb: {
      kh: "ផ្ទះល្វែងរចនាបែបខ្សែកោង បង្អួចក្លោងធំ រានហាលកញ្ចក់ និងភ្លើងបំភ្លឺមុខផ្ទះពេលយប់។",
      en: "A link house with curved lines, tall arched windows, a glass balcony and warm facade lighting at night.",
    },
    features: {
      kh: ["រានហាលកញ្ចក់", "បង្អួចក្លោងកម្ពស់ពីរជាន់", "របងមុខផ្ទះ", "ជិតផ្លូវជាតិលេខ ៤"],
      en: ["Glass balcony", "Double-height arched window", "Gated front yard", "Near National Road 4"],
    },
    listedDaysAgo: 4,
  },
  {
    id: "link-arch",
    name: { kh: "ផ្ទះល្វែងក្លោង", en: "Arch Link House" },
    type: "link",
    image: "villas/link-arch.jpg",
    area: "por_senchey",
    location: { kh: "ពោធិ៍សែនជ័យ, ភ្នំពេញ", en: "Por Senchey, Phnom Penh" },
    price: 98000,
    landW: 4.5,
    landL: 16,
    built: 130,
    floors: 2,
    beds: 2,
    baths: 2,
    parking: 1,
    title: "hard",
    status: "sold",
    handover: { kh: "ប្រគល់រួច", en: "Handed over" },
    blurb: {
      kh: "ផ្ទះល្វែងតូច ទ្វារកញ្ចក់ក្លោងខ្ពស់ ដើមឈើមុខផ្ទះ ល្អសម្រាប់គ្រួសារថ្មី ឬរកស៊ីតូចតាច។",
      en: "A compact link house with tall arched glass doors and street trees, suited to a young family or a small shop.",
    },
    features: {
      kh: ["ទ្វារកញ្ចក់ក្លោងខ្ពស់", "ដើមឈើមុខផ្ទះ", "អាចប្រើរកស៊ីបាន", "តម្លៃសមរម្យ"],
      en: ["Tall arched glass doors", "Street trees out front", "Works as a small shop", "Entry-level price"],
    },
    listedDaysAgo: 45,
  },
];

export const areas: { id: Area; name: L }[] = [
  { id: "chroy_changvar", name: { kh: "ជ្រោយចង្វារ", en: "Chroy Changvar" } },
  { id: "sen_sok", name: { kh: "សែនសុខ", en: "Sen Sok" } },
  { id: "chbar_ampov", name: { kh: "ច្បារអំពៅ", en: "Chbar Ampov" } },
  { id: "por_senchey", name: { kh: "ពោធិ៍សែនជ័យ", en: "Por Senchey" } },
];

const khDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

/** Khmer numerals in Khmer mode, Latin in English mode */
export function n(value: number | string, lang: Lang): string {
  const s = String(value);
  return lang === "kh" ? s.replace(/[0-9]/g, (d) => khDigits[Number(d)]) : s;
}

export function usd(value: number): string {
  return "$" + Math.round(value).toLocaleString("en-US");
}

function median(values: number[]): number {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted.length ? sorted[Math.floor((sorted.length - 1) / 2)] : 0;
}

export type AreaStat = { id: Area; name: L; count: number; medianPrice: number; pricePerSqm: number };

/** Per-district stats computed from the live villa list — highest-priced district first. */
export function areaStats(): AreaStat[] {
  return areas
    .map((a) => {
      const list = villas.filter((v) => v.area === a.id);
      return {
        id: a.id,
        name: a.name,
        count: list.length,
        medianPrice: median(list.map((v) => v.price)),
        pricePerSqm: list.length ? Math.round(list.reduce((s, v) => s + v.price / v.built, 0) / list.length) : 0,
      };
    })
    .sort((a, b) => b.pricePerSqm - a.pricePerSqm);
}

export type TypeStat = { type: VillaType; fromPrice: number; sample: Villa; count: number };

/** One representative (cheapest) villa per product line, cheapest line first. */
export function typeSummary(): TypeStat[] {
  return VILLA_TYPES.map((ty) => {
    const list = villas.filter((v) => v.type === ty).sort((a, b) => a.price - b.price);
    return { type: ty, fromPrice: list[0].price, sample: list[0], count: list.length };
  }).sort((a, b) => a.fromPrice - b.fromPrice);
}

/** Newest non-sold listings first, for the "fresh this week" grid. */
export function freshListings(limit = 4): Villa[] {
  return villas
    .filter((v) => v.status !== "sold")
    .sort((a, b) => a.listedDaysAgo - b.listedDaysAgo)
    .slice(0, limit);
}

export type MarketStats = { available: number; minPrice: number; maxPrice: number; districts: number; soonest: L };

export function marketStats(): MarketStats {
  const live = villas.filter((v) => v.status !== "sold");
  const prices = live.map((v) => v.price);
  const soonest = live.slice().sort((a, b) => a.listedDaysAgo - b.listedDaysAgo)[0];
  return {
    available: live.length,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    districts: areas.length,
    soonest: soonest.handover,
  };
}
