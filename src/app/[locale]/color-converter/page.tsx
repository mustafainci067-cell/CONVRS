import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ColorConverter from '@/components/converters/ColorConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Color Converter',
    description:
      'Convert HEX, RGB, and HSL color codes into one another instantly, mathematically. No backend, no upload.',
    path: '/color-converter',
  });
}

export default function ColorConverterPage() {
  return <ColorConverter />;
}
