---
title: "SQL Formatı: Veritabanlarının Evrensel Dili"
description: "SQL formatını, tarihini, ilişkisel veritabanlarının onu nasıl kullandığını ve Yapılandırılmış Sorgu Dili'nin (SQL) neden internetteki veri yönetiminin omurgası olmaya devam ettiğini keşfedin."
date: "2026-09-19"
tags: ["SQL", "Veritabanları", "Veri Yönetimi", "Programlama", "Veri Formatları"]
---

# SQL Formatı: Veritabanlarının Evrensel Dili

Bir sosyal medya hesabına her giriş yaptığınızda, çevrimiçi bir ürün satın aldığınızda veya banka bakiyenizi kontrol ettiğinizde, arka planda sessizce çalışan bir veritabanı vardır. Ve bu veritabanlarının büyük çoğunluğuyla iletişim kurmak için kullanılan dil **SQL**'dir.

SQL (Structured Query Language - Yapılandırılmış Sorgu Dili) sadece bir format değildir; ilişkisel bir veritabanı yönetim sisteminde (RDBMS) tutulan verileri yönetmek ve manipüle etmek için özel olarak tasarlanmış standartlaştırılmış bir programlama dilidir. Bir `.sql` dosya formatı, basitçe SQL kodu (sorgular) içeren bir metin dosyasıdır.

Bu rehberde SQL'in ne olduğunu, veri depolamada nasıl devrim yarattığını, temel sözdizimini (syntax) ve icadından on yıllar sonra bile neden inanılmaz derecede geçerli kalmaya devam ettiğini keşfedeceğiz.

---

## SQL Dosyası Nedir?

Bir `.sql` dosyası, SQL talimatları içeren düz bir metin (plain text) dosyasıdır. Bu talimatlar, bir veritabanı sunucusuna nasıl tablo oluşturulacağını, veri ekleneceğini, kayıtların güncelleneceğini, bilgilerin silineceğini veya belirli veri kümelerinin nasıl alınacağını (retrieve) söyler.

Sadece bir metin olduğu için, bir `.sql` dosyasını herhangi bir temel metin düzenleyicide (Not Defteri veya TextEdit gibi) açabilirsiniz. Ancak, dosyanın içindeki kodu gerçekten *çalıştırmak (execute)* için MySQL, PostgreSQL, Microsoft SQL Server veya SQLite gibi bir veritabanı yazılımına ihtiyacınız vardır.

### .sql Dosyalarının Yaygın Kullanım Alanları
- **Veritabanı Dökümleri (Dumps) / Yedeklemeler:** Bir veritabanını yedeklediğinizde, sistem genellikle veritabanını sıfırdan yeniden oluşturmak ve mevcut tüm verileri eklemek için gereken tüm talimatları içeren devasa bir `.sql` dosyası oluşturur.
- **Geçişler (Migrations):** Geliştiriciler, uygulamaları geliştikçe veritabanı şemalarındaki (schema) değişiklikleri (örneğin, "kullanici_yasi" için yeni bir sütun eklemek) izlemek için `.sql` dosyalarını kullanırlar.
- **Veri Analizi:** Veri bilimciler (Data scientists), yeniden kullanılabilmeleri veya iş arkadaşlarıyla paylaşılabilmeleri için karmaşık analitik sorguları `.sql` dosyalarına kaydederler.

---

## SQL'in Kısa Tarihi

1970'lerden önce veritabanlarında gezinmek inanılmaz derecede zordu. Veriler karmaşık hiyerarşik veya ağ yapılarında depolanıyordu. Belirli bir veri parçasını bulmak için bir programcının diskin fiziksel yapısında manuel olarak gezinmek üzere karmaşık kodlar yazması gerekiyordu.

1970 yılında **Edgar F. Codd** adlı bir IBM araştırmacısı, **İlişkisel Veritabanı Modeli'ni (Relational Database Model)** öneren bir makale yayınladı. Verilerin satırlardan ve sütunlardan oluşan basit, anlaşılması kolay tablolarda (ilişkiler) depolanması gerektiğini ve bu tabloların ortak veri noktaları kullanılarak birbirine bağlanabileceğini (ilişkilendirilebileceğini) öne sürdü.

Kısa bir süre sonra, Donald D. Chamberlin ve Raymond F. Boyce adlı iki diğer IBM araştırmacısı, Codd'un ilişkisel modelindeki verileri manipüle etmek için **SEQUEL**'i (Structured English QUEry Language) yarattı. Bu kısaltma daha sonra ticari marka sorunu nedeniyle **SQL** olarak kısaltıldı.

1980'lere gelindiğinde SQL, Oracle gibi devasa şirketler tarafından benimsenen ve ANSI (Amerikan Ulusal Standartlar Enstitüsü) tarafından standartlaştırılan veritabanı yönetimi için standart dil haline gelmişti.

---

## SQL Nasıl Çalışır: Temel Kavramlar

SQL *bildirimsel (declarative)* bir dildir. Python veya C++ gibi bilgisayara bir şeyi *nasıl* yapacağını adım adım söylemeniz gereken dillerin aksine, SQL'de sadece *ne* istediğinizi tanımlarsınız ve veritabanı motoru (engine) bunu elde etmenin en verimli yolunu bulur.

SQL komutları genellikle dört kategoriye ayrılır:

### 1. DDL (Veri Tanımlama Dili - Data Definition Language)
Veritabanı yapısını (şema) tanımlamak için kullanılır.
- `CREATE TABLE`: Yeni bir tablo oluşturur.
- `ALTER TABLE`: Mevcut bir tabloyu değiştirir.
- `DROP TABLE`: Bir tabloyu siler.

### 2. DML (Veri İşleme Dili - Data Manipulation Language)
Tabloların içindeki asıl verileri manipüle etmek için kullanılır.
- `INSERT INTO`: Yeni veri satırları ekler.
- `UPDATE`: Mevcut satırları değiştirir.
- `DELETE`: Satırları kaldırır.

### 3. DQL (Veri Sorgulama Dili - Data Query Language)
SQL'in en yaygın kullanımı: veritabanına sorular sormak.
- `SELECT`: Bir veya daha fazla tablodan veri alır (getirir).

### 4. DCL (Veri Kontrol Dili - Data Control Language)
Güvenlik ve izinler için kullanılır.
- `GRANT`: Bir kullanıcıya bir şey yapma izni (yetki) verir.
- `REVOKE`: Bir izni kaldırır (geri alır).

---

## Basit Bir SQL Örneği

`Kullanicilar` (Users) adında bir veritabanı tablosu hayal edin.

| ID | Ad | Soyad | Yas | Sehir |
|----|----|-------|-----|-------|
| 1  | Ali| Yilmaz| 28  | Istanbul |
| 2  | Can| Kaya  | 34  | Ankara   |
| 3  | Efe| Demir | 22  | Istanbul |

İstanbul'da yaşayan ve 25 yaşın üzerinde olan tüm kullanıcıların adlarını bulmak isterseniz, SQL sorgusu şu şekilde görünecektir:

```sql
SELECT Ad, Soyad 
FROM Kullanicilar 
WHERE Sehir = 'Istanbul' AND Yas > 25;
```

**Sonuç:**
| Ad  | Soyad  |
|-----|--------|
| Ali | Yilmaz |

İngilizceye benzeyen bu sözdizimi, SQL'in neden bu kadar popüler kalmaya devam ettiğinin kanıtıdır; programcı olmayanlar için bile inanılmaz derecede sezgiseldir (mantıksaldır).

---

## Modern SQL Ortamı

Temel dil standartlaştırılmış olsa da, farklı veritabanı satıcıları SQL'in kendilerine özgü hafifçe değiştirilmiş "tatlarını" (lehçelerini) oluşturmuşlardır. En popülerleri şunlardır:
- **MySQL:** Web uygulamaları için yaygın olarak kullanılan (genellikle PHP ile birlikte) açık kaynaklı bir güç merkezi.
- **PostgreSQL:** SQL standartlarına sıkı sıkıya bağlılığı ve güçlü özellikleriyle bilinen gelişmiş, açık kaynaklı bir nesne-ilişkisel (object-relational) veritabanı.
- **SQLite:** Tamamen tek bir dosyanın içinde yaşayan minik, bağımsız bir veritabanı motoru. Dünyada en yaygın olarak dağıtılan veritabanıdır (her iPhone, Android ve web tarayıcısında kullanılır).
- **Microsoft SQL Server / T-SQL:** Microsoft'un kurumsal düzeydeki ilişkisel veritabanı sistemi.

### SQL vs. NoSQL
2010'larda MongoDB ve Cassandra gibi veritabanlarını içeren **NoSQL** (Not Only SQL - Sadece SQL Değil) adında yeni bir trend ortaya çıktı. Bu veritabanları katı tablolar kullanmazlar ve genellikle yapılandırılmamış verileri (ham JSON belgeleri gibi) depolamak veya devasa ölçeklenebilirliği idare etmek için tercih edilirler.

Ancak NoSQL, SQL'i öldürmedi. Bunun yerine geliştiriciler artık her ikisini de kullanıyor. İlişkisel (SQL) veritabanları, finansal işlemler veya envanter yönetimi gibi ilişkilerin ve veri bütünlüğünün (ACID uyumluluğu) kritik olduğu yapılandırılmış veriler için mutlak altın standart (gold standard) olmaya devam etmektedir.

## Sonuç

`.sql` formatı, bilgisayar bilimi tarihindeki en başarılı ve kalıcı teknolojilerden birini temsil eder. Karmaşık veri sorularını basit, okunabilir metinlerle ifade etme yeteneği, yazılım tasarımında bir ustalık sınıfıdır. İster ölçeklenebilir bir web uygulaması oluşturan bir arka uç (backend) geliştiricisi, ister iş trendleri arayan bir veri analisti, isterse de müşteri davranışlarını analiz eden bir pazarlamacı olun, SQL temel ve son derece değerli bir beceri olmaya devam etmektedir.
