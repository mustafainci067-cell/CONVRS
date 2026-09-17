import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import VcfToCsv from '@/components/converters/VcfToCsv';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'VCF (vCard) to CSV Converter',
    description:
      'Convert a vCard contact export to a CSV table, or a CSV contact list into an importable .vcf. 100% client-side.',
    path: '/vcf-to-csv',
  });
}

export default function VcfToCsvPage() {
  return <VcfToCsv />;
}
