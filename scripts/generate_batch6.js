const fs = require('fs');
const path = require('path');

const locales = ['en', 'tr', 'de', 'es'];

const articles = [
  {
    id: 26,
    slug: 'what-is-lorem-ipsum',
    date: '2026-10-04',
    titles: {
      en: 'The History and Purpose of Lorem Ipsum in Design',
      tr: 'Tasarımda Lorem Ipsum\'un Tarihçesi ve Amacı',
      de: 'Die Geschichte und der Zweck von Lorem Ipsum im Design',
      es: 'La historia y el propósito de Lorem Ipsum en el diseño'
    },
    descriptions: {
      en: 'Learn where the famous Lorem Ipsum placeholder text comes from and why designers have used it for centuries to test layouts.',
      tr: 'Ünlü Lorem Ipsum yer tutucu metninin nereden geldiğini ve tasarımcıların mizanpajları test etmek için neden yüzyıllardır kullandığını öğrenin.',
      de: 'Erfahren Sie, woher der berühmte Lorem-Ipsum-Platzhaltertext stammt und warum Designer ihn seit Jahrhunderten verwenden.',
      es: 'Aprenda de dónde proviene el famoso texto de marcador de posición Lorem Ipsum y por qué los diseñadores lo han usado durante siglos.'
    },
    sections: {
      en: [
        "## What is Lorem Ipsum?\n\n\"Lorem ipsum dolor sit amet...\" If you have ever used a website template, a word processor, or a design tool, you have undoubtedly seen this phrase. It is the industry standard dummy text used by printers, typesetters, and web designers to occupy space in a layout before the actual content is ready.",
        "## Why Not Just Use English?\n\nYou might wonder, why use scrambled Latin instead of a simple English paragraph like \"Insert text here\"? The answer is psychology. If you use readable English text in a design mockup, the client will naturally start reading the text instead of focusing on the visual layout, typography, and spacing. Lorem Ipsum provides a more-or-less normal distribution of letters, making it look like readable English without actually making sense.",
        "## The Ancient Origins\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College, discovered that the text comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero.",
        "## The Digital Age\n\nLorem Ipsum made the leap to the digital world in the 1980s with the release of Letraset sheets containing the passages. Later, desktop publishing software like Aldus PageMaker included it by default. Today, it is ubiquitous in UI/UX design tools like Figma, Sketch, and Adobe XD.",
        "## Generating Your Own\n\nSometimes you need exactly 3 paragraphs or 50 words to perfectly fill a card component in your design. Instead of copy-pasting the same block repeatedly, you can use our Lorem Ipsum Generator to quickly create custom lengths of dummy text tailored perfectly for your mockups."
      ],
      tr: [
        "## Lorem Ipsum Nedir?\n\n\"Lorem ipsum dolor sit amet...\" Bir web sitesi şablonu veya tasarım aracı kullandıysanız bu ifadeyi kesinlikle görmüşsünüzdür. Gerçek içerik hazır olmadan önce bir mizanpajdaki boşluğu doldurmak için kullanılan endüstri standardı yer tutucu (dummy) metindir.",
        "## Neden Sadece İngilizce (veya Türkçe) Kullanılmıyor?\n\nNeden \"Buraya metin girin\" gibi okunabilir bir paragraf yerine anlamsız Latince kullanıldığını merak edebilirsiniz. Cevap psikolojidir. Okunabilir bir metin kullanırsanız, müşteri görsel düzene, tipografiye ve boşluklara odaklanmak yerine doğal olarak metni okumaya başlar.",
        "## Eski Kökenleri\n\nPopüler inancın aksine, Lorem Ipsum sadece rastgele bir metin değildir. MÖ 45 yılına ait klasik Latince bir edebiyat eserine dayanır ve 2000 yıldan daha eskidir. Çiçero'nun \"de Finibus Bonorum et Malorum\" adlı eserinden gelir.",
        "## Dijital Çağ\n\nLorem Ipsum dijital dünyaya 1980'lerde, bu pasajları içeren Letraset yapraklarının piyasaya sürülmesiyle adım attı. Bugün Figma ve Adobe XD gibi UI/UX tasarım araçlarında yaygın olarak kullanılmaktadır.",
        "## Kendi Metninizi Üretmek\n\nBazen tasarımınızdaki bir kartı mükemmel şekilde doldurmak için tam olarak 3 paragrafa veya 50 kelimeye ihtiyacınız olur. Aynı bloğu kopyalayıp yapıştırmak yerine, Lorem Ipsum Oluşturucu aracımızı kullanarak istediğiniz uzunlukta metin üretebilirsiniz."
      ],
      de: [
        "## Was ist Lorem Ipsum?\n\nEs ist der branchenübliche Blindtext, der von Druckern und Webdesignern verwendet wird, um Platz in einem Layout einzunehmen, bevor der eigentliche Inhalt fertig ist.",
        "## Warum nicht einfach echtes Text verwenden?\n\nDie Antwort ist Psychologie. Wenn Sie lesbaren Text verwenden, beginnt der Kunde natürlich, den Text zu lesen, anstatt sich auf das visuelle Layout zu konzentrieren. Lorem Ipsum sieht aus wie normaler Text, ohne Sinn zu ergeben.",
        "## Die alten Ursprünge\n\nEntgegen der landläufigen Meinung ist es kein Zufallstext. Er stammt aus einem klassischen lateinischen Literaturwerk von Cicero aus dem Jahr 45 v. Chr.",
        "## Das digitale Zeitalter\n\nEs machte den Sprung in die digitale Welt in den 1980er Jahren mit Letraset-Bögen. Heute ist es in UI-Design-Tools wie Figma allgegenwärtig.",
        "## Ihren eigenen generieren\n\nVerwenden Sie unseren Lorem-Ipsum-Generator, um schnell benutzerdefinierte Längen von Blindtext für Ihre Mockups zu erstellen."
      ],
      es: [
        "## ¿Qué es Lorem Ipsum?\n\nEs el texto falso estándar de la industria utilizado por diseñadores web para ocupar espacio en un diseño antes de que el contenido real esté listo.",
        "## ¿Por qué no usar texto real?\n\nLa respuesta es la psicología. Si usa texto legible, el cliente comenzará a leerlo en lugar de concentrarse en el diseño visual. Lorem Ipsum parece texto normal sin tener sentido.",
        "## Los orígenes antiguos\n\nContrariamente a la creencia popular, no es texto aleatorio. Proviene de una obra de literatura latina clásica de Cicerón del 45 a. C.",
        "## La era digital\n\nDio el salto al mundo digital en la década de 1980 con las hojas de Letraset. Hoy en día es omnipresente en herramientas de diseño de interfaz de usuario como Figma.",
        "## Generando el suyo\n\nUse nuestro Generador de Lorem Ipsum para crear rápidamente longitudes personalizadas de texto falso para sus maquetas."
      ]
    }
  },
  {
    id: 27,
    slug: 'unix-timestamp-explained',
    date: '2026-10-05',
    titles: {
      en: 'What is a Unix Timestamp? A Guide for Developers',
      tr: 'Unix Zaman Damgası Nedir? Geliştiriciler İçin Rehber',
      de: 'Was ist ein Unix-Zeitstempel? Ein Leitfaden für Entwickler',
      es: '¿Qué es una marca de tiempo de Unix? Una guía para desarrolladores'
    },
    descriptions: {
      en: 'Understand the concept of Epoch time, how the Unix timestamp works, and why it is the standard for time tracking in programming and databases.',
      tr: 'Epoch zamanı kavramını, Unix zaman damgasının nasıl çalıştığını ve programlamada zaman takibi için neden standart olduğunu anlayın.',
      de: 'Verstehen Sie das Konzept der Epoch-Zeit, wie der Unix-Zeitstempel funktioniert und warum er der Standard in der Programmierung ist.',
      es: 'Comprenda el concepto del tiempo Epoch, cómo funciona la marca de tiempo de Unix y por qué es el estándar en la programación.'
    },
    sections: {
      en: [
        "## The Concept of Epoch Time\n\nIn programming, managing dates and times across different time zones, daylight saving rules, and calendars is a nightmare. To simplify this, the concept of the Unix Epoch was introduced. The Unix Epoch is a specific moment in time: 00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970.",
        "## What is a Unix Timestamp?\n\nA Unix timestamp is simply the number of seconds that have elapsed since the Unix Epoch, not counting leap seconds. For example, a timestamp of 1696500000 represents a specific second in time that is completely independent of where you are on Earth. It is a single integer.",
        "## Why Use Timestamps?\n\nBecause a timestamp is just a number, it is incredibly efficient for computers to store, sort, and compare. Databases like MySQL or PostgreSQL can perform calculations on integer timestamps much faster than they can parse and calculate formatted date strings (like '2024-05-12 14:00:00').",
        "## The Year 2038 Problem\n\nYou might have heard of the Y2K bug, but Unix has its own looming issue: the Year 2038 problem. Originally, timestamps were stored as 32-bit signed integers. The maximum value for a 32-bit signed integer is 2,147,483,647. On January 19, 2038, the Unix timestamp will exceed this number, potentially causing older systems to crash or interpret the time as the year 1901. Modern 64-bit systems have resolved this issue, pushing the limit billions of years into the future.",
        "## Converting Timestamps\n\nWhile timestamps are great for computers, they are unreadable for humans. If you are debugging a database entry and see `1672531199`, you probably don't know that it means December 31, 2022. You can use our Unix Timestamp Converter to instantly translate these numbers into human-readable dates in your local time zone."
      ],
      tr: [
        "## Epoch Zamanı Kavramı\n\nProgramlamada tarih ve saatleri yönetmek zordur. Bunu basitleştirmek için Unix Epoch (Çağ) kavramı tanıtıldı. Unix Epoch, 1 Ocak 1970 Perşembe, saat 00:00:00 (UTC) olan belirli bir andır.",
        "## Unix Zaman Damgası Nedir?\n\nUnix zaman damgası, artık saniyeler hesaba katılmadan Unix Epoch'tan bu yana geçen saniye sayısıdır. Örneğin `1696500000`, nerede olduğunuza bağlı olmayan belirli bir saniyeyi temsil eder. Sadece tek bir sayıdır (tamsayı).",
        "## Neden Zaman Damgaları Kullanılır?\n\nZaman damgası sadece bir sayı olduğu için bilgisayarların depolaması, sıralaması ve karşılaştırması inanılmaz derecede verimlidir. Veritabanları sayılar üzerinde metin dizelerine göre çok daha hızlı işlem yapabilir.",
        "## 2038 Yılı Problemi\n\nOrijinal olarak zaman damgaları 32-bit tamsayılar olarak saklanıyordu. 19 Ocak 2038'de zaman damgası bu değeri aşacak ve eski sistemlerin çökmesine neden olabilecektir. Modern 64-bit sistemler bu sorunu çözmüştür.",
        "## Zaman Damgalarını Dönüştürmek\n\nZaman damgaları bilgisayarlar için harika olsa da insanlar için okunamaz. Bir veritabanındaki sayının hangi tarihe denk geldiğini bulmak için Unix Zaman Damgası Dönüştürücü aracımızı kullanabilirsiniz."
      ],
      de: [
        "## Das Konzept der Epoch-Zeit\n\nDie Verwaltung von Daten und Zeiten in der Programmierung ist schwierig. Die Unix Epoch ist ein bestimmter Zeitpunkt: 1. Januar 1970, 00:00:00 UTC.",
        "## Was ist ein Unix-Zeitstempel?\n\nEin Unix-Zeitstempel ist die Anzahl der Sekunden, die seit der Unix Epoch vergangen sind. Es ist eine einzelne Ganzzahl.",
        "## Warum Zeitstempel verwenden?\n\nDa ein Zeitstempel nur eine Zahl ist, ist er für Computer effizient zu speichern und zu sortieren. Datenbanken können Integer-Zeitstempel viel schneller verarbeiten als formatierte Datumszeichenfolgen.",
        "## Das Jahr-2038-Problem\n\nUrsprünglich wurden Zeitstempel als 32-Bit-Ganzzahlen gespeichert. Am 19. Januar 2038 wird der Zeitstempel diesen Wert überschreiten, was zu Problemen führen kann. Moderne 64-Bit-Systeme haben dies gelöst.",
        "## Zeitstempel konvertieren\n\nFür Menschen sind Zeitstempel unlesbar. Verwenden Sie unseren Unix-Zeitstempel-Konverter, um diese Zahlen sofort in lesbare Daten zu übersetzen."
      ],
      es: [
        "## El concepto del tiempo Epoch\n\nAdministrar fechas y horas en programación es difícil. La Unix Epoch es un momento específico: 1 de enero de 1970, 00:00:00 UTC.",
        "## ¿Qué es una marca de tiempo de Unix?\n\nEs la cantidad de segundos transcurridos desde la Unix Epoch. Es un solo número entero.",
        "## ¿Por qué usar marcas de tiempo?\n\nComo es solo un número, es muy eficiente para que las computadoras lo almacenen y lo clasifiquen. Las bases de datos pueden procesar marcas de tiempo mucho más rápido que las cadenas de texto.",
        "## El problema del año 2038\n\nOriginalmente, las marcas de tiempo se almacenaban como enteros de 32 bits. El 19 de enero de 2038, la marca de tiempo superará este valor. Los sistemas modernos de 64 bits han resuelto esto.",
        "## Conversión de marcas de tiempo\n\nPara los humanos, son ilegibles. Utilice nuestro convertidor de marcas de tiempo de Unix para traducir instantáneamente estos números en fechas legibles."
      ]
    }
  },
  {
    id: 28,
    slug: 'why-you-need-a-strong-password',
    date: '2026-10-06',
    titles: {
      en: 'The Psychology and Math Behind Strong Passwords',
      tr: 'Güçlü Şifrelerin Arkasındaki Psikoloji ve Matematik',
      de: 'Die Psychologie und Mathematik hinter sicheren Passwörtern',
      es: 'La psicología y las matemáticas detrás de las contraseñas seguras'
    },
    descriptions: {
      en: 'Understand how hackers crack passwords using brute force and dictionary attacks, and why random generation is your best defense.',
      tr: 'Bilgisayar korsanlarının şifreleri kaba kuvvet (brute force) ve sözlük saldırılarıyla nasıl kırdığını ve rastgele oluşturmanın neden en iyi savunmanız olduğunu anlayın.',
      de: 'Verstehen Sie, wie Hacker Passwörter knacken und warum zufällige Generierung Ihre beste Verteidigung ist.',
      es: 'Comprenda cómo los piratas informáticos descifran las contraseñas y por qué la generación aleatoria es su mejor defensa.'
    },
    sections: {
      en: [
        "## The Human Flaw\n\nHumans are exceptionally bad at creating random passwords. We tend to rely on patterns, significant dates, pet names, or pop culture references. A password like `Superman2024!` might feel secure to a human because it contains letters, a capital, a number, and a symbol. However, to a computer algorithm, it is incredibly predictable.",
        "## Dictionary Attacks\n\nHackers don't guess passwords by trying `aaaaa`, then `aaaab`. They use Dictionary Attacks. They compile massive lists of every word in the dictionary, combined with common names, dates, and common substitutions (like `@` for `a`). Because `Superman` is a known word and `2024` is a predictable year, a dictionary attack will crack that password in mere seconds.",
        "## Brute Force and Entropy\n\nIf a password isn't in a dictionary, hackers use Brute Force—trying every possible combination of characters. This is where math (entropy) comes in. A password's strength is based on its length and the pool of available characters. An 8-character password using only lowercase letters has 208 billion combinations, which a modern graphics card can crack instantly. A 16-character password using upper, lower, numbers, and symbols has so many combinations it would take trillions of years to crack.",
        "## The Solution: Random Generation\n\nTo defeat both dictionary and brute-force attacks, a password must be completely random and sufficiently long (ideally 16+ characters). It should not contain any words or recognizable patterns.",
        "## Secure Your Accounts\n\nStop trying to invent clever passwords in your head. Use a password manager to store your credentials, and use our Password Generator to instantly create mathematically unbreakable, cryptographically secure passwords for every account you create."
      ],
      tr: [
        "## İnsani Kusur\n\nİnsanlar rastgele şifre oluşturmada son derece kötüdür. Desenlere, önemli tarihlere veya evcil hayvan isimlerine güvenme eğilimindeyiz. `Superman2024!` gibi bir şifre insana güvenli gelebilir, ancak bilgisayar algoritmaları için son derece öngörülebilirdir.",
        "## Sözlük Saldırıları\n\nBilgisayar korsanları şifreleri tek tek harf deneyerek tahmin etmezler. Sözlük Saldırıları kullanırlar. Sözlükteki her kelimeyi, yaygın isimler ve tarihlerle birleştiren devasa listeler hazırlarlar. Bu nedenle sıradan kelime içeren şifreler saniyeler içinde kırılır.",
        "## Kaba Kuvvet (Brute Force) ve Entropi\n\nŞifre bir sözlükte yoksa, korsanlar her olası karakter kombinasyonunu dener (Brute Force). Şifrenin gücü, uzunluğuna ve karakter havuzuna (entropi) bağlıdır. Sadece küçük harflerden oluşan 8 karakterli bir şifreyi modern bir bilgisayar anında kırabilirken, 16 karakterli karmaşık bir şifreyi kırmak trilyonlarca yıl alır.",
        "## Çözüm: Rastgele Oluşturma\n\nHer iki saldırı türünü de yenmek için şifre tamamen rastgele ve yeterince uzun (ideal olarak 16+ karakter) olmalıdır. Hiçbir kelime veya desen içermemelidir.",
        "## Hesaplarınızı Güvenceye Alın\n\nKafanızda zekice şifreler uydurmaya çalışmayı bırakın. Bir şifre yöneticisi kullanın ve her hesabınız için matematiksel olarak kırılamaz şifreler oluşturmak üzere Şifre Oluşturucu aracımızı kullanın."
      ],
      de: [
        "## Der menschliche Fehler\n\nMenschen sind extrem schlecht darin, zufällige Passwörter zu erstellen. Ein Passwort wie `Superman2024!` mag sicher erscheinen, ist für einen Computer jedoch vorhersehbar.",
        "## Wörterbuchangriffe\n\nHacker verwenden Wörterbuchangriffe. Sie kompilieren massive Listen von Wörtern und Daten. Da `Superman` ein bekanntes Wort ist, wird dieses Passwort in Sekunden geknackt.",
        "## Brute Force und Entropie\n\nHacker probieren jede mögliche Kombination aus (Brute Force). Die Stärke hängt von Länge und Zeichensatz ab. Ein 16-stelliges, komplexes Passwort würde Billionen von Jahren dauern.",
        "## Die Lösung: Zufällige Generierung\n\nEin Passwort muss völlig zufällig und lang genug sein (ideal 16+ Zeichen), um sicher zu sein.",
        "## Sichern Sie Ihre Konten\n\nVerwenden Sie einen Passwort-Manager und unseren Passwort-Generator, um mathematisch unknackbare Passwörter zu erstellen."
      ],
      es: [
        "## El defecto humano\n\nLos humanos son excepcionalmente malos para crear contraseñas aleatorias. Una contraseña como `Superman2024!` puede parecer segura, pero es increíblemente predecible para una computadora.",
        "## Ataques de diccionario\n\nLos piratas informáticos utilizan ataques de diccionario. Compilan listas masivas de palabras y fechas. Como `Superman` es una palabra conocida, se descifrará en segundos.",
        "## Fuerza bruta y entropía\n\nLos hackers prueban todas las combinaciones posibles (Fuerza bruta). La fuerza se basa en la longitud y los caracteres. Una contraseña compleja de 16 caracteres tardaría billones de años en descifrarse.",
        "## La solución: Generación aleatoria\n\nUna contraseña debe ser completamente aleatoria y lo suficientemente larga (idealmente más de 16 caracteres) para ser segura.",
        "## Asegure sus cuentas\n\nUse un administrador de contraseñas y nuestro Generador de contraseñas para crear contraseñas matemáticamente indescifrables."
      ]
    }
  },
  {
    id: 29,
    slug: 'how-to-use-qr-codes-effectively',
    date: '2026-10-07',
    titles: {
      en: 'How to Use QR Codes Effectively for Your Business',
      tr: 'İşletmeniz İçin QR Kodları Etkili Şekilde Nasıl Kullanırsınız?',
      de: 'So nutzen Sie QR-Codes effektiv für Ihr Unternehmen',
      es: 'Cómo utilizar códigos QR de forma eficaz para su empresa'
    },
    descriptions: {
      en: 'A practical guide on integrating QR codes into your marketing strategy, restaurant menus, and business cards for seamless customer interactions.',
      tr: 'Sorunsuz müşteri etkileşimleri için QR kodlarını pazarlama stratejinize, restoran menülerinize ve kartvizitlerinize entegre etme konusunda pratik bir rehber.',
      de: 'Ein praktischer Leitfaden zur Integration von QR-Codes in Ihre Marketingstrategie und Visitenkarten.',
      es: 'Una guía práctica sobre la integración de códigos QR en su estrategia de marketing y tarjetas de presentación.'
    },
    sections: {
      en: [
        "## The Resurgence of the QR Code\n\nQuick Response (QR) codes have been around since 1994, but they saw a massive resurgence during the global pandemic as businesses sought contactless solutions. Today, they are an expected and highly effective bridge between the physical and digital worlds.",
        "## Contactless Menus and Ordering\n\nOne of the most popular uses is in restaurants. Instead of printing hundreds of physical menus, a single QR code on the table can direct diners to a digital menu on their phones. This saves printing costs, allows for instant menu updates, and provides a more hygienic experience.",
        "## Smart Business Cards\n\nPhysical business cards are easily lost or thrown away. By placing a QR code on your card that links to a vCard or a bio link page, you allow your contacts to instantly save your phone number, email, and social profiles directly to their phone's address book with a single scan.",
        "## Marketing Campaigns\n\nPrint media isn't dead, but it can be hard to track. Adding a QR code with a UTM-tracked URL to a flyer, poster, or magazine ad allows you to bridge offline marketing with online analytics. You can track exactly how many people scanned the code and visited your campaign page.",
        "## Creating Your Own\n\nGenerating a QR code takes only seconds. With our free QR Code Generator, you can easily create scannable codes for URLs, text, Wi-Fi passwords, or emails, and download them in high resolution to use in your print or digital materials."
      ],
      tr: [
        "## QR Kodunun Yeniden Yükselişi\n\nQR kodları 1994'ten beri var ancak küresel pandemi sırasında temassız çözümler arandığında büyük bir canlanma yaşadı. Günümüzde fiziksel ve dijital dünyalar arasında etkili bir köprüdür.",
        "## Temassız Menüler\n\nEn popüler kullanımlardan biri restoranlardadır. Masadaki tek bir QR kodu müşterileri dijital bir menüye yönlendirebilir. Bu, baskı maliyetlerinden tasarruf sağlar ve anında güncelleme imkanı sunar.",
        "## Akıllı Kartvizitler\n\nFiziksel kartvizitler kolayca kaybolur. Kartınıza bir vCard'a veya sosyal medya sayfanıza bağlanan bir QR kod yerleştirerek, kişilerin bilgilerinizi tek bir taramayla telefon rehberlerine kaydetmelerini sağlayabilirsiniz.",
        "## Pazarlama Kampanyaları\n\nBir el ilanına, postere veya dergi reklamına UTM izlemeli bir URL içeren QR kod eklemek, çevrimdışı pazarlamayı çevrimiçi analitiklerle birleştirmenize olanak tanır. Kaç kişinin kodu taradığını tam olarak izleyebilirsiniz.",
        "## Kendi Kodunuzu Oluşturmak\n\nQR kodu oluşturmak sadece saniyeler sürer. Ücretsiz QR Kod Oluşturucu aracımızla URL'ler, metinler veya Wi-Fi şifreleri için kolayca taranabilir kodlar oluşturabilirsiniz."
      ],
      de: [
        "## Das Wiederaufleben des QR-Codes\n\nQR-Codes erlebten während der Pandemie ein massives Wiederaufleben. Heute sind sie eine hocheffektive Brücke zwischen der physischen und digitalen Welt.",
        "## Kontaktlose Menüs\n\nEine der beliebtesten Anwendungen ist in Restaurants. Ein QR-Code leitet die Gäste zu einer digitalen Speisekarte weiter. Dies spart Druckkosten.",
        "## Intelligente Visitenkarten\n\nWenn Sie einen QR-Code auf Ihrer Karte platzieren, können Kontakte Ihre Daten mit einem einzigen Scan direkt im Adressbuch ihres Telefons speichern.",
        "## Marketingkampagnen\n\nDas Hinzufügen eines QR-Codes zu einem Flyer oder Poster ermöglicht es Ihnen, Offline-Marketing mit Online-Analysen zu verbinden.",
        "## Ihren eigenen Code erstellen\n\nMit unserem kostenlosen QR-Code-Generator können Sie ganz einfach scannbare Codes für URLs, Text oder WLAN-Passwörter erstellen."
      ],
      es: [
        "## El resurgimiento del código QR\n\nLos códigos QR experimentaron un resurgimiento masivo durante la pandemia. Hoy en día, son un puente muy eficaz entre el mundo físico y el digital.",
        "## Menús sin contacto\n\nUno de los usos más populares es en restaurantes. Un código QR dirige a los comensales a un menú digital. Esto ahorra costos de impresión.",
        "## Tarjetas de visita inteligentes\n\nAl colocar un código QR en su tarjeta, permite que sus contactos guarden sus datos directamente en la libreta de direcciones de su teléfono con un solo escaneo.",
        "## Campañas de marketing\n\nAgregar un código QR a un folleto o póster le permite unir el marketing fuera de línea con el análisis en línea.",
        "## Creando el suyo\n\nCon nuestro Generador de códigos QR gratuito, puede crear fácilmente códigos escaneables para URL, texto o contraseñas de Wi-Fi."
      ]
    }
  },
  {
    id: 30,
    slug: 'the-magic-of-markdown',
    date: '2026-10-08',
    titles: {
      en: 'The Magic of Markdown: Why Developers Love It',
      tr: 'Markdown\'ın Büyüsü: Geliştiriciler Neden Onu Seviyor?',
      de: 'Die Magie von Markdown: Warum Entwickler es lieben',
      es: 'La magia de Markdown: por qué a los desarrolladores les encanta'
    },
    descriptions: {
      en: 'Discover how Markdown revolutionized technical writing, simplified documentation, and replaced heavy word processors for developers.',
      tr: 'Markdown\'ın teknik yazarlığı nasıl devrimcileştirdiğini, dokümantasyonu nasıl basitleştirdiğini ve geliştiriciler için ağır kelime işlemcilerinin yerini nasıl aldığını keşfedin.',
      de: 'Entdecken Sie, wie Markdown das technische Schreiben revolutionierte, die Dokumentation vereinfachte und schwere Textverarbeitungsprogramme ersetzte.',
      es: 'Descubra cómo Markdown revolucionó la escritura técnica, simplificó la documentación y reemplazó a los pesados procesadores de texto.'
    },
    sections: {
      en: [
        "## What is Markdown?\n\nMarkdown is a lightweight markup language created by John Gruber in 2004. Its purpose is incredibly simple: to allow people to write using an easy-to-read, easy-to-write plain text format, which can then be seamlessly converted to structurally valid HTML.",
        "## Freedom from Word Processors\n\nBefore Markdown, if you wanted formatted text on the web, you either had to write raw HTML tags (like `<strong>text</strong>`) which was tedious, or use a WYSIWYG editor (like Microsoft Word), which often produced bloated, messy code behind the scenes. Markdown solved this by using simple symbols like asterisks for **bolding** and hash symbols for # Headings.",
        "## The Standard for Documentation\n\nBecause Markdown is just plain text, it is completely platform-independent and future-proof. You don't need a specific software to open a `.md` file; Notepad or VS Code works perfectly. This made it the absolute standard for software documentation. Every GitHub repository uses a `README.md` file to explain the project.",
        "## Portability and Conversion\n\nAnother superpower of Markdown is its portability. A Markdown file can easily be converted into HTML for a blog post, a PDF for a book, or even a presentation slide deck using tools like Pandoc.",
        "## Write Faster\n\nOnce you learn the basic syntax, writing in Markdown is significantly faster than using a mouse to click formatting buttons. If you have Markdown content that you need to publish to a legacy CMS, you can use our Markdown to HTML converter to instantly get clean, valid HTML code ready for publishing."
      ],
      tr: [
        "## Markdown Nedir?\n\nMarkdown, 2004 yılında John Gruber tarafından oluşturulan hafif bir işaretleme dilidir. Amacı inanılmaz derecede basittir: İnsanların, daha sonra HTML'e dönüştürülebilen, okunması ve yazılması kolay bir düz metin biçimi kullanarak yazmalarına olanak tanımak.",
        "## Kelime İşlemcilerden Kurtuluş\n\nMarkdown'dan önce, biçimlendirilmiş metin istiyorsanız ya sıkıcı olan ham HTML etiketlerini (`<strong>`) yazmanız ya da Microsoft Word gibi genellikle arka planda karmaşık kodlar üreten bir editör kullanmanız gerekiyordu. Markdown, kalınlaştırma için yıldız (**) ve başlıklar için kare (#) gibi basit semboller kullanarak bunu çözdü.",
        "## Dokümantasyon Standardı\n\nMarkdown sadece düz metin olduğu için platformdan tamamen bağımsızdır ve geleceğe dönüktür. Bir `.md` dosyasını açmak için özel bir yazılıma ihtiyacınız yoktur. Bu onu yazılım dokümantasyonunda mutlak standart yaptı.",
        "## Taşınabilirlik ve Dönüşüm\n\nMarkdown'ın bir diğer süper gücü de taşınabilirliğidir. Bir Markdown dosyası araçlar kullanılarak kolayca bir blog yazısı için HTML'e veya bir kitap için PDF'e dönüştürülebilir.",
        "## Daha Hızlı Yazın\n\nTemel sözdizimini öğrendikten sonra, Markdown ile yazmak biçimlendirme düğmelerine tıklamak için fare kullanmaktan çok daha hızlıdır. Elinizdeki bir metni yayınlamak için Markdown'dan HTML'e Dönüştürücü aracımızı kullanarak anında temiz HTML kodu elde edebilirsiniz."
      ],
      de: [
        "## Was ist Markdown?\n\nMarkdown ist eine 2004 erstellte Auszeichnungssprache. Ihr Zweck ist es, Menschen das Schreiben in einem leicht lesbaren Nur-Text-Format zu ermöglichen, das dann in HTML konvertiert werden kann.",
        "## Freiheit von Textverarbeitungsprogrammen\n\nVor Markdown mussten Sie entweder reine HTML-Tags schreiben oder einen Editor (wie Word) verwenden. Markdown löste dies durch einfache Symbole wie Sternchen für **Fett** und Raute für # Überschriften.",
        "## Der Standard für die Dokumentation\n\nDa Markdown nur Text ist, ist es plattformunabhängig. Sie benötigen keine spezielle Software. Dies machte es zum Standard für Softwaredokumentation (z. B. README.md auf GitHub).",
        "## Portabilität und Konvertierung\n\nEine Markdown-Datei kann leicht in HTML, eine PDF-Datei oder sogar eine Präsentation umgewandelt werden.",
        "## Schneller schreiben\n\nDas Schreiben in Markdown ist viel schneller. Verwenden Sie unseren Markdown-zu-HTML-Konverter, um sofort sauberen HTML-Code für die Veröffentlichung zu erhalten."
      ],
      es: [
        "## ¿Qué es Markdown?\n\nMarkdown es un lenguaje de marcado ligero creado en 2004. Su propósito es permitir a las personas escribir utilizando un formato de texto sin formato fácil de leer, que luego se puede convertir a HTML.",
        "## Libertad de los procesadores de texto\n\nAntes de Markdown, tenía que escribir etiquetas HTML sin procesar o usar un editor (como Word). Markdown resolvió esto usando símbolos simples como asteriscos para **negrita** y almohadillas para # Encabezados.",
        "## El estándar para documentación\n\nComo Markdown es solo texto sin formato, es independiente de la plataforma. No necesita un software específico. Esto lo convirtió en el estándar para la documentación de software (por ejemplo, README.md en GitHub).",
        "## Portabilidad y conversión\n\nUn archivo Markdown se puede convertir fácilmente en HTML, un PDF o incluso una presentación.",
        "## Escribe más rápido\n\nEscribir en Markdown es mucho más rápido. Use nuestro convertidor de Markdown a HTML para obtener instantáneamente un código HTML limpio listo para publicar."
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
  
  content += '\n\n## Summary\n\n';
  content += article.sections[locale][0] + '\n\n';
  
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
