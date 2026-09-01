import type { Metadata } from 'next';
import JsonToYaml from '@/components/converters/JsonToYaml';

export const metadata: Metadata = {
  title: 'JSON ↔ YAML — Convrs',
  description:
    'Convert JSON to YAML or YAML to JSON instantly in your browser. No server, no upload — 100% client-side.',
};

export default function JsonToYamlPage() {
  return <JsonToYaml />;
}
