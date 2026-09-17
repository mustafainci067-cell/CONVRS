import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import SpeechToText from '@/components/converters/SpeechToText';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Speech to Text',
    description:
      'Transcribe your speech in real-time with the browser Web Speech API. Copy the transcribed text with one click. 100% client-side.',
    path: '/speech-to-text',
  });
}

export default function SpeechToTextPage() {
  return <SpeechToText />;
}
