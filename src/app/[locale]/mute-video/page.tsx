import type { Metadata } from 'next';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export const metadata: Metadata = {
  title: 'Mute Video — Convrs',
  description:
    'Remove the audio track from your video completely. Export a silent video in the same format. 100% client-side processing.',
};

export default function MuteVideoPage() {
  return <VideoAudioTools mode="mute-video" />;
}
