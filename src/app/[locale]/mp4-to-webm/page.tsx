import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import MediaConverter from '@/components/converters/MediaConverter';
export const generateMetadata = generateToolMetadata("/mp4-to-webm");

export default function Mp4ToWebmPage() {
  return (
    <>
      <MediaConverter mode="mp4-to-webm" />
      <ToolJsonLd path="/mp4-to-webm" />
      <ToolSeoContent path="/mp4-to-webm" />
      <SEOContentBlock path="/mp4-to-webm" />
    </>
  );
}

