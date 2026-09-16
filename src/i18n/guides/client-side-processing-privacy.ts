import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Why Client-Side Processing Is the Future of Data Privacy",
    eyebrow: "Privacy",
    description:
      "Client-side processing runs entirely in your browser — nothing is uploaded, stored, or shared. Learn why in-browser, WebAssembly-powered apps are becoming the default for privacy-conscious users.",
    excerpt:
      "When an app processes your data on your own device, there is nothing on a server to leak, subpoena, or lose. Here is why that model is becoming the standard.",
    readingTime: "9 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["For two decades, the default way to do almost anything online was the same: upload your files to someone else's server, let their software process them, and download the result. It is a model that built the modern web — and it is also the model that keeps leaking our data. A growing counter-movement is restoring an older, simpler idea: process the data where it already lives, on the user's own device."] },
    { type: "p", content: ["Convrs is built on exactly that principle. Every one of its 60+ tools converts files in-browser — nothing is uploaded, nothing is stored, nothing is monitored. This article explains why client-side processing is quietly becoming the future of data privacy, what makes it technically possible today, and where its limits still lie."] },

    { type: "h2", content: ["Why the upload-and-process model was never the safe default"] },
    { type: "p", content: ["Uploading a file is an act of trust. You are handing a copy of something private to a third party and asking them to keep it safe — and every copy is a new point of failure. There are several structural reasons why server-side processing keeps disappointing users:"] },
    { type: "list", items: [
      ["The data is collected even when nothing bad happens. Your file sits on a disk somewhere, in a database, or in a backup, creating a record that exists regardless of what you intended."],
      ["Breaches are inevitable, not exceptional. Files stored on servers become part of the target surface for attackers; the larger the vault, the more attractive it is."],
      ["Reuse is invisible. Stored data can be mined for training sets, ad profileing, or analytics with no visible change to the user experience."],
      ["Legal exposure grows. A server in one jurisdiction can be subject to warrants, subpoenas, and data-retention laws that you never agreed to."],
    ]},
    { type: "p", content: ["None of this requires malicious intent. A smart, well-managed company can still be compromised, acquired, or forced to change its policies. The only data that cannot be breached, mined, or subpoenaed is data that was never collected in the first place."] },

    { type: "h2", content: ["What 'client-side processing' really means"] },
    { type: "p", content: ["Client-side processing means the software you need — the decoder, the encoder, the transform — is delivered to your browser as code, and runs on your hardware. Your file is read into memory locally, processed locally, and the result is written back to your disk. The network is used exactly once: to load the page."] },
    { type: "p", content: ["Three technologies make this viable for real workloads:"] },
    { type: "list", items: [
      [{ text: "JavaScript", bold: true }, { text: " for business logic and UI — fast enough for text, JSON, CSV, and small-media transforms." }],
      [{ text: "WebAssembly", bold: true }, { text: " for heavy lifting — the same native codecs and compression libraries that power server tools, compiled to run in the browser at near-native speed." }],
      [{ text: "On-device APIs", bold: true }, { text: " like the File System Access API, canvas, and Web Workers — letting apps read and save files without ever sending them anywhere." }],
    ]},
    { type: "p", content: [{ text: "With WebAssembly, a PDF renderer, a video codec, or an image encoder that was written in C++ or Rust can run unmodified (or nearly so) inside a tab. The browser therefore becomes a portable, sandboxed, hardware-accelerated runtime — not just a document viewer.", }] },

    { type: "h2", content: ["The privacy properties you get almost for free"] },
    { type: "p", content: ["When processing happens on-device, several privacy properties follow mechanically from the architecture, rather than from a company's promises:"] },
    { type: "list", items: [
      [{ text: "No data at rest. ", bold: true }, { text: "There is no server disk holding copies of your files, so there is nothing to lose in a breach." }],
      [{ text: "No data in transit. ", bold: true }, { text: "Your file never leaves your device, so there is no packet stream to intercept on the way." }],
      [{ text: "No identity link. ", bold: true }, { text: "No upload means no account, no API key, and no reason to associate a conversion with a person." }],
      [{ text: "No retention schedule. ", bold: true }, { text: "Nothing is kept, so no retention window needs to be negotiated or disclosed — and nothing survives your session." }],
      [{ text: "Workable offline. ", bold: true }, { text: "Once the page is loaded, conversions can run with the connection off, which is both a privacy and a reliability win." }],
    ]},
    { type: "note", tone: "success", title: "Privacy by architecture, not by policy", content: ["Any vendor can publish a privacy policy that says 'we delete your files after 24 hours.' Only an architecture where the file never reaches the server can make that statement a non-issue. That is the difference between trusting a promise and trusting a design."] },

    { type: "h2", content: ["Threading the needle: why this matters for regulation"] },
    { type: "p", content: ["Privacy regulation (GDPR, CCPA, KVKK in Turkey, and the growing global set of data-protection laws) is built on concepts like 'processing', 'controller', and 'data transfer.' A tool that processes files on the user's own device changes the entire conversation: the 'processing' is done by software that users run themselves, for their own purposes, on their own hardware."] },
    { type: "p", content: ["That does not make regulation irrelevant — the tool's code is still distributed to users, and telemetry must still be handled responsibly. But it removes the largest and riskiest category of personal-data handling from the vendor's plate entirely: user content. Instead of engineering around legal obligations to minimize, delete, and protect copies of user files, the architecture simply never creates those copies."] },

    { type: "h2", content: ["What WebAssembly changes"] },
    { type: "p", content: ["Ten years ago 'client-side' meant 'maybe fast enough for small text.' Video transcoding, PDF parsing, and high-quality image compression require native-speed loops. That is precisely the gap WebAssembly fills."] },
    { type: "p", content: ["A browser tab now runs compiled C/C++/Rust codec libraries — libvpx, libavcodec, zlib, sharp/libvips, WASM ports of ImageMagick and PDF engines — at 80–95% of native performance in many cases. All of that code executes inside the browser's sandbox: it can access only what the page is given, and it is paused the moment you close the tab. The practical result is that the same quality of conversion you expect from a desktop program arrives in-browser, with no vendor ever touching the file."] },
    { type: "table", columns: ["Concern", "Server-side upload", "In-browser (WASM)"], rows: [
      ["File location during processing", "On a third-party server", "On the user's device"],
      ["Copies created", "One or more on disk", "None outside the browser"],
      ["Breach exposure", "All stored files at risk", "Nothing stored to steal"],
      ["Network traffic", "Upload + download", "Page load only"],
      ["Works offline", "No", "Yes"],
    ]},

    { type: "h2", content: ["Where client-side processing is still limited"] },
    { type: "p", content: ["Honesty requires naming the trade-offs. Client-side processing is not a universal answer:"] },
    { type: "list", items: [
      ["Heavy media jobs can be slow on low-end hardware, since they compete for the user's CPU rather than a data-center fleet."],
      ["WebAssembly memory is constrained compared to a server, so enormous files can hit practical limits."],
      ["Code must be shipped to the browser, which means a larger initial download and a need to keep WASM bundles updated."],
      ["Not every service can be rebuilt client-side — collaborative editing, public sharing, and AI inference over cloud GPUs still need servers."],
    ]},
    { type: "p", content: ["The honest framing is not 'client-side replaces everything.' It is 'for private, one-user file work, the client is the right place to do it' — and that is a large, high-value category that includes most everyday conversions."] },

    { type: "h2", content: ["How Convrs applies the model"] },
    { type: "p", content: ["Every Convrs converter — image, audio, video, document, developer utilities — loads a WebAssembly engine into your tab and does the work locally. The feedback loop is short: convert 50 photos to WebP in seconds, watch it run with the network disabled, and get results that never touched a server."] },
    { type: "list", items: [
      ["No sign-up, no account, no API key — because there is nothing server-side to authenticate against."],
      ["No watermarks or obscure storage — the output is written straight back to your device."],
      ["Honest telemetry — nothing tracks the content of your files; only anonymous, consent-gated page analytics exist, which you can reject."],
    ]},
    { type: "note", tone: "warning", title: "A simple privacy test", content: ["Turn off your Wi-Fi, load any Convrs page, convert a file, and watch it succeed. That is the acid test of a genuinely client-side tool — and a fast way to sort honest tools from ones that merely claim to respect your data."] },

    { type: "h2", content: ["The road ahead"] },
    { type: "p", content: ["The trend is unmistakable. Browsers are getting faster, WebAssembly is gaining threads, SIMD, and garbage-collection support, and more native libraries ship WASM ports every year. Meanwhile, regulations and users are both demanding less collection, not more."] },
    { type: "p", content: ["Client-side processing is not a gimmick bolted onto a server-backed product — it is an architectural stance: your data is yours, and the most respectful thing software can do is not make a copy of it. That stance is becoming both technically viable and socially expected. The future of data privacy is not better promises about what happens to your uploads. It is having nothing to upload at all."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "İstemci Tarafında İşleme Neden Veri Gizliliğinin Geleceğidir",
    eyebrow: "Gizlilik",
    description:
      "İstemci tarafında işleme tamamen tarayıcınızda çalışır — hiçbir şey yüklenmez, saklanmaz veya paylaşılmaz. WebAssembly destekli tarayıcı içi uygulamaların neden gizliliğe duyarlı kullanıcıların tercihi haline geldiğini öğrenin.",
    excerpt:
      "Bir uygulama verinizi kendi cihazınızda işlediğinde sızacak, el konulacak veya kaybolacak hiçbir sunucu kopyası yoktur. İşte bu model neden standart hâline geliyor.",
    readingTime: "9 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Yirmi yıl boyunca internet üzerinde herhangi bir şeyi yapmanın varsayılan yolu aynıydı: dosyalarınızı başka birinin sunucusuna yükleyin, yazılımının işlemesine izin verin ve sonucu indirin. Bu model modern web'i inşa etti — ve verilerimizin sürekli sızmasının da sebebi. Büyüyen bir karşı hareket ise daha eski ve daha basit bir fikri geri getiriyor: veriyi zaten yaşadığı yer olan kullanıcının kendi cihazında işlemek."] },
    { type: "p", content: ["Convrs tam olarak bu ilke üzerine kuruldu. 60'tan fazla aracının her biri dosyaları tarayıcıda dönüştürür — hiçbir şey yüklenmez, saklanmaz veya izlenmez. Bu makale; istemci tarafında işlemin neden veri gizliliğinin geleceği hâline geldiğini, bugün bunu teknik olarak mümkün kılan şeyi ve sınırlarının nerede kaldığını anlatıyor."] },

    { type: "h2", content: ["Yükle-ve-işle modeli neden hiçbir zaman güvenli varsayılan olmadı"] },
    { type: "p", content: ["Dosya yüklemek bir güven eylemidir. Özel bir şeyin kopyasını üçüncü bir tarafa teslim edip onun güvenli tutmasını istersiniz — ve her kopya yeni bir hata noktasıdır. Sunucu tarafında işlemenin kullanıcıları sürekli hayal kırıklığına uğratmasının birkaç yapısal nedeni var:"] },
    { type: "list", items: [
      ["Veri, kötü bir şey olmasa bile toplanır. Dosyanız bir diskte, veritabanında veya yedekte durur; niyetiniz ne olursa olsun var olan bir kayıt yaratır."],
      ["İhlaller istisna değil, kaçınılmazdır. Sunucularda saklanan dosyalar saldırganların hedef yüzeyinin parçasıdır; kasa büyüdükçe cazibesi de artar."],
      ["Yeniden kullanım görünmezdir. Saklanan veriler; kullanıcı deneyiminde görünür bir değişiklik olmadan eğitim setlerine, reklam profilciliğine veya analitiğe beslenebilir."],
      ["Yasal maruziyet büyür. Bir sunucu, sizin kabul etmediğiniz arama emirlerine, mahkeme celplerine ve veri saklama yasalarına tabi olabilir."],
    ]},
    { type: "p", content: ["Bunların hiçbiri kötü niyet gerektirmez. Akıllıca yönetilen iyi bir şirket bile ele geçirilebilir, satın alınabilir veya politikalarını değiştirmek zorunda kalabilir. İhlal edilemeyecek, madencilik yapılamayacak veya celp edilemeyecek tek veri, baştan hiç toplanmamış veridir."] },

    { type: "h2", content: ["'İstemci tarafında işleme' gerçekte ne demek"] },
    { type: "p", content: ["İstemci tarafında işleme, ihtiyacınız olan yazılımın — kod çözücü, kodlayıcı, dönüşüm — tarayıcınıza kod olarak teslim edilip kendi donanımınızda çalışması demektir. Dosyanız belleğe yerel olarak okunur, yerel olarak işlenir ve sonuç diskinize geri yazılır. Ağ tam olarak bir kez, sayfayı yüklemek için kullanılır."] },
    { type: "p", content: ["Üç teknoloji bu modeli gerçek iş yükleri için uygulanabilir kılıyor:"] },
    { type: "list", items: [
      [{ text: "JavaScript", bold: true }, { text: " — iş mantığı ve arayüz için; metin, JSON, CSV ve küçük medya dönüşümleri için yeterince hızlı." }],
      [{ text: "WebAssembly", bold: true }, { text: " — ağır işler için; sunucu araçlarına güç veren aynı yerel kodekleri ve sıkıştırma kütüphanelerini derleyip tarayıcıda neredeyse yerel hızda çalıştırır." }],
      [{ text: "Cihaz üstü API'ler", bold: true }, { text: " — File System Access API, canvas ve Web Workers gibi; dosyaları hiçbir yere göndermeden okutup kaydettirir." }],
    ]},
    { type: "p", content: ["WebAssembly sayesinde C++ veya Rust ile yazılmış bir PDF işleyici, video kodeki veya görüntü kodlayıcı, bir sekmenin içinde değiştirilmeden (veya çok az değişiklikle) çalışabilir. Tarayıcı böylece taşınabilir, yalıtılmış (sandboxed) ve donanım hızlandırmalı bir çalışma zamanı hâline gelir — yalnızca bir belge görüntüleyici değil."] },

    { type: "h2", content: ["Neredeyse bedavaya elde ettiğiniz gizlilik özellikleri"] },
    { type: "p", content: ["İşleme cihazda gerçekleştiğinde bazı gizlilik özellikleri, şirketin vaatlerinden değil mimarinin kendisinden mekanik olarak doğar:"] },
    { type: "list", items: [
      [{ text: "Hareketsiz veri yok. ", bold: true }, { text: "Dosyalarınızın kopyalarını tutan bir sunucu diski yoktur; ihlalde kaybedilecek bir şey de yoktur." }],
      [{ text: "İletimde veri yok. ", bold: true }, { text: "Dosyanız cihazınızdan asla çıkmaz; yolda ele geçirilecek bir paket akışı yoktur." }],
      [{ text: "Kimlik bağlantısı yok. ", bold: true }, { text: "Yükleme olmayınca hesap, API anahtarı ve bir dönüşümü kişiyle ilişkilendirme nedeni de yoktur." }],
      [{ text: "Saklama takvimi yok. ", bold: true }, { text: "Hiçbir şey tutulmaz; müzakere edilecek veya açıklanacak bir saklama süresi ve oturumunuzdan sonra yaşayan kayıt yoktur." }],
      [{ text: "Çevrimdışı çalışır. ", bold: true }, { text: "Sayfa yüklendikten sonra dönüştürmeler bağlantı kapalıyken de çalışır — hem gizlilik hem güvenilirlik kazancı." }],
    ]},
    { type: "note", tone: "success", title: "Politika ile değil, mimariyle gizlilik", content: ["Her satıcı 'dosyalarınızı 24 saat sonra siliyoruz' diyen bir gizlilik politikası yayınlayabilir. Dosyanın sunucuya hiç ulaşmamasını yalnızca bir mimari garantileyebilir. Vaatlere güvenmekle tasarıma güvenmek arasındaki fark budur."] },

    { type: "h2", content: ["İğneyi deliğe geçirmek: düzenlemeler için neden önemli"] },
    { type: "p", content: ["Gizlilik düzenlemeleri (GDPR, CCPA, Türkiye'de KVKK ve dünya genelinde büyüyen veri koruma yasaları) 'işleme', 'veri sorumlusu' ve 'aktarım' gibi kavramlar üzerine kuruludur. Dosyaları kullanıcının kendi cihazında işleyen bir araç tüm tartışmayı değiştirir: 'işleme', kullanıcıların kendi donanımlarında kendi amaçları için çalıştırdığı yazılımla yapılır."] },
    { type: "p", content: ["Bu, düzenlemeyi gereksiz kılmaz — aracın kodu yine de kullanıcılara dağıtılır ve telemetri yine de sorumlu yönetilmelidir. Ama kullanıcı verisinin en büyük ve en riskli kategorisini satıcının tabağından tamamen alır: kullanıcı içeriği. Yasal yükümlülükler etrafında mühendislik yapıp kullanıcı dosyalarının kopyalarını en aza indirip, silip, korumak yerine; mimari o kopyaları hiç yaratmaz."] },

    { type: "h2", content: ["WebAssembly neyi değiştiriyor"] },
    { type: "p", content: ["On yıl önce 'istemci tarafı' 'belki küçük metinler için yeterli' demekti. Video dönüştürme, PDF ayrıştırma ve yüksek kaliteli görüntü sıkıştırma, yerel hıza yakın döngüler gerektirir. İşte boşluğu dolduran tam olarak WebAssembly."] },
    { type: "p", content: ["Tarayıcı sekmesi artık derlenmiş C/C++/Rust kodek kütüphanelerini — libvpx, libavcodec, zlib, sharp/libvips, ImageMagick ve PDF motorlarının WASM sürümleri — birçok durumda yerel performansın %80–95'inde çalıştırır. Tüm bu kod tarayıcının yalıtımında yürütülür: yalnızca sayfanın erişim verdiğine erişebilir ve sekmeyi kapattığınız anda duraklatılır. Pratik sonuç şudur: masaüstü programından beklediğiniz dönüştürme kalitesi tarayıcıda sunulur ve hiçbir satıcı dosyaya dokunmaz."] },
    { type: "table", columns: ["Konu", "Sunucuya yükleme", "Tarayıcı içi (WASM)"], rows: [
      ["İşleme sırasında dosyanın yeri", "Üçüncü taraf sunucusunda", "Kullanıcının cihazında"],
      ["Oluşturulan kopyalar", "Diskte bir veya daha fazla", "Tarayıcı dışında hiçbiri"],
      ["İhlal riski", "Saklanan tüm dosyalar risk altında", "Çalınacak saklı veri yok"],
      ["Ağ trafiği", "Yükleme + indirme", "Yalnızca sayfa yükleme"],
      ["Çevrimdışı çalışma", "Hayır", "Evet"],
    ]},

    { type: "h2", content: ["İstemci tarafı işlemenin sınırları"] },
    { type: "p", content: ["Dürüstlük, ödünleşimleri adlandırmayı gerektirir. İstemci tarafında işleme evrensel bir cevap değildir:"] },
    { type: "list", items: [
      ["Ağır medya işleri düşük donanımda yavaş olabilir; veri merkezi filosu yerine kullanıcının CPU'suyla rekabet ederler."],
      ["WebAssembly belleği sunucuya kıyasla sınırlıdır; çok büyük dosyalar pratik limitlere takılabilir."],
      ["Kod tarayıcıya gönderilmelidir; bu daha büyük bir ilk indirme ve WASM paketlerinin güncel tutulması demektir."],
      ["Her hizmet istemci tarafında yeniden kurulamaz — işbirlikçi düzenleme, herkese açık paylaşım ve bulut GPU'ları üzerinde AI çıkarımı hâlâ sunucu gerektirir."],
    ]},
    { type: "p", content: ["Dürüst çerçeve 'istemci tarafı her şeyin yerini alır' değildir. 'Özel, tek kullanıcılı dosya işleri için doğru yer istemci tarafıdır' — ve bu, günlük dönüşümlerin çoğunu içeren geniş ve değerli bir kategoridir."] },

    { type: "h2", content: ["Convrs modeli nasıl uyguluyor"] },
    { type: "p", content: ["Her Convrs dönüştürücüsü — görüntü, ses, video, belge, geliştirici araçları — tarayıcınıza bir WebAssembly motoru yükler ve işi yerel olarak yapar. Geri bildirim döngüsü kısadır: 50 fotoğrafı saniyeler içinde WebP'ye çevirin, ağ kapalıyken çalıştığını görün ve hiçbir sunucuya dokunmamış sonuçlar alın."] },
    { type: "list", items: [
      ["Kayıt, hesap veya API anahtarı yok — doğrulama gerektirecek sunucu tarafı bir şey olmadığı için."],
      ["Filigran veya belirsiz depolama yok — çıktı doğrudan cihazınıza geri yazılır."],
      ["Dürüst telemetri — hiçbir şey dosyalarınızın içeriğini izlemez; yalnızca onay kapılı anonim sayfa analitiği vardır ve onu da reddedebilirsiniz."],
    ]},
    { type: "note", tone: "warning", title: "Basit bir gizlilik testi", content: ["Wi-Fi'ınızı kapatın, herhangi bir Convrs sayfasını açın, bir dosyayı dönüştürün ve başarılı olduğunu izleyin. Gerçek bir istemci tarafı aracın asit testi budur — verilerinize saygı duyan araçları, yalnızca öyle olduğunu iddia edenlerden hızla ayırır."] },

    { type: "h2", content: ["Yol haritası"] },
    { type: "p", content: ["Eğilim yadsınamaz. Tarayıcılar hızlanıyor, WebAssembly iş parçacıkları, SIMD ve çöp toplama desteği kazanıyor ve her yıl daha fazla yerel kütüphane WASM sürümü çıkarıyor. Bu arada hem düzenlemeler hem kullanıcılar daha az toplama talep ediyor, daha fazla değil."] },
    { type: "p", content: ["İstemci tarafında işleme, sunucu destekli bir ürüne takılmış bir hile değildir — mimari bir duruştur: veriniz sizindir ve yazılımın yapabileceği en saygılı şey onun bir kopyasını yaratmamaktır. Bu duruş hem teknik olarak mümkün hem de toplumsal olarak beklenen hâle geliyor. Veri gizliliğinin geleceği, yüklemelerinize ne olduğu konusunda daha iyi vaatler değildir. Yükleyecek hiçbir şeyin olmamasıdır."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Warum Client-seitige Verarbeitung die Zukunft des Datenschutzes ist",
    eyebrow: "Datenschutz",
    description:
      "Client-seitige Verarbeitung läuft komplett in Ihrem Browser — nichts wird hochgeladen, gespeichert oder geteilt. Erfahren Sie, warum In-Browser-Apps mit WebAssembly zum Standard für datenschutzbewusste Nutzer werden.",
    excerpt:
      "Wenn eine App Ihre Daten auf Ihrem eigenen Gerät verarbeitet, gibt es keine Serverkopie, die leaken könnte. Deshalb wird dieses Modell zum Standard.",
    readingTime: "9 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Zwei Jahrzehnte lang war der Standardweg, fast alles online zu tun, derselbe: Dateien auf den Server eines Dritten hochladen, seine Software verarbeiten lassen, Ergebnis herunterladen. Dieses Modell hat das moderne Web gebaut — und es ist auch das Modell, das unsere Daten immer wieder leakt. Eine wachsende Gegenbewegung stellt eine ältere, einfachere Idee wieder her: Verarbeiten Sie die Daten dort, wo sie bereits liegen — auf dem Gerät des Nutzers."] },
    { type: "p", content: ["Convrs ist genau auf diesem Prinzip aufgebaut. Jedes der 60+ Tools konvertiert Dateien im Browser — nichts wird hochgeladen, nichts gespeichert, nichts überwacht. Dieser Artikel erklärt, warum client-seitige Verarbeitung still zur Zukunft des Datenschutzes wird, was sie heute technisch möglich macht und wo ihre Grenzen liegen."] },

    { type: "h2", content: ["Warum Hochladen-und-verarbeiten nie der sichere Standard war"] },
    { type: "p", content: ["Eine Datei hochzuladen ist ein Akt des Vertrauens. Sie geben eine Kopie von etwas Privatem an einen Dritten und bitten ihn, sie sicher aufzubewahren — und jede Kopie ist ein neuer Schwachpunkt. Es gibt mehrere strukturelle Gründe, warum server-seitige Verarbeitung Nutzer immer wieder enttäuscht:"] },
    { type: "list", items: [
      ["Die Daten werden auch dann gesammelt, wenn nichts Schlimmes passiert. Ihre Datei liegt irgendwo auf einer Platte, in einer Datenbank oder einem Backup und erzeugt einen Datensatz, der unabhängig von Ihrer Absicht existiert."],
      ["Datenschutzverletzungen sind unvermeidlich, nicht die Ausnahme. Auf Servern gespeicherte Dateien gehören zur Angriffsfläche; je größer der Tresor, desto attraktiver."],
      ["Wiederverwendung ist unsichtbar. Gespeicherte Daten können in Trainingsdatensätze, Werbe-Profile oder Analysen einfließen, ohne dass der Nutzer etwas merkt."],
      ["Das rechtliche Risiko wächst. Ein Server in einer Rechtsordnung kann Durchsuchungen, Vorladungen und Aufbewahrungspflichten unterliegen, denen Sie nie zugestimmt haben."],
    ]},
    { type: "p", content: ["Keines davon erfordert böse Absicht. Ein gut geführtes Unternehmen kann dennoch kompromittiert, übernommen oder zu einer Änderung seiner Richtlinien gezwungen werden. Die einzigen Daten, die nicht geleakt, gemined oder per Vorladung angefordert werden können, sind Daten, die nie erhoben wurden."] },

    { type: "h2", content: ["Was 'client-seitige Verarbeitung' wirklich bedeutet"] },
    { type: "p", content: ["Client-seitige Verarbeitung bedeutet: Die Software, die Sie brauchen — der Decoder, der Encoder, die Transformation — wird als Code in Ihren Browser geliefert und läuft auf Ihrer Hardware. Ihre Datei wird lokal in den Speicher gelesen, lokal verarbeitet und das Ergebnis zurück auf Ihre Platte geschrieben. Das Netzwerk wird genau einmal genutzt: für das Laden der Seite."] },
    { type: "p", content: ["Drei Technologien machen das für echte Arbeitslasten möglich:"] },
    { type: "list", items: [
      [{ text: "JavaScript", bold: true }, { text: " für Geschäftslogik und UI — schnell genug für Text, JSON, CSV und kleine Medientransformationen." }],
      [{ text: "WebAssembly", bold: true }, { text: " für schwere Aufgaben — dieselben nativen Codecs und Kompressionsbibliotheken, die Serverwerkzeuge antreiben, kompiliert und fast in nati­ver Geschwindigkeit im Browser ausgeführt." }],
      [{ text: "On-Device-APIs", bold: true }, { text: " wie File System Access API, Canvas und Web Workers — Apps lesen und speichern Dateien, ohne sie irgendwohin zu senden." }],
    ]},
    { type: "p", content: ["Mit WebAssembly kann ein in C++ oder Rust geschriebener PDF-Renderer, Videocodec oder Bildencoder unverändert (oder fast unverändert) in einem Tab laufen. Der Browser wird damit zu einer tragbaren, sandboxed, hardwarebeschleunigten Laufzeit — nicht nur zu einem Dokumentbetrachter."] },

    { type: "h2", content: ["Datenschutz-Eigenschaften, die Sie fast gratis bekommen"] },
    { type: "p", content: ["Wenn die Verarbeitung auf dem Gerät stattfindet, ergeben sich mehrere Datenschutz-Eigenschaften mechanisch aus der Architektur — nicht aus Versprechen des Unternehmens:"] },
    { type: "list", items: [
      [{ text: "Keine ruhenden Daten. ", bold: true }, { text: "Es gibt keine Serverplatte mit Kopien Ihrer Dateien — bei einem Leak gibt es nichts zu verlieren." }],
      [{ text: "Keine Daten in Bewegung. ", bold: true }, { text: "Ihre Datei verlässt Ihr Gerät nie; es gibt keinen Paketstrom, der abgefangen werden könnte." }],
      [{ text: "Keine Identitätsverknüpfung. ", bold: true }, { text: "Kein Hochladen bedeutet kein Konto, keinen API-Schlüssel und keinen Grund, eine Konvertierung einer Person zuzuordnen." }],
      [{ text: "Kein Aufbewahrungsplan. ", bold: true }, { text: "Nichts wird behalten — kein Zeitfenster zu verhandeln, keine Datensätze, die Ihre Sitzung überleben." }],
      [{ text: "Offline nutzbar. ", bold: true }, { text: "Sobald die Seite geladen ist, funktionieren Konvertierungen ohne Verbindung — ein Gewinn für Datenschutz und Zuverlässigkeit." }],
    ]},
    { type: "note", tone: "success", title: "Datenschutz durch Architektur, nicht durch Richtlinie", content: ["Jeder Anbieter kann eine Richtlinie veröffentlichen, die sagt: 'Wir löschen Ihre Dateien nach 24 Stunden.' Nur eine Architektur, in der die Datei den Server nie erreicht, kann diese Aussage gegenstandslos machen. Das ist der Unterschied zwischen einem Versprechen und einem Design."] },

    { type: "h2", content: ["Warum das für Regulierung wichtig ist"] },
    { type: "p", content: ["Datenschutzvorschriften (DSGVO, CCPA, KVKK in der Türkei und die wachsende Zahl von Datenschutzgesetzen weltweit) bauen auf Begriffen wie 'Verarbeitung', 'Verantwortlicher' und 'Übermittlung'. Ein Tool, das Dateien auf dem Gerät des Nutzers verarbeitet, ändert das Gespräch komplett: Die 'Verarbeitung' übernimmt Software, die Nutzer selbst für eigene Zwecke auf eigener Hardware ausführen."] },
    { type: "p", content: ["Das macht Vorschriften nicht überflüssig — der Code des Tools wird weiter verteilt, und Telemetrie muss weiterhin verantwortungsvoll behandelt werden. Aber die größte und riskanteste Kategorie personenbezogener Daten verschwindet vom Tisch des Anbieters: Nutzerinhalte. Statt um rechtliche Pflichten herumzuarbeiten, um Kopien von Nutzerdateien zu minimieren, zu löschen und zu schützen, erzeugt die Architektur diese Kopien schlicht nie."] },

    { type: "h2", content: ["Was WebAssembly verändert"] },
    { type: "p", content: ["Vor zehn Jahren bedeutete 'client-seitig' 'vielleicht schnell genug für kleine Texte'. Videotranskodierung, PDF-Parsing und hochwertige Bildkompression erfordern native Schleifen. Genau diese Lücke füllt WebAssembly."] },
    { type: "p", content: ["Ein Browser-Tab führt jetzt kompilierte C/C++/Rust-Codec-Bibliotheken — libvpx, libavcodec, zlib, sharp/libvips, WASM-Ports von ImageMagick und PDF-Engines — in vielen Fällen mit 80–95 % nativer Leistung aus. All dieser Code läuft in der Sandbox des Browsers: Er kann nur auf das zugreifen, was die Seite ihm gibt, und wird pausiert, sobald Sie den Tab schließen. Praktisch heißt das: Dieselbe Konvertierungsqualität wie im Desktop-Programm kommt im Browser an — ohne dass ein Anbieter die Datei je berührt."] },
    { type: "table", columns: ["Aspekt", "Server-Hochladen", "Im Browser (WASM)"], rows: [
      ["Speicherort während der Verarbeitung", "Auf einem Drittanbieter-Server", "Auf dem Gerät des Nutzers"],
      ["Erzeugte Kopien", "Eine oder mehrere auf der Platte", "Nichts außerhalb des Browsers"],
      ["Leak-Risiko", "Alle gespeicherten Dateien gefährdet", "Nichts zu stehlen"],
      ["Netzwerkverkehr", "Upload + Download", "Nur Seitenladen"],
      ["Offline nutzbar", "Nein", "Ja"],
    ]},

    { type: "h2", content: ["Wo client-seitige Verarbeitung noch Grenzen hat"] },
    { type: "p", content: ["Ehrlichkeit verlangt, die Kompromisse zu benennen. Client-seitige Verarbeitung ist keine universelle Antwort:"] },
    { type: "list", items: [
      ["Schwere Medienaufgaben können auf schwacher Hardware langsam sein, da sie um die CPU des Nutzers konkurrieren statt um eine Serverflotte."],
      ["WebAssembly-Speicher ist im Vergleich zu einem Server begrenzt; sehr große Dateien stoßen an praktische Grenzen."],
      ["Code muss an den Browser ausgeliefert werden — ein größerer erster Download und laufende Aktualisierung der WASM-Bundles."],
      ["Nicht jeder Dienst lässt sich client-seitig neu bauen — kollaboratives Bearbeiten, öffentliches Teilen und KI-Inferenz auf Cloud-GPUs brauchen Server."],
    ]},
    { type: "p", content: ["Der ehrliche Rahmen ist nicht 'client-seitig ersetzt alles'. Es ist: 'Für private Ein-Nutzer-Dateiarbeit ist der Client der richtige Ort' — und das ist eine große, wertvolle Kategorie, die die meisten Alltagskonvertierungen umfasst."] },

    { type: "h2", content: ["Wie Convrs das Modell anwendet"] },
    { type: "p", content: ["Jeder Convrs-Konverter — Bild, Audio, Video, Dokument, Entwickler-Tools — lädt eine WebAssembly-Engine in Ihren Tab und erledigt die Arbeit lokal. Die Feedback-Schleife ist kurz: Konvertieren Sie 50 Fotos in Sekunden in WebP, sehen Sie, wie es ohne Netzwerk läuft, und erhalten Sie Ergebnisse, die nie einen Server berührt haben."] },
    { type: "list", items: [
      ["Keine Anmeldung, kein Konto, kein API-Schlüssel — weil es server-seitig nichts zu authentifizieren gibt."],
      ["Keine Wasserzeichen oder obskurer Speicher — die Ausgabe wird direkt auf Ihr Gerät geschrieben."],
      ["Ehrliche Telemetrie — nichts verfolgt den Inhalt Ihrer Dateien; nur anonyme, zustimmungsgeprüfte Seitenanalytik, die Sie ablehnen können."],
    ]},
    { type: "note", tone: "warning", title: "Ein einfacher Datenschutz-Test", content: ["Schalten Sie Ihr WLAN aus, öffnen Sie eine Convrs-Seite, konvertieren Sie eine Datei und beobachten Sie, wie es gelingt. Das ist der Säuretest für ein echtes client-seitiges Tool — und eine schnelle Methode, ehrliche Tools von bloßen Behauptungen zu unterscheiden."] },

    { type: "h2", content: ["Der Weg nach vorn"] },
    { type: "p", content: ["Der Trend ist unübersehbar. Browser werden schneller, WebAssembly erhält Threads, SIMD und Garbage-Collection-Unterstützung, und jedes Jahr werden mehr native Bibliotheken als WASM-Ports ausgeliefert. Unterdessen verlangen Vorschriften und Nutzer gleichermaßen weniger Erhebung, nicht mehr."] },
    { type: "p", content: ["Client-seitige Verarbeitung ist kein Gimmick, das an ein servergestütztes Produkt geklebt wird — sie ist eine architektonische Haltung: Ihre Daten gehören Ihnen, und die respektvollste Sache, die Software tun kann, ist, keine Kopie davon zu erstellen. Diese Haltung wird sowohl technisch machbar als auch gesellschaftlich erwartet. Die Zukunft des Datenschutzes sind nicht bessere Versprechen darüber, was mit Ihren Uploads passiert. Es ist, gar nichts hochladen zu müssen."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Por qué el procesamiento del lado del cliente es el futuro de la privacidad",
    eyebrow: "Privacidad",
    description:
      "El procesamiento del lado del cliente ocurre íntegramente en su navegador: nada se sube, almacena ni comparte. Descubra por qué las apps con WebAssembly son ya la opción de los usuarios que cuidan su privacidad.",
    excerpt:
      "Cuando una app procesa sus datos en su propio dispositivo, no hay copia en un servidor que pueda filtrarse, perderse o ser incautada. Por eso este modelo es el estándar.",
    readingTime: "9 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Durante dos décadas, la forma predeterminada de hacer casi cualquier cosa en línea fue la misma: subir sus archivos al servidor de otra persona, dejar que su software los procesara y descargar el resultado. Ese modelo construyó la web moderna — y también es el modelo que no deja de filtrar nuestros datos. Un movimiento creciente recupera una idea más antigua y más simple: procesar los datos donde ya viven, en el propio dispositivo del usuario."] },
    { type: "p", content: ["Convrs está construido sobre exactamente ese principio. Cada una de sus más de 60 herramientas convierte archivos en el navegador: nada se sube, nada se almacena, nada se vigila. Este artículo explica por qué el procesamiento del lado del cliente se está convirtiendo silenciosamente en el futuro de la privacidad, qué lo hace técnicamente posible hoy y dónde quedan sus límites."] },

    { type: "h2", content: ["Por qué el modelo de subir y procesar nunca fue la opción segura"] },
    { type: "p", content: ["Subir un archivo es un acto de confianza. Entrega una copia de algo privado a un tercero y le pide que la mantenga a salvo — y cada copia es un nuevo punto de fallo. Hay varias razones estructurales por las que el procesamiento en el servidor sigue decepcionando a los usuarios:"] },
    { type: "list", items: [
      ["Los datos se recogen incluso cuando no pasa nada malo. Su archivo queda en un disco, una base de datos o una copia de seguridad, creando un registro que existe con independencia de su intención."],
      ["Las brechas son inevitables, no excepcionales. Los archivos almacenados en servidores forman parte de la superficie de ataque; cuanto mayor es el cofre, más atractivo resulta."],
      ["La reutilización es invisible. Los datos guardados pueden alimentar conjuntos de entrenamiento, perfiles publicitarios o análisis sin que el usuario note cambio alguno."],
      ["La exposición legal crece. Un servidor en una jurisdicción puede verse sometido a órdenes judiciales y leyes de retención a las que usted nunca aceptó."],
    ]},
    { type: "p", content: ["Nada de esto requiere mala intención. Una empresa bien gestionada puede igualmente ser comprometida, adquirida u obligada a cambiar sus políticas. Los únicos datos que no pueden filtrarse, explotarse ni requerirse legalmente son los que nunca se recogieron."] },

    { type: "h2", content: ["Qué significa realmente 'procesar del lado del cliente'"] },
    { type: "p", content: ["Procesar del lado del cliente significa que el software que necesita — el decodificador, el codificador, la transformación — se entrega a su navegador como código y se ejecuta en su hardware. Su archivo se lee en la memoria localmente, se procesa localmente y el resultado se escribe de vuelta en su disco. La red se usa exactamente una vez: para cargar la página."] },
    { type: "p", content: ["Tres tecnologías hacen esto viable para tareas reales:"] },
    { type: "list", items: [
      [{ text: "JavaScript", bold: true }, { text: " para la lógica de negocio y la interfaz — suficiente para texto, JSON, CSV y transformaciones de medios pequeños." }],
      [{ text: "WebAssembly", bold: true }, { text: " para el trabajo pesado — los mismos códecs y librerías de compresión nativos que impulsan las herramientas de servidor, compilados para ejecutarse en el navegador a velocidad casi nativa." }],
      [{ text: "APIs del dispositivo", bold: true }, { text: " como File System Access API, canvas y Web Workers — permiten leer y guardar archivos sin enviarlos a ninguna parte." }],
    ]},
    { type: "p", content: ["Con WebAssembly, un renderizador de PDF, un códec de vídeo o un codificador de imagen escritos en C++ o Rust pueden ejecutarse sin cambios (o casi) dentro de una pestaña. El navegador se convierte así en una plataforma portátil, aislada y acelerada por hardware — no solo en un visor de documentos."] },

    { type: "h2", content: ["Propiedades de privacidad que obtiene casi gratis"] },
    { type: "p", content: ["Cuando el procesamiento ocurre en el dispositivo, varias propiedades de privacidad se derivan mecánicamente de la arquitectura, no de las promesas de una empresa:"] },
    { type: "list", items: [
      [{ text: "Sin datos en reposo. ", bold: true }, { text: "No hay disco de servidor con copias de sus archivos, así que no hay nada que perder en una brecha." }],
      [{ text: "Sin datos en tránsito. ", bold: true }, { text: "Su archivo no sale de su dispositivo; no hay flujo de paquetes que interceptar." }],
      [{ text: "Sin vínculo de identidad. ", bold: true }, { text: "Sin subidas no hay cuenta, ni clave API, ni razón para asociar una conversión a una persona." }],
      [{ text: "Sin calendario de retención. ", bold: true }, { text: "Nada se conserva, así que no hay ventanas que negociar ni registros que sobrevivan a su sesión." }],
      [{ text: "Funciona sin conexión. ", bold: true }, { text: "Una vez cargada la página, las conversiones funcionan con la conexión apagada — un logro tanto de privacidad como de fiabilidad." }],
    ]},
    { type: "note", tone: "success", title: "Privacidad por arquitectura, no por política", content: ["Cualquier proveedor puede publicar una política que diga 'borramos sus archivos a las 24 horas'. Solo una arquitectura en la que el archivo nunca llega al servidor puede volver esa afirmación irrelevante. Esa es la diferencia entre confiar en una promesa y confiar en un diseño."] },

    { type: "h2", content: ["Por qué esto importa para la regulación"] },
    { type: "p", content: ["Las normas de privacidad (GDPR, CCPA, KVKK en Turquía y el creciente conjunto global de leyes de protección de datos) se construyen sobre conceptos como 'tratamiento', 'responsable' y 'transferencia'. Una herramienta que procesa archivos en el propio dispositivo cambia toda la conversación: el 'tratamiento' lo hace software que los usuarios ejecutan ellos mismos, para sus propios fines, en su propio hardware."] },
    { type: "p", content: ["Eso no hace la regulación irrelevante — el código de la herramienta sigue distribuyéndose y la telemetría debe gestionarse con responsabilidad. Pero elimina del plato del proveedor la categoría más grande y arriesgada de datos personales: el contenido del usuario. En lugar de diseñar en torno a obligaciones legales para minimizar, borrar y proteger copias, la arquitectura simplemente nunca crea esas copias."] },

    { type: "h2", content: ["Qué cambia con WebAssembly"] },
    { type: "p", content: ["Hace diez años 'lado del cliente' significaba 'quizá suficiente para textos pequeños'. La transcodificación de vídeo, el análisis de PDF y la compresión de imagen de alta calidad exigen bucles de velocidad nativa. Esa es exactamente la brecha que llena WebAssembly."] },
    { type: "p", content: ["Una pestaña del navegador ejecuta ahora librerías de códec compiladas en C/C++/Rust — libvpx, libavcodec, zlib, sharp/libvips, puertos WASM de ImageMagick y motores PDF — al 80–95 % del rendimiento nativo en muchos casos. Todo ese código se ejecuta dentro del aislamiento del navegador: solo puede acceder a lo que la página le da, y se pausa en cuanto cierra la pestaña. El resultado práctico: la misma calidad de conversión que esperaría de un programa de escritorio llega al navegador sin que ningún proveedor toque el archivo."] },
    { type: "table", columns: ["Aspecto", "Subida al servidor", "En el navegador (WASM)"], rows: [
      ["Ubicación del archivo durante el proceso", "En un servidor de terceros", "En el dispositivo del usuario"],
      ["Copias creadas", "Una o más en disco", "Ninguna fuera del navegador"],
      ["Riesgo de brecha", "Todos los archivos guardados", "Nada almacenado que robar"],
      ["Tráfico de red", "Subida + descarga", "Solo carga de página"],
      ["Funciona sin conexión", "No", "Sí"],
    ]},

    { type: "h2", content: ["Dónde aún hay límites"] },
    { type: "p", content: ["La honestidad exige nombrar las compensaciones. El procesamiento del lado del cliente no es una respuesta universal:"] },
    { type: "list", items: [
      ["Las tareas de medios pesados pueden ser lentas en hardware modesto, pues compiten por la CPU del usuario en lugar de una flota de centros de datos."],
      ["La memoria de WebAssembly es limitada frente a un servidor; los archivos enormes pueden chocar con límites prácticos."],
      ["El código debe enviarse al navegador, lo que implica una descarga inicial mayor y mantener actualizados los paquetes WASM."],
      ["No todo servicio puede reconstruirse del lado del cliente — la edición colaborativa, el intercambio público y la inferencia de IA en GPUs de nube siguen necesitando servidores."],
    ]},
    { type: "p", content: ["El marco honesto no es 'el lado del cliente lo reemplaza todo'. Es: 'para el trabajo privado de archivos de un solo usuario, el cliente es el lugar correcto' — y esa es una categoría amplia y valiosa que incluye la mayoría de las conversiones cotidianas."] },

    { type: "h2", content: ["Cómo aplica Convrs el modelo"] },
    { type: "p", content: ["Cada convertidor de Convrs — imagen, audio, vídeo, documento, utilidades de desarrollo — carga un motor WebAssembly en su pestaña y hace el trabajo localmente. El bucle es corto: convierta 50 fotos a WebP en segundos, observe cómo funciona con la red apagada y obtenga resultados que jamás tocaron un servidor."] },
    { type: "list", items: [
      ["Sin registro, sin cuenta, sin clave API — porque no hay nada del lado del servidor contra lo que autenticarse."],
      ["Sin marcas de agua ni almacenamiento opaco — el resultado se escribe directamente en su dispositivo."],
      ["Telemetría honesta — nada rastrea el contenido de sus archivos; solo existe analítica de página anónima y con consentimiento, que puede rechazar."],
    ]},
    { type: "note", tone: "warning", title: "Una prueba de privacidad sencilla", content: ["Apague el Wi-Fi, abra cualquier página de Convrs, convierta un archivo y observe cómo el proceso triunfa. Esa es la prueba de fuego de una herramienta genuinamente local — y una forma rápida de distinguir las honestas de las que solo dicen respetar sus datos."] },

    { type: "h2", content: ["El camino por delante"] },
    { type: "p", content: ["La tendencia es inconfundible. Los navegadores son más rápidos, WebAssembly gana hilos, SIMD y soporte de recolección de basura, y cada año más librerías nativas lanzan puertos WASM. Mientras tanto, las regulaciones y los usuarios exigen menos recopilación, no más."] },
    { type: "p", content: ["El procesamiento del lado del cliente no es un truco adosado a un producto con servidor — es una postura arquitectónica: sus datos son suyos, y lo más respetuoso que puede hacer el software es no crear una copia de ellos. Esa postura se está volviendo a la vez técnicamente viable y socialmente esperada. El futuro de la privacidad no son mejores promesas sobre qué ocurre con sus subidas. Es no tener nada que subir."] },
  ],
};

const guide: GuideDefinition = {
  slug: "client-side-processing-privacy",
  content: { en, tr, de, es },
};

export default guide;