import type { Metadata } from 'next';
import CaseConverter from '@/components/converters/CaseConverter';

export const metadata: Metadata = {
  title: 'Case Converter — Convrs',
  description:
    'Instantly convert text to UPPERCASE, lowercase, Title Case, camelCase and snake_case, entirely client-side.',
};

export default function CaseConverterPage() {
  return <CaseConverter />;
}
