import type { Metadata } from 'next';
import ImageConverter from '@/components/converters/ImageConverter';

export const metadata: Metadata = {
  title: 'PNG to JPG Converter — Convrs',
  description:
    'Convert PNG images to JPG (and back) with HTML5 Canvas. Runs 100% in your browser, no upload.',
};

export default function PngToJpgPage() {
  return <ImageConverter mode="png-to-jpg" />;
}
