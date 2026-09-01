import type { Metadata } from 'next';
import ColorPaletteExtractor from '@/components/converters/ColorPaletteExtractor';

export const metadata: Metadata = {
  title: 'Color Palette Extractor — Convrs',
  description:
    'Extract the dominant colors from any image and get a beautiful palette with HEX codes, plus exportable CSS variables — entirely client-side.',
};

export default function ColorPaletteExtractorPage() {
  return <ColorPaletteExtractor />;
}
