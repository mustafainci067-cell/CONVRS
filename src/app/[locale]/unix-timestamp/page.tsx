import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import UnixTimestamp from '@/components/converters/UnixTimestamp';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Unix Timestamp Converter',
    description:
      'Convert Unix epoch timestamps to readable dates, and dates back to Unix timestamps, in your browser.',
    path: '/unix-timestamp',
  });
}

export default function UnixTimestampPage() {
  return <UnixTimestamp />;
}
