import type { Metadata } from 'next';
import JsKeyCode from '@/components/converters/JsKeyCode';

export const metadata: Metadata = {
  title: 'JS KeyCode Viewer — Convrs',
  description:
    'Press any key and see its event.keyCode, event.key and event.code values live, entirely client-side.',
};

export default function JsKeyCodePage() {
  return <JsKeyCode />;
}
