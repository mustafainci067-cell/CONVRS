---
title: "VCF Formatı (vCard): Dijital Kartvizit"
description: "Elektronik kartvizitler için evrensel standart olan VCF (vCard) formatını, kişi verilerini nasıl yapılandırdığını ve mobil cihazlar için neden hala çok önemli olduğunu keşfedin."
date: "2026-09-19"
tags: ["VCF", "vCard", "Kişiler", "Rehber", "Mobil", "Veri Formatları"]
---

# VCF Formatı (vCard): Dijital Kartvizit

En son yeni bir akıllı telefon aldığınız zamanı düşünün. Yüzlerce kişinizi (isimler, telefon numaraları, e-posta adresleri ve profil resimleri) eski telefonunuzdan yeni telefonunuza nasıl aktardınız? Veya birisi mesajlaşma uygulaması üzerinden kişi bilgilerini sizinle paylaştığında bunu anında nasıl kaydediyorsunuz?

Bu kusursuz, günlük eylemlerin arkasında sessiz ve son derece verimli bir dosya formatı vardır: **VCF (Sanal Kişi Dosyası - Virtual Contact File)**, daha yaygın bilinen adıyla **vCard**.

Bir `.vcf` dosyası, fiziksel bir kartvizitin dijital eşdeğeridir. Farklı platformlar, e-posta istemcileri ve mobil işletim sistemleri arasında kişisel ve profesyonel iletişim bilgilerini (rehber kayıtlarını) paylaşmak için evrensel standarttır.

Bu rehberde, bir VCF dosyasının ne olduğunu, verileri nasıl yapılandırdığını ve on yıllardır kişi (rehber) yönetimi için neden tartışmasız standart olarak kaldığını keşfedeceğiz.

---

## VCF (vCard) Dosyası Nedir?

Bir `.vcf` dosyası (Virtual Contact File), kişi bilgilerini (rehber) depolamak için kullanılan standartlaştırılmış bir metin dosyası formatıdır.

Telefonunuzda veya Outlook'ta açtığınızda özel bir kişi (rehber) kartı gibi görünse de, kaputun altında (arka planda) bir VCF dosyası sadece düz bir metindir (plain text). Düz metin olduğu için inanılmaz derecede hafiftir (genellikle sadece birkaç kilobayt) ve e-postalara kolayca eklenebilir, SMS veya WhatsApp yoluyla gönderilebilir veya bir QR kodu olarak gömülebilir.

Standart bir VCF dosyası, bir kişi veya işletme hakkında aşağıdakiler dahil olmak üzere çok çeşitli bilgiler içerebilir:
- İsim (Ad, Soyad, İkinci Ad, Unvan)
- Organizasyon veya Şirket Adı
- İş Ünvanı
- Telefon numaraları (Mobil, İş, Ev, Faks)
- E-posta adresleri
- Fiziksel adresler (Sokak, Şehir, Posta Kodu, Ülke)
- Web sitesi URL'leri
- Doğum günleri
- Base64 kodlamalı bir profil fotoğrafı veya logosu

---

## Bir VCF Dosyasının Anatomisi

VCF düz bir metin formatı olduğu için, herhangi bir `.vcf` dosyasını Windows'ta Not Defteri (Notepad) veya Mac'te TextEdit gibi standart bir metin düzenleyici kullanarak aslında açabilirsiniz.

Ayşe Yılmaz adında kurgusal bir kişi için bir vCard dosyası açsaydınız, ham kod şuna benzer bir şey olurdu:

```text
BEGIN:VCARD
VERSION:3.0
N:Yılmaz;Ayşe;;;
FN:Ayşe Yılmaz
ORG:Teknoloji Çözümleri A.Ş.
TITLE:Yazılım Mühendisi
TEL;TYPE=WORK,VOICE:(555) 123-4567
TEL;TYPE=CELL,VOICE:(555) 987-6543
EMAIL;TYPE=PREF,INTERNET:ayse.yilmaz@ornek.com
URL:https://www.ayseyilmaz.com
END:VCARD
```

### Yapıyı Anlamak
VCF formatının güzelliği, katı ve kolayca ayrıştırılabilir (parsable) yapısında yatar:
- **`BEGIN:VCARD` ve `END:VCARD`:** Her vCard bu etiketlerle başlamak ve bitmek zorundadır. Bu, yazılıma kişi verilerinin tam olarak nerede başlayıp bittiğini söyler. Bu blokları arka arkaya ekleyerek tek bir `.vcf` dosyasının içine *birden fazla* kişiyi (hatta tüm rehberinizi) koyabilirsiniz (tam telefon rehberi yedeklemeleri böyle oluşturulur).
- **`VERSION:`:** Hangi vCard standardı sürümünün kullanıldığını belirtir (2.1, 3.0 ve 4.0 en yaygın olanlarıdır).
- **`N:` ve `FN:`:** "İsim" (Soyadı;Ad;İkinci Ad şeklinde yapılandırılmış) ve "Biçimlendirilmiş İsim" (Ekranda nasıl görünmesi gerektiği - Formatted Name).
- **Özellikler (`TEL`, `EMAIL`, `ORG`):** Bunlar verinin türünü tanımlar. Veriye bağlam kazandırmak için özelliklerin (`TYPE=WORK` - İş veya `TYPE=CELL` - Cep gibi) parametrelere nasıl sahip olabileceğine dikkat edin.

---

## VCF Neden Evrensel Bir Standarttır?

VCF formatı ilk olarak 1995 yılında Versit Konsorsiyumu (Apple, AT&T, IBM ve Siemens'i içeriyordu) tarafından önerildi. Daha sonra standart İnternet Mühendisliği Görev Gücü'ne (IETF - Internet Engineering Task Force) devredildi.

VCF'nin bu kadar baskın olmasının nedeni mutlak tarafsızlığıdır. Apple, Google veya Microsoft'a ait değildir. Açık bir standarttır.

- **Platformlar Arası Uyum (Cross-Platform):** Kişilerinizi (rehberinizi) bir Apple iPhone'dan (iOS) dışa aktarırsanız, bir VCF dosyası oluşturur. Tam olarak aynı VCF dosyasını bir Google Android telefona veya bilgisayardaki Microsoft Outlook'a içe aktarırsanız, mükemmel bir şekilde çalışır. VCF, rakip ekosistemler arasındaki uçurumu kapatır.
- **E-posta İmzaları:** Birçok profesyonel, e-posta imzalarına bir `.vcf` dosyası ekler. Bu, alıcının adları ve numaraları manuel olarak yazmak zorunda kalmadan, tek bir tıklamayla onları adres defterine (rehberine) eklemesine olanak tanır.
- **Modern Uyarlamalar:** QR kodları, vCard'lara yeni bir hayat verdi. Bir QR kodu, bir VCF dosyasının metin verilerini tutabilir. Akıllı telefon kameranızla bir "kişi QR kodunu" (contact QR code) taradığınızda, VCF metnini okur, ayrıştırır ve verilerle önceden doldurulmuş "Yeni Kişi Ekle" ekranınızı anında açar.

## Sonuç

Teknolojinin hızla değiştiği bir çağda VCF formatı, basit ve açık standartların gücünün bir kanıtıdır. Karmaşık tescilli veritabanları yerine yapılandırılmış düz metne (plain text) dayanan vCard, hangi cihazı veya yazılımı kullanırsak kullanalım dijital adres defterlerimizin (rehberlerimizin) taşınabilir, birlikte çalışabilir ve güvenli kalmasını sağlamıştır. Bir dahaki sefere telefonunuzda bir kişiyi paylaştığınızda, arka planda gerçekleşen düz metin büyüsünün tam olarak ne olduğunu bileceksiniz.
