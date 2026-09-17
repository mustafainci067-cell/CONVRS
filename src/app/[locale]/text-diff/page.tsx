import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import TextDiff from '@/components/converters/TextDiff';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Text Diff Checker',
    description:
      'Compare two texts side by side with highlighted added, removed and changed lines. Runs in your browser, no upload.',
    path: '/text-diff',
  });
}

export default function TextDiffPage() {
  return <TextDiff />;
}
