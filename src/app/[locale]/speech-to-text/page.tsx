import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import SpeechToText from '@/components/converters/SpeechToText';
export const generateMetadata = generateToolMetadata("/speech-to-text");

export default function SpeechToTextPage() {
  return (
    <>
      <SpeechToText />
      <ToolJsonLd path="/speech-to-text" />
      <ToolSeoContent path="/speech-to-text" />
      <SEOContentBlock path="/speech-to-text" />
    </>
  );
}
