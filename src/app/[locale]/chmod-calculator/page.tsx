import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ChmodCalculator from '@/components/converters/ChmodCalculator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Chmod Calculator',
    description:
      'Convert Linux file permissions to numeric (755) and symbolic (-rwxr-xr-x) chmod values instantly in your browser.',
    path: '/chmod-calculator',
  });
}

export default function ChmodCalculatorPage() {
  return <ChmodCalculator />;
}
