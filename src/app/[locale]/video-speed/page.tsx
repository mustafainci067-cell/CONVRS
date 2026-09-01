import type { Metadata } from 'next';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export const metadata: Metadata = {
  title: 'Video Speed Changer — Convrs',
  description:
    'Adjust video playback speed — 0.5x slow motion, 1.25x, 1.5x, or 2x fast motion. 100% client-side processing with ffmpeg.',
};

export default function VideoSpeedPage() {
  return <VideoAudioTools mode="video-speed" />;
}