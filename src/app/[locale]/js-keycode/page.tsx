import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import JsKeyCode from '@/components/converters/JsKeyCode';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'JS KeyCode Viewer',
    description:
      'Press any key and see its keyCode, key and code values instantly. A quick reference tool for JavaScript developers.',
    path: '/js-keycode',
  });
}

export default function JsKeycodePage() {
  return <JsKeyCode />;
}
