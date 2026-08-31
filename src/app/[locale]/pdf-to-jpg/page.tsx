import type { Metadata } from 'next';
import PdfToJpgConverter from '@/components/converters/PdfToJpgConverter';

export const metadata: Metadata = {
  title: 'PDF ↔ Image Converter — Convrs',
  description:
    'Extract PDF pages as JPG images or combine JPG/PNG images into a single PDF — entirely in your browser, 100% client-side.',
};

export default function PdfToJpgPage() {
  return <PdfToJpgConverter />;
}
