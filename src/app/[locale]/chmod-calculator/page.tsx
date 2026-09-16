import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import ChmodCalculator from '@/components/converters/ChmodCalculator';
export const generateMetadata = generateToolMetadata("/chmod-calculator");

export default function ChmodCalculatorPage() {
  return (
    <>
      <ChmodCalculator />
      <ToolJsonLd path="/chmod-calculator" />
      <ToolSeoContent path="/chmod-calculator" />
      <SEOContentBlock path="/chmod-calculator" />
    </>
  );
}

