import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Audio Formats and Quality Explained: WAV, MP3, AAC, FLAC, and When Each One Matters",
    eyebrow: "Audio",
    description:
      "WAV, MP3, AAC, FLAC and OGG Vorbis use completely different strategies to store the same sound wave. Understand bit depth, sample rate, psychoacoustic masking and bitrate so you can pick the right format, know exactly how big the file will be, and avoid quality mistakes that are hard to undo.",
    excerpt:
      "What bit depth and sample rate really mean, how lossy compression works, and exactly how much space each format eats per minute of audio.",
    readingTime: "9 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: [
      "Someone asks for a \"high quality\" version of a podcast episode and you export a 60 MB WAV file to share on WhatsApp. \"Upload failed.\" You drop it to 128 kbps MP3 and the file lands at 1.6 MB, but the cymbals now sound like someone crumpling aluminum foil. Both choices were wrong — one was too big, the other was too lossy. Understanding why sits squarely in the mechanics of audio formats, bit depth, sample rate, and bitrate. This guide walks through the entire chain, with real numbers, real math, and practical rules for picking the right format every time.",
    ]},

    { type: "h2", content: ["The foundation of digital audio: bit depth and sample rate"] },
    { type: "p", content: [
      "Sound is a continuous pressure wave. To store it digitally, a converter samples that wave thousands of times per second and records the amplitude at each point. Two numbers control quality: ",
      { text: "sample rate", bold: true },
      " (how many snapshots per second) and ",
      { text: "bit depth", bold: true },
      " (how precisely each snapshot is measured).",
    ]},
    { type: "p", content: [
      "Standard CD audio uses ",
      { text: "44.1 kHz", bold: true },
      " — 44,100 samples every second — and ",
      { text: "16-bit", bold: true },
      " depth. The Nyquist theorem guarantees that a 44.1 kHz rate captures every frequency up to about 22 kHz, which is the ceiling of human hearing. Going higher (48 kHz, 96 kHz, 192 kHz) captures ultrasonic content that humans cannot hear but audio engineers may use for processing headroom. Bit depth defines the amplitude resolution: 16-bit gives 65,536 discrete levels per sample and a theoretical dynamic range of about 96 dB. 24-bit recording pushes that to 16.7 million levels and roughly 144 dB — more headroom means less clipping risk during mixing and mastering.",
    ]},
    { type: "p", content: [
      "Bit depth and sample rate are the reason uncompressed audio is large: every single sample is written to disk with no shortcut. A ",
      { text: "44.1 kHz, 16-bit, stereo", bold: true },
      " file produces 44,100 × 2 bytes × 2 channels = 176,400 bytes per second. Multiply by 60 and you get roughly 10.1 MB per minute. That is the cost of preserving every detail of the waveform.",
    ]},

    { type: "h2", content: ["WAV and PCM: what raw audio looks like on disk"] },
    { type: "p", content: [
      "A WAV file is a thin RIFF container wrapping raw Pulse-Code Modulation data — the literal stream of sampled amplitudes, uncompressed and unprocessed. There is no algorithm discarding information, no frequency ceiling imposed by a model. This is why WAV is the reference standard in recording studios, broadcast, and mastering: it carries everything the microphone captured.",
    ]},
    { type: "p", content: [
      "The raw math for a one-minute CD-quality stereo file: 44,100 samples/sec × 2 bytes (16-bit) × 2 channels × 60 seconds = ",
      { text: "10,584,000 bytes ≈ 10.1 MB", bold: true },
      ". A full hour of the same recording crosses 600 MB. AIFF is Apple's equivalent container — same size, same concept, different metadata header. The takeaway: uncompressed audio trades massive file sizes for perfect fidelity.",
    ]},

    { type: "h2", content: ["How lossy compression actually works: psychoacoustic masking"] },
    { type: "p", content: [
      "Lossy formats like MP3 and AAC do not \"reduce quality uniformly.\" They exploit the limitations of human hearing through a model called ",
      { text: "psychoacoustic masking", bold: true },
      ". When two sounds occur at the same time, the louder one can mask the quieter one — your auditory system simply does not perceive the masked signal. A cymbal crash buries a nearby guitar harmonic. A loud kick drum hides a quiet bass note. The codec analyzes each frame of audio, identifies what the ear will not miss, and permanently throws that data away.",
    ]},
    { type: "p", content: [
      "The second mechanism is the ",
      { text: "frequency ceiling", bold: true },
      ". Human hearing spans roughly 20 Hz to 20 kHz, and sensitivity drops steeply above about 16 kHz. Most MP3 encoders apply a hard low-pass filter that removes everything above 17–18 kHz — even at the highest bitrates. This is inaudible to most listeners over 20 or anyone listening through earbuds on a commute. But it is one reason audiophiles prefer lossless formats for critical listening: the data is gone, and no decoder can bring it back.",
    ]},

    { type: "h2", content: ["Bitrate: what 128, 192, and 320 kbps actually mean"] },
    { type: "p", content: [
      "Bitrate, measured in kilobits per second (", { text: "kbps", code: true }, "), controls how much data the lossy codec keeps. Lower bitrate means more aggressive filtering and discarding. The practical tiers for MP3 are well understood:",
    ]},
    { type: "list", items: [
      [
        { text: "128 kbps", bold: true },
        " — the long-time \"default\" quality. The encoder removes most frequencies above 16 kHz, compresses stereo image, and smears transient detail. Cymbals lose shimmer, guitar strums sound smeared. Acceptable for casual listening on low-quality speakers, but noticeably degraded on good headphones. An entire album fits on a single CD at this rate.",
      ],
      [
        { text: "192 kbps", bold: true },
        " — a meaningful jump. More high-frequency content survives, stereo width improves, and most casual listeners cannot distinguish the source from a WAV in a blind test. This is the practical minimum for music you intend to keep.",
      ],
      [
        { text: "320 kbps", bold: true },
        " — the maximum for MP3. Psychoacoustic filtering is minimal; only the most extreme high-frequency cutoffs remain. In controlled listening tests, even trained ears struggle to distinguish 320 kbps MP3 from a WAV source. For almost every listener and every use case, this is perceptually lossless.",
      ],
    ]},
    { type: "p", content: [
      "AAC tells a slightly different story: at ",
      { text: "128 kbps AAC", bold: true },
      ", quality typically matches or exceeds 192 kbps MP3. Apple's encoders and the open-source FDK-AAC library both produce cleaner results at equivalent bitrates, which is why Apple Music and YouTube default to AAC rather than MP3.",
    ]},

    { type: "h2", content: ["The math: file sizes you can actually calculate"] },
    { type: "p", content: [
      "File size for lossy formats is direct multiplication: bitrate × duration. One minute of audio at 128 kbps:",
    ]},
    { type: "list", items: [
      [{ text: "128 kbps × 60 seconds = 7,680 kilobits = 960 KB ≈ 0.94 MB", bold: true }],
      [{ text: "192 kbps × 60 seconds = 11,520 kilobits = 1,440 KB ≈ 1.41 MB", bold: true }],
      [{ text: "320 kbps × 60 seconds = 19,200 kilobits = 2,400 KB ≈ 2.34 MB", bold: true }],
      [{ text: "CD-quality WAV (44.1k/16-bit stereo) = 10,584,000 bytes ≈ 10.1 MB", bold: true }],
    ]},
    { type: "p", content: [
      "The comparison is stark: 320 kbps MP3 delivers nearly identical perceptual quality to WAV at roughly one-quarter the file size. That is the entire value proposition of lossy compression. For FLAC, the ratio is different — lossless compression typically reduces WAV by about 50–60%, so a one-minute CD-quality FLAC file lands around 4–6 MB, roughly half the WAV size with zero quality loss.",
    ]},
    { type: "note", tone: "success", title: "Quick rule of thumb", content: [
      "To estimate any lossy file size in megabytes: multiply the bitrate in kbps by the duration in seconds, then divide by 8,000. For a 3-minute 192 kbps MP3: 192 × 180 / 8,000 ≈ 4.3 MB.",
    ]},

    { type: "h2", content: ["Format comparison: when to use each one"] },
    { type: "table", columns: ["Format", "Typical use", "1-min size (CD-quality source)", "Browser support"], rows: [
      ["WAV / PCM", "Recording, editing, mastering, archival", "~10.1 MB", "All modern browsers"],
      ["MP3", "Universal sharing, legacy systems, podcasts", "960 KB – 2.34 MB (128–320 kbps)", "All browsers since 2010"],
      ["AAC", "Apple ecosystem, YouTube, streaming services", "960 KB – 1.6 MB (128–256 kbps)", "Chrome, Firefox, Safari, Edge"],
      ["FLAC", "Archival, high-fidelity personal libraries", "4–6 MB", "Chrome, Firefox, Edge; Safari partial (macOS Ventura+)"],
      ["OGG Vorbis", "Non-Apple open-source environments", "~1–2 MB (128–256 kbps)", "Chrome, Firefox, Edge; not Safari"],
    ]},

    { type: "h2", content: ["Browser support and compatibility reality"] },
    { type: "p", content: [
      "Format choice is not purely a quality question — it is also a deployment question. MP3 has universal support: every browser, every operating system, every car stereo, every Smart TV. If you need guaranteed playback with no caveats, MP3 is the only format that delivers it.",
    ]},
    { type: "p", content: [
      "AAC plays natively in Chrome, Firefox, Edge, and Safari — covering the vast majority of modern desktop and mobile users. However, some older Android devices and Linux distributions may struggle without additional codecs. ",
      { text: "FLAC", bold: true },
      " playback is well-supported in Chrome and Firefox, but Safari's support is limited to macOS Ventura (13.0) and later. Users on older macOS or iOS versions will hear nothing. ",
      { text: "OGG Vorbis", bold: true },
      " is the most restricted: Safari has never supported it natively, and Apple shows no signs of adding it. If your audience includes any Safari users, OGG is not a viable primary format — always pair it with an MP3 fallback.",
    ]},
    { type: "note", tone: "warning", title: "Safari and FLAC", content: [
      "Safari added FLAC support starting with macOS Ventura (13.0) and iOS 16. If you are serving audio files that must play on older Apple devices or in WebViews embedded in apps that use older WebKit engines, test FLAC playback explicitly. Consider providing an MP3 or AAC fallback alongside any FLAC download link.",
    ]},

    { type: "h2", content: ["Trimming, loudness, and practical editing considerations"] },
    { type: "p", content: [
      "When you cut audio or adjust volume, format choice directly affects precision and quality. The audio trimmer performs sample-accurate cuts on WAV files because every sample is independently accessible. Compressed formats like MP3 encode in frames of 576 or 1,152 samples, so trimming requires the encoder to reconstruct the frame, cut, and re-encode — each edit introduces a tiny quality loss that accumulates across many cuts.",
    ]},
    { type: "p", content: [
      "Loudness is measured in ",
      { text: "LUFS", bold: true },
      " (Loudness Units relative to Full Scale), and it is the standard that Spotify, YouTube, Apple Music, and most streaming platforms use for normalization. A quiet podcast episode at -24 LUFS will be boosted by the platform to roughly -14 LUFS, while a hot recording at -8 LUFS will be turned down — often with unwanted pumping artifacts. Targeting -16 LUFS for podcasts and -14 LUFS for music before uploading gives you control over the sound rather than letting an algorithm decide.",
    ]},
    { type: "code", lang: "js", content: `// Quick loudness estimate (simplified, not a true LUFS meter)
function estimateLUFS(samples) {
  const sumOfSquares = samples.reduce(
    (acc, s) => acc + s * s, 0
  );
  const rms = Math.sqrt(sumOfSquares / samples.length);
  // -0.691 is the ITU-R BS.1770 relative level offset
  return 20 * Math.log10(rms) - 0.691;
}` },
    { type: "note", tone: "warning", title: "Loudness boost is not quality improvement", content: [
      "Increasing gain through a volume booster makes the signal louder — it does not fix clipping, reduce noise, or restore lost dynamic range. If your peaks are already hitting 0 dBFS, boosting further only creates more distortion. Always check peak levels before applying gain.",
    ]},

    { type: "h2", content: ["Audio tools in Convrs"] },
    { type: "p", content: [
      "All of this runs in the browser on Convrs — no audio file ever leaves your device. ",
      { text: "The WAV to MP3 converter", bold: true, url: "/wav-to-mp3", internal: true },
      " transcodes uncompressed WAV into high-quality MP3 with adjustable bitrate, preserving bit depth and sample rate without a server roundtrip. ",
      { text: "The audio trimmer", bold: true, url: "/audio-trimmer", internal: true },
      " cuts, trims and rearranges audio clips directly in your browser with sample-level precision. ",
      { text: "The volume booster", bold: true, url: "/volume-booster", internal: true },
      " adjusts loudness with real-time peak monitoring, so you can target the right LUFS level before sharing or uploading. Three tools, zero uploads, complete privacy.",
    ]},
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Ses Formatları ve Kalite: WAV, MP3, AAC, FLAC ve Her Biri Ne Zaman Gereklidir",
    eyebrow: "Ses",
    description:
      "WAV, MP3, AAC, FLAC ve OGG Vorbis, aynı ses dalgasını depolamak için tamamen farklı stratejiler kullanır. Bit derinliği, örnekleme hızı, psikoakustik örtünme ve bit hızını anlayarak doğru formatı seçin, dosya boyutunu önceden hesaplayın ve geri alması zor kalite hatalarından kaçının.",
    excerpt:
      "Bit derinliği ve örnekleme hızı gerçekte ne anlama gelir, kayıplı sıkıştırma nasıl çalışır ve her format dakika başına ne kadar yer kaplar.",
    readingTime: "9 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: [
      "Birisi bir podcast bölümünün \"yüksek kaliteli\" bir versiyonunu ister ve 60 MB'lık bir WAV dosyasını WhatsApp üzerinden paylaşmak için dışa aktarırsınız. \"Yükleme başarısız.\" 128 kbps MP3'e düşürürsünüz, dosya 1,6 MB'a iner ama ziller artık kırışmış alüminyum folyo gibi ses verir. Her iki seçim de yanlıştı — biri çok büyüktü, diğerinin kaybı çok fazladı. Bunun nedenini anlamak, ses formatlarının, bit derinliğinin, örnekleme hızının ve bit hızının mekaniğine dayanır. Bu rehber gerçek sayılarla, gerçek matematikle ve her seferinde doğru formatı seçmenize yardımcı olacak kurallarla tüm zinciri anlatır.",
    ]},

    { type: "h2", content: ["Dijital sesin temeli: bit derinliği ve örnekleme hızı"] },
    { type: "p", content: [
      "Ses, sürekli bir basınç dalgasıdır. Dijital olarak depolamak için bir dönüştürücü bu dalgayı saniyede binlerce kez örnekler ve her noktadaki genliği kaydeder. Kaliteyi iki sayı belirler: ",
      { text: "örnekleme hızı", bold: true },
      " (saniyede kaç anlık görüntü) ve ",
      { text: "bit derinliği", bold: true },
      " (her anlık görüntünün ne kadar hassas ölçüldüğü).",
    ]},
    { type: "p", content: [
      "Standart CD sesi ",
      { text: "44,1 kHz", bold: true },
      " — saniyede 44.100 örnek — ve ",
      { text: "16-bit", bold: true },
      " derinlik kullanır. Nyquist teoremi, 44,1 kHz hızının insan işitmesinin tavanı olan yaklaşık 22 kHz'e kadar her frekansı yakaladığını garanti eder. Daha hızlı örnekleme (48 kHz, 96 kHz, 192 kHz) insanların duyamadığı ultrasonik içeriği yakalar ancak ses mühendisleri bunu işleme başlığı olarak kullanabilir. Bit derinliği genlik çözünürlüğünü tanımlar: 16-bit, örnek başına 65.536 ayrık seviye ve yaklaşık 96 dB teorik dinamik aralık verir. 24-bit kayıt bunu 16,7 milyon seviyeye ve yaklaşık 144 dB'e taşır — daha fazla başlık, miksleme ve masterede kesme riski demektir.",
    ]},
    { type: "p", content: [
      "Bit derinliği ve örnekleme hızı, sıkıştırılmamış sesin neden büyük olduğunun nedenidir: her tek örnekleme kısayol olmadan diske yazılır. ",
      { text: "44,1 kHz, 16-bit, stereo", bold: true },
      " bir dosya saniyede 44.100 × 2 bayt × 2 kanal = 176.400 bayt üretir. 60 ile çarpın ve dakika başına yaklaşık 10,1 MB elde edersiniz. Dalga formunun her detayını korumanın bedeli budur.",
    ]},

    { type: "h2", content: ["WAV ve PCM: ham ses diske nasıl yazılır"] },
    { type: "p", content: [
      "Bir WAV dosyası, ham Kodlanmış Genlik Modülasyonu (PCM) verisi saran ince bir RIFF kabıdır — bilgiyi atlayan algoritma yok, model tarafından dayatılan frekans tavanı yok. Bu yüzden WAV kayıt stüdyolarında, yayıncılıkta ve masterede referans standarttır: mikrofonun yakaladığı her şeyi taşır.",
    ]},
    { type: "p", content: [
      "Bir dakikalık CD kalitesinde stereo dosyanın ham matematiği: 44.100 örnek/sn × 2 bayt (16-bit) × 2 kanal × 60 saniye = ",
      { text: "10.584.000 bayt ≈ 10,1 MB", bold: true },
      ". Aynı kaydın tam saati 600 MB'ı geçer. AIFF, Apple'ın eşdeğer kabısıdır — aynı boyut, aynı kavram, farklı meta veri başlığı. Sonuç: sıkıştırılmamış ses, mükemmel sadakatin karşılığında devasa dosya boyutları öder.",
    ]},

    { type: "h2", content: ["Kayıplı sıkıştırma nasıl çalışır: psikoakustik örtünme"] },
    { type: "p", content: [
      "MP3 ve AAC gibi kayıplı formatlar \"kaliteyi eşit biçimde düşürmez.\" İnsan işitmesinin sınırlarını ",
      { text: "psikoakustik örtünme", bold: true },
      " adı verilen bir model aracılığıyla istismar ederler. İki ses aynı anda gerçekleştiğinde daha yüksek olanı daha sessiz olanı örtebilir — işitsel sisteminiz maskelenen sinyali basitçe algılamaz. Zil sesi yakındaki gitar harmoniğini gömer. Yüksek bir davul vuruşu sessiz bir bas notasını saklar. Codec her ses karesini analiz etmenin, kulağın özlemeyeceği şeyleri belirler ve bu veriyi kalıcı olarak atar.",
    ]},
    { type: "p", content: [
      "İkinci mekanizma ",
      { text: "frekans tavanı", bold: true },
      "dır. İnsan işitmesi yaklaşık 20 Hz ile 20 kHz arasında genişler ve hassasiyet 16 kHz civarında keskin şekilde düşer. Çoğu MP3 kodlayıcı, en yüksek bit hızlarında bile 17–18 kHz üzerindeki her şeyi kaldıran sert bir alçak geçiren filtre uygular. Bu, 20 yaş üstü dinleyicilerin veya toplu taşımada kulaklıkla dinleyenlerin büyük çoğunluğu için duyulamaz. Ancak bu, ses meraklılarının kritik dinleme için neden kayıpsız formatları tercih ettiğinin bir nedenidir: veri gitmiştir ve hiçbir decoder onu geri getiremez.",
    ]},

    { type: "h2", content: ["Bit hızı: 128, 192 ve 320 kbps gerçekte ne anlama gelir"] },
    { type: "p", content: [
      "Kilobit/saniye (", { text: "kbps", code: true }, ") cinsinden ölçülen bit hızı, kayıplı kodlayıcının ne kadar veri tutacağını kontrol eder. Daha düşük bit hızı, daha agresif filtreleme ve veri atma demektir. MP3 için pratik kademe iyi bilinir:",
    ]},
    { type: "list", items: [
      [
        { text: "128 kbps", bold: true },
        " — uzun süredir \"varsayılan\" kalite. Kodlayıcı 16 kHz üzerindeki frekansların çoğunu kaldırır, stereo görüntüyü sıkıştırır ve anlık detayları bulanıklaştırır. Ziller parlaklığını kaybeder, gitar vuruşları bulanıklaşır. Düşük kaliteli hoparlörlerle günlük dinleme için kabul edilebilir, ancak iyi kulaklıklarda belirgin şekilde bozulur. Bu hızda tüm bir albüm tek CD'ye sığar.",
      ],
      [
        { text: "192 kbps", bold: true },
        " — anlamlı bir sıçrama. Daha fazla yüksek frekans içeriği hayatta kalır, genişlik iyileşir ve çoğu sıradan dinleyici kaynağı bir WAV'dan kör testte ayırt edemez. Saklanacak müzik için pratik minimum budur.",
      ],
      [
        { text: "320 kbps", bold: true },
        " — MP3 için maksimum. Psikoakustik filtreleme minimaldir; yalnızca en aşırı yüksek frekans kesimleri kalır. Kontrollü dinleme testlerinde bile eğitimli kulaklar 320 kbps MP3'ü bir WAV kaynağından ayırt etmekte zorlanır. Neredeyse her dinleyici ve her kullanım için bu algısal olarak kayıpsızdır.",
      ],
    ]},
    { type: "p", content: [
      "AAC biraz farklı bir hikaye anlatır: ",
      { text: "128 kbps AAC", bold: true },
      " kalitesi tipik olarak 192 kbps MP3'e eşit veya üstündür. Apple'ın kodlayıcıları ve açık kaynak FDK-AAC kütüphanesi, eşdeğer bit hızlarında daha temiz sonuçlar üretir — bu yüzden Apple Music ve YouTube varsayılan olarak MP3 yerine AAC kullanır.",
    ]},

    { type: "h2", content: ["Dosya boyu matematiği: hesaplayabileceğiniz gerçek rakamlar"] },
    { type: "p", content: [
      "Kayıplı formatların dosya boyutu doğrudan çarpımdır: bit hızı × süre. 128 kbps ile bir dakikalık ses:",
    ]},
    { type: "list", items: [
      [{ text: "128 kbps × 60 saniye = 7.680 kilobit = 960 KB ≈ 0,94 MB", bold: true }],
      [{ text: "192 kbps × 60 saniye = 11.520 kilobit = 1.440 KB ≈ 1,41 MB", bold: true }],
      [{ text: "320 kbps × 60 saniye = 19.200 kilobit = 2.400 KB ≈ 2,34 MB", bold: true }],
      [{ text: "CD kalitesinde WAV (44,1k/16-bit stereo) = 10.584.000 bayt ≈ 10,1 MB", bold: true }],
    ]},
    { type: "p", content: [
      "Karşılaştırma dikkat çekicidir: 320 kbps MP3, WAV ile neredeyse aynı algısal kaliteyi yaklaşık dörtte bir dosya boyutuyla sunar. Kayıplı sıkıştırmanın tüm değer önermesi budur. FLAC için oran farklıdır — kayıpsız sıkıştırma WAV'ı yaklaşık %50-65 oranında küçültür, yani bir dakikalık CD kalitesinde FLAC dosyası yaklaşık 4-6 MB'a düşer, sıfır kalite kaybıyla WAV boyutunun yarısı kadar.",
    ]},
    { type: "note", tone: "success", title: "Hızlı kural", content: [
      "Herhangi bir kayıplı dosya boyutunu megabayt cinsinden tahmin etmek için: bit hızını (kbps) süreye (saniye) ile çarpın, sonra 8.000'e bölün. 3 dakikalık 192 kbps MP3 için: 192 × 180 / 8.000 ≈ 4,3 MB.",
    ]},

    { type: "h2", content: ["Format karşılaştırması: hangisi ne zaman kullanılır"] },
    { type: "table", columns: ["Format", "Tipik kullanım", "1 dk boyutu (kaynak: CD kalitesi)", "Tarayıcı desteği"], rows: [
      ["WAV / PCM", "Kayıt, düzenleme, mastering, arşivleme", "~10,1 MB", "Tüm modern tarayıcılar"],
      ["MP3", "Evrensel paylaşım, eski sistemler, podcast", "960 KB – 2,34 MB (128–320 kbps)", "2010'dan beri tüm tarayıcılar"],
      ["AAC", "Apple ekosistemi, YouTube, akış servisleri", "960 KB – 1,6 MB (128–256 kbps)", "Chrome, Firefox, Safari, Edge"],
      ["FLAC", "Arşivleme, yüksek sadakatli kişisel kütüphaneler", "4–6 MB", "Chrome, Firefox, Edge; Safari kısmi (macOS Ventura+)"],
      ["OGG Vorbis", "Apple dışı açık kaynak ortamları", "~1–2 MB (128–256 kbps)", "Chrome, Firefox, Edge; Safari değil"],
    ]},

    { type: "h2", content: ["Tarayıcı desteği ve uyumluluk gerçeği"] },
    { type: "p", content: [
      "Format seçimi yalnızca bir kalite sorusu değil, aynı zamanda bir dağıtım sorunudur. MP3 evrensel desteğe sahiptir: her tarayıcı, her işletim sistemi, her araç stereo'su, her akıllı TV. Garantili çalma ve uyarı olmayan bir şey istiyorsanız, MP3 tek format budur.",
    ]},
    { type: "p", content: [
      "AAC, Chrome, Firefox, Edge ve Safari'de yerel olarak çalar — modern masaüstü ve mobil kullanıcıların büyük çoğunluğunu kapsar. Ancak一些 eski Android cihazları ve Linux dağıtımları ek codec'ler olmadan zorlanabilir. ",
      { text: "FLAC", bold: true },
      " çalma Chrome ve Firefox'ta iyi desteklenir, ancak Safari desteği yalnızca macOS Ventura (13.0) ve sonrasıyla sınırlıdır. Eski macOS veya iOS sürümlerindeki kullanıcılar ses duymayacaktır. ",
      { text: "OGG Vorbis", bold: true },
      " en kısıtlı olandır: Safari onu asla yerel olarak desteklememiştir ve Apple'ın ekleyeceğine dair bir işaret yoktur. Audience'nızda herhangi bir Safari kullanıcısı varsa, OGG birincil format olarak uygun değildir — her zaman bir MP3 yedeğiyle eşleştirin.",
    ]},
    { type: "note", tone: "warning", title: "Safari ve FLAC", content: [
      "Safari, FLAC desteğini macOS Ventura (13.0) ve iOS 16 ile ekledi. Eski Apple cihazlarında veya eski WebKit motorları kullanan uygulamalarda gömülü WebView'lerde çalınması gereken ses dosyaları sunuyorsanız, FLAC çalmayı açıkça test edin. Herhangi bir FLAC indirme bağlantısı yanında bir MP3 veya AAC yedeği sağlayın.",
    ]},

    { type: "h2", content: ["Kesme, ses şiddeti ve pratik düzenleme hususları"] },
    { type: "p", content: [
      "Sesi kestiğinizde veya ses seviyesini ayarladığınızda, format seçimi doğrudan hassasiyet ve kaliteyi etkiler. Ses kesici, WAV dosyalarında örnek hassasiyetinde kesimler yapar çünkü her örnek bağımsız olarak erişilebilirdir. MP3 gibi sıkıştırılmış formatlar 576 veya 1.152 örnekle kareler halinde kodlar, bu yüzden kesme kodlayıcının kareyi yeniden oluşturmasını, kesmesini ve tekrar kodlamasını gerektirir — her düzenleme birikerek çoklu kesimlerde fark edilebilir bir kalite kaybı yaratır.",
    ]},
    { type: "p", content: [
      "Ses şiddeti ",
      { text: "LUFS", bold: true },
      " (Tam Skala ile Bağıl Ses Şiddeti Birimleri) cinsinden ölçülür ve Spotify, YouTube, Apple Music ile çoğu akış platformunun normalizasyon için kullandığı standarttır. -24 LUFS'de sessiz bir podcast bölümü, platform tarafından yaklaşık -14 LUFS'e yükseltilirken, -8 LUFS'de sıcak bir kayıt dönüştürülecektir — çoğu zaman istenmeyen pompalama efektleriyle. Podcast'ler için -16 LUFS ve müzik için -14 LUFS hedeflemek, algoritmanın karar vermesi yerine sese kontrol sahibi olmanızı sağlar.",
    ]},
    { type: "code", lang: "js", content: `// Hızlı ses şiddeti tahmini (basitleştirilmiş, gerçek bir LUFS metre değil)
function estimateLUFS(samples) {
  const toplamKareToplam = samples.reduce(
    (birikim, s) => birikim + s * s, 0
  );
  const rms = Math.sqrt(toplamKareToplam / samples.length);
  // -0,691 ITU-R BS.1770 bağıl seviye ofsetidir
  return 20 * Math.log10(rms) - 0.691;
}` },
    { type: "note", tone: "warning", title: "Ses şiddeti artışı kalite iyileştirmesi değildir", content: [
      "Ses artırıcı aracılığıyla kazancı artırmak sinyali daha yüksek yapar — kırpmayı düzeltmez, gürültüyü azaltmaz veya kaybedilmiş dinamik aralığı geri kazandırmaz. Doruk noktalarınız zaten 0 dBFS'de ise, daha fazla artırmak yalnızca daha fazla bozulma yaratır. Kazanç uygulamadan önce her zaman doruk seviyelerini kontrol edin.",
    ]},

    { type: "h2", content: ["Convrs'teki ses araçları"] },
    { type: "p", content: [
      "Bunların hepsi tarayıcıda çalışır, dosyanız asla cihazınızdan çıkmaz. ",
      { text: "WAV'den MP3'e dönüştürücü", bold: true, url: "/wav-to-mp3", internal: true },
      " ayarlanabilir bit hızıyla sıkıştırılmamış WAV'ı yüksek kaliteli MP3'e dönüştürür, bit derinliğini ve örnekleme hızını sunucu bağlantısı olmadan korur. ",
      { text: "Ses kesici", bold: true, url: "/audio-trimmer", internal: true },
      " ses kliplerini tarayıcınızda örnek düzeyinde hassasiyetle keser, kısaltır ve yeniden düzenler. ",
      { text: "Ses artırıcı", bold: true, url: "/volume-booster", internal: true },
      " gerçek zamanlı doruk izlemeyle ses şiddetini ayarlayarak paylaşmadan veya yüklemeden önce doğru LUFS seviyesini hedeflemenizi sağlar. Üç araç, sıfır yükleme, eksiksiz gizlilik.",
    ]},
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Audioformate und Qualität erklärt: WAV, MP3, AAC, FLAC und wann jedes zählt",
    eyebrow: "Audio",
    description:
      "WAV, MP3, AAC, FLAC und OGG Vorbis verwenden völlig unterschiedliche Strategien, um dieselbe Schallwelle zu speichern. Verstehen Sie Bittiefe, Abtastrate, psychoakustische Maskierung und Bitrate, um das richtige Format zu wählen, die Dateigröße genau zu berechnen und Qualitätsfehler zu vermeiden.",
    excerpt:
      "Was Bittiefe und Abtastrate wirklich bedeuten, wie verlustbehaftete Kompression funktioniert und wie viel Speicherplatz jedes Format pro Minute Audio belegt.",
    readingTime: "9 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: [
      "Jemand fragt nach einer \"hochwertigen\" Version einer Podcast-Folge, und Sie exportieren eine 60-MB-WAV-Datei, um sie auf WhatsApp zu teilen. \"Upload fehlgeschlagen.\" Sie wechseln auf 128-kbps-MP3, die Datei landet bei 1,6 MB, aber die Becken klingen jetzt wie zerknümmertes Alufolienpapier. Beide Entscheidungen waren falsch — eine zu groß, die andere zu verlustbehaftet. Das Verstehen davon sitzt genau in der Mechanik von Audioformaten, Bittiefe, Abtastrate und Bitrate. Dieser Leitfaden führt durch die gesamte Kette mit echten Zahlen, echter Mathematik und praktischen Regeln zur richtigen Formatwahl.",
    ]},

    { type: "h2", content: ["Die Grundlagen der digitalen Audiosignale: Bittiefe und Abtastrate"] },
    { type: "p", content: [
      "Schall ist eine kontinuierliche Druckwelle. Um sie digital zu speichern, nimmt ein Wandler diese Welle tausende Male pro Sekunde auf und zeichnet die Amplitude an jedem Punkt auf. Zwei Zahlen bestimmen die Qualität: ",
      { text: "Abtastrate", bold: true },
      " (wie viele Aufnahmen pro Sekunde) und ",
      { text: "Bittiefe", bold: true },
      " (wie genau jede Aufnahme gemessen wird).",
    ]},
    { type: "p", content: [
      "Standard-CD-Audio verwendet ",
      { text: "44,1 kHz", bold: true },
      " — 44.100 Abtastwerte pro Sekunde — und ",
      { text: "16 Bit", bold: true },
      " Tiefe. Das Nyquist-Theorem garantiert, dass eine Abtastrate von 44,1 kHz alle Frequenzen bis etwa 22 kHz erfasst, was die Obergrenze des menschlichen Hörens ist. Höhere Raten (48 kHz, 96 kHz, 192 kHz) erfassen ultrasonische Inhalte, die Menschen nicht hören, die aber Audioingenieure als Verarbeitungsspielraum nutzen können. Die Bittiefe definiert die Amplitudenauflösung: 16 Bit ergibt 65.536 diskrete Stufen pro Abtastwert und einen theoretischen Dynamikumfang von etwa 96 dB. 24-Bit-Aufnahmen bringen das auf 16,7 Millionen Stufen und ungefähr 144 dB — mehr Spielraum bedeutet weniger Clipping-Risiko beim Mischen und Mastering.",
    ]},
    { type: "p", content: [
      "Bittiefe und Abtastrate sind der Grund, warum unkomprimiertes Audio groß ist: jeder einzelne Abtastwert wird ohne Abkürzung auf die Festplatte geschrieben. Eine ",
      { text: "44,1 kHz, 16-Bit, Stereo", bold: true },
      "-Datei produziert 44.100 × 2 Byte × 2 Kanäle = 176.400 Bytes pro Sekunde. Mal 60 ergibt etwa 10,1 MB pro Minute. Das ist der Preis für die Bewahrung jedes Details der Schallwelle.",
    ]},

    { type: "h2", content: ["WAV und PCM: wie Rohtonspuren auf der Festplatte aussehen"] },
    { type: "p", content: [
      "Eine WAV-Datei ist ein dünner RIFF-Container, der rohe Pulse-Code-Modulation-Daten umhüllt — der wörtliche Strom abgetasteter Amplituden, unkomprimiert und unbearbeitet. Es gibt keinen Algorithmus, der Informationen verwirft, keine von einem Modell auferlegte Frequenzobergrenze. Deshalb ist WAV der Referenzstandard in Tonstudios, beim Rundfunk und beim Mastering: Es trägt alles, was das Mikrofon aufgenommen hat.",
    ]},
    { type: "p", content: [
      "Die Rohtmathematik für eine minütige CD-Qualitäts-Stereo-Datei: 44.100 Abtastwerte/Sek × 2 Byte (16 Bit) × 2 Kanäle × 60 Sekunden = ",
      { text: "10.584.000 Bytes ≈ 10,1 MB", bold: true },
      ". Eine volle Stunde desselben Tracks überquert 600 MB. AIFF ist Apples Äquivalent — gleiche Größe, anderes Konzept, anderer Metadaten-Header. Die Erkenntnis: unkomprimiertes Audio tauscht enorme Dateigrößen gegen perfekte Treue.",
    ]},

    { type: "h2", content: ["Verlustbehaftete Kompression: psychoakustische Maskierung"] },
    { type: "p", content: [
      "Verlustbehaftete Formate wie MP3 und AAC \"reduzieren die Qualität nicht gleichmäßig\". Sie nutzen die Grenzen des menschlichen Hörens durch ein Modell namens ",
      { text: "psychoakustische Maskierung", bold: true },
      ". Wenn zwei Töne gleichzeitig auftreten, kann der lautere den leiseren maskieren — Ihr auditorisches System nimmt das maskierte Signal schlicht nicht wahr. Ein Beckenüberblendgeräusch verschattet eine nahe Gitarrenharmonie. Ein lauter Kick-Drum-Schlag verbirgt eine leise Bassnote. Der Codec analysiert jeden Tonrahmen, identifiziert, was das Ohr nicht vermissen wird, und wirft diese Daten dauerhaft weg.",
    ]},
    { type: "p", content: [
      "Der zweite Mechanismus ist die ",
      { text: "Frequenzobergrenze", bold: true },
      ". Das menschliche Hören reicht grob von 20 Hz bis 20 kHz, und die Empfindlichkeit sinkt steil über etwa 16 kHz. Die meisten MP3-Encoder wenden einen harten Tiefpassfilter an, der alles über 17–18 kHz entfernt — sogar bei höchsten Bitraten. Das ist für die meisten Hörer über 20 oder alle, die im Pendelverkehr mit Kopfhörern hören, unhörbar. Aber es ist einer der Gründe, warum Audiophile für kritisches Hören verlustfreie Formate bevorzugen: Die Daten sind weg, und kein Decoder kann sie zurückholen.",
    ]},

    { type: "h2", content: ["Bitrate: was 128, 192 und 320 kbps wirklich bedeuten"] },
    { type: "p", content: [
      "Die Bitrate, gemessen in Kilobit pro Sekunde (", { text: "kbps", code: true }, "), steuert, wie viele Daten der verlustbehaftete Codec behält. Niedrigere Bitrate bedeutet aggressivere Filterung und Datenverwerfung. Die praktischen Stufen für MP3 sind gut verstanden:",
    ]},
    { type: "list", items: [
      [
        { text: "128 kbps", bold: true },
        " — der lange \"Standard\". Der Encoder entfernt die meisten Frequenzen über 16 kHz, komprimiert das Stereo-Bild und verwischt Transienten-Details. Becken verlieren ihren Glanz, Gitarrenanschläge klingen verschwommen. Akzeptabel für Gelegenheitshören über minderwertige Lautsprecher, aber auf guten Kopfhörern merklich verschlechtert. Ein gesamtes Album passt bei dieser Rate auf eine einzige CD.",
      ],
      [
        { text: "192 kbps", bold: true },
        " — ein spürbarer Sprung. Mehr Hochfrequenzinhalte überleben, die Stereo-Breite verbessert sich, und die meisten Gelegenheitshörer können die Quelle von einem WAV in einem Blindtest nicht unterscheiden. Das ist das praktische Minimum für Musik, die man aufbewahren möchte.",
      ],
      [
        { text: "320 kbps", bold: true },
        " — das Maximum für MP3. Die psychoakustische Filterung ist minimal; nur die extremsten Hochfrequenz-Abtrennungen bleiben. In kontrollierten Hörtests haben selbst geschulte Ohren Mühe, 320-kbps-MP3 von einer WAV-Quelle zu unterscheiden. Für fast jeden Hörer und jeden Anwendungsfall ist das wahrnehmungsverlustfrei.",
      ],
    ]},
    { type: "p", content: [
      "AAC erzählt eine leicht andere Geschichte: Bei ",
      { text: "128 kbps AAC", bold: true },
      " entspricht die Qualität typischerweise 192 kbps MP3 oder übertrifft sie. Apples Encoder und die Open-Source-Bibliothek FDK-AAC produzieren beide sauberere Ergebnisse bei gleichen Bitraten, weshalb Apple Music und YouTube standardmäßig AAC statt MP3 verwenden.",
    ]},

    { type: "h2", content: ["Die Mathematik: Dateigrößen, die Sie tatsächlich berechnen können"] },
    { type: "p", content: [
      "Die Dateigröße bei verlustbehafteten Formaten ist eine direkte Multiplikation: Bitrate × Dauer. Eine Minute Audio bei 128 kbps:",
    ]},
    { type: "list", items: [
      [{ text: "128 kbps × 60 Sekunden = 7.680 Kilobit = 960 KB ≈ 0,94 MB", bold: true }],
      [{ text: "192 kbps × 60 Sekunden = 11.520 Kilobit = 1.440 KB ≈ 1,41 MB", bold: true }],
      [{ text: "320 kbps × 60 Sekunden = 19.200 Kilobit = 2.400 KB ≈ 2,34 MB", bold: true }],
      [{ text: "CD-Qualität WAV (44,1k/16-Bit-Stereo) = 10.584.000 Bytes ≈ 10,1 MB", bold: true }],
    ]},
    { type: "p", content: [
      "Der Vergleich ist frappierend: 320 kbps MP3 liefert nahezu identische wahrgenommene Qualität wie WAV bei etwa einem Viertel der Dateigröße. Das ist das gesamte Wertversprechen verlustbehafteter Kompression. Bei FLAC ist das Verhältnis anders — verlustfreie Kompression reduziert WAV typischerweise um etwa 50–65 %, sodass eine einminütige CD-Qualitäts-FLAC-Datei bei etwa 4–6 MB landet, mit null Qualitätsverlust halb so groß wie WAV.",
    ]},
    { type: "note", tone: "success", title: "Schnelle Faustregel", content: [
      "Zur Schätzung jeder verlustbehafteten Dateigröße in Megabyte: Multiplizieren Sie die Bitrate in kbps mit der Dauer in Sekunden und teilen Sie durch 8.000. Für eine 3-minütige 192-kbps-MP3: 192 × 180 / 8.000 ≈ 4,3 MB.",
    ]},

    { type: "h2", content: ["Formatvergleich: wann jedes passt"] },
    { type: "table", columns: ["Format", "Typischer Einsatz", "1-Min.-Größe (CD-Qualitätsquelle)", "Browser-Unterstützung"], rows: [
      ["WAV / PCM", "Aufnahme, Editing, Mastering, Archivierung", "~10,1 MB", "Alle modernen Browser"],
      ["MP3", "Universelles Teilen, Legacy-Systeme, Podcasts", "960 KB – 2,34 MB (128–320 kbps)", "Alle Browser seit 2010"],
      ["AAC", "Apple-Ökosystem, YouTube, Streaming-Dienste", "960 KB – 1,6 MB (128–256 kbps)", "Chrome, Firefox, Safari, Edge"],
      ["FLAC", "Archivierung, High-Fidelity-Bibliotheken", "4–6 MB", "Chrome, Firefox, Edge; Safari teilweise (macOS Ventura+)"],
      ["OGG Vorbis", "Nicht-Apple-Open-Source-Umgebungen", "~1–2 MB (128–256 kbps)", "Chrome, Firefox, Edge; kein Safari"],
    ]},

    { type: "h2", content: ["Browser-Unterstützung und Kompatibilitätsrealität"] },
    { type: "p", content: [
      "Die Formatwahl ist nicht nur eine Qualitätsfrage — sie ist auch eine Bereitstellungsfrage. MP3 hat universelle Unterstützung: jeder Browser, jedes Betriebssystem, jeder Autoradio, jedes Smart-TV. Wenn Sie garantierte Wiedergabe ohne Einschränkungen wünschen, liefert nur MP3 das.",
    ]},
    { type: "p", content: [
      "AAC läuft nativ in Chrome, Firefox, Edge und Safari — und deckt damit die überwiegende Mehrheit moderner Desktop- und Mobilnutzer ab. Allerdings können ältere Android-Geräte und Linux-Distributionen ohne zusätzliche Codecs Probleme haben. ",
      { text: "FLAC", bold: true },
      "-Wiedergabe wird in Chrome und Firefox gut unterstützt, aber Safaris Unterstützung ist auf macOS Ventura (13.0) und später beschränkt. Nutzer auf älteren macOS- oder iOS-Versionen hören nichts. ",
      { text: "OGG Vorbis", bold: true },
      " ist das am stärksten eingeschränkte: Safari hat es nie nativ unterstützt, und es gibt keine Anzeichen, dass Apple es hinzufügen wird. Wenn Ihr Publikum Safari-Nutzer einschließt, ist OGG kein tragfähiges Hauptformat — koppeln Sie es immer mit einem MP3-Fallback.",
    ]},
    { type: "note", tone: "warning", title: "Safari und FLAC", content: [
      "Safari fügte FLAC-Unterstützung ab macOS Ventura (13.0) und iOS 16 hinzu. Wenn Sie Audiodateien bereitstellen, die auf älteren Apple-Geräten oder in WebViews in Apps mit älteren WebKit-Engines laufen müssen, testen Sie die FLAC-Wiedergabe ausdrücklich. Erwägen Sie, neben jedem FLAC-Download-Link auch einen MP3- oder AAC-Fallback bereitzustellen.",
    ]},

    { type: "h2", content: ["Schneiden, Lautstärke und praktische Editing-Überlegungen"] },
    { type: "p", content: [
      "Wenn Sie Audio schneiden oder die Lautstärke anpassen, beeinflusst die Formatwahl direkt Präzision und Qualität. Der Audio-Trimmer führt abtastgenaue Schnitte auf WAV-Dateien durch, weil jeder Abtastwert unabhängig zugänglich ist. Komprimierte Formate wie MP3 kodieren in Frames von 576 oder 1.152 Abtastwerten, sodass das Schneiden erfordert, dass der Encoder den Frame rekonstruiert, schneidet und erneut kodiert — jeder Schnitt führt einen winzigen Qualitätsverlust ein, der sich über viele Schnitte aufsummiert.",
    ]},
    { type: "p", content: [
      "Lautstärke wird in ",
      { text: "LUFS", bold: true },
      " (Lautstärkeeinheiten relativ zur vollen Skala) gemessen und ist der Standard, den Spotify, YouTube, Apple Music und die meisten Streaming-Plattformen zur Normalisierung verwenden. Eine leise Podcast-Folge bei -24 LUFS wird von der Plattform auf etwa -14 LUFS angehoben, während eine harte Aufnahme bei -8 LUFS heruntergefahren wird — oft mit unerwünschten Pump-Effekten. Eine Zielvorgabe von -16 LUFS für Podcasts und -14 LUFS für Musik vor dem Hochladen gibt Ihnen Kontrolle über den Klang, statt einem Algorithmus die Entscheidung zu überlassen.",
    ]},
    { type: "code", lang: "js", content: `// Schnelle Lautstärke-Schätzung (vereinfacht, kein echtes LUFS-Meter)
function estimateLUFS(samples) {
  const sumOfSquares = samples.reduce(
    (acc, s) => acc + s * s, 0
  );
  const rms = Math.sqrt(sumOfSquares / samples.length);
  // -0,691 ist der ITU-R BS.1770 relative Pegel-Offset
  return 20 * Math.log10(rms) - 0.691;
}` },
    { type: "note", tone: "warning", title: "Lautstärkeeinblendung ist keine Qualitätsverbesserung", content: [
      "Lautstärke über einen Volume-Booster zu erhöhen, macht das Signal lauter — es behebt kein Clipping, reduziert kein Rauschen und stellt keinen verlorenen Dynamikumfang wieder her. Wenn Ihre Spitzen bereits 0 dBFS erreichen, erzeugt weiteres Erhöhen nur mehr Verzerrung. Überprüfen Sie immer die Spitzenpegel, bevor Sie Gain anwenden.",
    ]},

    { type: "h2", content: ["Audio-Werkzeuge in Convrs"] },
    { type: "p", content: [
      "All das läuft im Browser auf Convrs — Ihre Audiodatei verlässt nie Ihr Gerät. ",
      { text: "Der WAV-zu-MP3-Konverter", bold: true, url: "/wav-to-mp3", internal: true },
      " wandelt unkomprimiertes WAV in hochwertiges MP3 mit einstellbarer Bitrate um und bewahrt Bittiefe und Abtastrate ohne Server-Roundtrip. ",
      { text: "Der Audio-Trimmer", bold: true, url: "/audio-trimmer", internal: true },
      " schneidet, trimmt und ordnet Audioclips direkt in Ihrem Browser mit abtastgenauer Präzision neu an. ",
      { text: "Der Volume-Booster", bold: true, url: "/volume-booster", internal: true },
      " passt die Lautstärke mit Echtzeit-Spitzenüberwachung an, sodass Sie das richtige LUFS-Ziel erreichen, bevor Sie teilen oder hochladen. Drei Werkzeuge, null Uploads, vollständige Privatsphäre.",
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Formatos de audio y calidad explicados: WAV, MP3, AAC, FLAC y cuándo importa cada uno",
    eyebrow: "Audio",
    description:
      "WAV, MP3, AAC, FLAC y OGG Vorbis usan estrategias completamente diferentes para almacenar la misma onda sonora. Comprende la profundidad de bits, la frecuencia de muestreo, el enmascaramiento psicoacústico y la tasa de bits para elegir el formato correcto, calcular el tamaño exacto y evitar errores de calidad difíciles de revertir.",
    excerpt:
      "Qué significan realmente la profundidad de bits y la frecuencia de muestreo, cómo funciona la compresión con pérdida y cuánto ocupa cada formato por minuto de audio.",
    readingTime: "9 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: [
      "Alguien pide una versión \"de alta calidad\" de un episodio de podcast y exportas un WAV de 60 MB para compartir por WhatsApp. \"Fallo al subirlo.\" Lo bajas a MP3 de 128 kbps, el archivo pesa 1,6 MB, pero los platillos ahora suenan como papel de aluminio arrugado. Ambas decisiones fueron erróneas — una demasiado grande, la otra con dema.siada pérdida. Entender por qué se sitúa exactamente en la mecánica de los formatos de audio, la profundidad de bits, la frecuencia de muestreo y la tasa de bits. Esta guía recorre toda la cadena con números reales, cálculos reales y reglas prácticas para elegir el formato correcto cada vez.",
    ]},

    { type: "h2", content: ["Los fundamentos del audio digital: profundidad de bits y frecuencia de muestreo"] },
    { type: "p", content: [
      "El sonido es una onda de presión continua. Para almacenarla digitalmente, un convertidor muestrea esa onda miles de veces por segundo y registra la amplitud en cada punto. Dos números controlan la calidad: ",
      { text: "frecuencia de muestreo", bold: true },
      " (cuántas capturas por segundo) y ",
      { text: "profundidad de bits", bold: true },
      " (qué tan precisa es cada captura).",
    ]},
    { type: "p", content: [
      "El audio estándar de CD usa ",
      { text: "44,1 kHz", bold: true },
      " — 44.100 muestras cada segundo — y ",
      { text: "16 bits", bold: true },
      " de profundidad. El teorema de Nyquist garantiza que una frecuencia de muestreo de 44,1 kHz captura todas las frecuencias hasta aproximadamente 22 kHz, que es el techo del oído humano. Frecuencias más altas (48 kHz, 96 kHz, 192 kHz) capturan contenido ultrasónico que los humanos no oyen pero que los ingenieros de audio pueden usar para obtener margen de procesamiento. La profundidad de bits define la resolución de amplitud: 16 bits ofrece 65.536 niveles discretos por muestra y un rango dinámico teórico de aproximadamente 96 dB. La grabación a 24 bits lleva eso a 16,7 millones de niveles y aproximadamente 144 dB — más margen significa menos riesgo de clipping durante la mezcla y el masterización.",
    ]},
    { type: "p", content: [
      "La profundidad de bits y la frecuencia de muestreo son la razón por la que el audio sin comprimir es grande: cada muestra se escribe en disco sin atajos. Un archivo ",
      { text: "44,1 kHz, 16 bits, estéreo", bold: true },
      " produce 44.100 × 2 bytes × 2 canales = 176.400 bytes por segundo. Multiplicado por 60 obtienes aproximadamente 10,1 MB por minuto. Ese es el costo de preservar cada detalle de la forma de onda.",
    ]},

    { type: "h2", content: ["WAV y PCM: cómo se ve la señal sin comprimir en disco"] },
    { type: "p", content: [
      "Un archivo WAV es un contenedor RIFF delgado que envuelve datos de Modulación por Código de Pulso crudos — el flujo literal de amplitudes muestreadas, sin comprimir y sin procesar. No hay algoritmo que deseche información, no hay techo de frecuencia impuesto por un modelo. Por eso WAV es el estándar de referencia en estudios de grabación, radiodifusión y masterización: lleva todo lo que el micrófono capturó.",
    ]},
    { type: "p", content: [
      "La matemática cruda para un archivo estéreo de un minuto en calidad CD: 44.100 muestras/seg × 2 bytes (16 bits) × 2 canales × 60 segundos = ",
      { text: "10.584.000 bytes ≈ 10,1 MB", bold: true },
      ". Una hora completa de la misma grabación supera los 600 MB. AIFF es el equivalente de Apple — mismo tamaño, mismo concepto, distinto encabezado de metadatos. La lección: el audio sin comprimir intercambia tamaños enormes por fidelidad perfecta.",
    ]},

    { type: "h2", content: ["Cómo funciona la compresión con pérdida: enmascaramiento psicoacústico"] },
    { type: "p", content: [
      "Los formatos con pérdida como MP3 y AAC no \"reducen la calidad de forma uniforme\". Explotan las limitaciones del oído humano mediante un modelo llamado ",
      { text: "enmascaramiento psicoacústico", bold: true },
      ". Cuando dos sonidos ocurren al mismo tiempo, el más fuerte puede enmascarar al más suave — tu sistema auditivo simplemente no percibe la señal enmascarada. Un platillo cubre una armónica cercana de guitarra. Un golpe fuerte de bombo oculta una nota suave de bajo. El códec analiza cada fotograma de audio, identifica lo que el oído no echará de menos y descarta esos datos permanentemente.",
    ]},
    { type: "p", content: [
      "El segundo mecanismo es el ",
      { text: "techo de frecuencias", bold: true },
      ". El oído humano abarca aproximadamente 20 Hz a 20 kHz, y la sensibilidad cae bruscamente por encima de unos 16 kHz. La mayoría de codificadores MP3 aplican un filtro pasa-bajo que elimina todo por encima de 17–18 kHz — incluso a las tasas de bits más altas. Esto es inaudible para la mayoría de oyentes mayores de 20 años o cualquiera que escuche con auriculares en el transporte. Pero es una de las razones por las que los audiófilos prefieren formatos sin pérdida para escucha crítica: los datos se fueron y ningún decodificador puede traerlos de vuelta.",
    ]},

    { type: "h2", content: ["Tasa de bits: qué significan realmente 128, 192 y 320 kbps"] },
    { type: "p", content: [
      "La tasa de bits, medida en kilobits por segundo (", { text: "kbps", code: true }, "), controla cuántos datos conserva el códec con pérdida. Una tasa de bits más baja significa filtrado y descarte más agresivos. Los niveles prácticos para MP3 se entienden bien:",
    ]},
    { type: "list", items: [
      [
        { text: "128 kbps", bold: true },
        " — el \"estándar\" de hace años. El codificador elimina la mayoría de frecuencias por encima de 16 kHz, comprime la imagen estéreo y difumina los detalles transitorios. Los platillos pierden brillo, los rasgueos de guitarra suenan embarrados. Aceptable para escucha casual en altavoces de baja calidad, pero notablemente degradado en auriculares buenos. Un álbum completo cabe en un solo CD a esta velocidad.",
      ],
      [
        { text: "192 kbps", bold: true },
        " — un salto significativo. Sobrevive más contenido de alta frecuencia, mejora la amplitud estéreo, y la mayoría de oyentes casuales no pueden distinguir la fuente de un WAV en una prueba a ciegas. Es el mínimo práctico para música que pretendas conservar.",
      ],
      [
        { text: "320 kbps", bold: true },
        " — el máximo para MP3. El filtrado psicoacústico es mínimo; solo quedan los cortes de frecuencias altas más extremos. En pruebas de escucha controladas, incluso los oídos entrenados tienen dificultad para distinguir un MP3 de 320 kbps de una fuente WAV. Para casi todos los oyentes y todos los usos, esto es perceptualmente sin pérdida.",
      ],
    ]},
    { type: "p", content: [
      "AAC cuenta una historia ligeramente diferente: a ",
      { text: "128 kbps AAC", bold: true },
      ", la calidad típicamente iguala o supera 192 kbps MP3. Los codificadores de Apple y la biblioteca de código abierto FDK-AAC producen ambos resultados más limpios a tasas de bits equivalentes, razón por la que Apple Music y YouTube usan AAC por defecto en lugar de MP3.",
    ]},

    { type: "h2", content: ["La matemática: tamaños de archivo que puedes calcular de verdad"] },
    { type: "p", content: [
      "El tamaño de archivo en formatos con pérdida es una multiplicación directa: tasa de bits × duración. Un minuto de audio a 128 kbps:",
    ]},
    { type: "list", items: [
      [{ text: "128 kbps × 60 segundos = 7.680 kilobits = 960 KB ≈ 0,94 MB", bold: true }],
      [{ text: "192 kbps × 60 segundos = 11.520 kilobits = 1.440 KB ≈ 1,41 MB", bold: true }],
      [{ text: "320 kbps × 60 segundos = 19.200 kilobits = 2.400 KB ≈ 2,34 MB", bold: true }],
      [{ text: "Calidad CD WAV (44,1k/16 bits estéreo) = 10.584.000 bytes ≈ 10,1 MB", bold: true }],
    ]},
    { type: "p", content: [
      "La comparación es impactante: MP3 a 320 kbps ofrece una calidad perceptual casi idéntica a WAV con aproximadamente una cuarta parte del tamaño. Esa es toda la propuesta de valor de la compresión con pérdida. Para FLAC la relación es diferente — la compresión sin pérdida reduce WAV típicamente en un 50–65 %, de modo que un minuto de FLAC en calidad CD ocupa alrededor de 4–6 MB, con cero pérdida de calidad, la mitad del tamaño de WAV.",
    ]},
    { type: "note", tone: "success", title: "Regla rápida", content: [
      "Para estimar el tamaño de cualquier archivo con pérdida en megabytes: multiplica la tasa de bits en kbps por la duración en segundos y divide entre 8.000. Para un MP3 de 3 minutos a 192 kbps: 192 × 180 / 8.000 ≈ 4,3 MB.",
    ]},

    { type: "h2", content: ["Comparación de formatos: cuándo usar cada uno"] },
    { type: "table", columns: ["Formato", "Uso típico", "Tamaño 1 min (fuente calidad CD)", "Soporte en navegadores"], rows: [
      ["WAV / PCM", "Grabación, edición, masterización, archivo", "~10,1 MB", "Todos los navegadores modernos"],
      ["MP3", "Compartir universalmente, sistemas legacy, podcasts", "960 KB – 2,34 MB (128–320 kbps)", "Todos los navegadores desde 2010"],
      ["AAC", "Ecosistema Apple, YouTube, servicios de streaming", "960 KB – 1,6 MB (128–256 kbps)", "Chrome, Firefox, Safari, Edge"],
      ["FLAC", "Archivo, bibliotecas de alta fidelidad", "4–6 MB", "Chrome, Firefox, Edge; Safari parcial (macOS Ventura+)"],
      ["OGG Vorbis", "Entornos de código abierto no Apple", "~1–2 MB (128–256 kbps)", "Chrome, Firefox, Edge; sin Safari"],
    ]},

    { type: "h2", content: ["Soporte en navegadores y realidad de compatibilidad"] },
    { type: "p", content: [
      "La elección de formato no es solo una cuestión de calidad — también es una cuestión de despliegue. MP3 tiene soporte universal: cada navegador, cada sistema operativo, cada estéreo de coche, cada Smart TV. Si necesitas reproducción garantizada sin advertencias, MP3 es el único formato que lo ofrece.",
    ]},
    { type: "p", content: [
      "AAC funciona de forma nativa en Chrome, Firefox, Edge y Safari — cubriendo la gran mayoría de usuarios modernos de escritorio y móvil. Sin embargo, algunos dispositivos Android antiguos y distribuciones Linux pueden tener problemas sin códecs adicionales. La reproducción de ",
      { text: "FLAC", bold: true },
      " es bien soportada en Chrome y Firefox, pero el soporte de Safari se limita a macOS Ventura (13.0) y posteriores. Usuarios en versiones anteriores de macOS o iOS no escucharán nada. ",
      { text: "OGG Vorbis", bold: true },
      " es el más restringido: Safari nunca lo ha soportado de forma nativa y Apple no muestra señales de añadirlo. Si tu audiencia incluye usuarios de Safari, OGG no es un formato primario viable — siempre incluye un respaldo en MP3.",
    ]},
    { type: "note", tone: "warning", title: "Safari y FLAC", content: [
      "Safari añadió soporte para FLAC a partir de macOS Ventura (13.0) e iOS 16. Si estás sirviendo archivos de audio que deben reproducirse en dispositivos Apple antiguos o en WebViews integradas en aplicaciones que usan motores WebKit más viejos, prueba la reproducción de FLAC explícitamente. Considera proporcionar un respaldo en MP3 o AAC junto con cualquier enlace de descarga FLAC.",
    ]},

    { type: "h2", content: ["Recorte, volumen y consideraciones prácticas de edición"] },
    { type: "p", content: [
      "Cuando recortas audio o ajustas el volumen, la elección del formato afecta directamente la precisión y la calidad. El recortador de audio realiza cortes precisos a nivel de muestra en archivos WAV porque cada muestra es accesible de forma independiente. Los formatos comprimidos como MP3 codifican en fotogramas de 576 o 1.152 muestras, por lo que recortar requiere que el codificador reconstruya el fotograma, corte y recodifique — cada edición introduce una pequeña pérdida de calidad que se acumula a través de muchos cortes.",
    ]},
    { type: "p", content: [
      "El volumen se mide en ",
      { text: "LUFS", bold: true },
      " (Unidades de Volumen relativas a la Escala Completa), y es el estándar que usan Spotify, YouTube, Apple Music y la mayoría de plataformas de streaming para la normalización. Un episodio de podcast silencioso a -24 LUFS será elevado por la plataforma a aproximadamente -14 LUFS, mientras que una grabación fuerte a -8 LUFS será reducida — a menudo con efectos de bombeo no deseados. Apuntar a -16 LUFS para podcasts y -14 LUFS para música antes de subir te da control sobre el sonido en lugar de dejar que un algoritmo decida.",
    ]},
    { type: "code", lang: "js", content: `// Estimación rápida de volumen (simplificada, no es un medidor LUFS real)
function estimateLUFS(samples) {
  const sumaDeCuadrados = samples.reduce(
    (acum, s) => acum + s * s, 0
  );
  const rms = Math.sqrt(sumaDeCuadrados / samples.length);
  // -0,691 es el offset de nivel relativo ITU-R BS.1770
  return 20 * Math.log10(rms) - 0.691;
}` },
    { type: "note", tone: "warning", title: "Subir el volumen no es mejorar la calidad", content: [
      "Aumentar la ganancia con un ecualizador de volumen hace la señal más alta — no arregla el clipping, no reduce el ruido y no restaura el rango dinámico perdido. Si tus picos ya están en 0 dBFS, subirlos más solo genera más distorsión. Siempre verifica los niveles de pico antes de aplicar ganancia.",
    ]},

    { type: "h2", content: ["Herramientas de audio en Convrs"] },
    { type: "p", content: [
      "Todo esto funciona en el navegador en Convrs — tu archivo de audio nunca sale de tu dispositivo. ",
      { text: "El convertidor de WAV a MP3", bold: true, url: "/wav-to-mp3", internal: true },
      " transcodifica WAV sin comprimir a MP3 de alta calidad con tasa de bits ajustable, preservando la profundidad de bits y la frecuencia de muestreo sin ida y vuelta al servidor. ",
      { text: "El recortador de audio", bold: true, url: "/audio-trimmer", internal: true },
      " recorta, corta y reorganiza clips de audio directamente en tu navegador con precisión a nivel de muestra. ",
      { text: "El ecualizador de volumen", bold: true, url: "/volume-booster", internal: true },
      " ajusta el volumen con monitoreo de picos en tiempo real, para que puedas apuntar al nivel LUFS correcto antes de compartir o subir. Tres herramientas, cero subidas, privacidad completa.",
    ]},
  ],
};

const audioFormatsQualityGuide: GuideDefinition = {
  slug: "audio-formats-quality-guide",
  content: { en, tr, de, es },
};

export default audioFormatsQualityGuide;
