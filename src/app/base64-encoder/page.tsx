import type { Metadata } from 'next';
import Base64Encoder from '@/components/converters/Base64Encoder';

export const metadata: Metadata = {
  title: 'Base64 Encoder / Decoder — Convrs',
  description: 'Encode text to Base64 or decode Base64 back to text, entirely client-side.',
};

export default function Base64EncoderPage() {
  return <Base64Encoder />;
}
