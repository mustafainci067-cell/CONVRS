import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Hash Functions Explained: MD5, SHA-256 and Password Security",
    eyebrow: "Developer",
    description:
      "Hashing is one-way: the same input always produces the same output, but the output reveals nothing about the input. Learn what hashes are for, why MD5 fell out of favor, and how to generate them safely.",
    excerpt:
      "One-way cryptography made practical: checksums, fingerprints and password verification.",
    readingTime: "8 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["Hashes are everywhere behind the scenes. They verify that a downloaded file matches its published fingerprint, they index content, they detect data corruption, and they protect passwords. Understanding them clears up a lot of confusion about what cryptography can — and cannot — do. This guide explains the idea, the common algorithms, and the huge difference between hashing and encryption."] },

    { type: "h2", content: ["What a hash is"] },
    { type: "p", content: ["A hash function takes any input — a word, a sentence, a 10 GB movie — and produces a fixed-length output called a digest. The rules that make it useful:"] },
    { type: "list", items: [
      [{ text: "Deterministic: ", bold: true }, { text: "the same input always produces the same digest." }],
      [{ text: "Fixed length: ", bold: true }, { text: "SHA-256 always outputs 256 bits, whatever the input size." }],
      [{ text: "One-way: ", bold: true }, { text: "given a digest, there is no practical way to reconstruct the input." }],
      [{ text: "Avalanche effect: ", bold: true }, { text: "changing a single bit of input changes roughly half the output." }],
    ]},
    { type: "note", tone: "success", title: "Hashing vs. encryption", content: [
      { text: "Encryption is reversible — you decrypt with a key. ", bold: true },
      { text: "Hashing is designed to be irreversible — there is no 'unhash' function. That design is exactly what makes it safe for storing passwords: the system stores the digest, never the password." }
    ]},

    { type: "h2", content: ["Common algorithms and when they fit"] },
    { type: "table", columns: ["Algorithm", "Output size", "Use for", "Avoid for"], rows: [
      ["MD5", "128-bit", "Quick non-crypto checksums", "Security (collisions found)"],
      ["SHA-1", "160-bit", "Legacy compatibility", "Security (deprecated)"],
      ["SHA-256", "256-bit", "File verification, signatures, general security", "—"],
      ["SHA-512", "512-bit", "High-security contexts", "—"],
    ]},
    { type: "p", content: ["The story in one line: MD5 and SHA-1 were fine in their time, but researchers found ways to create collisions — two different inputs producing the same digest. Today, SHA-256 (part of the SHA-2 family) is the baseline for security use: file downloads, integrity checks, and building blocks of signatures."] },

    { type: "h2", content: ["Hashes for file verification"] },
    { type: "p", content: ["When you download software, the publisher often lists a checksum — an SHA-256 digest — next to the download link. You hash the downloaded file and compare: if the digests match, the file is byte-identical to what the publisher produced; a mismatch means a corrupt or tampered download. This catches both transmission errors and malicious modification."] },

    { type: "h2", content: ["Passwords: how hashing protects them"] },
    { type: "p", content: ["A responsible system never stores your password. It stores the digest, so even if a database leaks, attackers get hashes they cannot reverse. That is why length and randomness still matter: short, common passwords can be guessed by hashing every dictionary word and comparing digests (a dictionary or rainbow attack). Long random passwords are impractical to brute-force."] },

    { type: "h2", content: ["Generating hashes safely"] },
    { type: "p", content: ["Generating a hash requires nothing but the input — it is a pure computation. A browser-based hash generator computes MD5, SHA-1, SHA-256 or SHA-512 locally, which matters when the input is sensitive: a document hash, a confidential string, or an internal identifier never needs to cross the network to be checksummed."] },

    { type: "h2", content: ["Hash generator in Convrs"] },
    { type: "p", content: ["Convrs includes a hash generator supporting the MD5, SHA-1, SHA-256 and SHA-512 algorithms, running entirely in the browser. Type or paste your input, choose an algorithm, copy the digest. Nothing is transmitted — the computation stays in JavaScript/WASM on your device."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Hash Fonksiyonları: MD5, SHA-256 ve Parola Güvenliği",
    eyebrow: "Geliştirici",
    description:
      "Hashing tek yönlüdür: aynı girdi her zaman aynı çıktıyı üretir, ancak çıktı girdi hakkında hiçbir şey açığa vurmaz. Hash'lerin ne işe yaradığını ve nasıl güvenle üretileceğini öğrenin.",
    excerpt:
      "Pratik hale getirilmiş tek yönlü kriptografi: sağlama toplamları, parmak izleri ve parola doğrulama.",
    readingTime: "8 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Hash'ler her yerde, arka planda çalışır. İndirilen dosyanın yayınlanan parmak iziyle eşleştiğini doğrular, içeriği dizinler, veri bozulmasını tespit eder ve parolaları korur. Bu rehber fikri, yaygın algoritmaları ve hashing ile şifreleme arasındaki devasa farkı anlatır."] },

    { type: "h2", content: ["Hash nedir?"] },
    { type: "p", content: ["Bir hash fonksiyonu herhangi bir girdiyi alır ve özet adı verilen sabit uzunlukta bir çıktı üretir. Onu yararlı kılan kurallar:"] },
    { type: "list", items: [
      [{ text: "Belirleyici: ", bold: true }, { text: "aynı girdi her zaman aynı özeti üretir." }],
      [{ text: "Sabit uzunluk: ", bold: true }, { text: "SHA-256 girdi boyutundan bağımsız olarak her zaman 256 bit üretir." }],
      [{ text: "Tek yönlü: ", bold: true }, { text: "özetten girdiyi yeniden kurmanın pratik bir yolu yoktur." }],
      [{ text: "Çığ etkisi: ", bold: true }, { text: "girdinin tek bir bitini değiştirmek çıktının yaklaşık yarısını değiştirir." }],
    ]},
    { type: "note", tone: "success", title: "Hashing ve şifreleme", content: [
      { text: "Şifreleme geri dönüşümlüdür — bir anahtarla çözersiniz. ", bold: true },
      { text: "Hashing geri döndürülemez tasarlanmıştır — 'hash açma' işlevi yoktur. Bu tasarım, parola saklamak için güvenli olmasını sağlar: sistem parolayı değil, özeti saklar." }
    ]},

    { type: "h2", content: ["Yaygın algoritmalar"] },
    { type: "table", columns: ["Algoritma", "Çıktı boyutu", "Kullanım", "Kaçının"], rows: [
      ["MD5", "128-bit", "Hızlı kriptografik olmayan sağlama", "Güvenlik (çakışma bulundu)"],
      ["SHA-1", "160-bit", "Eski uyumluluk", "Güvenlik (eski)"],
      ["SHA-256", "256-bit", "Dosya doğrulama, imzalar, genel güvenlik", "—"],
      ["SHA-512", "512-bit", "Yüksek güvenlikli bağlamlar", "—"],
    ]},
    { type: "p", content: ["Özetle: MD5 ve SHA-1 zamanında iyiydi, ancak araştırmacılar çakışma üretmenin yollarını buldu. Bugün SHA-256, güvenlik kullanımı için temel çizgidir."] },

    { type: "h2", content: ["Dosya doğrulama için hash'ler"] },
    { type: "p", content: ["Yazılım indirirken yayıncı genellikle indirme bağlantısının yanına bir sağlama toplamı — SHA-256 özeti — listeler. İndirilen dosyayı hash'lerseniz ve karşılaştırırsanız: özetler eşleşirse dosya, yayıncının ürettiğiyle bayt bayt aynıdır; uyuşmazlık, bozuk veya değiştirilmiş indirme demektir."] },

    { type: "h2", content: ["Parolalar: hash onları nasıl korur?"] },
    { type: "p", content: ["Sorumlu bir sistem parolanızı asla saklamaz. Özeti saklar; veritabanı sızsa bile saldırgan tersine çeviremeyeceği hash'ler alır. Bu yüzden uzunluk ve rastgelelik önemlidir: kısa, yaygın parolalar sözlük saldırısıyla tahmin edilebilir. Uzun rastgele parolaları kaba kuvvetle kırmak pratik değildir."] },

    { type: "h2", content: ["Hem üretim hem de güvenlik"] },
    { type: "p", content: ["Convrs, MD5, SHA-1, SHA-256 ve SHA-512 algoritmalarını destekleyen, tamamen tarayıcıda çalışan bir hash üretici sunar. Girdinizi yazın, algoritmayı seçin, özeti kopyalayın. Hiçbir şey iletilmez — hesaplama cihazınızda kalır."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Hash-Funktionen erklärt: MD5, SHA-256 und Passwortsicherheit",
    eyebrow: "Entwickler",
    description:
      "Hashing ist einseitig: gleiche Eingabe, gleiche Ausgabe — aber die Ausgabe verrät nichts über die Eingabe. Erfahren Sie, wofür Hashes gut sind und wie man sie sicher erzeugt.",
    excerpt:
      "Einseitige Kryptografie in der Praxis: Prüfsummen, Fingerabdrücke und Passwortprüfung.",
    readingTime: "9 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Hashes arbeiten überall im Hintergrund. Sie verifizieren Downloads, erkennen Datenkorruption und schützen Passwörter. Dieser Leitfaden erklärt die Idee, die Algorithmen und den Unterschied zwischen Hashen und Verschlüsseln."] },
    { type: "h2", content: ["Was ein Hash ist"] },
    { type: "p", content: ["Eine Hash-Funktion erzeugt aus einer Eingabe einen Digest fester Länge. Eigenschaften: deterministisch, feste Länge, einseitig und ein Lawineneffekt bei kleinen Änderungen."] },
    { type: "note", tone: "success", title: "Hashing vs. Verschlüsselung", content: [
      { text: "Verschlüsselung ist umkehrbar. ", bold: true },
      { text: "Hashing ist bewusst nicht umkehrbar — genau das macht es sicher für Passwortspeicherung." }
    ]},
    { type: "h2", content: ["Gängige Algorithmen"] },
    { type: "table", columns: ["Algorithmus", "Größe", "Verwendung", "Vermeiden"], rows: [
      ["MD5", "128-bit", "Schnelle Prüfsummen", "Sicherheit (Kollisionen)"],
      ["SHA-1", "160-bit", "Alte Systeme", "Sicherheit (veraltet)"],
      ["SHA-256", "256-bit", "Dateiverifikation, Signaturen", "—"],
    ]},
    { type: "p", content: ["Kurz: MD5 und SHA-1 haben bekannte Schwächen. SHA-256 ist heute der Standard für Sicherheitsanwendungen."] },
    { type: "h2", content: ["Passwortsicherheit"] },
    { type: "p", content: ["Ein verantwortungsvolles System speichert nur den Hash, nie das Passwort. Selbst bei einem Datenleck können Angreifer die Hashes nicht umkehren. Lange, zufällige Passwörter sind gegen Brute-Force praktisch immun."] },
    { type: "h2", content: ["Hashes sicher erzeugen"] },
    { type: "p", content: ["Der Hash-Generator von Convrs unterstützt MD5, SHA-1, SHA-256 und SHA-512 im Browser. Eingabe bleibt lokal; nichts wird übertragen."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Funciones hash explicadas: MD5, SHA-256 y seguridad de contraseñas",
    eyebrow: "Desarrollador",
    description:
      "El hashing es unidireccional: la misma entrada siempre produce la misma salida, pero la salida no revela nada de la entrada. Aprende para qué sirven los hashes.",
    excerpt:
      "Criptografía unidireccional en la práctica: sumas de comprobación y verificación de contraseñas.",
    readingTime: "8 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Los hashes trabajan tras bambalinas: verifican descargas, detectan corrupción y protegen contraseñas. Esta guía explica la idea y la diferencia entre hashing y cifrado."] },
    { type: "h2", content: ["Qué es un hash"] },
    { type: "p", content: ["Una función hash produce un resumen de longitud fija a partir de cualquier entrada. Propiedades: determinista, longitud fija, unidireccional y efecto avalancha."] },
    { type: "note", tone: "success", title: "Hashing frente a cifrado", content: [
      { text: "El cifrado es reversible. ", bold: true },
      { text: "El hashing es irreversible por diseño — por eso es seguro para almacenar contraseñas." }
    ]},
    { type: "h2", content: ["Algoritmos habituales"] },
    { type: "table", columns: ["Algoritmo", "Tamaño", "Uso", "Evitar"], rows: [
      ["MD5", "128-bit", "Sumas rápidas", "Seguridad (colisiones)"],
      ["SHA-1", "160-bit", "Sistemas antiguos", "Seguridad (obsoleto)"],
      ["SHA-256", "256-bit", "Verificación, firmas", "—"],
    ]},
    { type: "h2", content: ["Seguridad de contraseñas"] },
    { type: "p", content: ["Un sistema responsable guarda solo el hash, nunca la contraseña. Incluso con una fuga, los atacantes no pueden revertir los hashes. Las contraseñas largas y aleatorias son prácticamente inmunes al ataque de fuerza bruta."] },
    { type: "h2", content: ["Generador de hash en Convrs"] },
    { type: "p", content: ["El generador de Convrs admite MD5, SHA-1, SHA-256 y SHA-512 en el navegador. La entrada permanece local; nada se transmite."] },
  ],
};

const hashFunctionGuide: GuideDefinition = {
  slug: "hash-function-guide",
  content: { en, tr, de, es },
};

export default hashFunctionGuide;