import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VideoAudioTools from '@/components/converters/VideoAudioTools';
export const generateMetadata = generateToolMetadata("/audio-trimmer");

export default function AudioTrimmerPage() {
  return (
    <>
      <VideoAudioTools mode="audio-trimmer" />
      <ToolJsonLd path="/audio-trimmer" />
      <ToolSeoContent path="/audio-trimmer" />
      <SEOContentBlock path="/audio-trimmer" />
    </>
  );
}

