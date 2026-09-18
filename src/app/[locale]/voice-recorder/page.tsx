import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VoiceRecorder from '@/components/converters/VoiceRecorder';
export const generateMetadata = generateToolMetadata("/voice-recorder");

export default function VoiceRecorderPage() {
  return (
    <>
      <VoiceRecorder />
      <ToolJsonLd path="/voice-recorder" />
      <ToolSeoContent path="/voice-recorder" />
      <SEOContentBlock path="/voice-recorder" />
    </>
  );
}
