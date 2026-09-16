import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Spreadsheets Without Excel: XLSX, CSV, JSON and SQL Conversions",
    eyebrow: "Document",
    description:
      "Spreadsheet data lives everywhere: XLSX workbooks, CSV exports, JSON feeds, SQL databases. Learn when each format fits and how to move data between them without losing structure — privately, in the browser.",
    excerpt:
      "Move data between XLSX, CSV, JSON and SQL without losing structure — no uploads, fully private.",
    readingTime: "8 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Tabular data rarely stays in one format. A client sends a workbook, your analytics platform exports CSV, your database dumps JSON or SQL, and you need to merge it all into one place. Format conversion is a daily task for analysts, developers, marketers and administrators — and it is also a task where data often contains private or commercially sensitive rows. This guide explains the four formats, when to use each, and how to convert safely."] },

    { type: "h2", content: ["The four formats at a glance"] },
    { type: "table", columns: ["Format", "What it is", "Best for", "Watch out for"], rows: [
      ["XLSX", "Excel workbook (zip of XML)", "Formulas, multiple sheets, formats", "Binary; not readable as text"],
      ["CSV", "Comma-separated plain text", "Exports, imports, tiny files", "No types, no formulas, quoting rules"],
      ["JSON", "Nested object structure", "APIs, web apps, flexible data", "No columns — nesting is deeper"],
      ["SQL", "INSERT statements / schema", "Populating databases", "Empty values and quoting need care"],
    ]},
    { type: "p", content: ["The golden rule: choose the destination format by what will consume the data. If a human opens it in Excel, produce XLSX or CSV. If an API consumes it, produce JSON. If a database imports it, produce SQL. Converting to a format the receiver can't use is as bad as not converting at all."] },

    { type: "h2", content: ["CSV: the universal exchange format"] },
    { type: "p", content: ["CSV (comma-separated values) is plain text, which makes it the most portable tabular format: any spreadsheet, database or script can read it. The trade-offs are real, though. CSV has no data types — a value like 00123 is a number or a string depending on the reader — and no formulas or multiple sheets. Export tools usually must quote fields containing commas, quotes or newlines, and the quoting convention varies by region (semicolon-separated in some locales). For simple rectangular tables, CSV is still the fastest path between two systems."] },

    { type: "h2", content: ["JSON: nested and structured"] },
    { type: "p", content: ["JSON is the native format of the web — every API and almost every JavaScript application works with it. Unlike a spreadsheet grid, JSON can represent nested structures: an order with line items, a user with an address object, a tree of categories. When you export XLSX to JSON, these shapes are flattened into rows of key/value pairs, which is exactly right for feeding data into web applications, dashboards and migration scripts."] },

    { type: "h2", content: ["SQL: straight into the database"] },
    { type: "p", content: ["Converting a spreadsheet to SQL produces INSERT statements (and optionally a table definition) that load your data into a relational database. This is the path for bootstrap data, seed scripts, and moving flat files into PostgreSQL, MySQL or SQLite. Values are quoted and escaped correctly, so strings with apostrophes and NULL cells are handled the way the database expects. You get the column order right once, and the schema work is done."] },

    { type: "h2", content: ["XLSX: the workbook format"] },
    { type: "p", content: ["XLSX is the modern Excel format: a zip archive containing XML sheets, so real workbooks can carry multiple worksheets, formulas, number formats and styling. Reading and writing XLSX is what most 'excel-style' tools offer. When you convert XLSX to CSV or JSON, each worksheet typically becomes its own file — the sheet boundary is preserved as a file boundary."] },

    { type: "h2", content: ["Converting without exposing your data"] },
    { type: "p", content: ["Spreadsheet data is almost always sensitive: payroll tables, customer lists, inventory prices, internal reports. Uploading it to an online converter to read a client's workbook means your business data is passing through someone else's server. Conversion in the browser reads the file locally, parses every cell, and writes the new format — on your own machine."] },

    { type: "h2", content: ["Spreadsheet tools in Convrs"] },
    { type: "list", items: [
      [{ text: "XLSX to CSV ", bold: true }, { text: "exports sheets as plain-text tables." }],
      [{ text: "XLSX to JSON ", bold: true }, { text: "produces structured objects for web apps." }],
      [{ text: "CSV to SQL ", bold: true }, { text: "generates valid INSERT statements." }],
    ]},
    { type: "p", content: ["Each operates fully client-side, so customer and financial data can change format without ever leaving the browser."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Excel'e Bağımlı Olmadan E-Tablolar: XLSX, CSV, JSON ve SQL Dönüştürme",
    eyebrow: "Belge",
    description:
      "E-tablo verileri her yerde yaşar: XLSX çalışma kitapları, CSV dışa aktarımları, JSON akışları, SQL veritabanları. Yapıyı kaybetmeden verileri nasıl taşıyacağınızı öğrenin.",
    excerpt:
      "Yapıyı kaybetmeden XLSX, CSV, JSON ve SQL arasında veri taşıyın — yükleme yok, tamamen gizli.",
    readingTime: "8 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Tablo verileri nadiren tek bir biçimde kalır. Bir müşteri çalışma kitabı gönderir, analiz platformunuz CSV dışa aktarır, veritabanınız JSON veya SQL döker ve hepsini tek yerde birleştirmeniz gerekir. Biçim dönüştürme; analist, geliştirici ve pazarlamacılar için günlük bir iştir — ve verilerin çoğu zaman özel veya ticari açıdan hassas satırlar içerdiği bir iştir."] },

    { type: "h2", content: ["Dört biçime genel bakış"] },
    { type: "table", columns: ["Biçim", "Ne olduğu", "En iyi", "Dikkat"], rows: [
      ["XLSX", "Excel çalışma kitabı", "Formüller, birden çok sayfa", "İkili; metin olarak okunamaz"],
      ["CSV", "Virgülle ayrılmış düz metin", "Dışa aktarım, içe aktarım", "Tür yok, formül yok"],
      ["JSON", "İç içe nesne yapısı", "API'ler, web uygulamaları", "Sütun yok — iç içelik daha derin"],
      ["SQL", "INSERT deyimleri", "Veritabanı doldurma", "Boş değer ve tırnak işaretleri"],
    ]},
    { type: "p", content: ["Altın kural: hedef biçimi, veriyi neyin tüketeceğine göre seçin. İnsan Excel'de açacaksa XLSX veya CSV üretin. Bir API tüketecekse JSON üretin. Bir veritabanı içe aktaracaksa SQL üretin. Alıcının kullanamadığı bir biçime dönüştürmek, hiç dönüştürmemek kadar kötüdür."] },

    { type: "h2", content: ["CSV: evrensel alışveriş biçimi"] },
    { type: "p", content: ["CSV düz metindir, bu da onu en taşınabilir tablo biçimi yapar. Ancak tür yoktur — 00123 değeri okuyucuya göre sayı ya da metindir — formül ve birden çok sayfa yoktur. Basit dikdörtgen tablolar için CSV hâlâ iki sistem arasındaki en hızlı yoldur."] },

    { type: "h2", content: ["JSON: iç içe ve yapılandırılmış"] },
    { type: "p", content: ["JSON, web'in yerel biçimidir. Elektronik tabloların aksine iç içe yapıları temsil edebilir: satır kalemleri olan bir sipariş, adres nesnesi olan bir kullanıcı. XLSX'i JSON'a dışa aktardığınızda bu şekiller, web uygulamalarına, panolara ve geçiş betiklerine beslemek için tam doğru olan anahtar/değer satırlarına yassılaştırılır."] },

    { type: "h2", content: ["SQL: doğrudan veritabanına"] },
    { type: "p", content: ["Bir e-tabloyu SQL'e dönüştürmek, verinizi ilişkisel bir veritabanına yükleyen INSERT deyimleri üretir. Değerler doğru alıntılanır ve kaçırılır; kesme işaretli dizeler ve NULL hücreler veritabanının beklediği gibi işlenir."] },

    { type: "h2", content: ["Verinizi ifşa etmeden dönüştürün"] },
    { type: "p", content: ["E-tablo verileri neredeyse her zaman hassastır: maaş tabloları, müşteri listeleri, stok fiyatları. Bunu çevrimiçi bir dönüştürücüye yüklemek, iş verinizin başka birinin sunucusundan geçmesi demektir. Tarayıcıda dönüştürme, dosyayı yerel okur, her hücreyi ayrıştırır ve yeni biçimi kendi makinenizde yazar."] },

    { type: "h2", content: ["Convrs e-tablo araçları"] },
    { type: "list", items: [
      [{ text: "XLSX → CSV ", bold: true }, { text: "sayfaları düz metin tabloları olarak dışa aktarır." }],
      [{ text: "XLSX → JSON ", bold: true }, { text: "web uygulamaları için yapılandırılmış nesneler üretir." }],
      [{ text: "CSV → SQL ", bold: true }, { text: "geçerli INSERT deyimleri üretir." }],
    ]},
    { type: "p", content: ["Her biri tamamen istemci tarafında çalışır; müşteri ve finans verileri tarayıcıdan çıkmadan biçim değiştirebilir."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Tabellenkalkulation ohne Excel: XLSX, CSV, JSON und SQL",
    eyebrow: "Dokument",
    description:
      "Tabellendaten leben überall: XLSX-Arbeitsmappen, CSV-Exporte, JSON-Feeds, Datenbanken. Erfahren Sie, wie Sie Daten strukturerhaltend umwandeln — privat im Browser.",
    excerpt:
      "Daten zwischen XLSX, CSV, JSON und SQL bewegen — ohne Upload, privat.",
    readingTime: "9 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Tabellendaten bleiben selten in einem Format. Konvertierung ist eine tägliche Aufgabe — und Daten enthalten oft private oder geschäftlich sensible Zeilen. Dieser Leitfaden erklärt die vier Formate und den sicheren Wechsel."] },
    { type: "h2", content: ["Die vier Formate"] },
    { type: "table", columns: ["Format", "Was es ist", "Beste für", "Achtung"], rows: [
      ["XLSX", "Excel-Arbeitsmappe", "Formeln, mehrere Blätter", "Binär, nicht als Text lesbar"],
      ["CSV", "Kommagetrennter Text", "Ex-/Import", "Keine Typen, keine Formeln"],
      ["JSON", "Verschachtelte Objekte", "APIs, Web-Apps", "Keine Spalten"],
      ["SQL", "INSERT-Anweisungen", "Datenbank-Befüllung", "Quoting beachten"],
    ]},
    { type: "h2", content: ["CSV: das Austauschformat"] },
    { type: "p", content: ["CSV ist Klartext und damit am portabelsten. Es gibt keine Datentypen und keine Formeln. Für einfache Tabellen ist CSV der schnellste Weg zwischen zwei Systemen."] },
    { type: "h2", content: ["JSON: geschachtelt"] },
    { type: "p", content: ["JSON ist das native Format des Webs und kann verschachtelte Strukturen darstellen. Beim Export von XLSX nach JSON werden diese Formen zu Schlüssel-Wert-Zeilen abgeflacht — ideal für Web-Apps und Dashboards."] },
    { type: "h2", content: ["SQL: direkt in die Datenbank"] },
    { type: "p", content: ["Die Konvertierung in SQL erzeugt INSERT-Anweisungen zum Laden in relationale Datenbanken. Werte werden korrekt maskiert; Apostrophe und NULL-Zellen werden sauber verarbeitet."] },
    { type: "h2", content: ["Konvertieren ohne Daten-Exposition"] },
    { type: "p", content: ["Tabellendaten sind fast immer sensibel. Der Upload an einen Online-Konverter lässt Ihre Geschäftsdaten durch fremde Server laufen. Browserbasierte Konvertierung liest die Datei lokal und schreibt das neue Format auf Ihrem eigenen Gerät."] },
    { type: "h2", content: ["Tabellenwerkzeuge in Convrs"] },
    { type: "list", items: [
      [{ text: "XLSX zu CSV ", bold: true }, { text: "exportiert Blätter als Text." }],
      [{ text: "XLSX zu JSON ", bold: true }, { text: "erzeugt Objekte für Web-Apps." }],
      [{ text: "CSV zu SQL ", bold: true }, { text: "erzeugt gültige INSERT-Anweisungen." }],
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Hojas de cálculo sin Excel: conversiones XLSX, CSV, JSON y SQL",
    eyebrow: "Documento",
    description:
      "Los datos tabulares viven en todas partes: libros XLSX, exportaciones CSV, feeds JSON, bases de datos. Aprende a mover datos entre formatos sin perder estructura.",
    excerpt:
      "Mueve datos entre XLSX, CSV, JSON y SQL sin perder estructura — sin subidas, privado.",
    readingTime: "8 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Los datos tabulares rara vez se quedan en un formato. La conversión es una tarea diaria, y los datos suelen contener filas sensibles. Esta guía explica los cuatro formatos y cómo convertir con seguridad."] },
    { type: "h2", content: ["Los cuatro formatos"] },
    { type: "table", columns: ["Formato", "Qué es", "Ideal para", "Cuidado"], rows: [
      ["XLSX", "Libro de Excel", "Fórmulas, varias hojas", "Binario, no se lee como texto"],
      ["CSV", "Texto separado por comas", "Im-/Exportación", "Sin tipos ni fórmulas"],
      ["JSON", "Objetos anidados", "APIs, apps web", "Sin columnas"],
      ["SQL", "Sentencias INSERT", "Bases de datos", "Cuidado con comillas"],
    ]},
    { type: "h2", content: ["CSV: el formato de intercambio"] },
    { type: "p", content: ["CSV es texto plano, el formato más portátil. No tiene tipos ni fórmulas. Para tablas simples es el camino más rápido entre dos sistemas."] },
    { type: "h2", content: ["JSON: anidado"] },
    { type: "p", content: ["JSON es el formato nativo de la web y puede representar estructuras anidadas. Al exportar XLSX a JSON, esas formas se aplanan en filas clave-valor, ideal para apps web."] },
    { type: "h2", content: ["SQL: directo a la base de datos"] },
    { type: "p", content: ["Convertir a SQL genera sentencias INSERT para cargar en bases relacionales. Los valores se citan y escapan correctamente."] },
    { type: "h2", content: ["Convertir sin exponer tus datos"] },
    { type: "p", content: ["Los datos de hojas de cálculo son casi siempre sensibles. Subirlos a un conversor online significa que pasan por servidores de terceros. La conversión en el navegador lee el archivo localmente."] },
    { type: "h2", content: ["Herramientas de hoja de cálculo en Convrs"] },
    { type: "list", items: [
      [{ text: "XLSX a CSV ", bold: true }, { text: "exporta hojas como texto." }],
      [{ text: "XLSX a JSON ", bold: true }, { text: "genera objetos para apps." }],
      [{ text: "CSV a SQL ", bold: true }, { text: "genera sentencias INSERT válidas." }],
    ]},
  ],
};

const spreadsheetConversionGuide: GuideDefinition = {
  slug: "spreadsheet-conversion-guide",
  content: { en, tr, de, es },
};

export default spreadsheetConversionGuide;