import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import BoxShadowGenerator from '@/components/converters/BoxShadowGenerator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'CSS Box-Shadow Generator',
    description:
      'Visually create CSS box-shadow styles with live preview, adjustable sliders and instant code copy. No installation required.',
    path: '/box-shadow-generator',
  });
}

export default function BoxShadowGeneratorPage() {
  return <BoxShadowGenerator />;
}
