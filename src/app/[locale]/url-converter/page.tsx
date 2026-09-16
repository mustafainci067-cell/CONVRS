import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import UrlConverter from '@/components/converters/UrlConverter';
export const generateMetadata = generateToolMetadata("/url-converter");

export default function UrlConverterPage() {
  return (
    <>
      <UrlConverter />
      <ToolJsonLd path="/url-converter" />
      <ToolSeoContent path="/url-converter" />
      <SEOContentBlock path="/url-converter" />
    </>
  );
}
