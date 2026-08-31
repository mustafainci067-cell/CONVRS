import type { Metadata } from 'next';
import MediaConverter from '@/components/converters/MediaConverter';

export const metadata: Metadata = {
  title: 'WAV ↔ MP3 — Convrs',
  description:
    'Convert WAV audio to MP3 or MP3 back to WAV using ffmpeg in your browser.',
};

export default function WavToMp3Page() {
  return <MediaConverter mode="wav-to-mp3" />;
}
