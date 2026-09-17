import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import CssJsMinifier from '@/components/converters/CssJsMinifier';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'CSS / JS Minifier',
    description:
      'Strip comments and collapse whitespace from CSS or JavaScript, reducing it to a single minified line. Runs entirely in your browser.',
    path: '/css-js-minifier',
  });
}

export default function CssJsMinifierPage() {
  return <CssJsMinifier />;
}
