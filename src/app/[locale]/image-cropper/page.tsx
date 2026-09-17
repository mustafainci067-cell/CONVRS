import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ImageCropper from '@/components/converters/ImageCropper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Image Cropper',
    description:
      'Crop images by dragging a selection or choosing preset ratios like 1:1, 16:9 and 3:2. Runs in your browser.',
    path: '/image-cropper',
  });
}

export default function ImageCropperPage() {
  return <ImageCropper />;
}
