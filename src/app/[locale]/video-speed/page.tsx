import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VideoAudioTools from '@/components/converters/VideoAudioTools';
export const generateMetadata = generateToolMetadata("/video-speed");

export default function VideoSpeedPage() {
  return (
    <>
      <VideoAudioTools mode="video-speed" />
      <ToolJsonLd path="/video-speed" />
      <ToolSeoContent path="/video-speed" />
      <SEOContentBlock path="/video-speed" />
    </>
  );
}
