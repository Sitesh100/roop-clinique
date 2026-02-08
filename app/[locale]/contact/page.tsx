"use client";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  
  // Refs for sections
  const bannerRef = useRef<HTMLDivElement>(null);
  const contactMethodsRef = useRef<HTMLDivElement>(null);
  const stayInTouchRef = useRef<HTMLDivElement>(null);
  
  // Autoplay plugin for carousel
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
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
    
    // Contact methods section - slide up and fade in
    if (contactMethodsRef.current) {
      gsap.fromTo(
        contactMethodsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactMethodsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    
    // Stay in touch section - slide up and fade in
    if (stayInTouchRef.current) {
      gsap.fromTo(
        stayInTouchRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stayInTouchRef.current,
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
  return (
    <div className="bg-[#f5f7f8] flex flex-col items-center gap-10 md:gap-16 lg:gap-20 pb-8 md:pb-12 lg:pb-16">
      {/* Contact Banner */}
      <section ref={bannerRef} className="relative w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-3">
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full rounded-[12px] md:rounded-[18px] overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-inherit"
            style={{ backgroundImage: "url('/banners/contactBanner.png')" }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 rounded-inherit"
            style={{
              background:
                "linear-gradient(to right, rgba(44, 62, 90, 0.95), rgba(0, 116, 183, 0.85), rgba(212, 243, 249, 0.7))",
            }}
          />
          {/* Content */}
          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12 flex items-end justify-between">
            <div className="flex flex-col gap-1 sm:gap-2 md:gap-3">
              <h1 className="font-['Playfair_Display'] font-bold text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] text-white leading-tight">
                {t("banner.title")}
              </h1>
              <p className="text-white text-[14px] sm:text-[18px] md:text-[24px] lg:text-[30px]">
                {t("banner.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Telephone Support & Email Assistance */}
      <section ref={contactMethodsRef} className="w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-3 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Telephone Support */}
        <div className="flex-1 flex flex-col gap-6 md:gap-8 lg:gap-12 items-center w-full">
          <h2 className="font-['Playfair_Display'] text-[28px] sm:text-[36px] md:text-[40px] lg:text-[48px] leading-normal text-[#0c1119] text-center">
            {t("telephoneSupport.title")}
          </h2>
          <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
            <div className="flex gap-4 md:gap-6 items-center">
              <div className="bg-[#f6de84] rounded-full w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#0c1119]" />
              </div>
              <p className="font-semibold text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] text-[#0c1119]">
                {t("telephoneSupport.phone")}
              </p>
            </div>
            <p className="font-light text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#0c1119] text-center px-4">
              {t("telephoneSupport.availability")}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-[200px] lg:h-[280px] w-[1px] bg-[#0c1119] opacity-20"></div>
        <div className="md:hidden w-full h-[1px] bg-[#0c1119] opacity-20"></div>

        {/* Email Assistance */}
        <div className="flex-1 flex flex-col gap-6 md:gap-8 lg:gap-12 items-center w-full">
          <h2 className="font-['Playfair_Display'] text-[28px] sm:text-[36px] md:text-[40px] lg:text-[48px] leading-normal text-[#0c1119] text-center">
            {t("emailAssistance.title")}
          </h2>
          <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
            <div className="flex gap-4 md:gap-6 items-center">
              <div className="bg-[#f6de84] rounded-full w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#0c1119]" />
              </div>
              <p className="font-semibold text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] text-[#0c1119] break-all">
                {t("emailAssistance.email")}
              </p>
            </div>
            <p className="font-light text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#0c1119] text-center px-4">
              {t("emailAssistance.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Stay in Touch Section */}
      <section ref={stayInTouchRef} className="w-full max-w-[1600px] mx-auto px-3 md:px-4 lg:px-3">
        <Carousel 
          className="w-full" 
          opts={{ loop: true }}
          plugins={[autoplayPlugin.current]}
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent>
            {/* First Location - Surgery Center */}
            <CarouselItem>
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Image with decorative boxes */}
                <div className="relative flex-shrink-0 w-full lg:w-auto flex justify-center">
                  <div className="relative">
                    <div className="absolute bg-[#f6de84] w-[120px] h-[150px] sm:w-[140px] sm:h-[180px] md:w-[160px] md:h-[200px] lg:w-[180px] lg:h-[230px] rounded-[16px] md:rounded-[22px] top-0 left-0 z-0"></div>
                    <div className="absolute bg-[#f6de84] w-[100px] h-[120px] sm:w-[120px] sm:h-[140px] md:w-[140px] md:h-[160px] lg:w-[160px] lg:h-[180px] rounded-[16px] md:rounded-[22px] bottom-0 right-0 z-0"></div>
                    <div className="relative w-[280px] h-[220px] sm:w-[350px] sm:h-[270px] md:w-[420px] md:h-[320px] lg:w-[500px] lg:h-[380px] rounded-[12px] md:rounded-[18px] overflow-hidden ml-[20px] sm:ml-[25px] md:ml-[30px] lg:ml-[35px] mt-[18px] sm:mt-[22px] md:mt-[25px] lg:mt-[27px] z-10">
                      <Image
                        src="/gallery/contactImage.png"
                        alt="Roop Clinique Surgery Center"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 md:gap-7 lg:gap-9 flex-1 w-full">
                  <h2 className="font-['Playfair_Display'] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] leading-tight text-[#0c1119] text-center lg:text-left">
                    {t("stayInTouch.title")}
                  </h2>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119] leading-normal text-center lg:text-left">
                    {t("stayInTouch.description")}
                  </p>
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex gap-4 md:gap-6 items-start">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119] leading-normal flex-1">
                        {t("stayInTouch.addressSurgery")}
                      </p>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-center">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119]">
                        {t("stayInTouch.phone")}
                      </p>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-center">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119] break-all">
                        {t("stayInTouch.email")}
                      </p>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-center">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <Instagram className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119]">
                        {t("stayInTouch.instagram")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Second Location - Main Clinic */}
            <CarouselItem>
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Image with decorative boxes */}
                <div className="relative flex-shrink-0 w-full lg:w-auto flex justify-center">
                  <div className="relative">
                    <div className="absolute bg-[#f6de84] w-[120px] h-[150px] sm:w-[140px] sm:h-[180px] md:w-[160px] md:h-[200px] lg:w-[180px] lg:h-[230px] rounded-[16px] md:rounded-[22px] top-0 left-0 z-0"></div>
                    <div className="absolute bg-[#f6de84] w-[100px] h-[120px] sm:w-[120px] sm:h-[140px] md:w-[140px] md:h-[160px] lg:w-[160px] lg:h-[180px] rounded-[16px] md:rounded-[22px] bottom-0 right-0 z-0"></div>
                    <div className="relative w-[280px] h-[220px] sm:w-[350px] sm:h-[270px] md:w-[420px] md:h-[320px] lg:w-[500px] lg:h-[380px] rounded-[12px] md:rounded-[18px] overflow-hidden ml-[20px] sm:ml-[25px] md:ml-[30px] lg:ml-[35px] mt-[18px] sm:mt-[22px] md:mt-[25px] lg:mt-[27px] z-10">
                      <Image
                        src="/gallery/gallery4.png"
                        alt="Roop Clinique Main Location"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 md:gap-7 lg:gap-9 flex-1 w-full">
                  <h2 className="font-['Playfair_Display'] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] leading-tight text-[#0c1119] text-center lg:text-left">
                    {t("stayInTouch.title")}
                  </h2>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119] leading-normal text-center lg:text-left">
                    {t("stayInTouch.description")}
                  </p>
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="flex gap-4 md:gap-6 items-start">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119] leading-normal flex-1">
                        {t("stayInTouch.address")}
                      </p>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-center">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119]">
                        {t("stayInTouch.phone")}
                      </p>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-center">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119] break-all">
                        {t("stayInTouch.email")}
                      </p>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-center">
                      <div className="bg-[#f6de84] rounded-lg w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex items-center justify-center flex-shrink-0">
                        <Instagram className="w-5 h-5 md:w-6 md:h-6 text-[#0c1119]" />
                      </div>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#0c1119]">
                        {t("stayInTouch.instagram")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </section>

      {/* Footer */}
    </div>
  );
}
