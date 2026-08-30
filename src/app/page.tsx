import Link from 'next/link';

type Tool = {
  href: string;
  title: string;
  description: string;
  badge: string;
  status: 'active' | 'coming-soon';
};

const tools: Tool[] = [
  {
    href: '/heic-to-jpg',
    title: 'HEIC → JPG',
    description: 'Apple HEIC fotoğraflarını evrensel JPG formatına dönüştürün.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/jpg-to-webp',
    title: 'JPG ↔ WebP',
    description: "JPG dosyalarını WebAssembly ile Google'ın hafif WebP formatına çevirin.",
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/png-to-jpg',
    title: 'PNG ↔ JPG',
    description: 'HTML5 Canvas ile iki yönlü PNG/JPG dönüşümü; şeffaflık beyaz zemine düzleştirilir.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/svg-to-png',
    title: 'SVG ↔ PNG',
    description: 'Vektör SVG’yi şeffaf PNG’ye rasterleştirin ya da PNG’yi tekrar SVG’ye gömün.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/webp-to-png',
    title: 'WebP ↔ PNG',
    description: 'Hafif WebP görsellerini, saydamlığı koruyarak kayıpsız PNG formatına çevirin.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/ico-to-png',
    title: 'ICO ↔ PNG',
    description: 'ICO ikonlarını şeffaf PNG’ye çevirin ya da PNG’den ICO ikonu üretin.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/pdf-to-jpg',
    title: 'PDF → JPG',
    description: 'PDF’in ilk sayfasını pdf.js ile canvas’a çizip yüksek çözünürlüklü JPG olarak indirin.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/json-to-csv',
    title: 'JSON ↔ CSV',
    description: 'JSON kayıtlarını tabloya, CSV tablolarını JSON’a çevirin. Saf JavaScript, sıfır istek.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/xml-to-json',
    title: 'XML ↔ JSON',
    description: 'XML’i DOMParser ile JSON’a, JSON’u da XML’e çevirin. Çift yönlü ve anlık.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/markdown-to-html',
    title: 'Markdown ↔ HTML',
    description: 'Markdown’ı temiz HTML’e çevirin ya da HTML’i Markdown’a döndürün. Çıktı XSS’e karşı arındırılır.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/xlsx-to-csv',
    title: 'XLSX ↔ CSV',
    description: 'Excel (.xlsx) dosyalarınızı CSV’ye çevirin ya da CSV’yi Excel çalışma kitabına dönüştürün.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/base64-encoder',
    title: 'Base64 Encoder',
    description: 'Metni UTF-8 güvenli Base64’e çevirin ya da Base64 kodunu geri okuyun.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/url-converter',
    title: 'URL Converter',
    description: 'URL’leri encode/decode edin. İki alan anlık senkron çalışır, veri cihazdan çıkmaz.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/qr-generator',
    title: 'QR Generator',
    description: 'Metin, bağlantı veya mesajınızı tarayıcıda anında taranabilir QR koda çevirin.',
    badge: 'Available',
    status: 'active',
  },
  {
    href: '/pdf-merge-split',
    title: 'PDF Merge & Split',
    description: 'Birden çok PDF’i birleştirin ya da bir PDF’i parçalara bölün.',
    badge: 'Coming Soon',
    status: 'coming-soon',
  },
  {
    href: '/docx-to-pdf',
    title: 'DOCX ↔ PDF',
    description: 'Word belgelerini PDF’e çevirin ya da PDF’i yeniden düzenlenebilir DOCX’e dönüştürün.',
    badge: 'Coming Soon',
    status: 'coming-soon',
  },
  {
    href: '/image-compressor',
    title: 'Image Compressor',
    description: 'Görsellerinizi kaliteyi koruyarak sıkıştırın ve boyutunu küçültün.',
    badge: 'Coming Soon',
    status: 'coming-soon',
  },
  {
    href: '/remove-background',
    title: 'Remove Background',
    description: 'Görsellerinizin arka planını kaldırıp şeffaf PNG elde edin.',
    badge: 'Coming Soon',
    status: 'coming-soon',
  },
  {
    href: '/video-to-mp3',
    title: 'Video to MP3',
    description: 'Video dosyalarından sesi çekip MP3 olarak dışa aktarın.',
    badge: 'Coming Soon',
    status: 'coming-soon',
  },
  {
    href: '/jwt-decoder',
    title: 'JWT Decoder',
    description: 'JWT token’larınızın header, payload ve imzasını doğrudan tarayıcıda çözün.',
    badge: 'Coming Soon',
    status: 'coming-soon',
  },
  {
    href: '/hash-generator',
    title: 'Hash Generator',
    description: 'Metinlerinize MD5, SHA-1, SHA-256 ve daha fazlasıyla anlık hash üretin.',
    badge: 'Coming Soon',
    status: 'coming-soon',
  },
  {
    href: '/color-converter',
    title: 'Color Converter',
    description: 'HEX, RGB, HSL ve CMYK renk kodlarını birbirine dönüştürün.',
    badge: 'Coming Soon',
    status: 'coming-soon',
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
          {tools.map((tool) =>
            tool.status === 'active' ? (
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
            ) : (
              <div
                key={tool.href}
                aria-disabled="true"
                title={`${tool.title} — Coming Soon`}
                className="cursor-not-allowed rounded-2xl border border-zinc-200/70 bg-zinc-100/40 p-6 opacity-70 dark:border-zinc-800/50 dark:bg-zinc-900/20"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-zinc-500 dark:text-zinc-400">{tool.title}</h2>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                    <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    {tool.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
                  {tool.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
