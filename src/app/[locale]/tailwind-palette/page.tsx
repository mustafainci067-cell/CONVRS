import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import TailwindPalette from '@/components/converters/TailwindPalette';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Tailwind Color Palette Generator',
    description:
      'Generate Tailwind-style 50-950 shades from any HEX color and copy them with a click. 100% client-side.',
    path: '/tailwind-palette',
  });
}

export default function TailwindPalettePage() {
  return <TailwindPalette />;
}
