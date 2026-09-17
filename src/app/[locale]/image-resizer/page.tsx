import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ImageResizer from '@/components/converters/ImageResizer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Image Resizer',
    description:
      'Resize images by width and height in pixels or percentage, keeping or unlocking the aspect ratio. Runs in your browser.',
    path: '/image-resizer',
  });
}

export default function ImageResizerPage() {
  return <ImageResizer />;
}
