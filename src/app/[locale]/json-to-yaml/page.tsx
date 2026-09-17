import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import JsonToYaml from '@/components/converters/JsonToYaml';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'JSON to YAML Converter',
    description:
      'Convert JSON to YAML or YAML to JSON instantly in your browser. Nothing leaves your device.',
    path: '/json-to-yaml',
  });
}

export default function JsonToYamlPage() {
  return <JsonToYaml />;
}
