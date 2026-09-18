import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ExifCleaner from '@/components/converters/ExifCleaner';
export const generateMetadata = generateToolMetadata("/exif-cleaner");

export default function ExifCleanerPage() {
  return (
    <>
      <ExifCleaner />
      <ToolJsonLd path="/exif-cleaner" />
      <ToolSeoContent path="/exif-cleaner" />
      <SEOContentBlock path="/exif-cleaner" />
    </>
  );
}

