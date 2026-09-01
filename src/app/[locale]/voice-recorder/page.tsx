import type { Metadata } from 'next';
import VoiceRecorder from '@/components/converters/VoiceRecorder';

export const metadata: Metadata = {
  title: 'Online Voice Recorder — Convrs',
  description:
    'Record audio from your microphone directly in the browser. Start, pause, resume and finish — download as WAV/WebM. 100% client-side.',
};

export default function VoiceRecorderPage() {
  return <VoiceRecorder />;
}