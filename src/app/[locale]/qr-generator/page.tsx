import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import QrGenerator from '@/components/converters/QrGenerator';
export const generateMetadata = generateToolMetadata("/qr-generator");

export default function QrGeneratorPage() {
  return (
    <>
      <QrGenerator />
      <ToolJsonLd path="/qr-generator" />
      <ToolSeoContent path="/qr-generator" />
      <SEOContentBlock path="/qr-generator" />
    </>
  );
}

