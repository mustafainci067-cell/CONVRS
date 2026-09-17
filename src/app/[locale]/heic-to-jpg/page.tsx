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
    title: 'HEIC to JPG Converter',
    description:
      'Convert Apple HEIC photos to the universal JPG format. Runs entirely in your browser — no upload, no server.',
    path: '/heic-to-jpg',
  });
}

export default function HeicToJpgPage() {
  return <ImageConverter mode="heic-to-jpg" />;
}
