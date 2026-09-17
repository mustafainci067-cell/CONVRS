import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import XlsxToCsv from '@/components/converters/XlsxToCsv';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'XLSX to CSV Converter',
    description:
      'Convert your Excel (.xlsx) files to CSV, or turn CSV into an Excel workbook. Runs in your browser.',
    path: '/xlsx-to-csv',
  });
}

export default function XlsxToCsvPage() {
  return <XlsxToCsv />;
}
