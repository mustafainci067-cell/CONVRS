import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import WatermarkAdder from '@/components/converters/WatermarkAdder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Watermark Adder',
    description:
      'Add a text watermark with custom color, opacity, size and position to any image. Runs in your browser.',
    path: '/watermark-adder',
  });
}

export default function WatermarkAdderPage() {
  return <WatermarkAdder />;
}
