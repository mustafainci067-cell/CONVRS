import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import HtmlEncodeDecode from '@/components/converters/HtmlEncodeDecode';
export const generateMetadata = generateToolMetadata("/html-encode-decode");

export default function HtmlEncodeDecodePage() {
  return (
    <>
      <HtmlEncodeDecode />
      <ToolJsonLd path="/html-encode-decode" />
      <ToolSeoContent path="/html-encode-decode" />
      <SEOContentBlock path="/html-encode-decode" />
    </>
  );
}
