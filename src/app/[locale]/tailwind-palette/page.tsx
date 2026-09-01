import type { Metadata } from 'next';
import TailwindPalette from '@/components/converters/TailwindPalette';

export const metadata: Metadata = {
  title: 'Tailwind Color Palette — Convrs',
  description:
    'Generate Tailwind-style color shades (50 → 950) from any HEX color and copy them with a click, entirely client-side.',
};

export default function TailwindPalettePage() {
  return <TailwindPalette />;
}
