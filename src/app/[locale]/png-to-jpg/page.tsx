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
    title: 'PNG to JPG Converter',
    description:
      'Convert PNG images to JPG (and back) with HTML5 Canvas. Transparency is flattened onto a white background. 100% client-side.',
    path: '/png-to-jpg',
  });
}

export default function PngToJpgPage() {
  return <ImageConverter mode="png-to-jpg" />;
}
