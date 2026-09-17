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
    title: 'WebP to PNG Converter',
    description:
      'Convert lightweight WebP images into lossless PNG, preserving transparency. Runs 100% in your browser.',
    path: '/webp-to-png',
  });
}

export default function WebpToPngPage() {
  return <ImageConverter mode="webp-to-png" />;
}
