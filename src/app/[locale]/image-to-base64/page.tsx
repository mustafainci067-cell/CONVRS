import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageToBase64 from '@/components/converters/ImageToBase64';
export const generateMetadata = generateToolMetadata("/image-to-base64");

export default function ImageToBase64Page() {
  return (
    <>
      <ImageToBase64 />
      <ToolJsonLd path="/image-to-base64" />
      <ToolSeoContent path="/image-to-base64" />
      <SEOContentBlock path="/image-to-base64" />
    </>
  );
}
