import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import PdfToJpgConverter from '@/components/converters/PdfToJpgConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'PDF to JPG Converter',
    description:
      'Extract PDF pages as JPG, or combine multiple images into a single PDF. Runs 100% client-side with pdf.js and pdf-lib.',
    path: '/pdf-to-jpg',
  });
}

export default function PdfToJpgPage() {
  return <PdfToJpgConverter />;
}
