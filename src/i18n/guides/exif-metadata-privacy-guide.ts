import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "EXIF Data and Location Tracking: Why You Should Strip Image Metadata",
    eyebrow: "Image",
    description:
      "Every photo taken on a phone quietly records camera settings, the exact time, and often the GPS location it was shot. Learn what EXIF data is, how it leaks, and how to clean it from your images in seconds.",
    excerpt:
      "Your photos silently carry GPS coordinates and camera details. Learn what EXIF is and how to strip it.",
    readingTime: "6 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["When you take a photo with a phone or modern camera, the device records far more than the pixels. Alongside the image it writes a block of metadata called EXIF — Exchangeable Image File Format — containing the camera model, lens, exposure settings, the precise capture time, and, with location services enabled, the GPS coordinates of where the shot was taken. That metadata travels with the file wherever it goes."] },

    { type: "h2", content: ["What EXIF actually contains"] },
    { type: "table", columns: ["Category", "Common fields", "How sensitive"], rows: [
      ["Device", "Camera make and model, lens, software", "Identifies your equipment"],
      ["Settings", "Exposure, aperture, ISO, white balance", "Mostly harmless"],
      ["Time", "Precise capture timestamp", "Reveals when taken"],
      ["Location", "GPS latitude/longitude, altitude", "Reveals where taken"],
      ["Copyright", "Author name, contact info", "Identity exposure"],
    ]},
    { type: "p", content: ["Reading the table's last two rows helps explain why metadata matters: a photo of your home, shared publicly with GPS intact, publishes your home's coordinates to anyone who inspects the file. Photos posted to auction sites, social feeds or cloud shares routinely leak this data."] },

    { type: "h2", content: ["How EXIF leaks"] },
    { type: "list", items: [
      ["Posting images directly to a forum, classified ad, or social platform that does not strip metadata."],
      ["Sending original photos to someone through email or messaging as attachments."],
      ["Publishing product photos or design mockups that include EXIF from your in-house camera."],
      ["Uploading images to websites or forms that store the original file unchanged."],
    ]},
    { type: "note", tone: "warning", title: "The resizing myth", content: [
      "Many people assume cropping or resizing removes EXIF. It often does not — many operations copy the metadata block untouched. Only deliberate stripping guarantees it is gone."
    ]},

    { type: "h2", content: ["When you may want to keep EXIF"] },
    { type: "p", content: ["EXIF is not always a liability. Photographers use it to revisit settings, document their workflow, and prove authorship. Archiving original files with metadata intact is good practice — the risk comes from sharing. The safe pattern: keep the original with EXIF in private storage, strip metadata before publishing any version."] },

    { type: "h2", content: ["Cleaning EXIF in your browser"] },
    { type: "p", content: ["An EXIF cleaner removes the metadata block and re-saves the image cleanly. Doing this locally in your browser is the roundest approach, because stripping is itself a privacy matter — a web tool that asks you to upload a photo carries its own risks (the file you meant to sanitize is exactly the file a cloud server would store). With a local cleaner your image is read, processed, and output entirely on your device."] },
    { type: "p", content: ["Convrs offers an EXIF cleaner that works entirely offline in the browser. You drop in an image, the metadata is removed, and you download a clean copy — no upload, no account, nothing stored."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "EXIF Verileri ve Konum Takibi: Görsel Metadata'sını Neden Silmelisiniz?",
    eyebrow: "Görsel",
    description:
      "Telefonla çektiğiniz her fotoğraf; kamera ayarlarını, tam çekim saatini ve çoğu zaman GPS konumunu sessizce kaydeder. EXIF nedir, nasıl sızar ve saniyeler içinde nasıl temizlenir öğrenin.",
    excerpt:
      "Fotoğraflarınız sessizce GPS koordinatları ve kamera ayrıntıları taşır. EXIF nedir ve nasıl silinir öğrenin.",
    readingTime: "6 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Telefon veya modern bir kamerayla fotoğraf çektiğinizde cihaz, pikselin çok ötesini kaydeder. Görselin yanına EXIF adı verilen bir metadata bloğu yazar: kamera modeli, lens, pozlama ayarları, tam çekim zamanı ve konum servisleri açıksa GPS koordinatları. Bu metadata dosyayla birlikte her yere taşınır."] },

    { type: "h2", content: ["EXIF neler içerir?"] },
    { type: "table", columns: ["Kategori", "Yaygın alanlar", "Hassasiyet"], rows: [
      ["Cihaz", "Kamera marka/model, lens, yazılım", "Ekipmanınızı ortaya çıkarır"],
      ["Ayarlar", "Pozlama, diyafram, ISO", "Çoğunlukla zararsız"],
      ["Zaman", "Tam çekim zamanı", "Ne zaman çekildiğini gösterir"],
      ["Konum", "GPS enlem/boylam, yükseklik", "Nerede çekildiğini gösterir"],
      ["Telif", "Yazar adı, iletişim bilgisi", "Kimlik açığa çıkar"],
    ]},
    { type: "p", content: ["GPS'i açık bir fotoğrafı herkese açık paylaşmak, dosyayı inceleyen herkese evinizin koordinatlarını yayınlamak demektir. Metadatayı temizlemeyen platformlara yüklenen görseller bu veriyi rutin olarak sızdırır."] },

    { type: "h2", content: ["EXIF nasıl sızar?"] },
    { type: "list", items: [
      ["Görselleri metadata temizlemeyen bir forum, ilan veya sosyal platforma yüklemek."],
      ["Orijinal fotoğrafları e-posta veya mesajla ek olarak göndermek."],
      ["Şirket içi kamerayla çekilmiş ürün veya tasarım görsellerini yayınlamak."],
      ["Dosyayı olduğu gibi saklayan sitelere görsel yüklemek."],
    ]},
    { type: "note", tone: "warning", title: "Yeniden boyutlandırma efsanesi", content: [
      "Birçok kişi kırpmanın veya yeniden boyutlandırmanın EXIF'i sildiğini sanır. Çoğu işlem metadata bloğunu aynen kopyalar. Silindiğinden emin olmak istiyorsanız bilinçli temizlik şarttır."
    ]},

    { type: "h2", content: ["Tarayıcınızda EXIF temizliği"] },
    { type: "p", content: ["EXIF temizleyici, metadata bloğunu kaldırıp görseli temiz halde yeniden kaydeder. Bunu yerel yapmak başlı başına bir gizlilik konusudur — çünkü sızdırmak istediğiniz dosyayı buluta yükleyen bir araç, kendi içinde yeni risk taşır. Convrs EXIF temizleyici tamamen tarayıcıda, çevrimdışı çalışır: yükleme yok, hesap yok, hiçbir şey saklanmaz."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "EXIF-Daten und Standortverfolgung: Bild-Metadaten sicher entfernen",
    eyebrow: "Bild",
    description:
      "Jedes Handyfoto speichert Kameraeinstellungen, den Zeitpunkt und oft GPS-Koordinaten. Erfahren Sie, was EXIF ist und wie Sie es in Sekunden entfernen.",
    excerpt:
      "Ihre Fotos tragen stillschweigend GPS-Koordinaten. Was EXIF ist und wie man es entfernt.",
    readingTime: "7 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Beim Fotografieren speichert Ihr Gerät weit mehr als nur Pixel: Kameramodell, Objektiv, Belichtung, genaue Aufnahmezeit und — bei aktiviertem Standort — GPS-Koordinaten. Diese Metadaten (EXIF) reisen mit der Datei überallhin mit."] },
    { type: "h2", content: ["Was EXIF enthält"] },
    { type: "table", columns: ["Kategorie", "Felder", "Sensibilität"], rows: [
      ["Gerät", "Kamera, Objektiv, Software", "Identifiziert Ihre Ausrüstung"],
      ["Zeit", "Genauer Zeitstempel", "Wann aufgenommen"],
      ["Standort", "GPS-Breite/-länge", "Wo aufgenommen"],
      ["Urheber", "Name, Kontakt", "Identitätsrisiko"],
    ]},
    { type: "p", content: ["Ein öffentlich geteiltes Foto mit intaktem GPS veröffentlicht die Koordinaten Ihres Zuhauses für jeden, der die Datei prüft."] },
    { type: "h2", content: ["Wie EXIF leakt"] },
    { type: "list", items: [
      ["Hochladen auf Plattformen, die Metadaten nicht entfernen."],
      ["Originalfotos als E-Mail-Anhang versenden."],
      ["Bilder mit Standortdaten in Anzeigen oder Beiträgen publizieren."],
    ]},
    { type: "note", tone: "warning", title: "Der Resizing-Mythos", content: [
      "Viele vermuten, dass Zuschneiden EXIF entfernt. Oft wird der Metadatenblock unverändert kopiert — nur gezieltes Entfernen garantiert Sicherheit."
    ]},
    { type: "h2", content: ["EXIF im Browser löschen"] },
    { type: "p", content: ["Ein EXIF-Cleaner entfernt die Metadaten und speichert das Bild neu. Lokal im Browser zu arbeiten ist hier besonders sinnvoll: Eine App, die ihr Foto hochlädt, trägt genau das Risiko, das Sie entfernen wollen. Der EXIF-Cleaner von Convrs läuft vollständig offline — kein Upload, kein Konto."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Datos EXIF y rastreo de ubicación: por qué eliminar los metadatos de tus imágenes",
    eyebrow: "Imagen",
    description:
      "Cada foto tomada con un móvil guarda ajustes de cámara, la hora exacta y a menudo las coordenadas GPS. Aprende qué es EXIF y cómo limpiarlo en segundos.",
    excerpt:
      "Tus fotos llevan silenciosamente coordenadas GPS. Aprende qué es EXIF y cómo eliminarlo.",
    readingTime: "6 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Al tomar una foto, tu dispositivo registra mucho más que los píxeles: modelo de cámara, ajustes de exposición, la hora exacta y, con la ubicación activada, las coordenadas GPS. Estos metadatos (EXIF) viajan con el archivo a dondequiera que vaya."] },
    { type: "h2", content: ["Qué contiene EXIF"] },
    { type: "table", columns: ["Categoría", "Campos", "Sensibilidad"], rows: [
      ["Dispositivo", "Cámara, lente, software", "Identifica tu equipo"],
      ["Tiempo", "Marca de tiempo exacta", "Cuándo se tomó"],
      ["Ubicación", "Latitud/longitud GPS", "Dónde se tomó"],
      ["Derechos", "Autor, contacto", "Riesgo de identidad"],
    ]},
    { type: "p", content: ["Una foto compartida públicamente con GPS intacto publica las coordenadas de tu casa a cualquiera que inspeccione el archivo."] },
    { type: "h2", content: ["Cómo se filtra EXIF"] },
    { type: "list", items: [
      ["Subir a plataformas que no eliminan metadatos."],
      ["Enviar fotos originales como archivos adjuntos."],
      ["Publicar imágenes con ubicación en anuncios o publicaciones."],
    ]},
    { type: "note", tone: "warning", title: "El mito del redimensionado", content: [
      "Muchos creen que recortar elimina EXIF. A menudo el bloque se copia intacto: solo la eliminación deliberada garantiza seguridad."
    ]},
    { type: "h2", content: ["Limpiar EXIF en el navegador"] },
    { type: "p", content: ["Un limpiador EXIF elimina los metadatos y re-guarda la imagen. Hacerlo localmente es aquí especialmente sensato: una herramienta que sube el archivo acarrea el mismo riesgo que quieres eliminar. El limpiador EXIF de Convrs funciona offline — sin subidas, sin cuenta."] },
  ],
};

const exifMetadataGuide: GuideDefinition = {
  slug: "exif-metadata-privacy-guide",
  content: { en, tr, de, es },
};

export default exifMetadataGuide;