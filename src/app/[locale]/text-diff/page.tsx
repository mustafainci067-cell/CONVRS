import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import TextDiff from '@/components/converters/TextDiff';
export const generateMetadata = generateToolMetadata("/text-diff");

export default function TextDiffPage() {
  return (
    <>
      <TextDiff />
      <ToolJsonLd path="/text-diff" />
      <ToolSeoContent path="/text-diff" />
      <SEOContentBlock path="/text-diff" />
    </>
  );
}

