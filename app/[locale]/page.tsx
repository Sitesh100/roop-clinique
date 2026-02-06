"use client";
import { useTranslations } from "next-intl";
import ServiceCard, { ServiceCardIcon } from "../../components/ServiceCard";
import Link from "next/link";
import { useEffect, useRef } from "react";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const t = useTranslations("HomePage");
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const redefiningRef = useRef<HTMLDivElement>(null);
  const specialistsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroImage1Ref = useRef<HTMLImageElement>(null);
  const heroImage2Ref = useRef<HTMLImageElement>(null);
  const heroImage3Ref = useRef<HTMLImageElement>(null);
  const [showSplash, setShowSplash] = React.useState(true);
  const [animationComplete, setAnimationComplete] = React.useState(false);

  useEffect(() => {
    // Opening splash animation - only on first visit
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    
    if (!hasVisited) {
      // Prevent scrolling during splash
      document.body.style.overflow = 'hidden';
      
      // Animate logo splash
      const timeline = gsap.timeline({
        onComplete: () => {
          setShowSplash(false);
          sessionStorage.setItem('hasVisitedHome', 'true');
          
          // After splash, fade in content
          setTimeout(() => {
            document.body.style.overflow = 'auto';
            if (contentRef.current) {
              gsap.fromTo(
                contentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: 'power2.out' }
              );
            }
            setAnimationComplete(true);
          }, 100);
        }
      });

      timeline
        .fromTo(
          '.splash-logo',
          { opacity: 0, scale: 1 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
        )
        .to('.splash-logo', { 
          opacity: 0, 
          duration: 0.4, 
          delay: 0.4,
          ease: 'power2.in' 
        });
    } else {
      setShowSplash(false);
      setAnimationComplete(true);
      document.body.style.overflow = 'auto';
    }
  }, []);

  useEffect(() => {
    // Scroll-triggered animations only after splash is done
    if (!animationComplete) return;

    // Disable animations on mobile devices
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Hero images animation - staggered from right
    const heroImages = [heroImage1Ref.current, heroImage2Ref.current, heroImage3Ref.current];
    heroImages.forEach((img, index) => {
      if (img) {
        gsap.fromTo(
          img,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3 + index * 0.15,
            ease: "power3.out",
          }
        );
      }
    });

    // Services section animation
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Redefining section animation
    if (redefiningRef.current) {
      gsap.fromTo(
        redefiningRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: redefiningRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Specialists section animation
    if (specialistsRef.current) {
      gsap.fromTo(
        specialistsRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: specialistsRef.current,
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
  }, [animationComplete]);

  const cards: {
    title: string;
    description?: string;
    icon: ServiceCardIcon;
  }[] = [
    {
      title: t("services.rhinoplasty.title"),
      description: t("services.rhinoplasty.description"),
      icon: { src: "/icons/rhinoplasty.svg", alt: "Rhinoplasty icon" },
    },
    {
      title: t("services.cosmetology.title"),
      description: t("services.cosmetology.description"),
      icon: { src: "/icons/cosmetology.svg", alt: "Cosmetology icon" },
    },
    {
      title: t("services.gynecology.title"),
      description: t("services.gynecology.description"),
      icon: { src: "/icons/gynecology.svg", alt: "Gynecology icon" },
    },
    {
      title: t("services.liposuction.title"),
      description: t("services.liposuction.description"),
      icon: { src: "/icons/liposuction.svg", alt: "Liposuction icon" },
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] bg-[#F5F7F8] flex items-center justify-center">
          <div className="splash-logo flex items-center gap-6 scale-[]">
            <Image 
                src="/logos/new_logo.png" 
                alt="Roop Clinic Logo" 
                width={580} 
                height={500}
                className="object-contain sm:w-[580px] sm:h-[500px]"
             />
           
          </div>
        </div>
      )}

      <div ref={contentRef} className="flex flex-col gap-20 pb-16" style={{ opacity: showSplash ? 0 : 1 }}>
        {/* Hero */}
        <section ref={heroRef} className="rounded-2xl overflow-hidden relative">
          <div className="relative h-[380px] sm:h-[440px] md:h-[520px] w-full">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/banners/landingBanner.png')" }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(44, 62, 90, 0.95), rgba(0, 116, 183, 0.85), rgba(212, 243, 249, 0.7))",
              }}
            />
            {/* Content container */}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-10 flex items-center justify-between">
              {/* Left content */}
              <div className="flex flex-col gap-3 sm:gap-5 max-w-[900px] z-10">
                <div>
                  <h1
                    className="text-[24px] sm:text-[32px] md:text-[48px] text-white text-center md:text-left leading-tight"
                    dangerouslySetInnerHTML={{
                      __html: t
                        .raw("hero.title")
                        .replace(
                          "<highlight>",
                          '<span class="text-[#F6DE84] font-bold">'
                        )
                        .replace("</highlight>", "</span>",),
                    }}
                  />
                  <p className="text-white/80 text-[20px] font-semibold sm:text-[24px] md:text-[32px] mt-2 text-center md:text-left">
                    {t("hero.subtitle")}
                  </p>
                </div>
                <p className="text-white/90 text-[14px] sm:text-[18px] md:text-[24px] max-w-[700px] text-center md:text-left ">
                  {t("hero.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Link href="/contact">
                    <button className="bg-[#F6DE84] text-[#0C1119] rounded-xl h-11 sm:h-14 px-4 sm:px-8 text-[16px] sm:text-[20px] font-semibold hover:cursor-pointer w-full sm:w-auto">
                      {t("hero.consultButton")}
                    </button>
                  </Link>
                  <Link href="/services">
                    <button className="border border-white text-white rounded-xl h-11 sm:h-14 px-4 sm:px-8 text-[16px] sm:text-[20px] font-semibold hover:cursor-pointer w-full sm:w-auto">
                      {t("hero.exploreButton")}
                    </button>
                  </Link>
                </div>
              </div>
              {/* Right hero images - Layered */}
              <div className="hidden md:block relative flex-shrink-0 w-[320px] h-[320px]">
                {/* Hero 1 - Top Right */}
                <img
                  ref={heroImage1Ref}
                  src="/gallery/hero1.svg"
                  alt="Clinic interior 1"
                  className="absolute top-0 right-0 w-[180px] h-auto object-contain z-[5] rounded-2xl"
                />
                {/* Hero 2 - Middle Left */}
                <img
                  ref={heroImage2Ref}
                  src="/gallery/hero2.svg"
                  alt="Clinic interior 2"
                  className="absolute top-[60px] left-0 w-[200px] h-auto object-contain z-[6] rounded-2xl"
                />
                {/* Hero 3 - Bottom Right */}
                <img
                  ref={heroImage3Ref}
                  src="/gallery/hero3.svg"
                  alt="Clinic interior 3"
                  className="absolute bottom-[-40px] right-[0px] w-[220px] h-auto object-contain z-[7] rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section ref={servicesRef} className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="text-center max-w-[800px] px-2">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px]">{t("services.title")}</h2>
            <p className="text-[16px] sm:text-[20px] md:text-[24px] text-[#0C1119]/80">
              {t("services.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-[60px] w-full">
            {cards.map((c) => (
              <ServiceCard
                key={c.title}
                title={c.title}
                description={c.description}
                icon={c.icon}
              />
            ))}
          </div>
          <Link href="/services">
            <button className="text-[18px] sm:text-[22px] hover:cursor-pointer">
              {t("services.viewAll")}
            </button>
          </Link>
        </section>

        {/* Head to Toe Services Section */}
        <section className="flex flex-col items-center gap-8 sm:gap-12">
          <div className="text-center max-w-[900px] px-2">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] mb-2 sm:mb-3">Complete Care from Head to Toe</h2>
            <p className="text-[16px] sm:text-[20px] md:text-[24px] text-[#0C1119]/80">
              Comprehensive aesthetic and cosmetic solutions for every part of your body
            </p>
          </div>

          {/* Surgical Procedures */}
          <div className="w-full">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-4 sm:mb-6 text-[#0074B7]">Surgical Procedures</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              <ServiceCard title="Rhinoplasty" description="Nose reshaping surgery" icon={{ src: "/icons/rhinoplasty.svg", alt: "Rhinoplasty" }} variant="centered" />
              <ServiceCard title="Otoplasty" description="Ear reshaping procedure" icon={{ src: "/icons/otoplasty.svg", alt: "Otoplasty" }} variant="centered" />
              <ServiceCard title="Liposuction" description="Fat removal surgery" icon={{ src: "/icons/liposuction.svg", alt: "Liposuction" }} variant="centered" />
              <ServiceCard title="Fat Grafting" description="Natural body contouring" icon={{ src: "/icons/fatgrafting.svg", alt: "Fat Grafting" }} variant="centered" />
              <ServiceCard title="Tummy Tuck" description="Abdominal contouring" icon={{ src: "/icons/tummytuck.svg", alt: "Tummy Tuck" }} variant="centered" />
              <ServiceCard title="Female Breast Reduction" description="Female breast reduction" icon={{ src: "/icons/gynecomastia.svg", alt: "Female Breast Reduction" }} variant="centered" />
              <ServiceCard title="Hair Transplant" description="Natural hair restoration" icon={{ src: "/icons/hairtransplant.svg", alt: "Hair Transplant" }} variant="centered" />
            </div>
          </div>

          {/* Non-Surgical Treatments */}
          <div className="w-full">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-4 sm:mb-6 text-[#0074B7]">Non-Surgical Treatments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              <ServiceCard title="Botox & Fillers" description="Injectable treatments" icon={{ src: "/icons/face.svg", alt: "Botox" }} variant="centered" />
              <ServiceCard title="Thread Lift" description="Non-surgical face lift" icon={{ src: "/icons/face.svg", alt: "Thread Lift" }} variant="centered" />
              <ServiceCard title="Face Rejuvenation" description="Comprehensive facial care" icon={{ src: "/icons/face.svg", alt: "Face Rejuvenation" }} variant="centered" />
              <ServiceCard title="Microneedling" description="Collagen induction therapy" icon={{ src: "/icons/microneedling.svg", alt: "Microneedling" }} variant="centered" />
              <ServiceCard title="PRP Therapy" description="Platelet-rich plasma" icon={{ src: "/icons/prp.svg", alt: "PRP" }} variant="centered" />
              <ServiceCard title="Chemical Peels" description="Skin rejuvenation" icon={{ src: "/icons/peels.svg", alt: "Peels" }} variant="centered" />
              <ServiceCard title="Cosmetology" description="Advanced cosmetic care" icon={{ src: "/icons/cosmetology.svg", alt: "Cosmetology" }} variant="centered" />
            </div>
          </div>

          {/* Laser Treatments */}
          <div className="w-full">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-4 sm:mb-6 text-[#0074B7]">Laser Treatments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              <ServiceCard title="MNRF Celina" description="Micro-needling RF" icon={{ src: "/icons/mnrfcelina.svg", alt: "MNRF" }} variant="centered" />
              <ServiceCard title="Tattoo Removal" description="Laser tattoo removal" icon={{ src: "/icons/tattooremoval.svg", alt: "Tattoo Removal" }} variant="centered" />
              <ServiceCard title="Laser Hair Reduction" description="Permanent hair removal" icon={{ src: "/icons/laserhairreduction.svg", alt: "Laser Hair" }} variant="centered" />
              <ServiceCard title="HIFU" description="Ultrasound skin tightening" icon={{ src: "/icons/hifu.svg", alt: "HIFU" }} variant="centered" />
              <ServiceCard title="Hydrafacial" description="Deep cleansing treatment" icon={{ src: "/icons/face.svg", alt: "Hydrafacial" }} variant="centered" />
            </div>
          </div>

          {/* Specialized Care */}
          <div className="w-full">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-4 sm:mb-6 text-[#0074B7]">Specialized Care</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <ServiceCard title="Gynecology" description="Women's health services" icon={{ src: "/icons/gynecology.svg", alt: "Gynecology" }} variant="centered" />
              <ServiceCard title="Infertility Counselling" description="Expert guidance" icon={{ src: "/icons/infertilitycounselling.svg", alt: "Infertility" }} variant="centered" />
              <ServiceCard title="Weight Loss Programs" description="Comprehensive management" icon={{ src: "/icons/weightloss.svg", alt: "Weight Loss" }} variant="centered" />
            </div>
          </div>
        </section>

        {/* Redefining section */}
        <section ref={redefiningRef} className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
          <div className="relative hidden md:block">
            <img
              src="/gallery/confidence.svg"
              alt="Confidence"
              className="w-full max-w-[400px] h-auto"
            />
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 max-w-[582px] px-2">
            <h2
              className="text-[24px] sm:text-[32px] md:text-[48px] leading-tight"
              dangerouslySetInnerHTML={{
                __html: t
                  .raw("redefining.title")
                  .replace("<highlight>", '<span class="text-[#0074B7]">')
                  .replace("</highlight>", "</span>"),
              }}
            />
            <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#0C1119]/90">
              {t("redefining.description")}
            </p>
            <Link href="/contact">
              <button className="bg-[#F6DE84] text-[#0C1119] rounded-xl h-11 px-6 text-[16px] font-semibold w-full sm:w-[216px] hover:cursor-pointer">
                {t("redefining.consultButton")}
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* Meet Our Specialists - Full Width */}
      <section ref={specialistsRef} className="-mx-3 w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-gradient-to-t from-[#0074B7] to-[#F5F7F8] px-[16px] sm:px-[20px] md:px-[48px] py-[32px] sm:py-[43px]">
        <div className="mx-auto max-w-[1046px] flex flex-col gap-10 sm:gap-16 items-center">
          <div className="text-center max-w-[582px] px-2">
            <h2 className="text-[28px] sm:text-[34px]">{t("specialists.title")}</h2>
            <p className="text-[16px] sm:text-[18px] text-[#0C1119]/80">
              {t("specialists.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1046px]">
            <div className="bg-[#E0F0F5] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
              <div className="rounded-2xl overflow-hidden w-full sm:w-[221px] h-[290px] sm:h-[290px] flex-shrink-0">
                <img
                  src="/gallery/raunak.png"
                  alt="Dr. Raunak Shinde"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold">
                    {t("specialists.drRaunak.name")}
                  </h3>
                  <p className="text-[16px] sm:text-[18px]">
                    {t("specialists.drRaunak.description")}
                  </p>
                </div>
                <Link href="/doctors?tab=raunak">
                  <button className="border border-[#0C1119] rounded-xl h-[42px] w-full sm:w-[145px] text-[16px] font-semibold hover:cursor-pointer">
                    {t("specialists.drRaunak.button")}
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-[#E0F0F5] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
              <div className="rounded-2xl overflow-hidden w-full sm:w-[226px] h-[290px] sm:h-[290px] flex-shrink-0">
                <img
                  src="/gallery/kavisha.png"
                  alt="Dr. Kavisha Lambhate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold">
                    {t("specialists.drKavisha.name")}
                  </h3>
                  <p className="text-[14px] sm:text-[16px]">
                    {t("specialists.drKavisha.description")}
                  </p>
                </div>
                <Link href="/doctors?tab=kavisha">
                  <button className="border border-[#0C1119] rounded-xl h-[42px] w-full sm:w-[145px] text-[16px] font-semibold hover:cursor-pointer">
                    {t("specialists.drKavisha.button")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
