import type { Metadata } from 'next';
import XlsxToJson from '@/components/converters/XlsxToJson';

export const metadata: Metadata = {
  title: 'XLSX ↔ JSON — Convrs',
  description:
    'Convert an Excel workbook to pretty JSON records, or a JSON array of objects to an .xlsx file. Parsed entirely in your browser with SheetJS.',
};

export default function XlsxToJsonPage() {
  return <XlsxToJson />;
}
