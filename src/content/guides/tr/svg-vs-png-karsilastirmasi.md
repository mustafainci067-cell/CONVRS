---
title: "SVG ve PNG Arasındaki Savaş: Hangi Format Nerede Kullanılmalı?"
description: "Vektörel SVG ile piksel tabanlı (raster) PNG formatlarının teknik farkları, dosya yapıları ve web performansına etkileri üzerine detaylı inceleme."
date: "2026-09-17"
tags: ["SVG", "PNG", "Formatlar", "Vektör", "Görsel İşleme"]
---

Web tasarımı ve geliştirme projelerinde en sık karşılaşılan kararlardan biri, arayüzde kullanılacak görsellerin formatı seçimidir. İkonlar, logolar, grafikler ve karmaşık illüstrasyonlar için SVG (Scalable Vector Graphics) ile PNG (Portable Network Graphics) çoğu zaman birbirinin alternatifi gibi görülse de, altlarındaki teknoloji tamamen farklı iki paradigmayı temsil eder. Yanlış format seçimi bulanık logolara, yavaş yüklenen sayfalara ve şişirilmiş DOM yapılarına neden olabilir.

### Vektör ve Raster (Piksel) Paradigması

Bu iki formatın çekişmesinin merkezinde üretim yöntemleri yatar. 

**PNG bir raster (bitmap) formatıdır.** Görüntüyü milyonlarca küçük kareden (piksel) oluşan bir grid (ızgara) sistemi olarak tanımlar. Her bir pikselin kendi X ve Y koordinatında tanımlı bir renk (RGB) ve şeffaflık (Alpha) değeri vardır. Bu özellik, yumuşak ton geçişleri, gölgeler, fotoğraflar ve çok karmaşık renk paletine sahip dijital boyamalar için harika sonuçlar verir. Ancak, görüntüyü büyütmeye çalıştığınızda tarayıcı pikselleri esnetmek zorunda kalır ve ortaya 'pixelated' dediğimiz pürüzlü, merdiven gibi kenarlar çıkar.

**SVG ise vektörel bir formattır.** Piksellerle ilgilenmez. Bunun yerine, görüntüyü matematiksel denklemler, çizgiler, noktalar, eğriler (Bézier curves) ve çokgenler halinde XML tabanlı bir metin dosyası olarak tutar. Bir SVG dosyası teknik olarak sadece koddan ibarettir. Tarayıcı bu kodu okur ve koordinatlara göre o anki ekran çözünürlüğünde grafiği "canlı olarak" çizer. Matematiksel olduğu için SVG'yi bir pul boyutundan, bir stadyum ekranı boyutuna çıkarsanız bile en ufak bir kalite kaybı, bulanıklık veya kenar bozulması yaşanmaz. Her zaman jilet gibi keskindir.

### Performans ve Dosya Boyutu Kıyaslaması

Dosya boyutu, formatın doğru bağlamda kullanılıp kullanılmadığına göre inanılmaz derecede değişir.

Eğer basit geometrik şekiller, düz renkler içeren bir şirket logosu veya bir UI ikonu (hamburger menü, arama büyüteci) tasarlıyorsanız SVG, PNG'ye göre genellikle çok daha ufak boyutludur. Çünkü 200x200 piksellik bir çember PNG için 40.000 pikselin (ve boşlukların) sıkıştırılmış halini saklamayı gerektirirken, SVG için sadece `<circle cx="100" cy="100" r="90" fill="blue" />` gibi kısa bir metin dizesidir. (Hatta GZIP/Brotli ile sıkıştırılan metin tabanlı bir SVG inanılmaz derecede hafifleşir.)

Ancak durum tersine dönebilir. Çok fazla detay, binlerce nokta, karmaşık gölge efektleri ve fırça darbeleri içeren bir vektör çizimini SVG olarak kaydederseniz, ortaya on binlerce satır koda sahip megabaytlarca bir XML dosyası çıkar. Tarayıcı bu devasa kodu render etmek için CPU'yu fazlasıyla harcar ve takılmalar (scroll jank) yaşatır. Bu tarz, "fotoğrafik" seviyede detaya sahip ancak transparanlık gerektiren görsellerde, şeffaf PNG kullanmak donanım hızlandırma ve hızlı boyama (paint) açısından daha performanslıdır.

### Hangi Formatı Nerede Tercih Etmeli?

**SVG'yi Şuralarda Kullanın:**
- Arayüz ikonları, UI elemanları.
- Şirket logoları ve marka materyalleri (Tüm ekranlarda keskin kalması için).
- Basit animasyon gerektiren görseller (CSS ve JavaScript ile SVG'nin içindeki yollara -path- anında müdahale edebilirsiniz).
- Retina/Yüksek DPI ekranlarda (Mobil ve Apple ekranları) kusursuz görünmesi gereken tüm basit vektör çizimleri.

**PNG'yi Şuralarda Kullanın:**
- Transparan arka plana ihtiyaç duyan fotoğraflar (örneğin arka planı silinmiş ürün fotoğrafları).
- Transparanlık (Alpha kanalı) gerektiren çok detaylı, gölgeli ve pikselli dijital sanat eserleri veya karmaşık illüstrasyonlar.
- WebP'yi desteklemeyen sistemler için transparan fallback gereksinimlerinde.

### Formatlar Arası Sunucusuz Geçiş (Zero-Backend)

Web geliştirme sürecinde tasarımcılardan SVG yerine PNG (veya tam tersi) dosyalar gelmesi çok sıktır. Eğer elinizdeki bir SVG grafiği, eski sistemler veya sosyal medya önizlemeleri için yüksek çözünürlüklü bir PNG'ye çevirmeniz gerekirse, bunu yapmak için üçüncü taraf yazılımlar indirmenize gerek yoktur. 

Convrs.org gibi **Zero-Backend (Sunucusuz)** çalışan araçlar, SVG dosyanızı tarayıcıda bir `<canvas>` elemanı üzerine render eder ve bu vektörel çizimi anında, gizlilik riski olmaksızın, pikselli (raster) bir PNG veya WebP dosyasına dönüştürür. Tüm dosyalar sizin diskinizdedir ve internete asla aktarılmaz. Geliştirici olarak elinizdeki araç çantası ne kadar güçlü ve güvenli ise, web sayfalarınızın performansı o denli pürüzsüz olacaktır.
