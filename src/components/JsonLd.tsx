// Genel JSON-LD (schema.org) script yayicisi — server component.
// Sayfa gövdesine <script type="application/ld+json"> enjekte eder.
// `</script>`'i kirma riskine karsi HTML ozel karakterleri kaçar.
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}