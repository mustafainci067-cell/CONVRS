const fs = require('fs');
const path = require('path');

const locales = ['en', 'tr', 'de', 'es'];

const toolsDir = path.join(__dirname, '../src/app/[locale]');

const skipDirs = [
  'about-us', 'contact', 'cookie-policy', 'privacy-policy', 'terms-of-service', 'guides',
  'image-compressor', 'pdf-merge-split', 'video-to-gif'
];

function formatToolName(folderName) {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateSeoContent(toolName) {
  return {
    en: {
      title: `About ${toolName}`,
      what: `The ${toolName} is a powerful, free online utility designed to make your workflow faster and more efficient. Whether you are a developer, designer, or casual user, you can easily process your files securely. All operations are performed locally in your browser, meaning your data is never uploaded to any external servers, ensuring 100% privacy and lightning-fast performance.`,
      howTitle: `How to use ${toolName}`,
      steps: [
        `Select or input your data into the ${toolName} interface.`,
        `Adjust any available settings or options to fit your specific needs.`,
        `Click the primary action button to instantly view or download your processed results.`
      ],
      whyTitle: `Why Choose Our ${toolName}?`,
      why: [
        `Privacy First: Everything happens in your browser. No server uploads.`,
        `Completely Free: No hidden limits, subscriptions, or paywalls.`,
        `User-Friendly: A clean, modern interface that works perfectly on desktop and mobile devices.`
      ],
      faqTitle: `Frequently Asked Questions about ${toolName}`,
      faqs: [
        { q: `Is ${toolName} free to use?`, a: `Yes, our ${toolName} is completely free for everyone with no usage limits.` },
        { q: `Are my files secure?`, a: `Absolutely. We use client-side processing, so your data never leaves your device.` }
      ]
    },
    tr: {
      title: `${toolName} Hakkında`,
      what: `${toolName}, iş akışınızı hızlandırmak ve daha verimli hale getirmek için tasarlanmış güçlü ve ücretsiz bir çevrimiçi araçtır. İster geliştirici, ister tasarımcı veya günlük bir kullanıcı olun, dosyalarınızı kolayca ve güvenle işleyebilirsiniz. Tüm işlemler yerel olarak tarayıcınızda gerçekleştirilir, yani verileriniz hiçbir zaman harici bir sunucuya yüklenmez. Bu da %100 gizlilik ve şimşek hızında performans sağlar.`,
      howTitle: `${toolName} Nasıl Kullanılır?`,
      steps: [
        `Verilerinizi veya dosyalarınızı ${toolName} arayüzüne seçin veya girin.`,
        `Belirli ihtiyaçlarınıza uyacak şekilde mevcut ayarları veya seçenekleri düzenleyin.`,
        `İşlenmiş sonuçlarınızı anında görüntülemek veya indirmek için ana işlem düğmesine tıklayın.`
      ],
      whyTitle: `Neden ${toolName} Aracımızı Seçmelisiniz?`,
      why: [
        `Önce Gizlilik: Her şey tarayıcınızda gerçekleşir. Sunucu yüklemesi yoktur.`,
        `Tamamen Ücretsiz: Gizli sınırlar, abonelikler veya ödeme duvarları yoktur.`,
        `Kullanıcı Dostu: Masaüstü ve mobil cihazlarda mükemmel çalışan temiz ve modern bir arayüz.`
      ],
      faqTitle: `${toolName} Hakkında Sıkça Sorulan Sorular`,
      faqs: [
        { q: `${toolName} aracını kullanmak ücretsiz mi?`, a: `Evet, ${toolName} aracımız herkes için tamamen ücretsizdir ve kullanım sınırı yoktur.` },
        { q: `Dosyalarım güvende mi?`, a: `Kesinlikle. İstemci tarafı işleme kullanıyoruz, bu nedenle verileriniz asla cihazınızdan ayrılmaz.` }
      ]
    },
    de: {
      title: `Über ${toolName}`,
      what: `${toolName} ist ein leistungsstarkes, kostenloses Online-Dienstprogramm, das entwickelt wurde, um Ihren Workflow schneller und effizienter zu gestalten. Egal, ob Sie Entwickler, Designer oder Gelegenheitsnutzer sind, Sie können Ihre Dateien einfach und sicher verarbeiten. Alle Vorgänge werden lokal in Ihrem Browser ausgeführt, was bedeutet, dass Ihre Daten niemals auf externe Server hochgeladen werden, was 100%ige Privatsphäre und blitzschnelle Leistung gewährleistet.`,
      howTitle: `Wie man ${toolName} benutzt`,
      steps: [
        `Wählen Sie Ihre Daten aus oder geben Sie sie in die ${toolName}-Oberfläche ein.`,
        `Passen Sie alle verfügbaren Einstellungen oder Optionen an Ihre spezifischen Bedürfnisse an.`,
        `Klicken Sie auf die primäre Aktionsschaltfläche, um Ihre verarbeiteten Ergebnisse sofort anzuzeigen oder herunterzuladen.`
      ],
      whyTitle: `Warum unseren ${toolName} wählen?`,
      why: [
        `Datenschutz zuerst: Alles passiert in Ihrem Browser. Keine Server-Uploads.`,
        `Völlig kostenlos: Keine versteckten Limits, Abonnements oder Paywalls.`,
        `Benutzerfreundlich: Eine saubere, moderne Oberfläche, die perfekt auf Desktop- und Mobilgeräten funktioniert.`
      ],
      faqTitle: `Häufig gestellte Fragen zu ${toolName}`,
      faqs: [
        { q: `Ist ${toolName} kostenlos zu benutzen?`, a: `Ja, unser ${toolName} ist für alle völlig kostenlos und hat keine Nutzungsbeschränkungen.` },
        { q: `Sind meine Dateien sicher?`, a: `Absolut. Wir verwenden clientseitige Verarbeitung, sodass Ihre Daten niemals Ihr Gerät verlassen.` }
      ]
    },
    es: {
      title: `Acerca de ${toolName}`,
      what: `${toolName} es una potente utilidad en línea gratuita diseñada para hacer que su flujo de trabajo sea más rápido y eficiente. Ya sea que sea un desarrollador, diseñador o usuario ocasional, puede procesar sus archivos de manera fácil y segura. Todas las operaciones se realizan localmente en su navegador, lo que significa que sus datos nunca se suben a servidores externos, asegurando 100% de privacidad y un rendimiento ultrarrápido.`,
      howTitle: `Cómo usar ${toolName}`,
      steps: [
        `Seleccione o ingrese sus datos en la interfaz de ${toolName}.`,
        `Ajuste las configuraciones u opciones disponibles para satisfacer sus necesidades específicas.`,
        `Haga clic en el botón de acción principal para ver o descargar instantáneamente sus resultados procesados.`
      ],
      whyTitle: `¿Por qué elegir nuestro ${toolName}?`,
      why: [
        `Privacidad primero: todo sucede en su navegador. Sin cargas al servidor.`,
        `Completamente gratis: sin límites ocultos, suscripciones o muros de pago.`,
        `Fácil de usar: una interfaz limpia y moderna que funciona perfectamente en dispositivos móviles y de escritorio.`
      ],
      faqTitle: `Preguntas frecuentes sobre ${toolName}`,
      faqs: [
        { q: `¿Es gratis usar ${toolName}?`, a: `Sí, nuestro ${toolName} es completamente gratuito para todos sin límites de uso.` },
        { q: `¿Están seguros mis archivos?`, a: `Absolutamente. Utilizamos procesamiento del lado del cliente, por lo que sus datos nunca salen de su dispositivo.` }
      ]
    }
  };
}

const componentRegex = /export\s+default\s+(?:async\s+)?function\s+([a-zA-Z0-9_]+)\s*\(\s*(?:[^)]*)?\s*\)\s*\{([\s\S]*?)return\s*([\s\S]*?);\s*\}/;

const returnComponentRegex = /<([A-Z][a-zA-Z0-9_]+)\s*\/?>(?:\s*<\/[A-Z][a-zA-Z0-9_]+>)?/;

function processFile(filePath, folderName) {
  let content = fs.readFileSync(filePath, 'utf8');

  // If already processed (has seoContent variable), skip it.
  if (content.includes('const seoContent') || content.includes('<!-- SEO Content Section -->') || content.includes('{/* SEO Content Section */}')) {
    console.log(`Skipped (already SEO optimized): ${folderName}`);
    return;
  }

  const match = content.match(componentRegex);
  if (!match) {
    console.log(`Failed to match component in: ${folderName}`);
    return;
  }

  const fullMatch = match[0];
  const functionName = match[1];
  const bodyContent = match[2];
  const returnContent = match[3];

  const componentMatch = returnContent.match(returnComponentRegex);
  if (!componentMatch) {
    console.log(`Failed to find return component in: ${folderName}`);
    return;
  }

  const componentName = componentMatch[1];
  const toolName = formatToolName(folderName);
  const seoObj = generateSeoContent(toolName);

  const seoString = `const seoContent: Record<string, { title: string, what: string, howTitle: string, steps: string[], whyTitle: string, why: string[], faqTitle: string, faqs: {q: string, a: string}[] }> = ${JSON.stringify(seoObj, null, 2)};\n\n`;

  let newFunction = `export default async function ${functionName}({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = seoContent[locale] || seoContent.en;
  
  // Preserve any hooks or variables from original body if any (usually none)
  ${bodyContent.trim().replace(/const \{ locale \} = await params;/g, '')}

  return (
    <div className="flex flex-col gap-12">
      ${returnContent}
      
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
}`;

  content = content.replace(fullMatch, seoString + newFunction);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Injected SEO: ${folderName}`);
}

const dirs = fs.readdirSync(toolsDir, { withFileTypes: true });

for (const dir of dirs) {
  if (dir.isDirectory() && !skipDirs.includes(dir.name)) {
    const pagePath = path.join(toolsDir, dir.name, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      processFile(pagePath, dir.name);
    }
  }
}

console.log('SEO Injection Complete!');
