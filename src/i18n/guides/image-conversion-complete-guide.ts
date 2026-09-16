import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "The Complete Guide to Image Conversion: Formats, Quality and Privacy",
    eyebrow: "Images",
    description:
      "Everything you need to know about converting images between JPG, PNG, WebP, HEIC and ICO — format differences, quality settings, compression trade-offs and how to do it all without uploading your photos to a server.",
    excerpt:
      "From HEIC to WebP, from lossless to lossy — a practical guide to image conversion that respects your privacy.",
    readingTime: "10 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Every day, millions of image conversions happen across the web: a designer exports a PNG for transparency, a photographer compresses JPEGs for a portfolio, a developer converts HEIC screenshots to JPG for compatibility. What most people do not realize is that many free online converters upload your photos to remote servers — creating copies you cannot control. This guide covers the formats, the quality trade-offs, and how to convert images entirely on your own device."] },

    { type: "h2", content: ["Why image format matters"] },
    { type: "p", content: ["An image format is not just a file extension — it is a contract between the encoder and the decoder about how pixel data is stored, compressed and metadata is handled. Choosing the wrong format can mean bloated files, lost transparency, or broken compatibility. Here is what each major format actually does:"] },
    { type: "list", items: [
      [{ text: "JPEG (.jpg / .jpeg)", bold: true }, { text: " — lossy compression optimized for photographs. It discards data that the human eye is less sensitive to, producing small files at the cost of some detail. Best for: photos, gradients, complex scenes. Not suitable for: text, line art, transparency." }],
      [{ text: "PNG (.png)", bold: true }, { text: " — lossless compression with full alpha transparency. Every pixel is preserved exactly. Best for: screenshots, logos, icons, images with text overlays. Trade-off: larger file sizes than JPEG for photographs." }],
      [{ text: "WebP (.webp)", bold: true }, { text: " — Google's modern format supporting both lossy and lossless modes plus alpha transparency. Typically 25-35% smaller than JPEG at comparable quality. Supported by all major browsers since 2021." }],
      [{ text: "HEIC (.heic / .heif)", bold: true }, { text: " — Apple's default photo format since iOS 11. Uses HEVC compression for excellent quality at small sizes. Limited web compatibility — converting to JPG or WebP is often necessary for sharing." }],
      [{ text: "ICO / PNG favicon", bold: true }, { text: " — the classic Windows icon format, still used for website favicons. ICO files can contain multiple sizes; modern favicons often use PNG directly." }],
    ]},
    { type: "p", content: ["The short version: use JPEG for photos where file size matters, PNG when you need transparency or lossless quality, and WebP for the best of both worlds when your audience supports it."] },

    { type: "h2", content: ["Understanding quality settings"] },
    { type: "p", content: ["When you convert between lossy formats (like JPEG to WebP), you choose a quality level — typically a number between 1 and 100. This is not a linear scale:"] },
    { type: "list", items: [
      ["Quality 90-100: visually near-identical to the original, but files are only slightly smaller."],
      ["Quality 75-89: the sweet spot for most photos — barely perceptible differences with 30-50% file size reduction."],
      ["Quality 50-74: noticeable artifacts in detailed areas, but acceptable for thumbnails and previews."],
      ["Below 50: significant degradation — useful only when extreme compression is the priority."],
    ]},
    { type: "note", tone: "success", title: "The 80/20 rule of image compression", content: ["Most images can be compressed to quality 80-85 with no visible difference on screen. Start there, and only go lower if file size is critical. Going above 90 rarely makes a visible difference but consistently increases file size."] },

    { type: "h2", content: ["Common conversion scenarios"] },
    { type: "p", content: ["Different goals call for different conversion strategies:"] },
    { type: "list", items: [
      [{ text: "Sharing iPhone photos online: ", bold: true }, { text: "HEIC → JPG at quality 85 gives universal compatibility with minimal quality loss." }],
      [{ text: "Optimizing web images: ", bold: true }, { text: "JPG/PNG → WebP reduces bandwidth by 25-35% while maintaining visual quality." }],
      [{ text: "Preserving screenshots: ", bold: true }, { text: "PNG → PNG (no conversion needed) or JPG → PNG if you need transparency added later." }],
      [{ text: "Reducing file size for email: ", bold: true }, { text: "Any format → JPG at quality 70-75, or resize dimensions if the image is larger than needed." }],
      [{ text: "Creating favicons: ", bold: true }, { text: "PNG/JPG → ICO or resize to 32x32 / 16x16 for browser favicons." }],
    ]},

    { type: "h2", content: ["Batch conversion: processing multiple images"] },
    { type: "p", content: ["When you have dozens or hundreds of images to convert — a camera roll, a product catalog, a design export — batch processing becomes essential. The key considerations for batch conversion are:"] },
    { type: "list", items: [
      ["Consistent quality settings across all files so the output looks uniform."],
      ["Progress tracking so you know how long the batch will take."],
      ["Error handling — one corrupt file should not stop the entire batch."],
      ["Memory management — processing too many large images simultaneously can overwhelm browser memory."],
    ]},
    { type: "p", content: ["Browser-based batch tools like Convrs handle these concerns automatically: each image is processed sequentially in a WebWorker, results are streamed to downloads as they complete, and memory is released between files."] },

    { type: "h2", content: ["Privacy: why server-side conversion is risky"] },
    { type: "p", content: ["When you upload a photo to an online converter, several things happen that most users never see:"] },
    { type: "list", items: [
      ["Your file is transmitted over the network — potentially intercepted if the connection is not fully encrypted."],
      ["A copy is stored on the converter's server — for minutes, hours, or indefinitely depending on their retention policy."],
      ["The file may be processed by third-party infrastructure — CDN nodes, cloud functions, or backup systems you never agreed to."],
      ["Metadata (EXIF data including GPS coordinates, camera model, timestamps) travels with the file."],
    ]},
    { type: "p", content: ["For personal photos, this means your location history, camera habits, and visual content are exposed to strangers. For business documents or product images, it means proprietary information reaches third-party infrastructure. Client-side conversion eliminates every one of these risks: the file never leaves your device."] },

    { type: "h2", content: ["Resizing vs. converting: knowing what you need"] },
    { type: "p", content: ["Many people confuse format conversion with resizing. They are different operations with different outcomes:"] },
    { type: "list", items: [
      [{ text: "Format conversion", bold: true }, { text: " changes the file type (JPG → WebP) while attempting to preserve visual appearance." }],
      [{ text: "Resizing", bold: true }, { text: " changes the pixel dimensions (3000px → 800px) — typically to reduce file size or fit a specific layout." }],
      [{ text: "Compression", bold: true }, { text: " reduces file size within the same format by adjusting quality parameters." }],
    ]},
    { type: "p", content: ["Often, you need all three: a 6000x4000 phone photo resized to 1200px wide, compressed to quality 85, and converted to WebP for a website. Each step reduces file size further while maintaining the visual quality your audience needs."] },

    { type: "h2", content: ["Transparency and alpha channels"] },
    { type: "p", content: ["Not all formats support transparency. JPEG has no transparency at all — any transparent pixels become white (or whatever the background color is). PNG and WebP both support full alpha transparency, where each pixel can be partially transparent. When converting from PNG to JPEG, transparent areas will be filled with a solid color — usually white. This is a one-way operation: you cannot recover transparency from a JPEG. Always keep the original PNG if transparency matters."] },

    { type: "h2", content: ["EXIF metadata: what travels with your photos"] },
    { type: "p", content: ["Digital photos contain hidden metadata called EXIF — camera model, lens settings, date and time, and sometimes GPS coordinates. When you convert images, some tools strip this metadata (reducing file size and protecting privacy), while others preserve it. If privacy matters, use a tool that lets you control whether EXIF data is kept or removed during conversion."] },

    { type: "h2", content: ["Doing it all on-device with Convrs"] },
    { type: "p", content: ["Convrs provides a complete set of image conversion tools that run entirely in your browser:"] },
    { type: "list", items: [
      ["Format conversion between JPG, PNG, WebP, HEIC and ICO — with quality control."],
      ["Batch processing for camera rolls and large image sets."],
      ["Resizing, cropping and background removal — all on-device."],
      ["Image compression with adjustable quality presets."],
      ["EXIF cleaning to strip metadata before sharing."],
      ["Color palette extraction and filters — for design workflows."],
    ]},
    { type: "p", content: ["Every operation happens in your browser via WebAssembly. No files are uploaded, no accounts are required, and no traces remain after you close the tab. That is the difference between a tool that respects your privacy and one that merely claims to."] },
    { type: "note", tone: "success", title: "Try it yourself", content: ["Open any Convrs image tool, convert a photo, then disconnect from the internet and do it again. The conversion works identically — that is the proof that your files never leave your device."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Grsel Dntrme Klm: Formatlar, Kalite ve Gizlilik",
    eyebrow: "Grseller",
    description:
      "Grselleri JPG, PNG, WebP, HEIC ve arasnda dtrme hakknda bilmeniz gereken her ey: format farklar, kalite ayarlar, siktrmaitemIdtular ve dosyalarnz sunucuya yklemeden nasl yapacanz.",
    excerpt:
      "HEIC'ten WebP'ye, kaypszn kaypluya — gizlilie sayl grsel dtrme iin pratik bir klm.",
    readingTime: "10 dk okuma",
    updatedDate: "16 Eyll 2026",
  },
  blocks: [
    { type: "p", content: ["Her gün milyonlarca görsel dönüştürme internet genelinde gerçekleşmektedir: bir tasarımcı saydam PNG olarak verir, bir fotoğrafçı albümü için JPEG'leri sıkıştırır, bir geliştirici ekran görüntülerini uyumluluk için JPG'ye dönüştürür. Bilinmeyen pek çok ücretsiz çevrimiçi dönüştürücünün fotoğraflarınızı uzak sunuculara yüklemesidir — denetleyemediğiniz kopyalar oluşturur. Bu kılavuz; formatları, kalite ayarlarını ve görselleri kendi cihazınızda dönüştürmeyi inceler."] },

    { type: "h2", content: ["Görsel formatın neden önemli"] },
    { type: "p", content: ["Bir görsel format, dosya uzantısından ibaret değildir — piksel verisinin nasıl saklandığını, sıkıştırıldığını ve meta verinin nasıl ele alındığını kodlayıcı ile kod arasındaki sözleşmedir. Yanlış format seçimi şişkin dosyalar, kaybolan saydamlık veya bozuk uyumluluk anlamına gelebilir:"] },
    { type: "list", items: [
      [{ text: "JPEG (.jpg / .jpeg)", bold: true }, { text: " — fotoğraf için kayıp Compression. İnsan gözünün daha az hassas olduğu veriyi atarak, bazı detay karşığında küçük dosyalar üretir. En uygun: fotoğraflar, gradyanlar, karmaşık sahneler. Uygun değil: metin, çizim, saydamlık." }],
      [{ text: "PNG (.png)", bold: true }, { text: " — tam saydamlık ile tam kayıpsız sıkıştırma. Her piksel aynen saklanır. En uygun: ekran görüntüleri, logolar, simgeler, metin katmanlı görseller. Takas: fotoğraflar için JPEG'den daha büyük dosyalar." }],
      [{ text: "WebP (.webp)", bold: true }, { text: " — Google'nin modern formatı; hem kayıplı hem kayıpsız mod ve tam saydamlık destekler. Kalite karşığında JPEG'den %25-35 daha küçük. 2021'den beri tüm büyük tarayıcılar tarafından desteklenmektedir." }],
      [{ text: "HEIC (.heic / .heif)", bold: true }, { text: " — Apple'nin iOS 11'den bu yana varsayılan fotoğraf formatı. HEVC sıkıştırması ile küçük dosyalarda mükemmel kalite sağlar. Sınırlı web uyumluluğu — paylaşmak için JPG veya WebP'ye dönüştürme genellikle gereklidir." }],
    ]},
    { type: "p", content: ["Kısa söylem: fotoğraflarda dosya boyutu önemliyse JPEG, saydamlık veya kayıpsız kalite gerekiyorsa PNG, tarayıcı arası destekliyorsa en iyi sonuçlar için WebP kullan."] },

    { type: "h2", content: ["Kalite ayarlarını anlama"] },
    { type: "p", content: ["Kayıplı formatlar arasında (örneğin JPEG'den WebP'ye) dönüştürme yaptığınızda bir kalite seviyesi seçersiniz — genellikle 1 ile 100 arasında bir sayı. Bu doğrusal bir ölçeğe değildir:"] },
    { type: "list", items: [
      ["Kalite 90-100: görsel olarak orijinale neredeyse aynı, ancak dosyalar sadece hafif daha küçük."],
      ["Kalite 75-89: fotoğrafçılık için en iyi nokta — fark edilebilir farklar minimum, dosya boyutu %30-50 düşme."],
      ["Kalite 50-74: detaylı alanlarda belirgin artifacts — küçük görüntüler ve önizlemeler için kabul edilebilir."],
      ["50'in alt: ciddi bozulma — yalnızca aşırı sıkıştırma öncelikliyse uygun."],
    ]},
    { type: "note", tone: "success", title: "Görsel sıkıştırmanın 80/20 kuralı", content: ["Görsellerin büyük bölümü ekranda belirgin fark olmadan %80-85 kaliteye sıkıştırılabilir. Oradan başlayın, dosya boyutu kritik olmadıkça daha altına inmeyin. 90'ın üzerine çıkmak nadiren belirgin fark yaratır ama dosya boyutunu tutarlı olarak artırır."] },

    { type: "h2", content: ["Yaygın dönüştürme senaryoları"] },
    { type: "p", content: ["Farklı amaçlar farklı dönüştürme stratejileri gerektirir:"] },
    { type: "list", items: [
      [{ text: "iPhone fotoğraflarını paylaşma: ", bold: true }, { text: "HEIC'ten JPG'ye kalite 85 ile evrensel uyumluluk ve minimal kalite kaybı." }],
      [{ text: "Web görsellerini optimize etme: ", bold: true }, { text: "JPG/PNG'den WebP'ye bant genişliğini %25-35 azaltarak görsel kaliteyi korur." }],
      [{ text: "Ekran görüntülerini koruma: ", bold: true }, { text: "PNG'ye PNG (dönüştürme gerekmez) veya saydamlık eklenmesi gerekiyorsa JPG'den PNG'ye." }],
      [{ text: "E-posta için dosya boyutunu azaltma: ", bold: true }, { text: "Herhangi bir format'tan JPG'ye kalite 70-75, veya görsel büyükse boyutlandırma." }],
    ]},

    { type: "h2", content: ["Toplu dönüştürme: birden fazla görseli işleme"] },
    { type: "p", content: ["Dönüştürmeniz gereken onlarca veya yüzlerce görsel olduğu zaman — kamera rulosu, ürün kataloğu, tasarım çıktısı — toplu işleme hayati önem kazanır. Toplu dönüştürme için anahtar unsurlar:"] },
    { type: "list", items: [
      ["Tüm dosyalarda tutarlı kalite ayarlarıyla çıktının统一性."],
      ["İşlemin ne kadar süreceğini gösteren ilerleme takibi."],
      ["Hata eleme — bir bozuk dosya tüm toplu işlemi durdurmamalı."],
      ["Bellek yönetimi — çok sayıda büyük görseli aynı anda işlemek tarayıcı belleğini bunaltabilir."],
    ]},
    { type: "p", content: ["Tarayıcı tabanlı toplu araçlar, bu endişeleri otomatik olarak ele alır: her görsel bir WebWorker'da sıralı olarak işlenir, sonuçlar tamamlandıkça indirmelere aktarılır ve dosyalar arasında bellek serbest bırakılır."] },

    { type: "h2", content: ["Gizlilik: sunucu tarafından dönüştürme neden riskli"] },
    { type: "p", content: ["Bir fotoğrafı bir dönüştürücüye yüklediğinizde, birkaç gizlilik riski ortaya çıkar:"] },
    { type: "list", items: [
      ["Dosyanız ağ üzerinden iletilir — bağlantı tam olarak şifrelenmemişse potansiyel olarak ele geçirilebilir."],
      ["Dosyanın bir kopyası dönüştürcünün sunucusunda saklanır — dakikalar, saatler veya saklama politikasına göre süresiz."],
      ["Dosya üçüncü taraf altyapısında işlenebilir — CDN düğümleri, bulut işlevleri veya asla onaylamadığınız yedekleme sistemleri."],
      ["Meta veri (EXIF: GPS koordinatları, kamera modeli, tarihler) dosya ile birlikte yolculuk eder."],
    ]},
    { type: "p", content: ["Kiisel fotoğraflar için bu, konum geçmişiniz, alışkanlıklarınız ve görsel içeriğinizin yabancılara açıldığı anlamına gelir. İş belgeleri veya ürün görselleri için, fikri mülkiyetin üçüncü taraf altyapıya ulaştığı anlamına gelir. İstemci tarafında dönüştürme bu risklerin hepsini ortadan kaldırır: dosyanız cihazınızdan asla ayrılmaz."] },
    { type: "note", tone: "warning", title: "Gizlilik testi", content: ["Herhangi bir dönüştürme sitesine girmeden önce çoğunun yükleme bağlantısını kontrol edin. Dosyanın nereye gittiğini gösteren bir mesaj görmeniz muhtemeldir. Bu mesaj, verinizin güvende olmadığının ilk işareti olabilir."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Der vollständige Leitfaden zur Bildkonvertierung: Formate, Qualität und Datenschutz",
    eyebrow: "Bilder",
    description:
      "Alles, was Sie über die Konvertierung von Bildern zwischen JPG, PNG, WebP, HEIC und ICO wissen müssen — Formatunterschiede, Qualitätseinstellungen, Komprimierungskompromisse und wie Sie es alles ohne Upload auf einen Server erledigen.",
    excerpt:
      "Von HEIC bis WebP, von verlustfrei zu verlustbehaftet — ein praktischer Leitfaden zur Bildkonvertierung mit Datenschutz.",
    readingTime: "10 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Jeden Tag finden im Web Millionen von Bildkonvertierungen statt: ein Designer exportiert eine PNG-Datei für Transparenz, ein Fotograf komprimiert JPEGs für ein Portfolio, ein Entwickler konvertiert HEIC-Screenshots in JPG für die Kompatibilität. Was die meisten Menschen nicht wissen: Viele kostenlose Online-Konverter laden Ihre Fotos auf ferne Server hoch — und erstellen Kopien, über die Sie keine Kontrolle haben. Dieser Leitfaden behandelt die Formate, die Qualitätskompromisse und wie Sie Bilder vollständig auf Ihrem eigenen Gerät konvertieren."] },
    { type: "h2", content: ["Warum das Bildformat wichtig ist"] },
    { type: "p", content: ["Ein Bildformat ist nur eine Dateiendung — es ist ein Vertrag zwischen Encoder und Decoder darüber, wie Pixeldaten gespeichert, komprimiert und Metadaten verarbeitet werden. Das falsche Format wählen kann zu aufgeblähten Dateien, verlorener Transparenz oder gebrochener Kompatibilität führen."] },
    { type: "list", items: [
      [{ text: "JPEG (.jpg / .jpeg)", bold: true }, { text: " — verlustbehaftete Komprimierung optimiert für Fotos. Es verwirft Daten, für die das menschliche Auge weniger empfindlich ist." }],
      [{ text: "PNG (.png)", bold: true }, { text: " — verlustfreie Komprimierung mit voller Alpha-Transparenz. Jedes Pixel wird genau erhalten." }],
      [{ text: "WebP (.webp)", bold: true }, { text: " — Googers modernes Format mit verlustbehaftetem und verlustfreiem Modus plus Alpha-Transparenz. Typischerweise 25-35 % kleiner als JPEG bei vergleichbarer Qualität." }],
      [{ text: "HEIC (.heic / .heif)", bold: true }, { text: " — Apples Standard-Fotoformat seit iOS 11. Nutzt HEVC-Komprimierung für exzellente Qualität bei kleinen Dateien." }],
    ]},
    { type: "h2", content: ["Qualitätseinstellungen verstehen"] },
    { type: "p", content: ["Bei der Konvertierung zwischen verlustbehafteten Formaten wählen Sie eine Qualitätsstufe — typischerweise eine Zahl zwischen 1 und 100. Das ist keine lineare Skala:"] },
    { type: "list", items: [
      ["Qualität 90-100: visuell nahezu identisch mit dem Original, aber Dateien nur minimal kleiner."],
      ["Qualität 75-89: der sweet spot für die meisten Fotos — kaum wahrnehmbare Unterschiede mit 30-50 % weniger Dateigröße."],
      ["Qualität 50-74: sichtbare Artefakte in detailreichen Bereichen, aber akzeptabel für Thumbnails."],
    ]},
    { type: "note", tone: "success", title: "Die 80/20-Regel der Bildkomprimierung", content: ["Die meisten Bilder können mit Qualität 80-85 komprimiert werden, ohne sichtbaren Unterschied auf dem Bildschirm. Beginnen Sie dort."] },
    { type: "h2", content: ["Datenschutz: warum serverseitige Konvertierung riskant ist"] },
    { type: "p", content: ["Wenn Sie ein Foto einen Online-Konverter hochladen, passieren mehrere Dinge: Ihre Datei wird über das Netzwerk übertragen, eine Kopie wird auf dem Server gespeichert, Metadaten (inklusive GPS-Koordinaten) reisen mit. Die clientseitige Konvertierung eliminiert all diese Risiken: Ihre Datei verlässt Ihr Gerät nie."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Guía completa de conversión de imágenes: formatos, calidad y privacidad",
    eyebrow: "Imágenes",
    description:
      "Todo lo que necesita saber sobre la conversión de imágenes entre JPG, PNG, WebP, HEIC e ICO: diferencias de formato, ajustes de calidad, compromisos de compresión y cómo hacerlo todo sin subir sus fotos a un servidor.",
    excerpt:
      "De HEIC a WebP, de sin pérdida a con pérdida: una guía práctica de conversión de imágenes que respeta su privacidad.",
    readingTime: "10 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Cada día, millones de conversiones de imágenes ocurren en la web: un diseñador exporta un PNG para transparencia, un fotógrafo comprime JPEGs para un portafolio, un desarrollador convierte capturas de HEIC a JPG para compatibilidad. Lo que la mayoría no sabe es que muchos conversores gratuitos en línea suben sus fotos a servidores remotos — creando copias que no puede controlar."] },
    { type: "h2", content: ["Por qué el formato de imagen importa"] },
    { type: "p", content: ["Un formato de imagen no es solo una extensión — es un contrato entre el codificador y el decodificador sobre cómo se almacenan los datos de píxeles, se comprimen y se manejan los metadatos."] },
    { type: "list", items: [
      [{ text: "JPEG (.jpg / .jpeg)", bold: true }, { text: " — compresión con pérdida optimizada para fotografías. Descarta datos a los que el ojo humano es menos sensible." }],
      [{ text: "PNG (.png)", bold: true }, { text: " — compresión sin pérdida con transparencia alfa completa. Cada píxel se conserva exactamente." }],
      [{ text: "WebP (.webp)", bold: true }, { text: " — formato moderno de Google con modo con y sin pérdida más transparencia alfa. Típicamente 25-35 % más pequeño que JPEG." }],
      [{ text: "HEIC (.heic / .heif)", bold: true }, { text: " — formato de foto predeterminado de Apple desde iOS 11. Usa compresión HEVC para excelente calidad en archivos pequeños." }],
    ]},
    { type: "h2", content: ["La privacidad: por qué la conversión en servidor es riesgosa"] },
    { type: "p", content: ["Cuando sube una foto a un conversor en línea, su archivo se transmite por la red, se almacena una copia en el servidor, y los metadatos (incluidas coordenadas GPS) viajan con el archivo. La conversión en el dispositivo elimina todos estos riesgos: su archivo nunca sale de su dispositivo."] },
  ],
};

const imageConversionGuide: GuideDefinition = {
  slug: "image-conversion-complete-guide",
  content: { en, tr, de, es },
};

export default imageConversionGuide;
