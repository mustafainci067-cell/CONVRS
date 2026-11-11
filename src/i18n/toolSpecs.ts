/**
 * Her dönüştürücü ve geliştirici aracı için:
 * 1. Format Teknik Profilleri (MIME türü, dosya uzantısı, sıkıştırma/kodlama,
 *    şeffaflık/yapı desteği, Avantajlar ve Dezavantajlar).
 * 2. Araca Özel Tarayıcı İşleme Motoru (Canvas 2D, WebAssembly FFmpeg, libheif,
 *    ONNX Runtime, pdf-lib, PDF.js, SheetJS, Mammoth, Web Crypto API, Web Audio API vb.)
 *    ve teknik mimari açıklamaları.
 * 3. Araca ve formata özel ek teknik SSS (FAQ) çiftleri.
 *
 * Bu modül yalnızca sunucu bileşenlerinde (SEOContentBlock, ToolSeoContent, ToolJsonLd)
 * kullanılır; istemci JS paketine (client bundle) girmez.
 */

export type LocaleCode = "en" | "tr" | "de" | "es";

export type LocalizedText = Record<LocaleCode, string>;
export type LocalizedList = Record<LocaleCode, string[]>;

export type FormatSpec = {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  compression: LocalizedText;
  transparencyOrStructure: LocalizedText;
  pros: LocalizedList;
  cons: LocalizedList;
};

export type ToolTechSpec = {
  fromFormat: string;
  toFormat: string;
  engine: string;
  pipelineSummary: LocalizedText;
  bestPracticeTip: LocalizedText;
};

export const FORMAT_SPECS: Record<string, FormatSpec> = {
  HEIC: {
    id: "HEIC",
    name: "HEIC (High Efficiency Image Container)",
    extension: ".heic, .heif",
    mimeType: "image/heic",
    compression: {
      en: "HEVC (H.265) intra-frame lossy & lossless compression",
      tr: "HEVC (H.265) kare içi kayıplı ve kayıpsız sıkıştırma",
      de: "HEVC (H.265) Intra-Frame verlustbehaftete & verlustfreie Kompression",
      es: "Compresión intra-cuadro HEVC (H.265) con y sin pérdida",
    },
    transparencyOrStructure: {
      en: "10-bit/16-bit color depth, alpha channel, depth maps & Live Photos",
      tr: "10-bit/16-bit renk derinliği, alfa kanalı, derinlik haritası ve Canlı Fotoğraf",
      de: "10-Bit/16-Bit Farbtiefe, Alphakanal, Tiefenkarten & Live Photos",
      es: "Profundidad de color de 10/16 bits, canal alfa, mapas de profundidad y Live Photos",
    },
    pros: {
      en: [
        "Up to 50% smaller file size than JPG at equivalent visual quality",
        "Supports 10-bit HDR color gradients without sky banding",
        "Stores burst shots, depth maps, and non-destructive edits in one container",
      ],
      tr: [
        "Aynı görsel kalitede JPG'ye kıyasla %50'ye kadar daha küçük dosya boyutu",
        "Gökyüzü geçişlerinde bantlaşmayı önleyen 10-bit HDR renk derinliği",
        "Seri çekimleri, derinlik haritalarını ve yıkıcı olmayan düzenlemeleri tek kapta tutar",
      ],
      de: [
        "Bis zu 50 % kleinere Dateigröße als JPG bei gleicher Bildqualität",
        "Unterstützt 10-Bit-HDR-Farbverläufe ohne Banding-Artefakte",
        "Speichert Serienbilder, Tiefenkarten und nicht-destruktive Bearbeitungen in einem Container",
      ],
      es: [
        "Hasta un 50 % menos de tamaño de archivo que JPG con calidad visual equivalente",
        "Admite degradados de color HDR de 10 bits sin bandas visibles",
        "Almacena ráfagas, mapas de profundidad y ediciones no destructivas en un solo contenedor",
      ],
    },
    cons: {
      en: [
        "Not natively supported by standard HTML <img> tags in Chrome, Firefox, or Edge",
        "Requires paid or extra codec extensions on older Windows and Linux systems",
        "Rejected by many legacy government portals, CMS uploaders, and print shops",
      ],
      tr: [
        "Chrome, Firefox ve Edge gibi web tarayıcılarında doğrudan <img> etiketiyle açılmaz",
        "Eski Windows ve Linux sistemlerinde ek kodek paketi kurulumu gerektirir",
        "Birçok resmi kurum portalı, eski CMS yükleyicisi ve baskı merkezi tarafından reddedilir",
      ],
      de: [
        "Wird von Standard-HTML-<img>-Tags in Chrome, Firefox oder Edge nicht nativ unterstützt",
        "Erfordert zusätzliche Codec-Erweiterungen unter älteren Windows- und Linux-Systemen",
        "Wird von vielen älteren Behördenportalen, CMS-Uploadern und Druckereien abgelehnt",
      ],
      es: [
        "No es compatible de forma nativa con etiquetas <img> en Chrome, Firefox o Edge",
        "Requiere extensiones de códec adicionales en sistemas Windows y Linux antiguos",
        "Rechazado por muchos portales gubernamentales antiguos, CMS y servicios de imprenta",
      ],
    },
  },
  JPG: {
    id: "JPG",
    name: "JPEG (Joint Photographic Experts Group)",
    extension: ".jpg, .jpeg",
    mimeType: "image/jpeg",
    compression: {
      en: "Lossy 8×8 Discrete Cosine Transform (DCT) with chroma subsampling",
      tr: "Kroma alt örnekleme destekli kayıplı 8×8 Ayrık Kosinüs Dönüşümü (DCT)",
      de: "Verlustbehaftete 8×8 Diskrete Kosinustransformation (DCT) mit Chroma-Subsampling",
      es: "Transformada de Coseno Discreta (DCT) 8×8 con pérdida y submuestreo de croma",
    },
    transparencyOrStructure: {
      en: "8-bit RGB (16.7M colors), no transparency (alpha channel unsupported)",
      tr: "8-bit RGB (16,7 milyon renk), şeffaflık (alfa kanalı) desteklenmez",
      de: "8-Bit RGB (16,7 Mio. Farben), keine Transparenz (kein Alphakanal)",
      es: "RGB de 8 bits (16,7M de colores), sin soporte de transparencia (canal alfa)",
    },
    pros: {
      en: [
        "100% universal compatibility across every browser, OS, camera, and printer since 1992",
        "Adjustable quality-to-size ratio (e.g., 75–92%) ideal for real-world photographs",
        "Extremely fast hardware-accelerated decoding on all mobile and desktop CPUs",
      ],
      tr: [
        "1992'den bu yana üretilen her tarayıcı, işletim sistemi, kamera ve yazıcıda %100 evrensel uyum",
        "Gerçek dünya fotoğrafları için ayarlanabilir kalite/boyut oranı (%75–%92 arası ideal denge)",
        "Tüm mobil ve masaüstü işlemcilerde donanım hızlandırmalı çok hızlı çözme (decoding)",
      ],
      de: [
        "100 % universelle Kompatibilität mit jedem Browser, Betriebssystem, Drucker und jeder Kamera",
        "Einstellbares Qualitäts-Größen-Verhältnis (75–92 %) ideal für reale Fotografien",
        "Extrem schnelle hardwarebeschleunigte Dekodierung auf allen Mobil- und Desktop-CPUs",
      ],
      es: [
        "Compatibilidad universal del 100 % en todos los navegadores, sistemas operativos, cámaras e impresoras",
        "Relación calidad/tamaño ajustable (75–92 %) ideal para fotografías reales",
        "Decodificación acelerada por hardware extremadamente rápida en móviles y escritorio",
      ],
    },
    cons: {
      en: [
        "Does not support transparent backgrounds (transparent pixels flatten to solid color)",
        "Generational quality loss: re-saving a JPG repeatedly introduces blocky artifacts",
        "25–35% larger file size than modern WebP at the same perceived visual fidelity",
      ],
      tr: [
        "Şeffaf arka plan desteklemez (saydam pikseller düz beyaz/siyah renge düzleştirilir)",
        "Her yeniden kayıtta kalite kaybı (nesil kaybı) ve keskin kenarlarda bloklaşma üretir",
        "Aynı algılanan görsel kalitede modern WebP formatına göre %25–35 daha fazla yer kaplar",
      ],
      de: [
        "Unterstützt keine transparenten Hintergründe (Transparenz wird durch Vollfarbe ersetzt)",
        "Generationsverlust: Mehrfaches Speichern erzeugt sichtbare Blockartefakte",
        "25–35 % größere Dateien als modernes WebP bei gleicher wahrgenommener Qualität",
      ],
      es: [
        "No admite fondos transparentes (los píxeles transparentes se rellenan con color sólido)",
        "Pérdida generacional: volver a guardar un JPG repetidamente introduce artefactos de bloque",
        "Tamaño de archivo entre un 25 % y un 35 % mayor que WebP con la misma calidad visual",
      ],
    },
  },
  PNG: {
    id: "PNG",
    name: "PNG (Portable Network Graphics)",
    extension: ".png",
    mimeType: "image/png",
    compression: {
      en: "Lossless DEFLATE (LZ77 + Huffman coding) with scanline pre-filtering",
      tr: "Tarama satırı ön filtrelemeli kayıpsız DEFLATE (LZ77 + Huffman kodlaması)",
      de: "Verlustfreie DEFLATE-Kompression (LZ77 + Huffman) mit Scanline-Vorfilterung",
      es: "Compresión sin pérdida DEFLATE (LZ77 + Huffman) con prefiltrado de líneas",
    },
    transparencyOrStructure: {
      en: "24-bit RGB + full 8-bit Alpha channel (256 levels of smooth transparency)",
      tr: "24-bit RGB + tam 8-bit Alfa kanalı (256 seviye yumuşak yarı saydamlık)",
      de: "24-Bit RGB + voller 8-Bit-Alphakanal (256 Stufen weiche Transparenz)",
      es: "RGB de 24 bits + canal alfa completo de 8 bits (256 niveles de transparencia suave)",
    },
    pros: {
      en: [
        "100% lossless pixel reproduction: crisp text, UI screenshots, and sharp vector edges never blur",
        "Full 8-bit alpha channel for smooth drop shadows, glass effects, and transparent cutouts",
        "No generational degradation when edited and saved multiple times",
      ],
      tr: [
        "%100 kayıpsız piksel koruma: metinler, arayüz ekran görüntüleri ve keskin kenarlar asla bulanıklaşmaz",
        "Yumuşak gölgeler, cam efektleri ve dekupe görseller için tam 8-bit alfa şeffaflık kanalı",
        "Defalarca düzenlenip kaydedildiğinde dahi hiçbir kalite veya veri kaybı yaşanmaz",
      ],
      de: [
        "100 % verlustfreie Pixelwiedergabe: scharfer Text, UI-Screenshots und Kanten verschwimmen nie",
        "Voller 8-Bit-Alphakanal für weiche Schlagschatten und freigestellte Motive",
        "Kein Qualitätsverlust bei mehrfachem Bearbeiten und erneutem Speichern",
      ],
      es: [
        "Reproducción de píxeles 100 % sin pérdida: textos nítidos, capturas de interfaz y bordes definidos",
        "Canal alfa completo de 8 bits para sombras suaves, recortes y fondos transparentes",
        "Sin degradación de calidad al editar y guardar el archivo múltiples veces",
      ],
    },
    cons: {
      en: [
        "Very large file sizes when used for camera photographs (often 3× to 6× larger than JPG/WebP)",
        "Does not support CMYK color spaces for commercial offset printing",
        "Slower network transfer times on mobile connections if unoptimized",
      ],
      tr: [
        "Kamera fotoğraflarında çok büyük dosya boyutu üretir (JPG/WebP'den 3 ila 6 kat daha büyük)",
        "Ticari ofset baskı için CMYK renk uzayını yerel olarak desteklemez",
        "Optimize edilmediğinde mobil bağlantılarda sayfa yükleme süresini (LCP) yavaşlatır",
      ],
      de: [
        "Sehr große Dateien bei Kamerafotos (oft 3× bis 6× größer als JPG/WebP)",
        "Unterstützt keinen CMYK-Farbraum für den kommerziellen Offsetdruck",
        "Langsamere Ladezeiten im Mobilfunknetz bei unkomprimierten Fotodateien",
      ],
      es: [
        "Archivos muy pesados al usarse en fotografías de cámara (de 3 a 6 veces más grandes que JPG/WebP)",
        "No admite el espacio de color CMYK para impresión offset comercial",
        "Mayor tiempo de descarga en redes móviles si se usa sin optimizar",
      ],
    },
  },
  WebP: {
    id: "WebP",
    name: "WebP (Web Picture Format)",
    extension: ".webp",
    mimeType: "image/webp",
    compression: {
      en: "Predictive VP8 block coding (lossy) & VP8L spatial entropy coding (lossless)",
      tr: "Tahminsel VP8 blok kodlama (kayıplı) ve VP8L uzamsal entropi kodlama (kayıpsız)",
      de: "Prädiktive VP8-Blockkodierung (verlustbehaftet) & VP8L-Entropiekodierung (verlustfrei)",
      es: "Codificación predictiva de bloques VP8 (con pérdida) y entropía espacial VP8L (sin pérdida)",
    },
    transparencyOrStructure: {
      en: "8-bit alpha channel in both lossy and lossless modes + multi-frame animation",
      tr: "Hem kayıplı hem kayıpsız modda 8-bit alfa şeffaflığı + çok kareli animasyon",
      de: "8-Bit-Alphakanal im verlustbehafteten und verlustfreien Modus + Animation",
      es: "Canal alfa de 8 bits tanto en modo con pérdida como sin pérdida + animación",
    },
    pros: {
      en: [
        "25–34% smaller than JPG and 26% smaller than PNG while preserving visual quality",
        "Combines lossy compression with alpha transparency (impossible in JPG)",
        "Directly improves Google Core Web Vitals (LCP) and SEO page speed scores",
      ],
      tr: [
        "Görsel kaliteyi korurken JPG'den %25–34, PNG'den %26 daha küçük dosya boyutu sağlar",
        "Kayıplı sıkıştırma ile alfa şeffaflığını birleştirir (JPG'de imkansız, PNG'den çok daha hafif)",
        "Google Core Web Vitals (LCP) ve sayfa hızı SEO puanlarını doğrudan iyileştirir",
      ],
      de: [
        "25–34 % kleiner als JPG und 26 % kleiner als PNG bei vergleichbarer Qualität",
        "Kombiniert verlustbehaftete Kompression mit Alpha-Transparenz (in JPG unmöglich)",
        "Verbessert direkt Google Core Web Vitals (LCP) und PageSpeed-SEO-Werte",
      ],
      es: [
        "Un 25–34 % más pequeño que JPG y un 26 % menor que PNG manteniendo la calidad visual",
        "Combina compresión con pérdida y transparencia alfa (imposible en JPG)",
        "Mejora directamente las métricas Core Web Vitals (LCP) de Google y la velocidad SEO",
      ],
    },
    cons: {
      en: [
        "Some legacy desktop photo editors and older print workflows require PNG or JPG",
        "Cannot be opened by very old browsers (pre-2020 Safari/IE) without fallback",
        "Not intended for print-press CMYK workflows",
      ],
      tr: [
        "Bazı eski masaüstü görsel düzenleyiciler ve matbaa iş akışları hala PNG veya JPG talep eder",
        "2020 öncesi çok eski tarayıcılarda yedek (fallback) olmadan görüntülenemeyebilir",
        "CMYK tabanlı ticari matbaa baskı iş akışları için tasarlanmamıştır",
      ],
      de: [
        "Einige ältere Desktop-Bildprogramme und Druck-Workflows verlangen weiterhin PNG oder JPG",
        "Wird von sehr alten Browsern (vor 2020) ohne Fallback nicht unterstützt",
        "Nicht für CMYK-basierte Druckvorstufen konzipiert",
      ],
      es: [
        "Algunos editores de escritorio antiguos y flujos de imprenta aún requieren PNG o JPG",
        "No compatible con navegadores muy antiguos (anteriores a 2020) sin etiqueta de respaldo",
        "No está diseñado para flujos de impresión comercial en CMYK",
      ],
    },
  },
  SVG: {
    id: "SVG",
    name: "SVG (Scalable Vector Graphics)",
    extension: ".svg",
    mimeType: "image/svg+xml",
    compression: {
      en: "XML-based mathematical vector geometry (paths, Bézier curves, shapes)",
      tr: "XML tabanlı matematiksel vektör geometrisi (yollar, Bézier eğrileri, şekiller)",
      de: "XML-basierte mathematische Vektorgeometrie (Pfade, Bézierkurven, Formen)",
      es: "Geometría vectorial matemática basada en XML (trazos, curvas Bézier, formas)",
    },
    transparencyOrStructure: {
      en: "Infinite resolution scalability, full CSS/DOM styling & transparency",
      tr: "Sonsuz çözünürlük ölçeklenebilirliği, tam CSS/DOM stil ve şeffaflık desteği",
      de: "Unendliche Skalierbarkeit, volles CSS/DOM-Styling & Transparenz",
      es: "Escalabilidad infinita sin pérdida, estilizado CSS/DOM completo y transparencia",
    },
    pros: {
      en: [
        "Scales from a 16px favicon to a 4K retina display with zero pixelation",
        "Tiny file size for logos, icons, and geometric illustrations",
        "Can be styled with CSS, animated with JS, and indexed as text by search engines",
      ],
      tr: [
        "16 piksellik ikondan 4K Retina ekrana kadar sıfır pikselleşme ile sonsuz ölçeklenir",
        "Logo, ikon ve geometrik çizimler için son derece küçük dosya boyutu",
        "CSS ile renklendirilebilir, JS ile canlandırılabilir ve arama motorlarınca okunabilir",
      ],
      de: [
        "Skaliert vom 16px-Icon bis zum 4K-Retina-Display ohne jede Pixelbildung",
        "Winzige Dateigröße für Logos, Icons und geometrische Illustrationen",
        "Mit CSS gestaltbar, mit JS animierbar und von Suchmaschinen als Text lesbar",
      ],
      es: [
        "Escala desde un icono de 16 px hasta pantallas 4K Retina sin pixelarse jamás",
        "Tamaño de archivo mínimo para logotipos, iconos e ilustraciones geométricas",
        "Se puede estilizar con CSS, animar con JS e indexar como texto en buscadores",
      ],
    },
    cons: {
      en: [
        "Rejected by most social media profile/post uploaders, email clients, and marketplaces",
        "Not suitable for complex camera photographs with millions of color pixels",
        "Custom web fonts inside SVG may not render unless converted to paths or rasterized to PNG",
      ],
      tr: [
        "Sosyal medya platformları, e-posta istemcileri ve pazaryeri yükleyicileri tarafından kabul edilmez",
        "Milyonlarca renk pikseli içeren karmaşık kamera fotoğrafları için uygun değildir",
        "İçindeki özel fontlar yola (path) veya PNG'ye dönüştürülmezse başka cihazlarda bozuk görünebilir",
      ],
      de: [
        "Wird von den meisten Social-Media-Plattformen, E-Mail-Clients und Marktplätzen abgelehnt",
        "Ungeeignet für komplexe Kamerafotos mit Millionen einzelner Farbpixel",
        "Eingebettete Schriften können fehlen, wenn sie nicht in Pfade oder PNG gerastert werden",
      ],
      es: [
        "Rechazado por la mayoría de redes sociales, clientes de correo y tiendas en línea",
        "Inadecuado para fotografías complejas con millones de píxeles de distinto color",
        "Las fuentes personalizadas pueden fallar si no se convierten en trazos o se rasterizan a PNG",
      ],
    },
  },
  ICO: {
    id: "ICO",
    name: "ICO (Microsoft Windows Icon Container)",
    extension: ".ico",
    mimeType: "image/x-icon",
    compression: {
      en: "Multi-resolution container storing uncompressed BMP/DIB or PNG frames",
      tr: "Sıkıştırılmamış BMP/DIB veya PNG kareleri barındıran çok çözünürlüklü kap",
      de: "Multi-Auflösungs-Container mit unkomprimierten BMP/DIB- oder PNG-Bildern",
      es: "Contenedor multirresolución con marcos BMP/DIB sin comprimir o PNG",
    },
    transparencyOrStructure: {
      en: "Bundles multiple sizes (16×16, 32×32, 48×48, 256×256) with 8-bit alpha",
      tr: "Birden fazla boyutu (16×16, 32×32, 48×48, 256×256) 8-bit alfa ile tek dosyada paketler",
      de: "Bündelt mehrere Größen (16×16, 32×32, 48×48, 256×256) mit 8-Bit-Alpha",
      es: "Agrupa múltiples tamaños (16×16, 32×32, 48×48, 256×256) con alfa de 8 bits",
    },
    pros: {
      en: [
        "Default `/favicon.ico` standard automatically requested by all browsers and crawlers",
        "Stores multiple icon resolutions inside a single file for crisp taskbar/tab rendering",
        "Natively supported by Windows executables and desktop shortcuts",
      ],
      tr: [
        "Tüm tarayıcıların ve botların kök dizinde otomatik aradığı `/favicon.ico` standardı",
        "Sekme ve görev çubuğunda net görünüm için birden çok çözünürlüğü tek dosyada barındırır",
        "Windows masaüstü kısayolları ve uygulama ikonları tarafından yerel olarak desteklenir",
      ],
      de: [
        "Standardmäßige `/favicon.ico`-Datei, die von allen Browsern und Crawlern abgerufen wird",
        "Speichert mehrere Auflösungen in einer Datei für scharfe Tab- und Taskleisten-Icons",
        "Wird nativ von Windows-Verknüpfungen und Desktop-Anwendungen unterstützt",
      ],
      es: [
        "Estándar `/favicon.ico` solicitado automáticamente por todos los navegadores y rastreadores",
        "Almacena múltiples resoluciones en un solo archivo para pestañas y barras de tareas nítidas",
        "Compatible de forma nativa con accesos directos y ejecutables de Windows",
      ],
    },
    cons: {
      en: [
        "Cannot be easily edited or imported into Figma, Canva, or modern CMS media libraries",
        "Uncompressed BMP frames inside legacy ICO files inflate file size unnecessarily",
        "Limited use outside browser favicons and Windows system icons",
      ],
      tr: [
        "Figma, Canva veya modern CMS medya kütüphanelerine doğrudan yüklenip düzenlenemez",
        "Eski tip ICO dosyalarındaki sıkıştırılmamış BMP katmanları dosya boyutunu şişirir",
        "Tarayıcı favicon'ları ve Windows sistem ikonları dışında kullanım alanı sınırlıdır",
      ],
      de: [
        "Lässt sich nicht direkt in Figma, Canva oder moderne CMS-Mediatheken importieren",
        "Unkomprimierte BMP-Frames in älteren ICO-Dateien blähen die Dateigröße unnötig auf",
        "Außerhalb von Browser-Favicons und Windows-Systemsymbolen kaum nutzbar",
      ],
      es: [
        "No se puede importar ni editar directamente en Figma, Canva o bibliotecas CMS modernas",
        "Los marcos BMP sin comprimir en archivos ICO antiguos inflan el tamaño innecesariamente",
        "Uso muy limitado fuera de favicons web e iconos del sistema Windows",
      ],
    },
  },
  PDF: {
    id: "PDF",
    name: "PDF (Portable Document Format — ISO 32000)",
    extension: ".pdf",
    mimeType: "application/pdf",
    compression: {
      en: "Object stream dictionary with Flate (ZIP), JPEG DCT, and JBIG2 compression",
      tr: "Flate (ZIP), JPEG DCT ve JBIG2 sıkıştırmalı nesne akışı sözlüğü",
      de: "Objektstream-Struktur mit Flate- (ZIP), JPEG-DCT- und JBIG2-Kompression",
      es: "Diccionario de objetos con compresión Flate (ZIP), JPEG DCT y JBIG2",
    },
    transparencyOrStructure: {
      en: "Multi-page fixed-layout vector graphics, embedded fonts, raster images & metadata",
      tr: "Çok sayfalı sabit mizanpaj, vektörel çizimler, gömülü fontlar ve görsel katmanları",
      de: "Mehrseitiges Festlayout mit Vektorgrafiken, eingebetteten Schriften & Bildern",
      es: "Diseño fijo multipágina con gráficos vectoriales, fuentes incrustadas e imágenes",
    },
    pros: {
      en: [
        "Preserves exact typography, margins, and page breaks across every OS and printer",
        "Standard format for legal contracts, invoices, academic papers, and official submissions",
        "Combines searchable vector text with high-resolution raster graphics in one file",
      ],
      tr: [
        "Her işletim sistemi ve yazıcıda yazı tiplerini, kenar boşluklarını ve sayfa düzenini birebir korur",
        "Sözleşmeler, e-faturalar, akademik makaleler ve resmi başvurular için küresel standarttır",
        "Aranabilir vektörel metin ile yüksek çözünürlüklü görselleri tek belgede birleştirir",
      ],
      de: [
        "Bewahrt Typografie, Seitenränder und Umbrüche exakt auf jedem System und Drucker",
        "Weltweiter Standard für Verträge, Rechnungen, wissenschaftliche Arbeiten und Behörden",
        "Kombiniert durchsuchbaren Vektortext mit hochauflösenden Bildern in einer Datei",
      ],
      es: [
        "Conserva exactamente la tipografía, los márgenes y los saltos de página en cualquier sistema",
        "Estándar mundial para contratos legales, facturas, artículos académicos y trámites oficiales",
        "Combina texto vectorial buscable con gráficos de alta resolución en un solo documento",
      ],
    },
    cons: {
      en: [
        "Difficult to edit paragraphs or reflow text directly without specialized software",
        "Cannot be embedded inside standard HTML `<img>` tags or social media image carousels",
        "Extracting raw text or individual pages requires a PDF parser or renderer",
      ],
      tr: [
        "Özel bir yazılım olmadan paragrafları yeniden düzenlemek ve metin akışını değiştirmek zordur",
        "Web sayfalarında standart `<img>` etiketiyle veya sosyal medya görsel galerilerinde gösterilemez",
        "Ham metni çekmek veya belirli sayfaları ayırmak için PDF ayrıştırıcı motor gerektirir",
      ],
      de: [
        "Absätze und Textfluss lassen sich ohne Spezialsoftware nur schwer nachträglich bearbeiten",
        "Kann nicht in Standard-HTML-`<img>`-Tags oder Social-Media-Bildgalerien eingebettet werden",
        "Das Extrahieren von Rohtext oder einzelnen Seiten erfordert einen PDF-Parser",
      ],
      es: [
        "Difícil de editar párrafos o reajustar el flujo de texto sin software especializado",
        "No puede insertarse en etiquetas `<img>` de HTML ni en galerías de imágenes de redes sociales",
        "Extraer texto plano o páginas individuales requiere un motor de análisis PDF",
      ],
    },
  },
  DOCX: {
    id: "DOCX",
    name: "DOCX (Office Open XML Document — ECMA-376)",
    extension: ".docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    compression: {
      en: "ZIP archive containing WordprocessingML XML trees, styles, and media assets",
      tr: "WordprocessingML XML ağaçlarını, stilleri ve medya dosyalarını barındıran ZIP arşivi",
      de: "ZIP-Archiv mit WordprocessingML-XML-Strukturen, Formatvorlagen und Medien",
      es: "Archivo ZIP con árboles XML WordprocessingML, estilos y recursos multimedia",
    },
    transparencyOrStructure: {
      en: "Reflowable rich text, paragraphs, tables, headers/footers, and embedded images",
      tr: "Akışkan zengin metin, paragraflar, tablolar, üst/alt bilgiler ve gömülü görseller",
      de: "Fließender Rich-Text, Absätze, Tabellen, Kopf-/Fußzeilen und eingebettete Bilder",
      es: "Texto enriquecido fluido, párrafos, tablas, encabezados/pies de página e imágenes",
    },
    pros: {
      en: [
        "Industry standard for collaborative document authoring, redlining, and text editing",
        "Compact ZIP-compressed XML structure that is resistant to binary file corruption",
        "Supported by Microsoft Word, Google Docs, LibreOffice, and Apple Pages",
      ],
      tr: [
        "Metin yazarlığı, ortak düzenleme ve revizyon takibi için endüstri standardı",
        "Bozulmalara karşı dayanıklı, ZIP ile sıkıştırılmış açık XML paket mimarisi",
        "Microsoft Word, Google Dokümanlar, LibreOffice ve Apple Pages ile tam uyumlu",
      ],
      de: [
        "Industriestandard für Textverarbeitung, gemeinsame Bearbeitung und Korrekturen",
        "Kompakte, ZIP-komprimierte XML-Struktur mit hoher Schutzsicherheit gegen Dateikorruption",
        "Unterstützt von Microsoft Word, Google Docs, LibreOffice und Apple Pages",
      ],
      es: [
        "Estándar de la industria para redacción colaborativa, control de cambios y edición de texto",
        "Estructura XML comprimida en ZIP compacta y resistente a la corrupción de archivos",
        "Compatible con Microsoft Word, Google Docs, LibreOffice y Apple Pages",
      ],
    },
    cons: {
      en: [
        "Page breaks, fonts, and table layouts can shift when opened on different devices",
        "Recipients can accidentally modify content unless exported to a locked/fixed PDF",
        "Not directly viewable in mobile browsers without an external office viewer",
      ],
      tr: [
        "Farklı cihazlarda veya eksik font bulunan bilgisayarlarda sayfa kaymaları yaşanabilir",
        "Sabit mizanpajlı PDF'e dönüştürülmezse alıcı tarafından yanlışlıkla değiştirilebilir",
        "Mobil tarayıcılarda harici bir ofis görüntüleyici olmadan doğrudan açılamaz",
      ],
      de: [
        "Seitenumbrüche, Schriften und Tabellen können sich auf anderen Geräten verschieben",
        "Inhalte können vom Empfänger versehentlich verändert werden, sofern nicht als PDF fixiert",
        "In mobilen Browsern ohne externen Office-Viewer nicht direkt darstellbar",
      ],
      es: [
        "Los saltos de página, las fuentes y las tablas pueden desplazarse al abrirse en otro equipo",
        "El destinatario puede modificar el contenido accidentalmente si no se exporta a PDF fijo",
        "No se visualiza directamente en navegadores móviles sin un visor ofimático externo",
      ],
    },
  },
  XLSX: {
    id: "XLSX",
    name: "XLSX (Office Open XML Spreadsheet)",
    extension: ".xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    compression: {
      en: "ZIP-compressed XML workbook containing shared string tables and worksheet grids",
      tr: "Paylaşımlı metin tabloları ve çalışma sayfası hücrelerini içeren ZIP/XML çalışma kitabı",
      de: "ZIP-komprimierte XML-Arbeitsmappe mit Shared-String-Tabellen und Arbeitsblättern",
      es: "Libro XML comprimido en ZIP con tablas de cadenas compartidas y hojas de cálculo",
    },
    transparencyOrStructure: {
      en: "Multi-sheet workbooks, formulas, typed cells (number/date/boolean), and styling",
      tr: "Çoklu çalışma sayfası, formüller, tipli hücreler (sayı/tarih/mantıksal) ve hücre stilleri",
      de: "Mehrere Tabellenblätter, Formeln, typisierte Zellen (Zahl/Datum/Boolean) und Stile",
      es: "Múltiples hojas, fórmulas, celdas tipadas (número/fecha/booleano) y formato visual",
    },
    pros: {
      en: [
        "Supports up to 1,048,576 rows and 16,384 columns per sheet with rich formulas",
        "Preserves data types, number formatting, currency symbols, and multiple tabs",
        "Native format for Microsoft Excel and enterprise financial modeling",
      ],
      tr: [
        "Sayfa başına 1.048.576 satır ve 16.384 sütun ile karmaşık formülleri destekler",
        "Veri tiplerini, sayı biçimlendirmesini, para birimlerini ve çoklu sekmeleri korur",
        "Microsoft Excel ve kurumsal finansal raporlama için ana dosya formatıdır",
      ],
      de: [
        "Unterstützt bis zu 1.048.576 Zeilen und 16.384 Spalten pro Blatt inklusive Formeln",
        "Bewahrt Datentypen, Zahlenformate, Währungssymbole und mehrere Arbeitsblätter",
        "Natives Format für Microsoft Excel und Unternehmensfinanzmodelle",
      ],
      es: [
        "Admite hasta 1.048.576 filas y 16.384 columnas por hoja con fórmulas avanzadas",
        "Conserva tipos de datos, formato numérico, símbolos de moneda y múltiples pestañas",
        "Formato nativo de Microsoft Excel y modelado financiero empresarial",
      ],
    },
    cons: {
      en: [
        "Binary ZIP container cannot be parsed directly by simple CLI scripts, SQL `COPY`, or REST APIs",
        "Requires heavy libraries to read compared to lightweight plain-text CSV or JSON",
        "Not human-readable in code editors or Git diffs",
      ],
      tr: [
        "İkili ZIP yapısı nedeniyle SQL `COPY`, basit CLI betikleri veya REST API'ler tarafından doğrudan okunamaz",
        "Düz metin CSV veya JSON'a kıyasla okunması için özel ayrıştırıcı kütüphane gerektirir",
        "Kod editörlerinde veya Git sürüm karşılaştırmalarında (diff) doğrudan okunamaz",
      ],
      de: [
        "Binärer ZIP-Container kann nicht direkt von einfachen Skripten, SQL `COPY` oder APIs gelesen werden",
        "Erfordert spezielle Parser-Bibliotheken im Vergleich zu leichtgewichtigem CSV oder JSON",
        "In Code-Editoren oder Git-Diffs nicht direkt menschenlesbar",
      ],
      es: [
        "El contenedor ZIP binario no puede ser leído directamente por scripts simples, SQL `COPY` o APIs",
        "Requiere bibliotecas pesadas para su lectura frente a texto plano CSV o JSON",
        "No es legible por humanos en editores de código ni en comparaciones de Git (diffs)",
      ],
    },
  },
  CSV: {
    id: "CSV",
    name: "CSV (Comma-Separated Values — RFC 4180)",
    extension: ".csv",
    mimeType: "text/csv",
    compression: {
      en: "Uncompressed UTF-8 plain text with delimiter-separated records",
      tr: "Ayırıcı karakterlerle (virgül/noktalı virgül) ayrılmış UTF-8 düz metin",
      de: "Unkomprimierter UTF-8-Klartext mit trennzeichengetrennten Datensätzen",
      es: "Texto plano UTF-8 sin comprimir con registros separados por delimitadores",
    },
    transparencyOrStructure: {
      en: "Flat 2D tabular structure (header row + data rows) with RFC 4180 quote escaping",
      tr: "RFC 4180 tırnak kaçış kurallarına sahip düz 2 boyutlu tablo (başlık + veri satırları)",
      de: "Flache 2D-Tabellenstruktur (Kopfzeile + Datenzeilen) mit RFC-4180-Maskierung",
      es: "Estructura tabular 2D plana (encabezado + filas) con escape de comillas RFC 4180",
    },
    pros: {
      en: [
        "Universally accepted by Excel, Google Sheets, PostgreSQL, MySQL, Pandas, and R",
        "Minimal file overhead: pure UTF-8 text that streams millions of rows with low RAM",
        "Human-readable in any text editor and clean to track in version control",
      ],
      tr: [
        "Excel, Google E-Tablolar, PostgreSQL, MySQL, Python Pandas ve R tarafından evrensel kabul görür",
        "Minimum boyut yükü: düşük RAM tüketimiyle milyonlarca satırı işleyebilen saf UTF-8 metin",
        "Herhangi bir metin düzenleyicide açılabilir ve sürüm kontrol sistemlerinde (Git) kolayca izlenir",
      ],
      de: [
        "Universell unterstützt von Excel, Google Sheets, PostgreSQL, MySQL, Pandas und R",
        "Minimaler Overhead: reiner UTF-8-Text, der Millionen Zeilen speicherschonend verarbeitet",
        "In jedem Texteditor lesbar und sauber in Versionsverwaltungssystemen (Git) verfolgbar",
      ],
      es: [
        "Aceptado universalmente por Excel, Google Sheets, PostgreSQL, MySQL, Pandas y R",
        "Mínima sobrecarga: texto puro UTF-8 capaz de procesar millones de filas con poca memoria",
        "Legible en cualquier editor de texto y fácil de auditar en sistemas de control de versiones",
      ],
    },
    cons: {
      en: [
        "Cannot natively represent deeply nested hierarchies or arrays without flattening",
        "All values are stored as strings without explicit schema types (number vs. leading-zero string)",
        "Regional delimiter differences (comma `,` vs. semicolon `;`) require careful parsing",
      ],
      tr: [
        "Derinlemesine iç içe geçmiş (nested) nesne ve dizileri düzleştirmeden (flattening) temsil edemez",
        "Tüm değerler metin olarak saklanır; veri tipi şeması (sayı, boolean, baştaki sıfır) barındırmaz",
        "Bölgesel ayırıcı farkları (virgül `,` ve noktalı virgül `;`) dikkatli ayrıştırma gerektirir",
      ],
      de: [
        "Kann tief verschachtelte Hierarchien oder Arrays nicht ohne Abflachung (Flattening) abbilden",
        "Alle Werte sind reine Zeichenketten ohne explizite Datentypen (z. B. führende Nullen)",
        "Regionale Trennzeichenunterschiede (Komma `,` vs. Semikolon `;`) erfordern sauberes Parsing",
      ],
      es: [
        "No puede representar jerarquías anidadas profundas ni arreglos sin aplanamiento previo",
        "Todos los valores se guardan como texto sin tipos de datos explícitos (ej. ceros a la izquierda)",
        "Las diferencias regionales de delimitador (coma `,` vs. punto y coma `;`) requieren atención",
      ],
    },
  },
  JSON: {
    id: "JSON",
    name: "JSON (JavaScript Object Notation — RFC 8259)",
    extension: ".json",
    mimeType: "application/json",
    compression: {
      en: "UTF-8 text serialization of key-value objects and ordered arrays",
      tr: "Anahtar-değer nesneleri ve sıralı dizilerin UTF-8 metin serileştirmesi",
      de: "UTF-8-Textserialisierung von Schlüssel-Wert-Objekten und geordneten Arrays",
      es: "Serialización en texto UTF-8 de objetos clave-valor y arreglos ordenados",
    },
    transparencyOrStructure: {
      en: "Hierarchical tree supporting strings, numbers, booleans, null, arrays, and objects",
      tr: "Metin, sayı, boolean, null, dizi ve iç içe nesneleri destekleyen hiyerarşik ağaç",
      de: "Hierarchischer Baum mit Strings, Zahlen, Booleans, null, Arrays und Objekten",
      es: "Árbol jerárquico compatible con cadenas, números, booleanos, null, arreglos y objetos",
    },
    pros: {
      en: [
        "De facto standard for REST APIs, GraphQL responses, NoSQL databases, and web apps",
        "Native, zero-dependency `JSON.parse()` and `JSON.stringify()` in every browser engine",
        "Preserves strict primitive data types (`number`, `boolean`, `null`) and nested arrays",
      ],
      tr: [
        "Modern REST API'ler, NoSQL veritabanları ve web uygulamaları için fiili veri standardı",
        "Her tarayıcı motorunda sıfır bağımlılıkla çalışan yerleşik `JSON.parse()` hızı",
        "İlkel veri tiplerini (`number`, `boolean`, `null`) ve iç içe dizileri kayıpsız korur",
      ],
      de: [
        "De-facto-Standard für REST-APIs, NoSQL-Datenbanken und moderne Webanwendungen",
        "Natives, extrem schnelles `JSON.parse()` und `JSON.stringify()` in jeder Browser-Engine",
        "Bewahrt exakte primitive Datentypen (`number`, `boolean`, `null`) und verschachtelte Arrays",
      ],
      es: [
        "Estándar de facto para APIs REST, bases de datos NoSQL y aplicaciones web modernas",
        "Análisis nativo ultrarrápido mediante `JSON.parse()` en todos los motores de navegador",
        "Conserva tipos de datos primitivos estrictos (`number`, `boolean`, `null`) y arreglos anidados",
      ],
    },
    cons: {
      en: [
        "Does not allow comments (`//` or `#`) or trailing commas, making hand-editing error-prone",
        "Cannot be opened directly as a clean table in older Excel versions without conversion to CSV/XLSX",
        "Verbose braces and quotes compared to YAML for configuration files",
      ],
      tr: [
        "Yorum satırlarına (`//` veya `#`) ve sondaki virgüllere izin vermez; elle düzenlemede hata riski taşır",
        "CSV veya XLSX'e dönüştürülmeden standart tablo programlarında doğrudan çift tıklamayla açılmaz",
        "Yapılandırma dosyalarında YAML'a kıyasla daha fazla süslü parantez ve tırnak işareti içerir",
      ],
      de: [
        "Erlaubt weder Kommentare (`//`, `#`) noch abschließende Kommas, was manuelles Editieren erschwert",
        "Lässt sich ohne Umwandlung in CSV/XLSX nicht direkt als Tabelle in älteren Excel-Versionen öffnen",
        "Mehr Klammern und Anführungszeichen als YAML bei großen Konfigurationsdateien",
      ],
      es: [
        "No permite comentarios (`//` o `#`) ni comas finales, lo que dificulta la edición manual",
        "No se abre directamente como tabla limpia en versiones antiguas de Excel sin convertir a CSV/XLSX",
        "Más verboso en llaves y comillas que YAML para archivos de configuración",
      ],
    },
  },
  XML: {
    id: "XML",
    name: "XML (eXtensible Markup Language — W3C)",
    extension: ".xml",
    mimeType: "application/xml, text/xml",
    compression: {
      en: "Tag-based hierarchical UTF-8 markup with attributes and namespaces",
      tr: "Öznitelik (attribute) ve ad alanı (namespace) destekli etiket tabanlı UTF-8 işaretleme",
      de: "Tag-basierte hierarchische UTF-8-Auszeichnungssprache mit Attributen und Namespaces",
      es: "Lenguaje de marcado jerárquico UTF-8 basado en etiquetas con atributos y espacios de nombres",
    },
    transparencyOrStructure: {
      en: "Strict root-to-leaf DOM tree validated via XSD / DTD schemas",
      tr: "XSD / DTD şemalarıyla doğrulanabilen katı kök-yaprak DOM ağaç yapısı",
      de: "Strikter DOM-Baum mit XSD-/DTD-Schemavalidierung",
      es: "Árbol DOM estricto de raíz a hojas validable mediante esquemas XSD / DTD",
    },
    pros: {
      en: [
        "Supports metadata attributes, XML namespaces, and strict XSD schema validation",
        "Backbone of enterprise SOAP services, RSS/Atom feeds, Sitemaps, and e-invoicing (UBL)",
        "Self-describing hierarchical tags suitable for complex document trees",
      ],
      tr: [
        "Öznitelikleri (attributes), XML ad alanlarını ve katı XSD şema doğrulamasını destekler",
        "Kurumsal SOAP servisleri, e-Fatura (UBL-TR), RSS beslemeleri ve Sitemap dosyalarının temelidir",
        "Karmaşık belge ağaçları için kendi kendini açıklayan hiyerarşik etiket yapısı sunar",
      ],
      de: [
        "Unterstützt Metadaten-Attribute, XML-Namespaces und strikte XSD-Schemavalidierung",
        "Rückgrat für SOAP-Webservices, E-Rechnungen (XRechnung/UBL), RSS-Feeds und Sitemaps",
        "anknüpfungsfähige, selbstbeschreibende Tags für komplexe Dokumentbäume",
      ],
      es: [
        "Admite atributos de metadatos, espacios de nombres XML y validación estricta con XSD",
        "Base de servicios empresariales SOAP, facturación electrónica (UBL), fuentes RSS y Sitemaps",
        "Etiquetas jerárquicas autodescriptivas ideales para documentos complejos",
      ],
    },
    cons: {
      en: [
        "Closing tags repeat every element name, increasing payload size by 30–60% vs. JSON",
        "Requires DOMParser traversal instead of direct JavaScript object property access",
        "Treats all node values as strings unless paired with an external schema",
      ],
      tr: [
        "Her öğe için kapanış etiketi tekrarlandığından JSON'a göre %30–60 daha büyük boyut üretir",
        "JavaScript'te doğrudan nesne erişimi yerine DOMParser ile ağaç taraması gerektirir",
        "Harici bir şema (XSD) yoksa tüm düğüm değerlerini düz metin (string) olarak ele alır",
      ],
      de: [
        "Wiederholte schließende Tags vergrößern die Datenmenge um 30–60 % gegenüber JSON",
        "Erfordert DOMParser-Traversierung statt direktem Zugriff auf JavaScript-Objekte",
        "Behandelt ohne externes Schema alle Knotenwerte als reine Zeichenketten",
      ],
      es: [
        "Las etiquetas de cierre repetidas aumentan el tamaño entre un 30 % y un 60 % frente a JSON",
        "Requiere recorrer el árbol con DOMParser en lugar de acceder directamente a objetos JS",
        "Trata todos los valores como cadenas de texto a menos que se acompañe de un esquema externo",
      ],
    },
  },
  YAML: {
    id: "YAML",
    name: "YAML (YAML Ain't Markup Language — 1.2)",
    extension: ".yaml, .yml",
    mimeType: "application/yaml, text/yaml",
    compression: {
      en: "Whitespace-indented human-friendly UTF-8 data serialization",
      tr: "Boşluk girintisine (indentation) dayalı, insan odaklı UTF-8 veri serileştirmesi",
      de: "Einrückungsbasierte, menschenfreundliche UTF-8-Datenserialisierung",
      es: "Serialización de datos UTF-8 legible por humanos basada en sangría de espacios",
    },
    transparencyOrStructure: {
      en: "Key-value mappings, sequences, inline comments (`#`), and multi-line blocks (`|`, `>`)",
      tr: "Anahtar-değer eşlemeleri, listeler, satır içi yorumlar (`#`) ve çok satırlı bloklar (`|`, `>`)",
      de: "Schlüssel-Wert-Paare, Listen, Kommentare (`#`) und mehrzeilige Textblöcke (`|`, `>`)",
      es: "Mapas clave-valor, listas, comentarios en línea (`#`) y bloques multilínea (`|`, `>`)",
    },
    pros: {
      en: [
        "Supports inline `#` comments and clean multi-line strings without bracket noise",
        "Standard configuration format for Kubernetes, Docker Compose, GitHub Actions, and Ansible",
        "Strict superset of JSON that is significantly faster for humans to read and review",
      ],
      tr: [
        "Parantez kalabalığı olmadan `#` yorum satırlarını ve çok satırlı metin bloklarını destekler",
        "Kubernetes, Docker Compose, GitHub Actions ve Ansible için standart yapılandırma dilidir",
        "İnsanlar tarafından okunması ve kod incelemesi (code review) yapılması çok daha kolaydır",
      ],
      de: [
        "Unterstützt `#`-Kommentare und saubere mehrzeilige Strings ohne Klammer-Ballast",
        "Standardformat für Kubernetes, Docker Compose, GitHub Actions und Ansible",
        "Deutlich übersichtlicher für Menschen beim Lesen und im Code-Review als JSON",
      ],
      es: [
        "Admite comentarios `#` y bloques de texto multilínea limpios sin ruido de llaves",
        "Formato estándar de configuración en Kubernetes, Docker Compose, GitHub Actions y Ansible",
        "Mucho más rápido y cómodo de leer y revisar por humanos que JSON o XML",
      ],
    },
    cons: {
      en: [
        "Sensitive to whitespace indentation errors (tabs are forbidden by the YAML spec)",
        "Implicit type coercion (e.g., unquoted `NO` or `on` parsed as boolean) can cause subtle bugs",
        "Not natively parsed by browser `fetch().json()` without converting to JSON first",
      ],
      tr: [
        "Boşluk girintisi hatalarına karşı hassastır (YAML standardında Tab karakteri yasaktır)",
        "Tırnaksız yazılan `NO`, `on` veya `2.0` gibi değerlerin otomatik tip dönüşümü sürpriz hatalar üretebilir",
        "Tarayıcı `fetch().json()` API'si tarafından doğrudan okunamaz; önce JSON'a çevrilmelidir",
      ],
      de: [
        "Empfindlich gegenüber Einrückungsfehlern (Tabulatoren sind laut Spezifikation verboten)",
        "Implizite Typumwandlung (z. B. unquotiertes `NO` als Boolean) kann subtile Bugs auslösen",
        "Wird von Browser-APIs nicht nativ ohne vorherige JSON-Konvertierung geparst",
      ],
      es: [
        "Muy sensible a errores de sangría con espacios (los tabuladores están prohibidos)",
        "La inferencia automática de tipos (ej. `NO` sin comillas como booleano) puede causar errores sutiles",
        "No es analizado nativamente por `fetch().json()` en el navegador sin convertirlo antes a JSON",
      ],
    },
  },
  SQL: {
    id: "SQL",
    name: "SQL (Structured Query Language — ISO/IEC 9075)",
    extension: ".sql",
    mimeType: "application/sql, text/plain",
    compression: {
      en: "Declarative relational DDL (`CREATE TABLE`) and DML (`INSERT`, `SELECT`) statements",
      tr: "Bildirimsel ilişkisel DDL (`CREATE TABLE`) ve DML (`INSERT`, `SELECT`) ifadeleri",
      de: "Deklarative relationale DDL- (`CREATE TABLE`) und DML-Anweisungen (`INSERT`, `SELECT`)",
      es: "Sentencias relacionales declarativas DDL (`CREATE TABLE`) y DML (`INSERT`, `SELECT`)",
    },
    transparencyOrStructure: {
      en: "Typed relational schema columns, transactions, joins, and escaped literals",
      tr: "Tipli ilişkisel tablo sütunları, işlemler (transactions), birleştirmeler (JOIN) ve kaçışlı dizeler",
      de: "Typisierte Tabellenspalten, Transaktionen, Joins und maskierte Literale",
      es: "Columnas relacionales tipadas, transacciones, uniones (JOIN) y literales escapados",
    },
    pros: {
      en: [
        "Directly executable in PostgreSQL, MySQL, MariaDB, SQLite, and SQL Server",
        "Combines schema creation (`CREATE TABLE`) and bulk row insertion (`INSERT INTO`) in one script",
        "Enforces strict column types, primary keys, and relational integrity",
      ],
      tr: [
        "PostgreSQL, MySQL, MariaDB, SQLite ve SQL Server üzerinde doğrudan çalıştırılabilir",
        "Tablo şeması oluşturma (`CREATE TABLE`) ve toplu veri eklemeyi (`INSERT INTO`) tek betikte birleştirir",
        "Katı sütun veri tiplerini ve ilişkisel veritabanı bütünlüğünü garanti altına alır",
      ],
      de: [
        "Direkt ausführbar in PostgreSQL, MySQL, MariaDB, SQLite und SQL Server",
        "Kombiniert Tabellenerstellung (`CREATE TABLE`) und Masseneinfügen (`INSERT INTO`) in einem Skript",
        "Erzwingt strikte Spaltentypen und relationale Datenintegrität",
      ],
      es: [
        "Ejecutable directamente en PostgreSQL, MySQL, MariaDB, SQLite y SQL Server",
        "Combina creación de esquemas (`CREATE TABLE`) e inserción masiva (`INSERT INTO`) en un script",
        "Garantiza tipos de columna estrictos e integridad relacional",
      ],
    },
    cons: {
      en: [
        "Single quotes and NULL values must be properly escaped to prevent syntax errors or SQL injection",
        "Unformatted, single-line SQL queries are difficult to debug and review in PRs",
        "Dialect differences (backticks in MySQL vs. double quotes in PostgreSQL) require care",
      ],
      tr: [
        "Sözdizimi hatalarını ve SQL enjeksiyonunu önlemek için tek tırnaklar ve NULL değerler doğru kaçışlanmalıdır",
        "Biçimlendirilmemiş tek satırlık karmaşık sorguların okunması ve hata ayıklaması çok zordur",
        "Veritabanı lehçesi farkları (MySQL ters tırnak vs. PostgreSQL çift tırnak) dikkat gerektirir",
      ],
      de: [
        "Einfache Anführungszeichen und NULL-Werte müssen sauber maskiert werden",
        "Unformatierte, einzeilige SQL-Abfragen sind in Code-Reviews extrem schwer zu prüfen",
        "Dialektunterschiede zwischen MySQL, PostgreSQL und T-SQL erfordern Beachtung",
      ],
      es: [
        "Las comillas simples y los valores NULL deben escaparse correctamente para evitar errores",
        "Las consultas SQL complejas en una sola línea sin formato son muy difíciles de depurar",
        "Las diferencias de dialecto entre MySQL, PostgreSQL y SQL Server requieren cuidado",
      ],
    },
  },
  Markdown: {
    id: "Markdown",
    name: "Markdown (CommonMark / GitHub Flavored Markdown)",
    extension: ".md, .markdown",
    mimeType: "text/markdown",
    compression: {
      en: "Lightweight punctuation-based plain-text formatting syntax",
      tr: "Noktalama işaretlerine dayalı hafif düz metin biçimlendirme sözdizimi",
      de: "Leichtgewichtige, satzzeichenbasierte Klartext-Formatierungssyntax",
      es: "Sintaxis ligera de formato en texto plano basada en signos de puntuación",
    },
    transparencyOrStructure: {
      en: "Headings (`#`), lists, code blocks, GFM tables, blockquotes, and links",
      tr: "Başlıklar (`#`), listeler, kod blokları, GFM tabloları, alıntılar ve bağlantılar",
      de: "Überschriften (`#`), Listen, Codeblöcke, GFM-Tabellen, Zitate und Links",
      es: "Encabezados (`#`), listas, bloques de código, tablas GFM, citas y enlaces",
    },
    pros: {
      en: [
        "Fast, distraction-free writing experience without closing HTML tags",
        "Standard documentation format for GitHub READMEs, static site generators, and Obsidian/Notion",
        "Clean plain-text files that work seamlessly with Git diffs",
      ],
      tr: [
        "HTML etiketlerini kapatma zahmeti olmadan hızlı ve odaklanmış yazım deneyimi",
        "GitHub README dosyaları, statik site üreticileri, Notion ve Obsidian için standart belgelendirme dili",
        "Git sürüm geçmişinde satır satır temiz biçimde takip edilebilen saf metin yapısı",
      ],
      de: [
        "Schnelles, ablenkungsfreies Schreiben ohne schließende HTML-Tags",
        "Standardformat für GitHub-READMEs, Static-Site-Generatoren, Notion und Obsidian",
        "Saubere Klartextdateien, die optimal mit Git-Diffs harmonieren",
      ],
      es: [
        "Escritura rápida y sin distracciones sin necesidad de cerrar etiquetas HTML",
        "Formato estándar para archivos README de GitHub, generadores de sitios estáticos y Notion",
        "Archivos de texto plano limpios que funcionan perfectamente con Git",
      ],
    },
    cons: {
      en: [
        "Web browsers cannot render raw `.md` syntax inside DOM elements without compiling to HTML",
        "Limited layout control compared to full semantic HTML5 and CSS Grid/Flexbox",
        "Flavor variations (CommonMark vs. GFM) handle tables and line breaks differently",
      ],
      tr: [
        "Web tarayıcıları ham `.md` sözdizimini HTML'e derlenmeden doğrudan DOM içinde biçimli gösteremez",
        "Tam semantik HTML5 ve CSS ile kıyaslandığında sayfa düzeni kontrolü sınırlıdır",
        "Farklı Markdown lehçeleri (CommonMark ve GFM) tabloları ve satır sonlarını farklı işleyebilir",
      ],
      de: [
        "Webbrowser können rohes `.md` ohne vorherige Kompilierung in HTML nicht formatiert darstellen",
        "Begrenzte Layoutkontrolle im Vergleich zu semantischem HTML5 und CSS",
        "Verschiedene Dialekte (CommonMark vs. GFM) behandeln Tabellen teils unterschiedlich",
      ],
      es: [
        "Los navegadores web no renderizan `.md` bruto en el DOM sin compilarlo antes a HTML",
        "Control de diseño limitado frente a HTML5 semántico completo y CSS",
        "Las variaciones de dialecto (CommonMark vs. GFM) tratan tablas y saltos de línea de forma distinta",
      ],
    },
  },
  HTML: {
    id: "HTML",
    name: "HTML5 (HyperText Markup Language — WHATWG)",
    extension: ".html, .htm",
    mimeType: "text/html",
    compression: {
      en: "Semantic DOM element tree with attributes and character entity references",
      tr: "Öznitelikler ve karakter varlık referansları (entity) içeren semantik DOM ağacı",
      de: "Semantischer DOM-Elementbaum mit Attributen und HTML-Entities",
      es: "Árbol de elementos DOM semántico con atributos y entidades de caracteres",
    },
    transparencyOrStructure: {
      en: "Native browser DOM structure supporting accessibility (ARIA), SEO headings, and media",
      tr: "Erişilebilirlik (ARIA), SEO başlık hiyerarşisi ve medya destekli yerleşik tarayıcı DOM yapısı",
      de: "Native Browser-DOM-Struktur mit ARIA-Barrierefreiheit und SEO-Überschriften",
      es: "Estructura DOM nativa del navegador con soporte ARIA, encabezados SEO y multimedia",
    },
    pros: {
      en: [
        "Rendered natively by every web browser, CMS editor, and HTML email client",
        "Provides semantic tags (`<article>`, `<h1>`, `<table>`, `<code>`) essential for SEO and screen readers",
        "Supports entity encoding (`&amp;`, `&lt;`, `&quot;`) to safely display reserved characters",
      ],
      tr: [
        "Her web tarayıcısı, CMS editörü (WordPress, Webflow) ve e-posta istemcisi tarafından doğrudan işlenir",
        "SEO ve ekran okuyucular için hayati olan semantik etiketleri (`<article>`, `<h1>`, `<table>`) sunar",
        "Özel karakterleri güvenle göstermek için HTML entity kodlamasını (`&amp;`, `&lt;`) destekler",
      ],
      de: [
        "Wird von jedem Webbrowser, CMS-Editor und E-Mail-Client nativ gerendert",
        "Liefert semantische Tags (`<article>`, `<h1>`, `<table>`) für SEO und Screenreader",
        "Unterstützt HTML-Entities (`&amp;`, `&lt;`) zur sicheren Darstellung von Sonderzeichen",
      ],
      es: [
        "Renderizado de forma nativa por todos los navegadores, editores CMS y clientes de correo",
        "Ofrece etiquetas semánticas (`<article>`, `<h1>`, `<table>`) esenciales para SEO y accesibilidad",
        "Admite codificación de entidades (`&amp;`, `&lt;`) para mostrar caracteres especiales de forma segura",
      ],
    },
    cons: {
      en: [
        "Verbose opening and closing tags are slower to write by hand than Markdown",
        "Unescaped `<` or `&` characters in user input can break markup or trigger XSS if not encoded",
        "Requires sanitization when embedding untrusted markup",
      ],
      tr: [
        "Açılış ve kapanış etiketlerini elle yazmak Markdown'a kıyasla daha yavaştır",
        "Kaçışlanmamış (unescaped) `<` veya `&` karakterleri sayfa yapısını bozabilir veya XSS riski doğurabilir",
        "Güvenilmeyen kaynaklardan gelen HTML kodları DOM'a basılmadan önce temizlenmelidir (sanitization)",
      ],
      de: [
        "Öffnende und schließende Tags sind von Hand langsamer zu tippen als Markdown",
        "Unmaskierte `<`- oder `&`-Zeichen können das Layout zerstören oder XSS-Risiken erzeugen",
        "Erfordert Bereinigung (Sanitization) beim Einbetten fremder Inhalte",
      ],
      es: [
        "Escribir etiquetas de apertura y cierre manualmente es más lento que usar Markdown",
        "Los caracteres `<` o `&` sin escapar pueden romper el diseño o generar vulnerabilidades XSS",
        "Requiere sanitización al incrustar marcado procedente de fuentes externas",
      ],
    },
  },
  VCF: {
    id: "VCF",
    name: "VCF (vCard Virtual Contact File — RFC 6350)",
    extension: ".vcf, .vcard",
    mimeType: "text/vcard",
    compression: {
      en: "Line-based `BEGIN:VCARD` / `END:VCARD` property records with Quoted-Printable/UTF-8 support",
      tr: "Quoted-Printable ve UTF-8 destekli `BEGIN:VCARD` / `END:VCARD` satır tabanlı kayıt blokları",
      de: "Zeilenbasierte `BEGIN:VCARD` / `END:VCARD` Datensätze mit Quoted-Printable/UTF-8",
      es: "Registros por líneas `BEGIN:VCARD` / `END:VCARD` con soporte Quoted-Printable y UTF-8",
    },
    transparencyOrStructure: {
      en: "Structured contact fields (`FN`, `N`, `TEL`, `EMAIL`, `ORG`, `ADR`) for address books",
      tr: "Adres defterleri için yapılandırılmış kişi alanları (`FN`, `N`, `TEL`, `EMAIL`, `ORG`, `ADR`)",
      de: "Strukturierte Kontaktfelder (`FN`, `N`, `TEL`, `EMAIL`, `ORG`, `ADR`) für Adressbücher",
      es: "Campos de contacto estructurados (`FN`, `N`, `TEL`, `EMAIL`, `ORG`, `ADR`) para agendas",
    },
    pros: {
      en: [
        "Universal contact export format across iCloud, Google Contacts, Android, and Outlook",
        "Can bundle hundreds of contacts with multiple phone numbers and emails in one `.vcf` file",
        "Preserves international UTF-8 names and Quoted-Printable encoded strings",
      ],
      tr: [
        "iCloud, Google Kişiler, Android ve Outlook arasında evrensel rehber yedekleme standardıdır",
        "Yüzlerce kişiyi birden fazla telefon ve e-posta adresiyle tek bir `.vcf` dosyasında tutabilir",
        "Türkçe ve uluslararası UTF-8 karakterleri Quoted-Printable kodlamasıyla korur",
      ],
      de: [
        "Universelles Kontaktexportformat für iCloud, Google Kontakte, Android und Outlook",
        "Bündelt hunderte Kontakte mit mehreren Telefonnummern und E-Mails in einer `.vcf`-Datei",
        "Bewahrt internationale UTF-8-Sonderzeichen und Quoted-Printable-Strings",
      ],
      es: [
        "Formato universal de exportación de contactos en iCloud, Google Contacts, Android y Outlook",
        "Agrupa cientos de contactos con múltiples teléfonos y correos en un solo archivo `.vcf`",
        "Conserva nombres internacionales en UTF-8 y cadenas codificadas en Quoted-Printable",
      ],
    },
    cons: {
      en: [
        "Cannot be sorted, filtered, or deduplicated easily in Excel or CRM tools without converting to CSV",
        "Multi-line vCard 2.1/3.0/4.0 syntax variations are hard to read manually",
        "Many marketing and CRM import wizards only accept tabular `.csv` files",
      ],
      tr: [
        "CSV'ye dönüştürülmeden Excel'de sıralanamaz, filtrelenemez veya mükerrer kayıt kontrolü yapılamaz",
        "vCard 2.1, 3.0 ve 4.0 sürümleri arasındaki sözdizimi farkları elle okumayı zorlaştırır",
        "Birçok CRM, toplu SMS ve e-posta pazarlama platformu yalnızca `.csv` tablo yüklemesi kabul eder",
      ],
      de: [
        "Lässt sich ohne Umwandlung in CSV in Excel kaum sortieren, filtern oder bereinigen",
        "Versionsunterschiede zwischen vCard 2.1, 3.0 und 4.0 erschweren das manuelle Lesen",
        "Viele CRM- und Newsletter-Tools akzeptieren beim Import ausschließlich `.csv`-Tabellen",
      ],
      es: [
        "No se puede ordenar, filtrar ni limpiar duplicados en Excel sin convertirlo antes a CSV",
        "Las diferencias entre versiones vCard 2.1, 3.0 y 4.0 dificultan la lectura manual",
        "La mayoría de plataformas CRM y de marketing solo aceptan archivos tabulares `.csv`",
      ],
    },
  },
  MP4: {
    id: "MP4",
    name: "MP4 (MPEG-4 Part 14 Multimedia Container — ISO/IEC 14496-14)",
    extension: ".mp4, .m4v",
    mimeType: "video/mp4",
    compression: {
      en: "H.264 (AVC) / H.265 (HEVC) inter-frame video compression with AAC audio",
      tr: "AAC ses akışı ile eşleştirilmiş H.264 (AVC) / H.265 (HEVC) kareler arası video sıkıştırması",
      de: "H.264 (AVC) / H.265 (HEVC) Inter-Frame-Videokompression mit AAC-Audio",
      es: "Compresión de video inter-cuadro H.264 (AVC) / H.265 (HEVC) con audio AAC",
    },
    transparencyOrStructure: {
      en: "Multiplexed video, multi-channel audio, subtitles, and timing metadata boxes (`moov`/`mdat`)",
      tr: "Çoklanmış video, çok kanallı ses, altyazı ve zamanlama meta veri kutuları (`moov`/`mdat`)",
      de: "Multiplex-Container für Video, Mehrkanal-Audio, Untertitel und Timing-Atome (`moov`/`mdat`)",
      es: "Contenedor multiplexado de video, audio multicanal, subtítulos y átomos de tiempo (`moov`/`mdat`)",
    },
    pros: {
      en: [
        "100% hardware-accelerated playback on every smartphone, Smart TV, browser, and NLE editor",
        "Supports streaming fast-start (`moov` atom at front) and high-definition 1080p/4K video",
        "Accepted by Instagram, YouTube, TikTok, LinkedIn, and WhatsApp",
      ],
      tr: [
        "Her akıllı telefon, Smart TV, tarayıcı ve video kurgu programında %100 donanım hızlandırmalı oynatma",
        "Hızlı başlatma (`moov` atomu) ve yüksek çözünürlüklü 1080p/4K akış desteği",
        "Instagram, YouTube, TikTok, LinkedIn ve WhatsApp tarafından doğrudan kabul edilir",
      ],
      de: [
        "100 % hardwarebeschleunigte Wiedergabe auf jedem Smartphone, Smart-TV, Browser und Schnittprogramm",
        "Unterstützt Streaming-Fast-Start (`moov`-Atom) und hochauflösendes 1080p/4K-Video",
        "Wird von Instagram, YouTube, TikTok, LinkedIn und WhatsApp direkt akzeptiert",
      ],
      es: [
        "Reproducción acelerada por hardware al 100 % en móviles, Smart TVs, navegadores y editores de video",
        "Admite inicio rápido en streaming (átomo `moov`) y video de alta definición 1080p/4K",
        "Aceptado directamente por Instagram, YouTube, TikTok, LinkedIn y WhatsApp",
      ],
    },
    cons: {
      en: [
        "Larger file size than VP9/AV1 WebM for web background videos at equivalent bitrate",
        "Standard H.264 MP4 does not support alpha-channel transparent video backgrounds",
        "Carries audio tracks even when silent playback is desired unless muted/stripped",
      ],
      tr: [
        "Web arka plan videolarında aynı bit hızında VP9/AV1 WebM formatına göre daha büyük dosya boyutu üretir",
        "Standart H.264 MP4, şeffaf arka planlı (alfa kanallı) video katmanlarını desteklemez",
        "Sessiz oynatma istendiğinde dahi ses izi temizlenmezse gereksiz veri yükü taşır",
      ],
      de: [
        "Größere Dateien als VP9/AV1-WebM bei Web-Hintergrundvideos mit gleicher Bitrate",
        "Standard-H.264-MP4 unterstützt keine transparenten Videohintergründe (Alphakanal)",
        "Enthält weiterhin Audiospuren-Overhead, sofern der Ton nicht entfernt wird",
      ],
      es: [
        "Mayor tamaño de archivo que WebM (VP9/AV1) en videos de fondo web a igual tasa de bits",
        "El MP4 H.264 estándar no admite fondos de video transparentes con canal alfa",
        "Conserva el peso de la pista de audio aunque se reproduzca en silencio si no se elimina",
      ],
    },
  },
  WebM: {
    id: "WebM",
    name: "WebM (Open Web Media Container — Matroska Subset)",
    extension: ".webm",
    mimeType: "video/webm, audio/webm",
    compression: {
      en: "Royalty-free VP8 / VP9 / AV1 video codecs paired with Opus or Vorbis audio",
      tr: "Opus veya Vorbis ses kodekleriyle eşleştirilmiş telifsiz VP8 / VP9 / AV1 video sıkıştırması",
      de: "Lizenzfreie VP8- / VP9- / AV1-Videocodecs kombiniert mit Opus- oder Vorbis-Audio",
      es: "Códecs de video libres de regalías VP8 / VP9 / AV1 combinados con audio Opus o Vorbis",
    },
    transparencyOrStructure: {
      en: "HTML5 `<video>` native container supporting alpha-channel transparency and low-latency streaming",
      tr: "Alfa kanalı şeffaflığı ve düşük gecikmeli akış destekleyen yerleşik HTML5 `<video>` kabı",
      de: "Nativer HTML5-`<video>`-Container mit Alphakanal-Transparenz und Streaming-Optimierung",
      es: "Contenedor nativo `<video>` de HTML5 con soporte de transparencia alfa y streaming ligero",
    },
    pros: {
      en: [
        "20–45% smaller file sizes than H.264 MP4 for web hero videos and looping animations",
        "100% open-source, royalty-free specification engineered specifically for HTML5 web performance",
        "Supports transparent video backgrounds (alpha channel) and high-efficiency Opus audio",
      ],
      tr: [
        "Web açılış sayfası videoları ve döngüsel animasyonlarda H.264 MP4'e göre %20–45 daha küçük boyut",
        "HTML5 web performansı için özel olarak tasarlanmış %100 açık kaynaklı ve telifsiz standart",
        "Şeffaf arka planlı videoları (alfa kanalı) ve yüksek verimli Opus ses kodeğini destekler",
      ],
      de: [
        "20–45 % kleinere Dateien als H.264-MP4 für Hero-Videos und Loop-Animationen im Web",
        "100 % quelloffener, lizenzfreier Standard speziell für maximale HTML5-Web-Performance",
        "Unterstützt transparente Videohintergründe (Alphakanal) und hocheffizientes Opus-Audio",
      ],
      es: [
        "Archivos entre un 20 % y un 45 % más pequeños que MP4 H.264 para videos web y animaciones en bucle",
        "Especificación 100 % abierta y libre de regalías diseñada para el rendimiento en HTML5",
        "Admite fondos de video transparentes (canal alfa) y audio Opus de alta eficiencia",
      ],
    },
    cons: {
      en: [
        "Less compatible with legacy non-browser media players and older video editing software",
        "Encoding VP9/WebM is more CPU-intensive than baseline H.264",
        "Some social networks require MP4 uploads instead of WebM",
      ],
      tr: [
        "Tarayıcı dışı eski medya oynatıcılar ve eski kurgu yazılımlarıyla uyumluluğu MP4'ten düşüktür",
        "VP9/WebM kodlama işlemi temel H.264'e göre işlemciyi (CPU) daha fazla kullanır",
        "Bazı sosyal medya platformları doğrudan WebM yerine MP4 yüklemesi talep eder",
      ],
      de: [
        "Geringere Kompatibilität mit älteren Desktop-Mediaplayern und klassischer Schnittsoftware",
        "Die VP9/WebM-Kodierung ist rechenintensiver als einfaches H.264",
        "Einige soziale Netzwerke verlangen beim Upload MP4 statt WebM",
      ],
      es: [
        "Menor compatibilidad con reproductores antiguos fuera del navegador y editores clásicos",
        "La codificación VP9/WebM exige más uso de CPU que el perfil básico H.264",
        "Algunas redes sociales exigen subir archivos en formato MP4 en lugar de WebM",
      ],
    },
  },
  WAV: {
    id: "WAV",
    name: "WAV (Waveform Audio File Format — RIFF PCM)",
    extension: ".wav",
    mimeType: "audio/wav, audio/x-wav",
    compression: {
      en: "Uncompressed Linear Pulse-Code Modulation (LPCM) sample frames",
      tr: "Sıkıştırılmamış Doğrusal Darbe Kod Modülasyonu (LPCM) ses örnekleri",
      de: "Unkomprimierte lineare Pulscodemodulation (LPCM) Abtastwerte",
      es: "Muestras de audio sin comprimir en Modulación por Impulsos Codificados Lineal (LPCM)",
    },
    transparencyOrStructure: {
      en: "Bit-exact studio audio (16-bit/24-bit/32-bit float at 44.1 kHz – 96 kHz)",
      tr: "Bit düzeyinde kayıpsız stüdyo sesi (44.1 kHz – 96 kHz aralığında 16/24/32-bit)",
      de: "Bitgenaues Studio-Audio (16-Bit/24-Bit/32-Bit Float bei 44,1 kHz – 96 kHz)",
      es: "Audio de estudio exacto bit a bit (16/24/32 bits a 44,1 kHz – 96 kHz)",
    },
    pros: {
      en: [
        "Zero acoustic loss: preserves every sample exactly as captured by the microphone or DAW",
        "No decoding latency—ideal for audio mastering, sample libraries, and frame-accurate trimming",
        "Universally supported by professional DAWs (Logic, Pro Tools, Ableton, Audition)",
      ],
      tr: [
        "Sıfır akustik kayıp: mikrofon veya DAW tarafından kaydedilen her ses örneğini bit bit korur",
        "Çözme (decoding) gecikmesi yoktur; ses mastering, sample kütüphaneleri ve hassas kırpma için idealdir",
        "Tüm profesyonel ses yazılımları (Logic, Pro Tools, Ableton, Audition) tarafından yerel desteklenir",
      ],
      de: [
        "Null Qualitätsverlust: Bewahrt jedes Sample exakt so, wie es aufgenommen wurde",
        "Keine Dekodierungslatenz — ideal für Mastering, Sample-Libraries und präzises Schneiden",
        "Universell unterstützt von allen professionellen DAWs (Logic, Pro Tools, Ableton, Audition)",
      ],
      es: [
        "Cero pérdida acústica: conserva cada muestra exactamente como fue capturada",
        "Sin latencia de decodificación: ideal para masterización, librerías de muestras y corte preciso",
        "Compatible universalmente con todos los DAW profesionales (Logic, Pro Tools, Ableton, Audition)",
      ],
    },
    cons: {
      en: [
        "Huge file size (~10 MB per minute of stereo 44.1 kHz / 16-bit audio)",
        "Too heavy for email attachments, podcast RSS feeds, and mobile web streaming",
        "Limited support for embedded ID3 cover art and track metadata compared to MP3",
      ],
      tr: [
        "Çok büyük dosya boyutu (44.1 kHz / 16-bit stereo sesin dakikası yaklaşık 10 MB yer kaplar)",
        "E-posta ekleri, podcast RSS yayınları ve mobil web akışı için fazla ağırdır",
        "MP3'e kıyasla albüm kapağı ve ID3 meta veri etiketleme desteği sınırlıdır",
      ],
      de: [
        "Enorme Dateigröße (ca. 10 MB pro Minute bei 44,1 kHz / 16-Bit Stereo)",
        "Zu groß für E-Mail-Anhänge, Podcast-Feeds und mobiles Web-Streaming",
        "Eingeschränkte Unterstützung für ID3-Tags und Cover-Art im Vergleich zu MP3",
      ],
      es: [
        "Tamaño de archivo enorme (~10 MB por minuto de audio estéreo a 44,1 kHz / 16 bits)",
        "Demasiado pesado para adjuntos de correo, feeds de podcast y streaming web móvil",
        "Soporte limitado para carátulas y metadatos ID3 en comparación con MP3",
      ],
    },
  },
  MP3: {
    id: "MP3",
    name: "MP3 (MPEG-1/2 Audio Layer III)",
    extension: ".mp3",
    mimeType: "audio/mpeg",
    compression: {
      en: "Perceptual psychoacoustic lossy compression (CBR / VBR 128–320 kbps)",
      tr: "Algısal psikoakustik kayıplı sıkıştırma (128–320 kbps CBR / VBR)",
      de: "Psychoakustische verlustbehaftete Kompression (CBR / VBR 128–320 kbit/s)",
      es: "Compresión psicoacústica con pérdida (CBR / VBR de 128 a 320 kbps)",
    },
    transparencyOrStructure: {
      en: "Compact stereo/mono audio stream with ID3v2 metadata tags",
      tr: "ID3v2 meta veri etiketlerini destekleyen kompakt stereo/mono ses akışı",
      de: "Kompakter Stereo-/Mono-Audiostream mit ID3v2-Metadaten-Tags",
      es: "Flujo de audio estéreo/mono compacto con soporte de etiquetas ID3v2",
    },
    pros: {
      en: [
        "Reduces WAV file size by 85–90% (~1 MB per minute at 128 kbps) with near-transparent sound",
        "Plays on every car stereo, browser, phone, smart speaker, and podcast app ever built",
        "Ideal for extracting lectures, interviews, music tracks, and voice notes from video files",
      ],
      tr: [
        "İnsan kulağının zor ayırt edeceği kalitede WAV boyutunu %85–90 oranında küçültür",
        "Üretilmiş her araç teybi, tarayıcı, telefon, akıllı hoparlör ve podcast uygulamasında çalışır",
        "Videolardan ders kaydı, röportaj, müzik ve sesli not ayıklamak için en pratik formattır",
      ],
      de: [
        "Reduziert WAV-Dateien um 85–90 % bei für das menschliche Ohr kaum unterscheidbarer Qualität",
        "Läuft auf jedem Autoradio, Browser, Smartphone, Smart-Speaker und in jeder Podcast-App",
        "Ideal zum Extrahieren von Vorträgen, Interviews, Musik und Sprachnotizen aus Videos",
      ],
      es: [
        "Reduce el tamaño de un WAV entre un 85 % y un 90 % mantendo una calidad acústica excelente",
        "Se reproduce en cualquier radio de coche, navegador, teléfono, altavoz inteligente y app de podcast",
        "Ideal para extraer conferencias, entrevistas, música y notas de voz a partir de videos",
      ],
    },
    cons: {
      en: [
        "Discards ultrasonic frequencies above ~16–20 kHz permanently during encoding",
        "Re-encoding an existing MP3 multiple times introduces audible warbling artifacts",
        "Adds tiny silence padding frames at the start/end of tracks (less ideal for seamless game loops)",
      ],
      tr: [
        "Kodlama sırasında 16–20 kHz üzerindeki duyulması güç frekansları kalıcı olarak eler",
        "Mevcut bir MP3 dosyasının tekrar tekrar sıkıştırılması metalik ses bozulmalarına yol açar",
        "Parça başı/sonuna milisaniyelik boşluk ekleyebilir (kesintisiz oyun döngüleri için WAV/WebM tercih edilir)",
      ],
      de: [
        "Entfernt bei der Kodierung dauerhaft Frequenzen oberhalb der menschlichen Hörschwelle",
        "Mehrfaches Neukodieren einer MP3-Datei führt zu hörbaren Kompressionsartefakten",
        "Fügt winzige Pausen am Anfang/Ende ein (weniger geeignet für nahtlose Audio-Loops)",
      ],
      es: [
        "Descarta permanentemente frecuencias ultrasónicas durante la codificación",
        "Recodificar un MP3 varias veces introduce artefactos auditivos perceptibles",
        "Añade un mínimo relleno de silencio al inicio/final (menos ideal para bucles perfectos)",
      ],
    },
  },
  GIF: {
    id: "GIF",
    name: "GIF (Graphics Interchange Format — GIF89a)",
    extension: ".gif",
    mimeType: "image/gif",
    compression: {
      en: "Lossless Lempel-Ziv-Welch (LZW) dictionary compression over indexed 8-bit palettes",
      tr: "İndeksli 8-bit renk paleti üzerinde kayıpsız Lempel-Ziv-Welch (LZW) sıkıştırması",
      de: "Verlustfreie Lempel-Ziv-Welch (LZW) Kompression auf indizierten 8-Bit-Farbpaletten",
      es: "Compresión Lempel-Ziv-Welch (LZW) sin pérdida sobre paletas indexadas de 8 bits",
    },
    transparencyOrStructure: {
      en: "Multi-frame looping animation with max 256 colors per frame and 1-bit binary transparency",
      tr: "Kare başına en fazla 256 renk ve 1-bit ikili şeffaflık destekleyen döngüsel animasyon",
      de: "Mehrstufige Loop-Animation mit max. 256 Farben pro Frame und 1-Bit-Transparenz",
      es: "Animación en bucle multifotograma con hasta 256 colores por cuadro y transparencia de 1 bit",
    },
    pros: {
      en: [
        "Plays automatically inline inside GitHub READMEs, emails, Slack, Discord, and `<img>` tags",
        "Requires no video player controls, codecs, or user click to loop continuously",
        "Ideal for short UI product demos, bug reproductions, and reaction clips",
      ],
      tr: [
        "GitHub README, e-posta bültenleri, Slack, Discord ve `<img>` etiketleri içinde otomatik oynatılır",
        "Kesintisiz döngü için video oynatıcı kontrolü veya kullanıcı tıklaması gerektirmez",
        "Kısa arayüz (UI) tanıtımları, hata (bug) kayıtları ve sosyal medya tepkileri için mükemmeldir",
      ],
      de: [
        "Spielt automatisch in GitHub-READMEs, E-Mails, Slack, Discord und `<img>`-Tags ab",
        "Benötigt keine Videoplayer-Steuerung und keinen Klick für Endlosschleifen",
        "Perfekt für kurze UI-Produktdemos, Bug-Dokumentationen und Reaktions-Clips",
      ],
      es: [
        "Se reproduce automáticamente en READMEs de GitHub, correos, Slack, Discord y etiquetas `<img>`",
        "No requiere controles de reproductor de video ni clics del usuario para repetirse en bucle",
        "Ideal para demostraciones cortas de interfaz, reportes visuales de errores y reacciones",
      ],
    },
    cons: {
      en: [
        "Limited to 256 colors per frame, causing dithering grain on photographic video clips",
        "Much larger file size than MP4 or WebM for clips longer than a few seconds",
        "Does not support audio tracks or smooth 8-bit alpha gradients",
      ],
      tr: [
        "Kare başına 256 renk sınırı nedeniyle gerçekçi video kliplerde noktalı (dithering) görünüm oluşturur",
        "Birkaç saniyeden uzun kliplerde MP4 veya WebM'e kıyasla çok daha büyük dosya boyutu üretir",
        "Ses izlerini veya yumuşak 8-bit yarı saydam kenar geçişlerini desteklemez",
      ],
      de: [
        "Auf 256 Farben pro Frame begrenzt, was bei Realvideos zu Rasterung (Dithering) führt",
        "Bei längeren Clips deutlich größere Dateien als MP4 oder WebM",
        "Unterstützt weder Tonspuren noch weiche 8-Bit-Alphaverläufe",
      ],
      es: [
        "Limitado a 256 colores por fotograma, lo que genera granulado (dithering) en videos reales",
        "Tamaño de archivo mucho mayor que MP4 o WebM en clips de más de unos segundos",
        "No admite pistas de audio ni bordes semitransparentes suaves de 8 bits",
      ],
    },
  },
  Base64: {
    id: "Base64",
    name: "Base64 (RFC 4648 Binary-to-Text Encoding)",
    extension: ".txt, data:*;base64",
    mimeType: "text/plain, application/octet-stream",
    compression: {
      en: "6-bit ASCII radix-64 mapping (`A-Z`, `a-z`, `0-9`, `+`, `/`, `=`) with UTF-8 byte safety",
      tr: "UTF-8 bayt güvenli 6-bit ASCII radix-64 eşlemesi (`A-Z`, `a-z`, `0-9`, `+`, `/`, `=`)",
      de: "6-Bit-ASCII-Radix-64-Kodierung (`A-Z`, `a-z`, `0-9`, `+`, `/`, `=`) mit UTF-8-Sicherheit",
      es: "Codificación ASCII radix-64 de 6 bits (`A-Z`, `a-z`, `0-9`, `+`, `/`, `=`) segura para UTF-8",
    },
    transparencyOrStructure: {
      en: "Inline `data:[<mediatype>];base64,<data>` URI or raw ASCII payload",
      tr: "Satır içi `data:[<medya-türü>];base64,<veri>` URI dizisi veya ham ASCII metni",
      de: "Inline `data:[<Medientyp>];base64,<Daten>`-URI oder reiner ASCII-String",
      es: "URI en línea `data:[<tipo-medio>];base64,<datos>` o cadena ASCII pura",
    },
    pros: {
      en: [
        "Embeds small icons and fonts directly into HTML/CSS/JSON with zero extra HTTP requests",
        "Prevents binary corruption across text-only protocols (SMTP email, XML, JSON payloads)",
        "Handles multi-byte UTF-8 characters (emoji, Turkish/German/Spanish accents) without mojibake",
      ],
      tr: [
        "Küçük ikon ve fontları ek HTTP isteği olmadan doğrudan HTML, CSS veya JSON içine gömer",
        "Sadece metin destekleyen protokollerde (SMTP, JSON, XML) ikili (binary) veri bozulmasını önler",
        "Çok baytlı UTF-8 karakterleri (Türkçe harfler, emojiler) karakter bozulması olmadan kodlar",
      ],
      de: [
        "Bettet kleine Icons direkt in HTML, CSS oder JSON ein — ohne zusätzliche HTTP-Requests",
        "Verhindert Binärdatenverlust in reinen Textprotokollen (SMTP, JSON, XML)",
        "Verarbeitet Mehrbyte-UTF-8-Zeichen (Umlaute, Emojis) ohne Zeichensalat",
      ],
      es: [
        "Incrusta iconos pequeños directamente en HTML, CSS o JSON sin peticiones HTTP adicionales",
        "Evita la corrupción de datos binarios en protocolos de solo texto (SMTP, JSON, XML)",
        "Procesa caracteres UTF-8 multibyte (tildes, eñes, emojis) sin errores de codificación",
      ],
    },
    cons: {
      en: [
        "Increases payload size by ~33% (every 3 bytes of binary become 4 ASCII characters)",
        "Inline Base64 images cannot be cached separately by the browser like external `.webp`/`.png` files",
        "Base64 is an encoding scheme, not encryption—anyone can decode it without a key",
      ],
      tr: [
        "Veri boyutunu yaklaşık %33 artırır (her 3 baytlık ikili veri, 4 ASCII karakterine dönüşür)",
        "Satır içi Base64 görseller harici `.webp`/`.png` dosyaları gibi tarayıcıda bağımsız önbelleklenemez",
        "Base64 bir şifreleme (encryption) değil kodlamadır; anahtar olmadan herkes tarafından çözülebilir",
      ],
      de: [
        "Vergrößert die Datenmenge um ca. 33 % (3 Binär-Bytes werden zu 4 ASCII-Zeichen)",
        "Eingebettete Base64-Bilder können vom Browser nicht separat gecacht werden",
        "Base64 ist eine Kodierung und keine Verschlüsselung — jeder kann sie sofort dekodieren",
      ],
      es: [
        "Aumenta el tamaño de los datos en torno a un 33 % (3 bytes binarios pasan a 4 caracteres ASCII)",
        "Las imágenes Base64 en línea no se almacenan en caché por separado como archivos `.webp`/`.png`",
        "Base64 es codificación, no cifrado: cualquiera puede decodificarlo sin necesidad de clave",
      ],
    },
  },
};

/**
 * 64 aracın her biri için kullanılan gerçek tarayıcı motoru (Engine) ve
 * istemci taraflı işleme hattı (pipeline) özeti.
 */
export function getToolEngineSummary(path: string, locale: LocaleCode): {
  engineName: string;
  architectureNote: string;
  technicalFaq: { question: string; answer: string }[];
  sourceSpec?: FormatSpec;
  targetSpec?: FormatSpec;
} {
  const mapFormat = (raw: string): FormatSpec | undefined => {
    const u = raw.toUpperCase();
    if (u.includes("HEIC")) return FORMAT_SPECS.HEIC;
    if (u.includes("WEBP")) return FORMAT_SPECS.WebP;
    if (u.includes("PNG")) return FORMAT_SPECS.PNG;
    if (u.includes("JPG") || u.includes("JPEG")) return FORMAT_SPECS.JPG;
    if (u.includes("SVG")) return FORMAT_SPECS.SVG;
    if (u.includes("ICO")) return FORMAT_SPECS.ICO;
    if (u.includes("PDF")) return FORMAT_SPECS.PDF;
    if (u.includes("DOCX")) return FORMAT_SPECS.DOCX;
    if (u.includes("XLSX")) return FORMAT_SPECS.XLSX;
    if (u.includes("CSV")) return FORMAT_SPECS.CSV;
    if (u.includes("JSON")) return FORMAT_SPECS.JSON;
    if (u.includes("XML")) return FORMAT_SPECS.XML;
    if (u.includes("YAML")) return FORMAT_SPECS.YAML;
    if (u.includes("SQL")) return FORMAT_SPECS.SQL;
    if (u.includes("MARKDOWN")) return FORMAT_SPECS.Markdown;
    if (u.includes("HTML")) return FORMAT_SPECS.HTML;
    if (u.includes("VCF")) return FORMAT_SPECS.VCF;
    if (u.includes("MP4")) return FORMAT_SPECS.MP4;
    if (u.includes("WEBM")) return FORMAT_SPECS.WebM;
    if (u.includes("WAV")) return FORMAT_SPECS.WAV;
    if (u.includes("MP3")) return FORMAT_SPECS.MP3;
    if (u.includes("GIF")) return FORMAT_SPECS.GIF;
    if (u.includes("BASE64")) return FORMAT_SPECS.Base64;
    return undefined;
  };

  // Araca özel motor eşlemesi
  const engines: Record<string, string> = {
    "/heic-to-jpg": "libheif WebAssembly (heic2any) + HTML5 Canvas 2D Encoder",
    "/jpg-to-webp": "HTML5 Canvas 2D Context + Browser Native WebP Encoder",
    "/png-to-jpg": "HTML5 Canvas 2D Composite Engine (Alpha-to-White Flattening)",
    "/svg-to-png": "DOM SVG XML Serializer + High-DPI Offscreen Canvas Rasterizer",
    "/webp-to-png": "Browser ImageBitmap Decoder + Lossless PNG Canvas Stream",
    "/ico-to-png": "Binary ICONDIR/ICONDIRENTRY Parser + Canvas PNG Extractor",
    "/image-compressor": "Browser-Image-Compression Worker + Canvas Quantization Engine",
    "/remove-background": "ONNX Runtime WebAssembly (@imgly/background-removal Neural Segmentation)",
    "/image-to-base64": "FileReader DataURL Streamer + RFC 4648 Base64 Serializer",
    "/image-resizer": "HTML5 Canvas 2D Bicubic/High-Quality Interpolation Engine",
    "/image-cropper": "Viewport Coordinate Mapper + Sub-Region Canvas 2D Extractor",
    "/image-filters": "Canvas 2D Pixel Matrix & CSS Filter Pipeline",
    "/watermark-adder": "Multi-Layer HTML5 Canvas Alpha Compositing Engine",
    "/color-palette-extractor": "Canvas ImageData Pixel Quantizer & Dominant Cluster Analyzer",
    "/exif-cleaner": "Binary JPEG/PNG Segment Stripper & Clean Pixel Re-Encoder",
    "/json-to-csv": "Recursive JSON Flattener + RFC 4180 CSV Serializer",
    "/xml-to-json": "Browser DOMParser XML AST Walker + JSON Tree Builder",
    "/markdown-to-html": "CommonMark/GFM Lexical Parser (marked) + Safe HTML Serializer",
    "/pdf-to-jpg": "Mozilla PDF.js (pdfjs-dist) WebWorker Rasterizer + Canvas JPEG Exporter",
    "/pdf-merge-split": "pdf-lib Pure JavaScript PDF Object Tree Manipulator",
    "/docx-to-pdf": "Mammoth.js OpenXML Parser + jsPDF Client-Side Document Builder",
    "/xlsx-to-csv": "SheetJS (xlsx) Binary/OpenXML Workbook Parser + RFC 4180 Exporter",
    "/json-to-yaml": "AST Schema Serializer (js-yaml) + JSON Syntax Validator",
    "/csv-to-sql": "RFC 4180 CSV Tokenizer + SQL DDL/DML Type-Inference Generator",
    "/xml-to-csv": "DOMParser Repeating-Node Detector + Tabular CSV Serializer",
    "/pdf-to-text": "Mozilla PDF.js TextContent Stream Extractor",
    "/xlsx-to-json": "SheetJS (xlsx) Worksheet-to-Object Typed JSON Serializer",
    "/vcf-to-csv": "RFC 6350 vCard Property Parser + Quoted-Printable UTF-8 Decoder",
    "/base64-encoder": "TextEncoder UTF-8 Byte Array + RFC 4648 Base64 Codec",
    "/url-converter": "RFC 3986 Percent-Encoding Engine (encodeURIComponent / decodeURIComponent)",
    "/qr-generator": "Reed-Solomon Error-Correction Matrix Builder + Canvas/SVG Renderer",
    "/jwt-decoder": "Base64Url Segment Splitter (RFC 7519 Header & Payload Inspector)",
    "/hash-generator": "Web Crypto API (SubtleCrypto SHA-1 / SHA-256 / SHA-384 / SHA-512)",
    "/color-converter": "sRGB Chromaticity Matrix Converter (HEX ↔ RGB ↔ HSL)",
    "/json-formatter": "Native V8/SpiderMonkey JSON AST Parser, Validator & Pretty-Printer",
    "/unix-timestamp": "ECMAScript Intl.DateTimeFormat & Epoch Millisecond Calculator",
    "/uuid-generator": "Web Crypto API CSPRNG (crypto.randomUUID — RFC 4122 v4)",
    "/password-generator": "Web Crypto API CSPRNG (crypto.getRandomValues) + Shannon Entropy Estimator",
    "/css-js-minifier": "Lexical Whitespace/Comment Stripper & Token Compactor",
    "/px-rem-em-converter": "Root/Parent Font-Size Ratio Calculator",
    "/html-encode-decode": "Named & Numeric HTML Character Entity Transcoder",
    "/sql-formatter": "SQL Lexical Tokenizer & Indentation Tree Formatter",
    "/box-shadow-generator": "Multi-Layer CSS3 Box-Shadow & RGBA Compositor",
    "/meta-tag-generator": "HTML5 SEO, Open Graph & Twitter Card Markup Builder",
    "/chmod-calculator": "POSIX 9-Bit Permission Matrix (Octal ↔ Symbolic rwx)",
    "/js-keycode": "DOM KeyboardEvent Inspector (e.key, e.code, e.keyCode)",
    "/tailwind-palette": "HSL Luminance Ramp Generator for Tailwind CSS Design Tokens",
    "/url-parser": "WHATWG URL Standard Parser (Protocol, Host, Path, SearchParams)",
    "/case-converter": "Locale-Aware Unicode Case & Identifier Transformer (camelCase, snake_case, kebab-case)",
    "/word-counter": "Unicode Grapheme/Word Boundary Tokenizer & Reading-Time Estimator",
    "/lorem-ipsum": "Deterministic Classical Latin Corpus & Sentence Synthesizer",
    "/text-diff": "Longest Common Subsequence (LCS) Line & Character Diff Engine",
    "/screen-viewport-checker": "Window matchMedia, DPR & Screen API Live Inspector",
    "/mp4-to-webm": "FFmpeg.wasm (@ffmpeg/core WebAssembly) VP9 + Opus Transcoder",
    "/wav-to-mp3": "FFmpeg.wasm LAME MP3 Psychoacoustic Encoder",
    "/video-to-mp3": "FFmpeg.wasm Audio Demuxer & MP3 Bitrate Encoder",
    "/video-to-gif": "FFmpeg.wasm Palettegen + Paletteuse 2-Pass GIF Optimizer",
    "/mute-video": "FFmpeg.wasm Stream Copy Demuxer (`-an` Zero-Reencode Video Pass)",
    "/audio-trimmer": "Web Audio API (AudioContext) Waveform Renderer & PCM/MP3 Slicer",
    "/volume-booster": "Web Audio API GainNode / FFmpeg.wasm Dynamic Volume Amplifier",
    "/video-speed": "FFmpeg.wasm Video PTS (`setpts`) & Pitch-Preserving Audio (`atempo`) Filter",
    "/video-resizer": "FFmpeg.wasm Scale Filter & Aspect-Ratio Preserving Resampler",
    "/voice-recorder": "MediaStream Recording API (MediaRecorder + getUserMedia)",
    "/speech-to-text": "Web Speech API (SpeechRecognition Continuous Real-Time Transcriber)",
  };

  const engineName = engines[path] ?? "Client-Side Browser Web API & WebAssembly Engine";

  // Yoldan kaynak ve hedef formatları çıkar
  const parts = path.slice(1).split("-to-");
  const sourceSpec = parts.length === 2 ? mapFormat(parts[0]) : mapFormat(path);
  const targetSpec = parts.length === 2 ? mapFormat(parts[1]) : undefined;

  const archNotes: Record<LocaleCode, string> = {
    en: `Under the hood, this tool is powered by ${engineName}. Unlike legacy cloud converters that queue your files on remote virtual machines, every byte is read directly from your local RAM via the browser File/Blob API, processed in an isolated sandbox, and written back as a downloadable Blob URL. This eliminates network upload latency, prevents server-side data leaks, and guarantees deterministic output quality.`,
    tr: `Bu araç arka planda ${engineName} mimarisiyle çalışır. Dosyalarınızı uzak sanal sunucularda kuyruğa sokan klasik bulut dönüştürücülerin aksine; her bayt tarayıcının File/Blob API'si üzerinden doğrudan yerel RAM belleğinizden okunur, izole bir kum havuzunda (sandbox) işlenir ve indirilebilir bir Blob URL olarak cihazınıza yazılır. Bu yapı yükleme bekleme süresini sıfırlar, sunucu kaynaklı veri sızıntılarını önler ve tutarlı çıktı kalitesi sunar.`,
    de: `Unter der Haube arbeitet dieses Werkzeug mit der ${engineName}-Architektur. Im Gegensatz zu herkömmlichen Cloud-Konvertern, die Dateien auf entfernten Servern in Warteschlangen einreihen, wird jedes Byte über die File-/Blob-API direkt aus Ihrem lokalen Arbeitsspeicher (RAM) gelesen, in einer isolierten Sandbox verarbeitet und als direkte Blob-URL bereitgestellt. Das eliminiert Upload-Wartezeiten und schließt serverseitige Datenlecks technisch aus.`,
    es: `Internamente, esta herramienta funciona mediante la arquitectura ${engineName}. A diferencia de los conversores en la nube tradicionales que ponen sus archivos en cola en servidores remotos, cada byte se lee directamente desde su memoria RAM local a través de la API File/Blob del navegador, se procesa en un entorno aislado (sandbox) y se entrega como una URL Blob descargable. Esto elimina la latencia de subida y garantiza privacidad absoluta.`,
  };

  const technicalFaqByLocale: Record<LocaleCode, { question: string; answer: string }[]> = {
    en: [
      {
        question: `What browser technology powers this tool and why does it matter?`,
        answer: `It runs on ${engineName} directly inside your browser tab. Because processing happens on your own CPU/GPU instead of a shared cloud server, there are no upload queues, no daily file-count throttling, and zero risk of confidential documents or media being retained on third-party storage.`,
      },
      ...(sourceSpec && targetSpec
        ? [
            {
              question: `What is the main technical difference between ${sourceSpec.id} and ${targetSpec.id}?`,
              answer: `${sourceSpec.name} (${sourceSpec.extension}) uses ${sourceSpec.compression.en.toLowerCase()}, whereas ${targetSpec.name} (${targetSpec.extension}) uses ${targetSpec.compression.en.toLowerCase()}. Converting from ${sourceSpec.id} to ${targetSpec.id} lets you transition from ${sourceSpec.transparencyOrStructure.en.toLowerCase()} to ${targetSpec.transparencyOrStructure.en.toLowerCase()} depending on your target platform's requirements.`,
            },
          ]
        : [
            {
              question: `Does this tool work offline or on mobile devices?`,
              answer: `Yes. Once the page loads in Chrome, Safari, Firefox, or Edge on Windows, macOS, Linux, iOS, or Android, the ${engineName} pipeline executes locally on your device without sending requests to a backend API.`,
            },
          ]),
    ],
    tr: [
      {
        question: `Bu araç hangi tarayıcı teknolojisini kullanıyor ve bu neden önemli?`,
        answer: `İşlemler doğrudan tarayıcı sekmeniz içinde ${engineName} motoruyla yürütülür. Hesaplama paylaşımlı bir bulut sunucusu yerine kendi işlemcinizde (CPU/GPU) yapıldığı için yükleme sırası beklemezsiniz, günlük dosya sayısı engeline takılmazsınız ve gizli belgelerinizin üçüncü taraf sunucularda kalma riski tamamen ortadan kalkar.`,
      },
      ...(sourceSpec && targetSpec
        ? [
            {
              question: `${sourceSpec.id} ile ${targetSpec.id} arasındaki temel teknik fark nedir?`,
              answer: `${sourceSpec.name} (${sourceSpec.extension}) ${sourceSpec.compression.tr.toLowerCase()} kullanırken, ${targetSpec.name} (${targetSpec.extension}) ${targetSpec.compression.tr.toLowerCase()} yapısını kullanır. ${sourceSpec.id} formatından ${targetSpec.id} formatına geçiş yapmak, hedef platformunuzun gereksinimlerine göre uyumluluk ve dosya boyutu dengesini optimize etmenizi sağlar.`,
            },
          ]
        : [
            {
              question: `Bu araç mobil cihazlarda veya internet kesildiğinde çalışır mı?`,
              answer: `Evet. Sayfa Windows, macOS, Linux, iOS veya Android üzerindeki modern bir tarayıcıda (Chrome, Safari, Firefox, Edge) bir kez yüklendikten sonra ${engineName} işleme hattı tamamen cihazınızda yerel olarak çalışır.`,
            },
          ]),
    ],
    de: [
      {
        question: `Welche Browser-Technologie nutzt dieses Tool und warum ist das wichtig?`,
        answer: `Die Verarbeitung erfolgt direkt in Ihrem Browser-Tab über ${engineName}. Da die Berechnung auf Ihrer eigenen CPU/GPU statt auf einem geteilten Cloud-Server stattfindet, gibt es keine Upload-Warteschlangen, keine künstlichen Tageslimits und kein Risiko, dass vertrauliche Daten auf Fremdservern verbleiben.`,
      },
      ...(sourceSpec && targetSpec
        ? [
            {
              question: `Was ist der wichtigste technische Unterschied zwischen ${sourceSpec.id} und ${targetSpec.id}?`,
              answer: `${sourceSpec.name} (${sourceSpec.extension}) nutzt ${sourceSpec.compression.de}, während ${targetSpec.name} (${targetSpec.extension}) auf ${targetSpec.compression.de} setzt. Die Umwandlung von ${sourceSpec.id} in ${targetSpec.id} passt Ihre Datei optimal an die Anforderungen Ihrer Zielplattform an.`,
            },
          ]
        : [
            {
              question: `Funktioniert dieses Werkzeug auch auf Smartphones und Tablets?`,
              answer: `Ja. Sobald die Seite in einem modernen Browser (Chrome, Safari, Firefox, Edge) unter Windows, macOS, Linux, iOS oder Android geladen ist, läuft ${engineName} vollständig lokal auf Ihrem Endgerät.`,
            },
          ]),
    ],
    es: [
      {
        question: `¿Qué tecnología de navegador utiliza esta herramienta y por qué es importante?`,
        answer: `El procesamiento se ejecuta directamente en su pestaña mediante ${engineName}. Al realizarse en su propia CPU/GPU en lugar de un servidor compartido en la nube, no hay colas de espera, límites diarios artificiales ni riesgo de que archivos confidenciales queden almacenados en servidores externos.`,
      },
      ...(sourceSpec && targetSpec
        ? [
            {
              question: `¿Cuál es la principal diferencia técnica entre ${sourceSpec.id} y ${targetSpec.id}?`,
              answer: `${sourceSpec.name} (${sourceSpec.extension}) utiliza ${sourceSpec.compression.es.toLowerCase()}, mientras que ${targetSpec.name} (${targetSpec.extension}) emplea ${targetSpec.compression.es.toLowerCase()}. Convertir de ${sourceSpec.id} a ${targetSpec.id} permite optimizar la compatibilidad y el peso del archivo según la plataforma de destino.`,
            },
          ]
        : [
            {
              question: `¿Funciona esta herramienta en dispositivos móviles o sin conexión?`,
              answer: `Sí. Una vez cargada la página en cualquier navegador moderno (Chrome, Safari, Firefox, Edge) en Windows, macOS, Linux, iOS o Android, el motor ${engineName} se ejecuta localmente en su dispositivo.`,
            },
          ]),
    ],
  };

  return {
    engineName,
    architectureNote: archNotes[locale],
    technicalFaq: technicalFaqByLocale[locale],
    sourceSpec,
    targetSpec,
  };
}

