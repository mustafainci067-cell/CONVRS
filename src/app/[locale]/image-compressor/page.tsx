import type { Metadata } from 'next';
import ImageCompressor from '@/components/converters/ImageCompressor';

export const metadata: Metadata = {
  title: 'Image Compressor — Convrs',
  description:
    'Compress JPG, PNG and WebP images by lowering quality and capping dimensions, entirely client-side.',
};

export default function ImageCompressorPage() {
  return <ImageCompressor />;
}
