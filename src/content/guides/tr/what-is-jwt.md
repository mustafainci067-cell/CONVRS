---
title: "JWT (JSON Web Token) Nedir? Kapsamlı Rehber"
description: "JSON Web Token'ları (JWT) hakkında kapsamlı bir rehber. JWT'lerin nasıl çalıştığını, iç yapısını, geleneksel oturum çerezlerinin yerini nasıl aldığını ve web uygulamalarınızı güvence altına almak için en iyi uygulamaları öğrenin."
date: "2026-09-19"
tags: ["JWT", "Güvenlik", "Kimlik Doğrulama", "Web Geliştirme", "JSON"]
---

# JWT (JSON Web Token) Nedir? Kapsamlı Rehber

Modern uygulamalar, özellikle React veya Vue gibi tek sayfalı uygulamalar (SPA'lar) geliştiriyorsanız veya REST API'lere bağlanıyorsanız, muhtemelen **JWT** (genellikle "jot" olarak okunur) terimiyle karşılaşmışsınızdır.

JWT'nin açılımı **JSON Web Token**'dır. Dağıtılmış sistemler arasında (distributed systems) API'leri güvence altına almak ve kullanıcıların kimliğini doğrulamak için hızla endüstri standardı haline gelmiştir. Peki ama görünüşte rastgele karakterlerden oluşan bir dize, tüm bir kullanıcı oturumunu (session) nasıl güvende tutar? Sektör neden geleneksel oturum çerezlerinden (session cookies) uzaklaşıp bu tokenlara yöneldi?

Bu kapsamlı rehberde, JSON Web Token'larının mekaniğini parçalara ayıracak, iç yapılarını keşfedecek, onları geleneksel kimlik doğrulama yöntemleriyle karşılaştıracak ve JWT'lerinizin ele geçirilmesini önlemek için uymanız gereken kritik güvenlik en iyi uygulamalarını tartışacağız.

## Sorun: Geleneksel Durumlu (Stateful) Kimlik Doğrulama

JWT'nin neden icat edildiğini anlamak için çözdüğü sorunu anlamanız gerekir.

HTTP **durumsuz (stateless)** bir protokoldür. Bu, bir kullanıcı sunucuya her istek yaptığında (bir bağlantıya tıklamak veya bir form göndermek gibi), sunucunun önceki istekle ilgili hiçbir hafızası olmadığı anlamına gelir. Sayfa 1'de giriş yaparsanız (login), siz Sayfa 2'ye gidene kadar sunucu giriş yaptığınızı anında unutacaktır.

Tarihsel olarak geliştiriciler bunu **Oturum Çerezleri (Session Cookies)** (Durumlu Kimlik Doğrulama - Stateful Authentication) kullanarak çözdüler.
1. Kullanıcı bir kullanıcı adı ve şifre ile giriş yapar.
2. Sunucu, kimlik bilgilerini doğrular ve veritabanında (veya belleğinde) benzersiz bir `Session ID` oluşturarak bir "Oturum" yaratır.
3. Sunucu bu `Session ID`'yi kullanıcının tarayıcısına geri gönderir ve tarayıcı bunu bir çerez (cookie) içinde saklar.
4. Sonraki her istekte tarayıcı çerezi gönderir. Sunucu, veritabanında `Session ID`'yi arar, kime ait olduğunu görür ve erişime izin verir.

### Bu sistem neden bozuldu?
Bu sistem 15 yıl boyunca mükemmel bir şekilde çalıştı. Ancak daha sonra modern web mimarisi değişti. Uygulamalar monolitik (tek parça) sunuculardan **mikro hizmetlere (microservices)** kaydı.

"Kullanıcı Sunucusu"nun girişleri işlediği, "Ürün Sunucusu"nun kataloğu işlediği ve "Ödeme Sunucusu"nun ödemeyi işlediği bir e-ticaret sitesi düşünün. Kullanıcı Sunucusu kendi yerel veritabanında bir oturum oluşturursa, Ürün Sunucusu Kullanıcı Sunucusunun veritabanını göremediği için kullanıcının kim olduğu hakkında hiçbir fikre sahip olamaz. Oturum durumlarını düzinelerce dağıtılmış sunucu arasında paylaşmak inanılmaz derecede yavaş, pahalı ve ölçeklendirilmesi zordur.

## Çözüm: JWT ile Durumsuz (Stateless) Kimlik Doğrulama

**JSON Web Token'ları (JWT)**, **durumsuz (stateless)** bir çözüm sunar.

Sunucu, bir oturumu veritabanında saklamak ve kullanıcıya anlamsız bir kimlik (ID) göndermek yerine, gerekli tüm kullanıcı bilgilerini (Kullanıcı Kimliği ve rolü gibi) küçük bir JSON nesnesine paketler. Sunucu daha sonra gizli bir kriptografik anahtar kullanarak bu JSON nesnesini dijital olarak imzalar ve imzalanmış nesnenin tamamını kullanıcıya geri gönderir. Bu, JWT'dir.

Kullanıcı bir sonraki isteğini yaptığında, JWT'yi de beraberinde gönderir. Alıcı sunucu token'a bakar, üzerinde oynanmadığından emin olmak için dijital imzayı doğrular ve bir veritabanına bakmak zorunda kalmadan kullanıcının kim olduğunu anında bilir!

Token'ın *kendisi* verileri içerdiğinden ve imza orijinalliğini garanti ettiğinden, sunucunun gizli anahtarını bilen herhangi bir mikro hizmet, token'ı anında doğrulayabilir.

## Bir JWT'nin Yapısı

Ham bir JWT'ye bakarsanız, iki noktayla ayrılmış uzun ve rastgele bir metin dizesine benzediğini görürsünüz:
`xxxxxxx.yyyyyyy.zzzzzzz`

Bu üç bölüm aslında token'ın üç parçasını temsil eden Base64 kodlu dizelerdir: **Header (Başlık)**, **Payload (Yük)** ve **Signature (İmza)**.

### 1. Header (Başlık) - `xxxxxxx`
Başlık tipik olarak iki bölümden oluşur: token'ın türü (bu durumda "JWT") ve kullanılan imzalama algoritması (örneğin HMAC SHA256 (HS256) veya RSA).
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
Bu JSON, token'ın ilk parçasını oluşturmak üzere Base64Url ile kodlanır.

### 2. Payload (Yük) - `yyyyyyy`
Yük, **claim**'leri (iddiaları/beyanları) içerir. Claim'ler, bir varlık (tipik olarak kullanıcı) ve ek veriler hakkındaki beyanlardır. Üç tür claim vardır:
- **Kayıtlı (Registered) claim'ler:** JWT standardı tarafından önerilen önceden tanımlanmış claim'ler. Örnekler arasında `iss` (yayıncı), `exp` (son kullanma tarihi), `sub` (konu/kullanıcı kimliği) ve `aud` (hedef kitle) bulunur.
- **Genel (Public) claim'ler:** Sizin tarafınızdan oluşturulan özel claim'lerdir, ancak çakışmaları önlemek için genel bir kayıt defterinde tanımlanmalıdırlar.
- **Özel (Private) claim'ler:** Bilgileri özellikle sunucunuz ve istemci arasında paylaşmak için oluşturulan özel claim'lerdir. Örneğin, `"role": "admin"`.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}
```
Bu JSON, token'ın ikinci parçasını oluşturmak için Base64Url ile kodlanır.

*KRİTİK UYARI: Başlık ve yük yalnızca kodlanmıştır (Base64), şifrelenmemiştir (şifreleme/encryption yoktur). Bir JWT'yi ele geçiren herkes kolayca kodunu çözebilir ve yükü okuyabilir. Bir JWT yükünün içine asla şifreleri, sosyal güvenlik numaralarını veya hassas finansal verileri koymayın.*

### 3. Signature (İmza) - `zzzzzzz`
İmza, JWT'nin en önemli parçasıdır. Kullanıcıların kendi token'larını değiştirmelerini engelleyen şey budur.

İmzayı oluşturmak için sunucu kodlanmış başlığı, kodlanmış yükü ve yalnızca sunucu tarafından bilinen son derece güvenli bir **Gizli Anahtarı (Secret Key)** alır. Bu üç parçayı başlıkta belirtilen algoritmadan (HMAC SHA256 gibi) geçirir.

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret_key
)
```

Kötü niyetli bir kullanıcı kendi JWT'sini yakalar, yükün kodunu çözer, `"role": "user"` kısmını `"role": "admin"` olarak değiştirir ve yeniden kodlarsa, sunucu bunu reddeder. Neden mi? Çünkü bilgisayar korsanı sunucunun `secret_key`'ini (gizli anahtarını) bilmemektedir. Sunucu değiştirilmiş token'ı aldığında imzayı yeniden hesaplayacaktır. Yeni imza eski imzayla eşleşmeyecek ve sunucu anında token'ın sahte olduğunu (üzerinde oynandığını) anlayacaktır.

## JWT En İyi Uygulamaları ve Güvenlik Tuzakları

JWT'ler oturumların (session) ölçeklendirme sorununu çözerken, tamamen yeni güvenlik zorlukları ortaya çıkarırlar. JWT uyguluyorsanız şu kurallara uymalısınız:

### 1. Ömrünü Kısa Tutun (Son Kullanma - Expiration)
JWT'ler durumsuz (stateless) olduğundan, bir JWT'yi sunucu tarafından "iptal etmenin" veya "yok etmenin" kolay bir yolu yoktur. Bir sunucu bir JWT verdiğinde, o JWT süresi dolana kadar (expire olana kadar) geçerlidir. Bir hacker kullanıcının token'ını çalarsa, o hesaba tam erişime sahip olur.

Bu nedenle, JWT'lerinizin çok kısa bir `exp` (son kullanma) süresi olmalıdır; tipik olarak 15 dakika. Kullanıcıyı her 15 dakikada bir şifresini yeniden girmeye zorlamadan giriş yapmış durumda tutmak için bir **Refresh Token (Yenileme Token'ı)** kullanırsınız (güvenli bir şekilde saklanan, yeni kısa ömürlü JWT'ler talep edebilen ayrı, uzun ömürlü bir token).

### 2. Token'ları Güvenli Bir Şekilde Saklayın
JWT'yi tarayıcıda nereye koyacaksınız?
- **Local Storage / Session Storage:** Burası en yaygın, ancak aynı zamanda en tehlikeli yerdir. Sayfanızda çalışan herhangi bir Javascript (XSS saldırılarından kaynaklanan kötü amaçlı komut dosyaları dahil) Local Storage'ı okuyabilir ve token'ı çalabilir.
- **HttpOnly Çerezleri (Cookies):** Önerilen yaklaşım budur. JWT'yi bir `HttpOnly` ve `Secure` çerezi içinde gönderirseniz, tarayıcı bunu her istekle otomatik olarak gönderir, ancak Javascript'in çerezi okuması tamamen engellenir ve böylece XSS saldırıları boşa çıkarılmış olur.

### 3. İmzalama Algoritmasını Doğrulayın
Geçmişte, bazı JWT kütüphanelerinde, bir bilgisayar korsanının başlığı `"alg": "none"` (imza gerekmez) olarak değiştirebildiği kritik bir kusur vardı. Sunucu bunu körü körüne kabul edebiliyordu. Arka uç (backend) çerçevenizin beklenen algoritmayı (örn. HS256) açıkça kodladığından ve `"none"` değerini reddettiğinden her zaman emin olun.

## Sonuç

JSON Web Token'ları (JWT), modern web uygulamalarının kimlik doğrulamayı nasıl ele aldığını temelden değiştirmiştir. Kimlik ve yetkilendirme verilerini kriptografik olarak doğrulanmış bir token'da paketleyerek, merkezi oturum veritabanlarına olan ihtiyacı ortadan kaldırır ve mikro hizmetlerin sonsuz ve bağımsız olarak ölçeklenmesini sağlarlar.

Bununla birlikte, büyük güç büyük sorumluluk getirir. JWT'ler durumsuz ve kendi kendine yeten oldukları için, depolamalarını yanlış yönetmek, ömürlerini çok uzun tutmak veya yüke (payload) hassas veriler koymak feci güvenlik ihlallerine yol açabilir. Yapıyı anlayın, gizli anahtarlarınızı koruyun, HttpOnly çerezlerini kullanın; JWT'ler uygulamalarınız için sağlam, son derece hızlı bir güvenlik katmanı görevi görecektir.
