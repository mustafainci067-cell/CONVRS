---
title: "JSON Formatını Anlamak: Geliştiriciler İçin Rehber"
description: "JSON (JavaScript Object Notation) hakkında bilmeniz gereken her şey. Sözdizimini, desteklenen veri türlerini, XML'den farkını ve modern web geliştirmede nasıl kullanılacağını öğrenin."
date: "2026-09-19"
tags: ["JSON", "Web Geliştirme", "Veri Formatları", "API", "JavaScript"]
---

# JSON Formatını Anlamak: Geliştiriciler İçin Rehber

Web geliştirme, programlama veya API'ler hakkında öğrenmeye birkaç günden fazla zaman ayırdıysanız, şüphesiz **JSON** ile karşılaşmışsınızdır. JSON, modern internet iletişiminin mutlak omurgasıdır. Bir mobil uygulama hava durumunu getirdiğinde, bir tarayıcı sosyal medya akışınızı yüklediğinde veya akıllı bir ev cihazı sıcaklığı bildirdiğinde, bu veriler neredeyse kesinlikle JSON formatında iletilmektedir.

Peki JSON tam olarak nedir? Neden bu kadar inanılmaz derecede popüler oldu? Ve en önemlisi, uygulamalarınızı bozmadan onu nasıl okur, yazar ve manipüle edersiniz?

Bu kapsamlı rehberde, JSON'ın kökenlerini keşfedecek, kesin sözdizimi (syntax) kurallarını parçalara ayıracak, desteklediği veri türlerine bakacak ve XML gibi eski formatların yerini neden tamamen aldığını açıklayacağız.

## JSON Nedir?

**JSON**'ın açılımı **JavaScript Object Notation**'dır (JavaScript Nesne Gösterimi).

Özünde JSON, hafif, metin tabanlı bir veri değişim formatıdır. İnsanların okuması ve yazması kolay, makinelerin ayrıştırması (parse) ve üretmesi kolay olacak şekilde tasarlanmıştır.

Adında "JavaScript" geçmesine rağmen, JSON **tamamen dilden bağımsızdır**. Başlangıçta JavaScript'ten türetilmiştir, ancak bugün her büyük programlama dilinin (Python, Java, C#, Go, Ruby, PHP) JSON verilerini ayrıştırmak ve oluşturmak için yerleşik (built-in) kodları/kütüphaneleri vardır.

JSON'ın temel amacı, bir sunucu ile bir web uygulaması arasında veri iletmektir (örneğin, arka uç/backend veritabanından, ön uç/frontend React uygulamasına kullanıcı profili verilerini göndermek).

## JSON'ın Sözdizimi (Syntax) Kuralları

JSON son derece katı (strict) olmasıyla ünlüdür. Eksik tek bir virgül veya yanlış yerleştirilmiş bir tırnak işareti, bir ayrıştırma hatasıyla (korkulan `SyntaxError: Unexpected token`) sonuçlanacaktır. Kuralları anlamak kritik derecede önemlidir.

Bir JSON dosyası temel olarak iki yapı üzerine kuruludur:
1. **Nesneler (Objects):** Süslü parantezler `{}` içine alınmış anahtar-değer (key-value) çiftleri koleksiyonu.
2. **Diziler (Arrays):** Köşeli parantezler `[]` içine alınmış sıralı değerler listesi.

İşte bir kullanıcı profilini temsil eden eksiksiz ve geçerli bir JSON belgesi örneği:

```json
{
  "id": 1045,
  "username": "tech_guru_99",
  "isActive": true,
  "email": null,
  "roles": ["admin", "editor"],
  "profile": {
    "firstName": "Alice",
    "lastName": "Smith",
    "age": 28
  }
}
```

Geçerli JSON yazmanın altın kurallarını inceleyelim:

### 1. Veriler İsim/Değer Çiftleri Halindedir
Bir isim/değer çifti (anahtar-değer çifti olarak da adlandırılır), çift tırnak içinde bir alan adından, ardından gelen bir iki nokta üst üste işaretinden ve onu takip eden bir değerden oluşur.
`"username": "tech_guru_99"`

### 2. Anahtarlar (Keys) Çift Tırnak İçinde OLMALIDIR
JavaScript'te bir nesne anahtarını tırnak işaretleri olmadan yazabilirsiniz (örneğin, `username: "tech_guru_99"`). **JSON'da bu yasadışıdır.** Her bir anahtar kesinlikle çift tırnak `""` içine alınmalıdır. Tek tırnak `''` kullanımı da kesinlikle yasaktır.

### 3. Veriler Virgülle Ayrılır
Bir nesnedeki her çift ve bir dizideki her değer virgülle ayrılmalıdır. Ancak, **sonda virgül kullanılmasına (trailing comma) izin verilmez**. Bir listedeki veya nesnedeki son öğeden sonra virgül koyamazsınız.

*Geçersiz JSON (Sonda Virgül):*
```json
{
  "name": "Alice",
  "age": 28,
}
```

### 4. Yorumlara (Comments) İzin Verilmez
YAML veya standart kod dosyalarının aksine, JSON yorumları (`//` veya `/* */`) desteklemez. Standart bir JSON dosyasına yorum eklemeye çalışırsanız, ayrıştırıcı (parser) başarısız olur. JSON kesinlikle meta veriler veya ek açıklamalar için değil, yalnızca veriler için tasarlanmıştır.

## Desteklenen Veri Türleri

JSON yalnızca altı temel veri türünü destekler. Doğrudan JSON'ın içine bir fonksiyon, bir Tarih (Date) nesnesi veya "undefined" bir değer koyamazsınız.

1. **Dize (String):** Çift tırnak içine alınmış metin.
   - `"city": "Istanbul"`
2. **Sayı (Number):** Bir tamsayı veya ondalıklı sayı (tırnak yok).
   - `"age": 30`, `"pi": 3.14159`
3. **Boole (Boolean):** `true` veya `false` (tırnak yok, tamamen küçük harf).
   - `"isSubscribed": true`
4. **Dizi (Array):** Köşeli parantezler içine alınmış sıralı değerler listesi.
   - `"colors": ["red", "green", "blue"]`
5. **Nesne (Object):** Süslü parantezler içine alınmış iç içe anahtar-değer eşlemesi.
   - `"address": { "street": "Ataturk Cd." }`
6. **Null:** Boş veya eksik bir değeri temsil eder (küçük harf).
   - `"middleName": null`

*Tarihler Üzerine Not:* JSON'ın yerel bir Tarih (Date) türü olmadığı için, tarihler JSON'da saklanmadan önce genellikle standart ISO 8601 dizelerine (örneğin `"2026-09-19T14:30:00Z"`) veya sayısal Unix zaman damgalarına dönüştürülür.

## JSON ve XML: Web'in Dönüm Noktası

JSON'ı gerçekten takdir etmek için ondan önce ne geldiğine bakmalısınız: **XML (eXtensible Markup Language)**.

2000'li yılların başlarında veri aktarımı için standart XML idi. Önceki kullanıcı profilimizin XML dilinde nasıl yazılacağına bir bakalım:

```xml
<user>
  <id>1045</id>
  <username>tech_guru_99</username>
  <isActive>true</isActive>
  <email></email>
  <roles>
    <role>admin</role>
    <role>editor</role>
  </roles>
  <profile>
    <firstName>Alice</firstName>
    <lastName>Smith</lastName>
    <age>28</age>
  </profile>
</user>
```

### JSON Neden Kazandı?
1. **Daha Az Ayrıntılı (Less Verbose):** XML, verinin her bir parçası için açılış ve kapanış etiketleri gerektirir (`<username>...</username>`). Bu, dosya boyutunu önemli ölçüde büyütür, bu da bir ağ üzerinden iletilmesinin daha uzun sürdüğü anlamına gelir. JSON bu görsel gürültüyü ortadan kaldırır.
2. **Daha Hızlı Ayrıştırma (Parsing):** Tarayıcıların XML'i işlemsel olarak pahalı olan bir Belge Nesne Modeli (DOM) olarak taraması gerekir. JSON, JavaScript motoru tarafından `JSON.parse()` kullanılarak bir milisaniyenin çok küçük bir kısmında yerel olarak (natively) ayrıştırılabilir.
3. **Diziler (Arrays):** XML, yerel bir dizi kavramına sahip değildir. Yalnızca etiketleri tekrarlarsınız (yukarıdaki `<role>` etiketleri gibi). JSON'ın `[]` sözdizimi, hemen hemen her programlama dilindeki dizilerle kusursuz bir şekilde eşleşir.

## JavaScript'te JSON ile Çalışmak

JSON JavaScript'ten türetildiği için, JavaScript'te JSON ile çalışmak, temel olarak iki yöntem sağlayan yerleşik `JSON` nesnesi sayesinde inanılmaz derecede basittir.

### 1. `JSON.parse()`
Bu yöntem, ham bir JSON dizesini (genellikle bir API'den alınan) alır ve onu kullanılabilir bir JavaScript nesnesine dönüştürür.

```javascript
const jsonString = '{"name": "Alice", "age": 28}';
const userObject = JSON.parse(jsonString);

console.log(userObject.name); // Çıktı: Alice
```

### 2. `JSON.stringify()`
Bu yöntem ise tam tersini yapar. Bir JavaScript nesnesini alır ve ağ üzerinden gönderilebilmesi veya bir dosyaya kaydedilebilmesi için onu bir JSON dizesine dönüştürür.

```javascript
const myObj = {
  name: "Bob",
  skills: ["HTML", "CSS", "JS"]
};

const outgoingJSON = JSON.stringify(myObj);
// Çıktı: '{"name":"Bob","skills":["HTML","CSS","JS"]}'
```

## Sonuç

JSON, basitliğin bir zaferidir. Minimal ve katı bir dizi kural oluşturarak, tüm yazılım endüstrisine veri için evrensel bir dil sağladı.

İster bir Node.js projesini yapılandırıyor olun (örneğin `package.json` ile), ister üçüncü taraf bir API'den veri çekiyor veya karmaşık bir mikro hizmet (microservice) mimarisi inşa ediyor olun, JSON her şeyi bir arada tutan yapıştırıcıdır. Sözdizimi kurallarında ustalaşarak, desteklenen veri türlerini anlayarak ve onu seçtiğiniz dilde nasıl ayrıştıracağınızı ve dizeleştireceğinizi (stringify) bilerek, neredeyse tüm modern web ve arka uç (backend) geliştirme işlemlerinin temelini atmış olursunuz.
