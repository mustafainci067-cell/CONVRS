import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import VoiceRecorder from '@/components/converters/VoiceRecorder';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Voice Recorder',
    description:
      'Record audio from your microphone in the browser with start, pause, resume and finish controls. Download as WAV/WebM.',
    path: '/voice-recorder',
  });
}

export default function VoiceRecorderPage() {
  return <VoiceRecorder />;
}
