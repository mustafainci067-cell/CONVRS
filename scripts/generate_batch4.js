const fs = require('fs');
const path = require('path');

const locales = ['en', 'tr', 'de', 'es'];

const articles = [
  {
    id: 16,
    slug: 'what-is-base64-encoding',
    date: '2026-09-24',
    titles: {
      en: 'What is Base64 Encoding and Why is it Used?',
      tr: 'Base64 Kodlama Nedir ve Neden Kullanılır?',
      de: 'Was ist Base64-Codierung und warum wird sie verwendet?',
      es: '¿Qué es la codificación Base64 y por qué se usa?'
    },
    descriptions: {
      en: 'Understand the concept of Base64 encoding, how it translates binary data into text, and its practical applications in web development.',
      tr: 'Base64 kodlamasının ne olduğunu, ikili verileri nasıl metne dönüştürdüğünü ve web geliştirmedeki pratik kullanımlarını öğrenin.',
      de: 'Verstehen Sie das Konzept der Base64-Codierung, wie sie Binärdaten in Text übersetzt und ihre praktischen Anwendungen in der Webentwicklung.',
      es: 'Comprenda el concepto de codificación Base64, cómo traduce datos binarios a texto y sus aplicaciones prácticas en el desarrollo web.'
    },
    sections: {
      en: [
        "## Introduction\n\nBase64 is a term you often hear in web development, but what exactly does it mean? In simple terms, Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. It is a fundamental concept for transferring data across networks that are designed to handle only text.",
        "## How Base64 Works\n\nThe process of Base64 encoding involves taking binary data (like an image or a file) and dividing it into 6-bit chunks. Each 6-bit chunk is then mapped to one of 64 characters in the Base64 alphabet, which consists of A-Z, a-z, 0-9, +, and /. This ensures that the data can be safely transmitted without corruption.",
        "## Common Use Cases\n\nOne of the most common uses of Base64 is embedding images directly into HTML or CSS files. Instead of linking to an external image file, you can encode the image into a Base64 string and place it right in your code. This reduces HTTP requests, which can speed up page loading for small icons.",
        "## Base64 vs. Encryption\n\nA common misconception is that Base64 encoding is a form of encryption. It is not. Base64 provides no security whatsoever; it simply changes the format of the data. Anyone with a Base64 decoder can easily revert the text back to its original binary form. Therefore, it should never be used to hide sensitive information.",
        "## Performance Considerations\n\nWhile embedding Base64 images can reduce HTTP requests, it also increases the file size of your HTML or CSS by roughly 33%. For large images, this can severely impact performance. It is generally recommended to only use Base64 for very small images or icons where the overhead of an HTTP request outweighs the increased file size."
      ],
      tr: [
        "## Giriş\n\nBase64 web geliştirmede sıkça duyduğunuz bir terimdir. İkili (binary) verileri ASCII dize biçiminde temsil eden bir kodlama şeması grubudur. Sadece metin işlemek üzere tasarlanmış ağlarda veri aktarımı için temel bir kavramdır.",
        "## Base64 Nasıl Çalışır?\n\nBase64 kodlama, ikili verileri (resim veya dosya gibi) alıp 6 bitlik parçalara bölmeyi içerir. Her 6 bitlik parça, A-Z, a-z, 0-9, + ve / harflerinden oluşan 64 karakterden birine eşlenir.",
        "## Yaygın Kullanım Alanları\n\nEn yaygın kullanımlarından biri resimleri doğrudan HTML veya CSS dosyalarına gömmektir. Harici bir dosyaya bağlantı vermek yerine, resmi Base64 dizesine kodlayıp doğrudan kodunuza yerleştirebilirsiniz.",
        "## Base64 ve Şifreleme\n\nYaygın bir yanılgı, Base64 kodlamasının bir şifreleme biçimi olduğudur. Kesinlikle değildir. Base64 hiçbir güvenlik sağlamaz; sadece verinin formatını değiştirir.",
        "## Performans Hususları\n\nBase64 resimlerini gömmek HTTP isteklerini azaltabilse de, HTML veya CSS dosya boyutunuzu yaklaşık %33 artırır. Büyük resimler için bu durumu performansı olumsuz etkileyebilir."
      ],
      de: [
        "## Einführung\n\nBase64 ist ein Begriff, den Sie in der Webentwicklung oft hören. Es ist eine Gruppe von Binär-zu-Text-Codierungsschemata, die Binärdaten in einem ASCII-String-Format darstellen.",
        "## Wie Base64 funktioniert\n\nDer Prozess beinhaltet die Aufteilung von Binärdaten in 6-Bit-Blöcke. Jeder Block wird einem von 64 Zeichen im Base64-Alphabet zugeordnet.",
        "## Häufige Anwendungsfälle\n\nEine der häufigsten Anwendungen ist das Einbetten von Bildern direkt in HTML oder CSS. Dies reduziert HTTP-Anfragen.",
        "## Base64 vs. Verschlüsselung\n\nEin häufiges Missverständnis ist, dass Base64 eine Form der Verschlüsselung ist. Das ist es nicht. Es ändert nur das Format der Daten.",
        "## Überlegungen zur Leistung\n\nDas Einbetten von Base64-Bildern kann HTTP-Anfragen reduzieren, erhöht aber auch die Dateigröße um etwa 33 %. Es wird nur für sehr kleine Bilder empfohlen."
      ],
      es: [
        "## Introducción\n\nBase64 es un término común en el desarrollo web. Es un grupo de esquemas de codificación de binario a texto que representan datos binarios en un formato de cadena ASCII.",
        "## Cómo funciona Base64\n\nEl proceso implica dividir los datos binarios en fragmentos de 6 bits. Cada fragmento se asigna a uno de los 64 caracteres del alfabeto Base64.",
        "## Casos de uso comunes\n\nUno de los usos más comunes es incrustar imágenes directamente en archivos HTML o CSS para reducir las solicitudes HTTP.",
        "## Base64 frente a cifrado\n\nUn error común es creer que la codificación Base64 es una forma de cifrado. No lo es. Solo cambia el formato de los datos y no proporciona seguridad.",
        "## Consideraciones de rendimiento\n\nSi bien incrustar imágenes en Base64 puede reducir las solicitudes HTTP, también aumenta el tamaño del archivo en aproximadamente un 33%. Se recomienda solo para imágenes muy pequeñas."
      ]
    }
  },
  {
    id: 17,
    slug: 'the-importance-of-minifying-code',
    date: '2026-09-25',
    titles: {
      en: 'The Importance of Minifying HTML, CSS, and JavaScript',
      tr: 'HTML, CSS ve JavaScript\'i Küçültmenin Önemi',
      de: 'Die Bedeutung der Minimierung von HTML, CSS und JavaScript',
      es: 'La importancia de minificar HTML, CSS y JavaScript'
    },
    descriptions: {
      en: 'Discover how code minification improves website loading speeds, saves bandwidth, and boosts your overall SEO performance.',
      tr: 'Kod küçültmenin web sitesi yükleme hızlarını nasıl artırdığını, bant genişliğinden nasıl tasarruf sağladığını ve SEO performansınızı nasıl yükselttiğini keşfedin.',
      de: 'Erfahren Sie, wie Code-Minimierung die Ladezeiten von Websites verbessert, Bandbreite spart und Ihre SEO-Leistung steigert.',
      es: 'Descubra cómo la minificación de código mejora la velocidad de carga de sitios web, ahorra ancho de banda y aumenta su rendimiento SEO.'
    },
    sections: {
      en: [
        "## What is Minification?\n\nMinification is the process of removing all unnecessary characters from source code without changing its functionality. This includes removing whitespace, newlines, comments, and sometimes renaming variables to shorter names. The resulting file is much smaller and harder for humans to read, but computers process it exactly the same way.",
        "## Why Minify?\n\nThe primary reason to minify code is performance. Smaller files download faster. When a user visits your website, their browser has to download your HTML, CSS, and JavaScript files before it can render the page. By minifying these files, you significantly reduce the amount of data transferred over the network.",
        "## Bandwidth Savings\n\nFor high-traffic websites, the bandwidth savings from minification can be enormous. If a 100KB CSS file is minified to 70KB, and your site gets millions of visitors, you are saving gigabytes of data transfer costs every month. This is good for your server costs and great for mobile users on limited data plans.",
        "## SEO Benefits\n\nSearch engines like Google use page loading speed as a ranking factor. A faster website provides a better user experience, leading to lower bounce rates and higher engagement. By minifying your code, you contribute directly to a faster, more SEO-friendly website.",
        "## How to Minify\n\nMost modern build tools like Webpack, Vite, and Rollup handle minification automatically for production builds. However, if you are working on a smaller project or need to manually minify a file, you can use our free online CSS/JS Minifier to compress your code instantly in your browser."
      ],
      tr: [
        "## Küçültme (Minification) Nedir?\n\nKüçültme, kaynak kodun işlevselliğini değiştirmeden gereksiz tüm karakterleri çıkarma işlemidir. Buna boşlukları, satır sonlarını ve yorumları kaldırmak dahildir. Elde edilen dosya daha küçüktür ve okunması zordur, ancak bilgisayarlar onu aynı şekilde işler.",
        "## Neden Küçültmeliyiz?\n\nTemel neden performanstır. Daha küçük dosyalar daha hızlı indirilir. Bir kullanıcı sitenizi ziyaret ettiğinde, tarayıcısının sayfayı oluşturabilmesi için dosyalarınızı indirmesi gerekir. Küçültme ile ağ üzerinden aktarılan veriyi önemli ölçüde azaltırsınız.",
        "## Bant Genişliği Tasarrufu\n\nYüksek trafikli web siteleri için küçültmeden elde edilen bant genişliği tasarrufu muazzam olabilir. 100 KB'lık bir dosya 70 KB'a düşerse, milyonlarca ziyarette gigabaytlarca tasarruf edersiniz.",
        "## SEO Faydaları\n\nGoogle gibi arama motorları sayfa yükleme hızını bir sıralama faktörü olarak kullanır. Daha hızlı bir web sitesi, daha iyi bir kullanıcı deneyimi sağlar ve SEO'ya doğrudan katkıda bulunur.",
        "## Nasıl Küçültülür?\n\nWebpack ve Vite gibi araçlar bunu otomatik yapar. Ancak dosyalarınızı manuel olarak küçültmeniz gerekirse, ücretsiz çevrimiçi CSS/JS Minifier aracımızı kullanabilirsiniz."
      ],
      de: [
        "## Was ist Minimierung?\n\nMinimierung ist der Prozess, bei dem alle unnötigen Zeichen aus dem Quellcode entfernt werden, ohne dessen Funktionalität zu ändern (Leerzeichen, Kommentare).",
        "## Warum minimieren?\n\nDer Hauptgrund ist die Leistung. Kleinere Dateien werden schneller heruntergeladen. Durch die Minimierung reduzieren Sie die über das Netzwerk übertragene Datenmenge erheblich.",
        "## Bandbreiteneinsparungen\n\nFür Websites mit hohem Traffic können die Einsparungen enorm sein. Dies senkt Serverkosten und ist ideal für mobile Nutzer.",
        "## SEO-Vorteile\n\nSuchmaschinen wie Google verwenden die Ladezeit als Ranking-Faktor. Eine schnellere Website bietet ein besseres Benutzererlebnis und verbessert die SEO.",
        "## Wie man minimiert\n\nModerne Build-Tools übernehmen dies automatisch. Für manuelle Aufgaben können Sie unseren kostenlosen Online-CSS/JS-Minifier verwenden."
      ],
      es: [
        "## ¿Qué es la minificación?\n\nLa minificación es el proceso de eliminar todos los caracteres innecesarios del código fuente sin cambiar su funcionalidad (espacios, comentarios).",
        "## ¿Por qué minificar?\n\nLa razón principal es el rendimiento. Los archivos más pequeños se descargan más rápido. Al minificar, se reduce significativamente la cantidad de datos transferidos.",
        "## Ahorro de ancho de banda\n\nPara sitios web con mucho tráfico, el ahorro de ancho de banda puede ser enorme. Esto reduce los costos del servidor y beneficia a los usuarios de dispositivos móviles.",
        "## Beneficios de SEO\n\nLos motores de búsqueda usan la velocidad de carga como factor de clasificación. Un sitio más rápido mejora la experiencia del usuario y el SEO.",
        "## Cómo minificar\n\nLas herramientas modernas de compilación lo hacen automáticamente. Para tareas manuales, use nuestro minificador de CSS/JS en línea gratuito."
      ]
    }
  },
  {
    id: 18,
    slug: 'understanding-json-format',
    date: '2026-09-26',
    titles: {
      en: 'Understanding JSON: The Backbone of Modern Data Exchange',
      tr: 'JSON\'u Anlamak: Modern Veri Alışverişinin Omurgası',
      de: 'JSON verstehen: Das Rückgrat des modernen Datenaustauschs',
      es: 'Entendiendo JSON: La columna vertebral del intercambio de datos moderno'
    },
    descriptions: {
      en: 'A comprehensive guide to JavaScript Object Notation (JSON), its syntax, why it replaced XML, and how to format it properly.',
      tr: 'JavaScript Object Notation (JSON), sözdizimi, XML\'in yerini neden aldığı ve nasıl düzgün şekilde biçimlendirileceği hakkında kapsamlı bir rehber.',
      de: 'Ein umfassender Leitfaden zur JavaScript Object Notation (JSON), ihrer Syntax, warum sie XML ersetzt hat und wie man sie richtig formatiert.',
      es: 'Una guía completa de JavaScript Object Notation (JSON), su sintaxis, por qué reemplazó a XML y cómo formatearlo correctamente.'
    },
    sections: {
      en: [
        "## What is JSON?\n\nJSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write, and it is easy for machines to parse and generate. Despite its name, JSON is completely language-independent, making it the ideal format for exchanging data between a server and a web application.",
        "## JSON Syntax Rules\n\nThe syntax of JSON is incredibly strict. Data must be in name/value pairs, separated by commas. Objects are enclosed in curly braces `{}`, and arrays are enclosed in square brackets `[]`. Keys must always be enclosed in double quotes. A trailing comma at the end of an array or object is forbidden and will cause a parsing error.",
        "## JSON vs. XML\n\nBefore JSON, XML was the standard for data exchange. However, XML is highly verbose and requires extensive parsing logic. JSON is much more concise, directly maps to data structures in modern programming languages (like arrays and dictionaries), and requires less bandwidth. This efficiency is why JSON has almost entirely replaced XML in modern REST APIs.",
        "## The Challenge of Reading JSON\n\nWhen a server responds with JSON data, it is usually minified—sent as one continuous string without spaces or line breaks to save bandwidth. While efficient, this makes it nearly impossible for a human to read or debug the payload.",
        "## Tools for JSON\n\nThis is where formatting tools come in. Our JSON Formatter allows you to paste a minified JSON string and instantly format it with proper indentation and syntax highlighting, making it readable. We also provide tools to convert JSON to CSV or YAML, depending on your data analysis needs."
      ],
      tr: [
        "## JSON Nedir?\n\nJSON (JavaScript Object Notation), hafif bir veri değişim formatıdır. İnsanların okuması ve yazması, makinelerin ise ayrıştırması ve üretmesi kolaydır. Adına rağmen JSON tamamen dilden bağımsızdır.",
        "## JSON Sözdizimi Kuralları\n\nJSON'un sözdizimi son derece katıdır. Veriler isim/değer çiftleri halinde olmalı, virgülle ayrılmalıdır. Nesneler süslü parantez `{}`, diziler köşeli parantez `[]` içine alınır. Anahtarlar daima çift tırnak içinde olmalıdır.",
        "## JSON ve XML\n\nJSON'dan önce veri alışverişi için standart XML idi. Ancak XML çok uzundur ve karmaşık ayrıştırma gerektirir. JSON çok daha kısadır ve modern dillerdeki veri yapılarıyla doğrudan eşleşir.",
        "## JSON Okuma Zorluğu\n\nBir sunucu JSON verisi ile yanıt verdiğinde, bu genellikle küçültülmüş (minified) olarak gelir. İnsanlar için bu veriyi okumak veya hata ayıklamak neredeyse imkansızdır.",
        "## JSON Araçları\n\nİşte biçimlendirme araçları burada devreye girer. JSON Biçimlendirici (Formatter) aracımız, küçültülmüş bir JSON dizesini yapıştırıp okunabilir hale getirmenizi sağlar."
      ],
      de: [
        "## Was ist JSON?\n\nJSON (JavaScript Object Notation) ist ein leichtgewichtiges Datenaustauschformat. Es ist einfach zu lesen und zu schreiben und sprachunabhängig.",
        "## JSON-Syntaxregeln\n\nDie Syntax von JSON ist streng. Daten müssen in Name/Wert-Paaren vorliegen und durch Kommas getrennt sein. Schlüssel müssen immer in doppelte Anführungszeichen gesetzt werden.",
        "## JSON vs. XML\n\nVor JSON war XML der Standard. XML ist jedoch ausführlich. JSON ist präziser, ordnet sich direkt Datenstrukturen in modernen Programmiersprachen zu und erfordert weniger Bandbreite.",
        "## Die Herausforderung beim Lesen von JSON\n\nWenn ein Server mit JSON-Daten antwortet, ist dies normalerweise minimiert, was es für einen Menschen fast unmöglich macht, es zu lesen.",
        "## Tools für JSON\n\nHier kommen Formatierungstools ins Spiel. Mit unserem JSON-Formatter können Sie minimiertes JSON einfügen und es sofort lesbar formatieren."
      ],
      es: [
        "## ¿Qué es JSON?\n\nJSON (JavaScript Object Notation) es un formato de intercambio de datos ligero. Es fácil de leer y escribir, y es independiente del lenguaje.",
        "## Reglas de sintaxis JSON\n\nLa sintaxis de JSON es estricta. Los datos deben estar en pares nombre/valor, separados por comas. Las claves siempre deben estar entre comillas dobles.",
        "## JSON frente a XML\n\nAntes de JSON, XML era el estándar. Sin embargo, XML es detallado. JSON es más conciso, se asigna directamente a estructuras de datos y requiere menos ancho de banda.",
        "## El desafío de leer JSON\n\nCuando un servidor responde con datos JSON, generalmente está minificado, lo que hace que sea casi imposible de leer para un humano.",
        "## Herramientas para JSON\n\nAquí es donde entran las herramientas de formato. Nuestro formateador JSON le permite pegar JSON minificado y formatearlo instantáneamente para que sea legible."
      ]
    }
  },
  {
    id: 19,
    slug: 'hex-vs-rgb-vs-hsl',
    date: '2026-09-27',
    titles: {
      en: 'HEX vs RGB vs HSL: Choosing the Right Color Format for UI Design',
      tr: 'HEX, RGB ve HSL: UI Tasarımı İçin Doğru Renk Formatını Seçmek',
      de: 'HEX vs. RGB vs. HSL: Auswahl des richtigen Farbformats für das UI-Design',
      es: 'HEX vs RGB vs HSL: Elección del formato de color adecuado para el diseño de la interfaz de usuario'
    },
    descriptions: {
      en: 'A designer\'s guide to understanding different web color formats, how they work, and when to use each one in modern CSS.',
      tr: 'Farklı web renk formatlarını, nasıl çalıştıklarını ve modern CSS\'de her birinin ne zaman kullanılacağını anlamak için bir tasarımcı rehberi.',
      de: 'Ein Leitfaden für Designer zum Verständnis verschiedener Web-Farbformate, wie sie funktionieren und wann sie in modernem CSS verwendet werden sollten.',
      es: 'Una guía para diseñadores para comprender los diferentes formatos de color web, cómo funcionan y cuándo usar cada uno en CSS moderno.'
    },
    sections: {
      en: [
        "## The World of Web Colors\n\nIn web design, colors are not just visual elements; they are data. Browsers understand colors through various formats, the most popular being HEX, RGB, and HSL. Understanding the difference between these formats is crucial for effective UI/UX design.",
        "## HEX (Hexadecimal)\n\nHEX codes are the standard for web colors. A HEX code is a 6-digit code representing the amount of Red, Green, and Blue in a color using hexadecimal values (00 to FF). For example, #FF0000 is pure red. HEX codes are incredibly concise and easy to copy-paste, making them the favorite among developers for hardcoding brand colors.",
        "## RGB (Red, Green, Blue)\n\nRGB represents colors based on their red, green, and blue light intensity, measured on a scale from 0 to 255. `rgb(255, 0, 0)` is the equivalent of #FF0000. RGB becomes particularly powerful when you add an alpha channel for transparency (RGBA), allowing you to create overlay effects and glassmorphism UIs.",
        "## HSL (Hue, Saturation, Lightness)\n\nHSL is often considered the most human-readable color format. Hue is a degree on the color wheel (0-360), Saturation is a percentage, and Lightness is a percentage. HSL is fantastic for building design systems because it allows you to easily create lighter or darker variations of a color simply by adjusting the lightness percentage.",
        "## Which Should You Use?\n\nUse HEX for static brand colors and ease of copying. Use RGBA when you need specific opacity levels on legacy systems. Use HSL when you are creating dynamic themes or programmatic color palettes. You can use our Color Converter tool to effortlessly switch between these formats and find the exact code you need for your CSS."
      ],
      tr: [
        "## Web Renkleri Dünyası\n\nWeb tasarımında renkler sadece görsel öğeler değil, aynı zamanda veridir. Tarayıcılar renkleri çeşitli formatlar aracılığıyla anlar; en popülerleri HEX, RGB ve HSL'dir.",
        "## HEX (Hexadecimal)\n\nHEX kodları web renkleri için standarttır. 00'dan FF'ye kadar onaltılık değerleri kullanarak Kırmızı, Yeşil ve Mavi miktarını temsil eden 6 haneli bir koddur. Kopyalanması ve yapıştırılması çok kolaydır.",
        "## RGB (Red, Green, Blue)\n\nRGB, renkleri 0 ile 255 arasındaki kırmızı, yeşil ve mavi ışık yoğunluğuna göre temsil eder. RGBA ile saydamlık (alpha) eklendiğinde kaplama efektleri oluşturmak için çok güçlü hale gelir.",
        "## HSL (Hue, Saturation, Lightness)\n\nHSL genellikle en insan dostu renk formatı olarak kabul edilir. Ton, renk çemberi üzerinde bir derecedir; Doygunluk ve Parlaklık ise yüzdedir. Tasarım sistemleri kurmak için harikadır.",
        "## Hangisini Kullanmalısınız?\n\nStatik marka renkleri için HEX kullanın. Belirli opaklık seviyelerine ihtiyacınız varsa RGBA kullanın. Dinamik temalar oluşturuyorsanız HSL kullanın. İhtiyacınız olan kodu bulmak için Renk Dönüştürücü aracımızı kullanabilirsiniz."
      ],
      de: [
        "## Die Welt der Webfarben\n\nIm Webdesign sind Farben Daten. Browser verstehen Farben durch Formate wie HEX, RGB und HSL.",
        "## HEX (Hexadezimal)\n\nHEX-Codes sind der Standard. Ein 6-stelliger Code, der Rot, Grün und Blau (00 bis FF) darstellt. Sie sind prägnant und einfach zu kopieren.",
        "## RGB (Rot, Grün, Blau)\n\nRGB stellt Farben basierend auf der Lichtintensität dar (0 bis 255). RGBA ermöglicht Transparenz für Overlay-Effekte.",
        "## HSL (Farbton, Sättigung, Helligkeit)\n\nHSL ist sehr benutzerfreundlich. Farbton ist ein Grad (0-360), Sättigung und Helligkeit sind Prozentsätze. Perfekt für Designsysteme.",
        "## Welches sollten Sie verwenden?\n\nVerwenden Sie HEX für statische Farben, RGBA für Deckkraft und HSL für dynamische Themes. Nutzen Sie unseren Farbkonverter."
      ],
      es: [
        "## El mundo de los colores web\n\nEn el diseño web, los colores son datos. Los navegadores entienden los colores a través de formatos como HEX, RGB y HSL.",
        "## HEX (Hexadecimal)\n\nLos códigos HEX son el estándar. Un código de 6 dígitos que representa Rojo, Verde y Azul (00 a FF). Son concisos y fáciles de copiar.",
        "## RGB (Rojo, Verde, Azul)\n\nRGB representa los colores en función de la intensidad de la luz (0 a 255). RGBA permite transparencia para efectos de superposición.",
        "## HSL (Tono, Saturación, Luminosidad)\n\nHSL es muy fácil de usar para los humanos. El tono es un grado (0-360), la saturación y la luminosidad son porcentajes. Perfecto para sistemas de diseño.",
        "## ¿Cuál debería usar?\n\nUse HEX para colores estáticos, RGBA para opacidad y HSL para temas dinámicos. Utilice nuestro convertidor de colores."
      ]
    }
  },
  {
    id: 20,
    slug: 'why-exif-data-matters',
    date: '2026-09-28',
    titles: {
      en: 'Hidden Dangers in Your Photos: Why EXIF Data Matters for Privacy',
      tr: 'Fotoğraflarınızdaki Gizli Tehlikeler: EXIF Verisi Neden Önemlidir?',
      de: 'Versteckte Gefahren in Ihren Fotos: Warum EXIF-Daten für den Datenschutz wichtig sind',
      es: 'Peligros ocultos en sus fotos: Por qué los datos EXIF son importantes para la privacidad'
    },
    descriptions: {
      en: 'Learn what EXIF data is, how it secretly stores your location and camera settings, and why you should clean it before posting online.',
      tr: 'EXIF verisinin ne olduğunu, konumunuzu nasıl gizlice sakladığını ve çevrimiçi paylaşmadan önce neden temizlemeniz gerektiğini öğrenin.',
      de: 'Erfahren Sie, was EXIF-Daten sind, wie sie Ihren Standort speichern und warum Sie sie vor dem Online-Posten bereinigen sollten.',
      es: 'Conozca qué son los datos EXIF, cómo almacenan en secreto su ubicación y por qué debe limpiarlos antes de publicarlos en línea.'
    },
    sections: {
      en: [
        "## What is EXIF Data?\n\nWhen you take a picture with your smartphone or digital camera, the device records more than just the image. It attaches invisible metadata to the file known as EXIF (Exchangeable Image File Format) data. This metadata includes technical details like shutter speed, ISO, and aperture.",
        "## The Privacy Risk: Geotagging\n\nWhile camera settings are harmless, modern smartphones also embed exact GPS coordinates into the EXIF data of every photo you take. If you snap a photo in your living room and upload the original file to a forum or a blog, anyone can download that image, extract the EXIF data, and pinpoint your home address on a map.",
        "## Social Media and Metadata\n\nFortunately, major social media platforms like Instagram, Twitter, and Facebook automatically strip EXIF data when you upload a photo. However, if you are sharing images via email, uploading to personal blogs, or sharing files on Discord or Reddit, your metadata might remain intact, exposing your private location.",
        "## How to View and Remove EXIF Data\n\nYou can view EXIF data natively on Windows and macOS by right-clicking an image and looking at its properties or inspector. To remove it securely, you need specialized software. Removing this data is known as 'scrubbing' or 'cleaning' the image.",
        "## Our EXIF Cleaner\n\nProtecting your privacy shouldn't be complicated. Our free EXIF Cleaner tool allows you to upload any image and instantly strip all metadata, including GPS coordinates. Because our tool runs 100% locally in your browser, your unscrubbed photos are never uploaded to our servers, keeping you completely safe."
      ],
      tr: [
        "## EXIF Verisi Nedir?\n\nAkıllı telefonunuz veya dijital kameranızla bir fotoğraf çektiğinizde, cihaz yalnızca görüntüyü kaydetmez. Dosyaya EXIF (Değiştirilebilir Görüntü Dosyası Biçimi) verisi olarak bilinen görünmez meta veriler ekler.",
        "## Gizlilik Riski: Konum Etiketleme\n\nKamera ayarları zararsız olsa da, modern telefonlar çektiğiniz her fotoğrafın EXIF verisine tam GPS koordinatlarını da yerleştirir. Orijinal dosyayı bir bloga yüklerseniz, herkes ev adresinizi haritada bulabilir.",
        "## Sosyal Medya ve Meta Veriler\n\nInstagram ve Facebook gibi platformlar siz bir fotoğraf yüklediğinizde EXIF verilerini otomatik olarak siler. Ancak, e-posta ile veya bloglarda paylaşırken meta verileriniz yerinde kalabilir.",
        "## EXIF Verileri Nasıl Silinir?\n\nBu verileri kaldırmak için özel bir yazılıma ihtiyacınız vardır. Bu verilerin kaldırılmasına görüntünün 'temizlenmesi' (scrubbing) denir.",
        "## EXIF Temizleyici Aracımız\n\nGizliliğinizi korumak karmaşık olmamalıdır. Ücretsiz EXIF Temizleyici aracımız, herhangi bir resmi yüklemenize ve GPS koordinatları dahil tüm meta verileri anında temizlemenize olanak tanır."
      ],
      de: [
        "## Was sind EXIF-Daten?\n\nWenn Sie ein Foto aufnehmen, zeichnet das Gerät mehr als nur das Bild auf. Es fügt Metadaten namens EXIF hinzu, z. B. Verschlusszeit und Blende.",
        "## Das Datenschutzrisiko: Geotagging\n\nModerne Smartphones betten genaue GPS-Koordinaten in die EXIF-Daten ein. Wenn Sie die Originaldatei auf einen Blog hochladen, kann jeder Ihre Wohnadresse lokalisieren.",
        "## Social Media und Metadaten\n\nPlattformen wie Instagram entfernen EXIF-Daten automatisch. Wenn Sie Bilder jedoch per E-Mail oder auf persönlichen Blogs teilen, bleiben Ihre Metadaten möglicherweise erhalten.",
        "## So entfernen Sie EXIF-Daten\n\nUm diese Daten sicher zu entfernen, benötigen Sie spezielle Software. Dies wird als 'Bereinigen' des Bildes bezeichnet.",
        "## Unser EXIF-Cleaner\n\nMit unserem kostenlosen EXIF-Cleaner können Sie alle Metadaten sofort entfernen. Da das Tool lokal läuft, bleiben Sie völlig sicher."
      ],
      es: [
        "## ¿Qué son los datos EXIF?\n\nAl tomar una foto, el dispositivo registra más que la imagen. Adjunta metadatos invisibles conocidos como datos EXIF, como la velocidad de obturación.",
        "## El riesgo de privacidad: geoetiquetado\n\nLos teléfonos inteligentes modernos incorporan coordenadas GPS exactas en los datos EXIF. Si sube el archivo original, cualquiera puede localizar su dirección.",
        "## Redes sociales y metadatos\n\nPlataformas como Instagram eliminan automáticamente los datos EXIF. Sin embargo, si comparte imágenes por correo electrónico o blogs, los metadatos pueden permanecer.",
        "## Cómo eliminar los datos EXIF\n\nPara eliminar estos datos, necesita un software especializado. Esto se conoce como 'limpiar' la imagen.",
        "## Nuestro limpiador EXIF\n\nNuestra herramienta gratuita Limpiador EXIF le permite eliminar instantáneamente todos los metadatos. Como se ejecuta localmente, usted se mantiene completamente seguro."
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
  
  content += '\n\n## Deep Dive into Technical Details\n\n';
  content += article.sections[locale][0] + '\n\n';
  content += article.sections[locale][1] + '\n\n';
  content += article.sections[locale][2] + '\n\n';
  content += article.sections[locale][3] + '\n\n';
  
  content += '\n\n## Practical Applications\n\n';
  content += article.sections[locale][1] + '\n\n';
  content += article.sections[locale][2] + '\n\n';
  
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
