import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import CsvToSql from '@/components/converters/CsvToSql';
export const generateMetadata = generateToolMetadata("/csv-to-sql");

export default function CsvToSqlPage() {
  return (
    <>
      <CsvToSql />
      <ToolJsonLd path="/csv-to-sql" />
      <ToolSeoContent path="/csv-to-sql" />
      <SEOContentBlock path="/csv-to-sql" />
    </>
  );
}

