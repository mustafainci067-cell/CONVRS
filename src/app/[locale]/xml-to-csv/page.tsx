import type { Metadata } from 'next';
import XmlToCsv from '@/components/converters/XmlToCsv';

export const metadata: Metadata = {
  title: 'XML ↔ CSV — Convrs',
  description:
    'Flatten repeated XML records into a CSV table, or wrap CSV rows into well-formed XML. All done in your browser.',
};

export default function XmlToCsvPage() {
  return <XmlToCsv />;
}
