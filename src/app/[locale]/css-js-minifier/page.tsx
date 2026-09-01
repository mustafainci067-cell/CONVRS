import type { Metadata } from 'next';
import CssJsMinifier from '@/components/converters/CssJsMinifier';

export const metadata: Metadata = {
  title: 'CSS / JS Minifier — Convrs',
  description:
    'Strip comments and collapse whitespace from CSS or JavaScript with regex, entirely client-side.',
};

export default function CssJsMinifierPage() {
  return <CssJsMinifier />;
}