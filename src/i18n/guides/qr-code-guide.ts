import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "QR Codes Explained: How They Work and How to Stay Safe",
    eyebrow: "Toolbox",
    description:
      "QR codes put a URL, a product, or a payment into a square a phone can scan in an instant. Learn what makes a good QR code, how to generate one well, and the security habits that keep you from scanning the wrong thing.",
    excerpt:
      "What lives inside those squares, how to make scannable codes, and a short guard against QR scams.",
    readingTime: "6 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["The QR code — short for Quick Response — packs text, URLs, contact details, WiFi credentials or payment information into a black-and-white square a phone camera decodes in milliseconds. Originally an automotive-industry tracking tool, it is now how restaurants seat you, how museums guide you, and how half the world's posters link to the web. This guide explains what the squares contain and the two sides of QR security."] },

    { type: "h2", content: ["What a QR code stores"] },
    { type: "p", content: ["A QR code is a two-dimensional barcode: modules (the black squares) arranged in a grid, with position markers in three corners that let a camera orient the code. The content is ordinary data — most often a URL, but also plain text, Wi-Fi credentials (host, SSID, password), vCard contact details, or payment strings. The scanner reads the modules and hands the result to the right app."] },

    { type: "h2", content: ["What makes a code scannable"] },
    { type: "list", items: [
      [{ text: "Contrast: ", bold: true }, { text: "dark modules on a light background — the scanner needs the pattern to stand out." }],
      [{ text: "Quiet zone: ", bold: true }, { text: "keep clear padding around the code; a busy design bleeding to the edge breaks scanning." }],
      [{ text: "Size: ", bold: true }, { text: "the printed code must stay large enough for a camera at normal distance." }],
      [{ text: "Error correction: ", bold: true }, { text: "a decent level (15–25%) lets the code survive small damage, logos or dirt." }],
      [{ text: "Testing: ", bold: true }, { text: "always scan your own output on a phone before printing or publishing." }],
    ]},
    { type: "note", tone: "success", title: "Rendering matters", content: [
      "SVG or high-resolution PNG output keeps modules crisp on large print; low-resolution GIFs on posters turn into unreadable blobs. Generators with configurable error correction and vector export cover printed and on-screen use from one source."
    ]},

    { type: "h2", content: ["The security side: QR phishing"] },
    { type: "p", content: ["Anyone can encode anything. A QR code pasted on a poster, email or payment terminal can point to a fake login page, a malware download, or a fraudulent payment prompt — a trend known as quishing (QR-phishing). A scanner may not notice that the 'menu' they opened is a spoofed site."] },
    { type: "list", items: [
      ["Before scanning, glance at the URL your camera preview reveals and compare it to the expected domain."],
      ["Prefer scanning official, printed codes over sticker-covered or hand-corrected ones."],
      ["Never enter passwords, card numbers or OTPs on a page you reached through an unfamiliar QR code."],
      ["On the generator side, always make the final URL explicit and keep redirects to a minimum."],
    ]},

    { type: "h2", content: ["Generating QR codes in Convrs"] },
    { type: "p", content: ["Convrs includes a QR code generator that runs entirely in the browser. Enter the text or URL, pick size and error-correction level, optionally inject a logo in the safe center area, and export a crisp PNG or SVG. Because generation is local, the content you encode — a private link, an internal tool tip, a business card — never touches a server."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "QR Kodlar: Nasıl Çalışır ve Nasıl Güvende Kalırsınız",
    eyebrow: "Araçlar",
    description:
      "QR kodlar; bir URL, ürün veya ödemeyi telefonun saniyeler içinde taradığı kareye sığdırır. İyi bir QR kodun nasıl üretileceğini öğrenin.",
    excerpt:
      "Karelerin içinde ne yaşar, taranabilir kodlar nasıl yapılır ve QR dolandırıcılığına karşı kısa bir kalkan.",
    readingTime: "6 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["QR (Hızlı Yanıt) kodu, metni, URL'leri, iletişim bilgilerini, Wi-Fi kimlik bilgilerini veya ödeme bilgilerini telefon kamerasının milisaniyeler içinde çözdüğü siyah-beyaz bir kareye paketler. Başlangıçta bir otomotiv takip aracıyken şimdi restoranların, müzelerin ve posterlerin web'e açılan kapısıdır."] },

    { type: "h2", content: ["QR kodu ne saklar?"] },
    { type: "p", content: ["QR kodu iki boyutlu bir barkoddur: üç köşesindeki konum işaretleri kamera yönünü belirler. İçerik sıradan veridir — çoğunlukla bir URL, ayrıca düz metin, Wi-Fi kimlik bilgileri, vCard iletişim bilgileri veya ödeme dizeleri."] },

    { type: "h2", content: ["Bir kodu taranabilir yapan nedir?"] },
    { type: "list", items: [
      [{ text: "Kontrast: ", bold: true }, { text: "açık zemin üzerinde koyu modüller." }],
      [{ text: "Sessiz bölge: ", bold: true }, { text: "kodun çevresinde temiz boşluk bırakın." }],
      [{ text: "Boyut: ", bold: true }, { text: "baskıda kameranın rahatlıkla göreceği boyutu koruyun." }],
      [{ text: "Hata düzeltme: ", bold: true }, { text: "%15–25 seviye, küçük hasar ve kirde bile okumayı sürdürür." }],
      [{ text: "Test: ", bold: true }, { text: "yayınlamadan önce kendi kodunuzu telefonla tarayın." }],
    ]},
    { type: "note", tone: "success", title: "Çıktı kalitesi önemli", content: [
      "SVG veya yüksek çözünürlüklü PNG, büyük baskıda keskin kalır; düşük çözünürlüklü çıktılar okunamaz bulanıklıklara dönüşür."
    ]},

    { type: "h2", content: ["Güvenlik tarafı: QR oltalama (quishing)"] },
    { type: "p", content: ["Herkes her şeyi kodlayabilir. Bir poster, e-posta veya ödeme terminaline yapıştırılan QR kodu sahte bir giriş sayfasına, kötü amaçlı yazılım indirmesine veya sahte ödeme istemine yönlendirebilir. Tarayıcı, açtığı 'menünün' sahte bir site olduğunu fark etmeyebilir."] },
    { type: "list", items: [
      ["Taramadan önce kameranın gösterdiği URL'i beklenen alan adıyla karşılaştırın."],
      ["Çıkartma ile kapatılmış veya elle düzeltilmiş kodlar yerine resmi, basılı kodları tarayın."],
      ["Bilmediğiniz bir QR üzerinden ulaştığınız sayfada şifre, kart numarası veya OTP girmeyin."],
      ["Kod üretirken nihai URL'i açık tutun, yönlendirmeleri minimumda bırakın."],
    ]},

    { type: "h2", content: ["Convrs'te QR kodu üretme"] },
    { type: "p", content: ["Convrs QR üretici tamamen tarayıcıda çalışır. Metni girin, boyut ve hata düzeltme seviyesini seçin, isterseniz güvenli merkez alanına logo ekleyin ve keskin bir PNG veya SVG indirin. Üretim yerel olduğundan kodladığınız içerik asla bir sunucuya dokunmaz."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "QR-Codes erklärt: Wie sie funktionieren und sicher bleiben",
    eyebrow: "Werkzeuge",
    description:
      "QR-Codes packen URLs, Produkte oder Zahlungen in ein Quadrat, das das Telefon in Sekunden scannt. Lernen Sie, wie man gute Codes erzeugt.",
    excerpt:
      "Was in den Quadraten steckt, wie scanbare Codes entstehen — und Schutz vor QR-Tricks.",
    readingTime: "7 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Der QR-Code packt Text, URLs, Kontaktdaten oder Zahlungsinformationen in ein schwarz-weißes Quadrat, das die Handykamera in Millisekunden liest. Dieser Leitfaden erklärt, was die Quadrate enthalten und beide Seiten der QR-Sicherheit."] },
    { type: "h2", content: ["Was ein QR-Code speichert"] },
    { type: "p", content: ["Ein QR-Code ist ein 2D-Barcode: Module im Raster, mit Positionsmarkierungen in drei Ecken. Der Inhalt sind gewöhnliche Daten — meist eine URL, aber auch Text, WLAN-Zugangsdaten, vCard-Kontakte oder Zahlungszeichenfolgen."] },
    { type: "h2", content: ["Was einen Code scannen lässt"] },
    { type: "list", items: [
      [{ text: "Kontrast: ", bold: true }, { text: "dunkle Module auf hellem Grund." }],
      [{ text: "Ruhezone: ", bold: true }, { text: "freien Rand um den Code lassen." }],
      [{ text: "Fehlerkorrektur: ", bold: true }, { text: "15–25 % übersteht kleine Schäden." }],
      [{ text: "Test: ", bold: true }, { text: "eigene Codes vor dem Druck scannen." }],
    ]},
    { type: "h2", content: ["Sicherheit: QR-Phishing"] },
    { type: "p", content: ["Jeder kann alles kodieren. Ein QR-Code kann zu einer gefälschten Login-Seite oder Malware führen. Prüfen Sie vor dem Scannen die URL in der Kameraanzeige und geben Sie Passwörter nie auf Seiten ein, die Sie über einen unbekannten QR-Code erreicht haben."] },
    { type: "h2", content: ["QR-Codes mit Convrs erzeugen"] },
    { type: "p", content: ["Der Convrs-QR-Generator läuft vollständig im Browser — Größe, Fehlerkorrektur, optional Logo, Export als PNG oder SVG. Kein Server beteiligt."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Códigos QR explicados: cómo funcionan y cómo mantenerse seguro",
    eyebrow: "Herramientas",
    description:
      "Los códigos QR ponen una URL, un producto o un pago en un cuadrado que el móvil escanea al instante. Aprende a generarlos bien.",
    excerpt:
      "Qué hay dentro de esos cuadrados, cómo hacer códigos escaneables y protección contra estafas QR.",
    readingTime: "6 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["El código QR — respuesta rápida — empaqueta texto, URLs, contactos o pagos en un cuadrado que la cámara lee en milisegundos. Esta guía explica qué contienen y las dos caras de la seguridad QR."] },
    { type: "h2", content: ["Qué almacena un código QR"] },
    { type: "p", content: ["Un QR es un código de barras 2D: módulos en una cuadrícula, con marcadores de posición en tres esquinas. El contenido son datos ordinarios: casi siempre una URL, pero también texto, credenciales WiFi, vCards o cadenas de pago."] },
    { type: "h2", content: ["Qué hace escaneable un código"] },
    { type: "list", items: [
      [{ text: "Contraste: ", bold: true }, { text: "módulos oscuros sobre fondo claro." }],
      [{ text: "Zona de silencio: ", bold: true }, { text: "deja espacio libre alrededor." }],
      [{ text: "Corrección de errores: ", bold: true }, { text: "15–25 % soporta daños pequeños." }],
      [{ text: "Prueba: ", bold: true }, { text: "escanea tus códigos antes de publicarlos." }],
    ]},
    { type: "h2", content: ["Seguridad: phishing QR"] },
    { type: "p", content: ["Cualquiera puede codificar cualquier cosa. Un QR puede llevar a una página de login falsa o a malware. Revisa la URL en la vista previa de la cámara y nunca introduzcas contraseñas en páginas alcanzadas por un QR desconocido."] },
    { type: "h2", content: ["Generar códigos QR con Convrs"] },
    { type: "p", content: ["El generador de Convrs funciona íntegramente en el navegador: tamaño, corrección de errores, logo opcional, exportación PNG o SVG. Ningún servidor participa."] },
  ],
};

const qrCodeGuide: GuideDefinition = {
  slug: "qr-code-guide",
  content: { en, tr, de, es },
};

export default qrCodeGuide;