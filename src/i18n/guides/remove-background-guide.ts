import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Removing Image Backgrounds: Transparency, Cutouts and Best Practices",
    eyebrow: "Image",
    description:
      "Removing a background turns a photo into a cutout you can place anywhere — on a product page, a presentation, or a transparent PNG. Learn when to remove, how to get clean edges, and why doing it in your browser is safer.",
    excerpt:
      "Clean product cutouts and transparent PNGs: how background removal works and how to get crisp edges.",
    readingTime: "7 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Background removal is one of the most common image editing tasks. E‑commerce sellers need product photos on clean white (or transparent) backgrounds. Designers need people and objects lifted out of their surroundings for compositions. Marketers need consistent visuals for social posts. This guide covers the technique, what makes a good result, and the privacy advantage of doing it locally."] },

    { type: "h2", content: ["When to remove a background"] },
    { type: "list", items: [
      [{ text: "Product photography: ", bold: true }, { text: "marketplaces like Amazon and Etsy require either white or transparent backgrounds for consistency." }],
      [{ text: "Presentations and documents: ", bold: true }, { text: "a clean cutout draws the eye to the subject instead of the mess behind it." }],
      [{ text: "Design compositions: ", bold: true }, { text: "placing a subject over new scenery needs the original background gone." }],
      [{ text: "Logos and icons: ", bold: true }, { text: "a transparent PNG logo sits naturally on any background color." }],
    ]},
    { type: "p", content: ["The result is almost always a transparent PNG (or a solid color fill). Transparency is stored as an alpha channel in formats like PNG and WebP; JPEG, which has no alpha channel, cannot carry transparent backgrounds."] },

    { type: "h2", content: ["How background removal works"] },
    { type: "p", content: ["Automatic tools analyze the contrast between the subject and its background — edges, color differences, and texture boundaries all contribute. Simple cases (a subject on a plain, high-contrast backdrop) give essentially perfect results. Difficult cases include hairs and fur, transparent or glass objects, and subjects that blend into their background, all of which need manual refinement in a full editor."] },
    { type: "note", tone: "warning", title: "Best results come from good source photos", content: [
      "Shoot with the subject clearly separated from the background. Even lighting, a contrasting backdrop, and no objects touching the subject's edges produce dramatically cleaner cutouts than a busy scene."
    ]},

    { type: "h2", content: ["Getting clean edges"] },
    { type: "p", content: ["The quality of a cutout lives in its edges. Ragged or haloed edges betray amateur processing. To get clean results:"] },
    { type: "list", items: [
      ["Start from a high-resolution source — a larger image gives the algorithm more information to work with."],
      ["Choose a source where the boundary between subject and background is clear."],
      ["After removal, preview the cutout against white, black and a mid-gray to reveal any fringe or leftover background."],
    ]},

    { type: "h2", content: ["Where the processed image can go"] },
    { type: "p", content: ["A transparent PNG is portable: place it on product pages, drop it into presentations, layer it in a design tool, or use it as a favicon. If a platform requires JPEG, you can flatten the cutout onto a white background and export as JPEG — the classic workflow for marketplace listings."] },

    { type: "h2", content: ["Removing backgrounds in Convrs"] },
    { type: "p", content: ["Convrs includes a background remover that processes entirely in your browser. You select a photo, the tool separates the subject, and you download a transparent PNG. Because everything runs locally with WebAssembly:"] },
    { type: "list", items: [
      ["Your photos are never uploaded to a server."],
      ["No account, no wait queue, no daily limits."],
      ["The same image can then flow into other Convrs tools — resize, compress, or convert to another format — without leaving your device."],
    ]},
    { type: "p", content: ["Whether you're preparing a shop listing or building a design composition, background removal done locally keeps your images private and your workflow uninterrupted."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Görselden Arka Plan Silme: Şeffaflık, Kesim ve En İyi Uygulamalar",
    eyebrow: "Görsel",
    description:
      "Arka plan silme, bir fotoğrafı her yere yerleştirebileceğiniz bir kesime dönüştürür — ürün sayfası, sunum veya şeffaf PNG. Tarayıcınızda yapmanın avantajlarını öğrenin.",
    excerpt:
      "Temiz ürün kesimleri ve şeffaf PNG'ler: arka plan silme nasıl çalışır, keskin kenarlar nasıl alınır.",
    readingTime: "7 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Arka plan silme, en yaygın görsel düzenleme görevlerinden biridir. E-ticaret satıcıları ürün fotoğraflarını temiz beyaz (veya şeffaf) zeminde sunmalıdır. Tasarımcılar kompozisyon için nesneleri çevresinden ayırmalıdır. Bu rehber tekniği, kaliteli sonucun ne olduğunu ve işlemi yerel yapmanın gizlilik avantajını anlatır."] },

    { type: "h2", content: ["Arka plan ne zaman silinir?"] },
    { type: "list", items: [
      [{ text: "Ürün fotoğrafçılığı: ", bold: true }, { text: "pazaryerleri tutarlılık için beyaz veya şeffaf zemin ister." }],
      [{ text: "Sunumlar: ", bold: true }, { text: "temiz bir kesim dikkati konuya çeker." }],
      [{ text: "Tasarım kompozisyonları: ", bold: true }, { text: "nesneyi yeni bir zemin üzerine yerleştirmek için eski zemin gider." }],
      [{ text: "Logolar: ", bold: true }, { text: "şeffaf PNG logo her zemin rengine uyum sağlar." }],
    ]},
    { type: "p", content: ["Sonuç neredeyse her zaman şeffaf bir PNG'dir. Şeffaflık, PNG ve WebP gibi biçimlerdeki alfa kanalında saklanır; JPEG'de alfa kanalı olmadığı için şeffaf zemin taşıyamaz."] },

    { type: "h2", content: ["Arka plan silme nasıl çalışır?"] },
    { type: "p", content: ["Otomatik araçlar konu ile zemin arasındaki kontrastı analiz eder. Düz, yüksek kontrastlı bir zemin üzerindeki konu neredeyse kusursuz sonuç verir. Saç, kürk, şeffaf nesneler ve zemine karışan konular ise elle düzenleme gerektirir."] },
    { type: "note", tone: "warning", title: "En iyi sonuç iyi kaynak fotoğraftan gelir", content: [
      "Konuyu zeminden net şekilde ayırın. Eşit ışık, kontrastlı zemin ve konunun kenarlarına temas etmeyen nesneler çok daha temiz kesimler üretir."
    ]},

    { type: "h2", content: ["Temiz kenarlar elde etmek"] },
    { type: "list", items: [
      ["Yüksek çözünürlüklü bir kaynaktan başlayın."],
      ["Konu-zemin sınırının net olduğu bir kaynak seçin."],
      ["Kesim sonrası sonucu beyaz, siyah ve orta gri zeminlerde önizleyerek artıkları fark edin."],
    ]},

    { type: "h2", content: ["Convrs ile arka plan silme"] },
    { type: "p", content: ["Convrs arka plan silici, işlemi tamamen tarayıcınızda gerçekleştirir. Fotoğrafınız asla sunucuya yüklenmez, hesap ve günlük limit yoktur. Aynı görsel daha sonra yeniden boyutlandırma, sıkıştırma veya format dönüştürme gibi diğer Convrs araçlarına akabilir."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Hintergründe entfernen: Transparenz, Ausschnitte und Best Practices",
    eyebrow: "Bild",
    description:
      "Das Entfernen von Hintergründen verwandelt Fotos in Ausschnitte für Produktseiten, Präsentationen oder transparente PNGs — direkt im Browser.",
    excerpt:
      "Saubere Produktausschnitte und transparente PNGs: Hintergrundentfernung und scharfe Kanten.",
    readingTime: "8 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Das Entfernen von Hintergründen gehört zu den häufigsten Bildbearbeitungen: E-Commerce-Verkäufer brauchen Produktfotos auf weißem oder transparentem Grund, Designer heben Motive für Kompositionen heraus. Dieser Leitfaden erklärt Technik, Qualität und den Datenschutzvorteil lokaler Verarbeitung."] },
    { type: "h2", content: ["Wann einen Hintergrund entfernen?"] },
    { type: "list", items: [
      [{ text: "Produktfotos: ", bold: true }, { text: "Marktplätze verlangen weiße oder transparente Hintergründe." }],
      [{ text: "Präsentationen: ", bold: true }, { text: "ein sauberer Ausschnitt lenkt den Blick auf das Motiv." }],
      [{ text: "Logos: ", bold: true }, { text: "transparente PNGs passen auf jede Hintergrundfarbe." }],
    ]},
    { type: "p", content: ["Das Ergebnis ist fast immer ein transparentes PNG. Transparenz wird im Alphakanal gespeichert; JPEG kann keine transparenten Hintergründe tragen."] },
    { type: "h2", content: ["So funktioniert es"] },
    { type: "p", content: ["Automatische Werkzeuge analysieren den Kontrast zwischen Motiv und Hintergrund. Einfache Szenen liefern fast perfekte Ergebnisse; Haare, transparente Objekte und unruhige Hintergründe brauchen manuelle Nacharbeit."] },
    { type: "h2", content: ["Hintergründe mit Convrs entfernen"] },
    { type: "p", content: ["Der Convrs-Hintergrundentferner arbeitet vollständig im Browser. Fotos werden nie hochgeladen, kein Konto, keine täglichen Limits. Das Ergebnis fließt direkt in andere Convrs-Tools wie Resizer oder Kompressor."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Eliminar fondos de imágenes: transparencia, recortes y buenas prácticas",
    eyebrow: "Imagen",
    description:
      "Eliminar un fondo convierte una foto en un recorte para páginas de producto, presentaciones o PNG transparentes. Aprende cómo hacerlo en el navegador.",
    excerpt:
      "Recortes de producto y PNG transparentes: cómo funciona y cómo lograr bordes nítidos.",
    readingTime: "7 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Eliminar el fondo es una de las tareas de edición más comunes: los vendedores de e-commerce necesitan fotos sobre fondo blanco o transparente, los diseñadores aíslan sujetos para sus composiciones. Esta guía explica la técnica y la ventaja de privacidad de hacerlo localmente."] },
    { type: "h2", content: ["Cuándo eliminar un fondo"] },
    { type: "list", items: [
      [{ text: "Fotografía de producto: ", bold: true }, { text: "los marketplaces exigen fondos blancos o transparentes." }],
      [{ text: "Presentaciones: ", bold: true }, { text: "un recorte limpio dirige la atención al sujeto." }],
      [{ text: "Logos: ", bold: true }, { text: "un PNG transparente encaja sobre cualquier color." }],
    ]},
    { type: "p", content: ["El resultado es casi siempre un PNG transparente. La transparencia vive en el canal alfa; JPEG no puede llevar fondos transparentes."] },
    { type: "h2", content: ["Cómo funciona"] },
    { type: "p", content: ["Las herramientas automáticas analizan el contraste entre sujeto y fondo. Las escenas simples dan resultados casi perfectos; el cabello y los objetos transparentes requieren refinamiento manual."] },
    { type: "h2", content: ["Eliminar fondos con Convrs"] },
    { type: "p", content: ["El eliminador de fondos de Convrs funciona íntegramente en el navegador. Sin subidas, sin cuentas, sin límites diarios. El resultado fluye hacia otras herramientas de Convrs."] },
  ],
};

const removeBackgroundGuide: GuideDefinition = {
  slug: "remove-background-guide",
  content: { en, tr, de, es },
};

export default removeBackgroundGuide;