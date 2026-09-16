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

  useCase: (category) => {
    switch (category) {
      case "image":
        return "Menschen nutzen Bildkonvertierung für alltägliche Aufgaben: Fotos für das Web verkleinern, Dateien für Druck oder E-Commerce vorbereiten oder das von einer Plattform geforderte Format liefern. Da die Arbeit lokal passiert, behalten Sie die Kontrolle über die Qualität, und Ihre Originale werden nirgendwohin gesendet.";
      case "document":
        return "Dokumentkonvertierung wird wichtig, sobald eine Datei eine Grenze überqueren muss — wenn ein Kunde eine andere Office-Suite nutzt, ein Upload-Formular nur ein Format akzeptiert oder ein Bericht überall identisch gedruckt wird. Dies im Browser zu erledigen, entfernt den riskantesten Schritt: die Übergabe Ihres Dokuments an einen unbekannten Server.";
      case "developer":
        return "Browser-Werkzeuge verdienen sich ihren Platz durch Kontrolle. Sie sehen genau, was hineingeht, bekommen genau das gewünschte Ergebnis und können das Werkzeug beliebig oft erneut ausführen, ohne Ihre Daten dafür zu geben. Es sitzt natürlich zwischen Editor und Terminal.";
      case "text":
        return "Textarbeit ist oft schnell und repetitiv. Dieses Werkzeug übernimmt den repetitiven Teil — Groß-/Kleinschreibung, Längenmessung oder Versionsvergleich — damit Sie sich auf den eigentlichen Inhalt konzentrieren. Da alles lokal verarbeitet wird, bleiben selbst vertrauliche Entwürfe privat.";
      case "media":
        return "Mediendateien sind die größten und sensibelsten Daten, mit denen Sie arbeiten. Sie vor Ort zu verarbeiten bedeutet, dass Audio oder Video niemals das Netz durchquert: kein Upload-Balken, keine Server-Logs, keine zurückbleibende Kopie — nur das Ergebnis auf Ihrem Gerät.";
      default:
        return "Kleine Werkzeuge gewinnen Vertrauen, indem sie sofort und vorhersagbar sind. Da alles lokal läuft, ist die Antwort, die Sie sehen, auch die, die Sie bekommen — ohne Warten, ohne Tracking und ohne Serverkontakt.";
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