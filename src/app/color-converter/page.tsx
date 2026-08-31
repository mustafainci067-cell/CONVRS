import type { Metadata } from 'next';
import ColorConverter from '@/components/converters/ColorConverter';

export const metadata: Metadata = {
  title: 'Color Converter — Convrs',
  description:
    'Convert between HEX, RGB and HSL color codes instantly, entirely client-side.',
};

export default function ColorConverterPage() {
  return <ColorConverter />;
}
