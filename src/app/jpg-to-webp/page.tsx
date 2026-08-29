import type { Metadata } from 'next';
import ImageConverter from '@/components/converters/ImageConverter';

export const metadata: Metadata = {
  title: 'JPG to WebP Converter — Convrs',
  description:
    'Convert JPG images to lightweight WebP in your browser using WebAssembly. Nothing leaves your device.',
};

export default function JpgToWebpPage() {
  return <ImageConverter mode="jpg-to-webp" />;
}
