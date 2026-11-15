export const BRAND_NAME = "";

export const BRAND_DESCRIPTION =
  "أجود أنواع النخيل بأفضل الأسعار، مع التوريد لجميع المناطق.";

export const CONTACT = {
  phoneDisplay: "0539954915",
  phoneLink: "+966539954915",
  whatsapp: "966539954915",
  email: "",
};

export const categories = [
  {
    slug: "palms",
    title: "النخيل",
    eyebrow: "حياة تنمو",
    description: "توريد وزراعة النخيل بعناية، من اختيار النوع حتى اكتمال المشهد.",
    image: "/images/home/palm-grove-hero.jpeg",
    imageAlt: "أشجار نخيل في مزرعة",
  },
] as const;

export const sanityCategoryValues: Record<string, string[]> = {
  palms: ["palms", "nakheel"],
};

export const palmVarieties = [
  { key: "washingtonia", title: "نخيل واشنطني" },
  { key: "barhi", title: "نخيل برحي" },
  { key: "saqai", title: "نخيل صقعي" },
  { key: "arabic", title: "جميع أنواع النخيل العربي" },
  { key: "royal-coconut", title: "النخيل الملوكي والنرجيل" },
] as const;

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
