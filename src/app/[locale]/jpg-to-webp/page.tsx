import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageConverter from '@/components/converters/ImageConverter';
export const generateMetadata = generateToolMetadata("/jpg-to-webp");

export default function JpgToWebpPage() {
  return (
    <>
      <ImageConverter mode="jpg-to-webp" />
      <ToolJsonLd path="/jpg-to-webp" />
      <ToolSeoContent path="/jpg-to-webp" />
      <SEOContentBlock path="/jpg-to-webp" />
    </>
  );
}

