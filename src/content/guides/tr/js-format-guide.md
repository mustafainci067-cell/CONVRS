---
title: "JS Formatı: Web'i Etkileşimli Yapan Dil"
description: "JavaScript formatını, web'i statik sayfalardan dinamik uygulamalara nasıl dönüştürdüğünü, sözdizimini ve neden dünyanın en popüler programlama dili olduğunu keşfedin."
date: "2026-09-19"
tags: ["JS", "JavaScript", "Web Geliştirme", "Programlama", "Önyüz"]
---

# JS Formatı: Web'i Etkileşimli Yapan Dil

Modern bir web sitesi kullanıyorsanız, JavaScript'in büyüsünü deneyimliyorsunuz demektir. Bir "Beğen" butonuna tıkladığınızda ve sayfa yeniden yüklenmeden anında maviye döndüğünde, işte bu JavaScript'tir. Bir resim karuseli sonraki resme kaydığında, bir sohbet penceresi açıldığında veya tarayıcınızda web tabanlı bir oyun çalıştığında; bunların hepsi JavaScript'tir.

JavaScript, HTML (yapı) ve CSS (tasarım) ile birlikte World Wide Web'in üçüncü temel direğidir. Bir `.js` dosyası, statik web sayfalarını dinamik, etkileşimli uygulamalara dönüştüren JavaScript kodunu içerir.

Bu rehberde bir JS dosyasının ne olduğunu, JavaScript'in inanılmaz tarihini, tarayıcıda nasıl çalıştığını ve sadece web'i değil, sunucuları ve mobil uygulamaları da fethedecek şekilde nasıl geliştiğini keşfedeceğiz.

---

## JS Dosyası Nedir?

Bir `.js` dosyası, JavaScript programlama dilinde yazılmış kodlar içeren düz bir metin (plain text) dosyasıdır.

İşaretleme (markup) ve biçimlendirme dilleri olan HTML ve CSS'in aksine, JavaScript tam teşekküllü, Turing uyumlu (Turing-complete) bir **programlama dilidir**. Matematiksel hesaplamalar yapabilir, verileri manipüle edebilir, mantığa dayalı kararlar alabilir (if/else ifadeleri) ve veri göndermek veya almak için harici sunucularla konuşabilir.

### Web'e Nasıl Bağlanır
Bir web tarayıcısı bir `.js` dosyasını okur ve kodu satır satır çalıştırır (execute). Geliştiriciler genellikle `<script>` etiketini kullanarak bir `.js` dosyasını bir HTML belgesine bağlarlar:

```html
<!-- Harici bir JS dosyasını bir HTML belgesine bağlamak -->
<script src="script.js"></script>
```

Bağlandıktan sonra JavaScript kodu **DOM'a (Belge Nesne Modeli - Document Object Model)** erişim sağlar. DOM, HTML sayfasının bir temsilidir. JavaScript, DOM'u okuyabilir, değiştirebilir, yeni HTML öğeleri ekleyebilir veya mevcut olanları gerçek zamanlı olarak silebilir ve tüm bunları kullanıcının sayfayı yenilemesini (refresh) gerektirmeden yapar.

---

## Başlangıç Hikayesi: Mayıs Ayında 10 Gün

JavaScript'in tarihi, bilgisayar bilimindeki en ünlü efsanelerden biridir.

1995 yılında web tamamen statikti. Netscape adlı bir şirket (o zamanın en popüler tarayıcısının yaratıcıları) web'i daha dinamik hale getirmek istedi. Web sayfalarına doğrudan gömülebilecek (embedded) bir betik dili (scripting language) yaratması için **Brendan Eich** adında bir programcıyı işe aldılar.

"Tarayıcı Savaşları'nda" (Browser Wars) Microsoft'u yenmek için muazzam bir baskı altında olan Eich, dilin ilk prototipini sadece **10 gün** içinde tasarlayıp oluşturmasıyla ünlüdür.

Başlangıçta *Mocha*, ardından *LiveScript* olarak adlandırılan dil, (iki dilin mimari olarak neredeyse hiçbir ortak noktası olmamasına rağmen) inanılmaz derecede popüler olan Java programlama dilinin şöhretinden yararlanmak için pazarlama taktiği olarak nihayet **JavaScript** olarak yeniden adlandırıldı.

10 gün içinde oluşturulduğu için erken dönem JavaScript'in birçok tuhaflığı ve kusuru vardı. Yıllarca "ciddi" programcılar onunla alay etti. Ancak, Dünya'daki her web tarayıcısına doğrudan yerleşik (built-in) olarak geldiği için durdurulamaz bir avantaja sahipti: evrensel dağıtım.

---

## Temel JavaScript Sözdizimi (Syntax)

JavaScript sözdizimi ağırlıklı olarak C ve Java'dan esinlenmiştir. İşte birkaç temel kavram:

### Değişkenler (Variables) ve Veriler
Değişkenler veri depolamak için kullanılır.
```javascript
let kullaniciAdi = "Ali";  // Bir metin dizesi (string)
const yas = 30;            // Bir sayı (sabit, sonradan değiştirilemez)
let cevrimici = true;      // Bir mantıksal değer (boolean - doğru/yanlış)
```

### Fonksiyonlar
Fonksiyonlar, belirli bir görevi yerine getiren yeniden kullanılabilir kod bloklarıdır.
```javascript
function kullaniciyiSelamla(isim) {
    alert("Merhaba, " + isim + "!");
}

// Fonksiyonu çağırmak
kullaniciyiSelamla(kullaniciAdi); // Ekranda "Merhaba, Ali!" yazan bir uyarı çıkarır
```

### DOM Manipülasyonu
JavaScript'in web sayfasını değiştirme şekli budur.
```javascript
// "benim-butonum" ID'sine sahip bir HTML öğesini bul
const buton = document.getElementById('benim-butonum');

// Butona tıklandığında bir şey yapmasını sağla
buton.addEventListener('click', function() {
    document.body.style.backgroundColor = 'red'; // Arka planı kırmızıya çevirir
});
```

---

## AJAX Devrimi (Web 2.0)

Varlığının ilk on yılında JavaScript, çoğunlukla can sıkıcı pop-up reklamlar veya basit form doğrulamaları (validation) için kullanıldı.

Her şey 2000'lerin ortalarında **AJAX'ın** (Asynchronous JavaScript and XML) popülerleşmesiyle değişti. AJAX, JavaScript'in sayfayı yeniden yüklemeden (*without* reloading) arka planda bir sunucuyla iletişim kurmasına olanak tanıdı.

Google, Google Haritalar'ı (2005) ve Gmail'i (2004) başlattığında AJAX'ı yoğun bir şekilde kullandı. Kullanıcılar bir haritayı sürükleyebiliyor ve arka planda sorunsuz bir şekilde yeni harita karoları yükleniyordu. Bu, JavaScript'in doğrudan tarayıcıda karmaşık, masaüstü benzeri yazılımlar oluşturmak için kullanılabileceğini kanıtladı ve "Web 2.0" çağını başlattı.

---

## JavaScript Dünyayı Yiyor

Bugün JavaScript, istikrarlı bir şekilde dünyanın en popüler programlama dili olarak sıralanmaktadır. Ekosistemi devasadır ve web tarayıcısının çok ötesine genişlemiştir.

- **Önyüz (Frontend) Framework'leri:** **React, Vue ve Angular** gibi araçlar, geliştiricilerin inanılmaz derecede karmaşık Tek Sayfa Uygulamalarını (SPA'lar) hızlı ve verimli bir şekilde oluşturmalarına olanak tanır.
- **Node.js (Arka Uç - Backend):** 2009 yılında Ryan Dahl, JavaScript'in sunucularda çalışmasına izin veren bir ortam olan Node.js'i yarattı. Bu, geliştiricilerin hem önyüz (tarayıcı) hem de arka uç (sunucu) için tamamen aynı dili kullanabilmesi anlamına geliyordu.
- **Mobil Uygulamalar:** **React Native** gibi framework'ler, geliştiricilerin yerel (native) iOS ve Android uygulamalarına derlenen JavaScript kodu yazmalarına olanak tanır.
- **Masaüstü Uygulamaları:** **Electron** gibi framework'ler (Slack, Discord ve VS Code gibi uygulamalara güç veren), geliştiricilerin HTML, CSS ve JavaScript kullanarak masaüstü yazılımları oluşturmalarına olanak tanır.

## Sonuç

10 günde oluşturulan aceleci bir prototipten yazılım geliştirmenin tartışmasız kralı olmaya uzanan JavaScript'in yolculuğu dikkate değerdir. `.js` formatı modern internetin motorudur. Statik web'e etkileşim getirdi, web siteleri ile masaüstü yazılımları arasındaki sınırları bulanıklaştırdı ve gezegendeki hemen hemen her cihazda çalışabilen birleştirilmiş bir dil yarattı. Web için bir şeyler inşa etmek istiyorsanız, JavaScript öğrenmek sadece bir seçenek değil; mutlak bir zorunluluktur.
