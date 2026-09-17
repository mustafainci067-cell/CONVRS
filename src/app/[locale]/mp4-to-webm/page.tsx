import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import MediaConverter from '@/components/converters/MediaConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'MP4 to WebM Converter',
    description:
      'Convert MP4 video to WebM or WebM back to MP4 using ffmpeg in your browser. No upload, no server.',
    path: '/mp4-to-webm',
  });
}

export default function Mp4ToWebmPage() {
  return <MediaConverter mode="mp4-to-webm" />;
}
