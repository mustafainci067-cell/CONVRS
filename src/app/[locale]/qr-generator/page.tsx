import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import QrGenerator from '@/components/converters/QrGenerator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'QR Code Generator',
    description:
      'Turn your text, link, or message into an instantly scannable QR code in your browser. 100% client-side.',
    path: '/qr-generator',
  });
}

export default function QrGeneratorPage() {
  return <QrGenerator />;
}
