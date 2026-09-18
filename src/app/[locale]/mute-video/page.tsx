import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VideoAudioTools from '@/components/converters/VideoAudioTools';
export const generateMetadata = generateToolMetadata("/mute-video");

export default function MuteVideoPage() {
  return (
    <>
      <VideoAudioTools mode="mute-video" />
      <ToolJsonLd path="/mute-video" />
      <ToolSeoContent path="/mute-video" />
      <SEOContentBlock path="/mute-video" />
    </>
  );
}

