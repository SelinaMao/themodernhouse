import type { Lang } from "./villas";

const dict = {
  nav_villas: { kh: "វីឡា", en: "Villas" },
  nav_plan: { kh: "គម្រោងបង់រំលស់", en: "Payment plan" },
  nav_contact: { kh: "ទំនាក់ទំនង", en: "Contact" },
  book_visit: { kh: "កក់ពេលមើលផ្ទះ", en: "Book a visit" },

  hero_eyebrow: { kh: "ផ្ទះវីឡាសម្រាប់លក់ · ប្លង់រឹង", en: "Villas for sale · Hard title" },
  hero_title: { kh: "ផ្ទះវីឡាដែលគ្រួសារអ្នកនឹងរស់នៅយូរ", en: "Villas your family will live in for decades" },
  hero_sub: {
    kh: "វីឡាទោល វីឡាឃ្វីន វីឡាឃីង និងផ្ទះល្វែង នៅភ្នំពេញ។ មើលរូបផ្ទះ ប្លង់ តម្លៃ និងគណនាការបង់រំលស់បានភ្លាមៗ។",
    en: "Single, Queen and King villas and link houses in Phnom Penh. See photos, floor plans and prices, and work out your installments on the spot.",
  },
  cta_browse: { kh: "មើលវីឡាទាំងអស់", en: "Browse villas" },
  stat_villas: { kh: "វីឡានៅសល់", en: "Villas available" },
  stat_from: { kh: "តម្លៃចាប់ពី", en: "Prices from" },
  stat_plan: { kh: "បង់រំលស់ ០%", en: "0% installments" },
  stat_plan_v: { kh: "រហូតដល់ ៤៨ ខែ", en: "Up to 48 months" },
  photo_note: { kh: "រូបផ្ទះពិតក្នុងបុរី", en: "Completed house in the borey" },

  list_title: { kh: "ជ្រើសរើសវីឡា", en: "Choose a villa" },
  filter_area: { kh: "ខណ្ឌ", en: "District" },
  filter_type: { kh: "ប្រភេទ", en: "Type" },
  filter_beds: { kh: "បន្ទប់គេង", en: "Bedrooms" },
  filter_budget: { kh: "ថវិកាអតិបរមា", en: "Max budget" },
  any: { kh: "ទាំងអស់", en: "Any" },
  beds_plus: { kh: "+ បន្ទប់", en: "+ beds" },
  available_only: { kh: "បង្ហាញតែវីឡានៅសល់", en: "Available only" },
  results: { kh: "វីឡា", en: "villas" },
  no_results: {
    kh: "មិនមានវីឡាត្រូវនឹងការស្វែងរកទេ។ សាកល្បងបង្កើនថវិកា ឬជ្រើស «ទាំងអស់»។",
    en: "No villas match. Try a higher budget or set a filter back to “Any”.",
  },
  reset: { kh: "កំណត់ឡើងវិញ", en: "Reset filters" },

  type_single: { kh: "វីឡាទោល", en: "Single villa" },
  type_queen: { kh: "វីឡាឃ្វីន", en: "Queen villa" },
  type_king: { kh: "វីឡាឃីង", en: "King villa" },
  type_link: { kh: "ផ្ទះល្វែង", en: "Link house" },

  status_available: { kh: "នៅសល់", en: "Available" },
  status_reserved: { kh: "បានកក់", en: "Reserved" },
  status_sold: { kh: "លក់ដាច់", en: "Sold" },

  beds: { kh: "បន្ទប់គេង", en: "Beds" },
  baths: { kh: "បន្ទប់ទឹក", en: "Baths" },
  land: { kh: "ទំហំដី", en: "Land" },
  built: { kh: "ផ្ទៃក្រឡាសាងសង់", en: "Built area" },
  floors: { kh: "ចំនួនជាន់", en: "Floors" },
  parking: { kh: "ចំណតរថយន្ត", en: "Parking" },
  title: { kh: "ប្រភេទប្លង់", en: "Title" },
  title_hard: { kh: "ប្លង់រឹង", en: "Hard title" },
  title_strata: { kh: "ប្លង់ឯកជនភាគ", en: "Strata title" },
  handover: { kh: "ប្រគល់ផ្ទះ", en: "Handover" },
  view: { kh: "មើលលម្អិត", en: "View details" },
  close: { kh: "បិទ", en: "Close" },
  features: { kh: "ចំណុចពិសេស", en: "Highlights" },
  floorplan: { kh: "ប្លង់ជាន់", en: "Floor plans" },
  ground: { kh: "ជាន់ផ្ទាល់ដី", en: "Ground floor" },
  floor_n: { kh: "ជាន់ទី", en: "Floor" },
  plan_note: { kh: "ប្លង់គំនូសសង្ខេប មិនមែនតាមមាត្រដ្ឋានពិតប្រាកដទេ", en: "Schematic plan, not to exact scale" },
  calc_this: { kh: "គណនាការបង់រំលស់", en: "Calculate installments" },
  ask_telegram: { kh: "សួរតាម Telegram", en: "Ask on Telegram" },
  per_month: { kh: "/ខែ", en: "/mo" },
  from_mo: { kh: "បង់ប្រចាំខែប្រហែល", en: "Around" },

  room_living: { kh: "បន្ទប់ទទួលភ្ញៀវ", en: "Living" },
  room_kitchen: { kh: "ផ្ទះបាយ", en: "Kitchen" },
  room_garage: { kh: "យានដ្ឋាន", en: "Garage" },
  room_bath: { kh: "បន្ទប់ទឹក", en: "Bath" },
  room_store: { kh: "ឃ្លាំង", en: "Store" },
  room_bed: { kh: "បន្ទប់គេង", en: "Bed" },
  room_master: { kh: "បន្ទប់គេងធំ", en: "Master" },
  room_hall: { kh: "សាល", en: "Hall" },
  room_terrace: { kh: "រានហាល", en: "Terrace" },

  plan_title: { kh: "គណនាការបង់រំលស់", en: "Payment plan calculator" },
  plan_sub: {
    kh: "កក់ប្រាក់មុន $៥,០០០ បន្ទាប់មកបង់ប្រាក់ដើមតាមភាគរយដែលអ្នកជ្រើស ហើយបង់រំលស់ ០% ជាមួយក្រុមហ៊ុន ឬខ្ចីធនាគារ។",
    en: "Book with a $5,000 deposit, pay a down payment of your choice, then spread the rest at 0% with us or through a bank loan.",
  },
  plan_villa: { kh: "វីឡា", en: "Villa" },
  plan_price: { kh: "តម្លៃផ្ទះ", en: "Villa price" },
  plan_down: { kh: "ប្រាក់បង់ដំបូង", en: "Down payment" },
  plan_months: { kh: "រយៈពេលបង់", en: "Term" },
  plan_months_u: { kh: "ខែ", en: "months" },
  plan_mode: { kh: "វិធីបង់", en: "Financing" },
  plan_inhouse: { kh: "ក្រុមហ៊ុន ០%", en: "In-house 0%" },
  plan_bank: { kh: "ធនាគារ", en: "Bank loan" },
  plan_rate: { kh: "អត្រាការប្រាក់ប្រចាំឆ្នាំ", en: "Annual interest rate" },
  plan_monthly: { kh: "បង់ប្រចាំខែ", en: "Monthly payment" },
  plan_financed: { kh: "ប្រាក់នៅសល់ត្រូវបង់រំលស់", en: "Amount financed" },
  plan_total: { kh: "សរុបប្រាក់បង់ទាំងអស់", en: "Total paid" },
  plan_interest: { kh: "ការប្រាក់សរុប", en: "Total interest" },
  plan_deposit: { kh: "ប្រាក់កក់", en: "Booking deposit" },
  plan_bank_note: {
    kh: "ការប្រាក់ធនាគារខុសគ្នាតាមធនាគារ។ តួលេខនេះគ្រាន់តែជាការប៉ាន់ស្មាន។",
    en: "Bank rates vary by lender. Figures are estimates only.",
  },
  plan_inhouse_note: {
    kh: "បង់រំលស់ជាមួយក្រុមហ៊ុន ០% អតិបរមា ៤៨ ខែ។",
    en: "In-house plans run at 0% for up to 48 months.",
  },

  contact_title: { kh: "កក់ពេលមកមើលផ្ទះ", en: "Book a site visit" },
  contact_via: { kh: "ឬទាក់ទងតាម", en: "Or contact us via" },
  contact_sub: {
    kh: "បំពេញព័ត៌មាន រួចផ្ញើមកយើងតាម Telegram។ ភ្នាក់ងារនឹងឆ្លើយតបក្នុងម៉ោងធ្វើការ។",
    en: "Fill this in, then send it to us on Telegram. An agent replies during office hours.",
  },
  f_name: { kh: "ឈ្មោះ", en: "Name" },
  f_phone: { kh: "លេខទូរស័ព្ទ", en: "Phone" },
  f_villa: { kh: "វីឡាដែលចាប់អារម្មណ៍", en: "Villa you're interested in" },
  f_date: { kh: "ថ្ងៃចង់មកមើល", en: "Preferred visit date" },
  f_msg: { kh: "សំណួរបន្ថែម", en: "Questions" },
  f_submit: { kh: "រៀបចំសារ", en: "Prepare message" },
  f_ready: { kh: "សាររបស់អ្នករួចរាល់", en: "Your message is ready" },
  f_ready_sub: {
    kh: "ចម្លងសារនេះ រួចបិទភ្ជាប់ក្នុង Telegram។",
    en: "Copy it, then paste it into Telegram.",
  },
  f_need: { kh: "សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទ", en: "Enter your name and phone number" },
  copy: { kh: "ចម្លង", en: "Copy" },
  copied: { kh: "បានចម្លង", en: "Copied" },
  open_tg: { kh: "បើក Telegram", en: "Open Telegram" },
  office: { kh: "ការិយាល័យលក់", en: "Sales office" },
  hours: { kh: "ម៉ោងធ្វើការ", en: "Office hours" },
  phone: { kh: "ទូរស័ព្ទ", en: "Phone" },
  footer: {
    kh: "ព័ត៌មាន និងតម្លៃក្នុងគេហទំព័រនេះជាគំរូ។",
    en: "Listings and prices on this site are sample content.",
  },

  // ---- Hero search / ticker ----
  search_placeholder: { kh: "ស្វែងរកតាមឈ្មោះ ឬទីតាំង...", en: "Search by name or location…" },
  search_button: { kh: "ស្វែងរក", en: "Search" },
  tab_all: { kh: "ទាំងអស់", en: "All" },
  active_areas: { kh: "ខណ្ឌដែលមានវីឡាច្រើន", en: "Most active districts" },
  ticker_pulse: { kh: "ចង្វាក់ទីផ្សារ", en: "Market pulse" },
  ticker_available: { kh: "វីឡានៅសល់", en: "homes available" },
  ticker_range: { kh: "ចន្លោះតម្លៃ", en: "price range" },
  ticker_districts: { kh: "ខណ្ឌ", en: "districts" },
  ticker_handover: { kh: "ប្រគល់ផ្ទះឆាប់បំផុត", en: "soonest handover" },

  // ---- Fresh this week ----
  fresh_eyebrow: { kh: "ថ្មីៗសប្តាហ៍នេះ", en: "Fresh this week" },
  fresh_title: { kh: "វីឡាចុះបញ្ជីថ្មីៗ", en: "The newest villas on the market" },
  fresh_sub: {
    kh: "វីឡាទាំងអស់ដែលនៅសល់ ជាមួយអាយុនៃការចុះបញ្ជីពិត",
    en: "Every available villa, with its real listing age.",
  },
  new_badge: { kh: "ថ្មី", en: "New" },
  days_ago: { kh: "ថ្ងៃមុន", en: "days ago" },
  day_ago_one: { kh: "១ថ្ងៃមុន", en: "1 day ago" },
  see_all_listings: { kh: "មើលវីឡាទាំងអស់", en: "See all new listings" },

  // ---- Just launched ----
  launched_eyebrow: { kh: "គម្រោងទើបចេញ", en: "Just launched" },
  launched_title: { kh: "ជម្រើសផ្ទះតាមប្រភេទ", en: "Every product line, at launch pricing" },
  launched_badge: { kh: "គម្រោងថ្មី", en: "New project" },
  launched_from: { kh: "ចាប់ពី", en: "from" },
  see_all_types: { kh: "មើលគ្រប់ប្រភេទ", en: "All product lines" },

  // ---- What homes cost ----
  cost_eyebrow: { kh: "តម្លៃទីផ្សារឥឡូវនេះ", en: "What homes cost right now" },
  cost_title: { kh: "តម្លៃលក់តាមខណ្ឌ គិតចេញពីវីឡានៅសល់", en: "Asking prices by district, computed from live listings" },
  cost_toggle: { kh: "តម្លៃ $/ម²", en: "Buy $/m²" },
  cost_median_price: { kh: "តម្លៃមធ្យម", en: "Median sale price" },
  cost_price_sqm: { kh: "តម្លៃមធ្យម/ម²", en: "Median $/m²" },
  cost_homes_listed: { kh: "ចំនួនវីឡា", en: "Homes listed" },
  cost_view_district: { kh: "មើលវីឡាក្នុងខណ្ឌនេះ", en: "Browse this district" },

  // ---- Explore districts ----
  explore_eyebrow: { kh: "ស្វែងយល់ខណ្ឌនីមួយៗ", en: "Explore our districts" },
  explore_title: { kh: "គ្រប់ខណ្ឌដែលយើងសាងសង់ ជាមួយទីផ្សារផ្ទាល់", en: "Every district we build in, with a live market" },
  explore_homes: { kh: "វីឡា", en: "homes" },

  // ---- Neighbourhood spotlight ----
  spotlight_eyebrow: { kh: "ខណ្ឌប្រចាំសប្តាហ៍", en: "District of the week" },
  spotlight_homes: { kh: "វីឡានៅសល់", en: "homes listed" },
  spotlight_price_sqm: { kh: "តម្លៃមធ្យម/ម²", en: "median $/m²" },
  spotlight_median_price: { kh: "តម្លៃមធ្យម", en: "median price" },
  spotlight_explore: { kh: "មើលខណ្ឌនេះ", en: "Explore this district" },
  spotlight_profile: { kh: "អានប្រវត្តិខណ្ឌ", en: "Read the district profile" },

  // ---- Tour cards ----
  tour_eyebrow: { kh: "ដើរមើលពីលើគ្រែ", en: "Tour it from your sofa" },
  tour_title: { kh: "រូបភាពជិតៗនៃផ្ទះនីមួយៗ", en: "Homes and photos worth a close look" },

  // ---- Market news ----
  news_eyebrow: { kh: "ដឹងពីទីផ្សារ", en: "Know the market" },
  news_title: { kh: "អត្ថបទពីក្រុមការងារយើង", en: "Notes from our own team" },
  news1_title: { kh: "របៀបដែលការបង់រំលស់ ០% ដំណើរការ", en: "How our 0% installment plan works" },
  news1_body: {
    kh: "កក់ប្រាក់ $៥,០០០ ជ្រើសរើសភាគរយបង់ដំបូង រួចបែងចែកនៅសល់រហូតដល់ ៤៨ ខែ ដោយគ្មានការប្រាក់។",
    en: "Book with a $5,000 deposit, choose your down payment, and spread the rest over up to 48 months at 0% interest.",
  },
  news1_date: { kh: "១៥ កញ្ញា ២០២៦", en: "September 15, 2026" },
  news2_title: { kh: "ប្លង់រឹង ធៀបនឹង ប្លង់ឯកជនភាគ", en: "Hard title vs. strata title" },
  news2_body: {
    kh: "វីឡាទាំងអស់នៅទីនេះមានប្លង់រឹងផ្ទាល់ខ្លួន — នេះជាអត្ថន័យសម្រាប់អ្នកទិញ។",
    en: "Every villa here carries its own hard title — here's what that means for a buyer.",
  },
  news2_date: { kh: "៨ កញ្ញា ២០២៦", en: "September 8, 2026" },
  news3_title: { kh: "អ្វីដែលត្រូវរំពឹងទុកនៅថ្ងៃមកមើលផ្ទះ", en: "What to expect on a site visit" },
  news3_body: {
    kh: "ពីការកក់ម៉ោង រហូតដល់ការមើលផ្ទះពិត — នេះជាដំណើរការពេញលេញ។",
    en: "From booking a time slot to walking the finished house — here's the full process.",
  },
  news3_date: { kh: "២៩ សីហា ២០២៦", en: "August 29, 2026" },
  see_all_news: { kh: "អត្ថបទទាំងអស់", en: "All news" },

  // ---- CTA banner ----
  cta_banner_title: { kh: "ចង់ឱ្យអ្នកជំនាញជួយស្វែងរក?", en: "Let our team do the searching" },
  cta_banner_sub: {
    kh: "ប្រាប់យើងពីថវិកា និងតម្រូវការរបស់អ្នក ភ្នាក់ងារនឹងណែនាំវីឡាសមស្របតាម Telegram",
    en: "Tell us your budget and needs — an agent will match you with the right villa on Telegram.",
  },
  cta_banner_button: { kh: "សួរតាម Telegram", en: "Ask on Telegram" },

  // ---- Welcome back ----
  welcome_back_title: { kh: "សូមស្វាគមន៍ការត្រឡប់មកវិញ", en: "Welcome back" },
  welcome_back_sub: { kh: "បន្តមើលពីកន្លែងដែលអ្នកបានឈប់", en: "Pick up where you left off." },

  // ---- Link directory ----
  directory_eyebrow: { kh: "រកមើលតាមប្រភេទ និងខណ្ឌ", en: "Browse by type and district" },
  directory_sale: { kh: "សម្រាប់លក់", en: "for sale" },
  directory_in: { kh: "ក្នុង", en: "in" },

  // ---- Footer ----
  footer_nav: { kh: "គេហទំព័រ", en: "Site" },
  footer_contact: { kh: "ទំនាក់ទំនង", en: "Contact" },
  footer_rights: { kh: "រក្សាសិទ្ធិគ្រប់យ៉ាង", en: "All rights reserved." },
} as const;

export type Key = keyof typeof dict;

export function t(key: Key, lang: Lang): string {
  return dict[key][lang];
}
