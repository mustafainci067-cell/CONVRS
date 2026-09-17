---
title: "Der Kampf zwischen SVG und PNG: Welches Format wo verwendet werden sollte"
description: "Detaillierte Analyse der technischen Unterschiede, Dateistrukturen und Auswirkungen auf die Webleistung des Vektor-SVG- und des pixelbasierten (Raster) PNG-Formats."
date: "2026-09-17"
tags: ["SVG", "PNG", "Formate", "Vektor", "Bildverarbeitung"]
---

Eine der am häufigsten getroffenen Entscheidungen in Webdesign- und Entwicklungsprojekten ist die Auswahl des Formats von Visuals, die in der Benutzeroberfläche verwendet werden sollen. Obwohl SVG (Scalable Vector Graphics) und PNG (Portable Network Graphics) oft als Alternativen für Symbole, Logos, Diagramme und komplexe Illustrationen angesehen werden, repräsentieren die zugrunde liegenden Technologien zwei völlig unterschiedliche Paradigmen. Die Auswahl des falschen Formats kann zu verschwommenen Logos, langsam ladenden Seiten und aufgeblähten DOM-Strukturen führen.

### Das Vektor- und Raster (Pixel)-Paradigma

Im Kern der Rivalität zwischen diesen beiden Formaten liegen ihre Produktionsmethoden.

**PNG ist ein Raster-(Bitmap)-Format.** Es definiert das Bild als Gittersystem, das aus Millionen winziger Quadrate (Pixel) besteht. Jedes einzelne Pixel hat einen definierten Farb- (RGB) und Transparenzwert (Alpha) an seinen eigenen X- und Y-Koordinaten. Dieses Merkmal liefert fantastische Ergebnisse für sanfte Tonübergänge, Schatten, Fotografien und digitale Gemälde mit sehr komplexen Farbpaletten. Wenn Sie jedoch versuchen, das Bild zu vergrößern, ist der Browser gezwungen, die Pixel zu dehnen, was zu rauen, treppenartigen Kanten führt, die wir 'verpixelt' (pixelated) nennen.

**SVG hingegen ist ein Vektorformat.** Pixel kümmern es nicht. Stattdessen wird das Bild als XML-basierte Textdatei in Form von mathematischen Gleichungen, Linien, Punkten, Kurven (Bézierkurven) und Polygonen gespeichert. Eine SVG-Datei ist technisch gesehen nur Code. Der Browser liest diesen Code und zeichnet die Grafik anhand der Koordinaten "live" mit der aktuellen Bildschirmauflösung. Da es mathematisch ist, werden Sie selbst beim Skalieren eines SVG von der Größe einer Briefmarke auf die Größe eines Stadionbildschirms nicht den geringsten Qualitätsverlust, keine Unschärfe oder Kantenverzerrung feststellen. Es ist immer gestochen scharf.

### Vergleich von Leistung und Dateigröße

Die Dateigröße ändert sich unglaublich stark, je nachdem, ob das Format im richtigen Kontext verwendet wird.

Wenn Sie ein Firmenlogo oder ein UI-Symbol (Hamburger-Menü, Suchlupe) entwerfen, das einfache geometrische Formen und flache Farben enthält, ist SVG normalerweise viel kleiner als PNG. Denn für einen Kreis von 200x200 Pixeln muss für PNG der komprimierte Zustand von 40.000 Pixeln (und Leerzeichen) gespeichert werden, wohingegen es sich für SVG nur um eine kurze Textzeichenfolge wie `<circle cx="100" cy="100" r="90" fill="blue" />` handelt. (Tatsächlich wird eine mit GZIP/Brotli komprimierte textbasierte SVG unglaublich leichtgewichtig.)

Die Situation kann jedoch auch umgekehrt sein. Wenn Sie eine Vektorzeichnung mit zu vielen Details, Tausenden von Knoten, komplexen Schatteneffekten und Pinselstrichen als SVG speichern, erhalten Sie eine megabytegroße XML-Datei mit Zehntausenden von Codezeilen. Der Browser verbraucht viel CPU, um diesen massiven Code zu rendern, und verursacht Scroll-Janks. Bei Bildern mit "fotografischer" Detailgenauigkeit, die jedoch Transparenz erfordern, ist die Verwendung eines transparenten PNG hinsichtlich der Hardwarebeschleunigung und des schnellen Zeichnens leistungsstärker.

### Welches Format sollte wo bevorzugt werden?

**Verwenden Sie SVG für:**
- Oberflächensymbole, UI-Elemente.
- Firmenlogos und Branding-Materialien (Um auf allen Bildschirmen scharf zu bleiben).
- Visuelles Material, das eine einfache Animation erfordert (Sie können die Pfade im SVG sofort mit CSS und JavaScript bearbeiten).
- Alle einfachen Vektorzeichnungen, die auf Retina-/High-DPI-Bildschirmen (Mobiltelefone und Apple-Displays) einwandfrei aussehen müssen.

**Verwenden Sie PNG für:**
- Fotografien, die einen transparenten Hintergrund benötigen (z. B. Produktfotos mit entfernten Hintergründen).
- Sehr detaillierte, schattierte und verpixelte digitale Kunstwerke oder komplexe Illustrationen, die Transparenz erfordern (Alpha-Kanal).
- Transparente Fallback-Anforderungen für Systeme, die WebP nicht unterstützen.

### Serverloser Übergang zwischen Formaten (Zero-Backend)

Im Webentwicklungsprozess kommt es sehr oft vor, dass Designer PNG-Dateien anstelle von SVG (oder umgekehrt) bereitstellen. Wenn Sie eine vorhandene SVG-Grafik für ältere Systeme oder Social-Media-Vorschauen in ein hochauflösendes PNG konvertieren müssen, müssen Sie dafür keine Software von Drittanbietern herunterladen.

Tools, die auf einer **Zero-Backend**-Basis arbeiten, wie Convrs.org, rendern Ihre SVG-Datei im Browser auf ein `<canvas>`-Element und wandeln diese Vektorzeichnung ohne Datenschutzrisiko sofort in eine verpixelte (Raster-)PNG- oder WebP-Datei um. Alle Dateien befinden sich auf Ihrer Festplatte und werden niemals ins Internet übertragen. Als Entwickler gilt: Je leistungsfähiger und sicherer Ihr Toolkit ist, desto reibungsloser ist die Leistung Ihrer Webseiten.
