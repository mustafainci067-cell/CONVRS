import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import MarkdownToHtml from '@/components/converters/MarkdownToHtml';
export const generateMetadata = generateToolMetadata("/markdown-to-html");

export default function MarkdownToHtmlPage() {
  return (
    <>
      <MarkdownToHtml />
      <ToolJsonLd path="/markdown-to-html" />
      <ToolSeoContent path="/markdown-to-html" />
      <SEOContentBlock path="/markdown-to-html" />
    </>
  );
}
