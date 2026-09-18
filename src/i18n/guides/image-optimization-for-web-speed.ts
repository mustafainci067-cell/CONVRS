import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "How to Optimize Images for the Web: Compression, Resizing and Formats",
    eyebrow: "Image",
    description:
      "Image optimization is the fastest way to speed up your website. Learn how compression, resizing and modern formats like WebP balance quality against file size — entirely in your browser.",
    excerpt:
      "Speed up your site by mastering image compression, resizing and format selection — faster pages, no quality loss.",
    readingTime: "9 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Images are the heaviest assets on almost every web page. Studies routinely show that images account for over 50% of a web page's loaded bytes, and every unoptimized JPEG that leaves a camera at 8 MB adds seconds to your load time. Optimizing images is the single highest-impact performance win available to most sites. This guide explains the three levers you control — compression, resizing and format — and how to use them together."] },

    { type: "h2", content: ["Why image size matters"] },
    { type: "p", content: ["Your visitors' experience is directly tied to how fast your pages load. Large images delay the first paint, push above-the-fold content down, consume mobile data and hurt your search ranking. Core Web Vitals — the metrics Google uses to measure loading experience — weight properly sized and compressed images heavily. Optimizing before upload is always better than relying on the browser to cope."] },
    { type: "list", items: [
      [{ text: "Largest Contentful Paint (LCP): ", bold: true }, { text: "The main hero image is usually the largest element; its size drives your LCP score." }],
      [{ text: "Data usage: ", bold: true }, { text: "Mobile users on limited plans pay for every kilobyte of unoptimized imagery." }],
      [{ text: "Bounce rate: ", bold: true }, { text: "Every additional second of load time measurably increases the chance visitors leave." }],
      [{ text: "Storage and bandwidth: ", bold: true }, { text: "Smaller files mean cheaper hosting and faster delivery through CDNs." }],
    ]},

    { type: "h2", content: ["Compression: quality vs. file size"] },
    { type: "p", content: ["Compression removes redundant data from an image file. There are two families:"] },
    { type: "list", items: [
      [{ text: "Lossy compression ", bold: true }, { text: "(JPEG, WebP): permanently discards some visual detail to shrink the file. The trick is finding the level where the human eye cannot tell the difference — for JPEG that is usually a quality setting between 70 and 85." }],
      [{ text: "Lossless compression ", bold: true }, { text: "(PNG, WebP lossless): preserves every pixel exactly, useful for screenshots, diagrams and assets with text where artifacts are obvious." }],
    ]},
    { type: "p", content: ["A modern image optimization workflow converts photographs to highly compressed WebP (or JPEG for compatibility) and keeps PNG for images that need sharp text or transparency. When you compress in the browser, the work happens locally and the original never leaves your device."] },

    { type: "h2", content: ["Resizing: serve only what you display"] },
    { type: "p", content: ["A 6000×4000 pixel photo displayed in a 1200-pixel-wide slot wastes most of its data. Resizing to the largest size your layout actually uses is often the biggest single reduction available: shrinking a 24 MB photo to 1920px wide routinely brings it below 2 MB before any compression is applied. Rules of thumb:"] },
    { type: "list", items: [
      ["Crop or resize to the exact display size, not larger."],
      ["Consider retina displays: a 2× image (display width × 2) balances crispness with file size."],
      ["Resize first, then compress — working from a smaller image is faster and produces mathematically better results."],
    ]},

    { type: "h2", content: ["Choosing the right format"] },
    { type: "note", tone: "success", title: "Quick format decision guide", content: [
      { text: "Photos → ", bold: true }, { text: "WebP or JPEG (quality 75–85). " },
      { text: "Screenshots, text, logos → ", bold: true }, { text: "PNG or lossless WebP. " },
      { text: "Everything web (best when supported) → ", bold: true }, { text: "WebP — about 25–35% smaller than JPEG at equal quality." },
    ]},
    { type: "table", columns: ["Format", "Best for", "Notes"], rows: [
      ["JPEG", "Photos without transparency", "Lossy; quality sliding scale; universal support"],
      ["PNG", "Text, logos, screenshots", "Lossless; supports transparency; heavier"],
      ["WebP", "General web usage", "Lossy + lossless; transparency; smaller than JPEG"],
      ["HEIC", "iPhone storage / iOS", "Modern, efficient; limited web support"],
      ["SVG", "Logos, icons, illustrations", "Vector; scales infinitely; tiny for simple art"],
    ]},
    { type: "p", content: ["Choosing the format is a one-way conversation with your use case: a photo needs photographic compression, a logo needs sharp edges and transparency. Matching the format to the image type typically saves 30–50% compared to a single default format for everything."] },

    { type: "h2", content: ["A practical five-step workflow"] },
    { type: "list", ordered: true, items: [
      [{ text: "Resize ", bold: true }, { text: "to your largest display width (e.g. 1920px for hero images, 800px for article body)." }],
      [{ text: "Choose a format ", bold: true }, { text: "based on content: WebP for photos, PNG for graphics with text." }],
      [{ text: "Compress ", bold: true }, { text: "starting at quality 80 and step down until you find the smallest acceptable size." }],
      [{ text: "Preview ", bold: true }, { text: "the result side by side with any existing original to confirm no visible degradation." }],
      [{ text: "Export ", bold: true }, { text: "and, for a website, serve it with proper dimensions in your markup or a next-gen format stack." }],
    ]},

    { type: "h2", content: ["Optimizing images in Convrs"] },
    { type: "p", content: ["Convrs offers a full set of browser-based image tools that follow exactly this workflow: "] },
    { type: "list", items: [
      [{ text: "Image compressor ", bold: true }, { text: "tunes quality to hit a target size." }],
      [{ text: "Image resizer ", bold: true }, { text: "sets exact width and height." }],
      [{ text: "JPG to WebP ", bold: true }, { text: "and WebP to PNG ", bold: true }, { text: "convert between formats." }],
    ]},
    { type: "p", content: ["Every conversion runs entirely in your browser via WebAssembly. Your photos never leave your device, there is no upload queue to wait through, and no limit on how many files you process."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Web İçin Görsel Optimizasyonu: Sıkıştırma, Boyutlandırma ve Format Seçimi",
    eyebrow: "Görsel",
    description:
      "Görsel optimizasyonu, sitenizi hızlandırmanın en hızlı yoludur. Sıkıştırma, boyutlandırma ve WebP gibi modern formatlarla kaliteyi dosya boyutuna nasıl dengeleyeceğinizi öğrenin.",
    excerpt:
      "Görsel sıkıştırma, boyutlandırma ve format seçimiyle sitenizi hızlandırın — daha hızlı sayfalar, kalite kaybı yok.",
    readingTime: "9 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Neredeyse her web sayfasının en ağır öğesi görsellerdir. Kamera çıktısı 8 MB'lık optimize edilmemiş bir JPEG, yükleme sürenize saniyeler ekler. Görsel optimizasyonu, çoğu site için en yüksek etkili performans kazancıdır. Bu rehber, kontrol ettiğiniz üç kolu — sıkıştırma, boyutlandırma ve format — birlikte nasıl kullanacağınızı anlatır."] },

    { type: "h2", content: ["Boyut neden önemlidir?"] },
    { type: "p", content: ["Görseller yüklenen verinin yarısından fazlasını oluşturur. Büyük görseller ilk görüntüleme (first paint) süresini geciktirir, mobil veri tüketir ve arama sıralamanızı olumsuz etkiler. Google'ın ölçtüğü Core Web Vitals metrikleri, doğru boyutlandırılmış ve sıkıştırılmış görselleri ödüllendirir."] },

    { type: "h2", content: ["Sıkıştırma: kalite ve dosya boyutu dengesi"] },
    { type: "list", items: [
      [{ text: "Kayıplı sıkıştırma ", bold: true }, { text: "(JPEG, WebP): bazı görsel ayrıntıları kalıcı olarak atar. JPEG için ideal kalite genellikle 70 ile 85 arasındadır." }],
      [{ text: "Kayıpsız sıkıştırma ", bold: true }, { text: "(PNG, WebP lossless): her pikseli birebir korur; ekran görüntüleri, diyagramlar ve metin içeren görseller için idealdir." }],
    ]},
    { type: "p", content: ["Modern bir iş akışında fotoğraflar yüksek oranda sıkıştırılmış WebP'ye (veya uyumluluk için JPEG'e) dönüştürülür; keskin metin ve şeffaflık gerektiren görseller PNG olarak kalır. Tarayıcıda sıkıştırma yaptığınızda işlem yerel olarak çalışır, orijinal asla cihazınızdan çıkmaz."] },

    { type: "h2", content: ["Doğru formatı seçmek"] },
    { type: "note", tone: "success", title: "Hızlı format seçimi", content: [
      { text: "Fotoğraflar → ", bold: true }, { text: "WebP veya JPEG (kalite 75–85). " },
      { text: "Ekran görüntüsü, metin, logo → ", bold: true }, { text: "PNG veya kayıpsız WebP. " },
      { text: "Genel web öğeleri → ", bold: true }, { text: "WebP — eşit kalitede JPEG'den %25–35 daha küçük." },
    ]},

    { type: "h2", content: ["Uygulanabilir beş adımlı zincir"] },
    { type: "list", ordered: true, items: [
      [{ text: "Boyutlandır: ", bold: true }, { text: "en geniş ekran boyutunuza göre ayarlayın (ör. 1920px)." }],
      [{ text: "Format seç: ", bold: true }, { text: "fotoğraf için WebP, metinli grafik için PNG." }],
      [{ text: "Sıkıştır: ", bold: true }, { text: "kalite 80'den başlayarak en küçük kabul edilebilir boyutu bulun." }],
      [{ text: "Önizle: ", bold: true }, { text: "sonucu orijinalle yan yana karşılaştırın." }],
      [{ text: "Dışa aktar: ", bold: true }, { text: "web formatına kaydedin." }],
    ]},

    { type: "h2", content: ["Convrs ile görsel optimizasyonu"] },
    { type: "p", content: ["Convrs, tam olarak bu iş akışını izleyen tarayıcı tabanlı görsel araçları sunar: görsel sıkıştırıcı, görsel yeniden boyutlandırıcı, JPG → WebP ve WebP → PNG dönüştürücü. Tüm işlemler WebAssembly ile tarayıcınızda çalışır; fotoğraflarınız asla cihazınızı terk etmez ve dosya sayısı sınırı yoktur."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Bilder für das Web optimieren: Komprimierung, Größe und Formate",
    eyebrow: "Bild",
    description:
      "Bilder sind der schnellste Weg, eine Website zu beschleunigen. Lernen Sie, wie Komprimierung, Größenanpassung und WebP Qualität und Dateigröße in Einklang bringen.",
    excerpt:
      "Beschleunigen Sie Ihre Seite mit Bildkomprimierung und den richtigen Formaten — schneller, ohne Qualitätsverlust.",
    readingTime: "10 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Bilder sind die schwersten Assets fast jeder Webseite und verantworten oft über 50 % der geladenen Bytes. Die Optimierung von Bildern ist der größte Leistungsgewinn für die meisten Websites. Dieser Leitfaden erklärt Komprimierung, Größenanpassung und Formatwahl."] },
    { type: "h2", content: ["Warum die Größe zählt"] },
    { type: "p", content: ["Große Bilder verzögern das Rendering, verbrauchen mobile Daten und verschlechtern die Suchmaschinenplatzierung. Core Web Vitals belohnen richtig dimensionierte und komprimierte Bilder."] },
    { type: "h2", content: ["Komprimierung: Qualität vs. Dateigröße"] },
    { type: "list", items: [
      [{ text: "Verlustbehaftet ", bold: true }, { text: "(JPEG, WebP): verwirft Details; ideal ab Qualität 70–85." }],
      [{ text: "Verlustfrei ", bold: true }, { text: "(PNG): behält jedes Pixel; für Screenshots und Text." }],
    ]},
    { type: "p", content: ["Fotos wandeln Sie in stark komprimiertes WebP, Grafiken mit Text bleiben in PNG. Komprimierung im Browser läuft lokal — Ihre Bilder verlassen nie Ihr Gerät."] },
    { type: "h2", content: ["Das richtige Format"] },
    { type: "note", tone: "success", title: "Schnellauswahl", content: [
      { text: "Fotos → ", bold: true }, { text: "WebP oder JPEG (75–85). " },
      { text: "Screenshots, Logos → ", bold: true }, { text: "PNG. " },
      { text: "Web → ", bold: true }, { text: "WebP: 25–35 % kleiner als JPEG." },
    ]},
    { type: "h2", content: ["Fünf Schritte zur Optimierung"] },
    { type: "list", ordered: true, items: [
      [{ text: "Größe anpassen ", bold: true }, { text: "auf die maximale Anzeigebreite." }],
      [{ text: "Format wählen ", bold: true }, { text: "nach Inhaltstyp." }],
      [{ text: "Komprimieren ", bold: true }, { text: "ab Qualität 80 nachjustieren." }],
      [{ text: "Vorschau ", bold: true }, { text: "und mit dem Original vergleichen." }],
      [{ text: "Exportieren ", bold: true }, { text: "und einbinden." }],
    ]},
    { type: "h2", content: ["Optimierung mit Convrs"] },
    { type: "p", content: ["Convrs bietet Bildkompressor, Resizer, JPG→WebP und WebP→PNG — alle im Browser via WebAssembly, ohne Upload und ohne Dateilimit."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Cómo optimizar imágenes para la web: compresión, redimensionado y formatos",
    eyebrow: "Imagen",
    description:
      "La optimización de imágenes es la forma más rápida de acelerar tu sitio. Aprende cómo la compresión, el redimensionado y formatos como WebP equilibran calidad y tamaño.",
    excerpt:
      "Acelera tu sitio dominando la compresión, el redimensionado y la elección de formato — sin pérdida de calidad.",
    readingTime: "9 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Las imágenes son los activos más pesados de casi cualquier página web. La optimización de imágenes es la mejora de rendimiento de mayor impacto para la mayoría de los sitios. Esta guía explica compresión, redimensionado y elección de formato."] },
    { type: "h2", content: ["Por qué importa el tamaño"] },
    { type: "p", content: ["Las imágenes grandes retrasan la carga, consumen datos móviles y perjudican el posicionamiento. Core Web Vitals premia las imágenes correctamente dimensionadas y comprimidas."] },
    { type: "h2", content: ["Compresión: calidad frente a tamaño"] },
    { type: "list", items: [
      [{ text: "Con pérdida ", bold: true }, { text: "(JPEG, WebP): descarta detalles; ideal 70–85 de calidad." }],
      [{ text: "Sin pérdida ", bold: true }, { text: "(PNG): conserva cada píxel; para capturas y texto." }],
    ]},
    { type: "h2", content: ["Elegir el formato correcto"] },
    { type: "note", tone: "success", title: "Selección rápida", content: [
      { text: "Fotos → ", bold: true }, { text: "WebP o JPEG (75–85). " },
      { text: "Capturas, logos → ", bold: true }, { text: "PNG. " },
      { text: "Web → ", bold: true }, { text: "WebP: 25–35 % más pequeño que JPEG." },
    ]},
    { type: "h2", content: ["Optimización con Convrs"] },
    { type: "p", content: ["Convrs ofrece compresor, redimensionador, JPG→WebP y WebP→PNG — todo en el navegador con WebAssembly, sin subidas y sin límite de archivos."] },
  ],
};

const imageOptimizationGuide: GuideDefinition = {
  slug: "image-optimization-for-web-speed",
  content: { en, tr, de, es },
};

export default imageOptimizationGuide;