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
    title: 'Audio Trimmer',
    description:
      'Trim your audio files (MP3/WAV) by specifying start and end times. Extract only the part you need. 100% client-side processing.',
    path: '/audio-trimmer',
  });
}

export default function AudioTrimmerPage() {
  return <VideoAudioTools mode="audio-trimmer" />;
}
