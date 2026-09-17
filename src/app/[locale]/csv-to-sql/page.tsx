import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import CsvToSql from '@/components/converters/CsvToSql';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'CSV to SQL Converter',
    description:
      'Turn a CSV table into INSERT SQL statements — pick your own table name. Runs 100% in your browser, zero backend.',
    path: '/csv-to-sql',
  });
}

export default function CsvToSqlPage() {
  return <CsvToSql />;
}
