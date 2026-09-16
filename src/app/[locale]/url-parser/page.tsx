import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import UrlParser from '@/components/converters/UrlParser';
export const generateMetadata = generateToolMetadata("/url-parser");

export default function UrlParserPage() {
  return (
    <>
      <UrlParser />
      <ToolJsonLd path="/url-parser" />
      <ToolSeoContent path="/url-parser" />
      <SEOContentBlock path="/url-parser" />
    </>
  );
}

