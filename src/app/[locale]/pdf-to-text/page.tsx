import type { Metadata } from 'next';
import PdfToText from '@/components/converters/PdfToText';

export const metadata: Metadata = {
  title: 'PDF to Text — Convrs',
  description:
    'Extract raw text from a PDF with pdf.js and copy or download it as a .txt file. 100% in your browser — your document never leaves your device.',
};

export default function PdfToTextPage() {
  return <PdfToText />;
}
