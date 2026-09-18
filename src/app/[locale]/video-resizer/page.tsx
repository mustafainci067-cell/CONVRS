import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VideoAudioTools from '@/components/converters/VideoAudioTools';
export const generateMetadata = generateToolMetadata("/video-resizer");

export default function VideoResizerPage() {
  return (
    <>
      <VideoAudioTools mode="video-resizer" />
      <ToolJsonLd path="/video-resizer" />
      <ToolSeoContent path="/video-resizer" />
      <SEOContentBlock path="/video-resizer" />
    </>
  );
}
