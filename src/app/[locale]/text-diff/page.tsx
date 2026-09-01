import type { Metadata } from 'next';
import TextDiff from '@/components/converters/TextDiff';

export const metadata: Metadata = {
  title: 'Text Diff Checker — Convrs',
  description:
    'Compare two texts and highlight added, removed and changed lines side by side, entirely client-side.',
};

export default function TextDiffPage() {
  return <TextDiff />;
}
