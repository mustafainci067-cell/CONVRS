---
title: "PDF Dosyalarını Dönüştürürken Veri Gizliliği Nasıl Sağlanır?"
description: "Hassas PDF dokümanlarının manipülasyonunda yaşanan veri ihlallerine karşı tarayıcı tabanlı sıfır sunucu (zero-backend) mimarisinin rolü."
date: "2026-09-17"
tags: ["PDF", "Gizlilik", "Zero-Backend", "Güvenlik"]
---

Kurumsal dünyada PDF (Portable Document Format) belgeleri, faturalar, sözleşmeler, gizlilik anlaşmaları (NDA), çalışan maaş bordroları ve tıbbi raporlar gibi son derece hassas verileri taşımak için kullanılır. Ne yazık ki bu tür dosyaları birleştirmek, sayfalarını bölmek veya JPEG'e dönüştürmek gerektiğinde, çoğu kullanıcı Google'da arama yapıp bulduğu rastgele bir PDF dönüştürücü sitesine dosyayı yükler. İşte veri ihlali tam da bu dosya yükleme (upload) aşamasında başlar. 

### Sunucu Tabanlı Dönüştürücülerin Yarattığı Riskler

Piyasadaki popüler çevrimiçi PDF dönüştürücülerin neredeyse tamamı backend tabanlı bir mimariyle çalışır. Yani siz "PDF'i Böl" butonuna bastığınızda, dokümanınız fiziksel veya bulut (cloud) sunuculara HTTP POST isteği ile gönderilir. Sunucu (çoğunlukla Ghostscript, poppler veya pdf2image kullanan bir Linux makinesi) bu belgeyi alır, geçici bir dizine (tmp) kaydeder, dönüştürme işlemini yapar ve sonuç dosyasını tekrar size yollar.

Bu mimarinin doğal sonuçları şunlardır:
- **Veriniz Sunucuda Saklanır:** Çoğu site belgeleri işlemi bitirdikten 1 veya 24 saat sonra sileceğini iddia etse de, bunu kanıtlayamazlar. Yedekleme sistemleri bu belgeleri senelerce saklıyor olabilir.
- **Orta Adam Saldırıları (MITM):** SSL/TLS kullanılmayan veya zayıf yapılandırılmış ağlarda dosya aktarımı sırasında veri paketi ele geçirilebilir.
- **Veri Madenciliği (Data Mining):** Ücretsiz hizmet veren servislerin çoğu belge içeriklerini OCR (Optik Karakter Tanıma) işleminden geçirerek içlerindeki veriyi (isimler, TC Kimlik Numaraları, finansal bilgiler) reklam veya istihbarat amaçlı satabilir.

### Zero-Backend Mimarisi: Sorunu Kökünden Çözmek

Bilgi güvenliğinin ilk kuralı açıktır: Veri yerinden oynamıyorsa, güvendedir. Convrs olarak biz bu kuralı temel alıyoruz. Çevrimiçi araçlarımızın en kritik özelliklerinden biri **Zero-Backend (Sıfır Sunucu)** yapısıdır. Bu yapı, PDF işlemleri için tamamen farklı bir mühendislik paradigması kullanır.

Bir PDF dosyasını dönüştürmek, sıkıştırmak veya parçalamak için sürükleyip bıraktığınızda, dosya cihazınızdan ayrılıp uzak bir sunucuya yüklenmez. Bunun yerine, işlemi doğrudan kendi bilgisayarınız (veya telefonunuz) yapar. 

Bunu nasıl sağlıyoruz?
Modern web standartları sayesinde PDF.js gibi açık kaynak kütüphaneleri ve WebAssembly (Wasm) teknolojilerini doğrudan tarayıcı içerisine gömüyoruz. İnternet tarayıcınız (Chrome, Firefox, Safari) artık bir sunucu gibi çalışıyor. İşlem gücünü tamamen sizin bilgisayarınızın RAM'i ve işlemcisi (CPU) karşılıyor.

### Tarayıcı Tabanlı Dönüşümün Kanıtlanabilir Gizliliği

Sıfır sunucu yaklaşımının sağladığı gizlilik bir "söz" veya "gizlilik politikası vaadi" değil, doğrudan **teknik bir imkansızlıktır**.

1. **Ağ Trafiği Yoktur:** Geliştirici araçlarını (F12 > Network sekmesi) açıp işlem yaparken ağ hareketlerini izlerseniz, dosyanızın hiçbir adrese POST edilmediğini kendi gözlerinizle görebilirsiniz.
2. **Çevrimdışı Çalışabilirlik:** Convrs sitesi bir kez tarayıcınıza yüklendikten sonra, internet bağlantınızı kesseniz bile PDF araçlarını kullanmaya devam edebilirsiniz.
3. **KVKK ve GDPR Uyumluluğu:** Dosyalar cihazınızı terk etmediği için dışarıya bir veri aktarımı (cross-border data transfer) söz konusu olmaz. Bu da kurumsal şirketlerin KVKK/GDPR süreçlerinde hiçbir hukuksal veya idari sorun yaşamadan araçları personellerine kullandırtabilmesini sağlar.

### Teknik Olarak Hangi PDF İşlemlerini Sunucusuz Yapabilirsiniz?

Tarayıcı içerisinde (Client-side) şu işlemleri sıfır riskle yapabilirsiniz:
- **PDF'i JPEG/PNG'ye Çevirme:** HTML5 Canvas API ve PDF.js kullanılarak PDF sayfaları canvas üzerine çizilir ve anında base64/blob olarak görüntü dosyasına çevrilir.
- **PDF Bölme ve Birleştirme:** pdf-lib gibi JavaScript kütüphaneleriyle dokümanın byte array (bayt dizisi) verisi manipüle edilerek yeni PDF dosyaları oluşturulur.
- **Metin Çıkarma (Text Extraction):** Belge içindeki metin düğümleri (text nodes) Regex tabanlı parse işlemleriyle ayıklanarak salt metine dönüştürülür.

Teknik belgelerinizi, yönetim kurulu kararlarınızı veya gizli projelerinizi manipüle etmeniz gerektiğinde asla belgeleri uzak sunuculara göndermeyin. Zero-Backend araçlar sayesinde hızdan ödün vermeden, gizlilikten %100 emin olabilirsiniz.
