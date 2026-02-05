import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Navbar from "../../components/Navbar";
import Link from "next/link";

// Project fonts to match Figma
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Roop Clinique",
  description: "Roop Clinic website",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${openSans.variable} ${playfair.variable} antialiased bg-[#F5F7F8] text-[#0C1119] flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Persistent navbar with gap below */}
          <div className="sticky top-2 sm:top-3 z-50 flex w-full justify-center mb-6 sm:mb-8">
            <div className="w-full max-w-[1600px] px-2 sm:px-3">
              <Navbar />
            </div>
          </div>
          <main className="w-full flex justify-center flex-1">
            <div className="w-full max-w-[1600px] px-2 sm:px-3">{children}</div>
          </main>
          {/* Persistent footer - full width */}
           <footer className="w-full bg-[#E0F0F5] px-4 sm:px-5 md:px-20 py-12 md:py-16 mt-auto">
            <div className="mx-auto max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              <div>
                <h4 className="text-[24px] sm:text-[28px] md:text-[32px] mb-5 md:mb-6 font-semibold">
                  {messages.Footer?.quickNavigation?.title ||
                    "Quick Navigation"}
                </h4>
                <ul className="space-y-2 text-[18px] sm:text-[20px] md:text-[22px]">
                  <li>
                    <Link href={`/${locale}`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.quickNavigation?.home || "Home"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/services`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.quickNavigation?.services || "Services"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/doctors`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.quickNavigation?.doctors || "Doctors"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/contact`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.quickNavigation?.contact || "Contact Us"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/contact`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.quickNavigation?.booking ||
                        "Appointment Booking"}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[24px] sm:text-[28px] md:text-[32px] mb-5 md:mb-6 font-semibold">
                  {messages.Footer?.legal?.title || "Legal & Policy"}
                </h4>
                <ul className="space-y-2 text-[18px] sm:text-[20px] md:text-[22px]">
                  <li>
                    <Link href={`/${locale}/privacy-policy`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.legal?.privacy || "Privacy Policy"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/terms-conditions`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.legal?.terms || "Terms & Conditions"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/disclaimer`} className="hover:text-[#0074B7] transition-colors">
                      {messages.Footer?.legal?.disclaimer || "Disclaimer"}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <h4 className="text-[24px] sm:text-[28px] md:text-[32px] mb-5 md:mb-6 font-semibold">
                  {messages.Footer?.contactUs?.title || "Contact Us"}
                </h4>
                <ul className="space-y-2.5 text-[18px] sm:text-[20px] md:text-[22px]">
                  <li>
                    <span className="font-semibold">Roop plastic surgery clinique and infertility counselling centre:</span>{" "}
                    {messages.Footer?.contactUs?.address1 ||
                      "No 3 Phulwani Plaza, 286 Mahashweta Nagar, Opposite Iskcon temple, Ujjain, MP, INDIA - 456010"}
                  </li>
                  <li>
                    <span className="font-semibold">Shinde Nursing and Maternity Home:</span>{" "}
                    {messages.Footer?.contactUs?.address2 ||
                      "48 Subhash Nagar, Opposite do talaab, Indore Road, Ujjain, MP, 456010"}
                  </li>
                  <li>
                    {messages.Footer?.contactUs?.phone ||
                      "7024411704 | 0734-3506016"}
                  </li>
                  <li>
                    {messages.Footer?.contactUs?.email ||
                      "roopclinique3@gmail.com"}
                  </li>
                  <li>
                    {messages.Footer?.contactUs?.instagram ||
                      "@roop_cosmetic_surgery_clinic"}
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
