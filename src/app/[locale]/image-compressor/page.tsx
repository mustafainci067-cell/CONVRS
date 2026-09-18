<<<<<<< HEAD
import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import ImageCompressor from '@/components/converters/ImageCompressor';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Image Compressor',
    description:
      'Compress JPG, PNG, and WebP images with HTML5 Canvas, lowering quality and reducing file size. 100% client-side.',
    path: '/image-compressor',
  });
}

const seoContent: Record<string, { title: string, what: string, howTitle: string, steps: string[], whyTitle: string, why: string[], faqTitle: string, faqs: {q: string, a: string}[] }> = {
  en: {
    title: "About Image Compressor",
    what: "Our free online Image Compressor reduces the file size of your JPG, PNG, and WebP images while maintaining the best possible quality. By utilizing advanced HTML5 Canvas technology, the compression process happens entirely within your web browser.",
    howTitle: "How to Compress Images",
    steps: [
      "Click the upload area or drag and drop your image file.",
      "The tool will automatically process and compress your image.",
      "Click the download button to save the compressed version to your device."
    ],
    whyTitle: "Why Use Our Zero-Backend Compressor?",
    why: [
      "100% Privacy: Your images are never uploaded to any server.",
      "Lightning Fast: No waiting for uploads or downloads to a remote server.",
      "No File Size Limits: Compress as many files as you want, completely free."
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Is my data secure?", a: "Yes. All processing is done locally on your device. Your files never leave your computer." },
      { q: "Does compression reduce image quality?", a: "It uses lossy compression to significantly reduce file size while keeping the visual quality highly acceptable for web and general use." }
    ]
  },
  tr: {
    title: "Görsel Sıkıştırıcı Hakkında",
    what: "Ücretsiz çevrimiçi Görsel Sıkıştırıcımız, JPG, PNG ve WebP görsellerinizin dosya boyutunu, mümkün olan en iyi kaliteyi koruyarak küçültür. Gelişmiş HTML5 Canvas teknolojisini kullanarak, sıkıştırma işlemi tamamen web tarayıcınızın içinde gerçekleşir.",
    howTitle: "Görseller Nasıl Sıkıştırılır?",
    steps: [
      "Yükleme alanına tıklayın veya görsel dosyanızı sürükleyip bırakın.",
      "Araç, görselinizi otomatik olarak işleyecek ve sıkıştıracaktır.",
      "Sıkıştırılmış sürümü cihazınıza kaydetmek için indir düğmesine tıklayın."
    ],
    whyTitle: "Neden Zero-Backend Sıkıştırıcımızı Kullanmalısınız?",
    why: [
      "%100 Gizlilik: Görselleriniz asla hiçbir sunucuya yüklenmez.",
      "Şimşek Hızında: Uzak bir sunucuya yükleme veya indirme işlemi beklemezsiniz.",
      "Dosya Boyutu Sınırı Yok: İstediğiniz kadar dosyayı tamamen ücretsiz sıkıştırın."
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      { q: "Verilerim güvende mi?", a: "Evet. Tüm işlemler yerel olarak cihazınızda yapılır. Dosyalarınız asla bilgisayarınızdan çıkmaz." },
      { q: "Sıkıştırma görsel kalitesini düşürür mü?", a: "Görsel kalitesini web ve genel kullanım için oldukça kabul edilebilir düzeyde tutarken dosya boyutunu önemli ölçüde azaltmak için kayıplı (lossy) sıkıştırma kullanır." }
    ]
  },
  de: {
    title: "Über den Bildkompressor",
    what: "Unser kostenloser Online-Bildkompressor reduziert die Dateigröße Ihrer JPG-, PNG- und WebP-Bilder und behält dabei die bestmögliche Qualität bei. Durch die Verwendung fortschrittlicher HTML5-Canvas-Technologie erfolgt der Komprimierungsprozess vollständig in Ihrem Webbrowser.",
    howTitle: "Wie man Bilder komprimiert",
    steps: [
      "Klicken Sie auf den Upload-Bereich oder ziehen Sie Ihre Bilddatei per Drag & Drop hinein.",
      "Das Tool verarbeitet und komprimiert Ihr Bild automatisch.",
      "Klicken Sie auf die Download-Schaltfläche, um die komprimierte Version auf Ihrem Gerät zu speichern."
    ],
    whyTitle: "Warum unseren Zero-Backend-Kompressor verwenden?",
    why: [
      "100% Datenschutz: Ihre Bilder werden niemals auf einen Server hochgeladen.",
      "Blitzschnell: Kein Warten auf Uploads oder Downloads zu einem Remote-Server.",
      "Keine Dateigrößenbeschränkungen: Komprimieren Sie beliebig viele Dateien völlig kostenlos."
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Sind meine Daten sicher?", a: "Ja. Alle Verarbeitungen erfolgen lokal auf Ihrem Gerät. Ihre Dateien verlassen Ihren Computer niemals." },
      { q: "Verringert die Komprimierung die Bildqualität?", a: "Es verwendet eine verlustbehaftete Komprimierung, um die Dateigröße erheblich zu reduzieren, während die visuelle Qualität für das Web und den allgemeinen Gebrauch in hohem Maße akzeptabel bleibt." }
    ]
  },
  es: {
    title: "Acerca del compresor de imágenes",
    what: "Nuestro compresor de imágenes en línea gratuito reduce el tamaño de archivo de sus imágenes JPG, PNG y WebP manteniendo la mejor calidad posible. Al utilizar la avanzada tecnología HTML5 Canvas, el proceso de compresión ocurre completamente dentro de su navegador web.",
    howTitle: "Cómo comprimir imágenes",
    steps: [
      "Haga clic en el área de carga o arrastre y suelte su archivo de imagen.",
      "La herramienta procesará y comprimirá automáticamente su imagen.",
      "Haga clic en el botón de descarga para guardar la versión comprimida en su dispositivo."
    ],
    whyTitle: "¿Por qué usar nuestro compresor de cero servidores?",
    why: [
      "100% de privacidad: Sus imágenes nunca se suben a ningún servidor.",
      "Ultrarrápido: Sin esperas para subir o bajar a un servidor remoto.",
      "Sin límites de tamaño de archivo: Comprima tantos archivos como desee, totalmente gratis."
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Están seguros mis datos?", a: "Sí. Todo el procesamiento se realiza localmente en su dispositivo. Sus archivos nunca salen de su computadora." },
      { q: "¿La compresión reduce la calidad de la imagen?", a: "Utiliza compresión con pérdida para reducir significativamente el tamaño del archivo, manteniendo la calidad visual muy aceptable para uso general y web." }
    ]
  }
};

export default async function ImageCompressorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = seoContent[locale] || seoContent.en;

  return (
    <div className="flex flex-col gap-12">
      <ImageCompressor />
      
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
import ImageCompressor from '@/components/converters/ImageCompressor';
export const generateMetadata = generateToolMetadata("/image-compressor");

export default function ImageCompressorPage() {
  return (
    <>
      <ImageCompressor />
      <ToolJsonLd path="/image-compressor" />
      <ToolSeoContent path="/image-compressor" />
      <SEOContentBlock path="/image-compressor" />
    </>
>>>>>>> 7f6c5a9156f4438bbb6bf69a717233857ce699eb
  );
}

