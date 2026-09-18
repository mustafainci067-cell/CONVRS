import type { Metadata } from 'next';
import { generateConverterMetadata } from '@/lib/seo';
import PasswordGenerator from '@/components/converters/PasswordGenerator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateConverterMetadata({
    locale,
    title: 'Password Generator',
    description:
      'Generate strong, randomly secure passwords with a length slider, character-type toggles and one-click copy. 100% client-side.',
    path: '/password-generator',
  });
}

const seoContent: Record<string, { title: string, what: string, howTitle: string, steps: string[], whyTitle: string, why: string[], faqTitle: string, faqs: {q: string, a: string}[] }> = {
  "en": {
    "title": "About Password Generator",
    "what": "The Password Generator is a powerful, free online utility designed to make your workflow faster and more efficient. Whether you are a developer, designer, or casual user, you can easily process your files securely. All operations are performed locally in your browser, meaning your data is never uploaded to any external servers, ensuring 100% privacy and lightning-fast performance.",
    "howTitle": "How to use Password Generator",
    "steps": [
      "Select or input your data into the Password Generator interface.",
      "Adjust any available settings or options to fit your specific needs.",
      "Click the primary action button to instantly view or download your processed results."
    ],
    "whyTitle": "Why Choose Our Password Generator?",
    "why": [
      "Privacy First: Everything happens in your browser. No server uploads.",
      "Completely Free: No hidden limits, subscriptions, or paywalls.",
      "User-Friendly: A clean, modern interface that works perfectly on desktop and mobile devices."
    ],
    "faqTitle": "Frequently Asked Questions about Password Generator",
    "faqs": [
      {
        "q": "Is Password Generator free to use?",
        "a": "Yes, our Password Generator is completely free for everyone with no usage limits."
      },
      {
        "q": "Are my files secure?",
        "a": "Absolutely. We use client-side processing, so your data never leaves your device."
      }
    ]
  },
  "tr": {
    "title": "Password Generator Hakkında",
    "what": "Password Generator, iş akışınızı hızlandırmak ve daha verimli hale getirmek için tasarlanmış güçlü ve ücretsiz bir çevrimiçi araçtır. İster geliştirici, ister tasarımcı veya günlük bir kullanıcı olun, dosyalarınızı kolayca ve güvenle işleyebilirsiniz. Tüm işlemler yerel olarak tarayıcınızda gerçekleştirilir, yani verileriniz hiçbir zaman harici bir sunucuya yüklenmez. Bu da %100 gizlilik ve şimşek hızında performans sağlar.",
    "howTitle": "Password Generator Nasıl Kullanılır?",
    "steps": [
      "Verilerinizi veya dosyalarınızı Password Generator arayüzüne seçin veya girin.",
      "Belirli ihtiyaçlarınıza uyacak şekilde mevcut ayarları veya seçenekleri düzenleyin.",
      "İşlenmiş sonuçlarınızı anında görüntülemek veya indirmek için ana işlem düğmesine tıklayın."
    ],
    "whyTitle": "Neden Password Generator Aracımızı Seçmelisiniz?",
    "why": [
      "Önce Gizlilik: Her şey tarayıcınızda gerçekleşir. Sunucu yüklemesi yoktur.",
      "Tamamen Ücretsiz: Gizli sınırlar, abonelikler veya ödeme duvarları yoktur.",
      "Kullanıcı Dostu: Masaüstü ve mobil cihazlarda mükemmel çalışan temiz ve modern bir arayüz."
    ],
    "faqTitle": "Password Generator Hakkında Sıkça Sorulan Sorular",
    "faqs": [
      {
        "q": "Password Generator aracını kullanmak ücretsiz mi?",
        "a": "Evet, Password Generator aracımız herkes için tamamen ücretsizdir ve kullanım sınırı yoktur."
      },
      {
        "q": "Dosyalarım güvende mi?",
        "a": "Kesinlikle. İstemci tarafı işleme kullanıyoruz, bu nedenle verileriniz asla cihazınızdan ayrılmaz."
      }
    ]
  },
  "de": {
    "title": "Über Password Generator",
    "what": "Password Generator ist ein leistungsstarkes, kostenloses Online-Dienstprogramm, das entwickelt wurde, um Ihren Workflow schneller und effizienter zu gestalten. Egal, ob Sie Entwickler, Designer oder Gelegenheitsnutzer sind, Sie können Ihre Dateien einfach und sicher verarbeiten. Alle Vorgänge werden lokal in Ihrem Browser ausgeführt, was bedeutet, dass Ihre Daten niemals auf externe Server hochgeladen werden, was 100%ige Privatsphäre und blitzschnelle Leistung gewährleistet.",
    "howTitle": "Wie man Password Generator benutzt",
    "steps": [
      "Wählen Sie Ihre Daten aus oder geben Sie sie in die Password Generator-Oberfläche ein.",
      "Passen Sie alle verfügbaren Einstellungen oder Optionen an Ihre spezifischen Bedürfnisse an.",
      "Klicken Sie auf die primäre Aktionsschaltfläche, um Ihre verarbeiteten Ergebnisse sofort anzuzeigen oder herunterzuladen."
    ],
    "whyTitle": "Warum unseren Password Generator wählen?",
    "why": [
      "Datenschutz zuerst: Alles passiert in Ihrem Browser. Keine Server-Uploads.",
      "Völlig kostenlos: Keine versteckten Limits, Abonnements oder Paywalls.",
      "Benutzerfreundlich: Eine saubere, moderne Oberfläche, die perfekt auf Desktop- und Mobilgeräten funktioniert."
    ],
    "faqTitle": "Häufig gestellte Fragen zu Password Generator",
    "faqs": [
      {
        "q": "Ist Password Generator kostenlos zu benutzen?",
        "a": "Ja, unser Password Generator ist für alle völlig kostenlos und hat keine Nutzungsbeschränkungen."
      },
      {
        "q": "Sind meine Dateien sicher?",
        "a": "Absolut. Wir verwenden clientseitige Verarbeitung, sodass Ihre Daten niemals Ihr Gerät verlassen."
      }
    ]
  },
  "es": {
    "title": "Acerca de Password Generator",
    "what": "Password Generator es una potente utilidad en línea gratuita diseñada para hacer que su flujo de trabajo sea más rápido y eficiente. Ya sea que sea un desarrollador, diseñador o usuario ocasional, puede procesar sus archivos de manera fácil y segura. Todas las operaciones se realizan localmente en su navegador, lo que significa que sus datos nunca se suben a servidores externos, asegurando 100% de privacidad y un rendimiento ultrarrápido.",
    "howTitle": "Cómo usar Password Generator",
    "steps": [
      "Seleccione o ingrese sus datos en la interfaz de Password Generator.",
      "Ajuste las configuraciones u opciones disponibles para satisfacer sus necesidades específicas.",
      "Haga clic en el botón de acción principal para ver o descargar instantáneamente sus resultados procesados."
    ],
    "whyTitle": "¿Por qué elegir nuestro Password Generator?",
    "why": [
      "Privacidad primero: todo sucede en su navegador. Sin cargas al servidor.",
      "Completamente gratis: sin límites ocultos, suscripciones o muros de pago.",
      "Fácil de usar: una interfaz limpia y moderna que funciona perfectamente en dispositivos móviles y de escritorio."
    ],
    "faqTitle": "Preguntas frecuentes sobre Password Generator",
    "faqs": [
      {
        "q": "¿Es gratis usar Password Generator?",
        "a": "Sí, nuestro Password Generator es completamente gratuito para todos sin límites de uso."
      },
      {
        "q": "¿Están seguros mis archivos?",
        "a": "Absolutamente. Utilizamos procesamiento del lado del cliente, por lo que sus datos nunca salen de su dispositivo."
      }
    ]
  }
};

export default async function PasswordGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = seoContent[locale] || seoContent.en;
  
  // Preserve any hooks or variables from original body if any (usually none)
  

  return (
    <div className="flex flex-col gap-12">
      <PasswordGenerator />
      
      {/* SEO Content Section */}
      <section className="mx-auto w-full max-w-3xl space-y-8 px-4 text-zinc-600 dark:text-zinc-400">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{content.title}</h2>
          <p className="leading-relaxed">{content.what}</p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{content.howTitle}</h3>
          <ol className="list-inside list-decimal space-y-2">
            {content.steps.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{content.whyTitle}</h3>
          <ul className="list-inside list-disc space-y-2">
            {content.why.map((reason: string, i: number) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{content.faqTitle}</h3>
          <div className="space-y-4">
            {content.faqs.map((faq: {q: string, a: string}, i: number) => (
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
