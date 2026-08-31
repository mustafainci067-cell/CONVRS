import type { Metadata } from 'next';
import PdfMerge from '@/components/converters/PdfMerge';

export const metadata: Metadata = {
  title: 'PDF Merge — Convrs',
  description:
    'Merge multiple PDF documents into a single PDF file, built entirely in your browser with pdf-lib.',
};

export default function PdfMergeSplitPage() {
  return <PdfMerge />;
}
