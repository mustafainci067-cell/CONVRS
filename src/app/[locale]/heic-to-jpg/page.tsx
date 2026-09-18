import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageConverter from '@/components/converters/ImageConverter';
export const generateMetadata = generateToolMetadata("/heic-to-jpg");

export default function HeicToJpgPage() {
  return (
    <>
      <ImageConverter mode="heic-to-jpg" />
      <ToolJsonLd path="/heic-to-jpg" />
      <ToolSeoContent path="/heic-to-jpg" />
      <SEOContentBlock path="/heic-to-jpg" />
    </>
  );
}

