import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ScreenViewportChecker from '@/components/converters/ScreenViewportChecker';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Screen & Viewport Checker',
    description:
      'See your current screen resolution, window size (innerWidth/Height) and pixel ratio live, updating as you resize.',
    path: '/screen-viewport-checker',
  });
}

export default function ScreenViewportCheckerPage() {
  return <ScreenViewportChecker />;
}
