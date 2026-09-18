import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import BoxShadowGenerator from '@/components/converters/BoxShadowGenerator';
export const generateMetadata = generateToolMetadata("/box-shadow-generator");

export default function BoxShadowGeneratorPage() {
  return (
    <>
      <BoxShadowGenerator />
      <ToolJsonLd path="/box-shadow-generator" />
      <ToolSeoContent path="/box-shadow-generator" />
      <SEOContentBlock path="/box-shadow-generator" />
    </>
  );
}

