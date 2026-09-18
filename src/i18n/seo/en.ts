// Faz 3 — SEO icerik sablonu: İngilizce (kanonik) metinler.
// claims: araca ozel "olgu" QA'lari; alt slotlar adim/baslik sablonlaridir.
import type { SeoPhrases } from "./types";

export const en: SeoPhrases = {
  claims: {
    webpSmaller: {
      q: "Is WebP smaller than JPG?",
      a: "Often yes. WebP frequently produces noticeably smaller files than JPG at similar visual quality, which helps pages load faster and saves bandwidth.",
    },
    pngTransparency: {
      q: "Does PNG support transparency?",
      a: "Yes. PNG is a lossless format with a full alpha channel, so transparent backgrounds are preserved — ideal for logos, icons and graphics.",
    },
    jpgPhoto: {
      q: "Is JPG a good format for photos?",
      a: "Yes. JPG compresses photos so files stay small, but it is lossy — some detail is discarded. It remains the standard format for photographs on the web and in cameras.",
    },
    heicIos: {
      q: "Why convert HEIC at all?",
      a: "HEIC is the default photo format on iPhone and iPad — efficient but not supported everywhere. Converting HEIC to JPG makes your photos open in any app and on any device.",
    },
    icoWindows: {
      q: "When do I need an ICO file?",
      a: "ICO is the classic favicon format for Windows, browsers and browser tabs. A PNG version is useful when a favicon cannot be read or you need a transparent raster copy.",
    },
    svgVector: {
      q: "What makes SVG different from PNG?",
      a: "SVG is vector-based, so it stays sharp at any size; PNG is a fixed-resolution bitmap. SVG→PNG export is used when a raster image is required, such as for uploads.",
    },
    base64Text: {
      q: "What is Base64?",
      a: "Base64 encodes text or binary data into safe ASCII characters, so data can travel through text-only channels, emails or JSON without corruption.",
    },
    imageToBase64: {
      q: "Why turn an image into Base64?",
      a: "Images embedded as Base64 data URIs can be inlined directly into HTML, CSS or JSON — perfect when you cannot host separate image files.",
    },
    imageCompress: {
      q: "How much will compression shrink my image?",
      a: "Quality-aware compression usually reduces the file size considerably. You can trade a little visual quality for a much smaller file, and it all happens locally.",
    },
    removeBg: {
      q: "Will background removal work on any photo?",
      a: "It works best with clear contrast between subject and background. The result is returned as a PNG with a transparent background, ready for e-commerce or design.",
    },
    imageResize: {
      q: "Does resizing reduce the file size?",
      a: "Yes — fewer pixels mean fewer bytes, so the file shrinks. Resizing also lets you match a platform's exact dimensions, such as 1080px social media covers.",
    },
    imageCrop: {
      q: "Why should I crop an image?",
      a: "Cropping removes unwanted edges and lets you focus on the subject or fit a specific aspect ratio, like a square avatar or a 16:9 cover.",
    },
    filtersGraphic: {
      q: "What do image filters do?",
      a: "Filters such as grayscale, sepia, brightness or contrast are applied pixel by pixel in your browser — your original file is never altered or uploaded.",
    },
    watermark: {
      q: "Why add a watermark?",
      a: "A watermark overlays a logo or text to brand or protect your photos, making it clear who owns the image and deterring casual copying.",
    },
    palette: {
      q: "How is a color palette extracted?",
      a: "The tool analyzes the uploaded image and collects its dominant colors, giving you a ready-to-use palette as a basis for a consistent design system.",
    },
    exif: {
      q: "What does EXIF contain and why remove it?",
      a: "EXIF is hidden metadata such as camera model, GPS location and capture date. Stripping it protects your privacy before photos are shared online.",
    },
    jsonStructured: {
      q: "What is JSON best used for?",
      a: "JSON is a strict, machine-readable format used by APIs, databases and configuration files. Validation and consistent formatting keep it valid and readable.",
    },
    csvTabular: {
      q: "What is CSV?",
      a: "CSV stores tabular data as plain text separated by commas, so the same table opens in any spreadsheet editor or database tool.",
    },
    markdownHtml: {
      q: "Why convert Markdown to HTML?",
      a: "Markdown is lightweight and easy to read; converting it to HTML gives you a finished page you can paste into a website, CMS or email.",
    },
    pdfMultiPage: {
      q: "What is special about PDF pages?",
      a: "PDF keeps fonts, layout and pagination identical on every device. A multi-page file can be rendered page by page, so it is ideal for merging, splitting or exporting to images.",
    },
    docxEditing: {
      q: "DOCX or PDF — which should I use?",
      a: "DOCX is the editable Word format with rich text and styles; PDF is meant for sharing and printing because it locks the layout on every device.",
    },
    xlsxRows: {
      q: "What makes XLSX different from CSV?",
      a: "XLSX is Excel's workbook format with sheets, formulas and formatting; CSV is a plain text table. Converting XLSX→CSV keeps the raw data portable.",
    },
    yamlHuman: {
      q: "Why use YAML instead of JSON?",
      a: "YAML is more concise and human-friendly than JSON, which is why it is common in configuration files. Converting makes a JSON feed easy to read and maintain.",
    },
    sqlPretty: {
      q: "Why format SQL?",
      a: "Formatted SQL with consistent indentation is far easier to read, review and debug. The output stays valid and ready to run.",
    },
    vcfContacts: {
      q: "What are VCF files used for?",
      a: "VCF is the vCard format for contacts. Converting contacts to CSV makes them easy to open in a spreadsheet or move between apps.",
    },
    urlEncode: {
      q: "When do I need URL encoding?",
      a: "URLs can only contain safe characters. Encoding converts spaces, ampersands and other symbols into %-codes so links with special characters work correctly.",
    },
    qrUrls: {
      q: "What can a QR code do?",
      a: "A smartphone camera scans QR codes to open a URL, join a Wi-Fi network or share text instantly — no extra app is needed.",
    },
    jwtTokens: {
      q: "What is inside a JWT?",
      a: "A JWT has three parts: header, payload and signature. Decoding reveals the claims, but verifying a token still requires the signing secret.",
    },
    hashOneWay: {
      q: "Can a hash be reversed?",
      a: "No — hashing is one-way. It produces a fixed-length fingerprint that cannot be turned back into the original input, which is why it is used for integrity checks.",
    },
    colorModels: {
      q: "HEX, RGB or HSL — which should I choose?",
      a: "Each model fits a use case: HEX and RGB for screens, HSL for intuitive hue, saturation and lightness adjustments. Converting keeps the color identical across tools.",
    },
    unixEpoch: {
      q: "What is Unix time?",
      a: "Unix time counts seconds since 1970-01-01 00:00 UTC. Timestamps are shown in UTC by default, so the readable date depends on your timezone.",
    },
    uuidStandard: {
      q: "Are UUIDs unique?",
      a: "Yes. Version 4 UUIDs are built from 122 random bits, so collisions are astronomically unlikely. They are standard identifiers across databases and systems.",
    },
    passwordStrength: {
      q: "What makes a password strong?",
      a: "Length first, then variety: combine lower and uppercase letters, digits and symbols, and avoid dictionary words and personal details.",
    },
    cssMinify: {
      q: "What does minification do?",
      a: "Minification strips whitespace, comments and unnecessary formatting from CSS and JavaScript, shrinking files for production and faster page loads.",
    },
    cssUnits: {
      q: "px, rem or em — what is the difference?",
      a: "px is an absolute screen unit; rem scales with the root font size and em with the parent element. Converting between them keeps responsive CSS predictable.",
    },
    htmlRfc: {
      q: "Why use HTML entities?",
      a: "HTML entities such as &amp; and &lt; let special characters render correctly and safely inside HTML and email, even where markup is not allowed.",
    },
    boxShadow: {
      q: "How is a box shadow built?",
      a: "A box shadow is defined by horizontal and vertical offset, blur radius, spread and color. The generator hands you the exact CSS, ready to copy.",
    },
    metaTags: {
      q: "Which meta tags matter?",
      a: "Title, description and Open Graph tags control how a page appears in search results and social shares. Generating them consistently saves time for developers.",
    },
    chmodPerms: {
      q: "How do chmod numbers work?",
      a: "chmod uses three octal digits (r=4, w=2, x=1) for user, group and others. The calculator shows exactly what each value means.",
    },
    jsKeycode: {
      q: "What is a keycode?",
      a: "A keycode is the numeric identifier a browser reports for a key press, used when building keyboard shortcuts, games or forms.",
    },
    tailwindClasses: {
      q: "What is a Tailwind palette used for?",
      a: "A palette generates the color scales you need for a Tailwind theme, so every shade stays consistent across your project.",
    },
    urlParse: {
      q: "Why parse a URL?",
      a: "Parsing splits a link into protocol, host, path and query string — useful when debugging redirects, trackers or broken links.",
    },
    caseText: {
      q: "When do I need to change text case?",
      a: "Converting between lowercase, UPPERCASE or Title Case keeps headings, labels for exports and datasets consistent.",
    },
    wordCount: {
      q: "Why count words and characters?",
      a: "Word, character and reading-time counts help you meet the length limits of articles, social posts, meta titles and translations.",
    },
    loremPlaceholder: {
      q: "Why use Lorem Ipsum?",
      a: "Lorem Ipsum is placeholder text that lets you preview a layout without being distracted by real content.",
    },
    textDiff: {
      q: "What does a diff show?",
      a: "A diff highlights exactly which lines or characters changed between two texts, which makes edits quick to review.",
    },
    screenViewport: {
      q: "What is the viewport?",
      a: "The viewport is the visible area of a web page. Checking it in real time helps you build responsive layouts for any screen.",
    },
    mp4Webm: {
      q: "Is WebM better than MP4?",
      a: "WebM is an open, lightweight video format from Google — smaller files for the web. MP4 is the most widely compatible. Converting is useful when a site only accepts WebM.",
    },
    mp3Audio: {
      q: "Why is MP3 so common?",
      a: "MP3 is the most widely supported audio format. It shrinks sound to a fraction of its size while keeping very good quality for music and voice.",
    },
    wavLossless: {
      q: "WAV or MP3?",
      a: "WAV is lossless PCM audio — exact but large. MP3 trades a little detail for a much smaller file. Converting WAV→MP3 makes audio easy to share.",
    },
    gifLite: {
      q: "Is GIF still useful?",
      a: "GIF is a lightweight animated image that plays everywhere without a player — ideal for short clips, though limited to 256 colors.",
    },
    audioTrim: {
      q: "What does trimming do?",
      a: "Trimming cuts a clip to the part you want and removes silence or unwanted sections from the start and the end.",
    },
    volumeBoost: {
      q: "What happens when I boost the gain?",
      a: "Raising the gain makes audio louder. Boosting too far past 0 dB causes peaks to clip and distort, so a small boost sounds best.",
    },
    videoSpeed: {
      q: "Does changing speed affect the pitch?",
      a: "No — the tool re-times the playback while keeping the pitch stable, so a faster or slower video stays natural-sounding.",
    },
    videoResize: {
      q: "Why resize a video?",
      a: "Lowering the resolution (for example 1080p → 720p) reduces the file size, which helps when a platform has size or resolution limits.",
    },
    muteVideo: {
      q: "What does muting a video do?",
      a: "Muting removes or silences the audio track while keeping the picture and timing exactly the same.",
    },
    voiceRecorder: {
      q: "Where is my recording stored?",
      a: "Your recording is processed and downloaded from your browser — it is never uploaded to a server.",
    },
    speechText: {
      q: "How does speech-to-text recognize what I say?",
      a: "It uses your browser's speech recognition service to transcribe your microphone in real time. No audio files are uploaded to our servers.",
    },
  },

  headingFile: (from, to) =>
    `How to convert ${from} to ${to} online for free`,
  headingPaste: (from, to) =>
    `How to convert ${from} to ${to} online for free`,
  headingGenerate: (to) =>
    `How to generate ${to} online for free`,

  stepsFile: (from, to) => [
    `Select or drop your ${from} file onto the converter — it stays in your browser.`,
    `Adjust the optional settings, such as quality, size or output options.`,
    `Click Convert — the file is processed locally on your device.`,
    `Download your ${to} file. It is ready in seconds.`,
  ],
  stepsPaste: (from, to) => [
    `Paste your ${from} into the input panel — nothing is uploaded.`,
    `Review the options and, if shown, choose the direction (${from} → ${to}).`,
    `Click Convert / Format — the result is produced in your browser.`,
    `Copy the ${to} result from the output panel.`,
  ],
  stepsGenerate: (to) => [
    `Set the options for your ${to}.`,
    `Click Generate — the result is created instantly in your browser.`,
    `Copy the output or download the generated file.`,
  ],

  qHow: (from, to) => `How do I convert ${from} to ${to} for free?`,
  qHowGenerate: (to) => `How do I generate ${to} for free?`,
  aHowFile: (from, to) =>
    `Select your ${from} file (or drag and drop it), click Convert and download the ${to} result. There is no sign-up, no cost, and the file never leaves your browser.`,
  aHowPaste: (from, to) =>
    `Paste your ${from}, click Convert, and copy the ${to} result. It is free, runs entirely in your browser, and nothing is uploaded.`,
  aHowGenerate: (to) =>
    `Set your options, click Generate, and copy or download the result. It is free and created locally on your device.`,

  qPrivate: (name) => `Is ${name} private and secure?`,
  aPrivate: (name) =>
    `Yes. ${name} runs entirely in your browser, so your data never leaves your device — nothing is uploaded or stored on a server.`,
  wasmSentence:
    " Video and audio tools use a WebAssembly engine that also runs in your device's memory.",

  qLimit: "What is the maximum file size?",
  aLimit: (mb) =>
    `${mb} MB per file. Because everything runs in your device's memory, very large files can slow down or freeze the browser.`,
};