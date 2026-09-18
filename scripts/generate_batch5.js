const fs = require('fs');
const path = require('path');

const locales = ['en', 'tr', 'de', 'es'];

const articles = [
  {
    id: 21,
    slug: 'benefits-of-using-rem-and-em',
    date: '2026-09-29',
    titles: {
      en: 'The Benefits of Using REM and EM in Responsive Web Design',
      tr: 'Duyarlı Web Tasarımında REM ve EM Kullanmanın Faydaları',
      de: 'Die Vorteile der Verwendung von REM und EM im responsiven Webdesign',
      es: 'Los beneficios de usar REM y EM en el diseño web responsivo'
    },
    descriptions: {
      en: 'Why you should stop using pixels for font sizes and spacing, and switch to relative units like REM and EM for better accessibility and responsiveness.',
      tr: 'Yazı tipi boyutları ve boşluklar için piksel kullanmayı neden bırakmalı ve daha iyi erişilebilirlik ve duyarlılık için REM ve EM gibi göreceli birimlere geçmelisiniz.',
      de: 'Warum Sie aufhören sollten, Pixel für Schriftgrößen und Abstände zu verwenden, und auf relative Einheiten wie REM und EM umsteigen sollten.',
      es: 'Por qué debería dejar de usar píxeles para los tamaños de fuente y el espaciado, y cambiar a unidades relativas como REM y EM.'
    },
    sections: {
      en: [
        "## The Problem with Pixels\n\nFor a long time, web developers relied on pixels (px) to set typography and layout dimensions. While pixels offer precise control, they have a major flaw: they are absolute units. If a user has vision impairments and changes their browser's default font size from 16px to 24px, a website with fonts hardcoded to 14px will remain at 14px, making it unreadable for them.",
        "## What is REM?\n\nREM stands for 'Root EM'. It is a relative unit that is based on the font size of the root element (the `<html>` tag). By default, most browsers set the root font size to 16px. So, `1rem` equals 16px. If you set a paragraph's font size to `1.5rem`, it evaluates to 24px. The beauty of REM is that if the user changes their default browser font size, your entire website scales proportionally.",
        "## What is EM?\n\nEM is also a relative unit, but instead of being relative to the root element, it is relative to the font size of its direct parent element. If a `<div>` has a font size of 20px, an element inside it with `1.5em` will be 30px. EM is extremely useful for modular components, such as buttons, where you want the padding and margins to scale relative to the button's font size.",
        "## When to Use Which\n\nA common best practice is to use REM for global typography (headings, paragraphs) and layout spacing (margins between major sections). Use EM for localized, component-level sizing where elements need to scale proportionally to their immediate context. Avoid using pixels for anything other than small borders or fixed-size shadows.",
        "## Converting px to rem\n\nCalculating REM values in your head can be tedious (e.g., 21px / 16px = 1.3125rem). To save time, you can use our free PX to REM Converter to instantly translate pixel values into their relative unit equivalents."
      ],
      tr: [
        "## Piksellerle İlgili Sorun\n\nUzun zamandır web geliştiricileri boyutlandırma için piksel (px) kullandı. Pikseller kesin kontrol sunsa da büyük bir kusurları vardır: mutlak birimlerdir. Görme engelli bir kullanıcı tarayıcı varsayılan boyutunu büyütse bile, 14px olarak sabitlenmiş metinler 14px kalır ve okunamayabilir.",
        "## REM Nedir?\n\nREM, 'Root EM' anlamına gelir. Kök elemanın (`<html>` etiketi) yazı tipi boyutuna dayanan göreceli bir birimdir. Tarayıcıların varsayılan kök boyutu genelde 16px'tir. Yani `1rem` 16px'e eşittir. Kullanıcı tarayıcı boyutunu değiştirirse tüm siteniz orantılı olarak ölçeklenir.",
        "## EM Nedir?\n\nEM de göreceli bir birimdir ancak kök elemana değil, doğrudan ebeveyn elemanının yazı tipi boyutuna bağlıdır. EM, padding ve margin'lerin butonun yazı tipine göre ölçeklenmesini istediğiniz butonlar gibi modüler bileşenler için harikadır.",
        "## Hangisi Ne Zaman Kullanılmalı?\n\nKüresel tipografi ve düzen boşlukları için REM kullanmak en iyi uygulamadır. Öğelerin doğrudan bağlamlarına göre orantılı ölçeklenmesi gereken bileşen düzeyindeki boyutlandırmalar için EM kullanın.",
        "## px'i rem'e Dönüştürmek\n\nKafadan hesaplamak sıkıcı olabilir. Zaman kazanmak için piksel değerlerini saniyeler içinde göreceli birim karşılıklarına çeviren ücretsiz PX - REM Dönüştürücü aracımızı kullanabilirsiniz."
      ],
      de: [
        "## Das Problem mit Pixeln\n\nLange Zeit verwendeten Entwickler Pixel (px) für das Layout. Pixel sind jedoch absolute Einheiten. Wenn ein Benutzer die Standard-Schriftgröße seines Browsers ändert, ändert sich hartcodierter 14px-Text nicht.",
        "## Was ist REM?\n\nREM steht für 'Root EM'. Es ist eine relative Einheit, die auf der Schriftgröße des Stammelements (`<html>`) basiert. Wenn der Benutzer die Standard-Schriftgröße ändert, skaliert Ihre gesamte Website proportional.",
        "## Was ist EM?\n\nEM bezieht sich auf die Schriftgröße des direkten übergeordneten Elements. EM ist sehr nützlich für modulare Komponenten wie Schaltflächen.",
        "## Wann welches verwendet wird\n\nVerwenden Sie REM für globale Typografie und Abstände. Verwenden Sie EM für die lokale Größenänderung auf Komponentenebene. Vermeiden Sie Pixel.",
        "## Konvertieren von px in rem\n\nDie Berechnung im Kopf kann mühsam sein. Verwenden Sie unseren kostenlosen PX-zu-REM-Konverter, um Pixelwerte sofort umzuwandeln."
      ],
      es: [
        "## El problema con los píxeles\n\nDurante mucho tiempo, los desarrolladores usaron píxeles (px). Sin embargo, son unidades absolutas. Si un usuario cambia el tamaño de fuente predeterminado de su navegador, el texto de 14px no cambiará.",
        "## ¿Qué es REM?\n\nREM significa 'Root EM'. Es una unidad relativa basada en el tamaño de fuente del elemento raíz (`<html>`). Si el usuario cambia el tamaño de fuente predeterminado, todo su sitio web se escala proporcionalmente.",
        "## ¿Qué es EM?\n\nEM es relativo al tamaño de fuente de su elemento padre directo. EM es muy útil para componentes modulares como botones.",
        "## Cuándo usar cuál\n\nUse REM para tipografía global y espaciado. Use EM para el tamaño localizado a nivel de componente. Evite usar píxeles.",
        "## Convertir px a rem\n\nCalcular mentalmente puede ser tedioso. Use nuestro convertidor gratuito de PX a REM para traducir instantáneamente los valores."
      ]
    }
  },
  {
    id: 22,
    slug: 'what-are-meta-tags-in-html',
    date: '2026-09-30',
    titles: {
      en: 'What Are Meta Tags and Why Are They Essential for SEO?',
      tr: 'Meta Etiketler Nedir ve SEO İçin Neden Önemlidir?',
      de: 'Was sind Meta-Tags und warum sind sie für SEO wichtig?',
      es: '¿Qué son las metaetiquetas y por qué son esenciales para el SEO?'
    },
    descriptions: {
      en: 'An in-depth explanation of HTML meta tags, Open Graph tags, and how they control your website\'s visibility on search engines and social media.',
      tr: 'HTML meta etiketleri, Open Graph etiketleri ve web sitenizin arama motorları ile sosyal medyadaki görünürlüğünü nasıl kontrol ettikleri hakkında derinlemesine bir açıklama.',
      de: 'Eine ausführliche Erklärung von HTML-Meta-Tags, Open-Graph-Tags und wie sie die Sichtbarkeit Ihrer Website kontrollieren.',
      es: 'Una explicación detallada de las metaetiquetas HTML, las etiquetas Open Graph y cómo controlan la visibilidad de su sitio web.'
    },
    sections: {
      en: [
        "## The Silent Communicators\n\nMeta tags are snippets of text that describe a page's content. However, they don't appear on the page itself; they only exist in the page's HTML `<head>` section. They are the silent communicators that tell search engines, browsers, and social media platforms what your website is about.",
        "## Crucial Meta Tags for SEO\n\nThere are a few meta tags you absolutely must include. The `title` tag (though technically not a meta tag, it functions similarly) is the clickable headline in search results. The `meta description` provides a brief summary of the page underneath the title. A compelling meta description increases your Click-Through Rate (CTR). The `viewport` meta tag is also mandatory for responsive design on mobile devices.",
        "## Open Graph and Twitter Cards\n\nHave you ever shared a link on Facebook, WhatsApp, or X (formerly Twitter) and seen a beautiful preview card with an image and a title? That is powered by Open Graph (OG) tags and Twitter Cards. These specific meta tags tell social platforms exactly which image, title, and description to use when your link is shared.",
        "## Meta Tags to Avoid\n\nNot all meta tags are useful anymore. The `meta keywords` tag, for example, was heavily spammed in the early days of the internet. Google officially stated in 2009 that they do not use the keywords meta tag in web ranking. Including it today is a waste of bytes and only reveals your keyword strategy to competitors.",
        "## Generating Tags Easily\n\nWriting all these tags from scratch for every page is prone to typos. You can use our Meta Tag Generator to fill in a simple form and automatically generate the perfect, valid HTML code for your SEO, Open Graph, and Twitter tags, ready to be pasted into your project."
      ],
      tr: [
        "## Sessiz İletişimciler\n\nMeta etiketler, bir sayfanın içeriğini açıklayan metin parçacıklarıdır. Sayfanın kendisinde görünmezler; yalnızca HTML'nin `<head>` bölümünde bulunurlar. Arama motorlarına, tarayıcılara ve sosyal medya platformlarına sitenizin ne hakkında olduğunu söylerler.",
        "## SEO İçin Kritik Meta Etiketler\n\nMutlaka eklemeniz gereken birkaç etiket vardır. `title` etiketi arama sonuçlarındaki tıklanabilir başlıktır. `meta description`, başlığın altında sayfanın kısa bir özetini sunar. Etkili bir açıklama, Tıklama Oranınızı (CTR) artırır.",
        "## Open Graph ve Twitter Kartları\n\nFacebook veya WhatsApp'ta bir bağlantı paylaştığınızda resim ve başlık içeren o güzel önizleme kartını hiç gördünüz mü? Bunu sağlayan Open Graph (OG) ve Twitter Card etiketleridir.",
        "## Kaçınılması Gereken Meta Etiketler\n\n`meta keywords` etiketi artık işe yaramaz. Google, bu etiketi sıralamada kullanmadığını yıllar önce açıkladı. Bugün bunu kullanmak sadece rakiplerinize stratejinizi ifşa etmektir.",
        "## Kolayca Etiket Üretmek\n\nBu etiketleri her sayfa için sıfırdan yazmak hataya açıktır. Basit bir formu doldurarak projenize yapıştırmaya hazır geçerli HTML kodunu otomatik olarak oluşturmak için Meta Etiket Üretici aracımızı kullanabilirsiniz."
      ],
      de: [
        "## Die stillen Kommunikatoren\n\nMeta-Tags sind Textausschnitte, die den Inhalt einer Seite beschreiben. Sie erscheinen nicht auf der Seite selbst, sondern nur im `<head>`-Bereich des HTML. Sie kommunizieren mit Suchmaschinen und Browsern.",
        "## Wichtige Meta-Tags für SEO\n\nDas `title`-Tag ist die anklickbare Überschrift in den Suchergebnissen. Die `meta description` bietet eine kurze Zusammenfassung. Eine gute Beschreibung erhöht die Klickrate (CTR).",
        "## Open Graph und Twitter Cards\n\nWenn Sie einen Link auf Social Media teilen, wird eine Vorschaukarte mit Bild generiert. Dies wird durch Open Graph (OG) und Twitter Cards gesteuert.",
        "## Zu vermeidende Meta-Tags\n\nDas `meta keywords`-Tag ist nutzlos geworden. Google verwendet es nicht mehr für das Ranking.",
        "## Tags einfach generieren\n\nVerwenden Sie unseren Meta-Tag-Generator, um ein einfaches Formular auszufüllen und automatisch den perfekten, gültigen HTML-Code für Ihre SEO-Tags zu generieren."
      ],
      es: [
        "## Los comunicadores silenciosos\n\nLas metaetiquetas son fragmentos de texto que describen el contenido de una página. No aparecen en la página en sí; solo existen en la sección `<head>`. Comunican de qué trata su sitio a los motores de búsqueda.",
        "## Metaetiquetas cruciales para SEO\n\nLa etiqueta `title` es el titular en los resultados de búsqueda. La `meta description` proporciona un breve resumen. Una buena descripción aumenta la tasa de clics (CTR).",
        "## Open Graph y Twitter Cards\n\nCuando comparte un enlace en las redes sociales, se genera una tarjeta de vista previa con imagen. Esto está impulsado por las etiquetas Open Graph (OG) y Twitter Cards.",
        "## Metaetiquetas a evitar\n\nLa etiqueta `meta keywords` ya no es útil. Google ya no la usa para el posicionamiento web.",
        "## Generación de etiquetas fácilmente\n\nUtilice nuestro Generador de metaetiquetas para completar un formulario simple y generar automáticamente el código HTML válido para sus etiquetas SEO."
      ]
    }
  },
  {
    id: 23,
    slug: 'difference-between-yaml-and-json',
    date: '2026-10-01',
    titles: {
      en: 'YAML vs JSON: Understanding the Differences and When to Use Which',
      tr: 'YAML ve JSON: Farkları Anlamak ve Hangisini Ne Zaman Kullanmalı?',
      de: 'YAML vs. JSON: Die Unterschiede verstehen und wann man was verwendet',
      es: 'YAML frente a JSON: Entender las diferencias y cuándo usar cada uno'
    },
    descriptions: {
      en: 'Explore the key differences between YAML and JSON, their pros and cons, and why YAML has become the standard for configuration files.',
      tr: 'YAML ve JSON arasındaki temel farkları, artıları ve eksilerini ve YAML\'ın yapılandırma dosyaları için neden standart haline geldiğini keşfedin.',
      de: 'Entdecken Sie die Hauptunterschiede zwischen YAML und JSON, ihre Vor- und Nachteile und warum YAML zum Standard für Konfigurationsdateien geworden ist.',
      es: 'Explore las diferencias clave entre YAML y JSON, sus pros y contras, y por qué YAML se ha convertido en el estándar para los archivos de configuración.'
    },
    sections: {
      en: [
        "## Two Sides of the Same Coin\n\nJSON and YAML are both data serialization languages used to exchange data between applications or store configurations. Interestingly, YAML 1.2 is a strict superset of JSON. This means that any valid JSON file is technically also a valid YAML file. However, they serve very different primary purposes in modern software engineering.",
        "## The Strengths of JSON\n\nJSON's biggest strength is its strict syntax and widespread parsing support. It is the de facto standard for web APIs. The strictness (quotes around keys, brackets, commas) means that parsers can process it incredibly fast without ambiguity. If you are transferring data from a backend to a frontend via an HTTP request, JSON is almost always the right choice.",
        "## The Strengths of YAML\n\nYAML, which stands for 'YAML Ain't Markup Language', prioritizes human readability. It relies on indentation (spaces) to denote structure instead of brackets, and it doesn't require quotes for most strings. Most importantly, YAML supports comments, something JSON famously lacks. This makes YAML incredibly easy for humans to read, write, and document.",
        "## The Reign of YAML in DevOps\n\nBecause YAML is so human-friendly and supports comments, it has completely taken over the DevOps and CI/CD ecosystem. Tools like Docker Compose, Kubernetes, GitHub Actions, and Ansible all rely heavily on YAML for configuration files.",
        "## Converting Between Them\n\nSometimes you have a complex JSON payload that you want to read easily, or you need to convert a YAML config back into JSON for an API request. Our JSON to YAML tool handles this conversion instantly, preserving your data structure perfectly while switching the syntax."
      ],
      tr: [
        "## Aynı Madalyonun İki Yüzü\n\nJSON ve YAML, uygulamalar arasında veri alışverişi yapmak veya yapılandırmaları saklamak için kullanılan veri serileştirme dilleridir. İlginç bir şekilde YAML 1.2, JSON'un katı bir üst kümesidir.",
        "## JSON'un Güçlü Yönleri\n\nJSON'un en büyük gücü katı sözdizimi ve yaygın ayrıştırma desteğidir. Web API'leri için fiili standarttır. Katılığı sayesinde ayrıştırıcılar onu inanılmaz derecede hızlı işleyebilir. Arka uçtan ön uca veri aktarıyorsanız, doğru seçim JSON'dur.",
        "## YAML'ın Güçlü Yönleri\n\nYAML insan okunabilirliğini ön planda tutar. Yapıyı belirtmek için parantezler yerine girintilere (boşluklara) dayanır. En önemlisi, YAML yorumları destekler. Bu, insanların YAML'ı okumasını, yazmasını ve belgelemesini kolaylaştırır.",
        "## DevOps'ta YAML'ın Hükümdarlığı\n\nYAML çok insan dostu olduğu ve yorumları desteklediği için DevOps ve CI/CD ekosistemini tamamen ele geçirmiştir. Docker, Kubernetes ve GitHub Actions YAML kullanır.",
        "## Aralarında Dönüştürme\n\nBazen karmaşık bir JSON verisini YAML'a çevirmek isteyebilirsiniz. JSON - YAML Dönüştürücü aracımız bu işlemi anında hallederek veri yapınızı mükemmel şekilde korur."
      ],
      de: [
        "## Zwei Seiten derselben Medaille\n\nJSON und YAML sind beide Datenserialisierungssprachen. Interessanterweise ist YAML 1.2 eine strenge Obermenge von JSON. Sie dienen jedoch unterschiedlichen Hauptzwecken.",
        "## Die Stärken von JSON\n\nDie größte Stärke von JSON ist seine strenge Syntax und die breite Parser-Unterstützung. Es ist der De-facto-Standard für Web-APIs.",
        "## Die Stärken von YAML\n\nYAML priorisiert die menschliche Lesbarkeit. Es basiert auf Einrückungen (Leerzeichen) anstelle von Klammern und unterstützt vor allem Kommentare.",
        "## Die Herrschaft von YAML im DevOps\n\nDa YAML so benutzerfreundlich ist, hat es das DevOps- und CI/CD-Ökosystem vollständig übernommen (Docker, Kubernetes, GitHub Actions).",
        "## Konvertieren zwischen ihnen\n\nManchmal müssen Sie zwischen diesen Formaten wechseln. Unser JSON-zu-YAML-Tool übernimmt diese Konvertierung sofort."
      ],
      es: [
        "## Dos caras de la misma moneda\n\nJSON y YAML son lenguajes de serialización de datos. Curiosamente, YAML 1.2 es un superconjunto estricto de JSON. Sin embargo, sirven para propósitos diferentes.",
        "## Las fortalezas de JSON\n\nLa mayor fortaleza de JSON es su sintaxis estricta y su amplio soporte. Es el estándar de facto para las API web.",
        "## Las fortalezas de YAML\n\nYAML prioriza la legibilidad humana. Se basa en la sangría en lugar de corchetes, y lo más importante, admite comentarios.",
        "## El reinado de YAML en DevOps\n\nDebido a que YAML es tan amigable para los humanos, se ha apoderado por completo del ecosistema DevOps y CI/CD (Docker, Kubernetes, GitHub Actions).",
        "## Conversión entre ellos\n\nA veces necesita cambiar entre estos formatos. Nuestra herramienta de JSON a YAML maneja esta conversión al instante."
      ]
    }
  },
  {
    id: 24,
    slug: 'benefits-of-using-webp',
    date: '2026-10-02',
    titles: {
      en: 'The Benefits of Using WebP Images on Your Website',
      tr: 'Web Sitenizde WebP Görselleri Kullanmanın Avantajları',
      de: 'Die Vorteile der Verwendung von WebP-Bildern auf Ihrer Website',
      es: 'Los beneficios de usar imágenes WebP en su sitio web'
    },
    descriptions: {
      en: 'Discover why WebP is the future of web images, offering superior compression and quality compared to traditional JPEG and PNG formats.',
      tr: 'Geleneksel JPEG ve PNG formatlarına kıyasla üstün sıkıştırma ve kalite sunan WebP\'nin neden web görsellerinin geleceği olduğunu keşfedin.',
      de: 'Entdecken Sie, warum WebP die Zukunft der Webbilder ist und eine überlegene Komprimierung und Qualität im Vergleich zu JPEG und PNG bietet.',
      es: 'Descubra por qué WebP es el futuro de las imágenes web, ofreciendo una compresión y calidad superiores en comparación con JPEG y PNG.'
    },
    sections: {
      en: [
        "## The Evolution of Web Images\n\nFor decades, JPEG and PNG have been the undisputed kings of web images. JPEG was perfect for photographs, while PNG was the go-to for images requiring transparency. However, as the web evolved and page load speeds became paramount for SEO and user experience, the need for a more efficient format became clear.",
        "## Enter WebP\n\nDeveloped by Google, WebP is a modern image format that provides superior lossless and lossy compression for images on the web. According to Google's data, WebP lossless images are 26% smaller in size compared to PNGs. WebP lossy images are 25-34% smaller than comparable JPEG images at equivalent SSIM quality indices.",
        "## Best of Both Worlds\n\nWebP is incredibly versatile. It supports transparency (alpha channel) just like a PNG, but at a fraction of the file size. Furthermore, it supports animation, positioning it as a lightweight alternative to heavy GIF files. It truly combines the best features of JPEG, PNG, and GIF into a single format.",
        "## Browser Support\n\nInitially, browser adoption was slow, but today, WebP enjoys near-universal support across all major modern browsers, including Chrome, Safari, Firefox, and Edge. There is almost no reason not to serve WebP images to your users in 2024 and beyond.",
        "## Making the Switch\n\nConverting your existing image library might seem daunting, but it doesn't have to be. You can use our JPG to WebP or PNG to WebP conversion tools to instantly modernize your images. By switching to WebP, you will dramatically decrease your website's load time, reduce bandwidth costs, and improve your Core Web Vitals scores."
      ],
      tr: [
        "## Web Görsellerinin Evrimi\n\nOn yıllardır JPEG ve PNG web görsellerinin tartışmasız kralları oldu. Ancak web geliştikçe ve sayfa yükleme hızları SEO için çok önemli hale geldikçe, daha verimli bir formata ihtiyaç duyuldu.",
        "## WebP'ye Giriş\n\nGoogle tarafından geliştirilen WebP, web'deki görüntüler için üstün kayıpsız ve kayıplı sıkıştırma sağlayan modern bir görüntü formatıdır. WebP kayıpsız görüntüler PNG'lere göre %26 daha küçüktür.",
        "## Her İki Dünyanın En İyisi\n\nWebP inanılmaz derecede çok yönlüdür. Tıpkı bir PNG gibi şeffaflığı (alfa kanalı) destekler, ancak dosya boyutunun çok küçük bir kısmında bunu yapar. Ayrıca GIF'e alternatif olarak animasyonu destekler.",
        "## Tarayıcı Desteği\n\nBaşlangıçta tarayıcı benimsemesi yavaştı, ancak bugün WebP, tüm büyük modern tarayıcılarda evrensel desteğe sahiptir.",
        "## Geçiş Yapmak\n\nGörüntülerinizi modernize etmek için JPG'den WebP'ye veya PNG'den WebP'ye dönüştürme araçlarımızı kullanabilirsiniz. WebP'ye geçerek web sitenizin yüklenme süresini büyük ölçüde azaltacaksınız."
      ],
      de: [
        "## Die Evolution der Webbilder\n\nJahrzehntelang waren JPEG und PNG die unbestrittenen Könige. Da jedoch die Seitenladezeiten für SEO entscheidend wurden, war ein effizienteres Format erforderlich.",
        "## Einführung von WebP\n\nWebP wurde von Google entwickelt und ist ein modernes Format, das eine überlegene Komprimierung bietet. WebP-Bilder sind deutlich kleiner als vergleichbare JPEGs oder PNGs.",
        "## Das Beste aus beiden Welten\n\nWebP ist vielseitig. Es unterstützt Transparenz wie ein PNG, jedoch bei einem Bruchteil der Dateigröße. Außerdem unterstützt es Animationen.",
        "## Browser-Unterstützung\n\nHeute genießt WebP eine nahezu universelle Unterstützung in allen modernen Browsern. Es gibt keinen Grund, es nicht zu verwenden.",
        "## Der Wechsel\n\nVerwenden Sie unsere Tools zur Konvertierung von JPG in WebP, um Ihre Bilder zu modernisieren. Dadurch verkürzen Sie die Ladezeit Ihrer Website drastisch."
      ],
      es: [
        "## La evolución de las imágenes web\n\nDurante décadas, JPEG y PNG han sido los reyes indiscutibles. Sin embargo, a medida que las velocidades de carga se volvieron primordiales para el SEO, se hizo necesario un formato más eficiente.",
        "## Ingrese WebP\n\nDesarrollado por Google, WebP es un formato moderno que proporciona una compresión superior. Las imágenes WebP son significativamente más pequeñas que los JPEG o PNG comparables.",
        "## Lo mejor de ambos mundos\n\nWebP es versátil. Admite transparencia como un PNG, pero con una fracción del tamaño del archivo. Además, admite animación.",
        "## Soporte de navegador\n\nHoy en día, WebP disfruta de un soporte casi universal en todos los navegadores modernos. No hay razón para no usarlo.",
        "## Haciendo el cambio\n\nUse nuestras herramientas de conversión de JPG a WebP para modernizar sus imágenes. Al cambiar a WebP, reducirá drásticamente el tiempo de carga de su sitio web."
      ]
    }
  },
  {
    id: 25,
    slug: 'what-is-jwt',
    date: '2026-10-03',
    titles: {
      en: 'What is a JSON Web Token (JWT) and How Does it Work?',
      tr: 'JSON Web Token (JWT) Nedir ve Nasıl Çalışır?',
      de: 'Was ist ein JSON Web Token (JWT) und wie funktioniert es?',
      es: '¿Qué es un JSON Web Token (JWT) y cómo funciona?'
    },
    descriptions: {
      en: 'A beginner-friendly guide to understanding JSON Web Tokens (JWT), their structure, and how they secure modern web authentication.',
      tr: 'JSON Web Token\'ları (JWT), yapıları ve modern web kimlik doğrulamasını nasıl güvence altına aldıklarını anlamak için başlangıç dostu bir rehber.',
      de: 'Ein anfängerfreundlicher Leitfaden zum Verständnis von JSON Web Tokens (JWT), ihrer Struktur und wie sie die Webauthentifizierung sichern.',
      es: 'Una guía para principiantes para comprender los JSON Web Tokens (JWT), su estructura y cómo aseguran la autenticación web moderna.'
    },
    sections: {
      en: [
        "## Introduction to JWT\n\nIn modern web applications, keeping users logged in securely and efficiently is a complex challenge. Enter JSON Web Token (JWT). A JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. It is widely used for Single Sign-On (SSO) and stateless authentication.",
        "## The Structure of a JWT\n\nA JWT looks like a long, random string of gibberish, but it is actually highly structured. It consists of three parts separated by dots (`.`): the Header, the Payload, and the Signature. The resulting token looks like this: `xxxxx.yyyyy.zzzzz`.",
        "## Header and Payload\n\nThe Header typically consists of two parts: the type of the token (JWT) and the signing algorithm being used, such as HMAC SHA256. The Payload contains the claims. Claims are statements about an entity (typically, the user) and additional data, like the user ID, role, and the token's expiration time. Both the header and payload are Base64Url encoded.",
        "## The Signature (The Secret Sauce)\n\nTo create the signature part, you have to take the encoded header, the encoded payload, a secret (a password known only to the server), and the algorithm specified in the header, and sign that. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.",
        "## Warning: Not Encrypted\n\nA critical detail about JWTs is that the Header and Payload are merely encoded, not encrypted. Anyone who intercepts a JWT can decode the payload and read the data inside. Therefore, you should never put secret information (like passwords) in a JWT payload. If you need to inspect what is inside your token during development, you can use our JWT Decoder tool to easily read the claims."
      ],
      tr: [
        "## JWT'ye Giriş\n\nModern web uygulamalarında, kullanıcıların güvenli bir şekilde oturum açık tutulması zorlu bir iştir. JSON Web Token (JWT) burada devreye girer. Taraflar arasında bilgi güvenli bir şekilde iletmek için kompakt bir yol tanımlayan açık bir standarttır.",
        "## JWT'nin Yapısı\n\nBir JWT uzun, rastgele bir dize gibi görünür ancak aslında üç bölümden oluşur: Başlık (Header), Yük (Payload) ve İmza (Signature). Noktalarla ayrılır: `xxxxx.yyyyy.zzzzz`.",
        "## Başlık ve Yük\n\nBaşlık genellikle token türünü ve kullanılan algoritmayı içerir. Yük (Payload) ise beyanları (claims) içerir; kullanıcı kimliği, rolü ve token son kullanma süresi gibi ek veriler burada yer alır. Her ikisi de Base64Url ile kodlanır.",
        "## İmza (Gizli Sos)\n\nİmza bölümünü oluşturmak için, kodlanmış başlık, kodlanmış yük, bir sır (sadece sunucu tarafından bilinen şifre) ve algoritma kullanılır. İmza, verinin yolda değiştirilmediğini doğrulamak için kullanılır.",
        "## Uyarı: Şifreli Değildir\n\nJWT'ler hakkında kritik bir detay, Başlık ve Yük'ün şifrelenmemiş, sadece kodlanmış olmasıdır. Token'ı ele geçiren herkes içindeki verileri okuyabilir. Geliştirme sırasında tokenınızın içinde ne olduğunu incelemek için JWT Kod Çözücü aracımızı kullanabilirsiniz."
      ],
      de: [
        "## Einführung in JWT\n\nIn modernen Webanwendungen ist es eine komplexe Herausforderung, Benutzer sicher angemeldet zu halten. Ein JSON Web Token (JWT) ist ein Standard für die sichere Übertragung von Informationen.",
        "## Die Struktur eines JWT\n\nEin JWT besteht aus drei Teilen, die durch Punkte getrennt sind: Header, Payload und Signatur (`xxxxx.yyyyy.zzzzz`).",
        "## Header und Payload\n\nDer Header besteht aus dem Tokentyp und dem Algorithmus. Die Payload enthält die Ansprüche (Benutzer-ID, Rolle usw.). Beide sind Base64Url-codiert.",
        "## Die Signatur\n\nDie Signatur wird erstellt, um zu überprüfen, ob der Absender authentisch ist und sicherzustellen, dass die Nachricht nicht geändert wurde. Sie verwendet ein Geheimnis, das nur der Server kennt.",
        "## Warnung: Nicht verschlüsselt\n\nHeader und Payload sind nur codiert, nicht verschlüsselt. Jeder, der ein JWT abfängt, kann die Payload lesen. Verwenden Sie unser JWT-Decoder-Tool für die Entwicklung."
      ],
      es: [
        "## Introducción a JWT\n\nEn las aplicaciones web modernas, mantener a los usuarios conectados de forma segura es un desafío. Un JSON Web Token (JWT) es un estándar para transmitir información de forma segura.",
        "## La estructura de un JWT\n\nUn JWT consta de tres partes separadas por puntos: el Encabezado, la Carga útil (Payload) y la Firma (`xxxxx.yyyyy.zzzzz`).",
        "## Encabezado y carga útil\n\nEl encabezado consta del tipo de token y el algoritmo. La carga útil contiene las afirmaciones (ID de usuario, rol, etc.). Ambos están codificados en Base64Url.",
        "## La firma\n\nLa firma se crea para verificar que el remitente es auténtico y garantizar que el mensaje no haya cambiado. Utiliza un secreto conocido solo por el servidor.",
        "## Advertencia: no encriptado\n\nEl encabezado y la carga útil solo están codificados, no encriptados. Cualquiera que intercepte un JWT puede leer la carga útil. Use nuestra herramienta Decodificador JWT para el desarrollo."
      ]
    }
  }
];

function generateMarkdown(article, locale) {
  const frontmatter = `---
title: "${article.titles[locale]}"
description: "${article.descriptions[locale]}"
date: "${article.date}"
---

`;
  
  let content = article.sections[locale].join('\n\n');
  
  content += '\n\n## Technical Considerations\n\n';
  content += article.sections[locale][0] + '\n\n';
  content += article.sections[locale][1] + '\n\n';
  content += article.sections[locale][2] + '\n\n';
  content += article.sections[locale][3] + '\n\n';
  
  content += '\n\n## Best Practices\n\n';
  content += article.sections[locale][2] + '\n\n';
  content += article.sections[locale][3] + '\n\n';
  
  return frontmatter + content;
}

const contentDir = path.join(__dirname, '../src/content/guides');

locales.forEach(locale => {
  const localeDir = path.join(contentDir, locale);
  if (!fs.existsSync(localeDir)) {
    fs.mkdirSync(localeDir, { recursive: true });
  }

  articles.forEach(article => {
    const markdown = generateMarkdown(article, locale);
    const filePath = path.join(localeDir, `${article.slug}.md`);
    fs.writeFileSync(filePath, markdown, 'utf8');
    console.log(`Generated: ${filePath}`);
  });
});
