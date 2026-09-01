import type { Metadata } from 'next';
import UuidGenerator from '@/components/converters/UuidGenerator';

export const metadata: Metadata = {
  title: 'UUID Generator — Convrs',
  description:
    'Generate cryptographically random UUID v4 values with one click, entirely client-side.',
};

export default function UuidGeneratorPage() {
  return <UuidGenerator />;
}
