import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "The Complete PDF Guide: Merge, Split, Convert and Extract Text",
    eyebrow: "Document",
    description:
      "PDF is the most common document format in business, but working with it often requires expensive desktop software. Learn how to merge, split, convert and extract text from PDFs — quickly and privately.",
    excerpt:
      "Merge, split, convert and extract text from PDFs without installing a thing — all in your browser.",
    readingTime: "10 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Portable Document Format has been the standard for sharing finished documents since 1993 — and it is still the format most likely to cause a frantic search for software. Printing, signing, submitting invoices, sending contracts: PDF is everywhere. Yet manipulating PDFs — merging two files into one, splitting a large document into chapters, converting a DOCX, pulling out the text — has historically meant installing a heavy desktop suite or uploading sensitive files to an unknown server. Neither is necessary anymore."] },

    { type: "h2", content: ["What a PDF actually is"] },
    { type: "p", content: ["A PDF is a container that describes exactly how a page looks: text, fonts, vector graphics and images, positioned to the last pixel, so the same document renders identically on any device and printer. That exactness is its superpower — and also why it resists casual editing. You rarely 'edit' a PDF; instead you merge, split, convert, or extract from it."] },

    { type: "h2", content: ["Merging PDFs"] },
    { type: "p", content: ["Merging combines multiple PDF files into one. Common reasons: combining scanned pages with a typed cover, joining several invoices into a single file for a submission, or assembling a multi-part report. A good merge tool lets you order the files and produces a single clean document with the original pages intact."] },
    { type: "list", items: [
      ["Order files before merging — most tools let you drag and rearrange."],
      ["Check the output opens correctly, as forms and interactive elements can behave differently after a merge."],
      ["Merging keeps file size comparable to the originals; it does not compress."],
    ]},

    { type: "h2", content: ["Splitting PDFs"] },
    { type: "p", content: ["Splitting does the reverse: it divides one document into parts. You might split by page ranges (e.g. keep pages 1–3 of an invoice as a separate file), separate each page of a multi-page form into its own file, or pull a single page out of a long report to send to a colleague."] },

    { type: "h2", content: ["Converting documents to and from PDF"] },
    { type: "p", content: ["The most in-demand conversion is DOCX to PDF — turning a Word document into a portable, non-editable deliverable. Conversion in the browser uses the same engines that power office software, so formatting, fonts and tables are preserved. On the other side, PDF pages can be converted to images (PDF to JPG) when you need to embed a page into a presentation or website."] },

    { type: "h2", content: ["Extracting text and pages"] },
    { type: "p", content: ["PDF to text conversion extracts the readable text from a document, keeping the structure while dropping the exact layout. Useful for:"] },
    { type: "list", items: [
      ["Copying content into documents or emails without retyping."],
      ["Searching within a long document quickly."],
      ["Feeding content into translation, dictation, or analysis tools."],
    ]},
    { type: "note", tone: "warning", title: "Scanned pages are images", content: [
      "A PDF created from a scanner contains pictures of pages, not selectable text. Extracting text from such a file requires optical character recognition (OCR); plain text extraction returns nothing useful."
    ]},

    { type: "h2", content: ["Security: why not to upload PDFs to random sites"] },
    { type: "p", content: ["Contracts, invoices, tax documents and signed agreements are among the most sensitive files you own. Uploading them to an unknown online service means trusting that service with your identity documents and financial records. Browser-based PDF tools process the file locally with WebAssembly: the bytes never leave your machine, nothing is stored, and there is no account to compromise."] },

    { type: "h2", content: ["PDF tools in Convrs"] },
    { type: "p", content: ["Convrs covers the common operations:"] },
    { type: "list", items: [
      [{ text: "PDF merge/split ", bold: true }, { text: "combines or divides documents by range." }],
      [{ text: "DOCX to PDF ", bold: true }, { text: "exports Word documents with formatting intact." }],
      [{ text: "PDF to JPG ", bold: true }, { text: "renders pages as images." }],
      [{ text: "PDF to text ", bold: true }, { text: "extracts readable text and structure." }],
    ]},
    { type: "p", content: ["All of them run client-side, so even contractual documents can be handled without uploading a single byte."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Eksiksiz PDF Rehberi: Birleştirme, Bölme, Dönüştürme ve Metin Çıkarma",
    eyebrow: "Belge",
    description:
      "PDF, iş dünyasında en yaygın belge biçimidir ancak onunla çalışmak çoğu zaman pahalı masaüstü yazılımları gerektirir. PDF'leri hızlı ve gizli şekilde nasıl birleştireceğinizi öğrenin.",
    excerpt:
      "Hiçbir şey kurmadan PDF birleştirin, bölün, dönüştürün ve metin çıkarın — hepsi tarayıcınızda.",
    readingTime: "10 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Portable Document Format, 1993'ten beri bitmiş belgeleri paylaşmanın standardıdır ve işletmenizin en kritik dosyalarını taşır: sözleşmeler, faturalar, imzalı anlaşmalar. Ancak PDF'leri birleştirmek, bölmek veya dönüştürmek; tarihsel olarak ağır masaüstü paketleri kurmak ya da hassas dosyaları bilinmeyen bir sunucuya yüklemek demekti. Artık ikisine de gerek yok."] },

    { type: "h2", content: ["PDF nedir?"] },
    { type: "p", content: ["PDF, bir sayfanın tam olarak nasıl göründüğünü açıklayan bir kapsayıcıdır: metin, yazı tipleri, vektör grafikler ve görseller piksel piksel konumlandırılır. Bu kesinlik onun süper gücüdür — ve aynı zamanda düzenlemeye neden direndiğidir. Bir PDF'i nadiren 'düzenlersiniz'; bunun yerine birleştirir, böler, dönüştürür veya içinden metin çıkarırsınız."] },

    { type: "h2", content: ["PDF birleştirme"] },
    { type: "p", content: ["Birleştirme, birden çok PDF'i tek bir dosyada bir araya getirir. Taranmış sayfaları yazılı bir kapakla birleştirmek, bir başvuru için birkaç faturayı tek dosyada toplamak veya çok parçalı bir raporu birleştirmek yaygın nedenlerdir. İyi bir araç, dosyaları sıralamanıza izin verir ve orijinal sayfaların korunduğu tek bir temiz belge üretir."] },

    { type: "h2", content: ["PDF bölme"] },
    { type: "p", content: ["Bölme işlemi tersini yapar: bir belgeyi parçalara ayırır. Sayfa aralığına göre bölebilir (ör. bir faturanın 1–3. sayfalarını ayrı dosya olarak ayırmak), çok sayfalı bir formun her sayfasını kendi dosyasına ayırabilir veya uzun bir rapordan tek sayfa çekebilirsiniz."] },

    { type: "h2", content: ["Belgeleri PDF'e dönüştürme"] },
    { type: "p", content: ["En çok istenen dönüşüm DOCX → PDF'tir: Word belgesini taşınabilir, düzenlenemez bir teslimata çevirmek. Tarayıcıda dönüştürme, ofis yazılımlarını çalıştıran aynı motorları kullanır; biçimlendirme, yazı tipleri ve tablolar korunur. Diğer yönde, bir sayfayı sunum veya web sitesine gömmek istediğinizde PDF sayfaları görsele (PDF → JPG) dönüştürülebilir."] },

    { type: "h2", content: ["Metin çıkarma"] },
    { type: "p", content: ["PDF → metin dönüştürme, belgedeki okunabilir metni yapıyı koruyarak çıkarır. Uzun bir belgeyi hızlıca aramak, içeriği yeniden yazmadan kopyalamak veya çeviri ve analiz araçlarına beslemek için kullanışlıdır."] },
    { type: "note", tone: "warning", title: "Taranmış sayfalar görseldir", content: [
      "Tarayıcıdan oluşturulmuş bir PDF, sayfaların fotoğraflarını içerir; seçilebilir metin yoktur. Böyle bir dosyadan metin çıkarmak optik karakter tanıma (OCR) gerektirir."
    ]},

    { type: "h2", content: ["Güvenlik: PDF'leri yabancı sitelere neden yüklememelisiniz?"] },
    { type: "p", content: ["Sözleşmeler, faturalar ve imzalı anlaşmalar, sahip olduğunuz en hassas dosyalardandır. Bunları bilinmeyen bir çevrimiçi hizmete yüklemek, kimlik belgelerinizi ve mali kayıtlarınızı o hizmete emanet etmek demektir. Tarayıcı tabanlı PDF araçları dosyayı WebAssembly ile yerel işler: baytlar asla makinenizden çıkmaz, hiçbir şey saklanmaz."] },

    { type: "h2", content: ["Convrs PDF araçları"] },
    { type: "list", items: [
      [{ text: "PDF birleştirme/bölme ", bold: true }, { text: "belgeleri aralığa göre birleştirir veya ayırır." }],
      [{ text: "DOCX → PDF ", bold: true }, { text: "biçimlendirmeyi koruyarak Word belgelerini dışa aktarır." }],
      [{ text: "PDF → JPG ", bold: true }, { text: "sayfaları görsel olarak döndürür." }],
      [{ text: "PDF → metin ", bold: true }, { text: "okunabilir metni ve yapıyı çıkarır." }],
    ]},
    { type: "p", content: ["Tümü istemci tarafında çalışır; sözleşme belgeleri dahil hiçbir dosya yüklenmez."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Der komplette PDF-Leitfaden: Zusammenführen, Teilen, Konvertieren und Text extrahieren",
    eyebrow: "Dokument",
    description:
      "PDF ist das häufigste Dokumentformat im Geschäftsleben. Lernen Sie, wie Sie PDFs zusammenführen, teilen, konvertieren und Text extrahieren — schnell und privat.",
    excerpt:
      "PDFs zusammenführen, teilen, konvertieren und Texte extrahieren — alles im Browser.",
    readingTime: "11 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["PDF ist seit 1993 der Standard für fertige Dokumente und trägt Ihre sensibelsten Dateien: Verträge, Rechnungen, unterschriebene Vereinbarungen. PDFs zu bearbeiten hieß bisher, schwere Software zu installieren oder Dateien hochzuladen. Beides ist nicht mehr nötig."] },
    { type: "h2", content: ["Was eine PDF ist"] },
    { type: "p", content: ["Eine PDF beschreibt exakt, wie eine Seite aussieht. Sie bearbeiten eine PDF selten direkt — Sie führen sie zusammen, teilen sie, konvertieren sie oder extrahieren Text."] },
    { type: "h2", content: ["PDFs zusammenführen"] },
    { type: "p", content: ["Zusammenführen kombiniert mehrere Dateien: gescannte Seiten mit einem Deckblatt, mehrere Rechnungen für eine Einreichung, Teile eines Berichts. Eine gute Datei lässt sich sortieren und erzeugt ein einziges sauberes Dokument."] },
    { type: "h2", content: ["PDFs teilen"] },
    { type: "p", content: ["Teilen macht das Gegenteil: Es zerlegt ein Dokument in Teile — nach Seitenbereichen, pro Seite oder als einzelne herausgezogene Seite."] },
    { type: "h2", content: ["Konvertieren"] },
    { type: "p", content: ["Die gefragteste Konvertierung ist DOCX zu PDF. Die browserbasierte Konvertierung nutzt dieselben Engines wie Office-Software; Formatierung, Schriftarten und Tabellen bleiben erhalten. PDF-Seiten lassen sich auch in Bilder (PDF zu JPG) umwandeln."] },
    { type: "h2", content: ["Text extrahieren"] },
    { type: "p", content: ["PDF-zu-Text zieht den lesbaren Text aus einem Dokument. Nützlich zum schnellen Durchsuchen langer Dokumente oder zum Kopieren ohne Abtippen."] },
    { type: "note", tone: "warning", title: "Gescannte Seiten sind Bilder", content: [
      "Eine aus einem Scanner erstellte PDF enthält Bilder der Seiten, keinen auswählbaren Text. Dafür ist optische Zeichenerkennung (OCR) nötig."
    ]},
    { type: "h2", content: ["Sicherheit"] },
    { type: "p", content: ["Verträge und Rechnungen gehören zu den sensibelsten Dateien. Sie unbekannten Online-Diensten anzuvertrauen ist riskant. Browserbasierte PDF-Tools verarbeiten die Datei lokal mit WebAssembly: Kein Byte verlässt Ihr Gerät, nichts wird gespeichert."] },
    { type: "h2", content: ["PDF-Werkzeuge in Convrs"] },
    { type: "list", items: [
      [{ text: "PDF zusammenführen/teilen ", bold: true }, { text: "kombiniert oder teilt Dokumente." }],
      [{ text: "DOCX zu PDF ", bold: true }, { text: "exportiert Word-Dokumente." }],
      [{ text: "PDF zu JPG ", bold: true }, { text: "rendert Seiten als Bilder." }],
      [{ text: "PDF zu Text ", bold: true }, { text: "extrahiert lesbaren Text." }],
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Guía completa de PDF: combinar, dividir, convertir y extraer texto",
    eyebrow: "Documento",
    description:
      "PDF es el formato de documento más común en los negocios. Aprende a combinar, dividir, convertir y extraer texto de PDF — rápida y privadamente.",
    excerpt:
      "Combina, divide, convierte y extrae texto de PDF sin instalar nada — todo en el navegador.",
    readingTime: "10 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["PDF es el estándar para compartir documentos terminados y lleva tus archivos más sensibles: contratos, facturas, acuerdos firmados. Manipular PDFs implicaba instalar software pesado o subir archivos a servidores desconocidos. Ya no es necesario."] },
    { type: "h2", content: ["Qué es un PDF"] },
    { type: "p", content: ["Un PDF describe exactamente cómo se ve una página. Rara vez se edita: se combina, se divide, se convierte o se extrae texto de él."] },
    { type: "h2", content: ["Combinar PDFs"] },
    { type: "p", content: ["Combinar agrupa varios archivos en uno: páginas escaneadas con una portada, varias facturas para una presentación, o partes de un informe."] },
    { type: "h2", content: ["Dividir PDFs"] },
    { type: "p", content: ["Dividir hace lo contrario: separa un documento en partes, por rangos de página, por página o extrayendo una sola página."] },
    { type: "h2", content: ["Convertir"] },
    { type: "p", content: ["La conversión más demandada es DOCX a PDF. La conversión en el navegador usa los mismos motores que el software de oficina; el formato se conserva. Las páginas PDF también se convierten en imágenes (PDF a JPG)."] },
    { type: "h2", content: ["Extraer texto"] },
    { type: "p", content: ["PDF a texto extrae el texto legible de un documento, útil para buscar o copiar sin reescribir."] },
    { type: "note", tone: "warning", title: "Las páginas escaneadas son imágenes", content: [
      "Un PDF creado por un escáner contiene fotos de las páginas, no texto seleccionable. Hace falta OCR."
    ]},
    { type: "h2", content: ["Seguridad"] },
    { type: "p", content: ["Los contratos y facturas son de tus archivos más sensibles. Subirlos a servicios desconocidos es arriesgado. Las herramientas PDF basadas en navegador procesan el archivo localmente con WebAssembly: nada sale de tu dispositivo."] },
    { type: "h2", content: ["Herramientas PDF en Convrs"] },
    { type: "list", items: [
      [{ text: "Combinar/dividir PDF ", bold: true }, { text: "combina o separa documentos." }],
      [{ text: "DOCX a PDF ", bold: true }, { text: "exporta documentos de Word." }],
      [{ text: "PDF a JPG ", bold: true }, { text: "convierte páginas en imágenes." }],
      [{ text: "PDF a texto ", bold: true }, { text: "extrae texto legible." }],
    ]},
  ],
};

const pdfFileGuide: GuideDefinition = {
  slug: "pdf-file-guide",
  content: { en, tr, de, es },
};

export default pdfFileGuide;