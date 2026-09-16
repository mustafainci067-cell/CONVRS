import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ImageFilters from '@/components/converters/ImageFilters';
export const generateMetadata = generateToolMetadata("/image-filters");

export default function ImageFiltersPage() {
  return (
    <>
      <ImageFilters />
      <ToolJsonLd path="/image-filters" />
      <ToolSeoContent path="/image-filters" />
      <SEOContentBlock path="/image-filters" />
    </>
  );
}

