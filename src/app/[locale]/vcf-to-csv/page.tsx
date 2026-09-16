import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import VcfToCsv from '@/components/converters/VcfToCsv';
export const generateMetadata = generateToolMetadata("/vcf-to-csv");

export default function VcfToCsvPage() {
  return (
    <>
      <VcfToCsv />
      <ToolJsonLd path="/vcf-to-csv" />
      <ToolSeoContent path="/vcf-to-csv" />
      <SEOContentBlock path="/vcf-to-csv" />
    </>
  );
}

