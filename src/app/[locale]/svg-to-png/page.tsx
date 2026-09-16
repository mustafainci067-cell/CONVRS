import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageConverter from '@/components/converters/ImageConverter';
export const generateMetadata = generateToolMetadata("/svg-to-png");

export default function SvgToPngPage() {
  return (
    <>
      <ImageConverter mode="svg-to-png" />
      <ToolJsonLd path="/svg-to-png" />
      <ToolSeoContent path="/svg-to-png" />
      <SEOContentBlock path="/svg-to-png" />
    </>
  );
}

