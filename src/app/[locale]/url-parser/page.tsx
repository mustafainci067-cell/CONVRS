import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import UrlParser from '@/components/converters/UrlParser';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'URL Parameter Parser',
    description:
      'Break any complex URL into its parts and query parameters in a readable table. Runs entirely in your browser.',
    path: '/url-parser',
  });
}

export default function UrlParserPage() {
  return <UrlParser />;
}
