"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function InfertilityCounsellingPage() {
  const t = useTranslations("InfertilityPage");
  const [activeTab, setActiveTab] = useState("iui");

  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const understandingRef = useRef<HTMLDivElement>(null);
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const counsellingRef = useRef<HTMLDivElement>(null);
  const guidelinesRef = useRef<HTMLDivElement>(null);
  const facilitiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const animateSection = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    animateSection(heroRef);
    animateSection(understandingRef);
    animateSection(treatmentsRef);
    animateSection(counsellingRef);
    animateSection(guidelinesRef);
    animateSection(facilitiesRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const treatments = [
    { id: "iui", name: t("treatments.iui.name"), icon: "" },
    { id: "ivf", name: t("treatments.ivf.name"), icon: "" },
    { id: "opu", name: t("treatments.opu.name"), icon: "" },
    { id: "embryoTransfer", name: t("treatments.embryoTransfer.name"), icon: "" },
    { id: "eggDonation", name: t("treatments.eggDonation.name"), icon: "" },
    { id: "eggFreezing", name: t("treatments.eggFreezing.name"), icon: "" },
  ];

  return (
    <div className="bg-[#f5f7f8] flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full bg-gradient-to-br from-[#d5edfd] via-[#e8f5fe] to-[#f0f9ff] py-16 md:py-20 px-4"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-3">
              <h1 className="font-['Playfair_Display'] text-[40px] font-semibold md:text-[48px] leading-tight text-[#0c1119]">
                {t("hero.title")}
              </h1>
              <p className="text-[26px] md:text-[32px] font-semibold text-[#0074b7]">
                {t("hero.subtitle")}
              </p>
              <p className="text-[20px] leading-tight text-[#0c1119]">
                {t("hero.description")}
              </p>
              <a href="/contact">
                <button className="bg-[#0074b7] text-white px-8 py-4 rounded-[12px] cursor-pointer text-[20px] font-semibold hover:bg-[#005a8f] transition-colors">
                  {t("hero.bookButton")}
                </button>
              </a>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0074b7] to-[#00a8e8] flex items-center justify-center">
                <Image src="/infertility/fertility-hope.png" alt="Fertility and Hope" layout="fill" objectFit="cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Infertility */}
      <section ref={understandingRef} className="w-full max-w-[1400px] px-4 py-12 md:py-18">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-[44px] md:text-[52px] text-[#0c1119] mb-4">
            {t("understanding.title")}
          </h2>
          <p className="text-[22px] text-[#555] max-w-[900px] mx-auto">
            {t("understanding.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[18px] p-8 shadow-sm border border-[#e0e0e0]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#f6de84] rounded-full flex items-center justify-center text-[32px]">
                🔍
              </div>
              <h3 className="font-['Playfair_Display'] text-[28px] text-[#0c1119]">
                {t("understanding.enigmaTitle")}
              </h3>
            </div>
            <p className="text-[18px] text-[#555] leading-tight">
              {t("understanding.enigmaDesc")}
            </p>
          </div>

          <div className="bg-white rounded-[18px] p-8 shadow-sm border border-[#e0e0e0]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#0074b7] rounded-full flex items-center justify-center text-[32px]">
                ⚡
              </div>
              <h3 className="font-['Playfair_Display'] text-[28px] text-[#0c1119]">
                {t("understanding.culpritsTitle")}
              </h3>
            </div>
            <p className="text-[18px] text-[#555] leading-tight">
              {t("understanding.culpritsDesc")}
            </p>
          </div>
        </div>

        {/* Infertility Diagram */}
        <div className="mt-12 bg-white rounded-[18px] p-8 shadow-sm border border-[#e0e0e0]">
          <h3 className="text-center font-semibold text-[24px] mb-6 text-[#0c1119]">
            {t("understanding.causesTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: "femaleFactor", icon: "♀️" },
              { key: "maleFactor", icon: "♂️" },
              { key: "combinedFactor", icon: "🔬" },
            ].map((factor, idx) => (
              <div
                key={idx}
                className="bg-[#f0f9ff] rounded-[12px] p-6 text-center border-2 border-[#0074b7]"
              >
                <div className="text-[48px] mb-3">{factor.icon}</div>
                <p className="text-[18px] font-semibold text-[#0c1119]">
                  {t(`understanding.${factor.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Modalities */}
      <section
        ref={treatmentsRef}
        className="w-full bg-gradient-to-b from-[#f5f7f8] to-[#d5edfd] py-12 md:py-10"
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-[44px] md:text-[52px] text-[#0c1119] mb-4">
              {t("treatments.title")}
            </h2>
            <p className="text-[22px] text-[#555]">
              {t("treatments.subtitle")}
            </p>
          </div>

          {/* Treatment Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {treatments.map((treatment) => (
              <button
                key={treatment.id}
                onClick={() => setActiveTab(treatment.id)}
                className={`px-6 py-3 rounded-[12px] text-[18px] font-semibold transition-all ${
                  activeTab === treatment.id
                    ? "bg-[#0074b7] text-white shadow-lg scale-105"
                    : "bg-white text-[#0074b7] hover:bg-[#e8f5fe]"
                }`}
              >
                <span className="mr-2">{treatment.icon}</span>
                {treatment.name}
              </button>
            ))}
          </div>

          {/* IUI Treatment Content */}
          {activeTab === "iui" && (
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-['Playfair_Display'] text-[36px] text-[#0c1119] mb-4">
                    {t("treatments.iui.name")} - {t("treatments.iui.fullName")}
                  </h3>
                  <p className="text-[20px] text-[#555] mb-6">
                    {t("treatments.iui.description")}
                  </p>
                  <div className="bg-[#f6de84] rounded-[12px] p-4 mb-6">
                    <p className="text-[18px] font-semibold text-[#0c1119]">
                      ✨ {t("treatments.iui.successRate")}
                    </p>
                  </div>
                  <h4 className="text-[22px] font-semibold text-[#0c1119] mb-4">
                    {t("treatments.iui.procedureTitle")}
                  </h4>
                  <ul className="space-y-3">
                    {["step1", "step2", "step3", "step4"].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#0074b7] text-[24px]">•</span>
                        <span className="text-[18px] text-[#555]">{t(`treatments.iui.${step}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-[400px] rounded-[18px] flex items-center justify-center">
                    <Image src="/infertility/IUI.png" alt={t("treatments.iui.diagramAlt")} width={700} height={600} objectFit="cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* IVF Treatment Content */}
          {activeTab === "ivf" && (
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-['Playfair_Display'] text-[36px] text-[#0c1119] mb-4">
                    {t("treatments.ivf.name")} - {t("treatments.ivf.fullName")}
                  </h3>
                  <p className="text-[20px] text-[#555] mb-6">
                    {t("treatments.ivf.description")}
                  </p>
                  <div className="bg-[#f6de84] rounded-[12px] p-4 mb-6">
                    <p className="text-[18px] font-semibold text-[#0c1119]">
                      ✨ {t("treatments.ivf.successRate")}
                    </p>
                  </div>
                  <h4 className="text-[22px] font-semibold text-[#0c1119] mb-4">
                    {t("treatments.ivf.processTitle")}
                  </h4>
                  <ul className="space-y-3">
                    {["step1", "step2", "step3", "step4", "step5"].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#0074b7] text-[24px]">•</span>
                        <span className="text-[18px] text-[#555]">{t(`treatments.ivf.${step}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-[400px] rounded-[18px] flex items-center justify-center">
                    <Image src="/infertility/IVF.png" alt={t("treatments.ivf.diagramAlt")} width={600} height={800} objectFit="cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OPU Treatment Content */}
          {activeTab === "opu" && (
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-['Playfair_Display'] text-[36px] text-[#0c1119] mb-4">
                    {t("treatments.opu.name")} - {t("treatments.opu.fullName")}
                  </h3>
                  <p className="text-[20px] text-[#555] mb-6">
                    {t("treatments.opu.description")}
                  </p>
                  <ul className="space-y-3">
                    {["step1", "step2", "step3", "step4"].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#0074b7] text-[24px]">•</span>
                        <span className="text-[18px] text-[#555]">{t(`treatments.opu.${step}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-[415px] rounded-[18px] flex items-center justify-center">
                    <Image src="/infertility/OPU.png" alt="OPU Procedure Diagram" width={500} height={600} objectFit="cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Embryo Transfer Content */}
          {activeTab === "embryoTransfer" && (
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-['Playfair_Display'] text-[36px] text-[#0c1119] mb-4">
                    {t("treatments.embryoTransfer.fullName")}
                  </h3>
                  <p className="text-[20px] text-[#555] mb-6">
                    {t("treatments.embryoTransfer.description")}
                  </p>
                  <div className="bg-[#f6de84] rounded-[12px] p-4 mb-6">
                    <p className="text-[18px] font-semibold text-[#0c1119]">
                      ✨ {t("treatments.embryoTransfer.successRate")}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {["step1", "step2", "step3", "step4"].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#0074b7] text-[24px]">•</span>
                        <span className="text-[18px] text-[#555]">{t(`treatments.embryoTransfer.${step}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-[400px] rounded-[18px] flex items-center justify-center overflow-hidden">
                    <Image src="/infertility/Embryo.png" alt="Embryo Transfer Diagram" width={600} height={800} objectFit="cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Egg Donation Content */}
          {activeTab === "eggDonation" && (
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-['Playfair_Display'] text-[36px] text-[#0c1119] mb-4">
                    {t("treatments.eggDonation.fullName")}
                  </h3>
                  <p className="text-[20px] text-[#555] mb-6">
                    {t("treatments.eggDonation.description")}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {["step1", "step2", "step3", "step4"].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#0074b7] text-[24px]">•</span>
                        <span className="text-[18px] text-[#555]">{t(`treatments.eggDonation.${step}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-[400px] rounded-[18px] flex items-center justify-center">
                    <Image src="/infertility/egg-donation.png" alt="Egg Donation Process Diagram" width={600} height={600} objectFit="cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Egg Freezing Content */}
          {activeTab === "eggFreezing" && (
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-['Playfair_Display'] text-[36px] text-[#0c1119] mb-4">
                    {t("treatments.eggFreezing.name")} - {t("treatments.eggFreezing.fullName")}
                  </h3>
                  <p className="text-[20px] text-[#555] mb-6">
                    {t("treatments.eggFreezing.description")}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {["step1", "step2", "step3", "step4"].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#0074b7] text-[24px]">•</span>
                        <span className="text-[18px] text-[#555]">{t(`treatments.eggFreezing.${step}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-[400px] rounded-[18px] flex items-center justify-center">
                    <Image src="/infertility/egg-freezing.png" alt="Egg Freezing Process Diagram" width={700} height={600} objectFit="cover" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Counselling Support */}
      <section ref={counsellingRef} className="w-full max-w-[1400px] px-4 py-12 md:py-18">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-[44px] md:text-[52px] text-[#0c1119] mb-4">
            {t("counselling.title")}
          </h2>
          <p className="text-[22px] text-[#555]">
            {t("counselling.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { key: "individual", icon: "👤" },
            { key: "couple", icon: "👫" },
            { key: "group", icon: "👥" },
          ].map((counselling, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[18px] p-8 shadow-sm border border-[#e0e0e0] hover:shadow-lg transition-shadow"
            >
              <div className="w-20 h-20 bg-[#d5edfd] rounded-full flex items-center justify-center text-[48px] mb-6 mx-auto">
                {counselling.icon}
              </div>
              <h3 className="text-[24px] font-semibold text-[#0c1119] text-center mb-4">
                {t(`counselling.${counselling.key}.title`)}
              </h3>
              <p className="text-[18px] text-[#555] text-center leading-tight">
                {t(`counselling.${counselling.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section
        ref={guidelinesRef}
        className="w-full bg-gradient-to-b from-[#f0f9ff] to-[#d5edfd] py-12 md:py-18"
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-[44px] md:text-[52px] text-[#0c1119] mb-4">
              {t("guidelines.title")}
            </h2>
            <p className="text-[22px] text-[#555]">
              {t("guidelines.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do's */}
            <div className="bg-white rounded-[18px] p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-[32px]">
                  ✅
                </div>
                <h3 className="text-[28px] font-semibold text-green-700">{t("guidelines.dosTitle")}</h3>
              </div>
              <ul className="space-y-2">
                {["do1", "do2", "do3", "do4", "do5", "do6"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 text-[24px] mt-1">✓</span>
                    <span className="text-[18px] text-[#555]">{t(`guidelines.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-white rounded-[18px] p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-[32px]">
                  ⛔
                </div>
                <h3 className="text-[28px] font-semibold text-red-700">{t("guidelines.dontsTitle")}</h3>
              </div>
              <ul className="space-y-2">
                {["dont1", "dont2", "dont3", "dont4", "dont5", "dont6"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-600 text-[24px] mt-1">✗</span>
                    <span className="text-[18px] text-[#555]">{t(`guidelines.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section ref={facilitiesRef} className="w-full max-w-[1400px] px-4 py-12 md:py-18">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-[44px] md:text-[52px] text-[#0c1119] mb-4">
            {t("facilities.title")}
          </h2>
          <p className="text-[22px] text-[#555]">{t("facilities.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[18px] p-8 shadow-lg border-t-4 border-[#0074b7]">
            <h3 className="text-[28px] font-semibold text-[#0c1119] mb-4">
              {t("facilities.artLevel1Title")}
            </h3>
            <p className="text-[20px] font-semibold text-[#0074b7] mb-4">
              {t("facilities.artLevel1Name")}
            </p>
            <ul className="space-y-3 mb-6">
              {["artLevel1Service1", "artLevel1Service2", "artLevel1Service3"].map((service, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-[#0074b7] text-[20px]">•</span>
                  <span className="text-[18px] text-[#555]">{t(`facilities.${service}`)}</span>
                </li>
              ))}
            </ul>
            <p className="text-[16px] text-[#555]">
              📍 {t("facilities.artLevel1Address")}
            </p>
          </div>

          <div className="bg-white rounded-[18px] p-8 shadow-lg border-t-4 border-[#f6de84]">
            <h3 className="text-[28px] font-semibold text-[#0c1119] mb-4">
              {t("facilities.artLevel2Title")}
            </h3>
            <p className="text-[20px] font-semibold text-[#0074b7] mb-4">
              {t("facilities.artLevel2Name")}
            </p>
            <ul className="space-y-3 mb-6">
              {["artLevel2Service1", "artLevel2Service2", "artLevel2Service3"].map((service, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-[#0074b7] text-[20px]">•</span>
                  <span className="text-[18px] text-[#555]">{t(`facilities.${service}`)}</span>
                </li>
              ))}
            </ul>
            <p className="text-[16px] text-[#555] italic">
              {t("facilities.artLevel2Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Dr. Kavisha Section */}
      <section className="w-full bg-gradient-to-b from-[#d5edfd] to-[#f5f7f8] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0074b7] to-[#00a8e8] flex items-center justify-center">
                <Image src="/gallery/kavishaAlt.JPG" alt="Dr. Kavisha Shinde" layout="fill" objectFit="cover" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="font-['Playfair_Display'] text-[44px] md:text-[52px] text-[#0c1119]">
                {t("doctor.title")}
              </h2>
              <p className="text-[26px] font-semibold text-[#0074b7]">
                {t("doctor.subtitle")}
              </p>
              <p className="text-[20px] text-[#555] leading-tight">
                {t("doctor.description")}
              </p>
              <div className="bg-white rounded-[18px] p-6 shadow-sm">
                <h3 className="text-[22px] font-semibold text-[#0c1119] mb-4">
                  {t("doctor.credentialsTitle")}
                </h3>
                <ul className="space-y-0">
                  {["credential1", "credential2", "credential3", "credential4"].map((credential, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-[#0074b7] text-[24px]">✓</span>
                      <span className="text-[18px] text-[#555] leading-tight">{t(`doctor.${credential}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <a href="/doctors">
                <button className="bg-[#0074b7] text-white px-8 py-4 cursor-pointer rounded-[12px] text-[20px] font-semibold hover:bg-[#005a8f] transition-colors">
                  {t("doctor.knowMoreButton")}
                </button>
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
