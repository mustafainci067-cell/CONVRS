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
    title: 'Volume Booster',
    description:
      'Boost the volume of quiet audio files by 1.5x, 2x, or 3x. Supports MP3 and WAV formats. 100% client-side.',
    path: '/volume-booster',
  });
}

export default function VolumeBoosterPage() {
  return <VideoAudioTools mode="volume-booster" />;
}
