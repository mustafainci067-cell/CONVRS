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

  useCase: (category, name, from, to) => {
    const src = from === "-na-" ? name : from;
    switch (category) {
      case "image":
        return `Equipos de diseño, comercio electrónico y desarrollo utilizan ${name} para transformar ${src} en ${to} en flujos de trabajo reales: optimizar imágenes para mejorar Core Web Vitals (LCP), preparar recursos para impresión o cumplir requisitos de plataformas. Como la conversión ${src} → ${to} ocurre localmente, usted mantiene el control total de la calidad.`;
      case "document":
        return `Convertir ${src} a ${to} con ${name} resulta clave cuando un archivo debe cruzar fronteras entre sistemas: cuando un cliente usa otra suite ofimática, un portal exige exclusivamente ${to} o se necesita importar datos tabulares. Hacerlo en el navegador elimina el paso más arriesgado: subir documentos ${src} confidenciales a un servidor externo.`;
      case "developer":
        return `Los desarrolladores confían en ${name} para generar o transformar ${to} de forma determinista sin salir del navegador. Usted controla exactamente qué entra y obtiene la salida ${to} al instante sin exponer tokens, esquemas ni credenciales de producción a APIs de terceros.`;
      case "text":
        return `El trabajo editorial y técnico requiere transformar ${src} en ${to} con rapidez y precisión. ${name} automatiza el proceso sin errores manuales, manteniendo borradores confidenciales 100 % dentro de la memoria local del navegador.`;
      case "media":
        return `Los archivos de audio y video (${src} → ${to}) son los más pesados y sensibles. Procesarlos localmente con ${name} significa que el archivo nunca cruza la red: sin barras de subida interminables, sin colas en servidores remotos y con el resultado ${to} listo al instante en su dispositivo.`;
      default:
        return `${name} ofrece resultados ${to} instantáneos y predecibles directamente en su navegador, sin esperas, sin rastreo y sin contacto con servidores.`;
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