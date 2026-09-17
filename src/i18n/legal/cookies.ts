import type { LegalContent } from "./types";
import { links } from "./types";

export const cookiesContent: LegalContent = {
  // ─────────────── TÜRKÇE ───────────────
  tr: {
    eyebrow: "Legal",
    title: "Çerez Politikası",
    updatedLabel: "Son güncelleme:",
    updatedDate: "5 Eylül 2026",
    scope: "Geçerli: https://convrs.org — KVKK · GDPR · CCPA uyumlu",
    intro: [
      [
        "Bu Çerez Politikası; 6698 sayılı Kişisel Verilerin Korunması Kanunu (",
        { text: "KVKK", bold: true },
        "), Avrupa Birliği Genel Veri Koruma Tüzüğü (",
        { text: "GDPR", bold: true },
        ") ve ilgili yürürlükteki mevzuat uyarınca, Convrs sitesinde kullanılan çerezlerin ve tarayıcı depolama alanlarının türlerini, amaçlarını, sürelerini ve bu teknolojileri nasıl yönetebileceğinizi açıklamaktadır. ",
        { text: "Gizlilik Politikası", url: "/privacy-policy", internal: true },
        "'nı ve ",
        { text: "Kullanım Şartları", url: "/terms-of-service", internal: true },
        "'nı bu politika ile birlikte değerlendirmelisiniz.",
      ],
    ],
    sections: [
      {
        heading: ["1. Çerez Nedir?"],
        blocks: [
          {
            type: "p",
            content: [
              "Çerezler; bir web sitesini ziyaret ettiğinizde tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, site ziyaretleriniz sırasında tarayıcınız ile site arasında bilgi taşır ve sitenin sizi hatırlayabilmesini sağlar. Bunun yanında, tarayıcı depolama alanı (localStorage) da benzer bir amaçla, tarayıcı içinde veri saklamak için kullanılan bir teknolojidir.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Önemli not:", bold: true },
              " Dönüştürdüğünüz dosyaların içeriği hiçbir çerezde, localStorage'ta veya sunucu tarafında saklanmaz. Çerezler yalnızca site tercihleri, analiz ve reklam amaçlıdır.",
            ],
          },
        ],
      },
      {
        heading: ["2. Kullandığımız Çerezler ve Tarayıcı Depolama Alanları"],
        blocks: [
          { type: "h4", content: ["a) Zorunlu / İşlevsel Çerezler"] },
          {
            type: "p",
            content: [
              "Zorunlu çerezler, sitenin temel işlevlerinin yerine getirilmesi ve güvenliğin sağlanması için gereklidir. Rızanıza tabi değildir (KVKK md. 5/2-ç; GDPR md. 6/1-b).",
            ],
          },
          {
            type: "table",
            columns: ["Çerez / Depolama", "Amaç", "Tür", "Süre"],
            rows: [
              [
                "convrs-cookie-consent",
                "Çerez kabul tercihinizin hatırlanması",
                "localStorage",
                "Silinene kadar (tarayıcıya bağlı)",
              ],
              [
                "theme / color-scheme tercihi",
                "Açık/koyu tema tercihinizin hatırlanması",
                "localStorage",
                "Silinene kadar (tarayıcıya bağlı)",
              ],
            ],
          },
          { type: "h4", content: ["b) Analitik Çerezler (Google Analytics)"] },
          {
            type: "p",
            content: [
              "Google Analytics; sitenin nasıl kullanıldığını (ziyaret sayısı, oturum süresi, yaklaşık coğrafi bölge, tarayıcı/cihaz türü) anlamak için kullanılan analitik çerezler yerleştirir. Bu çerezler, çerez kabulü vermeniz durumunda ",
              { text: "yalnızca verdiğiniz rıza sonrasında", bold: true },
              " etkinleşir ve yalnızca anonimleştirilmiş ve toplu (agrege) istatistikler üretir. Dosya içerikleriniz bu kapsamda asla işlenmez.",
            ],
          },
          {
            type: "table",
            columns: ["Çerez / Depolama", "Amaç", "Tür", "Süre"],
            rows: [
              [
                "_ga, _gid, _gat, _ga_*",
                "Ziyaretçi oturumu ve site kullanım istatistikleri",
                "Birinci taraf / Analitik",
                "_ga: 2 yıl · _gid: 24 saat · _gat: 1 dk",
              ],
            ],
          },
          { type: "h4", content: ["c) Reklam Çerezleri (Google AdSense)"] },
          {
            type: "p",
            content: [
              "Google AdSense; reklam sunmak, reklam performansını ölçmek ve size daha alakalı reklamlar göstermek amacıyla birinci ve üçüncü taraf çerezler (ör. ",
              { text: "NID", code: true },
              " ve ABD/EU çerez izni mevzuatı uyarınca e-GDPR çerezleri) kullanabilir. Bu çerezler, çerez kabulü vermeniz durumunda etkinleşir. Çerez kabulü vermediğiniz veya geri aldığınız durumda yalnızca kişiselleştirilmemiş (Limited Ads) reklamlar gösterilir ve bu reklamlar gezinme geçmişinize dayalı olarak hedeflenmez. Reklam kişiselleştirmeyi istediğiniz zaman ",
              { text: "Google Reklam Ayarları", url: links.googleAdsSettings, external: true },
              " üzerinden kapatabilirsiniz.",
            ],
          },
        ],
      },
      {
        heading: ["3. Rıza ve Çerez Kabulü"],
        blocks: [
          {
            type: "p",
            content: [
              "KVKK ve GDPR uyarınca, analitik ve reklam amaçlı çerezler gibi rızaya tabi çerezler için ",
              { text: "bilgilendirmeye dayalı açık rızanız", bold: true },
              " gereklidir. Siteye ilk girişinizde görünen çerez bildiriminde \"Kabul Et\" butonuna tıklamanız, bu çerez türlerine açık rıza verdiğiniz anlamına gelir. Kapat butonuna tıklamanız veya hiçbir işlem yapmamanız durumunda yalnızca zorunlu çerezler ve tarayıcı depolama alanları kullanılır; analitik ve reklam çerezleri etkinleşmez ve size yalnızca kişiselleştirilmemiş (Limited Ads) reklamlar gösterilir.",
            ],
          },
          {
            type: "p",
            content: [
              "Verdiğiniz rızayı dilediğiniz zaman geri alabilirsiniz. Rızanızı geri almanız, geri alma öncesinde yapılan işlemlerin hukuka uygunluğunu etkilemez (GDPR md. 7/3; KVKK md. 5/1).",
            ],
          },
        ],
      },
      {
        heading: ["4. Çerezleri Nasıl Yönetebilirsiniz?"],
        blocks: [
          {
            type: "p",
            content: [
              "Çerezleri ve tarayıcı depolama alanlarını aşağıdaki yöntemlerle yönetebilir veya tamamen engelleyebilirsiniz:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Tarayıcı ayarları:", bold: true },
                " Tarayıcınızın ayar menüsünden tüm çerezleri engelleyebilir, silebilir veya her ziyarette onay isteyecek şekilde yapılandırabilirsiniz. (Ör. ",
                { text: "Chrome", bold: true },
                " ",
                { text: "Ayarlar → Gizlilik ve Güvenlik → Çerezler", code: true },
                "; ",
                { text: "Firefox", bold: true },
                " ",
                { text: "Ayarlar → Gizlilik ve Güvenlik", code: true },
                "; ",
                { text: "Safari", bold: true },
                " ",
                { text: "Tercihler → Gizlilik", code: true },
                ".)",
              ],
              [
                { text: "Çerez kabul tercihi:", bold: true },
                " Tarayıcı depolamanızdaki ",
                { text: "convrs-cookie-consent", code: true },
                " kaydını silerek çerez bildirimini tekrar görüntüleyebilir ve tercihinizi değiştirebilirsiniz.",
              ],
              [
                { text: "Google Reklam Ayarları:", bold: true },
                " ",
                { text: "adssettings.google.com", url: links.googleAdsSettings, external: true },
                " üzerinden reklam kişiselleştirmeyi kapatabilirsiniz.",
              ],
              [
                { text: "Daha fazla bilgi:", bold: true },
                " Çerezlerin yönetimi hakkında ayrıntılı bilgi için ",
                { text: "www.allaboutcookies.org", url: links.allaboutcookies, external: true },
                " adresini ziyaret edebilirsiniz.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Çerezleri engellemeniz veya silmeniz, sitenin temel dosya dönüştürme işlevlerini etkilemez; yalnızca bazı tercihlerin (tema, çerez tercihi vb.) hatırlanmasını ve kişiselleştirilmiş reklam sunumunu etkileyebilir.",
            ],
          },
        ],
      },
      {
        heading: ["5. Üçüncü Taraf Çerezlerin Sorumluluğu"],
        blocks: [
          {
            type: "p",
            content: [
              "Google (Analytics ve AdSense) tarafından yerleştirilen üçüncü taraf çerezlerin kullanımı, sunduğu süreler ve bu çerezlerde toplanan verilere ilişkin işleme faaliyetleri; Google'ın kendi gizlilik ve çerez politikalarına tabidir. Bu üçüncü taraf çerezlerin işleyişi üzerinde kontrolümüz yoktur; sorumluluk ilgili üçüncü taraf platformdadır. Ayrıntılar için:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Google Gizlilik Politikası", url: links.googlePrivacy, external: true },
              ],
              [
                { text: "Google'ın çerez kullanımı", url: links.googleCookies, external: true },
              ],
              [
                { text: "Google'ın ortak sitelerdeki veri kullanımı", url: links.googlePartnerSites, external: true },
              ],
            ],
          },
        ],
      },
      {
        heading: ["6. CCPA Kapsamında Bildirim"],
        blocks: [
          {
            type: "p",
            content: [
              "Kaliforniya Tüketici Gizliliği Yasası (",
              { text: "CCPA", bold: true },
              ") kapsamında, kişisel verilerinizi ",
              { text: "satmıyoruz ve \"paylaşmıyoruz\" (cross-context behavioral advertising amacıyla)", bold: true },
              ". Kullandığımız analitik ve reklam çerezleri, CCPA kapsamında tanımlanan \"kişisel bilgi\" olarak değerlendirilebilecek teknik verilerin üçüncü taraf sağlayıcılarla işlenmesine konu olabilir; bu çerezlere rıza vermemeniz veya Google Reklam Ayarları'ndan kişiselleştirmeyi kapatmanız durumunda bu tür bir işleme gerçekleşmez. Verilerinizin satılmaması veya paylaşılmaması hakkınızı kullanmak için bizimle iletişime geçebilirsiniz.",
            ],
          },
        ],
      },
      {
        heading: ["7. İletişim ve Değişiklikler"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "Bu Çerez Politikası ile ilgili sorularınız veya daha fazla bilgi almak için bizimle iletişime geçebilirsiniz: ",
              { text: "support@convrs.org", url: links.contactMail },
              ". Bu politikayı zaman zaman güncelleyebiliriz; önemli değişiklikler \"Son güncelleme\" tarihiyle belirtilir ve değişikliklerden sonra siteyi kullanmaya devam etmeniz, güncellenmiş politikayı kabul ettiğiniz anlamına gelir.",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ENGLISH ───────────────
  en: {
    eyebrow: "Legal",
    title: "Cookie Policy",
    updatedLabel: "Last updated:",
    updatedDate: "September 5, 2026",
    scope: "Applicable to: https://convrs.org — KVKK · GDPR · CCPA compliant",
    intro: [
      [
        "This Cookie Policy explains the types, purposes, durations of the cookies and browser storage areas used on the Convrs website, and how you can manage these technologies, in accordance with the Turkish Law No. 6698 on the Protection of Personal Data (",
        { text: "KVKK", bold: true },
        "), the European Union General Data Protection Regulation (",
        { text: "GDPR", bold: true },
        ") and other applicable legislation. You should read this policy together with the ",
        { text: "Privacy Policy", url: "/privacy-policy", internal: true },
        " and the ",
        { text: "Terms of Service", url: "/terms-of-service", internal: true },
        ".",
      ],
    ],
    sections: [
      {
        heading: ["1. What Are Cookies?"],
        blocks: [
          {
            type: "p",
            content: [
              "Cookies are small text files that your browser saves on your device when you visit a website. During your site visits, cookies carry information between your browser and the site and enable the site to remember you. In addition, browser storage (localStorage) is a similar technology used to store data within the browser for the same kind of purpose.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Important note:", bold: true },
              " The content of the files you convert is never stored in any cookie, in localStorage or on the server side. Cookies are used solely for site preferences, analytics and advertising.",
            ],
          },
        ],
      },
      {
        heading: ["2. Cookies and Browser Storage Areas We Use"],
        blocks: [
          { type: "h4", content: ["a) Strictly Necessary / Functional Cookies"] },
          {
            type: "p",
            content: [
              "Strictly necessary cookies are required for the site's core functions and security. They are not subject to your consent (KVKK Art. 5/2-ç; GDPR Art. 6/1-b).",
            ],
          },
          {
            type: "table",
            columns: ["Cookie / Storage", "Purpose", "Type", "Duration"],
            rows: [
              [
                "convrs-cookie-consent",
                "Remembering your cookie acceptance preference",
                "localStorage",
                "Until deleted (browser-dependent)",
              ],
              [
                "theme / color-scheme preference",
                "Remembering your light/dark theme selection",
                "localStorage",
                "Until deleted (browser-dependent)",
              ],
            ],
          },
          { type: "h4", content: ["b) Analytical Cookies (Google Analytics)"] },
          {
            type: "p",
            content: [
              "Google Analytics places analytical cookies used to understand how the site is used (number of visits, session duration, approximate geographic region, browser/device type). These cookies are ",
              { text: "activated only after you give your consent", bold: true },
              " by accepting cookies and generate only anonymized and aggregate statistics. Your file content is never processed in this context.",
            ],
          },
          {
            type: "table",
            columns: ["Cookie / Storage", "Purpose", "Type", "Duration"],
            rows: [
              [
                "_ga, _gid, _gat, _ga_*",
                "Visitor session and site usage statistics",
                "First-party / Analytical",
                "_ga: 2 years · _gid: 24 hours · _gat: 1 min",
              ],
            ],
          },
          { type: "h4", content: ["c) Advertising Cookies (Google AdSense)"] },
          {
            type: "p",
            content: [
              "Google AdSense may use first-party and third-party cookies (e.g. ",
              { text: "NID", code: true },
              " and consent-related cookies under US/EU cookie consent legislation) to serve ads, measure advertising performance and show you more relevant ads. These cookies are activated if you accept cookies. If you do not accept (or withdraw) consent, only non-personalized (Limited Ads) advertising is shown and these ads are not targeted based on your browsing history. You can turn off ad personalization at any time via ",
              { text: "Google Ad Settings", url: links.googleAdsSettings, external: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["3. Consent and Cookie Acceptance"],
        blocks: [
          {
            type: "p",
            content: [
              "Under the KVKK and GDPR, consent-based cookies such as analytical and advertising cookies require ",
              { text: "your informed explicit consent", bold: true },
              ". Clicking the \"Accept\" button in the cookie notice you see when you first enter the site means that you give your explicit consent to these cookie types. If you click the close button or take no action, only strictly necessary cookies and browser storage areas are used; analytical and advertising cookies are not activated.",
            ],
          },
          {
            type: "p",
            content: [
              "You may withdraw your consent at any time. Withdrawal does not affect the lawfulness of processing based on consent before its withdrawal (GDPR Art. 7/3; KVKK Art. 5/1).",
            ],
          },
        ],
      },
      {
        heading: ["4. How Can You Manage Cookies?"],
        blocks: [
          {
            type: "p",
            content: [
              "You can manage or completely block cookies and browser storage areas through the following methods:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Browser settings:", bold: true },
                " From your browser's settings menu you can block, delete or configure all cookies to request confirmation on every visit. (E.g. ",
                { text: "Chrome", bold: true },
                " ",
                { text: "Settings → Privacy and security → Cookies", code: true },
                "; ",
                { text: "Firefox", bold: true },
                " ",
                { text: "Settings → Privacy & Security", code: true },
                "; ",
                { text: "Safari", bold: true },
                " ",
                { text: "Preferences → Privacy", code: true },
                ".)",
              ],
              [
                { text: "Cookie acceptance preference:", bold: true },
                " By deleting the ",
                { text: "convrs-cookie-consent", code: true },
                " record in your browser storage, you can display the cookie notice again and change your preference.",
              ],
              [
                { text: "Google Ad Settings:", bold: true },
                " You can turn off ad personalization via ",
                { text: "adssettings.google.com", url: links.googleAdsSettings, external: true },
                ".",
              ],
              [
                { text: "More information:", bold: true },
                " For detailed information on managing cookies, please visit ",
                { text: "www.allaboutcookies.org", url: links.allaboutcookies, external: true },
                ".",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Blocking or deleting cookies does not affect the site's core file conversion functions; it may only affect the remembering of certain preferences (theme, cookie preference, etc.) and the delivery of personalized advertising.",
            ],
          },
        ],
      },
      {
        heading: ["5. Responsibility for Third-Party Cookies"],
        blocks: [
          {
            type: "p",
            content: [
              "The use of third-party cookies placed by Google (Analytics and AdSense), their durations and the processing activities relating to the data collected through these cookies are subject to Google's own privacy and cookie policies. We have no control over the functioning of these third-party cookies; responsibility rests with the relevant third-party platform. For details:",
            ],
          },
          {
            type: "list",
            items: [
              [{ text: "Google Privacy Policy", url: links.googlePrivacy, external: true }],
              [{ text: "How Google uses cookies", url: links.googleCookies, external: true }],
              [{ text: "How Google uses data on partner sites", url: links.googlePartnerSites, external: true }],
            ],
          },
        ],
      },
      {
        heading: ["6. Notice under the CCPA"],
        blocks: [
          {
            type: "p",
            content: [
              "Under the California Consumer Privacy Act (",
              { text: "CCPA", bold: true },
              "), we do not ",
              { text: "\"sell\" or \"share\" your personal information (for cross-context behavioral advertising)", bold: true },
              ". The analytical and advertising cookies we use may involve the processing of technical data, which could be considered \"personal information\" under the CCPA, with third-party providers; if you do not consent to these cookies or turn off personalization via Google Ad Settings, such processing does not occur. You may contact us to exercise your right not to have your data sold or shared.",
            ],
          },
        ],
      },
      {
        heading: ["7. Contact and Changes"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "If you have questions about this Cookie Policy or would like more information, you can contact us: ",
              { text: "support@convrs.org", url: links.contactMail },
              ". We may update this policy from time to time; significant changes are indicated by the \"Last updated\" date, and your continued use of the site after changes take effect constitutes acceptance of the updated policy.",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── DEUTSCH ───────────────
  de: {
    eyebrow: "Rechtliches",
    title: "Cookie-Richtlinie",
    updatedLabel: "Zuletzt aktualisiert:",
    updatedDate: "5. September 2026",
    scope: "Gültig für: https://convrs.org — KVKK · DSGVO · CCPA-konform",
    intro: [
      [
        "Diese Cookie-Richtlinie erläutert die Arten, Zwecke und Laufzeiten der auf der Website von Convrs verwendeten Cookies und Browser-Speicherbereiche sowie die Möglichkeiten zur Verwaltung dieser Technologien, im Einklang mit dem türkischen Gesetz Nr. 6698 zum Schutz personenbezogener Daten (",
        { text: "KVKK", bold: true },
        "), der Datenschutz-Grundverordnung der Europäischen Union (",
        { text: "DSGVO", bold: true },
        ") und sonstigen geltenden Bestimmungen. Sie sollten diese Richtlinie zusammen mit der ",
        { text: "Datenschutzrichtlinie", url: "/privacy-policy", internal: true },
        " und den ",
        { text: "Nutzungsbedingungen", url: "/terms-of-service", internal: true },
        " lesen.",
      ],
    ],
    sections: [
      {
        heading: ["1. Was sind Cookies?"],
        blocks: [
          {
            type: "p",
            content: [
              "Cookies sind kleine Textdateien, die Ihr Browser beim Besuch einer Website auf Ihrem Gerät speichert. Cookies transportieren während Ihrer Seitenbesuche Informationen zwischen Ihrem Browser und der Website und ermöglichen es der Website, Sie wiederzuerkennen. Darüber hinaus ist der Browser-Speicher (localStorage) eine ähnliche Technologie, die zum Speichern von Daten im Browser für denselben Zweck verwendet wird.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Wichtiger Hinweis:", bold: true },
              " Der Inhalt der von Ihnen konvertierten Dateien wird niemals in einem Cookie, im localStorage oder serverseitig gespeichert. Cookies dienen ausschließlich Website-Präferenzen, Analytik und Werbung.",
            ],
          },
        ],
      },
      {
        heading: ["2. Von uns verwendete Cookies und Browser-Speicherbereiche"],
        blocks: [
          { type: "h4", content: ["a) Notwendige / Funktions-Cookies"] },
          {
            type: "p",
            content: [
              "Notwendige Cookies sind für die Kernfunktionen und die Sicherheit der Website erforderlich. Sie unterliegen nicht Ihrer Einwilligung (KVKK Art. 5/2-ç; DSGVO Art. 6/1-b).",
            ],
          },
          {
            type: "table",
            columns: ["Cookie / Speicher", "Zweck", "Art", "Laufzeit"],
            rows: [
              [
                "convrs-cookie-consent",
                "Speicherung Ihrer Cookie-Akzeptanzpräferenz",
                "localStorage",
                "Bis zur Löschung (browserabhängig)",
              ],
              [
                "theme / color-scheme Präferenz",
                "Speicherung Ihrer Auswahl für das helle/dunkle Design",
                "localStorage",
                "Bis zur Löschung (browserabhängig)",
              ],
            ],
          },
          { type: "h4", content: ["b) Analytische Cookies (Google Analytics)"] },
          {
            type: "p",
            content: [
              "Google Analytics platziert analytische Cookies, mit denen verstanden wird, wie die Website genutzt wird (Anzahl der Besuche, Sitzungsdauer, ungefähre geografische Region, Browser-/Gerätetyp). Diese Cookies werden ",
              { text: "nur nach erteilter Einwilligung", bold: true },
              " durch Cookie-Akzeptanz aktiviert und erzeugen lediglich anonymisierte und aggregierte Statistiken. Ihre Dateiinhalte werden in diesem Zusammenhang niemals verarbeitet.",
            ],
          },
          {
            type: "table",
            columns: ["Cookie / Speicher", "Zweck", "Art", "Laufzeit"],
            rows: [
              [
                "_ga, _gid, _gat, _ga_*",
                "Besuchersitzung und Nutzungsstatistiken",
                "Erstanbieter / Analytisch",
                "_ga: 2 Jahre · _gid: 24 Stunden · _gat: 1 Min",
              ],
            ],
          },
          { type: "h4", content: ["c) Werbe-Cookies (Google AdSense)"] },
          {
            type: "p",
            content: [
              "Google AdSense kann Erstanbieter- und Drittanbieter-Cookies (z. B. ",
              { text: "NID", code: true },
              " sowie einwilligungsbezogene Cookies gemäß den US-/EU-Cookie-Einwilligungsvorschriften) verwenden, um Anzeigen zu schalten, die Werbeleistung zu messen und Ihnen relevantere Anzeigen anzuzeigen. Diese Cookies werden aktiviert, wenn Sie Cookies akzeptieren. Wenn Sie keine Einwilligung geben (oder diese zurückziehen), werden nur nicht personalisierte (Limited Ads) Anzeigen geschaltet und diese Anzeigen werden nicht auf der Grundlage Ihres Browserverlaufs gezielt ausgerichtet. Sie können die Personalisierung von Werbung jederzeit über ",
              { text: "Google Anzeigeneinstellungen", url: links.googleAdsSettings, external: true },
              " deaktivieren.",
            ],
          },
        ],
      },
      {
        heading: ["3. Einwilligung und Cookie-Akzeptanz"],
        blocks: [
          {
            type: "p",
            content: [
              "Gemäß KVKK und DSGVO erfordern einwilligungspflichtige Cookies wie analytische und werbliche Cookies ",
              { text: "Ihre informierte ausdrückliche Einwilligung", bold: true },
              ". Mit dem Klicken auf die Schaltfläche „Akzeptieren“ in der Cookie-Benachrichtigung, die beim ersten Eintritt auf die Website erscheint, erteilen Sie Ihre ausdrückliche Einwilligung in diese Cookie-Arten. Wenn Sie die Schaltfläche „Schließen“ anklicken oder keine Handlung vornehmen, werden nur notwendige Cookies und Browser-Speicherbereiche verwendet; analytische und werbliche Cookies werden nicht aktiviert.",
            ],
          },
          {
            type: "p",
            content: [
              "Sie können Ihre Einwilligung jederzeit widerrufen. Der Widerruf berührt die Rechtmäßigkeit der bis zum Widerruf auf Grundlage der Einwilligung erfolgten Verarbeitung nicht (DSGVO Art. 7/3; KVKK Art. 5/1).",
            ],
          },
        ],
      },
      {
        heading: ["4. Wie können Sie Cookies verwalten?"],
        blocks: [
          {
            type: "p",
            content: [
              "Sie können Cookies und Browser-Speicherbereiche auf folgende Weisen verwalten oder vollständig blockieren:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Browsereinstellungen:", bold: true },
                " Über das Einstellungsmenü Ihres Browsers können Sie alle Cookies blockieren, löschen oder so konfigurieren, dass bei jedem Besuch um Bestätigung gebeten wird. (Z. B. ",
                { text: "Chrome", bold: true },
                " ",
                { text: "Einstellungen → Datenschutz und Sicherheit → Cookies", code: true },
                "; ",
                { text: "Firefox", bold: true },
                " ",
                { text: "Einstellungen → Datenschutz & Sicherheit", code: true },
                "; ",
                { text: "Safari", bold: true },
                " ",
                { text: "Einstellungen → Datenschutz", code: true },
                ".)",
              ],
              [
                { text: "Cookie-Akzeptanzpräferenz:", bold: true },
                " Durch das Löschen des Eintrags ",
                { text: "convrs-cookie-consent", code: true },
                " in Ihrem Browser-Speicher können Sie die Cookie-Benachrichtigung erneut anzeigen und Ihre Präferenz ändern.",
              ],
              [
                { text: "Google Anzeigeneinstellungen:", bold: true },
                " Sie können die Personalisierung von Werbung über ",
                { text: "adssettings.google.com", url: links.googleAdsSettings, external: true },
                " deaktivieren.",
              ],
              [
                { text: "Weitere Informationen:", bold: true },
                " Nähere Informationen zur Verwaltung von Cookies finden Sie unter ",
                { text: "www.allaboutcookies.org", url: links.allaboutcookies, external: true },
                ".",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Das Blockieren oder Löschen von Cookies beeinträchtigt die Kernfunktionen der Dateikonvertierung auf der Website nicht; es kann lediglich das Speichern bestimmter Präferenzen (Design, Cookie-Präferenz usw.) und die Auslieferung personalisierter Werbung betreffen.",
            ],
          },
        ],
      },
      {
        heading: ["5. Verantwortung für Cookies von Drittanbietern"],
        blocks: [
          {
            type: "p",
            content: [
              "Die Verwendung der von Google (Analytics und AdSense) platzierten Drittanbieter-Cookies, ihre Laufzeiten und die Verarbeitungstätigkeiten im Zusammenhang mit den durch diese Cookies erhobenen Daten unterliegen den eigenen Datenschutz- und Cookie-Richtlinien von Google. Wir haben keine Kontrolle über die Funktionsweise dieser Drittanbieter-Cookies; die Verantwortung liegt bei der betreffenden Plattform eines Dritten. Einzelheiten:",
            ],
          },
          {
            type: "list",
            items: [
              [{ text: "Google-Datenschutzerklärung", url: links.googlePrivacy, external: true }],
              [{ text: "Wie Google Cookies verwendet", url: links.googleCookies, external: true }],
              [{ text: "Wie Google Daten auf Partnerwebsites verwendet", url: links.googlePartnerSites, external: true }],
            ],
          },
        ],
      },
      {
        heading: ["6. Hinweis gemäß CCPA"],
        blocks: [
          {
            type: "p",
            content: [
              "Im Rahmen des California Consumer Privacy Act (",
              { text: "CCPA", bold: true },
              ") ",
              { text: "„verkaufen“ oder „teilen\" wir Ihre personenbezogenen Informationen nicht (für verhaltensübergreifende Werbung)", bold: true },
              ". Die von uns verwendeten analytischen und werblichen Cookies können die Verarbeitung technischer Daten, die gemäß CCPA als „personenbezogene Informationen“ gelten können, mit Drittanbietern umfassen; wenn Sie diesen Cookies nicht zustimmen oder die Personalisierung über Google Anzeigeneinstellungen deaktivieren, findet eine solche Verarbeitung nicht statt. Sie können uns kontaktieren, um Ihr Recht wahrzunehmen, dass Ihre Daten nicht verkauft oder geteilt werden.",
            ],
          },
        ],
      },
      {
        heading: ["7. Kontakt und Änderungen"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "Bei Fragen zu dieser Cookie-Richtlinie oder für weitere Informationen können Sie uns kontaktieren: ",
              { text: "support@convrs.org", url: links.contactMail },
              ". Wir können diese Richtlinie von Zeit zu Zeit aktualisieren; wesentliche Änderungen werden durch das Datum „Zuletzt aktualisiert“ angezeigt, und Ihre fortgesetzte Nutzung der Website nach Inkrafttreten der Änderungen stellt die Annahme der aktualisierten Richtlinie dar.",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ESPAÑOL ───────────────
  es: {
    eyebrow: "Legal",
    title: "Política de Cookies",
    updatedLabel: "Última actualización:",
    updatedDate: "5 de septiembre de 2026",
    scope: "Válido para: https://convrs.org — conforme a KVKK · RGPD · CCPA",
    intro: [
      [
        "Esta Política de Cookies explica los tipos, finalidades y duraciones de las cookies y áreas de almacenamiento del navegador utilizadas en el sitio web de Convrs, así como la forma de gestionar estas tecnologías, de conformidad con la Ley turca n.º 6698 sobre Protección de Datos Personales (",
        { text: "KVKK", bold: true },
        "), el Reglamento General de Protección de Datos de la Unión Europea (",
        { text: "RGPD", bold: true },
        ") y demás normativa aplicable en vigor. Debe leer esta política junto con la ",
        { text: "Política de Privacidad", url: "/privacy-policy", internal: true },
        " y las ",
        { text: "Condiciones de Uso", url: "/terms-of-service", internal: true },
        ".",
      ],
    ],
    sections: [
      {
        heading: ["1. ¿Qué son las cookies?"],
        blocks: [
          {
            type: "p",
            content: [
              "Las cookies son pequeños archivos de texto que su navegador guarda en su dispositivo cuando visita un sitio web. Durante sus visitas, las cookies transportan información entre su navegador y el sitio, y permiten que el sitio le recuerde. Además, el almacenamiento del navegador (localStorage) es una tecnología similar que se utiliza para guardar datos dentro del navegador con el mismo tipo de finalidad.",
            ],
          },
          {
            type: "p",
            content: [
              { text: "Nota importante:", bold: true },
              " El contenido de los archivos que convierta nunca se almacena en ninguna cookie, en localStorage ni en el lado del servidor. Las cookies se utilizan únicamente para preferencias del sitio, analíticas y publicidad.",
            ],
          },
        ],
      },
      {
        heading: ["2. Cookies y Áreas de Almacenamiento del Navegador que Utilizamos"],
        blocks: [
          { type: "h4", content: ["a) Cookies estrictamente necesarias / funcionales"] },
          {
            type: "p",
            content: [
              "Las cookies estrictamente necesarias son imprescindibles para las funciones básicas y la seguridad del sitio. No están sujetas a su consentimiento (KVKK art. 5/2-ç; RGPD art. 6/1-b).",
            ],
          },
          {
            type: "table",
            columns: ["Cookie / Almacenamiento", "Finalidad", "Tipo", "Duración"],
            rows: [
              [
                "convrs-cookie-consent",
                "Recordar su preferencia de aceptación de cookies",
                "localStorage",
                "Hasta su eliminación (depende del navegador)",
              ],
              [
                "preferencia de tema / color-scheme",
                "Recordar su selección de tema claro/oscuro",
                "localStorage",
                "Hasta su eliminación (depende del navegador)",
              ],
            ],
          },
          { type: "h4", content: ["b) Cookies analíticas (Google Analytics)"] },
          {
            type: "p",
            content: [
              "Google Analytics coloca cookies analíticas para comprender cómo se utiliza el sitio (número de visitas, duración de la sesión, región geográfica aproximada, tipo de navegador/dispositivo). Estas cookies se ",
              { text: "activan únicamente tras conceder su consentimiento", bold: true },
              " mediante la aceptación de cookies y generan solo estadísticas anonimizadas y agregadas. El contenido de sus archivos nunca se procesa en este contexto.",
            ],
          },
          {
            type: "table",
            columns: ["Cookie / Almacenamiento", "Finalidad", "Tipo", "Duración"],
            rows: [
              [
                "_ga, _gid, _gat, _ga_*",
                "Sesión de visitante y estadísticas de uso del sitio",
                "De origen / Analítica",
                "_ga: 2 años · _gid: 24 horas · _gat: 1 min",
              ],
            ],
          },
          { type: "h4", content: ["c) Cookies publicitarias (Google AdSense)"] },
          {
            type: "p",
            content: [
              "Google AdSense puede utilizar cookies de origen y de terceros (p. ej., ",
              { text: "NID", code: true },
              " y cookies relacionadas con el consentimiento conforme a la normativa de consentimiento de cookies de EE. UU./UE) para publicar anuncios, medir el rendimiento publicitario y mostrarle anuncios más relevantes. Estas cookies se activan si acepta las cookies. Si no acepta las cookies (o retira su consentimiento), solo se muestran anuncios no personalizados (Limited Ads) y estos anuncios no se orientan en función de su historial de navegación. Puede desactivar la personalización de anuncios en cualquier momento a través de ",
              { text: "Configuración de anuncios de Google", url: links.googleAdsSettings, external: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["3. Consentimiento y Aceptación de Cookies"],
        blocks: [
          {
            type: "p",
            content: [
              "En virtud de la KVKK y el RGPD, las cookies sujetas a consentimiento, como las analíticas y publicitarias, requieren ",
              { text: "su consentimiento explícito e informado", bold: true },
              ". Al hacer clic en el botón «Aceptar» del aviso de cookies que aparece cuando entra por primera vez en el sitio, otorga su consentimiento explícito a estos tipos de cookies. Si hace clic en el botón de cerrar o no realiza ninguna acción, solo se utilizan cookies estrictamente necesarias y áreas de almacenamiento del navegador; las cookies analíticas y publicitarias no se activan.",
            ],
          },
          {
            type: "p",
            content: [
              "Puede retirar su consentimiento en cualquier momento. La retirada no afecta a la licitud del tratamiento basado en el consentimiento antes de su retirada (RGPD art. 7/3; KVKK art. 5/1).",
            ],
          },
        ],
      },
      {
        heading: ["4. ¿Cómo puede gestionar las cookies?"],
        blocks: [
          {
            type: "p",
            content: [
              "Puede gestionar o bloquear por completo las cookies y las áreas de almacenamiento del navegador mediante los siguientes métodos:",
            ],
          },
          {
            type: "list",
            items: [
              [
                { text: "Configuración del navegador:", bold: true },
                " Desde el menú de configuración de su navegador puede bloquear o eliminar todas las cookies, o configurarlas para solicitar confirmación en cada visita. (P. ej., ",
                { text: "Chrome", bold: true },
                " ",
                { text: "Configuración → Privacidad y seguridad → Cookies", code: true },
                "; ",
                { text: "Firefox", bold: true },
                " ",
                { text: "Configuración → Privacidad y seguridad", code: true },
                "; ",
                { text: "Safari", bold: true },
                " ",
                { text: "Preferencias → Privacidad", code: true },
                ".)",
              ],
              [
                { text: "Preferencia de aceptación de cookies:", bold: true },
                " Eliminando el registro ",
                { text: "convrs-cookie-consent", code: true },
                " del almacenamiento de su navegador, puede volver a mostrar el aviso de cookies y cambiar su preferencia.",
              ],
              [
                { text: "Configuración de anuncios de Google:", bold: true },
                " Puede desactivar la personalización de anuncios a través de ",
                { text: "adssettings.google.com", url: links.googleAdsSettings, external: true },
                ".",
              ],
              [
                { text: "Más información:", bold: true },
                " Para obtener información detallada sobre la gestión de cookies, visite ",
                { text: "www.allaboutcookies.org", url: links.allaboutcookies, external: true },
                ".",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Bloquear o eliminar las cookies no afecta a las funciones básicas de conversión de archivos del sitio; solo puede afectar al recuerdo de ciertas preferencias (tema, preferencia de cookies, etc.) y a la entrega de publicidad personalizada.",
            ],
          },
        ],
      },
      {
        heading: ["5. Responsabilidad sobre las Cookies de Terceros"],
        blocks: [
          {
            type: "p",
            content: [
              "El uso de las cookies de terceros colocadas por Google (Analytics y AdSense), sus duraciones y las actividades de tratamiento relativas a los datos recopilados mediante estas cookies están sujetos a las propias políticas de privacidad y cookies de Google. No tenemos control sobre el funcionamiento de estas cookies de terceros; la responsabilidad recae en la plataforma de terceros correspondiente. Para más detalles:",
            ],
          },
          {
            type: "list",
            items: [
              [{ text: "Política de Privacidad de Google", url: links.googlePrivacy, external: true }],
              [{ text: "Cómo utiliza Google las cookies", url: links.googleCookies, external: true }],
              [{ text: "Cómo utiliza Google los datos en los sitios de socios", url: links.googlePartnerSites, external: true }],
            ],
          },
        ],
      },
      {
        heading: ["6. Aviso en virtud de la CCPA"],
        blocks: [
          {
            type: "p",
            content: [
              "De conformidad con la Ley de Privacidad del Consumidor de California (",
              { text: "CCPA", bold: true },
              "), no ",
              { text: "«vendemos» ni «compartimos» su información personal (para publicidad conductual entre contextos)", bold: true },
              ". Las cookies analíticas y publicitarias que utilizamos pueden implicar el tratamiento de datos técnicos, que podrían considerarse «información personal» en virtud de la CCPA, con proveedores de terceros; si no consiente estas cookies o desactiva la personalización a través de Configuración de anuncios de Google, dicho tratamiento no se produce. Puede ponerse en contacto con nosotros para ejercer su derecho a que sus datos no se vendan ni se compartan.",
            ],
          },
        ],
      },
      {
        heading: ["7. Contacto y Cambios"],
        divider: true,
        blocks: [
          {
            type: "p",
            content: [
              "Si tiene preguntas sobre esta Política de Cookies o desea más información, puede ponerse en contacto con nosotros: ",
              { text: "support@convrs.org", url: links.contactMail },
              ". Podemos actualizar esta política de vez en cuando; los cambios significativos se indican mediante la fecha de «Última actualización», y su uso continuado del sitio después de que los cambios entren en vigor constituye la aceptación de la política actualizada.",
            ],
          },
        ],
      },
    ],
  },
};