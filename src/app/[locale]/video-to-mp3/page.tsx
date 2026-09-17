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
    title: 'Video to MP3 Extractor',
    description:
      'Extract audio from videos with ffmpeg (in your browser) and export it as MP3. No upload, no server.',
    path: '/video-to-mp3',
  });
}

export default function VideoToMp3Page() {
  return <MediaConverter mode="video-to-mp3" />;
}
