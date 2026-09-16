import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ColorPaletteExtractor from '@/components/converters/ColorPaletteExtractor';
export const generateMetadata = generateToolMetadata("/color-palette-extractor");

export default function ColorPaletteExtractorPage() {
  return (
    <>
      <ColorPaletteExtractor />
      <ToolJsonLd path="/color-palette-extractor" />
      <ToolSeoContent path="/color-palette-extractor" />
      <SEOContentBlock path="/color-palette-extractor" />
    </>
  );
}

