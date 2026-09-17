import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import PdfToText from '@/components/converters/PdfToText';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'PDF to Text Extractor',
    description:
      'Extract text from a PDF in your browser and copy or download it as .txt. 100% client-side, no upload.',
    path: '/pdf-to-text',
  });
}

export default function PdfToTextPage() {
  return <PdfToText />;
}
