import type { Metadata } from 'next';
import ExifCleaner from '@/components/converters/ExifCleaner';

export const metadata: Metadata = {
  title: 'EXIF Metadata Cleaner — Convrs',
  description:
    'Inspect and strip hidden EXIF metadata like GPS location, device and date from your photos to protect your privacy — entirely client-side.',
};

export default function ExifCleanerPage() {
  return <ExifCleaner />;
}
