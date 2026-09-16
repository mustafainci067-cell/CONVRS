import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import JsonFormatter from '@/components/converters/JsonFormatter';
export const generateMetadata = generateToolMetadata("/json-formatter");

export default function JsonFormatterPage() {
  return (
    <>
      <JsonFormatter />
      <ToolJsonLd path="/json-formatter" />
      <ToolSeoContent path="/json-formatter" />
      <SEOContentBlock path="/json-formatter" />
    </>
  );
}

