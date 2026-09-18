import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "CSS Box-Shadow Explained: Syntax, Blur, Spread and Performance",
    eyebrow: "Design",
    description:
      "Box-shadow is a single CSS property that can produce soft glows, hard cards, layered depth, and everything between. Understand what each value actually controls, the blur-versus-spread confusion, layered shadows, accessibility, performance, and how a visual generator speeds up the workflow.",
    excerpt:
      "What box-shadow really does: offset, blur, spread, color, inset — plus layered shadows, common mistakes, accessibility of shadowed text, and performance trade-offs.",
    readingTime: "9 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: [
      "You copy a shadow from some site's generator, paste it into your stylesheet, and the result looks nothing like the preview you just saw. The blur is enormous, the element appears to float ten pixels off the page, and adding a second shadow makes the whole thing vanish. The problem is not box-shadow being hard — it is that most developers have never been told what each of the five values actually controls. This guide breaks the property apart, explains blur radius versus spread, shows how layered shadows work, covers accessibility pitfalls and performance trade-offs, and ends with a tool that removes the guesswork entirely.",
    ]},

    { type: "h2", content: ["The five values behind every box-shadow"] },
    { type: "p", content: ["A complete box-shadow declaration looks like this:"] },
    { type: "code", lang: "css", content: `box-shadow: 4px 6px 12px 0 rgba(0, 0, 0, 0.25);` },
    { type: "p", content: [
      "Read it left to right. ",
      { text: "4px", bold: true },
      " is the ",
      { text: "offset-x", code: true },
      " — how far the shadow shifts horizontally. ",
      { text: "6px", bold: true },
      " is the ",
      { text: "offset-y", code: true },
      " — how far it shifts vertically. These two are the minimum: without them the shadow sits directly behind the element, perfectly centred, which is rarely useful.",
      { text: " 12px", bold: true },
      " is the ",
      { text: "blur-radius", code: true },
      ". It controls how much the shadow is softened — it does not move the shadow, it feathers the edges. ",
      { text: "0", bold: true },
      " is the ",
      { text: "spread-radius", code: true },
      ". A positive value expands the shadow beyond the element's box; a negative value shrinks it. And ",
      { text: "rgba(0, 0, 0, 0.25)", bold: true },
      " is the shadow color with 25% opacity.",
    ]},
    { type: "p", content: [
      "There is an optional sixth value: the ",
      { text: "inset", code: true },
      " keyword. When present, the shadow is drawn inside the element instead of outside. Inset shadows are the standard way to create inner depth — input fields, pressed buttons, sunken cards. Omit the keyword and every shadow falls on the outside by default.",
    ]},

    { type: "h2", content: ["Blur radius versus spread radius: the confusion that costs hours"] },
    { type: "p", content: [
      "These two values are the most commonly swapped, and the visual difference is dramatic. ",
      { text: "Blur-radius", bold: true },
      " does not make the shadow bigger or smaller — it controls how sharply the shadow edge fades to transparency. A blur of ",
      { text: "0", code: true },
      " produces a hard-edged shadow identical to the element's silhouette. A blur of ",
      { text: "20px", code: true },
      " creates a wide, soft gradient that bleeds far beyond the element. The browser implements this as a Gaussian blur on the shadow bitmap before compositing it under the element.",
    ]},
    { type: "p", content: [
      "Spread-radius, on the other hand, is a direct geometric operation. It inflates or deflates the shadow rectangle before any blur is applied. A spread of ",
      { text: "4px", code: true },
      " makes the shadow 4px larger on every side; a spread of ",
      { text: "-4px", code: true },
      " makes it 4px smaller. The practical effect: spread controls how visible the shadow is in the first place, while blur controls how soft it looks. A common trick for a subtle raised card is to keep blur moderate and spread at zero or slightly negative — this avoids the \"big dark halo\" that comes from a large blur with no spread adjustment.",
    ]},
    { type: "note", tone: "warning", title: "The missing fourth value trap", content: [
      "When you write three values — like box-shadow: 0 4px 8px rgba(0,0,0,0.15) — the third number is the blur, not the spread. The spread defaults to 0. If you actually intended to set spread to 8px and blur to something else, the shorthand is wrong and the shadow will not match your design. Always verify the order: offset-x, offset-y, blur, spread.",
    ]},

    { type: "h2", content: ["Layered shadows: one property, multiple values"] },
    { type: "p", content: [
      "CSS lets you stack multiple shadows on the same element by separating them with commas. Each layer renders from first to last — the first shadow is on top, and each subsequent shadow sits behind it. This is how realistic depth effects are built: a single shadow looks flat and artificial, but two or three carefully tuned layers create the nuanced shading that our eyes associate with real objects.",
    ]},
    { type: "code", lang: "css", content: `.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.08);
}` },
    { type: "p", content: [
      "In this example, the first shadow is a tight, low-opacity accent directly below the card — it simulates the contact shadow where the surface meets the table. The second is a mid-range soft spread that creates the main sense of elevation. The third is a wide, faint wash that implies overall ambient light. The result reads as natural depth rather than a flat gray smear.",
    ]},
    { type: "p", content: [
      "A second common pattern is layering a sharp shadow with a blurred one. The sharp layer (low or zero blur, small negative spread) creates a defined edge, while the soft layer fills in the ambient diffusion. Material Design uses exactly this approach: a short hard shadow plus a wider soft shadow produces the paper-lift effect that looks correct at every zoom level.",
    ]},

    { type: "h2", content: ["Common mistakes and how to fix them"] },
    { type: "p", content: [
      "The most frequent mistake is using a blur value that is far too large relative to the element. A button that is 36px tall should not have a 60px blur — the result is a diffuse cloud that detaches the element from the surface entirely. As a rough rule of thumb, keep blur between 0.5× and 2× the element's shorter dimension for natural-looking elevation.",
    ]},
    { type: "p", content: [
      "The second mistake is forgetting about the implicit second layer. When a design calls for \"the shadow on the design file\", it often looks like it does because the designer stacked two or three box-shadows in Figma or Sketch. Copying only the topmost visible shadow produces a shadow that looks too sharp or too dark. Always check whether the mockup uses layered shadows — it almost always does.",
    ]},
    { type: "p", content: [
      "A third pitfall is using ",
      { text: "filter: drop-shadow()", code: true },
      " interchangeably with box-shadow. They are not the same. Box-shadow follows the element's rectangular border-box, while drop-shadow respects alpha transparency — so an element with a transparent background and a rounded SVG icon will get a drop-shadow that traces the icon shape. But drop-shadow cannot do spread-radius, cannot do inset, and performs worse in long lists.",
    ]},
    { type: "list", items: [
      [{ text: "Huge arbitrary blur: ", bold: true }, { text: "keep blur proportional to the element size; 4px–16px covers most UI cards." }],
      [{ text: "Single-layer flatness: ", bold: true }, { text: "stack at least two shadows — a tight contact layer and a wider ambient layer." }],
      [{ text: "Offset too large: ", bold: true }, { text: "offsets above 8–10px make the element look detached; keep small for realistic elevation." }],
      [{ text: "Forgetting inset: ", bold: true }, { text: "pressed buttons and input fields usually need inset shadows, not outside shadows." }],
    ]},

    { type: "h2", content: ["Accessibility: shadowed text and contrast"] },
    { type: "p", content: [
      "Box-shadow on a container is generally safe for accessibility — it does not affect text contrast ratios. But text-shadow, which works similarly, can reduce readability if overused. WCAG 2.1 does not directly regulate text-shadow, but the contrast requirement between text and its adjacent background still applies. A text-shadow with the same color as the background creates a halo effect that can blur letterforms for users with low vision.",
    ]},
    { type: "p", content: [
      "The practical rule: keep text-shadow blur small (1px–2px), use low opacity (under 0.3), and never rely on a shadow as the only means of separating text from a busy background. If the background is an image or gradient, the shadow is decorative — you still need sufficient contrast between the text color and the background's darkest/lightest underlying tone. When in doubt, run the element through a contrast checker with the background visible behind the shadow.",
    ]},
    { type: "note", tone: "success", title: "Shadows on interactive elements", content: [
      "Hover and focus states that increase shadow intensity (larger blur or higher opacity) improve perceivability for users who rely on visual feedback. This is not strictly required by WCAG, but it is a widely recommended practice that also benefits keyboard navigation: the shadow grows when the element receives :focus-visible, giving a clear affordance without relying solely on the browser's outline.",
    ]},

    { type: "h2", content: ["Performance: box-shadow versus filter versus images"] },
    { type: "p", content: [
      "Box-shadow is a CSS property that browsers rasterize when painting the element's layer. On modern hardware, a handful of box-shadows have negligible cost. The performance concern appears in two scenarios: long scrollable lists with dozens of shadowed items, and shadows on elements with many children that trigger frequent repaints during animation.",
    ]},
    { type: "table", columns: ["Technique", "Spread support", "Inset support", "Respects alpha", "GPU-friendly", "Best for"], rows: [
      ["box-shadow", "Yes", "Yes", "No (paints border-box)", "Good", "Cards, buttons, containers"],
      ["filter: drop-shadow()", "No", "No", "Yes (follows alpha)", "Moderate", "Icons, images with transparent backgrounds"],
      ["Pre-rendered PNG shadow", "Via image", "N/A", "Yes", "N/A (raster)", "Complex decorative shadows on static elements"],
      ["text-shadow", "No", "N/A", "Yes", "Good", "Headline glow, subtle text depth"],
    ]},
    { type: "p", content: [
      "The general guidance: use box-shadow for UI components, filter: drop-shadow() when you need alpha-traced shadows on images or icons, and avoid pre-rendered shadow images unless the visual is truly complex and static. Animating box-shadow is possible but triggers a repaint on every frame; for smooth 60fps animation, consider combining transform: translateZ(0) or will-change: transform to promote the element to its own compositor layer, or use the shadow on a pseudo-element that is independently promoted.",
    ]},

    { type: "h2", content: ["The box-shadow generator on Convrs"] },
    { type: "p", content: [
      "Convrs offers a ",
      { text: "box-shadow generator", bold: true },
      " that removes the guesswork from shadow creation. Adjust offset-x, offset-y, blur, spread, and color with sliders while seeing a live preview of the result on different background colors. Add and reorder layers to build realistic depth. Every change updates the CSS output instantly — copy it straight into your stylesheet. The tool runs entirely in your browser; no shadow values or previews are sent to any server.",
    ]},
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "CSS Box-Shadow Rehberi: Sözdizimi, Bulanıklık, Yayılım ve Performans",
    eyebrow: "Tasarım",
    description:
      "Box-shadow, tek bir CSS özelliğiyle yumuşak parlaklıklar, keskin kartlar ve çok katmanlı derinlikler üretebilir. Her değerin gerçekte neyi kontrol ettiğini, bulanıklık-yayılım karışıklığını, katmanlı gölgeleri, erişilebilirlik tuzağını ve performans fırsatlarını keşfedin.",
    excerpt:
      "Box-shadow'ın gerçekte ne yaptığı: ofset, bulanıklık, yayılım, renk, inset — artı katmanlı gölgeler, yaygın hatalar ve performans karşılaştırması.",
    readingTime: "9 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: [
      "Bir sitedeki gölge aracından kopyaladığınız bir gölgeyi stil sayfasına yapıştırıyorsunuz ve sonuç önizlemede gördüğünüzden çok farklı çıkıyor. Bulanıklık devasa, eleman sayfadan onlarca piksel havada asılı duruyor, ikinci bir gölge eklemekse tüm efekti yok ediyor. Sorun box-shadow'ın zor olması değil — geliştiricilerin beş değerin her birinin gerçekte neyi kontrol ettiğini hiç öğrenmemiş olması. Bu rehber özelliği parçalara ayırıyor, bulanıklık ile yayılım arasındaki farkı açıklıyor, katmanlı gölgeleri gösteriyor, erişilebilirlik tuzaklarını ve performans fırsatlarını kapsıyor.",
    ]},

    { type: "h2", content: ["Her box-shadow'ın arkasındaki beş değer"] },
    { type: "p", content: ["Tam bir box-shadow bildirimi şöyle görünür:"] },
    { type: "code", lang: "css", content: `box-shadow: 4px 6px 12px 0 rgba(0, 0, 0, 0.25);` },
    { type: "p", content: [
      "Soldan sağa okuyun. ",
      { text: "4px", bold: true },
      " ",
      { text: "offset-x", code: true },
      " değeridir — gölgeyi yatayda ne kadar kaydırır. ",
      { text: "6px", bold: true },
      " ",
      { text: "offset-y", code: true },
      " değeridir — dikey kaymasıdır. Bu ikisi minimum gereklidir; bunlar olmadan gölge elemanın tam arkasında, tam ortada oturur — pratikte pek yararlı değildir.",
      { text: " 12px", bold: true },
      " ",
      { text: "blur-radius", code: true },
      " değeridir. Gölgenin ne kadar yumuşatılacağını kontrol eder — gölgeyi taşımaz, kenarlarını tüyler.",
      { text: " 0", bold: true },
      " ",
      { text: "spread-radius", code: true },
      " değeridir. Pozitif bir değer gölgeyi elemanın kutusunun ötesine genişletir; negatif değer daraltır. Ve ",
      { text: "rgba(0, 0, 0, 0.25)", bold: true },
      " %25 opaklıkla gölge rengidir.",
    ]},
    { type: "p", content: [
      "İsteğe bağlı olarak altıncı bir değer daha vardır: ",
      { text: "inset", code: true },
      " anahtar sözcüğü. Mevcut olduğunda gölge elemanın dışına değil, içine çizilir. Inset gölgeler iç derinlik yaratmanın standart yoludur — input alanları, basılmış butonlar, içbükey kartlar. Anahtar sözcüğü atlandığında tüm gölgeler varsayılan olarak dışarıya düşer.",
    ]},

    { type: "h2", content: ["Bulanıklık yarıçapı versus yayılım yarıçapı: saatler harcayan karışıklık"] },
    { type: "p", content: [
      "Bu iki değer en sık değiştirilenlerdir ve görsel fark dramatiktir. ",
      { text: "Bulanıklık yarıçapı", bold: true },
      " gölgeyi büyük ya da küçük yapmaz — gölge kenarının ne kadar keskin olarak saydama geçtiğini kontrol eder. ",
      { text: "0", code: true },
      " blur değeri, elemanla aynı siluetin keskin kenarlı bir gölgesini üretir. ",
      { text: "20px", code: true },
      " blur değeri ise elemanın çok ötesine yayılıp solan geniş, yumuşak bir gradyan oluşturur. Tarayıcı bunu elemanın altında birleştirmeden önce gölge bitmap'i üzerinde Gaussian bulanıklığı olarak uygular.",
    ]},
    { type: "p", content: [
      "Yayılım yarıçapı ise doğrudan geometrik bir işlemdir. Herhangi bir bulanıklık uygulanmadan önce gölge dikdörtgenini şişirir veya daraltır. ",
      { text: "4px", code: true },
      " yayılımı gölgeyi her taraftan 4px büyütür; ",
      { text: "-4px", code: true },
      " ise 4px küçültür. Pratik etki: yayılım gölgenin ne kadar görünür olduğunu, bulanıklık ise ne kadar yumuşak göründüğünü belirler. Yükseltilmiş bir kart için sık kullanılan bir numara, bulanıklığı makul tutup yayılımı sıfır ya da hafif negatif yapmaktır — bu, büyük bulanıklığın yayılım ayarı olmadan yarattığı \"karanlık halo\" sorununu önler.",
    ]},
    { type: "note", tone: "warning", title: "Dördüncü değer tuzağı", content: [
      "Üç değer yazdığınızda — örneğin box-shadow: 0 4px 8px rgba(0,0,0,0.15) — üçüncü sayı bulanıklıktır, yayılım değildir. Yayılım varsayılan olarak 0'dır. Aslında yayılımı 8px olarak ayarlamak istiyorsanız ve bulanıklığı farklı bir şey yapmak istiyorsanız, kısa yazım yanlıştır ve gölge tasarımıyla uyuşmayacaktır. Sıralamayı her zaman doğrulayın: offset-x, offset-y, blur, spread.",
    ]},

    { type: "h2", content: ["Katmanlı gölgeler: tek özellik, birden fazla değer"] },
    { type: "p", content: [
      "CSS, virgülle ayırarak aynı elemana birden fazla gölge yığılmasına izin verir. Her katman ilkten sona doğru işlenir — ilk gölge üsttedir ve her sonraki gölge arkasına oturur. Gerçekçi derinlik efektleri böyle oluşturulur: tek bir gölge düz ve yapay görünür, ancak iki ya da üç özenle ayarlanmış katman, gözlerimizin gerçek nesnelerle ilişkilendirdiği nüanslı gölgelemeyi üretir.",
    ]},
    { type: "code", lang: "css", content: `.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.08);
}` },
    { type: "p", content: [
      "Bu örnekte ilk gölge, kartın hemen altındaki sıkı, düşük opaklıklı bir vurgudur — yüzeyin masayla buluştuğu teması gölgesini simüle eder. İkincisi, ana yükseltme hissini yaratan orta menzilli yumuşak yayılımdır. Üçüncüsü ise genel ortam ışığını ima eden geniş, hafif bir yıkama. Sonuç, düz bir gri leke yerine doğal derinlik olarak okunur.",
    ]},

    { type: "h2", content: ["Yaygın hatalar ve nasıl düzeltilir"] },
    { type: "p", content: [
      "En sık yapılan hata, elemanın boyutuna göre çok büyük bir bulanıklık değeri kullanmaktır. 36px yüksekliğindeki bir butonda 60px blur olmaz — sonuç, elemanı yüzeyden tamamen kopartan bir difüz buluttur. Kaba bir kural olarak, doğal görünümlü yükseltme için bulanıklığı elemanın kısa boyutunun 0,5× ile 2× arasında tutun.",
    ]},
    { type: "p", content: [
      "İkinci hata, örtük ikinci katmanı unutmaktır. Tasarımdaki \"gölge\" genellikle tasarımcının Figma veya Sketch'te iki ya da üç box-shadow üst üste koymasıyla görünür hale gelir. Yalnızca en üstteki görünür gölgeyi kopyalamak, çok keskin ya da çok karanlık bir gölge üretir. Mockup'ın katmanlı gölge kullanıp kullanmadığını her zaman kontrol edin — neredeyse her zaman kullanır.",
    ]},
    { type: "p", content: [
      "Üçüncü tuzak, ",
      { text: "filter: drop-shadow()", code: true },
      " ile box-shadow'ı birbirinin yerine kullanmaktır. Aynı şey değildirler. Box-shadow elemanın dikdörtgen border-box'ini takip ederken, drop-shadow saydamlık alfasını takip eder — saydam arka planlı ve yuvarlatılmış SVG simgeli bir eleman, simge şekli boyunca iz bırakan bir drop-shadow alır. Ancak drop-shadow'da yayılım yarıçapı, inset ya daochrome desteği yoktur ve uzun listelerde daha kötü performans gösterir.",
    ]},
    { type: "list", items: [
      [{ text: "Devasa rastgele bulanıklık: ", bold: true }, { text: "bulanıklığı eleman boyutuyla orantılı tutun; 4px–16px çoğu UI kartı için yeterlidir." }],
      [{ text: "Tek katmanlı düzlük: ", bold: true }, { text: "en az iki gölge üst üste koyun — sıkı bir temas katmanı ve geniş bir ortam katmanı." }],
      [{ text: "Çok büyük ofset: ", bold: true }, { text: "8–10px'i aşan ofsetler elemanı kopuk gösterir; gerçekçi yükseltme için küçük tutun." }],
      [{ text: "Inset'i unutmak: ", bold: true }, { text: "basılmış butonlar ve input alanları genellikle inset gölge ister, dış gölge değil." }],
    ]},

    { type: "h2", content: ["Erişilebilirlik: gölgeli metin ve kontrast"] },
    { type: "p", content: [
      "Bir kapsayıcı üzerindeki box-shadow genellikle erişilebilirlik açısından güvenlidir — metin kontrast oranlarını etkilemez. Ancak benzer çalışan text-shadow aşırı kullanıldığında okunabilirliği düşürebilir. WCAG 2.1 text-shadow'ı doğrudan düzenlemez, ancak metin ile bitişik arka plan arasında yeterli kontrast gerekliliği hâlâ geçerlidir. Arka plan rengiyle aynı renkte bir text-shadow, harf formlarını bulanıklaştıran bir halo efekti yaratır.",
    ]},
    { type: "p", content: [
      "Pratik kural: text-shadow bulanıklığını küçük tutun (1px–2px), düşük opaklık kullanın (%30'un altında) ve metni yoğun bir arka plandan ayırmak için gölgeye asla tek başına güvenmeyin. Arka plan bir görsel ya da gradyansa gölge süslemedir — metin rengi ile arka planın en karanlık/açık alt tonu arasında hâlâ yeterli kontrast olmalıdır. Şüpheniz varsa, elemanı arka plan gölgenin arkasında görünür biçimde bir kontrast kontrolcüye sokun.",
    ]},
    { type: "note", tone: "success", title: "Etkileşimli elemanlarda gölgeler", content: [
      "Gölge yoğunluğunu artıran (daha büyük bulanıklık veya daha yüksek opaklık) üzerine gelme ve odak durumları, görsel geri bildirime dayanan kullanıcılar için algılabilirliği artırır. Bu WCAG tarafından zorunlu değildir, ancak klavye gezinmesine de yarar sağlayan yaygın olarak önerilen bir uygulamadır: eleman :focus-visible aldığında gölge büyür, yalnızca tarayıcının dış çizgisine güvenmek yerine net bir ipucu sunar.",
    ]},

    { type: "h2", content: ["Performans: box-shadow versus filtre versus görseller"] },
    { type: "p", content: [
      "Box-shadow, tarayıcının eleman katmanını boyarken rasterize ettiği bir CSS özelliğidir. Modern donanımda birkaç box-shadow'ın maliyeti ihmal edilebilirdir. Performans endişesi iki senaryoda ortaya çıkar: düzinelerce gölgeli eleman içeren uzun kaydırılabilir listeler ve animasyon sırasında sık boyama tetikleyen çok sayıda çocuğu olan gölgeli elemanlar.",
    ]},
    { type: "table", columns: ["Teknik", "Yayılım desteği", "Inset desteği", "Alfayı takip eder", "GPU dostu", "En iyi kullanım"], rows: [
      ["box-shadow", "Evet", "Evet", "Hayır (border-box boyar)", "İyi", "Kartlar, butonlar, kapsayıcılar"],
      ["filter: drop-shadow()", "Hayır", "Hayır", "Evet (alfayı takip eder)", "Orta", "Saydam arka planlı simgeler, görseller"],
      ["Önceden renderlanmış PNG gölgesi", "Görsel üzerinden", "Yok", "Evet", "N/A (raster)", "Statik elemanlarda karmaşık süs gölgeleri"],
      ["text-shadow", "Hayır", "Yok", "Evet", "İyi", "Başlık parıltısı, hafif metin derinliği"],
    ]},
    { type: "p", content: [
      "Genel kılavuz: UI bileşenleri için box-shadow kullanın, şeffaf arka planlı görseller veya simgeler için alpha izli gölge gerektiğinde filter: drop-shadow() kullanın ve gerçekten karmaşık ve statik olan görseller dışında önceden renderlanmış gölge görsellerinden kaçının. Box-shadow'ı animasyonlamak mümkündür ancak her karede boyama tetikler; 60fps akıcı animasyon için transform: translateZ(0) veya will-change: transform ile elemanı kendi bileşen katmanına yükseltmeyi veya gölgeyi bağımsız olarak yükseltilebilir bir pseudo-element'e koymayı düşünün.",
    ]},

    { type: "h2", content: ["Convrs'teki box-shadow üreticisi"] },
    { type: "p", content: [
      "Convrs, ",
      { text: "box-shadow üreticisi", bold: true, url: "/box-shadow-generator", internal: true },
      " ile gölge oluşturmayı tahmin oyunundan çıkarır. Offset-x, offset-y, bulanıklık, yayılımı ve rengi kaydırıcılarla ayarlayın, farklı arka plan renklerinde sonucun canlı önizlemesini görün. Katman ekleyip sıralayarak gerçekçi derinlik oluşturun. Her değişiklik CSS çıktısını anında günceller — doğrudan stil sayfanıza kopyalayın. Araç tamamen tarayıcınızda çalışır; gölge değerleri ya da önizlemeler hiçbir sunucuya gönderilmez.",
    ]},
  ],
};

const de: GuideDocument = {
  meta: {
    title: "CSS Box-Shadow erklärt: Syntax, Unschärfe, Streuung und Performance",
    eyebrow: "Design",
    description:
      "Box-shadow kann mit einer einzigen CSS-Eigenschaft weiche Leuchteffekte, scharfe Karten und mehrschichtige Tiefe erzeugen. Verstehen Sie, was jeder Wert kontrolliert, die Unschärfe-versus-Streuung-Verwirrung, geschichtete Schatten, Barrierefreiheit und Performance.",
    excerpt:
      "Was box-shadow wirklich tut: Offet, Unschärfe, Streuung, Farbe, Inset — plus geschichtete Schatten, häufige Fehler und Performance-Vergleich.",
    readingTime: "9 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: [
      "Sie kopieren einen Schatten von einem Generator, fügen ihn in Ihr Stylesheet ein, und das Ergebnis sieht nichts so aus wie die Vorschau, die Sie gerade gesehen haben. Die Unschärfe ist enorm, das Element schwebt zehn Pixel über der Seite, und ein zweiter Schatten lässt das Ganze verschwinden. Das Problem ist nicht, dass box-shadow schwer ist — sondern dass die meisten Entwickler nie gelernt haben, was jeder der fünf Werte tatsächlich kontrolliert. Dieser Leitfaden zerlegt die Eigenschaft, erklärt Unschärfe versus Streuung, zeigt geschichtete Schatten, deckt Barrierefreiheit und Performance ab und endet mit einem Werkzeug, das das Raten vollständig eliminiert.",
    ]},

    { type: "h2", content: ["Die fünf Werte hinter jedem box-shadow"] },
    { type: "p", content: ["Eine vollständige box-shadow-Deklaration sieht so aus:"] },
    { type: "code", lang: "css", content: `box-shadow: 4px 6px 12px 0 rgba(0, 0, 0, 0.25);` },
    { type: "p", content: [
      "Von links nach rechts gelesen. ",
      { text: "4px", bold: true },
      " ist ",
      { text: "offset-x", code: true },
      " — wie weit sich der Schatten horizontal verschiebt. ",
      { text: "6px", bold: true },
      " ist ",
      { text: "offset-y", code: true },
      " — wie weit die Verschiebung vertikal erfolgt. Diese beiden sind das Minimum: ohne sie sitzt der Schatten direkt hinter dem Element, perfekt zentriert, was selten nützlich ist.",
      { text: " 12px", bold: true },
      " ist der ",
      { text: "blur-radius", code: true },
      ". Er steuert, wie sehr der Schatten weichgezeichnet wird — er verschiebt den Schatten nicht, er federt die Kanten. ",
      { text: "0", bold: true },
      " ist der ",
      { text: "spread-radius", code: true },
      ". Ein positiver Wert erweitert den Schatten über die Box des Elements hinaus; ein negativer Wert verkleinert ihn. Und ",
      { text: "rgba(0, 0, 0, 0.25)", bold: true },
      " ist die Schattenfarbe mit 25 % Deckkraft.",
    ]},
    { type: "p", content: [
      "Es gibt einen optionalen sechsten Wert: das Schlüsselwort ",
      { text: "inset", code: true },
      ". Wenn vorhanden, wird der Schatten innerhalb des Elements statt außerhalb gezeichnet. Inset-Schatten sind der Standardweg, um Tiefe von innen zu erzeugen — Eingabefelder, gedrückte Buttons, versenkte Karten. Das Schlüsselwort weglassen, und jeder Schatten fällt standardmäßig nach außen.",
    ]},

    { type: "h2", content: ["Unschärfe versus Streuung: die Verwirrung, die Stunden kostet"] },
    { type: "p", content: [
      "Diese beiden Werte werden am häufigsten vertauscht, und der visuelle Unterschied ist dramatisch. ",
      { text: "Unschärfe-Radius", bold: true },
      " macht den Schatten nicht größer oder kleiner — er steuert, wie scharf die Schattenkante zur Transparenz übergeht. Eine Unschärfe von ",
      { text: "0", code: true },
      " erzeugt einen harten Schatten, der identisch mit der Silhouette des Elements ist. Eine Unschärfe von ",
      { text: "20px", code: true },
      " erzeugt einen weiten, weichen Gradienten, der weit über das Element hinausblutet. Der Browser setzt dies als Gaußsche Unschärfe auf dem Schatten-Bitmap um, bevor er ihn unter das Element komponiert.",
    ]},
    { type: "p", content: [
      "Der Streuungs-Radius hingegen ist eine direkte geometrische Operation. Er bläst das Rechteck des Schattens auf oder zieht es zusammen, bevor irgendeine Unschärfe angewendet wird. Streuung von ",
      { text: "4px", code: true },
      " macht den Schatten auf jeder Seite 4px größer; ",
      { text: "-4px", code: true },
      " verkleinert ihn um 4px. Die praktische Wirkung: Streuung bestimmt, wie sichtbar der Schatten überhaupt ist, während die Unschärfe bestimmt, wie weich er wirkt. Ein häufiger Trick für eine dezente erhobene Karte ist es, die Unschärfe moderat zu halten und die Streuung bei Null oder leicht negativ zu lassen — das vermeidet den \"großen dunklen Halo\", der bei großer Unschärfe ohne Streuung-Anpassung entsteht.",
    ]},
    { type: "note", tone: "warning", title: "Die fehlende vierte Wert-Falle", content: [
      "Wenn Sie drei Werte schreiben — wie box-shadow: 0 4px 8px rgba(0,0,0,0.15) — ist die dritte Zahl die Unschärfe, nicht die Streuung. Die Streuung ist standardmäßig 0. Wenn Sie eigentlich die Streuung auf 8px setzen und die Unschärfe auf etwas anderes wollten, ist die Kurzform falsch und der Schatten wird nicht mit Ihrem Design übereinstimmen. Überprüfen Sie die Reihenfolge immer: offset-x, offset-y, blur, spread.",
    ]},

    { type: "h2", content: ["Geschichtete Schatten: eine Eigenschaft, mehrere Werte"] },
    { type: "p", content: [
      "CSS erlaubt das Stapeln mehrerer Schatten auf demselben Element durch Komma-Trennung. Jede Schicht wird von oben nach unten gerendert — der erste Schatten liegt oben, jeder folgende Schatten dahinter. So werden realistische Tiefeffekte erzeugt: ein einzelner Schatten wirkt flach und künstlich, aber zwei oder drei sorgfältig abgestimmte Schichten erzeugen die nuancierte Schattierung, die unsere Augen mit realen Objekten assoziieren.",
    ]},
    { type: "code", lang: "css", content: `.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.08);
}` },
    { type: "p", content: [
      "In diesem Beispiel ist der erste Schatten ein enger, niedrig deckender Akzent direkt unter der Karte — er simuliert den Kontaktschatten, wo die Oberfläche den Tisch berührt. Der zweite erzeugt das Hauptgefühl der Erhebung mit einer mittleren weichen Streuung. Der dritte ist ein weiter, schwacher Schleier, der das gesamte Umgebungslicht andeutet. Das Ergebnis liest sich als natürliche Tiefe und nicht als flacher grauer Schleier.",
    ]},

    { type: "h2", content: ["Häufige Fehler und wie man sie behebt"] },
    { type: "p", content: [
      "Der häufigste Fehler ist eine Unschärfe, die viel zu groß für das Element ist. Ein 36px hoher Button sollte keine 60px-Unschärfe haben — das Ergebnis ist eine diffuse Wolke, die das Element vollständig von der Oberfläche loslöst. Als Faustregel: halten Sie die Unschärfe zwischen 0,5× und 2× der kürzeren Elementseite für natürlich wirkende Erhebung.",
    ]},
    { type: "p", content: [
      "Der zweite Fehler ist, die implizite zweite Schicht zu vergessen. Wenn ein Design \"den Schatten auf dem Mockup\" aufruft, sieht er so aus, weil der Designer in Figma oder Sketch zwei oder drei box-shadows übereinander gelegt hat. Das Kopieren nur des obersten sichtbaren Schattens produziert einen Schatten, der zu scharf oder zu dunkel wirkt. Prüfen Sie immer, ob das Mockup geschichtete Schatten verwendet — das ist fast immer der Fall.",
    ]},
    { type: "p", content: [
      "Eine weitere Falle ist die gleichzeitige Verwendung von ",
      { text: "filter: drop-shadow()", code: true },
      " und box-shadow. Sie sind nicht dasselbe. Box-shadow folgt dem rechteckigen border-box des Elements, während drop-shadow Alpha-Transparenz respektiert — ein Element mit transparentem Hintergrund und einem abgerundeten SVG-Icon bekommt einen Schatten, der die Icon-Form nachzeichnet. Aber drop-shadow kann keine Streuung, kein inset und ist bei langen Listen langsamer.",
    ]},
    { type: "list", items: [
      [{ text: "Zu große Unschärfe: ", bold: true }, { text: "halten Sie die Unschärfe proportional zur Elementgröße; 4px–16px deckt die meisten UI-Karten." }],
      [{ text: "Flachheit durch eine Schicht: ", bold: true }, { text: "stapeln Sie mindestens zwei Schatten — einen engen Kontaktschatten und einen breiten Umgebungsschatten." }],
      [{ text: "Zu großer Offet: ", bold: true }, { text: "Offsets über 8–10px machen das Element abgehoben; für realistische Erhebung klein halten." }],
      [{ text: "Inset vergessen: ", bold: true }, { text: "gedrückte Buttons und Eingabefelder brauchen fast immer Inset-Schatten, keine außenliegenden." }],
    ]},

    { type: "h2", content: ["Barrierefreiheit: beschatteter Text und Kontrast"] },
    { type: "p", content: [
      "Box-shadow auf einem Container ist in der Regel für die Barrierefreiheit unbedenklich — er beeinflusst nicht die Kontrastverhältnisse des Textes. Aber text-shadow, der ähnlich funktioniert, kann die Lesbarkeit bei übermäßigem Einsatz beeinträchtigen. WCAG 2.1 regelt text-shadow nicht direkt, aber die Kontrastanforderung zwischen Text und benachbartem Hintergrund gilt weiterhin. Ein text-shadow in derselben Farbe wie der Hintergrund erzeugt einen Haloeffekt, der Buchstabenformen für Sehbehinderte verschwimmen lassen kann.",
    ]},
    { type: "p", content: [
      "Die praktische Regel: halten Sie die text-shadow-Unschärfe klein (1px–2px), verwenden Sie niedrige Deckkraft (unter 30 %) und verlassen Sie sich niemals allein auf einen Schatten, um Text von einem bildlastigen Hintergrund zu trennen. Wenn der Hintergrund ein Bild oder Gradient ist, ist der Schatten dekorativ — zwischen Textfarbe und dem dunkelsten/hellsten unterliegenden Ton des Hintergrunds muss immer noch ausreichender Kontrast bestehen. Im Zweifel prüfen Sie das Element mit sichtbarem Hintergrund in einem Kontrast-Checker.",
    ]},
    { type: "note", tone: "success", title: "Schatten auf interaktiven Elementen", content: [
      "Hover- und Fokus-Zustände, die die Schattenintensität erhöhen (größere Unschärfe oder höhere Deckkraft), verbessern die Wahrnehmbarkeit für Nutzer, die auf visuelles Feedback angewiesen sind. Dies ist von WCAG nicht streng vorgeschrieben, aber eine weit verbreitete Best Practice, die auch der Tastaturnavigation hilft: der Schatten wächst, wenn das Element :focus-visible erhält, und gibt eine klare Affordance, ohne sich nur auf den Browser-Outline zu verlassen.",
    ]},

    { type: "h2", content: ["Performance: box-shadow versus Filter versus Bilder"] },
    { type: "p", content: [
      "Box-shadow ist eine CSS-Eigenschaft, die Browser beim Malen der Elementschicht rasterisieren. Auf moderner Hardware hat eine Handvoll box-shadows vernachlässigbare Kosten. Das Performance-Problem taucht in zwei Szenarien auf: lange scrollbare Listen mit dutzenden beschatteten Elementen und Schatten auf Elementen mit vielen Kindern, die bei Animation häufige Neumalungen auslösen.",
    ]},
    { type: "table", columns: ["Technik", "Streuungs-Support", "Inset-Support", "Alfa-respektiert", "GPU-freundlich", "Beste Verwendung"], rows: [
      ["box-shadow", "Ja", "Ja", "Nein (malt border-box)", "Gut", "Karten, Buttons, Container"],
      ["filter: drop-shadow()", "Nein", "Nein", "Ja (folgt Alfa)", "Mittel", "Icons, Bilder mit transparentem Hintergrund"],
      ["Vorgerendertes PNG-Bild", "Über Bild", "Nichts", "Ja", "N/A (Raster)", "Komplexe dekorative Schatten auf statischen Elementen"],
      ["text-shadow", "Nein", "Nichts", "Ja", "Gut", "Überschriften-Leuchten, subtile Texttiefe"],
    ]},
    { type: "p", content: [
      "Die allgemeine Empfehlung: verwenden Sie box-shadow für UI-Komponenten, filter: drop-shadow(), wenn alpha-gezeichnete Schatten auf Bildern oder Icons benötigt werden, und vermeiden Sie vorgerenderte Schatten-Bilder, sofern das visuelle Motiv nicht wirklich komplex und statisch ist. Die Animation von box-shadow ist möglich, löst aber pro Frame einen Neumalvorgang aus; für gleichmäßige 60-fps-Animation erwägen Sie transform: translateZ(0) oder will-change: transform, um das Element auf eine eigene Compositor-Schicht zu befördern, oder Sie platzieren den Schatten auf einem Pseudo-Element, das unabhängig befördert wird.",
    ]},

    { type: "h2", content: ["Der Box-Shadow-Generator auf Convrs"] },
    { type: "p", content: [
      "Convrs bietet einen ",
      { text: "Box-Shadow-Generator", bold: true },
      " der das Raten bei der Schattenerstellung eliminiert. Stellen Sie Offet-x, Offet-y, Unschärfe, Streuung und Farbe mit Schiebereglern ein und sehen Sie eine Live-Vorschau des Ergebnisses auf verschiedenen Hintergrundfarben. Fügen Sie Schichten hinzu und ordnen Sie sie neu an, um realistische Tiefe zu erzeugen. Jede Änderung aktualisiert die CSS-Ausgabe sofort — kopieren Sie sie direkt in Ihr Stylesheet. Das Tool läuft vollständig in Ihrem Browser; keine Schattenwerte oder Vorschaubilder werden an einen Server gesendet.",
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "CSS Box-Shadow explicado: sintaxis, desenfoque, expansión y rendimiento",
    eyebrow: "Diseño",
    description:
      "Box-shadow puede producir con una sola propiedad CSS brillos suaves, tarjetas definidas y profundidad multicapa. Comprende qué controla cada valor, la confusión entre desenfoque y expansión, las sombras en capas, accesibilidad y rendimiento.",
    excerpt:
      "Qué hace box-shadow realmente: desplazamiento, desenfoque, expansión, color, inset — más sombras en capas, errores comunes y comparativa de rendimiento.",
    readingTime: "9 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: [
      "Copias una sombra de algún generador, la pegas en tu hoja de estilos y el resultado no se parece en nada a la vista previa que acabas de ver. El desenfoque es enorme, el elemento parece flotar diez píxeles sobre la página y añadir una segunda sombra hace que todo desaparezca. El problema no es que box-shadow sea difícil — es que la mayoría de los desarrolladores nunca han aprendido qué controla realmente cada uno de los cinco valores. Esta guía desmonta la propiedad, explica desenfoque contra expansión, muestra sombras en capas, cubre trampas de accesibilidad y oportunidades de rendimiento, y termina con una herramienta que elimina las conjeturas por completo.",
    ]},

    { type: "h2", content: ["Los cinco valores detrás de cada box-shadow"] },
    { type: "p", content: ["Una declaración completa de box-shadow se ve así:"] },
    { type: "code", lang: "css", content: `box-shadow: 4px 6px 12px 0 rgba(0, 0, 0, 0.25);` },
    { type: "p", content: [
      "Léelo de izquierda a derecha. ",
      { text: "4px", bold: true },
      " es el ",
      { text: "offset-x", code: true },
      " — cuánto se desplaza la sombra horizontalmente. ",
      { text: "6px", bold: true },
      " es el ",
      { text: "offset-y", code: true },
      " — cuánto se desplaza verticalmente. Estos dos son el mínimo: sin ellos la sombra queda justo detrás del elemento, perfectamente centrada, lo cual rara vez es útil.",
      { text: " 12px", bold: true },
      " es el ",
      { text: "blur-radius", code: true },
      ". Controla cuánto se suaviza la sombra — no la mueve, difumina los bordes. ",
      { text: "0", bold: true },
      " es el ",
      { text: "spread-radius", code: true },
      ". Un valor positivo expande la sombra más allá de la caja del elemento; un valor negativo la encoge. Y ",
      { text: "rgba(0, 0, 0, 0.25)", bold: true },
      " es el color de sombra con 25 % de opacidad.",
    ]},
    { type: "p", content: [
      "Hay un valor sexto opcional: la palabra clave ",
      { text: "inset", code: true },
      ". Cuando está presente, la sombra se dibuja dentro del elemento en vez de fuera. Las sombras inset son la forma estándar de crear profundidad interna — campos de entrada, botones pulsados, tarjetas hundidas. Omite la palabra clave y todas las sombras caen hacia afuera por defecto.",
    ]},

    { type: "h2", content: ["Radio de desenfoque contra radio de expansión: la confusión que cuesta horas"] },
    { type: "p", content: [
      "Estos dos valores son los que más se intercambian, y la diferencia visual es dramática. El ",
      { text: "radio de desenfoque", bold: true },
      " no hace la sombra más grande ni más pequeña — controla cuán nítidamente el borde de la sombra pasa a ser transparente. Un desenfoque de ",
      { text: "0", code: true },
      " produce una sombra de borde duro idéntica a la silueta del elemento. Un desenfoque de ",
      { text: "20px", code: true },
      " crea un gradiente amplio y suave que se extiende mucho más allá del elemento. El navegador lo implementa como un desenfoque gaussiano sobre el mapa de bits de la sombra antes de componerlo bajo el elemento.",
    ]},
    { type: "p", content: [
      "El radio de expansión, en cambio, es una operación geométrica directa. Infla o encoge el rectángulo de la sombra antes de aplicar cualquier desenfoque. Una expansión de ",
      { text: "4px", code: true },
      " hace la sombra 4px más grande por cada lado; ",
      { text: "-4px", code: true },
      " la hace 4px más pequeña. El efecto práctico: la expansión controla cuán visible es la sombra en primer lugar, mientras que el desenfoque controla cuán suave se ve. Un truco habitual para una tarjeta sutilmente elevada es mantener el desenfoque moderado y la expansión en cero o ligeramente negativa — esto evita el \"gran halo oscuro\" que surge de un desenfoque grande sin ajuste de expansión.",
    ]},
    { type: "note", tone: "warning", title: "La trampa del cuarto valor ausente", content: [
      "Cuando escribes tres valores — como box-shadow: 0 4px 8px rgba(0,0,0,0.15) — el tercer número es el desenfoque, no la expansión. La expansión es 0 por defecto. Si en realidad querías poner la expansión en 8px y el desenfoque en otro valor, la forma abreviada es incorrecta y la sombra no coincidirá con tu diseño. Verifica siempre el orden: offset-x, offset-y, blur, spread.",
    ]},

    { type: "h2", content: ["Sombras en capas: una propiedad, múltiples valores"] },
    { type: "p", content: [
      "CSS permite apilar múltiples sombras en el mismo elemento separándolas con comas. Cada capa se renderiza de primera a última — la primera sombra está arriba, y cada sombra subsiguiente se sitúa detrás. Así se construyen los efectos de profundidad realista: una sola sombra luce plana y artificial, pero dos o tres capas cuidadosamente ajustadas producen la sombreada sutil que nuestros ojos asocian con objetos reales.",
    ]},
    { type: "code", lang: "css", content: `.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0 12),
    0 12px 24px rgba(0, 0, 0, 0.08);
}` },
    { type: "p", content: [
      "En este ejemplo, la primera sombra es un acento estrecho y de baja opacidad justo debajo de la tarjeta — simula la sombra de contacto donde la superficie toca la mesa. La segunda crea la sensación principal de elevación con una expansión suave de rango medio. La tercera es un velado amplio y tenue que implica la iluminación ambiental general. El resultado se lee como profundidad natural en lugar de una mancha gris plana.",
    ]},
    { type: "p", content: [
      "Un segundo patrón habitual es combinar una sombra nítida con una difuminada. La capa nítida (desenfoque bajo o cero, expansión ligeramente negativa) crea un borde definido, mientras que la capa suave rellena la difusión ambiental. Material Design usa exactamente este enfoque: una sombra dura corta más una suave amplia produce el efecto de papel levantado que se ve correcto a cualquier nivel de zoom.",
    ]},

    { type: "h2", content: ["Errores comunes y cómo corregirlos"] },
    { type: "p", content: [
      "El error más frecuente es usar un valor de desenfoque demasiado grande para el tamaño del elemento. Un botón de 36px de alto no debería tener un desenfoque de 60px — el resultado es una nube difusa que despega el elemento de la superficie por completo. Como regla práctica, mantén el desenfoque entre 0,5× y 2× la dimensión más corta del elemento para una elevación con aspecto natural.",
    ]},
    { type: "p", content: [
      "El segundo error es olvidar la segunda capa implícita. Cuando un diseño llama a \"la sombra del diseño\", a menudo se ve así porque el diseñador apiló dos o tres box-shadows en Figma o Sketch. Copiar solo la sombra visible superior produce una sombra demasiado nítida o demasiado oscura. Comprueba siempre si el mockup usa sombras en capas — casi siempre lo hace.",
    ]},
    { type: "p", content: [
      "Una trampa más es usar ",
      { text: "filter: drop-shadow()", code: true },
      " como sinónimo de box-shadow. No son lo mismo. Box-shadow sigue el borde rectangular del elemento, mientras que drop-shadow respeta la transparencia alfa — un elemento con fondo transparente y un icono SVG redondeado recibirá una sombra que traza la forma del icono. Pero drop-shadow no admite radio de expansión, ni inset, y rinde peor en listas largas.",
    ]},
    { type: "list", items: [
      [{ text: "Desenfoque arbitrario enorme: ", bold: true }, { text: "mantén el desenfoque proporcional al tamaño del elemento; 4px–16px cubre la mayoría de tarjetas UI." }],
      [{ text: "Planitud de una sola capa: ", bold: true }, { text: "apila al menos dos sombras — una capa de contacto estrecha y una capa ambient amplia." }],
      [{ text: "Desplazamiento demasiado grande: ", bold: true }, { text: "desplazamientos superiores a 8–10px hacen el elemento despegado; para elevación realista mantenlos pequeños." }],
      [{ text: "Olvidar inset: ", bold: true }, { text: "botones pulsados y campos de entrada casi siempre necesitan sombras inset, no externas." }],
    ]},

    { type: "h2", content: ["Accesibilidad: texto con sombra y contraste"] },
    { type: "p", content: [
      "Box-shadow en un contenedor generalmente es seguro para la accesibilidad — no afecta las ratios de contraste del texto. Pero text-shadow, que funciona de forma similar, puede reducir la legibilidad cuando se abusa de él. WCAG 2.1 no regula text-shadow directamente, pero el requisito de contraste entre el texto y su fondo adyacente sigue siendo aplicable. Un text-shadow del mismo color que el fondo crea un efecto de halo que puede difuminar las formas de las letras para usuarios con baja visión.",
    ]},
    { type: "p", content: [
      "La regla práctica: mantén el desenfoque de text-shadow pequeño (1px–2px), usa opacidad baja (menos del 30 %) y nunca dependas únicamente de una sombra para separar el texto de un fondo con imágenes. Si el fondo es una imagen o degradado, la sombra es decorativa — entre el color del texto y el tono subyacente más oscuro/más claro del fondo siempre debe haber contraste suficiente. En caso de duda, pasa el elemento por un verificador de contraste con el fondo visible detrás de la sombra.",
    ]},
    { type: "note", tone: "success", title: "Sombras en elementos interactivos", content: [
      "Los estados hover y focus que aumentan la intensidad de la sombra (más desenfoque u opacidad más alta) mejoran la percepción para usuarios que dependen de la retroalimentación visual. WCAG no lo exige estrictamente, pero es una práctica ampliamente recomendada que también beneficia la navegación por teclado: la sombra crece cuando el elemento recibe :focus-visible, ofreciendo una señal clara sin depender solo del contorno del navegador.",
    ]},

    { type: "h2", content: ["Rendimiento: box-shadow contra filtro contra imágenes"] },
    { type: "p", content: [
      "Box-shadow es una propiedad CSS que los navegadores rasterizan al pintar la capa del elemento. En hardware moderno, unas pocas box-shadows tienen coste despreciable. La preocupación de rendimiento aparece en dos escenarios: listas largas con decenas de elementos con sombra, y sombras en elementos con muchos hijos que activan repintados frecuentes durante la animación.",
    ]},
    { type: "table", columns: ["Técnica", "Soporte de expansión", "Soporte de inset", "Respeta alfa", "Amigable con GPU", "Mejor uso"], rows: [
      ["box-shadow", "Sí", "Sí", "No (pinta border-box)", "Bueno", "Tarjetas, botones, contenedores"],
      ["filter: drop-shadow()", "No", "No", "Sí (sigue alfa)", "Moderado", "Iconos, imágenes con fondo transparente"],
      ["PNG pre-renderizado", "Vía imagen", "N/A", "Sí", "N/A (raster)", "Sombras decorativas complejas en elementos estáticos"],
      ["text-shadow", "No", "N/A", "Sí", "Bueno", "Brillo de titular, profundidad sutil de texto"],
    ]},
    { type: "p", content: [
      "La guía general: usa box-shadow para componentes de UI, filter: drop-shadow() cuando necesites sombras con trazado alfa en imágenes o iconos, y evita imágenes de sombra prerenderizadas a menos que el visual sea realmente complejo y estático. Animar box-shadow es posible pero activa un repintado por cada frame; para animación fluida a 60fps, considera combinar transform: translateZ(0) o will-change: transform para promover el elemento a su propia capa del compositor, o coloca la sombra en un pseudo-elemento que se promueva independientemente.",
    ]},

    { type: "h2", content: ["El generador de box-shadow en Convrs"] },
    { type: "p", content: [
      "Convrs ofrece un ",
      { text: "generador de box-shadow", bold: true },
      " que elimina las conjeturas de la creación de sombras. Ajusta offset-x, offset-y, desenfoque, expansión y color con deslizadores mientras ves una vista previa en vivo del resultado sobre diferentes colores de fondo. Añade y reordena capas para construir profundidad realista. Cada cambio actualiza la salida de CSS al instante — cópiala directamente en tu hoja de estilos. La herramienta funciona enteramente en tu navegador; ningún valor de sombra ni vista previa se envía a ningún servidor.",
    ]},
  ],
};

const cssShadowDesignGuide: GuideDefinition = {
  slug: "css-shadow-design-guide",
  content: { en, tr, de, es },
};

export default cssShadowDesignGuide;
