import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Video Speed Changer',
    description:
      'Adjust video playback speed — 0.5x slow motion or 2x fast motion — with ffmpeg in your browser. No upload.',
    path: '/video-speed',
  });
}

export default function VideoSpeedPage() {
  return <VideoAudioTools mode="video-speed" />;
}
