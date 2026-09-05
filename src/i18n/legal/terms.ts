import type { LegalContent } from "./types";
import { links } from "./types";

export const termsContent: LegalContent = {
  // ─────────────── TÜRKÇE ───────────────
  tr: {
    eyebrow: "Legal",
    title: "Kullanım Şartları",
    updatedLabel: "Son güncelleme:",
    updatedDate: "5 Eylül 2026",
    scope: "Geçerli: https://convrs.org",
    note: {
      type: "note",
      tone: "warning",
      title: "Sorumluluk Reddi — Önemli Uyarı",
      content: [
        "Bu hizmet, yürürlükteki hukukun izin verdiği en geniş ölçüde, ",
        { text: "KULLANIMDAN DOĞABİLECEK HİÇBİR SORUMLULUĞU KABUL ETMEZ", underline: true },
        ". Hizmetin kullanımından kaynaklanabilecek veri kaybı, yazılımsal hata, dosya bozulması, maddi/manevi zarar, kesinti veya kâr kaybından geliştirici ",
        { text: "HİÇBİR ŞEKİLDE SORUMLU TUTULAMAZ", underline: true },
        ".",
      ],
    },
    intro: [
      [
        "Convrs (",
        { text: "hizmetimiz", bold: true },
        ", ",
        { text: "web sitemiz", bold: true },
        ", ",
        { text: "biz", bold: true },
        ") dosya dönüştürme araçlarını kullanmadan önce bu Kullanım Şartları'nı (",
        { text: "Şartlar", bold: true },
        ") dikkatlice okumanızı öneririz. Siteye erişerek, sayfaları görüntüleyerek veya hizmeti herhangi bir şekilde kullanarak; bu Şartlar'ı, ",
        { text: "Gizlilik Politikası", url: "/privacy-policy", internal: true },
        "'nı ve ",
        { text: "Çerez Politikası", url: "/cookie-policy", internal: true },
        "'nı okuduğunuzu ve bunlara tamamen ve koşulsuz olarak bağlı kalmayı kabul ettiğinizi beyan etmiş olursunuz. Bu Şartlar'ı kabul etmiyorsanız, siteyi kullanmayı derhal bırakmalısınız.",
      ],
    ],
    sections: [
      {
        heading: ["1. Hizmetin Tanımı"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs; görsel, belge, ses, video ve veri dosyalarını çeşitli formatlara dönüştürmenizi sağlayan, tamamen tarayıcı içinde (client-side) çalışan bir platformdur. Tüm dönüştürme işlemleri kullanıcının kendi cihazında gerçekleştirilir; dosyalar hiçbir sunucuya yüklenmez veya depolanmaz. Hizmet ücretsiz olarak sunulur ve dönüştürme sayısı ile kullanım süresi üzerinde şu an için bir sınırlama yoktur; ancak hizmeti istediğimiz zaman değiştirme, askıya alma veya sonlandırma hakkımız saklıdır.",
            ],
          },
        ],
      },
      {
        heading: ["2. Kabul ve Zımni Rıza"],
        blocks: [
          {
            type: "p",
            content: [
              "Bu Şartlar, sitemizin ve tüm araçlarının kullanımını kapsar. Siteye ilk erişiminizle birlikte bu Şartlar yürürlüğe girer; ayrıca herhangi bir onay kutusunu işaretlemenize gerek olmaksızın, siteyi kullanmaya devam etmeniz bu Şartlar'ı kabul ettiğiniz anlamına gelir (zımni rıza). Siteyi yalnızca yasal amaçlarla ve bu Şartlar'a uygun şekilde kullanmayı kabul edersiniz.",
            ],
          },
          {
            type: "p",
            content: [
              "Dönüştürme araçlarımızı yasa dışı içerik üretmek, dağıtmak, saklamak; üçüncü kişilerin telif hakkı, marka hakkı, kişisel verileri veya diğer fikri mülkiyet haklarını ihlal etmek; kimlik hırsızlığı, dolandırıcılık, zararlı yazılım yaymak veya herhangi bir yasa dışı faaliyette bulunmak amacıyla kullanamazsınız. Hizmeti; ağ altyapısına, sunuculara veya başka kullanıcıların cihazlarına zarar verecek, aşırı yükleyecek veya kesintiye uğratacak şekilde kötüye kullanamazsınız.",
            ],
          },
        ],
      },
      {
        heading: ["3. Fikri Mülkiyet"],
        blocks: [
          {
            type: "p",
            content: [
              "Sitemizin ve tüm araçlarının tasarımı, düzeni, kullanıcı arayüzü, logosu, grafikleri, kaynak kodu, algoritmaları ve tüm içeriği Convrs'a aittir ve 5846 sayılı Fikri ve Sınai Haklar Kanunu ile uluslararası telif hakkı mevzuatı kapsamında korunmaktadır. Bu içerikler, kaynak kod ve yapılar, önceden yazılı izin alınmaksızın hiçbir şekilde kopyalanamaz, çoğaltılamaz, dağıtılamaz, yeniden yayınlanamaz, değiştirilemez, tersine mühendislik yöntemiyle çözümlenemez veya türev eser oluşturmak üzere kullanılamaz. Bu yükümlülüğe aykırı davranış, fikri mülkiyet ihlali teşkil eder ve aleyhinize yasal işlem başlatılmasına neden olabilir.",
            ],
          },
          {
            type: "p",
            content: [
              "Hizmeti kullanarak dönüştürdüğünüz dosyaların mülkiyeti ve sorumluluğu tamamen size aittir; bu dosyaların içeriği üzerinde hiçbir hak iddia etmiyoruz. Ancak hizmeti kullanarak, dönüştürdüğünüz içeriğin üçüncü kişilerin haklarını ihlal etmediğini ve bu içeriğin kullanımından doğabilecek her türlü yükümlülüğün size ait olduğunu kabul edersiniz.",
            ],
          },
        ],
      },
      {
        heading: ["4. Garanti Reddi (Disclaimer — \"AS IS\")"],
        blocks: [
          {
            type: "p",
            content: [
              "Hizmet, ",
              { text: "\"OLDUĞU GİBİ\" (AS IS) ve \"KULLANILABİLİR OLDUĞU KADARIYLA\" (AS AVAILABLE)", bold: true },
              " sunulmaktadır. Hizmetin kesintisiz, hatasız, güvenli, belirli bir amaca uygun veya belirli bir sonucu garanti edeceğine dair açık veya zımni, yazılı veya sözlü hiçbir garanti verilmez. İşlemler cihazınızın tarayıcısında gerçekleştiğinden, dönüştürme kalitesi, hızı ve sonuçları cihazınızın donanımına, tarayıcınıza, belleğine ve internet bağlantınıza bağlı olarak değişebilir.",
            ],
          },
          {
            type: "p",
            content: [
              "Dönüştürülen dosyaların orijinal dosyanıza tamamen eşit olacağını, bozulmadan korunacağını, kaybolmayacağını veya herhangi bir özel amaç için uygun olacağını garanti etmeyiz. Özellikle; büyük dosyalarda tarayıcı belleğinin (RAM) yetmemesi, tarayıcının çökmesi, sayfanın kapanması veya güç kesintisi nedeniyle veri kaybı yaşanabilir. Bu gibi durumlarda oluşabilecek kayıplar için hiçbir sorumluluğumuz yoktur. Önemli dosyalarınızın her zaman orijinal bir kopyasını saklamanız şiddetle önerilir.",
            ],
          },
        ],
      },
      {
        heading: ["5. Sorumluluğun Sınırlandırılması (Limitation of Liability)"],
        blocks: [
          {
            type: "p",
            content: [
              "Yürürlükteki hukukun izin verdiği en geniş ölçüde; hizmetin kullanımından veya kullanılamamasından, hizmete erişimde yaşanan kesintilerden, hizmetteki yazılımsal hatalardan, dosya bozulmalarından veya veri kaybından kaynaklanan ",
              { text: "doğrudan, dolaylı, arızi, özel, cezai veya sonuç olarak ortaya çıkan hiçbir zarardan", bold: true },
              " (kâr kaybı, iş kesintisi, itibar kaybı, veri kaybı veya diğer maddi/manevi zararlar dâhil) biz, çalışanlarımız, yüklenicilerimiz ve hizmet sağlayıcılarımız sorumlu tutulamaz.",
            ],
          },
          {
            type: "p",
            content: ["Hizmeti kullanarak, özellikle şu riskleri kabul etmiş olursunuz:"],
          },
          {
            type: "list",
            items: [
              [
                "Dönüştürme işlemlerinin cihazınızda gerçekleşmesi nedeniyle cihazınızın veya tarayıcınızın performansının etkilenmesi, belleğinin dolması veya çökmesi,",
              ],
              [
                "Dönüştürülen dosyaların içeriğinin, kalitesinin veya uyumluluğunun beklediğinizden farklı olması ya da bozulması,",
              ],
              [
                "İşlem sırasında güç kesintisi, ağ hatası, tarayıcı çökmesi veya sistem hatası nedeniyle geri döndürülemez veri kaybı yaşanması,",
              ],
              [
                "Üçüncü taraf bağlantılarına (bağış, reklam, analitik vb.) yönlendirilmeniz durumunda bu platformlarda yaşanabilecek veri güvenliği sorunları.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Herhangi bir nedenle yükümlülüğümüzün doğduğu kabul edilse dahi, toplam sorumluluğumuz söz konusu zararın doğduğu olaydan önceki 12 (on iki) ay içinde hizmetten elde ettiğimiz toplam geliri (bu gelir sıfırsa sıfırı) aşamaz.",
            ],
          },
        ],
      },
      {
        heading: ["6. Üçüncü Taraf Bağlantıları ve Hizmetleri"],
        blocks: [
          {
            type: "p",
            content: [
              "Site, üçüncü taraf platformlara (ör. \"Buy Me a Coffee\" bağış platformu) ve Google tarafından sunulan reklam/analitik hizmetlerine bağlantılar içerebilir. Bu bağlantılar yalnızca kullanıcının kolaylığı için sunulur ve bu üçüncü taraf sitelerin içerikleri, ürünleri, hizmetleri, gizlilik uygulamaları veya güvenlik önlemleri üzerinde hiçbir denetimimiz ve sorumluluğumuz yoktur.",
            ],
          },
          {
            type: "p",
            content: [
              "Siteden ayrılarak bir üçüncü taraf platforma eriştiğiniz anda, o platformun kendi kullanım şartları ve gizlilik politikası geçerli olur. Bu platformlarda paylaştığınız her türlü bilgi, ödeme verisi veya diğer verilerin güvenliği ve bunlardan doğabilecek hukuki sorumluluk ",
              { text: "tamamen sizde ve ilgili üçüncü taraf platformdadır", bold: true },
              ". Bağış yaptığınız \"Buy Me a Coffee\" gibi platformlardaki ödemeler ve veri işleme faaliyetleri bizim denetimimiz dışındadır; bu kapsamda herhangi bir sorumluluk kabul etmeyiz.",
            ],
          },
        ],
      },
      {
        heading: ["7. Yürürlük, Değişiklikler ve Fesih"],
        blocks: [
          {
            type: "p",
            content: [
              "Bu Şartlar, siteye ilk erişiminizle birlikte yürürlüğe girer. Bu Şartlar'ı zaman zaman güncelleyebiliriz; değişiklikler yayınlandığı anda yürürlüğe girer ve sitemizi kullanmaya devam etmeniz, güncellenmiş Şartlar'ı kabul ettiğiniz anlamına gelir. Önemli değişiklikler, sayfanın üst kısmındaki \"Son güncelleme\" tarihi ile belirtilir.",
            ],
          },
          {
            type: "p",
            content: [
              "Hizmeti kullanma izninizi, bu Şartlar'a aykırı davranmanız, yasa dışı faaliyette bulunmanız veya hizmetin bütünlüğünü tehdit etmeniz hâlinde, önceden bildirimde bulunmaksızın derhal sonlandırma hakkımız saklıdır. Hizmeti, tümünü veya bir kısmını, istediğimiz zaman ve herhangi bir sebeple, önceden bildirimde bulunmaksızın değiştirme, askıya alma veya kalıcı olarak sonlandırma hakkımız saklıdır; bu durumlardan doğabilecek zararlardan sorumlu değiliz.",
            ],
          },
        ],
      },
      {
        heading: ["8. Tazminat (Indemnification)"],
        blocks: [
          {
            type: "p",
            content: [
              "Hizmeti kullanımınızdan; bu Şartlar'a aykırılığınızdan; dönüştürdüğünüz dosyaların içeriğinden; üçüncü kişilerin haklarını (telif, marka, kişisel veri, gizlilik vb.) ihlal etmenizden veya yasa dışı faaliyetlerinizden kaynaklanan veya bunlarla bağlantılı her türlü iddia, talep, dava, zarar, yükümlülük ve makul avukat ücretleri dâhil masraflara karşı bizi, çalışanlarımızı ve hizmet sağlayıcılarımızı tazmin etmeyi ve savunmayı kabul edersiniz.",
            ],
          },
        ],
      },
      {
        heading: ["9. Geçerli Hukuk ve Uyuşmazlıkların Çözümü"],
        blocks: [
          {
            type: "p",
            content: [
              "Bu Şartlar ve bunlardan doğan tüm uyuşmazlıklar, Türkiye Cumhuriyeti hukukuna tabidir ve bu hukuk çerçevesinde yorumlanır. Uyuşmazlıkların çözümünde öncelikle ilgili tüketici hakem heyetleri ve mahkemeler yetkilidir; taraflar arasındaki uyuşmazlıklarda ",
              { text: "İstanbul Nöbetçi Asliye Ticaret ve/veya Tüketici Mahkemeleri", bold: true },
              " münhasıran yetkilidir.",
            ],
          },
          {
            type: "p",
            content: [
              "Bu Şartlar'ın herhangi bir hükmünün yetkili bir mahkeme tarafından geçersiz veya uygulanamaz sayılması hâlinde, diğer hükümler tamamen yürürlükte kalır. Bu Şartlar'dan doğan bir hakkı kullanmadığımız veya geç kullandığımız durumlar, bu haktan feragat anlamına gelmez.",
            ],
          },
        ],
      },
      {
        heading: ["10. Bütünlük ve Bölünebilirlik"],
        blocks: [
          {
            type: "p",
            content: [
              "Bu Şartlar, Gizlilik Politikası ve Çerez Politikası ile birlikte, hizmetin kullanımına ilişkin taraflar arasındaki tüm anlaşmayı oluşturur. Bu dokümanlardan herhangi birinin bir hükmünün geçersiz, yasa dışı veya uygulanamaz olması hâlinde, bu hüküm mümkün olan en yakın geçerli anlama gelecek şekilde yorumlanır ve diğer hükümler aynen yürürlükte kalır.",
            ],
          },
        ],
      },
      {
        heading: ["11. İletişim"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: ["Bu Şartlar veya hizmetimiz hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:"],
          },
          {
            type: "contact",
            title: "CONVRS — Mustafa İnci",
            lines: [
              [
                "E-posta: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ENGLISH ───────────────
  en: {
    eyebrow: "Legal",
    title: "Terms of Service",
    updatedLabel: "Last updated:",
    updatedDate: "September 5, 2026",
    scope: "Applicable to: https://convrs.org",
    note: {
      type: "note",
      tone: "warning",
      title: "Disclaimer — Important Notice",
      content: [
        "To the fullest extent permitted by applicable law, this service ",
        { text: "ACCEPTS NO LIABILITY WHATSOEVER ARISING FROM ITS USE", underline: true },
        ". The developer ",
        { text: "CANNOT BE HELD LIABLE IN ANY WAY", underline: true },
        " for any loss of data, software errors, file corruption, material or moral damage, interruption or loss of profit arising from the use of the service.",
      ],
    },
    intro: [
      [
        "Convrs (",
        { text: "our service", bold: true },
        ", ",
        { text: "our website", bold: true },
        ", ",
        { text: "we", bold: true },
        ") recommends that you read these Terms of Service (the ",
        { text: "Terms", bold: true },
        ") carefully before using our file conversion tools. By accessing the site, viewing its pages, or using the service in any way, you declare that you have read and agree to be fully and unconditionally bound by these Terms, the ",
        { text: "Privacy Policy", url: "/privacy-policy", internal: true },
        " and the ",
        { text: "Cookie Policy", url: "/cookie-policy", internal: true },
        ". If you do not accept these Terms, you must stop using the site immediately.",
      ],
    ],
    sections: [
      {
        heading: ["1. Description of the Service"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs is a fully browser-based (client-side) platform that allows you to convert image, document, audio, video and data files into various formats. All conversion operations are performed on the user's own device; files are never uploaded to or stored on any server. The service is offered free of charge and there is currently no limit on the number of conversions or the duration of use; however, we reserve the right to modify, suspend or terminate the service at any time.",
            ],
          },
        ],
      },
      {
        heading: ["2. Acceptance and Implied Consent"],
        blocks: [
          {
            type: "p",
            content: [
              "These Terms cover the use of our site and all of its tools. These Terms enter into force upon your first access to the site; moreover, without the need to tick any checkbox, your continued use of the site constitutes acceptance of these Terms (implied consent). You agree to use the site only for lawful purposes and in accordance with these Terms.",
            ],
          },
          {
            type: "p",
            content: [
              "You may not use our conversion tools to create, distribute or store unlawful content; to infringe the copyright, trademark rights, personal data or other intellectual property rights of third parties; to commit identity theft, fraud, the spreading of malware or any other unlawful activity. You may not misuse the service in any way that damages, overloads or disrupts the network infrastructure, servers or the devices of other users.",
            ],
          },
        ],
      },
      {
        heading: ["3. Intellectual Property"],
        blocks: [
          {
            type: "p",
            content: [
              "The design, layout, user interface, logo, graphics, source code, algorithms and all content of our site and all of its tools belong to Convrs and are protected under the Turkish Law No. 5846 on Intellectual and Artistic Works and international copyright legislation. These contents, source codes and structures may not be copied, reproduced, distributed, republished, modified, reverse engineered or used to create derivative works in any way without prior written permission. Any conduct contrary to this obligation constitutes an intellectual property infringement and may result in legal action being taken against you.",
            ],
          },
          {
            type: "p",
            content: [
              "The ownership of, and responsibility for, the files you convert using the service belongs entirely to you; we make no claim over the content of these files. However, by using the service you agree that the content you convert does not infringe the rights of third parties and that all obligations arising from the use of such content are yours.",
            ],
          },
        ],
      },
      {
        heading: ["4. Disclaimer of Warranties (\"AS IS\")"],
        blocks: [
          {
            type: "p",
            content: [
              "The service is provided ",
              { text: "\"AS IS\" and \"AS AVAILABLE\"", bold: true },
              ". No express or implied, written or oral warranty is given that the service will be uninterrupted, error-free, secure, fit for a particular purpose, or that it will guarantee a particular result. Because operations run in your browser, conversion quality, speed and results may vary depending on your device's hardware, browser, memory and internet connection.",
            ],
          },
          {
            type: "p",
            content: [
              "We do not warrant that converted files will be perfectly identical to your original files, that they will remain uncorrupted, that they will not be lost, or that they will be suitable for any particular purpose. In particular, data loss may occur in the case of large files due to insufficient browser memory (RAM), a browser crash, the page being closed, or a power failure. We bear no responsibility for losses that may arise in such cases. You are strongly advised to always keep an original copy of your important files.",
            ],
          },
        ],
      },
      {
        heading: ["5. Limitation of Liability"],
        blocks: [
          {
            type: "p",
            content: [
              "To the fullest extent permitted by applicable law, we, our employees, contractors and service providers shall not be liable for ",
              { text: "any direct, indirect, incidental, special, punitive or consequential damages", bold: true },
              " (including loss of profits, business interruption, loss of reputation, data loss or other material or moral damages) arising from the use or inability to use the service, interruptions in access to the service, software errors, file corruption or data loss.",
            ],
          },
          {
            type: "p",
            content: ["By using the service, you specifically accept the following risks:"],
          },
          {
            type: "list",
            items: [
              [
                "That your device's or browser's performance may be affected, its memory may fill up, or it may crash because conversions run on your device,",
              ],
              [
                "That the content, quality or compatibility of converted files may differ from your expectations or may become corrupted,",
              ],
              [
                "That irrecoverable data loss may occur due to a power failure, network error, browser crash or system error during an operation,",
              ],
              [
                "That data security issues may arise on third-party platforms (donation, advertising, analytics, etc.) if you are redirected to them.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Even if our liability is deemed to arise for any reason, our total liability shall not exceed the total revenue we earned from the service during the 12 (twelve) months preceding the event giving rise to the damage in question (and if that revenue is zero, zero).",
            ],
          },
        ],
      },
      {
        heading: ["6. Third-Party Links and Services"],
        blocks: [
          {
            type: "p",
            content: [
              "The site may contain links to third-party platforms (e.g. the \"Buy Me a Coffee\" donation platform) and to advertising/analytics services provided by Google. These links are provided solely for the convenience of the user, and we have no control over, and no responsibility for, the content, products, services, privacy practices or security measures of these third-party sites.",
            ],
          },
          {
            type: "p",
            content: [
              "The moment you leave the site and access a third-party platform, that platform's own terms of use and privacy policy apply. The security of, and legal responsibility arising from, any information, payment data or other data you share on these platforms rests ",
              { text: "entirely with you and the relevant third-party platform", bold: true },
              ". Payment and data processing activities on platforms such as \"Buy Me a Coffee\" to which you donate are outside our control; we accept no responsibility in this regard.",
            ],
          },
        ],
      },
      {
        heading: ["7. Effectiveness, Changes and Termination"],
        blocks: [
          {
            type: "p",
            content: [
              "These Terms enter into force upon your first access to the site. We may update these Terms from time to time; the changes take effect as soon as they are published, and your continued use of our site constitutes acceptance of the updated Terms. Significant changes are indicated by the \"Last updated\" date at the top of the page.",
            ],
          },
          {
            type: "p",
            content: [
              "We reserve the right to terminate your permission to use the service without prior notice in the event that you act contrary to these Terms, engage in unlawful activity or threaten the integrity of the service. We also reserve the right to modify, suspend or permanently terminate the service, in whole or in part, at any time and for any reason, without prior notice; we are not liable for any damages that may arise from such circumstances.",
            ],
          },
        ],
      },
      {
        heading: ["8. Indemnification"],
        blocks: [
          {
            type: "p",
            content: [
              "You agree to indemnify and defend us, our employees and our service providers against, and hold us harmless from, any and all claims, demands, lawsuits, damages, liabilities and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of the service; your breach of these Terms; the content of the files you convert; your infringement of the rights of third parties (copyright, trademark, personal data, privacy, etc.); or your unlawful activities.",
            ],
          },
        ],
      },
      {
        heading: ["9. Governing Law and Dispute Resolution"],
        blocks: [
          {
            type: "p",
            content: [
              "These Terms and all disputes arising from them are subject to and shall be interpreted in accordance with the laws of the Republic of Türkiye. In resolving disputes, the relevant consumer arbitration committees and courts have jurisdiction in the first instance; in disputes between the parties, ",
              { text: "the commercial first instance and/or consumer courts of Istanbul", bold: true },
              " shall have exclusive jurisdiction.",
            ],
          },
          {
            type: "p",
            content: [
              "If any provision of these Terms is held by a competent court to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. Our failure to exercise, or delay in exercising, any right under these Terms shall not constitute a waiver of such right.",
            ],
          },
        ],
      },
      {
        heading: ["10. Entire Agreement and Severability"],
        blocks: [
          {
            type: "p",
            content: [
              "These Terms, together with the Privacy Policy and the Cookie Policy, constitute the entire agreement between the parties regarding the use of the service. If any provision of any of these documents is invalid, unlawful or unenforceable, that provision shall be interpreted in a manner that gives it the closest valid meaning possible, and the other provisions shall remain in full force and effect.",
            ],
          },
        ],
      },
      {
        heading: ["11. Contact"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: ["If you have any questions about these Terms or our service, you can contact us:"],
          },
          {
            type: "contact",
            title: "CONVRS — Mustafa İnci",
            lines: [
              [
                "Email: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── DEUTSCH ───────────────
  de: {
    eyebrow: "Rechtliches",
    title: "Nutzungsbedingungen",
    updatedLabel: "Zuletzt aktualisiert:",
    updatedDate: "5. September 2026",
    scope: "Gültig für: https://convrs.org",
    note: {
      type: "note",
      tone: "warning",
      title: "Haftungsausschluss — Wichtiger Hinweis",
      content: [
        "In dem durch das geltende Recht maximal zulässigen Umfang ",
        { text: "ÜBERNIMMT DIESER DIENST KEINERLEI HAFTUNG IM ZUSAMMENHANG MIT SEINER NUTZUNG", underline: true },
        ". Der Entwickler ",
        { text: "KANN FÜR KEINERLEI SCHÄDEN HAFTBAR GEMACHT WERDEN", underline: true },
        ", einschließlich Datenverlust, Softwarefehler, Dateikorruption, materieller oder immaterieller Schäden, Unterbrechungen oder Gewinnverlusten, die aus der Nutzung des Dienstes entstehen.",
      ],
    },
    intro: [
      [
        "Convrs (",
        { text: "unser Dienst", bold: true },
        ", ",
        { text: "unsere Website", bold: true },
        ", ",
        { text: "wir", bold: true },
        ") empfiehlt Ihnen, diese Nutzungsbedingungen (die „",
        { text: "Bedingungen", bold: true },
        "“) sorgfältig zu lesen, bevor Sie unsere Dateikonvertierungstools verwenden. Durch den Zugriff auf die Website, das Anzeigen ihrer Seiten oder die Nutzung des Dienstes in irgendeiner Weise erklären Sie, dass Sie diese Bedingungen, die ",
        { text: "Datenschutzrichtlinie", url: "/privacy-policy", internal: true },
        " und die ",
        { text: "Cookie-Richtlinie", url: "/cookie-policy", internal: true },
        " gelesen haben und vollständig und bedingungslos an sie gebunden sind. Wenn Sie diese Bedingungen nicht akzeptieren, müssen Sie die Nutzung der Website sofort beenden.",
      ],
    ],
    sections: [
      {
        heading: ["1. Beschreibung des Dienstes"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs ist eine vollständig browserbasierte (clientseitige) Plattform, mit der Sie Bild-, Dokument-, Audio-, Video- und Datendateien in verschiedene Formate konvertieren können. Alle Konvertierungsvorgänge werden auf dem eigenen Gerät des Nutzers ausgeführt; Dateien werden niemals auf einen Server hochgeladen oder dort gespeichert. Der Dienst wird kostenlos angeboten und es gibt derzeit keine Begrenzung der Anzahl der Konvertierungen oder der Nutzungsdauer; wir behalten uns jedoch das Recht vor, den Dienst jederzeit zu ändern, auszusetzen oder zu beenden.",
            ],
          },
        ],
      },
      {
        heading: ["2. Annahme und konkludente Einwilligung"],
        blocks: [
          {
            type: "p",
            content: [
              "Diese Bedingungen gelten für die Nutzung unserer Website und aller ihrer Tools. Diese Bedingungen treten mit Ihrem ersten Zugriff auf die Website in Kraft; darüber hinaus gilt Ihre fortgesetzte Nutzung der Website ohne Notwendigkeit der Aktivierung eines Kontrollkästchens als Annahme dieser Bedingungen (konkludente Einwilligung). Sie erklären sich damit einverstanden, die Website nur für rechtmäßige Zwecke und im Einklang mit diesen Bedingungen zu nutzen.",
            ],
          },
          {
            type: "p",
            content: [
              "Sie dürfen unsere Konvertierungstools nicht verwenden, um rechtswidrige Inhalte zu erstellen, zu verbreiten oder zu speichern; die Urheberrechte, Markenrechte, personenbezogenen Daten oder sonstigen Rechte des geistigen Eigentums Dritter zu verletzen; Identitätsdiebstahl, Betrug, die Verbreitung von Schadsoftware oder sonstige rechtswidrige Aktivitäten zu begehen. Sie dürfen den Dienst nicht in einer Weise missbrauchen, die die Netzinfrastruktur, Server oder Geräte anderer Nutzer beschädigt, überlastet oder stört.",
            ],
          },
        ],
      },
      {
        heading: ["3. Geistiges Eigentum"],
        blocks: [
          {
            type: "p",
            content: [
              "Das Design, das Layout, die Benutzeroberfläche, das Logo, die Grafiken, der Quellcode, die Algorithmen und sämtliche Inhalte unserer Website und aller ihrer Tools gehören Convrs und sind nach dem türkischen Gesetz Nr. 5846 über geistige und künstlerische Werke sowie nach internationalem Urheberrecht geschützt. Diese Inhalte, Quellcodes und Strukturen dürfen ohne vorherige schriftliche Genehmigung in keiner Weise kopiert, reproduziert, verbreitet, erneut veröffentlicht, verändert, durch Reverse Engineering entschlüsselt oder zur Erstellung abgeleiteter Werke verwendet werden. Ein Verstoß gegen diese Verpflichtung stellt eine Verletzung des geistigen Eigentums dar und kann zu rechtlichen Schritten gegen Sie führen.",
            ],
          },
          {
            type: "p",
            content: [
              "Das Eigentum an den von Ihnen mit dem Dienst konvertierten Dateien und die Verantwortung hierfür liegen vollständig bei Ihnen; wir erheben keinen Anspruch auf den Inhalt dieser Dateien. Durch die Nutzung des Dienstes erklären Sie sich jedoch damit einverstanden, dass der von Ihnen konvertierte Inhalt keine Rechte Dritter verletzt und dass alle aus der Nutzung dieses Inhalts entstehenden Verpflichtungen bei Ihnen liegen.",
            ],
          },
        ],
      },
      {
        heading: ["4. Gewährleistungsausschluss („AS IS“)"],
        blocks: [
          {
            type: "p",
            content: [
              "Der Dienst wird ",
              { text: "„WIE BESEHEN\" (AS IS) und „SOWEIT VERFÜGBAR\" (AS AVAILABLE)", bold: true },
              " bereitgestellt. Es wird keinerlei ausdrückliche oder stillschweigende, schriftliche oder mündliche Gewährleistung dafür übernommen, dass der Dienst ununterbrochen, fehlerfrei, sicher, für einen bestimmten Zweck geeignet ist oder ein bestimmtes Ergebnis garantiert. Da die Vorgänge in Ihrem Browser ausgeführt werden, können Qualität, Geschwindigkeit und Ergebnisse der Konvertierung je nach Hardware Ihres Geräts, Browser, Speicher und Internetverbindung variieren.",
            ],
          },
          {
            type: "p",
            content: [
              "Wir übernehmen keine Gewähr dafür, dass konvertierte Dateien vollständig identisch mit Ihren Originaldateien sind, unversehrt bleiben, nicht verloren gehen oder für einen bestimmten Zweck geeignet sind. Insbesondere kann es bei großen Dateien durch unzureichenden Arbeitsspeicher (RAM) des Browsers, einen Browserabsturz, das Schließen der Seite oder einen Stromausfall zu Datenverlust kommen. Für derartige Verluste übernehmen wir keinerlei Haftung. Es wird ausdrücklich empfohlen, stets eine Originalkopie Ihrer wichtigen Dateien aufzubewahren.",
            ],
          },
        ],
      },
      {
        heading: ["5. Haftungsbeschränkung"],
        blocks: [
          {
            type: "p",
            content: [
              "In dem durch das geltende Recht maximal zulässigen Umfang haften wir, unsere Mitarbeiter, Auftragnehmer und Dienstleister nicht für ",
              { text: "direkte, indirekte, zufällige, besondere, strafende oder Folgeschäden", bold: true },
              " (einschließlich Gewinnverlust, Geschäftsunterbrechung, Reputationsverlust, Datenverlust oder sonstige materielle oder immaterielle Schäden), die aus der Nutzung oder der Nichtnutzbarkeit des Dienstes, aus Unterbrechungen beim Zugriff auf den Dienst, Softwarefehlern, Dateikorruption oder Datenverlust entstehen.",
            ],
          },
          {
            type: "p",
            content: ["Durch die Nutzung des Dienstes akzeptieren Sie ausdrücklich die folgenden Risiken:"],
          },
          {
            type: "list",
            items: [
              [
                "Dass die Leistung Ihres Geräts oder Browsers beeinträchtigt wird, der Speicher voll läuft oder es abstürzt, weil Konvertierungen auf Ihrem Gerät ausgeführt werden,",
              ],
              [
                "Dass Inhalt, Qualität oder Kompatibilität konvertierter Dateien von Ihren Erwartungen abweichen oder beschädigt werden,",
              ],
              [
                "Dass es während eines Vorgangs aufgrund von Stromausfall, Netzwerkfehler, Browserabsturz oder Systemfehler zu einem unwiederbringlichen Datenverlust kommt,",
              ],
              [
                "Dass auf Plattformen Dritter, an die Sie weitergeleitet werden (Spende, Werbung, Analytik usw.), Datensicherheitsprobleme auftreten können.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Selbst wenn unsere Haftung aus irgendeinem Grund begründet sein sollte, übersteigt unsere Gesamthaftung nicht den Gesamtumsatz, den wir aus dem Dienst in den vorangegangenen 12 (zwölf) Monaten vor dem schadensauslösenden Ereignis erzielt haben (und wenn dieser Umsatz null beträgt, null).",
            ],
          },
        ],
      },
      {
        heading: ["6. Links und Dienste von Dritten"],
        blocks: [
          {
            type: "p",
            content: [
              "Die Website kann Links zu Plattformen Dritter (z. B. zur Spendensplattform „Buy Me a Coffee“) und zu von Google bereitgestellten Werbe-/Analysediensten enthalten. Diese Links werden ausschließlich zur Bequemlichkeit des Nutzers bereitgestellt; wir haben keine Kontrolle über und keine Verantwortung für die Inhalte, Produkte, Dienste, Datenschutzpraktiken oder Sicherheitsmaßnahmen dieser Websites Dritter.",
            ],
          },
          {
            type: "p",
            content: [
              "In dem Moment, in dem Sie die Website verlassen und auf eine Plattform eines Dritten zugreifen, gelten deren eigene Nutzungsbedingungen und Datenschutzrichtlinie. Die Sicherheit jeglicher Informationen, Zahlungsdaten oder sonstiger Daten, die Sie auf diesen Plattformen teilen, sowie die daraus entstehende rechtliche Verantwortung liegen ",
              { text: "vollständig bei Ihnen und der betreffenden Plattform eines Dritten", bold: true },
              ". Zahlungs- und Datenverarbeitungsaktivitäten auf Plattformen wie „Buy Me a Coffee“, an die Sie spenden, liegen außerhalb unserer Kontrolle; wir übernehmen diesbezüglich keinerlei Verantwortung.",
            ],
          },
        ],
      },
      {
        heading: ["7. Wirksamkeit, Änderungen und Kündigung"],
        blocks: [
          {
            type: "p",
            content: [
              "Diese Bedingungen treten mit Ihrem ersten Zugriff auf die Website in Kraft. Wir können diese Bedingungen von Zeit zu Zeit aktualisieren; die Änderungen treten mit ihrer Veröffentlichung in Kraft und Ihre fortgesetzte Nutzung unserer Website stellt die Annahme der aktualisierten Bedingungen dar. Wesentliche Änderungen werden durch das Datum „Zuletzt aktualisiert“ am oberen Rand der Seite angezeigt.",
            ],
          },
          {
            type: "p",
            content: [
              "Wir behalten uns das Recht vor, Ihre Berechtigung zur Nutzung des Dienstes ohne vorherige Ankündigung zu beenden, wenn Sie gegen diese Bedingungen verstoßen, sich rechtswidrig verhalten oder die Integrität des Dienstes gefährden. Wir behalten uns außerdem das Recht vor, den Dienst insgesamt oder teilweise jederzeit und aus beliebigem Grund ohne vorherige Ankündigung zu ändern, auszusetzen oder dauerhaft einzustellen; wir haften nicht für Schäden, die aus solchen Umständen entstehen können.",
            ],
          },
        ],
      },
      {
        heading: ["8. Freistellung (Indemnification)"],
        blocks: [
          {
            type: "p",
            content: [
              "Sie verpflichten sich, uns, unsere Mitarbeiter und unsere Dienstleister von jeglichen Ansprüchen, Forderungen, Klagen, Schäden, Verbindlichkeiten und Aufwendungen einschließlich angemessener Anwaltskosten freizustellen und zu verteidigen, die aus oder im Zusammenhang mit Ihrer Nutzung des Dienstes, Ihrem Verstoß gegen diese Bedingungen, dem Inhalt der von Ihnen konvertierten Dateien, Ihrer Verletzung der Rechte Dritter (Urheberrecht, Markenrecht, personenbezogene Daten, Privatsphäre usw.) oder Ihren rechtswidrigen Aktivitäten entstehen.",
            ],
          },
        ],
      },
      {
        heading: ["9. Anwendbares Recht und Streitbeilegung"],
        blocks: [
          {
            type: "p",
            content: [
              "Diese Bedingungen und alle daraus entstehenden Streitigkeiten unterliegen dem Recht der Republik Türkei und werden im Einklang mit diesem Recht ausgelegt. Für die Beilegung von Streitigkeiten sind zunächst die zuständigen Verbraucherschlichtungsstellen und Gerichte zuständig; für Streitigkeiten zwischen den Parteien ist ",
              { text: "das zuständige im Dienst befindliche Handels- und/oder Verbrauchergericht in Istanbul", bold: true },
              " ausschließlich zuständig.",
            ],
          },
          {
            type: "p",
            content: [
              "Falls eine Bestimmung dieser Bedingungen von einem zuständigen Gericht für ungültig oder nicht durchsetzbar erklärt wird, bleiben die übrigen Bestimmungen vollständig in Kraft. Die Nichtausübung oder verzögerte Ausübung eines Rechts aus diesen Bedingungen durch uns stellt keinen Verzicht auf dieses Recht dar.",
            ],
          },
        ],
      },
      {
        heading: ["10. Gesamtheit der Vereinbarung und Teilbarkeit"],
        blocks: [
          {
            type: "p",
            content: [
              "Diese Bedingungen bilden zusammen mit der Datenschutzrichtlinie und der Cookie-Richtlinie die gesamte Vereinbarung zwischen den Parteien über die Nutzung des Dienstes. Falls eine Bestimmung eines dieser Dokumente ungültig, rechtswidrig oder nicht durchsetzbar ist, wird diese Bestimmung so ausgelegt, dass ihr die nächstliegende gültige Bedeutung gegeben wird, und die übrigen Bestimmungen bleiben vollständig in Kraft.",
            ],
          },
        ],
      },
      {
        heading: ["11. Kontakt"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: ["Wenn Sie Fragen zu diesen Bedingungen oder unserem Dienst haben, können Sie uns kontaktieren:"],
          },
          {
            type: "contact",
            title: "CONVRS — Mustafa İnci",
            lines: [
              [
                "E-Mail: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ESPAÑOL ───────────────
  es: {
    eyebrow: "Legal",
    title: "Condiciones de Uso",
    updatedLabel: "Última actualización:",
    updatedDate: "5 de septiembre de 2026",
    scope: "Válido para: https://convrs.org",
    note: {
      type: "note",
      tone: "warning",
      title: "Exención de responsabilidad — Aviso importante",
      content: [
        "En la medida más amplia permitida por la legislación aplicable, este servicio ",
        { text: "NO ACEPTA RESPONSABILIDAD ALGUNA DERIVADA DE SU USO", underline: true },
        ". El desarrollador ",
        { text: "NO PODRÁ SER CONSIDERADO RESPONSABLE EN NINGÚN CASO", underline: true },
        " por ninguna pérdida de datos, error de software, corrupción de archivos, daño material o moral, interrupción o pérdida de beneficios derivados del uso del servicio.",
      ],
    },
    intro: [
      [
        "Convrs (",
        { text: "nuestro servicio", bold: true },
        ", ",
        { text: "nuestro sitio web", bold: true },
        ", ",
        { text: "nosotros", bold: true },
        ") le recomienda que lea atentamente estas Condiciones de Uso (las «",
        { text: "Condiciones", bold: true },
        "») antes de utilizar nuestras herramientas de conversión de archivos. Al acceder al sitio, ver sus páginas o utilizar el servicio de cualquier forma, usted declara que ha leído y acepta quedar plenamente y sin reservas vinculado por estas Condiciones, la ",
        { text: "Política de Privacidad", url: "/privacy-policy", internal: true },
        " y la ",
        { text: "Política de Cookies", url: "/cookie-policy", internal: true },
        ". Si no acepta estas Condiciones, debe dejar de utilizar el sitio inmediatamente.",
      ],
    ],
    sections: [
      {
        heading: ["1. Descripción del Servicio"],
        blocks: [
          {
            type: "p",
            content: [
              "Convrs es una plataforma totalmente basada en el navegador (del lado del cliente) que le permite convertir archivos de imagen, documento, audio, vídeo y datos a diversos formatos. Todas las operaciones de conversión se realizan en el propio dispositivo del usuario; los archivos nunca se suben ni se almacenan en ningún servidor. El servicio se ofrece gratuitamente y actualmente no existe límite en el número de conversiones ni en la duración del uso; no obstante, nos reservamos el derecho a modificar, suspender o terminar el servicio en cualquier momento.",
            ],
          },
        ],
      },
      {
        heading: ["2. Aceptación y Consentimiento Implícito"],
        blocks: [
          {
            type: "p",
            content: [
              "Estas Condiciones cubren el uso de nuestro sitio y de todas sus herramientas. Las Condiciones entran en vigor con su primer acceso al sitio; además, sin necesidad de marcar ninguna casilla, su uso continuado del sitio constituye la aceptación de estas Condiciones (consentimiento implícito). Usted acepta utilizar el sitio únicamente con fines lícitos y de conformidad con estas Condiciones.",
            ],
          },
          {
            type: "p",
            content: [
              "No podrá utilizar nuestras herramientas de conversión para crear, distribuir o almacenar contenido ilícito; infringir los derechos de autor, derechos de marca, datos personales u otros derechos de propiedad intelectual de terceros; cometer suplantación de identidad, fraude, difusión de software malicioso o cualquier otra actividad ilícita. No podrá hacer un uso indebido del servicio que dañe, sobrecargue o interrumpa la infraestructura de red, los servidores o los dispositivos de otros usuarios.",
            ],
          },
        ],
      },
      {
        heading: ["3. Propiedad Intelectual"],
        blocks: [
          {
            type: "p",
            content: [
              "El diseño, la disposición, la interfaz de usuario, el logotipo, los gráficos, el código fuente, los algoritmos y todo el contenido de nuestro sitio y de todas sus herramientas pertenecen a Convrs y están protegidos por la Ley turca n.º 5846 sobre Obras Intelectuales y Artísticas y por la legislación internacional de derechos de autor. Estos contenidos, códigos fuente y estructuras no podrán copiarse, reproducirse, distribuirse, republicarse, modificarse, someterse a ingeniería inversa ni utilizarse para crear obras derivadas de ninguna forma sin autorización previa por escrito. Cualquier conducta contraria a esta obligación constituye una infracción de la propiedad intelectual y puede dar lugar a que se emprendan acciones legales contra usted.",
            ],
          },
          {
            type: "p",
            content: [
              "La propiedad de los archivos que convierta mediante el servicio, y la responsabilidad sobre ellos, corresponde íntegramente a usted; no formulamos ninguna reclamación sobre el contenido de dichos archivos. Sin embargo, al utilizar el servicio usted acepta que el contenido que convierte no infringe los derechos de terceros y que todas las obligaciones derivadas del uso de dicho contenido son suyas.",
            ],
          },
        ],
      },
      {
        heading: ["4. Exención de Garantías («AS IS»)"],
        blocks: [
          {
            type: "p",
            content: [
              "El servicio se presta ",
              { text: "«TAL CUAL» (AS IS) y «SEGÚN DISPONIBILIDAD» (AS AVAILABLE)", bold: true },
              ". No se otorga ninguna garantía expresa o implícita, escrita u oral, de que el servicio será ininterrumpido, libre de errores, seguro, apto para un fin particular o de que garantizará un resultado concreto. Dado que las operaciones se ejecutan en su navegador, la calidad, la velocidad y los resultados de la conversión pueden variar en función del hardware de su dispositivo, su navegador, su memoria y su conexión a internet.",
            ],
          },
          {
            type: "p",
            content: [
              "No garantizamos que los archivos convertidos sean perfectamente idénticos a sus archivos originales, que permanezcan sin corrupción, que no se pierdan ni que sean adecuados para ningún fin particular. En particular, puede producirse una pérdida de datos en archivos grandes debido a la insuficiencia de memoria del navegador (RAM), un bloqueo del navegador, el cierre de la página o un corte de energía. No asumimos responsabilidad alguna por las pérdidas que puedan producirse en tales casos. Se le recomienda encarecidamente conservar siempre una copia original de sus archivos importantes.",
            ],
          },
        ],
      },
      {
        heading: ["5. Limitación de Responsabilidad"],
        blocks: [
          {
            type: "p",
            content: [
              "En la medida más amplia permitida por la legislación aplicable, nosotros, nuestros empleados, contratistas y proveedores de servicios no seremos responsables de ",
              { text: "ningún daño directo, indirecto, accidental, especial, punitivo o consecuente", bold: true },
              " (incluida la pérdida de beneficios, la interrupción del negocio, la pérdida de reputación, la pérdida de datos u otros daños materiales o morales) derivado del uso o la imposibilidad de uso del servicio, de las interrupciones en el acceso al servicio, de errores de software, de la corrupción de archivos o de la pérdida de datos.",
            ],
          },
          {
            type: "p",
            content: ["Al utilizar el servicio, usted acepta específicamente los siguientes riesgos:"],
          },
          {
            type: "list",
            items: [
              [
                "Que el rendimiento de su dispositivo o navegador pueda verse afectado, su memoria pueda llenarse o pueda bloquearse porque las conversiones se ejecutan en su dispositivo,",
              ],
              [
                "Que el contenido, la calidad o la compatibilidad de los archivos convertidos difieran de sus expectativas o puedan corromperse,",
              ],
              [
                "Que pueda producirse una pérdida de datos irrecuperable debido a un corte de energía, un error de red, un bloqueo del navegador o un error del sistema durante una operación,",
              ],
              [
                "Que puedan surgir problemas de seguridad de los datos en las plataformas de terceros (donaciones, publicidad, analíticas, etc.) si es redirigido a ellas.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Incluso si se considerara que surge nuestra responsabilidad por cualquier motivo, nuestra responsabilidad total no excederá los ingresos totales que hayamos obtenido del servicio durante los 12 (doce) meses anteriores al acontecimiento que dio lugar al daño en cuestión (y si esos ingresos son cero, cero).",
            ],
          },
        ],
      },
      {
        heading: ["6. Enlaces y Servicios de Terceros"],
        blocks: [
          {
            type: "p",
            content: [
              "El sitio puede contener enlaces a plataformas de terceros (p. ej., la plataforma de donaciones «Buy Me a Coffee») y a servicios publicitarios/de analíticas proporcionados por Google. Estos enlaces se ofrecen únicamente para comodidad del usuario, y no tenemos ningún control sobre, ni responsabilidad por, el contenido, los productos, los servicios, las prácticas de privacidad o las medidas de seguridad de dichos sitios de terceros.",
            ],
          },
          {
            type: "p",
            content: [
              "En el momento en que abandone el sitio y acceda a una plataforma de terceros, se aplicarán sus propias condiciones de uso y política de privacidad. La seguridad de cualquier información, dato de pago u otro dato que comparta en estas plataformas, y la responsabilidad legal derivada de ella, recae ",
              { text: "íntegramente en usted y en la plataforma de terceros correspondiente", bold: true },
              ". Las actividades de pago y tratamiento de datos en plataformas como «Buy Me a Coffee» a las que done están fuera de nuestro control; no aceptamos ninguna responsabilidad al respecto.",
            ],
          },
        ],
      },
      {
        heading: ["7. Vigencia, Cambios y Terminación"],
        blocks: [
          {
            type: "p",
            content: [
              "Estas Condiciones entran en vigor con su primer acceso al sitio. Podemos actualizar estas Condiciones de vez en cuando; los cambios entran en vigor en cuanto se publican y su uso continuado de nuestro sitio constituye la aceptación de las Condiciones actualizadas. Los cambios significativos se indican mediante la fecha de «Última actualización» en la parte superior de la página.",
            ],
          },
          {
            type: "p",
            content: [
              "Nos reservamos el derecho a poner fin a su permiso de uso del servicio sin previo aviso si actúa en contra de estas Condiciones, realiza actividades ilícitas o amenaza la integridad del servicio. También nos reservamos el derecho a modificar, suspender o terminar definitivamente el servicio, total o parcialmente, en cualquier momento y por cualquier motivo, sin previo aviso; no somos responsables de los daños que puedan derivarse de tales circunstancias.",
            ],
          },
        ],
      },
      {
        heading: ["8. Indemnización"],
        blocks: [
          {
            type: "p",
            content: [
              "Usted acepta indemnizar y defender a nosotros, a nuestros empleados y a nuestros proveedores de servicios, y mantenernos indemnes frente a cualquier reclamación, demanda, juicio, daño, responsabilidad y gasto, incluidos los honorarios razonables de abogados, derivados de o relacionados con su uso del servicio; su incumplimiento de estas Condiciones; el contenido de los archivos que convierta; su infracción de los derechos de terceros (derechos de autor, marcas, datos personales, privacidad, etc.); o sus actividades ilícitas.",
            ],
          },
        ],
      },
      {
        heading: ["9. Legislación Aplicable y Resolución de Conflictos"],
        blocks: [
          {
            type: "p",
            content: [
              "Estas Condiciones y todos los conflictos derivados de ellas se rigen por el derecho de la República de Turquía y se interpretarán conforme a dicho derecho. Para la resolución de conflictos son competentes en primer lugar las juntas arbitrales de consumo y los tribunales pertinentes; para los conflictos entre las partes, ",
              { text: "los tribunales mercantiles y/o de consumo de guardia de Estambul", bold: true },
              " serán los únicos competentes.",
            ],
          },
          {
            type: "p",
            content: [
              "Si un tribunal competente declarara inválida o inaplicable alguna disposición de estas Condiciones, las restantes disposiciones permanecerán plenamente en vigor. El hecho de que no ejerzamos, o ejerzamos tardíamente, un derecho derivado de estas Condiciones no constituirá renuncia a dicho derecho.",
            ],
          },
        ],
      },
      {
        heading: ["10. Acuerdo Íntegro y Divisibilidad"],
        blocks: [
          {
            type: "p",
            content: [
              "Estas Condiciones, junto con la Política de Privacidad y la Política de Cookies, constituyen el acuerdo íntegro entre las partes sobre el uso del servicio. Si alguna disposición de cualquiera de estos documentos fuera inválida, ilícita o inaplicable, dicha disposición se interpretará del modo que le otorgue el significado válido más próximo posible y las restantes disposiciones permanecerán plenamente en vigor.",
            ],
          },
        ],
      },
      {
        heading: ["11. Contacto"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: ["Si tiene alguna pregunta sobre estas Condiciones o nuestro servicio, puede ponerse en contacto con nosotros:"],
          },
          {
            type: "contact",
            title: "CONVRS — Mustafa İnci",
            lines: [
              [
                "Correo electrónico: ",
                { text: "support@convrs.org", url: links.contactMail },
              ],
            ],
          },
        ],
      },
    ],
  },
};