import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import Base64Encoder from '@/components/converters/Base64Encoder';
export const generateMetadata = generateToolMetadata("/base64-encoder");

export default function Base64EncoderPage() {
  return (
    <>
      <Base64Encoder />
      <ToolJsonLd path="/base64-encoder" />
      <ToolSeoContent path="/base64-encoder" />
      <SEOContentBlock path="/base64-encoder" />
    </>
  );
}

