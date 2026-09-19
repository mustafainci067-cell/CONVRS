---
title: "Base64 Kodlaması Nedir? Nasıl Çalışır ve Neden Kullanırız?"
description: "Base64 kodlamasını anlamak için eksiksiz bir rehber. İkili verilerin neden metne dönüştürülmesi gerektiğini, matematiğinin nasıl çalıştığını, Data URI ve JWT kullanımını öğrenin."
date: "2026-09-18"
tags: ["Base64", "Kodlama (Encoding)", "Web Geliştirme", "Veri Transferi", "Programlama"]
---

# Base64 Kodlaması Nedir? Nasıl Çalışır ve Neden Kullanırız?

Eğer bir e-postanın kaynak koduna baktıysanız, bir JSON Web Token'ı (JWT) incelediyseniz veya bir görüntünün URL aracılığıyla bağlanmak yerine doğrudan kodun içine gömüldüğü bir HTML dosyasına baktıysanız, muhtemelen şuna benzeyen devasa bir metin bloğu görmüşsünüzdür:

`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`

Harflerin, sayıların ve eşittir işaretlerinin bu rastgele görünen dizisi şifrelenmiş (encrypted) bir veri veya bozulmuş bir metin değildir. Bu, **Base64 Kodlamasıdır (Base64 Encoding)**.

Base64, bilgisayar biliminde ikili verileri (görüntüler, ses dosyaları veya derlenmiş programlar gibi) güvenli, düz metin formatına çevirmek için kullanılan inanılmaz derecede yaygın bir mekanizmadır. Peki ama bunu neden yapmamız gerekiyor? Bilgisayarlar dosyaları neden önce metne çevirmeden doğrudan birbirlerine gönderemiyorlar?

Bu kapsamlı rehberde, Base64 kodlamasının tam olarak ne olduğunu, icat edilmesinin ardındaki tarihsel nedenleri, verileri nasıl dönüştürdüğüne dair temel matematiği, günümüzdeki en yaygın kullanım durumlarını ve "kodlama (encoding)" ile "şifreleme (encryption)" arasındaki kritik farkı inceleyeceğiz.

## Neden Base64'e İhtiyacımız Var? Tarihçe

Base64'ü anlamak için internetin ve e-postanın ilk günlerini anlamanız gerekir.

Bilgisayarlar ikili sistemi (1'ler ve 0'lar) kullanarak iletişim kurarlar. Bir kedi resmi sadece muazzam bir ikili veri dizisidir. Ancak, erken ağ protokolleri, özellikle de bugün e-postaları yönlendirmek için hala kullanılan **SMTP (Simple Mail Transfer Protocol)**, başlangıçta *yalnızca* düz metni işlemek üzere tasarlanmıştı.

Daha spesifik olmak gerekirse, bu sistemler **7 bitlik ASCII karakterlerini** işlemek üzere tasarlanmıştı. 7 bitlik ASCII tablosu sadece 128 karakter içerir: İngiliz alfabesi (A-Z, a-z), sayılar (0-9), noktalama işaretleri ve "satır başı" (carriage return) veya "satır besleme" (line feed) gibi birkaç kontrol karakteri.

Eğer SMTP gibi eski, metin tabanlı bir sistem üzerinden ham ikili veri (örneğin bir JPEG resmi) göndermeye çalışırsanız, sistem ikili 1'leri ve 0'ları rastgele ASCII kontrol karakterleri olarak yanlış yorumlayacaktır. Resminizin bir bölümünü "Sil" (Delete) komutu veya "Dosya Sonu" (End of File) komutu olarak yorumlayarak aktarımı anında bozabilir.

**Çözüm:** Mühendisler, 8 bitlik ikili verileri yalnızca güvenli, yazdırılabilir 7 bitlik ASCII karakterleri kullanarak temsil etmenin bir yoluna ihtiyaç duydular. Böylece Base64 doğdu. Herhangi bir ikili dosyayı alır ve metin tabanlı bir protokolü asla bozmayacak güvenli metin karakterlerine tamamen dönüştürür.

## Base64 Aslında Nasıl Çalışır?

"Base64" ismi, nasıl çalıştığını ele verir. Nasıl ki standart sayma sistemimiz Base-10 (Taban-10, 0-9 arası rakamları kullanarak) ve ikili sistem Base-2 (Taban-2, 0 ve 1 kullanarak) ise, Base64 de verileri temsil etmek için 64 karakterlik bir alfabe (Taban-64) kullanır.

Base64 alfabesi şunlardan oluşur:
- **Büyük harfler:** A'dan Z'ye (26 karakter)
- **Küçük harfler:** a'dan z'ye (26 karakter)
- **Sayılar:** 0'dan 9'a (10 karakter)
- **Semboller:** `+` ve `/` (2 karakter)
*(Toplam = 64 karakter)*

### Dönüştürme İşlemi
Bilgisayar seviyesinde veriler 8 bitlik Baytlar (Bytes) halinde gruplandırılır. Base64 64 karakter kullandığı ve 2'nin 6. kuvveti 64 ($2^6 = 64$) olduğu için, her Base64 karakteri tam olarak **6 bit** veriyi temsil eder.

İkiliyi Base64'e dönüştürmek için bilgisayar şunları yapar:
1. İkili verileri 24 bitlik parçalar halinde alır (ki bu tam olarak üç adet 8 bitlik bayta eşittir).
2. Bu 24 bit'i, her biri 6 bitlik dört küçük parçaya böler.
3. Her 6 bitlik parçayı 64 karakterlik alfabedeki karşılık gelen Base64 karakterine çevirir.

Kısacası: **Her 3 baytlık ham veri, 4 karakterlik Base64 metnine dönüştürülür.**

### Eşittir İşareti (`=`) Nedir?
Base64 dizelerini gördüyseniz, genellikle bir veya iki eşittir işaretiyle bittiklerini fark etmişsinizdir (örneğin `dGVzdA==`). Buna **Doldurma (Padding)** denir.
Dönüştürme işlemi verileri 3 baytlık (24 bitlik) parçalar halinde almayı gerektirdiğinden, orijinal dosya boyutu 3'e tam olarak bölünemiyorsa ne olur?
Geriye sadece 1 bayt kalırsa, algoritma bloğu "doldurmak" için sona iki tane `=` işareti ekler. Geriye 2 bayt kalırsa, bir tane `=` ekler. Bu doldurma işlemi, kod çözme (decoding) yazılımına son baytları tam olarak nasıl yeniden oluşturacağını söyler.

## Yaygın Modern Kullanım Senaryoları

Base64 başlangıçta e-posta ekleri (MIME) için tasarlanmış olsa da, bugün modern web teknolojilerinde yoğun bir şekilde kullanılmaktadır.

### 1. HTML/CSS'de Data URI'leri
Geliştiriciler, küçük bir görsel simgeyi (ikon) indirmek için web tarayıcısını ayrı bir HTTP isteği yapmaya zorlamak yerine, görseli Base64 olarak kodlayabilir ve doğrudan HTML veya CSS dosyasına gömebilirler.
```html
<!-- Base64 ile gömülü bir resim örneği -->
<img src="data:image/png;base64,iVBORw0KGgoAAA..." alt="Icon">
```
Bu, çok küçük grafikler için sayfa yükleme sürelerini hızlandırabilen ağ isteklerinden tasarruf sağlar, ancak büyük fotoğraflar için bundan kaçınılmalıdır.

### 2. JSON Web Token'ları (JWT)
Modern web uygulamaları geliştiriyorsanız, kullanıcı kimlik doğrulaması (authentication) için muhtemelen JWT'leri kullanıyorsunuzdur. Bir JWT, noktalarla ayrılmış üç parçadan (Başlık, Yük, İmza) oluşur. Başlık (Header) ve Yük (Payload) tamamen Base64 ile kodlanmıştır. Bu, karmaşık JSON nesnelerinin HTTP protokolünü bozmadan HTTP başlıklarında güvenle ileri geri aktarılabilmesini sağlar.

### 3. E-posta Ekleri (MIME)
Belirtildiği gibi, bu orijinal kullanım durumudur. Bir e-postaya bir PDF veya fotoğraf eklediğinizde, e-posta istemciniz o dosyayı otomatik olarak Base64'e kodlar, devasa metin bloğunu e-posta gövdesine gömer ve alıcının e-posta istemcisi de bunu geri çözerek bir dosyaya dönüştürür.

### 4. Temel HTTP Kimlik Doğrulaması (Basic Auth)
Bir tarayıcı, yerleşik bir tarayıcı açılır penceresi aracılığıyla sizden bir kullanıcı adı ve parola istediğinde, bu kimlik bilgilerini sunucuya `Authorization: Basic dXNlcjpwYXNz` gibi bir başlık kullanarak gönderir. `dXNlcjpwYXNz` dizesi, sadece Base64 ile kodlanmış `user:pass` metnidir.

## Uyarı: Base64 Şifreleme (Encryption) DEĞİLDİR!

Bu, yeni (junior) geliştiriciler arasındaki tek ve en tehlikeli, en yaygın yanılgıdır. **Base64 kesinlikle hiçbir güvenlik sağlamaz.**

Bu bir *Kodlamadır* (Encoding), *Şifreleme* (Encryption) değil. Kodlama, verilerin güvenli taşınması için biçimini değiştirir. Şifreleme ise yetkisiz kişilerin okuyamaması için matematiksel bir anahtar kullanarak verileri karıştırır.

Bir Base64 dizesini ele geçiren herhangi biri, bir parola veya anahtar olmadan anında kodunu çözebilir. Base64'ü asla parolaları, API anahtarlarını veya hassas kullanıcı verilerini "gizlemek" için kullanmamalısınız. Basic Auth dizesi `dXNlcjpwYXNz`'nin kodunu çözerseniz (decode ederseniz), anında düz metin olarak kullanıcı adını ve parolayı alırsınız.

## Base64'ün Dezavantajları

İnanılmaz derecede faydalı olmasına rağmen, Base64'ün iki büyük dezavantajı vardır:
1. **Boyut Yükü (Overhead):** Her 3 baytı 4 karaktere dönüştürdüğü için, **Base64 kodlaması dosya boyutunu tam olarak %33 oranında artırır.** 3MB'lık bir resminiz varsa ve onu bir HTML dosyasına koymak için Base64'e dönüştürürseniz, HTML dosyası 4MB büyüyecektir. Bu nedenle büyük dosyaları asla Data URI olarak gömmemelisiniz.
2. **İşlem Maliyeti:** Bir istemcinin (web tarayıcısı gibi) devasa Base64 metnini ekrana çizmeden önce tekrar ikili bir görünüme dönüştürmesi (decode etmesi) işlemci (CPU) gücü gerektirir.

## Sonuç

Base64 internetin gizli kahramanıdır. Karmaşık ikili dosyalar ile salt metin iletişim protokolleri arasında evrensel bir çevirmen görevi görür. Dosyaları biraz daha büyütse ve hiçbir güvenlik sağlamasa da; resimleri, belgeleri ve tokenları basit ASCII metinleri olarak güvenli bir şekilde paketleme yeteneği, modern web'in ve günlük e-postalarınızın sorunsuz çalışmaya devam etmesini sağlar.

Eğer bir metin dizesini hızlıca kodlamanız veya ne içerdiğini görmek için bir Base64 dizesini çözmeniz (decode etmeniz) gerekirse, bu web sitesinde bulunan ücretsiz Base64 Encode/Decode aracını kullanabilirsiniz!
