import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import CaseConverter from '@/components/converters/CaseConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Case Converter',
    description:
      'Instantly convert any text to UPPERCASE, lowercase, Title Case, camelCase or snake_case in your browser.',
    path: '/case-converter',
  });
}

export default function CaseConverterPage() {
  return <CaseConverter />;
}
