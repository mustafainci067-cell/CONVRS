import type { Metadata } from 'next';
import ImageFilters from '@/components/converters/ImageFilters';

export const metadata: Metadata = {
  title: 'Image Filters — Convrs',
  description:
    'Apply Grayscale, Sepia, Blur, Brightness, Contrast, Saturation and more to your images with live preview — entirely client-side.',
};

export default function ImageFiltersPage() {
  return <ImageFilters />;
}
