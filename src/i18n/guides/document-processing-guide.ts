import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Document Conversion and Processing: PDF, DOCX, XLSX and Beyond",
    eyebrow: "Documents",
    description:
      "A practical guide to working with documents in the browser — merging and splitting PDFs, converting DOCX to PDF, extracting text from PDFs, and processing spreadsheets without uploading files to external servers.",
    excerpt:
      "From PDF merging to DOCX conversion — how to process documents privately in your browser.",
    readingTime: "8 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Documents are the backbone of both personal and professional workflows. Contracts, reports, invoices, resumes — they travel between formats constantly. Yet most online document converters require uploading your files to their servers, which is particularly risky for documents that may contain sensitive personal or business information. This guide covers the most common document operations and how to perform them entirely in your browser."] },

    { type: "h2", content: ["Why document conversion matters"] },
    { type: "p", content: ["Different platforms and tools expect different file formats. A report written in Google Docs needs to become a PDF for distribution. A scanned document needs OCR to become searchable. A spreadsheet needs to convert between XLSX and CSV for data analysis. The challenge is doing these conversions without exposing your documents to third-party servers."] },

    { type: "h2", content: ["PDF operations: merge, split and convert"] },
    { type: "p", content: ["PDF (Portable Document Format) is the universal standard for document sharing. Here are the most common PDF operations:"] },
    { type: "list", items: [
      [{ text: "PDF merge: ", bold: true }, { text: "Combine multiple PDF files into one. Common use cases: merging separate chapter files into a single report, combining scan pages into one document." }],
      [{ text: "PDF split: ", bold: true }, { text: "Extract specific pages from a PDF. Useful for separating a signature page, extracting a chapter, or breaking a large document into manageable parts." }],
      [{ text: "PDF to text: ", bold: true }, { text: "Extract plain text content from a PDF. Essential for data processing, search indexing, or when you need to edit content that was locked in a PDF." }],
      [{ text: "PDF to JPG: ", bold: true }, { text: "Convert PDF pages to images. Needed when you want to share a PDF page as an image on social media or in a presentation." }],
      [{ text: "DOCX to PDF: ", bold: true }, { text: "Convert Word documents to PDF for universal sharing. PDF preserves formatting across all devices and platforms." }],
    ]},
    { type: "note", tone: "success", title: "Why PDF merge/split is a privacy-sensitive operation", content: ["Documents often contain more personal information than photos — names, addresses, financial data, medical records, legal agreements. Merging or splitting these documents on a third-party server means all that data travels across the network and is temporarily stored on infrastructure you do not control. Browser-based processing keeps every page on your device."] },

    { type: "h2", content: ["Spreadsheet conversion: XLSX, CSV and data formats"] },
    { type: "p", content: ["Spreadsheets are the most common data exchange format in business. Converting between formats is often necessary:"] },
    { type: "list", items: [
      [{ text: "XLSX to CSV: ", bold: true }, { text: "Extract raw data from Excel files for use in databases, scripts, or data analysis tools. CSV is universal and human-readable." }],
      [{ text: "CSV to SQL: ", bold: true }, { text: "Generate SQL INSERT statements from CSV data — essential for database migrations and data imports." }],
      [{ text: "CSV to JSON: ", bold: true }, { text: "Convert tabular data to JSON for use in web applications and APIs." }],
    ]},
    { type: "p", content: ["The key concern with spreadsheet conversion is data sensitivity. Financial reports, customer lists, salary data, and project plans all contain information that should not be uploaded to unknown servers."] },

    { type: "h2", content: ["Security considerations for document processing"] },
    { type: "p", content: ["When processing documents, security depends on three factors:"] },
    { type: "list", items: [
      [{ text: "Transmission security: ", bold: true }, { text: "Is the file encrypted during upload? Even HTTPS can be compromised by misconfigured servers or corporate proxies." }],
      [{ text: "Storage security: ", bold: true }, { text: "How long is the file retained? Most services do not disclose their actual retention policies." }],
      [{ text: "Access control: ", bold: true }, { text: "Who can access the file on the server? Employees, contractors, automated systems?" }],
    ]},
    { type: "p", content: ["Client-side processing eliminates all three concerns. There is no transmission (beyond the initial page load), no storage, and no access control needed because the file never reaches a server."] },

    { type: "h2", content: ["How browser-based document processing works"] },
    { type: "p", content: ["Modern browsers support powerful document processing through a combination of technologies:"] },
    { type: "list", items: [
      ["PDF.js for rendering and parsing PDF documents in JavaScript."],
      ["WebAssembly ports of LibreOffice and other office suites for DOCX/XLSX conversion."],
      ["SheetJS for spreadsheet parsing and conversion."],
      ["Client-side text extraction and encoding tools."],
    ]},
    { type: "p", content: ["These libraries load into your browser as part of the page and execute locally. The document is parsed, transformed, and the result is written back to your device — all without any network round-trip."] },

    { type: "h2", content: ["Practical tips for document management"] },
    { type: "list", items: [
      ["Always keep the original file after conversion — format conversion can lose formatting details."],
      ["For PDF merges, check page sizes and orientations before combining to ensure consistency."],
      ["When converting spreadsheets, verify that formulas have been evaluated to values (CSV cannot contain formulas)."],
      ["For sensitive documents, use tools that run in your browser and do not upload files to servers."],
      ["Consider file size: large PDFs with many images may take longer to process in-browser than small text-only documents."],
    ]},

    { type: "h2", content: ["Document processing with Convrs"] },
    { type: "p", content: ["Convrs provides a full suite of document tools that run entirely in your browser:"] },
    { type: "list", items: [
      ["PDF merge and split — combine or extract pages without uploading."],
      ["PDF to text — extract content from PDF documents for editing or analysis."],
      ["PDF to JPG — convert PDF pages to images for sharing."],
      ["DOCX to PDF — convert Word documents to universally readable PDFs."],
      ["XLSX and CSV tools — convert, process and generate SQL from spreadsheet data."],
    ]},
    { type: "p", content: ["Every conversion happens on your device via WebAssembly. No files are uploaded, no accounts are needed, and no traces remain when you close the tab."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Belge Dntrme ve leme: PDF, DOCX, XLSX ve daha fazlas",
    eyebrow: "Belgeler",
    description:
      "Taraycda belgelerle alma pratik klm — PDF birletirme ve blme, DOCX'ten PDF'e dntrme, PDF'ten metinarma ve dosyalar harici sunuculara yklemeden tablolar ileme.",
    excerpt:
      "PDF birletirmeden DOCX dntrmeye — belgeleri taraycda nasl gizli olarak ileyeceiniz.",
    readingTime: "8 dk okuma",
    updatedDate: "16 Eyll 2026",
  },
  blocks: [
    { type: "p", content: ["Belgeler hem kisel hem profesyonel i akklannn omurgasdr. Szlemeler, raporlar, faturalar, zgecmieler — srekli olarak formatlar arasnda gezi. Ancak ok belirli online belge dntrcs dosyalar kendi sunuculara yuklemenizi ister, bu da hassas kisel veya i bilgileri iceren belgeler iin zellikle risklidir. Bu klm en yaygn belge ilemlerini ve bunlarn taraycnzda tamamen nasl gerekletirileceini inceler."] },
    { type: "h2", content: ["Belge dntrme neden nemli"] },
    { type: "p", content: ["Farkl platformlar ve araclar farkl dosya formatlar bekler. Google Docs'ta yazlan bir rapor daim iin PDF olmaldr. Taranm bir belge aranabilir olmak iin OCR gerektrir. Bir tablo veri analizi iin XLSX ile CSV arasnda dntrmeli. Zorluk, dosyalarcnz Uclnc taraf sunuculara maruz kalmadan bu dntrmeleri yapmaktadr."] },
    { type: "h2", content: ["PDF ilemleri: birletir, bl ve dntr"] },
    { type: "p", content: ["PDF (Taabilir Belge Format), belge paylam evrensel standarttr. En yaygn ilemler:"] },
    { type: "list", items: [
      [{ text: "PDF birletirme: ", bold: true }, { text: "Birka PDF dosyasn tek birleik dosya oluturun." }],
      [{ text: "PDF blme: ", bold: true }, { text: "Bir PDF'den belirli sayfalar kartrn." }],
      [{ text: "PDF'den metne: ", bold: true }, { text: "PDF'den dzen metin icerigi kartrn." }],
      [{ text: "PDF'den JPG'ye: ", bold: true }, { text: "PDF sayfalarn grsel olarak dntrn." }],
    ]},
    { type: "note", tone: "success", title: "PDF birletirme/bolme neden gizlilik a尔ndan hassas", content: ["Belgeler genellikle fotoerelerden daha fazla kisel icerik ister — isimler, adresler, finansal veriler, saglk kaytlar, yasal szlemeler. Bu belgeleri Uclnc taraf sunucuda birletirmek veya blemek, btn bu verinin ag zerinden yolculuk etmesi anlamna gelir."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Dokumentenkonvertierung und -verarbeitung: PDF, DOCX, XLSX und mehr",
    eyebrow: "Dokumente",
    description:
      "Ein praktischer Leitfaden zur Arbeit mit Dokumenten im Browser — PDFs zusammenführen und teilen, DOCX in PDF konvertieren, Text aus PDFs extrahieren und Tabellenkalkulationen ohne Upload verarbeiten.",
    excerpt:
      "Von PDF-Zusammenführung bis DOCX-Konvertierung — wie Sie Dokumente privat in Ihrem Browser verarbeiten.",
    readingTime: "8 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Dokumente bilden das Rückgrat sowohl persönlicher als auch beruflicher Workflows. Verträge, Berichte, Rechnungen, Lebensläufe — sie wechseln ständig zwischen Formaten. Doch die meisten Online-Dokumentenkonverter erfordern den Upload Ihrer Dateien auf Server — besonders riskant für Dokumente mit sensiblen persönlichen oder geschäftlichen Informationen."] },
    { type: "h2", content: ["PDF-Operationen: zusammenführen, teilen und konvertieren"] },
    { type: "p", content: ["PDF (Portable Document Format) ist der universelle Standard für die Dokumentenfreigabe. Hier sind die gängigsten PDF-Operationen:"] },
    { type: "list", items: [
      [{ text: "PDF zusammenführen: ", bold: true }, { text: "Mehrere PDF-Dateien zu einer einzigen kombinieren." }],
      [{ text: "PDF teilen: ", bold: true }, { text: "Bestimmte Seiten aus einem PDF extrahieren." }],
      [{ text: "PDF zu Text: ", bold: true }, { text: "Klartextinhalt aus einem PDF extrahieren." }],
      [{ text: "PDF zu JPG: ", bold: true }, { text: "PDF-Seiten in Bilder konvertieren." }],
      [{ text: "DOCX zu PDF: ", bold: true }, { text: "Word-Dokumente für universelle Freigabe in PDF konvertieren." }],
    ]},
    { type: "h2", content: ["Datenschutz bei der Dokumentenverarbeitung"] },
    { type: "p", content: ["Dokumente enthalten oft mehr persönliche Informationen als Fotos — Namen, Adressen, Finanzdaten, medizinische Unterlagen. Die Verarbeitung im Browser hält jedes Dokument auf Ihrem Gerät."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Conversión y procesamiento de documentos: PDF, DOCX, XLSX y más allá",
    eyebrow: "Documentos",
    description:
      "Una guía práctica para trabajar con documentos en el navegador: fusionar y dividir PDF, convertir DOCX a PDF, extraer texto de PDF y procesar hojas de cálculo sin subir archivos a servidores externos.",
    excerpt:
      "De la fusión de PDF a la conversión de DOCX: cómo procesar documentos de forma privada en su navegador.",
    readingTime: "8 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Los documentos son la columna vertebral de los flujos de trabajo personales y profesionales. Contratos, informes, facturas, currículos — viajan constantemente entre formatos. Sin embargo, la mayoría de los conversores de documentos en línea requieren subir sus archivos a sus servidores, lo cual es particularmente arriesgado para documentos que pueden contener información personal o empresarial sensible."] },
    { type: "h2", content: ["Operaciones PDF: fusionar, dividir y convertir"] },
    { type: "p", content: ["PDF (Portable Document Format) es el estándar universal para el intercambio de documentos. Estas son las operaciones PDF más comunes:"] },
    { type: "list", items: [
      [{ text: "Fusionar PDF: ", bold: true }, { text: "Combinar múltiples archivos PDF en uno solo." }],
      [{ text: "Dividir PDF: ", bold: true }, { text: "Extraer páginas específicas de un PDF." }],
      [{ text: "PDF a texto: ", bold: true }, { text: "Extraer contenido de texto sin formato de un PDF." }],
      [{ text: "PDF a JPG: ", bold: true }, { text: "Convertir páginas de PDF en imágenes." }],
    ]},
    { type: "h2", content: ["Privacidad en el procesamiento de documentos"] },
    { type: "p", content: ["Los documentos a menudo contienen más información personal que las fotos: nombres, direcciones, datos financieros, registros médicos. El procesamiento en el navegador mantiene cada documento en su dispositivo."] },
  ],
};

const documentProcessingGuide: GuideDefinition = {
  slug: "document-processing-guide",
  content: { en, tr, de, es },
};

export default documentProcessingGuide;
