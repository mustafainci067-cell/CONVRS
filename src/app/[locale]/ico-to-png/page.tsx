import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ImageConverter from '@/components/converters/ImageConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'ICO to PNG Converter',
    description:
      'Convert ICO icons to transparent PNG, or generate an ICO icon from a PNG. Runs entirely in your browser.',
    path: '/ico-to-png',
  });
}

export default function IcoToPngPage() {
  return <ImageConverter mode="ico-to-png" />;
}
