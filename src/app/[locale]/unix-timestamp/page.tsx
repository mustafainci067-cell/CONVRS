import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import UnixTimestamp from '@/components/converters/UnixTimestamp';
export const generateMetadata = generateToolMetadata("/unix-timestamp");

export default function UnixTimestampPage() {
  return (
    <>
      <UnixTimestamp />
      <ToolJsonLd path="/unix-timestamp" />
      <ToolSeoContent path="/unix-timestamp" />
      <SEOContentBlock path="/unix-timestamp" />
    </>
  );
}

