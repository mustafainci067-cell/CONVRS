import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Color Conversion Explained: HEX, RGB and HSL Without the Confusion",
    eyebrow: "Design",
    description:
      "HEX, RGB and HSL are three different languages for saying the same color. Understand what each one actually means, how to convert between them by hand or in code, and how to pick accessible contrast with a little math instead of guessing.",
    excerpt:
      "Three ways of writing the same color: what HEX, RGB and HSL really say, how to convert between them, and how to check contrast like a pro.",
    readingTime: "9 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: [
      "A client sends back a design with a precise brand blue and asks, \"can you export this as a color code?\". The designer wrote it as ",
      { text: "HSL(225, 80%, 47%)", code: true },
      ", the developer's CSS wants ",
      { text: "#2f6fed", code: true },
      ", and both people are talking about the exact same color. This is the entire reason color conversion exists: three notations, one reality. This guide walks through what each format means, how to convert between them confidently, and the few rules that stop you making unreadable color choices.",
    ]},

    { type: "h2", content: ["The three models you will actually meet"] },
    { type: "p", content: ["Every color on a screen is produced by mixing red, green and blue light. What differs is how we describe the mix:"] },
    { type: "list", items: [
      [{ text: "HEX", code: true }, { text: " is the web's shorthand — the RGB values squeezed into six hex digits." }],
      [{ text: "RGB", code: true }, { text: " spells the red, green and blue amounts out as three 0–255 numbers." }],
      [{ text: "HSL", code: true }, { text: " names the color by its hue, its saturation and its lightness — the way a human tends to think about it." }],
    ]},
    { type: "p", content: ["None of these is more \"correct\". They are different tools: pick the one that makes the current task easiest to reason about."] },

    { type: "h2", content: ["HEX: where the six digits come from"] },
    { type: "p", content: [
      "A value like ",
      { text: "#2f6fed", code: true },
      " is just three two-digit numbers glued together. Split it: ",
      { text: "2f", code: true },
      " is the red amount, ",
      { text: "6f", code: true },
      " the green, ",
      { text: "ed", code: true },
      " the blue. The catch is the digits go from ",
      { text: "0–9", code: true },
      " to ",
      { text: "a–f", code: true },
      " (hexadecimal), so ",
      { text: "2f", code: true },
      " means 2 × 16 + 15 = 47. That number then maps directly onto the 0–255 scale: ",
      { text: "hex 2f → 47 → rgb(47, ...)", code: true },
      ".",
    ]},
    { type: "p", content: [
      "When the three pairs are all doubled digits — like ",
      { text: "#aabbcc", code: true },
      " — you can shorten it to three digits: ",
      { text: "#abc", code: true },
      ". Browsers treat the two forms as identical, and the short form is standard in Tailwind's ",
      { text: "bg-red-500", code: true },
      " utilities. A common beginner trap is expecting ",
      { text: "#ffffff", code: true },
      " to be grey; it is pure white, while ",
      { text: "#808080", code: true },
      " is mid grey.",
    ]},

    { type: "h2", content: ["RGB: the 0–255 numbers screens actually use"] },
    { type: "p", content: [
      "When you see ",
      { text: "rgb(47, 111, 237)", code: true },
      ", read it as \"47 units of red light, 111 of green, 237 of blue\". Zero is off, 255 is full brightness, and a modern display mixes those three channels to produce the color. Everything else — including HEX and HSL — is a convenience layer over these three numbers.",
    ]},
    { type: "p", content: [
      "The numbers look meaningless until you connect them to experience. A color where all three channels are equal — ",
      { text: "rgb(200,200,200)", code: true },
      " — is a shade of grey. The brightness of any RGB color is roughly the average of the three channels: raise them together and the color lightens toward white. Once that sticks, reading RGB gets much easier.",
    ]},

    { type: "h2", content: ["HSL: the model your intuition wants"] },
    { type: "p", content: [
      "HSL describes a color the way people actually describe colors. ",
      { text: "Hue", bold: true },
      " is the angle on the color wheel — 0° red, 120° green, 240° blue — so you can pick \"the red over there\" without computing numbers.",
      { text: " Saturation", bold: true },
      " is how vivid the color is, from grey (0%) to pure color (100%).",
      { text: " Lightness", bold: true },
      " runs from black (0%) to white (100%), with 50% being the \"normal\" vivid version of the color.",
    ]},
    { type: "p", content: [
      "This makes HSL the right model for design work: darken a hover state by dropping lightness a few points, or mute an accent by lowering saturation, without touching hue. Trying the same tweak in HEX means recomputing three unrelated digits. That is why most color pickers, CSS gradients and design tools show HSL somewhere.",
    ]},

    { type: "h2", content: ["Converting between models"] },
    { type: "p", content: ["The conversions are mechanical. HEX → RGB is handled above; RGB → HSL just requires finding the max/min channel and deriving hue from which channel wins. In practice you will rarely write this by hand — a converter does it instantly — but the formula demystifies it:"] },
    { type: "code", lang: "js", content: `function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return "#" + [r, g, b].map(toHex).join("");
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}` },
    { type: "note", tone: "success", title: "Keep the original values", content: [
      "Conversion is lossless in principle but each model rounds differently. If a color is being reused across many files, keep the canonical value in one place and convert from it, rather than converting a converted value and letting rounding drift accumulate. Nothing matches the original hex better than the original hex.",
    ]},

    { type: "h2", content: ["Accessibility: checking contrast with math"] },
    { type: "p", content: [
      "Picking colors by eye is how unreadable interfaces happen. WCAG defines a contrast ratio between a text color and its background, from 1 (no contrast) to 21 (black on white). The practical thresholds: normal text needs 4.5:1, large text 3:1. The ratio comes from the relative luminance of the two colors, which weights the green channel heaviest because human eyes are most sensitive to it — a pure ",
      { text: "#00ff00", code: true },
      " background is far brighter to a person than ",
      { text: "#ff0000", code: true },
      ".",
    ]},
    { type: "p", content: [
      "The honest shortcut is not doing the luminance math by hand but understanding what moves the number: increasing the lightness difference between text and background almost always helps. That is why HSL is invaluable here — two colors sharing a hue are automatically harmonious, and you can raise one lightness until the contrast passes. ",
      { text: "When a client insists on a pale yellow brand color, contrast is the conversation you need to be able to have: it is not a taste question, it is a 4.5:1 question.", bold: true },
    ]},

    { type: "h2", content: ["Building and extracting palettes"] },
    { type: "p", content: [
      "The same color knowledge powers palette work. A Tailwind-style palette starts from one base color and spreads steps at fixed lightness intervals; a palette extractor takes an existing image and pulls out its dominant, visually balanced colors. Both rely on converting the source colors into a space where \"similar\" and \"distinct\" can be measured — which is why tools that let you hop between HEX, RGB and HSL, or pull colors straight from an image, save so much fiddling.",
    ]},

    { type: "h2", content: ["Color tools in Convrs"] },
    { type: "p", content: [
      "Convrs keeps all of this in the browser: ",
      { text: "the color converter", bold: true },
      " translates any HEX, RGB or HSL value into the other notations with a live preview, ",
      { text: "the color palette extractor", bold: true },
      " pulls a balanced palette out of any image, and ",
      { text: "the Tailwind palette generator", bold: true },
      " turns a single color into a full shade ramp for your design system. Your colors never leave your device, and you can copy the result straight into CSS or Tailwind configuration.",
    ]},
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Renk Dönüşümü: HEX, RGB ve HSL Kafa Karışıklığı Olmadan",
    eyebrow: "Tasarım",
    description:
      "HEX, RGB ve HSL, aynı rengi söylemenin üç farklı dilidir. Her birinin gerçekte ne anlattığını, aralarında nasıl geçiş yapılacağını ve renkleri rastgele seçmek yerine erişilebilir kontrastı nasıl hesaplayacağınızı öğrenin.",
    excerpt:
      "Aynı rengin üç yazılışı: HEX, RGB ve HSL'nin gerçekte ne söylediği, dönüştürme ve kontrast kontrolü.",
    readingTime: "9 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: [
      "Bir müşteri, üzerinde çalıştığı tasarımı geri gönderir ve \"bu rengi bir renk kodu olarak dışa aktarabilir misin?\" diye sorar. Tasarımcı rengi ",
      { text: "HSL(225, 80%, 47%)", code: true },
      " olarak yazmıştır, geliştiricinin CSS'i ise ",
      { text: "#2f6fed", code: true },
      " beklemektedir — ve ikisi de tamamen aynı renkten bahseder. Renk dönüşümünün var olma nedeni budur: üç gösterim, tek gerçeklik. Bu rehber her formatın ne anlattığını, aralarında rahatça nasıl geçileceğini ve okunaksız renk seçimlerini önleyen birkaç kuralı anlatır.",
    ]},

    { type: "h2", content: ["Karşılaşacağınız üç model"] },
    { type: "p", content: ["Ekrandaki her renk, kırmızı, yeşil ve mavi ışığın karışımıyla üretilir. Farklı olan, bu karışımı nasıl ifade ettiğimizdir:"] },
    { type: "list", items: [
      [{ text: "HEX", code: true }, { text: " web'in kısaltmasıdır — RGB değerleri altı onaltılık basamağa sıkıştırılır." }],
      [{ text: "RGB", code: true }, { text: " kırmızı, yeşil ve mavi miktarlarını üç ayrı 0–255 sayısı olarak yazar." }],
      [{ text: "HSL", code: true }, { text: " rengi ton, doygunluk ve açıklık üzerinden adlandırır — insanın düşünme biçimine en yakın olanı." }],
    ]},
    { type: "p", content: ["Hiçbir model diğerinden \"daha doğru\" değildir. Bunlar farklı araçlardır: şu anki işi en kolay düşünmeyi sağlayanı seçin."] },

    { type: "h2", content: ["HEX: altı hanenin nereden geldiği"] },
    { type: "p", content: [
      "Örneğin ",
      { text: "#2f6fed", code: true },
      " yalnızca yan yana dizilmiş üç iki haneli sayıdır. Parçalayın: ",
      { text: "2f", code: true },
      " kırmızı miktarı, ",
      { text: "6f", code: true },
      " yeşil, ",
      { text: "ed", code: true },
      " mavidir. Oyunda bir yakalama vardır: haneler ",
      { text: "0–9", code: true },
      " ve ",
      { text: "a–f", code: true },
      " (onaltılık) arasında gider, yani ",
      { text: "2f", code: true },
      ", 2 × 16 + 15 = 47 demektir. Bu sayı doğrudan 0–255 ölçeğine oturur: ",
      { text: "hex 2f → 47 → rgb(47, ...)", code: true },
      ".",
    ]},
    { type: "p", content: [
      "Üç çiftin hepsi eşit basamaklıysa — örneğin ",
      { text: "#aabbcc", code: true },
      " — kısaltıp üç haneye indirebilirsiniz: ",
      { text: "#abc", code: true },
      ". Tarayıcılar iki biçimi aynı kabul eder ve kısa biçim, Tailwind'in ",
      { text: "bg-red-500", code: true },
      " yardımcı sınıflarında standarttır. Yaygın bir acemi hatası, ",
      { text: "#ffffff", code: true },
      " değerinin gri olduğunu sanmaktır; o saf beyazdır, ",
      { text: "#808080", code: true },
      " orta gridir.",
    ]},

    { type: "h2", content: ["RGB: ekranın gerçekte kullandığı 0–255 sayıları"] },
    { type: "p", content: [
      "Örneğin ",
      { text: "rgb(47, 111, 237)", code: true },
      " gördüğünüzde \"47 birim kırmızı ışık, 111 yeşil, 237 mavi\" diye okuyun. Sıfır kapalıdır, 255 tam parlaklıktır ve modern bir ekran bu üç kanalı karıştırarak rengi üretir. Geri kalan her şey — HEX dahil — bu üç sayının üzerine kurulan bir kolaylık katmanıdır.",
    ]},
    { type: "p", content: [
      "Sayılar anlamsız görünene kadar deneyimle bağdaşmaz. Üç kanalın eşit olduğu bir renk — ",
      { text: "rgb(200,200,200)", code: true },
      " — grinin bir tonudur. Herhangi bir RGB renginin parlaklığı yaklaşık olarak üç kanalın ortalamasıdır: hepsini birlikte yükseltin, renk beyaza doğru aydınlanır. Bu sezgiselleştiğinde RGB okumak çok kolaylaşır.",
    ]},

    { type: "h2", content: ["HSL: sezginizin istediği model"] },
    { type: "p", content: [
      "HSL, rengi insanların gerçekten tarif ettiği gibi anlatır. ",
      { text: "Ton", bold: true },
      " renk çarkındaki açıdır — 0° kırmızı, 120° yeşil, 240° mavi — yani sayı hesaplamadan \"şuradaki kırmızıyı\" seçebilirsiniz.",
      { text: " Doygunluk", bold: true },
      " rengin ne kadar canlı olduğudur, gri (%0) ile saf renk (%100) arasında.",
      { text: " Açıklık", bold: true },
      " siyahtan (%0) beyaza (%100) uzanır; %50 rengin \"normal\" canlı hâlidir.",
    ]},
    { type: "p", content: [
      "Bu yüzden HSL, tasarım işlerinin doğru modelidir: üzerine gelme durumu koyu olsun diye açıklığı birkaç puan düşürün veya bir vurgu rengini yumuşatmak için doygunluğu azaltın — tona dokunmadan. Aynı ayarı HEX içinde yapmak üç alakasız haneyi yeniden hesaplamak demektir. Bu yüzden çoğu renk seçici, CSS gradyanı ve tasarım aracı bir yerlerde HSL gösterir.",
    ]},

    { type: "h2", content: ["Modeller arasında dönüştürme"] },
    { type: "p", content: ["Dönüşümler mekaniktir. HEX → RGB yukarıda açıklandı; RGB → HSL yalnızca maksimum/minimum kanalı bulmayı ve tonu kazanan kanaldan türetmeyi gerektirir. Pratikte bunu elle yazmak zorunda kalmayacaksınız — bir dönüştürücü anında halleder — ama formül meseleyi aydınlatır:"] },
    { type: "code", lang: "js", content: `function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return "#" + [r, g, b].map(toHex).join("");
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}` },
    { type: "note", tone: "success", title: "Orijinal değerleri saklayın", content: [
      "Dönüşüm ilke olarak kayıpsızdır, ancak her model farklı yuvarlar. Bir renk birçok dosyada kullanılacaksa kurallı değeri tek yerde tutun ve ondan dönüştürün; dönüştürülmüş değeri tekrar dönüştürmek yuvarlama hatalarını biriktirir. Orijinal hex'ten daha iyi bir sonuç yoktur.",
    ]},

    { type: "h2", content: ["Erişilebilirlik: kontrastı matematikle kontrol etmek"] },
    { type: "p", content: [
      "Rengi gözle seçmek, okunaksız arayüzlerin nasıl ortaya çıktığıdır. WCAG, bir metin rengi ile arka plan arasında 1 (kontrastsız) ile 21 (siyah üzerine beyaz) arasında bir kontrast oranı tanımlar. Pratik eşikler: normal metin 4,5:1, büyük metin 3:1 ister. Oran, iki rengin bağıl parlaklığından gelir; insan gözü yeşile en duyarlı olduğu için yeşil kanal en ağırlıklıdır — saf ",
      { text: "#00ff00", code: true },
      " arka plan, ",
      { text: "#ff0000", code: true },
      " renginden çok daha parlak görünür.",
    ]},
    { type: "p", content: [
      "Dürüst kısayol, parlaklık hesabını elle yapmak değil, sayıyı neyin değiştirdiğini anlamaktır: metin ile arka plan arasındaki açıklık farkını artırmak neredeyse her zaman yardım eder. HSL burada paha biçilmezdir — aynı tonu paylaşan iki renk otomatik uyumludur ve kontrast geçene dek birinin açıklığını artırabilirsiniz. ",
      { text: "Bir müşteri soluk sarı bir marka renginde ısrar ediyorsa, kontrast konuşmasını yapabilmek gerekir: bu zevk meselesi değil, 4,5:1 meselesidir.", bold: true },
    ]},

    { type: "h2", content: ["Palet üretmek ve çıkarmak"] },
    { type: "p", content: [
      "Aynı renk bilgisi palet işlerine de güç verir. Tailwind tarzı bir palet, tek bir temel renkten başlar ve sabit açıklık aralıklarında adımlar yayar; bir palet çıkarıcı ise mevcut bir görselden baskın, görsel olarak dengeli renkleri çeker. İkisi de kaynak renkleri \"benzer\" ve \"farklı\"nın ölçülebildiği bir alana dönüştürmeye dayanır — bu yüzden HEX, RGB ve HSL arasında gezinmeyi ya da renkleri doğrudan görselden almayı sağlayan araçlar çok iş kurtarır.",
    ]},

    { type: "h2", content: ["Convrs'teki renk araçları"] },
    { type: "p", content: [
      "Convrs tüm bunları tarayıcıda tutar: ",
      { text: "renk dönüştürücü", bold: true },
      " herhangi bir HEX, RGB veya HSL değerini canlı önizlemeyle diğer gösterimlere çevirir, ",
      { text: "renk paleti çıkarıcı", bold: true },
      " herhangi bir görselden dengeli bir palet çıkarır ve ",
      { text: "Tailwind paleti üreticisi", bold: true },
      " tek bir renkten tasarım sisteminiz için tam bir ton merdiveni üretir. Renkleriniz cihazınızdan asla çıkmaz ve sonucu doğrudan CSS'e veya Tailwind yapılandırmasına kopyalayabilirsiniz.",
    ]},
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Farbkonvertierung erklärt: HEX, RGB und HSL ohne Verwirrung",
    eyebrow: "Design",
    description:
      "HEX, RGB und HSL sind drei Sprachen für dieselbe Farbe. Verstehen, was jedes Format wirklich bedeutet, wie man sie umwandelt und wie man mit etwas Mathematik auf gute Kontraste kommt.",
    excerpt:
      "Drei Schreibweisen für dieselbe Farbe: was HEX, RGB und HSL sagen, Umrechnung und Kontrastprüfung.",
    readingTime: "9 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: [
      "Ein Kunde schickt ein Design zurück und fragt: \"Kannst du diese Farbe als Farbcode exportieren?\". Die Designerin hat sie als ",
      { text: "HSL(225, 80%, 47%)", code: true },
      " notiert, während das CSS des Entwicklers ",
      { text: "#2f6fed", code: true },
      " erwartet — beide sprechen über exakt dieselbe Farbe. Genau deshalb gibt es Farbkonvertierung: drei Notationen, eine Realität. Dieser Leitfaden erklärt, was jedes Format bedeutet, wie man sicher zwischen ihnen wechselt und welche Regeln unlesbare Farbentscheidungen verhindern.",
    ]},

    { type: "h2", content: ["Die drei Modelle, die Ihnen wirklich begegnen"] },
    { type: "p", content: ["Jede Farbe auf einem Bildschirm entsteht durch Mischen von rotem, grünem und blauem Licht. Unterschiedlich ist nur, wie wir die Mischung beschreiben:"] },
    { type: "list", items: [
      [{ text: "HEX", code: true }, { text: " ist die Kurzschrift des Webs — die RGB-Werte in sechs Hexadezimal-Ziffern gepresst." }],
      [{ text: "RGB", code: true }, { text: " schreibt die Mengen an Rot, Grün und Blau als drei Zahlen von 0–255 aus." }],
      [{ text: "HSL", code: true }, { text: " benennt die Farbe über Farbton, Sättigung und Helligkeit — so, wie ein Mensch denkt." }],
    ]},
    { type: "p", content: ["Keines dieser Modelle ist \"richtiger\". Sie sind verschiedene Werkzeuge: Wählen Sie das, mit dem sich die aktuelle Aufgabe am leichtesten durchdenken lässt."] },

    { type: "h2", content: ["HEX: woher die sechs Ziffern kommen"] },
    { type: "p", content: [
      "Ein Wert wie ",
      { text: "#2f6fed", code: true },
      " ist nur die Aneinanderreihung dreier zweistelliger Zahlen. Aufgeteilt: ",
      { text: "2f", code: true },
      " ist der Rotanteil, ",
      { text: "6f", code: true },
      " das Grün, ",
      { text: "ed", code: true },
      " das Blau. Der Haken: Die Ziffern gehen von ",
      { text: "0–9", code: true },
      " zu ",
      { text: "a–f", code: true },
      " (hexadezimal), ",
      { text: "2f", code: true },
      " bedeutet also 2 × 16 + 15 = 47. Diese Zahl landet direkt auf der 0–255-Skala: ",
      { text: "hex 2f → 47 → rgb(47, ...)", code: true },
      ".",
    ]},
    { type: "p", content: [
      "Sind alle drei Paare doppelte Ziffern — etwa ",
      { text: "#aabbcc", code: true },
      " — können Sie auf drei Ziffern kürzen: ",
      { text: "#abc", code: true },
      ". Browser behandeln beide Formen gleich, und kurz ist Standard in Tailwinds ",
      { text: "bg-red-500", code: true },
      "-Utilities. Ein häufiger Anfängerfehler: ",
      { text: "#ffffff", code: true },
      " für grau halten. Es ist reines Weiß; ",
      { text: "#808080", code: true },
      " ist mittleres Grau.",
    ]},

    { type: "h2", content: ["RGB: die 0–255-Zahlen, die der Bildschirm wirklich nutzt"] },
    { type: "p", content: [
      "Lesen Sie ",
      { text: "rgb(47, 111, 237)", code: true },
      " als \"47 Einheiten rotes Licht, 111 grünes, 237 blaues\". Null ist aus, 255 ist volle Helligkeit, und ein moderner Bildschirm mischt diese drei Kanäle zur Farbe. Alles andere — inklusive HEX — ist eine Bequemlichkeitsschicht über diesen drei Zahlen.",
    ]},
    { type: "p", content: [
      "Die Zahlen wirken bedeutungslos, bis man sie mit Erfahrung verbindet. Eine Farbe mit drei gleichen Kanälen — ",
      { text: "rgb(200,200,200)", code: true },
      " — ist ein Grauton. Die Helligkeit jeder RGB-Farbe ist grob der Durchschnitt ihrer drei Kanäle: Erhöhen Sie alle zusammen, wird die Farbe Richtung Weiß heller. Ist das einmal verinnerlicht, liest sich RGB viel leichter.",
    ]},

    { type: "h2", content: ["HSL: das Modell, das Ihre Intuition will"] },
    { type: "p", content: [
      "HSL beschreibt Farbe so, wie Menschen Farben wirklich beschreiben. ",
      { text: "Farbton", bold: true },
      " ist der Winkel auf dem Farbkreis — 0° Rot, 120° Grün, 240° Blau — man wählt \"das Rot da drüben\", ohne Zahlen zu rechnen.",
      { text: " Sättigung", bold: true },
      " sagt, wie kräftig die Farbe ist: von grau (0%) bis reiner Farbe (100%).",
      { text: " Helligkeit", bold: true },
      " reicht von Schwarz (0%) bis Weiß (100%), wobei 50% die \"normale\" kräftige Version ist.",
    ]},
    { type: "p", content: [
      "Deshalb ist HSL das richtige Modell für Gestaltung: einen Hover-Zustand abdunkeln, indem Sie die Helligkeit ein paar Punkte senken, oder einen Akzent durch weniger Sättigung dämpfen — ohne den Farbton anzufassen. Im HEX-Format bedeutet derselbe Eingriff, drei zusammenhanglose Ziffern neu zu rechnen. Deshalb zeigen die meisten Farbwähler, CSS-Verläufe und Design-Tools irgendwo HSL.",
    ]},

    { type: "h2", content: ["Zwischen Modellen umrechnen"] },
    { type: "p", content: ["Die Umrechnungen sind mechanisch. HEX → RGB ist oben erklärt; für RGB → HSL braucht man nur den Max/Min-Kanal und leitet den Farbton vom Gewinner-Kanal ab. In der Praxis rechnen Sie das selten von Hand — ein Konverter erledigt es sofort —, aber die Formel nimmt dem Ganzen die Magie:"] },
    { type: "code", lang: "js", content: `function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return "#" + [r, g, b].map(toHex).join("");
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}` },
    { type: "note", tone: "success", title: "Die Originalwerte behalten", content: [
      "Konvertierung ist prinzipiell verlustfrei, aber jedes Modell rundet anders. Wird eine Farbe in vielen Dateien benutzt, bewahren Sie den kanonischen Wert an einer Stelle und rechnen von dort um, statt einen bereits umgerechneten Wert erneut umzurechnen und Rundungsfehler anzusammeln. Nichts passt besser zum Original-Hex als das Original-Hex.",
    ]},

    { type: "h2", content: ["Barrierefreiheit: Kontrast mit Mathematik prüfen"] },
    { type: "p", content: [
      "Farben nach Augenmaß zu wählen, ist der Weg zu unlesbaren Oberflächen. WCAG definiert ein Kontrastverhältnis zwischen Textfarbe und Hintergrund, von 1 (kein Kontrast) bis 21 (Schwarz auf Weiß). Die praktischen Schwellen: normaler Text braucht 4,5:1, großer Text 3:1. Das Verhältnis entsteht aus der relativen Leuchtdichte der beiden Farben, die den Grünkanal am stärksten gewichtet, weil das menschliche Auge dafür am empfindlichsten ist — ein ",
      { text: "#00ff00", code: true },
      "-Hintergrund erscheint viel heller als ",
      { text: "#ff0000", code: true },
      ".",
    ]},
    { type: "p", content: [
      "Der ehrliche Shortcut ist nicht das manuelle Luminanz-Rechnen, sondern zu verstehen, was die Zahl bewegt: Mehr Helligkeitsabstand zwischen Text und Hintergrund hilft fast immer. Genau hier ist HSL unschätzbar — zwei Farben mit gleichem Farbton sind automatisch harmonisch, und man hebt die Helligkeit der einen, bis der Kontrast passt. ",
      { text: "Besteht ein Kunde auf einem blassen Gelb als Markenfarbe, ist Kontrast die Unterhaltung, die man führen können muss: Es ist keine Geschmacks-, sondern eine 4,5:1-Frage.", bold: true },
    ]},

    { type: "h2", content: ["Paletten erstellen und extrahieren"] },
    { type: "p", content: [
      "Dasselbe Farbwissen trägt die Palettenarbeit. Eine Tailwind-artige Palette startet von einer Grundfarbe und verteilt Schritte in festen Helligkeitsabständen; ein Paletten-Extraktor zieht aus einem vorhandenen Bild die dominanten, visuell ausgewogenen Farben. Beides beruht darauf, die Quellfarben in einen Raum zu überführen, in dem sich \"ähnlich\" und \"verschieden\" messen lassen — deshalb sparen Werkzeuge, die zwischen HEX, RGB und HSL wechseln oder Farben direkt aus Bildern ziehen, enorm viel Fummelei.",
    ]},

    { type: "h2", content: ["Farbwerkzeuge in Convrs"] },
    { type: "p", content: [
      "Convrs hält das alles im Browser: ",
      { text: "der Farbkonverter", bold: true },
      " übersetzt jeden HEX-, RGB- oder HSL-Wert mit Live-Vorschau in die anderen Schreibweisen, ",
      { text: "der Palette-Extraktor", bold: true },
      " zieht aus jedem Bild eine ausgewogene Palette, und ",
      { text: "der Tailwind-Palettengenerator", bold: true },
      " macht aus einer einzelnen Farbe eine vollständige Farbtonleiter für Ihr Designsystem. Ihre Farben verlassen nie Ihr Gerät, und das Ergebnis kopieren Sie direkt in CSS oder die Tailwind-Konfiguration.",
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Conversión de color explicada: HEX, RGB y HSL sin líos",
    eyebrow: "Diseño",
    description:
      "HEX, RGB y HSL son tres idiomas para decir el mismo color. Comprende qué significa cada formato, cómo convertir entre ellos y cómo comprobar el contraste con un poco de matemáticas.",
    excerpt:
      "Tres formas de escribir el mismo color: qué dicen HEX, RGB y HSL, cómo convertir y cómo verificar el contraste.",
    readingTime: "9 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: [
      "Un cliente devuelve un diseño con un azul de marca muy concreto y pregunta: \"¿puedes exportarlo como código de color?\". La diseñadora lo escribió como ",
      { text: "HSL(225, 80%, 47%)", code: true },
      ", el CSS del desarrollador espera ",
      { text: "#2f6fed", code: true },
      ", y ambos hablan de exactamente el mismo color. Por eso existe la conversión de color: tres notaciones, una realidad. Esta guía explica qué significa cada formato, cómo convertir entre ellos con confianza y las pocas reglas que evitan decisiones de color ilegibles.",
    ]},

    { type: "h2", content: ["Los tres modelos que te vas a encontrar"] },
    { type: "p", content: ["Cada color en una pantalla se produce mezclando luz roja, verde y azul. Lo que cambia es cómo describimos la mezcla:"] },
    { type: "list", items: [
      [{ text: "HEX", code: true }, { text: " es la abreviatura de la web: los valores RGB comprimidos en seis dígitos hexadecimales." }],
      [{ text: "RGB", code: true }, { text: " escribe las cantidades de rojo, verde y azul como tres números de 0 a 255." }],
      [{ text: "HSL", code: true }, { text: " nombra el color por su matiz, saturación y luminosidad: la forma en que piensa una persona." }],
    ]},
    { type: "p", content: ["Ninguno es “más correcto” que otro. Son herramientas distintas: elige el que haga más fácil razonar sobre la tarea actual."] },

    { type: "h2", content: ["HEX: de dónde salen los seis dígitos"] },
    { type: "p", content: [
      "Un valor como ",
      { text: "#2f6fed", code: true },
      " no es más que tres números de dos dígitos pegados. Divídelo: ",
      { text: "2f", code: true },
      " es el rojo, ",
      { text: "6f", code: true },
      " el verde, ",
      { text: "ed", code: true },
      " el azul. El truco es que los dígitos van de ",
      { text: "0–9", code: true },
      " a ",
      { text: "a–f", code: true },
      " (hexadecimal), así que ",
      { text: "2f", code: true },
      " equivale a 2 × 16 + 15 = 47. Ese número cae directo en la escala de 0–255: ",
      { text: "hex 2f → 47 → rgb(47, ...)", code: true },
      ".",
    ]},
    { type: "p", content: [
      "Cuando los tres pares son dígitos duplicados —como ",
      { text: "#aabbcc", code: true },
      "— puedes abreviarlo a tres dígitos: ",
      { text: "#abc", code: true },
      ". Los navegadores tratan ambas formas como idénticas, y la corta es la estándar en utilidades de Tailwind como ",
      { text: "bg-red-500", code: true },
      ". Un error típico de principiante: creer que ",
      { text: "#ffffff", code: true },
      " es gris. Es blanco puro; ",
      { text: "#808080", code: true },
      " es el gris medio.",
    ]},

    { type: "h2", content: ["RGB: los números 0–255 que usa la pantalla"] },
    { type: "p", content: [
      "Cuando ves ",
      { text: "rgb(47, 111, 237)", code: true },
      ", léelo como “47 unidades de luz roja, 111 de luz verde, 237 de azul”. Cero está apagado, 255 es brillo total, y una pantalla moderna mezcla esos tres canales para producir el color. Todo lo demás —incluido el HEX— es una capa de comodidad sobre esos tres números.",
    ]},
    { type: "p", content: [
      "Los números parecen vacíos hasta que los conectas con la experiencia. Un color con los tres canales iguales — ",
      { text: "rgb(200,200,200)", code: true },
      " — es un gris. El brillo de cualquier color RGB es más o menos el promedio de sus canales: súbelos juntos y el color se aclara hacia el blanco. Cuando eso se asienta, leer RGB se vuelve mucho más fácil.",
    ]},

    { type: "h2", content: ["HSL: el modelo que quiere tu intuición"] },
    { type: "p", content: [
      "HSL describe el color como la gente lo describe de verdad. ",
      { text: "Matiz", bold: true },
      " es el ángulo en el círculo cromático: 0° rojo, 120° verde, 240° azul, de modo que puedes elegir “el rojo de ahí” sin calcular nada.",
      { text: " Saturación", bold: true },
      " es lo vivo que está el color, de gris (0%) a color puro (100%).",
      { text: " Luminosidad", bold: true },
      " va de negro (0%) a blanco (100%), siendo 50% la versión “normal” y viva del color.",
    ]},
    { type: "p", content: [
      "Por eso HSL es el modelo correcto para el diseño: oscurecer un estado hover bajando la luminosidad unos puntos, o atenuar un color de acento reduciendo la saturación, sin tocar el matiz. Hacer el mismo cambio en HEX significa recalcular tres dígitos que no tienen relación. Por eso la mayoría de selectores de color, degradados CSS y herramientas de diseño muestran HSL en algún lugar.",
    ]},

    { type: "h2", content: ["Convertir entre modelos"] },
    { type: "p", content: ["Las conversiones son mecánicas. HEX → RGB ya está resuelto arriba; RGB → HSL solo requiere hallar el canal máximo/mínimo y derivar el matiz del canal ganador. En la práctica rara vez lo harás a mano —un conversor lo resuelve al instante—, pero la fórmula le quita el misterio:"] },
    { type: "code", lang: "js", content: `function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return "#" + [r, g, b].map(toHex).join("");
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}` },
    { type: "note", tone: "success", title: "Conserva los valores originales", content: [
      "La conversión es sin pérdidas en principio, pero cada modelo redondea distinto. Si un color se usa en muchos archivos, guarda el valor canónico en un sitio y convierte desde él, en lugar de convertir un valor ya convertido y acumular errores de redondeo. Nada supera al hex original como referencia.",
    ]},

    { type: "h2", content: ["Accesibilidad: comprobar el contraste con matemáticas"] },
    { type: "p", content: [
      "Elegir colores a ojo es como se crean interfaces ilegibles. WCAG define una relación de contraste entre el color del texto y el fondo, de 1 (sin contraste) a 21 (negro sobre blanco). Los umbrales prácticos: el texto normal necesita 4,5:1; el texto grande, 3:1. La proporción nace de la luminancia relativa de ambos colores, que pondera más el canal verde porque el ojo humano es más sensible a él —un fondo ",
      { text: "#00ff00", code: true },
      " puro se ve mucho más brillante que uno ",
      { text: "#ff0000", code: true },
      ".",
    ]},
    { type: "p", content: [
      "El atajo honesto no es calcular la luminancia a mano, sino entender qué mueve la cifra: aumentar la diferencia de luminosidad entre texto y fondo casi siempre ayuda. Por eso HSL es inestimable aquí: dos colores que comparten matiz armonizan solos, y puedes subir la luminosidad de uno hasta que el contraste pase. ",
      { text: "Cuando un cliente insiste en un amarillo pálido como color de marca, el contraste es la conversación que debes saber tener: no es una cuestión de gusto, es una cuestión de 4,5:1.", bold: true },
    ]},

    { type: "h2", content: ["Crear y extraer paletas"] },
    { type: "p", content: [
      "El mismo conocimiento del color impulsa el trabajo con paletas. Una paleta estilo Tailwind parte de un color base y reparte pasos a intervalos fijos de luminosidad; un extractor de paletas toma una imagen existente y saca sus colores dominantes y visualmente equilibrados. Ambos se apoyan en convertir los colores de origen a un espacio donde se pueda medir “similar” y “distinto” —por eso las herramientas que saltan entre HEX, RGB y HSL, o que sacan colores directo de una imagen, ahorran muchísimo trabajo.",
    ]},

    { type: "h2", content: ["Herramientas de color en Convrs"] },
    { type: "p", content: [
      "Convrs mantiene todo esto en el navegador: ",
      { text: "el conversor de color", bold: true },
      " traduce cualquier valor HEX, RGB o HSL a las demás notaciones con vista previa en vivo, ",
      { text: "el extractor de paletas", bold: true },
      " obtiene una paleta equilibrada de cualquier imagen, y ",
      { text: "el generador de paletas Tailwind", bold: true },
      " convierte un solo color en una rampa completa de tonos para tu sistema de diseño. Tus colores nunca salen de tu dispositivo y puedes copiar el resultado directo a CSS o a la configuración de Tailwind.",
    ]},
  ],
};

const colorConversionGuide: GuideDefinition = {
  slug: "color-conversion-guide",
  content: { en, tr, de, es },
};

export default colorConversionGuide;