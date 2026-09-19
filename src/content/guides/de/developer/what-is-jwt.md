---
title: "Was ist JWT (JSON Web Token)? Der umfassende Leitfaden"
description: "Ein umfassender Leitfaden zu JSON Web Tokens (JWT). Erfahren Sie, wie JWTs funktionieren, wie ihre interne Struktur aufgebaut ist, wie sie traditionelle Sitzungscookies ersetzen und welche Best Practices für die Sicherung Ihrer Webanwendungen gelten."
date: "2026-09-19"
tags: ["JWT", "Sicherheit", "Authentifizierung", "Webentwicklung", "JSON"]
---

# Was ist JWT (JSON Web Token)? Der umfassende Leitfaden

Wenn Sie ein Webentwickler sind, der moderne Anwendungen erstellt, insbesondere Single-Page-Applications (SPAs) wie React oder Vue, oder wenn Sie sich mit REST-APIs verbinden, sind Sie mit Sicherheit schon einmal auf **JWT** (oft wie "jot" ausgesprochen) gestoßen.

JWT steht für **JSON Web Token**. Es hat sich schnell zum Industriestandard für die Sicherung von APIs und die Authentifizierung von Benutzern in verteilten Systemen entwickelt. Aber wie genau sorgt eine Zeichenfolge aus scheinbar zufälligen Zeichen dafür, dass eine gesamte Benutzersitzung sicher bleibt? Warum ist die Branche von den traditionellen Sitzungscookies abgerückt und hat sich diesen Token zugewandt?

In diesem ausführlichen Leitfaden werden wir die Mechanismen von JSON Web Tokens aufschlüsseln, ihre interne Struktur untersuchen, sie mit traditionellen Authentifizierungsmethoden vergleichen und die entscheidenden Sicherheits-Best-Practices besprechen, die Sie befolgen müssen, um zu verhindern, dass Ihre JWTs kompromittiert werden.

## Das Problem: Traditionelle zustandsbehaftete (Stateful) Authentifizierung

Um zu verstehen, warum JWT erfunden wurde, müssen Sie das Problem verstehen, das es löst.

HTTP ist ein **zustandsloses (stateless)** Protokoll. Das bedeutet, dass der Server bei jeder Anfrage eines Benutzers (wie dem Klicken auf einen Link oder dem Absenden eines Formulars) keine Erinnerung an die vorherige Anfrage hat. Wenn Sie sich auf Seite 1 anmelden (Login), vergisst der Server sofort, dass Sie angemeldet sind, sobald Sie zu Seite 2 navigieren.

In der Vergangenheit haben Entwickler dieses Problem mit **Sitzungscookies (Session Cookies)** gelöst (zustandsbehaftete Authentifizierung).
1. Der Benutzer meldet sich mit einem Benutzernamen und einem Passwort an.
2. Der Server überprüft die Anmeldeinformationen und erstellt eine "Sitzung" in seiner Datenbank (oder im Arbeitsspeicher), wodurch eine eindeutige `Session ID` generiert wird.
3. Der Server sendet diese `Session ID` zurück an den Browser des Benutzers, der sie in einem Cookie speichert.
4. Bei jeder folgenden Anfrage sendet der Browser das Cookie mit. Der Server sucht die `Session ID` in seiner Datenbank, sieht, wem sie gehört, und gewährt den Zugriff.

### Warum funktionierte dieses System nicht mehr?
Dieses System funktionierte 15 Jahre lang perfekt. Doch dann änderte sich die moderne Webarchitektur. Die Anwendungen verlagerten sich von monolithischen Servern hin zu **Microservices**.

Stellen Sie sich eine E-Commerce-Website vor, bei der der "Benutzerserver" Anmeldungen verarbeitet, der "Produktserver" den Katalog verarbeitet und der "Zahlungsserver" die Kasse übernimmt. Wenn der Benutzerserver eine Sitzung in seiner lokalen Datenbank erstellt, hat der Produktserver keine Ahnung, wer der Benutzer ist, da er die Datenbank des Benutzerservers nicht sehen kann. Das Teilen von Sitzungszuständen über Dutzende von verteilten Servern hinweg ist unglaublich langsam, teuer und schwer zu skalieren.

## Die Lösung: Zustandslose (Stateless) Authentifizierung mit JWT

**JSON Web Tokens (JWT)** bieten eine **zustandslose** Lösung.

Anstatt eine Sitzung in einer Datenbank zu speichern und dem Benutzer eine bedeutungslose ID zu senden, verpackt der Server alle notwendigen Benutzerinformationen (wie die Benutzer-ID und seine Rolle) in ein kleines JSON-Objekt. Der Server signiert dieses JSON-Objekt dann digital mithilfe eines geheimen kryptografischen Schlüssels und sendet das gesamte signierte Objekt an den Benutzer zurück. Das ist das JWT.

Wenn der Benutzer seine nächste Anfrage stellt, sendet er das JWT mit. Der empfangende Server betrachtet das Token, überprüft die digitale Signatur, um sicherzustellen, dass sie nicht manipuliert wurde, und weiß sofort, wer der Benutzer ist – ohne jemals in einer Datenbank nachsehen zu müssen!

Da das Token *selbst* die Daten enthält und die Signatur ihre Echtheit garantiert, kann jeder Microservice, der den geheimen Schlüssel des Servers kennt, das Token sofort überprüfen.

## Die Struktur eines JWT

Wenn Sie sich ein rohes JWT ansehen, sieht es aus wie eine lange Zeichenfolge aus zufälligem Text, getrennt durch zwei Punkte:
`xxxxxxx.yyyyyyy.zzzzzzz`

Diese drei Abschnitte sind eigentlich Base64-codierte Zeichenfolgen, die die drei Teile des Tokens darstellen: den **Header (Kopfzeile)**, die **Payload (Nutzlast)** und die **Signature (Signatur)**.

### 1. Der Header (`xxxxxxx`)
Der Header besteht typischerweise aus zwei Teilen: der Art des Tokens (was "JWT" ist) und dem verwendeten Signaturalgorithmus, wie z. B. HMAC SHA256 (HS256) oder RSA.
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
Dieses JSON wird Base64Url-codiert, um den ersten Teil des Tokens zu bilden.

### 2. Die Payload (`yyyyyyy`)
Die Payload enthält die **Claims (Behauptungen)**. Claims sind Aussagen über eine Entität (typischerweise den Benutzer) und zusätzliche Daten. Es gibt drei Arten von Claims:
- **Registrierte (Registered) Claims:** Vordefinierte Claims, die vom JWT-Standard empfohlen werden. Beispiele sind `iss` (Aussteller/Issuer), `exp` (Ablaufzeit/Expiration), `sub` (Betreff/Subject bzw. Benutzer-ID) und `aud` (Zielpublikum/Audience).
- **Öffentliche (Public) Claims:** Benutzerdefinierte Claims, die von Ihnen erstellt wurden, die jedoch in einer öffentlichen Registrierung definiert werden sollten, um Kollisionen zu vermeiden.
- **Private Claims:** Benutzerdefinierte Claims, die speziell dafür erstellt wurden, Informationen zwischen Ihrem Server und dem Client zu teilen. Zum Beispiel: `"role": "admin"`.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}
```
Dieses JSON wird Base64Url-codiert, um den zweiten Teil des Tokens zu bilden.

*KRITISCHE WARNUNG: Der Header und die Payload sind nur codiert (Base64), NICHT verschlüsselt (keine Encryption). Jeder, der ein JWT abfängt, kann es leicht decodieren und die Payload lesen. Fügen Sie niemals Passwörter, Sozialversicherungsnummern oder sensible Finanzdaten in eine JWT-Payload ein.*

### 3. Die Signatur (`zzzzzzz`)
Die Signatur ist der wichtigste Teil des JWT. Sie verhindert, dass Benutzer ihre eigenen Token ändern können.

Um die Signatur zu erstellen, nimmt der Server den codierten Header, die codierte Payload und einen hochsicheren **Secret Key (Geheimen Schlüssel)**, den nur der Server kennt. Er leitet diese drei Teile durch den im Header spezifizierten Algorithmus (wie HMAC SHA256).

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret_key
)
```

Wenn ein böswilliger Benutzer sein JWT abfängt, die Payload decodiert, `"role": "user"` in `"role": "admin"` ändert und es wieder codiert, wird der Server es ablehnen. Warum? Weil der Hacker den `secret_key` des Servers nicht kennt. Wenn der Server das geänderte Token erhält, berechnet er die Signatur neu. Die neue Signatur stimmt nicht mit der alten überein, und der Server erkennt sofort, dass das Token gefälscht wurde (dass es manipuliert wurde).

## JWT Best Practices und Sicherheitsfallen

Obwohl JWTs das Skalierungsproblem von Sitzungen lösen, bringen sie völlig neue Sicherheitsherausforderungen mit sich. Wenn Sie JWTs implementieren, müssen Sie diese Regeln befolgen:

### 1. Halten Sie die Lebensdauer kurz (Ablauf / Expiration)
Da JWTs zustandslos sind, gibt es keine einfache Möglichkeit, ein JWT auf der Serverseite zu "widerrufen" (revoke) oder zu "zerstören". Sobald ein Server ein JWT ausgibt, ist es gültig, bis es abläuft. Wenn ein Hacker das Token eines Benutzers stiehlt, hat er vollen Zugriff auf dieses Konto.

Daher sollten Ihre JWTs einen sehr kurzen `exp`-Claim (Ablaufzeitraum) haben – typischerweise 15 Minuten. Um den Benutzer angemeldet zu halten, ohne ihn zu zwingen, sein Passwort alle 15 Minuten erneut einzugeben, verwenden Sie ein **Refresh Token** (ein separates, langlebiges Token, das sicher gespeichert wird und neue kurzlebige JWTs anfordern kann).

### 2. Token sicher speichern
Wo legen Sie das JWT im Browser ab?
- **Local Storage / Session Storage:** Dies ist der häufigste, aber auch der gefährlichste Ort. Jedes Javascript, das auf Ihrer Seite läuft (einschließlich bösartiger Skripte durch XSS-Angriffe), kann den Local Storage auslesen und das Token stehlen.
- **HttpOnly Cookies:** Dies ist der empfohlene Ansatz. Wenn Sie das JWT in einem `HttpOnly`- und `Secure`-Cookie senden, sendet der Browser es automatisch mit jeder Anfrage mit, aber Javascript wird komplett blockiert, das Cookie zu lesen, wodurch XSS-Angriffe vereitelt werden.

### 3. Validieren Sie den Signaturalgorithmus
In der Vergangenheit wiesen einige JWT-Bibliotheken einen kritischen Fehler auf, bei dem ein Hacker den Header auf `"alg": "none"` (keine Signatur erforderlich) ändern konnte. Der Server akzeptierte dies blind. Stellen Sie immer sicher, dass Ihr Backend-Framework den erwarteten Algorithmus (z. B. HS256) explizit fest codiert und `"none"` ablehnt.

## Fazit

JSON Web Tokens (JWT) haben die Art und Weise, wie moderne Webanwendungen die Authentifizierung handhaben, grundlegend verändert. Indem Identitäts- und Autorisierungsdaten in ein kryptografisch verifiziertes Token gepackt werden, machen sie zentrale Sitzungsdatenbanken überflüssig und ermöglichen es Microservices, unendlich und unabhängig voneinander zu skalieren.

Mit großer Macht kommt jedoch auch große Verantwortung. Da JWTs zustandslos und eigenständig sind, können eine unsachgemäße Speicherung, eine zu lange Lebensdauer oder das Speichern sensibler Daten in der Payload zu katastrophalen Sicherheitsverletzungen führen. Verstehen Sie die Struktur, schützen Sie Ihre geheimen Schlüssel, verwenden Sie HttpOnly-Cookies, und JWTs dienen als robuste, blitzschnelle Sicherheitsschicht für Ihre Anwendungen.
