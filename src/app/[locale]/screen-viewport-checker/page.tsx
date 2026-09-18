import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ScreenViewportChecker from '@/components/converters/ScreenViewportChecker';
export const generateMetadata = generateToolMetadata("/screen-viewport-checker");

export default function ScreenViewportCheckerPage() {
  return (
    <>
      <ScreenViewportChecker />
      <ToolJsonLd path="/screen-viewport-checker" />
      <ToolSeoContent path="/screen-viewport-checker" />
      <SEOContentBlock path="/screen-viewport-checker" />
    </>
  );
}
