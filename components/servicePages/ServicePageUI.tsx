'use client';

import type React from 'react';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCard {
  img: string;
  title: string;
}

interface ProcedureInfo {
  title: string;
  coloredTitle: string;
  bulletPoints: string[];
}

interface SecondSection {
  heading: string;
  coloredHeading?: string;
  description: string;
  features?: string[];
}

interface ProcedureStep {
  title: string;
  description: string[];
}

interface Procedure {
  steps: ProcedureStep[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ServicePageUIProps {
  title: string;
  subtitle: string;
  features: FeatureCard[];
  procedureInfo: ProcedureInfo;
  secondSection?: SecondSection;
  procedure?: Procedure;
  faqs: FaqItem[];
  beforeAfterImage?: string;
  secondImage?: string;
}

const ServicePageUI: React.FC<ServicePageUIProps> = ({
  title,
  subtitle,
  features,
  procedureInfo,
  secondSection,
  procedure,
  faqs,
  beforeAfterImage,
  secondImage,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>

      <div className="bg-white min-h-screen text-gray-900 relative rounded-lg mb-10">

        <div className="max-w-[82rem] mx-auto px-4 pb-6 sm:py-8 md:pb-12">
          <div className="space-y-8 sm:space-y-12 md:space-y-16 mt-6">
            {/* Hero Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {title}
                </h1>
                <h2 className="text-xl sm:text-2xl font-medium text-blue-500 mt-2">
                  {subtitle}
                </h2>
              </div>

              {/* Features Grid */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-8 sm:px-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 p-2 sm:p-4 rounded-lg flex flex-col items-center text-center h-full border border-blue-100 hover:shadow-md transition-shadow"
                    >
                      <div className="mb-3 sm:mb-4 w-12 h-12 flex items-center justify-center">
                        <Image
                          src={feature.img}
                          alt={feature.title}
                          width={48}
                          height={48}
                          className="object-contain"
                          style={{
                            filter: 'invert(39%) sepia(57%) saturate(2878%) hue-rotate(200deg) brightness(95%) contrast(101%)',
                          }}
                        />
                      </div>
                      <h3 className="text-blue-400 text-base sm:text-lg font-medium">
                        {feature.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-blue-50 pb-8 pt-2 sm:pb-12 md:pb-16 px-4 md:px-12 rounded-lg border border-blue-100">
              {/* Action Buttons */}
              <div className="flex flex-col justify-end sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
                <a href="https://roopclinique.com/en/contact">
                <button
                  className="bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium hover:bg-gray-900 transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  Contact Us Today
                </button></a>
                <Link href="https://roopclinique.com/en" target="_blank">
                  <button className="bg-blue-500 pointer-cursor text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-bold text-sm sm:text-base w-full sm:w-auto hover:bg-blue-700 transition-colors">
                    Visit Our Site
                  </button>
                </Link>
              </div>

              {/* Image Section - Two Side by Side Images */}
              {beforeAfterImage && secondImage && (
                <div className="img-section flex md:flex-row flex-col items-center justify-center mt-8 gap-8">
                  <div className="w-full max-w-[720px]">
                    <Image
                      src={beforeAfterImage}
                      alt="Before and After Results 1"
                      className="w-full md:h-96 rounded-lg object-cover border border-blue-200"
                      width={720}
                      height={680}
                    />
                  </div>
                  <div className="w-full max-w-[720px]">
                    <Image
                      src={secondImage}
                      alt="Before and After Results 2"
                      className="w-full md:h-96 rounded-lg object-cover border border-blue-200"
                      width={720}
                      height={680}
                    />
                  </div>
                </div>
              )}

              {/* Single Image if only one provided */}
              {beforeAfterImage && !secondImage && (
                <div className="img-section flex justify-center mt-8">
                  <div className="w-full max-w-[720px]">
                    <Image
                      src={beforeAfterImage}
                      alt="Before and After Results"
                      className="w-full rounded-lg border border-blue-200"
                      width={720}
                      height={580}
                    />
                  </div>
                </div>
              )}

              {/* Procedure Info */}
              <div className="max-w-6xl mx-auto gap-8 items-center mt-8">
                <div className="space-y-4 sm:space-y-8 order-2 md:order-1">
                  <div className="mb-4 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                      <span className="text-blue-500">
                        {procedureInfo.coloredTitle}
                      </span>{' '}
                      <span className="text-gray-800">
                        {procedureInfo.title}
                      </span>
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                      {procedureInfo.bulletPoints.map((point, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: point }}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Second Section */}
              {secondSection && (
                <div className="py-8 sm:py-12 md:py-10 mt-8">
                  <div className="max-w-6xl mx-auto">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="mb-4 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                          {secondSection.coloredHeading && (
                            <>
                              <span className="text-blue-400">
                                {secondSection.coloredHeading}
                              </span>{' '}
                            </>
                          )}
                          <span className="text-gray-800">
                            {secondSection.heading}
                          </span>
                        </h2>
                        <p
                          className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: secondSection.description,
                          }}
                        />
                        {secondSection.features && (
                          <div className="space-y-2 sm:space-y-3 mt-4">
                            {secondSection.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p
                                  className="text-sm sm:text-base text-gray-700"
                                  dangerouslySetInnerHTML={{
                                    __html: feature,
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Details Section (Procedure Steps) */}
              {procedure && procedure.steps && procedure.steps.length > 0 && (
                <div className="mt-0">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-500">
                    Key Details
                  </h2>
                  <div className="space-y-6 sm:space-y-8">
                    {procedure.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row gap-4 sm:gap-6 group"
                      >
                        <div className="bg-blue-400 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg sm:text-xl group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-xl border border-blue-200 flex-1 group-hover:border-blue-400 transition-colors shadow-sm">
                          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
                            {step.title}
                          </h3>
                          {step.description.map((paragraph, idx) => (
                            <p
                              key={idx}
                              className="text-gray-600 text-sm sm:text-base mb-3 last:mb-0"
                              dangerouslySetInnerHTML={{ __html: paragraph }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* FAQ Section */}
            <section className="bg-blue-50 w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-[60px] text-gray-900 rounded-lg border border-blue-100">
              <div className="max-w-[1440px] mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 sm:mb-8 md:mb-12 text-gray-900"
                >
                  Frequently Asked Questions
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-4 sm:p-6 md:p-8 space-y-2 border border-blue-200"
                >
                  {faqs.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-blue-100 last:border-none overflow-hidden"
                    >
                      <motion.div
                        className="flex items-center justify-between py-3 sm:py-4 cursor-pointer hover:bg-blue-50 px-2 rounded transition-colors"
                        onClick={() => toggle(index)}
                      >
                        <p className="text-sm sm:text-base md:text-lg font-medium pr-2 text-gray-800">
                          {index + 1}. {item.question}
                        </p>
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </motion.div>
                      </motion.div>

                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 pb-3 sm:pb-4 pl-2 px-2">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Floating Action Button */}
            <div className="fixed bottom-2 right-6 flex flex-col items-center gap-4 z-20 md:mb-5 md:mr-10">
              <Link
                href="https://api.whatsapp.com/send/?phone=+917024411704&text=Roop Clinique&type=phone_number&app_absent=0"
                target="_blank"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                
                >
                  <Image
                    src="/logos/whatsapp.png"
                    alt="WhatsApp"
                    width={50}
                    height={50}
                    className="object-contain cursor-pointer"
                    
                  />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePageUI;