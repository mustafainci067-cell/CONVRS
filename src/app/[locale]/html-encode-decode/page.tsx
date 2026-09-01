import type { Metadata } from 'next';
import HtmlEncodeDecode from '@/components/converters/HtmlEncodeDecode';

export const metadata: Metadata = {
  title: 'HTML Encode / Decode — Convrs',
  description:
    'Escape HTML tags into entities or decode them back, entirely client-side.',
};

export default function HtmlEncodeDecodePage() {
  return <HtmlEncodeDecode />;
}