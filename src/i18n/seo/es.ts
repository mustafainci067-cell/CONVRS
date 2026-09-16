// Faz 3 — Plantilla de contenido SEO: textos en español.
import type { SeoPhrases } from "./types";

export const es: SeoPhrases = {
  claims: {
    webpSmaller: {
      q: "¿WebP es más pequeño que JPG?",
      a: "A menudo sí. WebP suele generar archivos notablemente más pequeños que JPG con una calidad visual similar, lo que acelera las páginas y ahorra ancho de banda.",
    },
    pngTransparency: {
      q: "¿PNG admite transparencia?",
      a: "Sí. PNG es un formato sin pérdida con un canal alfa completo, por lo que se conservan los fondos transparentes — ideal para logotipos, iconos y gráficos.",
    },
    jpgPhoto: {
      q: "¿JPG es un buen formato para fotos?",
      a: "Sí. JPG comprime las fotos para que el archivo sea pequeño, pero es con pérdida: se descarta parte del detalle. Sigue siendo el formato estándar de fotografías en la web y en las cámaras.",
    },
    heicIos: {
      q: "¿Por qué convertir HEIC?",
      a: "HEIC es el formato de foto predeterminado del iPhone y el iPad: eficiente, pero no compatible en todas partes. Convertir HEIC a JPG hace que tus fotos se abran en cualquier app y dispositivo.",
    },
    icoWindows: {
      q: "¿Cuándo necesito un archivo ICO?",
      a: "ICO es el formato clásico de favicon para Windows, navegadores y pestañas. Una versión PNG es útil cuando un favicon no se lee o necesitas una copia rasterizada transparente.",
    },
    svgVector: {
      q: "¿Qué diferencia a SVG de PNG?",
      a: "SVG es vectorial, así que sigue nítido a cualquier tamaño; PNG es un mapa de bits de resolución fija. La exportación SVG→PNG se usa cuando se requiere una imagen rasterizada, como en subidas.",
    },
    base64Text: {
      q: "¿Qué es Base64?",
      a: "Base64 codifica texto o datos binarios en caracteres ASCII seguros, para que los datos viajen sin corromperse por canales de solo texto, correos o JSON.",
    },
    imageToBase64: {
      q: "¿Por qué convertir una imagen a Base64?",
      a: "Las imágenes integradas como URI de datos Base64 se pueden insertar directamente en HTML, CSS o JSON — perfecto cuando no puedes alojar archivos de imagen separados.",
    },
    imageCompress: {
      q: "¿Cuánto reducirá la compresión mi imagen?",
      a: "La compresión consciente de la calidad suele reducir bastante el tamaño del archivo. Puedes intercambiar un poco de calidad visual por un archivo mucho más pequeño, y todo ocurre localmente.",
    },
    removeBg: {
      q: "¿Funciona la eliminación de fondo en cualquier foto?",
      a: "Funciona mejor con un contraste claro entre el sujeto y el fondo. El resultado se devuelve como PNG con fondo transparente, listo para el comercio electrónico o el diseño.",
    },
    imageResize: {
      q: "¿Redimensionar reduce el tamaño del archivo?",
      a: "Sí — menos píxeles significan menos bytes, así que el archivo se reduce. Redimensionar también permite ajustar las dimensiones exactas de una plataforma, como portadas de 1080 px.",
    },
    imageCrop: {
      q: "¿Por qué recortar una imagen?",
      a: "Recortar elimina los bordes no deseados, te permite centrar el sujeto y ajustarse a una proporción concreta, como un avatar cuadrado o una portada 16:9.",
    },
    filtersGraphic: {
      q: "¿Qué hacen los filtros de imagen?",
      a: "Los filtros como escala de grises, sepia, brillo o contraste se aplican píxel a píxel en tu navegador: tu archivo original nunca se modifica ni se sube.",
    },
    watermark: {
      q: "¿Por qué añadir una marca de agua?",
      a: "Una marca de agua superpone un logotipo o texto para marcar o proteger tus fotos, dejando claro quién es el dueño y dificultando la copia no autorizada.",
    },
    palette: {
      q: "¿Cómo se extrae una paleta de colores?",
      a: "La herramienta analiza la imagen subida y recoge sus colores dominantes, ofreciéndote una paleta lista para usar como base de un sistema de diseño coherente.",
    },
    exif: {
      q: "¿Qué contiene EXIF y por qué eliminarlo?",
      a: "EXIF son metadatos ocultos como modelo de cámara, ubicación GPS y fecha de captura. Eliminarlos protege tu privacidad antes de compartir fotos en línea.",
    },
    jsonStructured: {
      q: "¿Para qué se usa mejor JSON?",
      a: "JSON es un formato estricto y legible por máquina que usan APIs, bases de datos y archivos de configuración. La validación y el formateo coherente lo mantienen válido y legible.",
    },
    csvTabular: {
      q: "¿Qué es CSV?",
      a: "CSV almacena datos tabulares como texto plano separado por comas, de modo que la misma tabla se abre en cualquier editor de hojas de cálculo o base de datos.",
    },
    markdownHtml: {
      q: "¿Por qué convertir Markdown a HTML?",
      a: "Markdown es ligero y fácil de leer; convertirlo a HTML te da una página terminada que puedes pegar en un sitio web, un CMS o un correo.",
    },
    pdfMultiPage: {
      q: "¿Qué tienen de especial las páginas PDF?",
      a: "El PDF mantiene tipografías, diseño y paginación idénticos en cualquier dispositivo. Un archivo de varias páginas se puede procesar página a página, ideal para combinar, dividir o exportar.",
    },
    docxEditing: {
      q: "¿DOCX o PDF? ¿Cuál debo usar?",
      a: "DOCX es el formato de Word editable, con texto enriquecido y estilos; PDF es para compartir e imprimir porque fija el diseño en todos los dispositivos.",
    },
    xlsxRows: {
      q: "¿Qué diferencia hay entre XLSX y CSV?",
      a: "XLSX es el formato de libro de Excel con hojas, fórmulas y formato; CSV es una tabla de texto plano. Convertir XLSX→CSV mantiene los datos brutos portables.",
    },
    yamlHuman: {
      q: "¿Por qué usar YAML en lugar de JSON?",
      a: "YAML es más conciso y amigable que JSON, por eso es habitual en archivos de configuración. La conversión facilita leer y mantener un feed JSON.",
    },
    sqlPretty: {
      q: "¿Por qué formatear SQL?",
      a: "El SQL formateado con sangría coherente es mucho más fácil de leer, revisar y depurar. La salida sigue siendo válida y lista para ejecutar.",
    },
    vcfContacts: {
      q: "¿Para qué se usan los archivos VCF?",
      a: "VCF es el formato vCard para contactos. Convertir contactos a CSV facilita abrirlos en una hoja de cálculo o moverlos entre aplicaciones.",
    },
    urlEncode: {
      q: "¿Cuándo necesito codificar una URL?",
      a: "Las URL solo pueden contener caracteres seguros. La codificación convierte espacios, & y otros símbolos en códigos %, para que los enlaces con caracteres especiales funcionen correctamente.",
    },
    qrUrls: {
      q: "¿Qué puede hacer un código QR?",
      a: "La cámara de un smartphone escanea códigos QR para abrir una URL, conectarse a una red Wi-Fi o compartir texto al instante: no se necesita ninguna app adicional.",
    },
    jwtTokens: {
      q: "¿Qué contiene un JWT?",
      a: "Un JWT tiene tres partes: cabecera, carga útil y firma. Decodificar revela los claims, pero verificar un token sigue requiriendo la clave de firma.",
    },
    hashOneWay: {
      q: "¿Se puede revertir un hash?",
      a: "No: el hash es unidireccional. Produce una huella de longitud fija que no se puede convertir de nuevo en la entrada original, por eso se usa para comprobar la integridad.",
    },
    colorModels: {
      q: "HEX, RGB o HSL: ¿cuál elijo?",
      a: "Cada modelo sirve para un caso: HEX y RGB para pantallas, HSL para ajustes intuitivos de tono, saturación y luminosidad. Convertir mantiene el color idéntico entre herramientas.",
    },
    unixEpoch: {
      q: "¿Qué es el tiempo Unix?",
      a: "El tiempo Unix cuenta los segundos desde el 1970-01-01 00:00 UTC. Las marcas de tiempo se muestran en UTC por defecto, así que la fecha legible depende de tu zona horaria.",
    },
    uuidStandard: {
      q: "¿Los UUID son únicos?",
      a: "Sí. Los UUID versión 4 se construyen con 122 bits aleatorios, por lo que las colisiones son astronómicamente improbables. Son identificadores estándar en bases de datos y sistemas.",
    },
    passwordStrength: {
      q: "¿Qué hace que una contraseña sea fuerte?",
      a: "Primero la longitud, luego la variedad: combina letras minúsculas y mayúsculas, dígitos y símbolos, y evita palabras de diccionario y datos personales.",
    },
    cssMinify: {
      q: "¿Qué hace la minificación?",
      a: "La minificación elimina espacios, comentarios y formato innecesario de CSS y JavaScript, reduciendo los archivos para producción y acelerando la carga.",
    },
    cssUnits: {
      q: "px, rem o em: ¿cuál es la diferencia?",
      a: "px es una unidad de pantalla absoluta; rem escala con el tamaño de fuente raíz y em con el elemento padre. Convertir entre ellas mantiene el CSS responsivo predecible.",
    },
    htmlRfc: {
      q: "¿Por qué usar entidades HTML?",
      a: "Las entidades HTML como &amp; y &lt; permiten que los caracteres especiales se muestren correctamente y de forma segura en HTML y correos, incluso donde no se permite el marcado.",
    },
    boxShadow: {
      q: "¿Cómo se construye una sombra de caja?",
      a: "Una sombra se define por el desplazamiento horizontal y vertical, el radio de desenfoque, la expansión y el color. El generador te da el CSS exacto, listo para copiar.",
    },
    metaTags: {
      q: "¿Qué metadatos importan?",
      a: "El título, la descripción y las etiquetas Open Graph controlan cómo aparece una página en los resultados de búsqueda y las redes sociales. Generarlos de forma coherente ahorra tiempo.",
    },
    chmodPerms: {
      q: "¿Cómo funcionan los números de chmod?",
      a: "chmod usa tres dígitos octales (r=4, w=2, x=1) para usuario, grupo y otros. La calculadora muestra exactamente qué significa cada valor.",
    },
    jsKeycode: {
      q: "¿Qué es un keycode?",
      a: "Un keycode es el identificador numérico que el navegador informa al pulsar una tecla; se usa para atajos de teclado, juegos o formularios.",
    },
    tailwindClasses: {
      q: "¿Para qué se usa una paleta de Tailwind?",
      a: "Una paleta genera las escalas de color que necesitas para un tema de Tailwind, de modo que cada tono se mantenga coherente en todo el proyecto.",
    },
    urlParse: {
      q: "¿Por qué analizar una URL?",
      a: "Analizar divide un enlace en protocolo, host, ruta y cadena de consulta: útil para depurar redirecciones, rastreadores o enlaces rotos.",
    },
    caseText: {
      q: "¿Cuándo necesito cambiar el uso de mayúsculas?",
      a: "Cambiar entre minúsculas, MAYÚSCULAS o Título mantiene coherentes los encabezados, las etiquetas de exportación y los conjuntos de datos.",
    },
    wordCount: {
      q: "¿Por qué contar palabras y caracteres?",
      a: "Los recuentos de palabras, caracteres y tiempo de lectura te ayudan a cumplir los límites de artículos, publicaciones, títulos y traducciones.",
    },
    loremPlaceholder: {
      q: "¿Por qué usar Lorem Ipsum?",
      a: "Lorem Ipsum es un texto de relleno que permite previsualizar un diseño sin distraerse con contenido real.",
    },
    textDiff: {
      q: "¿Qué muestra un diff?",
      a: "Un diff resalta exactamente qué líneas o caracteres cambiaron entre dos textos, lo que agiliza la revisión de ediciones.",
    },
    screenViewport: {
      q: "¿Qué es el viewport?",
      a: "El viewport es el área visible de una página web. Comprobarlo en tiempo real te ayuda a crear diseños responsivos para cualquier pantalla.",
    },
    mp4Webm: {
      q: "¿WebM es mejor que MP4?",
      a: "WebM es un formato de video abierto y ligero de Google: archivos más pequeños para la web. MP4 es el más compatible. Convertir es útil cuando un sitio solo acepta WebM.",
    },
    mp3Audio: {
      q: "¿Por qué MP3 es tan común?",
      a: "MP3 es el formato de audio más compatible. Reduce el sonido a una fracción de su tamaño manteniendo muy buena calidad para música y voz.",
    },
    wavLossless: {
      q: "¿WAV o MP3?",
      a: "WAV es audio PCM sin pérdida: exacto pero grande. MP3 intercambia algo de detalle por un archivo mucho más pequeño. Convertir WAV→MP3 facilita compartir audio.",
    },
    gifLite: {
      q: "¿GIF sigue siendo útil?",
      a: "GIF es una imagen animada ligera que se reproduce en todas partes sin reproductor: ideal para clips cortos, aunque está limitada a 256 colores.",
    },
    audioTrim: {
      q: "¿Qué hace el recorte?",
      a: "El recorte (trim) corta el clip a la parte que quieres y elimina el silencio o las secciones no deseadas del inicio y del final.",
    },
    volumeBoost: {
      q: "¿Qué ocurre al aumentar la ganancia?",
      a: "Subir la ganancia hace que el audio sea más fuerte. Aumentar demasiado más allá de 0 dB hace que los picos recorten y distorsionen, así que un pequeño aumento suena mejor.",
    },
    videoSpeed: {
      q: "¿Cambiar la velocidad afecta al tono?",
      a: "No: la herramienta vuelve a sincronizar la reproducción manteniendo el tono estable, así un video más rápido o lento suena natural.",
    },
    videoResize: {
      q: "¿Por qué redimensionar un video?",
      a: "Reducir la resolución (por ejemplo, 1080p → 720p) reduce el tamaño del archivo, lo que ayuda cuando una plataforma tiene límites de tamaño o resolución.",
    },
    muteVideo: {
      q: "¿Qué hace silenciar un video?",
      a: "Silenciar elimina o apaga la pista de audio manteniendo la imagen y el tiempo exactamente iguales.",
    },
    voiceRecorder: {
      q: "¿Dónde se guarda mi grabación?",
      a: "Tu grabación se procesa y se descarga desde tu navegador: nunca se sube a un servidor.",
    },
    speechText: {
      q: "¿Cómo reconoce el dictado lo que digo?",
      a: "Usa el servicio de reconocimiento de voz de tu navegador para transcribir el micrófono en tiempo real. No se suben archivos de audio a nuestros servidores.",
    },
  },

  headingFile: (from, to) =>
    `Cómo convertir ${from} a ${to} en línea gratis`,
  headingPaste: (from, to) =>
    `Cómo convertir ${from} a ${to} en línea gratis`,
  headingGenerate: (to) =>
    `Cómo generar ${to} en línea gratis`,

  stepsFile: (from, to) => [
    `Selecciona tu archivo ${from} o arrástralo al conversor: se queda en tu navegador.`,
    `Ajusta las opciones opcionales, como calidad, tamaño o salida.`,
    `Haz clic en Convertir: el archivo se procesa localmente en tu dispositivo.`,
    `Descarga tu archivo ${to}. Estará listo en segundos.`,
  ],
  stepsPaste: (from, to) => [
    `Pega tu ${from} en el panel de entrada: nada se sube a la red.`,
    `Revisa las opciones y, si se muestra, elige la dirección (${from} → ${to}).`,
    `Haz clic en Convertir / Formatear: el resultado se genera en tu navegador.`,
    `Copia el resultado ${to} del panel de salida.`,
  ],
  stepsGenerate: (to) => [
    `Configura las opciones para tu ${to}.`,
    `Haz clic en Generar: el resultado se crea al instante en tu navegador.`,
    `Copia la salida o descarga el archivo generado.`,
  ],

  qHow: (from, to) => `¿Cómo convierto ${from} a ${to} gratis?`,
  qHowGenerate: (to) => `¿Cómo genero ${to} gratis?`,
  aHowFile: (from, to) =>
    `Selecciona tu archivo ${from} (o arrástralo), haz clic en Convertir y descarga el resultado ${to}. Sin registro, sin coste y el archivo nunca sale de tu navegador.`,
  aHowPaste: (from, to) =>
    `Pega tu ${from}, haz clic en Convertir y copia el resultado ${to}. Es gratis, funciona enteramente en tu navegador y no se sube nada.`,
  aHowGenerate: (to) =>
    `Configura tus opciones, haz clic en Generar y copia o descarga el resultado. Es gratis y se crea localmente en tu dispositivo.`,

  qPrivate: (name) => `¿Es ${name} privado y seguro?`,
  aPrivate: (name) =>
    `Sí. ${name} funciona enteramente en tu navegador, así tus datos nunca salen de tu dispositivo: no se sube ni se almacena nada en un servidor.`,
  wasmSentence:
    " Las herramientas de video y audio usan un motor WebAssembly que también se ejecuta en la memoria de tu dispositivo.",

  qLimit: "¿Cuál es el tamaño máximo de archivo?",
  aLimit: (mb) =>
    `${mb} MB por archivo. Como todo se ejecuta en la memoria de tu dispositivo, los archivos muy grandes pueden ralentizar o congelar el navegador.`,
};