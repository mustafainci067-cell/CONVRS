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

  useCase: (category) => {
    switch (category) {
      case "image":
        return "İnsanlar görsel dönüşümü günlük işler için kullanır: web için fotoğrafları küçültmek, baskı veya e-ticaret için dosyaları hazırlamak ya da platformun istediği biçimi sağlamak. İşlem yerelde gerçekleştiği için kalite ayarlarının kontrolü sizde kalır ve orijinalleriniz hiçbir yere gönderilmez.";
      case "document":
        return "Doküman dönüşümü, bir dosya bir sınırı aşmak zorunda kaldığında önem kazanır — müşteri farklı bir ofis paketi açtığında, bir yükleme formu yalnızca tek biçimi kabul ettiğinde ya da bir raporun her cihazda aynı basılması gerektiğinde. Bunu tarayıcıda yapmak en riskli adımı ortadan kaldırır: dokümanınızı bilinmeyen bir sunucuya teslim etmeyi.";
      case "developer":
        return "Tarayıcı tabanlı araçlar, kontrol edilebilir oldukları için tercih edilir. Neyin girdiğini açıkça görür, istediğiniz çıktıyı elde edersiniz ve verilerinizi karşılık vermeden aracı istediğiniz kadar tekrar çalıştırabilirsiniz. Editörünüzle terminaliniz arasına doğal olarak oturur.";
      case "text":
        return "Metin işleri çoğunlukla hızlı ve tekrarlıdır. Bu araç tekrarlı kısmı sizden alır — büyük/küçük harf düzeltme, uzunluk ölçme veya sürüm karşılaştırma — böylece siz metnin gerçekte söylediğine odaklanırsınız. Her şey yerelde işlendiği için gizli taslaklar bile özel kalır.";
      case "media":
        return "Medya dosyaları, üzerinde çalıştığınız en büyük ve en hassas dosyalardır. Onları yerinde işlemek, ses veya görüntünün ağa hiç çıkmadığı anlamına gelir: yükleme çubuğu, sunucu kaydı veya arta kalan kopya yok — yalnızca cihazınızdaki sonuç.";
      default:
        return "Küçük yardımcı araçlar anlık ve öngörülebilir olduklarında güven kazanır. Her şey yerelde çalıştığı için gördüğünüz yanıt, aldığınız yanıttır — bekleme de izleme de yok, hiçbir şey sunucuya gitmez.";
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