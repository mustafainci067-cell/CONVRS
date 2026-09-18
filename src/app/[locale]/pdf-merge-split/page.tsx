<<<<<<< HEAD
import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import PdfMerge from '@/components/converters/PdfMerge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'PDF Merge & Split',
    description:
      'Combine multiple PDFs into a single document in your browser with pdf-lib. Files never leave your device.',
    path: '/pdf-merge-split',
  });
}

const seoContent: Record<string, { title: string, what: string, howTitle: string, steps: string[], whyTitle: string, why: string[], faqTitle: string, faqs: {q: string, a: string}[] }> = {
  en: {
    title: "About PDF Merge & Split",
    what: "Our PDF Merge & Split tool allows you to easily combine multiple PDF files into a single document or separate pages without relying on cloud services. Built entirely with robust client-side libraries, it offers bank-grade privacy by never uploading your sensitive PDFs to external servers.",
    howTitle: "How to Merge or Split PDFs",
    steps: [
      "Select multiple PDF files from your device to merge them into one.",
      "Rearrange the order of the files if necessary before processing.",
      "Click the merge or split button, and download your new PDF instantly."
    ],
    whyTitle: "Why Use Our Zero-Backend PDF Tool?",
    why: [
      "Absolute Privacy: Since there's no server upload, nobody else can access your confidential documents.",
      "Instant Processing: Skipping the upload and download times means near-instant results.",
      "High Fidelity: The structure and quality of your PDFs remain intact."
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Is it safe to merge confidential documents here?", a: "Yes, 100%. Because our tool is zero-backend, your browser does all the work locally. Your files are never transmitted over the internet." },
      { q: "Are there any file size limits?", a: "Only the limits of your device's memory. Since there's no cloud server to restrict you, you can merge large files freely." }
    ]
  },
  tr: {
    title: "PDF Birleştirme ve Ayırma Hakkında",
    what: "PDF Birleştirme ve Ayırma aracımız, birden fazla PDF dosyasını tek bir belgede birleştirmenize veya sayfaları ayırmanıza olanak tanır. Tamamen istemci tarafı (client-side) kütüphanelerle oluşturulmuş olup, hassas PDF'lerinizi asla harici sunuculara yüklemeden banka düzeyinde gizlilik sunar.",
    howTitle: "PDF'ler Nasıl Birleştirilir veya Ayrılır?",
    steps: [
      "Tek bir belgede birleştirmek için cihazınızdan birden fazla PDF dosyası seçin.",
      "Gerekirse işlemi başlatmadan önce dosyaların sırasını yeniden düzenleyin.",
      "Birleştir veya ayır düğmesine tıklayın ve yeni PDF'nizi anında indirin."
    ],
    whyTitle: "Neden Zero-Backend PDF Aracımızı Kullanmalısınız?",
    why: [
      "Mutlak Gizlilik: Sunucu yüklemesi olmadığı için gizli belgelerinize sizden başkası erişemez.",
      "Anında İşlem: Yükleme ve indirme sürelerini atlamak, anında sonuç anlamına gelir.",
      "Yüksek Kalite: PDF'lerinizin yapısı ve kalitesi bozulmadan korunur."
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      { q: "Gizli belgeleri burada birleştirmek güvenli mi?", a: "Evet, %100. Aracımız sıfır sunucu (zero-backend) olduğu için tüm işi tarayıcınız yerel olarak yapar. Dosyalarınız asla internet üzerinden iletilmez." },
      { q: "Dosya boyutu sınırları var mı?", a: "Sadece cihazınızın bellek sınırları geçerlidir. Sizi kısıtlayacak bir bulut sunucusu olmadığı için büyük dosyaları özgürce birleştirebilirsiniz." }
    ]
  },
  de: {
    title: "Über PDF Merge & Split",
    what: "Mit unserem PDF Merge & Split-Tool können Sie problemlos mehrere PDF-Dateien zu einem einzigen Dokument zusammenführen oder Seiten trennen, ohne sich auf Cloud-Dienste verlassen zu müssen. Es bietet datenschutz auf Bankenniveau, da Ihre sensiblen PDFs niemals auf externe Server hochgeladen werden.",
    howTitle: "So führen Sie PDFs zusammen oder trennen sie",
    steps: [
      "Wählen Sie mehrere PDF-Dateien von Ihrem Gerät aus, um sie zu einer einzigen zusammenzuführen.",
      "Ordnen Sie die Reihenfolge der Dateien gegebenenfalls neu, bevor Sie fortfahren.",
      "Klicken Sie auf die Schaltfläche zum Zusammenführen oder Trennen und laden Sie Ihre neue PDF-Datei sofort herunter."
    ],
    whyTitle: "Warum unser Zero-Backend-PDF-Tool verwenden?",
    why: [
      "Absolute Privatsphäre: Da es keinen Server-Upload gibt, kann niemand sonst auf Ihre vertraulichen Dokumente zugreifen.",
      "Sofortige Verarbeitung: Da keine Upload- und Download-Zeiten anfallen, erhalten Sie fast sofortige Ergebnisse.",
      "Hohe Wiedergabetreue: Die Struktur und Qualität Ihrer PDFs bleiben erhalten."
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Ist es sicher, vertrauliche Dokumente hier zusammenzuführen?", a: "Ja, 100%. Da unser Tool ein Zero-Backend-Tool ist, erledigt Ihr Browser die gesamte Arbeit lokal." },
      { q: "Gibt es Dateigrößenbeschränkungen?", a: "Nur die Grenzen des Speichers Ihres Geräts. Da es keinen Cloud-Server gibt, der Sie einschränkt, können Sie große Dateien frei zusammenführen." }
    ]
  },
  es: {
    title: "Acerca de Combinar y dividir PDF",
    what: "Nuestra herramienta de combinación y división de PDF le permite combinar fácilmente varios archivos PDF en un solo documento o separar páginas sin depender de los servicios en la nube. Ofrece privacidad de nivel bancario al no subir nunca sus archivos PDF confidenciales a servidores externos.",
    howTitle: "Cómo combinar o dividir archivos PDF",
    steps: [
      "Seleccione varios archivos PDF de su dispositivo para combinarlos en uno solo.",
      "Reorganice el orden de los archivos si es necesario antes de procesarlos.",
      "Haga clic en el botón combinar o dividir y descargue su nuevo PDF al instante."
    ],
    whyTitle: "¿Por qué utilizar nuestra herramienta PDF de cero servidores?",
    why: [
      "Privacidad absoluta: dado que no hay carga en el servidor, nadie más puede acceder a sus documentos confidenciales.",
      "Procesamiento instantáneo: omitir los tiempos de carga y descarga significa resultados casi instantáneos.",
      "Alta fidelidad: la estructura y la calidad de sus archivos PDF permanecen intactas."
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Es seguro combinar documentos confidenciales aquí?", a: "Sí, 100%. Debido a que nuestra herramienta es zero-backend, su navegador hace todo el trabajo localmente. Sus archivos nunca se transmiten por Internet." },
      { q: "¿Existen límites de tamaño de archivo?", a: "Solo los límites de la memoria de su dispositivo. Como no hay un servidor en la nube que lo restrinja, puede combinar archivos grandes libremente." }
    ]
  }
};

export default async function PdfMergeSplitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = seoContent[locale] || seoContent.en;

  return (
    <div className="flex flex-col gap-12">
      <PdfMerge />
      
      {/* SEO Content Section */}
      <section className="mx-auto w-full max-w-3xl space-y-8 px-4 text-zinc-600 dark:text-zinc-400">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{content.title}</h2>
          <p className="leading-relaxed">{content.what}</p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{content.howTitle}</h3>
          <ol className="list-inside list-decimal space-y-2">
            {content.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{content.whyTitle}</h3>
          <ul className="list-inside list-disc space-y-2">
            {content.why.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{content.faqTitle}</h3>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <div key={i}>
                <h4 className="font-medium text-zinc-800 dark:text-zinc-200">{faq.q}</h4>
                <p className="mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
=======
import ToolJsonLd from "@/components/ToolJsonLd";
import ToolSeoContent from "@/components/ToolSeoContent";
import SEOContentBlock from "@/components/SEOContentBlock";
import { generateToolMetadata } from "@/i18n/toolMetadata";
import PdfMerge from '@/components/converters/PdfMerge';
export const generateMetadata = generateToolMetadata("/pdf-merge-split");

export default function PdfMergeSplitPage() {
  return (
    <>
      <PdfMerge />
      <ToolJsonLd path="/pdf-merge-split" />
      <ToolSeoContent path="/pdf-merge-split" />
      <SEOContentBlock path="/pdf-merge-split" />
    </>
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
  );
}

