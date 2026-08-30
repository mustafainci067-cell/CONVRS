import type { Metadata } from 'next';
import ImageConverter from '@/components/converters/ImageConverter';

export const metadata: Metadata = {
  title: 'WebP to PNG Converter — Convrs',
  description:
    'Convert WebP images to lossless, transparent PNG with HTML5 Canvas. 100% client-side, no upload.',
};

export default function WebpToPngPage() {
  return <ImageConverter mode="webp-to-png" />;
}