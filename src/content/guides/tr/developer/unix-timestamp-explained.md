---
title: "Unix Timestamp (Zaman Damgası) Nedir ve Neden Kullanılır?"
description: "Unix Timestamp (Epoch zamanı) hakkında kapsamlı bir rehber. Nasıl çalıştığını, geliştiricilerin neden ona güvendiğini, 2038 Yılı sorununu ve nasıl dönüştürüleceğini öğrenin."
date: "2026-09-18"
tags: ["Unix Timestamp", "Epoch Time", "Programlama", "Zaman Takibi", "Yazılım Geliştirme"]
---

# Unix Timestamp (Zaman Damgası) Nedir ve Neden Kullanılır?

Yazılım geliştirme, veritabanı yönetimi alanlarında çalıştıysanız veya bir web uygulamasının ham verilerine yakından baktıysanız, muhtemelen `1700000000` gibi görünen bir sayı dizisiyle karşılaşmışsınızdır. Görünüşte rastgele olan bu rakam dizisi, aslında **Unix Timestamp (Unix Zaman Damgası)** olarak bilinen, son derece hassas bir zaman ölçümüdür.

Bilgi işlem dünyasında zamanı takip etmek şaşırtıcı derecede karmaşıktır. İnsan zamanı karmaşıktır; saat dilimlerimiz, yaz saati uygulamalarımız, artık yıllarımız ve farklı takvim sistemlerimiz vardır. Bu sorunu çözmek için mühendisler, bilgisayarların zamanı anlaması ve kaydetmesi için evrensel, standartlaştırılmış bir yol yarattılar.

Bu nihai rehberde, bir Unix zaman damgasının ne olduğuna, arkasındaki büyüleyici tarihe, neden programlamada altın standart olduğuna, yaklaşmakta olan "2038 Yılı Sorunu"na ve onu kendi projelerinizde nasıl kullanabileceğinize derinlemesine bir bakış atacağız.

## Unix Timestamp Nedir?

Unix timestamp (aynı zamanda **Epoch zamanı** veya **POSIX zamanı** olarak da bilinir), zaman içindeki belirli bir noktayı tanımlamaya yarayan bir sistemdir. Belirli, keyfi bir tarih ve saatten bu yana geçen saniyelerin toplam sayısı olarak tanımlanır: **1 Ocak 1970 Perşembe, saat 00:00:00 Koordinatlı Evrensel Zaman (UTC)**.

Bu belirli başlangıç noktası **Unix Epoch** (Unix Çağı/Miladı) olarak bilinir.

Örneğin, `0` Unix zaman damgası, tam olarak 1 Ocak 1970, 00:00:00 UTC'yi temsil eder. Geçen her saniye bu sayıya `1` ekler.
- `60`, Epoch'tan bir dakika sonrasını temsil eder (00:01:00).
- `86400`, Epoch'tan tam bir gün sonrasını temsil eder (2 Ocak 1970).
- `1700000000`, 14 Kasım 2023'ü temsil eder.

Önemli bir nokta, standart bir Unix zaman damgasının artık saniyeleri hesaba katmamasıdır. Kesin olarak her günün tam olarak 86.400 saniye olduğunu varsayar. Bu durum onlarca yıl boyunca çok küçük bir teknik yanlışlık getirse de, bilgisayar sistemleri için zaman içeren matematiksel hesaplamaları çok daha basit hale getirir.

## Tarihçe: Neden 1970?

1 Ocak 1970'in neden bilgisayarlar için zamanın başlangıcı olarak seçildiğini merak edebilirsiniz.

1960'ların sonlarında ve 1970'lerin başlarında, Unix işletim sistemi Bell Labs'de bilgisayar bilimi öncüleri Ken Thompson ve Dennis Ritchie tarafından geliştiriliyordu. İşletim sisteminin zamanı izlemesi için bir yola ihtiyaçları vardı. Başlangıçta çağı 1 Ocak 1971 olarak ayarladılar ve kullandıkları güç kaynağının frekansı nedeniyle zamanı saniyenin 60'ta 1'i (1/60) olarak ölçtüler.

Ancak kısa süre sonra, saniyenin 60'ta 1'ini sayan 32 bitlik bir tamsayının (o zamanki standart veri boyutu) sadece 2,5 yıl içinde taşacağını (sayılarının tükeneceğini) fark ettiler! Bunu düzeltmek için ölçümü tam saniyelere çevirdiler ve bilgisayar işlemleri için yeni bir on yıla temiz, akılda kalıcı bir başlangıç noktası sağlamak amacıyla Epoch'u 1 Ocak 1970'e geri çektiler.

## Programcılar Neden Unix Timestamp Kullanır?

"15 Mart 2024, 15:30 EST" gibi insan zaman biçimlerinin okuması bizim için kolaydır, ancak bilgisayarların işlemesi için bir kabusturlar. Geliştiricilerin evrensel olarak Unix zaman damgalarını tercih etmesinin nedenleri şunlardır:

### 1. Saat Dilimi Karışıklığı Yok
Bir Unix zaman damgası her zaman UTC'dir. Nokta. Bir kullanıcı veriyi Tokyo, New York veya Londra'da üretiyor olsun, veritabanına kaydedilen zaman damgası tamamen aynı sayıdır. Bu, farklı küresel bölgeler arasında zamanı dönüştürmenin yarattığı devasa baş ağrısını ortadan kaldırır. Sunucu evrensel Unix zaman damgasını depolar ve arayüz (front-end) bu sayıyı ekranı görüntüleyen kullanıcının yerel saat dilimine dönüştürür.

### 2. Basit Matematik ve Karşılaştırmalar
Bir zaman damgası sadece tek bir tam sayı olduğundan, iki olay arasındaki süreyi hesaplamak inanılmaz derecede basittir: sadece bir sayıyı diğerinden çıkarırsınız.
Eğer Olay A `1600000000`'de ve Olay B `1600003600`'de gerçekleştiyse, bilgisayar aralarında tam olarak 3600 saniye (veya 1 saat) geçtiğini anında bilir. Artık yıl sırasında "28 Şubat 23:59" ile "1 Mart 00:01" arasındaki farkı hesaplamaya çalışmak karmaşık takvim mantığı gerektirir; zaman damgası ise bundan tamamen kaçınır.

### 3. Son Derece Hafif Depolama
Bir veritabanında `2024-03-15T15:30:00Z` gibi devasa bir metin dizesi depolamak, `1710516600` gibi basit bir tam sayıyı depolamaktan önemli ölçüde daha fazla bellek ve depolama alanı kaplar. Milyarlarca satır içeren veritabanlarıyla uğraşırken (sunucu günlükleri veya finansal işlemler gibi), tam sayı kullanarak tasarruf edilen alan devasadır, bu da daha hızlı veritabanı sorgularına ve daha düşük sunucu maliyetlerine yol açar.

## 2038 Yılı Sorunu (Y2K38)

Unix zaman damgası sistemi inanılmaz derecede verimlidir, ancak **2038 Yılı Sorunu** veya **Y2K38** olarak bilinen yerleşik bir "kıyamet günü" kusuruna sahiptir.

Tarihsel olarak, çoğu bilgisayar sistemi Unix zaman damgasını **işaretli 32-bit tamsayı (signed 32-bit integer)** olarak depolamıştır. İkilik sistemde, işaretli bir 32-bit tamsayının maksimum pozitif değeri `2.147.483.647`'dir.

Unix Miladı'ndan (1 Ocak 1970) ileriye doğru 2.147.483.647 saniye sayarsak, çok spesifik bir tarihe ulaşırız: **19 Ocak 2038 Salı, saat 03:14:07 UTC**.

Bu andan bir saniye sonra, 32 bitlik tam sayı taşacaktır. İşaretli bir tam sayı olduğu için, maksimum negatif değerine "başa saracaktır": `-2.147.483.648`.
Bilgisayarlar bu negatif sayıyı 1970'ten *önceki* 2.147.483.648 saniye olarak yorumlayacak ve sistem saatlerini şiddetle **13 Aralık 1901**'e geri döndürecektir.

Eğer yama yapılmazsa, bu taşma dünya çapında yazılımlarda yıkıcı hatalara neden olacaktır. Veritabanları çökecek, güvenlik sertifikalarının süresi anında dolacak, navigasyon sistemleri arızalanacak ve dosya sistemleri bozulacaktır.

### Y2K38'in Çözümü
Neyse ki, teknoloji endüstrisi bu sorunu uzun zamandır biliyor. Çözüm, işletim sistemlerini ve yazılımları zaman damgasını depolamak için **64 bitlik tamsayılar** kullanacak şekilde güncellemektir. 64 bitlik bir tamsayı o kadar büyüktür ki, önümüzdeki **292 milyar yıl** boyunca (güneşimiz sönüp gittikten çok sonra bile) taşmayacaktır.
Modern 64 bit işletim sistemleri (Windows, macOS ve Linux'un yeni sürümleri gibi) zaten güvende olsa da, risk eski sistemlerde, gömülü sistemlerde (arabalar veya endüstriyel makinelerdekiler gibi) ve güncellenmemiş eski veritabanlarında devam etmektedir.

## Unix Timestamp ile Çalışmak

Bir geliştirici olarak, genellikle insan tarafından okunabilen tarihler ile Unix zaman damgaları arasında dönüştürme yapmanız gerekecektir. Popüler programlama dillerinde bu işlemin nasıl yapıldığına dair örnekler:

### JavaScript
```javascript
// Geçerli Unix zaman damgasını saniye cinsinden al
const currentTimestamp = Math.floor(Date.now() / 1000);

// Zaman damgasını okunabilir bir tarihe dönüştür
const timestamp = 1700000000;
const date = new Date(timestamp * 1000);
console.log(date.toLocaleString());
```
*(Not: JavaScript yerel olarak epoch'tan bu yana milisaniye kullanır, bu nedenle 1000'e bölmeniz veya çarpmanız gerekir).*

### Python
```python
import time
from datetime import datetime

# Geçerli zaman damgasını al
current_timestamp = int(time.time())

# Zaman damgasını tarihe dönüştür
timestamp = 1700000000
date = datetime.utcfromtimestamp(timestamp)
print(date.strftime('%Y-%m-%d %H:%M:%S'))
```

### PHP
```php
// Geçerli zaman damgasını al
$current_timestamp = time();

// Tarihe dönüştür
$date = date("Y-m-d H:i:s", 1700000000);
echo $date;
```

## Milisaniye, Mikrosaniye ve Ötesi

Klasik Unix zaman damgası saniye cinsinden ölçülürken, modern bilgi işlem genellikle çok daha yüksek hassasiyet gerektirir.
- **Milisaniye (saniyenin 1.000'de 1'i):** Belirtildiği gibi, JavaScript'in `Date.now()` işlevi milisaniye döndürür. Bu 13 haneli bir sayıdır.
- **Mikrosaniye (saniyenin 1.000.000'da 1'i):** Yüksek frekanslı işlem günlüklemesi için PostgreSQL veya MySQL gibi veritabanlarında yoğun olarak kullanılır.
- **Nanosaniye (saniyenin 1.000.000.000'da 1'i):** Yüksek frekanslı ticaret platformlarında ve ultra hassas bilimsel hesaplamalarda kullanılır.

Ham bir zaman damgasına bakarken, uzunluğuna bakarak genellikle hassasiyetini tahmin edebilirsiniz. 10 haneli bir sayı saniye, 13 haneli bir sayı milisaniye ve 16 haneli bir sayı mikrosaniye cinsindendir.

## Sonuç

Unix zaman damgası, insan zaman işleyişinin inanılmaz derecede karmaşık sorununa zekice ve zarif bir çözümdür. Zamanı sürekli sayan tek bir tamsayıya indirgeyen Unix'in kurucuları, küresel bilgi işlemin, internetin ve modern yazılım mimarisinin temeli haline gelen bir standart yarattılar.

İster bir veritabanı sorununu gideriyor olun, ister süreleri hesaplamak için bir komut dosyası yazıyor olun, ister eski sistemleri 2038 Yılına hazırlıyor olun, Unix çağının nasıl çalıştığını anlamak, bugün teknolojide çalışan herkes için temel bir gerekliliktir. Kod yazmadan bir zaman damgasını hızlıca dönüştürmeniz gerekirse, bu web sitesinde sunulan ücretsiz Unix Timestamp dönüştürme aracımızı kullanabilirsiniz.
