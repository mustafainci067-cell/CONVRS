// Faz 3 — SEO-Inhaltsvorlage: deutsche Texte.
import type { SeoPhrases } from "./types";

export const de: SeoPhrases = {
  claims: {
    webpSmaller: {
      q: "Ist WebP kleiner als JPG?",
      a: "Oft ja. WebP erzeugt bei ähnlicher Bildqualität häufig deutlich kleinere Dateien als JPG — das beschleunigt Seiten und spart Bandbreite.",
    },
    pngTransparency: {
      q: "Unterstützt PNG Transparenz?",
      a: "Ja. PNG ist ein verlustfreies Format mit vollem Alphakanal. Transparente Hintergründe bleiben also erhalten — ideal für Logos, Icons und Grafiken.",
    },
    jpgPhoto: {
      q: "Ist JPG ein gutes Format für Fotos?",
      a: "Ja. JPG komprimiert Fotos, sodass die Datei klein bleibt, ist aber verlustbehaftet — Details gehen verloren. Es bleibt das Standardformat für Fotos im Web und in Kameras.",
    },
    heicIos: {
      q: "Warum überhaupt HEIC konvertieren?",
      a: "HEIC ist das Standard-Fotoformat von iPhone und iPad — effizient, aber nicht überall unterstützt. Die Umwandlung zu JPG macht Ihre Fotos in jeder App und auf jedem Gerät öffnbar.",
    },
    icoWindows: {
      q: "Wann brauche ich eine ICO-Datei?",
      a: "ICO ist das klassische Favicon-Format für Windows, Browser und Tabs. Eine PNG-Version hilft, wenn ein Favicon nicht gelesen wird oder eine transparente Rasterkopie benötigt wird.",
    },
    svgVector: {
      q: "Was unterscheidet SVG von PNG?",
      a: "SVG ist vektorbasiert und bleibt in jeder Größe scharf; PNG ist eine Bitmap mit fester Auflösung. SVG→PNG wird für rasterbasierte Zwecke wie Uploads genutzt.",
    },
    base64Text: {
      q: "Was ist Base64?",
      a: "Base64 kodiert Text oder Binärdaten in sichere ASCII-Zeichen, sodass Daten durch reine Textkanäle, E-Mails oder JSON verlustfrei transportiert werden können.",
    },
    imageToBase64: {
      q: "Warum ein Bild in Base64 umwandeln?",
      a: "Als Base64-Daten-URI eingebettete Bilder lassen sich direkt in HTML, CSS oder JSON einfügen — ideal, wenn keine separaten Bilddateien gehostet werden können.",
    },
    imageCompress: {
      q: "Wie stark verkleinert die Komprimierung mein Bild?",
      a: "Qualitätsbewusste Komprimierung reduziert die Dateigröße meist deutlich. Sie können ein wenig Qualität gegen eine viel kleinere Datei tauschen — alles läuft lokal.",
    },
    removeBg: {
      q: "Funktioniert das Entfernen des Hintergrunds bei jedem Foto?",
      a: "Am besten bei klarem Kontrast zwischen Motiv und Hintergrund. Das Ergebnis kommt als PNG mit transparentem Hintergrund zurück — einsatzbereit für E-Commerce oder Design.",
    },
    imageResize: {
      q: "Verringert das Verkleinern die Dateigröße?",
      a: "Ja — weniger Pixel bedeuten weniger Bytes. Das Verkleinern passt das Bild außerdem an exakte Formate an, etwa 1080px für Social-Media-Cover.",
    },
    imageCrop: {
      q: "Warum sollte ich ein Bild zuschneiden?",
      a: "Zuschneiden entfernt störende Ränder, fokussiert das Motiv und passt ein Seitenverhältnis an — etwa ein quadratisches Avatar oder ein 16:9-Titelbild.",
    },
    filtersGraphic: {
      q: "Was bewirken Bildfilter?",
      a: "Filter wie Graustufen, Sepia, Helligkeit oder Kontrast werden Pixel für Pixel im Browser angewendet — Ihre Originaldatei wird weder verändert noch hochgeladen.",
    },
    watermark: {
      q: "Warum ein Wasserzeichen hinzufügen?",
      a: "Ein Wasserzeichen legt ein Logo oder einen Text über das Bild, um es zu branden oder zu schützen — die Urheberschaft ist erkennbar und unerlaubtes Kopieren wird erschwert.",
    },
    palette: {
      q: "Wie wird eine Farbpalette extrahiert?",
      a: "Das Tool analysiert das hochgeladene Bild und sammelt seine dominanten Farben. Sie erhalten eine gebrauchsfertige Palette für ein konsistentes Designsystem.",
    },
    exif: {
      q: "Was enthält EXIF und warum entfernen?",
      a: "EXIF ist versteckte Metadaten wie Kameramodell, GPS-Standort und Aufnahmedatum. Das Entfernen schützt Ihre Privatsphäre, bevor Sie Fotos online teilen.",
    },
    jsonStructured: {
      q: "Wofür wird JSON am besten genutzt?",
      a: "JSON ist ein striktes, maschinenlesbares Format für APIs, Datenbanken und Konfigurationsdateien. Validierung und konsistente Formatierung halten es gültig und lesbar.",
    },
    csvTabular: {
      q: "Was ist CSV?",
      a: "CSV speichert Tabellendaten als Klartext mit Kommas als Trennzeichen, sodass dieselbe Tabelle in jeder Tabellenkalkulation oder Datenbank geöffnet wird.",
    },
    markdownHtml: {
      q: "Warum Markdown in HTML umwandeln?",
      a: "Markdown ist leichtgewichtig und gut lesbar; die Umwandlung liefert Ihnen eine fertige Seite, die Sie in eine Website, ein CMS oder eine E-Mail einfügen können.",
    },
    pdfMultiPage: {
      q: "Was ist das Besondere an PDF-Seiten?",
      a: "PDF hält Schriftarten, Layout und Seitenumbrüche auf jedem Gerät identisch. Mehrseitige Dateien lassen sich seitenweise verarbeiten — ideal zum Zusammenführen, Teilen oder Exportieren.",
    },
    docxEditing: {
      q: "DOCX oder PDF — was sollte ich nehmen?",
      a: "DOCX ist das editierbare Word-Format mit Rich Text und Formatvorlagen; PDF dient dem Teilen und Drucken, da es das Layout überall fixiert.",
    },
    xlsxRows: {
      q: "Was unterscheidet XLSX von CSV?",
      a: "XLSX ist das Arbeitsmappen-Format von Excel mit Blättern, Formeln und Formatierung; CSV ist eine Klartexttabelle. XLSX→CSV hält die Rohdaten portabel.",
    },
    yamlHuman: {
      q: "Warum YAML statt JSON?",
      a: "YAML ist knapper und menschenfreundlicher als JSON, daher verbreitet in Konfigurationsdateien. Die Umwandlung macht einen JSON-Feed leichter lesbar und wartbar.",
    },
    sqlPretty: {
      q: "Warum SQL formatieren?",
      a: "Formatiertes SQL mit konsistenter Einrückung ist deutlich einfacher zu lesen, zu prüfen und zu debuggen. Die Ausgabe bleibt gültig und ausführbar.",
    },
    vcfContacts: {
      q: "Wofür werden VCF-Dateien genutzt?",
      a: "VCF ist das vCard-Format für Kontakte. Die Umwandlung in CSV erleichtert das Öffnen in einer Tabellenkalkulation oder das Übertragen zwischen Apps.",
    },
    urlEncode: {
      q: "Wann brauche ich URL-Encoding?",
      a: "URLs dürfen nur sichere Zeichen enthalten. Encoding wandelt Leerzeichen, & und andere Symbole in %-Codes um, damit Links mit Sonderzeichen korrekt funktionieren.",
    },
    qrUrls: {
      q: "Was kann ein QR-Code?",
      a: "Eine Smartphone-Kamera scannt QR-Codes, um eine URL zu öffnen, ein WLAN zu verbinden oder Text sofort zu teilen — keine zusätzliche App nötig.",
    },
    jwtTokens: {
      q: "Was steckt in einem JWT?",
      a: "Ein JWT hat drei Teile: Header, Payload und Signatur. Das Dekodieren zeigt die Claims, aber das Verifizieren erfordert weiterhin den Signaturschlüssel.",
    },
    hashOneWay: {
      q: "Kann man einen Hash umkehren?",
      a: "Nein — Hashing ist einseitig. Es erzeugt einen Fingerabdruck fester Länge, der nicht in die ursprüngliche Eingabe zurückgeführt werden kann; deshalb dient es der Integritätsprüfung.",
    },
    colorModels: {
      q: "HEX, RGB oder HSL — welches Format nehme ich?",
      a: "Jedes Modell passt zu einem Zweck: HEX und RGB für Bildschirme, HSL für intuitive Farbton-Helligkeits-Anpassungen. Konvertieren hält die Farbe überall identisch.",
    },
    unixEpoch: {
      q: "Was ist Unix-Zeit?",
      a: "Unix-Zeit zählt die Sekunden seit 1970-01-01 00:00 UTC. Zeitstempel werden standardmäßig in UTC angezeigt; das lesbare Datum hängt von Ihrer Zeitzone ab.",
    },
    uuidStandard: {
      q: "Sind UUIDs eindeutig?",
      a: "Ja. UUIDs der Version 4 bestehen aus 122 Zufallsbits, Kollisionen sind astronomisch unwahrscheinlich. Sie sind Standard-Identifikatoren in Datenbanken und Systemen.",
    },
    passwordStrength: {
      q: "Was macht ein Passwort stark?",
      a: "Zuerst die Länge, dann die Vielfalt: kombinieren Sie Groß- und Kleinbuchstaben, Ziffern und Symbole; vermeiden Sie Wörterbuchwörter und persönliche Daten.",
    },
    cssMinify: {
      q: "Was bewirkt Minifizierung?",
      a: "Minifizierung entfernt Leerzeichen, Kommentare und unnötige Formatierung aus CSS und JavaScript, schrumpft Dateien für die Produktion und beschleunigt das Laden.",
    },
    cssUnits: {
      q: "px, rem oder em — was ist der Unterschied?",
      a: "px ist eine absolute Bildschirmeinheit; rem skaliert mit der Root-Schriftgröße, em mit dem Elternelement. Die Umwandlung hält responsives CSS vorhersehbar.",
    },
    htmlRfc: {
      q: "Warum HTML-Entities verwenden?",
      a: "HTML-Entities wie &amp; und &lt; lassen Sonderzeichen korrekt und sicher in HTML und E-Mail darstellen — auch dort, wo Markup nicht erlaubt ist.",
    },
    boxShadow: {
      q: "Wie entsteht ein Box-Shadow?",
      a: "Ein Box-Shadow wird durch horizontalen und vertikalen Versatz, Weichzeichnung, Ausbreitung und Farbe definiert. Der Generator liefert das exakte CSS zum Kopieren.",
    },
    metaTags: {
      q: "Welche Meta-Tags sind wichtig?",
      a: "Titel, Beschreibung und Open-Graph-Tags bestimmen, wie eine Seite in Suchergebnissen und Social Shares erscheint. Konsistente Erzeugung spart Entwicklern Zeit.",
    },
    chmodPerms: {
      q: "Wie funktionieren chmod-Zahlen?",
      a: "chmod nutzt drei oktale Ziffern (r=4, w=2, x=1) für Benutzer, Gruppe und Andere. Der Rechner zeigt, was jeder Wert genau bedeutet.",
    },
    jsKeycode: {
      q: "Was ist ein Keycode?",
      a: "Ein Keycode ist die numerische Kennung, die der Browser bei einem Tastendruck meldet — nützlich für Tastaturkürzel, Spiele oder Formulare.",
    },
    tailwindClasses: {
      q: "Wofür wird eine Tailwind-Palette genutzt?",
      a: "Eine Palette erzeugt die Farbstufen, die Sie für ein Tailwind-Thema brauchen, sodass jeder Ton im Projekt konsistent bleibt.",
    },
    urlParse: {
      q: "Warum eine URL parsen?",
      a: "Parsen zerlegt einen Link in Protokoll, Host, Pfad und Query-String — hilfreich beim Debuggen von Weiterleitungen, Trackern oder defekten Links.",
    },
    caseText: {
      q: "Wann brauche ich eine Schreibweisen-Umwandlung?",
      a: "Der Wechsel zwischen Klein-, GROSS- und Titel-Schreibweise hält Überschriften, Exportlabels und Datensätze konsistent.",
    },
    wordCount: {
      q: "Warum Wörter und Zeichen zählen?",
      a: "Wort-, Zeichen- und Lesezeit-Zählungen helfen, die Längengrenzen von Artikeln, Social Posts, Meta-Titeln und Übersetzungen einzuhalten.",
    },
    loremPlaceholder: {
      q: "Warum Lorem Ipsum verwenden?",
      a: "Lorem Ipsum ist Platzhaltertext, mit dem Sie ein Layout ohne Ablenkung durch echten Inhalt vorab ansehen können.",
    },
    textDiff: {
      q: "Was zeigt ein Diff?",
      a: "Ein Diff markiert genau, welche Zeilen oder Zeichen sich zwischen zwei Texten geändert haben — das macht Änderungen schnell überprüfbar.",
    },
    screenViewport: {
      q: "Was ist der Viewport?",
      a: "Der Viewport ist der sichtbare Bereich einer Webseite. Die Echtzeit-Prüfung hilft Ihnen, responsive Layouts für jede Bildschirmgröße zu bauen.",
    },
    mp4Webm: {
      q: "Ist WebM besser als MP4?",
      a: "WebM ist ein offenes, leichtgewichtiges Videoformat von Google — kleinere Dateien für das Web. MP4 ist am weitesten verbreitet. Konvertieren hilft, wenn eine Seite nur WebM akzeptiert.",
    },
    mp3Audio: {
      q: "Warum ist MP3 so verbreitet?",
      a: "MP3 ist das am breitesten unterstützte Audioformat. Es schrumpft Ton auf einen Bruchteil der Größe und erhält dabei sehr gute Qualität für Musik und Stimme.",
    },
    wavLossless: {
      q: "WAV oder MP3?",
      a: "WAV ist verlustfreier PCM-Ton — exakt, aber groß. MP3 tauscht ein wenig Detail gegen eine viel kleinere Datei. WAV→MP3 macht Audio leicht teilbar.",
    },
    gifLite: {
      q: "Ist GIF noch nützlich?",
      a: "GIF ist ein leichtgewichtiges animiertes Bild, das überall ohne Player abspielt — ideal für kurze Clips, aber auf 256 Farben beschränkt.",
    },
    audioTrim: {
      q: "Was bewirkt das Zuschneiden?",
      a: "Trim schneidet einen Clip auf den gewünschten Teil und entfernt Stille oder unerwünschte Abschnitte am Anfang und Ende.",
    },
    volumeBoost: {
      q: "Was passiert beim Anheben des Pegels?",
      a: "Höherer Pegel macht Audio lauter. Zu viel über 0 dB lässt die Spitzen clippen und verzerren; ein kleiner Boost klingt meist am besten.",
    },
    videoSpeed: {
      q: "Verändert Tempo die Tonhöhe?",
      a: "Nein — das Tool zeit die Wiedergabe neu und hält die Tonhöhe stabil, sodass ein schnelleres oder langsameres Video natürlich klingt.",
    },
    videoResize: {
      q: "Warum ein Video verkleinern?",
      a: "Eine geringere Auflösung (z. B. 1080p → 720p) reduziert die Dateigröße — hilfreich, wenn eine Plattform Größen- oder Auflösungsgrenzen hat.",
    },
    muteVideo: {
      q: "Was bewirkt das Stummschalten eines Videos?",
      a: "Stummschalten entfernt oder stummt die Tonspur, während Bild und Timing exakt gleich bleiben.",
    },
    voiceRecorder: {
      q: "Wo wird meine Aufnahme gespeichert?",
      a: "Ihre Aufnahme wird in Ihrem Browser verarbeitet und heruntergeladen — sie wird nie auf einen Server hochgeladen.",
    },
    speechText: {
      q: "Wie erkennt Spracherkennung, was ich sage?",
      a: "Sie nutzt den Spracherkennungsdienst Ihres Browsers, um Ihr Mikrofon in Echtzeit zu transkribieren. Es werden keine Audiodateien auf unsere Server hochgeladen.",
    },
  },

  headingFile: (from, to) =>
    `${from} kostenlos online in ${to} konvertieren`,
  headingPaste: (from, to) =>
    `${from} kostenlos online in ${to} konvertieren`,
  headingGenerate: (to) =>
    `${to} kostenlos online generieren`,

  stepsFile: (from, to) => [
    `Wählen Sie Ihre ${from}-Datei oder ziehen Sie sie auf den Konverter — sie bleibt in Ihrem Browser.`,
    `Passen Sie optionale Einstellungen wie Qualität, Größe oder Ausgabe an.`,
    `Klicken Sie auf Konvertieren — die Datei wird lokal auf Ihrem Gerät verarbeitet.`,
    `Laden Sie Ihre ${to}-Datei herunter. Sie ist in Sekunden fertig.`,
  ],
  stepsPaste: (from, to) => [
    `Fügen Sie Ihren ${from} in das Eingabefeld ein — nichts wird hochgeladen.`,
    `Prüfen Sie die Optionen und wählen Sie ggf. die Richtung (${from} → ${to}).`,
    `Klicken Sie auf Konvertieren / Formatieren — das Ergebnis wird in Ihrem Browser erzeugt.`,
    `Kopieren Sie das ${to}-Ergebnis aus dem Ausgabefeld.`,
  ],
  stepsGenerate: (to) => [
    `Stellen Sie die Optionen für Ihren ${to} ein.`,
    `Klicken Sie auf Generieren — das Ergebnis entsteht sofort in Ihrem Browser.`,
    `Kopieren Sie die Ausgabe oder laden Sie die erzeugte Datei herunter.`,
  ],

  qHow: (from, to) => `Wie konvertiere ich ${from} kostenlos zu ${to}?`,
  qHowGenerate: (to) => `Wie kann ich ${to} kostenlos generieren?`,
  aHowFile: (from, to) =>
    `Wählen Sie Ihre ${from}-Datei (oder ziehen Sie sie hinein), klicken Sie auf Konvertieren und laden Sie das ${to}-Ergebnis herunter. Keine Anmeldung, keine Kosten und die Datei verlässt nie Ihren Browser.`,
  aHowPaste: (from, to) =>
    `Fügen Sie Ihren ${from} ein, klicken Sie auf Konvertieren und kopieren Sie das ${to}-Ergebnis. Es ist kostenlos, läuft vollständig in Ihrem Browser und nichts wird hochgeladen.`,
  aHowGenerate: (to) =>
    `Stellen Sie Ihre Optionen ein, klicken Sie auf Generieren und kopieren Sie das Ergebnis oder laden Sie es herunter. Es ist kostenlos und wird lokal auf Ihrem Gerät erzeugt.`,

  qPrivate: (name) => `Ist ${name} privat und sicher?`,
  aPrivate: (name) =>
    `Ja. ${name} läuft vollständig in Ihrem Browser, sodass Ihre Daten Ihr Gerät nie verlassen — nichts wird hochgeladen oder auf einem Server gespeichert.`,
  wasmSentence:
    " Video- und Audio-Tools nutzen eine WebAssembly-Engine, die ebenfalls im Speicher Ihres Geräts läuft.",

  qLimit: "Wie groß darf eine Datei maximal sein?",
  aLimit: (mb) =>
    `${mb} MB pro Datei. Da alles im Speicher Ihres Geräts läuft, können sehr große Dateien den Browser verlangsamen oder einfrieren.`,
};