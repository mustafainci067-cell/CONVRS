import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import HashGenerator from '@/components/converters/HashGenerator';
export const generateMetadata = generateToolMetadata("/hash-generator");

export default function HashGeneratorPage() {
  return (
    <>
      <HashGenerator />
      <ToolJsonLd path="/hash-generator" />
      <ToolSeoContent path="/hash-generator" />
      <SEOContentBlock path="/hash-generator" />
    </>
  );
}

