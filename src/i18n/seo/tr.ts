// Faz 3 — SEO icerik sablonu: Türkçe metinler.
import type { SeoPhrases } from "./types";

export const tr: SeoPhrases = {
  claims: {
    webpSmaller: {
      q: "WebP, JPG'den daha mı küçük?",
      a: "Genellikle evet. WebP, aynı görsel kalitede JPG'ye göre çoğu zaman belirgin şekilde küçük dosyalar üretir; bu da sayfaların daha hızlı yüklenmesini ve bant genişliği tasarrufu sağlar.",
    },
    pngTransparency: {
      q: "PNG şeffaflığı destekler mi?",
      a: "Evet. PNG, tam alfa kanallı kayıpsız bir formattır; şeffaf arka planlar korunur — logolar, ikonlar ve grafikler için idealdir.",
    },
    jpgPhoto: {
      q: "JPG fotoğraflar için iyi bir format mı?",
      a: "Evet. JPG, fotoğrafları sıkıştırarak dosyanın küçük kalmasını sağlar ancak kayıplıdır — bazı detaylar atılır. Web ve fotoğraf makineleri için standart fotoğraf formatıdır.",
    },
    heicIos: {
      q: "HEIC neden dönüştürülmeli?",
      a: "HEIC, iPhone ve iPad'in varsayılan fotoğraf formatıdır — verimlidir ancak her yerde desteklenmez. HEIC'i JPG'ye dönüştürmek fotoğraflarınızı her uygulamada ve her cihazda açılabilir yapar.",
    },
    icoWindows: {
      q: "ICO dosyasına ne zaman ihtiyaç duyarım?",
      a: "ICO, Windows, tarayıcılar ve sekmeler için klasik favicon formatıdır. Favicon okunamadığında veya şeffaf bir raster kopya gerektiğinde PNG sürümü işinize yarar.",
    },
    svgVector: {
      q: "SVG'nin PNG'den farkı nedir?",
      a: "SVG vektör tabanlıdır, her boyutta keskin kalır; PNG ise sabit çözünürlüklü bir bitmap'tir. Yükleme gibi bir raster görsel gerektiğinde SVG→PNG dışa aktarma kullanılır.",
    },
    base64Text: {
      q: "Base64 nedir?",
      a: "Base64, metni veya ikili veriyi güvenli ASCII karakterlerine kodlar; böylece veri yalnızca metin içeren ortamlarda, e-postalarda veya JSON içinde bozulmadan taşınabilir.",
    },
    imageToBase64: {
      q: "Bir görsel neden Base64'e çevrilir?",
      a: "Base64 veri URI'si olarak gömülen görseller HTML, CSS veya JSON içine doğrudan yerleştirilebilir — ayrı görsel dosyaları barındıramadığınızda birebirdir.",
    },
    imageCompress: {
      q: "Sıkıştırma görselimi ne kadar küçültür?",
      a: "Kalite odaklı sıkıştırma dosya boyutunu çoğu zaman ciddi şekilde azaltır. Çok daha küçük bir dosya için biraz görsel kaliteden ödün verebilirsiniz ve her şey cihazınızda gerçekleşir.",
    },
    removeBg: {
      q: "Arka plan silme her fotoğrafta çalışır mı?",
      a: "Konu ile arka plan arasındaki kontrast net olduğunda en iyi sonucu verir. Sonuç, e-ticaret veya tasarım için hazır, şeffaf arka planlı bir PNG olarak döner.",
    },
    imageResize: {
      q: "Boyutlandırma dosya boyutunu küçültür mü?",
      a: "Evet — daha az piksel, daha az bayt demektir; dosya küçülür. Boyutlandırma ayrıca bir platformun tam ölçülerine (ör. 1080px sosyal medya kapakları) uymanızı sağlar.",
    },
    imageCrop: {
      q: "Görsel neden kırpılır?",
      a: "Kırpma istenmeyen kenarları temizler ve konuya odaklanmanızı ya da kare avatar veya 16:9 kapak gibi belirli bir orana uymanızı sağlar.",
    },
    filtersGraphic: {
      q: "Görsel filtreleri ne yapar?",
      a: "Siyah beyaz, sepya, parlaklık veya kontrast gibi filtreler tarayıcınızda piksel piksel uygulanır — orijinal dosyanız asla değiştirilmez veya yüklenmez.",
    },
    watermark: {
      q: "Neden filigran eklenir?",
      a: "Filigran, görselin sahibini belli eden bir logo veya metni görselin üzerine bindirerek fotoğraflarınızı markalar ve korur, kopyalanmasını caydırır.",
    },
    palette: {
      q: "Renk paleti nasıl çıkarılır?",
      a: "Araç yüklenen görseli analiz eder ve baskın renklerini toplar; size tutarlı bir tasarım sistemi için hazır bir palet sunar.",
    },
    exif: {
      q: "EXIF ne içerir ve neden kaldırılır?",
      a: "EXIF; kamera modeli, GPS konumu ve çekim tarihi gibi gizli meta verileridir. Fotoğrafları çevrimiçi paylaşmadan önce bunları silmek mahremiyetinizi korur.",
    },
    jsonStructured: {
      q: "JSON en çok ne için kullanılır?",
      a: "JSON; API'ler, veritabanları ve yapılandırma dosyaları tarafından kullanılan katı, makine tarafından okunabilir bir formattır. Doğrulama ve tutarlı biçimlendirme onu geçerli ve okunabilir tutar.",
    },
    csvTabular: {
      q: "CSV nedir?",
      a: "CSV, tablo verilerini virgülle ayrılmış düz metin olarak saklar; böylece aynı tablo herhangi bir tablo editöründe veya veritabanı aracında açılır.",
    },
    markdownHtml: {
      q: "Markdown neden HTML'e çevrilir?",
      a: "Markdown hafif ve okunması kolaydır; HTML'e dönüştürmek size bir web sitesine, içerik yönetim sistemine veya e-postaya yapıştırabileceğiniz hazır bir sayfa verir.",
    },
    pdfMultiPage: {
      q: "PDF sayfalarının özelliği nedir?",
      a: "PDF; yazı tiplerini, düzeni ve sayfalama düzenini her cihazda aynı tutar. Çok sayfalı bir dosya sayfa sayfa işlenebildiğinden birleştirme, bölme veya görsele aktarma için idealdir.",
    },
    docxEditing: {
      q: "DOCX mi PDF mi kullanmalıyım?",
      a: "DOCX, zengin metin ve stiller içeren düzenlenebilir Word formatıdır; PDF ise düzeni her cihazda kilitlediği için paylaşma ve yazdırma içindir.",
    },
    xlsxRows: {
      q: "XLSX ile CSV arasındaki fark nedir?",
      a: "XLSX, Excel'in sayfalar, formüller ve biçimlendirme içeren çalışma kitabı formatıdır; CSV ise düz metin tablodur. XLSX→CSV dönüşümü ham veriyi taşınabilir tutar.",
    },
    yamlHuman: {
      q: "JSON yerine neden YAML?",
      a: "YAML, JSON'dan daha özlü ve insan dostudur; bu yüzden yapılandırma dosyalarında yaygındır. Dönüştürme, bir JSON beslemesini okunması ve bakımı kolay hale getirir.",
    },
    sqlPretty: {
      q: "SQL neden biçimlendirilir?",
      a: "Tutarlı girintili, biçimlendirilmiş SQL'i okumak, incelemek ve hata ayıklamak çok daha kolaydır. Çıktı geçerli kalır ve çalıştırılmaya hazır olur.",
    },
    vcfContacts: {
      q: "VCF dosyaları ne için kullanılır?",
      a: "VCF, kişiler için vCard formatıdır. Kişileri CSV'ye dönüştürmek onları bir elektronik tabloda açmayı veya uygulamalar arasında taşımayı kolaylaştırır.",
    },
    urlEncode: {
      q: "URL kodlamaya ne zaman ihtiyaç duyarım?",
      a: "URL'ler yalnızca güvenli karakterler içerebilir. Kodlama; boşluk, & ve diğer sembolleri % kodlarına çevirir; böylece özel karakterli bağlantılar doğru çalışır.",
    },
    qrUrls: {
      q: "QR kod ne yapabilir?",
      a: "Akıllı telefon kamerası, QR kodu tarayarak bir URL'yi açar, bir Wi-Fi ağına bağlanır veya metni anında paylaşır — ekstra uygulama gerekmez.",
    },
    jwtTokens: {
      q: "JWT'nin içinde ne var?",
      a: "JWT üç bölümden oluşur: başlık, payload ve imza. Kod çözme bilgileri (claims) ortaya çıkarır ancak bir token'ın doğrulanması için yine de imza anahtarı gerekir.",
    },
    hashOneWay: {
      q: "Bir hash geri çevrilebilir mi?",
      a: "Hayır — hashing tek yönlüdür. Sabit uzunlukta bir parmak izi üretir ve orijinal girdiye geri döndürülemez; bu yüzden bütünlük kontrolünde kullanılır.",
    },
    colorModels: {
      q: "HEX, RGB veya HSL — hangisini seçmeliyim?",
      a: "Her model farklı duruma uyar: ekran için HEX ve RGB, sezgisel renk tonu (hue), doygunluk ve parlaklık ayarı için HSL. Dönüştürme rengi araçlar arasında aynı tutar.",
    },
    unixEpoch: {
      q: "Unix zaman nedir?",
      a: "Unix zaman, 1970-01-01 00:00 UTC'den bu yana geçen saniyeleri sayar. Zaman damgaları varsayılan olarak UTC'de gösterilir; okunabilir tarih saat diliminize bağlıdır.",
    },
    uuidStandard: {
      q: "UUID'ler benzersiz mi?",
      a: "Evet. Sürüm 4 UUID'ler 122 rastgele bitten üretilir; bu yüzden çakışma ihtimali astronomik düzeyde düşüktür. Veritabanları ve sistemler genelinde standart tanımlayıcılardır.",
    },
    passwordStrength: {
      q: "Güçlü bir şifreyi ne yapar?",
      a: "Önce uzunluk, sonra çeşitlilik: küçük ve büyük harfleri, rakamları ve sembolleri birleştirin; sözlük sözcüklerinden ve kişisel bilgilerden kaçının.",
    },
    cssMinify: {
      q: "Minifikasyon ne yapar?",
      a: "Minifikasyon; boşlukları, yorumları ve gereksiz biçimlendirmeyi CSS ve JavaScript'ten temizleyerek dosyaları küçültür; üretim ve daha hızlı sayfa yükleme sağlar.",
    },
    cssUnits: {
      q: "px, rem veya em — farkı nedir?",
      a: "px mutlak bir ekran birimidir; rem kök yazı boyutuyla, em ise üst öğeyle ölçeklenir. Aralarında dönüştürme, duyarlı CSS'inizi öngörülebilir tutar.",
    },
    htmlRfc: {
      q: "HTML entity'ler neden kullanılır?",
      a: "&amp; ve &lt; gibi HTML entity'ler özel karakterlerin HTML ve e-posta içinde, işaretlemenin izin verilmediği yerlerde bile doğru ve güvenli görünmesini sağlar.",
    },
    boxShadow: {
      q: "Bir gölge (box shadow) nasıl oluşturulur?",
      a: "Gölge; yatay ve dikey kayma, bulanıklık yarıçapı, yayılma ve renk ile tanımlanır. Üretici size kopyalamaya hazır, birebir CSS'i verir.",
    },
    metaTags: {
      q: "Hangi meta etiketler önemlidir?",
      a: "Başlık, açıklama ve Open Graph etiketleri bir sayfanın arama sonuçlarında ve sosyal paylaşımlarda nasıl göründüğünü belirler. Tutarlı üretmek geliştiricilere zaman kazandırır.",
    },
    chmodPerms: {
      q: "chmod sayıları nasıl çalışır?",
      a: "chmod; sahip, grup ve diğerleri için üç sekizli (oktal) basamak kullanır (r=4, w=2, x=1). Hesaplayıcı her değerin tam olarak ne anlama geldiğini gösterir.",
    },
    jsKeycode: {
      q: "Keycode nedir?",
      a: "Keycode, tarayıcının tuş basımı için bildirdiği sayısal tanımlayıcıdır; klavye kısayolları, oyunlar veya formlar oluştururken kullanılır.",
    },
    tailwindClasses: {
      q: "Tailwind paleti ne için kullanılır?",
      a: "Palet, bir Tailwind teması için ihtiyacınız olan renk ölçeklerini üretir; böylece projenizde her ton tutarlı kalır.",
    },
    urlParse: {
      q: "Bir URL neden ayrıştırılır?",
      a: "Ayrıştırma, bir bağlantıyı protokol, ana bilgisayar (host), yol ve sorgu dizesine böler — yönlendirmeleri, izleyicileri veya bozuk bağlantıları hata ayıklarken işe yarar.",
    },
    caseText: {
      q: "Metin büyük/küçük harf değişikliğine ne zaman ihtiyaç duyarım?",
      a: "Küçük harf, BÜYÜK HARF veya Başlık Durumu arasında geçiş; başlıkları, dışa aktarma etiketlerini ve veri kümelerini tutarlı tutar.",
    },
    wordCount: {
      q: "Kelime ve karakter neden sayılır?",
      a: "Kelime, karakter ve okuma süresi sayımları makalelerin, sosyal paylaşımların, meta başlıkların ve çevirilerin uzunluk sınırlarına uymanıza yardımcı olur.",
    },
    loremPlaceholder: {
      q: "Lorem Ipsum neden kullanılır?",
      a: "Lorem Ipsum, gerçek içerikle dikkat dağılmadan bir düzenin nasıl görüneceğini önizlemenizi sağlayan yer tutucu metindir.",
    },
    textDiff: {
      q: "Bir diff ne gösterir?",
      a: "Diff, iki metin arasında tam olarak hangi satırların veya karakterlerin değiştiğini vurgular; bu da düzenlemeleri hızlıca incelemeyi sağlar.",
    },
    screenViewport: {
      q: "Viewport (görünüm alanı) nedir?",
      a: "Viewport, bir web sayfasının görünür alanıdır. Gerçek zamanlı kontrol etmek, her ekran için duyarlı düzenler oluşturmanıza yardımcı olur.",
    },
    mp4Webm: {
      q: "WebM, MP4'ten daha mı iyi?",
      a: "WebM, Google'ın açık ve hafif video formatıdır — web daha küçük dosyalar sunar. MP4 ise en yaygın uyumlu formattır. Yalnızca WebM kabul eden bir site için dönüştürme işe yarar.",
    },
    mp3Audio: {
      q: "MP3 neden bu kadar yaygın?",
      a: "MP3, en yaygın desteklenen ses formatıdır. Sesi birkaç kat küçültürken müzik ve ses için çok iyi kaliteyi korur.",
    },
    wavLossless: {
      q: "WAV mı MP3 mi?",
      a: "WAV, kayıpsız PCM sestir — birebir ama büyük. MP3, çok daha küçük bir dosya için bir miktar detaydan ödün verir. WAV→MP3 dönüşümü sesi paylaşmayı kolaylaştırır.",
    },
    gifLite: {
      q: "GIF hâlâ işe yarıyor mu?",
      a: "GIF, oynatıcısız her yerde oynayan hafif bir animasyonlu görseldir — kısa klipler için idealdir, ancak 256 renkle sınırlıdır.",
    },
    audioTrim: {
      q: "Kırpma (trimming) ne yapar?",
      a: "Kırpma, klibi istediğiniz bölüme keser ve baştaki ya da sondaki sessizliği veya istenmeyen bölümleri temizler.",
    },
    volumeBoost: {
      q: "Sesi yükseltince ne olur?",
      a: "Kazanç (gain) artırılınca ses daha yüksek olur. 0 dB'in çok üzerine çıkılırsa tepe noktaları kırpılır (clip) ve bozulma oluşur; bu yüzden küçük bir artış en iyisidir.",
    },
    videoSpeed: {
      q: "Hız değişimi ses tonunu etkiler mi?",
      a: "Hayır — araç, ses tonunu sabit tutarak oynatma hızını yeniden zamanlar; böylece daha hızlı veya yavaş video doğal sesle kalır.",
    },
    videoResize: {
      q: "Video neden küçültülür?",
      a: "Çözünürlüğü düşürmek (ör. 1080p → 720p) dosya boyutunu azaltır; bu, platformun boyut veya çözünürlük sınırı olduğunda işe yarar.",
    },
    muteVideo: {
      q: "Videoyu sessize almak ne yapar?",
      a: "Sessize alma, görüntüyü ve zamanlamayı tamamen aynı tutarak ses parçasını kaldırır veya susturur.",
    },
    voiceRecorder: {
      q: "Kaydım nerede saklanır?",
      a: "Kaydınız tarayıcınızda işlenir ve indirilir — sunucuya asla yüklenmez.",
    },
    speechText: {
      q: "Konuşma tanıma, söylediklerimi nasıl tanır?",
      a: "Mikrofonunuzu gerçek zamanlı yazıya dökmek için tarayıcınızın konuşma tanıma servisini kullanır. Hiçbir ses dosyası sunucularımıza yüklenmez.",
    },
  },

  headingFile: (from, to) =>
    `${from}'u ${to}'ya ücretsiz çevrimiçi dönüştürme`,
  headingPaste: (from, to) =>
    `${from}'u ${to}'ya ücretsiz çevrimiçi dönüştürme`,
  headingGenerate: (to) =>
    `${to} ücretsiz çevrimiçi nasıl oluşturulur`,

  stepsFile: (from, to) => [
    `${from} dosyanızı seçin veya dönüştürücüye sürükleyip bırakın — tarayıcınızda kalır.`,
    `Kalite, boyut veya çıktı seçenekleri gibi isteğe bağlı ayarları yapın.`,
    `Dönüştür'e tıklayın — dosya cihazınızda yerel olarak işlenir.`,
    `${to} dosyanızı indirin. Saniyeler içinde hazır olur.`,
  ],
  stepsPaste: (from, to) => [
    `${from} verinizi giriş paneline yapıştırın — hiçbir şey yüklenmez.`,
    `Seçenekleri inceleyin ve gösteriliyorsa yönü seçin (${from} → ${to}).`,
    `Dönüştür / Biçimlendir'e tıklayın — sonuç tarayıcınızda üretilir.`,
    `${to} sonucunu çıktı panelinden kopyalayın.`,
  ],
  stepsGenerate: (to) => [
    `${to} için seçenekleri ayarlayın.`,
    `Oluştur'a tıklayın — sonuç tarayıcınızda anında üretilir.`,
    `Çıktıyı kopyalayın veya oluşturulan dosyayı indirin.`,
  ],

  qHow: (from, to) => `${from}'u ${to}'ya ücretsiz nasıl dönüştürürüm?`,
  qHowGenerate: (to) => `${to} ücretsiz nasıl oluşturabilirim?`,
  aHowFile: (from, to) =>
    `${from} dosyanızı seçin (veya sürükleyip bırakın), Dönüştür'e tıklayın ve ${to} sonucunu indirin. Kayıt yok, ücret yok ve dosya asla tarayıcınızdan çıkmaz.`,
  aHowPaste: (from, to) =>
    `${from} verinizi yapıştırın, Dönüştür'e tıklayın ve ${to} sonucunu kopyalayın. Ücretsizdir, tamamen tarayıcınızda çalışır ve hiçbir şey yüklenmez.`,
  aHowGenerate: (to) =>
    `Seçeneklerinizi ayarlayın, Oluştur'a tıklayın ve sonucu kopyalayın veya indirin. Ücretsizdir ve cihazınızda yerel olarak üretilir.`,

  qPrivate: (name) => `${name} özel ve güvenli mi?`,
  aPrivate: (name) =>
    `Evet. ${name} tamamen tarayıcınızda çalışır; verileriniz cihazınızdan asla ayrılmaz — hiçbir şey sunucuya yüklenmez veya saklanmaz.`,
  wasmSentence:
    " Video ve ses araçları, cihazınızın belleğinde çalışan bir WebAssembly motoru kullanır.",

  qLimit: "En büyük dosya boyutu nedir?",
  aLimit: (mb) =>
    `Dosya başına ${mb} MB. Her şey cihazınızın belleğinde çalıştığı için çok büyük dosyalar tarayıcıyı yavaşlatabilir veya dondurabilir.`,
};