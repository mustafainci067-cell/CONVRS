import type { Metadata } from 'next';
import BoxShadowGenerator from '@/components/converters/BoxShadowGenerator';

export const metadata: Metadata = {
  title: 'CSS Box-Shadow Generator — Convrs',
  description:
    'Visually create CSS box-shadow with live preview, adjustable sliders and one-click copy, entirely client-side.',
};

export default function BoxShadowGeneratorPage() {
  return <BoxShadowGenerator />;
}
