import type { Metadata } from 'next';
import JsonFormatter from '@/components/converters/JsonFormatter';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator — Convrs',
  description:
    'Format, validate and minify JSON instantly, with clear errors — entirely client-side.',
};

export default function JsonFormatterPage() {
  return <JsonFormatter />;
}
