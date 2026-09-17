import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ColorPaletteExtractor from '@/components/converters/ColorPaletteExtractor';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Color Palette Extractor',
    description:
      'Extract the dominant colors from any image as a palette with HEX codes and CSS. 100% client-side, your images never leave your device.',
    path: '/color-palette-extractor',
  });
}

export default function ColorPaletteExtractorPage() {
  return <ColorPaletteExtractor />;
}
