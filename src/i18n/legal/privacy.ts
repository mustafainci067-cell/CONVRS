import type { LegalContent } from "./types";
import { links } from "./types";

export const privacyContent: LegalContent = {
  // ─────────────── TÜRKÇE ───────────────
  tr: {
    eyebrow: "Legal",
    title: "Gizlilik Politikası",
    updatedLabel: "Son güncelleme:",
    updatedDate: "5 Eylül 2026",
    scope: "Geçerli: https://convrs.org — KVKK · GDPR · CCPA uyumlu",
    note: {
      type: "note",
      tone: "success",
      title: "Gizliliğiniz Bizim için Önceliklidir",
      content: [
        {
          text: "Tüm dosya dönüştürme işlemleri %100 kullanıcı tarayıcısında (client-side) gerçekleşir. Dosyalarınız ve içerikleri hiçbir sunucuya yüklenmez, kaydedilmez, işlenmek üzere iletilmez veya üçüncü şahıslarla paylaşılmaz.",
        },
      ],
    },
    intro: [
      [
        "Convrs (",
        { text: "biz", bold: true },
        ", ",
        { text: "bize", bold: true },
        " veya ",
        { text: "hizmetimiz", bold: true },
        ") olarak, kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu politika; 6698 sayılı Kişisel Verilerin Korunması Kanunu (",
        { text: "KVKK", bold: true },
        "), Avrupa Birliği Genel Veri Koruma Tüzüğü (",
        { text: "GDPR", bold: true },
        ") ve Kaliforniya Tüketici Gizliliği Yasası (",
        { text: "CCPA", bold: true },
        ") başta olmak üzere yürürlükteki ulusal ve uluslararası veri koruma mevzuatına uygun olarak, web sitemizi ve dosya dönüştürme araçlarımızı kullandığınızda hangi bilgilerin işlendiğini, nasıl işlendiğini ve bu konudaki haklarınızı açıklamaktadır.",
      ],
    ],
    sections: [
      {
        heading: ["1. Veri Sorumlusu (Data Controller)"],
        blocks: [
          {
            type: "p",
            content: [
              "Bu sitede işlenen sınırlı verilerin veri sorumlusu, ",
              { text: "CONVRS", bold: true },
              " markası altında hizmeti yürüten gerçek kişi ",
              { text: "Mustafa İnci", bold: true },
              "'dir. KVKK md. 10, GDPR md. 13 ve CCPA kapsamındaki tüm talepleriniz için aşağıdaki iletişim bilgilerini kullanabilirsiniz:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "E-posta: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "Web sitesi: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. İşlenen Veriler ve İşleme Faaliyetleri"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs, dosya dönüştürme amacıyla ",
              { text: "hiçbir kişisel veri toplamaz ve işlemez", bold: true },
              ". Dönüştürme araçlarımıza yüklediğiniz veya ürettiğiniz dosyalar ve bu dosyaların içerikleri, cihazınızdan asla ayrılmaz. Bu nedenle yüklediğiniz dosyaların içeriği bir ",
              { text: "kişisel veri", bold: true },
              " dahi olsa, bu veriler tarafımızca işlenmez, görülmez, kopyalanmaz veya saklanmaz.",
            ],
          },
          {
            type: "p",
            content: [
              "Aşağıdaki tabloda, sitenin çalışması ve kalitesinin ölçülmesi kapsamında işlenebilecek sınırlı bilgiler özetlenmiştir. Bunların hiçbiri sizi doğrudan tanımlamaz ve dosyalarınızın içeriğiyle ilişkilendirilmez:",
            ],
          },
          {
            type: "table",
            columns: ["Veri Kategorisi", "Amaç", "Hukuki Dayanak"],
            rows: [
              [
                "Tema ve çerez tercihi",
                "Site deneyimi (localStorage)",
                "Meşru menfaat (KVKK md. 5/2-f; GDPR md. 6/1-f)",
              ],
              [
                "Anonimleştirilmiş kullanım istatistikleri",
                "Site performans analizi (Google Analytics)",
                "Rıza (çerez kabulü) — GDPR md. 6/1-a, KVKK md. 5/1",
              ],
              [
                "Reklam envanteri verileri",
                "Reklam gösterimi (Google AdSense)",
                "Rıza — GDPR md. 6/1-a, KVKK md. 5/1",
              ],
            ],
          },
        ],
      },
      {
        heading: ["3. Dosya İşleme (Client-Side) Garantisi"],
        blocks: [
          {
            type: "p",
            content: [
              "Tüm dönüştürme işlemleri, doğrudan kendi tarayıcınızda ve cihazınızda çalışan JavaScript ile gerçekleştirilir. Dosyalarınız hiçbir sunucuya yüklenmez, kaydedilmez, işlenmek üzere iletilmez veya üçüncü şahıslarla paylaşılmaz. Dönüşüm tamamlandıktan sonra dosyalarınız cihazınızda kalır; sayfayı kapattığınızda veya tarayıcınızı temizlediğinizde kalıcı olarak silinir.",
            ],
          },
          {
            type: "p",
            content: [
              "Bazı araçlar (ör. video ve ses dönüştürücüler) tarayıcı içinde çalışan WebAssembly/WASM motorlarını (ör. FFmpeg.wasm) kullanır. Bu motorlar da yalnızca cihazınızın belleğinde ve işlem gücünde çalışır ve hiçbir veriyi harici bir sunucuya göndermez. Bu teknik yapı, siteye ve barındırma sağlayıcısına dahi dosya içeriklerinizin hiçbir aşamada erişemeyeceği anlamına gelir.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Yedekleme uyarısı:", bold: true },
              " Dönüştürme işlemleri cihazınızda gerçekleştiğinden, işlem sırasında cihazınızın kapanması, tarayıcınızın çökmesi veya belleğin yetmemesi gibi nedenlerle veri kaybı yaşanabilir. Bu nedenle önemli dosyalarınızın orijinal kopyalarını ayrıca saklamanızı öneririz; aksi halde oluşabilecek kayıplardan tarafımız sorumlu değildir (bkz. Kullanım Şartları — Sorumluluk Reddi).",
            ],
          },
        ],
      },
      {
        heading: ["4. Tarayıcı Depolaması (localStorage) ve Çerezler"],
        blocks: [
          {
            type: "p",
            content: [
              "Site, yalnızca cihazınızda saklanan ve cihazınızdan dışarı çıkmayan aşağıdaki tarayıcı depolama alanlarını (localStorage) kullanabilir:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Çerez izin tercihi", bold: true },
                ' (',
                { text: "convrs-cookie-consent", code: true },
                "): Çerez kabul tercihinizi hatırlamak için kullanılır.",
              ],
              [
                { text: "Tema tercihi", bold: true },
                ": Açık/koyu tema seçiminizi hatırlamak için kullanılır.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Bu veriler cihazınızdan çıkmaz; istediğiniz zaman tarayıcınızın ayarlarından silebilirsiniz. Sitenin temel dönüştürme işlevleri bu depolama alanlarına bağlı değildir; silmeniz işlevselliği etkilemez.",
            ],
          },
          {
            type: "p",
            content: [
              "Çerezlerin ve üçüncü taraf çerezlerin (analitik ve reklam) türleri, amaçları ve yönetimi hakkında ayrıntılı bilgi için ",
              { text: "Çerez Politikası", url: "/cookie-policy", internal: true },
              " sayfamıza bakınız.",
            ],
          },
        ],
      },
      {
        heading: ["5. Google Analytics ve Google AdSense"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "Google Analytics:", bold: true },
              " Sitemizin nasıl kullanıldığını anlamak ve site deneyimini iyileştirmek için Google Analytics kullanıyoruz. Google Analytics; sayfa görüntüleme, oturum süresi, yaklaşık coğrafi bölge ve tarayıcı/cihaz türü gibi anonimleştirilmiş ve toplu (agrege) trafik istatistikleri toplar. Bu veriler kişisel olarak sizi tanımlamaz ve Google Analytics tarafından işlenen verilerin içinde, dönüştürdüğünüz dosyaların içeriği ",
              { text: "asla", bold: true },
              " yer almaz. Google Analytics; yalnızca çerez kabulü vermeniz durumunda çerezli analitik verileri toplar. Öncesinde rıza sinyali 'denied' (reddedildi) olduğundan, işlem çerezsiz ve anonim verilerle sınırlıdır. Google'ın verileri nasıl kullandığına dair ayrıntılar için ",
              { text: "Google Gizlilik Politikası", url: links.googlePrivacy, external: true },
              " sayfasına bakabilirsiniz.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Google AdSense:", bold: true },
              " Reklam gösterimi için Google AdSense'i kullanıyoruz. AdSense, reklam yayınlamak ve reklam performansını ölçmek amacıyla çerezler (üçüncü taraf çerezleri dâhil) kullanabilir. Çerez kabulü vermediğiniz veya geri aldığınız durumda yalnızca kişiselleştirilmemiş (Limited Ads) reklamlar gösterilir; bu reklamlar, gezinme geçmişinize dayalı olarak hedeflenmez. Reklam kişiselleştirme, yalnızca çerez kabulü verdiğiniz durumda etkinleşir. Reklam kişiselleştirmeyi istediğiniz zaman ",
              { text: "Google Reklam Ayarları", url: links.googleAdsSettings, external: true },
              " üzerinden yönetebilir veya kapatabilirsiniz. Google'ın ortak site sahipleriyle ne şekilde veri kullandığını görmek için ",
              { text: "Google'ın reklam veri kullanımı", url: links.googlePartnerSites, external: true },
              " sayfasını inceleyebilirsiniz.",
            ],
          },
        ],
      },
      {
        heading: ["6. Üçüncü Taraf Hizmetleri ve Bağlantılar"],
        blocks: [
          {
            type: "p",
            content: [
              "Dosya dönüştürme işlemleri tamamen cihazınızda gerçekleştiği için, yüklediğiniz veya ürettiğiniz dosyaların içeriği hiçbir üçüncü taraf hizmetine iletilmez. Sitede aşağıdaki üçüncü taraf hizmetlerine yönlendiren bağlantılar bulunabilir:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Buy Me a Coffee", bold: true },
                " (bağış platformu): Bağış işlemleri ve bu platformda paylaştığınız bilgiler, ",
                { text: "Buy Me a Coffee Gizlilik Politikası", url: links.bmcPrivacy, external: true },
                " hükümlerine tabidir. Bağış sayfasına gittiğiniz andan itibaren verileriniz bizimle değil, ilgili platform ile doğrudan paylaşılmış olur.",
              ],
              [
                { text: "Google (Analytics / AdSense)", bold: true },
                ": Bölüm 5'te açıklandığı şekilde.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Üçüncü taraf sitelere verilen bağlantılar, bu sitelerin içerikleri ve gizlilik uygulamaları üzerinde hiçbir denetimimiz ve sorumluluğumuz yoktur. Siteden ayrılarak bir üçüncü taraf platforma eriştiğiniz anda, o platformun kendi gizlilik politikası ve kullanım şartları geçerli olur; bu kapsamdaki tüm veri güvenliği ve hukuki sorumluluk tamamen sizde ve ilgili üçüncü taraf platformdadır.",
            ],
          },
        ],
      },
      {
        heading: ["7. Zımni Rıza ve Onay (Consent)"],
        blocks: [
          {
            type: "p",
            content: [
              "Bu siteyi kullanarak; bu Gizlilik Politikası'nı, ",
              { text: "Kullanım Şartları", url: "/terms-of-service", internal: true },
              "'nı ve ",
              { text: "Çerez Politikası", url: "/cookie-policy", internal: true },
              "'nı okuduğunuzu ve kabul ettiğinizi beyan etmiş olursunuz. Sitede işlenen teknik verilere ilişkin açık rızanız, çerez kabul butonuna tıklamanızla; bu politikaların kabulü ise siteyi kullanmaya devam etmenizle (zımni rıza) sağlanmış sayılır.",
            ],
          },
          {
            type: "p",
            content: [
              "Verdiğiniz rızayı dilediğiniz zaman geri alabilirsiniz. Rızayı geri almanız, geri alma öncesinde yapılan işlemlerin hukuka uygunluğunu etkilemez. Çerez rızanızı tarayıcı ayarlarından ve ",
              { text: "Çerez Politikası", url: "/cookie-policy", internal: true },
              " sayfasında belirtilen araçlarla yönetebilirsiniz.",
            ],
          },
        ],
      },
      {
        heading: ["8. Veri İşleme Faaliyetlerinin Genel Şartları"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "Yurt dışına aktarım:", bold: true },
              " İşlenen sınırlı teknik veriler, Google (ABD merkezli) hizmetleri üzerinden işlenebilir. Google, GDPR kapsamında yeterlilik kararı (ABD için Veri Gizliliği Çerçevesi — DPF) kapsamında sertifikalıdır; ayrıca işlemler için Avrupa Komisyonu standart sözleşme maddeleri (SCC) uygulanır. KVKK md. 9 kapsamında, yurt dışına aktarımda gerekli güvenceler sağlanmaktadır.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Veri saklama süreleri:", bold: true },
              " Dosyalarınız hiçbir sunucuda saklanmaz. Tarayıcı depolamanızdaki tercihler, siz silene kadar cihazınızda kalır. Anonim trafik istatistikleri, Google tarafından kendi saklama politikaları çerçevesinde (varsayılan olarak en fazla 14 ay) tutulur.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Log kayıtları:", bold: true },
              " Sunucu tarafında, yalnızca teknik güvenlik ve kötüye kullanımın önlenmesi amacıyla IP adresi, tarayıcı türü, erişim zamanı ve istenen sayfa gibi standart erişim kayıtları (access log) tutulabilir. Bu kayıtlar dosyalarınızın içeriğini asla içermez, yalnızca kısa süreli tutulur ve üçüncü kişilerle ticari amaçla paylaşılmaz.",
            ],
          },
        ],
      },
      {
        heading: ["9. Haklarınız (KVKK md. 11 · GDPR md. 15-22 · CCPA)"],
        blocks: [
          {
            type: "p",
            content: ["Yürürlükteki mevzuat kapsamında aşağıdaki haklara sahipsiniz:"],
          },
          {
            type: "list",
            items: [
              ["Kişisel verilerinizin işlenip işlenmediğini öğrenme (KVKK md. 11/a),"],
              ["İşlenmişse buna ilişkin bilgi talep etme (KVKK md. 11/b),"],
              ["İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme (KVKK md. 11/c),"],
              ["Varsa üçüncü kişilere aktarılan verileri ve aktarım amacını öğrenme (KVKK md. 11/ç),"],
              ["Verilerin eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme (KVKK md. 11/d),"],
              ["Verilerin silinmesini veya yok edilmesini isteme (KVKK md. 11/e — \"unutulma hakkı\"),"],
              ["Düzeltme/silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme (KVKK md. 11/f),"],
              ["Verilerin münhasıran otomatik sistemlerle analiz edilmesine itiraz etme (KVKK md. 11/g),"],
              ["İşlenen verilerin zarara uğraması hâlinde zararın giderilmesini talep etme (KVKK md. 11/h),"],
              ["Verilerinize erişim, düzeltme, silme, işlemeyi sınırlama ve taşınabilirlik hakları (GDPR md. 15-20),"],
              ["Otomatik karar alma ve profillemeye itiraz (GDPR md. 22),"],
              ["Verilerinizin \"satılmaması\" veya \"paylaşılmaması\" hakkı (CCPA),"],
              [
                "Denetim makamına şikâyette bulunma hakkı (KVKK Kurulu — Türkiye; ilgili AB üyesi ülke veri koruma otoritesi — GDPR).",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Önemle belirtmek gerekir ki; dosyalarınızın içeriği tarafımızca işlenmediği ve saklanmadığı için, bu hakların büyük bölümü dosya içerikleriniz açısından fiilen uygulanabilir nitelikte değildir (işlenen veri bulunmadığından silinecek veya aktarılacak bir veri de yoktur). Haklarınızı kullanmak isterseniz Bölüm 12'deki iletişim adresleri üzerinden talebinizi iletebilirsiniz.",
            ],
          },
        ],
      },
      {
        heading: ["10. Veri Güvenliği"],
        blocks: [
          {
            type: "p",
            content: [
              "Dosyalarınız cihazınızdan hiç ayrılmadığı için, dosya içeriklerinizin güvenliği büyük ölçüde cihazınızın ve tarayıcınızın güvenliğine bağlıdır. Site tarafında, verilerin aktarımı sırasında uçtan uca şifreleme (HTTPS/TLS) kullanılmakta, tarayıcı güvenlik önlemleri (CSP, HSTS, X-Frame-Options vb.) uygulanmakta ve kötüye kullanım girişimleri izlenmektedir. Buna rağmen, hiçbir iletim yönteminin %100 güvenli olmadığını kabul edersiniz.",
            ],
          },
        ],
      },
      {
        heading: ["11. Çocukların Gizliliği"],
        blocks: [
          {
            type: "p",
            content: [
              "Sitemiz genel kullanıma yöneliktir ve bilerek 18 yaşından küçük kullanıcılardan (GDPR ve CCPA kapsamında 16 yaş altı) bilgi toplamayız. Dosya dönüştürme işlemlerimiz bilinçli olarak çocuklara yönelik değildir. Bir ebeveyn veya vasi, çocuğunun site üzerinden herhangi bir şekilde veri paylaştığını düşünüyorsa bizimle iletişime geçebilir.",
            ],
          },
        ],
      },
      {
        heading: ["12. İletişim ve Talepler"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "Bu politika veya veri işleme uygulamalarımız hakkında sorularınız, hak talepleriniz veya şikâyetleriniz için bizimle iletişime geçebilirsiniz. Taleplerinizi, KVKK md. 13 uyarınca kimliğinizi doğrulayacak bilgilerle birlikte ilettiğinizde, yasal süre olan en geç ",
              { text: "30 (otuz) gün", bold: true },
              " içinde yanıtlanır:",
            ],
          },
          {
            type: "contact",
            title: "Veri Sorumlusu",
            lines: [
              ["CONVRS — Mustafa İnci"],
              [
                "E-posta: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "KVKK Şikâyet: Kişisel Verileri Koruma Kurumu — ",
                { text: "www.kvkk.gov.tr", url: links.kvkk, external: true },
              ],
              ["GDPR Şikâyet: İlgili ülkenin veri koruma otoritesi (DPA)"],
              [
                "CCPA/California: ",
                { text: "California Attorney General", url: links.caAttorney, external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["13. Bu Politikadaki Değişiklikler"],
        blocks: [
          {
            type: "p",
            content: [
              "Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler yapılması durumunda, sayfanın üst kısmındaki \"Son güncelleme\" tarihi güncellenir. Değişikliklerden sonra hizmeti kullanmaya devam etmeniz, güncellenmiş politikayı kabul ettiğiniz anlamına gelir. Değişiklik yürürlüğe girdiğinde dosyalarınızın işlenme biçimini etkileyecekse, mümkün olduğunca önceden bilgilendirme yapılır.",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ENGLISH ───────────────
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    updatedLabel: "Last updated:",
    updatedDate: "September 5, 2026",
    scope: "Applicable to: https://convrs.org — KVKK · GDPR · CCPA compliant",
    note: {
      type: "note",
      tone: "success",
      title: "Your Privacy Is Our Priority",
      content: [
        {
          text: "All file conversion operations are performed 100% in your browser (client-side). Your files and their contents are never uploaded to any server, stored, transmitted for processing, or shared with third parties.",
        },
      ],
    },
    intro: [
      [
        "Convrs (",
        { text: "we", bold: true },
        ", ",
        { text: "us", bold: true },
        " or ",
        { text: "our service", bold: true },
        ") places great importance on the protection of your personal data. This policy explains which information is processed when you use our website and file conversion tools, how it is processed, and your rights in this regard, in accordance with the Turkish Law No. 6698 on the Protection of Personal Data (",
        { text: "KVKK", bold: true },
        "), the European Union General Data Protection Regulation (",
        { text: "GDPR", bold: true },
        "), the California Consumer Privacy Act (",
        { text: "CCPA", bold: true },
        ") and all other applicable national and international data protection legislation.",
      ],
    ],
    sections: [
      {
        heading: ["1. Data Controller"],
        blocks: [
          {
            type: "p",
            content: [
              "The data controller of the limited data processed on this site is the natural person ",
              { text: "Mustafa İnci", bold: true },
              ", who operates the service under the brand ",
              { text: "CONVRS", bold: true },
              ". You may use the contact details below for any request under Article 10 of the KVKK, Article 13 of the GDPR and the CCPA:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Email: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "Website: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. Data Processed and Processing Activities"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "does not collect or process any personal data", bold: true },
              " for the purpose of file conversion. The files you upload to or generate with our conversion tools, and their contents, never leave your device. Accordingly, even if the content of a file you process constitutes ",
              { text: "personal data", bold: true },
              ", that data is not processed, viewed, copied or stored by us.",
            ],
          },
          {
            type: "p",
            content: [
              "The table below summarizes the limited information that may be processed in connection with the operation and quality measurement of the site. None of it identifies you directly or is linked to the content of your files:",
            ],
          },
          {
            type: "table",
            columns: ["Data Category", "Purpose", "Legal Basis"],
            rows: [
              [
                "Theme and cookie preference",
                "Site experience (localStorage)",
                "Legitimate interest (KVKK Art. 5/2-f; GDPR Art. 6/1-f)",
              ],
              [
                "Anonymized usage statistics",
                "Site performance analysis (Google Analytics)",
                "Consent (cookie acceptance) — GDPR Art. 6/1-a, KVKK Art. 5/1",
              ],
              [
                "Advertising inventory data",
                "Ad serving (Google AdSense)",
                "Consent — GDPR Art. 6/1-a, KVKK Art. 5/1",
              ],
            ],
          },
        ],
      },
      {
        heading: ["3. Guarantee of Client-Side File Processing"],
        blocks: [
          {
            type: "p",
            content: [
              "All conversion operations are performed by JavaScript running directly in your own browser and on your own device. Your files are never uploaded, stored, transmitted for processing or shared with third parties. Once a conversion is complete, your files remain on your device and are permanently deleted when you close the page or clear your browser.",
            ],
          },
          {
            type: "p",
            content: [
              "Some tools (e.g. video and audio converters) use WebAssembly/WASM engines that run inside the browser (e.g. FFmpeg.wasm). These engines likewise operate only in your device's memory and processing power and never send any data to an external server. This technical architecture means that neither the site nor its hosting provider can ever access the content of your files at any stage.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Backup warning:", bold: true },
              " Because conversions run on your device, data loss may occur if your device shuts down, your browser crashes or memory is insufficient. We therefore strongly recommend that you keep original copies of your important files; we are not responsible for any loss that may occur otherwise (see Terms of Service — Disclaimer).",
            ],
          },
        ],
      },
      {
        heading: ["4. Browser Storage (localStorage) and Cookies"],
        blocks: [
          {
            type: "p",
            content: [
              "The site may use the following browser storage areas (localStorage), which are stored only on your device and never leave it:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Cookie consent preference", bold: true },
                ' (',
                { text: "convrs-cookie-consent", code: true },
                "): used to remember your cookie acceptance preference.",
              ],
              [
                { text: "Theme preference", bold: true },
                ": used to remember your light/dark theme selection.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "This data never leaves your device; you can delete it at any time from your browser settings. The site's core conversion functions do not depend on these storage areas; deleting them does not affect functionality.",
            ],
          },
          {
            type: "p",
            content: [
              "For detailed information on the types, purposes and management of cookies and third-party cookies (analytical and advertising), please see our ",
              { text: "Cookie Policy", url: "/cookie-policy", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["5. Google Analytics and Google AdSense"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "Google Analytics:", bold: true },
              " We use Google Analytics to understand how our site is used and to improve the site experience. Google Analytics collects anonymized and aggregate traffic statistics such as page views, session duration, approximate geographic region and browser/device type. This data does not identify you personally, and the content of the files you convert is ",
              { text: "never", bold: true },
              " included in the data processed by Google Analytics. Google Analytics collects cookie-based analytics data only if you accept cookies. Before that, the consent signal is 'denied', so processing is limited to cookieless and anonymized data. For details on how Google uses data, please see the ",
              { text: "Google Privacy Policy", url: links.googlePrivacy, external: true },
              ".",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Google AdSense:", bold: true },
              " We use Google AdSense to display ads. AdSense may use cookies (including third-party cookies) to serve ads and measure advertising performance. If you do not accept cookies (or withdraw your consent), only non-personalized (Limited Ads) advertising is shown; these ads are not targeted based on your browsing history. Personalized advertising is activated only if you accept cookies. You can manage or turn off ad personalization at any time via ",
              { text: "Google Ad Settings", url: links.googleAdsSettings, external: true },
              ". To see how Google uses data together with partner sites, please review ",
              { text: "Google's use of advertising data", url: links.googlePartnerSites, external: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["6. Third-Party Services and Links"],
        blocks: [
          {
            type: "p",
            content: [
              "Because all file conversion is performed entirely on your device, the content of the files you upload or generate is never transmitted to any third-party service. The site may contain links directing you to the following third-party services:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Buy Me a Coffee", bold: true },
                " (donation platform): Donation transactions and any information you share on this platform are subject to the ",
                { text: "Buy Me a Coffee Privacy Policy", url: links.bmcPrivacy, external: true },
                ". As soon as you leave for the donation page, your data is shared directly with that platform, not with us.",
              ],
              [
                { text: "Google (Analytics / AdSense)", bold: true },
                ": as described in Section 5.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "We have no control over, and no responsibility for, the content and privacy practices of third-party sites to which links are provided. The moment you leave the site and access a third-party platform, that platform's own privacy policy and terms of use apply; all data security and legal responsibility in this context rests entirely with you and the relevant third-party platform.",
            ],
          },
        ],
      },
      {
        heading: ["7. Implied Consent and Consent"],
        blocks: [
          {
            type: "p",
            content: [
              "By using this site, you declare that you have read and fully agree to this Privacy Policy, the ",
              { text: "Terms of Service", url: "/terms-of-service", internal: true },
              " and the ",
              { text: "Cookie Policy", url: "/cookie-policy", internal: true },
              ". Your explicit consent to the technical data processed on the site is deemed given by clicking the cookie acceptance button, and your acceptance of these policies is deemed given by continuing to use the site (implied consent).",
            ],
          },
          {
            type: "p",
            content: [
              "You may withdraw your consent at any time. Withdrawal does not affect the lawfulness of processing based on consent before its withdrawal. You can manage your cookie consent through your browser settings and the tools described in the ",
              { text: "Cookie Policy", url: "/cookie-policy", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["8. General Terms of Data Processing Activities"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "International transfers:", bold: true },
              " The limited technical data processed may be handled through Google's (US-based) services. Google is certified under the adequacy framework recognized under the GDPR (the EU–US Data Privacy Framework — DPF); in addition, the European Commission's Standard Contractual Clauses (SCC) apply. Appropriate safeguards are provided for international transfers within the meaning of Article 9 of the KVKK.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Data retention periods:", bold: true },
              " Your files are never stored on any server. Preferences in your browser storage remain on your device until you delete them. Anonymized traffic statistics are retained by Google in accordance with its own retention policies (by default no longer than 14 months).",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Log records:", bold: true },
              " On the server side, standard access logs (IP address, browser type, access time and requested page) may be kept solely for technical security and abuse prevention. These logs never contain the content of your files, are retained only briefly and are never shared with third parties for commercial purposes.",
            ],
          },
        ],
      },
      {
        heading: ["9. Your Rights (KVKK Art. 11 · GDPR Arts. 15–22 · CCPA)"],
        blocks: [
          {
            type: "p",
            content: ["Under applicable law, you have the following rights:"],
          },
          {
            type: "list",
            items: [
              ["To learn whether your personal data is being processed (KVKK Art. 11/a),"],
              ["To request information if it has been processed (KVKK Art. 11/b),"],
              ["To learn the purpose of processing and whether it is used in accordance with its purpose (KVKK Art. 11/c),"],
              ["To learn the third parties to whom your data has been transferred, if any, and the purpose of transfer (KVKK Art. 11/ç),"],
              ["To request rectification if the data is incomplete or incorrectly processed (KVKK Art. 11/d),"],
              ["To request the erasure or destruction of your data (KVKK Art. 11/e — the \"right to be forgotten\"),"],
              ["To request that rectification/erasure be notified to the third parties to whom the data has been transferred (KVKK Art. 11/f),"],
              ["To object to your data being analyzed exclusively by automated systems (KVKK Art. 11/g),"],
              ["To claim compensation for damage suffered as a result of unlawful processing (KVKK Art. 11/h),"],
              ["The rights of access, rectification, erasure, restriction of processing and data portability (GDPR Arts. 15–20),"],
              ["The right to object to automated decision-making and profiling (GDPR Art. 22),"],
              ["The right not to be \"sold\" or \"shared\" in respect of your personal information (CCPA),"],
              ["The right to lodge a complaint with a supervisory authority (KVKK Board — Türkiye; the relevant EU member state data protection authority — GDPR)."],
            ],
          },
          {
            type: "p",
            content: [
              "It should be noted that, because the content of your files is not processed or stored by us, most of these rights are not practically applicable to your file content (since no data is processed, there is no data to erase or transfer). If you wish to exercise your rights, you may submit your request through the contact details in Section 12.",
            ],
          },
        ],
      },
      {
        heading: ["10. Data Security"],
        blocks: [
          {
            type: "p",
            content: [
              "Because your files never leave your device, the security of your file content depends largely on the security of your device and browser. On the site side, end-to-end encryption (HTTPS/TLS) is used during data transmission, browser security measures (CSP, HSTS, X-Frame-Options, etc.) are applied, and abuse attempts are monitored. Nevertheless, you acknowledge that no transmission method is 100% secure.",
            ],
          },
        ],
      },
      {
        heading: ["11. Children's Privacy"],
        blocks: [
          {
            type: "p",
            content: [
              "Our site is intended for general use and we do not knowingly collect information from users under the age of 18 (or under the age of 16 under the GDPR and CCPA). Our file conversion services are not directed at children. If a parent or guardian believes that their child has shared data through the site in any way, they may contact us.",
            ],
          },
        ],
      },
      {
        heading: ["12. Contact and Requests"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "You may contact us with any questions, requests or complaints regarding this policy or our data processing practices. When you submit a request together with information that verifies your identity in accordance with Article 13 of the KVKK, it will be responded to within the statutory period of no more than ",
              { text: "30 (thirty) days", bold: true },
              ":",
            ],
          },
          {
            type: "contact",
            title: "Data Controller",
            lines: [
              ["CONVRS — Mustafa İnci"],
              [
                "Email: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "KVKK complaint: Turkish Data Protection Authority — ",
                { text: "www.kvkk.gov.tr", url: links.kvkk, external: true },
              ],
              ["GDPR complaint: The data protection authority (DPA) of the relevant country"],
              [
                "CCPA/California: ",
                { text: "California Attorney General", url: links.caAttorney, external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["13. Changes to This Policy"],
        blocks: [
          {
            type: "p",
            content: [
              "We may update this privacy policy from time to time. In the event of significant changes, the \"Last updated\" date at the top of the page will be updated. Your continued use of the service after changes take effect constitutes acceptance of the updated policy. If a change affects the way your files are processed when it enters into force, we will inform you in advance wherever reasonably possible.",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── DEUTSCH ───────────────
  de: {
    eyebrow: "Rechtliches",
    title: "Datenschutzrichtlinie",
    updatedLabel: "Zuletzt aktualisiert:",
    updatedDate: "5. September 2026",
    scope: "Gültig für: https://convrs.org — KVKK · DSGVO · CCPA-konform",
    note: {
      type: "note",
      tone: "success",
      title: "Ihre Privatsphäre hat für uns Priorität",
      content: [
        {
          text: "Alle Dateikonvertierungen erfolgen zu 100 % in Ihrem Browser (Client-seitig). Ihre Dateien und deren Inhalte werden niemals auf einen Server hochgeladen, gespeichert, zur Verarbeitung übertragen oder an Dritte weitergegeben.",
        },
      ],
    },
    intro: [
      [
        "Als Convrs (",
        { text: "wir", bold: true },
        ", ",
        { text: "uns", bold: true },
        " oder ",
        { text: "unser Dienst", bold: true },
        ") legen wir großen Wert auf den Schutz Ihrer personenbezogenen Daten. Diese Richtlinie erläutert, welche Informationen bei der Nutzung unserer Website und unserer Dateikonvertierungstools verarbeitet werden, wie sie verarbeitet werden und welche Rechte Ihnen hierbei zustehen — im Einklang mit dem türkischen Gesetz Nr. 6698 zum Schutz personenbezogener Daten (",
        { text: "KVKK", bold: true },
        "), der Datenschutz-Grundverordnung der Europäischen Union (",
        { text: "DSGVO", bold: true },
        "), dem California Consumer Privacy Act (",
        { text: "CCPA", bold: true },
        ") sowie allen weiteren geltenden nationalen und internationalen Datenschutzvorschriften.",
      ],
    ],
    sections: [
      {
        heading: ["1. Verantwortliche Stelle (Data Controller)"],
        blocks: [
          {
            type: "p",
            content: [
              "Verantwortlicher für die auf dieser Website verarbeiteten begrenzten Daten ist die natürliche Person ",
              { text: "Mustafa İnci", bold: true },
              ", die den Dienst unter der Marke ",
              { text: "CONVRS", bold: true },
              " betreibt. Für sämtliche Anfragen gemäß Art. 10 KVKK, Art. 13 DSGVO und CCPA können Sie die folgenden Kontaktangaben verwenden:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "E-Mail: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "Website: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. Verarbeitete Daten und Verarbeitungstätigkeiten"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "erhebt und verarbeitet zum Zweck der Dateikonvertierung keine personenbezogenen Daten.", bold: true },
              " Die Dateien, die Sie in unsere Konvertierungstools hochladen oder mit diesen erzeugen, sowie deren Inhalte verlassen niemals Ihr Gerät. Selbst wenn der Inhalt einer von Ihnen verarbeiteten Datei ",
              { text: "personenbezogene Daten", bold: true },
              " darstellt, werden diese Daten von uns nicht verarbeitet, eingesehen, kopiert oder gespeichert.",
            ],
          },
          {
            type: "p",
            content: [
              "Die folgende Tabelle fasst die begrenzten Informationen zusammen, die im Zusammenhang mit dem Betrieb und der Qualitätsmessung der Website verarbeitet werden können. Keine davon identifiziert Sie direkt oder wird mit dem Inhalt Ihrer Dateien verknüpft:",
            ],
          },
          {
            type: "table",
            columns: ["Datenkategorie", "Zweck", "Rechtsgrundlage"],
            rows: [
              [
                "Design- und Cookie-Präferenz",
                "Website-Erlebnis (localStorage)",
                "Berechtigtes Interesse (KVKK Art. 5/2-f; DSGVO Art. 6/1-f)",
              ],
              [
                "Anonymisierte Nutzungsstatistiken",
                "Website-Leistungsanalyse (Google Analytics)",
                "Einwilligung (Cookie-Akzeptanz) — DSGVO Art. 6/1-a, KVKK Art. 5/1",
              ],
              [
                "Werbebestandsdaten",
                "Anzeigenschaltung (Google AdSense)",
                "Einwilligung — DSGVO Art. 6/1-a, KVKK Art. 5/1",
              ],
            ],
          },
        ],
      },
      {
        heading: ["3. Garantie der clientseitigen Dateiverarbeitung"],
        blocks: [
          {
            type: "p",
            content: [
              "Alle Konvertierungsvorgänge werden von JavaScript ausgeführt, das direkt in Ihrem eigenen Browser und auf Ihrem eigenen Gerät läuft. Ihre Dateien werden niemals hochgeladen, gespeichert, zur Verarbeitung übertragen oder an Dritte weitergegeben. Nach Abschluss einer Konvertierung verbleiben Ihre Dateien auf Ihrem Gerät und werden endgültig gelöscht, wenn Sie die Seite schließen oder Ihren Browser bereinigen.",
            ],
          },
          {
            type: "p",
            content: [
              "Einige Tools (z. B. Video- und Audiokonverter) verwenden WebAssembly/WASM-Engines, die im Browser laufen (z. B. FFmpeg.wasm). Auch diese Engines arbeiten ausschließlich im Arbeitsspeicher und mit der Rechenleistung Ihres Geräts und senden niemals Daten an einen externen Server. Diese technische Architektur bedeutet, dass weder die Website noch ihr Hosting-Anbieter jemals auf den Inhalt Ihrer Dateien zugreifen kann.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Hinweis zur Datensicherung:", bold: true },
              " Da Konvertierungen auf Ihrem Gerät ausgeführt werden, kann es zu Datenverlust kommen, wenn Ihr Gerät herunterfährt, Ihr Browser abstürzt oder der Arbeitsspeicher nicht ausreicht. Wir empfehlen daher nachdrücklich, stets Originalkopien Ihrer wichtigen Dateien aufzubewahren; wir haften nicht für Verluste, die andernfalls eintreten können (siehe Nutzungsbedingungen — Haftungsausschluss).",
            ],
          },
        ],
      },
      {
        heading: ["4. Browser-Speicher (localStorage) und Cookies"],
        blocks: [
          {
            type: "p",
            content: [
              "Die Website kann die folgenden Browser-Speicherbereiche (localStorage) verwenden, die ausschließlich auf Ihrem Gerät gespeichert sind und es niemals verlassen:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Cookie-Einwilligungspräferenz", bold: true },
                ' (',
                { text: "convrs-cookie-consent", code: true },
                "): dient zum Speichern Ihrer Cookie-Akzeptanzpräferenz.",
              ],
              [
                { text: "Design-Präferenz", bold: true },
                ": dient zum Speichern Ihrer Auswahl für das helle/dunkle Design.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Diese Daten verlassen niemals Ihr Gerät; Sie können sie jederzeit über Ihre Browsereinstellungen löschen. Die Kernfunktionen zur Dateikonvertierung hängen nicht von diesen Speicherbereichen ab; das Löschen beeinträchtigt die Funktionalität nicht.",
            ],
          },
          {
            type: "p",
            content: [
              "Nähere Informationen zu Arten, Zwecken und Verwaltung von Cookies und Drittanbieter-Cookies (analytisch und werblich) finden Sie in unserer ",
              { text: "Cookie-Richtlinie", url: "/cookie-policy", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["5. Google Analytics und Google AdSense"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "Google Analytics:", bold: true },
              " Wir verwenden Google Analytics, um zu verstehen, wie unsere Website genutzt wird, und um das Website-Erlebnis zu verbessern. Google Analytics erhebt anonymisierte und aggregierte Verkehrsstatistiken wie Seitenaufrufe, Sitzungsdauer, ungefähre geografische Region und Browser-/Gerätetyp. Diese Daten identifizieren Sie nicht persönlich, und der Inhalt der von Ihnen konvertierten Dateien ist ",
              { text: "niemals", bold: true },
              " in den von Google Analytics verarbeiteten Daten enthalten. Google Analytics erhebt cookie-basierte Analysedaten nur, wenn Sie Cookies akzeptieren. Vorher ist das Einwilligungssignal 'denied', sodass die Verarbeitung auf cookie-lose und anonymisierte Daten beschränkt ist. Einzelheiten zur Datennutzung durch Google finden Sie in der ",
              { text: "Google-Datenschutzerklärung", url: links.googlePrivacy, external: true },
              ".",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Google AdSense:", bold: true },
              " Wir verwenden Google AdSense zur Anzeigenschaltung. AdSense kann Cookies (einschließlich Drittanbieter-Cookies) verwenden, um Anzeigen zu schalten und die Werbeleistung zu messen. Wenn Sie Cookies nicht akzeptieren (oder Ihre Einwilligung zurückziehen), werden nur nicht personalisierte (Limited Ads) Anzeigen geschaltet; diese Anzeigen werden nicht auf der Grundlage Ihres Browserverlaufs gezielt ausgerichtet. Personalisierte Werbung wird nur aktiviert, wenn Sie Cookies akzeptiert haben. Sie können die Personalisierung von Werbung jederzeit über ",
              { text: "Google Anzeigeneinstellungen", url: links.googleAdsSettings, external: true },
              " verwalten oder deaktivieren. Informationen darüber, wie Google zusammen mit Partner-Websites Daten verwendet, finden Sie unter ",
              { text: "Googles Nutzung von Werbedaten", url: links.googlePartnerSites, external: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["6. Dienste und Links von Dritten"],
        blocks: [
          {
            type: "p",
            content: [
              "Da sämtliche Dateikonvertierungen vollständig auf Ihrem Gerät erfolgen, wird der Inhalt der von Ihnen hochgeladenen oder erzeugten Dateien niemals an einen Drittanbieterdienst übertragen. Die Website kann Links zu den folgenden Diensten Dritter enthalten:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Buy Me a Coffee", bold: true },
                " (Spendenplattform): Spendenvorgänge und alle auf dieser Plattform geteilten Informationen unterliegen der ",
                { text: "Datenschutzrichtlinie von Buy Me a Coffee", url: links.bmcPrivacy, external: true },
                ". Sobald Sie zur Spendenseite weitergeleitet werden, werden Ihre Daten direkt mit dieser Plattform geteilt, nicht mit uns.",
              ],
              [
                { text: "Google (Analytics / AdSense)", bold: true },
                ": wie in Abschnitt 5 beschrieben.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Wir haben keine Kontrolle über und keine Verantwortung für die Inhalte und Datenschutzpraktiken von Websites Dritter, auf die verlinkt wird. In dem Moment, in dem Sie die Website verlassen und auf eine Plattform eines Dritten zugreifen, gelten deren eigene Datenschutzrichtlinie und Nutzungsbedingungen; alle Datensicherheits- und rechtlichen Verantwortlichkeiten in diesem Zusammenhang liegen vollständig bei Ihnen und der betreffenden Plattform eines Dritten.",
            ],
          },
        ],
      },
      {
        heading: ["7. Konkludente und ausdrückliche Einwilligung"],
        blocks: [
          {
            type: "p",
            content: [
              "Durch die Nutzung dieser Website erklären Sie, dass Sie diese Datenschutzrichtlinie, die ",
              { text: "Nutzungsbedingungen", url: "/terms-of-service", internal: true },
              " und die ",
              { text: "Cookie-Richtlinie", url: "/cookie-policy", internal: true },
              " gelesen haben und ihnen vollständig zustimmen. Ihre ausdrückliche Einwilligung in die auf der Website verarbeiteten technischen Daten gilt mit dem Klicken auf die Schaltfläche zur Cookie-Akzeptanz als erteilt; Ihre Zustimmung zu diesen Richtlinien gilt mit der fortgesetzten Nutzung der Website als erteilt (konkludente Einwilligung).",
            ],
          },
          {
            type: "p",
            content: [
              "Sie können Ihre Einwilligung jederzeit widerrufen. Der Widerruf berührt die Rechtmäßigkeit der auf Grundlage der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht. Sie können Ihre Cookie-Einwilligung über Ihre Browsereinstellungen und die in der ",
              { text: "Cookie-Richtlinie", url: "/cookie-policy", internal: true },
              " genannten Werkzeuge verwalten.",
            ],
          },
        ],
      },
      {
        heading: ["8. Allgemeine Bedingungen der Datenverarbeitung"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "Übermittlung ins Ausland:", bold: true },
              " Die verarbeiteten begrenzten technischen Daten können über Dienste von Google (mit Sitz in den USA) verarbeitet werden. Google ist im Rahmen des für die DSGVO anerkannten Angemessenheitsbeschlusses (EU-US Data Privacy Framework — DPF) zertifiziert; zusätzlich gelten die Standardvertragsklauseln (SCC) der Europäischen Kommission. Für Übermittlungen ins Ausland im Sinne von Art. 9 KVKK werden die erforderlichen Garantien bereitgestellt.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Aufbewahrungsfristen:", bold: true },
              " Ihre Dateien werden niemals auf einem Server gespeichert. Präferenzen in Ihrem Browser-Speicher verbleiben auf Ihrem Gerät, bis Sie sie löschen. Anonymisierte Verkehrsstatistiken werden von Google gemäß dessen eigenen Aufbewahrungsrichtlinien (standardmäßig höchstens 14 Monate) aufbewahrt.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Protokolldaten:", bold: true },
              " Serverseitig können ausschließlich zur technischen Sicherheit und zur Verhinderung von Missbrauch standardmäßige Zugriffsprotokolle (IP-Adresse, Browsertyp, Zugriffszeitpunkt und angeforderte Seite) geführt werden. Diese Protokolle enthalten niemals den Inhalt Ihrer Dateien, werden nur kurz aufbewahrt und niemals zu kommerziellen Zwecken an Dritte weitergegeben.",
            ],
          },
        ],
      },
      {
        heading: ["9. Ihre Rechte (KVKK Art. 11 · DSGVO Art. 15–22 · CCPA)"],
        blocks: [
          {
            type: "p",
            content: ["Nach geltendem Recht stehen Ihnen folgende Rechte zu:"],
          },
          {
            type: "list",
            items: [
              ["Auskunft, ob personenbezogene Daten verarbeitet werden (KVKK Art. 11/a),"],
              ["Information, sofern Daten verarbeitet wurden (KVKK Art. 11/b),"],
              ["Kenntnis des Verarbeitungszwecks und ob die Daten zweckgemäß verwendet werden (KVKK Art. 11/c),"],
              ["Kenntnis der Dritten, an die Daten — falls vorhanden — übermittelt wurden, sowie des Übermittlungszwecks (KVKK Art. 11/ç),"],
              ["Berichtigung unvollständiger oder fehlerhaft verarbeiteter Daten (KVKK Art. 11/d),"],
              ["Löschung oder Vernichtung der Daten (KVKK Art. 11/e — das \"Recht auf Vergessenwerden\"),"],
              ["Unterrichtung der Dritten, an die Daten übermittelt wurden, über Berichtigung/Löschung (KVKK Art. 11/f),"],
              ["Widerspruch gegen eine ausschließlich automatisierte Analyse der Daten (KVKK Art. 11/g),"],
              ["Schadensersatz bei durch die Verarbeitung entstandenem Schaden (KVKK Art. 11/h),"],
              ["Das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit (DSGVO Art. 15–20),"],
              ["Das Recht auf Widerspruch gegen automatisierte Entscheidungsfindung und Profiling (DSGVO Art. 22),"],
              ["Das Recht, dass Ihre personenbezogenen Informationen nicht \"verkauft\" oder \"geteilt\" werden (CCPA),"],
              ["Das Recht auf Beschwerde bei einer Aufsichtsbehörde (KVKK-Rat — Türkei; die zuständige Datenschutzbehörde des betreffenden EU-Mitgliedstaats — DSGVO)."],
            ],
          },
          {
            type: "p",
            content: [
              "Es ist wichtig anzumerken, dass die meisten dieser Rechte auf den Inhalt Ihrer Dateien praktisch nicht anwendbar sind, da dieser von uns nicht verarbeitet oder gespeichert wird (da keine Daten verarbeitet werden, gibt es auch keine zu löschenden oder zu übertragenden Daten). Sofern Sie Ihre Rechte geltend machen möchten, können Sie Ihr Anliegen über die in Abschnitt 12 genannten Kontaktangaben übermitteln.",
            ],
          },
        ],
      },
      {
        heading: ["10. Datensicherheit"],
        blocks: [
          {
            type: "p",
            content: [
              "Da Ihre Dateien Ihr Gerät niemals verlassen, hängt die Sicherheit Ihrer Dateiinhalte weitgehend von der Sicherheit Ihres Geräts und Browsers ab. Auf der Website werden bei der Datenübertragung Ende-zu-Ende-Verschlüsselung (HTTPS/TLS) verwendet, Browser-Sicherheitsmaßnahmen (CSP, HSTS, X-Frame-Options usw.) angewendet und Missbrauchsversuche überwacht. Dennoch erkennen Sie an, dass keine Übertragungsmethode zu 100 % sicher ist.",
            ],
          },
        ],
      },
      {
        heading: ["11. Datenschutz von Kindern"],
        blocks: [
          {
            type: "p",
            content: [
              "Unsere Website richtet sich an die allgemeine Öffentlichkeit und wir erheben wissentlich keine Informationen von Nutzern unter 18 Jahren (bzw. unter 16 Jahren im Sinne der DSGVO und des CCPA). Unsere Dateikonvertierungsdienste richten sich bewusst nicht an Kinder. Sollten Eltern oder Erziehungsberechtigte glauben, dass ein Kind auf irgendeine Weise Daten über die Website geteilt hat, können sie uns kontaktieren.",
            ],
          },
        ],
      },
      {
        heading: ["12. Kontakt und Anfragen"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "Sie können uns bei Fragen, Anträgen oder Beschwerden zu dieser Richtlinie oder unseren Datenverarbeitungspraktiken kontaktieren. Wenn Sie Ihren Antrag gemäß Art. 13 KVKK zusammen mit Informationen übermitteln, die Ihre Identität bestätigen, wird er innerhalb der gesetzlichen Frist von höchstens ",
              { text: "30 (dreißig) Tagen", bold: true },
              " beantwortet:",
            ],
          },
          {
            type: "contact",
            title: "Verantwortliche Stelle",
            lines: [
              ["CONVRS — Mustafa İnci"],
              [
                "E-Mail: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "KVKK-Beschwerde: Türkische Datenschutzbehörde — ",
                { text: "www.kvkk.gov.tr", url: links.kvkk, external: true },
              ],
              ["DSGVO-Beschwerde: Die Datenschutzbehörde (DPA) des betreffenden Landes"],
              [
                "CCPA/Kalifornien: ",
                { text: "California Attorney General", url: links.caAttorney, external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["13. Änderungen dieser Richtlinie"],
        blocks: [
          {
            type: "p",
            content: [
              "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Bei wesentlichen Änderungen wird das Datum \"Zuletzt aktualisiert\" am oberen Rand der Seite angepasst. Durch die fortgesetzte Nutzung des Dienstes nach Inkrafttreten der Änderungen akzeptieren Sie die aktualisierte Richtlinie. Falls eine Änderung die Art der Verarbeitung Ihrer Dateien beeinflusst, werden Sie, soweit dies zumutbar möglich ist, vorab informiert.",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ESPAÑOL ───────────────
  es: {
    eyebrow: "Legal",
    title: "Política de Privacidad",
    updatedLabel: "Última actualización:",
    updatedDate: "5 de septiembre de 2026",
    scope: "Válido para: https://convrs.org — conforme a KVKK · RGPD · CCPA",
    note: {
      type: "note",
      tone: "success",
      title: "Su privacidad es nuestra prioridad",
      content: [
        {
          text: "Todas las operaciones de conversión de archivos se realizan 100 % en su navegador (del lado del cliente). Sus archivos y su contenido nunca se suben a ningún servidor, no se almacenan, transmiten para su procesamiento ni se comparten con terceros.",
        },
      ],
    },
    intro: [
      [
        "Convrs (",
        { text: "nosotros", bold: true },
        ", ",
        { text: "nos", bold: true },
        " o ",
        { text: "nuestro servicio", bold: true },
        ") concede gran importancia a la protección de sus datos personales. Esta política explica qué información se procesa cuando utiliza nuestro sitio web y nuestras herramientas de conversión de archivos, cómo se procesa y cuáles son sus derechos al respecto, de conformidad con la Ley turca n.º 6698 sobre Protección de Datos Personales (",
        { text: "KVKK", bold: true },
        "), el Reglamento General de Protección de Datos de la Unión Europea (",
        { text: "RGPD", bold: true },
        "), la Ley de Privacidad del Consumidor de California (",
        { text: "CCPA", bold: true },
        ") y toda la demás legislación nacional e internacional de protección de datos aplicable.",
      ],
    ],
    sections: [
      {
        heading: ["1. Responsable del Tratamiento"],
        blocks: [
          {
            type: "p",
            content: [
              "El responsable del tratamiento de los datos limitados procesados en este sitio es la persona física ",
              { text: "Mustafa İnci", bold: true },
              ", que presta el servicio bajo la marca ",
              { text: "CONVRS", bold: true },
              ". Puede utilizar los datos de contacto siguientes para cualquier solicitud de conformidad con el art. 10 de la KVKK, el art. 13 del RGPD y la CCPA:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Correo electrónico: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "Sitio web: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["2. Datos Procesados y Actividades de Tratamiento"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "no recoge ni procesa ningún dato personal", bold: true },
              " con el fin de la conversión de archivos. Los archivos que suba o genere con nuestras herramientas de conversión, así como su contenido, nunca salen de su dispositivo. Por tanto, incluso si el contenido de un archivo que procesa constituye ",
              { text: "datos personales", bold: true },
              ", dichos datos no son procesados, visualizados, copiados ni almacenados por nosotros.",
            ],
          },
          {
            type: "p",
            content: [
              "La siguiente tabla resume la información limitada que puede procesarse en relación con el funcionamiento del sitio y la medición de su calidad. Ninguna de ellas le identifica directamente ni se vincula al contenido de sus archivos:",
            ],
          },
          {
            type: "table",
            columns: ["Categoría de datos", "Finalidad", "Base jurídica"],
            rows: [
              [
                "Preferencia de tema y de cookies",
                "Experiencia del sitio (localStorage)",
                "Interés legítimo (KVKK art. 5/2-f; RGPD art. 6/1-f)",
              ],
              [
                "Estadísticas de uso anonimizadas",
                "Análisis de rendimiento del sitio (Google Analytics)",
                "Consentimiento (aceptación de cookies) — RGPD art. 6/1-a, KVKK art. 5/1",
              ],
              [
                "Datos de inventario publicitario",
                "Publicación de anuncios (Google AdSense)",
                "Consentimiento — RGPD art. 6/1-a, KVKK art. 5/1",
              ],
            ],
          },
        ],
      },
      {
        heading: ["3. Garantía de Procesamiento de Archivos del Lado del Cliente"],
        blocks: [
          {
            type: "p",
            content: [
              "Todas las operaciones de conversión se realizan mediante JavaScript que se ejecuta directamente en su propio navegador y en su propio dispositivo. Sus archivos nunca se suben, almacenan, transmiten para su procesamiento ni se comparten con terceros. Una vez completada una conversión, sus archivos permanecen en su dispositivo y se eliminan definitivamente cuando cierra la página o borra su navegador.",
            ],
          },
          {
            type: "p",
            content: [
              "Algunas herramientas (p. ej., convertidores de vídeo y audio) utilizan motores WebAssembly/WASM que se ejecutan en el navegador (p. ej., FFmpeg.wasm). Estos motores también funcionan únicamente en la memoria y con la potencia de procesamiento de su dispositivo y nunca envían datos a un servidor externo. Esta arquitectura técnica significa que ni el sitio ni su proveedor de alojamiento pueden acceder jamás al contenido de sus archivos en ninguna fase.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Advertencia sobre copias de seguridad:", bold: true },
              " Dado que las conversiones se ejecutan en su dispositivo, puede producirse una pérdida de datos si el dispositivo se apaga, el navegador se bloquea o la memoria es insuficiente. Por ello le recomendamos encarecidamente que conserve siempre copias originales de sus archivos importantes; no nos hacemos responsables de ninguna pérdida que pueda producirse de otro modo (véase Condiciones de Uso — Exención de responsabilidad).",
            ],
          },
        ],
      },
      {
        heading: ["4. Almacenamiento del Navegador (localStorage) y Cookies"],
        blocks: [
          {
            type: "p",
            content: [
              "El sitio puede utilizar las siguientes áreas de almacenamiento del navegador (localStorage), que solo se guardan en su dispositivo y nunca lo abandonan:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Preferencia de consentimiento de cookies", bold: true },
                ' (',
                { text: "convrs-cookie-consent", code: true },
                "): se utiliza para recordar su preferencia de aceptación de cookies.",
              ],
              [
                { text: "Preferencia de tema", bold: true },
                ": se utiliza para recordar su selección de tema claro/oscuro.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Estos datos nunca salen de su dispositivo; puede eliminarlos en cualquier momento desde la configuración de su navegador. Las funciones básicas de conversión del sitio no dependen de estas áreas de almacenamiento; su eliminación no afecta a la funcionalidad.",
            ],
          },
          {
            type: "p",
            content: [
              "Para obtener información detallada sobre los tipos, finalidades y gestión de las cookies y de las cookies de terceros (analíticas y publicitarias), consulte nuestra ",
              { text: "Política de Cookies", url: "/cookie-policy", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["5. Google Analytics y Google AdSense"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "Google Analytics:", bold: true },
              " Utilizamos Google Analytics para entender cómo se utiliza nuestro sitio y mejorar la experiencia. Google Analytics recopila estadísticas de tráfico anonimizadas y agregadas, como vistas de página, duración de la sesión, región geográfica aproximada y tipo de navegador/dispositivo. Estos datos no le identifican personalmente, y el contenido de los archivos que convierte ",
              { text: "nunca", bold: true },
              " se incluye en los datos procesados por Google Analytics. Google Analytics recopila datos analíticos basados en cookies solo si acepta las cookies. Antes de eso, la señal de consentimiento es 'denied' (denegado), por lo que el tratamiento se limita a datos sin cookies y anónimos. Para conocer los detalles sobre cómo utiliza Google los datos, consulte la ",
              { text: "Política de Privacidad de Google", url: links.googlePrivacy, external: true },
              ".",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Google AdSense:", bold: true },
              " Utilizamos Google AdSense para mostrar anuncios. AdSense puede utilizar cookies (incluidas cookies de terceros) para publicar anuncios y medir el rendimiento publicitario. Si no acepta las cookies (o retira su consentimiento), solo se muestran anuncios no personalizados (Limited Ads); estos anuncios no se orientan en función de su historial de navegación. La publicidad personalizada solo se activa si ha aceptado las cookies. Puede gestionar o desactivar la personalización de anuncios en cualquier momento a través de ",
              { text: "Configuración de anuncios de Google", url: links.googleAdsSettings, external: true },
              ". Para ver cómo utiliza Google los datos junto con los sitios de socios, revise ",
              { text: "el uso de datos publicitarios por parte de Google", url: links.googlePartnerSites, external: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["6. Servicios de Terceros y Enlaces"],
        blocks: [
          {
            type: "p",
            content: [
              "Dado que toda la conversión de archivos se realiza íntegramente en su dispositivo, el contenido de los archivos que sube o genera nunca se transmite a ningún servicio de terceros. El sitio puede contener enlaces a los siguientes servicios de terceros:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Buy Me a Coffee", bold: true },
                " (plataforma de donaciones): Las transacciones de donación y cualquier información que comparta en esta plataforma están sujetas a la ",
                { text: "Política de Privacidad de Buy Me a Coffee", url: links.bmcPrivacy, external: true },
                ". En cuanto se dirige a la página de donación, sus datos se comparten directamente con esa plataforma, no con nosotros.",
              ],
              [
                { text: "Google (Analytics / AdSense)", bold: true },
                ": como se describe en la sección 5.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "No tenemos ningún control sobre, ni responsabilidad por, el contenido y las prácticas de privacidad de los sitios de terceros a los que se enlaza. En el momento en que abandone el sitio y acceda a una plataforma de terceros, se aplicarán su propia política de privacidad y condiciones de uso; toda la responsabilidad de seguridad de datos y legal en este contexto recae íntegramente en usted y en la plataforma de terceros correspondiente.",
            ],
          },
        ],
      },
      {
        heading: ["7. Consentimiento Implícito y Consentimiento"],
        blocks: [
          {
            type: "p",
            content: [
              "Al utilizar este sitio, declara que ha leído y acepta plenamente esta Política de Privacidad, las ",
              { text: "Condiciones de Uso", url: "/terms-of-service", internal: true },
              " y la ",
              { text: "Política de Cookies", url: "/cookie-policy", internal: true },
              ". Su consentimiento explícito a los datos técnicos procesados en el sitio se considerará otorgado al hacer clic en el botón de aceptación de cookies, y su aceptación de estas políticas se considerará otorgada al continuar utilizando el sitio (consentimiento implícito).",
            ],
          },
          {
            type: "p",
            content: [
              "Puede retirar su consentimiento en cualquier momento. La retirada no afecta a la licitud del tratamiento basado en el consentimiento antes de su retirada. Puede gestionar su consentimiento de cookies a través de la configuración de su navegador y de las herramientas indicadas en la ",
              { text: "Política de Cookies", url: "/cookie-policy", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["8. Condiciones Generales de las Actividades de Tratamiento"],
        blocks: [
          {
            type: "p",
            content: [
              { text: "Transferencias internacionales:", bold: true },
              " Los datos técnicos limitados procesados pueden tratarse a través de los servicios de Google (con sede en EE. UU.). Google está certificado en el marco del régimen de adecuación reconocido en virtud del RGPD (Marco de Privacidad de Datos UE-EE. UU. — DPF); además, se aplican las Cláusulas Contractuales Tipo (SCC) de la Comisión Europea. Se proporcionan las garantías necesarias para las transferencias internacionales en el sentido del art. 9 de la KVKK.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Plazos de conservación:", bold: true },
              " Sus archivos nunca se almacenan en ningún servidor. Las preferencias en el almacenamiento de su navegador permanecen en su dispositivo hasta que las elimine. Las estadísticas de tráfico anonimizadas son conservadas por Google de acuerdo con sus propias políticas de conservación (por defecto, no más de 14 meses).",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Registros de acceso:", bold: true },
              " En el lado del servidor, únicamente con fines de seguridad técnica y prevención de abusos, pueden conservarse registros de acceso estándar (dirección IP, tipo de navegador, hora de acceso y página solicitada). Estos registros nunca contienen el contenido de sus archivos, solo se conservan brevemente y nunca se comparten con terceros con fines comerciales.",
            ],
          },
        ],
      },
      {
        heading: ["9. Sus Derechos (KVKK art. 11 · RGPD arts. 15-22 · CCPA)"],
        blocks: [
          {
            type: "p",
            content: ["Conforme a la legislación aplicable, usted tiene los siguientes derechos:"],
          },
          {
            type: "list",
            items: [
              ["A saber si sus datos personales están siendo tratados (KVKK art. 11/a),"],
              ["A solicitar información si han sido tratados (KVKK art. 11/b),"],
              ["A conocer la finalidad del tratamiento y si se utilizan conforme a dicha finalidad (KVKK art. 11/c),"],
              ["A conocer los terceros a quienes se hayan transferido sus datos, en su caso, y la finalidad de la transferencia (KVKK art. 11/ç),"],
              ["A solicitar la rectificación si los datos son incompletos o se tratan incorrectamente (KVKK art. 11/d),"],
              ["A solicitar la supresión o destrucción de sus datos (KVKK art. 11/e — el \"derecho al olvido\"),"],
              ["A solicitar que la rectificación/supresión se notifique a los terceros a quienes se hayan transferido los datos (KVKK art. 11/f),"],
              ["A oponerse a que sus datos sean analizados exclusivamente por sistemas automatizados (KVKK art. 11/g),"],
              ["A reclamar la indemnización de los daños sufridos por el tratamiento ilícito (KVKK art. 11/h),"],
              ["Los derechos de acceso, rectificación, supresión, limitación del tratamiento y portabilidad de datos (RGPD arts. 15-20),"],
              ["El derecho a oponerse a la toma de decisiones automatizada y a la elaboración de perfiles (RGPD art. 22),"],
              ["El derecho a que su información personal no sea \"vendida\" ni \"compartida\" (CCPA),"],
              ["El derecho a presentar una reclamación ante una autoridad de control (Junta de la KVKK — Turquía; la autoridad de protección de datos del Estado miembro de la UE correspondiente — RGPD)."],
            ],
          },
          {
            type: "p",
            content: [
              "Debe señalarse que, como el contenido de sus archivos no es procesado ni almacenado por nosotros, la mayoría de estos derechos no son prácticamente aplicables al contenido de sus archivos (como no se procesan datos, no hay datos que suprimir o transferir). Si desea ejercer sus derechos, puede presentar su solicitud a través de los datos de contacto de la sección 12.",
            ],
          },
        ],
      },
      {
        heading: ["10. Seguridad de los Datos"],
        blocks: [
          {
            type: "p",
            content: [
              "Como sus archivos nunca salen de su dispositivo, la seguridad de su contenido depende en gran medida de la seguridad de su dispositivo y navegador. En el sitio se utiliza cifrado de extremo a extremo (HTTPS/TLS) durante la transmisión de datos, se aplican medidas de seguridad del navegador (CSP, HSTS, X-Frame-Options, etc.) y se supervisan los intentos de abuso. No obstante, usted reconoce que ningún método de transmisión es 100 % seguro.",
            ],
          },
        ],
      },
      {
        heading: ["11. Privacidad de los Menores"],
        blocks: [
          {
            type: "p",
            content: [
              "Nuestro sitio está destinado al uso general y no recopilamos a sabiendas información de usuarios menores de 18 años (o menores de 16 años en virtud del RGPD y la CCPA). Nuestros servicios de conversión de archivos no están dirigidos a menores. Si un padre o tutor cree que un menor ha compartido datos a través del sitio de cualquier forma, puede ponerse en contacto con nosotros.",
            ],
          },
        ],
      },
      {
        heading: ["12. Contacto y Solicitudes"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "Puede ponerse en contacto con nosotros para cualquier pregunta, solicitud o reclamación sobre esta política o nuestras prácticas de tratamiento de datos. Cuando presente una solicitud junto con la información que verifique su identidad de conformidad con el art. 13 de la KVKK, se responderá dentro del plazo legal de no más de ",
              { text: "30 (treinta) días", bold: true },
              ":",
            ],
          },
          {
            type: "contact",
            title: "Responsable del Tratamiento",
            lines: [
              ["CONVRS — Mustafa İnci"],
              [
                "Correo electrónico: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
              [
                "Reclamación KVKK: Autoridad Turca de Protección de Datos — ",
                { text: "www.kvkk.gov.tr", url: links.kvkk, external: true },
              ],
              ["Reclamación RGPD: La autoridad de protección de datos (DPA) del país correspondiente"],
              [
                "CCPA/California: ",
                { text: "California Attorney General", url: links.caAttorney, external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["13. Cambios en esta Política"],
        blocks: [
          {
            type: "p",
            content: [
              "Podemos actualizar esta política de privacidad de vez en cuando. En caso de cambios significativos, se actualizará la fecha de \"Última actualización\" en la parte superior de la página. Su uso continuado del servicio después de que los cambios entren en vigor constituye la aceptación de la política actualizada. Si un cambio afecta a la forma en que se procesan sus archivos cuando entre en vigor, se le informará con antelación siempre que sea razonablemente posible.",
            ],
          },
        ],
      },
    ],
  },
};