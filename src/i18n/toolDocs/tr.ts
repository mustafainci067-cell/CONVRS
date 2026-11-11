// Faz 5 — Long-form SEO icerik motoru: Turkce metinler.
import type { ToolDocPhrases } from "./types";

export const tr: ToolDocPhrases = {
  title: (category, name, from, to) => {
    switch (category) {
      case "image":
        return `Tarayıcıda ${from} → ${to} dönüşümü neden önemli?`;
      case "document":
        return `${from} → ${to}: pratik ve gizlilik odaklı bir rehber`;
      case "media":
        return `${from} → ${to}: adım adım eksiksiz bir anlatım`;
      default:
        return `${name} nedir ve nasıl çalışır?`;
    }
  },

  intro: (archetype, name, from, to) => {
    switch (archetype) {
      case "file":
        return `${name}, ${from} dosyanızı tamamen tarayıcınızda ${to} biçimine dönüştürür. Kurulum, hesap veya filigran yok: dosyayı seçip bırakın, ayarları gözden geçirin ve sonucu saniyeler içinde indirin. Dosyalarınız cihazınızda kalır.`;
      case "paste":
        return `${name}, girdinizi tam bulunduğunuz yerde işler. Metninizi yapıştırın, varsa ayarları gözden geçirin ve ${to} çıktısını kopyalayın — yükleme, hesap veya sunucu beklemesi yok.`;
      default:
        return `${name}, ${to} sonucunu anında tarayıcınızda üretir. İhtiyacınız olan seçenekleri ayarlayın, üretin ve sonucu kopyalayın veya indirin — ücretsiz, gizli ve tamamen yerelde çalışır.`;
    }
  },

  useCase: (category, name, from, to) => {
    const src = from === "-na-" ? name : from;
    switch (category) {
      case "image":
        return `Tasarımcılar, e-ticaret yöneticileri ve geliştiriciler günlük iş akışlarında ${src} dosyalarını ${to} formatına çevirmek için ${name} aracını kullanır: web sitelerinde Core Web Vitals (LCP) hızını artırmak, pazaryeri görsel kurallarını karşılamak veya şeffaf katmanları korumak. ${src} → ${to} dönüşümü tamamen yerelde gerçekleştiği için piksel kalitesinin kontrolü sizde kalır ve orijinalleriniz hiçbir yere gönderilmez.`;
      case "document":
        return `${name} ile ${src} verilerini ${to} biçimine dönüştürmek, dosyalar farklı yazılımlar veya kurumlar arasında taşınırken kritik önem taşır — bir müşteri farklı bir ofis programı kullandığında, resmi bir portal yalnızca ${to} kabul ettiğinde ya da tablo verilerinin veritabanına aktarılması gerektiğinde. Bu işlemi tarayıcıda yapmak en riskli adımı ortadan kaldırır: gizli ${src} belgenizi yabancı bir sunucuya yüklemeyi.`;
      case "developer":
        return `Yazılım geliştiriciler, üretim ortamındaki veri yapılarını, anahtarları veya kod bloklarını üçüncü taraf sunuculara göndermeden ${to} çıktısı üretmek için ${name} aracını tercih eder. Girdiyi anında denetler, deterministik ${to} sonucunu alır ve editörünüzle terminaliniz arasında güvenle çalışırsınız.`;
      case "text":
        return `İçerik editörleri ve yazılımcılar için ${src} verisini ${to} yapısına dönüştürmek hız ve doğruluk gerektirir. ${name}, manuel biçimlendirme hatalarını ortadan kaldırırken yayınlanmamış taslaklarınızın ve şirket içi metinlerinizin %100 yerel tarayıcı belleğinde kalmasını sağlar.`;
      case "media":
        return `Ses ve video dosyaları (${src} → ${to}), üzerinde çalıştığınız en yüksek boyutlu ve en özel içeriklerdir. ${name} aracını cihazınızda yerel olarak çalıştırmak, medyanızın internet ağına hiç çıkmaması demektir: dakikalar süren yükleme çubukları, bulut kuyrukları veya sunucuda kalan kopyalar olmadan doğrudan ${to} çıktısını indirirsiniz.`;
      default:
        return `${name}, ihtiyaç duyduğunuz ${to} sonucunu doğrudan tarayıcı sekmenizde gerçek zamanlı olarak hesaplar. Her şey yerel bellekte çalıştığı için bekleme süresi, izleme veya sunucu trafiği olmadan kesintisiz çalışır.`;
    }
  },

  privacy: (name) =>
    `Yapısal olarak gizlidir: ${name} yalnızca cihazınızın belleğinde çalışır. Dosyalarınız, metinleriniz ve verileriniz tarafımızca hiçbir yere yüklenmez, saklanmaz ve kaydedilmez — yolda bir sunucu yoktur.`,

  wasm: (name) =>
    `Ağır işi WebAssembly üstlenir: bir masaüstü uygulamasının kullanacağı codec motorları, tarayıcınızın içinde çalışacak şekilde derlenir. Böylece ${name} masaüstü kalitesinde sonuç üretir ve dosyanız yine cihazınızda kalır.`,

  features: (hasMedia, sizeLimitMb) => [
    ...(sizeLimitMb ? [`Dosya başına ${sizeLimitMb} MB'a kadar`] : []),
    ...(hasMedia
      ? ["WebAssembly codec motoru — tarayıcıda masaüstü kalitesinde işleme"]
      : []),
    "%100 tarayıcıda — hiçbir şey yüklenmez",
    "Hesap veya kayıt gerekmez",
    "Ücretsiz, filigransız",
    "Masaüstü ve mobil tarayıcılarda çalışır",
    "Kaynak verileriniz asla saklanmaz veya kaydedilmez",
  ],
};