import type { Metadata } from 'next';
import PasswordGenerator from '@/components/converters/PasswordGenerator';

export const metadata: Metadata = {
  title: 'Password Generator — Convrs',
  description:
    'Generate strong, cryptographically random passwords instantly, entirely client-side.',
};

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}