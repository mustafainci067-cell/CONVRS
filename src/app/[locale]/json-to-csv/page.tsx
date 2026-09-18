import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import DataConverter from '@/components/converters/DataConverter';
export const generateMetadata = generateToolMetadata("/json-to-csv");

export default function JsonToCsvPage() {
  return (
    <>
      <DataConverter mode="json-to-csv" />
      <ToolJsonLd path="/json-to-csv" />
      <ToolSeoContent path="/json-to-csv" />
      <SEOContentBlock path="/json-to-csv" />
    </>
  );
}

