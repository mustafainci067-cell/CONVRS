import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageResizer from '@/components/converters/ImageResizer';
export const generateMetadata = generateToolMetadata("/image-resizer");

export default function ImageResizerPage() {
  return (
    <>
      <ImageResizer />
      <ToolJsonLd path="/image-resizer" />
      <ToolSeoContent path="/image-resizer" />
      <SEOContentBlock path="/image-resizer" />
    </>
  );
}

