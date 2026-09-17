import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import MediaConverter from '@/components/converters/MediaConverter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'WAV to MP3 Converter',
    description:
      'Convert WAV audio to MP3, or MP3 back to WAV, with ffmpeg in your browser. No upload, no server.',
    path: '/wav-to-mp3',
  });
}

export default function WavToMp3Page() {
  return <MediaConverter mode="wav-to-mp3" />;
}
