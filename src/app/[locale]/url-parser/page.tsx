import type { Metadata } from 'next';
import UrlParser from '@/components/converters/UrlParser';

export const metadata: Metadata = {
  title: 'URL Parameter Parser — Convrs',
  description:
    'Break any URL into its parts and query parameters in a readable table, entirely client-side.',
};

export default function UrlParserPage() {
  return <UrlParser />;
}
