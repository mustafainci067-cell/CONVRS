import type { Metadata } from 'next';
import MediaConverter from '@/components/converters/MediaConverter';

export const metadata: Metadata = {
  title: 'MP4 ↔ WebM — Convrs',
  description:
    'Convert MP4 video to WebM or WebM back to MP4 using ffmpeg in your browser.',
};

export default function Mp4ToWebmPage() {
  return <MediaConverter mode="mp4-to-webm" />;
}
