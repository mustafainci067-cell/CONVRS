---
title: "WebP Dosyası Nedir? Modern Görüntü Formatı Hakkında Her Şey"
description: "WebP formatına kapsamlı rehber: nedir, nasıl çalışır, Google neden geliştirdi, JPEG ve PNG ile karşılaştırması ve ne zaman kullanmalısınız."
date: "2024-01-15"
---

# WebP Dosyası Nedir? Modern Görüntü Formatı Hakkında Her Şey

Web sitesi geliştiriyor ya da performans optimizasyonu yapıyorsanız, WebP formatıyla karşılaşmışsınızdır. Google'ın PageSpeed önerileri, görüntü optimizasyon araçlarının çıktıları ve giderek artan şekilde web görüntüleri için varsayılan format olarak öne çıkmaktadır. Peki WebP tam olarak nedir, nasıl çalışır ve kullanmalı mısınız? Bu rehber tüm bu soruları yanıtlamaktadır.

## Kökeni: Google WebP'yi Neden Yarattı?

WebP, Google tarafından geliştirilmiş ve ilk olarak 2010 yılında yayımlanmıştır. Kökeni, Google'ın On2 Technologies'i satın almasıyla elde ettiği VP8 adlı bir video codec bileşenine dayanmaktadır. VP8, verimli video sıkıştırma için tasarlanmıştı. Google'ın mühendisleri, video karelerini sıkıştırmak için kullanılan matematiksel tekniklerin durağan görüntülere de uygulanabileceğini ve bunun eşdeğer görsel kalitede JPEG veya PNG'den daha küçük dosyalar üretebileceğini fark etti.

Motivasyon açıktı: Görüntüler, çoğu web sitesinde sayfa ağırlığının en büyük kaynağıdır. Daha hızlı sayfa yüklemeleri kullanıcı deneyimini iyileştirir, hemen çıkma oranlarını düşürür ve Google Arama için doğrudan bir sıralama sinyali oluşturur. Görsel kalite kaybı olmaksızın görüntü dosyalarını sürekli küçülten bir format; kullanıcılara, yayıncılara ve arama motorlarına aynı anda yarar sağlar.

## WebP Sıkıştırması Nasıl Çalışır?

WebP tek bir sıkıştırma tekniği değildir. İki farklı modu destekler:

**Kayıplı WebP**, VP8 ile aynı blok tabanlı tahmin çerçevesine dayanır. Kodlayıcı görüntüyü 4×4 piksellik bloklara böler, her bloğu komşularından tahmin eder ve yalnızca tahmin ile gerçek piksel değerleri arasındaki farkı kodlar. Sonuç, ayrık kosinüs dönüşümü (DCT) ile dönüştürülür, nicelenir ve aritmetik kodlama kullanılarak entropi kodlanır. İşlem bazı görsel bilgileri atar — bu nedenle "kayıplı" olarak adlandırılır — ancak atılan bilgi insan görsel algısının sınırlarına göre seçilir.

**Kayıpsız WebP** tamamen farklı bir algoritma kullanır. Piksel değerlerinin uzamsal tahmini, renk uzayı dönüşümü, kırmızı ve maviden yeşil kanalın çıkarılması, az renkli görüntüler için palet dönüşümü ve LZ77/Huffman/Aritmetik entropi kodlaması uygular. JPEG'in aksine, kayıpsız WebP her pikseli tam olarak temsil edebilir; bu da ekran görüntüleri, logolar ve metin ağırlıklı grafikler gibi hiçbir ayrıntıyı kaybetmemesi gereken görüntüler için uygundur.

**Animasyonlu WebP**, animasyonlar için eskiyen GIF formatının yerini almaktadır. GIF kare başına 256 renkle sınırlı olup yalnızca LZW sıkıştırmasını kullanırken, animasyonlu WebP milyonlarca rengi, kare başına hem kayıplı hem kayıpsız sıkıştırmayı ve şeffaflığı destekler. Sonuç, eşdeğer GIF'lerden çok daha küçük animasyonlu içeriktir.

**Alfa şeffaflıklı WebP**, kayıplı sıkıştırılmış görüntülerin kayıpsız bir alfa kanalına sahip olmasına olanak tanır. Bu, şeffaflık desteği hiç olmayan JPEG'e ve fotoğrafik içerik için çok büyük dosyalar üretebilen PNG'ye kıyasla önemli bir avantajdır.

## Dosya Boyutu: Rakamlar

WebP'nin sıkıştırma avantajı, Google'ın kendi kıyaslamaları ve üçüncü taraf testlerle kapsamlı biçimde belgelenmiştir:

- Kayıplı WebP dosyaları, eşdeğer görsel kalitede karşılaştırılabilir JPEG dosyalarından ortalama **%25-34 daha küçüktür**.
- Kayıpsız WebP dosyaları ortalama olarak PNG dosyalarından **%26 daha küçüktür**.
- Animasyonlu WebP dosyaları animasyonlu GIF'lerden **%64 daha küçük** ve animasyonlu PNG'lerden **%19 daha küçük** olabilir.

Bunlar ortalamalardır; sonuçlar görüntü içeriğine göre değişir. Düzgün geçişlere sahip fotoğraflar kayıplı WebP'den en fazla yararlanır. Keskin kenarları, metni veya büyük düz renk alanları olan görüntüler, kayıpsız WebP'de PNG'ye kıyasla daha küçük kazanımlar görebilir.

## Tarayıcı ve İşletim Sistemi Desteği

WebP, modern tarayıcılar tarafından artık evrensel olarak desteklenmektedir. Chrome 2010'dan beri WebP'yi desteklemektedir. Firefox 2019'da destek ekledi. Safari, macOS Big Sur ve iOS 14'te Safari 14 ile 2020'de destek ekledi. Edge (Chromium tabanlı) 2018'den bu yana desteklemektedir. Internet Explorer WebP'yi hiçbir zaman desteklemedi; ancak IE'nin pazar payı bugün ihmal edilebilir düzeydedir.

İşletim sistemi desteği, tarayıcı desteğini takip etti. macOS 11 Big Sur ve iOS 14, Finder ve Fotoğraflar uygulamasında yerel WebP görüntüleme desteği ekledi. Windows 10, 2020'den itibaren bir codec aracılığıyla WebP desteği ekledi. Android, Google'ın formatı geliştirmedeki rolü göz önüne alındığında şaşırtıcı değil, Android 4.0'dan (2011) bu yana WebP'yi yerel olarak desteklemektedir.

## WebP'ye Nasıl Dönüştürülür?

Yazılım yüklemeden görüntüleri WebP formatına dönüştürmenin en kolay yolu Convrs gibi tarayıcı tabanlı bir araç kullanmaktır. Dosyanız tamamen cihazınızda işlenir — bir sunucuya yüklenmez — bu da görüntülerinizin gizli kalmasını sağlar.

Toplu dönüştürme veya sunucu tarafı işleme için `cwebp` (Google'ın komut satırı kodlayıcısı), ImageMagick ve `sharp` (bir Node.js kütüphanesi) gibi araçların tümü yüksek kaliteli WebP çıktısı üretir.

## WebP'nin Avantajları

**Daha küçük dosyalar, daha hızlı sayfalar.** Temel avantaj dosya boyutudur. Daha küçük görüntüler daha hızlı sayfa yükleme süresi, barındırma için daha düşük bant genişliği maliyeti ve Core Web Vitals'ta daha iyi puanlar (özellikle Largest Contentful Paint) anlamına gelir.

**Çok yönlülük.** WebP fotoğrafik içeriği, keskin kenarlı grafikleri, animasyonları ve şeffaf görüntüleri — her biri için optimize edilmiş sıkıştırmayla — tek bir formatta ele alır.

**Kayıplı sıkıştırmayla alfa şeffaflığı.** Kayıplı sıkıştırmayla kayıpsız şeffaflığı birleştirme yeteneği gerçek anlamda WebP'ye özgüdür. Şeffaf arka plandaki bir ürün görüntüsü artık hacimli bir PNG yerine WebP kullanabilir; bu da çarpıcı dosya boyutu tasarrufları sağlar.

**Düşük bit hızlarında iyi kalite.** WebP'nin kalite/boyut oranı JPEG'inkinden daha iyidir; bu da çok küçük dosya boyutlarında WebP'nin eşdeğer bir JPEG'den daha fazla görsel ayrıntı koruduğu anlamına gelir.

## WebP'nin Dezavantajları

**Sınırlı profesyonel yazılım desteği.** Tarayıcılar WebP'yi iyi işlerken, birçok masaüstü görüntü düzenleyicisi WebP'yi desteklemiyor veya eklentiler gerektiriyor. Adobe Photoshop, yerel WebP desteğini yalnızca 2021'de ekledi. Affinity Photo ve GIMP destekler; ancak birçok özel araç desteklemiyor.

**Baskı için uygun değil.** WebP'nin renk modeli ve sıkıştırması ekran görüntülemesi için tasarlanmıştır. Baskı iş akışları CMYK renk (RGB değil) ve web'e özgü özellikler olmaksızın kayıpsız formatlar bekler. WebP'yi baskıya yönelik belgeler için asla kullanmayın.

**Kayıplı kalıcı kalite kaybı anlamına gelir.** Kayıplı bir WebP her kod çözme ve yeniden kodlamada kalite bozulur. Her zaman orijinal bir PNG veya TIFF ana dosyasını saklayın ve WebP'yi önceki bir WebP dışa aktarmasından değil, ana dosyadan oluşturun.

**Eski platform desteği.** Çok eski tarayıcılardaki (IE 11, Safari 13 ve altı) kullanıcılar WebP görüntüleyemez. Bugün çoğu site için bu ihmal edilebilir küçük bir kullanıcı oranıdır; ancak analizleriniz anlamlı IE trafiği gösteriyorsa `<picture>` öğesi ve bir JPEG yedekleme güvenli yaklaşım olmaya devam eder.

## WebP ve Diğer Formatlarla Karşılaştırma

| | WebP (kayıplı) | JPEG | PNG |
|---|---|---|---|
| Dosya boyutu | En küçük | Orta | En büyük |
| Şeffaflık desteği | ✅ Evet | ❌ Hayır | ✅ Evet |
| Animasyon desteği | ✅ Evet | ❌ Hayır | ✅ Evet (APNG) |
| Düzenleme yazılım desteği | Orta | Evrensel | Evrensel |
| Baskı desteği | Sınırlı | Mükemmel | İyi |

## Sonuç

WebP, bugün çoğu web görüntüsü için doğru varsayılan formattır. JPEG ve PNG'ye karşı boyut avantajları gerçek ve ölçülebilirdir; modern platformlarda tarayıcı desteği evrenseldir; şeffaflık ve animasyon desteği her yaygın web kullanım senaryosunu kapsar. Temel uyarılar, JPEG ve PNG'nin daha pratik kaldığı profesyonel düzenleme iş akışları ve baskı üretimidir. Bunların dışındaki her şey için — web siteleri, web uygulamaları ve dijital içerik — WebP ilk tercih edilecek formattır.
