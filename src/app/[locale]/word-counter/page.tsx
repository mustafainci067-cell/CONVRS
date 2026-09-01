import type { Metadata } from 'next';
import WordCounter from '@/components/converters/WordCounter';

export const metadata: Metadata = {
  title: 'Word & Character Counter — Convrs',
  description:
    'Count words, characters, lines and paragraphs in real time, entirely client-side.',
};

export default function WordCounterPage() {
  return <WordCounter />;
}