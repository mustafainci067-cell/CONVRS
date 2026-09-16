// Faz 5 — Long-form SEO içerik motoru: İspanyolca metinler.
import type { ToolDocPhrases } from "./types";

export const es: ToolDocPhrases = {
  title: (category, name, from, to) => {
    switch (category) {
      case "image":
        return `¿Por qué convertir ${from} a ${to} en el navegador?`;
      case "document":
        return `${from} → ${to}: una guía práctica y respetuosa con la privacidad`;
      case "media":
        return `${from} → ${to}: un recorrido completo`;
      default:
        return `Qué es ${name} y cómo funciona`;
    }
  },

  intro: (archetype, name, from, to) => {
    switch (archetype) {
      case "file":
        return `${name} convierte su ${from} en ${to} completamente dentro de su navegador. Sin instalación, sin cuenta y sin marcas de agua: seleccione o arrastre el archivo, revise la configuración y descargue el resultado en segundos. Sus archivos permanecen en su dispositivo.`;
      case "paste":
        return `${name} procesa su ${from} ahí mismo, donde usted está. Pegue su entrada, revise las opciones y copie el resultado en ${to} — sin subidas, sin cuenta y sin esperar a un servidor.`;
      default:
        return `${name} genera ${to} al instante en su navegador. Configure las opciones que necesita, genere y copie o descargue el resultado — gratis, privado y totalmente local.`;
    }
  },

  useCase: (category) => {
    switch (category) {
      case "image":
        return "La conversión de imágenes se usa para tareas cotidianas: reducir fotos para la web, preparar archivos para impresión o comercio electrónico, o cumplir el formato que exige una plataforma. Como todo ocurre localmente, usted mantiene el control de la calidad y sus originales nunca salen de su dispositivo.";
      case "document":
        return "La conversión de documentos importa siempre que un archivo debe cruzar una frontera: cuando un cliente usa otra suite ofimática, un formulario de subida acepta un único formato o un informe debe imprimirse idéntico en cualquier lugar. Hacerlo en el navegador elimina el paso más arriesgado: entregar su documento a un servidor desconocido.";
      case "developer":
        return "Las utilidades de navegador se ganan su lugar por ser controlables. Usted ve exactamente qué entra, obtiene la salida que necesita y puede repetir la operación tantas veces como quiera sin entregar sus datos a cambio. Encaja de forma natural entre su editor y su terminal.";
      case "text":
        return "El trabajo con texto suele ser rápido y repetitivo. Esta herramienta elimina la parte rutinaria — cambiar mayúsculas, medir la longitud o comparar versiones — para que usted se enfoque en lo que el texto realmente dice. Como todo se procesa localmente, incluso los borradores confidenciales siguen siendo privados.";
      case "media":
        return "Los archivos de medios son los más grandes y sensibles con los que trabaja. Procesarlos en su lugar significa que el audio o el vídeo nunca cruza la red: sin barra de subida, sin registros del servidor y sin copias olvidadas — solo el resultado en su dispositivo.";
      default:
        return "Las pequeñas utilidades ganan confianza al ser instantáneas y predecibles. Como todo funciona localmente, la respuesta que ve es la respuesta que recibe — sin esperas, sin rastreo y sin enviar nada a un servidor.";
    }
  },

  privacy: (name) =>
    `Privacidad por diseño: ${name} funciona íntegramente en la memoria de su dispositivo. Sus archivos, textos y datos nunca se suben, almacenan ni registran por nuestra parte — no hay ningún servidor en el camino.`,

  wasm: (name) =>
    `El trabajo pesado lo hace WebAssembly: los mismos motores de códec que usaría una aplicación de escritorio se compilan para ejecutarse en el navegador, de modo que ${name} ofrece resultados de nivel profesional mientras el archivo permanece en su dispositivo.`,

  features: (hasMedia, sizeLimitMb) => [
    ...(sizeLimitMb ? [`Hasta ${sizeLimitMb} MB por archivo`] : []),
    ...(hasMedia
      ? ["Motor de códec WebAssembly: procesamiento de escritorio en el navegador"]
      : []),
    "100% en el navegador: nada se sube",
    "Sin cuenta ni registro",
    "Gratis y sin marcas de agua",
    "Funciona en navegadores de escritorio y móviles",
    "Sus datos de origen nunca se almacenan ni se registran",
  ],
};