import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ExifCleaner from '@/components/converters/ExifCleaner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'EXIF Metadata Cleaner',
    description:
      'Inspect and strip hidden EXIF metadata like GPS location, device and date from your photos. Runs 100% in your browser.',
    path: '/exif-cleaner',
  });
}

export default function ExifCleanerPage() {
  return <ExifCleaner />;
}
