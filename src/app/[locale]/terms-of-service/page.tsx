import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları — Convrs",
  description:
    "Convrs kullanım şartları: siteyi ve dosya dönüştürme araçlarını kullanırken geçerli olan koşullar, haklar ve sorumluluklar.",
};

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-1 flex-col items-center p-8 font-sans">
      <div className="w-full max-w-3xl animate-fade-in">
        <header className="border-b border-zinc-200 pt-6 pb-8 dark:border-zinc-800/60">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
            Legal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Kullanım Şartları
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Son güncelleme: 31 Ağustos 2026
          </p>
        </header>

        <p className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Convrs (&quot;hizmetimiz&quot;, &quot;web sitemiz&quot;) dosya dönüştürme araçlarını
          kullanmadan önce bu Kullanım Şartları&apos;nı (&quot;Şartlar&quot;) dikkatlice
          okumanızı öneririz. Siteye erişerek veya hizmeti kullanarak bu Şartlar&apos;ı kabul
          etmiş olursunuz.
        </p>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            1. Hizmetin Tanımı
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Convrs; görsel, belge, ses ve video dosyalarını çeşitli formatlara dönüştürmenizi
            sağlayan, tamamen tarayıcı içinde (client-side) çalışan bir platformdur. Tüm
            dönüştürme işlemleri kullanıcının kendi cihazında gerçekleştirilir; dosyalar hiçbir
            sunucuya yüklenmez veya depolanmaz.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            2. Kabul ve Kullanım
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Bu Şartlar, sitemizin ve tüm araçlarının kullanımını kapsar. Hizmeti yalnızca yasal
            amaçlarla ve bu Şartlar&apos;a uygun şekilde kullanmayı kabul edersiniz. Dönüştürme
            araçlarımızı yasa dışı içerik üretmek, dağıtmak veya üçüncü kişilerin haklarını
            ihlal etmek için kullanamazsınız.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            3. Fikri Mülkiyet
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Sitemizin tasarımı, düzeni, logosu ve tüm içeriği Convrs&apos;a aittir ve telif
            hakkı ile korunmaktadır. Bu içerikler, önceden yazılı izin alınmaksızın kopyalanamaz
            veya çoğaltılamaz. Hizmeti kullanarak dönüştürdüğünüz dosyaların mülkiyeti ve
            sorumluluğu tamamen size aittir.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            4. Garanti Reddi
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Hizmet, &quot;olduğu gibi&quot; (as-is) ve &quot;kullanılabilir olduğu kadar&quot;
            sunulur. İşlemler cihazınızın tarayıcısında gerçekleştiğinden, dönüştürme kalitesi ve
            sonuçları cihazınızın özelliklerine bağlı olarak değişebilir. Dönüştürülen dosyaların
            orijinal dosyanıza tamamen eşit olacağını, bozulmadan korunacağını veya herhangi bir
            özel amaç için uygun olacağını garanti etmeyiz.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            5. Sorumluluğun Sınırlandırılması
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Hizmetin kullanımından doğabilecek doğrudan, dolaylı, arızi, özel veya sonuç olarak
            ortaya çıkan zararlardan (veri kaybı, kesinti veya iş kaybı dâhil), yürürlükteki
            hukukun izin verdiği en geniş ölçüde sorumlu olmayacağız. Dönüştürme işlemine
            başlamadan önce önemli dosyalarınızın orijinal bir kopyasını saklamanız önerilir.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            6. Değişiklikler
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Bu Kullanım Şartları&apos;nı zaman zaman güncelleyebiliriz. Değişiklikler
            yayınlandığı anda yürürlüğe girer; sitemizi kullanmaya devam etmeniz, güncellenmiş
            Şartlar&apos;ı kabul ettiğiniz anlamına gelir. Önemli değişiklikler, sayfanın üst
            kısmındaki &quot;Son güncelleme&quot; tarihi ile belirtilir.
          </p>
        </section>

        <section className="mt-8 border-t border-zinc-200 pb-4 pt-8 dark:border-zinc-800/60">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            7. Geçerli Hukuk ve İletişim
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Bu Şartlar, Türkiye Cumhuriyeti hukukuna tabidir ve bu hukuk çerçevesinde
            yorumlanır. Şartlar veya hizmetimiz hakkında sorularınız varsa bizimle iletişime
            geçebilirsiniz.
          </p>
        </section>
      </div>
    </main>
  );
}
