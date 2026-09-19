---
title: "Was ist Base64-Codierung? Wie sie funktioniert und warum wir sie verwenden"
description: "Ein vollständiger Leitfaden zum Verständnis der Base64-Codierung. Erfahren Sie, warum Binärdaten in Text konvertiert werden müssen, wie die Mathematik funktioniert und welche gängigen Anwendungsfälle es gibt (z.B. Data URIs und JWTs)."
date: "2026-09-18"
tags: ["Base64", "Codierung", "Webentwicklung", "Datenübertragung", "Programmierung"]
---

# Was ist Base64-Codierung? Wie sie funktioniert und warum wir sie verwenden

Wenn Sie sich jemals den Quellcode einer E-Mail angesehen haben, ein JSON Web Token (JWT) inspiziert haben oder sich eine HTML-Datei angesehen haben, bei der ein Bild direkt in den Code eingebettet anstatt über eine URL verlinkt wurde, haben Sie wahrscheinlich einen riesigen Textblock gesehen, der so aussieht:

`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`

Diese scheinbar zufällige Folge von Buchstaben, Zahlen und Gleichheitszeichen sind keine verschlüsselten Daten und auch kein fehlerhafter Text. Es handelt sich um **Base64-Codierung (Base64 Encoding)**.

Base64 ist ein unglaublich häufiger Mechanismus, der in der Informatik verwendet wird, um Binärdaten (wie Bilder, Audiodateien oder kompilierte Programme) in ein sicheres, reines Textformat zu übersetzen. Aber warum müssen wir das tun? Warum können Computer Dateien nicht einfach direkt aneinander senden, ohne sie zuerst in Text zu übersetzen?

In diesem umfassenden Leitfaden werden wir genau aufschlüsseln, was Base64-Codierung ist, aus welchen historischen Gründen sie erfunden wurde, welche zugrunde liegende Mathematik die Daten konvertiert, was die häufigsten modernen Anwendungsfälle sind und was der entscheidende Unterschied zwischen Codierung (Encoding) und Verschlüsselung (Encryption) ist.

## Warum brauchen wir Base64? Die Geschichte

Um Base64 zu verstehen, müssen Sie die Anfangstage des Internets und der E-Mail verstehen.

Computer kommunizieren mit Hilfe des Binärsystems (1en und 0en). Ein Bild einer Katze ist nur eine massive Abfolge von Binärdaten. Die frühen Netzwerkprotokolle, insbesondere **SMTP (Simple Mail Transfer Protocol)**, das heute noch zur Weiterleitung von E-Mails verwendet wird, waren jedoch ursprünglich *ausschließlich* für die Verarbeitung von reinem Text (Plain Text) konzipiert.

Genauer gesagt waren sie für die Verarbeitung von **7-Bit-ASCII-Zeichen** konzipiert. Die 7-Bit-ASCII-Tabelle enthält nur 128 Zeichen: das englische Alphabet (A-Z, a-z), Zahlen (0-9), Satzzeichen und einige Steuerzeichen wie "Wagenrücklauf" (Carriage Return) oder "Zeilenvorschub" (Line Feed).

Wenn Sie versuchen, rohe Binärdaten (wie ein JPEG-Bild) über ein altes, textbasiertes System wie SMTP zu senden, wird das System die binären 1en und 0en als zufällige ASCII-Steuerzeichen falsch interpretieren. Es könnte einen Teil Ihres Bildes als "Löschen"-Befehl oder als "Dateiende"-Befehl interpretieren und so die Übertragung sofort zerstören.

**Die Lösung:** Ingenieure brauchten eine Möglichkeit, 8-Bit-Binärdaten nur unter Verwendung der sicheren, druckbaren 7-Bit-ASCII-Zeichen darzustellen. So wurde Base64 geboren. Es nimmt eine beliebige Binärdatei und übersetzt sie vollständig in sichere Textzeichen, die ein textbasiertes Protokoll niemals zerstören werden.

## Wie funktioniert Base64 eigentlich?

Der Name "Base64" verrät, wie es funktioniert. So wie unser Standard-Zählsystem zur Basis 10 (mit den Ziffern 0-9) und das Binärsystem zur Basis 2 (mit 0 und 1) arbeitet, verwendet Base64 ein Alphabet aus 64 Zeichen, um Daten darzustellen.

Das Base64-Alphabet besteht aus:
- **Großbuchstaben:** A bis Z (26 Zeichen)
- **Kleinbuchstaben:** a bis z (26 Zeichen)
- **Zahlen:** 0 bis 9 (10 Zeichen)
- **Symbole:** `+` und `/` (2 Zeichen)
*(Gesamt = 64 Zeichen)*

### Der Übersetzungsprozess
Auf Computerebene werden Daten in 8-Bit-Bytes gruppiert. Da Base64 64 Zeichen verwendet und 2 hoch 6 64 ergibt ($2^6 = 64$), repräsentiert jedes Base64-Zeichen genau **6 Bit** an Daten.

Um binär in Base64 zu konvertieren, führt der Computer Folgendes aus:
1. Er nimmt die Binärdaten in Blöcken von 24 Bit (was genau drei 8-Bit-Bytes entspricht).
2. Er teilt diese 24 Bit in vier kleinere Blöcke von jeweils 6 Bit auf.
3. Er übersetzt jeden 6-Bit-Block in sein entsprechendes Base64-Zeichen aus dem 64-Zeichen-Alphabet.

Kurz gesagt: **Jeweils 3 Byte Rohdaten werden in 4 Zeichen Base64-Text umgewandelt.**

### Was ist das Gleichheitszeichen (`=`)?
Wenn Sie Base64-Strings gesehen haben, ist Ihnen wahrscheinlich aufgefallen, dass sie oft mit einem oder zwei Gleichheitszeichen enden (wie `dGVzdA==`). Dies wird als **Padding (Auffüllung)** bezeichnet.
Da der Konvertierungsprozess die Entnahme von Daten in 3-Byte-Blöcken (24 Bit) erfordert: Was passiert, wenn die ursprüngliche Dateigröße nicht perfekt durch 3 teilbar ist?
Wenn nur noch 1 Byte übrig ist, fügt der Algorithmus am Ende zwei `=` Zeichen hinzu, um den Block "aufzufüllen". Wenn noch 2 Byte übrig sind, fügt er ein `=` hinzu. Dieses Padding teilt der Decodierungssoftware genau mit, wie die endgültigen Bytes rekonstruiert werden müssen.

## Häufige moderne Anwendungsfälle

Während Base64 ursprünglich für E-Mail-Anhänge (MIME) entwickelt wurde, wird es heute im gesamten modernen Web-Stack stark genutzt.

### 1. Data-URIs in HTML/CSS
Anstatt einen Webbrowser zu zwingen, eine separate HTTP-Anforderung (Request) zu stellen, um ein kleines Bildsymbol (Icon) herunterzuladen, können Entwickler das Bild in Base64 codieren und es direkt in die HTML- oder CSS-Datei einbetten.
```html
<!-- Beispiel für ein eingebettetes Base64-Bild -->
<img src="data:image/png;base64,iVBORw0KGgoAAA..." alt="Icon">
```
Dadurch werden Netzwerkabfragen gespart, was die Ladezeiten von Seiten für sehr kleine Grafiken beschleunigen kann, obwohl dies bei großen Fotos vermieden werden sollte.

### 2. JSON Web Tokens (JWT)
Wenn Sie moderne Webanwendungen entwickeln, verwenden Sie wahrscheinlich JWTs für die Benutzerauthentifizierung. Ein JWT besteht aus drei Teilen (Header, Payload, Signature), die durch Punkte getrennt sind. Der Header und die Payload sind vollständig in Base64 codiert. Dadurch wird sichergestellt, dass komplexe JSON-Objekte sicher in HTTP-Headern hin und her übertragen werden können, ohne das HTTP-Protokoll zu unterbrechen.

### 3. E-Mail-Anhänge (MIME)
Wie bereits erwähnt, ist dies der ursprüngliche Anwendungsfall. Wenn Sie einer E-Mail eine PDF-Datei oder ein Foto anhängen, codiert Ihr E-Mail-Client diese Datei automatisch in Base64, bettet den riesigen Textblock in den E-Mail-Text ein, und der E-Mail-Client des Empfängers decodiert ihn wieder in eine Datei.

### 4. Grundlegende HTTP-Authentifizierung (Basic Auth)
Wenn Sie ein Browser über ein integriertes Browser-Popup nach einem Benutzernamen und einem Kennwort fragt, sendet er diese Anmeldeinformationen mithilfe eines Headers wie `Authorization: Basic dXNlcjpwYXNz` an den Server. Der String `dXNlcjpwYXNz` ist nur der Text `user:pass`, codiert in Base64.

## Warnung: Base64 ist KEINE Verschlüsselung!

Dies ist das häufigste und gefährlichste Missverständnis unter Junior-Entwicklern. **Base64 bietet absolut null Sicherheit.**

Es ist *Codierung (Encoding)*, nicht *Verschlüsselung (Encryption)*. Codierung ändert das Format von Daten für einen sicheren Transport. Bei der Verschlüsselung werden Daten mit einem mathematischen Schlüssel so unleserlich gemacht, dass Unbefugte sie nicht lesen können.

Jeder, der einen Base64-String abfängt, kann ihn ohne Passwort oder Schlüssel sofort decodieren. Sie sollten Base64 niemals verwenden, um Passwörter, API-Schlüssel oder vertrauliche Benutzerdaten zu "verstecken". Wenn Sie den Basic Auth-String `dXNlcjpwYXNz` decodieren, erhalten Sie sofort den Benutzernamen und das Passwort im Klartext.

## Die Nachteile von Base64

Obwohl Base64 unglaublich nützlich ist, hat es zwei große Nachteile:
1. **Größen-Overhead:** Da alle 3 Bytes in 4 Zeichen umgewandelt werden, **erhöht die Base64-Codierung die Dateigröße um genau 33 %.** Wenn Sie ein 3-MB-Bild haben und es in Base64 konvertieren, um es in eine HTML-Datei einzufügen, wird die HTML-Datei um 4 MB größer. Aus diesem Grund sollten Sie große Dateien niemals als Data-URIs einbetten.
2. **Verarbeitungskosten:** Es kostet CPU-Leistung für einen Client (wie einen Webbrowser), den riesigen Base64-String wieder in ein binäres Bild zu decodieren, bevor es gerendert wird.

## Fazit

Base64 ist der unbesungene Held des Internets. Es fungiert als universeller Übersetzer zwischen komplexen Binärdateien und reinen Text-Kommunikationsprotokollen. Zwar macht es Dateien etwas größer und bietet keine Sicherheit, aber seine Fähigkeit, Bilder, Dokumente und Token sicher in einfachen ASCII-Text zu verpacken, stellt sicher, dass das moderne Web – und Ihre täglichen E-Mails – weiterhin reibungslos funktionieren.

Wenn Sie jemals schnell eine Textzeichenfolge codieren oder einen Base64-String decodieren müssen, um zu sehen, was er enthält, können Sie das auf dieser Website verfügbare kostenlose Tool zum Codieren/Decodieren von Base64 verwenden!
