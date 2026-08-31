import type { Metadata } from 'next';
import XmlToJson from '@/components/converters/XmlToJson';

export const metadata: Metadata = {
  title: 'XML to JSON — Convrs',
  description: 'Convert XML to formatted JSON instantly with the browser native DOMParser, entirely client-side.',
};

export default function XmlToJsonPage() {
  return <XmlToJson />;
}