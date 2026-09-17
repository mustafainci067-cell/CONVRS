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
    title: 'JPG to WebP Converter',
    description:
      "Convert JPG files to Google's lightweight WebP format and back. 100% client-side with WebAssembly.",
    path: '/jpg-to-webp',
  });
}

export default function JpgToWebpPage() {
  return <ImageConverter mode="jpg-to-webp" />;
}
