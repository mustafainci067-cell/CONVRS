import type { Metadata } from 'next';
import VcfToCsv from '@/components/converters/VcfToCsv';

export const metadata: Metadata = {
  title: 'VCF (vCard) ↔ CSV — Convrs',
  description:
    'Convert a vCard (.vcf) contact export to a CSV table, or a CSV contact list to an importable .vcf file. Runs entirely in your browser.',
};

export default function VcfToCsvPage() {
  return <VcfToCsv />;
}
