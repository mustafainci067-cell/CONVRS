---
title: "Was ist eine WebP-Datei? Das moderne Bildformat erklärt"
description: "Ein vollständiger Leitfaden zu WebP: Was es ist, wie es funktioniert, warum Google es entwickelt hat, wie es sich mit JPEG und PNG vergleicht und wann Sie es verwenden sollten."
date: "2024-01-15"
---

# Was ist eine WebP-Datei? Das moderne Bildformat erklärt

Wenn Sie Zeit mit der Entwicklung von Websites oder der Leistungsoptimierung verbringen, sind Sie auf WebP gestoßen. Es erscheint in Googles PageSpeed-Empfehlungen, in den Ausgaben von Bildoptimierungswerkzeugen und zunehmend als Standardformat für Web-Bilder. Aber was genau ist WebP, wie funktioniert es, und sollten Sie es verwenden? Dieser Leitfaden beantwortet all diese Fragen.

## Ursprünge: Warum Google WebP entwickelt hat

WebP wurde von Google entwickelt und erstmals im Jahr 2010 veröffentlicht. Seine Entstehungsgeschichte beginnt mit einem Video-Codec namens VP8, den Google erwarb, als es On2 Technologies kaufte. VP8 wurde für effiziente Videokomprimierung entwickelt. Googles Ingenieure erkannten, dass dieselben mathematischen Techniken, die zur Komprimierung von Videoframes verwendet werden, auch auf Standbilder angewendet werden könnten — und dass dies kleinere Dateien als JPEG oder PNG bei gleichwertiger visueller Qualität erzeugen könnte.

Die Motivation war einfach: Bilder sind der größte Einzelbeitrag zum Seitengewicht auf den meisten Websites. Schnellere Seitenladezeiten verbessern die Benutzererfahrung, reduzieren Absprungraten und sind ein direktes Rankingsignal für die Google-Suche. Ein Format, das Bilddateien ohne sichtbaren Qualitätsverlust konsistent verkleinert, kommt allen zugute — Benutzern, Publishern und Suchmaschinen gleichermaßen.

## Wie die WebP-Komprimierung funktioniert

WebP ist keine einzelne Komprimierungstechnik. Es unterstützt zwei verschiedene Modi:

**Verlustbehaftetes WebP** basiert auf demselben blockbasierten Vorhersage-Framework wie VP8. Der Encoder unterteilt das Bild in 4×4-Pixel-Blöcke, sagt jeden Block aus seinen Nachbarn voraus und kodiert nur die Differenz zwischen der Vorhersage und den tatsächlichen Pixelwerten. Das Ergebnis wird dann mit einer diskreten Kosinustransformation (DCT) transformiert, quantisiert und mit arithmetischer Kodierung entropiekodiert. Der Prozess verwirft einige visuelle Informationen — weshalb es "verlustbehaftet" genannt wird — aber die verworfenen Informationen werden so gewählt, dass sie den Grenzen der menschlichen visuellen Wahrnehmung entsprechen.

**Verlustfreies WebP** verwendet einen völlig anderen Algorithmus. Es wendet räumliche Vorhersage von Pixelwerten, eine Farbraumtransformation, das Subtrahieren des grünen Kanals von Rot und Blau, eine Palettentransformation für Bilder mit wenigen Farben und LZ77/Huffman/Arithmetische Entropiekodierung an. Anders als JPEG kann verlustfreies WebP jeden Pixel exakt darstellen, was es für Bilder geeignet macht, die kein Detail verlieren dürfen — wie Screenshots, Logos und textintensive Grafiken.

**Animiertes WebP** ersetzt das veraltete GIF-Format für Animationen. Während GIF auf 256 Farben pro Frame begrenzt ist und nur LZW-Komprimierung verwendet, unterstützt animiertes WebP Millionen von Farben, sowohl verlustbehaftete als auch verlustfreie Komprimierung pro Frame und Transparenz. Das Ergebnis ist animierter Inhalt, der weit kleiner als entsprechende GIFs ist.

## Dateigrößen: Die Zahlen

Der Komprimierungsvorteil von WebP ist durch Googles eigene Benchmarks und durch Tests von Drittanbietern gut dokumentiert:

- Verlustbehaftete WebP-Dateien sind im Durchschnitt **25–34% kleiner** als vergleichbare JPEG-Dateien bei gleichwertiger visueller Qualität.
- Verlustfreie WebP-Dateien sind im Durchschnitt **26% kleiner** als PNG-Dateien.
- Animierte WebP-Dateien können **64% kleiner** als animierte GIFs und **19% kleiner** als animierte PNGs sein.

Dies sind Durchschnittswerte. Die Ergebnisse variieren je nach Bildinhalt. Fotografien mit sanften Verläufen profitieren am meisten von verlustbehaftetem WebP.

## Browser- und Betriebssystemunterstützung

WebP wird nun von modernen Browsern universell unterstützt. Chrome unterstützt WebP seit 2010. Firefox fügte 2019 Unterstützung hinzu. Safari fügte 2020 mit Safari 14 auf macOS Big Sur und iOS 14 Unterstützung hinzu. Edge (Chromium-basiert) unterstützt es seit 2018. Internet Explorer unterstützte WebP nie, aber IEs Marktanteil ist heute vernachlässigbar.

## WebP vs. JPEG

| | WebP (verlustbehaftet) | JPEG |
|---|---|---|
| Dateigröße bei gleicher Qualität | ~30% kleiner | Ausgangspunkt |
| Transparenzunterstützung | ✅ Ja | ❌ Nein |
| Animationsunterstützung | ✅ Ja | ❌ Nein |
| Progressive Ladung | ✅ Ja | ✅ Ja |
| Bearbeitungssoftware-Unterstützung | Mäßig | Universell |

## Vorteile von WebP

**Kleinere Dateien, schnellere Seiten.** Der Kernvorteil ist die Dateigröße. Kleinere Bilder bedeuten schnellere Seitenladezeiten, geringere Bandbreitenkosten für das Hosting und bessere Werte bei Core Web Vitals (insbesondere Largest Contentful Paint).

**Vielseitigkeit.** WebP verarbeitet fotografischen Inhalt, Grafiken mit scharfen Kanten, Animationen und transparente Bilder — alles in einem einzigen Format, mit für jeden Anwendungsfall optimierter Komprimierung.

**Alpha-Transparenz mit verlustbehafteter Komprimierung.** Die Fähigkeit, verlustbehaftete Komprimierung mit verlustfreier Transparenz zu kombinieren, ist wirklich einzigartig für WebP. Ein Produktbild auf transparentem Hintergrund kann jetzt WebP anstelle eines sperrigen PNG verwenden und dabei dramatische Dateigrößeneinsparungen erzielen.

**Gute Qualität bei niedrigen Bitraten.** WebP's Qualitäts-Größen-Verhältnis ist besser als das von JPEG, was bedeutet, dass bei sehr kleinen Dateigrößen WebP mehr visuelle Details als ein entsprechendes JPEG beibehält.

## Nachteile von WebP

**Begrenzte professionelle Software-Unterstützung.** Während Browser WebP gut verarbeiten, unterstützen viele Desktop-Bildbearbeitungsprogramme WebP entweder gar nicht oder erfordern Plugins. Adobe Photoshop fügte native WebP-Unterstützung erst 2021 hinzu.

**Nicht für den Druck geeignet.** WebP's Farbmodell und Komprimierung sind für die Bildschirmdarstellung konzipiert. Druck-Workflows erwarten CMYK-Farbe (nicht RGB) und verlustfreie Formate ohne webspezifische Funktionen. Verwenden Sie WebP niemals für druckbestimmte Dokumente.

**Verlustbehaftet bedeutet dauerhafter Qualitätsverlust.** Jedes Mal, wenn ein verlustbehaftetes WebP dekodiert und neu kodiert wird, verschlechtert sich die Qualität. Bewahren Sie immer ein originales PNG oder TIFF als Master auf und generieren Sie WebP aus dem Master, nicht aus einem vorherigen WebP-Export.

## Fazit

WebP ist heute das richtige Standardformat für die meisten Web-Bilder. Die Größenvorteile gegenüber JPEG und PNG sind real und messbar, die Browserunterstützung ist unter modernen Plattformen universell, und die Unterstützung für Transparenz und Animation deckt jeden häufigen Web-Anwendungsfall ab. Die Hauptvorbehalte sind professionelle Bearbeitungs-Workflows und die Druckproduktion, wo JPEG und PNG praktischer bleiben. Für alles andere — Websites, Web-Apps und digitale Inhalte — ist WebP das Format, zu dem man zuerst greifen sollte.
