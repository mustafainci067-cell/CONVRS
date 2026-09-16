import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Base64 Encoding Explained: When and Why to Use It",
    eyebrow: "Developer",
    description:
      "Base64 turns binary data into a safe alphabet of ASCII characters so it can travel through text-only channels: emails, URLs, JSON and HTML. Learn how it works, when it helps, and when it is the wrong tool.",
    excerpt:
      "Binary → text without corruption: how Base64 works and where it actually earns its keep.",
    readingTime: "6 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Base64 is one of those tools developers use daily without thinking twice — and frequently misuse. It encodes binary data (images, files, raw bytes) into a subset of printable ASCII characters, so the data can survive channels that only understand text. This guide explains the mechanics, the legitimate uses, and the common mistake everyone makes with it."] },

    { type: "h2", content: ["How Base64 works"] },
    { type: "p", content: ["The name gives the trick away: the encoding uses a 64-character alphabet (A–Z, a–z, 0–9, + and /), plus = for padding. Every three bytes of input become four characters of output, so the result is about 33% larger than the source. The point is not compression — it is survival: those 64 characters are the ones that survive email, URLs, JSON strings and old protocols without corruption, while raw binary (with its control bytes) frequently does not."] },
    { type: "code", lang: "text", content: "Raw bytes:\n  01001000 01100101 01101100 01101100 01101111\nBase64:  \n  SGV (<- 3 bytes) bGxv (<- next 3) ..." },
    { type: "p", content: ["Because the output is pure ASCII text, a Base64-encoded image can be pasted into a JSON field, embedded inline in HTML or CSS, attached to an email, or put in a URL parameter without breaking anything."] },

    { type: "h2", content: ["Legitimate uses"] },
    { type: "list", items: [
      [{ text: "Data URIs: ", bold: true }, { text: "embedding a small image directly into HTML or CSS as data:image/png;base64,... removes an extra HTTP request." }],
      [{ text: "JSON payloads: ", bold: true }, { text: "APIs that must carry files inside a JSON body use Base64 because JSON has no binary type." }],
      [{ text: "Email attachments (MIME): ", bold: true }, { text: "the classic use — email is text, so binary attachments are Base64-encoded before transmission." }],
      [{ text: "Encoding safe identifiers: ", bold: true }, { text: "turning a binary hash or token into a URL-safe, printable form (often the 'Base64Url' variant)." }],
    ]},

    { type: "h2", content: ["When not to use it"] },
    { type: "note", tone: "warning", title: "Base64 is not compression, and not encryption", content: [
      "It makes data ~33% larger. It does not hide content — anyone can decode it. Use it to carry binary through text channels, not to save space or secure data. For moving large files between systems, prefer the actual binary transfer."
    ]},
    { type: "p", content: ["A classic anti-pattern is embedding large images into HTML as Base64 data URIs 'to save a request' — for anything beyond a few kilobytes, the extra 33% payload and bloated, uncacheable markup cost more than the saved request. Keep small icons inline; keep real images as files."] },

    { type: "h2", content: ["Base64Url and padding"] },
    { type: "p", content: ["In URLs, the + and / characters have special meaning, so a fixed variant — Base64Url — substitutes - and _ and trims the trailing = padding. JWT tokens are Base64Url-encoded, which is why the characters you see there differ from standard Base64."] },

    { type: "h2", content: ["Encoding in the browser"] },
    { type: "p", content: ["Encoding and decoding are pure, reversible computations with no server involvement required. A browser-based tool handles text inputs and file inputs alike, converting in place and instantly — which is especially useful for turning an image into a data URI you can paste into CSS, or decoding a chunk of Base64 you were handed in an API payload to see what is actually inside."] },

    { type: "h2", content: ["Base64 tools in Convrs"] },
    { type: "list", items: [
      [{ text: "Base64 encoder/decoder ", bold: true }, { text: "handles both directions for text and files." }],
      [{ text: "Image to Base64 ", bold: true }, { text: "produces a data URI ready to embed." }],
    ]},
    { type: "p", content: ["Both run entirely client-side; nothing you encode or decode is ever transmitted."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Base64 Kodlama: Ne Zaman ve Neden Kullanılır?",
    eyebrow: "Geliştirici",
    description:
      "Base64, ikili veriyi yalnızca metin anlayan kanallardan geçebilmesi için güvenli bir ASCII alfabesine çevirir: e-postalar, URL'ler, JSON ve HTML. Nasıl çalıştığını öğrenin.",
    excerpt:
      "Bozulmadan ikili → metin: Base64 nasıl çalışır ve gerçekten nerede işe yarar.",
    readingTime: "6 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Base64, geliştiricilerin günlük kullandığı — ve sık sık yanlış kullanılan — araçlardan biridir. İkili veriyi (görseller, dosyalar, ham baytlar) yazdırılabilir ASCII karakterlerinin bir alt kümesine kodlar; böylece veri yalnızca metni anlayan kanallarda hayatta kalır. Bu rehber mekanikleri, meşru kullanımları ve herkesin yaptığı yaygın hatayı anlatır."] },

    { type: "h2", content: ["Base64 nasıl çalışır?"] },
    { type: "p", content: ["Adı ipucunu verir: kodlama 64 karakterlik bir alfabe kullanır (A–Z, a–z, 0–9, + ve /), artı dolgu için =. Girdinin her üç baytı, çıktının dört karakteri olur; sonuç kaynaktan yaklaşık %33 büyüktür. Amaç sıkıştırma değil hayatta kalmadır: bu 64 karakter, e-posta, URL, JSON ve eski protokollerde bozulmadan hayatta kalan karakterlerdir."] },

    { type: "h2", content: ["Meşru kullanımlar"] },
    { type: "list", items: [
      [{ text: "Data URI'ler: ", bold: true }, { text: "küçük bir görseli HTML/CSS içine data:image/png;base64,... olarak gömmek ekstra HTTP isteğini kaldırır." }],
      [{ text: "JSON payload'ları: ", bold: true }, { text: "JSON'ın ikili türü olmadığı için API'ler dosyaları Base64 ile taşır." }],
      [{ text: "E-posta ekleri (MIME): ", bold: true }, { text: "klasik kullanım — e-posta metindir, ikili ekler iletimden önce Base64 kodlanır." }],
    ]},

    { type: "h2", content: ["Ne zaman kullanılmamalı?"] },
    { type: "note", tone: "warning", title: "Base64 sıkıştırma değil, şifreleme de değildir", content: [
      "Veriyi %33 büyütür. İçeriği gizlemez — herkes çözebilir. Veriyi metin kanallarından taşımak için kullanın; yer veya güvenlik kazanmak için değil."
    ]},
    { type: "p", content: ["Klasik bir anti-örnek: 'bir istek kurtarmak için' büyük görselleri Base64 data URI'si olarak gömmek. Birkaç kilobaytın ötesinde, ekstra %33 yük ve şişmiş işaretleme, kurtardığınızdan daha pahalıya mal olur. Küçük ikonları satır içi tutun; gerçek görselleri dosya olarak saklayın."] },

    { type: "h2", content: ["Base64Url ve dolgu"] },
    { type: "p", content: ["URL'lerde + ve / karakterleri özel anlam taşır; bu yüzden sabit bir varyant — Base64Url — - ve _ koyar ve sondaki = dolgusu kırpılır. JWT token'ları Base64Url kodludur."] },

    { type: "h2", content: ["Tarayıcıda kodlama"] },
    { type: "p", content: ["Kodlama ve çözme, sunucu gerektirmeyen saf, tersine çevrilebilir hesaplamalardır. Tarayıcı tabanlı bir araç metin ve dosya girdilerini yerinde, anında işler. Convrs, Base64 kodlayıcı/çözücü ve Image → Base64 araçlarını sunar — ikisi de tamamen istemci tarafında çalışır."] },

    { type: "h2", content: ["Convrs Base64 araçları"] },
    { type: "list", items: [
      [{ text: "Base64 kodlayıcı/çözücü ", bold: true }, { text: "metin ve dosyalar için her iki yönü de işler." }],
      [{ text: "Görsel → Base64 ", bold: true }, { text: "gömmeye hazır bir data URI üretir." }],
    ]},
    { type: "p", content: ["Her ikisi de tamamen istemci tarafında çalışır; kodladığınız veya çözdüğünüz hiçbir şey asla iletilmez."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Base64-Kodierung erklärt: Wann und warum verwenden",
    eyebrow: "Entwickler",
    description:
      "Base64 wandelt Binärdaten in ein sicheres ASCII-Alphabet um, damit sie reine Textkanäle überleben: E-Mails, URLs, JSON und HTML.",
    excerpt:
      "Binär → Text ohne Korruption: wie Base64 funktioniert und wo es sich wirklich lohnt.",
    readingTime: "7 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Base64 ist ein tägliches Werkzeug — und wird oft falsch eingesetzt. Es kodiert Binärdaten in druckbares ASCII, damit sie textbasierte Kanäle überleben. Diese Anleitung erklärt Mechanik, sinnvolle Verwendungen und den häufigen Fehler."] },
    { type: "h2", content: ["Wie Base64 funktioniert"] },
    { type: "p", content: ["Der Name verrät es: ein 64-Zeichen-Alphabet (A–Z, a–z, 0–9, +, /) plus = für Padding. Drei Eingabebytes werden zu vier Ausgabezeichen — etwa 33 % größer. Es geht um Überleben, nicht um Kompression."] },
    { type: "h2", content: ["Sinnvolle Anwendungen"] },
    { type: "list", items: [
      [{ text: "Data-URIs: ", bold: true }, { text: "kleine Bilder direkt in HTML/CSS einbetten." }],
      [{ text: "JSON-Payloads: ", bold: true }, { text: "Dateien in JSON-Bodies übertragen." }],
      [{ text: "E-Mail-Anhänge (MIME): ", bold: true }, { text: "der klassische Einsatz." }],
    ]},
    { type: "note", tone: "warning", title: "Base64 ist weder Kompression noch Verschlüsselung", content: [
      "Es macht Daten 33 % größer und verbirgt nichts. Für große Dateien den echten Binärtransfer bevorzugen."
    ]},
    { type: "h2", content: ["Base64 in Convrs"] },
    { type: "list", items: [
      [{ text: "Base64-Encoder/Decoder ", bold: true }, { text: "beide Richtungen für Text und Dateien." }],
      [{ text: "Bild zu Base64 ", bold: true }, { text: "erzeugt eine Data-URI." }],
    ]},
    { type: "p", content: ["Alles läuft clientseitig; nichts wird übertragen."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Codificación Base64 explicada: cuándo y por qué usarla",
    eyebrow: "Desarrollador",
    description:
      "Base64 convierte datos binarios en un alfabeto ASCII seguro para que viajen por canales de texto: correos, URLs, JSON y HTML.",
    excerpt:
      "Binario → texto sin corrupción: cómo funciona Base64 y dónde rinde.",
    readingTime: "6 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Base64 es una herramienta cotidiana — y a menudo mal usada. Codifica datos binarios en ASCII imprimible para que sobrevivan en canales de texto. Esta guía explica la mecánica, los usos legítimos y el error común."] },
    { type: "h2", content: ["Cómo funciona"] },
    { type: "p", content: ["El nombre lo revela: un alfabeto de 64 caracteres (A–Z, a–z, 0–9, +, /) más = de relleno. Tres bytes de entrada se convierten en cuatro caracteres: unos 33 % más grande. No es compresión, es supervivencia."] },
    { type: "h2", content: ["Usos legítimos"] },
    { type: "list", items: [
      [{ text: "Data URIs: ", bold: true }, { text: "incrustar imágenes pequeñas en HTML/CSS." }],
      [{ text: "JSON: ", bold: true }, { text: "llevar archivos en cuerpos JSON." }],
      [{ text: "Correo (MIME): ", bold: true }, { text: "el uso clásico." }],
    ]},
    { type: "note", tone: "warning", title: "Base64 no es compresión ni cifrado", content: [
      "Agranda los datos un 33 % y no oculta nada. Para archivos grandes, prefiere la transferencia binaria."
    ]},
    { type: "h2", content: ["Base64 en Convrs"] },
    { type: "list", items: [
      [{ text: "Codificador/decodificador ", bold: true }, { text: "ambas direcciones." }],
      [{ text: "Imagen a Base64 ", bold: true }, { text: "genera una Data URI." }],
    ]},
    { type: "p", content: ["Todo corre en el navegador; nada se transmite."] },
  ],
};

const base64Guide: GuideDefinition = {
  slug: "base64-guide",
  content: { en, tr, de, es },
};

export default base64Guide;