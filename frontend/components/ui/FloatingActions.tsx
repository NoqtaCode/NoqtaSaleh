import { MessageCircle, PhoneCall } from "lucide-react";
import { CONTACT } from "../../lib/brand";
import { getSiteSettings } from "../../lib/site-settings";

export default async function FloatingActions() {
  const settings = await getSiteSettings();
  const rawWa = (settings.whatsapp || CONTACT.whatsapp || "966539954915").replace(/\D/g, "");
  const waNumber = rawWa.startsWith("0") ? "966" + rawWa.substring(1) : (rawWa.startsWith("966") ? rawWa : "966" + rawWa);
  const rawPhone = settings.phone || CONTACT.phoneLink || "+966539954915";
  const phone = rawPhone.startsWith("+") ? rawPhone : (rawPhone.startsWith("0") ? "+966" + rawPhone.substring(1) : "+" + rawPhone);
  const waMsg = encodeURIComponent("السلام عليكم، أرغب في الاستفسار عن توريد النخيل.");

  return (
    <>
      {/* شريط الاتصال الثابت أسفل الجوال - مثالي للزوار والحملات الإعلانية */}
      <div className="fixed inset-x-0 bottom-0 z-[100] flex items-center gap-2 border-t border-[#1b4332] bg-[#0c2219]/95 px-3 py-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] backdrop-blur-lg sm:hidden">
        <a
          href={`tel:${phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1b2e23] border border-white/20 py-3 text-xs font-black text-white shadow-md active:scale-95"
        >
          <PhoneCall size={16} className="text-[#d49b53]" />
          <span>اتصال مباشر</span>
        </a>
        <a
          href={`https://wa.me/${waNumber}?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-xs font-black text-white shadow-md active:scale-95"
        >
          <MessageCircle size={17} />
          <span>واتساب</span>
        </a>
      </div>

      {/* الأزرار العائمة للشاشات المتوسطة والكمبيوتر */}
      <div className="fixed bottom-6 left-6 z-[100] hidden flex-col gap-3 sm:flex">
        {/* زر الاتصال الهاتفي */}
        <a
          href={`tel:${phone}`}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-[#1b2e23] text-white shadow-[0_10px_30px_rgba(27,46,35,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#253d2f] active:scale-95 md:h-16 md:w-16"
          aria-label="اتصال مباشر"
        >
          <PhoneCall size={24} className="text-[#d49b53] md:w-7 md:h-7" />
          <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded-xl bg-[#1b2e23] border border-white/10 px-4 py-2 text-xs font-bold text-white shadow-2xl opacity-0 transition-opacity group-hover:opacity-100 md:block">
            اتصال مباشر
          </span>
        </a>

        {/* زر الواتساب مع تأثير النبض */}
        <a
          href={`https://wa.me/${waNumber}?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] active:scale-95 md:h-16 md:w-16"
          aria-label="تحدث معنا واتساب"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30"></span>
          <MessageCircle size={28} className="md:w-8 md:h-8" />
          <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded-xl bg-[#1b2e23] border border-white/10 px-4 py-2 text-xs font-bold text-white shadow-2xl opacity-0 transition-opacity group-hover:opacity-100 md:block">
            واتساب
          </span>
        </a>
      </div>
    </>
  );
}
