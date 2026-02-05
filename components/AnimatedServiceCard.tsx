"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ServiceCardIcon } from "./ServiceCard";

interface Props {
  title: string;
  description: string;
  icon: ServiceCardIcon;
}

export default function AnimatedServiceCard({
  title,
  description,
  icon,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isHoveringRef = useRef(false);

  const renderIcon = () => (
    <div className="relative w-[132px] h-[132px]">
      {"svg" in icon ? (
        <div className="w-full h-full">{icon.svg}</div>
      ) : (
        <img
          src={icon.src}
          alt={icon.alt ?? title}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );

  const handleMouseEnter = () => {
    isHoveringRef.current = true;

    // Kill any existing timeline immediately
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Set initial states for description
    gsap.set(descriptionRef.current, {
      height: 0,
      opacity: 0,
      marginTop: 0,
    });

    // Expand animation
    const heightDiff = 319 - 240;
    const offset = -heightDiff / 2;

    const tl = gsap.timeline({
      onComplete: () => {
        if (isHoveringRef.current) {
          setIsExpanded(true);
        }
      },
      onInterrupt: () => {
        // Animation was killed, don't set expanded state
      },
    });

    timelineRef.current = tl;

    tl.to(cardRef.current, {
      height: 319,
      y: offset,
      duration: 0.5,
      ease: "power3.inOut",
    })
      .to(
        iconContainerRef.current,
        {
          y: 25,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        descriptionRef.current,
        {
          height: "auto",
          opacity: 1,
          marginTop: 12,
          duration: 0.25,
          ease: "power2.out",
        },
        "-=0.25"
      );
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;

    // Kill any existing timeline immediately
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Always collapse, regardless of current state
    setIsExpanded(false);

    // Collapse animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Ensure we're collapsed
        setIsExpanded(false);
      },
    });

    timelineRef.current = tl;

    tl.to(descriptionRef.current, {
      height: 0,
      opacity: 0,
      marginTop: 0,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        iconContainerRef.current,
        {
          y: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        cardRef.current,
        {
          height: 240,
          y: 0,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.4"
      );
  };

  return (
    <div
      className="relative"
      style={{ height: 240, zIndex: isExpanded ? 50 : 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="bg-[#D5EDFD] rounded-[80px] rounded-tl-[0px] p-5 flex flex-col w-full cursor-pointer hover:shadow-xl transition-shadow"
        style={{
          height: 240,
          transformOrigin: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <h3 ref={titleRef} className="text-[26px] text-left">
          {title}
        </h3>

        {/* Description - hidden initially */}
        <div ref={descriptionRef} style={{ height: 0, opacity: 0 }}>
          <p className="text-[13px] max-w-[195px]">{description}</p>
        </div>

        {/* Icon container */}
        <div
          ref={iconContainerRef}
          className="flex items-center justify-center flex-1"
        >
          {renderIcon()}
        </div>
      </div>
    </div>
  );
}
