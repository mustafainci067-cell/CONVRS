import type { Metadata } from 'next';
import XlsxToCsv from '@/components/converters/XlsxToCsv';

export const metadata: Metadata = {
  title: 'XLSX ↔ CSV — Convrs',
  description:
    'Convert Excel (.xlsx) files to CSV, or CSV back to Excel — with SheetJS. Runs 100% in your browser, no upload.',
};

export default function XlsxToCsvPage() {
  return <XlsxToCsv />;
}