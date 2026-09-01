import type { Metadata } from 'next';
import ImageToBase64 from '@/components/converters/ImageToBase64';

export const metadata: Metadata = {
  title: 'Image to Base64 — Convrs',
  description:
    'Convert any image to a Base64 data URI instantly, entirely in your browser.',
};

export default function ImageToBase64Page() {
  return <ImageToBase64 />;
}