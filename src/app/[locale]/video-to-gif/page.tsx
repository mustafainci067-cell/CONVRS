import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VideoAudioTools from '@/components/converters/VideoAudioTools';
export const generateMetadata = generateToolMetadata("/video-to-gif");

export default function VideoToGifPage() {
  return (
    <>
      <VideoAudioTools mode="video-to-gif" />
      <ToolJsonLd path="/video-to-gif" />
      <ToolSeoContent path="/video-to-gif" />
      <SEOContentBlock path="/video-to-gif" />
    </>
  );
}

