import type { Metadata } from 'next';
import LoremIpsum from '@/components/converters/LoremIpsum';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator — Convrs',
  description:
    'Generate placeholder Lorem Ipsum paragraphs, sentences or words instantly, entirely client-side.',
};

export default function LoremIpsumPage() {
  return <LoremIpsum />;
}