const fs = require('fs');
let file = 'src/i18n/guides/responsive-design-viewport-guide.ts';
let content = fs.readFileSync(file, 'utf8');

// Fix German block 1
content = content.replace(
`          {
            text: "Die Einheit ",
            { text: "100vw", code: true },
            " bedeutet 100% der Viewport-Breite einschließlich einer vertikalen Scrollleiste. Auf einer Seite mit scrollbarem Inhalt verursacht dies einen horizontalen Überlauf von etwa 15-17px (der Scrollleisten-Breite). Verwenden Sie stattdessen ",
            { text: "100%", code: true },
            " am Body oder einem Wrapper — es schließt die Scrollleiste aus.",
          },`,
`          "Die Einheit ",
          { text: "100vw", code: true },
          " bedeutet 100% der Viewport-Breite einschließlich einer vertikalen Scrollleiste. Auf einer Seite mit scrollbarem Inhalt verursacht dies einen horizontalen Überlauf von etwa 15-17px (der Scrollleisten-Breite). Verwenden Sie stattdessen ",
          { text: "100%", code: true },
          " am Body oder einem Wrapper — es schließt die Scrollleiste aus.",`
);

// Fix German block 2
content = content.replace(
`          {
            text: "Eine body font-size von 14px oder 16px sieht auf dem Desktop gut aus, kann sich aber auf Handys, besonders beim längeren Lesen, geengt anfühlen. Die Lösung ist nicht, Desktop-Text zu vergrößern, sondern die mobile Basis etwas höher zu setzen (z.B. 16-18px) und Desktop-Breakpoints bei Bedarf über rem-Verhältnisse verkleinern zu lassen. Apple empfiehlt mindestens 11pt (ca. 14.6px) für Lesbarkeit.",
          },`,
`          "Eine body font-size von 14px oder 16px sieht auf dem Desktop gut aus, kann sich aber auf Handys, besonders beim längeren Lesen, geengt anfühlen. Die Lösung ist nicht, Desktop-Text zu vergrößern, sondern die mobile Basis etwas höher zu setzen (z.B. 16-18px) und Desktop-Breakpoints bei Bedarf über rem-Verhältnisse verkleinern zu lassen. Apple empfiehlt mindestens 11pt (ca. 14.6px) für Lesbarkeit.",`
);

// Fix German block 3
content = content.replace(
`          {
            text: "Ein Bild mit fester Breite oder ohne Beschränkung drängt an seinem Container vorbei. Wenden Sie ",
            { text: "max-width: 100%; height: auto;", code: true },
            " auf alle Inhaltsbilder an, damit sie mit ihrem Elternteil schrumpfen.",
          },`,
`          "Ein Bild mit fester Breite oder ohne Beschränkung drängt an seinem Container vorbei. Wenden Sie ",
          { text: "max-width: 100%; height: auto;", code: true },
          " auf alle Inhaltsbilder an, damit sie mit ihrem Elternteil schrumpfen.",`
);

// Fix German block 4
content = content.replace(
`          {
            text: "Auf einem Elternteil ",
            { text: "overflow: hidden", code: true },
            { text: "anzuwenden, um horizontales Scrollen zu verstecken, ist eine Symptombehandlung. Das Layout ist immer noch kaputt, Sie können es nur nicht sehen. Verwenden Sie den responsiven Inspektor Ihres Browsers, um das Element zu finden, das den Überlauf verursacht.",
          },`,
`          "Auf einem Elternteil ",
          { text: "overflow: hidden", code: true },
          " anzuwenden, um horizontales Scrollen zu verstecken, ist eine Symptombehandlung. Das Layout ist immer noch kaputt, Sie können es nur nicht sehen. Verwenden Sie den responsiven Inspektor Ihres Browsers, um das Element zu finden, das den Überlauf verursacht.",`
);


// Spanish blocks
// 1
content = content.replace(
`          {
            text: "Poner width: 960px en un contenedor crea un límite duro. En un tablet de 768px el contenedor se desborda y activa scroll horizontal. Usa max-width con valores porcentuales o rem en su lugar — el layout siempre puede encogerse.",
          },`,
`          "Poner width: 960px en un contenedor crea un límite duro. En un tablet de 768px el contenedor se desborda y activa scroll horizontal. Usa max-width con valores porcentuales o rem en su lugar — el layout siempre puede encogerse.",`
);

// 2
content = content.replace(
`          {
            text: "La unidad ",
            { text: "100vw", code: true },
            " significa 100% del ancho del viewport incluyendo cualquier barra de desplazamiento vertical. En una página con contenido desplazable esto causa un desbordamiento horizontal de aproximadamente 15-17px (el ancho del scrollbar). Usa ",
            { text: "100%", code: true },
            " en el body o un contenedor en su lugar — excluye la barra de desplazamiento.",
          },`,
`          "La unidad ",
          { text: "100vw", code: true },
          " significa 100% del ancho del viewport incluyendo cualquier barra de desplazamiento vertical. En una página con contenido desplazable esto causa un desbordamiento horizontal de aproximadamente 15-17px (el ancho del scrollbar). Usa ",
          { text: "100%", code: true },
          " en el body o un contenedor en su lugar — excluye la barra de desplazamiento.",`
);

// 3
content = content.replace(
`          {
            text: "Un body font-size de 14px o 16px se ve bien en escritorio pero puede sentirse apretado en móviles, especialmente para lectura prolongada. La solución no es aumentar el texto del escritorio sino establecer la base móvil un poco más alta (ej. 16-18px) y dejar que los breakpoints de escritorio reduzcan mediante proporciones rem si es necesario. Apple recomienda un mínimo de 11pt (aprox. 14.6px) para legibilidad.",
          },`,
`          "Un body font-size de 14px o 16px se ve bien en escritorio pero puede sentirse apretado en móviles, especialmente para lectura prolongada. La solución no es aumentar el texto del escritorio sino establecer la base móvil un poco más alta (ej. 16-18px) y dejar que los breakpoints de escritorio reduzcan mediante proporciones rem si es necesario. Apple recomienda un mínimo de 11pt (aprox. 14.6px) para legibilidad.",`
);

// 4
content = content.replace(
`          {
            text: "Una imagen con ancho fijo o sin restricción empuja fuera de su contenedor. Aplica ",
            { text: "max-width: 100%; height: auto;", code: true },
            " a todas las imágenes de contenido para que se encuegan con su padre.",
          },`,
`          "Una imagen con ancho fijo o sin restricción empuja fuera de su contenedor. Aplica ",
          { text: "max-width: 100%; height: auto;", code: true },
          " a todas las imágenes de contenido para que se encuegan con su padre.",`
);

// 5
content = content.replace(
`          {
            text: "Aplicar ",
            { text: "overflow: hidden", code: true },
            " a un padre para ocultar el scroll horizontal es un parche de síntomas. El diseño sigue roto; simplemente no puedes verlo. Usa el inspector responsive del navegador para encontrar el elemento que causa el desbordamiento.",
          },`,
`          "Aplicar ",
          { text: "overflow: hidden", code: true },
          " a un padre para ocultar el scroll horizontal es un parche de síntomas. El diseño sigue roto; simplemente no puedes verlo. Usa el inspector responsive del navegador para encontrar el elemento que causa el desbordamiento.",`
);

// Also need to check if these are in German as well:
content = content.replace(
`          {
            text: "width: 960px auf einen Wrapper zu setzen, erzeugt eine harte Grenze. Auf einem 768px-Tablet überläuft der Container und löst horizontales Scrollen aus. Verwenden Sie stattdessen max-width mit Prozent- oder rem-Werten — das Layout kann immer schrumpfen.",
          },`,
`          "width: 960px auf einen Wrapper zu setzen, erzeugt eine harte Grenze. Auf einem 768px-Tablet überläuft der Container und löst horizontales Scrollen aus. Verwenden Sie stattdessen max-width mit Prozent- oder rem-Werten — das Layout kann immer schrumpfen.",`
);

content = content.replace(
`          {
            text: "Chrome, Firefox und Safari bieten alle einen responsiven Modus (Strg+Umschalt+M in Chrome), in dem Sie jede Viewport-Breite und Höhe eingeben, aus Gerätevorgaben wählen und Geräteemulation einschließlich Touch-Ereignissen, User-Agent-Strings und Pixeldichte umschalten können. Das ist der schnellste Weg, Layout-Fehler zu finden — Sie ändern die Breite und beobachten, was schiefgeht.",
          },`,
`          "Chrome, Firefox und Safari bieten alle einen responsiven Modus (Strg+Umschalt+M in Chrome), in dem Sie jede Viewport-Breite und Höhe eingeben, aus Gerätevorgaben wählen und Geräteemulation einschließlich Touch-Ereignissen, User-Agent-Strings und Pixeldichte umschalten können. Das ist der schnellste Weg, Layout-Fehler zu finden — Sie ändern die Breite und beobachten, was schiefgeht.",`
);

content = content.replace(
`          {
            text: "Emulatoren sind nicht perfekt. Touch-Verhalten, Schriftwiedergabe, Scroll-Momentum und virtuelle Tastaturen unterscheiden sich auf echter Hardware. Das Testen auf mindestens einem iPhone und einem Android-Handy fängt Probleme, die Emulatoren verpassen, insbesondere rund um Safe-Area-Insets (Notch und abgerundete Ecken) und die Gummiband-Scrolling von iOS Safari.",
          },`,
`          "Emulatoren sind nicht perfekt. Touch-Verhalten, Schriftwiedergabe, Scroll-Momentum und virtuelle Tastaturen unterscheiden sich auf echter Hardware. Das Testen auf mindestens einem iPhone und einem Android-Handy fängt Probleme, die Emulatoren verpassen, insbesondere rund um Safe-Area-Insets (Notch und abgerundete Ecken) und die Gummiband-Scrolling von iOS Safari.",`
);

content = content.replace(
`          {
            text: "Online-Tools zeigen Ihnen, welche Viewport-Abmessungen Ihr Browser aktuell meldet, vergleichen sie mit gängigen Gerätevorgaben und erklären den Unterschied zwischen CSS-Pixeln und physischen Pixeln. Das ist besonders nützlich, um herauszufinden, warum ein Design in DevTools korrekt aussieht, aber auf einem echten Gerät leicht anders — die Antwort ist oft devicePixelRatio.",
          },`,
`          "Online-Tools zeigen Ihnen, welche Viewport-Abmessungen Ihr Browser aktuell meldet, vergleichen sie mit gängigen Gerätevorgaben und erklären den Unterschied zwischen CSS-Pixeln und physischen Pixeln. Das ist besonders nützlich, um herauszufinden, warum ein Design in DevTools korrekt aussieht, aber auf einem echten Gerät leicht anders — die Antwort ist oft devicePixelRatio.",`
);

content = content.replace(
`          {
            text: "Chrome, Firefox y Safari todos proporcionan un modo responsive (Ctrl+Shift+M en Chrome) que te permite escribir cualquier anchura y altura de viewport, elegir de presets de dispositivos y alternar la emulación de dispositivos incluyendo eventos táctiles, cadenas de usuario y densidad de píxeles. Es la forma más rápida de atrapar fallos de diseño — redimensiona la anchura y observa dónde salen mal las cosas.",
          },`,
`          "Chrome, Firefox y Safari todos proporcionan un modo responsive (Ctrl+Shift+M en Chrome) que te permite escribir cualquier anchura y altura de viewport, elegir de presets de dispositivos y alternar la emulación de dispositivos incluyendo eventos táctiles, cadenas de usuario y densidad de píxeles. Es la forma más rápida de atrapar fallos de diseño — redimensiona la anchura y observa dónde salen mal las cosas.",`
);

content = content.replace(
`          {
            text: "Los emuladores no son perfectos. El comportamiento táctil, la renderización de fuentes, el momentum de scroll y los teclados virtuales son todos diferentes en hardware real. Probar al menos en un iPhone y un Android atrapa problemas que los emuladores pasan por alto, especialmente alrededor de insets de área segura (notch y esquinas redondeadas) y el scroll elástico de iOS Safari.",
          },`,
`          "Los emuladores no son perfectos. El comportamiento táctil, la renderización de fuentes, el momentum de scroll y los teclados virtuales son todos diferentes en hardware real. Probar al menos en un iPhone y un Android atrapa problemas que los emuladores pasan por alto, especialmente alrededor de insets de área segura (notch y esquinas redondeadas) y el scroll elástico de iOS Safari.",`
);

content = content.replace(
`          {
            text: "Herramientas online te muestran qué dimensiones de viewport reporta tu navegador actualmente, las comparan con presets comunes de dispositivos y te ayudan a entender la diferencia entre píxeles CSS y píxeles físicos. Esto es particularmente útil para depurar por qué un diseño se ve correcto en DevTools pero ligeramente diferente en un dispositivo real — la respuesta suele ser el devicePixelRatio.",
          },`,
`          "Herramientas online te muestran qué dimensiones de viewport reporta tu navegador actualmente, las comparan con presets comunes de dispositivos y te ayudan a entender la diferencia entre píxeles CSS y píxeles físicos. Esto es particularmente útil para depurar por qué un diseño se ve correcto en DevTools pero ligeramente diferente en un dispositivo real — la respuesta suele ser el devicePixelRatio.",`
);

fs.writeFileSync(file, content);
console.log('Fixed syntax errors.');
