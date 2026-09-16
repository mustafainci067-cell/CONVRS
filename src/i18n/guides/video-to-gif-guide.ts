import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Video to GIF Conversion: Size, Timing and Quality",
    eyebrow: "Media",
    description:
      "GIFs are the internet's favorite short loop — but converting video to GIF the wrong way produces hideous 50 MB monsters. Learn how to pick the right segment, frame rate and colors for small, crisp GIFs.",
    excerpt:
      "Turn any clip into a crisp, small GIF: segment, framerate, palette and size, done in the browser.",
    readingTime: "7 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["A good GIF is a small miracle: a few seconds of looping motion with none of the heft of video. A bad GIF is a multi-megabyte monster that makes any page crawl. The difference is not luck — it is a handful of decisions you make before converting. This guide walks through segmenting, frame rate, color count and resolution so your GIFs always come out clean and light."] },

    { type: "h2", content: ["Why GIFs are big (and how to shrink them)"] },
    { type: "p", content: ["GIF is an old format. It compresses flat color regions well but has no true video compression, so file size scales almost linearly with three things: resolution, frame rate and duration. That is actually good news — those are all dials you control. Halving the playback area roughly halves the size; dropping from 30 to 15 frames per second roughly halves it again."] },

    { type: "h2", content: ["Choose the right source clip first"] },
    { type: "list", items: [
      ["Trim to the smallest segment that tells the story — 2 to 5 seconds is the sweet spot for most reactions and demos."],
      ["Pick a moment with limited camera movement; heavy panning creates muddy, huge GIFs."],
      ["Prefer high-contrast, well-lit source video for clean palette conversion."],
    ]},

    { type: "h2", content: ["Frame rate: fewer frames, same motion"] },
    { type: "p", content: ["Human perception can't tell 24 fps from 12 fps in most GIF content. For web loops, 10–15 fps looks natural and halves or third the file size versus 30 fps. Reserve 24 fps for GIFs that intentionally need buttery motion, and even then question whether your subject moves that much."] },

    { type: "h2", content: ["Resolution: right-size the loop"] },
    { type: "p", content: ["GIFs rarely need to be full screen. A 480–640 px wide loop displays cleanly in a chat or article and is dramatically smaller than a 1080p export. Start from the size where the content is still readable and go down from there."] },

    { type: "h2", content: ["Colors: the GIF palette"] },
    { type: "p", content: ["GIF supports a maximum of 256 colors carried in a palette. Choosing fewer colors (128, 64, or even 32) can shrink the file substantially with a barely visible change for flat cartoon-style content, while photos with smooth gradients degrade faster. When a solid color background dominates, you can often reduce the palette aggressively without anyone noticing."] },

    { type: "h2", content: ["A quick formula for small GIFs"] },
    { type: "list", ordered: true, items: [
      [{ text: "Trim ", bold: true }, { text: "to 2–5 seconds of the most expressive moment." }],
      [{ text: "Set 12–15 fps ", bold: true }, { text: "unless the motion demands more." }],
      [{ text: "Resize ", bold: true }, { text: "to 480–640 px wide." }],
      [{ text: "Reduce colors ", bold: true }, { text: "to 128 or 64 and preview." }],
      [{ text: "Preview ", bold: true }, { text: "the loop in-page to confirm quality before exporting." }],
    ]},
    { type: "note", tone: "success", title: "The preview is your quality gate", content: [
      "Never export blind. Tools with live preview let you see how the trim, fps and palette choices look before committing to a download."
    ]},

    { type: "h2", content: ["Video to GIF in Convrs"] },
    { type: "p", content: ["Convrs converts video to GIF entirely in the browser: you select the source clip, choose the segment and output settings, preview it, and export a clean GIF. Because everything runs locally with WebAssembly, there is no upload — a real advantage when the source is a private recording or an unreleased product demo."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Video'dan GIF Dönüştürme: Boyut, Zamanlama ve Kalite",
    eyebrow: "Medya",
    description:
      "GIF'ler internetin en sevdiği kısa döngüdür — ancak yanlış dönüştürme, korkunç 50 MB'lık canavarlar üretir. Doğru parçayı, kare hızını ve renkleri nasıl seçeceğinizi öğrenin.",
    excerpt:
      "Herhangi bir klibi keskin, küçük bir GIF'e dönüştürün: parça, kare hızı, palet ve boyut — tarayıcıda.",
    readingTime: "7 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["İyi bir GIF küçük bir mucizedir: video ağırlığı olmadan birkaç saniyelik döngü. Kötü bir GIF ise sayfayı yavaşlatan çok megabaytlık bir canavardır. Fark şans değil — dönüştürmeden önce verdiğiniz bir avuç karardır. Bu rehber; parça seçme, kare hızı, renk sayısı ve çözünürlüğü adım adım anlatır."] },

    { type: "h2", content: ["GIF'ler neden büyüktür (ve nasıl küçültülür)"] },
    { type: "p", content: ["GIF eski bir biçimdir. Düz renk bölgelerini iyi sıkıştırır, ancak gerçek video sıkıştırması yoktur; bu yüzden dosya boyutu kabaca üç şeyle ölçeklenir: çözünürlük, kare hızı ve süre. İyi haber: bunların hepsi kontrol ettiğiniz kollar. Oynatma alanını yarıya indirmek boyutu kabaca yarıya indirir; 30'dan 15 kare/saniyeye düşmek de öyle."] },

    { type: "h2", content: ["Önce doğru kaynak klibi seçin"] },
    { type: "list", items: [
      ["Hikâyeyi anlatan en küçük parçayı kesin — 2–5 saniye çoğu tepki ve demo için ideal."],
      ["Kamera hareketinin sınırlı olduğu anları seçin; ağır pan hareketi bulanık ve dev GIF üretir."],
      ["Temiz palet dönüşümü için yüksek kontrastlı, iyi aydınlatılmış kaynak tercih edin."],
    ]},

    { type: "h2", content: ["Kare hızı: daha az kare, aynı hareket"] },
    { type: "p", content: ["Çoğu GIF içeriğinde insan algısı 24 ile 12 fps arasını ayırt edemez. Web döngüleri için 10–15 fps doğal görünür ve dosya boyutunu 30 fps'ye kıyasla yarıya hatta üçte bire indirir."] },

    { type: "h2", content: ["Renkler: GIF paleti"] },
    { type: "p", content: ["GIF bir palette taşınan en fazla 256 renk destekler. Daha az renk seçmek (128, 64 veya 32) dosyayı belirgin şekilde küçültür; düz çizgi-film tarzı içeriklerde değişim zar zor fark edilir. Düz renk fon dominantsa paleti agresifçe azaltabilirsiniz."] },

    { type: "h2", content: ["Küçük GIF'ler için hızlı formül"] },
    { type: "list", ordered: true, items: [
      [{ text: "Kes: ", bold: true }, { text: "en ifade edici 2–5 saniyeye indirin." }],
      [{ text: "12–15 fps ayarla: ", bold: true }, { text: "hareket daha fazlasını gerektirmedikçe." }],
      [{ text: "Boyutlandır: ", bold: true }, { text: "480–640 px genişliğe ayarlayın." }],
      [{ text: "Renkleri azalt: ", bold: true }, { text: "128 veya 64'e indirip önizleyin." }],
      [{ text: "Önizle: ", bold: true }, { text: "dışa aktarmadan önce döngüyü sayfada doğrulayın." }],
    ]},
    { type: "note", tone: "success", title: "Önizleme kalite kapınızdır", content: [
      "Kör dışa aktarmayın. Canlı önizlemeli araçlar, indirmeden önce kesim, fps ve palet seçimlerinin nasıl göründüğünü göstermelidir."
    ]},

    { type: "h2", content: ["Convrs'te Video → GIF"] },
    { type: "p", content: ["Convrs, videoyu tamamen tarayıcıda GIF'e dönüştürür: kaynak klibi seçersiniz, parça ve çıktı ayarlarını belirlersiniz, önizler ve temiz bir GIF indirirsiniz. Her şey yerel WebAssembly ile çalıştığı için yükleme yoktur."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Video in GIF konvertieren: Größe, Timing und Qualität",
    eyebrow: "Medien",
    description:
      "GIFs sind die Lieblingsloops des Internets — aber falsche Konvertierung erzeugt Monstergrößen. Lernen Sie Segment, Bildrate und Farben richtig zu wählen.",
    excerpt:
      "Jeden Clip in ein klares, kleines GIF verwandeln: Segment, Bildrate, Palette — im Browser.",
    readingTime: "8 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Ein gutes GIF ist ein kleines Wunder; ein schlechtes ein Megabyte-Monster. Der Unterschied liegt in ein paar Entscheidungen vor der Konvertierung: Segment, Bildrate, Farben und Auflösung. Dieser Leitfaden zeigt sie alle."] },
    { type: "h2", content: ["Warum GIFs groß sind"] },
    { type: "p", content: ["GIF hat keine echte Videokompression; Die Dateigröße skaliert mit Auflösung, Bildrate und Dauer. Halbierte Fläche → halbe Größe; 30 auf 15 fps → halbe Größe."] },
    { type: "h2", content: ["Das richtige Quellsegment"] },
    { type: "list", items: [
      ["Auf 2–5 Sekunden zuschneiden."],
      ["Momente mit geringen Kamerabewegungen wählen."],
      ["Kontrastreiches, gut beleuchtetes Quellmaterial bevorzugen."],
    ]},
    { type: "h2", content: ["Bildrate und Farben"] },
    { type: "p", content: ["10–15 fps sehen für Web-Loops natürlich aus und halbieren die Dateigröße. Weniger Farben (128/64) schrumpfen GIFs merklich, besonders bei flachen Inhalten."] },
    { type: "h2", content: ["Video zu GIF mit Convrs"] },
    { type: "p", content: ["Convrs konvertiert Video zu GIF vollständig im Browser — Segment wählen, Vorschau, Export. Ohne Upload, ideal für private Aufnahmen."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Conversión de video a GIF: tamaño, tiempo y calidad",
    eyebrow: "Multimedia",
    description:
      "Los GIF son los bucles favoritos de internet, pero una mala conversión produce monstruos de megabytes. Aprende a elegir segmento, FPS y colores.",
    excerpt:
      "Convierte cualquier clip en un GIF nítido y pequeño: segmento, FPS, paleta — en el navegador.",
    readingTime: "7 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Un buen GIF es un pequeño milagro; uno malo, un monstruo de megabytes. La diferencia está en unas pocas decisiones antes de convertir: segmento, FPS, colores y resolución."] },
    { type: "h2", content: ["Por qué los GIF pesan"] },
    { type: "p", content: ["GIF no tiene compresión de video real; el tamaño escala con resolución, FPS y duración. Mitad de área → mitad de peso; de 30 a 15 FPS → mitad de peso."] },
    { type: "h2", content: ["Elegir el clip correcto"] },
    { type: "list", items: [
      ["Recorta a 2–5 segundos."],
      ["Evita cámaras con mucho movimiento."],
      ["Prefiere material contrastado y bien iluminado."],
    ]},
    { type: "h2", content: ["FPS y colores"] },
    { type: "p", content: ["10–15 FPS se ven naturales y reducen el peso a la mitad. Menos colores (128/64) encogen los GIF, especialmente en contenido plano."] },
    { type: "h2", content: ["Video a GIF con Convrs"] },
    { type: "p", content: ["Convrs convierte video a GIF íntegramente en el navegador: segmento, vista previa, exportación. Sin subidas."] },
  ],
};

const videoToGifGuide: GuideDefinition = {
  slug: "video-to-gif-guide",
  content: { en, tr, de, es },
};

export default videoToGifGuide;