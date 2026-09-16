import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import CssJsMinifier from '@/components/converters/CssJsMinifier';
export const generateMetadata = generateToolMetadata("/css-js-minifier");

export default function CssJsMinifierPage() {
  return (
    <>
      <CssJsMinifier />
      <ToolJsonLd path="/css-js-minifier" />
      <ToolSeoContent path="/css-js-minifier" />
      <SEOContentBlock path="/css-js-minifier" />
    </>
  );
}
