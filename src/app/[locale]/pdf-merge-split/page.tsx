import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import PdfMerge from '@/components/converters/PdfMerge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'PDF Merge & Split',
    description:
      'Combine multiple PDFs into a single document in your browser with pdf-lib. Files never leave your device.',
    path: '/pdf-merge-split',
  });
}

export default function PdfMergeSplitPage() {
  return <PdfMerge />;
}
