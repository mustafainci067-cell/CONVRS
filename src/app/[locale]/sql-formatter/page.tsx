import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import SqlFormatter from '@/components/converters/SqlFormatter';
export const generateMetadata = generateToolMetadata("/sql-formatter");

export default function SqlFormatterPage() {
  return (
    <>
      <SqlFormatter />
      <ToolJsonLd path="/sql-formatter" />
      <ToolSeoContent path="/sql-formatter" />
      <SEOContentBlock path="/sql-formatter" />
    </>
  );
}

