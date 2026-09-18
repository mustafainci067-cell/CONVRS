import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import PdfMerge from '@/components/converters/PdfMerge';
export const generateMetadata = generateToolMetadata("/pdf-merge-split");

export default function PdfMergeSplitPage() {
  return (
    <>
      <PdfMerge />
      <ToolJsonLd path="/pdf-merge-split" />
      <ToolSeoContent path="/pdf-merge-split" />
      <SEOContentBlock path="/pdf-merge-split" />
    </>
  );
}

