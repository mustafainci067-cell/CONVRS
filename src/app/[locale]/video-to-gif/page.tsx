import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import VideoAudioTools from '@/components/converters/VideoAudioTools';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Video to GIF Converter',
    description:
      'Convert your short videos into animated GIFs instantly with adjustable FPS settings. Runs 100% client-side.',
    path: '/video-to-gif',
  });
}

const seoContent: Record<string, { title: string, what: string, howTitle: string, steps: string[], whyTitle: string, why: string[], faqTitle: string, faqs: {q: string, a: string}[] }> = {
  en: {
    title: "About Video to GIF Converter",
    what: "Our Video to GIF Converter helps you transform your favorite video clips into animated GIFs quickly and easily. Utilizing the power of FFmpeg WebAssembly, the conversion runs entirely in your browser, guaranteeing total privacy and high-speed processing without any server uploads.",
    howTitle: "How to Convert Video to GIF",
    steps: [
      "Select a video file from your device (MP4, WebM, or other common formats).",
      "Adjust frame rate (FPS) and other settings to balance quality and file size.",
      "Click the convert button and wait a few moments for your new GIF to generate."
    ],
    whyTitle: "Why Use Our Zero-Backend Converter?",
    why: [
      "No Data Tracking: We never see, store, or share your videos. Everything is processed locally.",
      "Blazing Fast: Skip the time it takes to upload gigabytes of video to a cloud server.",
      "Completely Free: No watermarks, no paywalls, and no hidden fees."
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Is the conversion quality good?", a: "Yes, you can customize the frame rate and quality settings to ensure the GIF meets your exact needs." },
      { q: "Do I need to install any software?", a: "No, the entire tool runs within your web browser thanks to advanced WebAssembly technology." }
    ]
  },
  tr: {
    title: "Video'dan GIF'e Dönüştürücü Hakkında",
    what: "Video'dan GIF'e Dönüştürücümüz, favori video kliplerinizi hızlı ve kolay bir şekilde hareketli GIF'lere dönüştürmenize yardımcı olur. FFmpeg WebAssembly gücünü kullanarak, dönüştürme işlemi tamamen tarayıcınızda çalışır, hiçbir sunucu yüklemesi olmadan tam gizlilik ve yüksek hızlı işlem garantisi verir.",
    howTitle: "Video GIF'e Nasıl Dönüştürülür?",
    steps: [
      "Cihazınızdan bir video dosyası seçin (MP4, WebM veya diğer yaygın formatlar).",
      "Kalite ve dosya boyutunu dengelemek için kare hızını (FPS) ve diğer ayarları yapın.",
      "Dönüştür düğmesine tıklayın ve yeni GIF'inizin oluşturulması için birkaç saniye bekleyin."
    ],
    whyTitle: "Neden Zero-Backend Dönüştürücümüzü Kullanmalısınız?",
    why: [
      "Veri Takibi Yok: Videolarınızı asla görmeyiz, saklamayız veya paylaşmayız. Her şey yerel olarak işlenir.",
      "Çok Hızlı: Gigabaytlarca videoyu bulut sunucusuna yüklemek için gereken zamanı atlayın.",
      "Tamamen Ücretsiz: Filigran yok, ödeme duvarı yok ve gizli ücret yok."
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      { q: "Dönüştürme kalitesi iyi mi?", a: "Evet, GIF'in tam ihtiyaçlarınızı karşılamasını sağlamak için kare hızını ve kalite ayarlarını özelleştirebilirsiniz." },
      { q: "Herhangi bir yazılım yüklemem gerekiyor mu?", a: "Hayır, gelişmiş WebAssembly teknolojisi sayesinde aracın tamamı web tarayıcınızda çalışır." }
    ]
  },
  de: {
    title: "Über den Video zu GIF Konverter",
    what: "Unser Video zu GIF Konverter hilft Ihnen, Ihre Lieblings-Videoclips schnell und einfach in animierte GIFs umzuwandeln. Durch die Nutzung der Leistungsfähigkeit von FFmpeg WebAssembly läuft die Konvertierung vollständig in Ihrem Browser ab, was absolute Privatsphäre und Hochgeschwindigkeitsverarbeitung ohne Server-Uploads garantiert.",
    howTitle: "Wie man Videos in GIFs konvertiert",
    steps: [
      "Wählen Sie eine Videodatei von Ihrem Gerät aus (MP4, WebM oder andere gängige Formate).",
      "Passen Sie die Bildrate (FPS) und andere Einstellungen an, um Qualität und Dateigröße in Einklang zu bringen.",
      "Klicken Sie auf die Schaltfläche zum Konvertieren und warten Sie einen Moment, bis Ihr neues GIF erstellt wird."
    ],
    whyTitle: "Warum unseren Zero-Backend-Konverter verwenden?",
    why: [
      "Kein Daten-Tracking: Wir sehen, speichern oder teilen Ihre Videos niemals. Alles wird lokal verarbeitet.",
      "Blitzschnell: Überspringen Sie die Zeit, die zum Hochladen von Gigabytes an Videos auf einen Cloud-Server benötigt wird.",
      "Völlig kostenlos: Keine Wasserzeichen, keine Paywalls und keine versteckten Gebühren."
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Ist die Konvertierungsqualität gut?", a: "Ja, Sie können die Bildraten- und Qualitätseinstellungen anpassen, um sicherzustellen, dass das GIF Ihren genauen Anforderungen entspricht." },
      { q: "Muss ich Software installieren?", a: "Nein, das gesamte Tool läuft dank fortschrittlicher WebAssembly-Technologie in Ihrem Webbrowser." }
    ]
  },
  es: {
    title: "Acerca del convertidor de video a GIF",
    what: "Nuestro convertidor de video a GIF lo ayuda a transformar sus clips de video favoritos en GIF animados de manera rápida y sencilla. Utilizando la potencia de FFmpeg WebAssembly, la conversión se ejecuta completamente en su navegador, garantizando total privacidad y procesamiento de alta velocidad sin cargas en el servidor.",
    howTitle: "Cómo convertir video a GIF",
    steps: [
      "Seleccione un archivo de video de su dispositivo (MP4, WebM u otros formatos comunes).",
      "Ajuste la velocidad de fotogramas (FPS) y otras configuraciones para equilibrar la calidad y el tamaño del archivo.",
      "Haga clic en el botón convertir y espere unos momentos para que se genere su nuevo GIF."
    ],
    whyTitle: "¿Por qué utilizar nuestro convertidor sin servidor?",
    why: [
      "Sin seguimiento de datos: nunca vemos, almacenamos ni compartimos sus videos. Todo se procesa localmente.",
      "Ultrarrápido: omita el tiempo que lleva subir gigabytes de video a un servidor en la nube.",
      "Completamente gratis: sin marcas de agua, sin muros de pago y sin tarifas ocultas."
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Es buena la calidad de la conversión?", a: "Sí, puede personalizar la velocidad de fotogramas y la configuración de calidad para garantizar que el GIF satisfaga sus necesidades exactas." },
      { q: "¿Necesito instalar algún software?", a: "No, toda la herramienta se ejecuta dentro de su navegador web gracias a la avanzada tecnología WebAssembly." }
    ]
  }
};

export default async function VideoToGifPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = seoContent[locale] || seoContent.en;

  return (
    <div className="flex flex-col gap-12">
      <VideoAudioTools mode="video-to-gif" />
      
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
  );
}
