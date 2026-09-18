import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import DocxToPdf from '@/components/converters/DocxToPdf';
export const generateMetadata = generateToolMetadata("/docx-to-pdf");

export default function DocxToPdfPage() {
  return (
    <>
      <DocxToPdf />
      <ToolJsonLd path="/docx-to-pdf" />
      <ToolSeoContent path="/docx-to-pdf" />
      <SEOContentBlock path="/docx-to-pdf" />
    </>
  );
}

