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
    title: 'SVG to PNG Converter',
    description:
      'Rasterize vector SVG into transparent PNG, or embed PNG back into SVG. Runs 100% in your browser.',
    path: '/svg-to-png',
  });
}

export default function SvgToPngPage() {
  return <ImageConverter mode="svg-to-png" />;
}
