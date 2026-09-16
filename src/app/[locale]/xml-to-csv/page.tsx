import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import XmlToCsv from '@/components/converters/XmlToCsv';
export const generateMetadata = generateToolMetadata("/xml-to-csv");

export default function XmlToCsvPage() {
  return (
    <>
      <XmlToCsv />
      <ToolJsonLd path="/xml-to-csv" />
      <ToolSeoContent path="/xml-to-csv" />
      <SEOContentBlock path="/xml-to-csv" />
    </>
  );
}

