import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Video to GIF Converter',
    description:
      'Convert your short videos into animated GIFs instantly with adjustable FPS settings. Runs 100% client-side.',
    path: '/video-to-gif',
  });
}

export default function VideoToGifPage() {
  return <VideoAudioTools mode="video-to-gif" />;
}
