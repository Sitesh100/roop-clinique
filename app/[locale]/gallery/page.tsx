"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const t = useTranslations("GalleryPage");

  // Refs for sections
  const bannerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Refs for grid rows
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

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

    // Row 1 - slide in from left
    if (row1Ref.current) {
      gsap.fromTo(
        row1Ref.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row1Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Row 2 - slide in from right
    if (row2Ref.current) {
      gsap.fromTo(
        row2Ref.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row2Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Row 3 - slide in from left
    if (row3Ref.current) {
      gsap.fromTo(
        row3Ref.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row3Ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Carousel section - slide up and fade in
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
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
  // Gallery images for carousel
  const clinicImages = [
    { src: "/gallery/gallery1.png", alt: `${t("imageAlt.clinicInterior")} 1` },
    { src: "/gallery/gallery2.png", alt: `${t("imageAlt.clinicInterior")} 2` },
    { src: "/gallery/gallery3.png", alt: `${t("imageAlt.clinicInterior")} 3` },
    { src: "/gallery/gallery4.png", alt: `${t("imageAlt.clinicInterior")} 4` },
    { src: "/gallery/gallery5.png", alt: `${t("imageAlt.clinicInterior")} 5` },
    { src: "/gallery/gallery6.png", alt: `${t("imageAlt.clinicInterior")} 6` },
    { src: "/gallery/gallery7.png", alt: `${t("imageAlt.clinicInterior")} 7` },
  ];

  return (
    <div className="bg-[#f5f7f8] flex flex-col items-center pb-16 overflow-x-hidden">
      {/* Gallery Banner */}
      <section
        ref={bannerRef}
        className="rounded-[18px] overflow-hidden relative w-full max-w-[1600px] mx-auto px-3 mb-12 md:mb-20"
      >
        <div className="relative h-[220px] sm:h-[280px] md:h-[350px] w-full">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-[18px]"
            style={{ backgroundImage: "url('/banners/galleryBanner.png')" }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 rounded-[18px]"
            style={{
              background:
                "linear-gradient(to right, rgba(44, 62, 90, 0.95), rgba(0, 116, 183, 0.9) 50%, rgba(224, 240, 245, 0.8))",
            }}
          />
          {/* Content */}
          <div className="absolute inset-0 p-6 sm:p-8 md:p-12 flex items-end">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h1 className="font-['Playfair_Display'] font-bold text-[36px] sm:text-[48px] md:text-[64px] text-white leading-tight">
                {t("banner.title")}
              </h1>
              <p className="text-white text-[20px] sm:text-[24px] md:text-[30px]">
                {t("banner.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Gallery */}
      <section className="w-full max-w-[1600px] mx-auto px-3 mb-12 md:mb-20">
        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden md:grid grid-cols-6 grid-rows-8 gap-6 h-[1800px]">
          {/* Row 1 - slides from left */}
          <div
            ref={row1Ref}
            className="col-span-6 row-span-3 grid grid-cols-6 gap-4"
            style={{ gridColumn: "1 / -1", gridRow: "1 / 4" }}
          >
            {/* Large top-left */}
            <div className="col-span-4 row-span-3 relative rounded-[18px] overflow-hidden">
              <Image
                src="/gallery/gallery1.png"
                alt={t("imageAlt.gallery1")}
                fill
                className="object-cover"
              />
            </div>

            {/* Top-right */}
            <div className="col-span-2 row-span-3 relative rounded-[18px] overflow-hidden">
              <Image
                src="/gallery/gallery2.png"
                alt={t("imageAlt.gallery2")}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2 - slides from right */}
          <div
            ref={row2Ref}
            className="col-span-6 row-span-3 grid grid-cols-6 gap-4"
            style={{ gridColumn: "1 / -1", gridRow: "4 / 7" }}
          >
            {/* Middle-left */}
            <div className="col-span-3 row-span-3 relative rounded-[18px] overflow-hidden">
              <Image
                src="/gallery/gallery3.png"
                alt={t("imageAlt.gallery3")}
                fill
                className="object-cover"
              />
            </div>

            {/* Middle-right */}
            <div className="col-span-3 row-span-3 relative rounded-[18px] overflow-hidden">
              <Image
                src="/gallery/gallery4.png"
                alt={t("imageAlt.gallery4")}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 3 - slides from left */}
          <div
            ref={row3Ref}
            className="col-span-6 row-span-2 grid grid-cols-6 gap-4"
            style={{ gridColumn: "1 / -1", gridRow: "7 / 9" }}
          >
            {/* Bottom large left */}
            <div className="col-span-2 row-span-2 relative rounded-[18px] overflow-hidden">
              <Image
                src="/gallery/gallery5.png"
                alt={t("imageAlt.gallery5")}
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom-right tall */}
            <div className="col-span-2 row-span-2 relative rounded-[18px] overflow-hidden">
              <Image
                src="/gallery/gallery6.png"
                alt={t("imageAlt.gallery6")}
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom-right tall 2 */}
            <div className="col-span-2 row-span-2 relative rounded-[18px] overflow-hidden">
              <Image
                src="/gallery/gallery7.png"
                alt={t("imageAlt.gallery7")}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile Grid - simple 2-column layout */}
        <div className="md:hidden grid grid-cols-2 gap-3 sm:gap-4">
          <div className="col-span-2 relative rounded-[18px] overflow-hidden h-[250px] sm:h-[300px]">
            <Image
              src="/gallery/gallery1.png"
              alt={t("imageAlt.gallery1")}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-[18px] overflow-hidden h-[180px] sm:h-[220px]">
            <Image
              src="/gallery/gallery2.png"
              alt={t("imageAlt.gallery2")}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-[18px] overflow-hidden h-[180px] sm:h-[220px]">
            <Image
              src="/gallery/gallery3.png"
              alt={t("imageAlt.gallery3")}
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-2 relative rounded-[18px] overflow-hidden h-[250px] sm:h-[300px]">
            <Image
              src="/gallery/gallery4.png"
              alt={t("imageAlt.gallery4")}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-[18px] overflow-hidden h-[180px] sm:h-[220px]">
            <Image
              src="/gallery/gallery5.png"
              alt={t("imageAlt.gallery5")}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative rounded-[18px] overflow-hidden h-[180px] sm:h-[220px]">
            <Image
              src="/gallery/gallery6.png"
              alt={t("imageAlt.gallery6")}
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-2 relative rounded-[18px] overflow-hidden h-[250px] sm:h-[300px]">
            <Image
              src="/gallery/gallery7.png"
              alt={t("imageAlt.gallery7")}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Clinic Glimpses Carousel */}
      <section ref={carouselRef} className="w-full max-w-[1600px] mx-auto px-3">
        <div className="flex flex-col gap-10 md:gap-20 items-center">
          {/* Header */}
          <div className="flex flex-col gap-3 items-center text-center text-[#0c1119]">
            <h2 className="font-['Playfair_Display'] font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-normal">
              {t("carousel.title")}
            </h2>
            <p className="text-[20px] sm:text-[24px] md:text-[30px] leading-normal">
              {t("carousel.description")}
            </p>
          </div>

          {/* Carousel */}
          <div className="w-full">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 sm:-ml-5 scrollbar-hide">
                {clinicImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-4 sm:pl-5 basis-auto">
                    <div className="relative w-[320px] sm:w-[380px] md:w-[450px] h-[320px] sm:h-[380px] md:h-[450px] rounded-[18px] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:left-4 hidden sm:flex" />
              <CarouselNext className="right-2 sm:right-4 hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}
