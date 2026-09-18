import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageCropper from '@/components/converters/ImageCropper';
export const generateMetadata = generateToolMetadata("/image-cropper");

export default function ImageCropperPage() {
  return (
    <>
      <ImageCropper />
      <ToolJsonLd path="/image-cropper" />
      <ToolSeoContent path="/image-cropper" />
      <SEOContentBlock path="/image-cropper" />
    </>
  );
}

