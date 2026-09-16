import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import MediaConverter from '@/components/converters/MediaConverter';
export const generateMetadata = generateToolMetadata("/video-to-mp3");

export default function VideoToMp3Page() {
  return (
    <>
      <MediaConverter mode="video-to-mp3" />
      <ToolJsonLd path="/video-to-mp3" />
      <ToolSeoContent path="/video-to-mp3" />
      <SEOContentBlock path="/video-to-mp3" />
    </>
  );
}

