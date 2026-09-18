import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title:
      "Responsive Design and the Viewport: What Your Phone Sees vs. What Your Laptop Sees",
    eyebrow: "Design",
    description:
      "Why a 1440px website collapses on a 375px phone, what the viewport meta tag actually controls, how CSS breakpoints work, when to use px vs rem vs em, and how developers really test responsive layouts.",
    excerpt:
      "The viewport explained in plain terms: meta tags, breakpoints, CSS units, mobile-first strategy, and the pitfalls that break responsive layouts.",
    readingTime: "10 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    {
      type: "p",
      content: [
        "A site that looks perfect on your laptop was probably designed for a 1440px laptop. Open it on a 375px iPhone and you will understand why the viewport meta tag exists: without it, the browser renders the entire page at 1440 pixels wide, shrinks it to fit the phone screen, and delivers a page so tiny you need to pinch-zoom to read anything. The viewport is the browser's window onto your page, and controlling it is the single most important first step in responsive design.",
      ],
    },

    {
      type: "h2",
      content: ["What the viewport actually is"],
    },
    {
      type: "p",
      content: [
        "The viewport is not the physical screen. It is the inner dimensions of the browser's content area — the part that actually displays your HTML and CSS, excluding scrollbars, browser chrome, and operating system UI. On a desktop browser the viewport typically matches the window size; on a phone it matches the CSS pixel dimensions of the device, not the hardware pixel count.",
      ],
    },
    {
      type: "p",
      content: [
        "This distinction between CSS pixels and hardware pixels is where ",
        { text: "devicePixelRatio", code: true },
        " comes in. A modern iPhone 15 reports a CSS viewport of 393x852 points, but the screen has 1179x2556 physical pixels — a devicePixelRatio of 3. That means every CSS pixel occupies a 3x3 block of hardware pixels, producing crisp text and sharp edges. You do not need to manage this directly; the browser and the operating system handle the mapping. But it explains why a 375px CSS viewport is not a low-resolution screen.",
      ],
    },

    {
      type: "h2",
      content: ["The viewport meta tag and what it controls"],
    },
    {
      type: "p",
      content: [
        "The viewport is configured with a single HTML element that goes inside the ",
        { text: "<head>", code: true },
        " tag:",
      ],
    },
    {
      type: "code",
      lang: "html",
      content: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    },
    {
      type: "p",
      content: [
        "The two critical directives are ",
        { text: "width=device-width", code: true },
        " and ",
        { text: "initial-scale=1", code: true },
        ". The first tells the browser: set the CSS viewport width to match the device's screen width in CSS pixels, rather than rendering at a default 980px desktop width. The second locks the zoom to 100% on page load so the content is not automatically zoomed in or out.",
      ],
    },
    {
      type: "p",
      content: [
        "Without this tag, mobile browsers render pages as if they were on a desktop. Safari on iOS historically defaulted to a 980px layout viewport and scaled it down to fit the phone screen. The result is a page where text is legible only after pinch-zooming, tap targets are too small to hit, and forms require zooming in to fill. Every modern CSS framework — Bootstrap, Tailwind, Foundation — includes this tag by default, which is why the problem seems to have disappeared. But if you are building from scratch and forget the tag, you will rediscover it immediately.",
      ],
    },

    {
      type: "h2",
      content: ["CSS breakpoints: conventions, not laws"] },
    {
      type: "p",
      content: [
        "A media query breakpoint is a CSS width at which your layout changes. The most commonly used values are 640px, 768px, 1024px, and 1280px, and they have persisted because they roughly correspond to real device categories:",
      ],
    },
    {
      type: "table",
      columns: [
        "Breakpoint",
        "CSS width",
        "Typical device target",
        "Layout change",
      ],
      rows: [
        [
          "sm",
          "640px",
          "Large phones (iPhone 14, Galaxy S23)",
          "Single column becomes slightly wider",
        ],
        [
          "md",
          "768px",
          "iPads in portrait, small tablets",
          "Sidebar appears or grid goes to two columns",
        ],
        [
          "lg",
          "1024px",
          "iPad landscape, small laptops",
          "Full navigation layout, three-column grid",
        ],
        [
          "xl",
          "1280px",
          "Standard laptops and desktops",
          "Content max-width, spacious padding",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "These numbers are conventions inherited from Tailwind's default configuration, and they map well to the devices most people own. But they are not mandated by any specification. Your layout should respond to the content it holds: if a card component wraps awkwardly at 790px, put your breakpoint there. The point of breakpoints is to keep the content readable and the layout intentional at every width, not to hit round numbers.",
      ],
    },
    {
      type: "code",
      lang: "css",
      content: `/* Mobile-first: base styles are for phones */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop and up */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}`,
    },

    {
      type: "h2",
      content: ["Mobile-first: why it works better"],
    },
    {
      type: "p",
      content: [
        "A mobile-first approach writes the base CSS for small screens and adds complexity with ",
        { text: "min-width", code: true },
        " media queries as the screen grows. The alternative — desktop-first — starts with a full-width layout and uses ",
        { text: "max-width", code: true },
        " to remove features on smaller screens. Mobile-first is preferred because it produces lighter, faster, more maintainable CSS.",
      ],
    },
    {
      type: "p",
      content: [
        "The core reason is progressive enhancement. A phone loading a mobile-first stylesheet gets only the CSS it needs: fewer grid rules, no desktop navigation overrides, smaller image loads. A desktop loading the same stylesheet gets the base styles plus the media query additions. With desktop-first, the phone has to load the full desktop CSS and then load additional rules to undo what it does not need. The result is more bytes, slower rendering on slow connections, and a higher chance of specificity conflicts.",
      ],
    },
    {
      type: "p",
      content: [
        "There is also a debugging advantage: if something looks broken at 1440px, you know exactly which media query to inspect. If something looks broken at 375px in a desktop-first approach, the problem could be in the base styles, the 768px override, the 1024px override, or the 1280px override. Mobile-first means small screens always render the simplest version.",
      ],
    },

    {
      type: "h2",
      content: ["px vs rem vs em: when each one matters"],
    },
    {
      type: "p",
      content: [
        "CSS offers three unit systems for sizing elements, and each serves a different purpose:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "px (pixels): ", bold: true },
          {
            text: "Absolute units tied to CSS pixels, not hardware pixels. Use them for border widths (1px solid), shadows, and anything that should stay the same size regardless of the user's base font setting. Do not use px for font sizes in a responsive layout — it defeats the purpose of scalable typography.",
          },
        ],
        [
          { text: "rem (root em): ", bold: true },
          {
            text: "Relative to the root element's font size, which defaults to 16px in every browser. If you set 1rem to 16px in your head, conversions are straightforward: 1.5rem = 24px, 2rem = 32px. Every rem value scales together if you change the root size. This is why rem is the standard for responsive font sizes, padding, and margins in modern CSS.",
          },
        ],
        [
          { text: "em: ", bold: true },
          {
            text: "Relative to the font size of the element itself. An h2 with font-size: 2em inside a parent with 16px base will render at 32px. The problem: em compounds. If that h2 is also inside a div with font-size: 1.2em, the effective size becomes 16 × 1.2 × 2 = 38.4px. This nesting behavior makes em unpredictable for spacing but useful for sizing that intentionally scales with text, like icon dimensions next to labels.",
          },
        ],
      ],
    },
    {
      type: "table",
      columns: ["Unit", "Reference", "Compounds?", "Best for"],
      rows: [
        [
          "px",
          "CSS pixel (absolute)",
          "No",
          "Borders, shadows, thin lines",
        ],
        [
          "rem",
          "Root font size (16px default)",
          "No",
          "Font sizes, padding, margins",
        ],
        [
          "em",
          "Parent or self font size",
          "Yes",
          "Icon sizing next to text, line-height",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "A practical rule: use rem for anything that should scale with the overall layout, px for things that should not, and em only when you specifically want a value to grow with the surrounding text. When you see a responsive design where paddings jump unexpectedly between breakpoints, the culprit is almost always em-based spacing inside a font-size change.",
      ],
    },

    {
      type: "h2",
      content: ["Common pitfalls that break responsive layouts"],
    },
    {
      type: "p",
      content: [
        "Responsive design looks simple until edge cases surface. These are the pitfalls that catch developers of every experience level:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Fixed pixel widths on containers: ", bold: true },
          {
            text: "Setting width: 960px on a wrapper creates a hard boundary. On a 768px tablet the container overflows, triggering horizontal scroll. Use max-width with percentage or rem values instead — the layout can always shrink.",
          },
        ],
        [
          { text: "100vw scrollbar overflow: ", bold: true },
          "The unit ",
          { text: "100vw", code: true },
          " means 100% of the viewport width including any vertical scrollbar. On a page with scrollable content, this causes a horizontal overflow of roughly 15-17px (the scrollbar width). Use ",
          { text: "100%", code: true },
          " on the body or a wrapper instead — it excludes the scrollbar.",
        ],
        [
          { text: "Font sizes too small on mobile: ", bold: true },
          {
            text: "A body font-size of 14px or 16px looks fine on desktop but can feel cramped on phones, especially for longer reading. The fix is not to increase desktop text but to set the mobile base slightly higher (e.g., 16-18px) and let desktop breakpoints scale down via rem ratios if needed. Apple recommends a minimum of 11pt (about 14.6px) for legibility.",
          },
        ],
        [
          { text: "Images without width constraints: ", bold: true },
          "An image with a fixed width or no constraint at all will push past its container. Apply ",
          { text: "max-width: 100%; height: auto;", code: true },
          " to all content images so they shrink with their parent.",
        ],
        [
          { text: "Hidden overflow masking real problems: ", bold: true },
          "Applying ",
          { text: "overflow: hidden", code: true },
          " on a parent to hide horizontal scroll is a symptom fix. The layout is still broken; you just cannot see it. Use the browser's responsive inspector to find the element causing overflow instead.",
        ],
      ],
    },
    {
      type: "note",
      tone: "warning",
      title: "The 100vw trap is the most common responsive bug",
      content: [
        "Developers set a full-width hero section to ",
        { text: "width: 100vw", code: true },
        " expecting it to fill the screen. On any page with a visible scrollbar, the hero is slightly wider than the viewport, producing a horizontal scroll. The correct pattern is ",
        { text: "width: 100%", code: true },
        " on a container inside the body, which naturally excludes the scrollbar width.",
      ],
    },

    {
      type: "h2",
      content: ["How developers actually test responsiveness"],
    },
    {
      type: "p",
      content: [
        "Testing responsive design requires simulating different viewport sizes. Developers use three main approaches:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Browser DevTools device toolbar: ", bold: true },
          {
            text: "Chrome, Firefox and Safari all provide a responsive mode (Ctrl+Shift+M in Chrome) that lets you type any viewport width and height, pick from device presets, and toggle device emulation including touch events, user-agent strings, and pixel density. This is the fastest way to catch layout breaks — resize the width and watch where things go wrong.",
          },
        ],
        [
          { text: "Actual devices: ", bold: true },
          {
            text: "Emulators are not perfect. Touch behavior, font rendering, scroll momentum, and virtual keyboards all differ on real hardware. Testing on at least one iPhone and one Android phone catches issues that emulators miss, especially around safe-area insets (notch and rounded corners) and iOS Safari's rubber-band scrolling.",
          },
        ],
        [
          { text: "Responsive viewport tools: ", bold: true },
          {
            text: "Online tools let you see what viewport dimensions your browser is currently reporting, compare them against common device presets, and understand the difference between CSS pixels and physical pixels. This is particularly useful for debugging why a design looks correct in DevTools but slightly off on a real device — the answer is often devicePixelRatio.",
          },
        ],
      ],
    },
    {
      type: "note",
      tone: "success",
      title: "Test at every breakpoint, not just the ends",
      content: [
        "Do not only check 375px and 1440px. Most layout bugs appear in the gaps between breakpoints — at 680px when a sidebar has not yet collapsed, or at 900px where a grid item stretches awkwardly. Resize slowly through the full range and watch for elements that overflow, overlap, or lose alignment.",
      ],
    },

    {
      type: "h2",
      content: ["Responsive tools in Convrs"],
    },
    {
      type: "p",
      content: [
        "Convrs includes two tools that help you understand and test viewport behavior: ",
        { text: "the screen and viewport checker", bold: true },
        " shows your browser's live viewport dimensions, devicePixelRatio, and a comparison against common device presets — useful for understanding why a design looks different on your machine than on a client's phone, ",
        { text: "and the px-rem-em converter", bold: true },
        " translates instantly between CSS pixel units, rem and em values at any root font size. Both tools run entirely in your browser, no data leaves your device.",
      ],
    },
  ],
};

const tr: GuideDocument = {
  meta: {
    title:
      "Duyarlı Tasarım ve Viewport: Telefonunuz Ne Görüyor, Laptopunuz Ne Görüyor?",
    eyebrow: "Tasarım",
    description:
      "1440px'lik bir web sitesi neden 375px'lik bir telefonda çöker, viewport meta etiketi gerçekte neyi kontrol eder, CSS breakpoint'leri nasıl çalışır, px vs rem vs em ne zaman kullanılır ve geliştiriciler duyarlı düzenleri gerçekten nasıl test eder.",
    excerpt:
      "Viewport basitçe açıklanıyor: meta etiketleri, breakpoint'ler, CSS birimleri, mobil öncelikli strateji ve düzeni bozan tuzaklar.",
    readingTime: "10 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    {
      type: "p",
      content: [
        "Laptopunuzda mükemmel görünen bir site büyük ihtimalle 1440px genişliğindeki bir laptop için tasarlanmıştır. Onu 375px genişliğindeki bir iPhone'da açın ve viewport meta etiketinin neden var olduğunu anlayacaksınız: etiket olmadan tarayıcı sayfanın tamamını 1440 piksel genişliğinde işler, telefon ekranına sığdırmak için küçültür ve her şeyi okumak için yakınlaştırma yapmanız gereken devasa bir sayfa sunar. Viewport, tarayıcınızın sayfanız üzerindeki penceresidir ve onu kontrol etmek, duyarlı tasarımın en önemli ilk adımıdır.",
      ],
    },

    {
      type: "h2",
      content: ["Viewport gerçekte nedir?"],
    },
    {
      type: "p",
      content: [
        "Viewport fiziksel ekran değildir. Tarayıcının içerik alanının iç boyutlarıdır — HTML ve CSS'inizi gerçekten görüntüleyen, kaydırma çubuklarını, tarayıcı arayüzünü ve işletim sistemi unsurlarını hariç tutan kısımdır. Masaüstü tarayıcılarda viewport genellikle pencere boyutuyla eşleşir; telefonlarda ise donanım piksel sayısını değil, cihazın CSS piksel boyutlarıyla eşleşir.",
      ],
    },
    {
      type: "p",
      content: [
        "CSS pikselleri ile donanım pikselleri arasındaki ayrım tam olarak ",
        { text: "devicePixelRatio", code: true },
        " kavramının geldiği yerdir. Modern bir iPhone 15, 393x852 CSS piksel noktası viewportu raporlar, ancak ekranın 1179x2556 fiziksel pikseli vardır — devicePixelRatio değeri 3'tür. Yani her CSS pikseli 3x3'lük bir donanım piksel bloğuna karşılık gelir ve keskin metin, net kenarlar üretir. Bunu doğrudan yönetmeniz gerekmez; tarayıcı ve işletim sistemi eşlemeyi halleder. Ancak bu açıklama, 375px CSS viewportunun düşük çözünürlüklü bir ekran olmadığı gerçeğini açıklar.",
      ],
    },

    {
      type: "h2",
      content: ["Viewport meta etiketi ve neyi kontrol eder"],
    },
    {
      type: "p",
      content: [
        "Viewport, ",
        { text: "<head>", code: true },
        " etiketinin içine konulan tek bir HTML öğesiyle yapılandırılır:",
      ],
    },
    {
      type: "code",
      lang: "html",
      content: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    },
    {
      type: "p",
      content: [
        "İki kritik değer ",
        { text: "width=device-width", code: true },
        " ve ",
        { text: "initial-scale=1", code: true },
        " dir. İlkincisi tarayıcıya şunu söyler: CSS viewport genişliğini, 980px varsayılan masaüstü genişliğinde olduğu gibi varsayımla değil, cihazın CSS piksel cinsinden ekran genişliğine eşitle. İkincisi, sayfa yüklendiğinde yakınlaştırmayı %100'e kilitleyerek içeriğin otomatik olarak yakınlaştırılmasını veya uzaklaştırılmasını engeller.",
      ],
    },
    {
      type: "p",
      content: [
        "Bu etiket olmadan mobil tarayıcılar sayfaları masaüstüdeymiş gibi işler. iOS Safari tarihsel olarak 980px'lik bir düzen viewportu kullanıyor ve bunu telefon ekranına sığdırmak için küçültüyordu. Sonuç, yalnızca yakınlaştırma yapıldığında okunabilen metin, tıklanamayacak kadar küçük dokunma hedefleri ve form doldurmak için yakınlaştırma gerektiren formlardı. Her modern CSS çatısı — Bootstrap, Tailwind, Foundation — bu etiketi varsayılan olarak içerir, bu yüzden sorun kaybolmuş gibi görünür. Sıfırdan inşa ederken etiketi unutursanız, bunu hemen fark edersiniz.",
      ],
    },

    {
      type: "h2",
      content: ["CSS breakpoint'leri: gelenekler, yasalar değil"],
    },
    {
      type: "p",
      content: [
        "Bir medya sorgusu breakpoint'i, düzeninizin değiştiği CSS genişliğidir. En yaygın kullanılan değerler 640px, 768px, 1024px ve 1280px'tir ve bunlar gerçek cihaz kategorilerine yaklaşık karşılık geldiği için yerleşik kalmıştır:",
      ],
    },
    {
      type: "table",
      columns: [
        "Breakpoint",
        "CSS genişliği",
        "Tipik cihaz hedefi",
        "Düzen değişikliği",
      ],
      rows: [
        [
          "sm",
          "640px",
          "Büyük telefonlar (iPhone 14, Galaxy S23)",
          "Tek sütun biraz genişler",
        ],
        [
          "md",
          "768px",
          "Dikey iPad'ler, küçük tabletler",
          "Kenar çubuğu görünür veya ızgara iki sütuna döner",
        ],
        [
          "lg",
          "1024px",
          "Yatay iPad'ler, küçük laptoplar",
          "Tam navigasyon düzeni, üç sütunlu ızgara",
        ],
        [
          "xl",
          "1280px",
          "Standart laptoplar ve masaüstü bilgisayarlar",
          "İçerik maksimum genişliği, geniş dolgu",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "Bu sayılar Tailwind'in varsayılan yapılandırmasından miras kalan geleneklerdir ve en çok kullanılan cihazlarla iyi eşleşir. Ancak hiçbir spesifikasyon tarafından buyrulmaz. Düzeninizin tuttuğu içeriğe göre tepki vermesi gerekir: bir kart bileşeni 790px'de garip sarılıyorsa, breakpoint'ınızı oraya koyun. Breakpoint'ların amacı, her genişlikte içeriği okunabilir ve düzeni kasıtlı tutmaktır, yuvarlak sayılara ulaşmak değildir.",
      ],
    },
    {
      type: "code",
      lang: "css",
      content: `/* Mobil öncelikli: temel stiller telefonlar içindir */
.container {
  padding: 1rem;
}

/* Tablet ve üzeri */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Masaüstü ve üzeri */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}`,
    },

    {
      type: "h2",
      content: ["Mobil öncelikli yaklaşım: neden daha iyi çalışır?"],
    },
    {
      type: "p",
      content: [
        "Mobil öncelikli yaklaşım, küçük ekranlar için temel CSS'i yazar ve ekran büyüdükçe ",
        { text: "min-width", code: true },
        " medya sorgularıyla karmaşıklık ekler. Tersi — masaüstü öncelikli — tam genişlikli bir düzenden başlar ve küçük ekranlarda ",
        { text: "max-width", code: true },
        " ile özellikler kaldırır. Mobil öncelikli tercih edilir çünkü daha hafif, daha hızlı ve bakımını yapması daha kolay CSS üretir.",
      ],
    },
    {
      type: "p",
      content: [
        "Temel neden kademeli geliştirmedir. Mobil öncelikli bir stil sayfası yükleyen telefon, yalnızca ihtiyacı olan CSS'i alır: daha az ızgara kuralı, masaüstü navigasyon geçersiz kılma yok, daha küçük görsel yüklemeler. Aynı stil sayfasını yükleyen masaüstü, temel stillere medya sorgusu eklemelerini de alır. Masaüstü öncelikli ise, telefon tüm masaüstü CSS'i yüklemek zorunda kalır ve sonra ihtiyaç duymadığı şeyleri geri almak için ek kurallar yükler. Sonuç daha fazla bayt, yavaş bağlantılarda daha yavaş işleme ve özgünlük çatışması olasılığının artmasıdır.",
      ],
    },
    {
      type: "p",
      content: [
        "Ayrıca bir hata ayıklama avantajı da vardır: 1440px'de bir şey bozuk görünüyorsa, hangi medya sorgusunu inceleyeceğinizi bilirsiniz. Masaüstü öncelikli yaklaşımda 375px'de bir şey bozuk görünüyorsa, sorun temel stillerde, 768px geçersiz kılmada, 1024px geçersiz kılmada veya 1280px geçersiz kılmada olabilir. Mobil öncelikli, küçük ekranların her zaman en basit sürümü gösterdiği anlamına gelir.",
      ],
    },

    {
      type: "h2",
      content: ["px vs rem vs em: her biri ne zaman önemlidir?"],
    },
    {
      type: "p",
      content: [
        "CSS, öğeleri boyutlandırmak için üç birim sistemi sunar ve her biri farklı bir amaca hizmet eder:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "px (piksel): ", bold: true },
          {
            text: "CSS pikseline bağlı mutlak birimler, donanım pikseli değil. Kenarlık genişlikleri için (1px solid), gölgeler ve kullanıcının temel yazı tipi ayarından bağımsız olarak aynı boyutta kalması gereken her şey için kullanın. Duyarlı düzenlerde px ile yazı tipi boyutu kullanmayın — ölçeklenebilir tipografinin amacını ortadan kaldırır.",
          },
        ],
        [
          { text: "rem (kök em): ", bold: true },
          {
            text: "Kök elementin yazı tipi boyutuna göredir ve tarayıcılarda varsayılan olarak 16px'tir. Kafanızda 1rem'i 16px olarak ayarladıysanız dönüşümler doğrudandır: 1.5rem = 24px, 2rem = 32px. Kök boyutunu değiştirirseniz her rem değeri birlikte ölçeklenir. Bu yüzden rem, modern CSS'te duyarlı yazı tipi boyutları, dolgular ve kenar boşlukları için standarttır.",
          },
        ],
        [
          { text: "em: ", bold: true },
          {
            text: "Elementin kendi yazı tipi boyutuna göredir. 16px tabanlı bir üst öğe içinde 16 × 1.2 × 2 = 38.4px olur. Bu iç içe davranış em'i spacing için öngörülemez yapar, ancak metinle kasıtlı olarak ölçeklenmesi istenen boyutlandırma için kullanışlıdır, örneğin etiketlerin yanındaki simge boyutları.",
          },
        ],
      ],
    },
    {
      type: "table",
      columns: [
        "Birim",
        "Referans",
        "İç içe geçer mi?",
        "En iyi kullanım alanı",
      ],
      rows: [
        [
          "px",
          "CSS pikseli (mutlak)",
          "Hayır",
          "Kenarlıklar, gölgeler, ince çizgiler",
        ],
        [
          "rem",
          "Kök yazı tipi boyutu (16px varsayılan)",
          "Hayır",
          "Yazı tipi boyutları, dolgular, kenar boşlukları",
        ],
        [
          "em",
          "Üst veya kendi yazı tipi boyutu",
          "Evet",
          "Metin yanında simge boyutlandırma, satır yüksekliği",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "Pratik bir kural: genel düzen ile birlikte ölçeklenmesi gereken her şey için rem, ölçeklenmemesi gereken her şey için px ve yalnızca değerin çevreleyen metinle birlikte büyümesini kasıtlı olarak istediğinizde em kullanın. Duyarlı bir tasarımda dolguların breakpoint'ler arasında beklenmedik şekilde zıpladığını görüyorsanız, suçlu neredeyse her zaman font-size değişimindeki em tabanlı spacing'tir.",
      ],
    },

    {
      type: "h2",
      content: ["Duyarlı düzenleri bozan yaygın tuzaklar"],
    },
    {
      type: "p",
      content: [
        "Duyarlı tasarım basit görünür, ta ki kenar vakaları yüzeye çıkana kadar. Bunlar her seviyeden geliştiriciyi yakalayan tuzaklardır:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Konteynerlarda sabit piksel genişlikleri: ", bold: true },
          {
            text: "Bir sarmalayıcıya width: 960px koymak katı bir sınır oluşturur. 768px'lik bir tablette konteyner taşar ve yatay kaydırma çubuğu tetikler. Bunun yerine yüzde veya rem değerleriyle max-width kullanın — düzen her zaman küçülebilir.",
          },
        ],
        [
          { text: "100vw kaydırma çubuğu taşması: ", bold: true },
          {
            text: "",
            { text: "100vw", code: true },
            " birimi, dikey kaydırma çubuğu dahil viewport genişliğinin %100'ü demektir. Kaydırılabilir içerikli bir sayfada bu, roughly 15-17px'lik (kaydırma çubuğu genişliği) yatay taşmaya neden olur. Bunun yerine gövdede veya sarmalayıcıda ",
            { text: "100%", code: true },
            " kullanın — kaydırma çubuğunu hariç tutar.",
          },
        ],
        [
          { text: "Mobilde çok küçük yazı tipi boyutları: ", bold: true },
          {
            text: "14px veya 16px body font-size masaüstünde iyi görünür ancak telefonlarda, özellikle uzun okumalarda dar hissedilebilir. Çözüm masaüstü metnini büyütmek değil, mobil tabanı biraz daha yüksekte (örn. 16-18px) ayarlamak ve masaüstü breakpoint'lerinin rem oranlarıyla küçültmesine izin vermektir. Apple, okunabilirlik için minimum 11pt (yaklaşık 14.6px) önermektedir.",
          },
        ],
        [
          { text: "Kısıtlanmamış genişlikteki görseller: ", bold: true },
          {
            text: "Sabit genişliğe veya hiç kısıtlama olmayan bir görsel, konteynerini zorlayarak taşar. Tüm içerik görsellerine ",
            { text: "max-width: 100%; height: auto;", code: true },
            " uygulayarak ebeveyniyle birlikte küçülmelerini sağlayın.",
          },
        ],
        [
          { text: "Gerçek sorunları gizleyen gizli taşma: ", bold: true },
          {
            text: "Yatay kaydırmayı gizlemek için üst öğeye ",
            { text: "overflow: hidden", code: true },
            " uygulamak bir belirti düzeltmesidir. Düzen hâlâ bozuktur; yalnızca göremiyorsunuz. Taşmaya neden olan öğeyi bulmak için tarayıcınızın duyarlı denetim aracını kullanın.",
          },
        ],
      ],
    },
    {
      type: "note",
      tone: "warning",
      title: "100vw tuzağı en yaygın duyarlılık hatasıdır",
      content: [
        "Geliştiriciler tam genişlikte bir hero bölümünü ",
        { text: "width: 100vw", code: true },
        " ayarlayarak ekranı doldurmasını bekler. Görünür kaydırma çubuğu olan her sayfada hero, viewport'tan biraz daha geniş olur ve yatay kaydırma üretir. Doğru kalıp, gövde içindeki bir konteynerda ",
        { text: "width: 100%", code: true },
        " kullanmaktır; bu doğal olarak kaydırma çubuğu genişliğini hariç tutar.",
      ],
    },

    {
      type: "h2",
      content: ["Geliştiriciler duyarlılığı gerçekten nasıl test eder?"],
    },
    {
      type: "p",
      content: [
        "Duyarlı tasarımı test etmek farklı viewport boyutlarını simüle etmeyi gerektirir. Geliştiriciler üç ana yaklaşım kullanır:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Tarayıcı DevTools cihaz araç çubuğu: ", bold: true },
          {
            text: "Chrome, Firefox ve Safari'nin tümü, herhangi bir viewport genişliği ve yüksekliği yazmanıza, cihaz ön ayarlarından seçim yapmanıza ve dokunma olayları, kullanıcı aracısı dizeleri ve piksel yoğunluğu dahil olmak üzere cihaz öykünmesini açıp kapatmanıza olanak tanıyan duyarlı bir mod sunar. Bu, düzen hatalarını yakalamanın en hızlı yoludur — genişliği yeniden boyutlandırın ve nelerin yanlış gittiğini izleyin.",
          },
        ],
        [
          { text: "Gerçek cihazlar: ", bold: true },
          {
            text: "Öykünmeler mükemmel değildir. Dokunma davranışı, yazı tipi işleme, kaydırma momentumu ve sanal klavyeler gerçek donanımda farklıdır. En az bir iPhone ve bir Android telefonda test etmek, emülatörlerin kaçırdığı sorunları yakalar — özellikle çentik ve yuvarlatılmış köşelerdeki güvenli alan ekleri ve iOS Safari'nin lastik bant kaydırması etrafındaki.",
          },
        ],
        [
          { text: "Duyarlı viewport araçları: ", bold: true },
          {
            text: "Çevrimiçi araçlar, tarayıcınızın şu anda hangi viewport boyutlarını raporladığını, bunları yaygın cihaz ön ayarlarıyla karşılaştırmanızı ve CSS pikselleri ile fiziksel pikseller arasındaki farkı anlamanızı sağlar. Bu, bir tasarımın DevTools'ta doğru görünmesinin ancak gerçek bir cihazda biraz farklı olmasının nedenini ayıklamak için particularly kullanışlıdır — cevap genellikle devicePixelRatio'dur.",
          },
        ],
      ],
    },
    {
      type: "note",
      tone: "success",
      title: "Sadece uçları değil, her breakpoint'te test edin",
      content: [
        "Yalnızca 375px ve 1440px kontrol etmeyin. Düzen hatalarının çoğu breakpoint'ler arasındaki boşluklarda ortaya çıkar — kenar çubuğunun henüz çökmediği 680px'de veya bir ızgara öğesinin garipce uzadığı 900px'de. Tam aralık boyunca yavaşça yeniden boyutlandırın ve taşan, örtüşen veya hizalama kaybeden öğeleri izleyin.",
      ],
    },

    {
      type: "h2",
      content: ["Convrs'teki duyarlılık araçları"],
    },
    {
      type: "p",
      content: [
        "Convrs, viewport davranışını anlamanıza ve test etmenize yardımcı olan iki araç içerir: ",
        { text: "ekran ve viewport kontrol aracı", bold: true },
        " tarayıcınızın canlı viewport boyutlarını, devicePixelRatio değerini ve yaygın cihaz ön ayarlarıyla karşılaştırmayı gösterir — tasarımın makinenizdeki ile bir müşterinin telefonundaki neden farklı göründüğünü anlamak için faydalıdır; ",
        { text: "ve px-rem-em dönüştürücü", bold: true },
        " herhangi bir kök yazı tipi boyutunda CSS piksel birimleri, rem ve em değerleri arasında anında dönüşüm yapar. Her iki araç da yalnızca tarayıcınızda çalışır, hiçbir veri cihazınızdan çıkmaz.",
      ],
    },
  ],
};

const de: GuideDocument = {
  meta: {
    title:
      "Responsives Design und das Viewport: Was Ihr Handy sieht vs. was Ihr Laptop sieht",
    eyebrow: "Design",
    description:
      "Warum eine 1440px-Webseite auf einem 375px-Handy kollabiert, was das Viewport-Meta-Tag tatsächlich steuert, wie CSS-Breakpoints funktionieren, wann man px vs rem vs em verwendet, und wie Entwickler responsives Layout wirklich testen.",
    excerpt:
      "Das Viewport einfach erklärt: Meta-Tags, Breakpoints, CSS-Einheiten, Mobile-First-Strategie und die Fallstricke, die responsives Layout zerstören.",
    readingTime: "10 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    {
      type: "p",
      content: [
        "Eine Seite, die auf Ihrem Laptop perfekt aussieht, wurde wahrscheinlich für einen 1440px-Laptop entworfen. Öffnen Sie sie auf einem 375px-iPhone und Sie verstehen, warum das Viewport-Meta-Tag existiert: Ohne es rendert der Browser die gesamte Seite bei 1440 Pixel Breite, schrumpft sie, um auf den Bildschirm zu passen, und liefert eine Seite so winzig, dass man pinch-zoomen muss, um etwas zu lesen. Das Viewport ist das Browserfenster auf Ihre Seite, und es zu steuern ist der wichtigste erste Schritt im responsiven Design.",
      ],
    },

    {
      type: "h2",
      content: ["Was das Viewport eigentlich ist"],
    },
    {
      type: "p",
      content: [
        "Das Viewport ist nicht der physische Bildschirm. Es sind die inneren Abmessungen des Browserinhaltsbereichs — der Teil, der Ihr HTML und CSS tatsächlich anzeigt, ausgeschlossen Scrollleisten, Browserchrome und Betriebssystemoberfläche. Im Desktop-Browser stimmt das Viewport typischerweise mit der Fenstergröße überein; auf einem Handy stimmt es mit den CSS-Pixelabmessungen des Geräts überein, nicht mit der Hardware-Pixelanzahl.",
      ],
    },
    {
      type: "p",
      content: [
        "Diese Unterscheidung zwischen CSS-Pixeln und Hardware-Pixeln ist genau der Punkt, an dem ",
        { text: "devicePixelRatio", code: true },
        " ins Spiel kommt. Ein modernes iPhone 15 meldet ein CSS-Viewport von 393x852 Punkten, aber der Bildschirm hat 1179x2556 physische Pixel — eine devicePixelRatio von 3. Das bedeutet, jedes CSS-Pixel belegt einen 3x3-Block aus Hardware-Pixeln und erzeugt scharfen Text und klare Kanten. Sie müssen das nicht direkt verwalten; Browser und Betriebssystem übernehmen die Zuordnung. Aber es erklärt, warum ein 375px-CSS-Viewport kein niederauflösender Bildschirm ist.",
      ],
    },

    {
      type: "h2",
      content: ["Das Viewport-Meta-Tag und was es steuert"],
    },
    {
      type: "p",
      content: [
        "Das Viewport wird mit einem einzigen HTML-Element konfiguriert, das in den ",
        { text: "<head>", code: true },
        " -Tag kommt:",
      ],
    },
    {
      type: "code",
      lang: "html",
      content: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    },
    {
      type: "p",
      content: [
        "Die beiden kritischen Anweisungen sind ",
        { text: "width=device-width", code: true },
        " und ",
        { text: "initial-scale=1", code: true },
        ". Die erste sagt dem Browser: Setze die CSS-Viewport-Breite auf die Bildschirmbreite des Geräts in CSS-Pixeln, anstatt bei einer Standardbreite von 980px Desktop zu rendern. Die zweite fixiert den Zoom auf 100% beim Laden, damit der Inhalt nicht automatisch vergrößert oder verkleinert wird.",
      ],
    },
    {
      type: "p",
      content: [
        "Ohne dieses Tag rendern mobile Browser Seiten, als wären sie auf einem Desktop. Safari auf iOS verwendete historisch eine 980px-Layout-Viewport-Breite und skalierte sie herunter, um auf den Bildschirm zu passen. Das Ergebnis: Text, den man nur nach Pinch-Zoom lesen kann, Tip-ziele, die zu klein zum Antippen sind, und Formulare, die man heranzoomen muss. Jedes moderne CSS-Framework — Bootstrap, Tailwind, Foundation — enthält dieses Tag standardmäßig, weshalb das Problem verschwunden zu sein scheint. Aber wenn Sie von Null an bauen und das Tag vergessen, entdecken Sie es sofort wieder.",
      ],
    },

    {
      type: "h2",
      content: ["CSS-Breakpoints: Konventionen, keine Gesetze"] },
    },
    {
      type: "p",
      content: [
        "Ein Media-Query-Breakpoint ist eine CSS-Breite, bei der sich Ihr Layout ändert. Die am häufigsten verwendeten Werte sind 640px, 768px, 1024px und 1280px. Diese haben sich gehalten, weil sie ungefähr den realen Gerätekategorien entsprechen:",
      ],
    },
    {
      type: "table",
      columns: [
        "Breakpoint",
        "CSS-Breite",
        "Typisches Zielgerät",
        "Layout-Änderung",
      ],
      rows: [
        [
          "sm",
          "640px",
          "Große Handys (iPhone 14, Galaxy S23)",
          "Einfache Spalte wird etwas breiter",
        ],
        [
          "md",
          "768px",
          "iPads im Hochformat, kleine Tablets",
          "Seitenleiste erscheint oder Gitter wechselt zu zwei Spalten",
        ],
        [
          "lg",
          "1024px",
          "iPad im Querformat, kleine Laptops",
          "Volles Navigationslayout, dreispaltiges Gitter",
        ],
        [
          "xl",
          "1280px",
          "Standard-Laptops und Desktops",
          "Inhalts-Maximalbreite, großzügiger Innenabstand",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "Diese Zahlen sind Konventionen, die aus Tailwinds Standardkonfiguration stammen, und passen gut zu den Geräten, die die meisten Menschen besitzen. Aber sie werden von keiner Spezifikation vorgegeben. Ihr Layout sollte auf den Inhalt reagieren, den es enthält: Wenn eine Kartenkomponente bei 790px seltsam umbricht, setzen Sie Ihren Breakpoint dort. Der Zweck von Breakpoints ist es, den Inhalt bei jeder Breite lesbar und das Layout bewusst zu halten, keine runden Zahlen zu treffen.",
      ],
    },
    {
      type: "code",
      lang: "css",
      content: `/* Mobile First: Basisstile sind für Handys */
.container {
  padding: 1rem;
}

/* Tablet und größer */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop und größer */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}`,
    },

    {
      type: "h2",
      content: ["Mobile First: Warum es besser funktioniert"],
    },
    {
      type: "p",
      content: [
        "Der Mobile-First-Ansatz schreibt die Basis-CSS für kleine Bildschirme und fügt mit ",
        { text: "min-width", code: true },
        " Media-Queries Komplexität hinzu, wenn der Bildschirm wächst. Die Alternative — Desktop First — beginnt mit einem Layout in voller Breite und verwendet ",
        { text: "max-width", code: true },
        " um Funktionen auf kleineren Bildschirmen zu entfernen. Mobile First wird bevorzugt, weil es leichteres, schnelleres und wartbares CSS produziert.",
      ],
    },
    {
      type: "p",
      content: [
        "Der Grund ist schrittweise Verbesserung. Ein Handy, das ein Mobile-First-Stylesheet lädt, bekommt nur das CSS, das es braucht: weniger Gitterregeln, keine Desktop-Navigations-Overrides, kleinere Bildladungen. Ein Desktop, der dasselbe Stylesheet lädt, bekommt die Basisstile plus die Media-Query-Zusätze. Bei Desktop First muss das Handy das gesamte Desktop-CSS laden und dann zusätzliche Regeln laden, um das rückgängig zu machen, was es nicht braucht. Das Ergebnis: mehr Bytes, langsameres Rendern auf langsamen Verbindungen und eine höhere Wahrscheinlichkeit von Spezifitätskonflikten.",
      ],
    },
    {
      type: "p",
      content: [
        "Es gibt auch einen Debugging-Vorteil: Wenn etwas bei 1440px kaputt aussieht, wissen Sie genau, welche Media-Query Sie untersuchen müssen. Wenn etwas bei 375px in einem Desktop-First-Ansatz kaputt aussieht, könnte das Problem in den Basis-Stilen, dem 768px-Override, dem 1024px-Override oder dem 1280px-Override liegen. Mobile First bedeutet, dass kleine Bildschirme immer die einfachste Version anzeigen.",
      ],
    },

    {
      type: "h2",
      content: ["px vs rem vs em: Wann jede Einheit wichtig ist"],
    },
    {
      type: "p",
      content: [
        "CSS bietet drei Einheitensysteme zum Größenbestimmen von Elementen, jedes für einen anderen Zweck:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "px (Pixel): ", bold: true },
          {
            text: "Absolute Einheiten, die an CSS-Pixel gebunden sind, nicht an Hardware-Pixel. Verwenden Sie sie für Rahmenbreiten (1px solid), Schatten und alles, was unabhängig von der benutzerdefinierten Schriftgröße gleich groß bleiben soll. Verwenden Sie kein px für Schriftgrößen in einem responsiven Layout — es untergräbt den Zweck skalierbarer Typografie.",
          },
        ],
        [
          { text: "rem (Root em): ", bold: true },
          {
            text: "Bezogen auf die Schriftgröße des Root-Elements, die in jedem Browser standardmäßig 16px beträgt. Wenn Sie 1rem = 16px im Kopf behalten, sind Umrechnungen einfach: 1.5rem = 24px, 2rem = 32px. Jeder rem-Wert skaliert zusammen, wenn Sie die Root-Größe ändern. Deshalb ist rem der Standard für responsive Schriftgrößen, Innenabstände und Außenabstände im modernen CSS.",
          },
        ],
        [
          { text: "em: ", bold: true },
          {
            text: "Bezogen auf die Schriftgröße des Elements selbst. Das Problem: em vermehrt sich. Ein h2 mit font-size: 2em in einem Elternteil mit 16px Basis wird zu 38.4px (16 × 1.2 × 2). Dieses Verschachtelungsverhalten macht em für Abstände unvorhersehbar, aber nützlich für Größen, die absichtlich mit Text skalieren sollen, wie Icon-Abmessungen neben Beschriftungen.",
          },
        ],
      ],
    },
    {
      type: "table",
      columns: [
        "Einheit",
        "Bezug",
        "Vermehrt sich?",
        "Beste Verwendung",
      ],
      rows: [
        [
          "px",
          "CSS-Pixel (absolut)",
          "Nein",
          "Rahmen, Schatten, dünne Linien",
        ],
        [
          "rem",
          "Root-Schriftgröße (16px Standard)",
          "Nein",
          "Schriftgrößen, Innenabstände, Außenabstände",
        ],
        [
          "em",
          "Elternteil- oder Eigene Schriftgröße",
          "Ja",
          "Icon-Größen neben Text, Zeilenhöhe",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "Eine praktische Regel: Verwenden Sie rem für alles, was mit dem Gesamtlayout skalieren soll, px für das, was nicht skalieren soll, und em nur, wenn Sie absichtlich wollen, dass ein Wert mit dem umgebenden Text wächst. Wenn Sie in einem responsiven Design sehen, dass Innenabstände bei Breakpoints unerwartet springen, ist der Übeltäter fast immer em-basierter Abstand innerhalb einer Schriftgrößenänderung.",
      ],
    },

    {
      type: "h2",
      content: ["Häufige Fallstricke, die responsives Layout zerstören"],
    },
    {
      type: "p",
      content: [
        "Responsives Design wirkt einfach, bis Grenzfälle auftauchen. Das sind die Fallstricke, die Entwickler jeder Erfahrungsstufe treffen:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Fixe Pixelbreiten auf Containern: ", bold: true },
          {
            text: "width: 960px auf einen Wrapper zu setzen, erzeugt eine harte Grenze. Auf einem 768px-Tablet überläuft der Container und löst horizontales Scrollen aus. Verwenden Sie stattdessen max-width mit Prozent- oder rem-Werten — das Layout kann immer schrumpfen.",
          },
        ],
        [
          { text: "100vw Scrollleisten-Überlauf: ", bold: true },
          {
            text: "Die Einheit ",
            { text: "100vw", code: true },
            " bedeutet 100% der Viewport-Breite einschließlich einer vertikalen Scrollleiste. Auf einer Seite mit scrollbarem Inhalt verursacht dies einen horizontalen Überlauf von etwa 15-17px (der Scrollleisten-Breite). Verwenden Sie stattdessen ",
            { text: "100%", code: true },
            " am Body oder einem Wrapper — es schließt die Scrollleiste aus.",
          },
        ],
        [
          { text: "Zu kleine Schriftgrößen auf Mobil: ", bold: true },
          {
            text: "Eine body font-size von 14px oder 16px sieht auf dem Desktop gut aus, kann sich aber auf Handys, besonders beim längeren Lesen, geengt anfühlen. Die Lösung ist nicht, Desktop-Text zu vergrößern, sondern die mobile Basis etwas höher zu setzen (z.B. 16-18px) und Desktop-Breakpoints bei Bedarf über rem-Verhältnisse verkleinern zu lassen. Apple empfiehlt mindestens 11pt (ca. 14.6px) für Lesbarkeit.",
          },
        ],
        [
          { text: "Bilder ohne Größenbeschränkung: ", bold: true },
          {
            text: "Ein Bild mit fester Breite oder ohne Beschränkung drängt an seinem Container vorbei. Wenden Sie ",
            { text: "max-width: 100%; height: auto;", code: true },
            " auf alle Inhaltsbilder an, damit sie mit ihrem Elternteil schrumpfen.",
          },
        ],
        [
          { text: "Versteckter Überlauf kaschiert echte Probleme: ", bold: true },
          {
            text: "Auf einem Elternteil ",
            { text: "overflow: hidden", code: true },
            { text: "anzuwenden, um horizontales Scrollen zu verstecken, ist eine Symptombehandlung. Das Layout ist immer noch kaputt, Sie können es nur nicht sehen. Verwenden Sie den responsiven Inspektor Ihres Browsers, um das Element zu finden, das den Überlauf verursacht.",
          },
        ],
      ],
    },
    {
      type: "note",
      tone: "warning",
      title: "Die 100vw-Falle ist der häufigste Responsive-Fehler",
      content: [
        "Entwickler setzen einen Vollbreiten-Hero-Bereich auf ",
        { text: "width: 100vw", code: true },
        " und erwarten, dass er den Bildschirm füllt. Auf jeder Seite mit sichtbarer Scrollleiste ist der Hero etwas breiter als das Viewport und erzeugt horizontales Scrollen. Das richtige Muster ist ",
        { text: "width: 100%", code: true },
        " auf einem Container innerhalb des Body, der die Scrollleiten-Breite natürlich ausschließt.",
      ],
    },

    {
      type: "h2",
      content: ["Wie Entwickler responsives Design wirklich testen"],
    },
    {
      type: "p",
      content: [
        "Das Testen von responsivem Design erfordert die Simulation verschiedener Viewport-Größen. Entwickler verwenden drei Hauptansätze:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Browser DevTools Geräte-Toolbar: ", bold: true },
          {
            text: "Chrome, Firefox und Safari bieten alle einen responsiven Modus (Strg+Umschalt+M in Chrome), in dem Sie jede Viewport-Breite und Höhe eingeben, aus Gerätevorgaben wählen und Geräteemulation einschließlich Touch-Ereignissen, User-Agent-Strings und Pixeldichte umschalten können. Das ist der schnellste Weg, Layout-Fehler zu finden — Sie ändern die Breite und beobachten, was schiefgeht.",
          },
        ],
        [
          { text: "Echte Geräte: ", bold: true },
          {
            text: "Emulatoren sind nicht perfekt. Touch-Verhalten, Schriftwiedergabe, Scroll-Momentum und virtuelle Tastaturen unterscheiden sich auf echter Hardware. Das Testen auf mindestens einem iPhone und einem Android-Handy fängt Probleme, die Emulatoren verpassen, insbesondere rund um Safe-Area-Insets (Notch und abgerundete Ecken) und die Gummiband-Scrolling von iOS Safari.",
          },
        ],
        [
          { text: "Responsives Viewport-Tools: ", bold: true },
          {
            text: "Online-Tools zeigen Ihnen, welche Viewport-Abmessungen Ihr Browser aktuell meldet, vergleichen sie mit gängigen Gerätevorgaben und erklären den Unterschied zwischen CSS-Pixeln und physischen Pixeln. Das ist besonders nützlich, um herauszufinden, warum ein Design in DevTools korrekt aussieht, aber auf einem echten Gerät leicht anders — die Antwort ist oft devicePixelRatio.",
          },
        ],
      ],
    },
    {
      type: "note",
      tone: "success",
      title: "An jedem Breakpoint testen, nicht nur an den Enden",
      content: [
        "Prüfen Sie nicht nur 375px und 1440px. Die meisten Layout-Fehler treten in den Lücken zwischen Breakpoints auf — bei 680px, wenn eine Seitenleiste noch nicht eingeklappt ist, oder bei 900px, wo ein Gitterelement seltsam gestreckt wird. Ändern Sie langsam die Breite über den gesamten Bereich und beobachten Sie Elemente, die überlaufen, überlappen oder die Ausrichtung verlieren.",
      ],
    },

    {
      type: "h2",
      content: ["Responsive-Werkzeuge in Convrs"],
    },
    {
      type: "p",
      content: [
        "Convrs enthält zwei Werkzeuge, die Ihnen helfen, Viewport-Verhalten zu verstehen und zu testen: ",
        { text: "der Bildschirm- und Viewport-Checker", bold: true },
        " zeigt die aktuellen Viewport-Abmessungen Ihres Browsers, die devicePixelRatio und einen Vergleich mit gängigen Gerätevorgaben — nützlich, um zu verstehen, warum ein Design auf Ihrem Rechner anders aussieht als auf dem Telefon eines Kunden, ",
        { text: "und der px-rem-em-Konverter", bold: true },
        " übersetzt sofort zwischen CSS-Pixel-Einheiten, rem- und em-Werten bei jeder Root-Schriftgröße. Beide Werkzeuge laufen vollständig in Ihrem Browser, keine Daten verlassen Ihr Gerät.",
      ],
    },
  ],
};

const es: GuideDocument = {
  meta: {
    title:
      "Diseño responsive y el viewport: lo que ve tu móvil vs. lo que ve tu portátil",
    eyebrow: "Diseño",
    description:
      "Por qué un sitio de 1440px colapsa en un móvil de 375px, qué controla realmente la meta viewport, cómo funcionan los breakpoints de CSS, cuándo usar px vs rem vs em, y cómo los desarrolladores testan de verdad diseños responsive.",
    excerpt:
      "El viewport explicado sin rodeos: meta tags, breakpoints, unidades CSS, estrategia mobile-first y los errores que rompen los diseños responsive.",
    readingTime: "10 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    {
      type: "p",
      content: [
        "Un sitio que se ve perfecto en tu portátil probablemente fue diseñado para un portátil de 1440px. Ábrelo en un iPhone de 375px y entenderás por qué existe la meta viewport: sin ella, el navegador renderiza la página completa a 1440 píxeles de ancho, la encoge para que quepa en la pantalla del móvil y entrega una página tan diminuta que necesitas hacer pinch-zoom para leer cualquier cosa. El viewport es la ventana del navegador hacia tu página, y controlarlo es el primer paso más importante del diseño responsive.",
      ],
    },

    {
      type: "h2",
      content: ["Qué es realmente el viewport"],
    },
    {
      type: "p",
      content: [
        "El viewport no es la pantalla física. Son las dimensiones internas del área de contenido del navegador — la parte que realmente muestra tu HTML y CSS, excluyendo barras de desplazamiento, chrome del navegador y la interfaz del sistema operativo. En un navegador de escritorio el viewport suele coincidir con el tamaño de la ventana; en un móvil coincide con las dimensiones en píxeles CSS del dispositivo, no con el recuento de píxeles físicos.",
      ],
    },
    {
      type: "p",
      content: [
        "Esta distinción entre píxeles CSS y píxeles de hardware es donde entra ",
        { text: "devicePixelRatio", code: true },
        ". Un iPhone 15 moderno reporta un viewport CSS de 393x852 puntos, pero la pantalla tiene 1179x2556 píxeles físicos — un devicePixelRatio de 3. Esto significa que cada píxel CSS ocupa un bloque de 3x3 píxeles de hardware, produciendo texto nítido y bordes afilados. No necesitas gestionar esto directamente; el navegador y el sistema operativo manejan la conversión. Pero explica por qué un viewport de 375px CSS no es una pantalla de baja resolución.",
      ],
    },

    {
      type: "h2",
      content: ["La meta viewport y qué controla"],
    },
    {
      type: "p",
      content: [
        "El viewport se configura con un solo elemento HTML que va dentro de la etiqueta ",
        { text: "<head>", code: true },
        ":",
      ],
    },
    {
      type: "code",
      lang: "html",
      content: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    },
    {
      type: "p",
      content: [
        "Las dos directivas críticas son ",
        { text: "width=device-width", code: true },
        " y ",
        { text: "initial-scale=1", code: true },
        ". La primera le dice al navegador: ajusta el ancho del viewport CSS al ancho de pantalla del dispositivo en píxeles CSS, en vez de renderizar con un ancho de escritorio predeterminado de 980px. La segunda fija el zoom al 100% al cargar la página para que el contenido no se amplíe ni reduzca automáticamente.",
      ],
    },
    {
      type: "p",
      content: [
        "Sin esta etiqueta, los navegadores móviles renderizan las páginas como si estuvieran en un escritorio. Safari en iOS usaba históricamente un viewport de 980px y lo escalaba para que cupiera en la pantalla. El resultado: texto que solo se lee tras pinch-zoom, elementos táctiles demasiado pequeños para tocar y formularios a los que hay que acercarse para rellenarlos. Todo framework CSS moderno — Bootstrap, Tailwind, Foundation — incluye esta etiqueta por defecto, por eso el problema parece haber desaparecido. Pero si construyes desde cero y la olvidas, la redescubrirás de inmediato.",
      ],
    },

    {
      type: "h2",
      content: ["Los breakpoints de CSS: convenciones, no leyes"] },
    {
      type: "p",
      content: [
        "Un breakpoint de media query es una anchura de CSS en la que tu diseño cambia. Los valores más usados son 640px, 768px, 1024px y 1280px, y se han mantenido porque corresponden aproximadamente a categorías de dispositivos reales:",
      ],
    },
    {
      type: "table",
      columns: [
        "Breakpoint",
        "Ancho CSS",
        "Dispositivo típico objetivo",
        "Cambio de diseño",
      ],
      rows: [
        [
          "sm",
          "640px",
          "Móviles grandes (iPhone 14, Galaxy S23)",
          "Columna simple se ensancha un poco",
        ],
        [
          "md",
          "768px",
          "iPads en vertical, tablets pequeñas",
          "Aparece barra lateral o la cuadrícula pasa a dos columnas",
        ],
        [
          "lg",
          "1024px",
          "iPad en horizontal, portátiles pequeños",
          "Navegación completa, cuadrícula de tres columnas",
        ],
        [
          "xl",
          "1280px",
          "Portátiles y escritorios estándar",
          "Ancho máximo del contenido, relleno amplio",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "Estos números son convenciones heredadas de la configuración por defecto de Tailwind, y se ajustan bien a los dispositivos que más gente posee. Pero no los manda ninguna especificación. Tu diseño debe responder al contenido que contiene: si un componente de tarjeta se envuelve mal a 790px, pon tu breakpoint ahí. El propósito de los breakpoints es mantener el contenido legible y el diseño intencional en cada anchura, no dar con números redondos.",
      ],
    },
    {
      type: "code",
      lang: "css",
      content: `/* Mobile-first: los estilos base son para móviles */
.container {
  padding: 1rem;
}

/* Tablet en adelante */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Escritorio en adelante */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}`,
    },

    {
      type: "h2",
      content: ["Mobile-first: por qué funciona mejor"],
    },
    {
      type: "p",
      content: [
        "El enfoque mobile-first escribe el CSS base para pantallas pequeñas y añade complejidad con media queries de ",
        { text: "min-width", code: true },
        " a medida que la pantalla crece. La alternativa — desktop-first — empieza con un diseño de ancho completo y usa ",
        { text: "max-width", code: true },
        " para eliminar funcionalidades en pantallas más pequeñas. Se prefiere mobile-first porque produce CSS más ligero, más rápido y más fácil de mantener.",
      ],
    },
    {
      type: "p",
      content: [
        "La razón principal es la mejora progresiva. Un móvil que carga un Stylesheet mobile-first recibe solo el CSS que necesita: menos reglas de cuadrícula, sin overrides de navegación de escritorio, menos carga de imágenes. Un escritorio que carga el mismo Stylesheet recibe los estilos base más los complementos de media query. Con desktop-first, el móvil tiene que cargar todo el CSS de escritorio y luego cargar reglas adicionales para deshacer lo que no necesita. El resultado: más bytes, renderizado más lento en conexiones lentas y mayor probabilidad de conflictos de especificidad.",
      ],
    },
    {
      type: "p",
      content: [
        "También hay una ventaja de depuración: si algo se ve mal a 1440px, sabes exactamente qué media query inspeccionar. Si algo se ve mal a 375px en un enfoque desktop-first, el problema podría estar en los estilos base, el override de 768px, el de 1024px o el de 1280px. Mobile-first significa que las pantallas pequeñas siempre muestran la versión más simple.",
      ],
    },

    {
      type: "h2",
      content: ["px vs rem vs em: cuándo importa cada uno"],
    },
    {
      type: "p",
      content: [
        "CSS ofrece tres sistemas de unidades para dimensionar elementos, cada uno con un propósito diferente:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "px (píxeles): ", bold: true },
          {
            text: "Unidades absolutas ligadas a píxeles CSS, no a píxeles de hardware. Úsalos para anchos de borde (1px solid), sombras y todo lo que deba mantenerse del mismo tamaño sin importar la configuración de tamaño de fuente del usuario. No uses px para tamaños de fuente en un diseño responsive — anula el propósito de la tipografía escalable.",
          },
        ],
        [
          { text: "rem (raíz em): ", bold: true },
          {
            text: "Relativo al tamaño de fuente del elemento raíz, que por defecto es 16px en todos los navegadores. Si fijas en tu cabeza que 1rem = 16px, las conversiones son directas: 1.5rem = 24px, 2rem = 32px. Todos los valores rem escalan juntos si cambias el tamaño raíz. Por eso rem es el estándar para tamaños de fuente, rellenos y márgenes responsive en CSS moderno.",
          },
        ],
        [
          { text: "em: ", bold: true },
          {
            text: "Relativo al tamaño de fuente del elemento mismo. El problema: em se compone. Un h2 con font-size: 2em dentro de un padre con 16px base renderiza a 38.4px (16 × 1.2 × 2). Este comportamiento anidado hace que em sea impredecible para espaciado, pero útil para dimensiones que intencionalmente escalan con el texto, como dimensiones de iconos junto a etiquetas.",
          },
        ],
      ],
    },
    {
      type: "table",
      columns: [
        "Unidad",
        "Referencia",
        "Se compone?",
        "Mejor uso",
      ],
      rows: [
        [
          "px",
          "Píxel CSS (absoluto)",
          "No",
          "Bordes, sombras, líneas finas",
        ],
        [
          "rem",
          "Tamaño de fuente raíz (16px por defecto)",
          "No",
          "Tamaños de fuente, rellenos, márgenes",
        ],
        [
          "em",
          "Tamaño de fuente padre o propio",
          "Sí",
          "Dimensiones de iconos junto a texto, altura de línea",
        ],
      ],
    },
    {
      type: "p",
      content: [
        "Una regla práctica: usa rem para todo lo que deba escalar con el layout general, px para lo que no deba escalar, y em solo cuando quieras que un valor crezca intencionalmente con el texto circundante. Si ves en un diseño responsive que los rellenos saltan inesperadamente entre breakpoints, el culpable casi siempre es espaciado basado em dentro de un cambio de tamaño de fuente.",
      ],
    },

    {
      type: "h2",
      content: ["Errores comunes que rompen el diseño responsive"],
    },
    {
      type: "p",
      content: [
        "El diseño responsive parece sencillo hasta que aparecen casos borde. Estos son los errores que atrapan a desarrolladores de todos los niveles de experiencia:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Anchos fijos en píxeles en contenedores: ", bold: true },
          {
            text: "Poner width: 960px en un contenedor crea un límite duro. En un tablet de 768px el contenedor se desborda y activa scroll horizontal. Usa max-width con valores porcentuales o rem en su lugar — el layout siempre puede encogerse.",
          },
        ],
        [
          { text: "Desbordamiento del scrollbar en 100vw: ", bold: true },
          {
            text: "La unidad ",
            { text: "100vw", code: true },
            " significa 100% del ancho del viewport incluyendo cualquier barra de desplazamiento vertical. En una página con contenido desplazable esto causa un desbordamiento horizontal de aproximadamente 15-17px (el ancho del scrollbar). Usa ",
            { text: "100%", code: true },
            " en el body o un contenedor en su lugar — excluye la barra de desplazamiento.",
          },
        ],
        [
          { text: "Tamaños de fuente demasiado pequeños en móvil: ", bold: true },
          {
            text: "Un body font-size de 14px o 16px se ve bien en escritorio pero puede sentirse apretado en móviles, especialmente para lectura prolongada. La solución no es aumentar el texto del escritorio sino establecer la base móvil un poco más alta (ej. 16-18px) y dejar que los breakpoints de escritorio reduzcan mediante proporciones rem si es necesario. Apple recomienda un mínimo de 11pt (aprox. 14.6px) para legibilidad.",
          },
        ],
        [
          { text: "Imágenes sin restricción de ancho: ", bold: true },
          {
            text: "Una imagen con ancho fijo o sin restricción empuja fuera de su contenedor. Aplica ",
            { text: "max-width: 100%; height: auto;", code: true },
            " a todas las imágenes de contenido para que se encuegan con su padre.",
          },
        ],
        [
          { text: "Overflow oculto que enmascara problemas reales: ", bold: true },
          {
            text: "Aplicar ",
            { text: "overflow: hidden", code: true },
            " a un padre para ocultar el scroll horizontal es un parche de síntomas. El diseño sigue roto; simplemente no puedes verlo. Usa el inspector responsive del navegador para encontrar el elemento que causa el desbordamiento.",
          },
        ],
      ],
    },
    {
      type: "note",
      tone: "warning",
      title: "La trampa de 100vw es el error responsive más común",
      content: [
        "Los desarrolladores ponen una sección hero a ancho completo con ",
        { text: "width: 100vw", code: true },
        " esperando que llene la pantalla. En cualquier página con scrollbar visible, el hero es un poco más ancho que el viewport y genera scroll horizontal. El patrón correcto es usar ",
        { text: "width: 100%", code: true },
        " en un contenedor dentro del body, que naturalmente excluye el ancho de la scrollbar.",
      ],
    },

    {
      type: "h2",
      content: ["Cómo testan realmente los desarrolladores el responsive"],
    },
    {
      type: "p",
      content: [
        "Probar el diseño responsive requiere simular diferentes tamaños de viewport. Los desarrolladores usan tres enfoques principales:",
      ],
    },
    {
      type: "list",
      items: [
        [
          { text: "Barra de herramientas de dispositivos en DevTools: ", bold: true },
          {
            text: "Chrome, Firefox y Safari todos proporcionan un modo responsive (Ctrl+Shift+M en Chrome) que te permite escribir cualquier anchura y altura de viewport, elegir de presets de dispositivos y alternar la emulación de dispositivos incluyendo eventos táctiles, cadenas de usuario y densidad de píxeles. Es la forma más rápida de atrapar fallos de diseño — redimensiona la anchura y observa dónde salen mal las cosas.",
          },
        ],
        [
          { text: "Dispositivos reales: ", bold: true },
          {
            text: "Los emuladores no son perfectos. El comportamiento táctil, la renderización de fuentes, el momentum de scroll y los teclados virtuales son todos diferentes en hardware real. Probar al menos en un iPhone y un Android atrapa problemas que los emuladores pasan por alto, especialmente alrededor de insets de área segura (notch y esquinas redondeadas) y el scroll elástico de iOS Safari.",
          },
        ],
        [
          { text: "Herramientas de viewport responsive: ", bold: true },
          {
            text: "Herramientas online te muestran qué dimensiones de viewport reporta tu navegador actualmente, las comparan con presets comunes de dispositivos y te ayudan a entender la diferencia entre píxeles CSS y píxeles físicos. Esto es particularmente útil para depurar por qué un diseño se ve correcto en DevTools pero ligeramente diferente en un dispositivo real — la respuesta suele ser el devicePixelRatio.",
          },
        ],
      ],
    },
    {
      type: "note",
      tone: "success",
      title: "Testea en cada breakpoint, no solo en los extremos",
      content: [
        "No solo compruebes 375px y 1440px. La mayoría de fallos de diseño aparecen en los huecos entre breakpoints — a 680px cuando una barra lateral aún no se ha colapsado, o a 900px donde un elemento de la cuadrícula se estira de forma extraña. Redimensiona lentamente por todo el rango y observa los elementos que se desbordan, se superponen o pierden la alineación.",
      ],
    },

    {
      type: "h2",
      content: ["Herramientas de responsive en Convrs"],
    },
    {
      type: "p",
      content: [
        "Convrs incluye dos herramientas que te ayudan a entender y probar el comportamiento del viewport: ",
        { text: "el verificador de pantalla y viewport", bold: true },
        " muestra las dimensiones de viewport en vivo de tu navegador, tu devicePixelRatio y una comparación con presets comunes de dispositivos — útil para entender por qué un diseño se ve diferente en tu máquina que en el móvil de un cliente, ",
        { text: "y el convertidor px-rem-em", bold: true },
        " traduce instantáneamente entre unidades de píxeles CSS, valores rem y em en cualquier tamaño de fuente raíz. Ambas herramientas funcionan completamente en tu navegador, ningún dato sale de tu dispositivo.",
      ],
    },
  ],
};

const responsiveDesignViewportGuide: GuideDefinition = {
  slug: "responsive-design-viewport-guide",
  content: { en, tr, de, es },
};

export default responsiveDesignViewportGuide;
