import type { Metadata } from 'next';
import ImageConverter from '@/components/converters/ImageConverter';

export const metadata: Metadata = {
  title: 'HEIC to JPG Converter — Convrs',
  description:
    'Convert Apple HEIC photos to JPG directly in your browser. No upload, 100% client-side.',
};

export default function HeicToJpgPage() {
  return <ImageConverter mode="heic-to-jpg" />;
}
