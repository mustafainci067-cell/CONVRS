import type { Metadata } from 'next';
import DocxToPdf from '@/components/converters/DocxToPdf';

export const metadata: Metadata = {
  title: 'DOCX to PDF — Convrs',
  description:
    'Read a Word (.docx) document and typeset its text into a PDF with mammoth and pdf-lib, entirely client-side.',
};

export default function DocxToPdfPage() {
  return <DocxToPdf />;
}
