import type { Metadata } from 'next';
import ImageConverter from '@/components/converters/ImageConverter';

export const metadata: Metadata = {
  title: 'ICO to PNG Converter — Convrs',
  description:
    'Convert ICO icon files to crisp, transparent PNG with the browser native Image API. Runs entirely on your device.',
};

export default function IcoToPngPage() {
  return <ImageConverter mode="ico-to-png" />;
}