import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import HashGenerator from '@/components/converters/HashGenerator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Hash Generator',
    description:
      'Generate instant SHA-1, SHA-256, and SHA-512 hashes for your text with the Web Crypto API. 100% client-side.',
    path: '/hash-generator',
  });
}

export default function HashGeneratorPage() {
  return <HashGenerator />;
}
