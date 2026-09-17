import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import DocxToPdf from '@/components/converters/DocxToPdf';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'DOCX to PDF Converter',
    description:
      'Read your Word (.docx) documents with mammoth and export them as PDF with pdf-lib. 100% client-side, files never leave your device.',
    path: '/docx-to-pdf',
  });
}

export default function DocxToPdfPage() {
  return <DocxToPdf />;
}
