import type { Metadata } from 'next';
import SpeechToText from '@/components/converters/SpeechToText';

export const metadata: Metadata = {
  title: 'Speech to Text — Convrs',
  description:
    'Transcribe your speech in real-time with the browser Web Speech API. Copy the transcribed text with one click. 100% client-side.',
};

export default function SpeechToTextPage() {
  return <SpeechToText />;
}