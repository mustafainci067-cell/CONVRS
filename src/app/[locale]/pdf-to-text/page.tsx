import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import PdfToText from '@/components/converters/PdfToText';
export const generateMetadata = generateToolMetadata("/pdf-to-text");

export default function PdfToTextPage() {
  return (
    <>
      <PdfToText />
      <ToolJsonLd path="/pdf-to-text" />
      <ToolSeoContent path="/pdf-to-text" />
      <SEOContentBlock path="/pdf-to-text" />
    </>
  );
}

