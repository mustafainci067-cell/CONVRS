import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageConverter from '@/components/converters/ImageConverter';
export const generateMetadata = generateToolMetadata("/ico-to-png");

export default function IcoToPngPage() {
  return (
    <>
      <ImageConverter mode="ico-to-png" />
      <ToolJsonLd path="/ico-to-png" />
      <ToolSeoContent path="/ico-to-png" />
      <SEOContentBlock path="/ico-to-png" />
    </>
  );
}
