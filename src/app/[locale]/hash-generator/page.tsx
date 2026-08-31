import type { Metadata } from 'next';
import HashGenerator from '@/components/converters/HashGenerator';

export const metadata: Metadata = {
  title: 'Hash Generator — Convrs',
  description:
    'Generate SHA-1, SHA-256 and SHA-512 hashes of any text using the browser Web Crypto API.',
};

export default function HashGeneratorPage() {
  return <HashGenerator />;
}
