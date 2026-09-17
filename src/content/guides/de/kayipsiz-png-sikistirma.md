---
title: "Wie man die PNG-Größe ohne Qualitätsverlust reduziert"
description: "Technische Details zu verlustfreien Bildkomprimierungsalgorithmen, Farbquantisierungsmethoden und browserbasierter PNG-Optimierung."
date: "2026-09-17"
tags: ["PNG", "Komprimierung", "Optimierung", "Bildverarbeitung"]
---

Das PNG-Format (Portable Network Graphics) ist eine wunderbare Technologie, die entwickelt wurde, um das patentierte GIF-Format zu ersetzen. Es bietet eine verlustfreie Komprimierung und volle Transparenz mit einem Alphakanal. Das hat allerdings seinen Preis: Die Dateigrößen können drastisch groß sein. Während PNG für Visualisierungen mit scharfen Kanten wie Illustrationen, Icon-Sets oder Text-Screenshots zwingend erforderlich ist, hat eine fehlende Optimierung der Größen verheerende Auswirkungen auf die Webleistung. Wie können wir also eine PNG-Datei verkleinern, ohne die Farbinformationen in den Pixeln zu verlieren?

Die Antwort liegt in der Farbquantisierung, der aggressiven Ausführung des DEFLATE-Algorithmus und der Bereinigung unnötiger Metadaten.

### Farbquantisierung (Quantization)

PNG-Dateien werden normalerweise als TrueColor (24-Bit-Farbe) oder TrueColor + Alpha (32-Bit-Farbe) gespeichert. Dies bedeutet, dass 3 bis 4 Byte Speicherplatz für die RGB(A)-Informationen jedes Pixels im Bild verbraucht werden. Wenn ein Bild nur 10 verschiedene Farben enthält (z. B. ein Logo), ist die Verwendung einer 24-Bit-Palette, mit der 16,7 Millionen Farben für jedes Pixel definiert werden können, eine Ressourcenverschwendung.

Hier kommt das Format **Indexed-Color (8-Bit) PNG** ins Spiel. Beim Quantisierungsprozess werden die Farben im Bild analysiert und eine "Farbpalette" mit maximal 256 Farben erstellt. Jetzt enthalten Pixel keine 3-4 Byte großen RGB-Werte mehr, sondern nur noch eine 1 Byte große Palettenindexnummer. Tonübergänge werden mit einem Dithering-Algorithmus (z. B. Floyd-Steinberg-Dithering) simuliert, der für das menschliche Auge sehr schwer wahrnehmbar ist. Auch wenn dieser Vorgang "verlustbehaftet" (lossy) erscheint, liefert er hinsichtlich der visuellen Qualität ein fast verlustfreies Ergebnis und reduziert die Dateigröße um 60 % bis 80 %.

### DEFLATE-Algorithmus und Filterung

Das Herzstück von PNG ist der DEFLATE-Algorithmus, eine Kombination aus LZ77 und Huffman-Codierung, der auch im ZIP-Format verwendet wird. Bevor PNG jedoch Rohpixel an den DEFLATE-Algorithmus sendet, führt es einen Vorverarbeitungsschritt aus: die Delta-Filterung.

Im Filterschritt wird anstelle jedes Pixelwerts die "Differenz" (Delta) zwischen dem Pixel und den davor liegenden Pixeln (links, oben usw.) berechnet. Da benachbarte Pixel normalerweise dieselbe Farbe haben, ist dieser Unterschied oft null. Der DEFLATE-Algorithmus komprimiert lange Ketten von Nullen (000000...) mit außerordentlich hoher Effizienz.

Optimierungstools testen für jede Zeile den besten Delta-Filter (Sub, Up, Average, Paeth), um dem DEFLATE-Kompressor die optimalen Daten (mit den meisten Nullen oder sich wiederholenden Mustern) bereitzustellen. Standard-Grafiksoftware überspringt diese iterativen Tests, um schnell zu sein, weshalb ein PNG, das ein professionelles Optimierungstool durchlaufen hat, immer kleiner ist.

### Bereinigung unnötiger Metadaten

Die meisten Grafikbearbeitungsprogramme (Photoshop, Illustrator usw.) fügen beim Exportieren der Datei ICC-Farbprofile, EXIF-Daten, Adobe-spezifische Chunks, Kommentare und Erstellungsdaten in das PNG ein. Nichts davon wird in der Webumgebung benötigt. Wenn nur die Bilddaten (IDAT-Chunk) und der Header (IHDR-Chunk) übrig bleiben und die restlichen tEXt-, iTXt- oder gAMA-Chunks entfernt werden, wird die Dateigröße bei kleinen Symbolen oder Logos direkt um etwa 10 % reduziert.

### Browserbasierte (Zero-Backend) Optimierung

Normalerweise werden Befehlszeilentools (pngquant, optipng, advpng) oder serverseitig ausgeführte Cloud-APIs benötigt, um all diese Vorgänge auszuführen. Sie müssen Ihre Hunderte von Megabyte großen Roh-Screenshots oder Produktfotos auf serverseitig laufende Tools hochladen, warten, bis der Prozess abgeschlossen ist, und sie dann wieder herunterladen. Das verbraucht Ihre Netzwerkbandbreite und Ihre Dateien werden auf Servern von Drittanbietern gespeichert.

Bei Convrs führen wir PNG-Komprimierungsvorgänge mit unserer **Zero-Backend**-Architektur direkt im Browser aus. Wir führen leistungsstarke Komprimierungs-Engines, die in Rust oder C/C++ geschrieben sind (wie pngquant), über WebAssembly (Wasm) aus. Die per Drag & Drop hinzugefügte Datei:
1. Bleibt auf Ihrem Computer, nichts wird ins Internet gesendet (Null Netzwerklatenz, 100 % Datenschutz).
2. Nutzt direkt die Multi-Core-CPU Ihres Computers, um die Optimierungsparameter zu maximieren (maximale Komprimierungsstufe).
3. Die Optimierung wird sofort beendet und das Ergebnis in einer Sekunde auf Ihr Gerät heruntergeladen.

Die Verringerung der Größe Ihrer PNG-Dateien ohne Qualitätseinbußen ist für die Webleistung unabdingbar. Indem Sie die richtigen Optimierungsmethoden mit einer Zero-Backend-Infrastruktur verwenden, können Sie Zeit sparen und die volle Kontrolle über Ihre Daten behalten.
