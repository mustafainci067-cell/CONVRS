import type { Metadata } from 'next';
import ImageConverter from '@/components/converters/ImageConverter';

export const metadata: Metadata = {
  title: 'SVG ↔ PNG Converter — Convrs',
  description:
    'Rasterize SVG vector files into transparent PNG bitmaps, or embed PNGs back into SVG — entirely client-side.',
};

export default function SvgToPngPage() {
  return <ImageConverter mode="svg-to-png" />;
}
