import type { Metadata } from 'next';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export const metadata: Metadata = {
  title: 'Audio Trimmer — Convrs',
  description:
    'Trim your audio files (MP3/WAV) by specifying start and end times. Extract only the part you need. 100% client-side processing.',
};

export default function AudioTrimmerPage() {
  return <VideoAudioTools mode="audio-trimmer" />;
}
