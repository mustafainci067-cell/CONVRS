import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import LoremIpsum from '@/components/converters/LoremIpsum';
export const generateMetadata = generateToolMetadata("/lorem-ipsum");

export default function LoremIpsumPage() {
  return (
    <>
      <LoremIpsum />
      <ToolJsonLd path="/lorem-ipsum" />
      <ToolSeoContent path="/lorem-ipsum" />
      <SEOContentBlock path="/lorem-ipsum" />
    </>
  );
}
