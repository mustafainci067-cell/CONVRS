import type { Metadata } from 'next';
import MediaConverter from '@/components/converters/MediaConverter';

export const metadata: Metadata = {
  title: 'Video to MP3 — Convrs',
  description:
    'Extract the audio track from a video and download it as MP3 using ffmpeg in your browser.',
};

export default function VideoToMp3Page() {
  return <MediaConverter mode="video-to-mp3" />;
}
