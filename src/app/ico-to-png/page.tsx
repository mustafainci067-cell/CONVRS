import type { Metadata } from 'next';
import ImageConverter from '@/components/converters/ImageConverter';

export const metadata: Metadata = {
  title: 'ICO ↔ PNG Converter — Convrs',
  description:
    'Convert ICO icon files to crisp, transparent PNG — or build an ICO icon from a PNG. Runs entirely on your device.',
};

export default function IcoToPngPage() {
  return <ImageConverter mode="ico-to-png" />;
}