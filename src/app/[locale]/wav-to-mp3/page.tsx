import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import MediaConverter from '@/components/converters/MediaConverter';
export const generateMetadata = generateToolMetadata("/wav-to-mp3");

export default function WavToMp3Page() {
  return (
    <>
      <MediaConverter mode="wav-to-mp3" />
      <ToolJsonLd path="/wav-to-mp3" />
      <ToolSeoContent path="/wav-to-mp3" />
      <SEOContentBlock path="/wav-to-mp3" />
    </>
  );
}

