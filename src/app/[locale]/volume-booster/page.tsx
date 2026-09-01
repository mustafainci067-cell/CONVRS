import type { Metadata } from 'next';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export const metadata: Metadata = {
  title: 'Volume Booster — Convrs',
  description:
    'Boost the volume of quiet audio files by 1.5x, 2x, or 3x. Supports MP3 and WAV formats. 100% client-side processing.',
};

export default function VolumeBoosterPage() {
  return <VideoAudioTools mode="volume-booster" />;
}
