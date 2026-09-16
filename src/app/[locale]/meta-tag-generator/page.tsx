import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import MetaTagGenerator from '@/components/converters/MetaTagGenerator';
export const generateMetadata = generateToolMetadata("/meta-tag-generator");

export default function MetaTagGeneratorPage() {
  return (
    <>
      <MetaTagGenerator />
      <ToolJsonLd path="/meta-tag-generator" />
      <ToolSeoContent path="/meta-tag-generator" />
      <SEOContentBlock path="/meta-tag-generator" />
    </>
  );
}

