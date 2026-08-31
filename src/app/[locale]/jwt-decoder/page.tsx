import type { Metadata } from 'next';
import JwtDecoder from '@/components/converters/JwtDecoder';

export const metadata: Metadata = {
  title: 'JWT Decoder — Convrs',
  description:
    'Decode a JWT token and read its Header and Payload as formatted JSON, 100% client-side.',
};

export default function JwtDecoderPage() {
  return <JwtDecoder />;
}
