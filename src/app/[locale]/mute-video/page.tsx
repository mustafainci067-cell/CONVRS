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
    title: 'Mute Video',
    description:
      'Remove the audio track from your video completely and export a silent video. Runs 100% client-side with ffmpeg.',
    path: '/mute-video',
  });
}

export default function MuteVideoPage() {
  return <VideoAudioTools mode="mute-video" />;
}
