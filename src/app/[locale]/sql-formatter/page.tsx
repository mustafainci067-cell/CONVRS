import type { Metadata } from 'next';
import SqlFormatter from '@/components/converters/SqlFormatter';

export const metadata: Metadata = {
  title: 'SQL Format / Minifier — Convrs',
  description:
    'Format or minify SQL queries instantly with syntax-aware indentation, entirely client-side.',
};

export default function SqlFormatterPage() {
  return <SqlFormatter />;
}
