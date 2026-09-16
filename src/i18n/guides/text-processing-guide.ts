import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Text Processing Made Simple: Case Conversion, Lorem Ipsum and Markdown",
    eyebrow: "Text",
    description:
      "How to work with text efficiently in the browser — case conversion, lorem ipsum generation, markdown-to-HTML conversion and text analysis tools that keep your content private.",
    excerpt:
      "Transform text instantly: case conversion, markdown rendering and placeholder text generation — all client-side.",
    readingTime: "6 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Text processing sounds simple, but anyone who has needed to convert a paragraph from lowercase to title case, generate placeholder text for a wireframe, or convert markdown to HTML knows that the right tool saves significant time. This guide covers the most useful text utilities and why using browser-based tools keeps your content private."] },

    { type: "h2", content: ["Case conversion: upper, lower, title and beyond"] },
    { type: "p", content: ["Case conversion changes the capitalization of text. It sounds trivial until you need to process hundreds of lines of product names, headings, or code comments. Common use cases:"] },
    { type: "list", items: [
      [{ text: "UPPERCASE: ", bold: true }, { text: "Convert to all caps — useful for headers, emphasis, or meeting formatting requirements." }],
      [{ text: "lowercase: ", bold: true }, { text: "Convert to all lowercase — useful for normalizing input, email addresses, or URL slugs." }],
      [{ text: "Title Case: ", bold: true }, { text: "Capitalize the first letter of each word — standard for titles, headings, and book chapters." }],
      [{ text: "Sentence case: ", bold: true }, { text: "Capitalize only the first letter of each sentence — natural reading format." }],
      [{ text: "aLtErNaTiNg CaSe: ", bold: true }, { text: "Alternating upper and lower — primarily for creative or meme text." }],
    ]},
    { type: "p", content: ["For bulk text processing — renaming hundreds of files, converting a product catalog, or standardizing headings across a document — a browser-based case converter processes everything instantly without any data leaving your device."] },

    { type: "h2", content: ["Lorem ipsum and placeholder text generation"] },
    { type: "p", content: ["Designers and developers need placeholder text constantly: wireframes, mockups, layout testing, and template population. Lorem ipsum — scrambled Latin text — has been the standard since the 1500s because its letter distribution roughly matches natural language, making layouts look realistic without distracting with readable content."] },
    { type: "p", content: ["Modern lorem ipsum generators let you specify:"] },
    { type: "list", items: [
      ["Number of paragraphs, sentences or words."],
      ["Whether to start with the classic 'Lorem ipsum dolor sit amet' opening."],
      ["Language variant — some generators produce placeholder text in different languages."],
    ]},

    { type: "h2", content: ["Markdown to HTML conversion"] },
    { type: "p", content: ["Markdown is the lingua franca of technical writing — used in README files, documentation, blog posts, and note-taking apps. But sometimes you need HTML output: embedding markdown content in a web page, generating email templates, or importing content into a CMS. Markdown-to-HTML conversion transforms lightweight markdown syntax into full HTML markup, preserving headers, lists, links, code blocks and formatting. A browser-based converter handles this instantly, which matters when your markdown contains proprietary documentation, internal links or sensitive project details."] },

    { type: "h2", content: ["Word and character counting"] },
    { type: "p", content: ["Word count matters for many workflows: academic papers with word limits, SEO content targeting specific lengths, social media posts with character limits, and translation quotes based on word count. Browser-based counting tools give instant results without uploading your text to external services."] },

    { type: "h2", content: ["Privacy in text processing"] },
    { type: "p", content: ["Text may seem less sensitive than images or documents, but it often contains more. Contracts, emails, source code, personal messages and business plans are all text. When you paste text into an online tool, it travels to a server, may be logged, and could be stored indefinitely. Browser-based tools process everything locally — your text never leaves your device."] },

    { type: "h2", content: ["Text tools in Convrs"] },
    { type: "p", content: ["Convrs provides several text processing utilities:"] },
    { type: "list", items: [
      ["Case converter with multiple modes (upper, lower, title, sentence, alternating)."],
      ["Lorem ipsum generator with configurable paragraph and word counts."],
      ["Markdown to HTML converter for instant rendering."],
    ]},
    { type: "p", content: ["All tools process text entirely in your browser. No content is uploaded, no accounts are required, and your text stays on your device."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Metin İşleme Kolaylaştırıldı: Durum Dönüştürme, Lorem Ipsum ve Markdown",
    eyebrow: "Metin",
    description:
      "Tarayıcıda metinle verimli çalışma — durum dönüştürme, lorem ipsum üretimi, markdown'tan HTML'e dönüştürme ve içeriğinizi gizli tutan metin analiz araçları.",
    excerpt:
      "Metni anında dönüştürün: durum dönüştürme, markdown oluşturma ve yer tutucu metin üretimi — hepsi istemci tarafında.",
    readingTime: "6 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Metin işleme basit görünebilir, ancak bir paragrafı küçük harften başlık biçimine dönüştürmesi, bir tel çerçeve için yer tutucu metin üretmesi veya markdown'u HTML'e çevirmesi gereken herkes, doğru aracın önemli ölçüde zaman kazandırdığını bilir. Bu rehber en kullanışlı metin yardımcılarını ve tarayıcı tabanlı araçların içeriğinizi nasıl gizli tuttuğunu ele alır."] },

    { type: "h2", content: ["Durum dönüştürme: büyük, küçük, başlık ve ötesi"] },
    { type: "p", content: ["Durum dönüştürme metnin büyük/küçük harf düzenini değiştirir. Yüzlerce satır ürün adını, başlığı veya kod yorumunu işlemeniz gerektiğinde önemsiz görünmez. Yaygın kullanım alanları:"] },
    { type: "list", items: [
      [{ text: "BÜYÜK HARF: ", bold: true }, { text: "Tümünü büyük harfe çevirir — başlıklar, vurgular veya biçim gereksinimleri için kullanışlı." }],
      [{ text: "küçük harf: ", bold: true }, { text: "Tümünü küçük harfe çevirir — girdi normalleştirme, e-posta adresleri veya URL kısaltmaları için kullanışlı." }],
      [{ text: "Başlık Harfleri: ", bold: true }, { text: "Her kelimenin ilk harfini büyütür — başlıklar, üst başlıklar ve kitap bölümleri için standart." }],
      [{ text: "Cümle Biçimi: ", bold: true }, { text: "Yalnızca her cümlenin ilk harfini büyütür — doğal okuma biçimi." }],
      [{ text: "aLaTıLnGaN BüYüK HARF: ", bold: true }, { text: "Büyük ve küçük harf değişimi — öncelikle yaratıcı veya espri amaçlı metinler için." }],
    ]},
    { type: "p", content: ["Toplu metin işleme için — yüzlerce dosyayı yeniden adlandırmak, bir ürün kataloğunu dönüştürmek veya bir belgedeki başlıkları standartlaştırmak — tarayıcı tabanlı bir durum dönüştürücü her şeyi veri cihazınızdan çıkmadan anında işler."] },

    { type: "h2", content: ["Lorem ipsum ve yer tutucu metin üretimi"] },
    { type: "p", content: ["Tasarımcılar ve geliştiriciler sürekli yer tutucu metin gerektirir: tel çerçeveler, maketler, düzen testleri ve şablon doldurma. Lorem ipsum — karıştırılmış Latince metin — 1500'lerden beri standarttır çünkü harf dağılımı doğal dile yaklaşır ve düzenleri okunur içerikle dikkat dağıtmadan gerçekçi gösterir."] },
    { type: "p", content: ["Modern lorem ipsum üreticileri şunları belirlemenize olanak tanır:"] },
    { type: "list", items: [
      ["Paragraf, cümle veya kelime sayısı."],
      ["Klasik 'Lorem ipsum dolor sit amet' açılışıyla başlayıp başlamayacağı."],
      ["Dil varyantı — bazı üreticiler farklı dillerde yer tutucu metin üretir."],
    ]},

    { type: "h2", content: ["Markdown'dan HTML'e dönüştürme"] },
    { type: "p", content: ["Markdown teknik yazımın ortak dilidir — README dosyalarında, dokümantasyonda, blog yazılarında ve not alma uygulamalarında kullanılır. Ancak bazen HTML çıktısı gerekir: markdown içeriğini bir web sayfasına gömmek, e-posta şablonları üretmek veya içeriği bir CMS'e aktarmak. Markdown'dan HTML'e dönüştürme, hafif markdown sözdizimini başlıkları, listeleri, bağlantıları, kod bloklarını ve biçimlendirmeyi koruyan tam HTML işaretlemesine dönüştürür. Tarayıcı tabanlı bir dönüştürücü bunu anında halleder — markdown'ınız özel dokümantasyon, dahili bağlantılar veya hassas proje ayrıntıları içerdiğinde bu önemlidir."] },

    { type: "h2", content: ["Kelime ve karakter sayımı"] },
    { type: "p", content: ["Kelime sayısı birçok iş akışı için önemlidir: kelime sınırı olan akademik makaleler, belirli uzunlukları hedefleyen SEO içeriği, karakter sınırı olan sosyal medya gönderileri ve kelime sayısına dayalı çeviri teklifleri. Tarayıcı tabanlı sayım araçları, metninizi harici hizmetlere yüklemeden anında sonuç verir."] },

    { type: "h2", content: ["Metin işlemede gizlilik"] },
    { type: "p", content: ["Metin görsellerden veya belgelerden daha az hassas görünebilir, ancak genellikle daha fazlasını içerir. Sözleşmeler, e-postalar, kaynak kod, kişisel mesajlar ve iş planları metindir. Metni çevrimiçi bir araca yapıştırdığınızda bir sunucuya gider, kaydedilebilir ve süresiz saklanabilir. Tarayıcı tabanlı araçlar her şeyi yerel olarak işler — metniniz cihazınızdan asla çıkmaz."] },

    { type: "h2", content: ["Convrs'te metin araçları"] },
    { type: "p", content: ["Convrs birkaç metin işleme yardımcısı sunar:"] },
    { type: "list", items: [
      ["Birden fazla modlu durum dönüştürücü (büyük, küçük, başlık, cümle, değişken)."],
      ["Yapılandırılabilir paragraf ve kelime sayılarıyla lorem ipsum üreticisi."],
      ["Anında oluşturma için markdown'dan HTML'e dönüştürücü."],
    ]},
    { type: "p", content: ["Tüm araçlar metni tamamen tarayıcınızda işler. Hiçbir içerik yüklenmez, hesap gerekmez ve metniniz cihazınızda kalır."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Textverarbeitung leicht gemacht: Groß-/Kleinschreibung, Lorem Ipsum und Markdown",
    eyebrow: "Text",
    description:
      "Effiziente Textverarbeitung im Browser — Groß-/Kleinschreibung, Lorem-Generierung, Markdown-zu-HTML-Konvertierung und Textanalyse-Werkzeuge.",
    excerpt:
      "Text sofort transformieren: Groß-/Kleinschreibung, Markdown-Rendering und Platzhaltertext — alles clientseitig.",
    readingTime: "8 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Textverarbeitung klingt einfach, aber jeder, der jemals einen Absatz von Klein- in Titelcase konvertieren, Platzhaltertext für einen Wireframe generieren oder Markdown in HTML umwandeln musste, weiß, dass das richtige Werkzeug viel Zeit spart. Dieser Leitfaden behandelt die nützlichsten Text-Werkzeuge und warum Browser-Werkzeuge Ihren Inhalt privat halten."] },

    { type: "h2", content: ["Groß-/Kleinschreibung: das richtige Format"] },
    { type: "p", content: ["Die Groß-/Kleinschreibung ändert die Kapitalisierung von Text. Sie wirkt trivial, bis Sie Hunderte Zeilen Produktnamen, Überschriften oder Code-Kommentare verarbeiten müssen. Häufige Anwendungsfälle:"] },
    { type: "list", items: [
      [{ text: "GROSSSCHREIBUNG: ", bold: true }, { text: "Alles in Großbuchstaben — für Überschriften, Hervorhebungen oder Formatierungsanforderungen." }],
      [{ text: "kleinschreibung: ", bold: true }, { text: "Alles in Kleinbuchstaben — für Normalisierung, E-Mail-Adressen oder URL-Slugs." }],
      [{ text: "Titel Case: ", bold: true }, { text: "Ersten Buchstaben jedes Wortes großschreiben — Standard für Titel, Überschriften und Buchkapitel." }],
      [{ text: "Satzfall: ", bold: true }, { text: "Nur den ersten Buchstaben jedes Satzes groß schreiben — natürliches Leseformat." }],
      [{ text: "aBwEcHsElNdE Schreibweise: ", bold: true }, { text: "Wechselnde Groß-/Kleinschreibung — vor allem für kreative oder Meme-Texte." }],
    ]},
    { type: "p", content: ["Für die Textverarbeitung im Batch — Hunderte Dateien umbenennen, einen Produktkatalog konvertieren oder Überschriften über ein Dokument vereinheitlichen — verarbeitet ein browserbasiertes Tool alles sofort, ohne dass Daten Ihr Gerät verlassen."] },

    { type: "h2", content: ["Lorem Ipsum und Platzhaltertext"] },
    { type: "p", content: ["Designer und Entwickler brauchen ständig Platzhaltertext: Wireframes, Mockups, Layout-Tests und Vorlagenbefüllung. Lorem Ipsum — lateinischer Blindtext — ist seit den 1500ern Standard, weil seine Buchstabenverteilung natürlicher Sprache nahekommt und Layouts realistisch wirken lässt, ohne mit lesbarem Inhalt abzulenken."] },
    { type: "p", content: ["Moderne Lorem-Ipsum-Generatoren lassen Sie Folgendes festlegen:"] },
    { type: "list", items: [
      ["Anzahl der Absätze, Sätze oder Wörter."],
      ["Ob mit dem klassischen 'Lorem ipsum dolor sit amet'-Einstieg begonnen wird."],
      ["Sprachvariante — einige Generatoren erzeugen Blindtext in verschiedenen Sprachen."],
    ]},

    { type: "h2", content: ["Markdown zu HTML"] },
    { type: "p", content: ["Markdown ist die Lingua franca des technischen Schreibens — verwendet in README-Dateien, Dokumentation, Blog-Posts und Notiz-Apps. Manchmal brauchen Sie aber HTML: Markdown in eine Webseite einbetten, E-Mail-Vorlagen generieren oder Inhalte in ein CMS importieren. Ein Browser-Konverter erledigt dies sofort — wichtig, wenn Ihr Markdown proprietäre Dokumentation, interne Links oder sensible Projektdetails enthält."] },

    { type: "h2", content: ["Wort- und Zeichenzählung"] },
    { type: "p", content: ["Die Wortzahl ist für viele Workflows wichtig: akademische Arbeiten mit Wortlimits, SEO-Inhalte mit Ziellängen, Social-Media-Posts mit Zeichenlimits und Übersetzungsangebote nach Wortzahl. Browserbasierte Zählwerkzeuge liefern sofortige Ergebnisse, ohne Ihren Text an externe Dienste zu senden."] },

    { type: "h2", content: ["Datenschutz bei der Textverarbeitung"] },
    { type: "p", content: ["Text wirkt weniger sensibel als Bilder oder Dokumente, enthält aber oft mehr. Verträge, E-Mails, Quellcode, persönliche Nachrichten und Geschäftspläne sind allesamt Text. Sobald Sie Text in ein Online-Tool einfügen, reist er zu einem Server, wird möglicherweise protokolliert und unbegrenzt gespeichert. Browserbasierte Werkzeuge verarbeiten alles lokal — Ihr Text verlässt Ihr Gerät nie."] },

    { type: "h2", content: ["Textwerkzeuge mit Convrs"] },
    { type: "p", content: ["Convrs bietet mehrere Textverarbeitungs-Werkzeuge:"] },
    { type: "list", items: [
      ["Case-Converter mit mehreren Modi (Groß, Klein, Titel, Satz, abwechselnd)."],
      ["Lorem-Ipsum-Generator mit konfigurierbaren Absatz- und Wortzahlen."],
      ["Markdown-zu-HTML-Konverter für sofortiges Rendering."],
    ]},
    { type: "p", content: ["Alle Werkzeuge verarbeiten Text vollständig in Ihrem Browser. Kein Upload, keine Konten, Ihr Text bleibt auf Ihrem Gerät."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Procesamiento de texto simplificado: conversión de mayúsculas, lorem ipsum y markdown",
    eyebrow: "Texto",
    description:
      "Cómo trabajar con texto eficientemente en el navegador: conversión de mayúsculas/minúsculas, generación de lorem ipsum, conversión de markdown a HTML y herramientas de análisis de texto.",
    excerpt:
      "Transforme texto al instante: conversión de mayúsculas, renderizado de markdown y generación de texto de relleno — todo del lado del cliente.",
    readingTime: "6 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["El procesamiento de texto suena simple, pero cualquiera que haya necesitado convertir un párrafo de minúsculas a mayúsculas iniciales, generar texto de relleno para un wireframe o convertir markdown a HTML sabe que la herramienta adecuada ahorra mucho tiempo. Esta guía cubre las utilidades de texto más útiles y por qué las herramientas del navegador mantienen privado su contenido."] },

    { type: "h2", content: ["Conversión de mayúsculas: mayúsculas, minúsculas, título y más"] },
    { type: "p", content: ["La conversión de mayúsculas cambia la capitalización del texto. Parece trivial hasta que necesita procesar cientos de líneas de nombres de productos, encabezados o comentarios de código. Casos de uso comunes:"] },
    { type: "list", items: [
      [{ text: "MAYÚSCULAS: ", bold: true }, { text: "Convertir todo a mayúsculas — útil para encabezados, énfasis o requisitos de formato." }],
      [{ text: "minúsculas: ", bold: true }, { text: "Convertir todo a minúsculas — útil para normalizar entradas, direcciones de correo o slugs de URL." }],
      [{ text: "Mayúsculas iniciales: ", bold: true }, { text: "Capitalizar la primera letra de cada palabra — estándar para títulos, encabezados y capítulos." }],
      [{ text: "Caso de oración: ", bold: true }, { text: "Capitalizar solo la primera letra de cada oración — formato natural de lectura." }],
      [{ text: "aLtErNaNdO CaSo: ", bold: true }, { text: "Mayúsculas y minúsculas alternadas — sobre todo para textos creativos o memes." }],
    ]},
    { type: "p", content: ["Para el procesamiento masivo — renombrar cientos de archivos, convertir un catálogo o estandarizar encabezados — un conversor en el navegador procesa todo al instante sin que ningún dato salga de su dispositivo."] },

    { type: "h2", content: ["Lorem ipsum y texto de relleno"] },
    { type: "p", content: ["Diseñadores y desarrolladores necesitan texto de relleno constantemente: wireframes, maquetas, pruebas de diseño y plantillas. El lorem ipsum — texto latino alterado — es el estándar desde los años 1500 porque su distribución de letras se aproxima al lenguaje natural, haciendo los diseños realistas sin distraer con contenido legible."] },
    { type: "p", content: ["Los generadores modernos permiten especificar:"] },
    { type: "list", items: [
      ["Número de párrafos, oraciones o palabras."],
      ["Si comenzar con la apertura clásica 'Lorem ipsum dolor sit amet'."],
      ["Variante de idioma — algunos generadores producen texto en distintos idiomas."],
    ]},

    { type: "h2", content: ["Conversión de markdown a HTML"] },
    { type: "p", content: ["Markdown es la lengua franca de la escritura técnica — usado en README, documentación, publicaciones de blog y apps de notas. Pero a veces necesita HTML: incrustar contenido en una página web, generar plantillas de correo o importar a un CMS. Un conversor en el navegador lo hace al instante, lo que importa cuando su markdown contiene documentación propia, enlaces internos o detalles sensibles de un proyecto."] },

    { type: "h2", content: ["Conteo de palabras y caracteres"] },
    { type: "p", content: ["El conteo de palabras importa en muchos flujos: artículos académicos con límites, contenido SEO con longitudes objetivo, publicaciones con límites de caracteres y presupuestos de traducción basados en el recuento. Las herramientas del navegador dan resultados instantáneos sin subir su texto a servicios externos."] },

    { type: "h2", content: ["Privacidad en el procesamiento de texto"] },
    { type: "p", content: ["El texto puede parecer menos sensible que imágenes o documentos, pero suele contener más. Contratos, correos, código fuente, mensajes personales y planes de negocio son texto. Al pegarlo en una herramienta en línea, viaja a un servidor, puede registrarse y almacenarse indefinidamente. Las herramientas del navegador lo procesan todo localmente — su texto nunca sale del dispositivo."] },

    { type: "h2", content: ["Herramientas de texto con Convrs"] },
    { type: "p", content: ["Convrs ofrece varias utilidades de procesamiento de texto:"] },
    { type: "list", items: [
      ["Conversor de mayúsculas con varios modos (mayúsculas, minúsculas, título, oración, alternado)."],
      ["Generador de lorem ipsum con párrafos y palabras configurables."],
      ["Conversor de markdown a HTML para renderizado instantáneo."],
    ]},
    { type: "p", content: ["Todas las herramientas procesan el texto enteramente en su navegador. Sin subidas, sin cuentas, su texto permanece en su dispositivo."] },
  ],
};

const textProcessingGuide: GuideDefinition = {
  slug: "text-processing-guide",
  content: { en, tr, de, es },
};

export default textProcessingGuide;
