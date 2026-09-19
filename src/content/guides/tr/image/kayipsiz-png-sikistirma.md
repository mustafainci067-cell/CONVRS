---
title: "Kayıpsız PNG Sıkıştırmanın Arkasındaki Teknoloji: Derinlemesine Bir Bakış"
description: "PNG sıkıştırmasının iç işleyişini keşfedin. Deflate, LZ77, Huffman kodlaması ve delta filtrelemenin tek bir piksel kalitesini bile kaybetmeden dosya boyutunu küçültmek için nasıl birlikte çalıştığını öğrenin."
date: "2026-09-19"
tags: ["PNG", "Sıkıştırma", "Web Performansı", "Algoritmalar", "Görsel Optimizasyonu"]
---

# Kayıpsız PNG Sıkıştırmanın Arkasındaki Teknoloji: Derinlemesine Bir Bakış

Bir görseli JPEG olarak kaydettiğinizde, yazılım daha küçük dosya boyutları elde etmek için kasıtlı olarak bazı görsel verileri çöpe atar. Bu, *kayıplı* (lossy) sıkıştırma olarak bilinir. Ancak, bir görseli PNG (Portable Network Graphics) olarak kaydettiğinizde, *kayıpsız* (lossless) olarak sıkıştırılır. Bir PNG'yi bir milyon kez sıkıştırıp açabilirsiniz ve her bir piksel, orijinal görselle matematiksel olarak birebir aynı kalacaktır.

Peki bu nasıl mümkün olabilir? Bir görsel dosyası, hiçbir bilgi kaybetmeden boyut olarak nasıl küçülebilir?

PNG'nin büyüsü, ön işleme algoritmaları ile ZIP dosyaları dünyasından ödünç alınan sağlam bir sıkıştırma motorunun parlak kombinasyonunda yatar. Bu teknik incelemede, bir PNG dosyasının katmanlarını aralayacak; Filtreleme (Filtering), LZ77, Huffman Kodlaması ve DEFLATE algoritmasının kaliteden ödün vermeden web'i hızlandırmak için nasıl uyum içinde çalıştığını inceleyeceğiz.

---

## 1. Ham Piksel Verisi Problemi

1000 x 1000 piksel boyutlarında bir görsel düşünün. Bu 1.000.000 piksel demektir. Standart bir RGBA (Kırmızı, Yeşil, Mavi, Alfa) görsel ise, her piksel 4 byte (kanal başına 8 bit) gerektirir.

- 1.000.000 piksel × 4 byte = 4.000.000 byte = **~3.8 MB**.

Ham, sıkıştırılmamış 1000x1000'lik bir görsel yaklaşık 4 megabayt depolama alanı kaplar. Eğer görsel tamamen kırmızı bir kareden ibaretse, 4 megabayt boyunca "kırmızı, kırmızı, kırmızı..." verisini saklamak inanılmaz derecede verimsizdir. Sıkıştırma algoritmalarının ortadan kaldırmayı amaçladığı şey tam olarak bu verimsizliktir.

---

## 2. Birinci Adım: Filtreleme (Delta Encoding)

Asıl sıkıştırma algoritması verilere dokunmadan önce, PNG spesifikasyonu **Filtreleme** (Filtering) adı verilen zekice bir ön işleme (pre-processing) adımı uygular.

Filtreleme verileri sıkıştırmaz; bunun yerine verileri, sıkıştırma algoritmasının çok daha kolay işleyebileceği bir formata dönüştürür. Bunu, piksellerin mutlak değerlerini kaydetmek yerine pikseller arasındaki *farkı* (delta) kaydederek yapar.

### Filtreleme Nasıl Çalışır?
Yatay bir piksel çizgisinde şu gri tonlama (grayscale) değerlerine sahip olduğumuzu hayal edin:
`100, 101, 102, 103, 104, 105`

Eğer bir **Sub Filtresi** kullanırsak (bu filtre her pikseli hemen solundaki pikselle karşılaştırır), bu dizi şu hale dönüşür:
`100, 1, 1, 1, 1, 1`

Bu neden yararlıdır? Çünkü sıkıştırma algoritmaları tekrarlarla ve küçük sayılarla beslenir. Çoğunlukla `1`'ler veya `0`'lardan oluşan bir diziyi sıkıştırmak, sürekli değişen, büyük sayılardan oluşan bir diziyi sıkıştırmaktan çok daha kolaydır.

### PNG Filtre Türleri
PNG, satır satır uygulanabilen beş farklı filtre türü tanımlar:
1. **None (Yok):** Pikselleri değiştirmez.
2. **Sub:** Solundaki pikseli çıkarır.
3. **Up:** Doğrudan üstündeki pikseli çıkarır.
4. **Average (Ortalama):** Solundaki ve üstündeki pikselin matematiksel ortalamasını çıkarır.
5. **Paeth:** Sol, üst ve sol-üst piksellere dayanarak pikselin değerini tahmin eden ve gerçek değeri bu tahminden çıkaran karmaşık bir algoritmadır.

Bir PNG kaydedilirken, gelişmiş kodlayıcılar (OptiPNG veya OxiPNG gibi) en sıkıştırılabilir veriyi sağlayan düzenlemeyi bulmak için her bir satırda bu filtrelerin farklı kombinasyonlarını dener.

---

## 3. İkinci Adım: DEFLATE Algoritması

Görsel verisi filtrelenip yüksek oranda tahmin edilebilir bir sayı dizisi haline getirildikten sonra, **DEFLATE** algoritmasına aktarılır.

DEFLATE, ZIP dosyalarında, GZIP'te ve HTTP sıkıştırmasında kullanılan sıkıştırma motorunun ta kendisidir. İki farklı algoritmayı birleştirerek kayıpsız sıkıştırma sağlar: **LZ77** ve **Huffman Kodlaması**.

### Aşama A: LZ77 (Sözlük Tabanlı Sıkıştırma)

LZ77 (1977 yılında Abraham Lempel ve Jacob Ziv tarafından oluşturulmuştur), tekrarlayan veri dizilerini arar.

Filtrelenmiş verilerin şu karakter dizisi gibi göründüğünü hayal edin:
`A B C D E F A B C D E F`

LZ77, ikinci `A B C D E F`'nin ilkiyle aynı olduğunu fark eder. Bu karakterleri tekrar yazmak yerine, ikinci diziyi temel olarak şunları söyleyen bir "işaretçi" (pointer) ile değiştirir: *"6 adım geriye git ve sonraki 6 karakteri kopyala."*

Ham ikili (binary) verilerde bu, eğer tekrar eden bir renk deseni varsa (düz mavi bir gökyüzü veya tek renkli bir UI butonu gibi), LZ77'nin tüm bu tekrar eden byteları küçücük geri referans işaretçilerine (back-reference pointers) çökerteceği anlamına gelir. PNG'lerin illüstrasyonları, logoları ve ekran görüntülerini sıkıştırmada muazzam derecede başarılı olmasının, ancak gürültülü (noisy) fotoğraflarda (tekrar eden desenlerin nadir olduğu) zorlanmasının nedeni budur.

### Aşama B: Huffman Kodlaması (Entropi Kodlaması)

LZ77 tekrar eden desenleri işaretçilerle değiştirdikten sonra, veri bir **Huffman Kodlayıcı**'ya (1952'de David A. Huffman tarafından icat edilmiştir) aktarılır.

Standart bilgisayarlar karakterleri sabit bir uzunluk kullanarak depolar. Örneğin ASCII'de her karakter tam olarak 8 bit yer kaplar.
- `A` = `01000001` (8 bit)
- `Z` = `01011010` (8 bit)

Huffman kodlaması verilerin frekansına (sıklığına) bakar. `E` harfi bir dosyada 10.000 kez, ancak `Z` harfi sadece iki kez geçiyorsa, neden ikisi de 8 bit yer kaplasın?

Huffman kodlaması, sıkıştırdığı belirli dosya için özel bir "sözlük" (bir ikili ağaç / binary tree) oluşturur. En sık rastlanan değerlere çok kısa kodlar, nadir değerlere ise daha uzun kodlar atar.

Örneğin, Huffman kodlamasından sonra:
- En yaygın byte sadece şu hale gelebilir: `0` (1 bit)
- Biraz daha az yaygın bir byte şu olabilir: `10` (2 bit)
- Çok nadir bir byte şu olabilir: `110110` (6 bit)

Ön işleme **Filtreleme** adımı (1. Adım), görsel verisini sıfırların ve küçük sayıların yoğun olarak baskın olduğu bir diziye dönüştürdüğü için, Huffman Kodlayıcı bu sayılara inanılmaz derecede kısa 1 bitlik veya 2 bitlik kodlar atayarak genel dosya boyutunu büyük ölçüde küçültebilir.

---

## 4. Gelişmiş PNG Optimizasyon Teknikleri

Standart PNG kodlama işlemi güçlü olsa da, modern geliştiriciler kayıpsız sıkıştırmayı daha da ileri taşımak için gelişmiş araçlar kullanırlar. Bunlar PNG optimizer'ları (iyileştiricileri) olarak bilinir.

### Parçaları (Metadata) Kaldırma
Bir PNG dosyası "parçalardan" (chunks) oluşur. Kritik görüntü verisi parçasının (`IDAT`) yanı sıra, bir PNG metin yorumları, renk profilleri, gama düzeltmesi ve EXIF verileri için parçalar içerebilir. İyileştiriciler (Optimizers), görsel görüntüyü etkilemeden kilobaytlarca veri tasarrufu sağlayarak bu gerekli olmayan parçaları sıyırıp atabilir.

### Filtreleri Zorlamak (Brute-forcing)
Photoshop gibi standart görsel düzenleyiciler, bir PNG'yi kaydederken genellikle temel ve hızlı bir filtreleme sezgiseli (heuristic) uygular. `pngcrush` veya `zopflipng` gibi özel optimizer'lar ise farklı bir yaklaşım benimser: kaba kuvvet (brute-force) kullanırlar. Matematiksel olarak izin verilen mutlak en küçük dosya boyutunu bulmak için görseli her olası satır-filtresi ve DEFLATE pencere boyutu kombinasyonunu kullanarak binlerce kez sıkıştırırlar.

### Zopfli Sıkıştırması
Google, **Zopfli** adı verilen, son derece optimize edilmiş bir DEFLATE uygulaması geliştirdi. Verileri sıkıştırmada standart `zlib` kütüphanesinden çok daha yavaş olmasına rağmen, tüm standart PNG çözücülerle (decoder) %100 uyumlu kalırken, maksimum zlib sıkıştırmasından genellikle %3-8 daha küçük dosyalar oluşturur.

## Sonuç

Bir dahaki sefere bir logoyu veya ekran görüntüsünü PNG olarak kaydedip onun keskin kenarlarına ve küçük dosya boyutuna hayran kaldığınızda, sahne arkasında çalışan o inanılmaz bilgisayar bilimini (computer science) hatırlayın.

PNG'nin internet dostu bir pakette tertemiz, kayıpsız kalite sunmasını sağlayan şey; varyansı (sapmayı) azaltmak için delta-kodlama (Filtreleme), tekrar eden desenleri ortadan kaldırmak için LZ77 ve sık rastlanan değerlerin bit uzunluğunu en aza indirmek için Huffman kodlamasının akıllıca birleşimidir (sinerjisidir). Bu süreci anlamak, sadece her gün kullandığımız formatlara bir takdir duymamızı sağlamakla kalmaz, aynı zamanda web performansı için kaynakları (assets) optimize ederken geliştiricilerin bilinçli seçimler yapmasını da sağlar.
