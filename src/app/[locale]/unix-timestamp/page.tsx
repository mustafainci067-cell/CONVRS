import type { Metadata } from 'next';
import UnixTimestamp from '@/components/converters/UnixTimestamp';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Convrs',
  description:
    'Convert Unix epoch timestamps to readable dates, and dates back to Unix timestamps, entirely client-side.',
};

export default function UnixTimestampPage() {
  return <UnixTimestamp />;
}
