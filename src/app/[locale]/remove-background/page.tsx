import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import RemoveBackground from '@/components/converters/RemoveBackground';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Remove Image Background',
    description:
      'Remove the background from JPG, PNG, and WebP images with an in-browser AI model. Get a transparent PNG. No upload.',
    path: '/remove-background',
  });
}

export default function RemoveBackgroundPage() {
  return <RemoveBackground />;
}
