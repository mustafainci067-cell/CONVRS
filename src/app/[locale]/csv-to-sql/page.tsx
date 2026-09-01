import type { Metadata } from 'next';
import CsvToSql from '@/components/converters/CsvToSql';

export const metadata: Metadata = {
  title: 'CSV ↔ SQL — Convrs',
  description:
    'Turn a CSV file into INSERT SQL statements (with a custom table name), or parse SQL INSERTs back into CSV. Runs entirely in your browser.',
};

export default function CsvToSqlPage() {
  return <CsvToSql />;
}
