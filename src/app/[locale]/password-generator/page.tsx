import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import PasswordGenerator from '@/components/converters/PasswordGenerator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Password Generator',
    description:
      'Generate strong, randomly secure passwords with a length slider, character-type toggles and one-click copy. 100% client-side.',
    path: '/password-generator',
  });
}

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}
