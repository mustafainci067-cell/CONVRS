import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import WordCounter from '@/components/converters/WordCounter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Word & Character Counter',
    description:
      'Count words, characters (with and without spaces), lines and paragraphs in real time as you type.',
    path: '/word-counter',
  });
}

export default function WordCounterPage() {
  return <WordCounter />;
}
