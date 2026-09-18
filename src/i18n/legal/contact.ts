import { type LegalContent, links, SUPPORT_EMAIL } from "./types";

export const contactContent: LegalContent = {
  en: {
    eyebrow: "Get in Touch",
    title: "Contact Us",
    updatedLabel: "Last Updated",
    updatedDate: "2026-09-18",
    intro: [
      [
        "Have a question, feedback, or feature request? We'd love to hear from you."
      ]
    ],
    sections: [
      {
        heading: ["How to Reach Us"],
        blocks: [
          {
            type: "contact",
            title: "You can reach the convrs.org team through the following channels:",
            lines: [
              [{ text: "Email: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }],
              [{ text: "GitHub: ", bold: true }, { text: "Open an Issue", url: "https://github.com/mustafainci067-cell/convrs/issues", external: true }]
            ]
          },
          {
            type: "p",
            content: [
              "We typically respond to inquiries within 24-48 hours. If you are reporting a bug, please include your browser version and OS."
            ]
          }
        ]
      }
    ]
  },
  tr: {
    eyebrow: "İletişime Geçin",
    title: "İletişim",
    updatedLabel: "Son Güncelleme",
    updatedDate: "18 Eylül 2026",
    intro: [
      [
        "Bir sorunuz, geri bildiriminiz veya özellik talebiniz mi var? Sizden haber almayı çok isteriz."
      ]
    ],
    sections: [
      {
        heading: ["Bize Nasıl Ulaşabilirsiniz?"],
        blocks: [
          {
            type: "contact",
            title: "convrs.org ekibine aşağıdaki kanallardan ulaşabilirsiniz:",
            lines: [
              [{ text: "E-posta: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }],
              [{ text: "GitHub: ", bold: true }, { text: "Hata Bildirin (Issue)", url: "https://github.com/mustafainci067-cell/convrs/issues", external: true }]
            ]
          },
          {
            type: "p",
            content: [
              "Taleplere genellikle 24-48 saat içinde yanıt veriyoruz. Eğer bir hata bildiriyorsanız, lütfen tarayıcı sürümünüzü ve işletim sisteminizi eklemeyi unutmayın."
            ]
          }
        ]
      }
    ]
  },
  de: {
    eyebrow: "Kontakt aufnehmen",
    title: "Kontakt",
    updatedLabel: "Zuletzt aktualisiert",
    updatedDate: "18. September 2026",
    intro: [
      [
        "Haben Sie eine Frage, Feedback oder einen Funktionswunsch? Wir würden uns freuen, von Ihnen zu hören."
      ]
    ],
    sections: [
      {
        heading: ["Wie Sie uns erreichen"],
        blocks: [
          {
            type: "contact",
            title: "Sie erreichen das convrs.org-Team über die folgenden Kanäle:",
            lines: [
              [{ text: "E-Mail: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }],
              [{ text: "GitHub: ", bold: true }, { text: "Ein Problem melden", url: "https://github.com/mustafainci067-cell/convrs/issues", external: true }]
            ]
          },
          {
            type: "p",
            content: [
              "Wir antworten in der Regel innerhalb von 24-48 Stunden auf Anfragen."
            ]
          }
        ]
      }
    ]
  },
  es: {
    eyebrow: "Ponerse en contacto",
    title: "Contacto",
    updatedLabel: "Última actualización",
    updatedDate: "18 de septiembre de 2026",
    intro: [
      [
        "¿Tiene alguna pregunta, comentario o solicitud de función? Nos encantaría saber de usted."
      ]
    ],
    sections: [
      {
        heading: ["Cómo comunicarse con nosotros"],
        blocks: [
          {
            type: "contact",
            title: "Puede comunicarse con el equipo de convrs.org a través de los siguientes canales:",
            lines: [
              [{ text: "Correo electrónico: ", bold: true }, { text: SUPPORT_EMAIL, url: links.contactMail }],
              [{ text: "GitHub: ", bold: true }, { text: "Abrir un problema", url: "https://github.com/mustafainci067-cell/convrs/issues", external: true }]
            ]
          },
          {
            type: "p",
            content: [
              "Por lo general, respondemos a las consultas dentro de las 24 a 48 horas."
            ]
          }
        ]
      }
    ]
  }
};
