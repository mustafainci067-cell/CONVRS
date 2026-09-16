import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import JwtDecoder from '@/components/converters/JwtDecoder';
export const generateMetadata = generateToolMetadata("/jwt-decoder");

export default function JwtDecoderPage() {
  return (
    <>
      <JwtDecoder />
      <ToolJsonLd path="/jwt-decoder" />
      <ToolSeoContent path="/jwt-decoder" />
      <SEOContentBlock path="/jwt-decoder" />
    </>
  );
}

