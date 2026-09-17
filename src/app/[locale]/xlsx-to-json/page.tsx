import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import XlsxToJson from '@/components/converters/XlsxToJson';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'XLSX to JSON Converter',
    description:
      'Convert an Excel workbook to JSON records, or a JSON array to an .xlsx file. 100% client-side.',
    path: '/xlsx-to-json',
  });
}

export default function XlsxToJsonPage() {
  return <XlsxToJson />;
}
