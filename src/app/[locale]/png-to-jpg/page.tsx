import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageConverter from '@/components/converters/ImageConverter';
export const generateMetadata = generateToolMetadata("/png-to-jpg");

export default function PngToJpgPage() {
  return (
    <>
      <ImageConverter mode="png-to-jpg" />
      <ToolJsonLd path="/png-to-jpg" />
      <ToolSeoContent path="/png-to-jpg" />
      <SEOContentBlock path="/png-to-jpg" />
    </>
  );
}

