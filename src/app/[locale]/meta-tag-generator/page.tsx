import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import MetaTagGenerator from '@/components/converters/MetaTagGenerator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Meta Tag (SEO) Generator',
    description:
      'Generate HTML meta and Open Graph tags with a live Google search preview. Runs 100% client-side.',
    path: '/meta-tag-generator',
  });
}

export default function MetaTagGeneratorPage() {
  return <MetaTagGenerator />;
}
