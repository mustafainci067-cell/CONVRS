import type { Metadata } from 'next';
import UrlConverter from '@/components/converters/UrlConverter';

export const metadata: Metadata = {
  title: 'URL Converter — Convrs',
  description: 'Encode or decode URL percent-encoding instantly, entirely client-side.',
};

export default function UrlConverterPage() {
  return <UrlConverter />;
}