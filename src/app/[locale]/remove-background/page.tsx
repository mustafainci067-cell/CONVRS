import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import RemoveBackground from '@/components/converters/RemoveBackground';
export const generateMetadata = generateToolMetadata("/remove-background");

export default function RemoveBackgroundPage() {
  return (
    <>
      <RemoveBackground />
      <ToolJsonLd path="/remove-background" />
      <ToolSeoContent path="/remove-background" />
      <SEOContentBlock path="/remove-background" />
    </>
  );
}

