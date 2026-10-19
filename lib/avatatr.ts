export type Lang = "kh" | "en";
export type L = { kh: string; en: string };

export type VillaType = "single" | "queen" | "king" | "link";
export type Variant = "modern" | "twin" | "tropical" | "khmer";
export type Status = "available" | "reserved" | "sold";
export type Area = "techo_airport";

export type Villa = {
  id: string;
  name: L;
  type: VillaType;
  image: string; // file in /public
  images?: string[]; // optional gallery for the detail popup slider; falls back to [image]
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
export const imgs = (v: Villa) => (v.images?.length ? v.images : [v.image]).map((i) => IMG_BASE + i);

// Sample prices and specs — replace with your project's real figures.
export const AVATAR_EXTERIOR: Villa[] = [
  {
    id: "single",
    name: { kh: "អវតារ វីឡា", en: " Avatar Villa" },
    type: "single",
    image: "villas/avata01.png",
    images: ["villas/avata01.png", "villas/avata04.png", "villas/avatashowroom.png", "villas/home-avata.png"],
    area: "techo_airport",
    location: { kh: "ជិតអាកាសយានដ្ឋានតេជោ, ភ្នំពេញ", en: "Near Techo International Airport, Phnom Penh" },
    price: 67300,
    landW: 10,
    landL: 15,
    built: 220,
    floors: 2,
    beds: 3,
    baths: 3,
    parking: 1,
    title: "hard",
    status: "available",
    handover: { kh: "ត្រីមាសទី២ ឆ្នាំ២០២៧", en: "Q2 2027" },
    blurb: {
      kh: "វីឡាទោល ២ ជាន់ ដំបូលរាបម៉ូដទំនើប មានយ៉ររថយន្តក្នុងផ្ទះ រានហាលធំ និងផ្លូវបេតុងធំទូលាយក្នុងបុរី។",
      en: "A two-storey single villa with a modern flat roof, covered car porch, wide balcony and broad concrete roads inside the borey.",
    },
    features: {
      kh: ["ទំហំផ្ទះ ៧ម x ៧ម", "យ៉ររថយន្តក្នុងផ្ទះ", "រានហាលធំជាន់លើ", "បុរីមានរបង និងសន្តិសុខ ២៤ ម៉ោង", "ផ្លូវធំក្នុងបុរី"],
      en: ["Size: 7m x 7m", "Covered car porch", "Large upstairs balcony", "Gated borey, 24-hour security", "Wide internal roads"],
    },
    listedDaysAgo: 2,
  },
  {
    id: "queen",
    name: { kh: "អវតារ វីឡា", en: "Avatar Villa" },
    type: "queen",
    image: "villas/avatashowroom.png",
    images: ["villas/avatashowroom.png", "villas/avata01.png", "villas/avata04.png", "villas/home-avata.png"],
    area: "techo_airport",
    location: { kh: "ជិតអាកាសយានដ្ឋានតេជោ, ភ្នំពេញ", en: "Near Techo International Airport, Phnom Penh" },
    price: 67300,
    landW: 10,
    landL: 15,
    built: 280,
    floors: 2,
    beds: 3,
    baths: 3,
    parking: 1,
    title: "hard",
    status: "available",
    handover: { kh: "ស្នាក់នៅបានភ្លាម", en: "Ready to move in" },
    blurb: {
      kh: "វីឡាសាងសង់រួច ដំបូលក្បឿងបួនជ្រុង សសរធំមុខផ្ទះ ទ្វាររបងដែក និងសួនច្បារតូចមុខផ្ទះ។ អាចមកមើលផ្ទះពិតបានភ្លាម។",
      en: "A completed villa with a four-sided tiled roof, tall front columns, a steel gate and a small front garden. You can view the finished house today.",
    },
    features: {
      kh: ["ទំហំផ្ទះ ៧ម x ៧ម", "សាងសង់រួច មើលផ្ទះពិតបាន", "ដំបូលក្បឿង", "ថ្មក្រាលជញ្ជាំងមុខផ្ទះ", "ភ្លើងបំភ្លឺផ្លូវសូឡា"],
      en: ["Size: 7m x 7m", "Completed, view the real house", "Tiled hip roof", "Stone-clad facade", "Solar street lights"],
    },
    listedDaysAgo: 3,
  },
  {
    id: "king",
    name: { kh: "អវតារ វីឡា", en: "Avatar Villa" },
    type: "king",
    image: "villas/home-avata.png",
    images: ["villas/home-avata.png", "villas/avata01.png", "villas/avata04.png", "villas/avatashowroom.png"],
    area: "techo_airport",
    location: { kh: "ជិតអាកាសយានដ្ឋានតេជោ, ភ្នំពេញ", en: "Near Techo International Airport, Phnom Penh" },
    price: 67300,
    landW: 10,
    landL: 15,
    built: 480,
    floors: 3,
    beds: 3,
    baths: 3,
    parking: 1,
    title: "hard",
    status: "reserved",
    handover: { kh: "ត្រីមាសទី៤ ឆ្នាំ២០២៦", en: "Q4 2026" },
    blurb: {
      kh: "វីឡាធំ ៣ ជាន់ ដំបូលក្បឿងពណ៌ខៀវ សសររ៉ូម៉ាំង របងក្លោងទ្វារធំ សម្រាប់គ្រួសារច្រើនជំនាន់។",
      en: "A three-storey villa with a blue tiled roof, classical columns and a grand arched fence and gate, planned for multi-generation families.",
    },
    features: {
      kh: ["ទំហំផ្ទះ ៧ម x ៧ម", "ក្លោងទ្វារដែកចម្លាក់", "រានហាលគ្រប់ជាន់", "ចំណតរថយន្ត ១ គ្រឿង"],
      en: ["Size: 7m x 7m", "Ornamental steel gate", "Balconies on every floor", "Parking for 1 car"],
    },
    listedDaysAgo: 6,
  },
  {
    id: "link-modern",
    name: { kh: "អវតារ វីឡា", en: "Avatar Villa" },
    type: "link",
    image: "villas/02.png",
    images: ["villas/02.png", "villas/02 (2).png", "villas/02 (3).png"],
    area: "techo_airport",
    location: { kh: "ជិតអាកាសយានដ្ឋានតេជោ, ពោធិ៍សែនជ័យ, ភ្នំពេញ", en: "Near Techo International Airport, Por Senchey, Phnom Penh" },
    price: 67300,
    landW: 10,
    landL: 15,
    built: 98,
    floors: 2,
    beds: 3,
    baths: 3,
    parking: 1,
    title: "hard",
    status: "available",
    handover: { kh: "ត្រីមាសទី១ ឆ្នាំ២០២៧", en: "Q1 2027" },
    blurb: {
      kh: "ផ្ទះល្វែងរចនាបែបខ្សែកោង បង្អួចក្លោងធំ រានហាលកញ្ចក់ និងភ្លើងបំភ្លឺមុខផ្ទះពេលយប់។ ទីតាំងត្រឹម ១៥ នាទីពីអាកាសយានដ្ឋានតេជោ។",
      en: "A link house with curved lines, tall arched windows, a glass balcony and warm facade lighting at night. Only 15 minutes from Techo International Airport.",
    },
    features: {
      kh: ["ទំហំដី ១០ម x ១៥ម", "ទំហំផ្ទះ ៧ម x ៧ម", "ចំណតឡាន ៦.៥០ម", "ចម្ងាយចំហៀងផ្ទះ ១.៣០ម", "ដីខាងក្រោយសល់ ១.៥០ម", "របងព័ទ្ធជុំវិញទាំង៤ជ្រុង", "ត្រឹម១៥នាទីពីអាកាសយានដ្ឋានតេជោ"],
      en: ["Land size 10m x 15m", "House footprint 7m x 7m", "Parking space 6.50m", "Side setback 1.30m", "Rear yard 1.50m", "Fenced on all 4 sides", "15 minutes from Techo International Airport"],
    },
    listedDaysAgo: 4,
  },
  {
    id: "link-arch",
    name: { kh: "មយួរ៉ាអង្គរ", en: "Mayura Angkor" },
    type: "link",
    image: "villas/05.png",
    images: ["villas/05.png", "villas/05 (2).png", "villas/mayura/mayura01.jpg", "villas/mayura/mayura02.jpg", "villas/mayura/mayura03.jpg", "villas/mayura/mayuramode.jpg", "villas/mayura/shop.jpg"],
    area: "techo_airport",
    location: { kh: "ជិតអាកាសយានដ្ឋានតេជោ, ពោធិ៍សែនជ័យ, ភ្នំពេញ", en: "Near Techo International Airport, Por Senchey, Phnom Penh" },
    price: 67300,
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
  { id: "techo_airport", name: { kh: "អាកាសយានដ្ឋានតេជោ", en: "Techo International Airport" } },
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
      const list = AVATAR_EXTERIOR.filter((v) => v.area === a.id);
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
    const list = AVATAR_EXTERIOR.filter((v) => v.type === ty).sort((a, b) => a.price - b.price);
    return { type: ty, fromPrice: list[0].price, sample: list[0], count: list.length };
  }).sort((a, b) => a.fromPrice - b.fromPrice);
}

/** Newest non-sold listings first, for the "fresh this week" grid. */
export function freshListings(limit = 4): Villa[] {
  return AVATAR_EXTERIOR
    .filter((v) => v.status !== "sold")
    .sort((a, b) => a.listedDaysAgo - b.listedDaysAgo)
    .slice(0, limit);
}

export type MarketStats = { available: number; minPrice: number; maxPrice: number; districts: number; soonest: L };

export function marketStats(): MarketStats {
  const live = AVATAR_EXTERIOR.filter((v) => v.status !== "sold");
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
