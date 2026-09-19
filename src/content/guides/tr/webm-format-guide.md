---
title: "WebM Formatı: Web Videosunun Açık Kaynaklı Geleceği"
description: "WebM video formatını, açık kaynaklı kökenlerini, MP4 ile karşılaştırmasını ve modern, yüksek performanslı web geliştirme için neden tercih edilen format olduğunu keşfedin."
date: "2026-09-19"
tags: ["WebM", "Video Formatları", "Web Geliştirme", "Açık Kaynak", "VP9"]
---

# WebM Formatı: Web Videosunun Açık Kaynaklı Geleceği

Bugün web'de geziniyorsanız, sürekli olarak video tüketiyorsunuz demektir. Devasa 4K YouTube yüklemelerinden, modern açılış sayfalarının (landing page) arka planındaki minik, döngüsel animasyonlara kadar video her yerdedir. Uzun bir süre MP4 formatı web videosunun tartışmasız kralıydı.

Ancak 2010 yılında Google, internetin kendine has talepleri için özel olarak tasarlanmış yeni bir rakip tanıttı: **WebM** formatı.

WebM açık, telifsiz ve web dağıtımı için son derece optimize edilmiş olma sözü verdi. Bugün modern web geliştirme için temel bir teknolojidir. Bu rehberde bir WebM dosyasının ne olduğunu, nasıl çalıştığını, MP4 ile nasıl karşılaştırıldığını ve neden onu kullanmanız gerektiğini keşfedeceğiz.

---

## WebM Dosyası Nedir?

WebM, görsel-işitsel bir medya dosyası formatıdır. MP4 veya AVI gibi WebM de bir **konteyner (taşıyıcı) formatıdır**. Bu, WebM dosyasının kendisinin videoyu veya sesi tanımlamadığı; sadece video akışlarını ve ses akışlarını bir arada tuttuğu (taşıdığı) anlamına gelir.

WebM'i tanımlayan temel özellik, bu taşıyıcının içinde ne tutulmasına izin verildiğidir:
- **Video Kodekleri:** WebM özel olarak **VP8, VP9 veya AV1** video kodeklerini kullanır.
- **Ses Kodekleri:** WebM özel olarak **Vorbis veya Opus** ses kodeklerini kullanır.

Google, WebM taşıyıcısının özelliklerini sıkı bir şekilde kontrol ettiği için, her WebM dosyasının tamamen açık kaynaklı olmasını ve eski formatların başına bela olan karmaşık patent lisanslarından arınmış olmasını garanti eder.

---

## WebM'in Kökenleri

WebM'in neden yaratıldığını anlamak için 2000'lerin sonlarındaki web videosunun durumuna bakmanız gerekir.

HTML5'ten önce, bir web sitesine video yerleştirmek Adobe Flash gibi hantal, tescilli eklentiler gerektiriyordu. HTML5 `<video>` etiketi tanıtıldığında, tarayıcıların videoyu yerel olarak oynatmasına izin verdi. Ancak *hangi* video formatının standart olması gerektiği konusunda büyük bir kavga vardı.

Apple ve Microsoft **MP4 (H.264)** için baskı yaptı. Sorun, H.264'ün MPEG LA adlı bir konsorsiyuma ait patentli bir teknoloji olmasıydı. Ticari olarak kullanılması çoğu zaman lisans ücreti ödemeyi gerektiriyordu, bu da web'in açık doğasına aykırıydı.

Buna karşılık Google, VP8 adında son derece verimli bir video kodeği geliştiren On2 Technologies adlı bir şirketi satın aldı. Google hemen VP8'i açık kaynak haline getirdi, onu açık kaynaklı Vorbis ses kodeğiyle eşleştirdi, Matroska (MKV) formatını temel alan bir kapsayıcıda paketledi ve **WebM** adıyla dünyaya sundu.

---

## WebM ve MP4 Karşılaştırması

Günümüzde web videoları için baskın olan iki format WebM ve MP4'tür. Peki nasıl karşılaştırılırlar?

### 1. Dosya Boyutu ve Kalite
- **WebM (VP9 veya AV1 kullanarak):** Standart MP4'e (H.264) kıyasla genellikle önemli ölçüde daha küçük dosya boyutlarında daha iyi video kalitesi sağlar. Bu, sunucu bant genişliğinden tasarruf sağladığı ve mobil ağlardaki kullanıcılar için daha hızlı yüklendiği için web dağıtımında onu çok daha üstün kılar.
- **MP4 (H.264 kullanarak):** Daha büyük dosya boyutları, ancak oldukça tutarlı kalite. (Not: Daha yeni H.265 kodeğini kullanan MP4'ler mükemmel sıkıştırma sunar, ancak H.265 daha ağır lisans ücretleri ve zayıf tarayıcı desteği ile külfetlidir).

### 2. Lisanslama ve Patentler
- **WebM:** %100 açık kaynaklı ve telifsizdir. Herkes tek bir kuruş ödemeden WebM dosyaları oluşturmak veya oynatmak için yazılım geliştirebilir.
- **MP4:** Tescillidir ve ağır patentlidir. Son kullanıcılar için ücretsiz olsa da, büyük platformlar ve yazılım geliştiricileri genellikle MPEG LA'ye lisans ücreti ödemek zorundadır.

### 3. Uyumluluk
- **MP4:** Evrensel uyumluluğun kralı. Bir MP4 kelimenin tam anlamıyla son 15 yılda üretilmiş her cihazda, tarayıcıda, akıllı TV'de veya işletim sisteminde oynatılır.
- **WebM:** Modern web tarayıcılarında (Chrome, Firefox, Edge ve nihayetinde Safari) mükemmel destek. Ancak, birçok eski akıllı telefonda, akıllı TV'de ve eski video düzenleme yazılımlarında (Premiere Pro'nun eski sürümleri gibi) yerel destekten yoksundur.

---

## Web Geliştiricileri Neden WebM'i Seviyor?

Bugün bir web sitesi oluşturuyorsanız, WebM, modern tasarım için onu tercih edilen format haline getiren birkaç muhteşem özellik sunar.

### Alfa Kanalı (Şeffaflık)
Bu, WebM'in tartışmasız en iyi özelliğidir. Bir WebM videosu şeffaf bir arka plana sahip olabilir. Bir nesneyi yeşil ekranda filme alabilir, arka planı kaldırabilir ve onu şeffaf bir WebM olarak dışa aktarabilirsiniz. Bir web sitesine yerleştirildiğinde, web sitesinin kendi arka planı videonun arkasından görünür. MP4 şeffaflığı desteklemez.

### Gerçek GIF Alternatifi
[GIF formatı rehberimizde](/tr/gif-format-guide) tartışıldığı gibi, animasyonlu GIF'ler sayfa yükleme sürelerini mahveden devasa, verimsiz dosyalardır. Döngüsel, sessiz bir WebM dosyası, bir GIF'in dosya boyutunun çok küçük bir kısmıyla çok daha üstün animasyon kalitesi sunarak web sitenizin performansını ve Önemli Web Verilerini (Core Web Vitals) önemli ölçüde artırabilir.

---

## Sitenizde WebM Nasıl Uygulanır

WebM, her eski cihaz (özellikle eski iOS cihazları) tarafından desteklenmediğinden, web geliştiricileri HTML5 `<video>` etiketini kullanarak **yedek yönlendirme (fallback routing)** adı verilen bir teknik kullanırlar.

Tarayıcıya önce yüksek oranda optimize edilmiş bir WebM dosyası sağlarsınız. Tarayıcı WebM'i nasıl oynatacağını bilmiyorsa, otomatik olarak standart bir MP4 dosyasına (fallback) geri döner.

```html
<video autoplay loop muted playsinline>
  <!-- Modern tarayıcılar küçük boyutlu WebM dosyasını oynatır -->
  <source src="animasyon.webm" type="video/webm">
  <!-- Eski tarayıcılar daha büyük olan MP4 dosyasına (fallback) geçer -->
  <source src="animasyon.mp4" type="video/mp4">
  Tarayıcınız video etiketini desteklemiyor.
</video>
```

## Sonuç

WebM, web için web tarafından oluşturulmuş formattır. WebM, açık kaynak ideallerini en ileri sıkıştırma teknolojisiyle (VP9 ve AV1) birleştirerek internet videosunun geleceğinin özgür, hızlı ve erişilebilir kalmasını sağlamıştır. MP4 evrensel bir yedek (fallback) olarak gerekli olmaya devam etse de, performans, şeffaflık ve verimlilik en önemli öncelikleriniz olduğunda uzanmanız gereken araç WebM'dir.
