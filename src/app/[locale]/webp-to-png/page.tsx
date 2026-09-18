import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageConverter from '@/components/converters/ImageConverter';
export const generateMetadata = generateToolMetadata("/webp-to-png");

export default function WebpToPngPage() {
  return (
    <>
      <ImageConverter mode="webp-to-png" />
      <ToolJsonLd path="/webp-to-png" />
      <ToolSeoContent path="/webp-to-png" />
      <SEOContentBlock path="/webp-to-png" />
    </>
  );
}
