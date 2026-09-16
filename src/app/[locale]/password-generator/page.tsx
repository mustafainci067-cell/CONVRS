import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import PasswordGenerator from '@/components/converters/PasswordGenerator';
export const generateMetadata = generateToolMetadata("/password-generator");

export default function PasswordGeneratorPage() {
  return (
    <>
      <PasswordGenerator />
      <ToolJsonLd path="/password-generator" />
      <ToolSeoContent path="/password-generator" />
      <SEOContentBlock path="/password-generator" />
    </>
  );
}
