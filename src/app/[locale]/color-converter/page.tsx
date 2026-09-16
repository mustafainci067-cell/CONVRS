import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ColorConverter from '@/components/converters/ColorConverter';
export const generateMetadata = generateToolMetadata("/color-converter");

export default function ColorConverterPage() {
  return (
    <>
      <ColorConverter />
      <ToolJsonLd path="/color-converter" />
      <ToolSeoContent path="/color-converter" />
      <SEOContentBlock path="/color-converter" />
    </>
  );
}

