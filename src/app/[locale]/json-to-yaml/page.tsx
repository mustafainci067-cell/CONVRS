import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import JsonToYaml from '@/components/converters/JsonToYaml';
export const generateMetadata = generateToolMetadata("/json-to-yaml");

export default function JsonToYamlPage() {
  return (
    <>
      <JsonToYaml />
      <ToolJsonLd path="/json-to-yaml" />
      <ToolSeoContent path="/json-to-yaml" />
      <SEOContentBlock path="/json-to-yaml" />
    </>
  );
}

