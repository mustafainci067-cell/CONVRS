import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import PxRemEmConverter from '@/components/converters/PxRemEmConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'PX to REM/EM Converter',
    description:
      'Convert between px, rem and em sizes instantly, with an adjustable base font size (default 16px). No backend needed.',
    path: '/px-rem-em-converter',
  });
}

export default function PxRemEmConverterPage() {
  return <PxRemEmConverter />;
}
