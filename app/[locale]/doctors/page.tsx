"use client";

import ServiceCard from "@/components/ServiceCard";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DoctorsPage() {
  const t = useTranslations("DoctorsPage");
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<string>(tabParam || "raunak");

  // Refs for Dr. Raunak sections
  const raunakHeroRef = useRef<HTMLDivElement | null>(null);
  const raunakExpertiseRef = useRef<HTMLDivElement | null>(null);
  const raunakTimelineRef = useRef<HTMLDivElement | null>(null);
  const raunakGalleryRef = useRef<HTMLDivElement | null>(null);
  // Timeline parts
  const raunakTimelineIcon1Ref = useRef<HTMLDivElement | null>(null);
  const raunakTimelineTrainingRef = useRef<HTMLDivElement | null>(null);
  const raunakTimelineIcon2Ref = useRef<HTMLDivElement | null>(null);
  const raunakTimelineQualificationsRef = useRef<HTMLDivElement | null>(null);
  const raunakTimelineIcon3Ref = useRef<HTMLDivElement | null>(null);
  const raunakTimelineCareRef = useRef<HTMLDivElement | null>(null);

  // Refs for Dr. Kavisha sections
  const kavishaHeroRef = useRef<HTMLDivElement | null>(null);
  const kavishaExpertiseRef = useRef<HTMLDivElement | null>(null);
  const kavishaTimelineRef = useRef<HTMLDivElement | null>(null);
  const kavishaGalleryRef = useRef<HTMLDivElement | null>(null);
  // Timeline parts
  const kavishaTimelineIcon1Ref = useRef<HTMLDivElement | null>(null);
  const kavishaTimelineExperienceRef = useRef<HTMLDivElement | null>(null);
  const kavishaTimelineIcon2Ref = useRef<HTMLDivElement | null>(null);
  const kavishaTimelineQualificationsRef = useRef<HTMLDivElement | null>(null);
  const kavishaTimelineIcon3Ref = useRef<HTMLDivElement | null>(null);
  const kavishaTimelineCoursesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    // Disable animations on mobile devices
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Animate sections based on active tab
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

    // Small delay to ensure DOM is ready after tab switch
    const timer = setTimeout(() => {
      if (activeTab === "raunak") {
        animateSection(raunakHeroRef);
        animateSection(raunakExpertiseRef);
        animateSection(raunakTimelineRef);
        // Timeline parts
        animateSection(raunakTimelineIcon1Ref);
        animateSection(raunakTimelineTrainingRef);
        animateSection(raunakTimelineIcon2Ref);
        animateSection(raunakTimelineQualificationsRef);
        animateSection(raunakTimelineIcon3Ref);
        animateSection(raunakTimelineCareRef);
        animateSection(raunakGalleryRef);
      } else if (activeTab === "kavisha") {
        animateSection(kavishaHeroRef);
        animateSection(kavishaExpertiseRef);
        animateSection(kavishaTimelineRef);
        // Timeline parts
        animateSection(kavishaTimelineIcon1Ref);
        animateSection(kavishaTimelineExperienceRef);
        animateSection(kavishaTimelineIcon2Ref);
        animateSection(kavishaTimelineQualificationsRef);
        animateSection(kavishaTimelineIcon3Ref);
        animateSection(kavishaTimelineCoursesRef);
        animateSection(kavishaGalleryRef);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [activeTab]);
  // Dr. Raunak's expertise areas
  const raunakExpertise = [
    {
      title: t("drRaunak.rhinoplasty"),
      icon: { src: "/icons/rhinoplasty.svg" },
    },
    { title: t("drRaunak.skinSurgery"), icon: { src: "/icons/skin.svg" } },
    {
      title: t("drRaunak.liposuction"),
      icon: { src: "/icons/liposuction.svg" },
    },
    {
      title: t("drRaunak.hairTransplant"),
      icon: { src: "/icons/hairtransplant.svg" },
    },
    { title: t("drRaunak.otoplasty"), icon: { src: "/icons/otoplasty.svg" } },
    { title: t("drRaunak.tummyTuck"), icon: { src: "/icons/tummytuck.svg" } },
    { title: t("drRaunak.peels"), icon: { src: "/icons/peels.svg" } },
  ];

  // Dr. Kavisha's expertise areas
  const kavishaExpertise = [
    {
      title: t("drKavisha.gynecology"),
      icon: { src: "/icons/gynecology.svg" },
    },
    { title: t("drKavisha.prp"), icon: { src: "/icons/prp.svg" } },
    {
      title: t("drKavisha.infertilityCounselling"),
      icon: { src: "/icons/infertilitycounselling.svg" },
    },
  ];

  return (
    <div className="bg-[#f5f7f8] flex flex-col items-center pb-0 overflow-x-hidden overflow-y-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="w-full max-w-[1600px] px-3 mx-auto pb-3 md:pt-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-8">
            <TabsTrigger value="raunak" className="text-xl md:text-2xl">
              {t("drRaunak.name")}
            </TabsTrigger>
            <TabsTrigger value="kavisha" className="text-xl md:text-2xl">
              {t("drKavisha.name")}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Dr. Raunak Shinde Tab */}
        <TabsContent value="raunak" className="mt-0">
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-20 pb-16 w-full max-w-[1600px] px-3 mx-auto">
              {/* Hero Section */}
              <section
                ref={raunakHeroRef}
                className="bg-[#d5edfd] rounded-[18px] w-full p-4 sm:p-6 md:p-[48px] flex flex-col md:flex-row items-center gap-6 md:gap-[80px]"
              >
                <div className="relative w-full sm:w-[380px] h-[380px] sm:h-[500px] rounded-[22px] overflow-hidden flex-shrink-0">
                  <Image
                    src="/gallery/raunakAlt.JPG"
                    alt="Dr. Raunak Shinde"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-6 md:gap-[70px] text-[#0c1119] flex-1">
                  <div className="flex flex-col gap-4">
                    <h1 className="font-['Playfair_Display'] font-bold text-[40px] sm:text-[52px] md:text-[64px] leading-normal">
                      {t("drRaunak.name")}
                    </h1>
                    <p className="font-semibold text-[22px] sm:text-[26px] md:text-[30px] leading-normal">
                      {t("drRaunak.tagline")}
                    </p>
                  </div>
                  <div className="text-[20px] sm:text-[24px] leading-normal">
                    <p className="mb-3">{t("drRaunak.intro1")}</p>
                    <p>{t("drRaunak.intro2")}</p>
                  </div>
                </div>
              </section>

              {/* Expertise Section */}
              <section
                ref={raunakExpertiseRef}
                className="w-full flex flex-col gap-[60px] items-center"
              >
                <div className="flex flex-col gap-3 items-center text-center text-[#0c1119] max-w-[900px]">
                  <h2 className="font-['Playfair_Display'] text-[44px] leading-normal">
                    {t("drRaunak.expertiseTitle")}
                  </h2>
                  <p className="text-[24px] leading-normal">
                    {t("drRaunak.expertiseDescription")}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-[48px] w-full">
                  {raunakExpertise.map((area) => (
                    <div key={area.title}>
                      <ServiceCard
                        title={area.title}
                        icon={area.icon}
                        variant="centered"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Timeline Section - Full Width */}
            <section
              ref={raunakTimelineRef}
              className="
    relative left-1/2 right-1/2
    w-[100vw] -ml-[50vw] -mr-[50vw]
    /* your existing classes below */
    bg-gradient-to-b from-[#f5f7f8] to-[rgba(0,116,183,0.6)]
    flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[50px] py-12 md:py-[80px] px-4
  "
            >
              <div className="flex flex-col items-center justify-between h-auto md:h-[820px] w-full md:w-[320px] gap-8 md:gap-0">
                <div
                  ref={raunakTimelineIcon1Ref}
                  className="bg-[#f6de84] rounded-full w-[200px] h-[200px] flex items-center justify-center"
                >
                  <div className="relative w-[130px] h-[130px]">
                    <Image
                      src="/icons/hat.svg"
                      alt="Education"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  ref={raunakTimelineTrainingRef}
                  className="flex flex-col gap-4 items-center text-center text-[#0c1119]"
                >
                  <h3 className="font-['Playfair_Display'] text-[36px] leading-normal">
                    {t("drRaunak.trainingTitle")}
                  </h3>
                  <div className="font-semibold text-[20px] leading-normal">
                    <p className="mb-0">{t("drRaunak.training1")}</p>
                    <p className="mb-0">{t("drRaunak.training2")}</p>
                    <p>{t("drRaunak.training3")}</p>
                  </div>
                </div>

                <div
                  ref={raunakTimelineIcon2Ref}
                  className="bg-[#f6de84] rounded-full w-[200px] h-[200px] flex items-center justify-center"
                >
                  <div className="relative w-[130px] h-[130px]">
                    <Image
                      src="/icons/hands.svg"
                      alt="Care"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden md:block h-[600px] w-[2px] bg-[#0c1119] opacity-20"></div>

              <div className="flex flex-col items-center justify-between h-auto md:h-[720px] w-full md:w-[400px] gap-8 md:gap-0">
                <div
                  ref={raunakTimelineQualificationsRef}
                  className="flex flex-col gap-4 items-center text-center text-[#0c1119]"
                >
                  <h3 className="font-['Playfair_Display'] text-[36px] leading-normal">
                    {t("drRaunak.qualificationsTitle")}
                  </h3>
                  <ul className="font-semibold text-[20px] leading-normal list-disc list-inside text-left space-y-2">
                    <li>{t("drRaunak.qualification1")}</li>
                    <li>{t("drRaunak.qualification2")}</li>
                    <li>{t("drRaunak.qualification3")}</li>
                    <li>{t("drRaunak.qualification4")}</li>
                  </ul>
                </div>

                <div
                  ref={raunakTimelineIcon3Ref}
                  className="bg-[#f6de84] rounded-full w-[200px] h-[200px] flex items-center justify-center"
                >
                  <div className="relative w-[130px] h-[130px]">
                    <Image
                      src="/icons/suitcase.svg"
                      alt="Experience"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  ref={raunakTimelineCareRef}
                  className="flex flex-col gap-4 items-center text-center text-[#0c1119]"
                >
                  <h3 className="font-['Playfair_Display'] text-[36px] leading-normal">
                    {t("drRaunak.personalizedCareTitle")}
                  </h3>
                  <p className="font-semibold text-[20px] leading-normal">
                    {t("drRaunak.personalizedCareDescription")}
                  </p>
                </div>
              </div>
            </section>

            {/* Member Associations Section */}
            <section className="w-full max-w-[1600px] px-3 mx-auto py-16">
              <div className="flex flex-col gap-8 items-center">
                <h2 className="font-['Playfair_Display'] text-[36px] md:text-[44px] leading-normal text-center text-[#0c1119]">
                  {t("drRaunak.associationsTitle")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {[
                    t("drRaunak.association1"),
                    t("drRaunak.association2"),
                    t("drRaunak.association3"),
                    t("drRaunak.association4"),
                    t("drRaunak.association5"),
                    t("drRaunak.association6"),
                  ].map((association, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-[12px] p-4 shadow-sm border border-[#e0e0e0] flex items-center gap-3"
                    >
                      <div className="w-3 h-3 bg-[#0074b7] rounded-full flex-shrink-0"></div>
                      <p className="text-[16px] md:text-[18px] text-[#0c1119]">{association}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Paper Presentations & Awards Section */}
            <section className="w-full bg-[#d5edfd] py-16">
              <div className="max-w-[1600px] px-3 mx-auto">
                <div className="flex flex-col gap-8 items-center">
                  <h2 className="font-['Playfair_Display'] text-[36px] md:text-[44px] leading-normal text-center text-[#0c1119]">
                    Paper Presentations & Awards
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#f6de84] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">🏆</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">Best Paper Presentation Award</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">14th Annual Conference – NZAPSCON, Kasauli, Himachal Pradesh, India (2018)</p>
                    </div>
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#f6de84] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">🏆</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">Best Paper Award – IPGMER</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">59th Foundation Day Program, Jan 2015 – IPGMER, Kolkata, WB, India</p>
                    </div>
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#0074b7] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">📄</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">Invited Guest Faculty Lecture</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">Scar Revision - Tips and Tricks – MP-CUTICON, 2023</p>
                    </div>
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#0074b7] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">📄</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">Invited Paper – AESURGE 2023</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">Follicular Unit Extraction (FUE) – The Answer to Advanced Grade Male Pattern Baldness, Amby Valley, Lonavla, Maharashtra</p>
                    </div>
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#0074b7] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">📄</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">ISPNS Conference Paper</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">&quot;Impact of High Resolution Ultrasound in Fracture-Associated Radial Nerve Palsy&quot; – 7th Annual Conference of Indian Society of Peripheral Nerve Surgery, New Delhi (2018)</p>
                    </div>
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#0074b7] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">📄</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">Breast Reconstruction Research</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">&quot;Psychosocial and Surgical outcome of immediate breast reconstruction following mastectomy in Breast Cancer patients&quot; – IPGMER Case Series</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Conferences Attended Section */}
            <section className="w-full max-w-[1600px] px-3 mx-auto py-16">
              <div className="flex flex-col gap-8 items-center">
                <h2 className="font-['Playfair_Display'] text-[36px] md:text-[44px] leading-normal text-center text-[#0c1119]">
                  Conferences Attended
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {[
                    { name: "AESURG 2023", location: "Amby Valley, India", year: "March 2023" },
                    { name: "MP-CUTICON 2023", location: "Ujjain, India (Invited Faculty)", year: "November 2023" },
                    { name: "HAIRCON 2023", location: "Indore, India", year: "February 2023" },
                    { name: "AESURG 2022", location: "Goa, India", year: "March 2022" },
                    { name: "The Big Masterclass", location: "Lonavla, Maharashtra", year: "March 2020" },
                    { name: "NZAPSCON 2018", location: "Kasauli, HP", year: "2018" },
                    { name: "ISPNS 2018", location: "New Delhi", year: "2018" },
                    { name: "ISPNS 2017", location: "Chandigarh", year: "2017" },
                    { name: "INDOCLEFTCON 2016", location: "Chandigarh", year: "2016" },
                    { name: "ASICON 2014", location: "Hyderabad", year: "December 2014" },
                    { name: "ABSICON 2014", location: "Kolkata, WB", year: "June 2014" },
                    { name: "ASICON 2013", location: "Ahmedabad", year: "December 2013" },
                  ].map((conf, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-[12px] p-4 shadow-sm border border-[#e0e0e0]"
                    >
                      <h4 className="font-semibold text-[16px] text-[#0074b7]">{conf.name}</h4>
                      <p className="text-[14px] text-[#0c1119]">{conf.location}</p>
                      <p className="text-[12px] text-[#666]">{conf.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Publications Section */}
            <section className="w-full bg-[#f0f4f8] py-16">
              <div className="max-w-[1600px] px-3 mx-auto">
                <div className="flex flex-col gap-8 items-center">
                  <h2 className="font-['Playfair_Display'] text-[36px] md:text-[44px] leading-normal text-center text-[#0c1119]">
                    Publications
                  </h2>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="bg-white rounded-[12px] p-5 shadow-sm border-l-4 border-[#0074b7]">
                      <p className="text-[16px] text-[#0c1119]">&quot;Free Flap Skin Paddle: A Painless Donor Site In Vivo&quot; – <span className="font-semibold">Indian Journal of Plastic Surgery, 52(02), 256-257</span> (2019)</p>
                    </div>
                    <div className="bg-white rounded-[12px] p-5 shadow-sm border-l-4 border-[#0074b7]">
                      <p className="text-[16px] text-[#0c1119]">&quot;Inflammatory Myofibroblastic Tumor Arising in the Pancreatic Head: a Rare Case Report&quot; – <span className="font-semibold">Indian Journal of Surgery</span> (2015)</p>
                    </div>
                    <div className="bg-white rounded-[12px] p-5 shadow-sm border-l-4 border-[#0074b7]">
                      <p className="text-[16px] text-[#0c1119]">&quot;Spontaneous cholecystocutaneous fistula: Still a complication of gallstones&quot; – <span className="font-semibold">International Journal of Research in Medical Sciences</span> (2014)</p>
                    </div>
                    <div className="bg-white rounded-[12px] p-5 shadow-sm border-l-4 border-[#0074b7]">
                      <p className="text-[16px] text-[#0c1119]">&quot;Iatrogenic jejunal perforation while FJ tube re-insertion: a rare complication&quot; – <span className="font-semibold">International Journal of Scientific Reports</span> (2015)</p>
                    </div>
                    <div className="bg-white rounded-[12px] p-5 shadow-sm border-l-4 border-[#0074b7]">
                      <p className="text-[16px] text-[#0c1119]">&quot;A comparative study for management of anemia in elective surgery patients with combination of IV Iron and Erythropoietin Alpha vs Hemotransfusion&quot; – <span className="font-semibold">International Journal of Medical Science and Clinical Invention</span> (2014)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Section - Full Width */}
            <section
              ref={raunakGalleryRef}
              className="
    relative left-1/2 right-1/2
    w-[100vw] -ml-[50vw] -mr-[50vw]
    /* your existing classes below */
    bg-gradient-to-b from-[#f5f7f8] to-[rgba(0,116,183,0.6)]
    flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[50px] py-12 md:py-[80px] px-4
  "
            >
              <div className="relative">
                <div className="absolute bg-[#f6de84] w-[80px] md:w-[100px] h-[100px] md:h-[130px] rounded-[18px] top-0 left-0 z-0"></div>
                <div className="absolute bg-[#f6de84] w-[70px] md:w-[90px] h-[80px] md:h-[100px] rounded-[18px] bottom-0 right-0 z-0"></div>
                <div className="relative w-[280px] sm:w-[380px] h-[210px] sm:h-[285px] rounded-[18px] overflow-hidden ml-[20px] mt-[18px] z-10">
                  <Image
                    src="/gallery/raunak1.png"
                    alt="Dr. Raunak Shinde at conference"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute bg-[#f6de84] w-[70px] md:w-[90px] h-[80px] md:h-[100px] rounded-[18px] top-0 right-0 z-0"></div>
                <div className="absolute bg-[#f6de84] w-[70px] md:w-[90px] h-[80px] md:h-[100px] rounded-[18px] bottom-0 left-0 z-0"></div>
                <div className="relative w-[200px] sm:w-[260px] h-[210px] sm:h-[285px] rounded-[18px] overflow-hidden ml-[18px] mt-[16px] z-10">
                  <Image
                    src="/gallery/raunak2.png"
                    alt="Dr. Raunak Shinde presenting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </TabsContent>

        {/* Dr. Kavisha Lambhate Tab */}
        <TabsContent value="kavisha" className="mt-0">
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-20 pb-16 w-full max-w-[1600px] px-3 mx-auto">
              {/* Hero Section */}
              <section
                ref={kavishaHeroRef}
                className="bg-[#d5edfd] rounded-[18px] w-full p-4 sm:p-6 md:p-[48px] flex flex-col md:flex-row items-center gap-6 md:gap-[80px]"
              >
                <div className="relative w-full sm:w-[380px] h-[380px] sm:h-[500px] rounded-[22px] overflow-hidden flex-shrink-0">
                  <Image
                    src="/gallery/kavishaAlt.JPG"
                    alt="Dr. Kavisha Lambhate"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-6 md:gap-[70px] text-[#0c1119] flex-1">
                  <div className="flex flex-col gap-4">
                    <h1 className="font-['Playfair_Display'] font-bold text-[40px] sm:text-[52px] md:text-[64px] leading-normal">
                      {t("drKavisha.name")}
                    </h1>
                    <p className="font-semibold text-[22px] sm:text-[26px] md:text-[30px] leading-normal">
                      {t("drKavisha.tagline")}
                    </p>
                  </div>
                  <div className="text-[20px] sm:text-[24px] leading-normal">
                    <p>{t("drKavisha.intro")}</p>
                  </div>
                </div>
              </section>

              {/* Expertise Section */}
              <section
                ref={kavishaExpertiseRef}
                className="w-full flex flex-col gap-[60px] items-center"
              >
                <div className="flex flex-col gap-3 items-center text-center text-[#0c1119] max-w-[900px]">
                  <h2 className="font-['Playfair_Display'] text-[44px] leading-normal">
                    {t("drKavisha.expertiseTitle")}
                  </h2>
                  <p className="text-[24px] leading-normal">
                    {t("drKavisha.expertiseDescription")}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[48px] w-full">
                  {kavishaExpertise.map((area) => (
                    <div key={area.title}>
                      <ServiceCard
                        title={area.title}
                        icon={area.icon}
                        variant="centered"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Timeline Section - Full Width */}
            <section
              ref={kavishaTimelineRef}
              className="
    relative left-1/2 right-1/2
    w-[100vw] -ml-[50vw] -mr-[50vw]
    /* your existing classes below */
    bg-gradient-to-b from-[#f5f7f8] to-[rgba(0,116,183,0.6)]
    flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[50px] py-12 md:py-[80px] px-4
  "
            >
              <div className="flex flex-col items-center justify-between h-auto md:h-[900px] w-full md:w-[320px] gap-8 md:gap-0">
                <div
                  ref={kavishaTimelineIcon1Ref}
                  className="bg-[#f6de84] rounded-full w-[200px] h-[200px] flex items-center justify-center"
                >
                  <div className="relative w-[130px] h-[130px]">
                    <Image
                      src="/icons/hat.svg"
                      alt="Education"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  ref={kavishaTimelineExperienceRef}
                  className="flex flex-col gap-4 items-center text-center text-[#0c1119]"
                >
                  <h3 className="font-['Playfair_Display'] text-[28px] leading-normal">
                    {t("drKavisha.experienceTitle")}
                  </h3>
                  <ul className="font-semibold text-[16px] leading-normal list-disc list-inside text-left space-y-1.5">
                    <li>{t("drKavisha.experience1")}</li>
                    <li>{t("drKavisha.experience2")}</li>
                    <li>{t("drKavisha.experience3")}</li>
                    <li>{t("drKavisha.experience4")}</li>
                  </ul>
                </div>

                <div
                  ref={kavishaTimelineIcon2Ref}
                  className="bg-[#f6de84] rounded-full w-[200px] h-[200px] flex items-center justify-center"
                >
                  <div className="relative w-[130px] h-[130px]">
                    <Image
                      src="/icons/hands.svg"
                      alt="Care"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden md:block h-[700px] w-[2px] bg-[#0c1119] opacity-20"></div>

              <div className="flex flex-col items-center justify-between h-auto md:h-[900px] w-full md:w-[400px] gap-8 md:gap-0">
                <div
                  ref={kavishaTimelineQualificationsRef}
                  className="flex flex-col gap-4 items-center text-center text-[#0c1119]"
                >
                  <h3 className="font-['Playfair_Display'] text-[28px] leading-normal">
                    {t("drKavisha.qualificationsTitle")}
                  </h3>
                  <ul className="font-semibold text-[16px] leading-normal list-disc list-inside text-left space-y-1.5">
                    <li>{t("drKavisha.qualification1")}</li>
                    <li>{t("drKavisha.qualification2")}</li>
                    <li>{t("drKavisha.qualification3")}</li>
                    <li>{t("drKavisha.qualification4")}</li>
                  </ul>
                </div>

                <div
                  ref={kavishaTimelineIcon3Ref}
                  className="bg-[#f6de84] rounded-full w-[200px] h-[200px] flex items-center justify-center"
                >
                  <div className="relative w-[130px] h-[130px]">
                    <Image
                      src="/icons/suitcase.svg"
                      alt="Experience"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div
                  ref={kavishaTimelineCoursesRef}
                  className="flex flex-col gap-4 items-center text-center text-[#0c1119]"
                >
                  <h3 className="font-['Playfair_Display'] text-[28px] leading-normal">
                    {t("drKavisha.coursesTitle")}
                  </h3>
                  <ul className="font-semibold text-[16px] leading-normal list-disc list-inside text-left space-y-1.5">
                    <li>{t("drKavisha.course1")}</li>
                    <li>{t("drKavisha.course2")}</li>
                    <li>{t("drKavisha.course3")}</li>
                    <li>{t("drKavisha.course4")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Member Associations Section */}
            <section className="w-full max-w-[1600px] px-3 mx-auto py-16">
              <div className="flex flex-col gap-8 items-center">
                <h2 className="font-['Playfair_Display'] text-[36px] md:text-[44px] leading-normal text-center text-[#0c1119]">
                  Professional Affiliations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {[
                    "Association of Plastic Surgeons of India (APSI)",
                    "Indian Association of Aesthetic Plastic Surgeons (IAAPS)",
                    "The Association of Surgeons of India (ASI)",
                    "Indian Medical Association (IMA)",
                    "Indian Society for Surgery of the Hand (ISSH)",
                    "Association of Plastic Surgeons of MP & Chattisgarh (APMPCG)",
                  ].map((association, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-[12px] p-4 shadow-sm border border-[#e0e0e0] flex items-center gap-3"
                    >
                      <div className="w-3 h-3 bg-[#0074b7] rounded-full flex-shrink-0"></div>
                      <p className="text-[16px] md:text-[18px] text-[#0c1119]">{association}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Conferences & Presentations Section */}
            <section className="w-full bg-[#d5edfd] py-16">
              <div className="max-w-[1600px] px-3 mx-auto">
                <div className="flex flex-col gap-8 items-center">
                  <h2 className="font-['Playfair_Display'] text-[36px] md:text-[44px] leading-normal text-center text-[#0c1119]">
                    Conferences & Presentations
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#0074b7] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">📄</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">E-Poster Presentation – Fertivision 2020</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">Role of Lymphocyte Immunization Therapy in RIF/RPL – Fertivision, December 2020</p>
                    </div>
                    <div className="bg-white rounded-[18px] p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#f6de84] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">📚</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">IMSCON, Indore</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">Attended IMSCON Conference, Indore, February 2015</p>
                    </div>
                    <div className="bg-white rounded-[18px] p-6 shadow-sm lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#0074b7] rounded-full w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
                          <span className="text-[24px]">🔬</span>
                        </div>
                        <h3 className="font-semibold text-[20px] text-[#0c1119]">Research Dissertation</h3>
                      </div>
                      <p className="text-[16px] text-[#0c1119]">Comparison of clinical outcomes of &apos;single blastocyst&apos; vs &apos;double blastocyst&apos; transfer in ART – Fellowship Dissertation at Amity University & Indian Fertility Society</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Section - Full Width */}
            <section
              ref={kavishaGalleryRef}
              className="
    relative left-1/2 right-1/2
    w-[100vw] -ml-[50vw] -mr-[50vw]
    /* your existing classes below */
    bg-gradient-to-b from-[#f5f7f8] to-[rgba(0,116,183,0.6)]
    flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[50px] py-12 md:py-[80px] px-4
  "
            >
              <div className="relative">
                <div className="absolute bg-[#f6de84] w-[60px] md:w-[70px] h-[90px] md:h-[115px] rounded-[18px] top-6 right-0 z-0"></div>
                <div className="absolute bg-[#f6de84] w-[100px] md:w-[140px] h-[140px] md:h-[180px] rounded-[18px] bottom-0 left-0 z-0"></div>
                <div className="relative w-[180px] sm:w-[225px] h-[240px] sm:h-[300px] rounded-[18px] overflow-hidden ml-[18px] mt-0 z-10">
                  <Image
                    src="/gallery/kavisha1.png"
                    alt="Dr. Kavisha Lambhate with patients"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute bg-[#f6de84] w-[100px] md:w-[140px] h-[50px] md:h-[60px] rounded-[18px] top-0 left-[13px] z-0"></div>
                <div className="absolute bg-[#f6de84] w-[60px] md:w-[70px] h-[90px] md:h-[115px] rounded-[18px] bottom-0 right-0 z-0"></div>
                <div className="relative w-[150px] sm:w-[187px] h-[245px] sm:h-[305px] rounded-[18px] overflow-hidden ml-0 mt-[14px] z-10">
                  <Image
                    src="/gallery/kavisha2.png"
                    alt="Dr. Kavisha Lambhate at work"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute bg-[#f6de84] w-[100px] md:w-[140px] h-[90px] md:h-[115px] rounded-[18px] top-0 right-0 z-0"></div>
                <div className="absolute bg-[#f6de84] w-[60px] md:w-[70px] h-[90px] md:h-[115px] rounded-[18px] bottom-0 left-0 z-0"></div>
                <div className="relative w-[185px] sm:w-[231px] h-[246px] sm:h-[308px] rounded-[18px] overflow-hidden ml-[18px] mt-[11px] z-10">
                  <Image
                    src="/gallery/kavisha3.png"
                    alt="Dr. Kavisha Lambhate with patient"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
