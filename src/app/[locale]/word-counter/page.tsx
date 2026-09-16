import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import WordCounter from '@/components/converters/WordCounter';
export const generateMetadata = generateToolMetadata("/word-counter");

export default function WordCounterPage() {
  return (
    <>
      <WordCounter />
      <ToolJsonLd path="/word-counter" />
      <ToolSeoContent path="/word-counter" />
      <SEOContentBlock path="/word-counter" />
    </>
  );
}
