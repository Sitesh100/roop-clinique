
import { notFound } from 'next/navigation';
import ServicePageUI from '@/components/servicePages/ServicePageUI';
import { servicesEN } from '@/data/services/en';
import { servicesHI } from '@/data/services/hi';

interface Props {
  params: Promise<{
    locale: 'en' | 'hi';
    slug: string;
  }>;
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params; // ✅ REQUIRED

  const data =
    locale === 'hi'
      ? servicesHI[slug as keyof typeof servicesHI]
      : servicesEN[slug as keyof typeof servicesEN];

  if (!data) return notFound();

  return <ServicePageUI {...data} />;
}
