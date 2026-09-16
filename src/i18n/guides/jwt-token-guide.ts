import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "JWT Tokens Explained: Structure, Security and How to Decode Them",
    eyebrow: "Developer",
    description:
      "JWTs carry authentication and authorization between your app and its API on every request. Learn what a token is made of, what the three dots mean, and how to inspect one safely without pasting it into a random website.",
    excerpt:
      "Header.payload.signature: what a JWT really is, and how to read one without exposing it.",
    readingTime: "8 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: ["If you have logged into a modern web application, you have almost certainly held a JWT — a JSON Web Token — in your browser's memory. It is the standard way apps pass identity and permissions to an API: log in once, receive a token, and attach it to every subsequent request. Developers debug these tokens constantly, which is where JWT decoding tools come in. This guide explains how they work and — crucially — how to inspect one safely."] },

    { type: "h2", content: ["Anatomy of a JWT"] },
    { type: "p", content: ["A JWT is a compact, URL-safe string with three parts separated by dots:"] },
    { type: "code", lang: "text", content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFsaWNlIn0.kXsd_SxZVkTo6bvLYJvMjNY_2dU-h59DtiQ4kB-dq7I" },
    { type: "list", items: [
      [{ text: "Header ", bold: true }, { text: "(first part): the algorithm used, usually HS256 (symmetric) or RS256 (asymmetric)." }],
      [{ text: "Payload ", bold: true }, { text: "(second part): the claims — user ID, roles, expiry (exp), issued-at (iat)." }],
      [{ text: "Signature ", bold: true }, { text: "(third part): a cryptographic hash over header + payload that only the server can verify." }],
    ]},
    { type: "p", content: ["Each part is Base64Url-encoded JSON. That means the header and payload are readable by anyone who decodes them — they are not encrypted. Only the signature is secret. This is the single most important thing to understand about JWTs: a token's middle section is plain text; anyone holding the token can read your claims."] },

    { type: "h2", content: ["Decoding is not verifying"] },
    { type: "note", tone: "warning", title: "Do not confuse the three steps", content: [
      { text: "Decoding ", bold: true }, { text: "(turning Base64Url back into readable JSON) requires no key and tells you what the claims say. " },
      { text: "Verifying ", bold: true }, { text: "(checking the signature matches) requires the server's secret — and only then can you trust the claims." },
    ]},
    { type: "p", content: ["A decoder shows you the claims; only signature verification proves the token wasn't forged. When you decode a token in a tool you are inspecting the payload, not confirming it is valid."] },

    { type: "h2", content: ["Security: never paste a live token into unknown sites"] },
    { type: "p", content: ["A bearer token is the key to your account session. Pasting it into an online decoder sends that key to a stranger's server — and because the payload is trivial to decode, the 'service' gains nothing they couldn't get locally, while you lose the only thing worth protecting. Treat tokens like passwords: they belong in local tooling only."] },
    { type: "list", items: [
      ["Prefer decoders that run entirely in the browser, with no network request."],
      ["Generate a fake or expired token and decode that for practice instead of a live one."],
      ["Revoke tokens if you suspect one was exposed — most auth systems let you invalidate a session."],
    ]},

    { type: "h2", content: ["What to look for when you decode"] },
    { type: "list", items: [
      [{ text: "exp ", bold: true }, { text: "(expiration): is the token still within its validity window?" }],
      [{ text: "iat ", bold: true }, { text: "(issued at): when was it created?" }],
      [{ text: "sub ", bold: true }, { text: "(subject): which user does it identify?" }],
      [{ text: "roles/scopes ", bold: true }, { text: ": what is the token permitted to do?" }],
      [{ text: "iss/aud ", bold: true }, { text: "(issuer/audience): was it meant for this service?" }],
    ]},
    { type: "p", content: ["Diagnosing a 401, debugging an authorization flow, or explaining a token to a teammate all start with a clean decode — done locally, in seconds."] },

    { type: "h2", content: ["JWT decoding in Convrs"] },
    { type: "p", content: ["Convrs includes a JWT decoder that runs entirely in the browser. You paste a token, the three parts are Base64Url-decoded client-side, and you see the header and payload as readable JSON. No request is made to any server, so even a production token stays on your machine."] },
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "JWT Token'ları: Yapı, Güvenlik ve Güvenli Şifre Çözme",
    eyebrow: "Geliştirici",
    description:
      "JWT'ler uygulamanız ile API'si arasında her istekte kimlik ve yetkilendirme taşır. Token'ın neyden oluştuğunu ve bilinmeyen bir siteye yapıştırmadan nasıl inceleneceğini öğrenin.",
    excerpt:
      "Header.payload.signature: JWT gerçekte nedir ve onu ifşa etmeden nasıl okunur?",
    readingTime: "8 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: ["Modern bir web uygulamasına giriş yaptıysanız, neredeyse kesinlikle bir JWT (JSON Web Token) tuttunuz. Uygulamaların kimliği API'ye iletme standardıdır: bir kez giriş yapın, token alın ve sonraki her isteğe ekleyin. Geliştiriciler bu token'ları sürekli hata ayıkladığı için JWT çözme araçları vazgeçilmezdir."] },

    { type: "h2", content: ["JWT'nin anatomisi"] },
    { type: "p", content: ["JWT, noktalarla ayrılmış üç parçadan oluşan kompakt, URL-güvenli bir dizedir: Header (algoritma), Peyload (iddialar — kullanıcı kimliği, roller, süre) ve İmza (yalnızca sunucunun doğrulayabileceği kriptografik özet)."] },
    { type: "p", content: ["Her parça Base64Url kodlu JSON'dur. Yani header ve payload, onları çözen herkes tarafından okunabilir — şifrelenmiş değillerdir. JWT'lerle ilgili anlaşılması gereken en önemli şey budur: token'ın ortası düz metindir; token'ı tutan herkes iddialarınızı okuyabilir."] },

    { type: "h2", content: ["Çözmek doğrulamak değildir"] },
    { type: "note", tone: "warning", title: "Üç adımı karıştırmayın", content: [
      { text: "Çözme ", bold: true }, { text: "(Base64Url'ü JSON'a geri çevirme) anahtar gerektirmez. " },
      { text: "Doğrulama ", bold: true }, { text: "(imzanın eşleştiğini kontrol etme) sunucunun gizli anahtarını gerektirir." },
    ]},

    { type: "h2", content: ["Güvenlik: canlı token'ı bilinmeyen sitelere asla yapıştırmayın"] },
    { type: "p", content: ["Bir taşıyıcı token, oturumunuzun anahtarıdır. Onu çevrimiçi bir çözücüye yapıştırmak, bu anahtarı bir yabancının sunucusuna göndermek demektir. Token'ları parola gibi düşünün: yalnızca yerel araçlara aittirler."] },
    { type: "list", items: [
      ["Ağ isteği yapmayan, tamamen tarayıcıda çalışan çözücüleri tercih edin."],
      ["Canlı token yerine sahte veya süresi dolmuş bir token ile pratik yapın."],
      ["Bir token'ın ifşa olduğundan şüphelenirseniz oturumu geçersiz kılın."],
    ]},

    { type: "h2", content: ["Çözerken nelere bakmalı?"] },
    { type: "list", items: [
      [{ text: "exp ", bold: true }, { text: "(süre): token hâlâ geçerli aralıkta mı?" }],
      [{ text: "iat ", bold: true }, { text: "(düzenleme): ne zaman oluşturuldu?" }],
      [{ text: "sub ", bold: true }, { text: "(konu): hangi kullanıcıyı tanımlıyor?" }],
      [{ text: "roles/scopes ", bold: true }, { text: ": token ne yapmaya yetkili?" }],
    ]},

    { type: "h2", content: ["Convrs'te JWT çözme"] },
    { type: "p", content: ["Convrs JWT çözücü tamamen tarayıcıda çalışır. Token yapıştırırsınız, üç parça istemci tarafında Base64Url çözülür ve header ile payload okunabilir JSON olarak görünür. Hiçbir sunucuya istek yapılmaz; üretim token'ı bile makinenizde kalır."] },
  ],
};

const de: GuideDocument = {
  meta: {
    title: "JWT-Tokens erklärt: Aufbau, Sicherheit und sicheres Dekodieren",
    eyebrow: "Entwickler",
    description:
      "JWTs tragen Identität und Berechtigungen zwischen App und API. Erfahren Sie, woraus ein Token besteht und wie Sie es sicher untersuchen.",
    excerpt:
      "Header.payload.signature: was ein JWT ist und wie man es liest, ohne es preiszugeben.",
    readingTime: "9 Min. Lesen",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: ["Wenn Sie sich je bei einer modernen Web-App angemeldet haben, haben Sie ein JWT gehalten. Dieser Leitfaden erklärt Aufbau, Sicherheit und sicheres Dekodieren."] },
    { type: "h2", content: ["Anatomie eines JWT"] },
    { type: "p", content: ["Ein JWT besteht aus drei, durch Punkte getrennten Teilen: Header (Algorithmus), Payload (Claims) und Signatur (nur vom Server prüfbar). Jeder Teil ist Base64Url-kodiertes JSON — Kopf und Nutzdaten sind nicht verschlüsselt und für jeden lesbar, der sie dekodiert."] },
    { type: "h2", content: ["Dekodieren ist nicht verifizieren"] },
    { type: "note", tone: "warning", title: "Verwechseln Sie die Schritte nicht", content: [
      { text: "Dekodieren ", bold: true }, { text: "braucht keinen Schlüssel. " },
      { text: "Verifizieren ", bold: true }, { text: "braucht das Servergeheimnis und beweist erst die Echtheit." },
    ]},
    { type: "h2", content: ["Sicherheit"] },
    { type: "p", content: ["Ein Bearer-Token ist der Schlüssel zu Ihrer Sitzung. Fügen Sie ihn nie in unbekannte Online-Tools ein. Behandeln Sie Tokens wie Passwörter — nur lokale Werkzeuge."] },
    { type: "list", items: [
      ["Browser-basierte Decoder ohne Netzwerkrequest bevorzugen."],
      ["Mit gefälschten oder abgelaufenen Tokens üben."],
      ["Bei Verdacht auf Leak: Sitzung widerrufen."],
    ]},
    { type: "h2", content: ["JWT-Dekodierung mit Convrs"] },
    { type: "p", content: ["Der Convrs-JWT-Decoder läuft vollständig im Browser. Die drei Teile werden clientseitig dekodiert; kein Request an einen Server, selbst ein Produktions-Token verlässt Ihr Gerät nicht."] },
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Tokens JWT explicados: estructura, seguridad y descifrado seguro",
    eyebrow: "Desarrollador",
    description:
      "Los JWT llevan identidad y autorización entre tu aplicación y su API. Aprende de qué está hecho un token y cómo inspeccionarlo con seguridad.",
    excerpt:
      "Header.payload.signature: qué es un JWT y cómo leerlo sin exponerlo.",
    readingTime: "8 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: ["Si has iniciado sesión en una aplicación web moderna, casi seguro has tenido un JWT. Esta guía explica su estructura, seguridad y descifrado seguro."] },
    { type: "h2", content: ["Anatomía de un JWT"] },
    { type: "p", content: ["Un JWT tiene tres partes separadas por puntos: Cabecera (algoritmo), Carga útil (claims) y Firma (verificable solo por el servidor). Cada parte es JSON codificado en Base64Url — no está cifrado y cualquiera puede leerlo."] },
    { type: "h2", content: ["Descifrar no es verificar"] },
    { type: "note", tone: "warning", title: "No confundas los pasos", content: [
      { text: "Descifrar ", bold: true }, { text: "no requiere clave. " },
      { text: "Verificar ", bold: true }, { text: "requiere el secreto del servidor." },
    ]},
    { type: "h2", content: ["Seguridad"] },
    { type: "p", content: ["Un token de portador es la llave de tu sesión. Nunca lo pegues en herramientas online desconocidas. Trátalo como una contraseña."] },
    { type: "h2", content: ["Descifrado JWT en Convrs"] },
    { type: "p", content: ["El descifrador JWT de Convrs funciona íntegramente en el navegador. Sin peticiones a ningún servidor; hasta un token de producción permanece en tu equipo."] },
  ],
};

const jwtTokenGuide: GuideDefinition = {
  slug: "jwt-token-guide",
  content: { en, tr, de, es },
};

export default jwtTokenGuide;