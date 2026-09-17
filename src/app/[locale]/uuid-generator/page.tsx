import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import UuidGenerator from '@/components/converters/UuidGenerator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'UUID Generator',
    description:
      "Generate cryptographically random UUID v4 values with one click using your browser's Web Crypto API.",
    path: '/uuid-generator',
  });
}

export default function UuidGeneratorPage() {
  return <UuidGenerator />;
}
