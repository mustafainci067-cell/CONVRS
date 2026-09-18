import { type LegalContent, links, SUPPORT_EMAIL } from "./types";

export const aboutContent: LegalContent = {
  en: {
    eyebrow: "Our Mission",
    title: "About Us",
    updatedLabel: "Last Updated",
    updatedDate: "2026-09-18",
    intro: [
      [
        "Welcome to ",
        { text: "convrs.org", bold: true },
        ", your privacy-first digital toolbox. Our mission is to provide fast, secure, and accessible tools that run entirely in your browser."
      ]
    ],
    sections: [
      {
        heading: ["The Zero-Backend Philosophy"],
        blocks: [
          {
            type: "p",
            content: [
              "We noticed a major problem with most online converters and tools: they require you to upload your sensitive files to their servers. This not only wastes time with uploads and downloads but poses a massive security and privacy risk."
            ]
          },
          {
            type: "p",
            content: [
              "At convrs.org, we operate on a ",
              { text: "100% Zero-Backend architecture", bold: true },
              ". Using modern WebAssembly (Wasm) and HTML5 technologies, all file processing happens directly on your device. Whether you are compressing images, splitting PDFs, or converting formats, your files never leave your computer."
            ]
          }
        ]
      },
      {
        heading: ["Why Choose Us?"],
        blocks: [
          {
            type: "list",
            items: [
              [{ text: "Total Privacy:", bold: true }, " No uploads. No servers. Your data remains strictly yours."],
              [{ text: "Lightning Fast:", bold: true }, " Eliminate the latency of uploading and downloading large files."],
              [{ text: "Uncapped Limits:", bold: true }, " Forget restrictive file size limits imposed by cloud providers."],
              [{ text: "Free to Use:", bold: true }, " We offer powerful tools entirely for free, supported ethically by AdSense."]
            ]
          }
        ]
      },
      {
        heading: ["Contact the Team"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "We would love to hear from you. For feedback, feature requests, or support, please reach out:",
            lines: [
              [{ text: "Email: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }],
              [{ text: "GitHub: ", bold: true }, { text: "convrs-repo", url: "https://github.com/mustafainci067-cell/convrs", external: true }]
            ]
          }
        ]
      }
    ]
  },
  tr: {
    eyebrow: "Misyonumuz",
    title: "Hakkımızda",
    updatedLabel: "Son Güncelleme",
    updatedDate: "18 Eylül 2026",
    intro: [
      [
        "Gizlilik odaklı dijital araç çantanız ",
        { text: "convrs.org", bold: true },
        "'a hoş geldiniz. Misyonumuz, tamamen tarayıcınızda çalışan hızlı, güvenli ve erişilebilir araçlar sunmaktır."
      ]
    ],
    sections: [
      {
        heading: ["Zero-Backend (Sıfır Sunucu) Felsefesi"],
        blocks: [
          {
            type: "p",
            content: [
              "Çevrimiçi dönüştürücülerin çoğunda büyük bir sorun fark ettik: Hassas dosyalarınızı kendi sunucularına yüklemenizi istiyorlar. Bu sadece vakit kaybı değil, aynı zamanda devasa bir güvenlik riski."
            ]
          },
          {
            type: "p",
            content: [
              "convrs.org olarak ",
              { text: "%100 Zero-Backend (Sıfır Sunucu) mimarisiyle", bold: true },
              " çalışıyoruz. Modern WebAssembly ve HTML5 teknolojilerini kullanarak, tüm dosya işlemlerinin doğrudan cihazınızda gerçekleşmesini sağlıyoruz. Dosyalarınız bilgisayarınızdan asla dışarı çıkmaz."
            ]
          }
        ]
      },
      {
        heading: ["Neden Bizi Seçmelisiniz?"],
        blocks: [
          {
            type: "list",
            items: [
              [{ text: "Tam Gizlilik:", bold: true }, " Yükleme yok. Sunucu yok. Verileriniz size ait kalır."],
              [{ text: "Şimşek Hızında:", bold: true }, " Büyük dosyaları yükleme ve indirme bekleme süresi ortadan kalkar."],
              [{ text: "Sınırsız:", bold: true }, " Bulut sağlayıcılarının uyguladığı sıkı dosya boyutu sınırlarını unutun."],
              [{ text: "Ücretsiz:", bold: true }, " Güçlü araçları tamamen ücretsiz olarak sunuyoruz."]
            ]
          }
        ]
      },
      {
        heading: ["Ekip ile İletişim"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "Geri bildirim, özellik talepleri veya destek için lütfen bize ulaşın:",
            lines: [
              [{ text: "E-posta: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }],
              [{ text: "GitHub: ", bold: true }, { text: "convrs-repo", url: "https://github.com/mustafainci067-cell/convrs", external: true }]
            ]
          }
        ]
      }
    ]
  },
  de: {
    eyebrow: "Unsere Mission",
    title: "Über uns",
    updatedLabel: "Zuletzt aktualisiert",
    updatedDate: "18. September 2026",
    intro: [
      [
        "Willkommen bei ",
        { text: "convrs.org", bold: true },
        ", Ihrem datenschutzorientierten digitalen Werkzeugkasten. Unsere Mission ist es, schnelle, sichere Werkzeuge bereitzustellen, die vollständig in Ihrem Browser laufen."
      ]
    ],
    sections: [
      {
        heading: ["Die Zero-Backend-Philosophie"],
        blocks: [
          {
            type: "p",
            content: [
              "Wir haben ein großes Problem bei den meisten Online-Konvertern festgestellt: Sie verlangen, dass Sie Ihre sensiblen Dateien auf ihre Server hochladen. Das ist ein massives Sicherheits- und Datenschutzrisiko."
            ]
          },
          {
            type: "p",
            content: [
              "Bei convrs.org arbeiten wir mit einer ",
              { text: "100% Zero-Backend-Architektur", bold: true },
              ". Mithilfe von WebAssembly und HTML5 erfolgt die gesamte Dateiverarbeitung direkt auf Ihrem Gerät."
            ]
          }
        ]
      },
      {
        heading: ["Warum wir?"],
        blocks: [
          {
            type: "list",
            items: [
              [{ text: "Vollständiger Datenschutz:", bold: true }, " Keine Uploads. Keine Server."],
              [{ text: "Blitzschnell:", bold: true }, " Keine Wartezeiten durch Uploads."],
              [{ text: "Unbegrenzt:", bold: true }, " Vergessen Sie restriktive Dateigrößenbeschränkungen."],
              [{ text: "Kostenlos:", bold: true }, " Wir bieten leistungsstarke Tools völlig kostenlos an."]
            ]
          }
        ]
      },
      {
        heading: ["Kontaktieren Sie das Team"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "Für Feedback, Support oder Anfragen erreichen Sie uns unter:",
            lines: [
              [{ text: "E-Mail: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }]
            ]
          }
        ]
      }
    ]
  },
  es: {
    eyebrow: "Nuestra Misión",
    title: "Sobre nosotros",
    updatedLabel: "Última actualización",
    updatedDate: "18 de septiembre de 2026",
    intro: [
      [
        "Bienvenido a ",
        { text: "convrs.org", bold: true },
        ", su caja de herramientas digital centrada en la privacidad."
      ]
    ],
    sections: [
      {
        heading: ["La filosofía de cero servidores"],
        blocks: [
          {
            type: "p",
            content: [
              "En convrs.org operamos con una ",
              { text: "arquitectura 100% Zero-Backend", bold: true },
              ". Usando WebAssembly y HTML5, todo el procesamiento de archivos ocurre directamente en su dispositivo."
            ]
          }
        ]
      },
      {
        heading: ["¿Por qué elegirnos?"],
        blocks: [
          {
            type: "list",
            items: [
              [{ text: "Privacidad Total:", bold: true }, " Sin cargas. Sin servidores."],
              [{ text: "Rápido:", bold: true }, " Elimine la latencia de subir y bajar archivos."],
              [{ text: "Gratis:", bold: true }, " Ofrecemos herramientas de forma gratuita."]
            ]
          }
        ]
      },
      {
        heading: ["Contacto"],
        divider: true,
        blocks: [
          {
            type: "contact",
            title: "Para comentarios o soporte, contáctenos en:",
            lines: [
              [{ text: "Correo: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }]
            ]
          }
        ]
      }
    ]
  }
};
