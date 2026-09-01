import type { Metadata } from 'next';
import WatermarkAdder from '@/components/converters/WatermarkAdder';

export const metadata: Metadata = {
  title: 'Watermark Adder — Convrs',
  description:
    'Add a text watermark to your images with custom text, color, opacity, size and position — entirely in your browser.',
};

export default function WatermarkAdderPage() {
  return <WatermarkAdder />;
}
