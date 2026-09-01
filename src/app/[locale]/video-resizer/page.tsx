import type { Metadata } from 'next';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export const metadata: Metadata = {
  title: 'Video Resizer / Cropper — Convrs',
  description:
    'Resize or crop videos for social media. Convert 16:9 horizontal to 9:16 vertical or use custom pixel dimensions. 100% client-side.',
};

export default function VideoResizerPage() {
  return <VideoAudioTools mode="video-resizer" />;
}