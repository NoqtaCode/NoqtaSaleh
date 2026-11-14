// ===================================================
// Central TypeScript types for the entire application
// ===================================================

export type SiteSettings = {
  siteName?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  facebook?: string;
  description?: string;
  heroTitle?: string;
  heroSubTitle?: string;
  heroDescription?: string;
  logoUrl?: string;
  heroUrl?: string;
  aboutUrl?: string;
  aboutImageUrl?: string;
  logoImageUrl?: string;
  heroImageUrl?: string;
  categoryHomeImages?: Record<string, { asset?: { _ref?: string } }>;
  categoryHomeImageUrls?: Record<string, string>;
};

export type CmsProject = {
  _id: string;
  title: string;
  category: string;
  slug?: string;
  status?: string;
  imageUrl?: string;
  description?: string;
  _createdAt?: string;
};

export type CmsGalleryImage = {
  _id: string;
  category: string;
  url: string;
  title?: string;
  variety?: string;
};

export type CmsService = {
  _id: string;
  title: string;
  description?: string;
  iconUrl?: string;
};

export type CmsTestimonial = {
  _id: string;
  clientName: string;
  feedback: string;
  isActive?: boolean;
};
