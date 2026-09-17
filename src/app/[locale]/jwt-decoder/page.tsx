import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import JwtDecoder from '@/components/converters/JwtDecoder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'JWT Decoder',
    description:
      'Decode the header and payload of your JWT tokens directly in your browser and read them as JSON. No server involved.',
    path: '/jwt-decoder',
  });
}

export default function JwtDecoderPage() {
  return <JwtDecoder />;
}
