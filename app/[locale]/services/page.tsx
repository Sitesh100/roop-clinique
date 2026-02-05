"use client";

import { ServiceCardIcon } from "../../../components/ServiceCard";
import AnimatedServiceCard from "../../../components/AnimatedServiceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// Map of service titles to their route slugs
// Keys must match exactly the translated titles from messages/en.json and hi.json
const serviceRoutes: Record<string, string | null> = {
  // Aesthetic Treatments (English)
  "Skin": "miscellaneous",
  "Hair Loss": "hair-transplant",
  "Face": "facial-rejuvenation",
  "Weight loss": null,
  "Male Breast": "breast-augmentation",
  "Abdomen": "abdominoplasty",
  "Infertility Counselling": null, // Special link handled separately
  
  // Non-Surgical (English)
  "Gynecology": "cosmetic-gynecology",
  "Cosmetology": "miscellaneous",
  "Microneedling": "miscellaneous",
  "PRP": "miscellaneous",
  "Peels": "miscellaneous",
  "Botox for Wrinkles": "miscellaneous",
  "Threads for Facelift": "miscellaneous",
  "Face Rejuvenation": "facial-rejuvenation",
  
  // Surgical (English)
  "Liposuction": "liposuction",
  "Fat Grafting": "liposuction",
  "Tummy Tuck": "abdominoplasty",
  "Gynecomastia": "breast-augmentation",
  "Rhinoplasty": "rhinoplasty",
  "Otoplasty": "otoplasty",
  "Hair Transplant": "hair-transplant",
  
  // Laser Treatments (English)
  "MNRF Celina": "mnrf-celina",
  "Tattoo removal": "miscellaneous",
  "Laser hair reduction": "laser-hair-reduction",
  "HIFU": null,
  "Hydrafacial": "miscellaneous",
  
  // Hindi translations mapping (must match hi.json exactly)
  "त्वचा": "miscellaneous",
  "बालों का झड़ना": "hair-transplant",
  "चेहरा": "facial-rejuvenation",
  "वजन घटाना": null,
  "पुरुष स्तन": "breast-augmentation",
  "पेट": "abdominoplasty",
  "बांझपन परामर्श": null, // Special link handled separately
  
  "स्त्री रोग विज्ञान": "cosmetic-gynecology",
  "कॉस्मेटोलॉजी": "miscellaneous",
  "माइक्रोनीडलिंग": "miscellaneous",
  "पील्स": "miscellaneous",
  "झुर्रियों के लिए बोटॉक्स": "miscellaneous",
  "फेसलिफ्ट के लिए थ्रेड्स": "miscellaneous",
  "चेहरे का कायाकल्प": "facial-rejuvenation",
  
  "लिपोसक्शन": "liposuction",
  "फैट ग्राफ्टिंग": "liposuction",
  "टमी टक": "abdominoplasty",
  "गाइनेकोमास्टिया": "breast-augmentation",
  "राइनोप्लास्टी": "rhinoplasty",
  "ओटोप्लास्टी": "otoplasty",
  "हेयर ट्रांसप्लांट": "hair-transplant",
  
  "MNRF सेलिना": "mnrf-celina",
  "टैटू हटाना": "miscellaneous",
  "लेजर हेयर रिडक्शन": "laser-hair-reduction",
  "हाइड्राफेशियल": "miscellaneous",
};

export default function Services() {
  const t = useTranslations("ServicesPage");
  const params = useParams();
  const locale = params.locale as string;
  
  const bannerRef = useRef<HTMLDivElement>(null);
  const aestheticRef = useRef<HTMLDivElement>(null);
  const aestheticRowRef = useRef<HTMLDivElement>(null);
  const nonSurgicalRef = useRef<HTMLDivElement>(null);
  const nonSurgicalRowRef = useRef<HTMLDivElement>(null);
  const surgicalRef = useRef<HTMLDivElement>(null);
  const surgicalRowRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const laserRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable animations on mobile devices
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Banner animation - slide up and fade in
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

    // Aesthetic section header - slide up and fade in
    if (aestheticRef.current) {
      gsap.fromTo(
        aestheticRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aestheticRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Aesthetic carousel row - slide in from right and fade in
    if (aestheticRowRef.current) {
      gsap.fromTo(
        aestheticRowRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aestheticRowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Non-Surgical section header - slide up and fade in
    if (nonSurgicalRef.current) {
      gsap.fromTo(
        nonSurgicalRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: nonSurgicalRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Non-Surgical carousel row - slide in from right and fade in
    if (nonSurgicalRowRef.current) {
      gsap.fromTo(
        nonSurgicalRowRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: nonSurgicalRowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Surgical section header - slide up and fade in
    if (surgicalRef.current) {
      gsap.fromTo(
        surgicalRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: surgicalRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Surgical carousel row - slide in from right and fade in
    if (surgicalRowRef.current) {
      gsap.fromTo(
        surgicalRowRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: surgicalRowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Laser section header - slide up and fade in
    if (laserRef.current) {
      gsap.fromTo(
        laserRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: laserRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Laser carousel row - slide in from right and fade in
    if (laserRowRef.current) {
      gsap.fromTo(
        laserRowRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: laserRowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  
  // All services organized by category with descriptions
  const aestheticServices: {
    title: string;
    icon: ServiceCardIcon;
    description: string;
  }[] = [
    {
      title: t("aestheticTreatments.skin.title"),
      icon: {
        src: "/icons/skin.svg",
        alt: t("aestheticTreatments.skin.title"),
      },
      description: t("aestheticTreatments.skin.description"),
    },
    {
      title: t("aestheticTreatments.hairLoss.title"),
      icon: {
        src: "/icons/hairloss.svg",
        alt: t("aestheticTreatments.hairLoss.title"),
      },
      description: t("aestheticTreatments.hairLoss.description"),
    },
    {
      title: t("aestheticTreatments.face.title"),
      icon: {
        src: "/icons/face.svg",
        alt: t("aestheticTreatments.face.title"),
      },
      description: t("aestheticTreatments.face.description"),
    },
    {
      title: t("aestheticTreatments.weightLoss.title"),
      icon: {
        src: "/icons/weightloss.svg",
        alt: t("aestheticTreatments.weightLoss.title"),
      },
      description: t("aestheticTreatments.weightLoss.description"),
    },
    {
      title: t("aestheticTreatments.maleBreast.title"),
      icon: {
        src: "/icons/gynecomastia.svg",
        alt: t("aestheticTreatments.maleBreast.title"),
      },
      description: t("aestheticTreatments.maleBreast.description"),
    },
    {
      title: t("aestheticTreatments.abdomen.title"),
      icon: {
        src: "/icons/tummytuck.svg",
        alt: t("aestheticTreatments.abdomen.title"),
      },
      description: t("aestheticTreatments.abdomen.description"),
    },
    {
      title: t("aestheticTreatments.infertilityCounselling.title"),
      icon: {
        src: "/icons/infertilitycounselling.svg",
        alt: t("aestheticTreatments.infertilityCounselling.title"),
      },
      description: t("aestheticTreatments.infertilityCounselling.description"),
    },
  ];

  const nonSurgicalServices: {
    title: string;
    icon: ServiceCardIcon;
    description: string;
  }[] = [
    {
      title: t("nonSurgical.gynecology.title"),
      icon: {
        src: "/icons/gynecology.svg",
        alt: t("nonSurgical.gynecology.title"),
      },
      description: t("nonSurgical.gynecology.description"),
    },
    {
      title: t("nonSurgical.cosmetology.title"),
      icon: {
        src: "/icons/cosmetology.svg",
        alt: t("nonSurgical.cosmetology.title"),
      },
      description: t("nonSurgical.cosmetology.description"),
    },
    {
      title: t("nonSurgical.microneedling.title"),
      icon: {
        src: "/icons/microneedling.svg",
        alt: t("nonSurgical.microneedling.title"),
      },
      description: t("nonSurgical.microneedling.description"),
    },
    {
      title: t("nonSurgical.prp.title"),
      icon: { src: "/icons/prp.svg", alt: t("nonSurgical.prp.title") },
      description: t("nonSurgical.prp.description"),
    },
    {
      title: t("nonSurgical.peels.title"),
      icon: { src: "/icons/peels.svg", alt: t("nonSurgical.peels.title") },
      description: t("nonSurgical.peels.description"),
    },
    {
      title: t("nonSurgical.botox.title"),
      icon: { src: "/icons/face.svg", alt: t("nonSurgical.botox.title") },
      description: t("nonSurgical.botox.description"),
    },
    {
      title: t("nonSurgical.threads.title"),
      icon: { src: "/icons/face.svg", alt: t("nonSurgical.threads.title") },
      description: t("nonSurgical.threads.description"),
    },
    {
      title: t("nonSurgical.faceRejuvenation.title"),
      icon: {
        src: "/icons/face.svg",
        alt: t("nonSurgical.faceRejuvenation.title"),
      },
      description: t("nonSurgical.faceRejuvenation.description"),
    },
  ];

  const surgicalServices: {
    title: string;
    icon: ServiceCardIcon;
    description: string;
  }[] = [
    {
      title: t("surgical.liposuction.title"),
      icon: {
        src: "/icons/liposuction.svg",
        alt: t("surgical.liposuction.title"),
      },
      description: t("surgical.liposuction.description"),
    },
    {
      title: t("surgical.fatGrafting.title"),
      icon: {
        src: "/icons/fatgrafting.svg",
        alt: t("surgical.fatGrafting.title"),
      },
      description: t("surgical.fatGrafting.description"),
    },
    {
      title: t("surgical.tummyTuck.title"),
      icon: {
        src: "/icons/tummytuck.svg",
        alt: t("surgical.tummyTuck.title"),
      },
      description: t("surgical.tummyTuck.description"),
    },
    {
      title: t("surgical.gynecomastia.title"),
      icon: {
        src: "/icons/gynecomastia.svg",
        alt: t("surgical.gynecomastia.title"),
      },
      description: t("surgical.gynecomastia.description"),
    },
    {
      title: t("surgical.rhinoplasty.title"),
      icon: {
        src: "/icons/rhinoplasty.svg",
        alt: t("surgical.rhinoplasty.title"),
      },
      description: t("surgical.rhinoplasty.description"),
    },
    {
      title: t("surgical.otoplasty.title"),
      icon: {
        src: "/icons/otoplasty.svg",
        alt: t("surgical.otoplasty.title"),
      },
      description: t("surgical.otoplasty.description"),
    },
    {
      title: t("surgical.hairTransplant.title"),
      icon: {
        src: "/icons/hairtransplant.svg",
        alt: t("surgical.hairTransplant.title"),
      },
      description: t("surgical.hairTransplant.description"),
    },
  ];

  const laserServices: {
    title: string;
    icon: ServiceCardIcon;
    description: string;
  }[] = [
    {
      title: t("laserTreatments.mnrfCelina.title"),
      icon: {
        src: "/icons/mnrfcelina.svg",
        alt: t("laserTreatments.mnrfCelina.title"),
      },
      description: t("laserTreatments.mnrfCelina.description"),
    },
    {
      title: t("laserTreatments.tattooRemoval.title"),
      icon: {
        src: "/icons/tattooremoval.svg",
        alt: t("laserTreatments.tattooRemoval.title"),
      },
      description: t("laserTreatments.tattooRemoval.description"),
    },
    {
      title: t("laserTreatments.laserHairReduction.title"),
      icon: {
        src: "/icons/laserhairreduction.svg",
        alt: t("laserTreatments.laserHairReduction.title"),
      },
      description: t("laserTreatments.laserHairReduction.description"),
    },
    {
      title: t("laserTreatments.hifu.title"),
      icon: {
        src: "/icons/hifu.svg",
        alt: t("laserTreatments.hifu.title"),
      },
      description: t("laserTreatments.hifu.description"),
    },
    {
      title: t("laserTreatments.hydrafacial.title"),
      icon: {
        src: "/icons/face.svg",
        alt: t("laserTreatments.hydrafacial.title"),
      },
      description: t("laserTreatments.hydrafacial.description"),
    },
  ];

  const ScrollableRow = ({
    services,
    rowRef,
  }: {
    services: {
      title: string;
      icon: ServiceCardIcon;
      description: string;
    }[];
    rowRef?: React.RefObject<HTMLDivElement | null>;
  }) => {
    return (
      <div ref={rowRef} className="relative w-full">
        {/* The carousel stays fully visible so tall cards aren't cut */}
        <Carousel opts={{ align: "start", dragFree: true }}>
          <CarouselContent
            className="scrollbar-hide"
            style={{ overflow: "visible" }}
          >
            {services.map((service, index) => {
              const serviceRoute = serviceRoutes[service.title];
              const cardContent = (
                <div className="w-[232px]" style={{ overflow: "visible" }}>
                  <AnimatedServiceCard
                    title={service.title}
                    icon={service.icon}
                    description={service.description}
                  />
                </div>
              );

              return (
                <CarouselItem
                  key={service.title}
                  className={`basis-auto ${index === 0 ? "pl-0" : "pl-6"}`}
                  style={{ overflow: "visible" }}
                >
                  {serviceRoute ? (
                    <Link href={`/${locale}/services/${serviceRoute}`}>
                      {cardContent}
                    </Link>
                  ) : (
                    cardContent
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-20 pb-16 relative overflow-x-hidden">
      {/* White overlay on right side extending to viewport right */}
      <div
        className="absolute top-0 h-full pointer-events-none bg-[#F5F7F8]"
        style={{
          left: "100%",
          width: "100vw",
          zIndex: 10,
        }}
      />
      {/* Banner with gradient overlay */}
      <section ref={bannerRef} className="rounded-2xl overflow-hidden relative">
        <div className="relative h-[200px] md:h-[250px] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/banners/servicesBanner.png')" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(44, 62, 90, 0.95), rgba(0, 116, 183, 0.85), rgba(212, 243, 249, 0.7))",
            }}
          />
          <div className="absolute inset-0 p-6 md:p-10 flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-[38px] md:text-[48px] font-bold text-white">
                {t("banner.title")}
              </h1>
              <p className="text-white text-[18px] md:text-[22px]">
                {t("banner.description")}
              </p>
            </div>
            <button className="bg-[#F6DE84] text-[#0C1119] rounded-xl h-11 px-6 text-[16px] font-bold hidden md:block">
              {t("banner.bookButton")}
            </button>
          </div>
        </div>
      </section>

      {/* Aesthetic Treatments */}
      <section
        className="flex flex-col gap-8"
        style={{
          overflow: "visible",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div ref={aestheticRef} className="flex items-center justify-between">
          <h2 className="text-[34px]">{t("aestheticTreatments.title")}</h2>
        </div>
        <ScrollableRow services={aestheticServices} rowRef={aestheticRowRef} />
      </section>

      {/* Non Surgical */}
      <section
        className="flex flex-col gap-8"
        style={{
          overflow: "visible",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div ref={nonSurgicalRef} className="flex items-center justify-between">
          <h2 className="text-[34px]">{t("nonSurgical.title")}</h2>
        </div>
        <ScrollableRow
          services={nonSurgicalServices}
          rowRef={nonSurgicalRowRef}
        />
      </section>

      {/* Surgical */}
      <section
        className="flex flex-col gap-8"
        style={{
          overflow: "visible",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div ref={surgicalRef} className="flex items-center justify-between">
          <h2 className="text-[34px]">{t("surgical.title")}</h2>
        </div>
        <ScrollableRow services={surgicalServices} rowRef={surgicalRowRef} />
      </section>

      {/* Laser Treatments */}
      <section
        className="flex flex-col gap-8"
        style={{
          overflow: "visible",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div ref={laserRef} className="flex items-center justify-between">
          <h2 className="text-[34px]">{t("laserTreatments.title")}</h2>
          <button className="text-[18px] hover:text-[#0074B7] transition-colors">
            {t("laserTreatments.viewAll")}
          </button>
        </div>
        <ScrollableRow services={laserServices} rowRef={laserRowRef} />
      </section>
    </div>
  );
}