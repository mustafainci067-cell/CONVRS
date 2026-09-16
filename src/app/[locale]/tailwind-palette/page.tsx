import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import TailwindPalette from '@/components/converters/TailwindPalette';
export const generateMetadata = generateToolMetadata("/tailwind-palette");

export default function TailwindPalettePage() {
  return (
    <>
      <TailwindPalette />
      <ToolJsonLd path="/tailwind-palette" />
      <ToolSeoContent path="/tailwind-palette" />
      <SEOContentBlock path="/tailwind-palette" />
    </>
  );
}

