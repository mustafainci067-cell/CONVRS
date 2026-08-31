import type { Metadata } from 'next';
import QrGenerator from '@/components/converters/QrGenerator';

export const metadata: Metadata = {
  title: 'QR Code Generator — Convrs',
  description: 'Generate scannable QR codes from any text or URL, entirely client-side.',
};

export default function QrGeneratorPage() {
  return <QrGenerator />;
}
