import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import XmlToJson from '@/components/converters/XmlToJson';
export const generateMetadata = generateToolMetadata("/xml-to-json");

export default function XmlToJsonPage() {
  return (
    <>
      <XmlToJson />
      <ToolJsonLd path="/xml-to-json" />
      <ToolSeoContent path="/xml-to-json" />
      <SEOContentBlock path="/xml-to-json" />
    </>
  );
}
