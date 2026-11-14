import { cache } from "react";
import { safeFetchFresh } from "./sanity";
import type { SiteSettings } from "../types";

export const getSiteSettings = cache(async () => {
  const settings = await safeFetchFresh<SiteSettings | null>(
    `*[_type == "settings"][0]{
      siteName, description, phone, whatsapp, email, address, facebook,
      heroTitle, heroSubTitle, heroDescription,
      "heroImageUrl": heroImage.asset->url,
      "categoryHomeImageUrls": categoryHomeImages{
        "palms": palms.asset->url,
        "fences": fences.asset->url
      }
    }`,
    null,
  );
  return settings ?? {};
});
