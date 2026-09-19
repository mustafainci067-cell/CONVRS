---
title: "HTML Formatı: World Wide Web'in Temeli"
description: "HTML'in ne olduğunu, web'i nasıl yapılandırdığını, Web 1.0'dan HTML5'e evrimini ve neden internetteki en önemli dil olmaya devam ettiğini keşfedin."
date: "2026-09-19"
tags: ["HTML", "Web Geliştirme", "İşaretleme Dili", "İnternet", "Önyüz"]
---

# HTML Formatı: World Wide Web'in Temeli

Eğer bu makaleyi okuyorsanız, HTML'e bakıyorsunuz demektir. Basit kişisel bloglardan Netflix veya Gmail gibi karmaşık web uygulamalarına kadar ziyaret ettiğiniz her web sitesi tek bir temel teknoloji üzerine inşa edilmiştir: **HTML formatı**.

HTML (HyperText Markup Language - Hiper Metin İşaretleme Dili), internete yapı kazandıran görünmez iskelettir. O olmasaydı web tarayıcıları metinleri nasıl görüntüleyeceğini, resimleri nereye koyacağını veya bir sayfayı diğerine nasıl bağlayacağını bilemezdi.

Bu rehberde HTML dosyasının ne olduğunu, nasıl çalıştığını, evriminin kısa tarihini ve neden web'in tartışmasız yapı taşı olmaya devam ettiğini keşfedeceğiz.

---

## HTML Dosyası Nedir?

Bir `.html` veya `.htm` dosyası, HyperText Markup Language (Hiper Metin İşaretleme Dili) ile yazılmış kodlar içeren düz bir metin (plain text) dosyasıdır. Python veya JavaScript gibi bir programlama dili değildir; bir **işaretleme dilidir (markup language)**.

Bir programlama dili mantık kullanırken ("bu olursa, şunu yap" gibi), bir işaretleme dili tamamen açıklayıcıdır. Bir makinenin (özellikle Chrome veya Safari gibi bir web tarayıcısının) bu metni nasıl biçimlendireceğini ve görüntüleyeceğini bilmesi için metne açıklama eklemek üzere "etiketler" (tags) kullanır.

Örneğin, bir cümlenin büyük bir başlık olarak görünmesini istiyorsanız, onu bir `<h1>` etiketi içine sararsınız. Bir kelimenin kalın (bold) olmasını istiyorsanız, onu bir `<strong>` etiketi içine sararsınız.

### Bir HTML Dosyasının Anatomisi

Standart bir HTML dosyası çok özel bir yapıya sahiptir. İşte basit bir örnek:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>İlk Web Sitem</title>
</head>
<body>
    <h1>Web'e Hoş Geldiniz!</h1>
    <p>Bu, HTML'in ne kadar <strong>harika</strong> olduğunu açıklayan bir metin paragrafıdır.</p>
    <a href="https://example.com">Başka bir siteyi ziyaret etmek için buraya tıklayın!</a>
</body>
</html>
```

Önemli bileşenleri inceleyelim:
- `<!DOCTYPE html>`: Tarayıcıya bu dosyanın modern HTML5 standardını kullandığını söyler.
- `<html>`: Sayfadaki tüm içeriği saran kök (root) öğedir.
- `<head>`: Sayfa başlığı, karakter seti (charset) ve stil sayfalarına (CSS) bağlantılar gibi meta verileri (veri hakkındaki veriler) içerir. Bu kısım web sayfasının kendisinde görünmez.
- `<body>`: Tüm görünür içeriğin (başlıklar, paragraflar, resimler, videolar ve bağlantılar) gittiği yer burasıdır.

---

## HTML'deki "HyperText" (Hiper Metin)

HTML'in en devrimci özelliği tam olarak adında gizlidir: **HyperText**.

World Wide Web'den (Dünya Çapında Ağ) önce, bir bilgisayarda belge okumak, tıpkı fiziksel bir kitap okumak gibi doğrusal (linear) bir deneyimdi. Sayfa 1'i, sonra sayfa 2'yi, sonra sayfa 3'ü okurdunuz.

HTML, köprü (hyperlink) kavramını (`<a>` veya "çapa" etiketi aracılığıyla) tanıttı. Bir köprü, kullanıcının bir belgedeki kelimeye tıklamasını ve farklı bir ülkede bulunan, farklı bir sunucuda barındırılan tamamen farklı bir belgeye anında taşınmasını sağlar. Bu doğrusal olmayan, birbirine bağlı bilgi "ağı" (web), World Wide Web'e adını veren şeydir.

---

## Evrim: Web 1.0'dan HTML5'e

HTML, 1990 yılında CERN'de görevli bir fizikçi olan **Tim Berners-Lee** tarafından icat edildi. Bilim insanlarının araştırma belgelerini farklı bilgisayar ağları üzerinden paylaşabilmeleri için basit bir yol istiyordu.

### İlk Günler (HTML 1.0 - 4.01)
1990'larda ve 2000'lerin başlarında HTML oldukça basitti. Web siteleri dijital ders kitaplarına benziyordu. Geliştiriciler, tasarımı kontrol etmenin daha iyi bir yolu olmadığı için HTML etiketlerini tasarlanmadıkları şeyler için kullanmaya başladılar (karmaşık sayfa düzenleri oluşturmak için `<table>` etiketlerini kullanmak gibi). Kod dağınıktı ve sayfalar statikti.

### CSS ve JavaScript Devrimi
Bu karmaşayı düzeltmek için web standartları, bir web sayfasının *yapısını (structure)*, *tasarımından (design)* ve *davranışından (behavior)* ayıracak şekilde gelişti.
- **HTML** yapı (kemikler) olarak kaldı.
- **CSS** (Cascading Style Sheets - Basamaklı Stil Şablonları), tasarımı (deri ve giysiler - renkler, düzenler, yazı tipleri) işlemek için tanıtıldı.
- **JavaScript**, davranışı (kaslar - etkileşimlilik, açılır pencereler, dinamik veriler) işlemek için tanıtıldı.

### HTML5: Modern Standart
2014'te piyasaya sürülen **HTML5**, devasa bir sıçramaydı. `<article>`, `<nav>` ve `<footer>` gibi "anlamsal" (semantic) etiketleri tanıttı; bu da kodu okumayı çok daha kolaylaştırdı ve SEO'yu (Arama Motoru Optimizasyonu) ve ekran okuyucular (screen readers) için erişilebilirliği büyük ölçüde artırdı.

En önemlisi, HTML5, `<audio>` ve `<video>` etiketleri aracılığıyla multimedya için yerel destek (native support) getirdi. Bu durum, Adobe Flash gibi hantal, güvensiz üçüncü taraf eklentilere olan ihtiyacı resmen ortadan kaldırdı ve hızlı, mobil uyumlu modern web'in yolunu açtı.

---

## HTML Neden Hâlâ Vazgeçilmezdir?

React, Vue gibi modern araçlar ve karmaşık Web Sitesi Oluşturucuları (Wix veya Squarespace gibi) ile geliştiricilerin hala HTML bilmesi gerekip gerekmediğini merak edebilirsiniz. Cevap kesinlikle evettir.

1. **Her Şey HTML'e Derlenir:** Hangi gelişmiş JavaScript çerçevesini (framework) kullanırsanız kullanın, tarayıcı yalnızca HTML, CSS ve JS anlar. Tüm modern web framework'leri nihayetinde HTML çıktısı verir.
2. **SEO (Arama Motoru Optimizasyonu):** Google'ın arama algoritmaları büyük ölçüde iyi yapılandırılmış HTML'e güvenir. Bir `<h1>` etiketi kullanırsanız, Google bunun sayfadaki en önemli konu olduğunu bilir. Uygun etiket olmadan sadece büyük, kalın metin kullanırsanız arama sıralamanız (ranking) zarar görür.
3. **Erişilebilirlik (Accessibility):** Doğru HTML, web erişilebilirliği için çok önemlidir. Görme engelli kullanıcılar tarafından kullanılan ekran okuyucular, bir web sayfasında gezinmek için tamamen HTML etiketlerine (resimlerdeki `alt` metni ve uygun başlık yapıları gibi) güvenirler.

## Sonuç

HTML, tartışmasız şimdiye kadar yaratılmış en başarılı ve etkili dildir. Bilgisayarları izole edilmiş hesaplama makinelerinden küresel olarak birbirine bağlı bir bilgi, ticaret ve eğlence ağına dönüştürdü. İster basit bir blog gönderisini biçimlendirmek isteyin, ister kod yazmayı öğrenin veya bir sonraki milyar dolarlık teknoloji girişimini kurun, yolculuğunuz mütevazı `<html>` etiketi ile başlar.
