import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import UrlConverter from '@/components/converters/UrlConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'URL Encoder / Decoder',
    description:
      'Encode/decode URLs instantly. The two fields stay in sync; data never leaves your device. 100% client-side.',
    path: '/url-converter',
  });
}

export default function UrlConverterPage() {
  return <UrlConverter />;
}
