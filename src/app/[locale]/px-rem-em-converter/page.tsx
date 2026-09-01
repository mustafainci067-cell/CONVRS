import type { Metadata } from 'next';
import PxRemEmConverter from '@/components/converters/PxRemEmConverter';

export const metadata: Metadata = {
  title: 'PX ↔ REM/EM Converter — Convrs',
  description:
    'Convert CSS sizes between px, rem and em with an adjustable base font size, entirely client-side.',
};

export default function PxRemEmConverterPage() {
  return <PxRemEmConverter />;
}