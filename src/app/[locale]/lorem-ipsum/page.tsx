import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import LoremIpsum from '@/components/converters/LoremIpsum';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Lorem Ipsum Generator',
    description:
      'Generate placeholder paragraphs, sentences or words of classic Lorem Ipsum text on demand. 100% client-side.',
    path: '/lorem-ipsum',
  });
}

export default function LoremIpsumPage() {
  return <LoremIpsum />;
}
