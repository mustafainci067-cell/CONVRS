import type { LegalContent } from "./types";
import { links } from "./types";

export const aboutContent: LegalContent = {
  // ─────────────── TÜRKÇE ───────────────
  tr: {
    eyebrow: "Hakkımızda",
    title: "Convrs Hakkında",
    updatedLabel: "Son güncelleme:",
    updatedDate: "16 Eylül 2026",
    note: {
      type: "note",
      tone: "success",
      title: "Gizlilik, Tasarımımızın Merkezindedir",
      content: [
        "Convrs'un yaptığı her şey tarayıcınızın içinde gerçekleşir. Dosyalarınız, belgeleriniz, görselleriniz, ses ve video kayıtlarınız cihazınızdan asla ayrılmaz — dosya yükleme yoktur, sunucu yoktur, sızıntı olacak bir yer yoktur. Dönüştürme, tanımı gereği gizlidir.",
      ],
    },
    intro: [
      [
        "Convrs; görsel, belge, ses, video ve veri dosyalarını dönüştürmek, düzenlemek ve işlemek için ",
        { text: "60'tan fazla aracı", bold: true },
        " bir araya getiren ücretsiz, gizlilik öncelikli bir platformdur. Her araç, WebAssembly ile desteklenerek tamamen tarayıcınızda çalışır; böylece hiçbir şey kurmadan ve dosyalarınızı üçüncü taraf bir sunucuya emanet etmeden masaüstü kalitesinde performans elde edersiniz.",
      ],
      [
        "Convrs'u kurarken yola çıktığımız fikir çok basitti: ",
        { text: "dosya dönüştürme, verilerinizi feda etmeyi gerektirmemeli", bold: true },
        ". “Ücretsiz” çevrimiçi dönüştürücülerin çoğu dosyalarınızı kendi sunucularına yükleyerek bunları ele geçirilme, saklanma ve yeniden satılma riskine maruz bırakır. Convrs, gerçekten işe yarayan bir dönüştürücünün aynı anda gizli, hızlı ve ücretsiz olabileceğini kanıtlamak için var.",
      ],
    ],
    sections: [
      {
        heading: ["1. Convrs Nedir?"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs, tarayıcı tabanlı, ",
              { text: "kapsamlı bir dosya işleme araç setidir", bold: true },
              ". Görsel dönüştürme (HEIC, JPG, PNG, WebP, ICO), belge işleme (PDF, DOCX, XLSX), ses ve video araçları (MP4, MP3, WAV, WebM; kırpma, birleştirme, sıkıştırma, karartma) ile metin ve kod araçları (JSON, YAML, CSV, SQL, HTML, markdown, hash, JWT, base64) dahil onlarca kategoriyi kapsar. Bunların arasında yeniden boyutlandırma, kırpma, arka plan temizleme, sıkıştırma, filtre ve format değiştirme gibi popüler işlemler de yer alır.",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "%100 ücretsiz", bold: true },
                " — tüm araçlar herkes için açık ve günlük kullanımda bir sınır yoktur.",
              ],
              [
                { text: "Kurulum gerektirmez", bold: true },
                " — hiçbir yazılım indirmeniz gerekmez; yalnızca tarayıcınız yeterlidir.",
              ],
              [
                { text: "Hesap yok", bold: true },
                " — kayıt, e-posta veya şifre olmadan her aracı anında kullanabilirsiniz.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. Gizlilik Öncelikli Mimari"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs'u tanımlayan en önemli özellik, ",
              { text: "tüm işlemlerin yerel olarak gerçekleşmesidir", bold: true },
              ". Herhangi bir araca dosya sürüklediğinizde, dönüştürme işlemi kendi tarayıcı sekmenizde çalışan WebAssembly ikili dosyaları tarafından yürütülür. Dosyanız hiçbir zaman internet üzerinden gönderilmez; işlemin tamamı cihazınızın işlemcisinde tamamlanır.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Hiçbir dosya bir sunucuya yüklenmez.",
              ],
              [
                "Hiçbir dosya altyapımızda saklanmaz veya önbelleğe alınmaz.",
              ],
              [
                "Hesap, kayıt, e-posta veya kişisel bilgi istenmez.",
              ],
              [
                "Hiçbir analitik veya izleme, dosyalarınızla ilişkilendirilmez.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Hiçbir şey cihazınızdan ayrılmadığı için içeriğiniz; biz dahil kimse tarafından ",
              { text: "ele geçirilemez, okunamaz, saklanamaz veya para kazanılamaz", bold: true },
              ". Dönüştürdüğünüz belge, görsel veya videonun başından sonuna dek tek kopyası sizdedir.",
            ],
          },
        ],
      },
      {
        heading: ["3. Dönüştürme Nasıl Çalışır?"],
        blocks: [
          {
            type: "p",
            content: [
              "Bir dosya seçtiğinizde araç, ihtiyaç duyduğu kodlayıcıyı statik dağıtım ağımızdan (CDN) yükler ve dönüştürmeyi WebAssembly kullanarak tamamen cihazınızın işlemcisinde gerçekleştirir. Güncel tarayıcılar bu kodu yerel olarak çalıştırır; böylece yüksek çözünürlüklü dosyalar bile hızlı işlenir.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Kaynak dosya cihazınızda yerel olarak okunur.",
              ],
              [
                "Dönüştürme ve kodlama işlemi yerel olarak çalışır.",
              ],
              [
                "Sonuç, tarayıcı indirmesi olarak size sunulur.",
              ],
              [
                "Sekme kapandığında hiçbir iz kalmaz; dosya kalıcı olarak silinir.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Bu nedenle dönüştürmeler hem güvenli hem de hızlıdır: işi uzaktaki bir sunucu değil, sizin işlemciniz yapar.",
            ],
          },
        ],
      },
      {
        heading: ["4. Araç Setimiz"],
        blocks: [
          {
            type: "p",
            content: [
              "50 yakın ihtiyacın tamamı için tek adres olacak şekilde araçlarımızı kategorilere ayırdık:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Görseller", bold: true },
                " — HEIC↔JPG, PNG↔JPG, WebP, JPG↔PNG dönüştürme, yeniden boyutlandırma, kırpma, arka plan temizleme, sıkıştırma, filtreler ve renk araçları.",
              ],
              [
                { text: "Belgeler", bold: true },
                " — PDF birleştirme/bölme, PDF→JPG, PDF→metin, DOCX→PDF, XLSX ve CSV işlemleri.",
              ],
              [
                { text: "Ses ve video", bold: true },
                " — MP4↔WebM, video→MP3, WAV dönüştürme, kırpma, ses kısma, hız değiştirme ve video yeniden boyutlandırma.",
              ],
              [
                { text: "Veri ve kod", bold: true },
                " — JSON biçimlendirici, JSON↔YAML, JSON↔CSV, SQL biçimlendirici, HTML kodlama, markdown, hash, JWT ve base64 araçları.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["5. Sunucu Tarafında Sıfır İşleme — Neden Önemli?"],
        blocks: [
          {
            type: "p",
            content: [
              "İşlediğiniz her dosya, işlem boyunca kendi cihazınızda kalır. KVKK, GDPR ve CCPA gibi sıkı veri koruma rejimlerinin uygulandığı bölgelerde bile, Convrs'u kullandığınızda ",
              { text: "hiçbir kişisel veri transferi gerçekleşmez", bold: true },
              " — çünkü aktarılacak veri yoktur. Sizden asla ad veya e-posta istenmez; içeriğinizin sunucuda “işlenmesi” için onay alınmaz, çünkü sunucuda işlenecek hiçbir şey yoktur.",
            ],
          },
          {
            type: "p",
            content: [
              "Gizlilik tasarımı, küçük dosyalardan hassas sözleşmelere, kimlik belgelerinden kişisel fotoğraflara kadar her tür içeriği ",
              { text: "veri koruması açısından eşit derecede güvenli", bold: true },
              " hale getirir.",
            ],
          },
        ],
      },
      {
        heading: ["6. Taahhüdümüz"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "ücretsiz kalır", bold: true },
              ", tarayıcı içinde (client-side) kalır ve bağımsız kalır. Dosyaların sunucuya yüklenmesini gerektiren hiçbir özellik eklemeyeceğiz ve kullanıcı verisi asla satmayacağız — çünkü satacak verimiz yok.",
            ],
          },
          {
            type: "p",
            content: [
              "Neleri yapıp yapmadığımızı tam olarak görmek için ",
              { text: "Gizlilik Politikası", url: "/privacy-policy", internal: true },
              " ve ",
              { text: "Kullanım Şartları", url: "/terms-of-service", internal: true },
              " sayfalarımızı okuyabilirsiniz. Sorunuz varsa aşağıdaki kanallardan bize ulaşmaktan çekinmeyin.",
            ],
          },
        ],
      },
      {
        heading: ["7. Kim Tarafından Yapıldı?"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs, ",
              { text: "Mustafa İnci", bold: true },
              " tarafından ",
              { text: "İstanbul, Türkiye", bold: true },
              " merkezli olarak bağımsız olarak geliştirilmiştir. Tüm araçlar açık kaynak WebAssembly teknolojisiyle desteklenmekte ve tarayıcıda çalışacak şekilde tasarlanmaktadır. Misyonumuz, dünya genelindeki kullanıcılara hızlı, gizli ve ücretsiz dosya dönüştürme hizmeti sunmaktır.",
            ],
          },
          {
            type: "p",
            content: [
              "Geliştirici ile doğrudan iletişime geçmek için ",
              { text: "support@convrs.org", bold: true },
              " adresine e-posta gönderebilir veya ",
              { text: "İletişim", url: "/contact", internal: true },
              " sayfamızı kullanabilirsiniz.",
            ],
          },
        ],
      },
      {
        heading: ["8. Bizimle İletişime Geçin"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "Size Nasıl Yardımcı Olabiliriz?",
            lines: [
              [
                "E-posta: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "İletişim sayfası: ",
                { text: "/contact", url: "/contact", internal: true },
              ],
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ENGLISH ───────────────
  en: {
    eyebrow: "About",
    title: "About Convrs",
    updatedLabel: "Last updated:",
    updatedDate: "September 16, 2026",
    note: {
      type: "note",
      tone: "success",
      title: "Privacy Is at the Center of Our Design",
      content: [
        "Everything Convrs does happens inside your browser. Your files, documents, images, audio and video never leave your device — there is no upload, no server, and no one to leak to. Converting is private by design.",
      ],
    },
    intro: [
      [
        "Convrs is a free, privacy-first platform that brings together ",
        { text: "more than 60 tools", bold: true },
        " for converting, editing and processing files of almost every kind — images, documents, audio, video and data. Every tool runs entirely in your browser via WebAssembly, so you get desktop-grade performance without installing anything and without ever entrusting your files to a third-party server.",
      ],
      [
        "We built Convrs on a very simple idea: ",
        { text: "file conversion should never require surrendering your data", bold: true },
        ". Most “free” online converters upload your files to their servers, exposing them to interception, retention and resale. Convrs exists to prove that a genuinely useful converter can be private, fast and free — all at the same time.",
      ],
    ],
    sections: [
      {
        heading: ["1. What Is Convrs?"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs is a browser-based ",
              { text: "all-in-one file toolkit", bold: true },
              ". It covers image conversion (HEIC, JPG, PNG, WebP, ICO), document processing (PDF, DOCX, XLSX), audio and video tools (MP4, MP3, WAV, WebM; trimming, merging, compressing, muting) and text and code utilities (JSON, YAML, CSV, SQL, HTML, markdown, hash, JWT, base64). Popular operations such as resizing, cropping, background removal, compression, filters and format conversion are all included.",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "100% free", bold: true },
                " — every tool is open to everyone, with no daily usage limits.",
              ],
              [
                { text: "No installation", bold: true },
                " — you never have to download any software; your browser is all you need.",
              ],
              [
                { text: "No account", bold: true },
                " — use any tool instantly, without registration, email or password.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. Privacy-First Architecture"],
        blocks: [
          {
            type: "p",
            content: [
              "The defining feature of Convrs is that ",
              { text: "all processing happens locally", bold: true },
              ". When you drag a file onto any tool, the conversion is executed end-to-end by WebAssembly binaries running in your own browser tab. Your file is never sent over the internet; the whole operation completes on your device's own CPU.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "No file is ever uploaded to a server.",
              ],
              [
                "No file is stored or cached on our infrastructure.",
              ],
              [
                "No account, signup, email or personal information is required.",
              ],
              [
                "No analytics or tracking is ever associated with your files.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Because nothing leaves your device, your content cannot be ",
              { text: "intercepted, read, retained or monetized", bold: true },
              " — by us or anyone else. Whatever document, image or video you convert, the only copy that ever exists is the one in your hands.",
            ],
          },
        ],
      },
      {
        heading: ["3. How Conversions Work"],
        blocks: [
          {
            type: "p",
            content: [
              "When you select a file, the tool loads the codec it needs from our static content-delivery network (CDN) and then runs the conversion entirely on your device's processor using WebAssembly. Modern browsers execute this code natively on your machine, which is why even high-resolution files are processed quickly.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Your source file is read locally, on your device.",
              ],
              [
                "The conversion and encoding run locally.",
              ],
              [
                "The result is delivered to you as a browser download.",
              ],
              [
                "When the tab closes, nothing remains — the file is gone.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "That is why conversions on Convrs are both secure and fast: your CPU does the work, not a distant server.",
            ],
          },
        ],
      },
      {
        heading: ["4. Our Toolkit"],
        blocks: [
          {
            type: "p",
            content: [
              "We have organized our tools into categories so you can find what you need in seconds:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Images", bold: true },
                " — HEIC↔JPG, PNG↔JPG, WebP and JPG↔PNG conversion, resizing, cropping, background removal, compression, filters and color tools.",
              ],
              [
                { text: "Documents", bold: true },
                " — PDF merge and split, PDF→JPG, PDF→text, DOCX→PDF, XLSX and CSV utilities.",
              ],
              [
                { text: "Audio & video", bold: true },
                " — MP4↔WebM, video→MP3, WAV conversion, trimming, muting, speed and video resizing.",
              ],
              [
                { text: "Data & code", bold: true },
                " — JSON formatter, JSON↔YAML, JSON↔CSV, SQL formatter, HTML encode, markdown, hash, JWT and base64 tools.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["5. Zero Server-Side Processing — Why It Matters"],
        blocks: [
          {
            type: "p",
            content: [
              "Every file you process remains on your own device for the entire operation. Even in regions governed by strict data-protection regimes such as KVKK, GDPR and CCPA, ",
              { text: "no transfer of personal data takes place", bold: true },
              " when you use Convrs — because there is no data to transfer. You are never asked for your name or email, and you are never asked to “consent” to your content being processed, because there is nothing on a server to process.",
            ],
          },
          {
            type: "p",
            content: [
              "This privacy-by-design approach makes every kind of content — small files, sensitive contracts, identity documents, personal photos — ",
              { text: "equally safe from a data-protection standpoint", bold: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["6. Our Commitment"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "stays free, stays client-side and stays independent", bold: true },
              ". We will never introduce a feature that requires uploading files to a server, and we will never sell user data — because we do not have any to sell.",
            ],
          },
          {
            type: "p",
            content: [
              "Read our ",
              { text: "Privacy Policy", url: "/privacy-policy", internal: true },
              " and ",
              { text: "Terms of Service", url: "/terms-of-service", internal: true },
              " to see exactly what we do and do not do. If you have a question, reach out through the channels below — we reply to every message.",
            ],
          },
        ],
      },
      {
        heading: ["7. Who Built Convrs?"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs is independently developed by ",
              { text: "Mustafa İnci", bold: true },
              " based in ",
              { text: "Istanbul, Turkey", bold: true },
              ". All tools are powered by open-source WebAssembly technology and designed to run entirely in the browser. Our mission is to provide fast, private and free file conversion to users worldwide.",
            ],
          },
          {
            type: "p",
            content: [
              "To reach the developer directly, send an email to ",
              { text: "support@convrs.org", bold: true },
              " or use our ",
              { text: "Contact", url: "/contact", internal: true },
              " page.",
            ],
          },
        ],
      },
      {
        heading: ["8. Get in Touch"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "How Can We Help You?",
            lines: [
              [
                "Email: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "Contact page: ",
                { text: "/contact", url: "/contact", internal: true },
              ],
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── DEUTSCH ───────────────
  de: {
    eyebrow: "Über uns",
    title: "Über Convrs",
    updatedLabel: "Zuletzt aktualisiert:",
    updatedDate: "16. September 2026",
    note: {
      type: "note",
      tone: "success",
      title: "Datenschutz steht im Zentrum unseres Designs",
      content: [
        "Alles, was Convrs tut, geschieht in Ihrem Browser. Ihre Dateien, Dokumente, Bilder, Audio- und Videodateien verlassen Ihr Gerät nie — kein Hochladen, kein Server, nichts, das durchsickern könnte. Konvertieren ist von Natur aus privat.",
      ],
    },
    intro: [
      [
        "Convrs ist eine kostenlose, datenschutzorientierte Plattform, die ",
        { text: "mehr als 60 Tools", bold: true },
        " zum Konvertieren, Bearbeiten und Verarbeiten fast jeder Art von Dateien vereint — Bilder, Dokumente, Audio, Video und Daten. Jedes Tool läuft vollständig in Ihrem Browser auf Basis von WebAssembly, sodass Sie Desktop-Leistung erhalten, ohne etwas zu installieren und ohne Ihre Dateien jemals einem Server Dritter anzuvertrauen.",
      ],
      [
        "Wir haben Convrs aus einer einfachen Idee heraus gebaut: ",
        { text: "Dateikonvertierung sollte niemals bedeuten, Ihre Daten preiszugeben", bold: true },
        ". Die meisten “kostenlosen” Online-Konverter laden Ihre Dateien auf ihre Server hoch und setzen sie damit Abfangen, Speicherung und Weiterverkauf aus. Convrs existiert, um zu beweisen, dass ein wirklich nützlicher Konverter zugleich privat, schnell und kostenlos sein kann.",
      ],
    ],
    sections: [
      {
        heading: ["1. Was ist Convrs?"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ist eine browserbasierte ",
              { text: "umfassende Datei-Toolbox", bold: true },
              ". Sie umfasst Bildkonvertierung (HEIC, JPG, PNG, WebP, ICO), Dokumentverarbeitung (PDF, DOCX, XLSX), Audio- und Video-Tools (MP4, MP3, WAV, WebM; Zuschneiden, Zusammenführen, Komprimieren, Stummschalten) sowie Text- und Code-Utilities (JSON, YAML, CSV, SQL, HTML, Markdown, Hash, JWT, Base64). Beliebte Funktionen wie Skalieren, Zuschneiden, Hintergrundentfernung, Komprimierung, Filter und Formatkonvertierung sind alle enthalten.",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "100 % kostenlos", bold: true },
                " — jedes Tool ist für alle offen, ganz ohne tägliche Nutzungsbeschränkung.",
              ],
              [
                { text: "Keine Installation", bold: true },
                " — Sie müssen keine Software herunterladen; Ihr Browser genügt.",
              ],
              [
                { text: "Kein Konto", bold: true },
                " — jedes Tool sofort nutzbar, ohne Registrierung, E-Mail oder Passwort.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. Datenschutzorientierte Architektur"],
        blocks: [
          {
            type: "p",
            content: [
              "Das wichtigste Merkmal von Convrs ist, dass ",
              { text: "sämtliche Verarbeitung lokal stattfindet", bold: true },
              ". Wenn Sie eine Datei auf ein beliebiges Tool ziehen, wird die Konvertierung durchgängig von WebAssembly-Binärdateien ausgeführt, die in Ihrem eigenen Browser-Tab laufen. Ihre Datei wird nie über das Internet gesendet; der gesamte Vorgang wird auf der CPU Ihres Geräts abgeschlossen.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Keine Datei wird jemals auf einen Server hochgeladen.",
              ],
              [
                "Keine Datei wird auf unserer Infrastruktur gespeichert oder zwischengecacht.",
              ],
              [
                "Kein Konto, keine Registrierung, keine E-Mail und keine persönlichen Daten sind erforderlich.",
              ],
              [
                "Keine Analyse oder Nachverfolgung wird jemals mit Ihren Dateien verknüpft.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Da nichts Ihr Gerät verlässt, kann Ihr Inhalt nicht ",
              { text: "abgefangen, gelesen, gespeichert oder monetarisiert", bold: true },
              " werden — weder von uns noch von sonst jemandem. Egal ob Dokument, Bild oder Video: Die einzige Kopie, die jemals existiert, ist die in Ihren Händen.",
            ],
          },
        ],
      },
      {
        heading: ["3. Wie Konvertierungen funktionieren"],
        blocks: [
          {
            type: "p",
            content: [
              "Wenn Sie eine Datei auswählen, lädt das Tool den benötigten Encoder aus unserem statischen Content-Delivery-Network (CDN) und führt die Konvertierung mithilfe von WebAssembly vollständig auf dem Prozessor Ihres Geräts aus. Moderne Browser führen diesen Code nativ auf Ihrem Rechner aus — deshalb werden selbst hochauflösende Dateien schnell verarbeitet.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Ihre Quelldatei wird lokal auf Ihrem Gerät gelesen.",
              ],
              [
                "Konvertierung und Kodierung laufen lokal ab.",
              ],
              [
                "Das Ergebnis wird als Browser-Download bereitgestellt.",
              ],
              [
                "Beim Schließen des Tabs bleibt nichts zurück — die Datei ist verschwunden.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Deshalb sind Konvertierungen auf Convrs zugleich sicher und schnell: Ihre CPU erledigt die Arbeit, nicht ein entfernter Server.",
            ],
          },
        ],
      },
      {
        heading: ["4. Unsere Werkzeugsammlung"],
        blocks: [
          {
            type: "p",
            content: [
              "Wir haben unsere Tools in Kategorien gegliedert, damit Sie in Sekunden finden, was Sie brauchen:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Bilder", bold: true },
                " — HEIC↔JPG, PNG↔JPG, WebP- und JPG↔PNG-Konvertierung, Skalieren, Zuschneiden, Hintergrundentfernung, Komprimierung, Filter und Farbwerkzeuge.",
              ],
              [
                { text: "Dokumente", bold: true },
                " — PDF zusammenführen und teilen, PDF→JPG, PDF→Text, DOCX→PDF, XLSX- und CSV-Utilities.",
              ],
              [
                { text: "Audio & Video", bold: true },
                " — MP4↔WebM, Video→MP3, WAV-Konvertierung, Zuschneiden, Stummschalten, Geschwindigkeit und Video-Skalierung.",
              ],
              [
                { text: "Daten & Code", bold: true },
                " — JSON-Formatter, JSON↔YAML, JSON↔CSV, SQL-Formatter, HTML-Encode, Markdown, Hash-, JWT- und Base64-Tools.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["5. Keine serverseitige Verarbeitung — warum das zählt"],
        blocks: [
          {
            type: "p",
            content: [
              "Jede Datei, die Sie verarbeiten, bleibt während des gesamten Vorgangs auf Ihrem Gerät. Selbst in Regionen mit strengen Datenschutzregimen wie DSGVO, KVKK und CCPA findet bei der Nutzung von Convrs ",
              { text: "keine Übertragung personenbezogener Daten statt", bold: true },
              " — denn es gibt keine Daten zu übertragen. Sie werden nie nach Ihrem Namen oder Ihrer E-Mail gefragt und nie um “Einwilligung” zur Verarbeitung Ihres Inhalts gebeten, weil es auf einem Server nichts zu verarbeiten gibt.",
            ],
          },
          {
            type: "p",
            content: [
              "Dieses Privacy-by-Design macht jede Art von Inhalt — kleine Dateien, sensible Verträge, Ausweisdokumente, private Fotos — ",
              { text: "aus datenschutzrechtlicher Sicht gleichermaßen sicher", bold: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["6. Unser Versprechen"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "bleibt kostenlos, bleibt clientseitig und bleibt unabhängig", bold: true },
              ". Wir werden nie eine Funktion einführen, die das Hochladen von Dateien auf einen Server erfordert, und wir werden niemals Nutzerdaten verkaufen — denn wir haben keine zu verkaufen.",
            ],
          },
          {
            type: "p",
            content: [
              "Lesen Sie unsere ",
              { text: "Datenschutzrichtlinie", url: "/privacy-policy", internal: true },
              " und unsere ",
              { text: "Nutzungsbedingungen", url: "/terms-of-service", internal: true },
              ", um genau zu erfahren, was wir tun und was nicht. Wenn Sie eine Frage haben, erreichen Sie uns über die folgenden Kanäle — wir beantworten jede Nachricht.",
            ],
          },
        ],
      },
      {
        heading: ["7. Entwickler"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs wird unabhängig von ",
              { text: "Mustafa İnci", bold: true },
              " aus ",
              { text: "Istanbul, Türkei", bold: true },
              " entwickelt. Alle Tools basieren auf Open-Source-WebAssembly-Technologie und laufen vollständig im Browser. Unsere Mission ist es, Nutzern weltweit eine schnelle, private und kostenlose Dateikonvertierung zu bieten.",
            ],
          },
          {
            type: "p",
            content: [
              "Um den Entwickler direkt zu kontaktieren, senden Sie eine E-Mail an ",
              { text: "support@convrs.org", bold: true },
              " oder nutzen Sie unsere ",
              { text: "Kontaktseite", url: "/contact", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["8. Kontaktieren Sie uns"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "Wie können wir Ihnen helfen?",
            lines: [
              [
                "E-Mail: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "Kontaktseite: ",
                { text: "/contact", url: "/contact", internal: true },
              ],
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ESPAÑOL ───────────────
  es: {
    eyebrow: "Sobre nosotros",
    title: "Acerca de Convrs",
    updatedLabel: "Última actualización:",
    updatedDate: "16 de septiembre de 2026",
    note: {
      type: "note",
      tone: "success",
      title: "La privacidad está en el centro de nuestro diseño",
      content: [
        "Todo lo que hace Convrs ocurre dentro de su navegador. Sus archivos, documentos, imágenes, audio y vídeo nunca salen de su dispositivo: no hay carga, no hay servidor y no hay nada que filtrar. Convertir es privado por diseño.",
      ],
    },
    intro: [
      [
        "Convrs es una plataforma gratuita y centrada en la privacidad que reúne ",
        { text: "más de 60 herramientas", bold: true },
        " para convertir, editar y procesar archivos de casi cualquier tipo: imágenes, documentos, audio, vídeo y datos. Cada herramienta funciona por completo en su navegador mediante WebAssembly, de modo que obtiene un rendimiento de escritorio sin instalar nada y sin confiar jamás sus archivos a un servidor de terceros.",
      ],
      [
        "Creamos Convrs partiendo de una idea muy sencilla: ",
        { text: "la conversión de archivos nunca debería obligarle a ceder sus datos", bold: true },
        ". La mayoría de los conversores “gratuitos” en línea suben sus archivos a sus servidores, exponiéndolos a la interceptación, la retención y la reventa. Convrs existe para demostrar que un conversor realmente útil puede ser a la vez privado, rápido y gratuito.",
      ],
    ],
    sections: [
      {
        heading: ["1. ¿Qué es Convrs?"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs es un ",
              { text: "kit integral de herramientas de archivo", bold: true },
              " basado en el navegador. Cubre la conversión de imágenes (HEIC, JPG, PNG, WebP, ICO), el procesamiento de documentos (PDF, DOCX, XLSX), herramientas de audio y vídeo (MP4, MP3, WAV, WebM; recorte, combinación, compresión, silenciado) y utilidades de texto y código (JSON, YAML, CSV, SQL, HTML, markdown, hash, JWT, base64). También se incluyen operaciones populares como redimensionar, recortar, eliminar fondos, comprimir, aplicar filtros y cambiar de formato.",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "100 % gratis", bold: true },
                " — todas las herramientas están abiertas a todos, sin límites diarios de uso.",
              ],
              [
                { text: "Sin instalación", bold: true },
                " — nunca tiene que descargar ningún programa; su navegador es suficiente.",
              ],
              [
                { text: "Sin cuenta", bold: true },
                " — use cualquier herramienta al instante, sin registro, correo ni contraseña.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. Arquitectura centrada en la privacidad"],
        blocks: [
          {
            type: "p",
            content: [
              "La característica que define a Convrs es que ",
              { text: "todo el procesamiento ocurre de forma local", bold: true },
              ". Cuando arrastra un archivo a cualquier herramienta, la conversión la ejecuta de principio a fin el código WebAssembly que corre en su propia pestaña del navegador. Su archivo nunca se envía por internet; toda la operación se completa en la CPU de su dispositivo.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Ningún archivo se sube nunca a un servidor.",
              ],
              [
                "Ningún archivo se almacena ni se guarda en caché en nuestra infraestructura.",
              ],
              [
                "No se requiere cuenta, registro, correo ni información personal.",
              ],
              [
                "Ningún análisis ni seguimiento se asocia jamás a sus archivos.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Como nada sale de su dispositivo, su contenido no puede ser ",
              { text: "interceptado, leído, retenido ni monetizado", bold: true },
              ", ni por nosotros ni por nadie más. Sea cual sea el documento, imagen o vídeo que convierta, la única copia que existe es la que está en sus manos.",
            ],
          },
        ],
      },
      {
        heading: ["3. Cómo funcionan las conversiones"],
        blocks: [
          {
            type: "p",
            content: [
              "Cuando selecciona un archivo, la herramienta carga el códec que necesita desde nuestra red estática de distribución de contenidos (CDN) y ejecuta la conversión por completo en el procesador de su dispositivo mediante WebAssembly. Los navegadores modernos ejecutan este código de forma nativa en su equipo, por eso incluso los archivos de alta resolución se procesan con rapidez.",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Su archivo de origen se lee localmente, en su dispositivo.",
              ],
              [
                "La conversión y la codificación se ejecutan de forma local.",
              ],
              [
                "El resultado se le entrega como descarga del navegador.",
              ],
              [
                "Al cerrar la pestaña no queda nada: el archivo desaparece.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Por eso las conversiones en Convrs son a la vez seguras y rápidas: su CPU hace el trabajo, no un servidor lejano.",
            ],
          },
        ],
      },
      {
        heading: ["4. Nuestro conjunto de herramientas"],
        blocks: [
          {
            type: "p",
            content: [
              "Hemos organizado nuestras herramientas en categorías para que encuentre lo que necesita en segundos:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Imágenes", bold: true },
                " — conversión HEIC↔JPG, PNG↔JPG, WebP y JPG↔PNG, redimensionado, recorte, eliminación de fondos, compresión, filtros y herramientas de color.",
              ],
              [
                { text: "Documentos", bold: true },
                " — combinar y dividir PDF, PDF→JPG, PDF→texto, DOCX→PDF, utilidades de XLSX y CSV.",
              ],
              [
                { text: "Audio y vídeo", bold: true },
                " — conversión MP4↔WebM, vídeo→MP3, WAV, recorte, silenciado, velocidad y redimensionado de vídeo.",
              ],
              [
                { text: "Datos y código", bold: true },
                " — formateador JSON, JSON↔YAML, JSON↔CSV, formateador SQL, codificación HTML, markdown, herramientas de hash, JWT y base64.",
              ],
            ],
          },
        ],
      },
      {
        heading: ["5. Cero procesamiento en el servidor: por qué importa"],
        blocks: [
          {
            type: "p",
            content: [
              "Cada archivo que procesa permanece en su propio dispositivo durante toda la operación. Incluso en regiones regidas por estrictos regímenes de protección de datos como el RGPD, la KVKK y la CCPA, ",
              { text: "no se produce ninguna transferencia de datos personales", bold: true },
              " al usar Convrs, porque no hay datos que transferir. Nunca se le pide su nombre o su correo, ni se le pide “consentimiento” para procesar su contenido, porque no hay nada en un servidor que procesar.",
            ],
          },
          {
            type: "p",
            content: [
              "Este planteamiento de privacidad desde el diseño hace que cualquier tipo de contenido — archivos pequeños, contratos sensibles, documentos de identidad, fotos personales — sea ",
              { text: "igualmente seguro desde el punto de vista de la protección de datos", bold: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["6. Nuestro compromiso"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "sigue siendo gratuito, sigue funcionando en el navegador y sigue siendo independiente", bold: true },
              ". Nunca introduciremos una función que exija subir archivos a un servidor y nunca venderemos datos de usuarios, porque no tenemos ninguno que vender.",
            ],
          },
          {
            type: "p",
            content: [
              "Lea nuestra ",
              { text: "Política de Privacidad", url: "/privacy-policy", internal: true },
              " y nuestros ",
              { text: "Términos de Uso", url: "/terms-of-service", internal: true },
              " para saber con exactitud qué hacemos y qué no hacemos. Si tiene alguna pregunta, póngase en contacto con nosotros a través de los siguientes canales: respondemos a todos los mensajes.",
            ],
          },
        ],
      },
      {
        heading: ["7. Quién desarrolló Convrs"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs es desarrollado de forma independiente por ",
              { text: "Mustafa İnci", bold: true },
              " desde ",
              { text: "Estambul, Turquía", bold: true },
              ". Todas las herramientas están impulsadas por tecnología WebAssembly de código abierto y diseñadas para funcionar completamente en el navegador. Nuestra misión es ofrecer conversiones de archivos rápidas, privadas y gratuitas a usuarios de todo el mundo.",
            ],
          },
          {
            type: "p",
            content: [
              "Para contactar directamente con el desarrollador, envíe un correo electrónico a ",
              { text: "support@convrs.org", bold: true },
              " o utilice nuestra ",
              { text: "página de contacto", url: "/contact", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["8. Póngase en contacto"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "¿Cómo podemos ayudarle?",
            lines: [
              [
                "Correo electrónico: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "Página de contacto: ",
                { text: "/contact", url: "/contact", internal: true },
              ],
            ],
          },
        ],
      },
    ],
  },
};