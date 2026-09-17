import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import Base64Encoder from '@/components/converters/Base64Encoder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Base64 Encoder / Decoder',
    description:
      'Encode text into UTF-8-safe Base64, or decode Base64 back to readable text. Runs 100% in your browser, no upload needed.',
    path: '/base64-encoder',
  });
}

export default function Base64EncoderPage() {
  return <Base64Encoder />;
}
