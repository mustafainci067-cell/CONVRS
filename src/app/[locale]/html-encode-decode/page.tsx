import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import HtmlEncodeDecode from '@/components/converters/HtmlEncodeDecode';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'HTML Encode / Decode',
    description:
      'Escape HTML tags into entities like &lt; and &gt;, or decode them back into readable text. 100% client-side.',
    path: '/html-encode-decode',
  });
}

export default function HtmlEncodeDecodePage() {
  return <HtmlEncodeDecode />;
}
