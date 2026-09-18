import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import UuidGenerator from '@/components/converters/UuidGenerator';
export const generateMetadata = generateToolMetadata("/uuid-generator");

export default function UuidGeneratorPage() {
  return (
    <>
      <UuidGenerator />
      <ToolJsonLd path="/uuid-generator" />
      <ToolSeoContent path="/uuid-generator" />
      <SEOContentBlock path="/uuid-generator" />
    </>
  );
}

