import type { Metadata } from "next";
import Script from "next/script";
import { BRAND_DESCRIPTION, BRAND_NAME } from "../lib/brand";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const siteName = BRAND_NAME || "توريد وزراعة النخيل بالمملكة";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://badrpalm.com";
  const description =
    "متخصصون في توريد وزراعة أجود أصناف النخيل العربي والواشنطني والبرحي والصقعي في جميع مناطق المملكة العربية السعودية. خدمات احترافية تشمل الفرز، القلع، النقل المجهز، والغرس بنسب نجاح مضمونة. اتصل الآن: 0539954915";
  const shareImage = "/images/home/hero-main.jpg";
  const siteIcon = "/icon.png";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "توريد وزراعة النخيل | واشنطني، برحي، صقعي، عربي",
      template: "%s | توريد وزراعة النخيل",
    },
    description,
    keywords: [
      "توريد النخيل",
      "توريد وزراعة النخيل",
      "نخيل واشنطني",
      "نخيل برحي",
      "نخيل صقعي",
      "نخيل عربي",
      "بيع نخيل بالسعودية",
      "توريد نخيل بالرياض",
      "قلع وغرس النخيل",
      "نقل النخيل بالمعدات",
      "مزارع نخيل",
      "نخيل زينة",
      "نخيل مثمر",
      "أسعار توريد النخيل",
      "تنسيق مزارع واستراحات",
    ],
    authors: [{ name: "توريد وزراعة النخيل" }],
    creator: "توريد وزراعة النخيل",
    publisher: "توريد وزراعة النخيل",
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    alternates: {
      canonical: "/",
      languages: {
        "ar-SA": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: siteUrl,
      title: "توريد وزراعة النخيل | أجود الأصناف بجميع مناطق المملكة",
      description,
      siteName: "توريد وزراعة النخيل",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: "توريد وزراعة النخيل في السعودية",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "توريد وزراعة النخيل بالمملكة",
      description,
      images: [shareImage],
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/icon.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteName = BRAND_NAME || "توريد وزراعة النخيل بالمملكة";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://badrpalm.com";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "name": siteName,
    "image": `${siteUrl}/images/home/hero-main.jpg`,
    "url": siteUrl,
    "telephone": "+966539954915",
    "priceRange": "$$",
    "description": "متخصصون في توريد وزراعة أجود أصناف النخيل العربي والواشنطني والبرحي والصقعي مع خدمات القلع والنقل والغرس في جميع مناطق المملكة العربية السعودية بأفضل الأسعار.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "Riyadh",
      "addressLocality": "الرياض والمملكة العربية السعودية"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات وأصناف النخيل",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "توريد وزراعة نخيل واشنطني",
            "description": "توريد أجود شتلات وأشجار النخيل الواشنطني بأطوال وأعمار مختلفة للمشاريع والفلل والمزارع."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "توريد وزراعة نخيل برحي",
            "description": "أجود فسائل ونخيل البرحي المثمر بنسب نجاح عالية ومواصفات ممتازة."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "توريد وزراعة نخيل صقعي",
            "description": "توريد نخيل صقعي أصيل ومثمر مجهز للغرس المباشر في المزارع والاستراحات."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "توريد النخيل العربي المتنوع",
            "description": "تشكيلة واسعة من أصناف النخيل العربي الفاخر بمختلف الأحجام والكميات."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "خدمات قلع ونقل وغرس النخيل",
            "description": "أسطول معدات مجهز لنقل وغرس النخيل تحت إشراف زراعي متخصص لضمان نجاح الغرس."
          }
        }
      ]
    }
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Ads Tag (gtag.js) */}
        {googleAdsId && <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} />
          <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');
            ` }} />
        </>}
      </head>
      <body>
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
