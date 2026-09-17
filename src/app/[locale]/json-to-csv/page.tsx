import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import DataConverter from '@/components/converters/DataConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'JSON to CSV Converter',
    description:
      'Convert JSON to CSV and CSV to JSON in your browser. No backend, no API, your data never leaves the device.',
    path: '/json-to-csv',
  });
}

export default function JsonToCsvPage() {
  return <DataConverter mode="json-to-csv" />;
}
