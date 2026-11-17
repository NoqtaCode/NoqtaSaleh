import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Check, Sprout } from "lucide-react";
import SiteNavbar from "../../components/layout/SiteNavbar";
import Footer from "../../components/layout/Footer";
import { categories } from "../../lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات توريد وزراعة النخيل | قلع ونقل وغرس بجميع مناطق المملكة",
  description:
    "خدمات متكاملة لتوريد وزراعة أصناف النخيل: واشنطني، برحي، صقعي، وعربي، مع أسطول نقل مجهز وغرس احترافي تحت إشراف متخصص لضمان نجاح الغرس. تواصل معنا: 0539954915",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "خدمات توريد وزراعة النخيل في السعودية",
    description: "خدمات متكاملة تشمل الفرز والقلع والنقل والغرس لكافة أصناف النخيل العربي والواشنطني والبرحي والصقعي.",
  },
};

const icons = [Sprout];
const inclusions = [["اختيار الأنواع", "التوريد", "النقل والغرس"]];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f3f6f3] text-[#1c261e]" dir="rtl">
      <SiteNavbar />
      <main className="pb-24 pt-28 sm:pt-36">
        <section className="site-wrap grid items-end gap-8 border-b border-[#d5e2d5] pb-10 sm:pb-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="eyebrow">ما نقدّمه / خدمات النخيل</span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl text-[#1b2e23]">
              عناية متكاملة،<br />
              <span className="text-[#2d6a4f]">من الاختيار إلى الغرس.</span>
            </h1>
          </div>
          <div className="max-w-lg lg:mr-auto">
            <p className="text-sm leading-8 text-[#5e6355] sm:text-base sm:leading-9">
              نختار أجود أصناف النخيل بعناية ونرتب توريدها ونقلها بأحدث المعدات وغرسها بما يلائم احتياجك وطبيعة أرضك.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#1b2e23] transition hover:text-[#2d6a4f]">
              ناقش احتياجك <ArrowUpLeft size={17} />
            </Link>
          </div>
        </section>

        <section className="site-wrap mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = icons[index];
            return (
              <article key={category.slug} className="overflow-hidden rounded-[1.75rem] border border-[#d5e2d5] bg-white shadow-sm transition hover:shadow-md">
                <Link href={`/projects/${category.slug}`} className="group photo-card block h-64 bg-[#e2ebe2]">
                  <Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1b2e23] shadow-md"><Icon size={20} /></span>
                  <span className="absolute bottom-4 left-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#1b2e23] text-white shadow-md transition group-hover:bg-[#2d6a4f]"><ArrowUpLeft size={16} /></span>
                </Link>
                <div className="p-6 sm:p-8">
                  <span className="text-[10px] font-black tracking-[.18em] text-[#2d6a4f]">0{index + 1} / {category.eyebrow}</span>
                  <h2 className="mt-2 text-2xl font-black text-[#1b2e23]">{category.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5e6355]">{category.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-[#d5e2d5] pt-5">
                    {inclusions[index].map((item) => (
                      <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-[#e2ebe2] px-3.5 py-1.5 text-xs font-bold text-[#2d4f3b]">
                        <Check size={14} className="text-[#2d6a4f]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contact?service=${category.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1b2e23] px-5 py-2.5 text-xs font-black text-white transition hover:bg-[#2d6a4f]">
                    اطلب هذه الخدمة <ArrowUpLeft size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        <section className="site-wrap mt-16 sm:mt-24">
          <div className="rounded-[2rem] bg-[#1b2e23] p-7 text-white shadow-md sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-12">
            <div>
              <span className="text-xs font-black text-[#d49b53]">مساحة مفتوحة للأفكار</span>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">تبحث عن كميات خاصة أو توريد لمشروع كبير؟</h2>
              <p className="mt-2 text-sm leading-7 text-white/75">أخبرنا بطبيعة موقعك، وسنرتب معك الكميات والأسعار المناسبة.</p>
            </div>
            <Link href="/contact" className="mt-6 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[#d49b53] px-8 text-sm font-black text-[#1b2e23] shadow-md transition hover:bg-white sm:mt-0">
              تواصل معنا <ArrowUpLeft size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
