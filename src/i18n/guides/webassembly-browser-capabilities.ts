import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "How WebAssembly Is Changing Browser Capabilities",
    eyebrow: "WebAssembly",
    description:
      "WebAssembly lets C++ and Rust code run in the browser at near-native speed. Learn how this open standard powers codecs, PDF engines, and entirely client-side applications.",
    excerpt:
      "For decades the browser ran only JavaScript. WebAssembly now lets native code — C++, Rust, Go — execute in a tab at near-native speed. Here is what that unlocks.",
    readingTime: "8 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Browsers were designed to display documents, not to run software. For the first two decades of the web, if you wanted real computational power — video transcoding, PDF rendering, serious compression — you had to send the work to a server. WebAssembly, an open standard finalized in 2017, quietly rewrote that rule. Today, C++ and Rust code runs inside your browser tab at near-native speed, and the boundary between 'web app' and 'desktop app' has all but disappeared."] },
    { type: "p", content: ["This article explains what WebAssembly (Wasm) actually is, why it is fast, where it is used today, and how it makes genuinely client-side privacy tools like Convrs possible."] },

    { type: "h2", content: ["The browser's original performance ceiling"] },
    { type: "p", content: ["The web was built on JavaScript. JavaScript is a remarkably capable language, but it is interpreted (or just-in-time compiled) in ways that make predictable, near-native performance difficult. A JavaScript loop that processes a million pixels per frame will hit a wall that the same loop in C++ would barely notice."] },
    { type: "p", content: ["For years, projects pushed against that wall with clever tricks: asm.js, a strict subset of JavaScript, could run C/C++ code blazingly fast in Firefox by exploiting predictable type patterns. But asm.js was a workaround with real costs — bloated files, awkward tooling, and performance still below native."] },

    { type: "h2", content: ["What WebAssembly is — and how it gets its speed"] },
    { type: "p", content: ["WebAssembly is not JavaScript with new syntax. It is a distinct, low-level bytecode format designed to be a compiler target for languages like C, C++, Rust, Go, and increasingly Swift and Kotlin. A toolchain (typically Emscripten or wasm-bindgen) compiles your native source into a compact .wasm module, which the browser loads and executes in its own sandbox."] },
    { type: "p", content: ["Three design choices give Wasm its speed:"] },
    { type: "list", items: [
      [{ text: "No parse phase. ", bold: true }, { text: "JavaScript must be parsed before it can run; Wasm modules are pre-compiled binary and decode in milliseconds." }],
      [{ text: "Just-in-time native code. ", bold: true }, { text: "Browsers translate Wasm to machine code at load, then execute it at near-native speed with almost no dynamic guessing." }],
      [{ text: "Linear memory. ", bold: true }, { text: "Wasm operates on a flat, sandboxed memory buffer, which maps cleanly to how compiled languages manage memory and lets code run without garbage-collector pauses." }],
    ]},
    { type: "code", lang: "text", content: "// A minimal taste: a compiled C function exposed to JS as a Wasm export.\n// In the browser, calling it feels like a normal JS Promise:\nconst { instance } = await WebAssembly.instantiateStreaming(fetch('./fast.wasm'));\nconst result = instance.exports.my_native_function(input);" },
    { type: "p", content: ["The result is that performance — image compression, audio decoding, PDF layout — approaches within 80–95% of a native executable in many real workloads. For the end user, the difference between 'runs in a server farm' and 'runs in your tab' becomes nearly invisible."] },

    { type: "h2", content: ["From codecs to databases: what Wasm actually powers"] },
    { type: "p", content: ["The list of Wasm deployments reads like the backend of the modern internet:"] },
    { type: "list", items: [
      [{ text: "Media codecs. ", bold: true }, { text: "libvpx (WebP/VP8/VP9), libavcodec (video/audio), and image libraries like libvips and mozjpeg run in-browser, enabling instant conversion without a server." }],
      [{ text: "Document engines. ", bold: true }, { text: "PDF renderers (PDFium, pdf.js' engine), document previews, and typography engines." }],
      [{ text: "Compression. ", bold: true }, { text: "zlib, zstd, brotli, and gzip implementations; WebAssembly even lets browsers and CDNs negotiate better compression." }],
      [{ text: "SQLite in the browser. ", bold: true }, { text: "A full relational database running locally, syncing when you choose." }],
      [{ text: "Games and graphics. ", bold: true }, { text: "Unity and Unreal compile to Wasm; complex 3D scenes run in a tab." }],
      [{ text: "AI and vision. ", bold: true }, { text: "ONNX Runtime and onnxruntime-web run model inference on your device, keeping inputs private." }],
    ]},
    { type: "p", content: ["Across every one of these cases, the pattern is the same: a battle-tested native library, compiled once, shipped to the browser, executed locally — with no server in the path."] },

    { type: "h2", content: ["Why WebAssembly is the engine of client-side privacy"] },
    { type: "p", content: ["Wasm's practical effect on privacy tooling is hard to overstate. Before Wasm, serious file processing in the browser meant either writing everything from scratch in JavaScript (slow, rebuild the world) or shipping processing to a server (private data leaves the device). Wasm breaks that trade-off:"] },
    { type: "list", items: [
      ["Years of optimization transfer directly. Codecs and libraries optimized by the whole industry for years are immediately available in a tab."],
      ["Large inputs become feasible. Files of hundreds of megabytes can be processed locally where JS alone would struggle."],
      ["Offline, private apps become normal. Conversion tools work without a connection, because the computation never needed one."],
    ]},
    { type: "p", content: ["Convrs is built on this exact foundation: each converter ships a Wasm module for its format (image codecs, video/audio engines, document pipelines) and runs the whole conversion in your browser. Once the page loads, your file never touches the network again. The Wasm sandbox means that even though the code is untrusted-universe software, it interacts with your machine only through the narrow, explicit interfaces the page provides."] },
    { type: "note", tone: "success", title: "Sandboxed by design", content: ["Even the most powerful native code running as Wasm still cannot touch your filesystem, camera, or network silently. The browser's sandbox is the same one your page already uses — Wasm adds capability, not access."] },

    { type: "h2", content: ["The expanding frontier: threads, SIMD, and beyond"] },
    { type: "p", content: ["WebAssembly's capabilities are broadening with the platform. Threads let Wasm use multiple CPU cores for parallel encoding and transcoding, a huge win for video and image work. SIMD (single-instruction multiple-data) lets the same operation process 16 pixels at once, accelerating codecs further. The WebAssembly System Interface (WASI) describes how Wasm modules talk to I/O, which is what lets the same code run on servers, edge devices, and embedded targets — opening the door to portable, tamper-resistant workloads everywhere."] },
    { type: "p", content: ["There are still honest limitations. Wasm memory is bounded (typically up to a few gigabytes), very large files can hit practical ceilings, garbage-collected languages require extra scaffolding, and the toolchain learning curve is real. But for the conversion and encoding workloads that dominate everyday tooling, those limits rarely bind."] },

    { type: "h2", content: ["What this means for the future of the web"] },
    { type: "p", content: ["WebAssembly has turned the browser into the universal applications platform it was always meant to be. Installable desktop apps now ship as web pages; server code moved to the client; native ecosystems and the open web converge. For users, the quiet consequence is the most valuable one: software that does the hard work on your own machine, treats your files as yours, and never needs to ask where to store them — because it doesn't store them anywhere."] },
    { type: "p", content: ["The next time a tool tells you everything happens in your browser, check what is really powering it. If it is handling video, PDFs, images, or data at scale quickly, there is a good chance WebAssembly is doing the heavy lifting — and doing it exactly where your data already lives."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "WebAssembly Tarayıcı Yeteneklerini Nasıl Değiştiriyor",
    eyebrow: "WebAssembly",
    description:
      "WebAssembly, C++ ve Rust kodunun tarayıcıda neredeyse yerel hızda çalışmasını sağlar. Bu açık standardın kodekleri, PDF motorlarını ve tamamen istemci tarafı uygulamaları nasıl güçlendirdiğini öğrenin.",
    excerpt:
      "Yıllarca tarayıcı yalnızca JavaScript çalıştırdı. WebAssembly artık C++ ve Rust gibi yerel kodun bir sekmede neredeyse yerel hızda çalışmasını sağlıyor. İşte bu, nelerin önünü açıyor.",
    readingTime: "8 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Tarayıcılar yazılım çalıştırmak için değil, belge görüntülemek için tasarlandı. Web'in ilk yirmi yılında gerçek bir hesaplama gücü istiyorsanız — video dönüştürme, PDF işleme, ciddi sıkıştırma — işi bir sunucuya göndermek zorundaydınız. 2017'de olgunlaşan açık bir standart olan WebAssembly bu kuralı sessizce yeniden yazdı. Bugün C++ ve Rust kodu tarayıcı sekmenizin içinde neredeyse yerel hızda çalışıyor ve 'web uygulaması' ile 'masaüstü uygulaması' arasındaki sınır neredeyse ortadan kalktı."] },
    { type: "p", content: ["Bu makale; WebAssembly'in (Wasm) gerçekte ne olduğunu, neden hızlı olduğunu, bugün nerelerde kullanıldığını ve Convrs gibi gerçekten istemci tarafı gizlilik araçlarını nasıl mümkün kıldığını anlatıyor."] },

    { type: "h2", content: ["Tarayıcının özgün performans tavanı"] },
    { type: "p", content: ["Web, JavaScript üzerine kuruldu. JavaScript son derece yetenekli bir dil ama yorumlanma (veya tam zamanında derlenme) biçimi, öngörülebilir ve yerel hıza yakın performansı zorlaştırır. Saniyede bir milyon piksel işleyen bir JavaScript döngüsü, aynı döngü C++'ta zar zor fark edilecek bir duvara çarpar."] },
    { type: "p", content: ["Yıllarca projeler bu duvara akıllı hilelerle direndi: asm.js adı verilen JavaScript'in katı bir alt kümesi, öngörülebilir tür kalıplarını kullanarak C/C++ kodunu Firefox'ta şaşırtıcı derecede hızlı çalıştırabiliyordu. Ama asm.js gerçek bedelleri olan bir geçici çözümdü: şişkin dosyalar, hantal araçlar ve yerelin altında performans."] },

    { type: "h2", content: ["WebAssembly nedir — ve hızını nasıl kazanır"] },
    { type: "p", content: ["WebAssembly, yeni sözdizimiyle JavaScript değildir. C, C++, Rust, Go ve giderek Swift ile Kotlin gibi diller için bir derleme hedefi olacak şekilde tasarlanmış, bağımsız, düşük seviyeli bir bayt kod biçimidir. Bir araç zinciri (genellikle Emscripten veya wasm-bindgen) yerel kaynağınızı kompakt bir .wasm modülüne derler; tarayıcı da bunu kendi yalıtımında (sandbox) yükler ve çalıştırır."] },
    { type: "p", content: ["Üç tasarım tercihi Wasm'e hızını kazandırır:"] },
    { type: "list", items: [
      [{ text: "Ayrıştırma aşaması yok. ", bold: true }, { text: "JavaScript çalışmadan önce ayrıştırılmalıdır; Wasm modülleri önceden derlenmiş ikili biçimdedir ve milisaniyeler içinde çözülür." }],
      [{ text: "Tam zamanında yerel kod. ", bold: true }, { text: "Tarayıcılar Wasm'i yükleme anında makine koduna çevirir ve neredeyse hiç dinamik tahmin yapmadan yerel hıza yakın yürütür." }],
      [{ text: "Doğrusal bellek. ", bold: true }, { text: "Wasm, düz ve yalıtılmış bir bellek arabelleği üzerinde çalışır; bu, derlenmiş dillerin belleği yönetme biçimiyle birebir örtüşür ve çöp toplama duraklamaları olmadan çalışmayı sağlar." }],
    ]},
    { type: "code", lang: "text", content: "// Küçük bir tat: JS'ye Wasm dışa aktarımı olarak sunulan derlenmiş bir C işlevi.\n// Tarayıcıda çağırmak normal bir JS sözü gibi hissettirir:\nconst { instance } = await WebAssembly.instantiateStreaming(fetch('./fast.wasm'));\nconst result = instance.exports.my_native_function(input);" },
    { type: "p", content: ["Sonuç, performansın — görüntü sıkıştırma, ses çözme, PDF yerleşimi — birçok gerçek iş yükünde yerel bir çalıştırılabilir dosyanın %80–95'i içine girmesidir. Son kullanıcı için 'sunucu çiftliğinde çalışır' ile 'sekmenizde çalışır' arasındaki fark neredeyse görünmez olur."] },

    { type: "h2", content: ["Kodeklerden veritabanlarına: Wasm gerçekte neyi güçlendiriyor"] },
    { type: "p", content: ["Wasm dağıtımlarının listesi modern internetin arka ucunu anımsatıyor:"] },
    { type: "list", items: [
      [{ text: "Medya kodekleri. ", bold: true }, { text: "libvpx (WebP/VP8/VP9), libavcodec (video/ses) ve libvips, mozjpeg gibi görüntü kütüphaneleri tarayıcıda çalışır; sunucusuz anında dönüştürme sağlar." }],
      [{ text: "Belge motorları. ", bold: true }, { text: "PDF işleyiciler, belge önizlemeleri ve tipografi motorları." }],
      [{ text: "Sıkıştırma. ", bold: true }, { text: "zlib, zstd, brotli ve gzip; WebAssembly tarayıcıların ve CDN'lerin daha iyi sıkıştırma müzakere etmesini bile sağlar." }],
      [{ text: "Tarayıcıda SQLite. ", bold: true }, { text: "Yerel olarak çalışan, istediğinizde eşitlenen tam bir ilişkisel veritabanı." }],
      [{ text: "Oyunlar ve grafikler. ", bold: true }, { text: "Unity ve Unreal Wasm'e derlenir; karmaşık 3D sahne bir sekmede çalışır." }],
      [{ text: "Yapay zekâ ve görüş. ", bold: true }, { text: "ONNX Runtime ve onnxruntime-web, model çıkarımını cihazınızda çalıştırır; girdiler özel kalır." }],
    ]},
    { type: "p", content: ["Tüm bu durumlarda desen aynıdır: savaşta kanıtlanmış yerel bir kütüphane, bir kez derlenmiş, tarayıcıya gönderilmiş, yerel olarak çalıştırılmış — yol üzerinde hiç sunucu yok."] },

    { type: "h2", content: ["WebAssembly neden istemci tarafı gizliliğin motorudur"] },
    { type: "p", content: ["Wasm'in gizlilik araçları üzerindeki pratik etkisi abartılamaz. Wasm'den önce tarayıcıda ciddi dosya işleme ya her şeyi sıfırdan JavaScript'te yazmak (yavaş, dünyayı yeniden kurmak) ya da işlemeyi sunucuya göndermek (özel veri cihazı terk eder) demekti. Wasm bu ödünleşimi kırar:"] },
    { type: "list", items: [
      ["Yıllarca süren optimizasyon doğrudan aktarılır. Tüm sektörün yıllarca optimize ettiği kodekler ve kütüphaneler bir sekmede anında kullanılabilir."],
      ["Büyük girdiler mümkün olur. Yüzlerce megabaytlık dosyalar, tek başına JavaScript'in zorlanacağı yerlerde yerel olarak işlenebilir."],
      ["Çevrimdışı, özel uygulamalar normalleşir. Dönüştürme araçları bağlantı olmadan çalışır, çünkü hesaplama hiçbir zaman bağlantı gerektirmemiştir."],
    ]},
    { type: "p", content: ["Convrs tam bu temel üzerine kuruludur: her dönüştürücü kendi biçimi için bir Wasm modülü taşır (görüntü kodekleri, video/ses motorları, belge işlem hatları) ve dönüşümün tamamını tarayıcınızda çalıştırır. Sayfa yüklendikten sonra dosyanız ağa bir daha dokunmaz. Wasm yalıtımı, kodun güvenilmez evren yazılımı bile olsa makinenizle yalnızca sayfanın sağladığı dar ve açık arayüzler üzerinden etkileşmesini sağlar."] },
    { type: "note", tone: "success", title: "Tasarım gereği yalıtılmış", content: ["Wasm olarak çalışan en güçlü yerel kod bile dosya sisteminize, kameranıza veya ağınıza sessizce dokunamaz. Tarayıcı sandbox'ı sayfanızın zaten kullandığı sandbox'tır — Wasm yetenek katar, erişim değil."] },

    { type: "h2", content: ["Genişleyen sınır: iş parçacıkları, SIMD ve ötesi"] },
    { type: "p", content: ["WebAssembly'in yetenekleri platformla birlikte genişliyor. İş parçacıkları, Wasm'in paralel kodlama ve dönüştürme için birden çok CPU çekirdeği kullanmasını sağlar; bu, video ve görüntü işleri için büyük bir kazanımdır. SIMD (tek komut çoklu veri), aynı işlemin 16 pikseli birden işlemesini sağlayarak kodekleri daha da hızlandırır. WebAssembly System Interface (WASI), Wasm modüllerinin G/Ç ile nasıl konuştuğunu tanımlar; bu da aynı kodun sunucularda, uç cihazlarda ve gömülü hedeflerde çalışmasını sağlar — taşınabilir, kurcalamaya dayanıklı iş yüklerinin kapısını açar."] },
    { type: "p", content: ["Hâlâ dürüst sınırlar var. Wasm belleği sınırlıdır (tipik olarak birkaç gigabayta kadar), çok büyük dosyalar pratik tavanlara takılabilir, çöp toplamalı diller ekstra iskele gerektirir ve araç zinciri öğrenme eğrisi gerçektir. Ama günlük araçlara hâkim olan dönüştürme ve kodlama iş yüklerinde bu sınırlar nadiren bağlar."] },

    { type: "h2", content: ["Web'in geleceği için bu ne anlama geliyor"] },
    { type: "p", content: ["WebAssembly, tarayıcıyı her zaman olması istenen evrensel uygulama platformuna dönüştürdü. Kurulabilir masaüstü uygulamaları artık web sayfası olarak dağıtılıyor; sunucu kodu istemciye taşındı; yerel ekosistemler ve açık web yakınsıyor. Kullanıcılar için sessiz sonuç en değerli olanıdır: zor işi kendi makinenizde yapan, dosyalarınıza sizinmiş gibi davranan ve ne yapacağını sorması gerekmeyen yazılım — çünkü dosyaları hiçbir yerde saklamaz."] },
    { type: "p", content: ["Bir sonraki sefer bir araç her şeyin tarayıcınızda olduğunu söylediğinde, neyin gerçekten ona güç verdiğini kontrol edin. Video, PDF, görüntü veya veriyi ölçekte hızlı işliyorsa, ağır işi yapanın WebAssembly olma ihtimali yüksektir — ve işi tam da verinizin zaten yaşadığı yerde yapıyordur."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Wie WebAssembly die Leistungsfähigkeit des Browsers verändert",
    eyebrow: "WebAssembly",
    description:
      "WebAssembly lässt C++- und Rust-Code im Browser mit nahezu nativer Geschwindigkeit laufen. Erfahren Sie, wie dieser offene Standard Codecs, PDF-Engines und rein client-seitige Apps antreibt.",
    excerpt:
      "Jahrzehntelang lief im Browser nur JavaScript. WebAssembly lässt nun nativen Code — C++, Rust, Go — in einem Tab fast nativ laufen. Das wird dadurch möglich.",
    readingTime: "8 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Browser wurden gebaut, um Dokumente anzuzeigen, nicht um Software auszuführen. In den ersten zwei Jahrzehnten des Webs mussten Sie für echte Rechenleistung — Videotranskodierung, PDF-Rendering, ernsthafte Kompression — die Arbeit an einen Server schicken. WebAssembly, ein 2017 abgeschlossener offener Standard, hat diese Regel leise neu geschrieben. Heute läuft C++- und Rust-Code in Ihrem Browser-Tab mit nahezu nativer Geschwindigkeit, und die Grenze zwischen 'Web-App' und 'Desktop-App' ist praktisch verschwunden."] },
    { type: "p", content: ["Dieser Artikel erklärt, was WebAssembly (Wasm) wirklich ist, warum es schnell ist, wo es heute eingesetzt wird und wie es echte client-seitige Datenschutz-Tools wie Convrs ermöglicht."] },

    { type: "h2", content: ["Die ursprüngliche Leistungsgrenze des Browsers"] },
    { type: "p", content: ["Das Web wurde auf JavaScript gebaut. JavaScript ist eine bemerkenswert fähige Sprache, aber die Art, wie es interpretiert (oder just-in-time kompiliert) wird, macht vorhersagbar schnelle, nahezu native Performance schwierig. Eine JavaScript-Schleife, die eine Million Pixel pro Frame verarbeitet, stößt an eine Wand, die dieselbe Schleife in C++ kaum bemerken würde."] },
    { type: "p", content: ["Jahrelang kämpften Projekte gegen diese Wand mit cleveren Tricks: asm.js, eine strikte Teilmenge von JavaScript, ließ C/C++-Code in Firefox extrem schnell laufen, indem es vorhersagbare Typmuster nutzte. Aber asm.js war ein Workaround mit echten Kosten — aufgeblähte Dateien, sperrige Werkzeuge und weiterhin unter nativer Leistung."] },

    { type: "h2", content: ["Was WebAssembly ist — und woher seine Geschwindigkeit kommt"] },
    { type: "p", content: ["WebAssembly ist nicht JavaScript mit neuer Syntax. Es ist ein eigenständiges, low-level Bytecode-Format, das als Compiler-Ziel für Sprachen wie C, C++, Rust, Go und zunehmend Swift und Kotlin konzipiert ist. Eine Toolchain (typischerweise Emscripten oder wasm-bindgen) kompiliert Ihren nativen Quellcode in ein kompaktes .wasm-Modul, das der Browser in seiner eigenen Sandbox lädt und ausführt."] },
    { type: "p", content: ["Drei Design-Entscheidungen geben Wasm seine Geschwindigkeit:"] },
    { type: "list", items: [
      [{ text: "Keine Parse-Phase. ", bold: true }, { text: "JavaScript muss geparst werden, bevor es läuft; Wasm-Module sind vorkompiliertes Binärformat und dekodieren in Millisekunden." }],
      [{ text: "Just-in-time nati­ver Code. ", bold: true }, { text: "Browser übersetzen Wasm beim Laden in Maschinencode und führen es mit kaum dynamischem Raten nahezu nativ aus." }],
      [{ text: "Linearer Speicher. ", bold: true }, { text: "Wasm arbeitet auf einem flachen, sandboxed Speicher-Puffer, der sauber auf die Speicherverwaltung kompilierter Sprachen abbildet — ohne Garbage-Collector-Unterbrechungen." }],
    ]},
    { type: "code", lang: "text", content: "// Ein kleiner Vorgeschmack: eine kompilierte C-Funktion, die als Wasm-Export an JS geht.\n// Der Aufruf fühlt sich im Browser wie eine normale JS-Promise an:\nconst { instance } = await WebAssembly.instantiateStreaming(fetch('./fast.wasm'));\nconst result = instance.exports.my_native_function(input);" },
    { type: "p", content: ["Ergebnis: Die Leistung — Bildkompression, Audio-Dekodierung, PDF-Layout — erreicht in vielen realen Arbeitslasten 80–95 % eines nativen Programms. Für den Endnutzer wird der Unterschied zwischen 'läuft in einer Serverfarm' und 'läuft in Ihrem Tab' nahezu unsichtbar."] },

    { type: "h2", content: ["Von Codecs bis Datenbanken: Was Wasm tatsächlich antreibt"] },
    { type: "p", content: ["Die Liste der Wasm-Bereitstellungen liest sich wie das Backend des modernen Internets:"] },
    { type: "list", items: [
      [{ text: "Media-Codecs. ", bold: true }, { text: "libvpx (WebP/VP8/VP9), libavcodec (Video/Audio) und Bildbibliotheken wie libvips und mozjpeg laufen im Browser und ermöglichen serverlose Sofortkonvertierung." }],
      [{ text: "Dokument-Engines. ", bold: true }, { text: "PDF-Renderer, Dokumentvorschauen und Typografie-Engines." }],
      [{ text: "Kompression. ", bold: true }, { text: "zlib, zstd, brotli und gzip; WebAssembly lässt sogar Browser und CDNs bessere Kompression aushandeln." }],
      [{ text: "SQLite im Browser. ", bold: true }, { text: "Eine vollwertige relationale Datenbank, die lokal läuft und dann synchronisiert, wenn Sie es wünschen." }],
      [{ text: "Spiele und Grafiken. ", bold: true }, { text: "Unity und Unreal kompilieren nach Wasm; komplexe 3D-Szenen laufen in einem Tab." }],
      [{ text: "KI und Bildverarbeitung. ", bold: true }, { text: "ONNX Runtime und onnxruntime-web führen Modell-Inferenz auf Ihrem Gerät aus — Eingaben bleiben privat." }],
    ]},
    { type: "p", content: ["In all diesen Fällen ist das Muster dasselbe: eine erprobte native Bibliothek, einmal kompiliert, an den Browser ausgeliefert, lokal ausgeführt — ohne Server im Pfad."] },

    { type: "h2", content: ["Warum WebAssembly der Motor des client-seitigen Datenschutzes ist"] },
    { type: "p", content: ["Der praktische Einfluss von Wasm auf Datenschutz-Tools ist kaum zu überschätzen. Vor Wasm bedeutete ernsthafte Dateiverarbeitung im Browser entweder, alles von Grund auf in JavaScript zu schreiben (langsam, die Welt neu erfinden), oder die Verarbeitung an einen Server zu schicken (private Daten verlassen das Gerät). Wasm bricht diesen Kompromiss auf:"] },
    { type: "list", items: [
      ["Jahre an Optimierung übertragen sich direkt. Von der ganzen Branche optimierte Codecs und Bibliotheken sind sofort in einem Tab verfügbar."],
      ["Große Eingaben werden machbar. Hunderte-Megabyte-Dateien lassen sich lokal verarbeiten, wo JavaScript allein kämpfen würde."],
      ["Offline- und private Apps werden normal. Konvertierungswerkzeuge funktionieren ohne Verbindung, weil die Berechnung nie eine brauchte."],
    ]},
    { type: "p", content: ["Convrs baut genau auf dieser Grundlage auf: Jeder Konverter bringt ein Wasm-Modul für sein Format mit (Bildcodecs, Video-/Audio-Engines, Dokument-Pipelines) und führt die gesamte Konvertierung in Ihrem Browser aus. Sobald die Seite geladen ist, berührt Ihre Datei das Netzwerk nie wieder. Die Wasm-Sandbox bedeutet: Selbst wenn der Code unvertrustete Software ist, interagiert er mit Ihrem Rechner nur über die schmalen, expliziten Schnittstellen, die die Seite bereitstellt."] },
    { type: "note", tone: "success", title: "Von Natur aus sandboxed", content: ["Selbst mächtigster nativer Code, der als Wasm läuft, kann nicht still auf Ihr Dateisystem, Ihre Kamera oder Ihr Netzwerk zugreifen. Die Browser-Sandbox ist dieselbe, die Ihre Seite ohnehin nutzt — Wasm bringt Fähigkeit, nicht Zugriff."] },

    { type: "h2", content: ["Die wachsende Grenze: Threads, SIMD und darüber hinaus"] },
    { type: "p", content: ["Die Fähigkeiten von WebAssembly erweitern sich mit der Plattform. Threads lassen Wasm mehrere CPU-Kerne für parallele Kodierung und Transkodierung nutzen — ein großer Gewinn für Video und Bildmaterial. SIMD (Single Instruction, Multiple Data) verarbeitet 16 Pixel gleichzeitig und beschleunigt Codecs weiter. Das WebAssembly System Interface (WASI) beschreibt, wie Wasm-Module mit ein-/ausgabe sprechen, und erlaubt so denselben Code auf Servern, Edge-Geräten und Embedded-Zielen — der Weg zu portablen, manipulationsresistenten Arbeitslasten."] },
    { type: "p", content: ["Es gibt weiterhin ehrliche Grenzen. Wasm-Speicher ist begrenzt (typischerweise bis zu einigen Gigabyte), sehr große Dateien stoßen an praktische Obergrenzen, Sprachen mit Garbage Collection brauchen zusätzliches Gerüst, und die Lernkurve der Toolchain ist real. Für die Konvertierungs- und Kodierungs-Workloads, die den Alltag dominieren, binden diese Grenzen aber selten."] },

    { type: "h2", content: ["Was das für die Zukunft des Webs bedeutet"] },
    { type: "p", content: ["WebAssembly hat den Browser in die universelle Anwendungsplattform verwandelt, die er immer sein sollte. Installierbare Desktop-Apps erscheinen jetzt als Webseiten; Servercode zog zum Client; native Ökosysteme und das offene Web konvergieren. Für Nutzer ist die stillste Folge die wertvollste: Software, die die harte Arbeit auf Ihrem eigenen Rechner erledigt, Ihre Dateien als die Ihren behandelt und nie fragen muss, wo sie sie speichern soll — weil sie sie nirgendwo speichert."] },
    { type: "p", content: ["Wenn Ihnen ein Tool das nächste Mal sagt, dass alles in Ihrem Browser passiert, prüfen Sie, was es wirklich antreibt. Wenn es Video, PDFs, Bilder oder Daten schnell in großem Umfang verarbeitet, besteht eine gute Chance, dass WebAssembly die schwere Arbeit macht — und zwar genau dort, wo Ihre Daten bereits leben."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Cómo WebAssembly está cambiando las capacidades del navegador",
    eyebrow: "WebAssembly",
    description:
      "WebAssembly permite que el código C++ y Rust se ejecute en el navegador a velocidad casi nativa. Descubra cómo este estándar abierto impulsa códecs, motores PDF y aplicaciones 100 % del lado del cliente.",
    excerpt:
      "Durante décadas el navegador solo ejecutaba JavaScript. WebAssembly permite ahora que el código nativo — C++, Rust, Go — se ejecute en una pestaña a velocidad casi nativa. Esto es lo que desbloquea.",
    readingTime: "8 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Los navegadores se diseñaron para mostrar documentos, no para ejecutar software. Durante las dos primeras décadas de la web, si quería potencia de cálculo real — transcodificar vídeo, renderizar PDF, compresión seria — tenía que enviar el trabajo a un servidor. WebAssembly, un estándar abierto culminado en 2017, reescribió esa regla en silencio. Hoy, el código C++ y Rust se ejecuta dentro de su pestaña a velocidad casi nativa, y la frontera entre 'aplicación web' y 'aplicación de escritorio' prácticamente ha desaparecido."] },
    { type: "p", content: ["Este artículo explica qué es realmente WebAssembly (Wasm), por qué es rápido, dónde se usa hoy y cómo hace posibles herramientas de privacidad genuinamente locales como Convrs."] },

    { type: "h2", content: ["El techo de rendimiento original del navegador"] },
    { type: "p", content: ["La web se construyó sobre JavaScript. JavaScript es un lenguaje notablemente capaz, pero la forma en que se interpreta (o compila just-in-time) hace difícil conseguir un rendimiento predecible y casi nativo. Un bucle de JavaScript que procesa un millón de píxeles por fotograma choca con un muro que el mismo bucle en C++ apenas notaría."] },
    { type: "p", content: ["Durante años, los proyectos empujaron contra ese muro con trucos ingeniosos: asm.js, un subconjunto estricto de JavaScript, lograba ejecutar código C/C++ rápidísimo en Firefox explotando patrones de tipos predecibles. Pero asm.js era un apaño con costes reales: archivos inflados, herramientas torpes y un rendimiento aún por debajo del nativo."] },

    { type: "h2", content: ["Qué es WebAssembly — y de dónde viene su velocidad"] },
    { type: "p", content: ["WebAssembly no es JavaScript con sintaxis nueva. Es un formato de bytecode independiente y de bajo nivel diseñado como objetivo de compilación para lenguajes como C, C++, Rust, Go y cada vez más Swift y Kotlin. Una cadena de herramientas (normalmente Emscripten o wasm-bindgen) compila su código nativo en un módulo .wasm compacto, que el navegador carga y ejecuta en su propio aislamiento (sandbox)."] },
    { type: "p", content: ["Tres decisiones de diseño dan a Wasm su velocidad:"] },
    { type: "list", items: [
      [{ text: "Sin fase de análisis. ", bold: true }, { text: "JavaScript debe analizarse antes de ejecutarse; los módulos Wasm son binarios precompilados y se decodifican en milisegundos." }],
      [{ text: "Código nativo just-in-time. ", bold: true }, { text: "Los navegadores traducen Wasm a código máquina al cargarlo y lo ejecutan a velocidad casi nativa, casi sin conjeturas dinámicas." }],
      [{ text: "Memoria lineal. ", bold: true }, { text: "Wasm opera sobre un búfer de memoria plano y aislado, que encaja directamente con cómo los lenguajes compilados gestionan la memoria y permite ejecutarse sin pausas del recolector de basura." }],
    ]},
    { type: "code", lang: "text", content: "// Una pequeña muestra: una función C compilada, expuesta a JS como exportación Wasm.\n// Llamarla en el navegador se siente como una Promise JS normal:\nconst { instance } = await WebAssembly.instantiateStreaming(fetch('./fast.wasm'));\nconst result = instance.exports.my_native_function(input);" },
    { type: "p", content: ["El resultado: el rendimiento — compresión de imagen, decodificación de audio, maquetado de PDF — se acerca al 80–95 % de un ejecutable nativo en muchas cargas reales. Para el usuario final, la diferencia entre 'corre en una granja de servidores' y 'corre en su pestaña' se vuelve casi invisible."] },

    { type: "h2", content: ["De códecs a bases de datos: qué alimenta realmente Wasm"] },
    { type: "p", content: ["La lista de despliegues de Wasm se lee como el backend del internet moderno:"] },
    { type: "list", items: [
      [{ text: "Códecs multimedia. ", bold: true }, { text: "libvpx (WebP/VP8/VP9), libavcodec (vídeo/audio) y librerías de imagen como libvips y mozjpeg corren en el navegador, permitiendo conversión instantánea sin servidor." }],
      [{ text: "Motores de documentos. ", bold: true }, { text: "Renderizadores de PDF, vistas previas de documentos y motores de tipografía." }],
      [{ text: "Compresión. ", bold: true }, { text: "zlib, zstd, brotli y gzip; WebAssembly permite incluso a navegadores y CDNs negociar mejor compresión." }],
      [{ text: "SQLite en el navegador. ", bold: true }, { text: "Una base de datos relacional completa que corre localmente y se sincroniza cuando usted elige." }],
      [{ text: "Juegos y gráficos. ", bold: true }, { text: "Unity y Unreal compilan a Wasm; escenas 3D complejas corren en una pestaña." }],
      [{ text: "IA y visión. ", bold: true }, { text: "ONNX Runtime y onnxruntime-web ejecutan inferencia de modelos en su dispositivo, manteniendo privadas las entradas." }],
    ]},
    { type: "p", content: ["En todos estos casos el patrón es el mismo: una librería nativa probada en batalla, compilada una vez, enviada al navegador, ejecutada localmente — sin servidor en el camino."] },

    { type: "h2", content: ["Por qué WebAssembly es el motor de la privacidad del lado del cliente"] },
    { type: "p", content: ["El efecto práctico de Wasm sobre las herramientas de privacidad es difícil de exagerar. Antes de Wasm, procesar archivos en serio en el navegador significaba o escribirlo todo desde cero en JavaScript (lento, reinventar la rueda) o enviar el procesamiento a un servidor (los datos privados abandonan el dispositivo). Wasm rompe esa disyuntiva:"] },
    { type: "list", items: [
      ["Años de optimización se transfieren directamente. Los códecs y librerías optimizados por toda la industria durante años están disponibles al instante en una pestaña."],
      ["Las entradas grandes se vuelven factibles. Archivos de cientos de megabytes pueden procesarse localmente donde JavaScript solo flaquearía."],
      ["Las apps privadas sin conexión se vuelven normales. Las herramientas de conversión funcionan sin conexión porque el cálculo nunca la necesitó."],
    ]},
    { type: "p", content: ["Convrs se construye sobre esta base exacta: cada convertidor lleva un módulo Wasm para su formato (códecs de imagen, motores de vídeo/audio, canalizaciones de documentos) y ejecuta toda la conversión en su navegador. Una vez cargada la página, su archivo no vuelve a tocar la red. El aislamiento de Wasm significa que, aunque el código sea software de universo no confiable, interactúa con su máquina solo a través de las interfaces estrechas y explícitas que la página proporciona."] },
    { type: "note", tone: "success", title: "Aislado por diseño", content: ["Incluso el código nativo más potente que corre como Wasm no puede tocar su sistema de archivos, cámara o red en silencio. El sandbox del navegador es el mismo que su página ya usa — Wasm añade capacidad, no acceso."] },

    { type: "h2", content: ["La frontera en expansión: hilos, SIMD y más allá"] },
    { type: "p", content: ["Las capacidades de WebAssembly se amplían con la plataforma. Los hilos permiten que Wasm use varios núcleos de CPU para codificar y transcodificar en paralelo, una gran victoria para vídeo e imagen. SIMD (una instrucción, varios datos) procesa 16 píxeles a la vez, acelerando aún más los códecs. La WebAssembly System Interface (WASI) describe cómo los módulos Wasm hablan con la entrada/salida, lo que permite que el mismo código corra en servidores, dispositivos de borde y objetivos embebidos — abriendo la puerta a cargas de trabajo portables y resistentes a la manipulación."] },
    { type: "p", content: ["Aún hay límites honestos. La memoria de Wasm está acotada (normalmente hasta varios gigabytes), los archivos muy grandes pueden chocar con topes prácticos, los lenguajes con recolector de basura requieren andamiaje extra y la curva de aprendizaje de la cadena de herramientas es real. Pero para las cargas de conversión y codificación que dominan el uso cotidiano, esos límites rara vez importan."] },

    { type: "h2", content: ["Qué significa esto para el futuro de la web"] },
    { type: "p", content: ["WebAssembly ha convertido el navegador en la plataforma universal de aplicaciones que siempre debió ser. Las apps de escritorio instalables ahora se entregan como páginas web; el código de servidor se trasladó al cliente; los ecosistemas nativos y la web abierta convergen. Para los usuarios, la consecuencia silenciosa es la más valiosa: software que hace el trabajo duro en su propia máquina, trata sus archivos como suyos y nunca necesita preguntar dónde guardarlos — porque no los guarda en ninguna parte."] },
    { type: "p", content: ["La próxima vez que una herramienta le diga que todo ocurre en su navegador, compruebe qué lo impulsa realmente. Si maneja vídeo, PDF, imágenes o datos a escala con rapidez, es muy probable que WebAssembly esté haciendo el trabajo pesado — y haciéndolo exactamente donde sus datos ya viven."] },
  ],
};

const guide: GuideDefinition = {
  slug: "webassembly-browser-capabilities",
  content: { en, tr, de, es },
};

export default guide;