---
title: "Die Technologie hinter der verlustfreien PNG-Komprimierung: Ein Deep Dive"
description: "Erkunden Sie das Innenleben der PNG-Komprimierung. Erfahren Sie, wie Deflate, LZ77, Huffman-Codierung und Delta-Filterung zusammenarbeiten, um die Dateigröße zu reduzieren, ohne ein einziges Pixel an Qualität zu verlieren."
date: "2026-09-19"
tags: ["PNG", "Komprimierung", "Web-Performance", "Algorithmen", "Bildoptimierung"]
---

# Die Technologie hinter der verlustfreien PNG-Komprimierung: Ein Deep Dive

Wenn Sie ein Bild als JPEG speichern, wirft die Software absichtlich visuelle Daten weg, um geringere Dateigrößen zu erzielen. Dies wird als *verlustbehaftete* (lossy) Komprimierung bezeichnet. Wenn Sie jedoch ein Bild als PNG (Portable Network Graphics) speichern, wird es *verlustfrei* (lossless) komprimiert. Sie können ein PNG eine Million Mal komprimieren und dekomprimieren, und jedes einzelne Pixel bleibt mathematisch identisch mit dem Originalbild.

Wie ist das möglich? Wie kann eine Bilddatei kleiner werden, ohne tatsächlich Informationen zu verlieren?

Die Magie von PNG liegt in einer brillanten Kombination aus Vorverarbeitungsalgorithmen und einer robusten Komprimierungs-Engine, die aus der Welt der ZIP-Dateien entlehnt ist. In diesem technischen Deep Dive werden wir die Schichten einer PNG-Datei aufblättern und untersuchen, wie Filterung (Filtering), LZ77, Huffman-Codierung und der DEFLATE-Algorithmus harmonisch zusammenarbeiten, um das Web schneller zu machen, ohne die Qualität zu beeinträchtigen.

---

## 1. Das Problem mit rohen Pixeldaten

Stellen Sie sich ein Bild mit 1000 x 1000 Pixeln vor. Das sind 1.000.000 Pixel. Wenn es sich um ein Standard-RGBA-Bild (Rot, Grün, Blau, Alpha) handelt, benötigt jedes Pixel 4 Bytes (8 Bits pro Kanal).

- 1.000.000 Pixel × 4 Bytes = 4.000.000 Bytes = **~3,8 MB**.

Ein rohes, unkomprimiertes 1000x1000-Bild belegt fast 4 Megabyte Speicherplatz. Wenn das Bild nur ein durchgehendes rotes Quadrat ist, ist das Speichern von 4 Megabyte "rot, rot, rot, rot..." unglaublich ineffizient. Genau diese Ineffizienz versuchen Komprimierungsalgorithmen zu beseitigen.

---

## 2. Schritt Eins: Filterung (Delta Encoding)

Bevor der eigentliche Komprimierungsalgorithmus die Daten berührt, wendet die PNG-Spezifikation einen cleveren Vorverarbeitungsschritt (Pre-Processing) an, der als **Filterung** (Filtering) bezeichnet wird.

Die Filterung komprimiert die Daten nicht; stattdessen transformiert sie die Daten in ein Format, das für einen Komprimierungsalgorithmus viel einfacher zu handhaben ist. Dies geschieht, indem anstelle des absoluten Wertes der Pixel die *Differenz* (das Delta) zwischen den Pixeln gespeichert wird.

### Wie die Filterung funktioniert
Stellen Sie sich eine horizontale Pixelreihe mit den folgenden Graustufenwerten vor:
`100, 101, 102, 103, 104, 105`

Wenn wir einen **Sub-Filter** verwenden (der ein Pixel mit dem unmittelbar links davon liegenden vergleicht), wandelt sich die Sequenz in:
`100, 1, 1, 1, 1, 1`

Warum ist das nützlich? Weil Komprimierungsalgorithmen von Wiederholungen und kleinen Zahlen leben. Eine Sequenz, die hauptsächlich aus `1`en oder `0`en besteht, ist wesentlich einfacher zu komprimieren als eine Sequenz sich ständig ändernder, großer Zahlen.

### PNG-Filtertypen
PNG definiert fünf verschiedene Filtertypen, die zeilenweise angewendet werden können:
1. **None (Keiner):** Die Pixel werden nicht verändert.
2. **Sub:** Subtrahiert das linke Pixel.
3. **Up:** Subtrahiert das Pixel direkt darüber.
4. **Average (Durchschnitt):** Subtrahiert den mathematischen Durchschnitt des Pixels links und des Pixels darüber.
5. **Paeth:** Ein komplexer Algorithmus, der den Wert des Pixels basierend auf dem linken, oberen und oberen-linken Pixel vorhersagt und dann den tatsächlichen Wert von der Vorhersage subtrahiert.

Beim Speichern eines PNGs testen fortschrittliche Encoder (wie OptiPNG oder OxiPNG) verschiedene Kombinationen dieser Filter für jede einzelne Zeile, um die Anordnung zu finden, die die am stärksten komprimierbaren Daten liefert.

---

## 3. Schritt Zwei: Der DEFLATE-Algorithmus

Sobald die Bilddaten in eine hochgradig vorhersehbare Zahlenfolge gefiltert wurden, werden sie an den **DEFLATE**-Algorithmus übergeben.

DEFLATE ist exakt dieselbe Komprimierungs-Engine, die auch in ZIP-Dateien, GZIP und HTTP-Komprimierung verwendet wird. Er erreicht die verlustfreie Komprimierung durch die Kombination zweier unterschiedlicher Algorithmen: **LZ77** und **Huffman-Codierung**.

### Phase A: LZ77 (Wörterbuchbasierte Komprimierung)

LZ77 (1977 von Abraham Lempel und Jacob Ziv entwickelt) sucht nach sich wiederholenden Datensequenzen.

Stellen Sie sich vor, die gefilterten Daten sehen aus wie diese Zeichenfolge:
`A B C D E F A B C D E F`

LZ77 erkennt, dass die zweite Folge `A B C D E F` mit der ersten identisch ist. Anstatt diese Zeichen noch einmal auszuschreiben, ersetzt es die zweite Sequenz durch einen "Zeiger" (Pointer), der im Grunde besagt: *"Gehe 6 Stellen zurück und kopiere die nächsten 6 Zeichen."*

In rohen Binärdaten bedeutet dies: Wenn es ein wiederkehrendes Farbmuster gibt (wie ein flacher blauer Himmel oder ein einfarbiger UI-Button), komprimiert LZ77 all diese sich wiederholenden Bytes in winzige Rückwärtsreferenz-Zeiger (Back-Reference Pointers). Das ist der Grund, warum PNGs spektakulär gut darin sind, Illustrationen, Logos und Screenshots zu komprimieren, aber mit verrauschten Fotografien (bei denen sich wiederholende Muster selten sind) zu kämpfen haben.

### Phase B: Huffman-Codierung (Entropiecodierung)

Nachdem LZ77 sich wiederholende Muster durch Zeiger ersetzt hat, werden die Daten an einen **Huffman-Encoder** übergeben (der 1952 von David A. Huffman erfunden wurde).

Standardcomputer speichern Zeichen mit einer festen Länge. In ASCII benötigt beispielsweise jedes Zeichen genau 8 Bits.
- `A` = `01000001` (8 Bits)
- `Z` = `01011010` (8 Bits)

Die Huffman-Codierung betrachtet die Häufigkeit (Frequenz) der Daten. Wenn der Buchstabe `E` in einer Datei 10.000 Mal vorkommt, der Buchstabe `Z` aber nur zweimal, warum sollten dann beide 8 Bits beanspruchen?

Die Huffman-Codierung erstellt ein benutzerdefiniertes "Wörterbuch" (einen Binärbaum) speziell für die Datei, die sie komprimiert. Sie weist den häufigsten Werten sehr kurze Codes zu und den seltenen Werten längere Codes.

Zum Beispiel nach der Huffman-Codierung:
- Das häufigste Byte könnte einfach werden zu: `0` (1 Bit)
- Ein etwas weniger häufiges Byte könnte sein: `10` (2 Bits)
- Ein sehr seltenes Byte könnte sein: `110110` (6 Bits)

Da der Vorverarbeitungsschritt der **Filterung** (Schritt 1) die Bilddaten in eine Sequenz transformiert hat, die stark von Nullen und kleinen Zahlen dominiert wird, kann der Huffman-Encoder diesen Zahlen unglaublich kurze 1-Bit- oder 2-Bit-Codes zuweisen, was die Gesamtdateigröße drastisch schrumpfen lässt.

---

## 4. Fortschrittliche PNG-Optimierungstechniken

Während der standardmäßige PNG-Codierungsprozess bereits leistungsstark ist, verwenden moderne Entwickler fortschrittliche Tools, um die verlustfreie Komprimierung noch weiter voranzutreiben. Diese sind als PNG-Optimierer (Optimizers) bekannt.

### Entfernen von Chunks (Metadaten)
Eine PNG-Datei besteht aus "Chunks" (Blöcken). Neben dem kritischen Bilddaten-Chunk (`IDAT`) kann ein PNG Chunks für Textkommentare, Farbprofile, Gammakorrektur und EXIF-Daten enthalten. Optimierer können nicht wesentliche Chunks entfernen und so Kilobytes an Daten einsparen, ohne das visuelle Bild zu beeinträchtigen.

### Brute-Forcing von Filtern
Standard-Bildbearbeitungsprogramme wie Photoshop wenden beim Speichern eines PNGs normalerweise eine grundlegende, schnelle Filter-Heuristik an. Dedizierte Optimierer wie `pngcrush` oder `zopflipng` verfolgen einen anderen Ansatz: Sie wenden Brute-Force an. Sie komprimieren das Bild Tausende von Malen unter Verwendung jeder möglichen Kombination aus Zeilenfiltern und DEFLATE-Fenstergrößen, um die mathematisch zulässige absolute Mindestgröße der Datei zu finden.

### Zopfli-Komprimierung
Google hat eine stark optimierte DEFLATE-Implementierung namens **Zopfli** entwickelt. Während sie beim Komprimieren von Daten viel langsamer ist als die Standard-`zlib`-Bibliothek, erzeugt sie Dateien, die typischerweise 3–8 % kleiner sind als die maximale zlib-Komprimierung, und bleibt dabei zu 100 % kompatibel mit allen Standard-PNG-Decodern.

## Fazit

Wenn Sie das nächste Mal ein Logo oder einen Screenshot als PNG speichern und seine scharfen Kanten und die geringe Dateigröße bewundern, denken Sie an die unglaubliche Informatik, die hinter den Kulissen arbeitet.

Es ist die intelligente Synergie aus Delta-Encoding (Filterung) zur Reduzierung der Varianz, LZ77 zur Beseitigung sich wiederholender Muster und der Huffman-Codierung zur Minimierung der Bitlänge häufiger Werte, die es PNG ermöglicht, makellose, verlustfreie Qualität in einem internetfreundlichen Paket zu liefern. Das Verständnis dieses Prozesses weckt nicht nur unsere Wertschätzung für die Formate, die wir jeden Tag verwenden, sondern befähigt Entwickler auch dazu, fundierte Entscheidungen bei der Optimierung von Assets für die Web-Performance zu treffen.
