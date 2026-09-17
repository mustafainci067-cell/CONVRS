---
title: "HTML5 Canvas API ile Tarayıcıda Görsel İşleme: Sunucusuz Dönüşümün Sırrı"
description: "Backend kullanımını ortadan kaldıran Canvas API altyapısı, piksellerle düşük seviyeli etkileşim ve %100 gizliliğe dayalı mimarinin teknik detayları."
date: "2026-09-17"
tags: ["HTML5", "Canvas", "Görsel İşleme", "Zero-Backend"]
---

Web geliştirmede uzun yıllar boyunca görüntü işleme işlemleri - kırpma, yeniden boyutlandırma, filtre ekleme veya format değiştirme - backend sunucularının (PHP'de GD kütüphanesi, Python'da Pillow veya ImageMagick gibi) tekelindeydi. Geliştirici, kullanıcıdan dosyayı HTTP ile alır, sunucuda işler ve kullanıcıya geri yollardı. Bu yöntem hem maliyetli (sunucu işlem gücü gerektirir), hem yavaş (upload/download süreleri), hem de güvenlik açısından sorunludur.

HTML5 standartlarına eklenen `Canvas API`, bu eski mimariyi tamamen yıktı ve görsel işleme operasyonlarını doğrudan istemciye (client) yani kullanıcının tarayıcısına taşıdı.

### Canvas API Nasıl Çalışır?

Canvas, web sayfanızda piksel tabanlı çizim yapabileceğiniz boş bir tuvaldir (bitmap). Özünde, bir imajı DOM (Document Object Model) içerisinden alıp, iki boyutlu rendering context (`2d`) üzerine çizebilirsiniz. Çizilen bu görüntü artık statik bir dosya değildir; RGBA piksellerinden oluşan, doğrudan bellekte (RAM) manipüle edilebilen bir matristir.

Temel bir görseli alıp boyutlandırma işlemi teknik olarak şöyle çalışır:
1. Kullanıcının diskindeki dosya, FileReader veya doğrudan `URL.createObjectURL` yöntemiyle okunup bir `HTMLImageElement` (`<img>`) içine yüklenir.
2. Hedef çözünürlüğe (örneğin 800x600) sahip bir bellek içi (in-memory) `<canvas>` yaratılır.
3. `ctx.drawImage(image, 0, 0, 800, 600)` metoduyla görsel tuvale çizilir. Tuval, resmin boyutunu algoritmasıyla (genelde bilinear interpolation) anında ayarlar.
4. Çizilen sonuç `canvas.toBlob()` veya `canvas.toDataURL()` metodlarıyla WebP, JPEG veya PNG gibi farklı formatlara çevrilerek (encode edilerek) kullanıcıya geri sunulur.

### Düşük Seviyeli Piksel Manipülasyonu (ImageData)

Canvas'ın gerçek gücü format dönüştürmekten ibaret değildir. `ctx.getImageData()` metodunu çağırdığınızda, canvas üzerindeki her bir pikselin Red, Green, Blue ve Alpha (RGBA) değerlerini içeren tek boyutlu ve devasa bir `Uint8ClampedArray` (Typed Array) elde edersiniz. 

Örneğin, 1000x1000 piksel boyutlarında bir resim için tam 4.000.000 elemanlı bir dizi elinizde olur. Bu dizi üzerinde for döngüleri ile gezerek matematiksel işlemler yapabilirsiniz. Grayscale (siyah-beyaz) efekti uygulamak, piksellerdeki renk kontrastını artırmak veya belirli bir rengi transparan (alpha = 0) yapmak gibi operasyonlar, cihazınızın CPU'su üzerinde milisaniyeler içerisinde çözülür. Özellikle WebGL rendering context'i kullanılarak bu işlemler doğrudan GPU'ya devredilebilir, bu sayede paralel işlem gücüyle saniyenin onda biri hızında milyonlarca piksel işlenebilir.

### %100 Gizlilik ve Zero-Backend Mimarisi

Yukarıda bahsedilen tüm okuma, piksellere ayırma, manipüle etme ve yeniden dosyaya dönüştürme (encode) aşamalarının tamamı, Google Chrome, Safari veya Firefox'un bellek alanı (sandbox) içinde gerçekleşir.

Convrs.org üzerindeki tüm görsel dönüştürme ve işleme araçları tam olarak bu mimari üzerine inşa edilmiştir, yani **Zero-Backend** (Sıfır Sunucu) yaklaşımına. Kullanıcı açısından bunun anlamı büyüktür:

- **Maksimum Gizlilik:** Yüklediğiniz pasaport fotoğrafınız, şahsi verileriniz veya yayınlanmamış tasarımlarınız, hiçbir zaman bizim (veya bir başkasının) sunucusuna gönderilmez. Sizin tarayıcınızın içinde işlenir ve dış dünyaya veri aktarılmaz. Ağa bağlı olmasanız bile (offline iken) araç çalışmaya devam eder.
- **Limitlerin Olmayışı:** Sunucu tabanlı hizmetlerde sistem çökmesin diye genelde "Maksimum 5MB dosya yükleyebilirsiniz" kısıtlaması olur. Zero-Backend araçlarda sınır tamamen cihazınızın RAM'idir. Eğer 50 MB'lık bir TIFF veya devasa bir JPEG işliyorsanız, tarayıcınız bunu doğrudan kaldırabilir.
- **Sıfır Gecikme:** Megabaytlarca veriyi internette yükleme süresini, kuyrukta bekleme süresini (processing queue) ve geri indirme süresini hayatınızdan çıkarırsınız.

HTML5 Canvas API (ve günümüzde WebGL / WebGPU / Wasm eklentileri), frontend tarafını güçlü bir grafik işleme istasyonuna dönüştürmüştür. Tarayıcının içindeki bu devasa gücü kullanmak varken görselleri uzak sunuculara göndermek, sadece eski alışkanlıkların bir ürünüdür.
