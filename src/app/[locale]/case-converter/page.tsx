import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import CaseConverter from '@/components/converters/CaseConverter';
export const generateMetadata = generateToolMetadata("/case-converter");

export default function CaseConverterPage() {
  return (
    <>
      <CaseConverter />
      <ToolJsonLd path="/case-converter" />
      <ToolSeoContent path="/case-converter" />
      <SEOContentBlock path="/case-converter" />
    </>
  );
}

