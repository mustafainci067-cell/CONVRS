import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Resize vs Crop: Getting Image Dimensions Right for Web and Social",
    eyebrow: "Images",
    description:
      "Resizing scales the whole image; cropping cuts a region and changes the aspect ratio. Understand the difference, why web pixels have nothing to do with DPI, which dimensions the social platforms actually expect, and how to export without paying the recompression tax.",
    excerpt:
      "When to resize, when to crop, and why you should never upscale: aspect ratios, pixel dimensions, DPI confusion, and damage-free export rules.",
    readingTime: "10 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: [
      "You upload a 6000×4000 photo to an e-commerce listing that displays it at 400×300, and the store's pipeline rescales and recompresses it as a side effect of publishing. The photo survives, but the PNG screenshot you also shipped now looks smeared: the script scaled it to an odd dimension, ran it through a second JPEG compression, and turned your crisp interface text into soft edges. Nothing about your source file was wrong — the damage is a resize and a re-save happening on a file that had already been encoded once, with no idea what the final size was supposed to be. This guide is about controlling that process: what ",
      { text: "resize", bold: true },
      " and ",
      { text: "crop", bold: true },
      " really do, why DPI has almost nothing to do with web pixels, which dimensions the social platforms actually expect, and how Convrs' browser tools do the same job without a single file leaving your device.",
    ]},

    { type: "h2", content: ["Resize and crop: two operations, one image"] },
    { type: "p", content: ["The two commands look similar because both change the image dimensions, but they work differently, and you almost always want to choose one deliberately."] },
    { type: "list", items: [
      [{ text: "Resize", bold: true }, { text: " scales the whole image: every pixel is squashed or stretched into a new width and height, and the aspect ratio is preserved unless you force a mismatched size. Use it to fit a placement's maximum dimension or to shrink a file before upload." }],
      [{ text: "Crop", bold: true }, { text: " keeps one rectangular region and discards everything outside it. The image gets smaller because you removed content, and in almost every case the aspect ratio changes. Use it to reframe, cut away a cluttered edge, or match a platform ratio (16:9, 1:1, 4:5, 9:16)." }],
    ]},
    { type: "p", content: ["The practical pipeline is usually crop first, resize second: crop to the aspect ratio the placement demands, then resize the result to the pixel size. Doing it the other way around means resizing a frame that still carries unwanted content, or cropping a file that has already been interpolated — a small but real quality loss."] },

    { type: "h2", content: ["The damage you cannot undo: recompression"] },
    { type: "p", content: [
      "JPEG and WebP are lossy. Every save re-quantizes the pixels, discarding what the encoder considers invisible detail. Recompression compounds this: a JPEG resized down and saved again is a second generation, and fine edges — text, logos, UI screenshots — develop halos, mosquito noise and softness. By the third or fourth generation the degradation is obvious even at thumbnail size. PNG is lossless per save, but a PNG screenshot scaled to a non-integer dimension and then re-encoded is still interpolated: diagonal lines get stair-stepped and text goes fuzzy.",
    ]},
    { type: "p", content: [
      "The rule that prevents all of this is ",
      { text: "keep the master", bold: true },
      ". Save the original capture, resize exactly once, and export from it. If you no longer have the original — or you do have it, but it is the recompressed monster from step three — treat your best copy as the new master and stop editing it.",
    ]},
    { type: "note", tone: "warning", title: "Save once, from the master", content: [
      "Generation loss is cumulative. Resize from your original (or a RAW/PNG master), never from an already-saved JPEG, and always export the final cut in a single pass. If 'just quickly resize this' has happened to a file three times, its edges have already paid the price three times.",
    ]},

    { type: "h2", content: ["Pixels, not DPI: what '300 DPI' actually means"] },
    { type: "p", content: [
      "A digital image is a grid of pixels with exactly two properties: width and height. That is all the web reads. ",
      { text: "DPI", bold: true },
      " (dots per inch) and ",
      { text: "PPI", bold: true },
      " (pixels per inch) describe how densely a printer lays those pixels onto paper — print-only concepts stored as metadata. A 1200×1200 image is 1200 pixels on every screen, laptop or phone, whatever its DPI tag says.",
    ]},
    { type: "p", content: [
      "When a client asks for a '300 DPI image', they are almost always asking for print quality. At 300 PPI, a 5×7 inch print needs about 1500×2100 pixels; a web banner at that size is overkill. Raising the DPI number in an editor does not add pixels — it rewrites metadata, and in some tools it re-encodes the file for nothing. For web and social the only question is the pixel dimensions.",
    ]},

    { type: "h2", content: ["Aspect ratios and pre-sizing for social"] },
    { type: "p", content: [
      "Platforms crop and scale your uploads to fit their own placements, and what they key off is your aspect ratio (width:height). Get the ratio right and you keep control of the frame; get it wrong and the platform's crop decides what your audience sees. The ratios you will meet in practice:",
    ]},
    { type: "list", items: [
      [{ text: "16:9", code: true }, { text: " for landscape video and most shared link cards (Facebook/LinkedIn)." }],
      [{ text: "1:1", code: true }, { text: " for Instagram feed squares and profile grids." }],
      [{ text: "4:5", code: true }, { text: " for portrait feed posts — the tallest ratio the Instagram feed shows without cropping." }],
      [{ text: "9:16", code: true }, { text: " for Stories, Reels, Shorts and TikTok." }],
    ]},
    { type: "p", content: ["The placements worth memorizing:"] },
    { type: "table", columns: ["Placement", "Aspect ratio", "Recommended pixels", "Notes"], rows: [
      ["Instagram feed post", "1:1", "1080×1080", "Also works as 4:5 (1080×1350)"],
      ["Instagram / Facebook portrait", "4:5", "1080×1350", "Tallest ratio the feed shows uncropped"],
      ["Shared link card (FB / LinkedIn)", "1.91:1", "1200×630", "Open Graph og:image dimensions"],
      ["YouTube landscape", "16:9", "1920×1080", "1280×720 is the minimum"],
      ["Stories / Reels / Shorts / TikTok", "9:16", "1080×1920", "Vertical, full screen"],
      ["Twitter/X in-stream", "16:9", "1600×900", "Common choice for landscape"],
    ]},
    { type: "p", content: [
      "Pre-sizing rule: build the largest placement you actually need and crop down from it. If both a feed post (1:1) and a story (9:16) matter, produce the square at 1080×1080 and then prepare the vertical from the same master — do not carve a 9:16 frame out of an already-small square. Platforms recompress what you upload; hand them the exact ratio and a comfortably large file and they compress once instead of twice.",
    ]},

    { type: "h2", content: ["Resizing in the browser with canvas"] },
    { type: "p", content: [
      "When you resize in code — here, or in an upload widget — the browser gives you canvas, and two flags control the quality. Sharp downscaling of a photo needs smoothing enabled, and ",
      { text: "imageSmoothingQuality: 'high'", code: true },
      " switches the browser into a more expensive but visibly better filter. EXIF rotation is worth handling too: phones record photos upright but mark them with a rotation tag, and naive ",
      { text: "drawImage", code: true },
      " calls ignore that tag — your photo comes back sideways.",
    ]},
    { type: "code", lang: "js", content: `async function resizeToMax(file, maxDim, quality = 0.82) {
  // Decodes the image and respects the camera's EXIF rotation tag
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, w, h);

  // To crop instead, draw only the source rectangle you want to keep:
  // ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, w, h);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality) // or "image/jpeg"
  );
  bitmap.close(); // release the decoded bitmap's memory
  return blob;
}` },
    { type: "p", content: [
      "The scale is capped at 1 on purpose: the ",
      { text: "Math.min(1, ...)", code: true },
      " clamp means this function can never upscale. The output is only ever the same size or smaller — exactly the rule for web images.",
    ]},

    { type: "h2", content: ["When to resize in a tool and when to let CSS handle it"] },
    { type: "p", content: [
      "CSS resizes rendering, not bytes. ",
      { text: "max-width: 100%", code: true },
      ", ",
      { text: "object-fit: cover", code: true },
      " (a CSS crop) and responsive ",
      { text: "srcset", code: true },
      " with ",
      { text: "sizes", code: true },
      " adapt the displayed image to any viewport — that is correct and cheap. But the browser still downloads the original file. Shipping a 6000×4000 JPEG so CSS can shrink it to 400px wastes megabytes on every page view and keeps the image on the network far longer than anyone notices.",
    ]},
    { type: "p", content: [
      "The web-friendly sequence: resize the file itself to the largest size any placement needs — commonly the 2× rule for retina, so 1920 or 2400 wide if it can ever be viewed full-screen — then let CSS scale it down for smaller breakpoints, and point ",
      { text: "srcset", code: true },
      " at a couple of explicit sizes for slow devices. Image files are static: make them right once instead of charging a recompression tax to every visitor.",
    ]},

    { type: "h2", content: ["Round numbers, powers of two, and the no-upscale rule"] },
    { type: "p", content: [
      "Three habits keep exports predictable. First, export to round dimensions: 1200 wide, not 1193. Odd numbers come from chained scaling math and invite visible interpolation artifacts. Second, if you resize by a fixed factor, prefer clean step sizes — ",
      { text: "0.5×", code: true },
      ", ",
      { text: "0.25×", code: true },
      " — because some pipelines (tiling, mipmaps, texture atlases, certain thumbnailing services) resample best on powers of two: a 2048-pixel source downscaled to 1024 averages 2×2 blocks cleanly, while 1000 introduces fractional sampling.",
    ]},
    { type: "p", content: [
      "Third, the rule that fixes more blurry images than any filter: ",
      { text: "never upscale a web image beyond its native resolution.", bold: true },
      " Upscaling invents pixels. A 400px-wide image stretched to 1200px is still 400px of real detail — the interpolation guesses the rest, and no sharpening filter adds information that was never captured. If a placement needs 1200px and your source is 400px, re-shoot or re-render; do not try to 'improve' it in the editor.",
    ]},
    { type: "note", tone: "warning", title: "Upscaling never adds detail", content: [
      "Feeding a 400-pixel file into an 'upscale to HD' filter produces a bigger file and zero new detail — smoothed interpolation at best. If the source is genuinely small, keep it at native size and let the browser scale it up; the result looks identical and the file is smaller.",
    ]},

    { type: "h2", content: ["Filters and watermarks: finishing steps, in the right order"] },
    { type: "p", content: [
      "Filters and watermarks belong at the very end, after resize and crop have locked the final frame. Watermark first, then crop, and you cut your own logo out of the picture; watermark before resizing and the text may shrink into illegibility, or the mark scales relative to a frame that is not the one delivered.",
    ]},
    { type: "p", content: [
      "A sane order: (1) apply the look — grayscale, sepia, brightness/contrast, saturation, blur — to the source; (2) crop to the target ratio; (3) resize to the target pixels; (4) add the watermark with size and opacity relative to the final image; (5) export once. Text watermarks usually survive small sizes better than image watermarks; 4–6% of the shorter side at 30–50% opacity in a corner is the common, unobtrusive default. Exporting once, after every edit, is what holds the quality tax to a single generation loss.",
    ]},

    { type: "h2", content: ["The image tools in Convrs"] },
    { type: "p", content: [
      "Convrs puts the whole pipeline in the browser, and files never leave your device: ",
      { text: "Image Resizer", bold: true },
      " resizes by pixels or by percentage with quality control, ",
      { text: "Image Cropper", bold: true },
      " cuts to aspect-ratio presets (16:9, 1:1, 4:5, 9:16) or a custom box, ",
      { text: "Image Filters", bold: true },
      " applies grayscale, sepia, brightness/contrast/saturation and blur, ",
      { text: "Watermark Adder", bold: true },
      " overlays a text or image watermark with position, size and opacity, and ",
      { text: "Image Compressor", bold: true },
      " reduces file size for uploads. Crop with the ratio locked, resize to the platform pixels, sharpen the look, watermark once, compress for the road — the master and every derived file stay on your machine, and only the finished export ever moves.",
    ]},
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Yeniden Boyutlandırma mı, Kırpma mı: Web ve Sosyal Medya için Doğru Görsel Boyutları",
    eyebrow: "Görseller",
    description:
      "Yeniden boyutlandırma tüm görseli ölçekler; kırpma bir bölgeyi keser ve en-boy oranını değiştirir. Farkı, DPI'nin web pikselleriyle ilgisini, sosyal platformların gerçekte beklediği boyutları ve yeniden sıkıştırma vergisini ödemeden nasıl dışa aktaracağınızı öğrenin.",
    excerpt:
      "Ne zaman boyutlandırma, ne zaman kırpma: en-boy oranları, piksel boyutları, DPI kafa karışıklığı ve kalite kaybetmeden dışa aktarma kuralları.",
    readingTime: "10 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: [
      "6000×4000 bir fotoğrafı, görselin 400×300 olarak göründüğü bir e-ticaret ürün listesine yüklersiniz ve platformun sistemi bunu yayınlarken yeniden boyutlandırıp yeniden sıkıştırır. Fotoğraf bunu atlatır ama yüklediğiniz PNG ekran görüntüsü artık bulaşmış gibi görünür: betik onu tek olmayan bir boyuta ölçeklemiş, ikinci bir JPEG sıkıştırmasından geçirmiş ve net arayüz yazılarınızı yumuşak kenarlara dönüştürmüştür. Kaynak dosyada bir kusur yoktu — hasar, zaten bir kez kodlanmış bir görselin, hedef boyutun ne olacağı bilinmeden yeniden boyutlandırılıp yeniden kaydedilmesinden doğar. Bu rehber o süreci kontrol altına almakla ilgilidir: ",
      { text: "yeniden boyutlandırma", bold: true },
      " ve ",
      { text: "kırpma", bold: true },
      " işlemlerinin gerçekte ne yaptığını, DPI'nin web pikselleriyle neredeyse hiç ilgisinin olmadığını, sosyal platformların gerçekte hangi boyutları beklediğini ve Convrs'nin tarayıcı araçlarının aynı işi tek bir dosya cihazınızdan çıkmadan nasıl yaptığını.",
    ]},

    { type: "h2", content: ["Yeniden boyutlandırma ve kırpma: iki işlem, tek görsel"] },
    { type: "p", content: ["İki komut da görselin boyutlarını değiştirdiği için benzer görünür, ama çalışma biçimleri farklıdır ve pratikte hangisini istediğinize bilinçli karar vermeniz gerekir."] },
    { type: "list", items: [
      [{ text: "Yeniden boyutlandırma", bold: true }, { text: " tüm görseli ölçekler: her piksel yeni bir genişliğe ve yüksekliğe sıkıştırılır ya da gerilir; oranı zorlamadığınız sürece en-boy oranı korunur. Bir yerleşimin maksimum boyutuna sığmak ya da dosyayı yüklemeden önce küçültmek için kullanın." }],
      [{ text: "Kırpma", bold: true }, { text: " yalnızca dikdörtgensel bir bölgeyi tutar ve dışındaki her şeyi atar. Görsel, içerik eksildiği için küçülür ve neredeyse her durumda en-boy oranı değişir. Çerçeveyi yeniden kurmak, dağınık bir kenarı kesmek ya da bir platformun oranına (16:9, 1:1, 4:5, 9:16) uymak için kullanın." }],
    ]},
    { type: "p", content: ["Pratik sıra genellikle önce kırpma, sonra boyutlandırmadır: önce yerleşimin istediği en-boy oranına kırpın, sonra sonucu piksel boyutuna getirin. Tersi, istenmeyen içeriği hâlâ taşıyan bir çerçeveyi boyutlandırmak ya da zaten enterpolasyona uğramış bir dosyayı kırpmak demektir — küçük ama gerçek bir kalite kaybı."] },

    { type: "h2", content: ["Geri dönüşü olmayan hasar: yeniden sıkıştırma"] },
    { type: "p", content: [
      "JPEG ve WebP kayıplı biçimlerdir. Her kayıt, kodlayıcının görünmez saydığı ayrıntıları atarak pikselleri yeniden niceler. Yeniden sıkıştırma bunu birleştirir: küçültülüp yeniden kaydedilen bir JPEG ikinci kuşaktır; ince kenarlar — yazı, logo, arayüz ekran görüntüleri — halka, sinek gürültüsü ve yumuşama geliştirir. Üçüncü ya da dördüncü kuşakta bozulma küçük resim boyutunda bile belli olur. PNG kaydedildikçe kayıpsızdır, ama tam sayı olmayan bir boyuta ölçeklenip yeniden kodlanan bir PNG ekran görüntüsü yine de enterpolasyona uğrar: çapraz çizgiler merdivenleşir, yazı bulanıklaşır.",
    ]},
    { type: "p", content: [
      "Tüm bunları önleyen kural şudur: ",
      { text: "ana dosyayı saklayın", bold: true },
      ". Orijinal çekimi kaydedin, tam olarak bir kez boyutlandırın ve ondan dışa aktarın. Artık orijinaliniz yoksa — ya da varsa ama üçüncü adımdaki yeniden sıkıştırılmış canavarsa — en iyi kopyanızı yeni ana dosya olarak kabul edin ve onu düzenlemeyi bırakın.",
    ]},
    { type: "note", tone: "warning", title: "Bir kez kaydedin, ana dosyadan", content: [
      "Kuşak kaybı birikimlidir. Görseli orijinalinizden (ya da RAW/PNG ana dosyanızdan) boyutlandırın, asla zaten kaydedilmiş bir JPEG'ten değil ve son kurguyu her zaman tek geçişte dışa aktarın. 'Şunu küçültüver' aynı dosyaya üç kez uygulandıysa kenarları o üç kezin bedelini çoktan ödemiştir.",
    ]},

    { type: "h2", content: ["Pikseller, DPI değil: '300 DPI' ne demek"] },
    { type: "p", content: [
      "Dijital bir görsel, tam olarak iki özelliği olan bir piksel ızgarasıdır: genişlik ve yükseklik. Web'in okuduğu tek şey budur. ",
      { text: "DPI", bold: true },
      " (dots per inch, inç başına nokta) ve ",
      { text: "PPI", bold: true },
      " (pixels per inch, inç başına piksel), bir yazıcının bu pikselleri kâğıda ne kadar yoğun döşediğini anlatır — yalnızca baskıya özgü, meta veri olarak saklanan kavramlar. 1200×1200 bir görsel, DPI etiketi ne derse desin her ekranda — dizüstü ya da telefon — 1200 pikseldir.",
    ]},
    { type: "p", content: [
      "Bir müşteri '300 DPI görsel' istediğinde neredeyse her zaman baskı kalitesi istiyordur. 300 PPI'da 5×7 inçlik bir baskı yaklaşık 1500×2100 piksel gerektirir; aynı boyutta bir web banner'ı fazlasıdır. DPI sayısını editörde yükseltmek piksel eklemez — yalnızca meta veriyi yeniden yazar ve bazı araçlarda dosyayı boşuna yeniden kodlar. Web ve sosyal medya için tek soru piksel boyutlarıdır.",
    ]},

    { type: "h2", content: ["Sosyal medya için en-boy oranları ve önceden boyutlandırma"] },
    { type: "p", content: [
      "Platformlar yüklediklerinizi kendi yerleşimlerine uyacak şekilde kırpar ve ölçekler; yönlendirici olan da sizin en-boy oranınızdır (genişlik:yükseklik). Oranı doğru verirseniz çerçevenin denetimi sizde kalır; yanlış verirseniz platformun kırpması izleyicilerinizin göreceği şeyi belirler. Pratikte karşınıza çıkacak oranlar:",
    ]},
    { type: "list", items: [
      [{ text: "16:9", code: true }, { text: " yatay video ve çoğu paylaşım bağlantısı kartı için (Facebook/LinkedIn)." }],
      [{ text: "1:1", code: true }, { text: " Instagram akış kareleri ve profil ızgaraları için." }],
      [{ text: "4:5", code: true }, { text: " dikey akış gönderileri için — Instagram akışının kırpmadan gösterebildiği en uzun oran." }],
      [{ text: "9:16", code: true }, { text: " Stories, Reels, Shorts ve TikTok için." }],
    ]},
    { type: "p", content: ["Ezberlemeye değer yerleşimler:"] },
    { type: "table", columns: ["Yerleşim", "En-boy oranı", "Önerilen piksel", "Notlar"], rows: [
      ["Instagram akış gönderisi", "1:1", "1080×1080", "4:5 (1080×1350) olarak da çalışır"],
      ["Instagram / Facebook dikey", "4:5", "1080×1350", "Akışın kırpmadan gösterdiği en uzun oran"],
      ["Paylaşım bağlantısı kartı (FB / LinkedIn)", "1.91:1", "1200×630", "Open Graph og:image boyutları"],
      ["YouTube yatay", "16:9", "1920×1080", "Minimum 1280×720"],
      ["Stories / Reels / Shorts / TikTok", "9:16", "1080×1920", "Dikey, tam ekran"],
      ["Twitter/X akış", "16:9", "1600×900", "Yatay için yaygın tercih"],
    ]},
    { type: "p", content: [
      "Önceden boyutlandırma kuralı: gerçekten ihtiyacınız olan en büyük yerleşimi üretin ve ondan aşağı kırpın. Hem akış gönderisi (1:1) hem story (9:16) önemliyse kareyi 1080×1080 olarak üretin, sonra dikeyi aynı ana dosyadan hazırlayın — hâlâ küçük bir karenin içinden 9:16 çerçeve koparmayın. Platformlar yüklediğinizi yeniden sıkıştırır; doğru oranı ve rahatça büyük bir dosyayı verirseniz bir kez sıkıştırırlar, iki kez değil.",
    ]},

    { type: "h2", content: ["Tarayıcıda canvas ile yeniden boyutlandırma"] },
    { type: "p", content: [
      "Kod içinde — burada ya da bir yükleme bileşeninde — boyutlandırırken tarayıcı size canvas verir ve kaliteyi iki bayrak belirler. Bir fotoğrafın keskin biçimde küçültülmesi düzleştirmenin açık olmasını ister ve ",
      { text: "imageSmoothingQuality: 'high'", code: true },
      " tarayıcıyı daha pahalı ama gözle görülür biçimde daha iyi bir filtreye geçirir. EXIF dönüşünü de ele almak gerekir: telefonlar fotoğrafları dik kaydeder ama bir dönüş etiketiyle işaretler; saf ",
      { text: "drawImage", code: true },
      " çağrıları bu etiketi yok sayarak fotoğrafınızı yan yatık gösterir.",
    ]},
    { type: "code", lang: "js", content: `async function resizeToMax(file, maxDim, quality = 0.82) {
  // Görseli çözer ve kameranın EXIF dönüş etiketine saygı duyar
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, w, h);

  // Kırpmak için istediğiniz kaynak bölgeyi çizin:
  // ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, w, h);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality) // veya "image/jpeg"
  );
  bitmap.close(); // çözülen bitmaplerin belleğini boşaltır
  return blob;
}` },
    { type: "p", content: [
      "Ölçek kasıtlı olarak 1 ile sınırlandırılmıştır: ",
      { text: "Math.min(1, ...)", code: true },
      " kelepçesi bu işlevin asla büyütme yapamamasını sağlar. Çıktı yalnızca aynı boyutta ya da daha küçük olur — web görselleri için kural tam da budur.",
    ]},

    { type: "h2", content: ["Bir araçta mı boyutlandıralım, yoksa CSS'ye mi bırakalım"] },
    { type: "p", content: [
      "CSS görünümü ölçekler, baytları değil. ",
      { text: "max-width: 100%", code: true },
      ", ",
      { text: "object-fit: cover", code: true },
      " (bir CSS kırpması) ve ",
      { text: "srcset", code: true },
      " ile ",
      { text: "sizes", code: true },
      " birlikte görüntülenen fotoğrafı her görüntü alanına uyarlar — doğrudur ve ucuzdur. Ama tarayıcı yine de orijinal dosyayı indirir. CSS onu 400 piksele küçültsün diye 6000×4000 bir JPEG yüklemek her sayfa görüntülemesinde megabayt harcar ve görseli ağda kimsenin fark etmediği kadar uzun süre tutar.",
    ]},
    { type: "p", content: [
      "Web'e uygun sıra: dosyayı herhangi bir yerleşimin ihtiyaç duyabileceği en büyük boyuta getirin — retina için ortak 2× kuralı, yani tam ekran görülebilecekse 1920 ya da 2400 genişlik — sonra daha küçük kırılımlarda CSS'in küçültmesine izin verin ve yavaş cihazlar için ",
      { text: "srcset", code: true },
      " içinde birkaç açık boyut belirtin. Görsel dosyaları statiktir: her ziyaretçiye yeniden sıkıştırma vergisi ödetmek yerine onları bir kez doğru üretin.",
    ]},

    { type: "h2", content: ["Yuvarlak sayılar, iki katları ve büyütmeme kuralı"] },
    { type: "p", content: [
      "Üç alışkanlık dışa aktarımları öngörülebilir kılar. İlki, yuvarlak boyutlara dışa aktarın: 1193 değil 1200 genişlik. Tek sayılar zincirleme ölçekleme matematiğinden çıkar ve görünür enterpolasyon izleri davet eder. İkincisi, sabit bir faktörle küçültüyorsanız temiz adımları tercih edin — ",
      { text: "0.5×", code: true },
      ", ",
      { text: "0.25×", code: true },
      " — çünkü bazı hatlar (döşeme, mipmap, doku atlası ve bazı küçük resim servisleri) iki katlarında en iyi şekilde yeniden örnekler; 2048 piksellik bir kaynak 1024'e indirilirken 2×2 blokları temizce ortalar, 1000 ise kesirli örnekleme getirir.",
    ]},
    { type: "p", content: [
      "Üçüncüsü, bulanık görselleri her filtreden daha çok düzelten kural: ",
      { text: "web görselini asla doğal çözünürlüğünün ötesine büyütmeyin.", bold: true },
      " Büyütme piksel uydurur. 400 piksel genişliğindeki bir görsel 1200'e gerildiğinde hâlâ 400 piksellik gerçek ayrıntı taşır — enterpolasyon gerisini tahmin eder ve hiçbir keskinleştirme filtresi, hiç yakalanmamış bilgiyi ekleyemez. Yerleşim 1200 piksel istiyor, kaynağınız 400 ise yeniden çekin ya da yeniden üretin; editörde 'iyileştirmeye' çalışmayın.",
    ]},
    { type: "note", tone: "warning", title: "Büyütme asla ayrıntı eklemez", content: [
      "400 piksellik bir dosyayı 'HD'ye büyüt' filtresine vermek, daha büyük bir dosya ve sıfır yeni ayrıntı üretir — en iyi ihtimalle düzleştirilmiş bir enterpolasyon. Kaynak gerçekten küçükse onu doğal boyutunda tutun ve büyütmeyi tarayıcıya bırakın; sonuç görsel olarak birebirdir ve dosya daha küçüktür.",
    ]},

    { type: "h2", content: ["Filtreler ve filigranlar: son rötuşlar, doğru sırada"] },
    { type: "p", content: [
      "Filtreler ve filigranlar en sona aittir: boyutlandırma ve kırpma son çerçeveyi kilitledikten sonra. Önce filigran, sonra kırpma olursa kendi logonuzu kare dışına atmış olursunuz; filigranı boyutlandırmadan önce eklerseniz yazı okunamayacak kadar küçülebilir ya da filigran, teslim edilenle ilgisi olmayan bir çerçeveye göre ölçeklenir.",
    ]},
    { type: "p", content: [
      "Sağlam bir sıra: (1) görünümü kaynağa uygulayın — gri tonlama, sepya, parlaklık/kontrast, doygunluk, bulanıklık; (2) hedef orana kırpın; (3) hedef piksel boyutuna getirin; (4) filigranı nihai görsele göre boyut ve opaklıkla ekleyin; (5) bir kez dışa aktarın. Metin filigranları küçük boyutlarda okunabilirlik açısından genellikle görsel filigranlardan iyidir; kısa kenarın %4–6'sı boyut ve %30–50 opaklıkla bir köşe, yaygın ve göze batmayan bir varsayılandır. Tüm düzenlemelerden sonra tek kez dışa aktarmak kalite vergisini tek bir kuşak kaybında tutar.",
    ]},

    { type: "h2", content: ["Convrs'teki görsel araçları"] },
    { type: "p", content: [
      "Convrs tüm hattı tarayıcıda sunar ve dosyalar cihazınızdan asla çıkmaz: ",
      { text: "Görsel Boyutlandırıcı", bold: true },
      " piksellere göre ya da yüzdeyle, kalite kontrolüyle boyutlandırır, ",
      { text: "Görsel Kırpıcı", bold: true },
      " en-boy oranı önayarlarına (16:9, 1:1, 4:5, 9:16) ya da özel bir kutuya kırpar, ",
      { text: "Görsel Filtreleri", bold: true },
      " gri tonlama, sepya, parlaklık/kontrast/doygunluk ve bulanıklık uygular, ",
      { text: "Filigran Ekleme", bold: true },
      " konum, boyut ve opaklıkla metin ya da görsel filigran bindirir, ",
      { text: "Görsel Sıkıştırıcı", bold: true },
      " da yükleme için dosya boyutunu küçültür. Oranı kilitli kırpın, platform piksellerine boyutlandırın, görünümü keskinleştirin, bir kez filigranlayın, yol için sıkıştırın — ana dosya ve türetilmiş her dosya makinenizde kalır, yalnızca bitmiş dışa aktarım hareket eder.",
    ]},
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Resize oder Crop: Bildgrößen für Web und Social richtig machen",
    eyebrow: "Bilder",
    description:
      "Resize skaliert das ganze Bild, Crop schneidet einen Bereich aus und ändert das Seitenverhältnis. Verstehen Sie den Unterschied, warum Web-Pixel nichts mit DPI zu tun haben, welche Größen Social-Plattformen erwarten und wie Sie verlustfrei aus dem Original exportieren.",
    excerpt:
      "Wann Resize, wann Crop: Seitenverhältnisse, Pixelmaße, DPI-Verwirrung und verlustfreie Exportregeln für Web und Social Media.",
    readingTime: "10 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: [
      "Sie laden ein 6000×4000-Foto in einen Onlineshop-Eintrag, der es als 400×300 anzeigt, und die Pipeline des Shops skaliert und komprimiert es beim Veröffentlichen neu. Das Foto überlebt, aber der PNG-Screenshot, den Sie ebenfalls hochgeladen haben, sieht jetzt verschmiert aus: Das Skript hat ihn auf eine krumme Größe skaliert, durch eine zweite JPEG-Kompression geschickt und Ihre gestochen scharfen UI-Texte in weiche Kanten verwandelt. Ihre Quelldatei war nicht falsch — der Schaden entsteht, wenn eine bereits einmal kodierte Datei ein Resize und ein erneutes Speichern durchläuft, ohne dass bekannt ist, welche Endgröße geplant war. Dieser Leitfaden dreht sich darum, diesen Prozess zu kontrollieren: was ",
      { text: "Resize", bold: true },
      " und ",
      { text: "Crop", bold: true },
      " wirklich tun, warum DPI fast nichts mit Web-Pixeln zu tun hat, welche Maße die Social-Plattformen tatsächlich erwarten und wie die Browser-Werkzeuge von Convrs dieselbe Arbeit erledigen, ohne dass eine Datei Ihr Gerät verlässt.",
    ]},

    { type: "h2", content: ["Resize und Crop: zwei Operationen, ein Bild"] },
    { type: "p", content: ["Beide Befehle wirken ähnlich, weil sie die Bildabmessungen ändern, aber sie arbeiten unterschiedlich — und Sie sollten bewusst wählen, was Sie wollen."] },
    { type: "list", items: [
      [{ text: "Resize", bold: true }, { text: " skaliert das ganze Bild: Jedes Pixel wird auf eine neue Breite und Höhe gestaucht oder gestreckt; das Seitenverhältnis bleibt erhalten, es sei denn, Sie erzwingen eine nicht passende Größe. Es passt ein Bild an eine maximale Platzgröße an oder verkleinert die Datei vor dem Hochladen." }],
      [{ text: "Crop", bold: true }, { text: " behält nur einen rechteckigen Bereich und verwirft alles außerhalb. Das Bild wird kleiner, weil Inhalt entfernt wurde, und das Seitenverhältnis ändert sich fast immer. Es rahmt neu, schneidet unruhige Ränder weg oder erfüllt ein Plattform-Format (16:9, 1:1, 4:5, 9:16)." }],
    ]},
    { type: "p", content: ["Die praktische Reihenfolge ist meist erst Crop, dann Resize: erst auf das Verhältnis der Platzierung schneiden, dann das Ergebnis auf die Pixelgröße bringen. Andersherum resizen Sie einen Rahmen, der noch unerwünschten Inhalt trägt, oder Sie croppen eine Datei, die bereits interpoliert wurde — ein kleiner, aber echter Qualitätsverlust."] },

    { type: "h2", content: ["Der nicht umkehrbare Schaden: Rekompression"] },
    { type: "p", content: [
      "JPEG und WebP sind verlustbehaftet. Jedes Speichern quantisiert die Pixel neu und verwirft, was der Encoder für unsichtbar hält. Rekompression potenziert das: Ein verkleinert gespeichertes JPEG ist eine zweite Generation; feine Kanten — Text, Logos, UI-Screenshots — bekommen Halos, Mückenrauschen und Weichheit. In der dritten oder vierten Generation ist die Verschlechterung schon in der Thumbnail-Größe sichtbar. PNG ist pro Speicherung verlustfrei, aber ein auf eine nicht ganzzahlige Größe skalierter und neu kodierter PNG-Screenshot wird trotzdem interpoliert: Diagonalen werden treppenförmig, Text verschwimmt.",
    ]},
    { type: "p", content: [
      "Die Regel, die das alles verhindert, lautet: ",
      { text: "Behalten Sie das Master", bold: true },
      ". Speichern Sie die Aufnahme, skalieren Sie genau einmal und exportieren Sie daraus. Haben Sie das Original nicht mehr — oder haben Sie es, aber nur noch als rekomprimiertes Monster aus Schritt drei — behandeln Sie Ihre beste Kopie als neues Master und arbeiten Sie nicht weiter daran.",
    ]},
    { type: "note", tone: "warning", title: "Einmal speichern, aus dem Master", content: [
      "Der Verlust über Generationen summiert sich. Skalieren Sie aus Ihrem Original (oder einem RAW/PNG-Master), nie aus einem bereits gespeicherten JPEG, und exportieren Sie den Endstand immer in einem Durchgang. Wenn „kurz verkleinern“ dreimal an derselben Datei passiert ist, haben ihre Kanten den Preis dafür schon dreimal bezahlt.",
    ]},

    { type: "h2", content: ["Pixel, nicht DPI: was „300 DPI“ wirklich bedeutet"] },
    { type: "p", content: [
      "Ein digitales Bild ist ein Pixelraster mit genau zwei Eigenschaften: Breite und Höhe. Genau das liest das Web. ",
      { text: "DPI", bold: true },
      " (dots per inch) und ",
      { text: "PPI", bold: true },
      " (pixels per inch) beschreiben, wie dicht ein Drucker diese Pixel aufs Papier legt — reine Druck-Konzepte, gespeichert als Metadaten. Ein 1200×1200-Bild ist auf jedem Bildschirm, ob Laptop oder Smartphone, 1200 Pixel groß, egal was im DPI-Feld steht.",
    ]},
    { type: "p", content: [
      "Wenn ein Kunde ein „300-DPI-Bild“ verlangt, meint er fast immer Druckqualität. Bei 300 PPI braucht ein 5×7-Zoll-Druck etwa 1500×2100 Pixel; ein Web-Banner in dieser Größe ist übertrieben. Die DPI-Zahl im Editor zu erhöhen, fügt keine Pixel hinzu — sie schreibt nur Metadaten neu und re-kodiert in manchen Werkzeugen die Datei grundlos. Für Web und Social zählt ausschließlich die Pixelgröße.",
    ]},

    { type: "h2", content: ["Seitenverhältnisse und Vorgrößen für Social"] },
    { type: "p", content: [
      "Plattformen croppen und skalieren Ihre Uploads für ihre eigenen Platzierungen; maßgeblich ist Ihr Seitenverhältnis (Breite:Höhe). Liefern Sie das richtige Verhältnis, behalten Sie die Kontrolle über den Rahmen; liefern Sie das falsche, entscheidet der Crop der Plattform, was Ihr Publikum sieht. Die Verhältnisse, die Ihnen in der Praxis begegnen:",
    ]},
    { type: "list", items: [
      [{ text: "16:9", code: true }, { text: " für Querformat-Videos und die meisten geteilten Link-Karten (Facebook/LinkedIn)." }],
      [{ text: "1:1", code: true }, { text: " für Instagram-Feed-Quadrate und Profilraster." }],
      [{ text: "4:5", code: true }, { text: " für Hochformat-Beiträge — das höchste Verhältnis, das der Instagram-Feed ohne Crop zeigt." }],
      [{ text: "9:16", code: true }, { text: " für Stories, Reels, Shorts und TikTok." }],
    ]},
    { type: "p", content: ["Die Platzierungen, die man sich merken sollte:"] },
    { type: "table", columns: ["Platzierung", "Seitenverhältnis", "Empfohlene Pixel", "Hinweis"], rows: [
      ["Instagram-Feed-Beitrag", "1:1", "1080×1080", "Auch als 4:5 (1080×1350) möglich"],
      ["Instagram / Facebook Hochformat", "4:5", "1080×1350", "Höchstes Verhältnis, das der Feed ungeschnitten zeigt"],
      ["Geteilte Link-Karte (FB / LinkedIn)", "1.91:1", "1200×630", "Open-Graph-og:image-Maße"],
      ["YouTube quer", "16:9", "1920×1080", "1280×720 ist das Minimum"],
      ["Stories / Reels / Shorts / TikTok", "9:16", "1080×1920", "Hochkant, Vollbild"],
      ["Twitter/X-Stream", "16:9", "1600×900", "Übliche Wahl für quer"],
    ]},
    { type: "p", content: [
      "Regel fürs Vorgrößen: Erstellen Sie die größte Platzierung, die Sie wirklich brauchen, und croppen Sie daraus nach unten. Zählen sowohl Feed-Beitrag (1:1) als auch Story (9:16), produzieren Sie das Quadrat mit 1080×1080 und bereiten Sie das Hochformat aus demselben Master vor — schneiden Sie kein 9:16 aus einem bereits kleinen Quadrat. Plattformen komprimieren Ihren Upload ohnehin neu; wenn Sie ihnen das exakte Verhältnis und eine bequem große Datei geben, komprimieren sie einmal statt zweimal.",
    ]},

    { type: "h2", content: ["Im Browser mit Canvas resizen"] },
    { type: "p", content: [
      "Beim Skalieren im Code — hier oder in einem Upload-Widget — stellt der Browser Ihnen Canvas bereit, und zwei Flags entscheiden über die Qualität. Scharfes Herunterskalieren eines Fotos will das Smoothing aktiviert haben, und ",
      { text: "imageSmoothingQuality: 'high'", code: true },
      " versetzt den Browser in einen teureren, aber sichtbar besseren Filter. EXIF-Rotation lohnt sich ebenfalls: Telefone speichern Fotos aufrecht, markieren sie aber mit einem Rotations-Tag, und naive ",
      { text: "drawImage", code: true },
      "-Aufrufe ignorieren das — Ihr Foto liegt dann auf der Seite.",
    ]},
    { type: "code", lang: "js", content: `async function resizeToMax(file, maxDim, quality = 0.82) {
  // Dekodiert das Bild und respektiert das EXIF-Rotations-Tag der Kamera
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, w, h);

  // Zum Croppen stattdessen nur den gewünschten Quellbereich zeichnen:
  // ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, w, h);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality) // oder "image/jpeg"
  );
  bitmap.close(); // Speicher des dekodierten Bitmaps freigeben
  return blob;
}` },
    { type: "p", content: [
      "Die Skalierung ist absichtlich auf 1 gedeckelt: Die Klammer ",
      { text: "Math.min(1, ...)", code: true },
      " stellt sicher, dass diese Funktion nie hochskaliert — die Ausgabe ist höchstens gleich groß oder kleiner. Genau das ist die Regel für Web-Bilder.",
    ]},

    { type: "h2", content: ["In einem Tool resizen oder CSS entscheiden lassen"] },
    { type: "p", content: [
      "CSS skaliert die Darstellung, nicht die Bytes. ",
      { text: "max-width: 100%", code: true },
      ", ",
      { text: "object-fit: cover", code: true },
      " (ein CSS-Crop) und responsives ",
      { text: "srcset", code: true },
      " mit ",
      { text: "sizes", code: true },
      " passen das angezeigte Bild jedem Viewport an — das ist richtig und günstig. Aber der Browser lädt trotzdem die Originaldatei. Ein 6000×4000-JPEG hochzuladen, damit CSS es auf 400 Pixel schrumpft, verschwendet auf jeder Seitenansicht Megabytes und hält das Bild länger im Netz, als irgendjemand bemerkt.",
    ]},
    { type: "p", content: [
      "Die webgerechte Reihenfolge: Skalieren Sie die Datei selbst auf die größte Größe, die eine Platzierung braucht — üblich ist der 2×-Faktor für Retina, also 1920 oder 2400 breit, falls es je vollbildsichtig wird —, lassen Sie dann CSS für kleinere Breakpoints verkleinern und nennen Sie in ",
      { text: "srcset", code: true },
      " ein paar explizite Größen für träge Geräte. Bilddateien sind statisch: Machen Sie sie einmal richtig, statt jedem Besucher eine Rekompression aufzubürden.",
    ]},

    { type: "h2", content: ["Runde Zahlen, Zweierpotenzen und die Kein-Upscale-Regel"] },
    { type: "p", content: [
      "Drei Gewohnheiten halten Exporte vorhersagbar. Erstens: Exportieren Sie auf runde Maße — 1200 breit, nicht 1193. Ungerade Zahlen entstehen aus verketteter Skalierungs-Mathematik und laden zu sichtbaren Interpolationsartefakten ein. Zweitens: Skalieren Sie mit einem festen Faktor, bevorzugen Sie saubere Schritte — ",
      { text: "0.5×", code: true },
      ", ",
      { text: "0.25×", code: true },
      " —, denn einige Pipelines (Tiling, Mipmaps, Textur-Atlanten, manche Thumbnail-Dienste) resamplen auf Zweierpotenzen am besten: Eine 2048-Pixel-Quelle, auf 1024 verkleinert, mittelt 2×2-Blöcke sauber, während 1000 fraktionales Sampling einführt.",
    ]},
    { type: "p", content: [
      "Drittens die Regel, die mehr verschwommene Bilder repariert als jeder Filter: ",
      { text: "Skalieren Sie ein Web-Bild nie über seine native Auflösung hoch.", bold: true },
      " Hochskalieren erfindet Pixel. Ein 400 Pixel breites Bild, auf 1200 gestreckt, enthält immer noch 400 Pixel echte Details — die Interpolation rät den Rest, und kein Schärfungsfilter fügt Information hinzu, die nie erfasst wurde. Braucht die Platzierung 1200 Pixel und Ihre Quelle hat 400, fotografieren Sie neu oder rendern Sie neu; versuchen Sie nicht, es im Editor zu „verbessern“.",
    ]},
    { type: "note", tone: "warning", title: "Upscaling fügt nie Details hinzu", content: [
      "Eine 400-Pixel-Datei in einen „Upscale auf HD“-Filter zu geben, ergibt eine größere Datei und null neue Details — bestenfalls geglättete Interpolation. Ist die Quelle wirklich klein, behalten Sie die native Größe und lassen Sie den Browser hochskalieren; das Ergebnis sieht identisch aus und die Datei ist kleiner.",
    ]},

    { type: "h2", content: ["Filter und Wasserzeichen: Endschritte in der richtigen Reihenfolge"] },
    { type: "p", content: [
      "Filter und Wasserzeichen gehören ganz ans Ende, nachdem Resize und Crop den endgültigen Rahmen fixiert haben. Erst Wasserzeichen, dann Crop, und Sie schneiden Ihr eigenes Logo ab; Wasserzeichen vor dem Resize, und der Text kann unleserlich schrumpfen oder die Marke skaliert relativ zu einem Rahmen, der nicht ausgeliefert wird.",
    ]},
    { type: "p", content: [
      "Eine sinnvolle Reihenfolge: (1) den Look auf die Quelle anwenden — Graustufen, Sepia, Helligkeit/Kontrast, Sättigung, Unschärfe; (2) auf das Zielverhältnis croppen; (3) auf die Zielpixel resizen; (4) das Wasserzeichen mit Größe und Opazität relativ zum finalen Bild setzen; (5) einmal exportieren. Text-Wasserzeichen überleben kleine Größen meist besser als Bild-Wasserzeichen; 4–6 % der kürzeren Seite bei 30–50 % Opazität in einer Ecke ist die übliche, dezenteste Vorgabe. Einmal nach allen Bearbeitungen zu exportieren, hält die Qualitätsabgabe bei einem einzigen Generationsverlust.",
    ]},

    { type: "h2", content: ["Die Bildwerkzeuge in Convrs"] },
    { type: "p", content: [
      "Convrs liefert die ganze Pipeline im Browser, und Dateien verlassen nie Ihr Gerät: ",
      { text: "der Bild-Resizer", bold: true },
      " skaliert nach Pixeln oder Prozent mit Qualitätskontrolle, ",
      { text: "der Bild-Cropper", bold: true },
      " schneidet auf Seitenverhältnis-Vorgaben (16:9, 1:1, 4:5, 9:16) oder ein eigenes Rechteck, ",
      { text: "der Bild-Filter", bold: true },
      " wendet Graustufen, Sepia, Helligkeit/Kontrast/Sättigung und Unschärfe an, ",
      { text: "der Wasserzeichen-Addierer", bold: true },
      " legt ein Text- oder Bild-Wasserzeichen mit Position, Größe und Opazität über das Bild, und ",
      { text: "der Bild-Kompressor", bold: true },
      " reduziert die Dateigröße für Uploads. Mit fixiertem Verhältnis croppen, auf Plattform-Pixel resizen, den Look schärfen, einmal wasserzeichen, für den Weg komprimieren — Master und alle Ableitungen bleiben auf Ihrem Rechner, nur der fertige Export wandert.",
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Resize vs. Crop: dimensiones de imagen correctas para web y redes sociales",
    eyebrow: "Imágenes",
    description:
      "Redimensionar escala toda la imagen; recortar corta una región y cambia la proporción. Entiende la diferencia, por qué los píxeles web no tienen nada que ver con el DPI, qué tamaños esperan las plataformas sociales y cómo exportar sin pagar el impuesto de la recompresión.",
    excerpt:
      "Cuándo redimensionar, cuándo recortar: proporciones, dimensiones en píxeles, la confusión del DPI y reglas de exportación sin pérdida.",
    readingTime: "10 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: [
      "Subes una foto de 6000×4000 a un listado de comercio electrónico que la muestra a 400×300, y la tubería de la tienda la redimensiona y re-comprime como efecto secundario al publicar. La foto sobrevive, pero la captura de pantalla PNG que también enviaste ahora parece emborronada: el script la escaló a una dimensión impar, la pasó por una segunda compresión JPEG y convirtió tu texto de interfaz nítido en bordes suaves. Tu archivo original no era el problema; el daño llega cuando un archivo ya codificado pasa por redimensionado y re-guardado sin que se sepa qué tamaño final se esperaba. Esta guía trata de controlar ese proceso: qué hacen de verdad ",
      { text: "redimensionar", bold: true },
      " y ",
      { text: "recortar", bold: true },
      ", por qué el DPI casi no tiene relación con los píxeles web, qué dimensiones esperan realmente las plataformas sociales y cómo las herramientas de navegador de Convrs hacen el mismo trabajo sin que un solo archivo salga de tu dispositivo.",
    ]},

    { type: "h2", content: ["Redimensionar y recortar: dos operaciones, una imagen"] },
    { type: "p", content: ["Los dos comandos parecen similares porque ambos cambian las dimensiones de la imagen, pero trabajan de forma distinta, y casi siempre conviene elegir uno deliberadamente."] },
    { type: "list", items: [
      [{ text: "Redimensionar", bold: true }, { text: " escala toda la imagen: cada píxel se encoge o se estira hacia un nuevo ancho y alto, y la proporción se conserva salvo que fuerces un tamaño que no corresponde. Se usa para ajustar a la dimensión máxima de una ubicación o para reducir el archivo antes de subirlo." }],
      [{ text: "Recortar", bold: true }, { text: " conserva solo una región rectangular y descarta todo lo demás. La imagen se hace más pequeña porque quitó contenido y, casi siempre, la proporción cambia. Se usa para reencuadrar, cortar un borde saturado o cumplir la proporción de una plataforma (16:9, 1:1, 4:5, 9:16)." }],
    ]},
    { type: "p", content: ["La secuencia práctica suele ser primero recortar y luego redimensionar: recorta a la proporción que pide la ubicación y luego escala el resultado a la medida en píxeles. Hacerlo al revés significa redimensionar un marco que aún lleva contenido no deseado, o recortar un archivo que ya fue interpolado: una pérdida pequeña pero real."] },

    { type: "h2", content: ["El daño irreversible: la recompresión"] },
    { type: "p", content: [
      "JPEG y WebP son formatos con pérdida. Cada guardado re-cuantiza los píxeles y descarta lo que el codificador considera detalle invisible. La recompresión lo acumula: un JPEG reducido y guardado otra vez es una segunda generación, y los bordes finos —texto, logos, capturas de interfaz— ganan halos, ruido de mosquito y suavidad. Para la tercera o cuarta generación, el deterioro se nota incluso en tamaño miniatura. El PNG es sin pérdida por guardado, pero una captura PNG escalada a una dimensión no entera y re-codificada igual se interpola: las diagonales se ven en escalera y el texto se desenfoca.",
    ]},
    { type: "p", content: [
      "La regla que evita todo esto es ",
      { text: "conserva el original", bold: true },
      ". Guarda la toma, redimensiona exactamente una vez y exporta desde ella. Si ya no tienes el original —o sí lo tienes, pero es el monstruo re-comprimido del tercer paso—, trata a tu mejor copia como el nuevo original y no la vuelvas a editar.",
    ]},
    { type: "note", tone: "warning", title: "Guarda una vez, desde el original", content: [
      "La pérdida por generación es acumulativa. Redimensiona desde tu original (o un master RAW/PNG), nunca desde un JPEG ya guardado, y exporta la versión final siempre en una sola pasada. Si «solo redimensionar rápido» se ha aplicado tres veces al mismo archivo, sus bordes ya pagaron el coste tres veces.",
    ]},

    { type: "h2", content: ["Píxeles, no DPI: qué significa de verdad «300 DPI»"] },
    { type: "p", content: [
      "Una imagen digital es una cuadrícula de píxeles con exactamente dos propiedades: ancho y alto. Eso es todo lo que lee la web. ",
      { text: "DPI", bold: true },
      " (puntos por pulgada) y ",
      { text: "PPI", bold: true },
      " (píxeles por pulgada) describen con qué densidad una impresora coloca esos píxeles en el papel: conceptos solo de impresión, guardados como metadatos. Una imagen de 1200×1200 mide 1200 píxeles en todas las pantallas, portátil o móvil, diga lo que diga su etiqueta DPI.",
    ]},
    { type: "p", content: [
      "Cuando un cliente pide una «imagen a 300 DPI», casi siempre pide calidad de impresión. A 300 PPI, una impresión de 5×7 pulgadas necesita alrededor de 1500×2100 píxeles; un banner web de ese tamaño es excesivo. Subir el número de DPI en un editor no añade píxeles: reescribe metadatos y, en algunas herramientas, re-codifica el archivo en vano. Para web y redes sociales, lo único que importa son las dimensiones en píxeles.",
    ]},

    { type: "h2", content: ["Proporciones y tamaños previos para redes sociales"] },
    { type: "p", content: [
      "Las plataformas recortan y escalan tus subidas para encajarlas en sus propias ubicaciones, y lo que manda es tu proporción de aspecto (ancho:alto). Con la proporción correcta mantienes el control del encuadre; con una incorrecta, el recorte de la plataforma decide lo que ve tu audiencia. Las proporciones que te vas a encontrar:",
    ]},
    { type: "list", items: [
      [{ text: "16:9", code: true }, { text: " para vídeo apaisado y la mayoría de tarjetas de enlaces compartidos (Facebook/LinkedIn)." }],
      [{ text: "1:1", code: true }, { text: " para cuadrados del feed de Instagram y rejillas de perfil." }],
      [{ text: "4:5", code: true }, { text: " para publicaciones verticales: la proporción más alta que el feed de Instagram muestra sin recortar." }],
      [{ text: "9:16", code: true }, { text: " para Stories, Reels, Shorts y TikTok." }],
    ]},
    { type: "p", content: ["Las ubicaciones que merece la pena memorizar:"] },
    { type: "table", columns: ["Ubicación", "Proporción", "Píxeles recomendados", "Nota"], rows: [
      ["Publicación de feed de Instagram", "1:1", "1080×1080", "Funciona también como 4:5 (1080×1350)"],
      ["Instagram / Facebook vertical", "4:5", "1080×1350", "La más alta que el feed muestra sin recortar"],
      ["Tarjeta de enlace compartido (FB / LinkedIn)", "1.91:1", "1200×630", "Dimensiones de Open Graph og:image"],
      ["YouTube apaisado", "16:9", "1920×1080", "1280×720 es el mínimo"],
      ["Stories / Reels / Shorts / TikTok", "9:16", "1080×1920", "Vertical, pantalla completa"],
      ["Twitter/X en el feed", "16:9", "1600×900", "Elección habitual para horizontal"],
    ]},
    { type: "p", content: [
      "Regla para predimensionar: crea la ubicación más grande que necesites de verdad y recorta hacia abajo desde ahí. Si importan tanto la publicación de feed (1:1) como la historia (9:16), produce el cuadrado a 1080×1080 y prepara la vertical desde el mismo original; no recortes un 9:16 de un cuadrado ya pequeño. Las plataformas re-comprimen lo que subes; si les das la proporción exacta y un archivo cómodamente grande, comprimen una vez en lugar de dos.",
    ]},

    { type: "h2", content: ["Redimensionar en el navegador con canvas"] },
    { type: "p", content: [
      "Al redimensionar en código —aquí o en un widget de subida—, el navegador te da canvas, y dos ajustes controlan la calidad. El escalado descendente nítido de una foto necesita el suavizado activado, y ",
      { text: "imageSmoothingQuality: 'high'", code: true },
      " pone al navegador en un filtro más caro pero visiblemente mejor. La rotación EXIF también merece atención: los móviles graban las fotos en vertical pero las marcan con una etiqueta de rotación, y las llamadas ingenuas a ",
      { text: "drawImage", code: true },
      " la ignoran — tu foto sale de lado.",
    ]},
    { type: "code", lang: "js", content: `async function resizeToMax(file, maxDim, quality = 0.82) {
  // Decodifica la imagen y respeta la etiqueta de rotación EXIF de la cámara
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, w, h);

  // Para recortar, dibuja solo la región de origen que quieras conservar:
  // ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, w, h);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality) // o "image/jpeg"
  );
  bitmap.close(); // libera la memoria del bitmap decodificado
  return blob;
}` },
    { type: "p", content: [
      "La escala está limitada a 1 a propósito: la pinza ",
      { text: "Math.min(1, ...)", code: true },
      " garantiza que esta función nunca amplía. La salida solo puede ser igual o más pequeña — exactamente la regla para las imágenes web.",
    ]},

    { type: "h2", content: ["¿Redimensionar en una herramienta o dejar que lo haga el CSS?"] },
    { type: "p", content: [
      "CSS redefine la representación, no los bytes. ",
      { text: "max-width: 100%", code: true },
      ", ",
      { text: "object-fit: cover", code: true },
      " (un recorte CSS) y el ",
      { text: "srcset", code: true },
      " responsivo con ",
      { text: "sizes", code: true },
      " adaptan la imagen mostrada a cualquier viewport: es correcto y barato. Pero el navegador descarga igualmente el archivo original. Enviar un JPEG de 6000×4000 para que CSS lo reduzca a 400px desperdicia megabytes en cada vista de página y mantiene la imagen en la red más tiempo del que cualquiera nota.",
    ]},
    { type: "p", content: [
      "La secuencia apta para web: redimensiona el archivo en sí al tamaño más grande que necesite cualquier ubicación —lo habitual en retina es el factor 2×, así que 1920 o 2400 de ancho si puede verse a pantalla completa—, luego deja que CSS lo reduzca en los puntos de quiebre pequeños y señala en ",
      { text: "srcset", code: true },
      " un par de medidas explícitas para dispositivos lentos. Los archivos de imagen son estáticos: hazlos bien una vez en lugar de cobrarles un impuesto de recompresión a cada visitante.",
    ]},

    { type: "h2", content: ["Números redondos, potencias de dos y la regla de no ampliar"] },
    { type: "p", content: [
      "Tres hábitos mantienen predecibles las exportaciones. Primero, exporta a dimensiones redondas: 1200 de ancho, no 1193. Los números impares salen de la aritmética de escalados encadenados e invitan a artefactos de interpolación visibles. Segundo, si reduces con un factor fijo, prefiere pasos limpios: ",
      { text: "0.5×", code: true },
      ", ",
      { text: "0.25×", code: true },
      " — porque algunas tuberías (teselado, mipmaps, atlas de texturas, ciertos servicios de miniaturas) remuestrean mejor en potencias de dos: una fuente de 2048 píxeles bajada a 1024 promedia bloques de 2×2 limpiamente, mientras que 1000 introduce muestreo fraccionario.",
    ]},
    { type: "p", content: [
      "Tercero, la regla que arregla más imágenes borrosas que cualquier filtro: ",
      { text: "nunca amplíes una imagen web más allá de su resolución nativa.", bold: true },
      " Ampliar inventa píxeles. Una imagen de 400px estirada a 1200px sigue teniendo 400px de detalle real; la interpolación adivina el resto, y ningún filtro de enfoque añade información que nunca se capturó. Si la ubicación pide 1200px y tu fuente tiene 400, vuelve a fotografiar o a renderizar; no intentes «mejorarla» en el editor.",
    ]},
    { type: "note", tone: "warning", title: "Ampliar nunca añade detalle", content: [
      "Pasar un archivo de 400 píxeles por un filtro «ampliar a HD» produce un archivo más grande y cero detalle nuevo: a lo sumo interpolación suavizada. Si la fuente es realmente pequeña, déjala a tamaño nativo y deja que el navegador la amplíe; el resultado visual es idéntico y el archivo es más pequeño.",
    ]},

    { type: "h2", content: ["Filtros y marcas de agua: pasos finales, en el orden correcto"] },
    { type: "p", content: [
      "Los filtros y las marcas de agua van al final, después de que redimensionar y recortar hayan fijado el encuadre definitivo. Primero la marca y luego el recorte, y cortas tu propio logo; marca antes de redimensionar y el texto puede encogerse hasta quedar ilegible, o la marca escala respecto a un marco que no es el que se entrega.",
    ]},
    { type: "p", content: [
      "Un orden sensato: (1) aplica el aspecto a la fuente —grises, sepia, brillo/contraste, saturación, desenfoque—; (2) recorta a la proporción objetivo; (3) redimensiona a los píxeles objetivo; (4) añade la marca con tamaño y opacidad relativos a la imagen final; (5) exporta una vez. Las marcas de texto suelen sobrevivir mejor a los tamaños pequeños que las de imagen; un 4–6 % del lado corto con 30–50 % de opacidad en una esquina es el valor común y discreto. Exportar una sola vez, después de todos los ajustes, es lo que mantiene el impuesto de calidad en una única pérdida de generación.",
    ]},

    { type: "h2", content: ["Las herramientas de imagen en Convrs"] },
    { type: "p", content: [
      "Convrs ofrece toda la cadena en el navegador, y los archivos nunca salen de tu dispositivo: ",
      { text: "el Redimensionador de imágenes", bold: true },
      " escala por píxeles o porcentaje con control de calidad, ",
      { text: "el Recortador de imágenes", bold: true },
      " corta a proporciones predefinidas (16:9, 1:1, 4:5, 9:16) o a una caja personalizada, ",
      { text: "los Filtros de imagen", bold: true },
      " aplican grises, sepia, brillo/contraste/saturación y desenfoque, ",
      { text: "el Añadir marca de agua", bold: true },
      " superpone una marca de texto o imagen con posición, tamaño y opacidad, y ",
      { text: "el Compresor de imágenes", bold: true },
      " reduce el tamaño de archivo para las subidas. Recorta con la proporción bloqueada, redimensiona a los píxeles de la plataforma, afina el aspecto, marca una vez y comprime para el camino: el original y cada derivado quedan en tu máquina, y solo la exportación final se mueve.",
    ]},
  ],
};

const guide: GuideDefinition = {
  slug: "image-resize-crop-guide",
  content: { en, tr, de, es },
};

export default guide;