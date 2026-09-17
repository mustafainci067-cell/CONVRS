import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ImageToBase64 from '@/components/converters/ImageToBase64';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Image to Base64 Converter',
    description:
      'Drop or pick an image and convert it instantly to a Base64 data URI, entirely in your browser. No upload required.',
    path: '/image-to-base64',
  });
}

export default function ImageToBase64Page() {
  return <ImageToBase64 />;
}
