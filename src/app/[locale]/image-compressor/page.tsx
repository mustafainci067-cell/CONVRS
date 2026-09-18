import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageCompressor from '@/components/converters/ImageCompressor';
export const generateMetadata = generateToolMetadata("/image-compressor");

export default function ImageCompressorPage() {
  return (
    <>
      <ImageCompressor />
      <ToolJsonLd path="/image-compressor" />
      <ToolSeoContent path="/image-compressor" />
      <SEOContentBlock path="/image-compressor" />
    </>
  );
}

