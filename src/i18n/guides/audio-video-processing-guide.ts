import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Audio and Video Processing in the Browser: Convert, Trim and Compress",
    eyebrow: "Media",
    description:
      "How to convert MP4 to WebM, extract audio from video, trim clips, compress files and resize video — all running locally in your browser without uploading media files to any server.",
    excerpt:
      "From MP4 to WebM, video to MP3 — a guide to private audio and video processing in your browser.",
    readingTime: "9 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Audio and video files are among the largest files people handle daily — and among the most sensitive. Personal recordings, business presentations, creative projects and screen captures all contain content that should not be uploaded to unknown servers. This guide covers the most common media processing tasks and how to perform them entirely in your browser using WebAssembly-powered tools."] },

    { type: "h2", content: ["Why media conversion is a privacy concern"] },
    { type: "p", content: ["When you upload a video to an online converter, several privacy risks emerge:"] },
    { type: "list", items: [
      ["The file may contain identifiable visual or audio content — faces, voices, locations, conversations."],
      ["Metadata often includes device information, creation dates, and sometimes GPS coordinates."],
      ["Large files take longer to upload, extending the window of exposure."],
      ["The converter's retention policy determines how long a copy of your media exists on their infrastructure."],
      ["Some free converters repurpose uploaded content for training data or advertising targeting."],
    ]},
    { type: "p", content: ["Browser-based processing eliminates these risks entirely. FFmpeg — the industry-standard media toolkit — has been compiled to WebAssembly, enabling full media processing capabilities directly in your browser tab."] },

    { type: "h2", content: ["Video format conversion: MP4, WebM and beyond"] },
    { type: "p", content: ["The two dominant web video formats serve different purposes:"] },
    { type: "list", items: [
      [{ text: "MP4 (H.264/H.265): ", bold: true }, { text: "The most universally supported format. Works everywhere — browsers, mobile devices, social media platforms, presentations. H.265 (HEVC) offers better compression but less browser support." }],
      [{ text: "WebM (VP8/VP9/AV1): ", bold: true }, { text: "Google's open format optimized for the web. Smaller file sizes at comparable quality. VP9 and AV1 offer excellent compression but require modern browsers." }],
    ]},
    { type: "p", content: ["Common conversion scenarios:"] },
    { type: "list", items: [
      ["MP4 to WebM: reduce file size for web delivery while maintaining quality."],
      ["WebM to MP4: ensure compatibility with platforms that do not support WebM (some email clients, older devices)."],
      ["H.265 to H.264: convert for maximum compatibility when sharing across platforms."],
    ]},

    { type: "h2", content: ["Audio extraction: video to MP3 and WAV"] },
    { type: "p", content: ["Sometimes you need only the audio from a video file — a podcast segment, a music clip, a voice recording. Audio extraction strips the video track and saves the audio in a standard format:"] },
    { type: "list", items: [
      [{ text: "Video to MP3: ", bold: true }, { text: "Extract audio as compressed MP3 — ideal for podcasts, music clips, and voice recordings where file size matters." }],
      [{ text: "Video to WAV: ", bold: true }, { text: "Extract audio as uncompressed WAV — for situations requiring maximum audio quality, such as professional editing or archival." }],
    ]},

    { type: "h2", content: ["Video trimming and muting"] },
    { type: "p", content: ["Basic video editing tasks that are commonly needed:"] },
    { type: "list", items: [
      [{ text: "Trimming: ", bold: true }, { text: "Cut unwanted sections from the beginning or end of a video. Useful for removing long intros, accidental recordings, or private conversations captured at the start or end of a clip." }],
      [{ text: "Muting: ", bold: true }, { text: "Remove the audio track entirely — needed when sharing video where the audio contains sensitive or irrelevant content." }],
      [{ text: "Speed adjustment: ", bold: true }, { text: "Speed up or slow down video playback — useful for time-lapse creation or slow-motion analysis." }],
    ]},
    { type: "note", tone: "success", title: "Privacy bonus", content: ["Trimming a video in the browser means any private conversations, background noise or identifiable audio captured at the edges of your recording never leaves your device. You control exactly what part of the media is processed."] },

    { type: "h2", content: ["Video compression and resizing"] },
    { type: "p", content: ["Video files are large. Compression and resizing are often necessary for sharing:"] },
    { type: "list", items: [
      [{ text: "Compression: ", bold: true }, { text: "Reduce file size by adjusting bitrate and codec settings. A 100MB video can often be compressed to 20-30MB with minimal visible quality loss." }],
      [{ text: "Resizing: ", bold: true }, { text: "Change video dimensions — for example, downscale 4K to 1080p for web sharing, or crop to a specific aspect ratio for social media." }],
    ]},
    { type: "p", content: ["Both operations are CPU-intensive, which is why WebAssembly is essential. Modern browsers can leverage hardware-accelerated video encoding through WASM, making what was once a server-only task possible on a laptop."] },

    { type: "h2", content: ["How WebAssembly powers media processing"] },
    { type: "p", content: ["The technology behind browser-based media processing is remarkably similar to what servers use:"] },
    { type: "list", items: [
      ["FFmpeg compiled to WebAssembly provides the same codec support as the server version."],
      ["Web Workers run media processing in background threads, keeping the UI responsive."],
      ["SharedArrayBuffer enables efficient memory sharing between the main thread and processing threads."],
      ["Hardware acceleration through the browser's media APIs adds GPU-powered encoding when available."],
    ]},
    { type: "p", content: ["The result is that most common media processing tasks complete in-browser at speeds comparable to desktop applications — while keeping every byte of your media on your own device."] },

    { type: "h2", content: ["Media processing with Convrs"] },
    { type: "p", content: ["Convrs provides a complete media toolkit:"] },
    { type: "list", items: [
      ["MP4 to WebM and WebM to MP4 conversion with quality control."],
      ["Video to MP3 audio extraction."],
      ["Video trimming — cut precisely to the segments you need."],
      ["Video muting — remove audio tracks completely."],
      ["Speed adjustment — slow down or speed up playback."],
      ["Video resizing — change dimensions for different platforms."],
    ]},
    { type: "p", content: ["Every operation runs entirely in your browser via WebAssembly. No media files are uploaded to any server. No accounts are required. No traces remain when you close the tab. Your creative work stays yours."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Tarayıcıda Ses ve Video İşleme: Dönüştür, Kırp ve Sıkıştır",
    eyebrow: "Medya",
    description:
      "MP4'ü WebM'e nasıl dönüştürürsünüz, videodan ses nasıl çıkarılır, klipler nasıl kırpılır, dosyalar nasıl sıkıştırılır ve video nasıl yeniden boyutlandırılır — hepsi medya dosyalarını herhangi bir sunucuya yüklemeden tarayıcınızda yerel olarak çalışır.",
    excerpt:
      "MP4'ten WebM'e, videodan MP3'e — tarayıcınızdaki özel ses ve video işleme rehberi.",
    readingTime: "9 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Ses ve video dosyaları, insanların günlük olarak işlediği en büyük dosyalardan — ve en hassas olanlarından biridir. Kişisel kayıtlar, iş sunumları, yaratıcı projeler ve ekran görüntüleri, bilinmeyen sunuculara yüklenmemesi gereken içerikler barındırır. Bu rehber en yaygın medya işleme görevlerini ve bunların WebAssembly destekli araçlarla tarayıcınızda tamamen nasıl gerçekleştirileceğini inceler."] },

    { type: "h2", content: ["Medya dönüştürme neden bir gizlilik endişesidir"] },
    { type: "p", content: ["Bir videoyu çevrimiçi bir dönüştürücüye yüklediğinizde birkaç gizlilik riski ortaya çıkar:"] },
    { type: "list", items: [
      ["Dosya tanımlayıcı görsel veya ses içeriği barındırabilir — yüzler, sesler, konumlar, konuşmalar."],
      ["Meta veriler cihaz bilgilerini, oluşturma tarihlerini ve bazen GPS koordinatlarını içerir."],
      ["Büyük dosyaların yüklenmesi daha uzun sürer, maruz kalma penceresini uzatır."],
      ["Dönüştürücünün saklama politikası, medyanızın bir kopyasının altyapılarında ne kadar kaldığını belirler."],
      ["Bazı ücretsiz dönüştürücüler yüklenen içerikleri eğitim verisi veya reklam hedeflemesi için kullanır."],
    ]},
    { type: "p", content: ["Tarayıcı tabanlı işleme bu riskleri tamamen ortadan kaldırır. FFmpeg — sektör standardı medya araç seti — WebAssembly'ye derlenmiştir ve tüm medya işleme yeteneklerini doğrudan tarayıcı sekmenizde çalıştırır."] },

    { type: "h2", content: ["Video biçim dönüştürme: MP4, WebM ve ötesi"] },
    { type: "p", content: ["İki baskın web video biçimi farklı amaçlara hizmet eder:"] },
    { type: "list", items: [
      [{ text: "MP4 (H.264/H.265): ", bold: true }, { text: "En evrensel desteklenen biçim. Her yerde çalışır — tarayıcılar, mobil cihazlar, sosyal medya platformları, sunumlar. H.265 (HEVC) daha iyi sıkıştırma sunar ancak tarayıcı desteği daha azdır." }],
      [{ text: "WebM (VP8/VP9/AV1): ", bold: true }, { text: "Web için optimize edilmiş Google'ın açık biçimi. Karşılaştırılabilir kalitede daha küçük dosya boyutları. VP9 ve AV1 mükemmel sıkıştırma sunar ancak modern tarayıcılar gerektirir." }],
    ]},
    { type: "p", content: ["Yaygın dönüştürme senaryoları:"] },
    { type: "list", items: [
      ["MP4'ten WebM'e: web teslimi için kaliteyi korurken dosya boyutunu küçültün."],
      ["WebM'den MP4'e: WebM'i desteklemeyen platformlarla (bazı e-posta istemcileri, eski cihazlar) uyumluluk sağlayın."],
      ["H.265'ten H.264'e: platformlar arasında paylaşırken maksimum uyumluluk için dönüştürün."],
    ]},

    { type: "h2", content: ["Ses çıkarma: videodan MP3 ve WAV"] },
    { type: "p", content: ["Bazen bir video dosyasından yalnızca ses gerekir — bir podcast bölümü, bir müzik klibi, bir ses kaydı. Ses çıkarma, video izini atar ve sesi standart bir biçimde kaydeder:"] },
    { type: "list", items: [
      [{ text: "Videodan MP3: ", bold: true }, { text: "Sesi sıkıştırılmış MP3 olarak çıkarın — dosya boyutunun önemli olduğu podcast, müzik klibi ve ses kayıtları için idealdir." }],
      [{ text: "Videodan WAV: ", bold: true }, { text: "Sesi sıkıştırılmamış WAV olarak çıkarın — profesyonel düzenleme veya arşivleme gibi maksimum ses kalitesi gerektiren durumlar için." }],
    ]},

    { type: "h2", content: ["Video kırpma ve sesini kapatma"] },
    { type: "p", content: ["Sık ihtiyaç duyulan temel video düzenleme görevleri:"] },
    { type: "list", items: [
      [{ text: "Kırpma: ", bold: true }, { text: "Bir videonun başından veya sonundan istenmeyen bölümleri kesin. Uzun girişleri, yanlışlıkla yapılan kayıtları veya klibin başında ya da sonunda yakalanan özel konuşmaları kaldırmak için kullanışlıdır." }],
      [{ text: "Sesini kapatma: ", bold: true }, { text: "Ses izini tamamen kaldırın — sesin hassas veya alakasız içerik barındırdığı videoları paylaşırken gerekir." }],
      [{ text: "Hız ayarı: ", bold: true }, { text: "Video oynatmayı hızlandırın veya yavaşlatın — time-lapse oluşturma veya ağır çekim analizi için kullanışlıdır." }],
    ]},
    { type: "note", tone: "success", title: "Gizlilik bonusu", content: ["Videoyu tarayıcıda kırpmak; kaydınızın kenarlarında yakalanan özel konuşmalar, arka plan gürültüsü veya tanımlanabilir seslerin cihazınızdan asla çıkmaması anlamına gelir. Medyanın tam olarak hangi bölümünün işleneceğini siz kontrol edersiniz."] },

    { type: "h2", content: ["Video sıkıştırma ve yeniden boyutlandırma"] },
    { type: "p", content: ["Video dosyaları büyüktür. Sıkıştırma ve yeniden boyutlandırma paylaşım için genellikle gereklidir:"] },
    { type: "list", items: [
      [{ text: "Sıkıştırma: ", bold: true }, { text: "Bit hızını ve codec ayarlarını düzenleyerek dosya boyutunu azaltın. 100 MB'lık bir video, en az görünür kalite kaybıyla genellikle 20-30 MB'a sıkıştırılabilir." }],
      [{ text: "Yeniden boyutlandırma: ", bold: true }, { text: "Video boyutlarını değiştirin — örneğin web paylaşımı için 4K'dan 1080p'ye küçültün veya sosyal medya için belirli bir en-boy oranına kırpın." }],
    ]},
    { type: "p", content: ["Her iki işlem de CPU yoğundur, bu yüzden WebAssembly şarttır. Modern tarayıcılar, WASM aracılığıyla donanım hızlandırmalı video kodlamasından yararlanarak bir zamanlar yalnızca sunucuda yapılan işi dizüstü bilgisayarda mümkün kılar."] },

    { type: "h2", content: ["WebAssembly medya işlemeyi nasıl güçlendirir"] },
    { type: "p", content: ["Tarayıcı tabanlı medya işlemenin arkasındaki teknoloji, sunucuların kullandığına dikkat çekici şekilde benzer:"] },
    { type: "list", items: [
      ["WebAssembly'ye derlenen FFmpeg, sunucu sürümüyle aynı codec desteğini sağlar."],
      ["Web Workers, medya işlemeyi arka plan iş parçacıklarında çalıştırarak arayüzü duyarlı tutar."],
      ["SharedArrayBuffer, ana iş parçacığı ile işleme iş parçacıkları arasında verimli bellek paylaşımını sağlar."],
      ["Tarayıcının medya API'leri, mevcut olduğunda GPU destekli kodlamaya olanak tanır."],
    ]},
    { type: "p", content: ["Sonuç: çoğu yaygın medya işleme görevi, medyanızın her baytını kendi cihazınızda tutarken masaüstü uygulamalarıyla karşılaştırılabilir hızda tarayıcıda tamamlanır."] },

    { type: "h2", content: ["Convrs ile medya işleme"] },
    { type: "p", content: ["Convrs eksiksiz bir medya araç seti sunar:"] },
    { type: "list", items: [
      ["Kalite kontrolüyle MP4'ten WebM ve WebM'den MP4 dönüştürme."],
      ["Videodan MP3 ses çıkarma."],
      ["Video kırpma — ihtiyacınız olan bölümlere tam olarak kesme."],
      ["Video sesini kapatma — ses izlerini tamamen kaldırma."],
      ["Hız ayarı — oynatmayı yavaşlatma veya hızlandırma."],
      ["Video yeniden boyutlandırma — farklı platformlar için boyut değiştirme."],
    ]},
    { type: "p", content: ["Her işlem WebAssembly aracılığıyla tamamen tarayıcınızda çalışır. Hiçbir medya dosyası herhangi bir sunucuya yüklenmez. Hesap gerekmez. Sekmeyi kapattığınızda hiçbir iz kalmaz. Yaratıcı işiniz sizindir."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Audio- und Videoverarbeitung im Browser: Konvertieren, Zuschneiden und Komprimieren",
    eyebrow: "Medien",
    description:
      "Wie man MP4 in WebM konvertiert, Audio aus Video extrahiert, Clips zuschneidet, Dateien komprimiert und Video skaliert — alles lokal in Ihrem Browser ohne Upload.",
    excerpt:
      "Von MP4 zu WebM, Video zu MP3 — ein Leitfaden zur privaten Audio- und Videoverarbeitung im Browser.",
    readingTime: "9 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Audio- und Videodateien gehören zu den größten Dateien, die Menschen täglich handhaben — und zu den sensibelsten. Persönliche Aufnahmen, Geschäftspräsentationen, kreative Projekte und Bildschirmaufnahmen enthalten Inhalte, die nicht auf unbekannte Server hochgeladen werden sollten. Dieser Leitfaden behandelt die gängigsten Medienaufgaben und wie sie mithilfe von WebAssembly vollständig im Browser ausgeführt werden."] },

    { type: "h2", content: ["Warum Medienkonvertierung ein Datenschutzproblem ist"] },
    { type: "p", content: ["Wenn Sie ein Video in einen Online-Konverter hochladen, entstehen mehrere Datenschutzrisiken:"] },
    { type: "list", items: [
      ["Die Datei kann identifizierbare visuelle oder akustische Inhalte enthalten — Gesichter, Stimmen, Orte, Gespräche."],
      ["Metadaten enthalten oft Geräteinformationen, Erstellungsdaten und manchmal GPS-Koordinaten."],
      ["Große Dateien brauchen länger zum Hochladen und verlängern das Zeitfenster der Offenlegung."],
      ["Die Aufbewahrungsrichtlinie des Konverters bestimmt, wie lange eine Kopie Ihrer Medien auf deren Infrastruktur verbleibt."],
      ["Manche kostenlosen Konverter verwenden hochgeladene Inhalte für Trainingsdaten oder Werbetargeting."],
    ]},
    { type: "p", content: ["Browserbasierte Verarbeitung eliminiert diese Risiken vollständig. FFmpeg — die branchenübliche Medien-Toolbox — wurde zu WebAssembly kompiliert und ermöglicht die volle Medientechnik direkt in Ihrem Browser-Tab."] },

    { type: "h2", content: ["Videoformat-Konvertierung: MP4, WebM und mehr"] },
    { type: "p", content: ["Die beiden dominanten Web-Videoformate dienen unterschiedlichen Zwecken:"] },
    { type: "list", items: [
      [{ text: "MP4 (H.264/H.265): ", bold: true }, { text: "Das universell unterstützte Format. Funktioniert überall — Browser, Mobilgeräte, Social-Media-Plattformen, Präsentationen. H.265 (HEVC) bietet bessere Kompression, aber weniger Browser-Support." }],
      [{ text: "WebM (VP8/VP9/AV1): ", bold: true }, { text: "Googles offenes, für das Web optimiertes Format. Kleinere Dateien bei vergleichbarer Qualität. VP9 und AV1 bieten exzellente Kompression, benötigen aber moderne Browser." }],
    ]},
    { type: "p", content: ["Häufige Konvertierungsszenarien:"] },
    { type: "list", items: [
      ["MP4 zu WebM: Dateigröße für die Web-Auslieferung reduzieren, ohne Qualität einzubüßen."],
      ["WebM zu MP4: Kompatibilität mit Plattformen herstellen, die WebM nicht unterstützen (manche E-Mail-Clients, ältere Geräte)."],
      ["H.265 zu H.264: Für maximale Kompatibilität bei plattformübergreifendem Teilen konvertieren."],
    ]},

    { type: "h2", content: ["Audio-Extraktion: Video zu MP3 und WAV"] },
    { type: "p", content: ["Manchmal benötigen Sie nur den Ton einer Videodatei — ein Podcast-Segment, einen Musikclip, eine Sprachaufnahme. Die Audio-Extraktion entfernt die Videospur und speichert den Ton in einem Standardformat:"] },
    { type: "list", items: [
      [{ text: "Video zu MP3: ", bold: true }, { text: "Ton als komprimiertes MP3 extrahieren — ideal für Podcasts, Musikclips und Sprachaufnahmen, bei denen die Dateigröße zählt." }],
      [{ text: "Video zu WAV: ", bold: true }, { text: "Ton als unkomprimiertes WAV extrahieren — für maximale Audioqualität, etwa bei professioneller Bearbeitung oder Archivierung." }],
    ]},

    { type: "h2", content: ["Videos zuschneiden und stummschalten"] },
    { type: "p", content: ["Häufig benötigte grundlegende Videobearbeitungsaufgaben:"] },
    { type: "list", items: [
      [{ text: "Zuschneiden: ", bold: true }, { text: "Ungewollte Abschnitte am Anfang oder Ende eines Videos entfernen — etwa lange Intros, versehentliche Aufnahmen oder private Gespräche am Rand eines Clips." }],
      [{ text: "Stummschalten: ", bold: true }, { text: "Die Tonspur vollständig entfernen — nötig, wenn ein Video sensible oder irrelevante Audioinhalte enthält." }],
      [{ text: "Geschwindigkeit: ", bold: true }, { text: "Wiedergabe beschleunigen oder verlangsamen — für Zeitraffer oder Zeitlupenanalyse." }],
    ]},
    { type: "note", tone: "success", title: "Datenschutz-Bonus", content: ["Das Zuschneiden im Browser bedeutet, dass private Gespräche, Hintergrundgeräusche oder identifizierbares Audio am Rand Ihrer Aufnahme das Gerät nie verlassen. Sie kontrollieren genau, welcher Teil verarbeitet wird."] },

    { type: "h2", content: ["Video komprimieren und skalieren"] },
    { type: "p", content: ["Videodateien sind groß. Kompression und Skalierung sind zum Teilen oft nötig:"] },
    { type: "list", items: [
      [{ text: "Komprimieren: ", bold: true }, { text: "Dateigröße durch Bitrate und Codec-Einstellungen reduzieren. Eine 100-MB-Datei lässt sich bei minimalem sichtbaren Qualitätsverlust oft auf 20–30 MB verkleinern." }],
      [{ text: "Skalieren: ", bold: true }, { text: "Videoabmessungen ändern — etwa 4K für Web-Sharing auf 1080p verkleinern oder für Social Media auf ein Seitenverhältnis zuschneiden." }],
    ]},
    { type: "p", content: ["Beide Vorgänge sind CPU-intensiv — genau deshalb ist WebAssembly entscheidend. Moderne Browser nutzen durch WASM hardwarebeschleunigte Videokodierung und machen, was einst eine Serveraufgabe war, auf dem Laptop möglich."] },

    { type: "h2", content: ["Wie WebAssembly die Medienverarbeitung antreibt"] },
    { type: "p", content: ["Die Technologie hinter der browserbasierten Medienverarbeitung ähnelt der auf Servern stark:"] },
    { type: "list", items: [
      ["Zu WebAssembly kompiliertes FFmpeg bietet denselben Codec-Support wie die Serverversion."],
      ["Web-Worker führen die Verarbeitung im Hintergrund aus und halten die Oberfläche reaktionsfähig."],
      ["SharedArrayBuffer ermöglicht effiziente Speicherfreigabe zwischen Haupt- und Arbeits-Threads."],
      ["Hardwarebeschleunigung über die Media-APIs des Browsers ergänzt bei Bedarf GPU-gestützte Kodierung."],
    ]},
    { type: "p", content: ["Das Ergebnis: Die meisten Medienaufgaben laufen im Browser in Geschwindigkeiten vergleichbar mit Desktop-Apps — während jedes Byte Ihrer Medien auf Ihrem eigenen Gerät bleibt."] },

    { type: "h2", content: ["Medienverarbeitung mit Convrs"] },
    { type: "p", content: ["Convrs bietet eine komplette Medien-Toolbox:"] },
    { type: "list", items: [
      ["MP4-zu-WebM- und WebM-zu-MP4-Konvertierung mit Qualitätskontrolle."],
      ["Video-zu-MP3-Audioextraktion."],
      ["Videos zuschneiden — präzise auf die benötigten Segmente."],
      ["Videos stummschalten — Tonspuren vollständig entfernen."],
      ["Geschwindigkeitsanpassung — Wiedergabe verlangsamen oder beschleunigen."],
      ["Video skalieren — Abmessungen für verschiedene Plattformen ändern."],
    ]},
    { type: "p", content: ["Jede Operation läuft vollständig in Ihrem Browser über WebAssembly. Keine Media-Datei wird hochgeladen. Keine Konten nötig. Keine Spuren, wenn Sie den Tab schließen. Ihre kreative Arbeit bleibt Ihre."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Procesamiento de audio y video en el navegador: convertir, recortar y comprimir",
    eyebrow: "Medios",
    description:
      "Cómo convertir MP4 a WebM, extraer audio de video, recortar clips, comprimir archivos y redimensionar video — todo ejecutándose localmente en su navegador sin subir archivos multimedia a ningún servidor.",
    excerpt:
      "De MP4 a WebM, de video a MP3 — una guía de procesamiento privado de audio y video en su navegador.",
    readingTime: "9 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Los archivos de audio y video están entre los más grandes que las personas manejan a diario — y entre los más sensibles. Grabaciones personales, presentaciones comerciales, proyectos creativos y capturas de pantalla contienen contenido que no debería subirse a servidores desconocidos. Esta guía cubre las tareas de procesamiento de medios más comunes y cómo realizarlas por completo en su navegador con herramientas impulsadas por WebAssembly."] },

    { type: "h2", content: ["Por qué la conversión de medios es un problema de privacidad"] },
    { type: "p", content: ["Cuando sube un video a un conversor en línea, surgen varios riesgos de privacidad:"] },
    { type: "list", items: [
      ["El archivo puede contener contenido visual o de audio identificable — caras, voces, lugares, conversaciones."],
      ["Los metadatos suelen incluir información del dispositivo, fechas de creación y, a veces, coordenadas GPS."],
      ["Los archivos grandes tardan más en subir, ampliando la ventana de exposición."],
      ["La política de retención del conversor determina cuánto tiempo permanece una copia de su medio en su infraestructura."],
      ["Algunos conversores gratuitos reutilizan el contenido subido para datos de entrenamiento o segmentación publicitaria."],
    ]},
    { type: "p", content: ["El procesamiento en el navegador elimina estos riesgos por completo. FFmpeg — la suite de medios estándar de la industria — se ha compilado a WebAssembly, lo que permite todas las capacidades de procesamiento directamente en su pestaña."] },

    { type: "h2", content: ["Conversión de formato de video: MP4, WebM y más allá"] },
    { type: "p", content: ["Los dos formatos de video web dominantes sirven para diferentes propósitos:"] },
    { type: "list", items: [
      [{ text: "MP4 (H.264/H.265): ", bold: true }, { text: "El formato más universalmente compatible. Funciona en todas partes — navegadores, móviles, redes sociales, presentaciones. H.265 (HEVC) ofrece mejor compresión pero menos soporte en navegadores." }],
      [{ text: "WebM (VP8/VP9/AV1): ", bold: true }, { text: "El formato abierto de Google optimizado para la web. Archivos más pequeños con calidad comparable. VP9 y AV1 ofrecen compresión excelente pero requieren navegadores modernos." }],
    ]},
    { type: "p", content: ["Escenarios comunes de conversión:"] },
    { type: "list", items: [
      ["MP4 a WebM: reducir el tamaño del archivo para la web manteniendo la calidad."],
      ["WebM a MP4: garantizar compatibilidad con plataformas que no soportan WebM (algunos clientes de correo, dispositivos antiguos)."],
      ["H.265 a H.264: convertir para máxima compatibilidad al compartir entre plataformas."],
    ]},

    { type: "h2", content: ["Extracción de audio: video a MP3 y WAV"] },
    { type: "p", content: ["A veces solo necesita el audio de un archivo de video — un segmento de podcast, un clip musical, una grabación de voz. La extracción elimina la pista de video y guarda el audio en un formato estándar:"] },
    { type: "list", items: [
      [{ text: "Video a MP3: ", bold: true }, { text: "Extraer el audio como MP3 comprimido — ideal para podcasts, clips musicales y grabaciones de voz donde importa el tamaño." }],
      [{ text: "Video a WAV: ", bold: true }, { text: "Extraer el audio como WAV sin comprimir — para situaciones que exigen máxima calidad, como edición profesional o archivo." }],
    ]},

    { type: "h2", content: ["Recorte y silenciamiento de video"] },
    { type: "p", content: ["Tareas básicas de edición de video de uso común:"] },
    { type: "list", items: [
      [{ text: "Recortar: ", bold: true }, { text: "Cortar secciones no deseadas al inicio o al final de un video — útil para quitar intros largas, grabaciones accidentales o conversaciones privadas captadas en los bordes de un clip." }],
      [{ text: "Silenciar: ", bold: true }, { text: "Eliminar la pista de audio por completo — necesario al compartir video cuyo audio contiene contenido sensible o irrelevante." }],
      [{ text: "Ajuste de velocidad: ", bold: true }, { text: "Acelerar o ralentizar la reproducción — útil para lapso de tiempo o análisis en cámara lenta." }],
    ]},
    { type: "note", tone: "success", title: "Bonificación de privacidad", content: ["Recortar en el navegador significa que las conversaciones privadas, el ruido de fondo o el audio identificable captado en los bordes de su grabación nunca salen del dispositivo. Usted controla exactamente qué parte se procesa."] },

    { type: "h2", content: ["Compresión y redimensión de video"] },
    { type: "p", content: ["Los archivos de video son grandes. Comprimir y redimensionar suelen ser necesarios para compartir:"] },
    { type: "list", items: [
      [{ text: "Comprimir: ", bold: true }, { text: "Reducir el tamaño ajustando la tasa de bits y la configuración del códec. Un video de 100 MB suele comprimirse a 20–30 MB con pérdida mínima visible de calidad." }],
      [{ text: "Redimensionar: ", bold: true }, { text: "Cambiar las dimensiones — por ejemplo, reducir 4K a 1080p para la web, o recortar a una relación de aspecto para redes sociales." }],
    ]},
    { type: "p", content: ["Ambas operaciones consumen mucha CPU, por eso WebAssembly es esencial. Los navegadores modernos aprovechan la codificación acelerada por hardware mediante WASM, haciendo posible en una laptop lo que antes era tarea exclusiva del servidor."] },

    { type: "h2", content: ["Cómo WebAssembly impulsa el procesamiento de medios"] },
    { type: "p", content: ["La tecnología detrás del procesamiento en el navegador se parece notablemente a la de los servidores:"] },
    { type: "list", items: [
      ["FFmpeg compilado a WebAssembly ofrece el mismo soporte de códecs que la versión de servidor."],
      ["Los Web Workers ejecutan el procesamiento en hilos de fondo, manteniendo la interfaz receptiva."],
      ["SharedArrayBuffer permite compartir memoria de forma eficiente entre el hilo principal y los de trabajo."],
      ["La aceleración por hardware a través de las API de medios del navegador añade codificación impulsada por GPU cuando está disponible."],
    ]},
    { type: "p", content: ["El resultado: la mayoría de las tareas comunes se completan en el navegador a velocidades comparables a las aplicaciones de escritorio — manteniendo cada byte de su medio en su propio dispositivo."] },

    { type: "h2", content: ["Procesamiento de medios con Convrs"] },
    { type: "p", content: ["Convrs ofrece un kit de medios completo:"] },
    { type: "list", items: [
      ["Conversión MP4 a WebM y WebM a MP4 con control de calidad."],
      ["Extracción de audio de video a MP3."],
      ["Recorte de video — corte preciso de los segmentos que necesite."],
      ["Silenciamiento de video — eliminación completa de pistas de audio."],
      ["Ajuste de velocidad — ralentizar o acelerar la reproducción."],
      ["Redimensionamiento de video — cambiar dimensiones para distintas plataformas."],
    ]},
    { type: "p", content: ["Cada operación se ejecuta completamente en su navegador mediante WebAssembly. Ningún archivo multimedia se sube a ningún servidor. No se requieren cuentas. No quedan rastros al cerrar la pestaña. Su trabajo creativo es suyo."] },
  ],
};

const audioVideoGuide: GuideDefinition = {
  slug: "audio-video-processing-guide",
  content: { en, tr, de, es },
};

export default audioVideoGuide;
