---
title: "Markdown Formatı (MD): Web İçin Yazmayı Basitleştirmek"
description: "Markdown (MD) formatının ne olduğunu, web'de yazmak için neden standart haline geldiğini ve geleneksel kelime işlemcilerden nasıl farklı olduğunu keşfedin."
date: "2026-09-19"
tags: ["Markdown", "MD", "Yazarlık", "Web", "Metin Formatları"]
---

# Markdown Formatı (MD): Web İçin Yazmayı Basitleştirmek

Daha önce Reddit'te bir yorum yazdıysanız, GitHub'da bir projeyi belgelendirdiyseniz (dokümantasyon hazırladıysanız) veya Notion veya Obsidian gibi modern not alma uygulamalarını kullandıysanız, **Markdown formatını** kullanmışsınız demektir.

`.md` veya `.markdown` dosya uzantısıyla tanımlanan Markdown, geliştiricilerin, yazarların ve içerik oluşturucuların internet için metin yazma biçiminde sessizce devrim yaratmıştır. Biçimlendirilmemiş basit düz metin ile karmaşık, ağır HTML kodu arasındaki uçurumu kapatır.

Bu rehberde Markdown'ın ne olduğunu, neden yaratıldığını, basit sözdiziminin (syntax) nasıl çalıştığını ve modern dijital yazım için neden mutlak standart haline geldiğini keşfedeceğiz.

---

## Markdown (MD) Dosyası Nedir?

Bir `.md` dosyası, Markdown dilinde yazılmış düz bir metin (plain text) dosyasıdır.

Markdown *hafif bir işaretleme dilidir (lightweight markup language)*. Bu, yazılıma metnin nasıl biçimlendirilmesi gerektiğini (kalın, italik yapmak veya bir başlığa dönüştürmek gibi) söylemek için (yıldız işaretleri, tireler ve diyezler gibi) basit, günlük noktalama işaretlerini kullandığı anlamına gelir.

Örneğin, geleneksel bir Word belgesinde, bir kelimenin kalın olmasını istiyorsanız, onu vurgular ve "K" (veya "B") düğmesine tıklarsınız. HTML'de `<strong>kelime</strong>` yazmanız gerekir. Ancak Markdown'da kelimeyi sadece çift yıldız işaretleri arasına alırsınız: `**kelime**`.

Bir Markdown dosyası uyumlu bir uygulama tarafından okunduğunda (veya bir web sitesinde oluşturulduğunda), o yıldız işaretleri kaybolur ve kelime ekranda **kalın (bold)** olarak görünür.

---

## Markdown'ın Kökenleri

Markdown 2004 yılında John Gruber ve Aaron Swartz tarafından yaratıldı. Hedefleri inanılmaz derecede spesifik ama son derece önemliydi: ham, düz metin formunda okunması kolay, ancak web'de yayınlamak için kolayca geçerli HTML'ye dönüştürülebilen bir metin yazma yolu yaratmak istediler.

Markdown'dan önce, blog yazarlarının ve web yazarlarının iki korkunç seçeneği vardı:
1. Arka planda şişirilmiş, dağınık HTML kodu oluşturan hantal "WYSIWYG" (What You See Is What You Get - Ne Görüyorsan Onu Alırsın) editörlerini kullanmak.
2. Yazma sürecini yavaşlatan ve ham metni rahatça okumayı imkansız hale getiren ham HTML etiketlerini (`<h1>`, `<p>`, `<em>`) manuel olarak yazmak.

Markdown tamamen insan tarafından okunabilir (human-readable) olarak bu sorunu çözdü. Bir Markdown görüntüleyiciniz (viewer) olmasa bile, basit bir Not Defteri uygulamasında bir `.md` dosyasını okumak kolay ve sezgiseldir çünkü biçimlendirme işaretleri araya girmez.

---

## Sözdizimi (Syntax): Markdown'da Nasıl Yazılır

Markdown'ın dehası basitliğidir. İşte en yaygın biçimlendirme kuralları:

- **Başlıklar (Headers):** Metninizin önüne bir ila altı arasında diyez işareti (`#`) ekleyin.
  - `# Başlık 1`, bir `<h1>` olur
  - `## Başlık 2`, bir `<h2>` olur
- **Vurgu (Emphasis):**
  - `*İtalik metin*` veya `_İtalik metin_`
  - `**Kalın metin**` veya `__Kalın metin__`
- **Listeler:** Sırasız listeler için tire, artı veya yıldız işaretleri kullanın.
  - `- Öğe 1`
  - `- Öğe 2`
- **Bağlantılar (Links):** Metni köşeli parantez içine ve URL'yi normal parantez içine koyun.
  - `[Buraya Tıklayın](https://example.com)`
- **Resimler:** Tam olarak bir bağlantı gibi, ancak önünde bir ünlem işareti var.
  - `![Resim Açıklaması](resim.jpg)`
- **Kod:** Metni ters tırnak (backtick) içine alın.
  - `` `satır içi kod` ``

## Markdown Dünyayı Nasıl Fethetti?

Niş bir web blog yazarları grubu için bir araç olarak başlayan şey, küresel bir standart haline geldi. Neden?

1. **Satıcı Kilidi Yok (No Vendor Lock-in):** Bir `.docx` veya `.pages` dosyasının aksine, bir `.md` dosyası sadece düz metindir. Microsoft veya Apple'a ait değildir. En sevdiğiniz not alma uygulaması yarın kapanırsa, `.md` dosyalarınız binlerce başka uygulama tarafından hala açılabilir ve okunabilir.
2. **Hız ve Akış:** Yazarların, metni vurgulamak ve biçimlendirme düğmelerine tıklamak için fare kullanmak üzere ellerini klavyeden çekmeleri asla gerekmez. Yazabildiğiniz kadar hızlı biçimlendirme yapabilirsiniz.
3. **Geliştirici Standardı:** Düz metin olduğu için Markdown, Git gibi sürüm kontrol sistemleri tarafından izlenebilir. GitHub'daki her bir deponun (repository) ana sayfasında bir `README.md` dosyasının olmasının nedeni budur. Yazılım dokümantasyonunun evrensel dilidir.

## Sonuç

Markdown (MD) formatı bazen daha azın gerçekten daha çok olduğunu kanıtladı. HTML'nin bunaltıcı karmaşıklığı veya geleneksel kelime işlemcilerin tescilli kilidi olmadan metni biçimlendirmek için yeterli sözdizimini sağlayan Markdown, dijital çağ için nihai yazma aracı haline geldi. İster basit bir yapılacaklar listesi yazıyor olun, ister devasa bir yazılım projesini belgelendiriyor veya bir roman taslağı hazırlıyor olun, `.md` dosyaları hızlı, geleceğe dönük ve evrensel olarak okunabilir bir çözüm sunar.
