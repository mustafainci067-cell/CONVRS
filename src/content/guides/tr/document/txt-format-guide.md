---
title: "TXT Formatı: En Basit ve En Evrensel Dosya"
description: "TXT dosya formatını, tarihini, düz metnin modern bilişimde neden hala inanılmaz derecede önemli olduğunu ve karakter kodlamasının nasıl çalıştığını keşfedin."
date: "2026-09-19"
tags: ["TXT", "Düz Metin", "Dosya Formatları", "Kodlama", "Bilişim"]
---

# TXT Formatı: En Basit ve En Evrensel Dosya

Yüksek çözünürlüklü videolar, çok katmanlı Photoshop belgeleri ve etkileşimli 3D modeller gibi karmaşık dosya formatlarıyla dolu bir dünyada, hepsinden önce var olan ve modern bilgisayar biliminin mutlak temeli olmaya devam eden tek bir format vardır: **TXT formatı**.

Bir `.txt` dosyası dijital bilginin en saf halidir. Tamamen biçimlendirme (formatting), stil (styling) veya gizli meta verilerden yoksun düz bir metindir (plain text). Bilişimin en küçük ortak paydasıdır; son 50 yılda oluşturulan hemen hemen her işletim sistemi, cihaz ve yazılım programı tarafından okunabilir.

Bu rehberde bir TXT dosyasının ne olduğunu, basitliğinin neden en büyük gücü olduğunu, karakter kodlamasının karmaşıklıklarını ve modern teknolojideki kalıcı rolünü keşfedeceğiz.

---

## TXT Dosyası Nedir?

Bir `.txt` dosyası, biçimlendirilmemiş metin (unformatted text) içeren standart bir metin belgesidir.

Bir Microsoft Word belgesi (`.docx`) veya Zengin Metin Formatı (Rich Text Format - `.rtf`) dosyasının aksine, bir `.txt` dosyası yazı tipleri (fontlar), metin boyutları, kalın veya italik stiller, renkler veya sayfa düzenleri hakkında bilgi *saklamaz*. Yalnızca karakterlerin kendilerini (harfler, sayılar, semboller) ve boşluklar, sekmeler (tab) ve satır sonları gibi temel kontrol karakterlerini saklar.

Biçimlendirme verilerinin "yükünü" taşımadığı için bir `.txt` dosyası inanılmaz derecede hafiftir. Bir `.txt` dosyasındaki 1.000 kelime içeren bir dosyanın boyutu sadece 6 kilobayt olabilirken, gizli biçimlendirme XML'i nedeniyle bir `.docx` dosyasındaki tamamen aynı kelimeler 20 kilobayt veya daha fazla olabilir.

---

## Evrensel Uyumluluğun Gücü

TXT formatının en büyük avantajı evrensel uyumluluğudur.

Yepyeni bir Apple Mac'te bir `.txt` dosyası oluşturabilir, onu bir USB sürücüye koyabilir, o sürücüyü Windows 95 çalıştıran 30 yıllık bir bilgisayara takabilirsiniz ve dosya mükemmel bir şekilde açılıp okunacaktır. Linux sunucularında, Android akıllı telefonlarda, e-okuyucularda (e-readers) ve hatta akıllı buzdolaplarında bile açılabilir.

Hemen hemen her işletim sistemi, düz metin dosyaları oluşturmak ve okumak için özel olarak tasarlanmış yerleşik, hafif bir uygulamayla birlikte gelir:
- **Windows:** Not Defteri (Notepad)
- **macOS:** TextEdit (düz metin moduna ayarlandığında)
- **Linux:** Gedit, Nano veya Vim

Evrensel olarak anlaşıldıkları için, `.txt` dosyaları genellikle yazılım indirmelerine dahil edilen "Beni Oku" (Readme) dosyaları için kullanılır. Geliştiriciler, kullanıcı hangi sistemde olursa olsun, talimatları almak için bir `readme.txt` dosyasını açabileceğini bilirler.

---

## Kaputun Altında: Karakter Kodlaması (Character Encoding)

Bir TXT dosyası insana inanılmaz derecede basit görünse de, bir bilgisayarın bu harfleri anladığı 1'lere ve 0'lara (ikili sistem - binary) çevirmesi gerekir. Bu çeviri sürecine **Karakter Kodlaması (Character Encoding)** denir.

Tarihsel olarak en ünlü karakter kodlama standardı, 1960'larda geliştirilen **ASCII**'dir (Bilgi Değişimi için Amerikan Standart Kodu - American Standard Code for Information Interchange). ASCII, 128 karakteri temsil etmek için 7 bit kullandı. Bu, İngiliz alfabesi (büyük ve küçük harf), 0-9 arası sayılar ve temel noktalama işaretleri için yeterliydi.

### ASCII'nin Sorunu
ASCII tamamen ABD merkezliydi. Bırakın Kiril, Yunan, Arap veya Çin karakterleri gibi tamamen farklı alfabeleri, (Türkçedeki ç, ş, ğ, ö, ü, ı veya Fransızcadaki é gibi) aksanlı harfler için kodlara bile sahip değildi.

1980'lerde ve 90'larda kişisel bilgisayarlar küreselleştikçe, farklı bölgeler kendi kodlama sistemlerini yarattılar. Bu devasa bir kargaşaya yol açtı. Rusça kodlamayla yazılmış bir metin dosyasını bir Amerikan bilgisayarında açarsanız, metin tamamen anlamsız bir saçmalık (Japonca'da *Mojibake* olarak bilinen meşhur bir fenomen) olarak görünürdü.

### Çözüm: Unicode (UTF-8)
Bunu çözmek için teknoloji endüstrisi **Unicode** standardını yarattı. Unicode, her bir insan dilindeki (tarihsel yazılar ve modern emojiler dahil) her bir karaktere benzersiz bir numara atamayı amaçlamaktadır.

Günümüzde, `.txt` dosyalarının (ve genel olarak internetin) büyük çoğunluğu **UTF-8** adı verilen özel bir Unicode kodlaması kullanır. UTF-8, ASCII ile geriye dönük uyumludur (backward-compatible) ancak bir milyondan fazla farklı karakteri temsil edebilir. Modern bir `.txt` dosyasına gülen yüz emojisi 😊 yazdığınızda, UTF-8'in gücünü kullanıyorsunuz demektir.

---

## Bilgisayarınızdaki Gizli TXT Dosyaları

Not Defteri'ni not yazmak için nadiren kullansanız bile, sürekli olarak düz metin dosyalarıyla etkileşime girersiniz. Birçok karmaşık dosya aslında bilgisayara onları nasıl yorumlayacağını söyleyen farklı dosya uzantılarına sahip düz metin dosyalarıdır.

- **Kaynak Kodu (Source Code):** `.py` (Python), `.js` (JavaScript), `.html` (Web) ve `.css` (Stiller) gibi programlama dosyaları sadece düz metin dosyalarıdır. Bir geliştirici kodu metin olarak yazar ve bir derleyici (compiler) veya tarayıcı onu çevirir.
- **Yapılandırma Dosyaları (Configuration Files):** `.json`, `.yaml`, `.xml` ve `.ini` gibi dosyalar, yazılımların ayarlarını depolamak için kullanılan düz metin dosyalarıdır.
- **Veri Kümeleri (Data Sets):** `.csv` (Virgülle Ayrılmış Değerler - Comma Separated Values) dosyaları, elektronik tablolar ve veritabanları için tablo verilerini depolamak üzere kullanılan düz metin dosyalarıdır.

Eğer bir `.html` uzantısını `.txt` olarak değiştirir ve açarsanız, ham kodu tıpkı geliştiricinin yazdığı gibi görebilirsiniz.

## Sonuç

TXT formatı bilgisayar biliminin temel taşıdır. Biçimlendirme eksikliği bir zayıflık değil; hızı, mutlak taşınabilirliği ve sonsuz uyumluluğu sağlayan kasıtlı (bilinçli) bir özelliktir. Karmaşık belge düzenleri için özel yazılımlar kullansak da, kod yazmak, sunucuları yapılandırmak veya sadece bilgiyi uzun vadeli olarak korumak söz konusu olduğunda, düz metin tartışmasız kral olmaya devam etmektedir.
