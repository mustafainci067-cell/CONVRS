import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import PxRemEmConverter from '@/components/converters/PxRemEmConverter';
export const generateMetadata = generateToolMetadata("/px-rem-em-converter");

export default function PxRemEmConverterPage() {
  return (
    <>
      <PxRemEmConverter />
      <ToolJsonLd path="/px-rem-em-converter" />
      <ToolSeoContent path="/px-rem-em-converter" />
      <SEOContentBlock path="/px-rem-em-converter" />
    </>
  );
}
