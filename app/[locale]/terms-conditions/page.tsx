"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TermsConditionsPage() {
  const t = useTranslations("TermsConditionsPage");
  
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#f5f7f8] flex flex-col items-center gap-10 md:gap-16 lg:gap-20 pb-8 md:pb-12 lg:pb-16">
      {/* Banner */}
      <section ref={bannerRef} className="relative w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-3">
        <div className="relative h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] w-full rounded-[12px] md:rounded-[18px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-inherit"
            style={{ backgroundImage: "url('/banners/contactBanner.png')" }}
          />
          <div
            className="absolute inset-0 rounded-inherit"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 116, 183, 0.7) 0%, rgba(0, 116, 183, 0.85) 100%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="font-playfair text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white leading-tight">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-6">
        <div className="bg-white rounded-[12px] md:rounded-[18px] p-6 md:p-10 lg:p-14 shadow-sm">
          <p className="text-[16px] md:text-[18px] text-[#4A5568] mb-8">
            {t("lastUpdated")}
          </p>

          <div className="space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("introTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed">
                {t("introContent")}
              </p>
            </div>

            {/* Use of Services */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("useServicesTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed mb-4">
                {t("useServicesContent")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-[16px] md:text-[18px] text-[#4A5568]">
                <li>{t("useServices1")}</li>
                <li>{t("useServices2")}</li>
                <li>{t("useServices3")}</li>
              </ul>
            </div>

            {/* Medical Consultations */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("medicalConsultTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed">
                {t("medicalConsultContent")}
              </p>
            </div>

            {/* Appointments & Cancellations */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("appointmentsTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed mb-4">
                {t("appointmentsContent")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-[16px] md:text-[18px] text-[#4A5568]">
                <li>{t("appointments1")}</li>
                <li>{t("appointments2")}</li>
                <li>{t("appointments3")}</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("paymentTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed">
                {t("paymentContent")}
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("intellectualPropertyTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed">
                {t("intellectualPropertyContent")}
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("liabilityTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed">
                {t("liabilityContent")}
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("governingLawTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed">
                {t("governingLawContent")}
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="font-playfair text-[22px] md:text-[28px] font-semibold text-[#0C1119] mb-4">
                {t("contactTitle")}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#4A5568] leading-relaxed">
                {t("contactContent")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
