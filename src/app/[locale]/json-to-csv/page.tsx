import type { Metadata } from 'next';
import DataConverter from '@/components/converters/DataConverter';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter — Convrs',
  description:
    'Convert JSON to CSV and CSV to JSON in your browser. No backend, no API, your data never leaves the device.',
};

export default function JsonToCsvPage() {
  return <DataConverter mode="json-to-csv" />;
}
