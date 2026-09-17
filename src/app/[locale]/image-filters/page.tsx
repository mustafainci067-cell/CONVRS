import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ImageFilters from '@/components/converters/ImageFilters';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Image Filters',
    description:
      'Apply Grayscale, Sepia, Blur, Brightness and Contrast with a live preview. 100% client-side image processing.',
    path: '/image-filters',
  });
}

export default function ImageFiltersPage() {
  return <ImageFilters />;
}
