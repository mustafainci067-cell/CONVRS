import type { Metadata } from 'next';
import RemoveBackground from '@/components/converters/RemoveBackground';

export const metadata: Metadata = {
  title: 'Remove Background — Convrs',
  description:
    'Remove the background from JPG, PNG and WebP images with an on-device AI model, entirely client-side.',
};

export default function RemoveBackgroundPage() {
  return <RemoveBackground />;
}
