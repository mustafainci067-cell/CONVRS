---
title: "XML Formatını Anlamak: Evrensel Veri Standardı"
description: "XML formatının ne olduğunu, HTML ve JSON'dan nasıl farklılaştığını ve veri depolama ile web hizmetleri için neden hala temel bir teknoloji olduğunu öğrenin."
date: "2026-09-19"
tags: ["XML", "Veri Formatları", "Web Geliştirme", "İşaretleme Dili", "Veri Değişimi"]
---

# XML Formatını Anlamak: Evrensel Veri Standardı

JSON ve modern REST API'lerinin hakimiyetinden önce, hepsini yöneten tek bir veri formatı vardı: **XML**. Daha yeni ve daha hafif alternatiflerin yükselişine rağmen XML, modern internetin mimarisinde, kurumsal yazılımlarda ve her gün kullandığımız sayısız dosya formatında (Microsoft Office belgeleri dahil) derinlere kök salmış durumdadır.

Peki XML tam olarak nedir? Neden hala bu kadar önemli? Ve ünlü kardeşi HTML ile modern rakibi JSON ile karşılaştırıldığında nasıldır? Bu kapsamlı rehberde, XML formatını, yapısını ve dijital dünyadaki kalıcı mirasını keşfedeceğiz.

---

## XML Nedir?

XML, **eXtensible Markup Language** (Genişletilebilir İşaretleme Dili) anlamına gelir. 1998'de World Wide Web Consortium (W3C) tarafından oluşturulan XML, tıpkı HTML gibi bir işaretleme dilidir. Ancak HTML verileri *görüntülemek* ve verilerin nasıl göründüğüne odaklanmak için tasarlanmışken, XML verileri *depolamak ve taşımak*, verilerin ne olduğuna odaklanmak için tasarlanmıştır.

XML'in belirleyici özelliği adında gizlidir: **Genişletilebilir (eXtensible)**. HTML'de önceden tanımlanmış etiketleri (`<h1>`, `<p>` veya `<div>` gibi) kullanmaya zorlanırsınız. XML'de ise önceden tanımlanmış etiketler yoktur. Belgenin yazarı olarak siz, belirli verilerinizi mükemmel bir şekilde tanımlayan kendi etiketlerinizi ve belge yapınızı oluşturursunuz.

İşte bir kitapçıyı tanımlayan çok basit bir XML belgesi örneği:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
</bookstore>
```

Gördüğünüz gibi, `<bookstore>`, `<book>` ve `<author>` etiketleri standart web etiketleri değildir; verilerin kendi kendini tanımlamasını ve insanlar tarafından okunabilmesini sağlamak için bu belgeye özel olarak icat edilmişlerdir.

---

## XML'in Temel Özellikleri

XML'in neden bir endüstri standardı haline geldiğini anlamak için temel özelliklerini anlamalısınız:

### 1. Hem İnsanlar Hem de Makineler Tarafından Okunabilir
XML hassas bir denge kurar. Metin tabanlı, hiyerarşik yapısı, bir insan programcının okumasını ve verilerin neyi temsil ettiğini anlamasını kolaylaştırır. Aynı zamanda, katı sözdizimi kuralları, bilgisayarların ve yazılım programlarının ayrıştırmasını (parse) ve işlemesini inanılmaz derecede kolaylaştırır.

### 2. Platform ve Dil Bağımsız
Bir XML dosyası sadece düz metindir. Bu nedenle herhangi bir donanım, yazılım veya programlama dilinden tamamen bağımsızdır. Linux sunucusunda çalışan bir Java uygulaması, Windows makinesinde çalışan bir C# uygulaması tarafından mükemmel bir şekilde okunabilen bir XML dosyasını zahmetsizce oluşturabilir.

### 3. Ağaç (Tree) Yapısı
XML belgeleri, "kökten (root)" başlayıp "yapraklara (leaves)" doğru dallanan bir "ağaç" yapısı oluşturur. Bu katı ebeveyn-çocuk ilişkisi, karmaşık ve iç içe geçmiş ilişkisel verileri temsil etmek için onu mükemmel kılar.

---

## XML ve HTML: Fark Nedir?

Çok benzer göründükleri için XML ve HTML genellikle karıştırılır. Ancak tamamen farklı amaçlara hizmet ederler:

- **Amaç:** HTML, verileri bir web tarayıcısında görüntülemek için tasarlanmıştır. XML verileri taşımak ve depolamak için tasarlanmıştır.
- **Etiketler:** HTML'in sabit ve önceden tanımlanmış etiketleri vardır. XML, özel etiketler oluşturmanıza olanak tanır.
- **Katılık:** HTML affedicidir; bir `<p>` etiketini kapatmayı unutursanız, tarayıcı genellikle bunu çözer. XML ise kesinlikle affetmez; tek bir etiket kapatılmamışsa veya düzgün bir şekilde iç içe yerleştirilmemişse, tüm XML ayrıştırıcısı başarısız olur ve hata verir.
- **Büyük/Küçük Harf Duyarlılığı:** XML etiketleri büyük/küçük harfe duyarlıdır (`<Letter>`, `<letter>` etiketinden farklıdır), oysa HTML genellikle değildir.

Kısacası: **XML veriyi taşır, HTML ise onu şekillendirir (stiller).**

---

## XML vs. JSON: Modern Rekabet

Günümüzde geliştiriciler web API'leri oluştururken XML yerine neredeyse tamamen **JSON** (JavaScript Object Notation) kullanıyorlar. Neden mi?

| Özellik | XML | JSON |
| :--- | :--- | :--- |
| **Sözdizimi (Syntax)** | Etiket ağırlıklı, kelime kalabalığı (`<name>John</name>`) | Hafif, öz (`"name": "John"`) |
| **Veri Tipleri** | Her şey metindir (string), şema gerektirir | Metin, sayı, dizi ve boolean için doğal destek |
| **Ayrıştırma Hızı** | Daha yavaş (karmaşık ayrıştırıcılar gerektirir) | Çok daha hızlı (JavaScript'in doğasında var) |
| **Genişletilebilirlik**| Ad alanları (namespaces) ile son derece genişletilebilir | Karmaşık meta yapılar için daha az esnek |

**Karar:** JSON, web API'leri savaşını kazandı çünkü daha hafif, ayrıştırması daha hızlı ve JavaScript nesneleriyle mükemmel bir şekilde eşleşiyor. Ancak XML, katı doğrulamanın (XML Şemaları aracılığıyla) gerekli olduğu karmaşık kurumsal sistemlerde, yapılandırma dosyalarında ve belge depolamada hala baskındır.

---

## XML Bugün Nerelerde Kullanılıyor?

XML'in geçmişten kalan bir kalıntı olduğunu düşünebilirsiniz, ancak bilgisayarınızın ve internetin her yerinde göz önünde saklanıyor.

1. **Microsoft Office & Apple iWork:** `.docx` veya `.xlsx` uzantılarındaki "x"in ne anlama geldiğini hiç merak ettiniz mi? XML anlamına gelir! Modern bir Word belgesi aslında metninizi, biçimlendirmenizi ve resimlerinizi açıklayan bir dizi XML dosyası içeren bir ZIP dosyasıdır.
2. **SVG Görselleri:** Ölçeklenebilir Vektör Grafikleri (SVG) tamamen XML ile yazılmıştır. Görüntüyü çizen matematiksel yollar sadece XML etiketleridir.
3. **RSS Akışları:** Podcast'lere ve blog yayınlarına (RSS) güç veren teknoloji tamamen XML üzerine kurulmuştur.
4. **Yapılandırma Dosyaları:** Birçok kurumsal yazılım sistemi, derleme araçları (Maven'ın `pom.xml`'i gibi) ve Android uygulama manifestleri, yapılandırma ayarlarını depolamak için XML kullanır.
5. **SOAP Web Hizmetleri:** Modern web uygulamaları için REST/JSON standart olsa da, birçok bankacılık, sağlık ve eski kurumsal sistem, yalnızca XML kullanan son derece güvenli bir protokol olan SOAP'a güvenmeye devam ediyor.

---

## XML ile Çalışmak ve Dönüştürmek

XML, küçültüldüğünde (minify) okunması oldukça zor ve kelime kalabalığı yüksek bir format olabildiğinden, geliştiriciler genellikle XML verilerini biçimlendirmek, ayrıştırmak veya JSON ya da CSV gibi daha modern formatlara dönüştürmek için araçlara ihtiyaç duyarlar.

Büyük bir XML dosyanız varsa ve verilerini bir e-tabloya veya modern bir web uygulamasına çıkarmanız gerekiyorsa, yerleşik araçlarımızı kullanabilirsiniz:
- **[XML to JSON Dönüştürücü](/tr/xml-to-json):** Karmaşık XML ağaçlarını anında temiz, modern JSON nesnelerine dönüştürür.
- **[XML to CSV Dönüştürücü](/tr/xml-to-csv):** XML düğümlerinden tablo verilerini çıkarır ve e-tabloya hazır bir CSV dosyası olarak biçimlendirir.

## Sonuç

XML artık web girişimleri için trend bir seçim olmayabilir, ancak modern dijital altyapının çoğunun üzerine inşa edildiği temel taştır. Katı bir şekilde doğrulanabilen, kendi kendini tanımlayan, yapılandırılmış veriler oluşturma yeteneği, XML'in önümüzdeki on yıllar boyunca kurumsal yazılımlarda, belge formatlarında ve eski sistemlerde kritik bir teknoloji olarak kalmasını sağlar. XML'i anlamak, her veri mühendisi veya yazılım geliştiricisi için temel bir beceridir.
