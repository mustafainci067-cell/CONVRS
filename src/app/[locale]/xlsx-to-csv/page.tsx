import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import XlsxToCsv from '@/components/converters/XlsxToCsv';
export const generateMetadata = generateToolMetadata("/xlsx-to-csv");

export default function XlsxToCsvPage() {
  return (
    <>
      <XlsxToCsv />
      <ToolJsonLd path="/xlsx-to-csv" />
      <ToolSeoContent path="/xlsx-to-csv" />
      <SEOContentBlock path="/xlsx-to-csv" />
    </>
  );
}
