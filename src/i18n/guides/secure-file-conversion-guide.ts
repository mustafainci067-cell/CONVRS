import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "The Ultimate Guide to Secure File Conversions",
    eyebrow: "Security",
    description:
      "Converting files online can leak your data. This guide covers threat models, why in-browser conversion beats upload-based tools, and how to convert files safely.",
    excerpt:
      "Most online converters require uploading your files to a server. That single act creates copies, logs, and leakage risks. Here is the complete guide to converting files securely.",
    readingTime: "10 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Converting a file — an image, a PDF, an audio clip — should be a private operation. The file is yours; its contents, metadata, and existence are details you did not choose to publish. Yet most 'free online converters' work by uploading your file to a server, where it can be stored, logged, mined, or breached. This guide is about doing the same conversions without creating any of those risks."] },
    { type: "p", content: ["We will walk through the real threat model, the differences between upload-based and in-browser tools, practical hardening steps, and how to verify that a tool actually keeps your data on-device."] },

    { type: "h2", content: ["What 'secure file conversion' actually means"] },
    { type: "p", content: ["A secure conversion is one where nothing leaks during or after the operation. Concretely, that means:"] },
    { type: "list", items: [
      ["No third party ever possesses a copy of your file."],
      ["No trace of the file persists after the conversion (no server logs, no caches, no copies)."],
      ["No metadata in the output exposes more than you intended."],
      ["The conversion works even in untrusted network conditions."],
    ]},
    { type: "p", content: ["Notice that these criteria are about architecture, not about a vendor's promises. A tool that 'deletes files after 24 hours' is better than one that keeps them forever, but it still created a copy, a storage record, and a timeline an attacker (or a subpoena) can target. The strongest guarantee is structural: the file never leaves your device."] },

    { type: "h2", content: ["The risks of upload-based converters"] },
    { type: "p", content: ["Upload-and-process is so common that the risks feel theoretical. They are not. Here is what actually happens to a file you upload to a typical converter:"] },
    { type: "list", items: [
      [{ text: "Interception in transit. ", bold: true }, { text: "Your document travels across networks to reach the server. Even with HTTPS, the endpoints matter — and some converters still use weak or broken TLS." }],
      [{ text: "Storage you don't control. ", bold: true }, { text: "Many tools store uploads, whether for 'recovery', analytics, or training. There is no way to verify a claim, and no way to audit it." }],
      [{ text: "Metadata leaks. ", bold: true }, { text: "A PDF or image contains EXIF, geo-tags, author names, timestamps, and revision history. A server-side tool often keeps whatever it doesn't actively strip." }],
      [{ text: "Reuse and resale. ", bold: true }, { text: "Uploaded files are data. They can be added to datasets, ad-targeting profiles, or sold — usually without meaningfully informed consent." }],
      [{ text: "Breach exposure. ", bold: true }, { text: "Centralized server storage is a target. When it is hit, every file there is exposed regardless of any 'deletion' promise." }],
    ]},
    { type: "note", tone: "warning", title: "The most dangerous file is the one you trust a stranger to hold", content: ["Uploading a file you would not email to a stranger to a random website is the same data risk, plus a copy on someone's disk and no legal clarity about who holds it. If the content truly matters to you, it should not round-trip through an unknown server."] },

    { type: "h2", content: ["The threat model, made concrete"] },
    { type: "p", content: ["When you use a file converter, assess it against these adversaries:"] },
    { type: "table", columns: ["Adversary", "Upload-based converter", "In-browser (client-side) converter"], rows: [
      ["Network observer (ISP, Wi-Fi, VPN exit)", "Can see uploads/downloads if TLS is weak", "Sees only page load; conversion is local"],
      ["The converter operator", "Possesses your file; may store, reuse, or mine it", "Never receives your file"],
      ["A data breach", "All stored uploads at risk", "Nothing stored to be exposed"],
      ["Subpoena / legal request", "Server copy may be produced", "No server copy exists"],
      ["Malicious input (malformed file)", "Exploits server-side tooling & data of many users", "Runs in the browser sandbox; affects only your tab"],
    ]},
    { type: "p", content: ["The in-browser column is not an advantage on every single row for every tool — implementation still matters — but it removes entire categories of risk that upload tools cannot, because the exposure simply doesn't exist."] },

    { type: "h2", content: ["Why in-browser conversion is the secure default"] },
    { type: "p", content: ["In-browser, WebAssembly-powered converters keep your file on your device throughout. The page loads a codec (compiled to Wasm), you pick a file, the browser decodes and re-encodes it locally, and the result downloads to your disk. What changed versus the server model? Everything in or after the conversion happened without your data crossing a trust boundary."] },
    { type: "p", content: ["This is not magic — it is engineering. Codecs that were once compiled for Linux servers (libvpx, libavcodec, libvips) now build to WebAssembly and ship to the tab. Performance is close to native. Large files run into practical limits sooner than on a server, but for the overwhelming majority of everyday conversions, in-browser is both faster (no upload wait) and safer."] },
    { type: "p", content: ["One more property worth using: genuinely client-side tools work offline. Disconnect, convert, and watch it succeed. A tool that cannot do that is, by definition, sending your data somewhere at some point."] },

    { type: "h2", content: ["How to verify a converter is truly client-side"] },
    { type: "list", ordered: true, items: [
      ["Disconnect your network and try a conversion. If it succeeds, your file is not being uploaded."],
      ["Open browser DevTools → Network. A purely local converter shows no POST/PUT of your file — only the initial page resources."],
      ["Check file size in the Network tab: there should be no outgoing request equal to (or close to) your input file's size."],
      ["Read the page's claims about 'no upload' against its reported architecture (WebAssembly, WASM codecs, on-device processing)."],
      ["Prefer tools without requiring an account; an account is usually the sign of server-side storage."],
    ]},
    { type: "note", tone: "success", title: "The two-minute test", content: ["You can run most of these checks in under two minutes. If a 'no-upload' tool fails the offline test or shows your file bytes leaving in a request, treat it as an upload tool regardless of its copy."] },

    { type: "h2", content: ["Hardening beyond the tool"] },
    { type: "p", content: ["Even with a perfect client-side converter, good file hygiene matters:"] },
    { type: "list", items: [
      [{ text: "Strip metadata deliberately. ", bold: true }, { text: "Remove EXIF/GPS and author fields when you do not need them. Convrs's EXIF cleaner is built for exactly this." }],
      [{ text: "Use a burner copy for sensitive documents. ", bold: true }, { text: "Convert a redacted version rather than your original when shares are involved." }],
      [{ text: "Keep software current. ", bold: true }, { text: "Codec bugs and sandbox escapes are rare but real; updated browsers and updated WASM bundles matter." }],
      [{ text: "Prefer HTTPS and refuse auto-filled uploads. ", bold: true }, { text: "If a tool does involve a server, demand first-party TLS, no third-party script slinger, and no silent cross-site requests." }],
      [{ text: "Think about what you convert. ", bold: true }, { text: "Passwords, IDs, and legal documents should face the fewest possible data touches — ideally zero beyond your device." }],
    ]},

    { type: "h2", content: ["Conversion-specific notes"] },
    { type: "list", items: [
      [{ text: "Images. ", bold: true }, { text: "Watch EXIF/GPS. Converting JPG→WebP or PNG can carry metadata forward unless the tool strips it; prefer tools that let you scrub it in the same pass." }],
      [{ text: "PDF. ", bold: true }, { text: "PDFs embed fonts, JavaScript, annotations, and revision history. A secure conversion renders the visible content into a fresh file, dropping hidden layers." }],
      [{ text: "Documents (DOCX→PDF, etc.). ", bold: true }, { text: "Track-changes comments and author identities can survive naive conversions. Choose tools known to flatten." }],
      [{ text: "Audio/video. ", bold: true }, { text: "Container files carry attached streams and metadata tags. Ensure the converter discards counsel, don't re-add." }],
    ]},

    { type: "h2", content: ["What Convrs does"] },
    { type: "p", content: ["Convrs translates this guide into a product: every converter is a WebAssembly pipeline running in your browser, with no server in the path. There is no account, no upload endpoint, and no telemetry that can see your file contents. Its EXIF cleaner and image tools deliberately strip metadata; its document tools flatten hidden layers; and the whole toolkit works offline."] },
    { type: "p", content: ["The aim is to make the secure option the default — and the verification easy. Next time you need a file converted, run the two-minute test against whatever tool you reach for. The ones that apply only your own device to your own data are the only ones that can promise zero leakage. The rest are asking you to trust them; the client-side ones don't need to."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Güvenli Dosya Dönüştürme İçin Nihai Rehber",
    eyebrow: "Güvenlik",
    description:
      "Dosyaları çevrimiçi dönüştürmek verilerinizi sızdırabilir. Bu rehber; tehdit modellerini, tarayıcı içi dönüştürmenin yükleme tabanlı araçlardan neden üstün olduğunu ve dosyaları nasıl güvenle dönüştürebileceğinizi anlatıyor.",
    excerpt:
      "Çoğu çevrimiçi dönüştürücü dosyalarınızı bir sunucuya yüklemenizi ister. Bu tek eylem kopyalar, kayıtlar ve sızıntı riskleri yaratır. Dosyaları güvenle dönüştürmenin eksiksiz rehberi.",
    readingTime: "10 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Bir dosyayı — bir görseli, PDF'i, ses klibini — dönüştürmek özel bir işlem olmalıdır. Dosya sizindir; içeriği, üst verisi ve varlığı, yayınlamayı seçmediğiniz ayrıntılardır. Oysa çoğu 'ücretsiz çevrimiçi dönüştürücü', dosyanızı saklanabileceği, kaydedilebileceği, işlenebileceği veya sızdırılabileceği bir sunucuya yükleyerek çalışır. Bu rehber, aynı dönüşümleri bu risklerin hiçbirini yaratmadan yapmakla ilgili."] },
    { type: "p", content: ["Gerçek tehdit modelini, yükleme tabanlı ve tarayıcı içi araçlar arasındaki farkları, pratik güçlendirme adımlarını ve bir aracın verilerinizi gerçekten cihazda tuttuğunu nasıl doğrulayabileceğinizi adım adım inceleyeceğiz."] },

    { type: "h2", content: ["'Güvenli dosya dönüştürme' gerçekte ne demek"] },
    { type: "p", content: ["Güvenli bir dönüştürme, işlem sırasında ve sonrasında hiçbir şeyin sızmadığı dönüştürmedir. Somut olarak bu şu anlama gelir:"] },
    { type: "list", items: [
      ["Üçüncü bir taraf dosyanızın kopyasına asla sahip olmaz."],
      ["Dönüştürmenin ardından dosyanın izi kalmaz (sunucu kayıtları, önbellekler, kopyalar yok)."],
      ["Çıktıdaki hiçbir üst veri, niyet ettiğinizden fazlasını açığa çıkarmaz."],
      ["Dönüştürme, güvenilmeyen ağ koşullarında bile çalışır."],
    ]},
    { type: "p", content: ["Bu kriterlerin satıcı vaatleriyle değil; mimariyle ilgili olduğuna dikkat edin. 'Dosyaları 24 saat sonra silen' bir araç, sonsuza dek tutandan iyidir; ama yine de bir kopya, bir depolama kaydı ve saldırganın (veya bir mahkeme celbinin) hedefleyebileceği bir zaman çizelgesi yarattı. En güçlü garanti yapısaldır: dosya cihazınızdan asla çıkmaz."] },

    { type: "h2", content: ["Yükleme tabanlı dönüştürücülerin riskleri"] },
    { type: "p", content: ["Yükle-ve-işle o kadar yaygındır ki riskler teorik gelir. Değildir. Tipik bir dönüştürücüye yüklediğiniz bir dosyaya gerçekte olanlar:"] },
    { type: "list", items: [
      [{ text: "Yolda ele geçirilme. ", bold: true }, { text: "Belgeniz sunucuya ulaşmak için ağlar boyunca gider. HTTPS olsa bile uç noktalar önemlidir — ve bazı dönüştürücüler hâlâ zayıf veya kırık TLS kullanır." }],
      [{ text: "Kontrolünüz dışında depolama. ", bold: true }, { text: "Birçok araç yüklemeleri 'kurtarma', analiz veya eğitim için saklar. İddiayı doğrulamanın ve denetlemenin yolu yoktur." }],
      [{ text: "Üst veri sızıntıları. ", bold: true }, { text: "Bir PDF veya görsel, EXIF, GPS etiketleri, yazar adları, zaman damgaları ve revizyon geçmişi içerir. Sunucu tarafı bir araç, aktif olarak sıyırmadığı her şeyi korur." }],
      [{ text: "Yeniden kullanım ve satış. ", bold: true }, { text: "Yüklenen dosyalar veridir. Veri kümelerine, reklam hedefleme profillerine veya satışa eklenebilirler — genellikle anlamlı bir aydınlatılmış onay olmadan." }],
      [{ text: "İhlal etkisi. ", bold: true }, { text: "Merkezi sunucu depolaması bir hedeftir. Vurulduğunda, oradaki her dosya 'silme' vaadinden bağımsız olarak açığa çıkar." }],
    ]},
    { type: "note", tone: "warning", title: "En tehlikeli dosya, bir yabancının tutmasına güvendiğiniz dosyadır", content: ["Bir yabancıya e-postayla göndermeyeceğiniz bir dosyayı rastgele bir siteye yüklemek, aynı veri riski artı birinin diskinde bir kopya ve kimin elinde olduğuna dair hukuki belirsizlik demektir. İçerik gerçekten sizin için değerliyse, bilinmeyen bir sunucu üzerinden gidiş-geliş yapmamalı."] },

    { type: "h2", content: ["Tehdit modeli, somutlaştırılmış"] },
    { type: "p", content: ["Bir dosya dönüştürücü kullanırken şu rakiplere karşı değerlendirin:"] },
    { type: "table", columns: ["Rakip", "Yükleme tabanlı dönüştürücü", "Tarayıcı içi (istemci tarafı) dönüştürücü"], rows: [
      ["Ağ gözlemcisi (ISS, Wi-Fi, VPN çıkışı)", "TLS zayıfsa yüklemeleri/indirmeleri görebilir", "Yalnızca sayfa yüklemesini görür; dönüştürme yereldir"],
      ["Dönüştürücü operatörü", "Dosyanıza sahiptir; saklayabilir, kullanabilir veya işleyebilir", "Dosyanızı asla almaz"],
      ["Veri ihlali", "Saklanan tüm yüklemeler risk altında", "Açığa çıkacak saklı veri yok"],
      ["Mahkeme celbi / yasal talep", "Sunucu kopyası üretilebilir", "Sunucu kopyası yoktur"],
      ["Kötü niyetli girdi (bozuk dosya)", "Sunucu araçlarını ve birçok kullanıcının verisini etkiler", "Tarayıcı sandbox'ında çalışır; yalnızca sekmenizi etkiler"],
    ]},
    { type: "p", content: ["Tarayıcı içi sütun her araçta her satırda avantaj değildir — uygulama yine de önemlidir — ama yükleme araçlarının yapamayacağı risk kategorilerini tümden kaldırır, çünkü maruziyet zaten yoktur."] },

    { type: "h2", content: ["Neden tarayıcı içi dönüştürme güvenli varsayılandır"] },
    { type: "p", content: ["WebAssembly destekli tarayıcı içi dönüştürücüler dosyanızı tüm süreç boyunca cihazınızda tutar. Sayfa bir kodek yükler (Wasm'e derlenmiş), bir dosya seçersiniz, tarayıcı onu yerel olarak çözer ve yeniden kodlar, sonuç diskinize iner. Sunucu modeline göre ne değişti? Dönüşüm sırasında ve sonrasında hiçbir şey, veriniz bir güven sınırını geçmeden gerçekleşti."] },
    { type: "p", content: ["Bu sihir değil, mühendisliktir. Bir zamanlar Linux sunucuları için derlenen kodekler (libvpx, libavcodec, libvips) artık WebAssembly'ye derlenip sekmeye gönderilir. Performans yerel hıza yakındır. Büyük dosyalar sunucuya kıyasla daha erken pratik sınırlara takılır; ama her günkü dönüşümlerin ezici çoğunluğunda tarayıcı içi hem daha hızlıdır (yükleme beklemesi yok) hem daha güvenlidir."] },
    { type: "p", content: ["Bir özellik daha kullanmaya değer: gerçek istemci tarafı araçlar çevrimdışı çalışır. Bağlantıyı kesin, dönüştürün ve başarılı olduğunu izleyin. Bunu yapamayan bir araç, tanımı gereği verinizi bir noktada bir yere gönderiyordur."] },

    { type: "h2", content: ["Bir dönüştürücünün gerçekten istemci tarafı olduğunu nasıl doğrularsınız"] },
    { type: "list", ordered: true, items: [
      ["Ağınızı kesip bir dönüştürme deneyin. Başarılıysa dosyanız yüklenmiyor demektir."],
      ["Tarayıcı DevTools → Network sekmesini açın. Salt yerel bir dönüştürücü, dosyanızın hiçbir POST/PUT'unu göstermez — yalnızca ilk sayfa kaynaklarını."],
      ["Network sekmesinde dosya boyutunu kontrol edin: girdi dosyanızın boyutuna eşit (veya yakın) giden bir istek olmamalı."],
      ["Sayfanın 'yükleme yok' iddiasını bildirdiği mimariyle (WebAssembly, WASM kodekleri, cihaz içi işleme) karşılaştırın."],
      ["Hesap gerektirmeyen araçları tercih edin; hesap genellikle sunucu tarafı depolamanın işaretidir."],
    ]},
    { type: "note", tone: "success", title: "İki dakikalık test", content: ["Bu kontrollerin çoğunu iki dakikadan kısa sürede yapabilirsiniz. 'Yükleme yok' diyen bir araç çevrimdışı testinde başarısız olur veya dosyanızın baytlarının bir istekte çıktığını gösterirse, sözüne bakmaksızın onu bir yükleme aracı olarak değerlendirin."] },

    { type: "h2", content: ["Aracın ötesinde güçlendirme"] },
    { type: "p", content: ["Kusursuz bir istemci tarafı dönüştürücüde bile iyi dosya hijyeni önemlidir:"] },
    { type: "list", items: [
      [{ text: "Üst veriyi bilinçli sıyırın. ", bold: true }, { text: "İhtiyacınız yokken EXIF/GPS ve yazar alanlarını kaldırın. Convrs'in EXIF temizleyicisi tam bunun için kuruludur." }],
      [{ text: "Hassas belgeler için kopya kullanın. ", bold: true }, { text: "Paylaşım söz konusuysa orijinal yerine redakte edilmiş bir sürümü dönüştürün." }],
      [{ text: "Yazılımı güncel tutun. ", bold: true }, { text: "Kodek hataları ve sandbox kaçışları nadir ama gerçektir; güncel tarayıcılar ve güncel WASM paketleri önemlidir." }],
      [{ text: "HTTPS tercih edin, otomatik yüklemeleri reddedin. ", bold: true }, { text: "Bir araç yine de sunucu kullanıyorsa birinci taraf TLS, üçüncü taraf script dağıtmayan bir yapı ve sessiz çapraz site isteklerinin olmamasını talep edin." }],
      [{ text: "Ne dönüştürdüğünüzü düşünün. ", bold: true }, { text: "Parolalar, kimlikler ve hukuki belgeler mümkün olan en az veri temasına maruz kalmalı — ideal olarak cihazınızın dışında sıfır." }],
    ]},

    { type: "h2", content: ["Dönüştürmeye özel notlar"] },
    { type: "list", items: [
      [{ text: "Görseller. ", bold: true }, { text: "EXIF/GPS'e dikkat edin. JPG→WebP veya PNG dönüşümü, araç sıyırmadıkça üst veriyi ileri taşıyabilir; aynı geçişte sadeleştirmenize izin veren araçları tercih edin." }],
      [{ text: "PDF. ", bold: true }, { text: "PDF'ler yazı tipleri, JavaScript, açıklamalar ve revizyon geçmişi gömer. Güvenli bir dönüştürme, görünür içeriği taze bir dosyaya işleyerek gizli katmanları düşürür." }],
      [{ text: "Belgeler (DOCX→PDF vb.). ", bold: true }, { text: "Değişiklik takibi yorumları ve yazar kimlikleri naif dönüşümlerde yaşayabilir. Düzleştirdiği bilinen araçları seçin." }],
      [{ text: "Ses/video. ", bold: true }, { text: "Kapsayıcı dosyalar ek akışlar ve üst veri etiketleri taşır. Dönüştürücünün gereksiz veriyi attığından emin olun." }],
    ]},

    { type: "h2", content: ["Convrs ne yapıyor"] },
    { type: "p", content: ["Convrs bu rehberi ürüne çevirir: her dönüştürücü, yol üzerinde sunucu olmadan tarayıcınızda çalışan bir WebAssembly hattıdır. Hesap, yükleme uç noktası ve dosya içeriğinizi görebilecek telemetri yoktur. EXIF temizleyici ve görüntü araçları üst veriyi bilinçli sıyırır; belge araçları gizli katmanları düzleştirir; tüm araç seti çevrimdışı çalışır."] },
    { type: "p", content: ["Amaç güvenli seçeneği varsayılan hâle getirmek ve doğrulamayı kolaylaştırmaktır. Bir dahaki sefere bir dosyayı dönüştürmeniz gerektiğinde, ulaştığınız araca iki dakikalık testi uygulayın. Kendi verinize yalnızca kendi cihazınızı uygulayanlar, sıfır sızıntı vaat edebilecek yegâne araçlardır. Gerisi sizden onlara güvenmenizi ister; istemci tarafı olanlar buna ihtiyaç duymaz."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Der ultimative Leitfaden für sichere Dateikonvertierungen",
    eyebrow: "Sicherheit",
    description:
      "Online-Dateikonvertierung kann Ihre Daten leaken. Dieser Leitfaden behandelt Bedrohungsmodelle, warum In-Browser-Konvertierung Upload-Tools überlegen ist und wie Sie Dateien sicher konvertieren.",
    excerpt:
      "Die meisten Online-Konverter verlangen, dass Sie Ihre Dateien auf einen Server hochladen. Dieser eine Akt erzeugt Kopien, Protokolle und Leak-Risiken. Hier ist der komplette Leitfaden.",
    readingTime: "10 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Eine Datei zu konvertieren — ein Bild, ein PDF, ein Audio-Clip — sollte eine private Operation sein. Die Datei gehört Ihnen; ihr Inhalt, ihre Metadaten und ihre Existenz sind Details, die Sie nicht veröffentlicht haben. Doch die meisten 'kostenlosen Online-Konverter' arbeiten, indem sie Ihre Datei auf einen Server hochladen, wo sie gespeichert, protokolliert, ausgewertet oder geleakt werden kann. Dieser Leitfaden behandelt dieselbe Konvertierung, ohne eines dieser Risiken zu erzeugen."] },
    { type: "p", content: ["Wir gehen das echte Bedrohungsmodell durch, die Unterschiede zwischen Upload-basierten und In-Browser-Tools, praktische Härtungsschritte und wie Sie prüfen, ob ein Tool Ihre Daten wirklich auf dem Gerät lässt."] },

    { type: "h2", content: ["Was 'sichere Dateikonvertierung' wirklich bedeutet"] },
    { type: "p", content: ["Eine sichere Konvertierung ist eine, bei der während und nach dem Vorgang nichts leakt. Konkret heißt das:"] },
    { type: "list", items: [
      ["Kein Dritter hat jemals eine Kopie Ihrer Datei."],
      ["Nach der Konvertierung bleibt keine Spur der Datei zurück (keine Serverprotokolle, keine Caches, keine Kopien)."],
      ["Keine Metadaten in der Ausgabe legen mehr offen, als Sie beabsichtigt haben."],
      ["Die Konvertierung funktioniert auch in unzuverlässigen Netzwerkumgebungen."],
    ]},
    { type: "p", content: ["Beachten Sie: Diese Kriterien betreffen die Architektur, nicht die Versprechen eines Anbieters. Ein Tool, das 'Dateien nach 24 Stunden löscht', ist besser als eines, das sie ewig behält — aber es hat trotzdem eine Kopie, einen Speichereintrag und eine Zeitleiste erzeugt, die ein Angreifer (oder eine Vorladung) ins Visier nehmen kann. Die stärkste Garantie ist strukturell: Die Datei verlässt Ihr Gerät nie."] },

    { type: "h2", content: ["Die Risiken Upload-basierter Konverter"] },
    { type: "p", content: ["Hochladen-und-verarbeiten ist so verbreitet, dass sich die Risiken theoretisch anfühlen. Sie sind es nicht. So sieht die Realität für eine Datei aus, die Sie bei einem typischen Konverter hochladen:"] },
    { type: "list", items: [
      [{ text: "Abgreifen unterwegs. ", bold: true }, { text: "Ihr Dokument reist über Netzwerke, um den Server zu erreichen. Selbst mit HTTPS zählen die Endpunkte — und manche Konverter nutzen weiterhin schwaches oder defektes TLS." }],
      [{ text: "Speicherung ohne Ihre Kontrolle. ", bold: true }, { text: "Viele Tools speichern Uploads — für 'Wiederherstellung', Analysen oder Training. Behauptungen lassen sich weder prüfen noch auditieren." }],
      [{ text: "Metadaten-Leaks. ", bold: true }, { text: "Ein PDF oder Bild enthält EXIF, Geo-Tags, Autorennamen, Zeitstempel und Versionshistorie. Ein Server-Tool behält oft alles, was es nicht aktiv entfernt." }],
      [{ text: "Wiederverwendung und Weiterverkauf. ", bold: true }, { text: "Hochgeladene Dateien sind Daten. Sie können in Datensätze, Werbe-Profile oder Verkäufe einfließen — meist ohne echte, informierte Einwilligung." }],
      [{ text: "Leak-Exposition. ", bold: true }, { text: "Zentrale Server-Speicherung ist ein Ziel. Bei einem Angriff ist jede Datei dort offengelegt, unabhängig von jedem 'Löschversprechen'." }],
    ]},
    { type: "note", tone: "warning", title: "Die gefährlichste Datei ist die, die Sie einem Fremden anvertrauen", content: ["Eine Datei, die Sie nicht einmal einem Fremden per E-Mail schicken würden, bei einer beliebigen Website hochzuladen bedeutet dasselbe Datenrisiko — plus eine Kopie auf jemandes Platte und keine rechtliche Klarheit, wer sie hält. Wenn Ihr Inhalt Ihnen wirklich wichtig ist, sollte er nicht durch einen unbekannten Server reisen."] },

    { type: "h2", content: ["Das Bedrohungsmodell, konkret gemacht"] },
    { type: "p", content: ["Wenn Sie einen Dateikonverter nutzen, bewerten Sie ihn gegen diese Gegner:"] },
    { type: "table", columns: ["Gegner", "Upload-basierter Konverter", "In-Browser-Konverter (client-seitig)"], rows: [
      ["Netzwerkbeobachter (ISP, WLAN, VPN-Ausgang)", "Kann Uploads/Downloads sehen, wenn TLS schwach ist", "Sieht nur den Seitenaufruf; Konvertierung ist lokal"],
      ["Der Konverter-Betreiber", "Besitzt Ihre Datei; kann speichern, wiederverwenden, auswerten", "Erhält Ihre Datei nie"],
      ["Datenleak", "Alle gespeicherten Uploads gefährdet", "Nichts gespeichert, das offengelegt werden könnte"],
      ["Vorladung / rechtliche Anfrage", "Serverkopie kann erzeugt werden", "Es existiert keine Serverkopie"],
      ["Bösartige Eingabe (defekte Datei)", "Betrifft Server-Tools & Daten vieler Nutzer", "Läuft in der Browser-Sandbox; betrifft nur Ihren Tab"],
    ]},
    { type: "p", content: ["Die In-Browser-Spalte ist nicht in jeder Zeile für jedes Tool ein Vorteil — die Umsetzung zählt —, aber sie entfernt ganze Risikokategorien, die Upload-Tools nicht entfernen können, weil die Exposition schlicht nicht existiert."] },

    { type: "h2", content: ["Warum In-Browser-Konvertierung die sichere Standardwahl ist"] },
    { type: "p", content: ["WebAssembly-gestützte In-Browser-Konverter halten Ihre Datei während des gesamten Prozesses auf Ihrem Gerät. Die Seite lädt einen Codec (kompiliert zu Wasm), Sie wählen eine Datei, der Browser dekodiert und rekodiert lokal, und das Ergebnis lädt auf Ihre Platte. Was hat sich gegenüber dem Servermodell geändert? Alles in oder nach der Konvertierung passierte, ohne dass Ihre Daten eine Vertrauensgrenze überschritten."] },
    { type: "p", content: ["Das ist keine Magie — es ist Engineering. Codecs, die einst für Linux-Server kompiliert wurden (libvpx, libavcodec, libvips), bauen jetzt zu WebAssembly und reisen in den Tab. Die Leistung ist nahezu nativ. Große Dateien stoßen früher an praktische Grenzen als auf einem Server, aber für die überwältigende Mehrheit der Alltagskonvertierungen ist In-Browser sowohl schneller (kein Upload-Warten) als auch sicherer."] },
    { type: "p", content: ["Eine weitere Eigenschaft lohnt sich: Echte client-seitige Tools funktionieren offline. Trennen Sie die Verbindung, konvertieren Sie, und beobachten Sie den Erfolg. Ein Tool, das das nicht kann, sendet Ihre Daten per Definition irgendwann irgendwohin."] },

    { type: "h2", content: ["So prüfen Sie, ob ein Konverter wirklich client-seitig ist"] },
    { type: "list", ordered: true, items: [
      ["Trennen Sie Ihr Netzwerk und versuchen Sie eine Konvertierung. Gelingt sie, wird Ihre Datei nicht hochgeladen."],
      ["Öffnen Sie DevTools → Netzwerk. Ein rein lokaler Konverter zeigt kein POST/PUT Ihrer Datei — nur die ersten Seitenressourcen."],
      ["Prüfen Sie die Dateigröße im Netzwerk-Tab: Es darf keine ausgehende Anfrage geben, die der Größe Ihrer Eingabedatei entspricht (oder nahekommt)."],
      ["Lesen Sie die 'kein Upload'-Behauptung gegen die berichtete Architektur (WebAssembly, WASM-Codecs, On-Device-Verarbeitung)."],
      ["Bevorzugen Sie Tools ohne Konto; ein Konto ist meist ein Zeichen für Server-Speicherung."],
    ]},
    { type: "note", tone: "success", title: "Der Zwei-Minuten-Test", content: ["Die meisten dieser Prüfungen erledigen Sie in unter zwei Minuten. Scheitert ein 'No-Upload'-Tool am Offline-Test oder zeigt es, dass Dateibytes per Request abwandern, behandeln Sie es unabhängig vom Text als Upload-Tool."] },

    { type: "h2", content: ["Härtung über das Tool hinaus"] },
    { type: "p", content: ["Selbst mit einem perfekten client-seitigen Konverter zählt gute Dateihygiene:"] },
    { type: "list", items: [
      [{ text: "Metadaten gezielt entfernen. ", bold: true }, { text: "Entfernen Sie EXIF/GPS und Autorenfelder, wenn Sie sie nicht brauchen. Der EXIF-Cleaner von Convrs ist genau dafür gebaut." }],
      [{ text: "Für sensible Dokumente eine Kopie nutzen. ", bold: true }, { text: "Konvertieren Sie bei geteilten Dateien eine geschwärzte Version statt des Originals." }],
      [{ text: "Software aktuell halten. ", bold: true }, { text: "Codec-Fehler und Sandbox-Escapes sind selten, aber real; aktuelle Browser und aktuelle WASM-Bundles zählen." }],
      [{ text: "HTTPS bevorzugen, Auto-Uploads ablehnen. ", bold: true }, { text: "Wenn ein Tool doch einen Server nutzt, verlangen Sie First-Party-TLS, keine Drittanbieter-Scripts und keine stillen Cross-Site-Requests." }],
      [{ text: "Denken Sie darüber nach, was Sie konvertieren. ", bold: true }, { text: "Passwörter, Ausweise und Rechtsdokumente sollten so wenigen Datenberührungen wie möglich ausgesetzt sein — idealerweise null außerhalb Ihres Geräts." }],
    ]},

    { type: "h2", content: ["Konvertierungsspezifische Hinweise"] },
    { type: "list", items: [
      [{ text: "Bilder. ", bold: true }, { text: "Achten Sie auf EXIF/GPS. JPG→WebP oder PNG kann Metadaten mitführen, sofern das Tool sie nicht entfernt; bevorzugen Sie Tools, die im selben Durchgang bereinigen." }],
      [{ text: "PDF. ", bold: true }, { text: "PDFs betten Schriften, JavaScript, Anmerkungen und Versionshistorie. Eine sichere Konvertierung rendert den sichtbaren Inhalt in eine frische Datei und entfernt versteckte Ebenen." }],
      [{ text: "Dokumente (DOCX→PDF usw.). ", bold: true }, { text: "Änderungsverfolgung und Autorenidentitäten können naive Konvertierungen überleben. Wählen Sie Tools, die bekanntermaßen glätten." }],
      [{ text: "Audio/Video. ", bold: true }, { text: "Containerdateien tragen angehängte Streams und Metadaten-Tags. Stellen Sie sicher, dass unnötige Daten verworfen werden." }],
    ]},

    { type: "h2", content: ["Convrs setzt das um"]},
    { type: "p", content: ["Convrs übersetzt diesen Leitfaden in ein Produkt: Jeder Konverter ist eine WebAssembly-Pipeline in Ihrem Browser, ohne Server im Pfad. Es gibt kein Konto, keinen Upload-Endpunkt und keine Telemetrie, die Ihre Dateiinhalte sehen kann. Der EXIF-Cleaner und die Bildtools entfernen Metadaten gezielt; die Dokumenttools glätten versteckte Ebenen; das gesamte Toolkit funktioniert offline."] },
    { type: "p", content: ["Das Ziel ist, die sichere Option zur Standardwahl zu machen — und die Prüfung einfach. Wenn Sie das nächste Mal eine Datei konvertieren müssen, wenden Sie den Zwei-Minuten-Test auf das Tool an, das Sie greifen. Die Werkzeuge, die nur Ihr eigenes Gerät auf Ihre eigenen Daten anwenden, sind die einzigen, die Null-Leak versprechen können. Der Rest bittet Sie um Vertrauen; die client-seitigen brauchen es nicht."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "La guía definitiva para conversiones de archivos seguras",
    eyebrow: "Seguridad",
    description:
      "Convertir archivos en línea puede filtrar sus datos. Esta guía cubre los modelos de amenaza, por qué la conversión en el navegador supera a las herramientas basadas en subidas y cómo convertir archivos con seguridad.",
    excerpt:
      "La mayoría de los conversores en línea exigen subir sus archivos a un servidor. Ese único acto crea copias, registros y riesgos de fuga. Aquí está la guía completa para convertir archivos con seguridad.",
    readingTime: "10 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Convertir un archivo — una imagen, un PDF, un clip de audio — debería ser una operación privada. El archivo es suyo; su contenido, sus metadatos y su existencia son detalles que usted no eligió publicar. Sin embargo, la mayoría de los 'conversores gratuitos en línea' funcionan subiendo su archivo a un servidor, donde puede almacenarse, registrarse, explotarse o filtrarse. Esta guía trata de hacer las mismas conversiones sin crear ninguno de esos riesgos."] },
    { type: "p", content: ["Recorreremos el modelo de amenaza real, las diferencias entre las herramientas basadas en subidas y las del navegador, los pasos prácticos de endurecimiento y cómo verificar que una herramienta realmente mantiene sus datos en el dispositivo."] },

    { type: "h2", content: ["Qué significa realmente 'conversión de archivos segura'"] },
    { type: "p", content: ["Una conversión segura es aquella en la que nada se filtra durante ni después de la operación. Concretamente:"] },
    { type: "list", items: [
      ["Ningún tercero llega a poseer una copia de su archivo."],
      ["Tras la conversión no queda rastro del archivo (sin registros de servidor, sin cachés, sin copias)."],
      ["Ningún metadato de la salida expone más de lo que usted pretendía."],
      ["La conversión funciona incluso en condiciones de red no confiables."],
    ]},
    { type: "p", content: ["Observe que estos criterios hablan de arquitectura, no de las promesas de un proveedor. Una herramienta que 'borra archivos a las 24 horas' es mejor que una que los conserva para siempre, pero aun así creó una copia, un registro de almacenamiento y una línea de tiempo que un atacante (o una orden judicial) puede atacar. La garantía más fuerte es estructural: el archivo nunca sale de su dispositivo."] },

    { type: "h2", content: ["Los riesgos de los conversores basados en subidas"] },
    { type: "p", content: ["Subir y procesar es tan común que los riesgos parecen teóricos. No lo son. Esto es lo que realmente le ocurre a un archivo que sube a un conversor típico:"] },
    { type: "list", items: [
      [{ text: "Intercepción en tránsito. ", bold: true }, { text: "Su documento viaja por redes hasta llegar al servidor. Incluso con HTTPS, los extremos importan — y algunos conversores siguen usando TLS débil o roto." }],
      [{ text: "Almacenamiento fuera de su control. ", bold: true }, { text: "Muchas herramientas guardan las subidas, ya sea para 'recuperación', análisis o entrenamiento. No hay forma de verificar la afirmación ni de auditarla." }],
      [{ text: "Fugas de metadatos. ", bold: true }, { text: "Un PDF o una imagen contienen EXIF, geoetiquetas, nombres de autor, marcas de tiempo e historial de revisiones. Una herramienta de servidor suele conservar todo lo que no elimina activamente." }],
      [{ text: "Reutilización y reventa. ", bold: true }, { text: "Los archivos subidos son datos. Pueden llegar a conjuntos de entrenamiento, perfiles de publicidad o ventas — por lo general sin un consentimiento informado real." }],
      [{ text: "Exposición por brecha. ", bold: true }, { text: "El almacenamiento centralizado es un objetivo. Cuando lo atacan, cada archivo queda expuesto con independencia de cualquier promesa de 'borrado'." }],
    ]},
    { type: "note", tone: "warning", title: "El archivo más peligroso es el que confía a un desconocido", content: ["Subir a un sitio aleatorio un archivo que no enviaría por correo a un desconocido es el mismo riesgo de datos, más una copia en el disco de alguien y ninguna claridad legal sobre quién la tiene. Si el contenido le importa de verdad, no debería hacer un viaje de ida y vuelta por un servidor desconocido."] },

    { type: "h2", content: ["El modelo de amenaza, en concreto"]},
    { type: "p", content: ["Cuando use un conversor de archivos, evalúelo frente a estos adversarios:"] },
    { type: "table", columns: ["Adversario", "Conversor basado en subidas", "Conversor en el navegador (lado del cliente)"], rows: [
      ["Observador de red (ISP, Wi-Fi, salida VPN)", "Puede ver subidas/descargas si el TLS es débil", "Ve solo la carga de la página; la conversión es local"],
      ["El operador del conversor", "Posee su archivo; puede guardarlo, reutilizarlo o explotarlo", "Nunca recibe su archivo"],
      ["Una brecha de datos", "Todas las subidas guardadas en riesgo", "Nada almacenado que exponer"],
      ["Citación / petición legal", "Se puede producir la copia del servidor", "No existe copia en el servidor"],
      ["Entrada maliciosa (archivo defectuoso)", "Explota las herramientas del servidor y datos de muchos", "Corre en el sandbox del navegador; afecta solo su pestaña"],
    ]},
    { type: "p", content: ["La columna del navegador no es una ventaja en todas las filas para todas las herramientas — la implementación sigue importando — pero elimina categorías enteras de riesgo que las herramientas de subida no pueden eliminar, porque la exposición simplemente no existe."] },

    { type: "h2", content: ["Por qué la conversión en el navegador es la opción segura por defecto"]},
    { type: "p", content: ["Los conversores del navegador impulsados por WebAssembly mantienen su archivo en su dispositivo durante todo el proceso. La página carga un códec (compilado a Wasm), usted elige un archivo, el navegador lo decodifica y recodifica localmente, y el resultado se descarga a su disco. ¿Qué cambió frente al modelo de servidor? Todo en o después de la conversión ocurrió sin que sus datos cruzaran una frontera de confianza."] },
    { type: "p", content: ["Esto no es magia — es ingeniería. Los códecs que una vez se compilaron para servidores Linux (libvpx, libavcodec, libvips) ahora se compilan a WebAssembly y viajan a la pestaña. El rendimiento es casi nativo. Los archivos grandes chocan antes con límites prácticos que en un servidor, pero para la abrumadora mayoría de las conversiones cotidianas, el navegador resulta a la vez más rápido (sin espera de subida) y más seguro."] },
    { type: "p", content: ["Hay una propiedad más que aprovechar: las herramientas genuinamente locales funcionan sin conexión. Desconecte, convierta y observe el éxito. Una herramienta que no pueda hacerlo está, por definición, enviando sus datos a algún lugar en algún momento."] },

    { type: "h2", content: ["Cómo verificar que un conversor es realmente local"]},
    { type: "list", ordered: true, items: [
      ["Desconecte su red y pruebe una conversión. Si triunfa, su archivo no se está subiendo."],
      ["Abra DevTools → Red. Un conversor puramente local no muestra ningún POST/PUT de su archivo; solo los recursos iniciales de la página."],
      ["Compruebe el tamaño de archivo en la pestaña Red: no debe haber ninguna petición saliente igual (o casi igual) al tamaño de su entrada."],
      ["Compare la afirmación de 'sin subidas' con la arquitectura declarada (WebAssembly, códecs WASM, procesamiento local)."],
      ["Prefiera herramientas que no exijan cuenta; una cuenta suele ser señal de almacenamiento en servidor."],
    ]},
    { type: "note", tone: "success", title: "La prueba de dos minutos", content: ["Puede hacer casi todas estas comprobaciones en menos de dos minutos. Si una herramienta 'sin subidas' falla la prueba sin conexión o muestra que los bytes de su archivo salen en una petición, trátela como herramienta de subida, diga lo que diga."] },

    { type: "h2", content: ["Endurecimiento más allá de la herramienta"]},
    { type: "p", content: ["Incluso con un conversor local perfecto, la buena higiene de archivos importa:"] },
    { type: "list", items: [
      [{ text: "Limpie los metadatos a propósito. ", bold: true }, { text: "Elimine EXIF/GPS y campos de autor cuando no los necesite. El limpiador de EXIF de Convrs está hecho exactamente para esto." }],
      [{ text: "Use una copia quemada para documentos delicados. ", bold: true }, { text: "Convierta una versión redactada en lugar de su original cuando haya intercambio de por medio." }],
      [{ text: "Mantenga el software al día. ", bold: true }, { text: "Los fallos de códec y los escapes del sandbox son raros pero reales; los navegadores actualizados y los paquetes WASM actualizados importan." }],
      [{ text: "Prefiera HTTPS y rechace subidas automáticas. ", bold: true }, { text: "Si una herramienta usa servidor, exija TLS de primera parte, nada de scripts de terceros y ninguna petición entre sitios silenciosa." }],
      [{ text: "Piense en qué convierte. ", bold: true }, { text: "Contraseñas, identificaciones y documentos legales deberían enfrentar el mínimo posible de contactos con datos — idealmente cero fuera de su dispositivo." }],
    ]},

    { type: "h2", content: ["Notas específicas de conversión"]},
    { type: "list", items: [
      [{ text: "Imágenes. ", bold: true }, { text: "Cuidado con EXIF/GPS. Convertir JPG→WebP o PNG puede arrastrar metadatos salvo que la herramienta los elimine; prefiera las que permiten limpiarlos en la misma pasada." }],
      [{ text: "PDF. ", bold: true }, { text: "Los PDF incrustan fuentes, JavaScript, anotaciones e historial de revisiones. Una conversión segura renderiza el contenido visible en un archivo nuevo, eliminando capas ocultas." }],
      [{ text: "Documentos (DOCX→PDF, etc.). ", bold: true }, { text: "Los comentarios de control de cambios y las identidades de autor pueden sobrevivir a conversiones naíf. Elija herramientas conocidas por aplanar." }],
      [{ text: "Audio/vídeo. ", bold: true }, { text: "Los contenedores llevan flujos adjuntos y etiquetas de metadatos. Asegúrese de que el conversor descarte lo innecesario." }],
    ]},

    { type: "h2", content: ["Lo que hace Convrs"]},
    { type: "p", content: ["Convrs traduce esta guía a un producto: cada conversor es una canalización WebAssembly que corre en su navegador, sin servidor en el camino. No hay cuenta, ni endpoint de subida, ni telemetría que pueda ver el contenido de sus archivos. Su limpiador de EXIF y sus herramientas de imagen eliminan metadatos a propósito; sus herramientas de documento aplanan capas ocultas; y todo el conjunto funciona sin conexión."] },
    { type: "p", content: ["El objetivo es que la opción segura sea la predeterminada — y que la verificación sea fácil. La próxima vez que necesite convertir un archivo, aplique la prueba de dos minutos a la herramienta que use. Las que solo aplican su propio dispositivo a sus propios datos son las únicas que pueden prometer cero fugas. El resto le pide que confíe; las locales no lo necesitan."] },
  ],
};

const guide: GuideDefinition = {
  slug: "secure-file-conversion-guide",
  content: { en, tr, de, es },
};

export default guide;