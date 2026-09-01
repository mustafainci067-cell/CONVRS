import type { Metadata } from 'next';
import MetaTagGenerator from '@/components/converters/MetaTagGenerator';

export const metadata: Metadata = {
  title: 'Meta Tag (SEO) Generator — Convrs',
  description:
    'Generate HTML meta tags for SEO and Open Graph with a live Google search preview, entirely client-side.',
};

export default function MetaTagGeneratorPage() {
  return <MetaTagGenerator />;
}
