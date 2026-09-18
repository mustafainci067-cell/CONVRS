import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import WatermarkAdder from '@/components/converters/WatermarkAdder';
export const generateMetadata = generateToolMetadata("/watermark-adder");

export default function WatermarkAdderPage() {
  return (
    <>
      <WatermarkAdder />
      <ToolJsonLd path="/watermark-adder" />
      <ToolSeoContent path="/watermark-adder" />
      <SEOContentBlock path="/watermark-adder" />
    </>
  );
}

