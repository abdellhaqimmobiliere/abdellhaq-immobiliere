export const FALLBACK_PROPERTIES = [
  {
    id: 1,
    titleFr: "Villa moderne avec piscine",
    titleAr: "فيلا عصرية مع مسبح",
    type: "vente",
    category: "villa",
    price: "2 500 000 MAD",
    city: "Rabat",
    surface: "320 m²",
    rooms: 5,
    bathrooms: 3,
    badge: "Nouveau",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    descFr:
      "Magnifique villa moderne avec piscine à débordement, grande terrasse et jardin paysager. Quartier calme et sécurisé.",
    descAr:
      "فيلا عصرية رائعة مع مسبح لا نهائي، تراس واسع وحديقة منسقة. حي هادئ وآمن.",
  },
  {
    id: 2,
    titleFr: "Appartement vue mer",
    titleAr: "شقة بإطلالة بحرية",
    type: "vente",
    category: "appartement",
    price: "980 000 MAD",
    city: "Casablanca",
    surface: "120 m²",
    rooms: 3,
    bathrooms: 2,
    badge: "Exclusif",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    descFr:
      "Superbe appartement avec vue panoramique sur la mer. Résidence sécurisée avec parking et gardien 24h/24.",
    descAr:
      "شقة رائعة بإطلالة بانورامية على البحر. إقامة مؤمنة مع موقف سيارات وحارس على مدار الساعة.",
  },
  {
    id: 3,
    titleFr: "Riad rénové Médina",
    titleAr: "رياض مجدد في المدينة القديمة",
    type: "vente",
    category: "villa",
    price: "1 800 000 MAD",
    city: "Marrakech",
    surface: "280 m²",
    rooms: 6,
    bathrooms: 4,
    badge: "",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    descFr:
      "Authentique riad entièrement rénové au cœur de la médina. Patio central avec fontaine, terrasse panoramique.",
    descAr:
      "رياض أصيل مجدد بالكامل في قلب المدينة القديمة. فناء مركزي بنافورة وتراس بانورامي.",
  },
  {
    id: 4,
    titleFr: "Bureau centre-ville",
    titleAr: "مكتب في وسط المدينة",
    type: "location",
    category: "commercial",
    price: "8 500 MAD / mois",
    city: "Fès",
    surface: "85 m²",
    rooms: 3,
    bathrooms: 1,
    badge: "",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    descFr:
      "Bureau moderne en plein centre-ville. Open space climatisé, salle de réunion, parking inclus.",
    descAr:
      "مكتب عصري في قلب المدينة. فضاء مفتوح مكيف، قاعة اجتماعات، موقف سيارات مشمول.",
  },
  {
    id: 5,
    titleFr: "Terrain constructible",
    titleAr: "أرض قابلة للبناء",
    type: "vente",
    category: "terrain",
    price: "650 000 MAD",
    city: "Agadir",
    surface: "500 m²",
    rooms: 0,
    bathrooms: 0,
    badge: "Nouveau",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    descFr:
      "Terrain plat viabilisé, titre foncier propre. Zone résidentielle calme, accès direct voie principale.",
    descAr:
      "أرض مستوية مزودة بالخدمات، رسم العقار واضح. منطقة سكنية هادئة، وصول مباشر للطريق الرئيسي.",
  },
  {
    id: 6,
    titleFr: "Appartement neuf",
    titleAr: "شقة جديدة",
    type: "location",
    category: "appartement",
    price: "6 000 MAD / mois",
    city: "Tanger",
    surface: "95 m²",
    rooms: 2,
    bathrooms: 1,
    badge: "",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    descFr:
      "Appartement neuf jamais habité, résidence avec piscine et salle de sport. Vue dégagée.",
    descAr:
      "شقة جديدة لم تُسكن قط، إقامة مع مسبح وقاعة رياضية. إطلالة مفتوحة.",
  },
];

export const STATIC_SITE = {
  name: "Mouad Immobilière",
  nameAr: "معاذ للعقار",
  tagline: "Votre partenaire immobilier de confiance au Maroc",
  taglineAr: "شريككم الموثوق في عالم العقارات بالمغرب",
  phone: "+212 6XX XXX XXX",
  whatsapp: "https://wa.me/2126XXXXXXXX",
  email: "contact@mouadimmobiliere.ma",
  instagram: "https://instagram.com/mouadimmobiliere",
  facebook: "https://facebook.com/mouadimmobiliere",
  telegram: "https://t.me/mouadimmobiliere",
  tiktok: "https://tiktok.com/@mouadimmobiliere",
  city: "Maroc",
  heroImage:
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80",
  agentImage:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  heroTitleFr: "Trouvez le bien de vos rêves",
  heroTitleAr: "اعثر على عقار أحلامك",
  statsSold: "120+",
  statsClients: "300+",
  statsYears: "5+",
};

export function mapPropertyFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    titleFr: row.title_fr,
    titleAr: row.title_ar,
    type: row.type,
    category: row.category,
    price: row.price,
    city: row.city,
    surface: row.surface || "",
    rooms: row.rooms ?? 0,
    bathrooms: row.bathrooms ?? 0,
    badge: row.badge || "",
    featured: row.featured ?? false,
    image: row.image,
    descFr: row.desc_fr || "",
    descAr: row.desc_ar || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapPropertyToDb(data) {
  return {
    title_fr: data.title_fr ?? data.titleFr,
    title_ar: data.title_ar ?? data.titleAr ?? "",
    type: data.type,
    category: data.category,
    price: data.price,
    city: data.city,
    surface: data.surface || "",
    rooms: data.rooms ?? 0,
    bathrooms: data.bathrooms ?? 0,
    badge: data.badge || "",
    featured: data.featured ?? false,
    image: data.image,
    desc_fr: data.desc_fr ?? data.descFr ?? "",
    desc_ar: data.desc_ar ?? data.descAr ?? "",
  };
}

export function mapSettingsToSite(settingsMap) {
  return {
    ...STATIC_SITE,
    phone: settingsMap.phone ?? STATIC_SITE.phone,
    whatsapp: settingsMap.whatsapp ?? STATIC_SITE.whatsapp,
    email: settingsMap.email ?? STATIC_SITE.email,
    facebook: settingsMap.facebook ?? STATIC_SITE.facebook,
    instagram: settingsMap.instagram ?? STATIC_SITE.instagram,
    telegram: settingsMap.telegram ?? STATIC_SITE.telegram,
    tiktok: settingsMap.tiktok ?? STATIC_SITE.tiktok,
    heroTitleFr: settingsMap.hero_title_fr ?? STATIC_SITE.heroTitleFr,
    heroTitleAr: settingsMap.hero_title_ar ?? STATIC_SITE.heroTitleAr,
    statsSold: settingsMap.stats_sold ?? STATIC_SITE.statsSold,
    statsClients: settingsMap.stats_clients ?? STATIC_SITE.statsClients,
    statsYears: settingsMap.stats_years ?? STATIC_SITE.statsYears,
  };
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
