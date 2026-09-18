import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import XlsxToJson from '@/components/converters/XlsxToJson';
export const generateMetadata = generateToolMetadata("/xlsx-to-json");

export default function XlsxToJsonPage() {
  return (
    <>
      <XlsxToJson />
      <ToolJsonLd path="/xlsx-to-json" />
      <ToolSeoContent path="/xlsx-to-json" />
      <SEOContentBlock path="/xlsx-to-json" />
    </>
  );
}

