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
    title: 'Video Resizer / Cropper',
    description:
      'Resize or crop your videos for social media. Convert 16:9 to 9:16 vertical, or use custom pixel dimensions. 100% client-side.',
    path: '/video-resizer',
  });
}

export default function VideoResizerPage() {
  return <VideoAudioTools mode="video-resizer" />;
}
