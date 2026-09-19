---
title: "WebP, PNG ve JPG: Görsel Formatlarının Büyük Çarpışması"
description: "Hangi görsel formatını kullanacağınız konusunda kafanız mı karışık? Güçlü yönlerini, zayıf yönlerini ve optimum web performansı için her birini tam olarak ne zaman kullanacağınızı anlamak için bu kapsamlı rehberde WebP, PNG ve JPG'yi karşılaştırın."
date: "2026-09-19"
tags: ["WebP", "PNG", "JPG", "Görsel Optimizasyonu", "Web Performansı"]
---

# WebP, PNG ve JPG: Görsel Formatlarının Büyük Çarpışması

Web'in ilk günlerinde, bir görsel formatı seçmek basitti: Animasyonlar ve basit grafikler için GIF, fotoğraflar için JPEG kullanırdınız. Bugün manzara çok daha karmaşık ve görsel optimizasyonu, web performansının ve Arama Motoru Optimizasyonunun (SEO) kritik bir ayağı haline geldi.

Görseller tipik olarak bir web sayfasındaki toplam indirilen baytların %60'ından fazlasını oluşturur. Yanlış formatı seçmek; şişkin dosya boyutlarına, yavaş sayfa yükleme sürelerine, zayıf kullanıcı deneyimine ve daha düşük arama sıralamalarına neden olabilir. Tersine, doğru formatı seçmek, neredeyse anında yüklenen net ve güzel görseller sağlar.

Modern web tasarımındaki "Büyük Üçlü" formatlar **JPG (JPEG)**, **PNG** ve yeni meydan okuyucu **WebP**'dir. Bu kapsamlı rehberde, bu formatlar arasındaki teknik farkları parçalayacak, sıkıştırma yöntemlerini inceleyecek ve her birini tam olarak ne zaman kullanacağınıza dair kesin bir kopya kağıdı sunacağız.

---

## 1. JPG (JPEG): Fotoğrafçılığın Kralı

1992 yılında Joint Photographic Experts Group tarafından yaratılan JPEG (genellikle `.jpg` uzantısıyla kaydedilir), tartışmasız gezegendeki en yaygın kullanılan görüntü formatıdır.

### JPG Nasıl Çalışır: Kayıplı Sıkıştırma (Lossy Compression)
JPG'nin süper gücü sıkıştırma algoritmasıdır. **Kayıplı sıkıştırma** kullanır; bu, dosya boyutunu küçültmek için algoritmanın bazı görüntü verilerini kalıcı olarak atması anlamına gelir. Görüntüyü piksel blokları halinde analiz eder ve insan gözünün daha az fark edeceği görsel bilgileri (renk degradelerindeki ince geçişler gibi) çöpe atar.

Bir görüntü düzenleme yazılımında bir JPG kaydederken, genellikle bir "kalite" kaydırıcısı (slider) ayarlayabilirsiniz (0'dan 100'e kadar).
- **Yüksek Kalite (80-100):** Minimum sıkıştırma, büyük dosya boyutu, orijinaline çok yakın.
- **Orta Kalite (60-80):** Web için ideal nokta (sweet spot). Kabul edilebilir görsel kalite ile önemli ölçüde küçültülmüş dosya boyutu arasında mükemmel bir denge.
- **Düşük Kalite (0-50):** Ağır sıkıştırma. Görüntüde "artefaktlar" (bozulmalar) yani bloklu, bulanık veya bozuk alanlar görmeye başlarsınız.

### JPG'nin Güçlü Yönleri
- **Fotoğraflar İçin İnanılmazdır:** JPG, özellikle milyonlarca renge, yumuşak gölgelere ve kademeli degradelere sahip karmaşık görüntüleri (örneğin bir manzara fotoğrafı veya bir insanın yüzü) işlemek için tasarlanmıştır.
- **Evrensel Uyumluluk:** Kelimenin tam anlamıyla her tarayıcı, işletim sistemi ve dijital kamera JPG'yi destekler.
- **Küçük Dosya Boyutları (fotoğraflar için):** Kayıplı sıkıştırma nedeniyle, fotoğrafik bir JPG her zaman aynı fotoğrafın PNG'sinden önemli ölçüde daha küçük olacaktır.

### JPG'nin Zayıf Yönleri
- **Şeffaflık (Transparency) Yoktur:** JPG, alfa kanallarını desteklemez. Şeffaf bir arka planınız olamaz; boş alan her zaman düz bir renge (genellikle beyaz) varsayılan olarak ayarlanır.
- **Metin ve Keskin Çizgiler İçin Berbattır:** Kayıplı sıkıştırma algoritması keskin kontrastla mücadele eder. Bir elektronik tablonun veya net metinler içeren bir logonun ekran görüntüsünü JPG olarak kaydederseniz, metin genellikle bulanık görünür ve etrafında bozulmalardan (artifacts) oluşan bir "hale" (halo) bulunur.

---

## 2. PNG: Şeffaflığın ve Keskin Detayların Ustası

Taşınabilir Ağ Grafikleri (PNG - Portable Network Graphics), 1990'ların ortalarında GIF formatına daha üstün, patent içermeyen bir alternatif olarak yaratılmıştır.

### PNG Nasıl Çalışır: Kayıpsız Sıkıştırma (Lossless Compression)
JPG'nin aksine, standart PNG **kayıpsız sıkıştırma** kullanır. Bu, bir görüntü PNG olarak kaydedildiğinde dosya boyutunun sıkıştırıldığı, ancak *sıfır görüntü verisinin kaybolduğu* anlamına gelir. Bir PNG'yi açıp düzenler ve 100 kez kaydederseniz, görüntü kalitesi orijinaliyle tamamen aynı kalacaktır.

### PNG'nin Güçlü Yönleri
- **Kusursuz Kalite:** Kayıpsız olduğu için PNG keskin kenarları, düz renk bloklarını ve metinleri mutlak mükemmellikte korur.
- **Alfa Kanalı Şeffaflığı:** Bu, PNG'nin en büyük satış noktasıdır. PNG değişen düzeylerde şeffaflığı (opaklık) destekler. Herhangi bir web sitesi arka plan rengi üzerinde yumuşak, yarı saydam bir alt gölge ile arka planından kesilmiş (cut-out) bir özneye sahip olabilirsiniz.

### PNG'nin Zayıf Yönleri
- **Fotoğraflar İçin Devasa Dosya Boyutları:** Karmaşık, yüksek çözünürlüklü bir fotoğrafı PNG olarak kaydederseniz, dosya boyutu muazzam olacaktır; genellikle aynı görüntünün JPG'sinden 5 ila 10 kat daha büyük. **Bir web sitesindeki standart fotoğraflar için asla PNG kullanmayın.**
- **Performans Düşüşü:** Büyük dosya boyutları nedeniyle, PNG'lerin aşırı kullanımı web sitenizin yükleme hızına ciddi şekilde zarar verir.

---

## 3. WebP: Modern Meydan Okuyucu

Google tarafından geliştirilen ve 2010 yılında piyasaya sürülen WebP (okunuşu "weppy"), özellikle nihai web görüntü formatı olmak üzere, hem JPG hem de PNG'nin yerini almayı hedefleyerek tasarlandı.

### WebP Nasıl Çalışır: Her İki Dünyanın En İyisi
WebP benzersizdir çünkü hem **kayıplı hem de kayıpsız sıkıştırmayı**, aynı zamanda **şeffaflığı (alfa kanalı)** ve hatta **animasyonu** (GIF'in yerini alarak) destekler.

VP8 video kodekini (codec) temel alan WebP'nin sıkıştırma algoritmaları, JPG ve PNG tarafından kullanılan onlarca yıllık algoritmalardan önemli ölçüde daha gelişmiştir.
- **Kayıplı WebP:** Google'ın araştırmalarına göre, kayıplı WebP görüntüleri aynı SSIM (Yapısal Benzerlik - Structural Similarity) kalite indeksindeki karşılaştırılabilir JPG görüntülerinden %25 ila %34 daha küçüktür.
- **Kayıpsız WebP:** Kayıpsız WebP görüntüleri, karşılaştırılabilir PNG'lerden %26 daha küçüktür.
- **Şeffaf WebP:** JPG'nin aksine WebP, şeffaf bir arka planı *korurken* bir görüntüye kayıplı sıkıştırma uygulayabilir.

### WebP'nin Güçlü Yönleri
- **Üstün Dosya Boyutları:** Genel olarak WebP, eşdeğer (veya daha iyi) görsel kaliteyi korurken neredeyse her zaman JPG veya PNG'den daha küçük bir dosya boyutu üretir. Bu, web sitesi performansı ve SEO için devasa bir kazançtır.
- **Çok Yönlülük:** Fotoğrafları, grafikleri, şeffaflığı ve animasyonu idare ettiği için, teorik olarak web sitenizdeki *her* görüntü için WebP kullanabilirsiniz.

### WebP'nin Zayıf Yönleri
- **(Geçmişte Kalan) Tarayıcı Desteği:** Apple'ın Safari'si benimsemeyi yıllarca geciktirdiği için geçmişte bu, WebP'nin ölümcül kusuruydu. Ancak 2020 itibarıyla Safari destek ekledi. Bugün WebP, küresel web tarayıcılarının ~%97'si tarafından desteklenmektedir.
- **Eski İşletim Sistemlerinde Yerel Destek Eksikliği:** Eski işletim sistemleri, eklentiler yüklemeden dosya gezginlerinde WebP dosyaları için küçük resimleri (thumbnails) yerel (native) olarak göstermeyebilir.
- **Dışa Aktarma (Export) Engelleri:** Gelişme kaydetse de, bazı eski masaüstü görüntü düzenleme yazılımları (örneğin çok eski Photoshop sürümleri) doğrudan WebP'ye aktarmak için hala eklentiler gerektirebilir; ancak Figma ve Photoshop'un modern sürümleri artık onu yerel olarak destekliyor.

---

## 4. Kesin Karar Matrisi

Tahmin etmeyi bırakın. Belirli görsel varlığınıza göre hangi formatı seçeceğinize dair kesin kural kitabı aşağıdadır.

### JPG'yi Şu Durumlarda Kullanın:
- Standart bir fotoğrafınız, portreniz, manzaranız veya oldukça ayrıntılı bir görüntünüz varsa.
- Görüntü opaksa (şeffaf bir arka planı yoksa).
- Mümkün olan en geniş uyumluluğu istiyorsanız (örneğin, WebP desteğinin eski e-posta istemcilerinde hala sorunlu olduğu bir HTML e-posta oluşturuyorsanız).

### PNG'yi Şu Durumlarda Kullanın:
- Mutlak keskinlik gerektiren bir logo, simge veya basit illüstrasyon kaydediyorsanız (yine de bunlar vektör tabanlıysa bunun için güçlü bir şekilde SVG'yi düşünmelisiniz).
- Şeffaf bir arka plana ihtiyacınız varsa (örneğin bir ürün dekupe görseli) VE görüntünün mutlak mükemmellikte kayıpsız (lossless) olmasını gerektiriyorsanız.
- JPG'nin bulanık bozulmalara (artifacts) neden olacağı, metin veya keskin arayüz (UI) öğeleri içeren ekran görüntüleri kaydediyorsanız.

### WebP'yi Şu Durumlarda Kullanın:
- **Neredeyse Her Zaman (web için):** Modern bir web sitesi oluşturuyorsanız, varsayılan (default) seçiminiz WebP olmalıdır. Devasa bant genişliği tasarrufu sağlamak üzere JPG fotoğraflarınızı değiştirmek için kayıplı WebP (lossy WebP) kullanın. PNG'lerinizi değiştirmek için kayıpsız WebP (lossless WebP) (veya şeffaflık içeren kayıplı WebP) kullanın.
- **Sayfa Hızı En Önemli Öncelik Olduğunda:** Google'ın Core Web Vitals değerlendirmesini geçmeye çalışıyorsanız, tüm JPG ve PNG'lerinizi WebP'ye dönüştürmek, puanınızı artırmanın en kolay yollarından biridir.

### En İyi Uygulama (Best Practice): `<picture>` Etiketi Fallback'i

Eski tarayıcıların çok küçük bir kısmı (Internet Explorer 11 veya Safari'nin çok eski sürümleri gibi) WebP'yi desteklemediğinden, modern görüntüleri sunmanın en profesyonel yolu HTML `<picture>` öğesini kullanmaktır.

Bu, tarayıcıya yüksek düzeyde optimize edilmiş WebP sürümünü sunmanıza, ancak tarayıcının WebP'yi anlamaması durumuna karşı bir yedek (fallback) JPG veya PNG sağlamanıza olanak tanır.

```html
<picture>
  <!-- Tarayıcı önce bunu dener -->
  <source srcset="gorsel.webp" type="image/webp">
  <!-- WebP desteklenmiyorsa buna geri döner -->
  <img src="gorsel.jpg" alt="Güzel bir manzara">
</picture>
```

## Sonuç

WebP, PNG ve JPG'nin nüanslarını anlamak, herhangi bir web geliştiricisi veya tasarımcısı için gerekli bir beceridir. JPG, genel fotoğrafçılık için standart olmaya devam etse de ve PNG kayıpsız şeffaflık için bir iş makinesi olsa da, **WebP web performansının inkar edilemez geleceğidir (ve bugünüdür)**.

Web sitenizi denetleyerek ve ağır PNG'leri ve JPG'leri stratejik olarak optimize edilmiş WebP dosyalarıyla (veya vektör grafikleri için SVG'lerle) değiştirerek, sayfa ağırlığınızı dramatik bir şekilde düşürecek, daha hızlı yükleme süreleriyle kullanıcılarınızı memnun edecek ve arama motorlarına sitenizin hızlı, modern ve yüksek düzeyde optimize edildiğine dair bir sinyal göndereceksiniz.
