import type { LegalContent } from "./types";
import { links } from "./types";

export const contactContent: LegalContent = {
  // ─────────────── TÜRKÇE ───────────────
  tr: {
    eyebrow: "İletişim",
    title: "Convrs İletişim",
    updatedLabel: "Son güncelleme:",
    updatedDate: "16 Eylül 2026",
    note: {
      type: "note",
      tone: "success",
      title: "Mesajlarınız Gizli İşlenir",
      content: [
        "Bize gönderdiğiniz mesajlar gizlilikle ele alınır. Üstelik tüm dönüştürme işlemleri tamamen tarayıcınızda gerçekleştiği için, açığa çıkabilecek saklanmış veya iletilmiş hiçbir veri yoktur — verileriniz, bize yazmadan önce bile zaten özeldir.",
      ],
    },
    intro: [
      [
        "Sizden haber almayı çok isteriz. Bir araç hakkında sorunuz, yeni bir format öneriniz, bildirmek istediğiniz bir hata veya veri koruma mevzuatı kapsamındaki bir talebiniz olsun; Convrs ekibi her mesajı okur ve genellikle ",
        { text: "bir ila iki iş günü", bold: true },
        " içinde yanıt verir.",
      ],
      [
        "İletişime geçmeden önce SSS sayfamıza ve ilgili araç sayfasına göz atmanızı öneririz — yanıt büyük olasılıkla zaten oradadır. Yine de yardıma ihtiyacınız olursa aşağıdaki kanalları kullanabilirsiniz.",
      ],
    ],
    sections: [
      {
        heading: ["1. Bize Nasıl Ulaşırsınız?"],
        blocks: [
          {
            type: "contact",
            title: "Destek E-postası",
            lines: [
              [
                "E-posta: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "Web sitesi: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Tüm destek ve iş başvuruları ",
              { text: "support@convrs.org", bold: true },
              " adresinden kabul edilir. Mesajlarınıza en iyi şekilde yanıt verebilmemiz için lütfen aşağıdaki bölümdeki bilgileri ekleyin.",
            ],
          },
        ],
      },
      {
        heading: ["2. Mesajınıza Neleri Eklemelisiniz?"],
        blocks: [
          {
            type: "p",
            content: [
              "Sorununuzu hızlıca çözebilmemiz için lütfen şu bilgileri paylaşın:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Kullandığınız aracın adı ve izlediğiniz adımlar.",
              ],
              [
                "İşlediğiniz dosyanın formatı ve mümkünse boyutu.",
              ],
              [
                "Gerçekleşmesini beklediğiniz sonuç ile gerçekleşen sonuç.",
              ],
              [
                "Kullandığınız tarayıcı ve işletim sistemi.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Önemli: ",
              { text: "Lütfen mesajınıza dosya eklemeyin", bold: true },
              ". Tüm dönüştürme işlemleri tarayıcınızda gerçekleşir; dosyalarınızı işleyebilecek bir altyapımız yoktur ve buna gerek de yoktur. Böylece gizlilik önceliğimizi koruruz.",
            ],
          },
        ],
      },
      {
        heading: ["3. Yanıt Süreleri"],
        blocks: [
          {
            type: "p",
            content: [
              "Her mesaja ",
              { text: "bir ila iki iş günü", bold: true },
              " içinde yanıt vermeyi hedefliyoruz. Yasal ve veri koruma talepleri önceliklendirilir; KVKK, GDPR veya CCPA kapsamındaki meşru talepler, yasaların gerektirdiği şekilde yanıtlanır.",
            ],
          },
          {
            type: "p",
            content: [
              "Hafta sonları ve resmi tatillerde yanıt süreleri biraz uzayabilir; anlayışınız için teşekkür ederiz.",
            ],
          },
        ],
      },
      {
        heading: ["4. Gizlilik Güvencesi"],
        blocks: [
          {
            type: "p",
            content: [
              "Sizden dosyalarınızı e-posta ile göndermenizi istemeyeceğiz ve hiçbir yere yüklemenizi talep etmeyeceğiz. Convrs'ta işlediğiniz hiçbir dosya cihazınızdan ayrılmaz; eğer bir yükleme talebi görürseniz, bu bizden değildir ve o sayfayı kapatmalısınız.",
            ],
          },
          {
            type: "p",
            content: [
              "Neleri işlediğimiz ve haklarınız hakkında tüm ayrıntılar için ",
              { text: "Gizlilik Politikası", url: "/privacy-policy", internal: true },
              "'mızı, kabul edilebilir kullanım kuralları için ",
              { text: "Kullanım Şartları", url: "/terms-of-service", internal: true },
              "'mızı inceleyebilirsiniz.",
            ],
          },
        ],
      },
      {
        heading: ["5. Yasal ve Veri İstekleri"],
        blocks: [
          {
            type: "p",
            content: [
              "Yürürlükteki veri koruma mevzuatı (KVKK, GDPR, CCPA) kapsamındaki resmi talepleriniz için lütfen ",
              { text: "support@convrs.org", bold: true },
              " adresine konu satırında ",
              { text: "Veri Talebi", code: true },
              " yazarak ulaşın. Convrs, dosya dönüştürme bağlantılı hiçbir kişisel veriyi aktarmadığı, saklamadığı veya işlemediği için; bu yasalar kapsamındaki bir talep, açıklanacak böyle bir verinin bulunmadığını teyit edecektir.",
            ],
          },
          {
            type: "contact",
            title: "İletişim",
            lines: [
              [
                "E-posta: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Convrs ",
              { text: "İstanbul, Türkiye", bold: true },
              " merkezli bağımsız bir projedir.",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ENGLISH ───────────────
  en: {
    eyebrow: "Contact",
    title: "Contact Convrs",
    updatedLabel: "Last updated:",
    updatedDate: "September 16, 2026",
    note: {
      type: "note",
      tone: "success",
      title: "Your Messages Are Handled Confidentially",
      content: [
        "Your messages are treated with confidentiality. And because every conversion happens entirely in your browser, there is no stored or transmitted data for us to expose — your data is private before you even write to us.",
      ],
    },
    intro: [
      [
        "We would love to hear from you. Whether you have a question about a tool, a suggestion for a new format, a bug to report, or a request under data-protection law, the Convrs team reads every message and typically replies within ",
        { text: "one to two business days", bold: true },
        ".",
      ],
      [
        "Before reaching out, please check the FAQ and the relevant tool page — the answer is probably already there. If you still need help, use the channels below.",
      ],
    ],
    sections: [
      {
        heading: ["1. How to Reach Us"],
        blocks: [
          {
            type: "contact",
            title: "Support Email",
            lines: [
              [
                "Email: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "Website: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "All support and business enquiries are handled at ",
              { text: "support@convrs.org", bold: true },
              ". To help us respond accurately, please include the details described in the next section.",
            ],
          },
        ],
      },
      {
        heading: ["2. What to Include in Your Message"],
        blocks: [
          {
            type: "p",
            content: [
              "To resolve your request as quickly as possible, please share:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "The name of the tool you were using and the exact steps you followed.",
              ],
              [
                "The format, and if possible the size, of the file you were processing.",
              ],
              [
                "What you expected to happen versus what actually happened.",
              ],
              [
                "The browser and operating system you are using.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Important: ",
              { text: "please do not attach files to your message", bold: true },
              ". Every conversion happens in your browser, and we have no infrastructure — and no need — to process your files. This keeps our privacy promise intact.",
            ],
          },
        ],
      },
      {
        heading: ["3. Response Times"],
        blocks: [
          {
            type: "p",
            content: [
              "We aim to reply to every message within ",
              { text: "one to two business days", bold: true },
              ". Legal and data-protection requests are prioritized; legitimate requests under the KVKK, GDPR or CCPA will be answered as required by law.",
            ],
          },
          {
            type: "p",
            content: [
              "Response times may be slightly longer on weekends and public holidays — thank you for your patience.",
            ],
          },
        ],
      },
      {
        heading: ["4. Privacy Guarantee"],
        blocks: [
          {
            type: "p",
            content: [
              "We will never ask you to send your files by email or upload them anywhere. No file you process on Convrs ever leaves your device; if you ever see a request for an upload, it is not from us and you should close that page.",
            ],
          },
          {
            type: "p",
            content: [
              "For full details on what we process and your rights, see our ",
              { text: "Privacy Policy", url: "/privacy-policy", internal: true },
              ". For acceptable-use rules, see our ",
              { text: "Terms of Service", url: "/terms-of-service", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["5. Legal & Data Requests"],
        blocks: [
          {
            type: "p",
            content: [
              "For formal requests under applicable data-protection law (KVKK, GDPR, CCPA), please contact ",
              { text: "support@convrs.org", bold: true },
              " with the subject ",
              { text: "Data Request", code: true },
              ". Because Convrs does not transfer, store or process any personal data in connection with file conversion, a request under these laws will typically confirm that no such data exists to be disclosed.",
            ],
          },
          {
            type: "contact",
            title: "Contact",
            lines: [
              [
                "Email: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Convrs is an independent project based in ",
              { text: "Istanbul, Turkey", bold: true },
              ".",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── DEUTSCH ───────────────
  de: {
    eyebrow: "Kontakt",
    title: "Kontakt zu Convrs",
    updatedLabel: "Zuletzt aktualisiert:",
    updatedDate: "16. September 2026",
    note: {
      type: "note",
      tone: "success",
      title: "Ihre Nachrichten werden vertraulich behandelt",
      content: [
        "Ihre Nachrichten werden vertraulich behandelt. Und da jede Konvertierung vollständig in Ihrem Browser stattfindet, gibt es keine gespeicherten oder übertragenen Daten, die offengelegt werden könnten — Ihre Daten sind privat, noch bevor Sie uns schreiben.",
      ],
    },
    intro: [
      [
        "Wir freuen uns über Ihre Nachricht. Ob Sie eine Frage zu einem Tool haben, einen neuen Formatwunsch äußern, einen Fehler melden oder ein Anliegen nach Datenschutzrecht vorbringen möchten — das Convrs-Team liest jede Nachricht und antwortet in der Regel innerhalb von ",
        { text: "ein bis zwei Werktagen", bold: true },
        ".",
      ],
      [
        "Bevor Sie uns kontaktieren, schauen Sie bitte zuerst in die FAQ und auf die jeweilige Werkzeugseite — die Antwort finden Sie dort wahrscheinlich bereits. Falls Sie dennoch Hilfe benötigen, nutzen Sie die folgenden Kanäle.",
      ],
    ],
    sections: [
      {
        heading: ["1. So erreichen Sie uns"],
        blocks: [
          {
            type: "contact",
            title: "Support-E-Mail",
            lines: [
              [
                "E-Mail: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "Website: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Alle Support- und Geschäftsanfragen bearbeiten wir unter ",
              { text: "support@convrs.org", bold: true },
              ". Damit wir präzise antworten können, fügen Sie bitte die Angaben aus dem nächsten Abschnitt hinzu.",
            ],
          },
        ],
      },
      {
        heading: ["2. Was Sie in Ihre Nachricht aufnehmen sollten"],
        blocks: [
          {
            type: "p",
            content: [
              "Damit wir Ihre Anfrage so schnell wie möglich lösen, teilen Sie bitte mit:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "Den Namen des verwendeten Tools und die genauen Schritte, die Sie befolgt haben.",
              ],
              [
                "Das Format und, wenn möglich, die Größe der verarbeiteten Datei.",
              ],
              [
                "Was Sie erwartet haben und was tatsächlich passiert ist.",
              ],
              [
                "Den verwendeten Browser und das Betriebssystem.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Wichtig: ",
              { text: "Bitte hängen Sie keine Dateien an Ihre Nachricht an", bold: true },
              ". Jede Konvertierung findet in Ihrem Browser statt, und wir haben keine Infrastruktur — und keine Notwendigkeit —, Ihre Dateien zu verarbeiten. So bleibt unser Datenschutzversprechen gewahrt.",
            ],
          },
        ],
      },
      {
        heading: ["3. Antwortzeiten"],
        blocks: [
          {
            type: "p",
            content: [
              "Wir antworten auf jede Nachricht in der Regel innerhalb von ",
              { text: "ein bis zwei Werktagen", bold: true },
              ". Rechtliche und datenschutzrechtliche Anliegen werden priorisiert; berechtigte Anfragen nach DSGVO, KVKK oder CCPA werden wie gesetzlich vorgeschrieben beantwortet.",
            ],
          },
          {
            type: "p",
            content: [
              "An Wochenenden und Feiertagen können die Antwortzeiten etwas länger sein — vielen Dank für Ihre Geduld.",
            ],
          },
        ],
      },
      {
        heading: ["4. Datenschutzgarantie"],
        blocks: [
          {
            type: "p",
            content: [
              "Wir werden Sie niemals bitten, Ihre Dateien per E-Mail zu senden oder irgendwo hochzuladen. Keine Datei, die Sie in Convrs verarbeiten, verlässt je Ihr Gerät; sollten Sie jemals eine Hochlade-Aufforderung sehen, stammt sie nicht von uns, und Sie sollten diese Seite schließen.",
            ],
          },
          {
            type: "p",
            content: [
              "Alle Einzelheiten darüber, was wir verarbeiten und welche Rechte Sie haben, finden Sie in unserer ",
              { text: "Datenschutzrichtlinie", url: "/privacy-policy", internal: true },
              ". Regeln zur zulässigen Nutzung entnehmen Sie bitte unseren ",
              { text: "Nutzungsbedingungen", url: "/terms-of-service", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["5. Rechtliche & Datenanfragen"],
        blocks: [
          {
            type: "p",
            content: [
              "Für formelle Anfragen im Rahmen des geltenden Datenschutzrechts (DSGVO, KVKK, CCPA) wenden Sie sich bitte an ",
              { text: "support@convrs.org", bold: true },
              " mit dem Betreff ",
              { text: "Data Request", code: true },
              ". Da Convrs im Zusammenhang mit der Dateikonvertierung keine personenbezogenen Daten überträgt, speichert oder verarbeitet, wird eine solche Anfrage in der Regel bestätigen, dass keine derartigen Daten zur Offenlegung existieren.",
            ],
          },
          {
            type: "contact",
            title: "Kontakt",
            lines: [
              [
                "E-Mail: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Convrs ist ein unabhängiges Projekt mit Sitz in ",
              { text: "Istanbul, Türkei", bold: true },
              ".",
            ],
          },
        ],
      },
    ],
  },

  // ─────────────── ESPAÑOL ───────────────
  es: {
    eyebrow: "Contacto",
    title: "Contacto con Convrs",
    updatedLabel: "Última actualización:",
    updatedDate: "16 de septiembre de 2026",
    note: {
      type: "note",
      tone: "success",
      title: "Sus mensajes se tratan con confidencialidad",
      content: [
        "Sus mensajes se tratan con confidencialidad. Y como cada conversión ocurre por completo en su navegador, no hay datos almacenados ni transmitidos que pudiéramos exponer: sus datos son privados incluso antes de escribirnos.",
      ],
    },
    intro: [
      [
        "Nos encantaría saber de usted. Tanto si tiene una pregunta sobre una herramienta, una sugerencia para un nuevo formato, un error que notificar o una solicitud en virtud de la legislación de protección de datos, el equipo de Convrs lee todos los mensajes y suele responder en ",
        { text: "uno o dos días laborables", bold: true },
        ".",
      ],
      [
        "Antes de escribirnos, consulte las preguntas frecuentes y la página de la herramienta correspondiente: probablemente la respuesta ya esté allí. Si aún necesita ayuda, use los canales que aparecen a continuación.",
      ],
    ],
    sections: [
      {
        heading: ["1. Cómo ponerse en contacto"],
        blocks: [
          {
            type: "contact",
            title: "Correo de soporte",
            lines: [
              [
                "Correo electrónico: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
              [
                "Sitio web: ",
                { text: "https://convrs.org", url: "https://convrs.org", external: true },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Todas las consultas de soporte y comerciales se gestionan en ",
              { text: "support@convrs.org", bold: true },
              ". Para poder responder con precisión, incluya los detalles que se indican en la siguiente sección.",
            ],
          },
        ],
      },
      {
        heading: ["2. Qué incluir en su mensaje"],
        blocks: [
          {
            type: "p",
            content: [
              "Para resolver su consulta lo antes posible, comparta:",
            ],
          },
          {
            type: "list",
            items: [
              [
                "El nombre de la herramienta que utilizaba y los pasos exactos que siguió.",
              ],
              [
                "El formato y, si es posible, el tamaño del archivo que estaba procesando.",
              ],
              [
                "Lo que esperaba que ocurriera frente a lo que realmente ocurrió.",
              ],
              [
                "El navegador y el sistema operativo que utiliza.",
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Importante: ",
              { text: "no adjunte archivos a su mensaje", bold: true },
              ". Cada conversión ocurre en su navegador, y no tenemos ninguna infraestructura — ni necesidad — de procesar sus archivos. Así mantenemos intacta nuestra promesa de privacidad.",
            ],
          },
        ],
      },
      {
        heading: ["3. Plazos de respuesta"],
        blocks: [
          {
            type: "p",
            content: [
              "Procuramos responder a todos los mensajes en ",
              { text: "uno o dos días laborables", bold: true },
              ". Las solicitudes legales y de protección de datos tienen prioridad; las solicitudes legítimas en virtud de la KVKK, el RGPD o la CCPA se responderán según exige la ley.",
            ],
          },
          {
            type: "p",
            content: [
              "Los plazos de respuesta pueden alargarse ligeramente en fines de semana y días festivos; gracias por su paciencia.",
            ],
          },
        ],
      },
      {
        heading: ["4. Garantía de privacidad"],
        blocks: [
          {
            type: "p",
            content: [
              "Jamás le pediremos que envíe sus archivos por correo o que los suba a ningún sitio. Ningún archivo que procese en Convrs sale nunca de su dispositivo; si alguna vez ve una solicitud de carga, no es nuestra y debe cerrar esa página.",
            ],
          },
          {
            type: "p",
            content: [
              "Para conocer todos los detalles sobre qué procesamos y sus derechos, consulte nuestra ",
              { text: "Política de Privacidad", url: "/privacy-policy", internal: true },
              ". Las normas de uso aceptable se recogen en nuestros ",
              { text: "Términos de Uso", url: "/terms-of-service", internal: true },
              ".",
            ],
          },
        ],
      },
      {
        heading: ["5. Solicitudes legales y de datos"],
        blocks: [
          {
            type: "p",
            content: [
              "Para solicitudes formales en virtud de la legislación de protección de datos aplicable (KVKK, RGPD, CCPA), póngase en contacto con ",
              { text: "support@convrs.org", bold: true },
              " con el asunto ",
              { text: "Data Request", code: true },
              ". Dado que Convrs no transfiere, almacena ni procesa ningún dato personal en relación con la conversión de archivos, una solicitud en virtud de estas leyes normalmente confirmará que no existen tales datos que divulgar.",
            ],
          },
          {
            type: "contact",
            title: "Contacto",
            lines: [
              [
                "Correo electrónico: ",
                { text: links.contactMail.replace("mailto:", ""), url: links.contactMail },
              ],
            ],
          },
          {
            type: "p",
            content: [
              "Convrs es un proyecto independiente con sede en ",
              { text: "Estambul, Turquía", bold: true },
              ".",
            ],
          },
        ],
      },
    ],
  },
};