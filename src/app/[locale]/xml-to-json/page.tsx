import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import XmlToJson from '@/components/converters/XmlToJson';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'XML to JSON Converter',
    description:
      'Convert XML to JSON with DOMParser and JSON back to XML. Two-way and instant. 100% client-side.',
    path: '/xml-to-json',
  });
}

export default function XmlToJsonPage() {
  return <XmlToJson />;
}
