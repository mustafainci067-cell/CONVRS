import type { Metadata } from 'next';
import ScreenViewportChecker from '@/components/converters/ScreenViewportChecker';

export const metadata: Metadata = {
  title: 'Screen / Viewport Checker — Convrs',
  description:
    'See your screen resolution, window size and pixel density live, entirely client-side.',
};

export default function ScreenViewportCheckerPage() {
  return <ScreenViewportChecker />;
}