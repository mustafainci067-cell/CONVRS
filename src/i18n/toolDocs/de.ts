// Faz 5 — Long-form SEO içerik motoru: Almanca metinler.
import type { ToolDocPhrases } from "./types";

export const de: ToolDocPhrases = {
  title: (category, name, from, to) => {
    switch (category) {
      case "image":
        return `Warum ${from} in ${to} im Browser konvertieren?`;
      case "document":
        return `${from} → ${to}: ein praxisnaher, datenschutzsicherer Leitfaden`;
      case "media":
        return `${from} → ${to}: ein kompletter Rundgang`;
      default:
        return `Was ist ${name} und wie funktioniert es?`;
    }
  },

  intro: (archetype, name, from, to) => {
    switch (archetype) {
      case "file":
        return `${name} wandelt Ihre ${from} komplett in Ihrem Browser in ${to} um. Keine Installation, kein Konto, kein Wasserzeichen: Datei auswählen oder ablegen, Einstellungen prüfen und das Ergebnis in Sekunden herunterladen. Ihre Dateien bleiben auf Ihrem Gerät.`;
      case "paste":
        return `${name} verarbeitet ${from} direkt hier in Ihrem Browser. Fügen Sie Ihre Eingabe ein, prüfen Sie die Optionen und kopieren Sie das ${to}-Ergebnis — kein Upload, kein Konto, kein Warten auf einen Server.`;
      default:
        return `${name} erzeugt ${to} sofort im Browser. Stellen Sie die gewünschten Optionen ein, generieren Sie und kopieren oder laden Sie das Ergebnis herunter — kostenlos, privat und komplett lokal.`;
    }
  },

  useCase: (category, name, from, to) => {
    const src = from === "-na-" ? name : from;
    switch (category) {
      case "image":
        return `Entwickler, Designer und E-Commerce-Teams nutzen ${name}, um ${src} in ${to} für den produktiven Alltag umzuwandeln: Bilder für bessere Core Web Vitals (LCP) optimieren, Assets für Druck und Marktplätze vorbereiten oder Upload-Vorgaben erfüllen. Da die ${src} → ${to} Konvertierung lokal erfolgt, behalten Sie die volle Qualitätskontrolle.`;
      case "document":
        return `Die Umwandlung von ${src} in ${to} mit ${name} ist entscheidend, sobald Dateien Systemgrenzen überschreiten — wenn Kunden eine andere Office-Suite nutzen, ein Portal nur ${to} akzeptiert oder strukturierte Tabellen importiert werden müssen. Die Verarbeitung im Browser eliminiert das größte Sicherheitsrisiko: das Hochladen vertraulicher ${src}-Dokumente auf fremde Server.`;
      case "developer":
        return `Entwickler setzen auf ${name}, um ${to}-Ausgaben deterministisch direkt im Browser zu erzeugen. Sie prüfen die exakte Eingabe, validieren das ${to}-Ergebnis sofort und geben niemals produktive Token, Schemata oder Zugangsdaten an externe APIs preis.`;
      case "text":
        return `Redaktionelle und technische Textarbeit erfordert oft die präzise Umwandlung von ${src} in ${to}. ${name} übernimmt diesen Schritt fehlerfrei, während unveröffentlichte Entwürfe und interne Texte zu 100 % im lokalen Arbeitsspeicher Ihres Browsers verbleiben.`;
      case "media":
        return `Audio- und Videodateien (${src} → ${to}) gehören zu den größten und sensibelsten Daten. Mit ${name} verlässt Ihre Mediendatei niemals Ihr Gerät: kein minutenlanger Upload, keine Server-Warteschlange und keine verbleibenden Kopien — Sie laden direkt die fertige ${to}-Datei herunter.`;
      default:
        return `${name} liefert sofortige, vorhersagbare ${to}-Ergebnisse direkt in Ihrem Browser-Tab — ohne Wartezeit, ohne Tracking und ohne Serverkontakt.`;
    }
  },

  privacy: (name) =>
    `Datenschutz durch Architektur: ${name} läuft vollständig im Speicher Ihres Geräts. Ihre Dateien, Texte und Daten werden von uns nie hochgeladen, gespeichert oder protokolliert — es gibt keinen Server im Weg.`,

  wasm: (name) =>
    `Die eigentliche Arbeit übernimmt WebAssembly: Dieselben Codec-Engines wie in einer Desktop-App werden kompiliert, um im Browser zu laufen. So liefert ${name} Ergebnisse auf Desktop-Niveau, während die Datei auf Ihrem Gerät bleibt.`,

  features: (hasMedia, sizeLimitMb) => [
    ...(sizeLimitMb ? [`Bis zu ${sizeLimitMb} MB pro Datei`] : []),
    ...(hasMedia
      ? ["WebAssembly-Codec-Engine — Desktop-Verarbeitung im Browser"]
      : []),
    "100% im Browser — nichts wird hochgeladen",
    "Kein Konto oder Registrierung nötig",
    "Kostenlos und ohne Wasserzeichen",
    "Läuft auf Desktop- und Mobil-Browsern",
    "Ihre Quelldaten werden nie gespeichert oder protokolliert",
  ],
};