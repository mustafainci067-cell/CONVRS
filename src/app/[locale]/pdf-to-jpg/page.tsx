import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import PdfToJpgConverter from '@/components/converters/PdfToJpgConverter';
export const generateMetadata = generateToolMetadata("/pdf-to-jpg");

export default function PdfToJpgPage() {
  return (
    <>
      <PdfToJpgConverter />
      <ToolJsonLd path="/pdf-to-jpg" />
      <ToolSeoContent path="/pdf-to-jpg" />
      <SEOContentBlock path="/pdf-to-jpg" />
    </>
  );
}

