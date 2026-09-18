import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "HTML Entity Encoding & Decoding: The Developer's Complete Guide",
    eyebrow: "Web Development",
    description:
      "HTML entities turn special characters into safe markup. Learn what &amp;, &lt;, &gt;, &quot; and numeric references actually do, why escaping user input is non-negotiable for security, and where encoding and URL-encoding diverge.",
    excerpt:
      "A practical walkthrough of HTML entities: named vs numeric codes, the five mandatory escapes, XSS prevention, and the difference between %20 and &nbsp;.",
    readingTime: "11 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: [
      "A user pastes a code snippet into a comment box and suddenly the whole page layout breaks. The cause is not exotic — it is a single unescaped ",
      { text: "<", bold: true },
      " character being parsed as the start of an HTML tag. The browser stops rendering the comment text and starts looking for element names, attributes and closing brackets. The fix is equally simple: replace that character with its HTML entity and the page renders correctly. This guide explains what HTML entities are, why every developer who handles user-generated content needs them, and how to avoid the common mistakes that cause real problems in production.",
    ]},

    { type: "h2", content: ["What HTML entities actually are"] },
    { type: "p", content: [
      "HTML reserves a small set of characters for its own syntax: angle brackets define tags, ampersands introduce entities, and quotes wrap attribute values. When you need to display one of these characters as literal text — not as markup — you replace it with an entity reference. An entity reference is either a short name wrapped in ampersand and semicolon (",
      { text: "&amp;lt;", code: true },
      ") or a numeric code (",
      { text: "&#60;", code: true },
      " or ",
      { text: "&#x3C;", code: true },
      "). The browser interprets the entity during parsing and renders the corresponding character without treating it as structural HTML.",
    ]},
    { type: "p", content: [
      "There are two families of entities. ",
      { text: "Named entities", bold: true },
      " use human-readable names — ",
      { text: "&amp;amp;", code: true },
      " for ampersand, ",
      { text: "&amp;lt;", code: true },
      " for less-than, ",
      { text: "&amp;gt;", code: true },
      " for greater-than. ",
      { text: "Numeric (decimal) entities", bold: true },
      " use the character's Unicode code point: ",
      { text: "&#60;", code: true },
      " for less-than, ",
      { text: "&#x3C;", code: true },
      " in hexadecimal. Both approaches produce the same result in the browser; named entities are easier for humans to read, numeric entities cover every Unicode character.",
    ]},
    { type: "p", content: [
      "The five entities that every web developer must know by heart are these: ",
      { text: "&amp;amp;", code: true },
      " (&), ",
      { text: "&amp;lt;", code: true },
      " (<), ",
      { text: "&amp;gt;", code: true },
      " (>), ",
      { text: "&amp;quot;", code: true },
      " ("), ",
      { text: "&amp;apos;", code: true },
      " ('). The HTML5 spec also defines ",
      { text: "&amp;nbsp;", code: true },
      " for a non-breaking space, which is the one named entity that does not correspond to a syntax character but still appears constantly in web content.",
    ]},

    { type: "h2", content: ["The five mandatory entities and their numeric alternatives"] },
    { type: "table", columns: ["Named Entity", "Character", "Decimal", "Hex", "When You Need It"], rows: [
      ["&amp;amp;", "&", "&38;", "&#x26;", "Every ampersand in text or attribute values — must be escaped first"],
      ["&amp;lt;", "<", "&#60;", "&#x3C;", "Any less-than sign outside a tag; displays code snippets, comparisons"],
      ["&amp;gt;", ">", "&#62;", "&#x3E;", "Greater-than sign in text; required alongside &lt; in code blocks"],
      ["&amp;quot;", "\"", "&#34;", "&#x22;", "Double quotes inside HTML attribute values"],
      ["&amp;apos;", "'", "&#39;", "&#x27;", "Single quotes inside single-quoted attributes; XML compatibility"],
    ]},
    { type: "note", tone: "warning", title: "Escape ampersands first — always", content: [
      "The ampersand is the gateway character for all entities. If you escape < first and leave the &amp; unescaped, the browser may interpret your newly created &amp;lt; as a literal ampersand followed by \"lt;\" rather than the entity &amp;lt;. Always encode &amp; as &amp;amp; before touching anything else. This is the single most common encoding mistake in production code.",
    ]},

    { type: "h2", content: ["Why escaping user content is a security requirement"] },
    { type: "p", content: [
      "When an application stores text that a user typed and renders it back into HTML without encoding, any angle brackets in that text become part of the DOM. A malicious comment containing ",
      { text: "<script>alert('XSS')</script>", code: true },
      " is not displayed as text — it is executed as JavaScript. This is a cross-site scripting (XSS) attack, and it is one of the most common web vulnerabilities. The OWASP Top 10 has included XSS in every edition because developers still forget to escape user input.",
    ]},
    { type: "p", content: [
      "The defense is straightforward: before any user-generated string enters HTML output, encode the five mandatory characters. When the string ",
      { text: "<script>", code: true },
      " goes through proper encoding, it becomes ",
      { text: "&amp;lt;script&amp;gt;", code: true },
      " and the browser renders it as harmless visible text. The same principle applies to attributes: if a user's display name contains a double quote and you insert it into a ",
      { text: "title", code: true },
      " attribute without encoding, the attacker can break out of the attribute and inject arbitrary HTML.",
    ]},
    { type: "code", lang: "html", content: `<!-- DANGEROUS: user input injected raw -->
<div class="comment">${userComment}</div>

<!-- SAFE: user input encoded before injection -->
<div class="comment">${encodeHtml(userComment)}</div>

<!-- DANGEROUS: name injected into attribute -->
<img src="photo.jpg" alt="${userName}">

<!-- SAFE: name encoded inside attribute -->
<img src="photo.jpg" alt="${encodeHtml(userName)}">` },

    { type: "h2", content: ["HTML encoding vs URL encoding: they solve different problems"] },
    { type: "p", content: [
      "Developers frequently confuse HTML encoding with URL encoding (also called percent encoding). They serve completely different purposes. HTML encoding protects text content within an HTML document so that special characters are displayed, not parsed. URL encoding protects characters inside a URL path, query string or fragment so that the HTTP request is transmitted correctly.",
    ]},
    { type: "p", content: [
      "A space in HTML becomes ",
      { text: "&amp;nbsp;", code: true },
      " (or just a regular space if you do not need to prevent line breaking). The same space in a URL becomes ",
      { text: "%20", code: true },
      ". The ampersand in HTML becomes ",
      { text: "&amp;amp;", code: true },
      " — but in a URL query string it is a separator, so if you need a literal ampersand in a parameter value it becomes ",
      { text: "%26", code: true },
      ". Using the wrong encoding in the wrong context breaks things: ",
      { text: "&amp;nbsp;", code: true },
      " inside a URL will not work, and ",
      { text: "%20", code: true },
      " inside HTML will appear as literal text.",
    ]},
    { type: "note", tone: "success", title: "The rule of thumb", content: [
      "Inside HTML text or attributes: use HTML entities. Inside URLs, file paths or query parameters: use percent encoding. When a value passes through both (for example, a search query in a link's href attribute), apply URL encoding first to the query value, then HTML-encode the entire href before inserting it into the markup.",
    ]},

    { type: "h2", content: ["Real-world scenarios where encoding matters"] },
    { type: "p", content: [
      "HTML encoding is not an academic exercise. Every application that displays user-generated content or renders dynamic data faces these situations daily:",
    ]},
    { type: "list", items: [
      [
        { text: "Code snippets in blog posts or documentation: ", bold: true },
        { text: "A tutorial showing a Python comparison like " },
        { text: "if x < 10 and y > 5:", code: true },
        { text: " will break the surrounding HTML if the angle brackets are not encoded. The < starts a tag, the browser enters an error recovery mode, and the visible output is mangled." },
      ],
      [
        { text: "User comments and forum posts: ", bold: true },
        { text: "Any platform accepting free-text input — comments, reviews, chat messages — must encode output. The comment that simply types " },
        { text: "a < b", code: true },
        { text: " is not being malicious, but the unencoded < will still break rendering." },
      ],
      [
        { text: "JSON inside script tags: ", bold: true },
        { text: "Server-rendered JSON embedded in a " },
        { text: "<script>", code: true },
        { text: " block needs careful handling. Strings containing " },
        { text: "</script>", code: true },
        { text: " will prematurely close the script tag. The safe pattern is to encode < and > within JSON string values, or use a " },
        { text: "type=\"application/json\"", code: true },
        { text: " data block with no JavaScript parsing." },
      ],
      [
        { text: "Mailto links with special characters: ", bold: true },
        { text: "A mailto link's subject line containing & must be encoded as " },
        { text: "&amp;amp;", code: true },
        { text: " inside the HTML href, while the actual subject parameter uses percent encoding for spaces and non-ASCII characters." },
      ],
      [
        { text: "Double ampersands in attributes: ", bold: true },
        { text: "Writing " },
        { text: "href=\"search?q=a&&b\"", code: true },
        { text: " directly in HTML is problematic. The browser sees the second & as the start of an entity reference. Both ampersands must be encoded: " },
        { text: "href=\"search?q=a&amp;amp;b\"", code: true },
        { text: "." },
      ],
      [
        { text: "Less-than in data attributes: ", bold: true },
        { text: "A data attribute like " },
        { text: "data-config=\"{min: 0, max: 10}\"", code: true },
        { text: " is fine, but " },
        { text: "data-template=\"<div>content</div>\"", code: true },
        { text: " must be fully encoded because the < and > will be interpreted as tags by the HTML parser before the JavaScript ever sees the attribute." },
      ],
    ]},

    { type: "h2", content: ["Over-escaping and under-escaping: the two failure modes"] },
    { type: "p", content: [
      "Getting encoding wrong in either direction creates visible bugs. ",
      { text: "Under-escaping", bold: true },
      " means you did not encode enough characters. The consequences range from broken layouts (a stray < steals part of the page) to full XSS vulnerabilities. Under-escaping is the more dangerous failure because it affects security, not just display.",
    ]},
    { type: "p", content: [
      { text: "Over-escaping", bold: true },
      " means you encoded characters that did not need encoding, or you encoded them multiple times. A user's name like ",
      { text: "Tom & Jerry", code: true },
      " displays as ",
      { text: "Tom &amp;amp; Jerry", code: true },
      " if the ampersand gets double-encoded. This happens when a pipeline encodes the same string at two different stages — the application encodes once, then a template engine or content security layer encodes again. The result is unreadable text and broken display.",
    ]},
    { type: "p", content: [
      "The way to avoid both problems is a clear rule: ",
      { text: "encode once, at the point of output, and never before.", bold: true },
      " Store the raw value in your database. Apply HTML encoding at the exact moment you insert it into HTML markup. Do not encode when saving, do not encode when passing between backend functions, and do not encode when storing in a template variable. Single-point encoding prevents double-encoding; consistently encoding at output prevents under-encoding.",
    ]},
    { type: "code", lang: "js", content: `// WRONG: encode at storage time
db.save({ comment: encodeHtml(userInput) }); // double-encode risk

// RIGHT: encode at output time
const comment = db.getComment(id); // raw text
element.innerHTML = encodeHtml(comment); // encode once, here` },

    { type: "h2", content: ["Which characters actually need encoding in each context"] },
    { type: "p", content: [
      "Not every character requires encoding in every situation. The minimum required set depends on where the text appears:",
    ]},
    { type: "list", items: [
      [
        { text: "In element content (between opening and closing tags): ", bold: true },
        { text: "Encode " },
        { text: "&", code: true },
        { text: " and " },
        { text: "<", code: true },
        { text: ". The " },
        { text: ">", code: true },
        { text: " is technically optional but strongly recommended — browsers tolerate unencoded > in content, but it can cause parsing issues in edge cases withCDATA sections and adjacent text nodes." },
      ],
      [
        { text: "In double-quoted attributes: ", bold: true },
        { text: "Encode " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: ", and " },
        { text: "\"", code: true },
        { text: ". The < is rarely encountered in attribute values but must be escaped when present." },
      ],
      [
        { text: "In single-quoted attributes: ", bold: true },
        { text: "Encode " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: ", and " },
        { text: "'", code: true },
        { text: " instead of double quotes." },
      ],
      [
        { text: "In JavaScript strings inserted into HTML: ", bold: true },
        { text: "All five mandatory entities. When a JS variable flows into innerHTML, template literal, or document.write, every special character must be encoded." },
      ],
      [
        { text: "Inside CDATA sections (XML/XHTML): ", bold: true },
        { text: "You can bypass entity encoding entirely inside " },
        { text: "<![CDATA[...]]>", code: true },
        { text: " blocks — except the sequence " },
        { text: "]]>", code: true },
        { text: " which must never appear unescaped. CDATA is relevant for SVG and MathML embedded in HTML5 documents." },
      ],
    ]},

    { type: "h2", content: ["Browser quirks and edge cases"] },
    { type: "p", content: [
      "Modern browsers are forgiving about many HTML mistakes, but that forgiveness creates a false sense of security. Specific edge cases to be aware of:",
    ]},
    { type: "list", items: [
      [
        { text: "Unquoted attributes with special characters: ", bold: true },
        { text: "Writing " },
        { text: "class=foo&bar", code: true },
        { text: " without quotes will break because the browser sees " },
        { text: "&", code: true },
        { text: " as an entity start. Always quote attribute values, and encode the content of those quotes." },
      ],
      [
        { text: "The no-end-tag elements: ", bold: true },
        { text: "Elements like " },
        { text: "<script>", code: true },
        { text: ", " },
        { text: "<style>", code: true },
        { text: ", and " },
        { text: "<textarea>", code: true },
        { text: " use a special parsing mode. Inside these elements, almost no entity decoding occurs in HTML5 — you must encode " },
        { text: "<", code: true },
        { text: " and " },
        { text: "&", code: true },
        { text: " to prevent premature tag closing, but named entities like " },
        { text: "&amp;nbsp;", code: true },
        { text: " are treated as literal text." },
      ],
      [
        { text: "Invalid entity references: ", bold: true },
        { text: "The browser silently drops semicolons from unrecognized entities. Typing " },
        { text: "&foo;", code: true },
        { text: " renders as the literal text " },
        { text: "&foo;", code: true },
        { text: " in most browsers, but " },
        { text: "&foo", code: true },
        { text: " (no semicolon) can consume the next character — a bug that is extremely hard to trace." },
      ],
      [
        { text: "Numeric character references vs control characters: ", bold: true },
        { text: "Using numeric entities for control characters like " },
        { text: "&#x0;", code: true },
        { text: " (null) is forbidden in HTML5. The parser silently replaces them with U+FFFD (replacement character) or drops them entirely." },
      ],
    ]},
    { type: "note", tone: "warning", title: "The trailing-semicolon trap", content: [
      "An entity reference without a trailing semicolon is ambiguous. &amp;lt without the semicolon is parsed as the entity &amp;lt followed by whatever character comes next. A user typing &amp;cat accidentally creates an entity &amp;ca followed by a stray t. Always verify that your encoding function includes the semicolon for every entity it produces.",
    ]},

    { type: "h2", content: ["Encoding strategies in practice"] },
    { type: "p", content: [
      "Most web frameworks include built-in encoding functions. React's JSX auto-encodes expression values inside element content (but ",
      { text: "dangerouslySetInnerHTML", code: true },
      " bypasses this entirely — use it only with trusted, pre-sanitized content). Server-side templating engines like Jinja2, Handlebars and Blade all provide escape filters. The key point: know where your framework encodes automatically and where it does not.",
    ]},
    { type: "p", content: [
      "For the five mandatory entities, a minimal encoding function is straightforward. The function replaces each special character with its named entity, ampersands first:",
    ]},
    { type: "code", lang: "js", content: `function encodeHtml(str) {
  return str
    .replace(/&/g, "&amp;")   // must be first
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Usage:
const safe = encodeHtml('He said "a < b & c > d"');
// → He said &quot;a &lt; b &amp; c &gt; d&quot;` },
    { type: "note", tone: "success", title: "Prefer the standard library", content: [
      "The manual function above is for understanding, not production use. In Node.js use the built-in text Encoding API or a well-tested library. In the browser, textContent assignment handles most cases automatically. The DOMParser API is the safest route for user-supplied HTML when you need to allow some tags but block others — it parses without executing scripts.",
    ]},

    { type: "h2", content: ["HTML encoding tools on Convrs"] },
    { type: "p", content: [
      "When you need to quickly encode or decode HTML entities — whether you are debugging a rendering issue, preparing content for a CMS, or testing how escaped text will look — ",
      { text: "the HTML Encode/Decode tool on Convrs", bold: true },
      " handles both directions in the browser. Paste your text, choose encode or decode, and get the result instantly. No file upload, no server round-trip, no data leaving your device. It covers all five mandatory entities plus numeric references, so you can verify that your output encoding matches what the browser expects.",
    ]},
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "HTML Varlık Kodlaması ve Çözümleme: Geliştirici Rehberi",
    eyebrow: "Web Geliştirme",
    description:
      "HTML varlıkları özel karakterleri güvenli markup'a dönüştürür. &amp;, &lt;, &gt;, &quot; ve sayısal referansların ne işe yaradığını, kullanıcı girişini neden kodlamanın güvenlik açısından zorunlu olduğunu ve URL kodlama ile arasındaki farkı öğrenin.",
    excerpt:
      "HTML varlıklarının pratik bir anlatımı: adlı ve sayısal kodlar, beş zorunlu kaçış, XSS önleme ve %20 ile &nbsp; arasındaki fark.",
    readingTime: "11 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: [
      "Bir kullanıcı yorum kutusuna bir kod parçası yapıştırır ve aniden tüm sayfa düzeni bozulur. Neden egzotik bir sorun değildir — yalnızca kodlanmamış tek bir ",
      { text: "<", bold: true },
      " karakterinin HTML etiketi olarak yorumlanmasıdır. Tarayıcı yorum metnini göstermeyi bırakır ve etiket adı, öznitelikler ve kapatma köşeli parantez aramaya başlar. Çözüm de basit: o karakteri HTML varlığına dönüştürün ve sayfa doğru gösterilir. Bu rehber, HTML varlıklarının ne olduğunu, neden kullanıcı tarafından üretilen içerikle uğraşan her geliştiricinin bunlara ihtiyaç duyduğunu ve üretim ortamında gerçek sorunlara yol açan yaygın hataları nasıl önleyeceğinizi açıklar.",
    ]},

    { type: "h2", content: ["HTML varlıklarının gerçekte ne olduğu"] },
    { type: "p", content: [
      "HTML, kendi sözdizimi için küçük bir karakter kümesini ayırır: köşeli parantezler etiketleri tanımlar, ampersandlar varlıkları başlatır ve tırnak işaretleri öznitelik değerlerini sarar. Bu karakterlerden birini düz metin olarak görüntülemeniz gerektiğinde — markup olarak değil — onu bir varlık referansıyla değiştirirsiniz. Varlık referansı, ampersand ve noktalı virgül içine alınmış kısa bir isimdir (",
      { text: "&amp;lt;", code: true },
      ") ya da sayısal bir koddur (",
      { text: "&#60;", code: true },
      " veya ",
      { text: "&#x3C;", code: true },
      "). Tarayıcı ayrıştırma sırasında varlığı yorumlar ve karşılık gelen karakteri yapısal HTML olarak işlemeksizin görüntüler.",
    ]},
    { type: "p", content: [
      "İki varlık ailesi vardır. ",
      { text: "Adlı varlıklar", bold: true },
      " insan tarafından okunabilir isimler kullanır — ampersand için ",
      { text: "&amp;amp;", code: true },
      ", küçüktür için ",
      { text: "&amp;lt;", code: true },
      ", büyüktür için ",
      { text: "&amp;gt;", code: true },
      ". ",
      { text: "Sayısal (ondalık) varlıklar", bold: true },
      " karakterin Unicode kod noktasını kullanır: küçüktür için ",
      { text: "&#60;", code: true },
      ", on altılık gösterimde ",
      { text: "&#x3C;", code: true },
      ". Her iki yaklaşım da tarayıcıda aynı sonucu üretir; adlı varlıklar insanlar için daha okunabilir, sayısal varlıklar ise her Unicode karakteri kapsar.",
    ]},
    { type: "p", content: [
      "Her web geliştiricisinin ezberlemesi gereken beş varlık şunlardır: ",
      { text: "&amp;amp;", code: true },
      " (&), ",
      { text: "&amp;lt;", code: true },
      " (<), ",
      { text: "&amp;gt;", code: true },
      " (>), ",
      { text: "&amp;quot;", code: true },
      " ("), ",
      { text: "&amp;apos;", code: true },
      " ('). HTML5 spec'i ayrıca kesme yer boşluğu için ",
      { text: "&amp;nbsp;", code: true },
      " tanımlar; bu, sözdizimi karakterine karşılık gelmeyen ancak web içeriğinde sürekli görünen adlı varlıktır.",
    ]},

    { type: "h2", content: ["Beş zorunlu varlık ve sayısal alternatifleri"] },
    { type: "table", columns: ["Adlı Varlık", "Karakter", "Ondalık", "On Altılık", "Ne Zaman Gerekli"], rows: [
      ["&amp;amp;", "&", "&38;", "&#x26;", "Metin veya öznitelik değerlerindeki her ampersand — önce kodlanmalıdır"],
      ["&amp;lt;", "<", "&#60;", "&#x3C;", "Etiket dışında her küçüktür işareti; kod parçacıkları, karşılaştırmalar gösterir"],
      ["&amp;gt;", ">", "&#62;", "&#x3E;", "Metindeki büyüktür işareti; kod bloklarında &lt; ile birlikte gereklidir"],
      ["&amp;quot;", "\"", "&#34;", "&#x22;", "HTML öznitelik değerlerinin içindeki çift tırnak işaretleri"],
      ["&amp;apos;", "'", "&#39;", "&#x27;", "Tek tırnaklı özniteliklerin içindeki tek tırnak işaretleri; XML uyumluluğu"],
    ]},
    { type: "note", tone: "warning", title: "Ampersandları önce kodlayın — her zaman", content: [
      "Ampersand, tüm varlıkların geçiş karakteridir. Önce < kodlayıp &amp;'ı kodlamazsanız, tarayıcı yeni oluşturduğunuz &amp;lt; literal bir ampersand ve ardından \"lt;\" olarak yorumlayabilir, &amp;lt; varlığı olarak değil. Her şeyi işlemeye başlamadan önce &amp;'ı &amp;amp; olarak kodlayın. Bu, üretim kodundaki en yaygın kodlama hatasıdır.",
    ]},

    { type: "h2", content: ["Kullanıcı girişini kodlamanın neden bir güvenlik gereksinimi olduğu"] },
    { type: "p", content: [
      "Bir uygulama bir kullanıcının yazdığı metni depolayıp HTML'e kodlamadan geri gösterdiğinde, o metindeki köşeli parantezler DOM'un parçası haline gelir. ",
      { text: "<script>alert('XSS')</script>", code: true },
      " içeren kötü niyetli bir yorum metin olarak görüntülenmez — JavaScript olarak çalıştırılır. Bu, siteler arası betik dağıtma (XSS) saldırısıdır ve OWASP Top 10 listesinde her baskıda yer alır çünkü geliştiriciler hâlâ kullanıcı girişini kodlamayı unutur.",
    ]},
    { type: "p", content: [
      "Savunma basittir: kullanıcı tarafından üretilen bir dize HTML çıktısına girmeden önce, beş özel karakteri kodlayın. ",
      { text: "<script>", code: true },
      " dizesi doğru kodlamadan geçtiğinde ",
      { text: "&amp;lt;script&amp;gt;", code: true },
      " olur ve tarayıcı onu zararsız görünür metin olarak görüntüler. Aynı ilke öznitelikler için de geçerlidir: kullanıcının adı çift tırnak içeriyorsa ve siz bunu kodlamadan ",
      { text: "title", code: true },
      " özniteliğine eklerseniz, saldırgan öznitelikten çıkarak keyfi HTML enjekte edebilir.",
    ]},
    { type: "code", lang: "html", content: `<!-- TEHLİKELİ: kullanıcı girdisi ham olarak enjekte edildi -->
<div class="comment">${userComment}</div>

<!-- GÜVENLİ: kullanıcı girdisi enjeksiyondan önce kodlandı -->
<div class="comment">${encodeHtml(userComment)}</div>

<!-- TEHLİKELİ: ad özniteliğe kodlanmadan eklendi -->
<img src="photo.jpg" alt="${userName}">

<!-- GÜVENLİ: ad öznitelik içinde kodlandı -->
<img src="photo.jpg" alt="${encodeHtml(userName)}">` },

    { type: "h2", content: ["HTML kodlaması ile URL kodlaması: farklı sorunları çözerler"] },
    { type: "p", content: [
      "Geliştiriciler HTML kodlaması ile URL kodlamasını (yüzde kodlama olarak da bilinir) sıkça karıştırır. İkisi tamamen farklı amaçlara hizmet eder. HTML kodlaması, bir HTML belgesi içindeki metin içeriğini koruyarak özel karakterlerin görüntülenmesini sağlar, ayrıştırılmasını değil. URL kodlaması ise bir URL yolu, sorgu dizesi veya parçasındaki karakterleri koruyarak HTTP isteğinin doğru şekilde iletilmesini sağlar.",
    ]},
    { type: "p", content: [
      "HTML'de boşluk ",
      { text: "&amp;nbsp;", code: true },
      " olur (ya da satır kırma ihtiyacınız yoksa düz boşluk). Aynı boşluk URL'de ",
      { text: "%20", code: true },
      " olur. HTML'de ampersand ",
      { text: "&amp;amp;", code: true },
      " olur — ancak URL sorgu dizesinde bir ayırıcıdır, bu yüzden bir parametre değerinde literal ampersand gerekiyorsa ",
      { text: "%26", code: true },
      " olur. Yanlış bağlamda yanlış kodlama kullanmak işleri bozar: ",
      { text: "&amp;nbsp;", code: true },
      " bir URL içinde çalışmaz ve ",
      { text: "%20", code: true },
      " HTML içinde literal metin olarak görünür.",
    ]},
    { type: "note", tone: "success", title: "Kural", content: [
      "HTML metni veya öznitelikleri içindeyse: HTML varlıkları kullanın. URL'ler, dosya yolları veya sorgu parametreleri içindeyse: yüzde kodlama kullanın. Bir değer her ikisinden geçiyorsa (örneğin bir bağlantının href özniteliğindeki arama sorgusu), önce sorgu değerine URL kodlaması uygulayın, sonra tüm href'i markup içine eklemeden HTML kodlayın.",
    ]},

    { type: "h2", content: ["Kodlamanın önemli olduğu gerçek dünya senaryoları"] },
    { type: "p", content: [
      "HTML kodlaması akademik bir egzersiz değildir. Kullanıcı tarafından üretilen içeriği görüntüleyen veya dinamik veri işleyen her uygulama bu durumlarla günlük olarak karşılaşır:",
    ]},
    { type: "list", items: [
      [
        { text: "Bloglarda veya belgelerde kod parçacıkları: ", bold: true },
        { text: "Bir python karşılaştırmasını gösteren eğitim yazısı " },
        { text: "if x < 10 and y > 5:", code: true },
        { text: "蜡rkeli parantezler kodlanmazsa çevreleyen HTML'i bozar. < bir etiket başlatır, tarayıcı hata kurtarma moduna girer ve görünür çıktı bozulur." },
      ],
      [
        { text: "Kullanıcı yorumları ve forum iletileri: ", bold: true },
        { text: "Serbest metin girdisi kabul eden her platform — yorumlar, incelemeler, sohbet iletileri — çıktıyı kodlamalıdır. " },
        { text: "a < b", code: true },
        { text: " yazan yorum kötü niyetli değildir, ancak kodlanmamış < yine de渲染mayı bozacaktır." },
      ],
      [
        { text: "Script etiketleri içindeki JSON: ", bold: true },
        { text: "Sunucu tarafından oluşturulmuş ve " },
        { text: "<script>", code: true },
        { text: " bloğuna gömülü JSON, dikkatli işlem gerektirir. " },
        { text: "</script>", code: true },
        { text: " içeren dize değerleri script etiketini erken kapatır. Güvenli kalıp, JSON dize değerlerinde < ve > kodlamak veya " },
        { text: "type=\"application/json\"", code: true },
        { text: " ile JavaScript ayrıştırması olmayan bir veri bloğu kullanmaktır." },
      ],
      [
        { text: "Özel karakterli mailto bağlantıları: ", bold: true },
        { text: "Bir mailto bağlantısının konu satırındaki & HTML href içinde " },
        { text: "&amp;amp;", code: true },
        { text: " olarak kodlanmalıdır, gerçek konu parametresi ise boşluk ve ASCII dışı karakterler için yüzde kodlama kullanır." },
      ],
      [
        { text: "Özniteliklerdeki çift ampersand: ", bold: true },
        { text: "HTML doğrudan " },
        { text: "href=\"search?q=a&&b\"", code: true },
        { text: " yazmak sorunludur. Tarayıcı ikinci &'ı bir varlık referansı başlatıcı olarak görür. Her iki ampersand da kodlanmalıdır: " },
        { text: "href=\"search?q=a&amp;amp;b\"", code: true },
        { text: "." },
      ],
      [
        { text: "Veri özniteliklerindeki küçüktür: ", bold: true },
        { text: " " },
        { text: "data-config=\"{min: 0, max: 10}\"", code: true },
        { text: " gibi bir veri özniteliği sorunsuzdur, ancak " },
        { text: "data-template=\"<div>content</div>\"", code: true },
        { text: " tamamen kodlanmalıdır çünkü HTML ayrıştırıcısı JavaScript özniteliği görmeden önce < ve >'yi etiket olarak yorumlar." },
      ],
    ]},

    { type: "h2", content: ["Fazla ve eksik kodlama: iki hata modu"] },
    { type: "p", content: [
      "Kodlamayı her iki yönde de yanlış yapmak görünür hatalar yaratır. ",
      { text: "Eksik kodlama", bold: true },
      ", yeterli karakteri kodlamamış olmanız demektir. Sonuçları bozuk düzenlerden (serseri bir < sayfanın bir kısmını çalar) tam XSS açıklarına kadar uzanır. Eksik kodlama daha tehlikeli hatadır çünkü güvenliği değil yalnızca görüntülemeyi etkiler.",
    ]},
    { type: "p", content: [
      { text: "Fazla kodlama", bold: true },
      " ise kodlanması gerekmeyen karakterleri kodlamanız veya aynı karakterleri birden fazla kez kodlamanızdır. Kullanıcının adı ",
      { text: "Tom & Jerry", code: true },
      " gibi görünürken ampersand iki kez kodlandığında ",
      { text: "Tom &amp;amp; Jerry", code: true },
      " olur. Bu, bir boru hattının aynı dizeyi iki farklı aşamada kodlamasıyla gerçekleşir — uygulama bir kez kodlar, ardından bir şablon motoru veya içerik güvenlik katmanı tekrar kodlar. Sonuç okunamayan metin ve bozuk görüntülemedir.",
    ]},
    { type: "p", content: [
      "Her iki sorunu da önlemenin yolu net bir kuraldır: ",
      { text: "tek seferde, çıkış noktasında kodlayın ve asla öncesinde kodlamayın.", bold: true },
      Ham değeri veritabanınızda saklayın. HTML markup'a eklediğiniz anda HTML kodlaması uygulayın. Kaydederken kodlamayın, arka uç işlevleri arasında geçirirken kodlamayın, şablon değişkenine saklarken kodlamayın. Tek noktadan kodlama çift kodlamayı önler; çıkışta tutarlı kodlama eksik kodlamayı önler.",
    ]},
    { type: "code", lang: "js", content: `// YANLIŞ: depolama sırasında kodlama
db.save({ comment: encodeHtml(userInput) }); // çift kodlama riski

// DOĞRU: çıkış noktasında kodlama
const comment = db.getComment(id); // ham metin
element.innerHTML = encodeHtml(comment); // burada tek seferde kodlayın` },

    { type: "h2", content: ["Her bağlamda hangi karakterlerin kodlanması gerektiği"] },
    { type: "p", content: [
      "Her karakter her bağlamda kodlanmayı gerektirmez. Gerekli minimum küme, metnin nerede göründüğüne bağlıdır:",
    ]},
    { type: "list", items: [
      [
        { text: "Öğe içeriğinde (açma ve kapama etiketleri arasında): ", bold: true },
        { text: " " },
        { text: "&", code: true },
        { text: " ve " },
        { text: "<", code: true },
        { text: " kodlanmalıdır. " },
        { text: ">", code: true },
        { text: " teknik olarak isteğe bağlıdır ancak kesinlikle önerilir — tarayıcılar içerikte kodlanmamış >'yi tolere eder, ancak CDATA bölümleri ve komşu metin düğümleriyle kenar durumlarında sorunlara neden olabilir." },
      ],
      [
        { text: "Çift tırnaklı özniteliklerde: ", bold: true },
        { text: " " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: " ve " },
        { text: "\"", code: true },
        { text: " kodlanmalıdır. <, öznitelik değerlerinde nadiren görülür ancak mevcut olduğunda kodlanmalıdır." },
      ],
      [
        { text: "Tek tırnaklı özniteliklerde: ", bold: true },
        { text: "Çift tırnak yerine " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: " ve " },
        { text: "'", code: true },
        { text: " kodlanmalıdır." },
      ],
      [
        { text: "HTML'e eklenen JavaScript dize değerlerinde: ", bold: true },
        { text: "Beş zorunlu varlığın tamamı. Bir JS değişkeni innerHTML, template literal veya document.write içine akıyorsa, her özel karakter kodlanmalıdır." },
      ],
      [
        { text: "CDATA bölümleri içinde (XML/XHTML): ", bold: true },
        { text: "HTML5 belgelerinde gömülü " },
        { text: "<![CDATA[...]]>", code: true },
        { text: " bloklarının içinde varlık kodlamasını tamamen atlayabilirsiniz — " },
        { text: "]]>", code: true },
        { text: " dizgesi hariç, bu asla kodlanmamış olarak görünmemelidir. CDATA, SVG ve MathML için geçerlidir." },
      ],
    ]},

    { type: "h2", content: ["Tarayıcı tuhaf davranışları ve kenar durumlar"] },
    { type: "p", content: [
      "Modern tarayıcılar birçok HTML hatasını affeder, ama bu affedicilik yanlış bir güvenlik hissi yaratır. Farkında olmanız gereken belirli kenar durumlar:",
    ]},
    { type: "list", items: [
      [
        { text: "Özel karakterli tırnaksız öznitelikler: ", bold: true },
        { text: " " },
        { text: "class=foo&bar", code: true },
        { text: " gibi tırnaksız yazmak bozulur çünkü tarayıcı " },
        { text: "&", code: true },
        { text: "'ı varlık başlatıcı olarak görür. Öznitelik değerlerini her zaman tırnak içine alın ve o tırnakların içeriğini kodlayın." },
      ],
      [
        { text: "Kapama etiketi olmayan öğeler: ", bold: true },
        { text: " " },
        { text: "<script>", code: true },
        { text: ", " },
        { text: "<style>", code: true },
        { text: " ve " },
        { text: "<textarea>", code: true },
        { text: " gibi öğeler özel bir ayrıştırma modu kullanır. Bu öğelerin içinde HTML5'te neredeyse hiç varlık çözümlemesi gerçekleşmez — erken etiket kapanmasını önlemek için " },
        { text: "<", code: true },
        { text: " ve " },
        { text: "&", code: true },
        { text: " kodlamanız gerekir, ancak " },
        { text: "&amp;nbsp;", code: true },
        { text: " gibi adlı varlıklar literal metin olarak işlenir." },
      ],
      [
        { text: "Geçersiz varlık referansları: ", bold: true },
        { text: "Tarayıcı tanınmayan varlıklardan noktalı virgülleri sessizce düşürür. " },
        { text: "&foo;", code: true },
        { text: " yazmak çoğu tarayıcıda " },
        { text: "&foo;", code: true },
        { text: " literal metni olarak görüntülenir, ancak " },
        { text: "&foo", code: true },
        { text: " (noktalı virgül olmadan) bir sonraki karakteri yutabilir — izlenmesi son derece zor bir hatadır." },
      ],
      [
        { text: "Sayısal karakter referansları ve kontrol karakterleri: ", bold: true },
        { text: "HTML5'te " },
        { text: "&#x0;", code: true },
        { text: " (null) gibi kontrol karakterleri için sayısal varlıklar kullanmak yasaktır. Ayrıştırıcı bunları sessizce U+FFFD (yerine karakter) ile değiştirir veya tamamen düşürür." },
      ],
    ]},
    { type: "note", tone: "warning", title: "Noktalı virgül tuzağı", content: [
      "Noktalı virgül içermeyen bir varlık referansı belirsizdir. &amp;lt without the semicolon is parsed as the entity &amp;lt followed by whatever character comes next. Kullanıcı &amp;cat yazarak istemeden &amp;ca varlığı ve ardından yalnız bir t oluşturur. Kodlama işlevinizin ürettiği her varlık için noktalı virgül içerdiğinden her zaman emin olun.",
    ]},

    { type: "h2", content: ["Pratikte kodlama stratejileri"] },
    { type: "p", content: [
      "Çoğu web çerçevesi yerleşik kodlama işlevleri içerir. React'in JSX'i, öğe içeriğindeki ifade değerlerini otomatik kodlar (ancak ",
      { text: "dangerouslySetInnerHTML", code: true },
      " bunu tamamen atlar — yalnızca güvenilir, önceden temizlenmiş içerik için kullanın). Jinja2, Handlebars ve Blade gibi sunucu taraflı şablon motorları filtre sağlar. Temel nokta: çerçevenizin nerede otomatik kodladığını ve nerede kodlamadığını bilmektir.",
    ]},
    { type: "p", content: [
      "Beş zorunlu varlık için minimal bir kodlama işlevi basittir. İşlev, ampersandları önce olmak üzere her özel karakteri adlı varlığıyla değiştirir:",
    ]},
    { type: "code", lang: "js", content: `function encodeHtml(str) {
  return str
    .replace(/&/g, "&amp;")   // önce bu olmalı
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Kullanım:
const safe = encodeHtml('He said "a < b & c > d"');
// → He said &quot;a &lt; b &amp; c &gt; d&quot;` },
    { type: "note", tone: "success", title: "Standart kütüphaneyi tercih edin", content: [
      "Yukarıdaki manuel işlev anlama içindir, üretim için değil. Node.js'te yerleşik text Encoding API'sini veya iyi test edilmiş bir kütüphane kullanın. Tarayıcıda textContent ataması çoğu durumu otomatik olarak halleder. Kullanıcı tarafından sağlanan HTML'e bazı etiketleri izin vermeniz ancak diğerlerini engellemeniz gerektiğinde DOMParser API'si en güvenli yoldur — betikleri çalıştırmadan ayrıştırır.",
    ]},

    { type: "h2", content: ["Convrs'teki HTML kodlama araçları"] },
    { type: "p", content: [
      "HTML varlıklarını hızlıca kodlamanız veya çözümlemeniz gerektiğinde —ister bir görüntüleme sorununu ayıklıyor olun, ister bir CMS için içerik hazırlıyor olun, ister kodlanmış metnin nasıl görüneceğini test ediyor olun — ",
      { text: "Convrs'teki HTML Encode/Decode aracı", bold: true },
      " her iki yönü de tarayıcıda işler. Metninizi yapıştırın, kodlama veya çözümlemeyi seçin ve anında sonucu alın. Dosya yükleme yok, sunucu gidiş dönüşü yok, cihazınızdan dışarı çıkmayan veri. Beş zorunlu varlığın yanı sıra sayısal referansları da kapsar, böylece çıktınızın tarayıcının beklediğiyle eşleştiğini doğrulayabilirsiniz.",
    ]},
  ],
};

const de: GuideDocument = {
  meta: {
    title: "HTML-Entity-Kodierung und Decodierung: Der vollständige Entwicklerleitfaden",
    eyebrow: "Webentwicklung",
    description:
      "HTML-Entities verwandeln Sonderzeichen in sicheres Markup. Erfahren Sie, was &amp;, &lt;, &gt;, &quot; und numerische Referenzen wirklich bedeuten, warum das Escaping von Benutzereingaben ein Sicherheitsmuss ist und wo HTML-Kodierung von URL-Kodierung abweicht.",
    excerpt:
      "Ein praxisnaher Durchlauf durch HTML-Entities: benannte vs. numerische Codes, die fünf Pflicht-Escapes, XSS-Prävention und der Unterschied zwischen %20 und &nbsp;.",
    readingTime: "11 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: [
      "Ein Benutzer fügt einen Code-Schnipsel in ein Kommentarfeld ein, und plötzlich bricht das gesamte Layout der Seite zusammen. Die Ursache ist nicht exotisch — es ist ein einziges unescaped ",
      { text: "<", bold: true },
      "-Zeichen, das als Beginn eines HTML-Tags interpretiert wird. Der Browser hört auf, den Kommentar als Text darzustellen, und sucht nach Elementnamen, Attributen und schließenden Klammern. Die Lösung ist ebenso einfach: Ersetzen Sie dieses Zeichen durch seine HTML-Entity, und die Seite wird korrekt gerendert. Dieser Leitfaden erklärt, was HTML-Entities sind, warum jeder Entwickler mit benutzergenerierten Inhalten sie braucht und wie man die häufigen Fehler vermeidet, die in der Produktion reale Probleme verursachen.",
    ]},

    { type: "h2", content: ["Was HTML-Entities wirklich sind"] },
    { type: "p", content: [
      "HTML reserviert eine kleine Menge von Zeichen für seine eigene Syntax: eckige Klammern definieren Tags, Ampersands leiten Entities ein und Anführungszeichen umschließen Attributwerte. Wenn Sie eines dieser Zeichen als reinen Text anzeigen müssen — nicht als Markup — ersetzen Sie es durch eine Entity-Referenz. Eine Entity-Referenz ist entweder ein kurzer Name zwischen Ampersand und Semikolon (",
      { text: "&amp;lt;", code: true },
      ") oder ein numerischer Code (",
      { text: "&#60;", code: true },
      " oder ",
      { text: "&#x3C;", code: true },
      "). Der Browser interpretiert die Entity beim Parsen und gibt das entsprechende Zeichen ohne Behandlung als strukturelles HTML aus.",
    ]},
    { type: "p", content: [
      "Es gibt zwei Entity-Familien. ",
      { text: "Benannte Entities", bold: true },
      " verwenden menschenlesbare Namen — ",
      { text: "&amp;amp;", code: true },
      " für Ampersand, ",
      { text: "&amp;lt;", code: true },
      " für Kleiner-als, ",
      { text: "&amp;gt;", code: true },
      " für Größer-als. ",
      { text: "Numerische (dezimale) Entities", bold: true },
      " verwenden den Unicode-Codepoint des Zeichens: ",
      { text: "&#60;", code: true },
      " für Kleiner-als, ",
      { text: "&#x3C;", code: true },
      " in hexadezimal. Beide Ansätze erzeugen dasselbe Ergebnis im Browser; benannte Entities sind für Menschen lesbarer, numerische Entities decken jedes Unicode-Zeichen ab.",
    ]},
    { type: "p", content: [
      "Die fünf Entities, die jeder Webentwickler auswendig kennen muss, sind: ",
      { text: "&amp;amp;", code: true },
      " (&), ",
      { text: "&amp;lt;", code: true },
      " (<), ",
      { text: "&amp;gt;", code: true },
      " (>), ",
      { text: "&amp;quot;", code: true },
      " ("), ",
      { text: "&amp;apos;", code: true },
      " ('). Die HTML5-Spezifikation definiert zudem ",
      { text: "&amp;nbsp;", code: true },
      " für ein Leerzeichen ohne Umbruch — die einzige benannte Entity, die nicht einem Syntaxzeichen entspricht, aber ständig im Webinhalt vorkommt.",
    ]},

    { type: "h2", content: ["Die fünf Pflicht-Entities und ihre numerischen Alternativen"] },
    { type: "table", columns: ["Benannte Entity", "Zeichen", "Dezimal", "Hex", "Wann benötigt"], rows: [
      ["&amp;amp;", "&", "&38;", "&#x26;", "Jeder Ampersand in Text oder Attributwerten — muss zuerst escaped werden"],
      ["&amp;lt;", "<", "&#60;", "&#x3C;", "Jedes Kleiner-als-Zeichen außerhalb eines Tags; zeigt Code-Schnipsel, Vergleiche"],
      ["&amp;gt;", ">", "&#62;", "&#x3E;", "Größer-als in Text; zusammen mit &lt; in Codeblöcken erforderlich"],
      ["&amp;quot;", "\"", "&#34;", "&#x22;", "Doppelte Anführungszeichen innerhalb von HTML-Attributwerten"],
      ["&amp;apos;", "'", "&#39;", "&#x27;", "Einfache Anführungszeichen in einfach Anführungszeichen-Attributen; XML-Kompatibilität"],
    ]},
    { type: "note", tone: "warning", title: "Ampersands zuerst escapen — immer", content: [
      "Der Ampersand ist das Tor-Zeichen für alle Entities. Wenn Sie zuerst < escapen und den &amp; unescaped lassen, interpretiert der Browser Ihr neu erstelltes &amp;lt; möglicherweise als wörtlichen Ampersand gefolgt von \"lt;\" statt als Entity &amp;lt;. Kodieren Sie immer zuerst &amp; als &amp;amp;, bevor Sie etwas anderes antasten. Das ist der häufigste Kodierungsfehler im Produktionscode.",
    ]},

    { type: "h2", content: ["Warum das Escaping von Benutzereingaben eine Sicherheitsanforderung ist"] },
    { type: "p", content: [
      "Wenn eine Anwendung Text speichert, den ein Benutzer eingegeben hat, und ihn ohne Kodierung wieder in HTML ausgibt, werden alle eckigen Klammern in diesem Text Teil des DOM. Ein bösartiger Kommentar mit ",
      { text: "<script>alert('XSS')</script>", code: true },
      " wird nicht als Text dargestellt — er wird als JavaScript ausgeführt. Das ist ein Cross-Site-Scripting (XSS)-Angriff, einer der häufigsten Web-Schwachstellen. Das OWASP Top 10 hat XSS in jeder Ausgabe geführt, weil Entwickler immer noch vergessen, Benutzereingaben zu escapen.",
    ]},
    { type: "p", content: [
      "Die Verteidigung ist unkompliziert: Bevor ein benutzergenerierter String in HTML-Ausgabe eingeht, kodieren Sie die fünf Sonderzeichen. Wenn der String ",
      { text: "<script>", code: true },
      " durch ordnungsgemäße Kodierung geht, wird er zu ",
      { text: "&amp;lt;script&amp;gt;", code: true },
      " und der Browser stellt ihn als harmlosen sichtbaren Text dar. Das gleiche Prinzip gilt für Attribute: Wenn der Benutzername ein Anführungszeichen enthält und Sie ihn ohne Kodierung in ein ",
      { text: "title", code: true },
      "-Attribut einfügen, kann der Angreifer das Attribut verlassen und beliebiges HTML injizieren.",
    ]},
    { type: "code", lang: "html", content: `<!-- GEFÄHRLICH: Benutzereingabe uncodiert injiziert -->
<div class="comment">${userComment}</div>

<!-- SICHER: Benutzereingabe vor der Injektion kodiert -->
<div class="comment">${encodeHtml(userComment)}</div>

<!-- GEFÄHRLICH: Name ohne Kodierung in Attribut -->
<img src="photo.jpg" alt="${userName}">

<!-- SICHER: Name innerhalb des Attributs kodiert -->
<img src="photo.jpg" alt="${encodeHtml(userName)}">` },

    { type: "h2", content: ["HTML-Kodierung vs. URL-Kodierung: sie lösen verschiedene Probleme"] },
    { type: "p", content: [
      "Entwickler verwechseln HTML-Kodierung häufig mit URL-Kodierung (auch Prozent-Kodierung genannt). Sie dienen völlig unterschiedlichen Zwecken. HTML-Kodierung schützt Textinhalte innerhalb eines HTML-Dokuments, damit Sonderzeichen dargestellt und nicht geparst werden. URL-Kodierung schützt Zeichen innerhalb eines URL-Pfads, einer Abfragezeichenfolge oder eines Fragments, damit die korrekte HTTP-Anfrage übertragen wird.",
    ]},
    { type: "p", content: [
      "Ein Leerzeichen in HTML wird zu ",
      { text: "&amp;nbsp;", code: true },
      " (oder einfach einem normalen Leerzeichen, wenn kein Zeilenumbruch verhindert werden muss). Dasselbe Leerzeichen in einer URL wird zu ",
      { text: "%20", code: true },
      ". Der Ampersand in HTML wird zu ",
      { text: "&amp;amp;", code: true },
      " — aber in einer URL-Abfragezeichenfolge ist er ein Trennzeichen; wenn ein wörtlicher Ampersand in einem Parameterwert benötigt wird, wird er zu ",
      { text: "%26", code: true },
      ". Die falsche Kodierung im falschen Kontext bringt alles durcheinander: ",
      { text: "&amp;nbsp;", code: true },
      " innerhalb einer URL funktioniert nicht, und ",
      { text: "%20", code: true },
      " innerhalb von HTML erscheint als wörtlicher Text.",
    ]},
    { type: "note", tone: "success", title: "Die Faustregel", content: [
      "Innerhalb von HTML-Text oder Attributen: HTML-Entities verwenden. Innerhalb von URLs, Dateipfaden oder Abfrageparametern: Prozent-Kodierung verwenden. Wenn ein Wert beide durchläuft (z. B. eine Suchanfrage in einem Link-href-Attribut), wenden Sie zuerst URL-Kodierung auf den Abfragewert an und kodieren dann den gesamten href, bevor Sie ihn in das Markup einfügen.",
    ]},

    { type: "h2", content: ["Praxisbeispiele, in denen Kodierung wichtig ist"] },
    { type: "p", content: [
      "HTML-Kodierung ist keine akademische Übung. Jede Anwendung, die benutzergenerierte Inhalte anzeigt oder dynamische Daten rendert, begegnet diesen Situationen täglich:",
    ]},
    { type: "list", items: [
      [
        { text: "Code-Schnipsel in Blogs oder Dokumentation: ", bold: true },
        { text: "Ein Tutorial, das einen Python-Vergleich wie " },
        { text: "if x < 10 and y > 5:", code: true },
        { text: " zeigt, wird das umgebende HTML brechen, wenn die spitzen Klammern nicht escaped sind. Das < startet ein Tag, der Browser geht in den Fehlerwiederherstellungsmodus, und die Ausgabe ist verstümmelt." },
      ],
      [
        { text: "Benutzerkommentare und Forum-Beiträge: ", bold: true },
        { text: "Jede Plattform, die Freitexteingaben akzeptiert — Kommentare, Bewertungen, Chat-Nachrichten — muss die Ausgabe kodieren. Ein Kommentar, der einfach " },
        { text: "a < b", code: true },
        { text: " schreibt, ist nicht böswillig, aber das unescaped < wird trotzdem die Darstellung brechen." },
      ],
      [
        { text: "JSON innerhalb von Script-Tags: ", bold: true },
        { text: "Serverseitig gerendertes JSON, das in einem " },
        { text: "<script>", code: true },
        "-Block eingebettet ist, erfordert sorgfältige Behandlung. Strings, die " },
        { text: "</script>", code: true },
        { text: " enthalten, schließen das Script-Tag vorzeitig. Das sichere Muster: < und > in JSON-String-Werten kodieren oder einen " },
        { text: "type=\"application/json\"", code: true },
        { text: " Datenblock ohne JavaScript-Parsing verwenden." },
      ],
      [
        { text: "Mailto-Links mit Sonderzeichen: ", bold: true },
        { text: "Ein Mailto-Links Betreffzeile mit & muss im HTML-href als " },
        { text: "&amp;amp;", code: true },
        { text: " kodiert werden, während der eigentliche Betreffparameter Prozent-Kodierung für Leerzeichen und Nicht-ASCII-Zeichen verwendet." },
      ],
      [
        { text: "Doppelte Ampersands in Attributen: ", bold: true },
        { text: " " },
        { text: "href=\"search?q=a&&b\"", code: true },
        { text: " direkt in HTML zu schreiben ist problematisch. Der Browser sieht den zweiten & als Beginn einer Entity-Referenz. Beide Ampersands müssen kodiert werden: " },
        { text: "href=\"search?q=a&amp;amp;b\"", code: true },
        { text: "." },
      ],
      [
        { text: "Kleiner-als in Data-Attributen: ", bold: true },
        { text: "Ein Data-Attribut wie " },
        { text: "data-config=\"{min: 0, max: 10}\"", code: true },
        { text: " ist unproblematisch, aber " },
        { text: "data-template=\"<div>content</div>\"", code: true },
        { text: " muss vollständig kodiert werden, denn < und > werden vom HTML-Parser interpretiert, noch bevor JavaScript das Attribut sieht." },
      ],
    ]},

    { type: "h2", content: ["Über- und Unter-Escaping: die beiden Fehlermodi"] },
    { type: "p", content: [
      "Die Kodierung in beide Richtungen falsch zu machen, erzeugt sichtbare Fehler. ",
      { text: "Unter-Escaping", bold: true },
      " bedeutet, dass Sie nicht genug Zeichen kodiert haben. Die Folgen reichen von kaputten Layouts (ein umherirrendes < stiehlt einen Teil der Seite) bis hin zu vollständigen XSS-Schwachstellen. Unter-Escaping ist der gefährlichere Fehler, weil er die Sicherheit betrifft, nicht nur die Darstellung.",
    ]},
    { type: "p", content: [
      { text: "Über-Escaping", bold: true },
      " bedeutet, dass Sie Zeichen kodiert haben, die nicht kodiert werden mussten, oder dieselben Zeichen mehrfach kodiert haben. Ein Benutzername wie ",
      { text: "Tom & Jerry", code: true },
      " erscheint als ",
      { text: "Tom &amp;amp; Jerry", code: true },
      ", wenn der Ampersand doppelt kodiert wird. Das passiert, wenn eine Pipeline dieselbe Zeichenkette an zwei verschiedenen Stellen kodiert — die Anwendung kodiert einmal, dann kodiert ein Template-Engine- oder Content-Sicherheitslayer erneut. Das Ergebnis ist unlesbarer Text und fehlerhafte Darstellung.",
    ]},
    { type: "p", content: [
      "Der Weg, beide Probleme zu vermeiden, ist eine klare Regel: ",
      { text: "Einmal kodieren, am Ausgabepunkt, und niemals davor.", bold: true },
      " Speichern Sie den Rohwert in Ihrer Datenbank. Wenden Sie HTML-Kodierung genau dann an, wenn Sie ihn in HTML-Markup einfügen. Kodieren Sie nicht beim Speichern, nicht beim Weitergeben zwischen Backend-Funktionen und nicht beim Speichern in einer Template-Variable. Kodierung an einem einzigen Punkt verhindert doppelte Kodierung; konsequente Kodierung an der Ausgabe verhindert Unter-Kodierung.",
    ]},
    { type: "code", lang: "js", content: `// FALSCH: Kodierung beim Speichern
db.save({ comment: encodeHtml(userInput) }); // Doppel-Kodierungs-Risiko

// RICHTIG: Kodierung am Ausgabepunkt
const comment = db.getComment(id); // Rohtext
element.innerHTML = encodeHtml(comment); // Hier einmal kodieren` },

    { type: "h2", content: ["Welche Zeichen in welchem Kontext tatsächlich kodiert werden müssen"] },
    { type: "p", content: [
      "Nicht jedes Zeichen muss in jedem Kontext kodiert werden. Das Minimum hängt davon ab, wo der Text erscheint:",
    ]},
    { type: "list", items: [
      [
        { text: "In Elementinhalten (zwischen öffnenden und schließenden Tags): ", bold: true },
        { text: " " },
        { text: "&", code: true },
        { text: " und " },
        { text: "<", code: true },
        { text: " kodieren. " },
        { text: ">", code: true },
        { text: " ist technisch optional, wird aber dringend empfohlen — Browser tolerieren unescaped > in Inhalten, aber es kann in Grenzfällen mit CDATA-Abschnitten und benachbarten Textknoten zu Parsing-Problemen führen." },
      ],
      [
        { text: "In doppelt angeführten Attributen: ", bold: true },
        { text: " " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: " und " },
        { text: "\"", code: true },
        { text: " kodieren. < kommt selten in Attributwerten vor, muss aber bei Vorhandensein escaped werden." },
      ],
      [
        { text: "In einfach angeführten Attributen: ", bold: true },
        { text: "Statt doppelter Anführungszeichen " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: " und " },
        { text: "'", code: true },
        { text: " kodieren." },
      ],
      [
        { text: "In JavaScript-Strings, die in HTML eingefügt werden: ", bold: true },
        { text: "Alle fünf Pflicht-Entities. Wenn eine JS-Variable in innerHTML, Template Literal oder document.write fließt, muss jedes Sonderzeichen kodiert werden." },
      ],
      [
        { text: "Innerhalb von CDATA-Abschnitten (XML/XHTML): ", bold: true },
        { text: "Innerhalb von " },
        { text: "<![CDATA[...]]>", code: true },
        { text: "-Blöcken können Sie die Entity-Kodierung vollständig umgehen — außer der Folge " },
        { text: "]]>", code: true },
        { text: ", die niemals unescaped erscheinen darf. CDATA ist relevant für SVG und MathML in HTML5-Dokumenten." },
      ],
    ]},

    { type: "h2", content: ["Browser-Quirks und Grenzfälle"] },
    { type: "p", content: [
      "Moderne Browser sind nachsichtig bei vielen HTML-Fehlern, aber diese Nachsichtigkeit erzeugt ein falsches Sicherheitsgefühl. Spezifische Grenzfälle, auf die Sie achten sollten:",
    ]},
    { type: "list", items: [
      [
        { text: "Unzitierte Attribute mit Sonderzeichen: ", bold: true },
        { text: " " },
        { text: "class=foo&bar", code: true },
        { text: " ohne Anführungszeichen zu schreiben, wird brechen, weil der Browser " },
        { text: "&", code: true },
        { text: " als Entity-Anfang sieht. Zitieren Sie Attributwerte immer und kodieren Sie den Inhalt dieser Zitate." },
      ],
      [
        { text: "Die Elemente ohne Schließ-Tag: ", bold: true },
        { text: "Elemente wie " },
        { text: "<script>", code: true },
        { text: ", " },
        { text: "<style>", code: true },
        { text: " und " },
        { text: "<textarea>", code: true },
        { text: " verwenden einen speziellen Parsing-Modus. Innerhalb dieser Elemente findet in HTML5 fast keine Entity-Decodierung statt — Sie müssen " },
        { text: "<", code: true },
        { text: " und " },
        { text: "&", code: true },
        { text: " kodieren, um vorzeitiges Tag-Schließen zu verhindern, aber benannte Entities wie " },
        { text: "&amp;nbsp;", code: true },
        { text: " werden als wörtlicher Text behandelt." },
      ],
      [
        { text: "Ungültige Entity-Referenzen: ", bold: true },
        { text: "Der Browser lässt Semikolons bei unbekannten Entities stillschweigend weg. " },
        { text: "&foo;", code: true },
        { text: " gibt in den meisten Browsern den wörtlichen Text " },
        { text: "&foo;", code: true },
        { text: " aus, aber " },
        { text: "&foo", code: true },
        { text: " (ohne Semikolon) kann das nächste Zeichen verschlingen — ein Bug, der extrem schwer zu verfolgen ist." },
      ],
      [
        { text: "Numerische Zeichenreferenzen und Steuerzeichen: ", bold: true },
        { text: "Die Verwendung numerischer Entities für Steuerzeichen wie " },
        { text: "&#x0;", code: true },
        { text: " (Null) ist in HTML5 verboten. Der Parser ersetzt sie stillschweigend durch U+FFFD (Ersetzungszeichen) oder lässt sie vollständig weg." },
      ],
    ]},
    { type: "note", tone: "warning", title: "Die Semikolon-Falle", content: [
      "Eine Entity-Referenz ohne abschließendes Semikolon ist mehrdeutig. &amp;lt ohne Semikolon wird als Entity &amp;lt gefolgt vom nächsten Zeichen geparst. Ein Benutzer, der &amp;cat tippt, erzeugt versehentlich die Entity &amp;ca gefolgt von einem losen t. Stellen Sie sicher, dass Ihre Kodierungsfunktion für jede erzeugte Entity das Semikolon enthält.",
    ]},

    { type: "h2", content: ["Kodierungsstrategien in der Praxis"] },
    { type: "p", content: [
      "Die meisten Web-Frameworks enthalten eingebaute Kodierungsfunktionen. Reacts JSX kodiert automatisch Ausdruckswerte innerhalb von Elementinhalten (aber ",
      { text: "dangerouslySetInnerHTML", code: true },
      " umgeht dies vollständig — verwenden Sie es nur mit vertrauenswürdigen, vorsanitisierten Inhalten). Serverseitige Template-Engines wie Jinja2, Handlebars und Blade bieten Escape-Filter. Der Kernpunkt: Wissen Sie, wo Ihr Framework automatisch kodiert und wo nicht.",
    ]},
    { type: "p", content: [
      "Für die fünf Pflicht-Entities ist eine minimale Kodierungsfunktion unkompliziert. Die Funktion ersetzt jedes Sonderzeichen durch seine benannte Entity, Ampersands zuerst:",
    ]},
    { type: "code", lang: "js", content: `function encodeHtml(str) {
  return str
    .replace(/&/g, "&amp;")   // muss zuerst kommen
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Verwendung:
const safe = encodeHtml('He said "a < b & c > d"');
// → He said &quot;a &lt; b &amp; c &gt; d&quot;` },
    { type: "note", tone: "success", title: "Bevorzugen Sie die Standardbibliothek", content: [
      "Die manuelle Funktion oben dient zum Verstehen, nicht für den Produktivbetrieb. Verwenden Sie in Node.js die eingebaute Text-Encoding-API oder eine gut getestete Bibliothek. Im Browser erledigt die textContent-Zuweisung die meisten Fälle automatisch. Die DOMParser-API ist der sicherste Weg für Benutzer-HTML, wenn Sie einige Tags erlauben, aber andere blockieren wollen — sie parsed ohne Ausführung von Skripten.",
    ]},

    { type: "h2", content: ["HTML-Kodierungswerkzeuge auf Convrs"] },
    { type: "p", content: [
      "Wenn Sie HTML-Entities schnell kodieren oder decodieren müssen — ob Sie ein Darstellungsproblem debuggen, Inhalte für ein CMS aufbereiten oder testen, wie kodierter Text aussieht — ",
      { text: "das HTML Encode/Decode-Werkzeug auf Convrs", bold: true },
      " handhabt beide Richtungen im Browser. Fügen Sie Ihren Text ein, wählen Kodieren oder Decodieren und erhalten sofort das Ergebnis. Kein Datei-Upload, keine Serverrundreise, keine Daten, die Ihr Gerät verlassen. Es umfasst alle fünf Pflicht-Entities plus numerische Referenzen, sodass Sie überprüfen können, dass Ihre Ausgabekodierung mit dem übereinstimmt, was der Browser erwartet.",
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Codificación y decodificación de entidades HTML: guía completa para desarrolladores",
    eyebrow: "Desarrollo web",
    description:
      "Las entidades HTML convierten caracteres especiales en markup seguro. Aprende qué hacen &amp;, &lt;, &gt;, &quot; y las referencias numéricas, por qué escapar la entrada del usuario es obligatorio por seguridad y dónde la codificación HTML difiere de la codificación URL.",
    excerpt:
      "Un recorrido práctico por las entidades HTML: códigos nombrados vs. numéricos, los cinco escapes obligatorios, prevención de XSS y la diferencia entre %20 y &nbsp;.",
    readingTime: "11 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: [
      "Un usuario pega un fragmento de código en un cuadro de comentarios y de repente todo el diseño de la página se rompe. La causa no es exótica: es un solo carácter ",
      { text: "<", bold: true },
      " sin escapar que se interpreta como el inicio de una etiqueta HTML. El navegador deja de renderizar el texto del comentario y empieza a buscar nombres de elementos, atributos y corchetes de cierre. La solución es igual de simple: reemplaza ese carácter por su entidad HTML y la página se muestra correctamente. Esta guía explica qué son las entidades HTML, por qué todo desarrollador que maneja contenido generado por el usuario las necesita y cómo evitar los errores comunes que causan problemas reales en producción.",
    ]},

    { type: "h2", content: ["Qué son realmente las entidades HTML"] },
    { type: "p", content: [
      "HTML reserva un pequeño conjunto de caracteres para su propia sintaxis: los corchetes angulares definen etiquetas, los ampersands introducen entidades y las comillas envuelven valores de atributos. Cuando necesitas mostrar uno de estos caracteres como texto literal —no como markup— lo reemplazas por una referencia de entidad. Una referencia de entidad es un nombre corto entre ampersand y punto y coma (",
      { text: "&amp;lt;", code: true },
      ") o un código numérico (",
      { text: "&#60;", code: true },
      " o ",
      { text: "&#x3C;", code: true },
      "). El navegador interpreta la entidad durante el parseo y muestra el carácter correspondiente sin tratarlo como HTML estructural.",
    ]},
    { type: "p", content: [
      "Hay dos familias de entidades. ",
      { text: "Entidades nombradas", bold: true },
      " usan nombres legibles para humanos — ",
      { text: "&amp;amp;", code: true },
      " para ampersand, ",
      { text: "&amp;lt;", code: true },
      " para menor que, ",
      { text: "&amp;gt;", code: true },
      " para mayor que. ",
      { text: "Entidades numéricas (decimales)", bold: true },
      " usan el punto de código Unicode del carácter: ",
      { text: "&#60;", code: true },
      " para menor que, ",
      { text: "&#x3C;", code: true },
      " en hexadecimal. Ambos enfoques producen el mismo resultado en el navegador; las entidades nombradas son más fáciles de leer para los humanos, las entidades numéricas cubren cada carácter Unicode.",
    ]},
    { type: "p", content: [
      "Las cinco entidades que todo desarrollador web debe memorizar son: ",
      { text: "&amp;amp;", code: true },
      " (&), ",
      { text: "&amp;lt;", code: true },
      " (<), ",
      { text: "&amp;gt;", code: true },
      " (>), ",
      { text: "&amp;quot;", code: true },
      " ("), ",
      { text: "&amp;apos;", code: true },
      " ('). La especificación HTML5 también define ",
      { text: "&amp;nbsp;", code: true },
      " para un espacio sin salto —la única entidad nombrada que no corresponde a un carácter de sintaxis pero que aparece constantemente en contenido web.",
    ]},

    { type: "h2", content: ["Las cinco entidades obligatorias y sus alternativas numéricas"] },
    { type: "table", columns: ["Entidad nombrada", "Carácter", "Decimal", "Hex", "Cuándo se necesita"], rows: [
      ["&amp;amp;", "&", "&38;", "&#x26;", "Cada ampersand en texto o valores de atributos — se debe escapar primero"],
      ["&amp;lt;", "<", "&#60;", "&#x3C;", "Cada signo menor que fuera de una etiqueta; muestra fragmentos de código, comparaciones"],
      ["&amp;gt;", ">", "&#62;", "&#x3E;", "Mayor que en texto; requerido junto con &lt; en bloques de código"],
      ["&amp;quot;", "\"", "&#34;", "&#x22;", "Comillas dobles dentro de valores de atributos HTML"],
      ["&amp;apos;", "'", "&#39;", "&#x27;", "Comillas simples dentro de atributos con comillas simples; compatibilidad XML"],
    ]},
    { type: "note", tone: "warning", title: "Escapa los ampersands primero — siempre", content: [
      "El ampersand es el carácter puerta para todas las entidades. Si escapas < primero y dejas el &amp; sin escapar, el navegador puede interpretar tu &amp;lt; recién creado como un ampersand literal seguido de \"lt;\" en lugar de la entidad &amp;lt;. Siempre codifica &amp; como &amp;amp; antes de tocar cualquier otra cosa. Este es el error de codificación más común en código de producción.",
    ]},

    { type: "h2", content: ["Por qué escapar la entrada del usuario es un requisito de seguridad"] },
    { type: "p", content: [
      "Cuando una aplicación almacena texto que un usuario escribió y lo renderiza de vuelta en HTML sin codificar, cualquier corchete angular en ese texto se convierte en parte del DOM. Un comentario malicioso que contiene ",
      { text: "<script>alert('XSS')</script>", code: true },
      " no se muestra como texto — se ejecuta como JavaScript. Esto es un ataque de cross-site scripting (XSS), una de las vulnerabilidades web más comunes. El OWASP Top 10 ha incluido XSS en cada edición porque los desarrolladores siguen olvidando codificar la entrada del usuario.",
    ]},
    { type: "p", content: [
      "La defensa es sencilla: antes de que cualquier cadena generada por el usuario entre en salida HTML, codifica los cinco caracteres especiales. Cuando la cadena ",
      { text: "<script>", code: true },
      " pasa por una codificación correcta, se convierte en ",
      { text: "&amp;lt;script&amp;gt;", code: true },
      " y el navegador la muestra como texto visible inofensivo. El mismo principio se aplica a los atributos: si el nombre del usuario contiene comillas dobles y las insertas en un atributo ",
      { text: "title", code: true },
      " sin codificar, el atacante puede salir del atributo e inyectar HTML arbitrario.",
    ]},
    { type: "code", lang: "html", content: `<!-- PELIGROSO: entrada del usuario inyectada sin codificar -->
<div class="comment">${userComment}</div>

<!-- SEGURO: entrada del usuario codificada antes de la inyección -->
<div class="comment">${encodeHtml(userComment)}</div>

<!-- PELIGROSO: nombre inyectado en atributo sin codificar -->
<img src="photo.jpg" alt="${userName}">

<!-- SEGURO: nombre codificado dentro del atributo -->
<img src="photo.jpg" alt="${encodeHtml(userName)}">` },

    { type: "h2", content: ["Codificación HTML vs codificación URL: resuelven problemas diferentes"] },
    { type: "p", content: [
      "Los desarrolladores frecuentemente confunden la codificación HTML con la codificación URL (también llamada codificación porcentual). Sirven propósitos completamente diferentes. La codificación HTML protege el contenido de texto dentro de un documento HTML para que los caracteres especiales se muestren, no se parseen. La codificación URL protege caracteres dentro de una ruta URL, cadena de consulta o fragmento para que la solicitud HTTP se transmita correctamente.",
    ]},
    { type: "p", content: [
      "Un espacio en HTML se convierte en ",
      { text: "&amp;nbsp;", code: true },
      " (o simplemente un espacio normal si no necesitas prevenir saltos de línea). El mismo espacio en una URL se convierte en ",
      { text: "%20", code: true },
      ". El ampersand en HTML se convierte en ",
      { text: "&amp;amp;", code: true },
      " — pero en una cadena de consulta de URL es un separador, así que si necesitas un ampersand literal en un valor de parámetro se convierte en ",
      { text: "%26", code: true },
      ". Usar la codificación equivocada en el contexto equivocado rompe las cosas: ",
      { text: "&amp;nbsp;", code: true },
      " dentro de una URL no funcionará, y ",
      { text: "%20", code: true },
      " dentro de HTML aparecerá como texto literal.",
    ]},
    { type: "note", tone: "success", title: "La regla práctica", content: [
      "Dentro de texto HTML o atributos: usa entidades HTML. Dentro de URLs, rutas de archivo o parámetros de consulta: usa codificación porcentual. Cuando un valor pasa por ambos (por ejemplo, una consulta de búsqueda en el atributo href de un enlace), aplica primero la codificación URL al valor de la consulta y luego codifica HTML el href completo antes de insertarlo en el markup.",
    ]},

    { type: "h2", content: ["Escenarios del mundo real donde la codificación importa"] },
    { type: "p", content: [
      "La codificación HTML no es un ejercicio académico. Toda aplicación que muestra contenido generado por el usuario o renderiza datos dinámicos enfrenta estas situaciones a diario:",
    ]},
    { type: "list", items: [
      [
        { text: "Fragmentos de código en blogs o documentación: ", bold: true },
        { text: "Un tutorial que muestra una comparación de Python como " },
        { text: "if x < 10 and y > 5:", code: true },
        { text: " romperá el HTML circundante si los corchetes angulares no están codificados. El < inicia una etiqueta, el navegador entra en modo de recuperación de errores y la salida visible sale mutilada." },
      ],
      [
        { text: "Comentarios de usuario y publicaciones en foros: ", bold: true },
        { text: "Toda plataforma que acepta entrada de texto libre —comentarios, reseñas, mensajes de chat— debe codificar la salida. Un comentario que simplemente escribe " },
        { text: "a < b", code: true },
        { text: " no es malicioso, pero el < sin escapar de todos modos romperá la visualización." },
      ],
      [
        { text: "JSON dentro de etiquetas script: ", bold: true },
        { text: "JSON renderizado por el servidor y embebido en un bloque " },
        { text: "<script>", code: true },
        { text: " requiere manejo cuidadoso. Cadenas que contienen " },
        { text: "</script>", code: true },
        { text: " cerrarán la etiqueta script prematuramente. El patrón seguro es codificar < y > dentro de los valores de cadena JSON, o usar un bloque de datos " },
        { text: "type=\"application/json\"", code: true },
        { text: " sin parseo JavaScript." },
      ],
      [
        { text: "Enlaces mailto con caracteres especiales: ", bold: true },
        { text: "La línea de asunto de un enlace mailto con & debe codificarse como " },
        { text: "&amp;amp;", code: true },
        { text: " dentro del href HTML, mientras que el parámetro de asunto real usa codificación porcentual para espacios y caracteres no ASCII." },
      ],
      [
        { text: "Ampersands dobles en atributos: ", bold: true },
        { text: "Escribir " },
        { text: "href=\"search?q=a&&b\"", code: true },
        { text: " directamente en HTML es problemático. El navegador ve el segundo & como el inicio de una referencia de entidad. Ambos ampersands deben codificarse: " },
        { text: "href=\"search?q=a&amp;amp;b\"", code: true },
        { text: "." },
      ],
      [
        { text: "Menor que en atributos data: ", bold: true },
        { text: "Un atributo data como " },
        { text: "data-config=\"{min: 0, max: 10}\"", code: true },
        { text: " no tiene problemas, pero " },
        { text: "data-template=\"<div>content</div>\"", code: true },
        { text: " debe codificarse completamente porque < y > serán interpretados por el parser HTML antes de que JavaScript vea el atributo." },
      ],
    ]},

    { type: "h2", content: ["Sobre-escapar y sub-escapar: los dos modos de fallo"] },
    { type: "p", content: [
      "Obtener la codificación mal en cualquiera de las dos direcciones crea errores visibles. ",
      { text: "Sub-escapar", bold: true },
      " significa que no codificaste suficientes caracteres. Las consecuencias van desde diseños rotos (un < desbocado roba parte de la página) hasta vulnerabilidades XSS completas. Sub-escapar es la forma de fallo más peligrosa porque afecta la seguridad, no solo la visualización.",
    ]},
    { type: "p", content: [
      { text: "Sobre-escapar", bold: true },
      " significa que codificaste caracteres que no necesitaban codificación, o codificaste los mismos caracteres múltiples veces. Un nombre de usuario como ",
      { text: "Tom & Jerry", code: true },
      " aparece como ",
      { text: "Tom &amp;amp; Jerry", code: true },
      " si el ampersand se codifica dos veces. Esto ocurre cuando una pipeline codifica la misma cadena en dos etapas diferentes — la aplicación codifica una vez, luego un motor de plantillas o capa de seguridad de contenido codifica de nuevo. El resultado es texto ilegible y visualización rota.",
    ]},
    { type: "p", content: [
      "La forma de evitar ambos problemas es una regla clara: ",
      { text: "codifica una vez, en el punto de salida, y nunca antes.", bold: true },
      " Almacena el valor crudo en tu base de datos. Aplica la codificación HTML en el momento exacto en que lo insertas en markup HTML. No codifiques al guardar, no codifiques al pasar entre funciones del backend, y no codifiques al almacenar en una variable de plantilla. La codificación en un solo punto previene la doble codificación; la codificación consistente en la salida previene la sub-codificación.",
    ]},
    { type: "code", lang: "js", content: `// MAL: codificar en el momento del almacenamiento
db.save({ comment: encodeHtml(userInput) }); // riesgo de doble codificación

// BIEN: codificar en el punto de salida
const comment = db.getComment(id); // texto crudo
element.innerHTML = encodeHtml(comment); // codificar una vez aquí` },

    { type: "h2", content: ["Qué caracteres realmente necesitan codificación en cada contexto"] },
    { type: "p", content: [
      "No todos los caracteres necesitan codificación en todas las situaciones. El conjunto mínimo depende de dónde aparezca el texto:",
    ]},
    { type: "list", items: [
      [
        { text: "En contenido de elementos (entre etiquetas de apertura y cierre): ", bold: true },
        { text: "Codifica " },
        { text: "&", code: true },
        { text: " y " },
        { text: "<", code: true },
        { text: ". El " },
        { text: ">", code: true },
        { text: " es técnicamente opcional pero fuertemente recomendado: los navegadores toleran > sin escapar en contenido, pero puede causar problemas de parseo en casos límite con secciones CDATA y nodos de texto adyacentes." },
      ],
      [
        { text: "En atributos entre comillas dobles: ", bold: true },
        { text: "Codifica " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: " y " },
        { text: "\"", code: true },
        { text: ". El < rara vez aparece en valores de atributo pero debe escaparse cuando está presente." },
      ],
      [
        { text: "En atributos entre comillas simples: ", bold: true },
        { text: "Codifica " },
        { text: "&", code: true },
        { text: ", " },
        { text: "<", code: true },
        { text: " y " },
        { text: "'", code: true },
        { text: " en lugar de comillas dobles." },
      ],
      [
        { text: "En cadenas JavaScript insertadas en HTML: ", bold: true },
        { text: "Las cinco entidades obligatorias. Cuando una variable JS fluye hacia innerHTML, template literal o document.write, cada carácter especial debe codificarse." },
      ],
      [
        { text: "Dentro de secciones CDATA (XML/XHTML): ", bold: true },
        { text: "Puedes omitir la codificación de entidades completamente dentro de bloques " },
        { text: "<![CDATA[...]]>", code: true },
        { text: " — excepto la secuencia " },
        { text: "]]>", code: true },
        { text: " que nunca debe aparecer sin escapar. CDATA es relevante para SVG y MathML embebidos en documentos HTML5." },
      ],
    ]},

    { type: "h2", content: ["Quirks del navegador y casos límite"] },
    { type: "p", content: [
      "Los navegadores modernos son permisivos con muchos errores de HTML, pero esa permisividad crea una falsa sensación de seguridad. Casos límite específicos a los que debes prestar atención:",
    ]},
    { type: "list", items: [
      [
        { text: "Atributos sin comillas con caracteres especiales: ", bold: true },
        { text: "Escribir " },
        { text: "class=foo&bar", code: true },
        { text: " sin comillas romperá porque el navegador ve " },
        { text: "&", code: true },
        { text: " como el inicio de una entidad. Siempre comilla los valores de atributo y codifica el contenido de esas comillas." },
      ],
      [
        { text: "Los elementos sin etiqueta de cierre: ", bold: true },
        { text: "Elementos como " },
        { text: "<script>", code: true },
        { text: ", " },
        { text: "<style>", code: true },
        { text: " y " },
        { text: "<textarea>", code: true },
        { text: " usan un modo de parseo especial. Dentro de estos elementos, casi no ocurre decodificación de entidades en HTML5 — debes codificar " },
        { text: "<", code: true },
        { text: " y " },
        { text: "&", code: true },
        { text: " para prevenir el cierre prematuro de etiquetas, pero entidades nombradas como " },
        { text: "&amp;nbsp;", code: true },
        { text: " se tratan como texto literal." },
      ],
      [
        { text: "Referencias de entidad inválidas: ", bold: true },
        { text: "El navegador descarta silenciosamente los puntos y coma de entidades no reconocidas. Escribir " },
        { text: "&foo;", code: true },
        { text: " produce el texto literal " },
        { text: "&foo;", code: true },
        { text: " en la mayoría de navegadores, pero " },
        { text: "&foo", code: true },
        { text: " (sin punto y coma) puede tragar el siguiente carácter — un bug extremadamente difícil de rastrear." },
      ],
      [
        { text: "Referencias numéricas de caracteres y caracteres de control: ", bold: true },
        { text: "Usar entidades numéricas para caracteres de control como " },
        { text: "&#x0;", code: true },
        { text: " (nulo) está prohibido en HTML5. El parser los reemplaza silenciosamente por U+FFFD (carácter de reemplazo) o los descarta completamente." },
      ],
    ]},
    { type: "note", tone: "warning", title: "La trampa del punto y coma", content: [
      "Una referencia de entidad sin punto y coma final es ambigua. &amp;lt sin punto y coma se parsea como la entidad &amp;lt seguida del siguiente carácter que venga. Un usuario que escribe &amp;cat accidentalmente crea la entidad &amp;ca seguida de una t suelta. Asegúrate de que tu función de codificación incluya el punto y coma para cada entidad que produce.",
    ]},

    { type: "h2", content: ["Estrategias de codificación en la práctica"] },
    { type: "p", content: [
      "La mayoría de frameworks web incluyen funciones de codificación integradas. El JSX de React codifica automáticamente los valores de expresiones dentro de contenido de elementos (pero ",
      { text: "dangerouslySetInnerHTML", code: true },
      " omite esto completamente — úsalo solo con contenido pre-sanitizado y confiable). Los motores de plantillas del lado del servidor como Jinja2, Handlebars y Blade proporcionan filtros de escape. El punto clave: saber dónde tu framework codifica automáticamente y dónde no.",
    ]},
    { type: "p", content: [
      "Para las cinco entidades obligatorias, una función de codificación mínima es sencilla. La función reemplaza cada carácter especial con su entidad nombrada, ampersands primero:",
    ]},
    { type: "code", lang: "js", content: `function encodeHtml(str) {
  return str
    .replace(/&/g, "&amp;")   // debe ir primero
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Uso:
const safe = encodeHtml('He said "a < b & c > d"');
// → He said &quot;a &lt; b &amp; c &gt; d&quot;` },
    { type: "note", tone: "success", title: "Prefiere la biblioteca estándar", content: [
      "La función manual de arriba es para comprender, no para producción. En Node.js usa la API de codificación de texto integrada o una biblioteca bien testeada. En el navegador, la asignación a textContent maneja la mayoría de los casos automáticamente. La API DOMParser es la ruta más segura para HTML proporcionado por el usuario cuando necesitas permitir algunas etiquetas pero bloquear otras — parsea sin ejecutar scripts.",
    ]},

    { type: "h2", content: ["Herramientas de codificación HTML en Convrs"] },
    { type: "p", content: [
      "Cuando necesitas codificar o decodificar entidades HTML rápidamente —ya sea para depurar un problema de visualización, preparar contenido para un CMS o probar cómo se verá el texto codificado— ",
      { text: "la herramienta HTML Encode/Decode de Convrs", bold: true },
      " maneja ambas direcciones en el navegador. Pega tu texto, elige codificar o decodificar y obtén el resultado al instante. Sin subida de archivos, sin ida y vuelta al servidor, sin datos que salgan de tu dispositivo. Cubre las cinco entidades obligatorias más referencias numéricas, para que puedas verificar que tu codificación de salida coincide con lo que el navegador espera.",
    ]},
  ],
};

const htmlEncodingGuide: GuideDefinition = {
  slug: "html-encoding-guide",
  content: { en, tr, de, es },
};

export default htmlEncodingGuide;
