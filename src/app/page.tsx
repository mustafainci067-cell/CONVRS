import Link from 'next/link';

const tools = [
  {
    href: '/heic-to-jpg',
    title: 'HEIC → JPG',
    description: 'Apple HEIC fotoğraflarını evrensel JPG formatına dönüştürün.',
    badge: 'Available',
  },
  {
    href: '/jpg-to-webp',
    title: 'JPG ↔ WebP',
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
    title: 'SVG → PNG',
    description: 'Vektör SVG dosyalarını 2× çözünürlükte, şeffaf PNG bitmap olarak dışa aktarın.',
    badge: 'Available',
  },
  {
    href: '/webp-to-png',
    title: 'WebP ↔ PNG',
    description: 'Hafif WebP görsellerini, saydamlığı koruyarak kayıpsız PNG formatına çevirin.',
    badge: 'Available',
  },
  {
    href: '/ico-to-png',
    title: 'ICO → PNG',
    description: 'ICO ikon dosyalarını tarayıcıda şeffaf PNG görsellerine dönüştürün.',
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
    href: '/markdown-to-html',
    title: 'Markdown → HTML',
    description: 'Markdown metnini anında temiz HTML’e dönüştürün. Çıktı XSS’e karşı otomatik arındırılır.',
    badge: 'Available',
  },
  {
    href: '/xlsx-to-csv',
    title: 'XLSX → CSV',
    description: 'Excel (.xlsx) dosyalarınızı tarayıcıda saniyeler içinde CSV’ye çevirip indirin.',
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
    <main className="flex flex-1 flex-col items-center p-8 font-sans">
      <div className="w-full max-w-3xl">
        <section className="flex flex-col items-center gap-4 pt-12 pb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Convrs
          </h1>
          <p className="max-w-lg text-lg text-zinc-400">
            Tüm dönüşümler doğrudan tarayıcınızda gerçekleşir. Dosyalarınız cihazınızdan asla çıkmaz.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
    </main>
  );
}
