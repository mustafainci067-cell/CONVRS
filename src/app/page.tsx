import Link from 'next/link';

const tools = [
  {
    href: '/heic-to-jpg',
    title: 'HEIC to JPG',
    description: 'Apple HEIC fotoğraflarını evrensel JPG formatına dönüştürün.',
    badge: 'Available',
  },
  {
    href: '/jpg-to-webp',
    title: 'JPG to WebP',
    description: "JPG dosyalarını WebAssembly ile Google'ın hafif WebP formatına çevirin.",
    badge: 'Available',
  },
  {
    href: '/png-to-jpg',
    title: 'PNG ↔ JPG',
    description: 'HTML5 Canvas ile iki yönlü PNG/JPG dönüşümü; şeffaflık beyaz zemine düzleştirilir.',
    badge: 'Available',
  },
  {
    href: '/svg-to-png',
    title: 'SVG ➝ PNG',
    description: 'Vektör SVG dosyalarını 2× çözünürlükte, şeffaf PNG bitmap olarak dışa aktarın.',
    badge: 'Available',
  },
  {
    href: '/json-to-csv',
    title: 'JSON ↔ CSV',
    description: 'JSON kayıtlarını tabloya, CSV tablolarını JSON’a çevirin. Saf JavaScript, sıfır istek.',
    badge: 'Available',
  },
  {
    href: '/xml-to-json',
    title: 'XML ↔ JSON',
    description: 'XML’i DOMParser ile JSON’a, JSON’u da XML’e çevirin. Çift yönlü ve anlık.',
    badge: 'Available',
  },
  {
    href: '/base64-encoder',
    title: 'Base64 Encoder',
    description: 'Metni UTF-8 güvenli Base64’e çevirin ya da Base64 kodunu geri okuyun.',
    badge: 'Available',
  },
  {
    href: '/url-converter',
    title: 'URL Converter',
    description: 'URL’leri encode/decode edin. İki alan anlık senkron çalışır, veri cihazdan çıkmaz.',
    badge: 'Available',
  },
  {
    href: '/qr-generator',
    title: 'QR Generator',
    description: 'Metin, bağlantı veya mesajınızı tarayıcıda anında taranabilir QR koda çevirin.',
    badge: 'Available',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-10 p-8 font-sans">
      <div className="max-w-2xl space-y-4 text-center">
        <span className="inline-block rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 font-mono text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
          100% Client-Side
        </span>
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Convrs
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Dosyalarınız cihazınızdan hiç çıkmaz. Tüm dönüşümler doğrudan tarayıcınızda,
          WebAssembly ve modern web API&apos;leri ile yapılır.
        </p>
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{tool.title}</h2>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                {tool.badge}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {tool.description}
            </p>
            <span className="mt-4 inline-block font-mono text-xs text-zinc-500 transition-colors group-hover:text-zinc-800 dark:group-hover:text-zinc-300">
              Aracı aç →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
