import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VideoAudioTools from '@/components/converters/VideoAudioTools';
export const generateMetadata = generateToolMetadata("/volume-booster");

export default function VolumeBoosterPage() {
  return (
    <>
      <VideoAudioTools mode="volume-booster" />
      <ToolJsonLd path="/volume-booster" />
      <ToolSeoContent path="/volume-booster" />
      <SEOContentBlock path="/volume-booster" />
    </>
  );
}

