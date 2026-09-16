import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "SVG for the Web: When Vectors Beat Pixels — and When They Don't",
    eyebrow: "Design",
    description:
      "SVG is XML geometry, not a bitmap. Learn when vector genuinely beats PNG, when it is the wrong tool, how viewBox differs from width and height, how to embed SVG safely, and which delivery channels still force you to rasterize to PNG.",
    excerpt:
      "What SVG really is under the hood, when it beats PNG (logos, icons, crisp zoom), when it is a trap, safe embedding — and when you must still rasterize to PNG.",
    readingTime: "9 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: [
      "A designer sends a 3 megabyte PNG of a logo that could be an 800 byte SVG file. Every email, every load, every page pays for that download — the recipient's phone decodes it, the mail client caches it, and nobody ever stops to notice that the whole image is a circle, two strokes and a shape. This guide is about understanding what vector graphics actually are, when SVG genuinely beats PNG, when it is a trap, and why you will still need a PNG now and then.",
    ]},

    { type: "h2", content: ["SVG is a recipe, not a painting"] },
    { type: "p", content: [
      "A PNG is a bitmap: a grid of colored pixels, each one a stored value. SVG — ",
      { text: "Scalable Vector Graphics", bold: true },
      " — is XML, plain text that describes shapes with geometry. A rectangle is ",
      { text: "<rect x=\"...\" y=\"...\" width=\"...\" height=\"...\">", code: true },
      "; a circle is \"center at (12,12) with radius 10\"; a path is a sequence of move, line and curve commands. The browser reads those instructions, computes the geometry, and draws — at whatever resolution the screen actually needs. Zoom in on a vector and there is nothing to blur; the browser simply re-runs the math with a bigger scale.",
    ]},
    { type: "p", content: [
      "A check-badge icon — a blue circle with a white check — is a complete, real example:",
    ]},
    { type: "code", lang: "xml", content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#ffffff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "That whole file is under 250 bytes. Exported the same shape as a 2x PNG you get 3–10 kilobytes; scaled up to a 512-pixel site logo, tens of kilobytes. And because SVG is text, it is inspectable and diffable: open it in any editor, grep it, commit it to git and see exactly what changed. A PNG is a wall of pixels; an SVG is source code.",
    ]},

    { type: "h2", content: ["When SVG beats PNG without a fight"] },
    { type: "p", content: [
      "SVG wins decisively in a few specific situations. If your image is mostly flat shapes with clean edges, SVG is not a nice-to-have — it is measurably lighter and endlessly sharper:",
    ]},
    { type: "list", items: [
      [{ text: "Logos and icons: ", bold: true }, { text: "flat, geometric artwork built from fills, strokes and paths. The canonical SVG use case." }],
      [{ text: "Crisp at any zoom: ", bold: true }, { text: "text and edges stay razor sharp on a 4K monitor, in a zoomed corner of a dashboard, or printed on a banner at 300dpi. A PNG blurs the moment it passes its native size." }],
      [{ text: "Tiny files for simple shapes: ", bold: true }, { text: "file size follows complexity, not resolution. A typical icon stays a fraction of the same PNG." }],
      [{ text: "CSS theming: ", bold: true }, { text: "inline SVG inherits " }, { text: "currentColor", code: true }, { text: " and reacts to hover, focus and dark-mode states. A PNG is frozen at export time." }],
      [{ text: "Animation and interactivity: ", bold: true }, { text: "SVG elements are part of the DOM — you can click them, animate them with CSS or JavaScript, and bind them to data. None of that exists in a static image." }],
    ]},

    { type: "h2", content: ["When SVG is the wrong tool"] },
    { type: "p", content: [
      "The same logic that makes SVG tiny for icons makes it bloated for photography. A photo is millions of individual color decisions; describing it as vectors means thousands of gradient stops and blurred shapes, and the file balloons past an equivalent JPEG while the browser grind on every frame. Heavily filtered artwork — soft shadows, glows, layered blur — is usually better delivered as a raster.",
    ]},
    { type: "p", content: [
      "Rendering is the hidden cost. A PNG is decoded once and blitted to the screen; an SVG is re-rasterized to the target size on every layout pass, every zoom, every animation frame. One complex SVG on a page is fine. Fifty snowflake SVGs, each wrapped in a blur filter, on a scrolling page will visibly jank. Measure performance before you vectorize everything in sight:",
    ]},
    { type: "table", columns: ["", "SVG", "PNG"], rows: [
      ["Scaling", "Infinite — geometry recomputes at any size", "Blurs and aliases past native pixels"],
      ["Simple shapes", "~0.3 kB for a typical icon", "2–10 kB even at 2x"],
      ["Photographs", "Bloats and renders slowly", "Compressed efficiently, universally supported"],
      ["Transparency", "Native — any shape or hole", "Native via the alpha channel"],
      ["Styling & animation", "CSS, hover, animation, scripting", "None; a new export per change"],
      ["Where it works", "Anything modern, plus the exceptions below", "Literally everywhere"],
    ]},

    { type: "h2", content: ["viewBox, width and height: deciding who sets the size"] },
    { type: "p", content: [
      "The most confusing part of an SVG file is the difference between the display size and the coordinate system. The ",
      { text: "width", code: true },
      " and ",
      { text: "height", code: true },
      " attributes (or the CSS properties) say how large the image should be drawn, in CSS pixels. The ",
      { text: "viewBox", code: true },
      " says how large the drawing itself is: ",
      { text: "viewBox=\"0 0 24 24\"", code: true },
      " means \"the artwork is 24 units wide and 24 units tall, starting at 0,0\". The browser divides the display size by those units and scales the entire drawing — which is why a 24-unit icon renders perfectly at 200 pixels.",
    ]},
    { type: "p", content: [
      "With a ",
      { text: "viewBox", code: true },
      " present, the aspect ratio survives by default. ",
      { text: "preserveAspectRatio=\"xMidYMid meet\"", code: true },
      " is the default and behaves like ",
      { text: "object-fit: contain", code: true },
      " — the artwork fits, centered, with empty space when the box ratio differs; the ",
      { text: "slice", code: true },
      " variant behaves like ",
      { text: "object-fit: cover", code: true },
      ". One habit worth keeping: do not strip the width and height attributes from the file. With a viewBox present modern browsers let CSS override them cleanly, and keeping the attributes gives the browser intrinsic dimensions before the stylesheet arrives.",
    ]},

    { type: "h2", content: ["Putting an SVG on a page: img, inline, or background"] },
    { type: "p", content: [
      "Where you place the SVG decides what it is allowed to do. Four common containers:",
    ]},
    { type: "table", columns: ["Method", "Cacheable", "Theme & animate", "Scripts inside", "Best for"], rows: [
      ["<img src=\"logo.svg\">", "Yes", "No", "Never run", "Logos, icons, page images"],
      ["Inline <svg>…</svg>", "No", "Yes", "Yes", "Icons you need to style or move"],
      ["background-image: url(logo.svg)", "Yes", "Limited", "Never run", "Decorative textures, masks"],
      ["<object> or <iframe>", "Yes", "No", "Yes", "Legacy interactive widgets"],
    ]},
    { type: "p", content: [
      "The ",
      { text: "<img>", code: true },
      " tag is the workhorse: static, cacheable and parallel-loading. It is also deliberately inert — the moment you need hover states, ",
      { text: "currentColor", code: true },
      " or animation, you have to inline the SVG and accept the extra HTML weight. Background images suit decorative, repeated art that the accessibility tree should never see. ",
      { text: "<object>", code: true },
      " still executes scripts and external resources, which is exactly why it has become mostly obsolete for icons.",
    ]},

    { type: "h2", content: ["External SVG pitfalls: CSP, cookies and scripts"] },
    { type: "p", content: [
      "An SVG is text, so it can carry a ",
      { text: "<script>", code: true },
      " inside it. What happens next depends entirely on where you load it. Inside ",
      { text: "<img src>", code: true },
      " the SVG is treated as a static image: scripts never execute, and external references — fonts, stylesheets, other images — are ignored for security. That is the safe container. Inside ",
      { text: "<object>", code: true },
      ", an inline ",
      { text: "<iframe>", code: true },
      ", or a directly navigated document, an SVG is a full document: scripts run and cookies are sent. A third-party .svg in that position is active code on your page.",
    ]},
    { type: "p", content: [
      "Content-Security-Policy assigns each container. ",
      { text: "img-src", code: true },
      " governs ",
      { text: "<img>", code: true },
      " and background images; ",
      { text: "object-src", code: true },
      " governs ",
      { text: "<object>", code: true },
      " and ",
      { text: "<embed>", code: true },
      "; inline SVG inside HTML falls under the page's own ",
      { text: "script-src", code: true },
      " and ",
      { text: "style-src", code: true },
      ". And a strict policy that does not list an SVG's host will refuse the file outright — one more reason to self-host what you embed instead of hotlinking.",
    ]},
    { type: "note", tone: "warning", title: "Inlining foreign SVG is code injection", content: [
      "A minified SVG downloaded from an icon site can hide a <script> or a fetch to a tracking domain; a thumbnail preview never shows it. Validate anything you did not author, or rasterize it to PNG before embedding. Inlining untrusted SVG is a classic route to stored XSS.",
    ]},

    { type: "h2", content: ["Accessibility: title, desc and label"] },
    { type: "p", content: [
      "An SVG carries no meaning to a screen reader until you attach one. Give the element ",
      { text: "role=\"img\"", code: true },
      ", a ",
      { text: "<title>", code: true },
      " for its name, a ",
      { text: "<desc>", code: true },
      " for the longer description, and wire them together with ",
      { text: "aria-labelledby", code: true },
      ":",
    ]},
    { type: "code", lang: "xml", content: `<svg role="img" aria-labelledby="badgeTitle badgeDesc" viewBox="0 0 24 24">
  <title id="badgeTitle">Verified badge</title>
  <desc id="badgeDesc">A blue circle containing a white check mark</desc>
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "Two more habits pay off. Use real ",
      { text: "<text>", code: true },
      " elements instead of converting text to outlined paths — screen readers read real text, and it stays selectable and searchable. And if an SVG is purely decorative, add ",
      { text: "aria-hidden=\"true\"", code: true },
      " (or keep it as a background image) so assistive technology skips it entirely.",
    ]},

    { type: "h2", content: ["When you still must rasterize to PNG"] },
    { type: "p", content: [
      "Vector is not universal. Plenty of real delivery channels refuse or mangle SVG, and the only safe answer is a PNG at the right size:",
    ]},
    { type: "list", items: [
      [{ text: "Email clients: ", bold: true }, { text: "Outlook — especially the Windows renderer — does not render SVG reliably; transactional email still ships PNG because a bitmap is the one safe bet." }],
      [{ text: "Social preview cards: ", bold: true }, { text: "Open Graph and Twitter Card scrapers fetch your og:image, and most render a raster reliably; SVG previews are often refused or come back blank." }],
      [{ text: "Favicons: ", bold: true }, { text: "modern browsers accept .svg favicons, but Apple touch icons and older tooling want PNG (apple-touch-icon.png) — you ship both." }],
      [{ text: "Old browsers and WebViews: ", bold: true }, { text: "anything pre-2017, some embedded WebViews and legacy kiosks have no SVG support at all." }],
      [{ text: "Upload forms: ", bold: true }, { text: "CMS, marketplace and stock-design platforms reject .svg by extension because it can contain scripts; PNG passes every validator." }],
    ]},

    { type: "h2", content: ["Rasterize SVG to PNG — in your browser, on Convrs"] },
    { type: "p", content: [
      "The cleanest workflow keeps the SVG as the source of truth and rasterizes only for the delivery channel that demands it. Convrs' ",
      { text: "SVG to PNG converter", bold: true, url: "/svg-to-png", internal: true },
      " turns any SVG into a crisp PNG inside your browser: paste or drop the file, choose the pixel size (256, 512 or 1024 for a retina icon, for instance), and download the result. The conversion runs entirely on the Canvas API in your own tab — the file is never uploaded and no server ever sees it. No sign-up, no queue, nothing to trust beyond the browser you already have.",
    ]},
    { type: "p", content: [
      "Keep the vector. Rasterize where the world demands it. And the next time a designer ships you a 3 megabyte logo, you know exactly what to say.",
    ]},
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Web için SVG: Vektörler Pikselleri Ne Zaman Yener — ve Ne Zaman Yenmez",
    eyebrow: "Tasarım",
    description:
      "SVG bit eşlemi değil, XML geometrisidir. Vektörün PNG'yi ne zaman gerçekten yendiğini, ne zaman yanlış araç olduğunu, viewBox'un genişlik ve yükseklikten farkını, SVG'yi güvenli gömme yollarını ve hangi platformların sizi yine de PNG'ye rasterize etmeye zorladığını öğrenin.",
    excerpt:
      "SVG'nin aslında ne olduğu, PNG'yi ne zaman yendiği (logolar, simgeler, net yakınlaştırma), ne zaman tuzak olduğu, güvenli gömme ve yine de PNG gerektiren durumlar.",
    readingTime: "9 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: [
      "Bir tasarımcı, 800 byte'lık bir SVG dosyası olabilecek 3 megabaytlık bir PNG logo gönderir. Her e-posta, her sayfa yüklemesi bu indirmenin bedelini öder — alıcının telefonu dosyayı çözer, posta istemcisi önbelleğe alır ve kimse fark etmez ki görselin tamamı bir daire, iki çizgi ve bir şekildir. Bu rehber, vektör grafiklerin aslında ne olduğunu, SVG'nin PNG'yi ne zaman gerçekten yendiğini, ne zaman tuzak olduğunu ve neden arada bir PNG'ye ihtiyaç duyacağınızı anlatır.",
    ]},

    { type: "h2", content: ["SVG bir tarif, resim değil"] },
    { type: "p", content: [
      "PNG bir bit eşlemidir: her biri saklanan bir değer olan renkli piksellerden oluşan bir ızgara. SVG ise — ",
      { text: "Scalable Vector Graphics", bold: true },
      " — şekilleri geometriyle anlatan düz metin olan XML'dir. Bir dikdörtgen, ",
      { text: "<rect x=\"...\" y=\"...\" width=\"...\" height=\"...\">", code: true },
      " demektir; bir daire \"merkezi (12,12), yarıçapı 10\" demektir; bir yol, taşıma, çizgi ve eğri komutlarından oluşan bir dizidir. Tarayıcı bu talimatları okur, geometriyi hesaplar ve ekranın gerçekten ihtiyaç duyduğu çözünürlükte çizer. Bir vektörü yakınlaştırın, bulanıklaşacak piksel yoktur; tarayıcı matematiksel işlemi daha büyük bir ölçekle yeniden yürütür.",
    ]},
    { type: "p", content: [
      "Mavi daire içinde beyaz bir onay işareti olan rozet simgesi, eksiksiz ve gerçek bir örnektir:",
    ]},
    { type: "code", lang: "xml", content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#ffffff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "Dosyanın tamamı 250 byte'ın altındadır. Aynı şekli 2x PNG olarak dışa aktardığınızda 3–10 kilobayt eder; 512 piksel site logosuna büyütüldüğünde onlarca kilobayt. SVG metin olduğu için ayrıca incelenebilir ve karşılaştırılabilir: herhangi bir düzenleyicide açın, grep'leyin, git'e işleyin ve neyin değiştiğini tam olarak görün. PNG bir piksel duvarıdır; SVG ise kaynak koddur.",
    ]},

    { type: "h2", content: ["SVG'nin tartışmasız kazandığı durumlar"] },
    { type: "p", content: [
      "SVG birkaç durumda kesin biçimde kazanır. Görseliniz çoğunlukla düz şekiller ve temiz kenarlardan oluşuyorsa, SVG lüks değil — ölçülebilir şekilde daha hafif ve sınırsız keskinliktedir:",
    ]},
    { type: "list", items: [
      [{ text: "Logolar ve simgeler: ", bold: true }, { text: "dolgu, kontur ve yollardan kurulu düz, geometrik işler. SVG'nin başlıca kullanım alanı." }],
      [{ text: "Her yakınlaştırmada netlik: ", bold: true }, { text: "metin ve kenarlar 4K monitörde, gösterge panelinin büyütülmüş köşesinde ya da 300dpi'de basılan bir afişte jilet gibi keskin kalır. PNG, doğal boyutunu geçtiği anda bulanıklaşır." }],
      [{ text: "Basit şekillerde küçük dosya: ", bold: true }, { text: "dosya boyutu çözünürlüğü değil karmaşıklığı izler; sıradan bir simge, aynı PNG'nin çok küçük bir kısmıdır." }],
      [{ text: "CSS ile tema: ", bold: true }, { text: "satır içi SVG " }, { text: "currentColor", code: true }, { text: " değerini devralır ve üzerine gelme, odak ile karanlık mod durumlarına tepki verir. PNG dışa aktarıldığı anda donmuştur." }],
      [{ text: "Animasyon ve etkileşim: ", bold: true }, { text: "SVG öğeleri DOM'un parçasıdır — tıklayabilir, CSS veya JavaScript ile canlandırabilir, veriye bağlayabilirsiniz. Statik bir görselde bunların hiçbiri yoktur." }],
    ]},

    { type: "h2", content: ["SVG'nin yanlış araç olduğu durumlar"] },
    { type: "p", content: [
      "SVG'yi simgelerde küçük yapan mantık, fotoğrafta onu şişmanlatır. Bir fotoğraf milyonlarca ayrı renk kararıdır; onu vektörlerle anlatmak binlerce gradyan durağı ve bulanık şekil demektir — dosya eşdeğer bir JPEG'i geçerken tarayıcı her karede zorlanır. Yumuşak gölgeler, parlama, katmanlı bulanıklık gibi ağır filtreli işler genellikle raster olarak sunulmalıdır.",
    ]},
    { type: "p", content: [
      "Gizli maliyet işleme aşamasındadır. PNG bir kez çözülür ve ekrana yazılır; SVG ise her yerleşim geçişinde, her yakınlaştırmada, her animasyon karesinde hedef boyuta yeniden rasterize edilir. Sayfadaki tek bir karmaşık SVG sorun değildir. Ama her biri bulanıklık filtresiyle sarılı elli kar tanesi SVG'si, kaydırılan bir sayfada görünür biçimde takılmaya başlar. Gözünüze kestirdiğiniz her şeyi vektörize etmeden önce performansı ölçün:",
    ]},
    { type: "table", columns: ["", "SVG", "PNG"], rows: [
      ["Ölçeklenme", "Sınırsız — geometri her boyutta yeniden hesaplanır", "Doğal piksel boyutunu geçince bulanık ve takılı"],
      ["Basit şekiller", "Sıradan bir simge için ~0,3 kB", "2x'te bile 2–10 kB"],
      ["Fotoğraflar", "Şişer ve yavaş işlenir", "Verimli sıkıştırılır, her yerde desteklenir"],
      ["Saydamlık", "Doğal — her şekil ya da boşluk", "Alfa kanalıyla doğal"],
      ["Stil ve animasyon", "CSS, üzerine gelme, animasyon, betik", "Yok; her değişiklik için yeni dışa aktarım"],
      ["Çalıştığı yer", "Modern her şey, aşağıdaki istisnalar dışında", "Kelimenin tam anlamıyla her yer"],
    ]},

    { type: "h2", content: ["viewBox ile genişlik ve yükseklik: boyutu kim belirler"] },
    { type: "p", content: [
      "Bir SVG dosyasının en kafa karıştırıcı kısmı, görüntü boyutu ile koordinat sistemi arasındaki farktır. ",
      { text: "width", code: true },
      " ve ",
      { text: "height", code: true },
      " öznitelikleri (ya da CSS özellikleri) görselin CSS pikseli cinsinden ne kadar büyük çizileceğini söyler. ",
      { text: "viewBox", code: true },
      " ise çizimin kendisinin ne kadar büyük olduğunu söyler: ",
      { text: "viewBox=\"0 0 24 24\"", code: true },
      ", \"çalışma 24 birim genişliğinde ve 24 birim yüksekliğinde, 0,0'dan başlıyor\" demektir. Tarayıcı görüntü boyutunu bu birimlere böler ve tüm çizimi buna göre ölçekler — 24 birimlik bir simgenin 200 pikselde kusursuz görünmesinin nedeni budur.",
    ]},
    { type: "p", content: [
      "Bir ",
      { text: "viewBox", code: true },
      " varsa en-boy oranı varsayılan olarak korunur. ",
      { text: "preserveAspectRatio=\"xMidYMid meet\"", code: true },
      " varsayılandır ve ",
      { text: "object-fit: contain", code: true },
      " gibi davranır — çalışma ortalanır, kutu oranı farklıysa kenarlarda boşluk kalır; ",
      { text: "slice", code: true },
      " kullanımı ise ",
      { text: "object-fit: cover", code: true },
      " gibi davranır. Unutmamanız gereken bir alışkanlık: dosyadan width ve height özniteliklerini silmeyin. viewBox varken modern tarayıcılar CSS'in bunları temiz biçimde ezmesine izin verir ve öznitelikleri korumak, stil sayfası gelmeden tarayıcıya içsel boyutları verir.",
    ]},

    { type: "h2", content: ["SVG'yi sayfaya koymak: img, satır içi ya da arka plan"] },
    { type: "p", content: [
      "SVG'yi nereye koyduğunuz, ona ne yapma izni verdiğinizi belirler. Dört yaygın kapsayıcı:",
    ]},
    { type: "table", columns: ["Yöntem", "Önbelleklenir", "Tema ve animasyon", "İçindeki betikler", "En iyi kullanım"], rows: [
      ["<img src=\"logo.svg\">", "Evet", "Hayır", "Asla çalışmaz", "Logolar, simgeler, sayfa görselleri"],
      ["Satır içi <svg>…</svg>", "Hayır", "Evet", "Evet", "Stil verilecek ya da hareket ettirilecek simgeler"],
      ["background-image: url(logo.svg)", "Evet", "Sınırlı", "Asla çalışmaz", "Dekoratif dokular, maskeler"],
      ["<object> ya da <iframe>", "Evet", "Hayır", "Evet", "Eski etkileşimli araçlar"],
    ]},
    { type: "p", content: [
      "Etiket ",
      { text: "<img>", code: true },
      " işçidir: statik, önbelleklenebilir ve paralel yüklenir. Aynı zamanda bilinçli olarak atıl tutulur — üzerine gelme durumları, ",
      { text: "currentColor", code: true },
      " ya da animasyon gerektiği anda SVG'yi satıra gömmek ve HTML ağırlığını kabul etmek zorundasınız. Arka plan görselleri, erişilebilirlik ağacının hiç görmemesi gereken dekoratif, yinelenen işlerin yeridir. ",
      { text: "<object>", code: true },
      " ise betikleri ve harici kaynakları hâlâ çalıştırır — simgeler için büyük ölçüde modasının geçmiş olmasının nedeni budur.",
    ]},

    { type: "h2", content: ["Harici SVG tuzakları: CSP, çerezler ve betikler"] },
    { type: "p", content: [
      "SVG metindir, yani içine ",
      { text: "<script>", code: true },
      " taşıyabilir. Sonra ne olacağı, dosyayı nereye yüklediğinize bağlıdır. ",
      { text: "<img src>", code: true },
      " içinde SVG statik bir resim gibi ele alınır: betikler asla çalışmaz ve yazı tipleri, stil sayfaları, diğer görseller gibi dış referanslar güvenlik gereği yok sayılır. Güvenli kapsayıcı budur. ",
      { text: "<object>", code: true },
      ", satır içi ",
      { text: "<iframe>", code: true },
      " ya da doğrudan açılan bir belge içinde ise SVG tam teşekküllü bir belgedir: betikler çalışır, çerezler gönderilir. O konumdaki üçüncü taraf bir .svg, sayfanızdaki aktif koddur.",
    ]},
    { type: "p", content: [
      "Content-Security-Policy her kapsayıcıyı ayrı atar. ",
      { text: "img-src", code: true },
      ", ",
      { text: "<img>", code: true },
      " ve arka plan görsellerini yönetir; ",
      { text: "object-src", code: true },
      ", ",
      { text: "<object>", code: true },
      " ile ",
      { text: "<embed>", code: true },
      " öğelerini yönetir; HTML içindeki satır içi SVG ise sayfanın kendi ",
      { text: "script-src", code: true },
      " ve ",
      { text: "style-src", code: true },
      " kurallarına tabidir. Bir politika, SVG'nin sunucusunu listelemiyorsa dosyayı doğrudan reddeder — bu da dışarıdan bağlamak yerine kendi dosyanızı barındırmanız için bir nedendir.",
    ]},
    { type: "note", tone: "warning", title: "Yabancı SVG'yi satıra gömmek kod enjeksiyonudur", content: [
      "Bir simge sitesinden indirilen minifiye SVG, önizlemede asla görünmeyen bir <script> veya bir izleme alanına fetch gizleyebilir. Kendinizin yazmadığı her şeyi doğrulayın ya da gömmeden önce PNG'ye rasterize edin. Güvenilmeyen SVG'yi satıra gömmek, kalıcı XSS'in klasik yollarından biridir.",
    ]},

    { type: "h2", content: ["Erişilebilirlik: title, desc ve etiket"] },
    { type: "p", content: [
      "Bir SVG, ek bir bilgi eklemeden ekran okuyucuya hiçbir anlam taşımaz. Öğeye ",
      { text: "role=\"img\"", code: true },
      ", adı için ",
      { text: "<title>", code: true },
      ", uzun açıklaması için bir ",
      { text: "<desc>", code: true },
      " verin ve hepsini ",
      { text: "aria-labelledby", code: true },
      " ile birbirine bağlayın:",
    ]},
    { type: "code", lang: "xml", content: `<svg role="img" aria-labelledby="badgeTitle badgeDesc" viewBox="0 0 24 24">
  <title id="badgeTitle">Doğrulanmış rozet</title>
  <desc id="badgeDesc">İçinde beyaz onay işareti bulunan mavi bir daire</desc>
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "İki alışkanlık daha kazandırır. Metni yola çevrilmiş çizgilere dönüştürmek yerine gerçek ",
      { text: "<text>", code: true },
      " öğeleri kullanın — ekran okuyucular gerçek metni okur ve metin seçilebilir, aranabilir kalır. SVG tamamen dekoratifse, ",
      { text: "aria-hidden=\"true\"", code: true },
      " ekleyin (ya da arka plan görseli olarak bırakın) ki yardımcı teknolojiler onu tamamen atlasın.",
    ]},

    { type: "h2", content: ["Yine de PNG'ye rasterize etmeniz gereken durumlar"] },
    { type: "p", content: [
      "Vektör evrensel değildir. Birçok gerçek teslimat kanalı SVG'yi reddeder ya da bozar; tek güvenli cevap, doğru boyutta bir PNG'dir:",
    ]},
    { type: "list", items: [
      [{ text: "E-posta istemcileri: ", bold: true }, { text: "Outlook — özellikle Windows işleyicisi — SVG'yi güvenilir biçimde çizmez; işlemsel e-postalar bit eşlemi tek güvenli seçenek olduğu için hâlâ PNG kullanır." }],
      [{ text: "Sosyal paylaşım kartları: ", bold: true }, { text: "Open Graph ve Twitter Card ayrıştırıcıları og:image adresinizi çeker; çoğu raster görseli güvenilir gösterirken SVG önizlemesi sık sık reddedilir ya da boş döner." }],
      [{ text: "Favicon'lar: ", bold: true }, { text: "modern tarayıcılar .svg favicon kabul eder, ama Apple touch icon ve eski araçlar PNG ister (apple-touch-icon.png) — ikisini de verirsiniz." }],
      [{ text: "Eski tarayıcılar ve WebView'lar: ", bold: true }, { text: "2017 öncesi her şey, bazı gömülü WebView'lar ve eski kiosklar SVG'yı hiç desteklemez." }],
      [{ text: "Yükleme formları: ", bold: true }, { text: "CMS, pazar yeri ve stok tasarım platformları, addan dolayı .svg dosyasını — içinde betik olabilir diye — reddeder; PNG her doğrulayıcıdan geçer." }],
    ]},

    { type: "h2", content: ["SVG'yi PNG'ye çevirin — tarayıcınızda, Convrs'te"] },
    { type: "p", content: [
      "En temiz iş akışı, SVG'yi kaynak doğru olarak tutup yalnızca talep eden teslimat kanalı için rasterize etmektir. Convrs'ün ",
      { text: "SVG'yi PNG'ye dönüştürme aracı", bold: true, url: "/svg-to-png", internal: true },
      " herhangi bir SVG'yi tarayıcınızda keskin bir PNG'ye çevirir: dosyayı yapıştırın ya da bırakın, piksel boyutunu seçin (örneğin retina simge için 256, 512 ya da 1024) ve sonucu indirin. Dönüşüm tamamen kendi sekmenizdeki Canvas API'sinde çalışır — dosya hiçbir zaman yüklenmez, hiçbir sunucu onu görmez. Kayıt yok, kuyruk yok; güveneceğiniz tek şey, zaten elinizdeki tarayıcı.",
    ]},
    { type: "p", content: [
      "Vektörü saklayın. Dünyanın gerektirdiği yerde rasterize edin. Ve bir tasarımcı size bir daha 3 megabaytlık logo gönderirse, tam olarak ne diyeceğinizi biliyorsunuz.",
    ]},
  ],
};

const de: GuideDocument = {
  meta: {
    title: "SVG fürs Web: Wann Vektoren Pixel schlagen — und wann nicht",
    eyebrow: "Design",
    description:
      "SVG ist XML-Geometrie, kein Bitmap. Erfahren Sie, wann Vektoren PNG wirklich schlagen, wann sie das falsche Werkzeug sind, wie sich viewBox von Breite und Höhe unterscheidet, wie man SVG sicher einbettet und welche Kanäle weiterhin eine Rasterisierung zu PNG erzwungen.",
    excerpt:
      "Was SVG wirklich ist, wann es PNG schlägt (Logos, Icons, gestochen scharfes Zoomen), wann es eine Falle ist, sicheres Einbetten — und wann Sie trotzdem zu PNG rastern müssen.",
    readingTime: "9 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: [
      "Eine Designerin schickt ein 3-Megabyte-PNG eines Logos, das eine 800-Byte-SVG-Datei sein könnte. Jede E-Mail, jeder Seitenaufruf bezahlt für diesen Download — das Telefon der Empfängerin dekodiert ihn, der Mail-Client cached ihn, und niemand bemerkt, dass das gesamte Bild ein Kreis, zwei Linien und eine Form ist. Dieser Leitfaden zeigt, was Vektorgrafiken tatsächlich sind, wann SVG PNG wirklich schlägt, wann es eine Falle ist und warum Sie trotzdem ab und zu ein PNG brauchen.",
    ]},

    { type: "h2", content: ["SVG ist ein Rezept, kein Gemälde"] },
    { type: "p", content: [
      "Ein PNG ist ein Bitmap: ein Raster aus farbigen Pixeln, jedes ein gespeicherter Wert. SVG — ",
      { text: "Scalable Vector Graphics", bold: true },
      " — ist XML, reiner Text, der Formen über Geometrie beschreibt. Ein Rechteck ist ",
      { text: "<rect x=\"...\" y=\"...\" width=\"...\" height=\"...\">", code: true },
      "; ein Kreis heißt „Mittelpunkt bei (12,12), Radius 10\"; ein Pfad ist eine Folge aus Ziehe-, Linien- und Kurvenbefehlen. Der Browser liest diese Anweisungen, berechnet die Geometrie und zeichnet — in genau der Auflösung, die der Bildschirm braucht. Zoomen Sie in ein Vektor-Bild: Es gibt nichts zu verwischen; der Browser führt die Mathematik einfach mit größerem Maßstab erneut aus.",
    ]},
    { type: "p", content: [
      "Ein Badge-Symbol — ein blauer Kreis mit weißem Häkchen — ist ein vollständiges, echtes Beispiel:",
    ]},
    { type: "code", lang: "xml", content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#ffffff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "Die ganze Datei liegt unter 250 Byte. Dasselbe Symbol als 2x-PNG exportiert ergibt 3–10 Kilobyte; auf ein 512-Pixel-Sitelogo skaliert, zig Kilobyte. Und weil SVG Text ist, lässt es sich prüfen und diffen: In jedem Editor öffnen, greppen, in Git einchecken — und Sie sehen genau, was sich geändert hat. Ein PNG ist eine Pixelwand; ein SVG ist Quellcode.",
    ]},

    { type: "h2", content: ["Wann SVG PNG ohne Kampf schlägt"] },
    { type: "p", content: [
      "SVG gewinnt in wenigen Situationen eindeutig. Besteht Ihr Bild überwiegend aus flachen Formen mit sauberen Kanten, ist SVG kein Nice-to-have — es ist messbar leichter und unendlich schärfer:",
    ]},
    { type: "list", items: [
      [{ text: "Logos und Icons: ", bold: true }, { text: "flache, geometrische Arbeiten aus Füllungen, Strichen und Pfaden. Der kanonische SVG-Einsatz." }],
      [{ text: "Scharf bei jedem Zoom: ", bold: true }, { text: "Text und Kanten bleiben auf einem 4K-Monitor, in einer gezoomten Ecke des Dashboards oder auf einem Bannerdruck mit 300dpi rasiermesserscharf. Ein PNG verwischt, sobald es seine native Größe überschreitet." }],
      [{ text: "Winzige Dateien bei einfachen Formen: ", bold: true }, { text: "Die Dateigröße folgt der Komplexität, nicht der Auflösung; ein typisches Icon bleibt ein Bruchteil des PNG." }],
      [{ text: "CSS-Theme: ", bold: true }, { text: "Inline-SVG erbt " }, { text: "currentColor", code: true }, { text: " und reagiert auf Hover, Fokus und Dark Mode. Ein PNG ist beim Export eingefroren." }],
      [{ text: "Animation und Interaktivität: ", bold: true }, { text: "SVG-Elemente sind Teil des DOM — man kann sie anklicken, mit CSS oder JavaScript animieren und an Daten binden. Davon existiert in einem statischen Bild nichts." }],
    ]},

    { type: "h2", content: ["Wann SVG das falsche Werkzeug ist"] },
    { type: "p", content: [
      "Dieselbe Logik, die SVG für Icons winzig macht, macht es bei Fotos dick. Ein Foto sind Millionen einzelner Farbentscheidungen; es als Vektoren zu beschreiben bedeutet tausende Gradient-Stops und unscharfe Formen — die Datei übertrifft ein gleichwertiges JPEG, während der Browser bei jedem Bild kämpft. Stark gefilterte Arbeiten — weiche Schatten, Glow, mehrschichtige Unschärfe — sollte man meist als Raster ausliefern.",
    ]},
    { type: "p", content: [
      "Die versteckte Kostenstelle ist das Rendern. Ein PNG wird einmal dekodiert und auf den Bildschirm kopiert; ein SVG wird bei jedem Layout-Durchlauf, jedem Zoom und jedem Animationsframe neu in die Zielgröße gerastert. Ein komplexes SVG auf einer Seite ist okay. Fünfzig Schneeflocken-SVGs, jede in einen Blur-Filter gewickelt, ruckeln auf einer scrollenden Seite sichtbar. Messen Sie die Performance, bevor Sie alles Mögliche vektorisieren:",
    ]},
    { type: "table", columns: ["", "SVG", "PNG"], rows: [
      ["Skalierung", "Unendlich — Geometrie wird in jeder Größe neu berechnet", "Verwischt und verpixelt über der nativen Größe"],
      ["Einfache Formen", "~0,3 kB für ein typisches Icon", "2–10 kB selbst bei 2x"],
      ["Fotos", "Wächst und rendert langsam", "Effizient komprimiert, überall unterstützt"],
      ["Transparenz", "Nativ — jede Form oder Aussparung", "Nativ über den Alphakanal"],
      ["Stil & Animation", "CSS, Hover, Animation, Skripte", "Keine; bei jeder Änderung ein neuer Export"],
      ["Wo es funktioniert", "Alles Moderne, plus die Ausnahmen unten", "Praktisch überall"],
    ]},

    { type: "h2", content: ["viewBox, Breite und Höhe: Wer bestimmt die Größe?"] },
    { type: "p", content: [
      "Der verwirrendste Teil einer SVG-Datei ist der Unterschied zwischen Anzeigegröße und Koordinatensystem. Die Attribute ",
      { text: "width", code: true },
      " und ",
      { text: "height", code: true },
      " (oder die CSS-Eigenschaften) sagen, wie groß das Bild in CSS-Pixeln gezeichnet werden soll. Der ",
      { text: "viewBox", code: true },
      " sagt, wie groß die Zeichnung selbst ist: ",
      { text: "viewBox=\"0 0 24 24\"", code: true },
      " bedeutet „Das Werk ist 24 Einheiten breit und 24 Einheiten hoch, beginnend bei 0,0\". Der Browser teilt die Anzeigegröße durch diese Einheiten und skaliert die gesamte Zeichnung — deshalb lässt sich ein 24-Einheiten-Icon perfekt mit 200 Pixeln darstellen.",
    ]},
    { type: "p", content: [
      "Mit vorhandenem ",
      { text: "viewBox", code: true },
      " bleibt das Seitenverhältnis standardmäßig erhalten. ",
      { text: "preserveAspectRatio=\"xMidYMid meet\"", code: true },
      " ist der Standard und verhält sich wie ",
      { text: "object-fit: contain", code: true },
      " — das Werk passt zentriert hinein, bei anderem Box-Verhältnis bleibt Platz; die Variante ",
      { text: "slice", code: true },
      " verhält sich wie ",
      { text: "object-fit: cover", code: true },
      ". Eine Gewohnheit lohnt sich: Entfernen Sie die Attribute width und height nicht aus der Datei. Bei vorhandenem viewBox lassen moderne Browser CSS-Angaben sauber darübergehen, und die Attribute geben dem Browser vor dem Eintreffen des Stylesheets intrinsische Maße.",
    ]},

    { type: "h2", content: ["SVG auf einer Seite: img, inline oder Hintergrund"] },
    { type: "p", content: [
      "Wo Sie das SVG platzieren, entscheidet, was es darf. Vier gängige Behälter:",
    ]},
    { type: "table", columns: ["Methode", "Cachebar", "Theme & Animation", "Skripte darin", "Am besten für"], rows: [
      ["<img src=\"logo.svg\">", "Ja", "Nein", "Laufen nie", "Logos, Icons, Bildinhalte"],
      ["Inline <svg>…</svg>", "Nein", "Ja", "Ja", "Icons, die Sie stylen oder bewegen"],
      ["background-image: url(logo.svg)", "Ja", "Begrenzt", "Laufen nie", "Dekorative Texturen, Masken"],
      ["<object> oder <iframe>", "Ja", "Nein", "Ja", "Legacy-Interaktive-Widgets"],
    ]},
    { type: "p", content: [
      "Das ",
      { text: "<img>", code: true },
      "-Tag ist der Arbeitssoldat: statisch, cachebar und parallel ladend. Es ist aber auch bewusst inert — sobald Sie Hover-Zustände, ",
      { text: "currentColor", code: true },
      " oder Animation brauchen, müssen Sie das SVG inline einbetten und das zusätzliche HTML-Gewicht akzeptieren. Hintergrundbilder passen zu dekorativer, wiederholter Grafik, die der Accessibility-Baum nie sehen soll. ",
      { text: "<object>", code: true },
      " führt Skripte und externe Ressourcen weiterhin aus — genau deshalb ist es für Icons weitgehend aus der Mode.",
    ]},

    { type: "h2", content: ["Fallstricke externer SVGs: CSP, Cookies und Skripte"] },
    { type: "p", content: [
      "Ein SVG ist Text, kann also ein ",
      { text: "<script>", code: true },
      " in sich tragen. Was daraus wird, hängt allein davon ab, wo Sie es laden. In ",
      { text: "<img src>", code: true },
      " wird das SVG wie ein statisches Bild behandelt: Skripte führen nie aus, und externe Referenzen — Schriften, Stylesheets, andere Bilder — werden aus Sicherheitsgründen ignoriert. Das ist der sichere Behälter. In ",
      { text: "<object>", code: true },
      ", einem Inline-",
      { text: "<iframe>", code: true },
      " oder einem direkt aufgerufenen Dokument ist ein SVG ein vollwertiges Dokument: Skripte laufen, Cookies werden gesendet. Eine Drittanbieter-.SVG an dieser Stelle ist aktiver Code auf Ihrer Seite.",
    ]},
    { type: "p", content: [
      "Content-Security-Policy weist jedem Behälter seinen Bereich zu. ",
      { text: "img-src", code: true },
      " regelt ",
      { text: "<img>", code: true },
      " und Hintergrundbilder; ",
      { text: "object-src", code: true },
      " regelt ",
      { text: "<object>", code: true },
      " und ",
      { text: "<embed>", code: true },
      "; Inline-SVG im HTML unterliegt dem eigenen ",
      { text: "script-src", code: true },
      " und ",
      { text: "style-src", code: true },
      " der Seite. Und eine strenge Policy, die den Host des SVG nicht aufführt, lehnt die Datei rundweg ab — ein weiterer Grund, einzubinden, was Sie selbst hosten, statt von woanders einzulinken.",
    ]},
    { type: "note", tone: "warning", title: "Fremdes SVG inline einzubinden ist Code-Injection", content: [
      "Ein minifiziertes SVG von einer Icon-Seite kann ein <script> oder einen fetch zu einer Tracking-Domain verstecken; eine Vorschau zeigt es nie. Validieren Sie alles, das Sie nicht selbst geschrieben haben, oder rastern Sie es vor dem Einbetten zu PNG. Inline-SVG aus unzuverlässiger Quelle ist ein klassischer Weg zu persistiertem XSS.",
    ]},

    { type: "h2", content: ["Barrierefreiheit: title, desc und Label"] },
    { type: "p", content: [
      "Ein SVG trägt für Screenreader keine Bedeutung, bis Sie eine anhängen. Geben Sie dem Element ",
      { text: "role=\"img\"", code: true },
      ", einen ",
      { text: "<title>", code: true },
      " als Namen, ein ",
      { text: "<desc>", code: true },
      " für die längere Beschreibung und verbinden Sie sie mit ",
      { text: "aria-labelledby", code: true },
      ":",
    ]},
    { type: "code", lang: "xml", content: `<svg role="img" aria-labelledby="badgeTitle badgeDesc" viewBox="0 0 24 24">
  <title id="badgeTitle">Verifiziertes Abzeichen</title>
  <desc id="badgeDesc">Ein blauer Kreis mit weißem Häkchen</desc>
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "Zwei weitere Gewohnheiten zahlen sich aus. Nutzen Sie echte ",
      { text: "<text>", code: true },
      "-Elemente statt Text in Pfade umzuwandeln — Screenreader lesen echten Text, und er bleibt auswählbar und durchsuchbar. Ist ein SVG rein dekorativ, setzen Sie ",
      { text: "aria-hidden=\"true\"", code: true },
      " (oder lassen Sie es als Hintergrundbild), damit assistive Technologien es komplett überspringen.",
    ]},

    { type: "h2", content: ["Wann Sie trotzdem zu PNG rastern müssen"] },
    { type: "p", content: [
      "Vektoren sind nicht universal. Zahlreiche echte Auslieferungskanäle verweigern oder verhunzen SVG, und die einzig sichere Antwort ist ein PNG in passender Größe:",
    ]},
    { type: "list", items: [
      [{ text: "E-Mail-Clients: ", bold: true }, { text: "Outlook — besonders der Windows-Renderer — zeichnet SVG nicht zuverlässig; transaktionale E-Mails nutzen immer noch PNG, weil ein Bitmap die einzige sichere Wette ist." }],
      [{ text: "Social-Preview-Karten: ", bold: true }, { text: "Open-Graph- und Twitter-Card-Scrapers rufen Ihr og:image ab; die meisten zeigen ein Raster zuverlässig, SVG-Previews werden oft abgelehnt oder leer gerendert." }],
      [{ text: "Favicons: ", bold: true }, { text: "moderne Browser akzeptieren SVG-Favicons, aber Apple-Touch-Icons und ältere Werkzeuge wollen PNG (apple-touch-icon.png) — Sie liefern beides." }],
      [{ text: "Alte Browser und WebViews: ", bold: true }, { text: "alles vor 2017, manche eingebettete WebViews und Legacy-Kiosks unterstützen SVG gar nicht." }],
      [{ text: "Upload-Formulare: ", bold: true }, { text: "CMS, Marktplätze und Design-Marktplätze lehnen .svg wegen möglicher Skripte nach Dateiendung ab; PNG besteht jede Validierung." }],
    ]},

    { type: "h2", content: ["SVG zu PNG rastern — in Ihrem Browser, bei Convrs"] },
    { type: "p", content: [
      "Der sauberste Workflow hält das SVG als Quelle der Wahrheit und rastet nur für die Auslieferungskanäle, die es verlangen. Der ",
      { text: "SVG-zu-PNG-Konverter", bold: true, url: "/svg-to-png", internal: true },
      " von Convrs verwandelt jedes SVG in Ihrem Browser in ein gestochen scharfes PNG: Datei einfügen oder ziehen, Pixelgröße wählen (etwa 256, 512 oder 1024 für ein Retina-Icon) und das Ergebnis herunterladen. Die Konvertierung läuft komplett über die Canvas-API in Ihrem eigenen Tab — die Datei wird nie hochgeladen, kein Server sieht sie. Keine Anmeldung, keine Warteschlange; vertrauen müssen Sie nur dem Browser, den Sie ohnehin haben.",
    ]},
    { type: "p", content: [
      "Bewahren Sie das Vektor-Bild. Rastern Sie dort, wo die Welt es verlangt. Und wenn Ihnen eine Designerin wieder ein 3-Megabyte-Logo schickt, wissen Sie genau, was zu tun ist.",
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "SVG para web: cuándo los vectores ganan a los píxeles — y cuándo no",
    eyebrow: "Diseño",
    description:
      "El SVG es geometría XML, no un mapa de bits. Aprende cuándo el vector supera de verdad al PNG, cuándo es la herramienta equivocada, la diferencia entre viewBox y ancho/alto, cómo incrustar SVG con seguridad y qué canales siguen obligándote a rasterizar a PNG.",
    excerpt:
      "Qué es realmente el SVG, cuándo gana al PNG (logos, iconos, zoom nítido), cuándo es una trampa, incrustación segura y cuándo aún hay que rasterizar a PNG.",
    readingTime: "9 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: [
      "Una diseñadora te envía un PNG de 3 megabytes de un logotipo que podría ser un archivo SVG de 800 bytes. Cada correo, cada carga de página paga por esa descarga: el teléfono del destinatario la decodifica, el cliente de correo la almacena en caché y nadie llega a notar que toda la imagen es un círculo, dos trazos y una forma. Esta guía trata de entender qué son realmente los gráficos vectoriales, cuándo el SVG gana de verdad al PNG, cuándo es una trampa y por qué aún necesitarás un PNG de vez en cuando.",
    ]},

    { type: "h2", content: ["El SVG es una receta, no un cuadro"] },
    { type: "p", content: [
      "Un PNG es un mapa de bits: una cuadrícula de píxeles de colores, cada uno un valor guardado. El SVG — ",
      { text: "Scalable Vector Graphics", bold: true },
      " — es XML, texto plano que describe formas con geometría. Un rectángulo es ",
      { text: "<rect x=\"...\" y=\"...\" width=\"...\" height=\"...\">", code: true },
      "; un círculo es «centro en (12,12), radio 10»; un trazado es una secuencia de órdenes de trazar, línea y curva. El navegador lee esas instrucciones, calcula la geometría y dibuja a la resolución que la pantalla necesite. Acércate en un vector y no hay nada que difuminar; el navegador simplemente vuelve a ejecutar la operación con una escala mayor.",
    ]},
    { type: "p", content: [
      "Un icono de insignia — un círculo azul con una marca de verificación blanca — es un ejemplo completo y real:",
    ]},
    { type: "code", lang: "xml", content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#ffffff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "Ese archivo entero pesa menos de 250 bytes. La misma forma exportada como PNG a 2x son 3–10 kilobytes; escalada a un logotipo de 512 píxeles, decenas de kilobytes. Y como el SVG es texto, se puede inspeccionar y comparar: ábrelo en cualquier editor, haz un grep, confírmalo en git y verás exactamente qué cambió. Un PNG es un muro de píxeles; un SVG es código fuente.",
    ]},

    { type: "h2", content: ["Cuándo el SVG gana sin discusión"] },
    { type: "p", content: [
      "El SVG gana de forma contundente en unas pocas situaciones. Si tu imagen son sobre todo formas planas con aristas limpias, el SVG no es un capricho: es mediblemente más ligero e infinitamente más nítido:",
    ]},
    { type: "list", items: [
      [{ text: "Logos e iconos: ", bold: true }, { text: "trabajo geométrico y plano hecho de rellenos, trazos y trazados. El caso de uso canónico del SVG." }],
      [{ text: "Nitidez a cualquier zoom: ", bold: true }, { text: "el texto y las aristas se mantienen perfectos en un monitor 4K, en la esquina ampliada de un panel o impresos en un banner a 300dpi. Un PNG se difumina en cuanto supera su tamaño nativo." }],
      [{ text: "Archivos diminutos para formas simples: ", bold: true }, { text: "el tamaño sigue a la complejidad, no a la resolución; un icono típico sigue siendo una fracción del PNG." }],
      [{ text: "Tema con CSS: ", bold: true }, { text: "el SVG en línea hereda " }, { text: "currentColor", code: true }, { text: " y reacciona a hover, foco y modo oscuro. Un PNG queda congelado en el momento de exportarse." }],
      [{ text: "Animación e interactividad: ", bold: true }, { text: "los elementos SVG forman parte del DOM: puedes hacer clic en ellos, animarlos con CSS o JavaScript y vincularlos a datos. Nada de eso existe en una imagen estática." }],
    ]},

    { type: "h2", content: ["Cuándo el SVG es la herramienta equivocada"] },
    { type: "p", content: [
      "La misma lógica que hace diminuto al SVG para iconos lo hincha en fotografía. Una foto son millones de decisiones de color individuales; describirla como vectores significa miles de paradas de degradado y formas difuminadas, y el archivo supera a un JPEG equivalente mientras el navegador se esfuerza en cada fotograma. El trabajo con filtros pesados — sombras suaves, brillos, desenfoque en capas — casi siempre se sirve mejor como raster.",
    ]},
    { type: "p", content: [
      "El costo oculto está en el renderizado. Un PNG se decodifica una vez y se copia a la pantalla; un SVG se vuelve a rasterizar al tamaño objetivo en cada pasada de diseño, cada zoom y cada fotograma de animación. Un SVG complejo en una página está bien. Cincuenta SVG de copos de nieve, cada uno envuelto en un filtro de desenfoque, se notan con tirones en una página que se desplaza. Mide el rendimiento antes de vectorizar cuanto veas:",
    ]},
    { type: "table", columns: ["", "SVG", "PNG"], rows: [
      ["Escalado", "Infinito: la geometría se recalcula a cualquier tamaño", "Se difumina y rellena más allá de sus píxeles nativos"],
      ["Formas simples", "~0,3 kB para un icono típico", "2–10 kB incluso a 2x"],
      ["Fotografías", "Se hincha y renderiza lento", "Se comprime con eficacia y se soporta en todas partes"],
      ["Transparencia", "Nativa: cualquier forma o hueco", "Nativa mediante el canal alfa"],
      ["Estilo y animación", "CSS, hover, animación, scripts", "Ninguna; un export nuevo por cambio"],
      ["Dónde funciona", "Todo lo moderno, más las excepciones de abajo", "En cualquier sitio"],
    ]},

    { type: "h2", content: ["viewBox, ancho y alto: quién decide el tamaño"] },
    { type: "p", content: [
      "La parte más confusa de un archivo SVG es la diferencia entre el tamaño de visualización y el sistema de coordenadas. Los atributos ",
      { text: "width", code: true },
      " y ",
      { text: "height", code: true },
      " (o las propiedades CSS) dicen qué tan grande debe dibujarse la imagen, en píxeles CSS. El ",
      { text: "viewBox", code: true },
      " dice cuán grande es el dibujo en sí: ",
      { text: "viewBox=\"0 0 24 24\"", code: true },
      " significa «la obra mide 24 unidades de ancho y 24 de alto, comenzando en 0,0». El navegador divide el tamaño de visualización entre esas unidades y escala todo el dibujo — por eso un icono de 24 unidades se ve perfecto a 200 píxeles.",
    ]},
    { type: "p", content: [
      "Con un ",
      { text: "viewBox", code: true },
      " presente, la proporción se mantiene por defecto. ",
      { text: "preserveAspectRatio=\"xMidYMid meet\"", code: true },
      " es el valor por defecto y se comporta como ",
      { text: "object-fit: contain", code: true },
      ": la obra encaja, centrada, con espacio vacío si la proporción de la caja difiere; la variante ",
      { text: "slice", code: true },
      " se comporta como ",
      { text: "object-fit: cover", code: true },
      ". Vale la pena un hábito: no elimines los atributos width y height del archivo. Con un viewBox presente, los navegadores modernos dejan que el CSS los anule limpiamente, y conservar los atributos le da al navegador dimensiones intrínsecas antes de que llegue la hoja de estilos.",
    ]},

    { type: "h2", content: ["Cómo poner un SVG en una página: img, en línea o fondo"] },
    { type: "p", content: [
      "Dónde coloques el SVG determina qué se le permite hacer. Cuatro contenedores habituales:",
    ]},
    { type: "table", columns: ["Método", "Cacheable", "Tema y animación", "Scripts internos", "Mejor para"], rows: [
      ["<img src=\"logo.svg\">", "Sí", "No", "Nunca se ejecutan", "Logos, iconos, imágenes de página"],
      ["SVG en línea <svg>…</svg>", "No", "Sí", "Sí", "Iconos que debas estilizar o mover"],
      ["background-image: url(logo.svg)", "Sí", "Limitado", "Nunca se ejecutan", "Texturas decorativas, máscaras"],
      ["<object> o <iframe>", "Sí", "No", "Sí", "Widgets interactivos antiguos"],
    ]},
    { type: "p", content: [
      "La etiqueta ",
      { text: "<img>", code: true },
      " es la que trabaja: estática, cacheable y de carga en paralelo. También es deliberadamente inerte — en cuanto necesitas estados hover, ",
      { text: "currentColor", code: true },
      " o animación, tienes que incrustar el SVG y asumir el peso extra del HTML. Las imágenes de fondo encajan con la ilustración decorativa y repetida que el árbol de accesibilidad nunca debería ver. ",
      { text: "<object>", code: true },
      " sigue ejecutando scripts y recursos externos, que es exactamente por qué ha quedado obsoleto para iconos.",
    ]},

    { type: "h2", content: ["Trampas del SVG externo: CSP, cookies y scripts"] },
    { type: "p", content: [
      "Un SVG es texto, así que puede llevar un ",
      { text: "<script>", code: true },
      " dentro. Lo que ocurra después depende solo de dónde lo cargues. Dentro de ",
      { text: "<img src>", code: true },
      " el SVG se trata como una imagen estática: los scripts nunca se ejecutan y las referencias externas — fuentes, hojas de estilo, otras imágenes — se ignoran por seguridad. Ese es el contenedor seguro. Dentro de ",
      { text: "<object>", code: true },
      ", un ",
      { text: "<iframe>", code: true },
      " en línea o un documento navegado directamente, un SVG es un documento completo: los scripts se ejecutan y las cookies viajan. Un .svg de terceros en esa posición es código activo en tu página.",
    ]},
    { type: "p", content: [
      "Content-Security-Policy asigna cada contenedor. ",
      { text: "img-src", code: true },
      " regula ",
      { text: "<img>", code: true },
      " y las imágenes de fondo; ",
      { text: "object-src", code: true },
      " regula ",
      { text: "<object>", code: true },
      " y ",
      { text: "<embed>", code: true },
      "; el SVG en línea dentro del HTML cae bajo el ",
      { text: "script-src", code: true },
      " y el ",
      { text: "style-src", code: true },
      " propios de la página. Y una política estricta que no liste el host del SVG rechazará el archivo sin más: un motivo más para autoalojar lo que incrustas en lugar de enlazar desde fuera.",
    ]},
    { type: "note", tone: "warning", title: "Incrustar un SVG ajeno es inyección de código", content: [
      "Un SVG minificado descargado de un sitio de iconos puede ocultar un <script> o un fetch a un dominio de rastreo; una vista previa jamás lo muestra. Valida todo lo que no hayas escrito tú, o rasterízalo a PNG antes de incrustarlo. Incrustar SVGs no fiables es una vía clásica al XSS almacenado.",
    ]},

    { type: "h2", content: ["Accesibilidad: title, desc y etiqueta"] },
    { type: "p", content: [
      "Un SVG no transmite ningún significado a un lector de pantalla hasta que se lo pongas. Dale al elemento ",
      { text: "role=\"img\"", code: true },
      ", un ",
      { text: "<title>", code: true },
      " como nombre, un ",
      { text: "<desc>", code: true },
      " para la descripción más larga y conéctalos con ",
      { text: "aria-labelledby", code: true },
      ":",
    ]},
    { type: "code", lang: "xml", content: `<svg role="img" aria-labelledby="badgeTitle badgeDesc" viewBox="0 0 24 24">
  <title id="badgeTitle">Insignia verificada</title>
  <desc id="badgeDesc">Un círculo azul con una marca de verificación blanca</desc>
  <circle cx="12" cy="12" r="10" fill="#2f6fed"/>
  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" stroke-width="2" fill="none"/>
</svg>` },
    { type: "p", content: [
      "Dos hábitos más dan fruto. Usa elementos ",
      { text: "<text>", code: true },
      " reales en lugar de convertir el texto en trazados: los lectores de pantalla leen el texto real, y sigue siendo seleccionable y buscable. Y si un SVG es puramente decorativo, añade ",
      { text: "aria-hidden=\"true\"", code: true },
      " (o déjalo como imagen de fondo) para que la tecnología de asistencia lo salte por completo.",
    ]},

    { type: "h2", content: ["Cuándo aún tienes que rasterizar a PNG"] },
    { type: "p", content: [
      "El vector no es universal. Bastantes canales de distribución reales rechazan o estropean el SVG, y la única respuesta segura es un PNG del tamaño adecuado:",
    ]},
    { type: "list", items: [
      [{ text: "Clientes de correo: ", bold: true }, { text: "Outlook — sobre todo el motor de Windows — no representa el SVG de forma fiable; el email transaccional sigue usando PNG precisamente porque un mapa de bits es la única apuesta segura." }],
      [{ text: "Tarjetas de previsualización social: ", bold: true }, { text: "los robots de Open Graph y Twitter Card buscan tu og:image y la mayoría muestra un raster con fiabilidad; las previsualizaciones SVG suelen rechazarse o salir en blanco." }],
      [{ text: "Favicons: ", bold: true }, { text: "los navegadores modernos aceptan favicons .svg, pero los apple touch icons y las herramientas antiguas quieren PNG (apple-touch-icon.png) — se entregan ambos." }],
      [{ text: "Navegadores antiguos y WebViews: ", bold: true }, { text: "todo lo anterior a 2017, algunos WebViews integrados y quioscos heredados no soportan SVG en absoluto." }],
      [{ text: "Formularios de subida: ", bold: true }, { text: "los CMS, marketplaces y plataformas de diseño rechazan .svg por extensión porque puede contener scripts; el PNG pasa cualquier validador." }],
    ]},

    { type: "h2", content: ["Rasteriza SVG a PNG — en tu navegador, en Convrs"] },
    { type: "p", content: [
      "El flujo más limpio conserva el SVG como fuente de verdad y rasteriza solo para el canal que lo exige. El ",
      { text: "conversor de SVG a PNG", bold: true, url: "/svg-to-png", internal: true },
      " de Convrs convierte cualquier SVG en un PNG nítido dentro de tu navegador: pega o arrastra el archivo, elige el tamaño en píxeles (256, 512 o 1024 para un icono retina, por ejemplo) y descarga el resultado. La conversión corre por completo en la Canvas API de tu propia pestaña: el archivo nunca se sube y ningún servidor llega a verlo. Sin registro, sin cola; nada que confiar más allá del navegador que ya tienes.",
    ]},
    { type: "p", content: [
      "Conserva el vector. Rasteriza donde el mundo lo exija. Y la próxima vez que una diseñadora te envíe un logotipo de 3 megabytes, ya sabrás exactamente qué decir.",
    ]},
  ],
};

const svgVectorsGuide: GuideDefinition = {
  slug: "svg-vectors-for-web",
  content: { en, tr, de, es },
};

export default svgVectorsGuide;