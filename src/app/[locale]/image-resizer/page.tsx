import type { Metadata } from 'next';
import ImageResizer from '@/components/converters/ImageResizer';

export const metadata: Metadata = {
  title: 'Image Resizer — Convrs',
  description:
    'Resize JPG, PNG, WebP and GIF images by width and height in pixels or percentage, keeping or unlocking the aspect ratio — entirely client-side.',
};

export default function ImageResizerPage() {
  return <ImageResizer />;
}
