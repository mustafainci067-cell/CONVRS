---
title: "Kaliteyi Bozmadan PNG Boyutu Nasıl Küçültülür?"
description: "Kayıpsız görüntü sıkıştırma algoritmaları, renk indeksleme yöntemleri ve tarayıcı tabanlı PNG optimizasyonunun teknik detayları."
date: "2026-09-17"
tags: ["PNG", "Sıkıştırma", "Optimizasyon", "Görsel İşleme"]
---

PNG (Portable Network Graphics) formatı, patentli GIF formatının yerine geliştirilen, kayıpsız (lossless) sıkıştırma sağlayan ve alfa kanalı ile tam şeffaflık sunan harika bir teknolojidir. Ancak bir bedeli vardır: Dosya boyutları ciddi oranda büyük olabilir. İllüstrasyonlar, ikon setleri veya yazılı ekran görüntüleri gibi keskin kenarlara sahip görsellerde PNG zorunlu olsa da, boyutların optimize edilmemesi web performansı üzerinde yıkıcı etkilere yol açar. Peki, piksellerdeki renk bilgisini kaybetmeden bir PNG dosyasını nasıl küçültebiliriz?

Bunun cevabı renk nicemleme (color quantization), DEFLATE algoritmasının agresif çalıştırılması ve gereksiz metadata temizliğinde yatar.

### Renk İndeksleme (Quantization)

PNG dosyaları genellikle TrueColor (24-bit renk) veya TrueColor + Alpha (32-bit renk) olarak kaydedilir. Bu da görüntüdeki her bir pikselin RGB(A) bilgisi için 3 ila 4 byte hafıza tüketmesi demektir. Eğer bir görsel sadece 10 farklı renk içeriyorsa (örneğin bir logo), her piksel için 16.7 milyon rengi tanımlayabilecek 24-bit bir palet kullanmak kaynak israfıdır.

Burada devreye **indexed-color (8-bit) PNG** formatı girer. Quantization işleminde görüntüdeki renkler analiz edilir ve en fazla 256 rengin bulunduğu bir 'renk paleti' (palette) oluşturulur. Artık pikseller 3-4 byte'lık RGB değerlerini tutmak yerine, sadece 1 byte'lık palette indeks numarasını tutar. İnsan gözüyle algılanması çok zor bir dithering (titreme/karma) algoritmasıyla (örneğin Floyd-Steinberg dithering) ton geçişleri simüle edilir. Bu işlem 'lossy' gibi görünse de görsel kalitesi açısından neredeyse kayıpsız bir sonuç verir ve dosya boyutunu %60 ile %80 arasında küçültür.

### DEFLATE Algoritması ve Filtreleme

PNG'nin kalbinde, ZIP formatında da kullanılan LZ77 ve Huffman kodlamasının bir birleşimi olan DEFLATE algoritması bulunur. Ancak DEFLATE algoritmasına ham pikselleri göndermeden önce PNG bir ön işlem yapar: Delta filtreleme.

Filtreleme adımında her bir piksel değeri yerine, pikselin kendinden önceki piksellerle (solundaki, üstündeki vb.) arasındaki 'fark' (delta) hesaplanır. Yan yana duran pikseller genelde aynı renkte olduğu için bu fark genellikle sıfırdır. DEFLATE algoritması, uzun sıfır zincirlerini (000000...) olağanüstü yüksek bir verimlilikle sıkıştırır. 

Optimizasyon araçları, her bir satır için en iyi delta filtresini (Sub, Up, Average, Paeth) deneyerek DEFLATE sıkıştırıcısına en uygun (en fazla sıfır veya tekrarlayan desen içeren) veriyi sağlar. Standart grafik yazılımları bu iteratif denemeleri hızlı olsun diye es geçer, bu nedenle profesyonel bir optimizasyon aracından geçirilmiş PNG daima daha küçük boyutta çıkar.

### Gereksiz Metadata Temizliği

Çoğu grafik düzenleme yazılımı (Photoshop, Illustrator vb.) dosyayı dışarı aktarırken PNG'nin içerisine ICC renk profilleri, EXIF verileri, Adobe'ye ait özel chunk'lar, yorumlar ve oluşturma tarihleri ekler. Web ortamında bunların hiçbirine ihtiyaç yoktur. Sadece görüntü verisi içeren (IDAT chunk) ve başlık (IHDR chunk) bilgilerini bırakıp, geri kalan tEXt, iTXt, veya gAMA parçalarını (chunks) temizlemek, küçük boyutlu ikon veya logolarda dosya boyutunu %10 civarında doğrudan düşürür.

### Tarayıcı Tabanlı (Zero-Backend) Optimizasyon

Tüm bu işlemleri yapmak için genelde komut satırı araçlarına (pngquant, optipng, advpng) veya sunucu tarafında çalışan cloud API'lere ihtiyaç duyulur. Sunucu tarafında çalışan araçlara yüzlerce megabayt boyutundaki ham ekran görüntülerinizi veya ürün fotoğraflarınızı upload etmeniz, işlemin bitmesini beklemeniz ve tekrar indirmeniz gerekir. Ağ bant genişliğinizi tüketir ve dosyalarınız üçüncü taraf sunucularda saklanır.

Convrs'te PNG sıkıştırma işlemlerini **Zero-Backend** yapısıyla doğrudan tarayıcı içinde gerçekleştiriyoruz. Rust veya C/C++ ile yazılmış güçlü sıkıştırma motorlarını (pngquant gibi) WebAssembly (Wasm) üzerinden çalıştırıyoruz. Sürükleyip bıraktığınız dosya:
1. Sizin bilgisayarınızda kalır, internete hiçbir şey gönderilmez (Ağ gecikmesi sıfır, gizlilik %100).
2. Bilgisayarınızın çok çekirdekli CPU'sunu doğrudan kullanarak optimizasyon parametrelerini en üst düzeye (maksimum compression level) çıkarır.
3. Optimizasyon anında bitip sonuç cihazınıza saniyesinde indirilir.

PNG dosyalarınızın kaliteyi düşürmeden boyutunu azaltmak web performansı için zorunludur. Doğru optimizasyon yöntemlerini sıfır arka uç (zero-backend) altyapısıyla kullanarak hem zamandan tasarruf edebilir hem de verilerinizin kontrolünü tamamen elinizde tutabilirsiniz.
