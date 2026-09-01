import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — Convrs",
  description:
    "Convrs gizlilik politikası: tüm dosya dönüştürme işlemleri %100 kullanıcı tarayıcısında gerçekleşir. Dosyalarınız hiçbir sunucuya yüklenmez, kaydedilmez veya üçüncü şahıslarla paylaşılmaz.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col items-center p-8 font-sans">
      <div className="w-full max-w-3xl animate-fade-in">
        <header className="border-b border-zinc-200 pt-6 pb-8 dark:border-zinc-800/60">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
            Legal
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Gizlilik Politikası
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Son güncelleme: 1 Eylül 2026
          </p>
        </header>

        {/* Ana vurgu: client-side işleme güvencesi */}
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Gizliliğiniz Bizim için Önceliklidir
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-emerald-800 dark:text-emerald-300">
            Tüm dosya dönüştürme işlemleri %100 kullanıcı tarayıcısında (client-side)
            gerçekleşir. Dosyalarınız hiçbir sunucuya yüklenmez, kaydedilmez veya üçüncü
            şahıslarla paylaşılmaz.
          </p>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Convrs (&quot;biz&quot;, &quot;bize&quot; veya &quot;hizmetimiz&quot;) olarak, dosyalarınızın
          ve kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu politika, web
          sitemizi ve dosya dönüştürme araçlarımızı kullandığınızda hangi bilgilerin
          işlendiğini açıklamaktadır.
        </p>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            1. Veri Toplama
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Convrs, dosya dönüştürme amacıyla herhangi bir kişisel veri toplamaz. Dönüşüm
            araçlarımıza yüklediğiniz dosyalar, cihazınızdan asla ayrılmaz.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            2. Dosya İşleme (Client-Side)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Tüm dönüştürme işlemleri, doğrudan kendi tarayıcınızda ve cihazınızda çalışan
            JavaScript ile gerçekleştirilir. Dosyalarınız hiçbir sunucuya yüklenmez,
            kaydedilmez, işlenmek üzere iletilmez veya üçüncü şahıslarla paylaşılmaz.
            Dönüşüm tamamlandıktan sonra dosyalarınız cihazınızda kalır; sayfayı kapattığınızda
            veya tarayıcınızı temizlediğinizde kalıcı olarak silinir.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Bazı araçlar (ör. video ve ses dönüştürücüler) tarayıcı içinde çalışan
            WebAssembly/WASM motorlarını kullanır. Bu motorlar da yalnızca cihazınızın
            belleğinde çalışır ve hiçbir veriyi harici bir sunucuya göndermez.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            3. En İyi Çaba ile Yerel İşleme
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Dönüştürme sırasında gerekli olan hiçbir adım, dosyanızın içeriğini harici bir
            sunucuya göndermeyi gerektirmez. Yalnızca tarayıcı özellikleri ve cihazınızın
            işlem gücü kullanılır. Böylece dosyalarınız üzerinde her zaman tam kontrol
            sizdedir.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            4. Çerezler, Google Analytics ve Google AdSense
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Site, açık/koyu tema tercihinizi ve çerez izin tercihinizi hatırlamak için tarayıcınıza
            özel yerel depolama (localStorage) alanını kullanabilir; bu veriler cihazınızdan
            çıkmaz ve&nbsp;
            <span className="font-medium text-zinc-800 dark:text-zinc-200">&quot;Kabul Et&quot;</span>
            &nbsp;butonuyla verdiğiniz tercihi istediğiniz zaman tarayıcı ayarlarınızdan
            silebilirsiniz.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Google Analytics:</span>{' '}
            Sitemizin nasıl kullanıldığını anlamak ve site deneyimini iyileştirmek için Google
            Analytics kullanıyoruz. Google Analytics; sayfa görüntüleme, oturum süresi, yaklaşık
            coğrafi bölge ve tarayıcı/cihaz türü gibi anonimleştirilmiş ve toplu (agrege) trafik
            istatistikleri toplar. Bu veriler kişisel olarak sizi tanımlamaz ve Google Analytics
            tarafından işlenen verilerin içinde, dönüştürdüğünüz dosyaların içeriği{' '}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">asla</span> yer almaz.
            Google&apos;ın verileri nasıl kullandığına dair ayrıntıları{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-800 underline underline-offset-2 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
            >
              Google Gizlilik Politikası
            </a>{' '}
            sayfasında bulabilirsiniz.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Google AdSense:</span>{' '}
            Reklam gösterimi için Google AdSense&apos;i kullanabiliriz. AdSense, reklam yayınlamak
            ve reklam performansını ölçmek amacıyla çerezler (üçüncü taraf çerezleri dâhil)
            kullanabilir. Bu çerezler, web üzerindeki ziyaretlerinize dair bilgilere dayanarak size
            daha alakalı reklamlar gösterilmesine yardımcı olabilir. Reklam kişiselleştirmeyi
            istediğiniz zaman{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-800 underline underline-offset-2 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
            >
              Google Reklam Ayarları
            </a>{' '}
            üzerinden yönetebilir veya kapatabilirsiniz. Google&apos;ın ortak site sahipleriyle ne
            şekilde veri kullandığını görmek için{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-800 underline underline-offset-2 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
            >
              Google&apos;un reklam veri kullanımı
            </a>{' '}
            sayfasını inceleyebilirsiniz.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Tarayıcı ayarlarınızdan çerezleri engelleyebilir veya silebilirsiniz; bu durum sitenin
            temel dosya dönüştürme işlevlerini etkilemez.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            5. Üçüncü Taraf Hizmetleri
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Dosya dönüştürme işlemleri tamamen cihazınızda gerçekleştiği için, yüklediğiniz veya
            ürettiğiniz dosyaların içeriği hiçbir üçüncü taraf hizmetine iletilmez. Bölüm 4&apos;
            te açıklanan Google Analytics ve Google AdSense hizmetleri yalnızca anonim site kullanım
            istatistikleri ve reklam gösterimiyle ilgilidir; dosya içerikleriniz bu kapsama asla
            girmez.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            6. Bu Politikadaki Değişiklikler
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler
            yapılması durumunda, sayfanın üst kısmındaki &quot;Son güncelleme&quot; tarihi
            güncellenir. Değişikliklerden sonra hizmeti kullanmaya devam etmeniz, güncellenmiş
            politikayı kabul ettiğiniz anlamına gelir.
          </p>
        </section>

        <section className="mt-8 border-t border-zinc-200 pb-4 pt-8 dark:border-zinc-800/60">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            7. İletişim
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Bu politika veya veri işleme uygulamalarımız hakkında sorularınız varsa bizimle
            iletişime geçebilirsiniz.
          </p>
        </section>
      </div>
    </main>
  );
}
