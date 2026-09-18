import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import JsKeyCode from '@/components/converters/JsKeyCode';
export const generateMetadata = generateToolMetadata("/js-keycode");

export default function JsKeyCodePage() {
  return (
    <>
      <JsKeyCode />
      <ToolJsonLd path="/js-keycode" />
      <ToolSeoContent path="/js-keycode" />
      <SEOContentBlock path="/js-keycode" />
    </>
  );
}

