import type { Metadata } from 'next';
import PdfToJpgConverter from '@/components/converters/PdfToJpgConverter';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter — Convrs',
  description:
    'Convert the first page of a PDF to a JPG image directly in your browser. No upload, 100% client-side.',
};

export default function PdfToJpgPage() {
  return <PdfToJpgConverter />;
}
