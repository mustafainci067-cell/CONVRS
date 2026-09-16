import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Developer Tools in the Browser: JSON, SQL, HTML, Hash and JWT Utilities",
    eyebrow: "Developer",
    description:
      "A guide to browser-based developer utilities — JSON formatting and conversion, SQL formatting, HTML encoding, hash generation, JWT decoding and Base64 tools that run without server uploads.",
    excerpt:
      "Format JSON, decode JWTs, generate hashes and encode HTML — all running privately in your browser.",
    readingTime: "8 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Developers constantly work with data formats: JSON payloads from APIs, SQL queries that need formatting, HTML entities that need encoding, JWT tokens that need inspection, and hashes that need generation. Traditionally, developers paste sensitive data into online tools without thinking twice — but API keys, authentication tokens and database queries contain exactly the kind of information that should never leave your machine. Browser-based developer tools solve this by running everything locally."] },

    { type: "h2", content: ["JSON tools: format, convert and validate"] },
    { type: "p", content: ["JSON (JavaScript Object Notation) is the de facto data exchange format for web APIs. Working with JSON effectively requires several utilities:"] },
    { type: "list", items: [
      [{ text: "JSON formatter / beautifier: ", bold: true }, { text: "Takes minified or messy JSON and reformats it with proper indentation and line breaks, making it human-readable. Essential for debugging API responses." }],
      [{ text: "JSON to YAML: ", bold: true }, { text: "Converts JSON to YAML format, which is more readable for configuration files (Docker Compose, Kubernetes, CI/CD pipelines)." }],
      [{ text: "JSON to CSV: ", bold: true }, { text: "Flattens JSON arrays into tabular CSV format for import into spreadsheets, databases, or data analysis tools." }],
      [{ text: "YAML to JSON: ", bold: true }, { text: "Converts YAML configuration files to JSON for programmatic processing." }],
    ]},
    { type: "p", content: ["When you paste a JSON payload into an online formatter, you may be pasting API credentials, user data, or internal system configurations. A browser-based formatter processes everything locally — your data never leaves your tab."] },

    { type: "h2", content: ["SQL formatting and CSV-to-SQL conversion"] },
    { type: "p", content: ["SQL (Structured Query Language) is how developers talk to databases. Common operations include:"] },
    { type: "list", items: [
      [{ text: "SQL formatter: ", bold: true }, { text: "Takes dense, minified SQL queries and formats them with proper indentation, line breaks and keyword highlighting for readability." }],
      [{ text: "CSV to SQL: ", bold: true }, { text: "Converts CSV data into SQL INSERT statements — essential for database migrations, data imports, and seed scripts." }],
      [{ text: "JSON to SQL: ", bold: true }, { text: "Converts JSON data structures into SQL statements for direct database insertion." }],
    ]},
    { type: "note", tone: "warning", title: "Security note", content: ["SQL queries often contain table names, column names, and data values that reveal your database schema. Never paste production queries into online tools — use a browser-based alternative that processes data locally."] },

    { type: "h2", content: ["HTML encoding and decoding"] },
    { type: "p", content: ["HTML encoding converts special characters to their entity equivalents (e.g., < becomes &lt;) to prevent injection attacks and rendering issues. Developers need this when:"] },
    { type: "list", items: [
      ["Embedding user-generated content in HTML pages safely."],
      ["Debugging escaped content in email templates."],
      ["Preparing content for RSS feeds or XML documents."],
      ["Testing XSS (cross-site scripting) prevention measures."],
    ]},

    { type: "h2", content: ["Hash generation: MD5, SHA-256 and beyond"] },
    { type: "p", content: ["Cryptographic hashes are fingerprints of data — any change to the input produces a completely different hash. They are used for:"] },
    { type: "list", items: [
      [{ text: "File integrity verification: ", bold: true }, { text: "Comparing a hash of a downloaded file against the publisher's published hash to verify it was not tampered with." }],
      [{ text: "Password hashing: ", bold: true }, { text: "Generating secure hashes of passwords (with proper salting) for storage." }],
      [{ text: "Data deduplication: ", bold: true }, { text: "Using hashes to identify duplicate files or records." }],
      [{ text: "Digital signatures: ", bold: true }, { text: "Creating fixed-length representations of data for signing and verification." }],
    ]},
    { type: "p", content: ["Browser-based hash tools compute hashes entirely in JavaScript or WebAssembly — no data is sent anywhere. This is particularly important when hashing sensitive content like passwords or proprietary data."] },

    { type: "h2", content: ["JWT decoding and inspection"] },
    { type: "p", content: ["JWT (JSON Web Token) is the standard authentication format used by most modern web applications. A JWT consists of three parts: header, payload and signature. Decoding a JWT reveals its claims — user ID, roles, expiration time — without verifying the signature. This is essential for debugging authentication flows, inspecting tokens from browser devtools, and understanding API authorization. A browser-based decoder processes the token entirely locally, which matters because tokens contain authentication data that should never be exposed to third parties."] },

    { type: "h2", content: ["Base64 encoding and decoding"] },
    { type: "p", content: ["Base64 encodes binary data as ASCII text — used for embedding images in CSS, transmitting binary data over text-based protocols, and encoding credentials in HTTP headers. While Base64 is not encryption (it is trivially reversible), encoding and decoding locally prevents unnecessary exposure of the underlying data."] },

    { type: "h2", content: ["Using developer tools with Convrs"] },
    { type: "p", content: ["Convrs provides a complete set of developer utilities:"] },
    { type: "list", items: [
      ["JSON formatter, JSON-to-YAML, JSON-to-CSV and reverse conversions."],
      ["SQL formatter and CSV-to-SQL generator."],
      ["HTML encode/decode for special characters and entities."],
      ["Hash generator supporting MD5, SHA-1, SHA-256 and more."],
      ["JWT decoder for inspecting token payloads."],
      ["Base64 encoder and decoder for binary-to-text conversion."],
    ]},
    { type: "p", content: ["All tools run in your browser. Your API keys, tokens, database queries and sensitive data never leave your device. No accounts, no uploads, no server-side processing."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Tarayıcıdaki Geliştirici Araçları: JSON, SQL, HTML, Hash ve JWT",
    eyebrow: "Geliştirici",
    description:
      "Tarayıcı tabanlı geliştirici yardımcılarına bir rehber — JSON biçimlendirme ve dönüştürme, SQL biçimlendirme, HTML kodlama, hash oluşturma, JWT çözme ve sunucu yüklemesi olmadan çalışan Base64 araçları.",
    excerpt:
      "JSON biçimlendirin, JWT çözün, hash oluşturun ve HTML kodlayın — hepsi tarayıcınızda özel olarak çalışır.",
    readingTime: "8 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Geliştiriciler sürekli veri biçimleriyle çalışır: API'lerden gelen JSON yükleri, biçimlendirme gerektiren SQL sorguları, kodlama gerektiren HTML varlıkları, incelenmesi gereken JWT token'ları ve oluşturulması gereken hash değerleri. Geleneksel olarak geliştiriciler hassas verileri düşünmeden çevrimiçi araçlara yapıştırır — ancak API anahtarları, kimlik doğrulama token'ları ve veritabanı sorguları, makinenizden asla çıkmaması gereken türden bilgiler içerir. Tarayıcı tabanlı geliştirici araçları her şeyi yerel olarak çalıştırarak bu sorunu çözer."] },

    { type: "h2", content: ["JSON araçları: biçimlendir, dönüştür ve doğrula"] },
    { type: "p", content: ["JSON (JavaScript Object Notation), web API'lerin fiili veri değişim biçimidir. JSON ile verimli çalışmak için birkaç yardımcı gerekir:"] },
    { type: "list", items: [
      [{ text: "JSON biçimlendirici / güzelleştirici: ", bold: true }, { text: "Küçültülmüş veya dağınık JSON'u uygun girinti ve satır sonlarıyla yeniden biçimlendirerek insan tarafından okunabilir hale getirir. API yanıtlarında hata ayıklamak için olmazsa olmazdır." }],
      [{ text: "JSON'dan YAML'a: ", bold: true }, { text: "JSON'u, yapılandırma dosyaları için daha okunabilir olan YAML biçimine dönüştürür (Docker Compose, Kubernetes, CI/CD boru hatları)." }],
      [{ text: "JSON'dan CSV'ye: ", bold: true }, { text: "JSON dizilerini elektronik tablolara, veritabanlarına veya veri analizi araçlarına içe aktarmak için tablosal CSV biçimine düzleştirir." }],
      [{ text: "YAML'dan JSON'a: ", bold: true }, { text: "YAML yapılandırma dosyalarını programatik işleme için JSON'a dönüştürür." }],
    ]},
    { type: "p", content: ["Bir JSON yükünü çevrimiçi bir biçimlendiriciye yapıştırdığınızda, API kimlik bilgileri, kullanıcı verileri veya dahili sistem yapılandırmalarını yapıştırıyor olabilirsiniz. Tarayıcı tabanlı bir biçimlendirici her şeyi yerel olarak işler — veriniz sekmenizden asla çıkmaz."] },

    { type: "h2", content: ["SQL biçimlendirme ve CSV'den SQL'e dönüştürme"] },
    { type: "p", content: ["SQL (Structured Query Language), geliştiricilerin veritabanlarıyla konuşma şeklidir. Yaygın işlemler şunları içerir:"] },
    { type: "list", items: [
      [{ text: "SQL biçimlendirici: ", bold: true }, { text: "Yoğun, küçültülmüş SQL sorgularını okunabilirlik için uygun girinti, satır sonları ve anahtar kelime vurgusuyla biçimlendirir." }],
      [{ text: "CSV'den SQL'e: ", bold: true }, { text: "CSV verilerini SQL INSERT ifadelerine dönüştürür — veritabanı geçişleri, veri içe aktarmaları ve seed betikleri için gereklidir." }],
      [{ text: "JSON'dan SQL'e: ", bold: true }, { text: "JSON veri yapılarını doğrudan veritabanı eklemesi için SQL ifadelerine dönüştürür." }],
    ]},
    { type: "note", tone: "warning", title: "Güvenlik notu", content: ["SQL sorguları genellikle veritabanı şemanızı açığa çıkaran tablo adları, sütun adları ve veri değerleri içerir. Üretim sorgularını asla çevrimiçi araçlara yapıştırmayın — verileri yerel olarak işleyen tarayıcı tabanlı bir alternatif kullanın."] },

    { type: "h2", content: ["HTML kodlama ve kod çözme"] },
    { type: "p", content: ["HTML kodlama, özel karakterleri varlık karşılıklarına dönüştürür (ör. < &lt; olur) — enjeksiyon saldırılarını ve işleme sorunlarını önlemek için. Geliştiricilerin buna ihtiyacı şu durumlarda olur:"] },
    { type: "list", items: [
      ["Kullanıcı tarafından üretilen içeriği HTML sayfalarına güvenli şekilde gömmek."],
      ["E-posta şablonlarındaki kaçırılmış içeriği hata ayıklamak."],
      ["RSS akışları veya XML belgeleri için içerik hazırlamak."],
      ["XSS (siteler arası betik) önleme önlemlerini test etmek."],
    ]},

    { type: "h2", content: ["Hash üretimi: MD5, SHA-256 ve ötesi"] },
    { type: "p", content: ["Kriptografik hash'ler verinin parmak izleridir — girdideki herhangi bir değişiklik tamamen farklı bir hash üretir. Şunlar için kullanılırlar:"] },
    { type: "list", items: [
      [{ text: "Dosya bütünlüğü doğrulaması: ", bold: true }, { text: "İndirilen bir dosyanın hash'ini yayıncının yayınladığı hash ile karşılaştırarak kurcalanmadığını doğrulamak." }],
      [{ text: "Parola hash'leme: ", bold: true }, { text: "Depolama için parolaların (uygun tuzlama ile) güvenli hash'lerini üretmek." }],
      [{ text: "Veri yinelemesini kaldırma: ", bold: true }, { text: "Yinelenen dosyaları veya kayıtları tanımlamak için hash kullanmak." }],
      [{ text: "Dijital imzalar: ", bold: true }, { text: "İmzalama ve doğrulama için verinin sabit uzunluklu temsillerini oluşturmak." }],
    ]},
    { type: "p", content: ["Tarayıcı tabanlı hash araçları, hash'leri tamamen JavaScript veya WebAssembly ile hesaplar — hiçbir veri bir yere gönderilmez. Bu, parolalar veya özel veriler gibi hassas içerikleri hash'lerken özellikle önemlidir."] },

    { type: "h2", content: ["JWT çözme ve inceleme"] },
    { type: "p", content: ["JWT (JSON Web Token), çoğu modern web uygulamasının kullandığı standart kimlik doğrulama biçimidir. Bir JWT üç bölümden oluşur: üst bilgi, yük ve imza. JWT'yi çözmek, imzayı doğrulamadan iddialarını ortaya çıkarır — kullanıcı kimliği, roller, sona erme süresi. Bu; kimlik doğrulama akışlarında hata ayıklamak, tarayıcı geliştirici araçlarındaki token'ları incelemek ve API yetkilendirmesini anlamak için gereklidir. Tarayıcı tabanlı bir çözücü, token'ı tamamen yerel olarak işler — token'lar üçüncü taraflara asla ifşa edilmemesi gereken kimlik doğrulama verileri içerdiğinden bu önemlidir."] },

    { type: "h2", content: ["Base64 kodlama ve kod çözme"] },
    { type: "p", content: ["Base64, ikili verileri ASCII metin olarak kodlar — CSS'te görseller gömmek, ikili verileri metin tabanlı protokoller üzerinden iletmek ve kimlik bilgilerini HTTP başlıklarında kodlamak için kullanılır. Base64 şifreleme olmasa da (kolayca geri çevrilebilir), kodlama ve kod çözme işlemini yerel yapmak, temel verinin gereksiz şekilde ifşa olmasını önler."] },

    { type: "h2", content: ["Convrs ile geliştirici araçlarını kullanma"] },
    { type: "p", content: ["Convrs eksiksiz bir geliştirici yardımcıları seti sunar:"] },
    { type: "list", items: [
      ["JSON biçimlendirici, JSON'dan YAML'a, JSON'dan CSV'ye ve ters dönüşümler."],
      ["SQL biçimlendirici ve CSV'den SQL'e üretici."],
      ["Özel karakterler ve varlıklar için HTML kodlama/kod çözme."],
      ["MD5, SHA-1, SHA-256 ve daha fazlasını destekleyen hash üretici."],
      ["Token yüklerini incelemek için JWT çözücü."],
      ["İkili metin dönüştürme için Base64 kodlayıcı ve kod çözücü."],
    ]},
    { type: "p", content: ["Tüm araçlar tarayıcınızda çalışır. API anahtarlarınız, token'larınız, veritabanı sorgularınız ve hassas verileriniz cihazınızdan asla çıkmaz. Hesap yok, yükleme yok, sunucu tarafı işleme yok."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Entwicklertools im Browser: JSON, SQL, HTML, Hash- und JWT-Dienstprogramme",
    eyebrow: "Entwickler",
    description:
      "Ein Leitfaden zu browserbasierten Entwicklerdienstprogrammen — JSON-Formatierung und -Konvertierung, SQL-Formatierung, HTML-Kodierung, Hash-Generierung, JWT-Decodierung und Base64-Werkzeuge ohne Server-Upload.",
    excerpt:
      "JSON formatieren, JWTs decodieren, Hashes generieren und HTML kodieren — alles privat in Ihrem Browser.",
    readingTime: "8 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Entwickler arbeiten ständig mit Datenformaten: JSON-Payloads von APIs, SQL-Abfragen, die Formatierung benötigen, HTML-Entitäten, die kodiert werden müssen, JWT-Tokens, die inspiziert werden müssen, und Hashes, die generiert werden müssen. Traditionell fügen Entwickler sensible Daten ohne Zögern in Online-Tools ein — aber API-Schlüssel, Authentifizierungstokens und Datenbankabfragen enthalten genau die Art von Informationen, die Ihr Gerät nie verlassen sollte. Browserbasierte Entwicklertools lösen dies, indem sie alles lokal ausführen."] },

    { type: "h2", content: ["JSON-Werkzeuge: formatieren, konvertieren und validieren"] },
    { type: "p", content: ["JSON (JavaScript Object Notation) ist das De-facto-Datenformat für Web-APIs. Effektives Arbeiten mit JSON erfordert mehrere Dienstprogramme:"] },
    { type: "list", items: [
      [{ text: "JSON-Formatter / Beautifier: ", bold: true }, { text: "Nimmt komprimiertes oder unordentliches JSON und formatiert es mit ordentlicher Einrückung und Zeilenumbrüchen, sodass es lesbar wird. Beim Debuggen von API-Antworten unerlässlich." }],
      [{ text: "JSON zu YAML: ", bold: true }, { text: "Konvertiert JSON in YAML — lesbarer für Konfigurationsdateien (Docker Compose, Kubernetes, CI/CD-Pipelines)." }],
      [{ text: "JSON zu CSV: ", bold: true }, { text: "Flacht JSON-Arrays zu tabellarischem CSV ab — für Import in Tabellenkalkulationen, Datenbanken oder Analysetools." }],
      [{ text: "YAML zu JSON: ", bold: true }, { text: "Konvertiert YAML-Konfigurationsdateien zur programmatischen Verarbeitung in JSON." }],
    ]},
    { type: "p", content: ["Wenn Sie einen JSON-Payload in einen Online-Formatter einfügen, fügen Sie möglicherweise API-Anmeldedaten, Benutzerdaten oder interne Systemkonfigurationen ein. Ein browserbasierter Formatter verarbeitet alles lokal — Ihre Daten verlassen nie Ihren Tab."] },

    { type: "h2", content: ["SQL-Formatierung und CSV-zu-SQL-Konvertierung"] },
    { type: "p", content: ["SQL (Structured Query Language) ist die Art, wie Entwickler mit Datenbanken sprechen. Häufige Operationen sind:"] },
    { type: "list", items: [
      [{ text: "SQL-Formatter: ", bold: true }, { text: "Formatiert dichte, komprimierte SQL-Abfragen mit ordentlicher Einrückung, Zeilenumbrüchen und Schlüsselwort-Hervorhebung für die Lesbarkeit." }],
      [{ text: "CSV zu SQL: ", bold: true }, { text: "Konvertiert CSV-Daten in SQL-INSERT-Anweisungen — unerlässlich für Datenbankmigrationen, Datenimporte und Seed-Skripte." }],
      [{ text: "JSON zu SQL: ", bold: true }, { text: "Konvertiert JSON-Datenstrukturen in SQL-Anweisungen für direkte Datenbankeinfügung." }],
    ]},
    { type: "note", tone: "warning", title: "Sicherheitshinweis", content: ["SQL-Abfragen enthalten oft Tabellen- und Spaltennamen, die Ihr Datenbankschema offenlegen. Fügen Sie Produktionsabfragen niemals in Online-Tools ein — verwenden Sie eine browserbasierte Alternative, die Daten lokal verarbeitet."] },

    { type: "h2", content: ["HTML-Kodierung und -Dekodierung"] },
    { type: "p", content: ["HTML-Kodierung wandelt Sonderzeichen in ihre Entitätsäquivalente um (z. B. < wird zu &lt;), um Injection-Angriffe und Rendering-Probleme zu verhindern. Entwickler brauchen dies, wenn sie:"] },
    { type: "list", items: [
      ["Benutzergenerierte Inhalte sicher in HTML-Seiten einbetten."],
      ["Maskierten Inhalt in E-Mail-Vorlagen debuggen."],
      ["Inhalte für RSS-Feeds oder XML-Dokumente vorbereiten."],
      ["XSS-Präventionsmaßnahmen (Cross-Site-Scripting) testen."],
    ]},

    { type: "h2", content: ["Hash-Generierung: MD5, SHA-256 und mehr"] },
    { type: "p", content: ["Kryptografische Hashes sind Fingerabdrücke von Daten — jede Änderung der Eingabe erzeugt einen völlig anderen Hash. Sie werden verwendet für:"] },
    { type: "list", items: [
      [{ text: "Dateiintegritätsprüfung: ", bold: true }, { text: "Den Hash einer heruntergeladenen Datei mit dem veröffentlichten Hash des Herausgebers vergleichen, um Manipulation auszuschließen." }],
      [{ text: "Passwort-Hashing: ", bold: true }, { text: "Sichere Hashes von Passwörtern (mit ordentlicher Saltung) für die Speicherung erzeugen." }],
      [{ text: "Daten-Deduplizierung: ", bold: true }, { text: "Hashes verwenden, um doppelte Dateien oder Datensätze zu erkennen." }],
      [{ text: "Digitale Signaturen: ", bold: true }, { text: "Festlängen-Darstellungen von Daten zum Signieren und Verifizieren erzeugen." }],
    ]},
    { type: "p", content: ["Browserbasierte Hash-Werkzeuge berechnen Hashes vollständig in JavaScript oder WebAssembly — keine Daten werden irgendwohin gesendet. Das ist besonders wichtig beim Hashen sensibler Inhalte wie Passwörtern oder proprietären Daten."] },

    { type: "h2", content: ["JWT-Decodierung und -Inspektion"] },
    { type: "p", content: ["JWT (JSON Web Token) ist das Standard-Authentifizierungsformat der meisten modernen Web-Apps. Ein JWT besteht aus drei Teilen: Header, Payload und Signatur. Das Decodieren offenbart die Claims — Benutzer-ID, Rollen, Ablaufzeit — ohne die Signatur zu verifizieren. Das ist wichtig zum Debuggen von Authentifizierungsabläufen, zum Inspizieren von Tokens aus den Browser-Devtools und zum Verständnis der API-Autorisierung. Ein browserbasierter Decoder verarbeitet das Token vollständig lokal — wichtig, weil Tokens Authentifizierungsdaten enthalten, die niemals Dritten ausgesetzt werden sollten."] },

    { type: "h2", content: ["Base64-Kodierung und -Dekodierung"] },
    { type: "p", content: ["Base64 kodiert Binärdaten als ASCII-Text — verwendet zum Einbetten von Bildern in CSS, Übertragen von Binärdaten über textbasierte Protokolle und Kodieren von Anmeldedaten in HTTP-Headern. Obwohl Base64 keine Verschlüsselung ist (es ist trivial umkehrbar), verhindert lokales Kodieren und Dekodieren unnötige Offenlegung der zugrunde liegenden Daten."] },

    { type: "h2", content: ["Entwicklertools mit Convrs verwenden"] },
    { type: "p", content: ["Convrs bietet eine vollständige Reihe von Entwickler-Dienstprogrammen:"] },
    { type: "list", items: [
      ["JSON-Formatter, JSON-zu-YAML, JSON-zu-CSV und umgekehrte Konvertierungen."],
      ["SQL-Formatter und CSV-zu-SQL-Generator."],
      ["HTML-Kodierung/Dekodierung für Sonderzeichen und Entitäten."],
      ["Hash-Generator mit Unterstützung für MD5, SHA-1, SHA-256 und mehr."],
      ["JWT-Decoder zum Inspizieren von Token-Payloads."],
      ["Base64-Encoder und -Decoder für Binär-zu-Text-Konvertierung."],
    ]},
    { type: "p", content: ["Alle Werkzeuge laufen in Ihrem Browser. Ihre API-Schlüssel, Tokens, Datenbankabfragen und sensiblen Daten verlassen nie Ihr Gerät. Keine Konten, keine Uploads, keine serverseitige Verarbeitung."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Herramientas de desarrollo en el navegador: JSON, SQL, HTML, hash y JWT",
    eyebrow: "Desarrollador",
    description:
      "Una guía de utilidades de desarrollo basadas en el navegador: formato y conversión de JSON, formato de SQL, codificación HTML, generación de hash, decodificación JWT y herramientas Base64 sin subida a servidor.",
    excerpt:
      "Formatee JSON, decodifique JWT, genere hashes y codifique HTML — todo ejecutándose de forma privada en su navegador.",
    readingTime: "8 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Los desarrolladores trabajan constantemente con formatos de datos: payloads JSON de APIs, consultas SQL que necesitan formato, entidades HTML que necesitan codificación, tokens JWT que necesitan inspección y hashes que necesitan generación. Tradicionalmente, los desarrolladores pegan datos sensibles en herramientas en línea sin pensarlo dos veces — pero las claves de API, los tokens de autenticación y las consultas de base de datos contienen exactamente el tipo de información que nunca debería salir de su máquina. Las herramientas de desarrollo del navegador lo resuelven ejecutando todo localmente."] },

    { type: "h2", content: ["Herramientas JSON: formatear, convertir y validar"] },
    { type: "p", content: ["JSON (JavaScript Object Notation) es el formato de intercambio de datos de facto para las APIs web. Trabajar eficazmente con JSON requiere varias utilidades:"] },
    { type: "list", items: [
      [{ text: "Formateador / embellecedor JSON: ", bold: true }, { text: "Toma JSON minificado o desordenado y lo reformatea con sangría y saltos de línea adecuados, haciéndolo legible. Esencial para depurar respuestas de API." }],
      [{ text: "JSON a YAML: ", bold: true }, { text: "Convierte JSON a YAML, más legible para archivos de configuración (Docker Compose, Kubernetes, pipelines CI/CD)." }],
      [{ text: "JSON a CSV: ", bold: true }, { text: "Aplana arrays JSON a CSV tabular para importarlos en hojas de cálculo, bases de datos o herramientas de análisis." }],
      [{ text: "YAML a JSON: ", bold: true }, { text: "Convierte archivos de configuración YAML a JSON para procesamiento programático." }],
    ]},
    { type: "p", content: ["Al pegar un payload JSON en un formateador en línea, puede estar pegando credenciales de API, datos de usuarios o configuraciones internas del sistema. Un formateador basado en el navegador procesa todo localmente — sus datos nunca salen de su pestaña."] },

    { type: "h2", content: ["Formato SQL y conversión CSV a SQL"] },
    { type: "p", content: ["SQL (Structured Query Language) es cómo los desarrolladores hablan con las bases de datos. Las operaciones comunes incluyen:"] },
    { type: "list", items: [
      [{ text: "Formateador SQL: ", bold: true }, { text: "Toma consultas densas y minificadas y las formatea con sangría, saltos de línea y resaltado de palabras clave adecuados para la legibilidad." }],
      [{ text: "CSV a SQL: ", bold: true }, { text: "Convierte datos CSV en sentencias SQL INSERT — esencial para migraciones de base de datos, importaciones de datos y scripts semilla." }],
      [{ text: "JSON a SQL: ", bold: true }, { text: "Convierte estructuras de datos JSON en sentencias SQL para inserción directa." }],
    ]},
    { type: "note", tone: "warning", title: "Nota de seguridad", content: ["Las consultas SQL suelen contener nombres de tablas, columnas y valores que revelan su esquema de base de datos. Nunca pegue consultas de producción en herramientas en línea — use una alternativa basada en el navegador que procese los datos localmente."] },

    { type: "h2", content: ["Codificación y decodificación HTML"] },
    { type: "p", content: ["La codificación HTML convierte caracteres especiales a sus equivalentes de entidad (p. ej., < se convierte en &lt;) para prevenir ataques de inyección y problemas de renderizado. Los desarrolladores la necesitan cuando:"] },
    { type: "list", items: [
      ["Incrustan contenido generado por usuarios en páginas HTML de forma segura."],
      ["Depuran contenido escapado en plantillas de correo."],
      ["Preparan contenido para feeds RSS o documentos XML."],
      ["Prueban medidas de prevención XSS (cross-site scripting)."],
    ]},

    { type: "h2", content: ["Generación de hash: MD5, SHA-256 y más"] },
    { type: "p", content: ["Los hashes criptográficos son huellas dactilares de los datos — cualquier cambio en la entrada produce un hash completamente diferente. Se utilizan para:"] },
    { type: "list", items: [
      [{ text: "Verificación de integridad de archivos: ", bold: true }, { text: "Comparar el hash de un archivo descargado con el publicado por el editor para verificar que no fue manipulado." }],
      [{ text: "Hash de contraseñas: ", bold: true }, { text: "Generar hashes seguros de contraseñas (con salt adecuado) para almacenamiento." }],
      [{ text: "Deduplicación de datos: ", bold: true }, { text: "Usar hashes para identificar archivos o registros duplicados." }],
      [{ text: "Firmas digitales: ", bold: true }, { text: "Crear representaciones de longitud fija de los datos para firmar y verificar." }],
    ]},
    { type: "p", content: ["Las herramientas de hash del navegador calculan los hashes enteramente en JavaScript o WebAssembly — ningún dato se envía a ninguna parte. Esto es particularmente importante al hashear contenido sensible como contraseñas o datos propietarios."] },

    { type: "h2", content: ["Decodificación e inspección JWT"] },
    { type: "p", content: ["JWT (JSON Web Token) es el formato de autenticación estándar usado por la mayoría de las aplicaciones web modernas. Un JWT consta de tres partes: cabecera, carga útil y firma. Decodificar un JWT revela sus claims — ID de usuario, roles, tiempo de expiración — sin verificar la firma. Esto es esencial para depurar flujos de autenticación, inspeccionar tokens de las devtools del navegador y entender la autorización de la API. Un decodificador basado en el navegador procesa el token enteramente en local, algo que importa porque los tokens contienen datos de autenticación que nunca deberían exponerse a terceros."] },

    { type: "h2", content: ["Codificación y decodificación Base64"] },
    { type: "p", content: ["Base64 codifica datos binarios como texto ASCII — usado para incrustar imágenes en CSS, transmitir datos binarios sobre protocolos basados en texto y codificar credenciales en cabeceras HTTP. Aunque Base64 no es cifrado (es trivialmente reversible), codificar y decodificar localmente evita la exposición innecesaria de los datos subyacentes."] },

    { type: "h2", content: ["Usar herramientas de desarrollo con Convrs"] },
    { type: "p", content: ["Convrs ofrece un conjunto completo de utilidades de desarrollo:"] },
    { type: "list", items: [
      ["Formateador JSON, JSON a YAML, JSON a CSV y conversiones inversas."],
      ["Formateador SQL y generador CSV a SQL."],
      ["Codificación/decodificación HTML para caracteres especiales y entidades."],
      ["Generador de hash con soporte para MD5, SHA-1, SHA-256 y más."],
      ["Decodificador JWT para inspeccionar payloads de tokens."],
      ["Codificador y decodificador Base64 para conversión binario a texto."],
    ]},
    { type: "p", content: ["Todas las herramientas se ejecutan en su navegador. Sus claves de API, tokens, consultas de base de datos y datos sensibles nunca salen de su dispositivo. Sin cuentas, sin subidas, sin procesamiento en el servidor."] },
  ],
};

const developerToolsGuide: GuideDefinition = {
  slug: "developer-tools-guide",
  content: { en, tr, de, es },
};

export default developerToolsGuide;
