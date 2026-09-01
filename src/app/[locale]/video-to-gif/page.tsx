import type { Metadata } from 'next';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export const metadata: Metadata = {
  title: 'Video to GIF — Convrs',
  description:
    'Convert your short videos into animated GIFs instantly with adjustable FPS settings. 100% client-side processing.',
};

export default function VideoToGifPage() {
  return <VideoAudioTools mode="video-to-gif" />;
}
