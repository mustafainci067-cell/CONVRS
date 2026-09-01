import type { Metadata } from 'next';
import ChmodCalculator from '@/components/converters/ChmodCalculator';

export const metadata: Metadata = {
  title: 'Chmod Calculator — Convrs',
  description:
    'Convert Linux/Unix file permissions to numeric (755) and symbolic (-rwxr-xr-x) chmod values instantly, entirely client-side.',
};

export default function ChmodCalculatorPage() {
  return <ChmodCalculator />;
}
