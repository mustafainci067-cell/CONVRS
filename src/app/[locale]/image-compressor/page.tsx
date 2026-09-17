import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ImageCompressor from '@/components/converters/ImageCompressor';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Image Compressor',
    description:
      'Compress JPG, PNG, and WebP images with HTML5 Canvas, lowering quality and reducing file size. 100% client-side.',
    path: '/image-compressor',
  });
}

export default function ImageCompressorPage() {
  return <ImageCompressor />;
}
