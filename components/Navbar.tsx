"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get current locale from params or useLocale
  const currentLocale = (params.locale as string) || locale || 'en';
  
  const nav = [
    { href: `/${currentLocale}`, label: t("home") },
    { href: `/${currentLocale}/services`, label: t("services") },
    { href: `/${currentLocale}/doctors`, label: t("doctors") },
    { href: `/${currentLocale}/gallery`, label: t("gallery") },
    { href: `/${currentLocale}/contact`, label: t("contact") },
    { href: `/${currentLocale}/Infertility-Counselling`, label: t("Infertility-Counselling") },
  ];
  
  const toggleLanguage = () => {
    // Toggle between en and hi
    const newLocale = currentLocale === 'en' ? 'hi' : 'en';
    
    // Remove the current locale from the pathname
    // pathname could be: /en, /en/services, /hi, /hi/doctors, etc.
    let pathWithoutLocale = pathname;
    
    // Remove /en or /hi from the start of the path
    if (pathWithoutLocale.startsWith('/en')) {
      pathWithoutLocale = pathWithoutLocale.substring(3); // Remove '/en'
    } else if (pathWithoutLocale.startsWith('/hi')) {
      pathWithoutLocale = pathWithoutLocale.substring(3); // Remove '/hi'
    }
    
    // Ensure path starts with / if not empty
    if (pathWithoutLocale && !pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }
    
    // Construct new path: /{newLocale}{pathWithoutLocale}
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
    
    console.log('Switching locale:', { 
      currentLocale, 
      newLocale, 
      pathname, 
      pathWithoutLocale, 
      newPath 
    });
    
    // Navigate to the new path
    window.location.href = newPath;
  };
  
  return (
    <nav className="bg-[#E0F0F5] rounded-2xl px-3 sm:px-5 py-1.5 relative">
      <div className="flex items-center justify-between h-[48px] sm:h-[54px]">
        {/* Logo with symbol and text - clickable to home */}
        <Link href={`/${currentLocale}`} className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
         <Image 
            src="/logos/new_logo.png" 
            alt="Roop Clinic Logo" 
            width={200} 
            height={200}
            className="object-contain brightness-30 sm:w-[220px] sm:h-[200px]"
          />
        </Link>

        {/* Desktop Navigation - hidden on small screens */}
        <div className="hidden min-[700px]:flex items-center justify-between gap-6">
          {nav.map((n) => (
            <Link 
              key={n.label} 
              href={n.href} 
              className={`text-[16px] font-semibold transition-colors ${
                pathname === n.href 
                  ? "text-[#0074B7] font-bold" 
                  : "hover:text-[#0074B7]"
              }`}
            >
              {n.label}
            </Link>
          ))}
          {/* Translate icon */}
          <button onClick={toggleLanguage} className="hover:opacity-80 transition-opacity" aria-label="Switch language">
            <Image 
              src="/icons/translate.svg" 
              alt="Translate" 
              width={19} 
              height={19}
              className="object-contain"
            />
          </button>
        </div>

        {/* Mobile Menu Button - visible on small screens */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="min-[700px]:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#0074B7] transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#0074B7] transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#0074B7] transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu - dropdown */}
      {isMenuOpen && (
        <div className="min-[700px]:hidden absolute top-full left-0 right-0 mt-2 bg-[#E0F0F5] rounded-2xl shadow-lg overflow-hidden z-50">
          <div className="flex flex-col py-2">
            {nav.map((n) => (
              <Link 
                key={n.label} 
                href={n.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-5 py-3 text-[16px] font-semibold transition-colors ${
                  pathname === n.href 
                    ? "text-[#0074B7] font-bold bg-white/30" 
                    : "hover:text-[#0074B7] hover:bg-white/20"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <button 
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }} 
              className="px-5 py-3 text-[16px] font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <Image 
                src="/icons/translate.svg" 
                alt="Translate" 
                width={19} 
                height={19}
                className="object-contain"
              />
              <span>{currentLocale === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
