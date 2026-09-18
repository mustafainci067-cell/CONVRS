import type { GuideDefinition, GuideDocument } from "./types";

const en: GuideDocument = {
  meta: {
    title: "Password Security: What Actually Makes a Password Strong",
    eyebrow: "Security",
    description:
      "Password strength is a number, not a checklist. How entropy works, why 'Password1!' rules backfire, why passphrases beat symbol soup, how password managers store your secrets, and why a good generator needs real randomness.",
    excerpt:
      "Entropy, not capital letters: why length beats complexity, what attackers actually do, and how password managers keep your secrets.",
    readingTime: "10 min read",
    updatedDate: "September 16, 2026",
  },
  blocks: [
    { type: "p", content: [
      "Bank websites still force you to prove your password contains an uppercase letter, a number, and a symbol — then reject the long, passphrase-like strings that would actually protect you. The research says the opposite of what those rules assume. Strength is not a checklist of character types; it is a number: how many guesses an attacker has to run before landing on your password. That number, measured in bits, is the only thing that matters. Everything else — the exclamation point you tacked on, the capital letter you moved — is mostly theatre.",
    ]},

    { type: "h2", content: ["Entropy: the number behind every password"] },
    { type: "p", content: [
      "Every password you could possibly create, under the exact rules you are using, can be written out as a list. The size of that list is your search space. If the password was picked uniformly from the list, an attacker working through it one by one needs, on average, half of it. The space's size, expressed as a power of two, is the password's entropy: how many bits of uncertainty the attacker has to resolve.",
    ]},
    { type: "p", content: [
      "The mathematics is plain multiplication. With a 26-letter lowercase alphabet, an 8-character password gives ",
      { text: "26^8 = 2.09 × 10^11", code: true },
      " possibilities — about 38 bits. Pull in uppercase letters, digits and symbols — a full printable set of 95 characters — and the same 8 characters give ",
      { text: "95^8 = 6.6 × 10^15", code: true },
      " possibilities, about 52.5 bits. Every extra character multiplies the list by the size of your alphabet.",
    ]},
    { type: "p", content: [
      "Two consequences follow. Length compounds: each added character adds ",
      { text: "log2(alphabet)", code: true },
      " bits. And the smaller the alphabet, the less each character earns: growing from 26 to 95 characters wins you about 1.9 bits per character, while adding one more random character wins 4.7 to 6.6. That imbalance is the entire argument for long passwords.",
    ]},
    { type: "code", lang: "js", content: `// Upper bound for a password a real random generator produced.
// Real human choices score lower — patterns occupy a smaller space.
function bits(length, charsetSize) {
  return length * Math.log2(charsetSize);
}
console.log(bits(8, 26));   // ≈ 37.6 → ~2.1 × 10^11 possible
console.log(bits(8, 95));   // ≈ 52.5 → ~6.6 × 10^15 possible
console.log(bits(12, 95));  // ≈ 78.8
console.log(bits(16, 95));  // ≈ 105.1` },
    { type: "table", columns: ["Length / structure", "Character set", "Possible combinations", "Approx. bits"], rows: [
      ["8 characters", "26 lowercase", "2.1 × 10^11", "≈ 38"],
      ["8 characters", "95 printable", "6.6 × 10^15", "≈ 53"],
      ["12 characters", "95 printable", "5.4 × 10^23", "≈ 79"],
      ["16 characters", "95 printable", "4.4 × 10^31", "≈ 105"],
      ["4 random words", "7,776-word list", "3.7 × 10^15", "≈ 52"],
      ["5 random words", "7,776-word list", "2.8 × 10^19", "≈ 65"],
    ]},
    { type: "p", content: [
      "The formula assumes genuine randomness, and that assumption is doing all the work. It is the upper bound for real-world choices, because humans are not uniform: ",
      { text: "Sunshine1", code: true },
      " is 8 characters, but it is nowhere near 6.6 × 10^15 possibilities. The attacker's real search space is the space of common patterns, which is thousands of times smaller.",
    ]},

    { type: "h2", content: ["Why the classic rules make passwords weaker"] },
    { type: "p", content: [
      "The famous checklist — at least 8 characters, a capital, a number, a symbol — was designed decades ago, before graphics cards turned password cracking into a hobbyist's pastime. It fails twice: it pushes people into predictable templates, and it punishes the one thing that actually helps, which is length.",
    ]},
    { type: "p", content: [
      "Tell a person they need a capital, a digit and a symbol, and they will, with overwhelming probability, take an ordinary word and run it through the same three moves: capitalise the first letter, put a digit on the end, attach one symbol. The result is ",
      { text: "Password1!", code: true },
      " or its equivalent in the local language. The whole class follows one template, so the attacker never has to search the 95-character space — they search the much smaller template space. The famous xkcd example ",
      { text: "Tr0ub4dor&3", code: true },
      " lands around 28 bits for precisely this reason.",
    ]},
    { type: "p", content: [
      "Forced rotation makes it worse. When policy demands a new password every 90 days, people mutate the previous one: ",
      { text: "Password1!", code: true },
      " becomes ",
      { text: "Password2!", code: true },
      " becomes ",
      { text: "Password3!", code: true },
      ". If the old password ever leaks, the next one is trivially predictable. Current guidance — NIST SP 800‑63B — drops forced expiration, drops the genre fiction of complexity, and asks for length, blocklists of banned passwords, and a second factor.",
    ]},

    { type: "h2", content: ["Length beats complexity: the passphrase math"] },
    { type: "p", content: [
      "Four random words drawn from a 7,776-entry list — the EFF's recommended diceware list — give ",
      { text: "7776^4 = 3.7 × 10^15", code: true },
      " combinations, about 51.7 bits. That is comparable to a random 8-character full-set password, but written in words a human can actually remember. Even a more conservative list of 2,048 words delivers 11 bits per word — 44 bits for four words.",
    ]},
    { type: "p", content: [
      "Set ",
      { text: "Pr3tty!", code: true },
      " next to ",
      { text: "correct-horse-battery-staple", code: true },
      ". Both look defensible. The first is 7 characters from a 95-character set — around 46 bits on paper — but it is an ordinary adjective and a symbol drawn from the tiny space of template-compliant passwords, so the real value is a fraction of that. The passphrase is 28 characters made from four independent random picks among thousands of words; because there is no pattern, the attacker gets no shortcut.",
    ]},
    { type: "p", content: [
      "The catch — and it is a real one — is the word random. A passphrase you invent, like ",
      { text: "mycatispurple", code: true },
      ", is not four random words; it is one natural-language sentence, and a clever attacker models those too. Strength comes from the dice, not from your wit. Use diceware or a generator that picks uniformly, and stay away from any phrase that is already blinking on a blog post or in a song lyric.",
    ]},
    { type: "list", items: [
      [{ text: "Memorable:", bold: true }, { text: " four familiar words are easier to hold than fifteen scattered characters." }],
      [{ text: "Long:", bold: true }, { text: " raw length blocks offline brute force before any stitching matters." }],
      [{ text: "Pattern-free:", bold: true }, { text: " uniform random picks leave the attacker no template to exploit." }],
      [{ text: "Scales up:", bold: true }, { text: " five random words land around 64.6 bits and stay memorable." }],
    ]},

    { type: "h2", content: ["The real danger is password reuse"] },
    { type: "p", content: [
      "None of that entropy math protects you if the same password guards ten accounts. Breaches are not rare events; they are routine, and they happen to careful companies with competent security teams. When a hashed database leaks, the hashes are cracked offline — dictionary first, then mutations — and whatever password you used falls out in plaintext.",
    ]},
    { type: "p", content: [
      "The attackers then run that list against every other site you use. This is credential stuffing: automated scripts try each leaked username and password pair against thousands of targets, and it works because reuse is the norm. The most valuable thing you can do is not a cleverer password — it is one unique per site.",
    ]},
    { type: "p", content: [
      "Uniqueness at that scale is exactly what password managers automate. Which is also the flip side: the master password of your manager is the one irreplaceable secret you have, and reusing it somewhere else negates the entire model.",
    ]},

    { type: "h2", content: ["The attack vectors you are actually up against"] },
    { type: "list", items: [
      [{ text: "Dictionary attack: ", bold: true }, { text: " works through a ranked list of likely passwords — breached passwords, words, names, keyboard runs. It deals with " }, { text: "sunshine1", code: true }, { text: " in milliseconds." }],
      [{ text: "Brute force: ", bold: true }, { text: " tries every combination of a character set up to a length limit. Simple and slow, which is exactly why the table above matters: at a billion guesses a second, an 8-character full-set password is done in under a day." }],
      [{ text: "Credential stuffing: ", bold: true }, { text: " automates leaked username/password pairs across thousands of sites. Its success is a direct measure of password reuse." }],
      [{ text: "Phishing: ", bold: true }, { text: " impersonates a real login page and harvests the password — or the two-factor code — from the human. It bypasses every strength rule, which is why a second factor and manager autofill matter." }],
    ]},
    { type: "p", content: [
      "Notice what is absent: nobody is hacking you personally. These attacks are automated and opportunistic; they go where the math is weakest and the reuse is densest.",
    ]},

    { type: "h2", content: ["How password managers generate and store credentials"] },
    { type: "p", content: [
      "A password manager keeps every credential in a vault encrypted with a key derived from your master password — stretched through a slow function like PBKDF2 or Argon2 so that guessing the master password offline is hard by design. The vault is the only home of your secrets; the master password is the key that unlocks it.",
    ]},
    { type: "p", content: [
      "Generation is where a good manager pays its rent. It creates a fresh, cryptographically random password per site — typically 15 to 20 characters across the full character set — because it never has to memorise them. The ecosystem is broader than you might think: browsers ship built-in managers, Bitwarden and 1Password sync encrypted vaults through the cloud, KeePass-style apps keep an encrypted local file. The principle is the same everywhere: one strong master key, random unique passwords for everything else.",
    ]},
    { type: "p", content: [
      "On the far side of the login form, a responsible site does not store your password. It stores a salted hash through a slow, memory-hard function — bcrypt or argon2id. Salted means a random per-user value is mixed in, so the same password on a million sites yields a million different hashes; slow means the attacker's guesses per second collapse from billions to a few thousand. That is why a decent password survives a leaked database — and why a short one still does not, the same conclusion as the table above.",
    ]},
    { type: "note", tone: "warning", title: "Your master password is the whole vault", content: [
      "The one password you must be able to type after your laptop is gone is the vault master password. Make it a long, genuinely random passphrase — and never reuse it anywhere else, not for a guest visit, not for a free trial. If that key ends up in a breach list, every generated password in the vault is worth nothing.",
    ]},
    { type: "note", tone: "success", title: "Add a second factor on top", content: [
      "Strong, unique passwords defeat offline cracking. What they cannot defeat is a well-built phishing page. Turn on two-factor authentication — passkeys or a hardware key when offered, otherwise app-based codes — at least for email and financial accounts, so a harvested password is not enough on its own.",
    ]},

    { type: "h2", content: ["What a strong generator does differently"] },
    { type: "p", content: [
      "The difference between a toy generator and a secure one is where the randomness comes from. ",
      { text: "Math.random()", code: true },
      " is a pseudo-random generator seeded from time; it is fast, never intended for secrets, and once enough of its output is observed its internal state can be recovered, which makes the random password predictable. Browsers instead expose ",
      { text: "crypto.getRandomValues()", code: true },
      ", fed by the operating system's cryptographic randomness — the one source suited to this job.",
    ]},
    { type: "p", content: [
      "Source is only half the story. Sampling must be uniform: taking a random number modulo the character-set length is a classic way to bias the output, so serious generators use rejection sampling. And the character set should be as wide as you can tolerate, because every class you include is bits bought back for free — while so-called ambiguous characters like ",
      { text: "1/l", code: true },
      " and ",
      { text: "0/O", code: true },
      " are usually dropped for readability, not for strength.",
    ]},
    { type: "p", content: [
      "A strong generator also does nothing else: no telemetry, no copy stored in a server log, no remember-this-for-me. A password should exist in exactly one place — your clipboard for a few seconds, then your vault.",
    ]},

    { type: "h2", content: ["Generate strong passwords in Convrs"] },
    { type: "p", content: [
      "Convrs's ",
      { text: "password generator", bold: true },
      " runs entirely in your browser: pick the length, toggle the character classes you want, and generate a whole batch in a single click. The randomness comes from the browser's cryptographic API, the entire calculation stays on your device, and nothing is transmitted, logged or stored — the only copy of your password is the one you copy out yourself.",
    ]},
  ],
};

const tr: GuideDocument = {
  meta: {
    title: "Parola Güvenliği: Güçlü Parolayı Gerçekte Ne Yapar?",
    eyebrow: "Güvenlik",
    description:
      "Parola gücü bir kontrol listesi değil, bir sayıdır. Entropi nasıl çalışır, 'Password1!' kuralları neden geri teper, parola öbeği neden sembol çorbasından iyidir, parola yöneticileri sırlarınızı nasıl saklar ve iyi bir üretici neden gerçek rastgeleliğe ihtiyaç duyar.",
    excerpt:
      "Büyük harf değil entropi: uzunluk neden karmaşıklığı yener, saldırganlar gerçekte ne yapar ve parola yöneticileri sırlarınızı nasıl korur.",
    readingTime: "10 dk okuma",
    updatedDate: "16 Eylül 2026",
  },
  blocks: [
    { type: "p", content: [
      "Bankalar web sitelerinde hâlâ parolanızın bir büyük harf, bir rakam ve bir sembol içerdiğini kanıtlamanızı şart koşuyor — sonra da sizi gerçekten koruyacak olan uzun parola öbeklerini reddediyor. Araştırmalar, bu kuralların varsaydığının tam tersini söylüyor. Güçlülük, karakter türlerinden oluşan bir kontrol listesi değildir; bir sayıdır: saldırganın parolanıza ulaşmak için geçmesi gereken deneme sayısı. Bit cinsinden ölçülen bu sayı, önemli olan tek şeydir. Geri kalan her şey — eklediğiniz ünlem işareti, büyüttüğünüz harf — çoğunlukla tiyatrodur.",
    ]},

    { type: "h2", content: ["Entropi: her parolanın arkasındaki sayı"] },
    { type: "p", content: [
      "Kullandığınız kurallar altında yaratabileceğiniz her parola tek tek bir listeye yazılabilir. Listenin boyutu sizin arama uzayınızdır. Parola listeden tekdüze rastgele seçildiyse, parolaları tek tek deneyen saldırgan ortalamada listenin yarısını tüketmek zorundadır. Bu uzayın boyutunun ikinin kuvveti olarak ifadesi, parolanın entropisidir: saldırganın çözmesi gereken belirsizlik miktarı.",
    ]},
    { type: "p", content: [
      "Matematik düz bir çarpmadır. 26 harfli küçük harfli bir alfabeyle 8 karakterlik bir parola ",
      { text: "26^8 = 2,09 × 10^11", code: true },
      " olasılık verir — yaklaşık 38 bit. Büyük harfleri, rakamları ve sembolleri katarsanız — 95 karakterlik tam yazdırılabilir küme — aynı 8 karakter ",
      { text: "95^8 = 6,6 × 10^15", code: true },
      " olasılığa çıkar, yaklaşık 52,5 bit. Eklenen her karakter listeyi alfabenizin boyutuyla çarpar.",
    ]},
    { type: "p", content: [
      "İki sonuç doğar. Uzunluk birikir: her ek karakter bit değerine alfabenin ",
      { text: "log2'sini", code: true },
      " ekler. Alfabe ne kadar darsa karakter başına kazanç o kadar azdır: 26'dan 95 karaktere çıkmak karakter başına yaklaşık 1,9 bit kazandırır; oysa bir karakter daha eklemek 4,7 ila 6,6 bit getirir. Uzun parola lehine dönen tartışmanın özü budur.",
    ]},
    { type: "code", lang: "js", content: `// Upper bound for a password a real random generator produced.
// Real human choices score lower — patterns occupy a smaller space.
function bits(length, charsetSize) {
  return length * Math.log2(charsetSize);
}
console.log(bits(8, 26));   // ≈ 37.6 → ~2.1 × 10^11 possible
console.log(bits(8, 95));   // ≈ 52.5 → ~6.6 × 10^15 possible
console.log(bits(12, 95));  // ≈ 78.8
console.log(bits(16, 95));  // ≈ 105.1` },
    { type: "table", columns: ["Uzunluk / yapı", "Karakter kümesi", "Olası birleşim", "Yaklaşık bit"], rows: [
      ["8 karakter", "26 küçük harf", "2,1 × 10^11", "≈ 38"],
      ["8 karakter", "95 yazdırılabilir", "6,6 × 10^15", "≈ 53"],
      ["12 karakter", "95 yazdırılabilir", "5,4 × 10^23", "≈ 79"],
      ["16 karakter", "95 yazdırılabilir", "4,4 × 10^31", "≈ 105"],
      ["4 rastgele kelime", "7.776 kelimelik liste", "3,7 × 10^15", "≈ 52"],
      ["5 rastgele kelime", "7.776 kelimelik liste", "2,8 × 10^19", "≈ 65"],
    ]},
    { type: "p", content: [
      "Formül gerçek rastgeleliği varsayar ve ağırlığın tamamı bu varsayımdadır. Gerçek hayattaki seçimler için üst sınırdır, çünkü insanlar tekdüze değildir: ",
      { text: "Sunshine1", code: true },
      " sekiz karakterdir ama 6,6 × 10^15 olasılıktan çok uzaktır. Saldırganın gerçek arama uzayı, yaygın kalıpların uzayıdır ve bu uzay binlerce kat küçüktür.",
    ]},

    { type: "h2", content: ["Klasik kurallar parolayı neden zayıflatır"] },
    { type: "p", content: [
      "O meşhur kontrol listesi — en az 8 karakter, bir büyük harf, bir rakam, bir sembol — grafik kartlarının parola kırmayı hobiye çevirmesinden çok önce tasarlandı. İki şekilde başarısız olur: insanları öngörülebilir kalıplara iter ve gerçekten işe yarayan tek şeyi, uzunluğu cezalandırır.",
    ]},
    { type: "p", content: [
      "Birine büyük harf, rakam ve sembol koyması gerektiğini söyleyin; büyük olasılıkla sıradan bir kelime alıp üç hareketi uygular: ilk harfi büyütür, sona bir rakam ekler, bir de sembol yapıştırır. Sonuç ",
      { text: "Password1!", code: true },
      " ya da yerel dildeki karşılığıdır. Tüm sınıf tek bir şablonu izlediği için saldırganın 95 karakterlik uzayı aramasına gerek yoktur; çok daha küçük olan şablon uzayını arar. Ünlü xkcd örneği ",
      { text: "Tr0ub4dor&3", code: true },
      " tam da bu yüzden 28 bit civarındadır.",
    ]},
    { type: "p", content: [
      "Zorunlu rotasyon bunu daha da kötüleştirir. Politika her 90 günde bir yeni parola istediğinde insanlar bir öncekini mutasyona uğratır: ",
      { text: "Password1!", code: true },
      " → ",
      { text: "Password2!", code: true },
      " → ",
      { text: "Password3!", code: true },
      ". Eski parola bir kez sızdıysa bir sonraki parola önemsiz bir tahmine döner. Güncel tavsiye — NIST SP 800‑63B — zorunlu süre bitimini de, karmaşıklık kurgusunu da bırakır; yerine uzunluk, yasaklı parola listeleri ve ikinci bir doğrulama faktörü ister.",
    ]},

    { type: "h2", content: ["Uzunluk karmaşıklığı yener: parola öbeğinin matematiği"] },
    { type: "p", content: [
      "7.776 kelimelik bir listeden — EFF'in önerdiği diceware listesi — çekilen dört rastgele kelime ",
      { text: "7776^4 = 3,7 × 10^15", code: true },
      " birleşim, yani yaklaşık 51,7 bit eder. Bu, 95 karakterlik kümeden rastgele seçilmiş 8 karakterlik parolayla kıyaslanabilir — ama insanın gerçekten hatırlayabildiği kelimelerle yazılır. Daha tutucu bir 2.048 kelimelik liste bile kelime başına 11 bit verir: dört kelimede 44 bit.",
    ]},
    { type: "p", content: [
      "",
      { text: "Pr3tty!", code: true },
      " ile ",
      { text: "correct-horse-battery-staple", code: true },
      " i yan yana koyun. İkisi de savunulabilir görünür. İlki, 95 karakterlik kümeden 7 karakterdir — kâğıt üzerinde yaklaşık 46 bit — ama sıradan bir sıfat artı bir semboldür; şablona uyan parolaların küçücük uzayından gelir, bu yüzden gerçek değeri bunun bir kesridir. Diğeri ise binlerce kelime arasından dört bağımsız rastgele seçimin ürettiği 28 karakterdir; örüntü olmadığı için saldırganın kestirme yolu yoktur.",
    ]},
    { type: "p", content: [
      "Buradaki incelik — gerçek bir incelik — rastgele kelimesindedir. ",
      { text: "mycatispurple", code: true },
      " gibi uydurduğunuz bir öbek dört rastgele kelime değildir; tek bir doğal-dil cümlesidir ve akıllı bir saldırgan onu da modeller. Güç zekânızdan değil, zardan gelir. Diceware kullanın ya da tekdüze seçen bir üretici edinin; bir blog yazısında ya da şarkı sözünde parlayan hazır öbeklerden uzak durun.",
    ]},
    { type: "list", items: [
      [{ text: "Hatırlanabilir:", bold: true }, { text: " dört tanıdık kelime, on beş dağınık karakterden kolaydır." }],
      [{ text: "Uzun:", bold: true }, { text: " ham uzunluk, çevrimdışı kaba kuvveti daha başlamadan bloke eder." }],
      [{ text: "Örüntüsüz:", bold: true }, { text: " tekdüze rastgele seçimler saldırgana kullanacak şablon bırakmaz." }],
      [{ text: "Ölçeklenir:", bold: true }, { text: " beş rastgele kelime yaklaşık 64,6 bit eder ve hâlâ hatırlanabilirdir." }],
    ]},

    { type: "h2", content: ["Asıl tehlike parola tekrarıdır"] },
    { type: "p", content: [
      "Aynı parola on hesabı koruyorsa entropi matematiğinin hiçbiri sizi korumaz. Veri ihlalleri nadir olay değildir; rutindir ve iyi güvenlik ekipleri olan dikkatli şirketlerde de olur. Karma listesi sızdığında hashlar çevrimdışı kırılır — önce sözlük, sonra mutasyonlar — ve kullandığınız parola düz metin olarak ortaya dökülür.",
    ]},
    { type: "p", content: [
      "Saldırganlar sonra bu listeyi kullandığınız diğer tüm sitelere karşı çalıştırır. Buna kimlik bilgisi doldurma denir: otomatik komut dosyaları sızan her kullanıcı adı/parola çiftini binlerce hedefe karşı dener ve bu yöntem işler, çünkü tekrar normdur. Yapabileceğiniz en değerli şey daha akıllı bir parola değil, site başına benzersiz paroladır.",
    ]},
    { type: "p", content: [
      "Parola yöneticileri tam da bu ölçekteki benzersizliği otomatikleştirir. Diğer yüzü de şudur: yöneticinin ana parolası sahip olduğunuz tek yeri doldurulamaz sırdır; onu başka bir yerde tekrar kullanmak modelin tamamını çökertir.",
    ]},

    { type: "h2", content: ["Gerçekte karşınızda olan saldırı vektörleri"] },
    { type: "list", items: [
      [{ text: "Sözlük saldırısı: ", bold: true }, { text: " önceki ihlallerden sızan parolalar, kelimeler, adlar, klavye dizileri gibi olasılıklı bir listeyi dener. " }, { text: "sunshine1", code: true }, { text: " gibi parolaları milisaniyeler içinde çözer." }],
      [{ text: "Kaba kuvvet: ", bold: true }, { text: " belirli bir karakter kümesinin tüm birleşimlerini bir uzunluk sınırına kadar dener. Basit ve yavaştır; yukarıdaki tablo tam bu yüzden önemlidir: saniyede bir milyar denemede, 8 karakterlik tam küme parolası bir günden kısa sürede biter." }],
      [{ text: "Kimlik bilgisi doldurma: ", bold: true }, { text: " sızan kullanıcı adı/parola çiftlerini binlerce siteye karşı otomatikleştirir. Başarısı, parola tekrarının doğrudan bir ölçüsüdür." }],
      [{ text: "Oltalama: ", bold: true }, { text: " gerçek bir giriş sayfasını taklit eder ve parolayı — ya da iki aşamalı doğrulama kodunu — insandan toplar. Güçlülüğün tüm kurallarını aşar; bu yüzden ikinci bir faktör ve yöneticinin otomatik doldurması önemlidir." }],
    ]},
    { type: "p", content: [
      "Dikkat edin: burada sizi kişisel olarak hedefleyen bir hacker yok. Saldırılar otomatik ve fırsatçıdır; matematiğin en zayıf, tekrarın en yoğun olduğu yere giderler.",
    ]},

    { type: "h2", content: ["Parola yöneticileri parolaları nasıl üretir ve saklar"] },
    { type: "p", content: [
      "Bir parola yöneticisi her kimlik bilgisini, ana parolanızdan türetilen bir anahtarla şifrelenmiş bir kasada saklar — PBKDF2 ya da Argon2 gibi yavaş bir fonksiyonla gerdirilmiş bir anahtar; ana parolayı çevrimdışı tahmin etmek tasarım gereği zordur. Kasa, sırlarınızın tek evidir; ana parola onu açan anahtardır.",
    ]},
    { type: "p", content: [
      "İyi bir yöneticinin asıl işi üretimdir. Her site için taze, kriptografik olarak rastgele bir parola yaratır — tipik olarak tam karakter kümesiyle 15 ila 20 karakter — çünkü bunları ezberlemek zorunda değildir. Ekosistem düşündüğünüzden geniştir: tarayıcılar yerleşik yöneticiler sunar, Bitwarden ve 1Password şifreli kasa senkronizasyonunu bulutla yapar, KeePass tarzı uygulamalar yerelde şifreli bir dosya tutar. Prensip her yerde aynıdır: tek güçlü ana anahtar, her şey için rastgele benzersiz parolalar.",
    ]},
    { type: "p", content: [
      "Giriş formunun ötesinde sorumlu bir site parolanızı saklamaz; bcrypt ya da argon2id gibi yavaş, bellek-yoğun bir fonksiyonla üretilmiş bir tuzlanmış hash saklar. Tuzlu, kullanıcı başına rastgele bir değerin karıştırıldığı — yani aynı parolanın milyon sitede milyon farklı hash verdiği — anlamına gelir. Yavaş, saldırganın saniyedeki deneme sayısını milyarlardan birkaç bine indirdiği anlamına gelir. Makul bir parolanın sızan veritabanından sağ çıkmasının ve kısa bir parolanın çıkamamasının nedeni tam olarak budur — yukarıdaki tablonun da vardığı sonuç.",
    ]},
    { type: "note", tone: "warning", title: "Ana parolanız, tüm kasandır", content: [
      "Dizüstü bilgisayarınız gittikten sonra yazabildiğiniz tek parola, kasanın ana parolasıdır. Onu uzun, gerçekten rastgele bir parola öbeği yapın — ve başka hiçbir yerde tekrar kullanmayın: misafir girişinde değil, bir deneme sürümünde değil. Bu anahtar bir ihlal listesinde görünürse, kasasındaki her üretilmiş parola değerini yitirir.",
    ]},
    { type: "note", tone: "success", title: "Üzerine ikinci bir faktör ekleyin", content: [
      "Güçlü ve benzersiz parolalar çevrimdışı kırmayı yener. Yenemedikleri şey iyi kurulmuş bir oltalama sayfasıdır. En azından e-posta ve finansal hesaplar için iki aşamalı doğrulamayı açın — sunuluyorsa passkey ya da donanım anahtarı, değilse uygulama tabanlı kodlar — böylece ele geçirilen bir parola tek başına yetmez.",
    ]},

    { type: "h2", content: ["İyi bir üretici farklı ne yapar"] },
    { type: "p", content: [
      "Oyuncak bir üreticiyle güvenli bir üretici arasındaki fark, rastgeleliğin nereden geldiğidir. ",
      { text: "Math.random()", code: true },
      " zamanla tohumlanan sahte rastgele bir üreteçtir; hızlıdır, sırlar için tasarlanmamıştır ve çıktısının yeterince gözlenmesi durumunda iç durumu yeniden kurulabilir — rastgele parola öngörülebilir hâle gelir. Tarayıcılar ise işletim sisteminin kriptografik rastgeleliğiyle beslenen ",
      { text: "crypto.getRandomValues()", code: true },
      " sunar: bu iş için uygun olan tek kaynak.",
    ]},
    { type: "p", content: [
      "Kaynak hikâyenin yarısıdır. Örnekleme tekdüze olmalıdır: bir rastgele sayıyı karakter kümesinin uzunluğuna göre modulo almak, çıktıyı saptırmanın klasik yoludur; ciddi üreticiler reddetme (rejection) örneklemesi kullanır. Karakter kümesi de dayanabildiğiniz kadar geniş olmalıdır, çünkü eklediğiniz her sınıf bedava kazandığınız bitlerdir; ",
      { text: "1/l", code: true },
      " ve ",
      { text: "0/O", code: true },
      " gibi belirsiz karakterler ise güç için değil, okunabilirlik için çıkarılır.",
    ]},
    { type: "p", content: [
      "Güçlü bir üretici başka hiçbir şey de yapmaz: telemetri yok, sunucu günlüğüne yazılan kopya yok, benim için hatırla yok. Bir parola tam olarak tek bir yerde var olmalıdır — birkaç saniyeliğine panonuzda, sonra kasada.",
    ]},

    { type: "h2", content: ["Convrs'te güçlü parolalar üretin"] },
    { type: "p", content: [
      "Convrs'ün ",
      { text: "parola üreticisi", bold: true },
      " tamamen tarayıcınızda çalışır: uzunluğu seçin, istediğiniz karakter sınıflarını açın ve tek tıkla birden fazla parola üretin. Rastgelelik tarayıcının kriptografik API'sinden gelir, hesabın tamamı cihazınızda kalır ve hiçbir şey aktarılmaz, günlüğe yazılmaz ya da saklanmaz — parolanızın tek kopyası, sizin kopyaladığınız kopyadır.",
    ]},
  ],
};

const de: GuideDocument = {
  meta: {
    title: "Passwortsicherheit: Was ein Passwort wirklich stark macht",
    eyebrow: "Sicherheit",
    description:
      "Passwortstärke ist eine Zahl, keine Checkliste. Wie Entropie funktioniert, warum 'Password1!'-Regeln nach hinten losgehen, warum Passphrasen Symbol-Suppe schlagen, wie Passwort-Manager arbeiten und warum ein guter Generator echte Zufälligkeit braucht.",
    excerpt:
      "Entropie statt Großbuchstaben: warum Länge Komplexität schlägt, was Angreifer wirklich tun und wie Passwort-Manager Ihre Geheimnisse speichern.",
    readingTime: "10 Min. Lesezeit",
    updatedDate: "16. September 2026",
  },
  blocks: [
    { type: "p", content: [
      "Bank-Websites zwingen Sie immer noch zu beweisen, dass Ihr Passwort einen Großbuchstaben, eine Ziffer und ein Sonderzeichen enthält — und lehnen dann die lange, passphrase-artige Zeichenkette ab, die Sie tatsächlich geschützt hätte. Die Forschung sagt das Gegenteil dessen, was diese Regeln annehmen. Stärke ist keine Checkliste von Zeichenarten; sie ist eine Zahl: wie viele Versuche ein Angreifer braucht, bis er auf Ihr Passwort stößt. Diese Zahl, gemessen in Bits, ist das Einzige, was zählt. Alles andere — das angehängte Ausrufezeichen, der großgeschriebene Buchstabe — ist größtenteils Theater.",
    ]},

    { type: "h2", content: ["Entropie: die Zahl hinter jedem Passwort"] },
    { type: "p", content: [
      "Jedes Passwort, das Sie unter genau Ihren Regeln erzeugen können, lässt sich als Liste ausschreiben. Die Größe dieser Liste ist Ihr Suchraum. Wurde das Passwort gleichverteilt aus der Liste gewählt, muss ein Angreifer, der sie durcharbeitet, im Durchschnitt die Hälfte ausprobieren. Die Größe des Raums, als Zweierpotenz ausgedrückt, ist die Entropie des Passworts: die Menge an Unsicherheit, die der Angreifer auflösen muss.",
    ]},
    { type: "p", content: [
      "Die Mathematik ist schlichte Multiplikation. Mit einem 26-Buchstaben-Alphabet aus Kleinbuchstaben ergeben 8 Zeichen ",
      { text: "26^8 = 2,1 × 10^11", code: true },
      " Möglichkeiten — etwa 38 Bits. Kommen Großbuchstaben, Ziffern und Sonderzeichen dazu — volle 95 druckbare Zeichen —, dann liefern dieselben 8 Zeichen ",
      { text: "95^8 = 6,6 × 10^15", code: true },
      " Möglichkeiten, rund 52,5 Bits. Jedes zusätzliche Zeichen multipliziert die Liste mit der Größe Ihres Alphabets.",
    ]},
    { type: "p", content: [
      "Daraus folgen zwei Dinge. Länge wirkt zusammen: jedes Zeichen mehr addiert ",
      { text: "log2(Alphabet)", code: true },
      " Bits. Und je kleiner das Alphabet, desto weniger verdient jedes Zeichen: von 26 auf 95 Zeichen zu wachsen gewinnt etwa 1,9 Bits pro Zeichen, während ein einziges Zeichen mehr 4,7 bis 6,6 Bits liefert. Genau diese Unwucht ist das gesamte Argument für lange Passwörter.",
    ]},
    { type: "code", lang: "js", content: `// Upper bound for a password a real random generator produced.
// Real human choices score lower — patterns occupy a smaller space.
function bits(length, charsetSize) {
  return length * Math.log2(charsetSize);
}
console.log(bits(8, 26));   // ≈ 37.6 → ~2.1 × 10^11 possible
console.log(bits(8, 95));   // ≈ 52.5 → ~6.6 × 10^15 possible
console.log(bits(12, 95));  // ≈ 78.8
console.log(bits(16, 95));  // ≈ 105.1` },
    { type: "table", columns: ["Länge / Aufbau", "Zeichensatz", "Mögliche Kombinationen", "Ungefähre Bits"], rows: [
      ["8 Zeichen", "26 Kleinbuchstaben", "2,1 × 10^11", "≈ 38"],
      ["8 Zeichen", "95 druckbare", "6,6 × 10^15", "≈ 53"],
      ["12 Zeichen", "95 druckbare", "5,4 × 10^23", "≈ 79"],
      ["16 Zeichen", "95 druckbare", "4,4 × 10^31", "≈ 105"],
      ["4 Zufallswörter", "Liste mit 7.776 Wörtern", "3,7 × 10^15", "≈ 52"],
      ["5 Zufallswörter", "Liste mit 7.776 Wörtern", "2,8 × 10^19", "≈ 65"],
    ]},
    { type: "p", content: [
      "Die Formel setzt echte Zufälligkeit voraus — und diese Annahme trägt die ganze Last. Für reale Wahlen ist sie eine Obergrenze, denn Menschen sind nicht gleichverteilt: ",
      { text: "Sunshine1", code: true },
      " sind acht Zeichen, aber von 6,6 × 10^15 Möglichkeiten weit entfernt. Der tatsächliche Suchraum des Angreifers ist der Raum üblicher Muster, und der ist tausendfach kleiner.",
    ]},

    { type: "h2", content: ["Warum die klassischen Regeln Passwörter schwächen"] },
    { type: "p", content: [
      "Die berühmte Checkliste — mindestens 8 Zeichen, ein Großbuchstabe, eine Ziffer, ein Sonderzeichen — wurde entworfen, lange bevor Grafikkarten das Passwortknacken zum Hobby gemacht haben. Sie scheitert doppelt: Sie treibt Menschen in vorhersagbare Schablonen, und sie bestraft das Einzige, was wirklich hilft — die Länge.",
    ]},
    { type: "p", content: [
      "Sagt man einem Menschen, er brauche Großbuchstabe, Ziffer und Sonderzeichen, nimmt er mit überwältigender Wahrscheinlichkeit ein normales Wort und führt dieselben drei Bewegungen aus: erster Buchstabe groß, eine Ziffer ans Ende, ein Symbol dazu. Das Ergebnis ist ",
      { text: "Password1!", code: true },
      " oder die lokale Entsprechung. Da die ganze Klasse einer Schablone folgt, muss der Angreifer den 95-Zeichen-Raum gar nicht durchsuchen — er durchsucht den viel kleineren Schablonenraum. Das berühmte xkcd-Beispiel ",
      { text: "Tr0ub4dor&3", code: true },
      " landet aus genau diesem Grund bei etwa 28 Bits.",
    ]},
    { type: "p", content: [
      "Erzwungener Umtausch macht es schlimmer. Verlangt die Richtlinie alle 90 Tage ein neues Passwort, mutieren die Menschen das alte: ",
      { text: "Password1!", code: true },
      " wird ",
      { text: "Password2!", code: true },
      ", dann ",
      { text: "Password3!", code: true },
      ". Ist das alte einmal geleakt, ist das nächste trivial vorhersagbar. Die aktuelle Empfehlung — NIST SP 800‑63B — verwirft den erzwungenen Ablauf und den Komplexitäts-Tanz; sie verlangt Länge, Blocklisten gesperrter Passwörter und einen zweiten Faktor.",
    ]},

    { type: "h2", content: ["Länge schlägt Komplexität: die Mathematik der Passphrasen"] },
    { type: "p", content: [
      "Vier zufällig gezogene Wörter aus einer 7.776 Wörter umfassenden Liste — die von der EFF empfohlene Diceware-Liste — ergeben ",
      { text: "7776^4 = 3,7 × 10^15", code: true },
      " Kombinationen, also etwa 51,7 Bits. Das ist vergleichbar mit einem zufälligen 8-Zeichen-Passwort aus dem vollen Zeichensatz — aber geschrieben in Wörtern, die ein Mensch wirklich behalten kann. Selbst eine konservativere Liste von 2.048 Wörtern liefert 11 Bits pro Wort — bei vier Wörtern also 44 Bits.",
    ]},
    { type: "p", content: [
      "Stellen Sie ",
      { text: "Pr3tty!", code: true },
      " neben ",
      { text: "correct-horse-battery-staple", code: true },
      ". Beides wirkt vertretbar. Das erste sind 7 Zeichen aus einem 95-Zeichen-Satz — auf dem Papier rund 46 Bits —, aber es ist ein normales Adjektiv plus ein Sonderzeichen, gezogen aus dem winzigen Raum schablonenkonformer Passwörter; der echte Wert ist ein Bruchteil davon. Die Passphrase dagegen besteht aus 28 Zeichen, entstanden aus vier unabhängigen Zufallswahlen unter Tausenden von Wörtern; weil es kein Muster gibt, hat der Angreifer keine Abkürzung.",
    ]},
    { type: "p", content: [
      "Der Haken — und er ist real — steckt im Wort zufällig. Eine Passphrase, die Sie selbst erfinden, etwa ",
      { text: "mycatispurple", code: true },
      ", ist nicht aus vier Zufallswörtern gebaut, sondern ein einziger natürlichsprachiger Satz — und kluge Angreifer modellieren auch die. Die Stärke kommt vom Würfel, nicht von Ihrem Einfall. Nutzen Sie Diceware oder einen gleichverteilenden Generator, und meiden Sie jede Phrase, die schon auf Blogs oder in Songtexten blinkt.",
    ]},
    { type: "list", items: [
      [{ text: "Merkbar:", bold: true }, { text: " vier bekannte Wörter sind leichter zu halten als fünfzehn verstreute Zeichen." }],
      [{ text: "Lang:", bold: true }, { text: " die reine Länge blockiert Offline-Brute-Force, bevor irgendein Verbinden zählt." }],
      [{ text: "Musterecht:", bold: true }, { text: " gleichverteilte Zufallswahlen lassen dem Angreifer keine Schablone." }],
      [{ text: "Skaliert:", bold: true }, { text: " fünf Zufallswörter landen bei etwa 64,6 Bits und bleiben merkbar." }],
    ]},

    { type: "h2", content: ["Die eigentliche Gefahr ist die Wiederverwendung"] },
    { type: "p", content: [
      "Keine der Entropie-Rechnungen schützt Sie, wenn dasselbe Passwort zehn Konten beschützt. Datenlecks sind keine Seltenheit; sie sind Routine und treffen auch sorgfältige Unternehmen mit kompetenten Sicherheitsteams. Leakt eine Hash-Datenbank, werden die Hashes offline geknackt — zuerst per Wörterbuch, dann mit Mutationen —, und das Passwort, das Sie benutzt haben, fällt als Klartext heraus.",
    ]},
    { type: "p", content: [
      "Die Angreifer füttern dieselbe Liste dann gegen jede andere Website, die Sie nutzen. Das ist Credential Stuffing: automatisierte Skripte probieren jedes geleakte Nutzername-Passwort-Paar gegen Tausende von Zielen, und es funktioniert, weil Wiederverwendung die Norm ist. Das Wertvollste, was Sie tun können, ist nicht ein klügeres Passwort — es ist eines, das pro Website einzigartig ist.",
    ]},
    { type: "p", content: [
      "Genau diese Einzigartigkeit automatisieren Passwort-Manager. Und das ist auch die Kehrseite: Das Master-Passwort Ihres Managers ist das eine unersetzliche Geheimnis, das Sie besitzen; es irgendwo zu wiederholen hebt das ganze Modell auf.",
    ]},

    { type: "h2", content: ["Die Angriffsvektoren, gegen die Sie wirklich stehen"] },
    { type: "list", items: [
      [{ text: "Wörterbuchangriff: ", bold: true }, { text: " rattert eine Rangliste wahrscheinlicher Passwörter durch — frühere Lecks, Wörter, Namen, Tastaturfolgen. " }, { text: "sunshine1", code: true }, { text: " erledigt das in Millisekunden." }],
      [{ text: "Brute Force: ", bold: true }, { text: " probiert alle Kombinationen eines Zeichensatzes bis zu einer Längengrenze. Einfach und langsam — genau deshalb zählt die Tabelle oben: Bei einer Milliarde Versuchen pro Sekunde ist ein 8-Zeichen-Passwort aus dem vollen Satz an einem Tag erledigt." }],
      [{ text: "Credential Stuffing: ", bold: true }, { text: " automatisiert geleakte Nutzername-Passwort-Paare gegen tausende Websites. Sein Erfolg ist ein direktes Maß für die Wiederverwendung." }],
      [{ text: "Phishing: ", bold: true }, { text: " imitiert eine echte Login-Seite und erntet das Passwort — oder den Zweifaktor-Code — beim Menschen selbst. Es umgeht jede Stärkeregel; deshalb zählen ein zweiter Faktor und das Autofill des Managers." }],
    ]},
    { type: "p", content: [
      "Bemerkenswert ist, was fehlt: Niemand hackt Sie persönlich. Diese Angriffe sind automatisiert und opportunistisch; sie gehen dorthin, wo die Mathematik am schwächsten und die Wiederverwendung am dichtesten ist.",
    ]},

    { type: "h2", content: ["Wie Passwort-Manager Zugangsdaten erzeugen und speichern"] },
    { type: "p", content: [
      "Ein Passwort-Manager hält jede Zugangsdaten in einem Tresor, der mit einem Schlüssel aus Ihrem Master-Passwort verschlüsselt ist — gestreckt durch eine langsame Funktion wie PBKDF2 oder Argon2, damit das Raten des Master-Passworts offline von Natur aus mühsam ist. Der Tresor ist die einzige Heimat Ihrer Geheimnisse; das Master-Passwort ist der Schlüssel dazu.",
    ]},
    { type: "p", content: [
      "Die Erzeugung ist der Punkt, an dem ein guter Manager seine Miete verdient. Er erstellt pro Website ein frisches, kryptografisch zufälliges Passwort — meist 15 bis 20 Zeichen über den vollen Zeichensatz —, weil er es nie auswendig lernen muss. Das Ökosystem ist breiter, als man denkt: Browser bringen eingebaute Manager mit, Bitwarden und 1Password synchronisieren verschlüsselte Tresore über die Cloud, KeePass-artige Apps halten eine verschlüsselte lokale Datei. Das Prinzip ist überall dasselbe: Ein starker Master-Schlüssel, darüber zufällige, einzigartige Passwörter.",
    ]},
    { type: "p", content: [
      "Auf der anderen Seite des Login-Formulars speichert eine verantwortungsvolle Website Ihr Passwort nicht. Sie speichert einen gesalzenen Hash aus einer langsamen, speicherhungrigen Funktion — bcrypt oder argon2id. Gesalzen heißt, dass ein zufälliger Wert pro Nutzer eingemischt wird, sodass dasselbe Passwort auf einer Million Seiten eine Million verschiedener Hashes ergibt. Langsam heißt, dass die Versuche pro Sekunde des Angreifers von Milliarden auf ein paar Tausend fallen. Genau das ist der Grund, warum ein ordentliches Passwort einen geleakten Datenbestand überlebt — und ein kurzes nicht; dieselbe Schlussfolgerung wie in der Tabelle oben.",
    ]},
    { type: "note", tone: "warning", title: "Ihr Master-Passwort ist der ganze Tresor", content: [
      "Das eine Passwort, das Sie tippen können müssen, sobald Ihr Laptop weg ist, ist das Master-Passwort des Tresors. Machen Sie daraus eine lange, wirklich zufällige Passphrase — und verwenden Sie sie nirgendwo sonst: nicht für einen Gast-Zugang, nicht für eine Testversion. Taucht dieser Schlüssel in einer Leak-Liste auf, ist jedes erzeugte Passwort im Tresor wertlos.",
    ]},
    { type: "note", tone: "success", title: "Einen zweiten Faktor obendrauf", content: [
      "Starke, einzigartige Passwörter schlagen das Offline-Knacken. Was sie nicht schlagen, ist eine sauber gebaute Phishing-Seite. Schalten Sie Zwei-Faktor-Authentifizierung ein — wo angeboten Passkeys oder ein Hardware-Schlüssel, sonst Code über eine App — zumindest für E-Mail- und Finanzkonten, damit ein abgegriffenes Passwort allein nicht genügt.",
    ]},

    { type: "h2", content: ["Was ein starker Generator anders macht"] },
    { type: "p", content: [
      "Der Unterschied zwischen einem Spielzeug-Generator und einem sicheren ist, woher die Zufälligkeit kommt. ",
      { text: "Math.random()", code: true },
      " ist ein aus der Zeit geseedeter Pseudozufallsgenerator; er ist schnell, nie für Geheimnisse gedacht, und sobald man genug seiner Ausgabe beobachtet hat, lässt sich der innere Zustand rekonstruieren — das zufällige Passwort wird vorhersagbar. Browser bieten dagegen ",
      { text: "crypto.getRandomValues()", code: true },
      ", gespeist aus der kryptografischen Zufälligkeit des Betriebssystems: die einzige Quelle, die für diese Aufgabe taugt.",
    ]},
    { type: "p", content: [
      "Die Quelle ist erst die halbe Geschichte. Das Ziehen muss gleichverteilt sein: eine Zufallszahl modulo der Zeichensatzlänge zu nehmen, ist der klassische Weg, die Ausgabe zu verzerren; ernsthafte Generatoren nutzen Rejection Sampling. Und der Zeichensatz sollte so breit sein, wie Sie vertragen — jede enthaltene Klasse sind Bits, die Sie gratis zurückkaufen —, während mehrdeutige Zeichen wie ",
      { text: "1/l", code: true },
      " oder ",
      { text: "0/O", code: true },
      " meist der Lesbarkeit halber entfallen, nicht etwa der Stärke.",
    ]},
    { type: "p", content: [
      "Ein starker Generator tut auch sonst nichts: keine Telemetrie, keine Kopie im Server-Log, kein merken-Sie-sich-das-für-mich. Ein Passwort sollte exakt an einer Stelle existieren — ein paar Sekunden in der Zwischenablage, dann im Tresor.",
    ]},

    { type: "h2", content: ["Passwörter in Convrs erzeugen"] },
    { type: "p", content: [
      "Der ",
      { text: "Passwort-Generator", bold: true },
      " von Convrs arbeitet komplett in Ihrem Browser: Länge wählen, die gewünschten Zeichenklassen ankreuzen und mit einem Klick einen ganzen Schwung erzeugen. Die Zufälligkeit kommt aus der kryptografischen API des Browsers, die gesamte Berechnung bleibt auf Ihrem Gerät, und nichts wird übertragen, protokolliert oder gespeichert — die einzige Kopie Ihres Passworts ist die, die Sie selbst heraus kopieren.",
    ]},
  ],
};

const es: GuideDocument = {
  meta: {
    title: "Seguridad de contraseñas: qué hace que una contraseña sea fuerte de verdad",
    eyebrow: "Seguridad",
    description:
      "La fortaleza de una contraseña es un número, no una lista de requisitos. Cómo funciona la entropía, por qué las reglas de 'Password1!' se vuelven en contra, por qué las frases de contraseña superan a la sopa de símbolos, cómo guardan tus secretos los gestores y por qué un buen generador usa aleatoriedad real.",
    excerpt:
      "Entropía, no mayúsculas: por qué la longitud le gana a la complejidad, qué hacen de verdad los atacantes y cómo guardan tus secretos los gestores de contraseñas.",
    readingTime: "10 min de lectura",
    updatedDate: "16 de septiembre de 2026",
  },
  blocks: [
    { type: "p", content: [
      "Los sitios de los bancos siguen obligándote a demostrar que tu contraseña tiene una mayúscula, un número y un símbolo — y luego rechazan las cadenas largas tipo frase de contraseña que de verdad te protegerían. La investigación dice lo contrario de eso que asumen esas reglas. La fortaleza no es una lista de requisitos sobre tipos de carácter; es un número: cuántos intentos tiene que hacer un atacante hasta dar con tu contraseña. Ese número, medido en bits, es lo único que importa. El resto — el signo de exclamación añadido, la letra capitalizada — es, en su mayor parte, teatro.",
    ]},

    { type: "h2", content: ["Entropía: el número detrás de cada contraseña"] },
    { type: "p", content: [
      "Toda contraseña que puedas crear bajo tus reglas exactas se puede escribir como una lista. El tamaño de esa lista es tu espacio de búsqueda. Si la contraseña se eligió de forma uniforme dentro de la lista, un atacante que va probando una por una necesita, en promedio, la mitad. El tamaño de ese espacio, expresado como potencia de dos, es la entropía de la contraseña: cuánta incertidumbre tiene que resolver el atacante.",
    ]},
    { type: "p", content: [
      "La matemática es simple multiplicación. Con un alfabeto de 26 letras minúsculas, una contraseña de 8 caracteres da ",
      { text: "26^8 = 2,1 × 10^11", code: true },
      " posibilidades: unos 38 bits. Añade mayúsculas, dígitos y símbolos — un conjunto imprimible completo de 95 caracteres — y los mismos 8 caracteres dan ",
      { text: "95^8 = 6,6 × 10^15", code: true },
      " posibilidades, unos 52,5 bits. Cada carácter extra multiplica la lista por el tamaño de tu alfabeto.",
    ]},
    { type: "p", content: [
      "De aquí salen dos consecuencias. La longitud se acumula: cada carácter añadido suma ",
      { text: "log2(alfabeto)", code: true },
      " bits. Y cuanto menor es el alfabeto, menos rinde cada carácter: pasar de 26 a 95 caracteres te da unos 1,9 bits por carácter, mientras que añadir un solo carácter más da 4,7 a 6,6 bits. Ese desequilibrio es todo el argumento a favor de las contraseñas largas.",
    ]},
    { type: "code", lang: "js", content: `// Upper bound for a password a real random generator produced.
// Real human choices score lower — patterns occupy a smaller space.
function bits(length, charsetSize) {
  return length * Math.log2(charsetSize);
}
console.log(bits(8, 26));   // ≈ 37.6 → ~2.1 × 10^11 possible
console.log(bits(8, 95));   // ≈ 52.5 → ~6.6 × 10^15 possible
console.log(bits(12, 95));  // ≈ 78.8
console.log(bits(16, 95));  // ≈ 105.1` },
    { type: "table", columns: ["Longitud / estructura", "Conjunto de caracteres", "Combinaciones posibles", "Bits aprox."], rows: [
      ["8 caracteres", "26 minúsculas", "2,1 × 10^11", "≈ 38"],
      ["8 caracteres", "95 imprimibles", "6,6 × 10^15", "≈ 53"],
      ["12 caracteres", "95 imprimibles", "5,4 × 10^23", "≈ 79"],
      ["16 caracteres", "95 imprimibles", "4,4 × 10^31", "≈ 105"],
      ["4 palabras al azar", "lista de 7.776", "3,7 × 10^15", "≈ 52"],
      ["5 palabras al azar", "lista de 7.776", "2,8 × 10^19", "≈ 65"],
    ]},
    { type: "p", content: [
      "La fórmula asume aleatoriedad genuina, y esa asunción carga con todo el peso. En elecciones reales es un límite superior, porque los humanos no somos uniformes: ",
      { text: "Sunshine1", code: true },
      " tiene ocho caracteres, pero está a años luz de los 6,6 × 10^15. El espacio de búsqueda real del atacante es el espacio de los patrones comunes, y ese espacio es miles de veces más pequeño.",
    ]},

    { type: "h2", content: ["Por qué las reglas clásicas debilitan las contraseñas"] },
    { type: "p", content: [
      "La famosa lista — mínimo 8 caracteres, una mayúscula, un número, un símbolo — se diseñó décadas antes de que las tarjetas gráficas convirtieran el descifrado en un pasatiempo. Falla por partida doble: empuja a la gente hacia plantillas predecibles y castiga lo único que de verdad ayuda: la longitud.",
    ]},
    { type: "p", content: [
      "Dile a alguien que necesita una mayúscula, un dígito y un símbolo, y con probabilidad abrumadora tomará una palabra normal y le aplicará los mismos tres gestos: primera letra en mayúscula, un dígito al final, un símbolo pegado. El resultado es ",
      { text: "Password1!", code: true },
      " o su equivalente local. Toda la clase sigue una sola plantilla, así que el atacante no tiene que recorrer el espacio de 95 caracteres; recorre el espacio de las plantillas, que es mucho más pequeño. El famoso ejemplo de xkcd, ",
      { text: "Tr0ub4dor&3", code: true },
      ", ronda los 28 bits precisamente por esto.",
    ]},
    { type: "p", content: [
      "La rotación forzosa lo empeora. Cuando la política exige una contraseña nueva cada 90 días, la gente muta la anterior: ",
      { text: "Password1!", code: true },
      " se vuelve ",
      { text: "Password2!", code: true },
      ", luego ",
      { text: "Password3!", code: true },
      ". Si la antigua se filtra, la siguiente es trivialmente predecible. La guía actual — NIST SP 800‑63B — descarta la caducidad forzada y la ficción de la complejidad; pide longitud, listas de contraseñas prohibidas y un segundo factor.",
    ]},

    { type: "h2", content: ["La longitud vence a la complejidad: las matemáticas de la frase de contraseña"] },
    { type: "p", content: [
      "Cuatro palabras al azar de una lista de 7.776 — la lista diceware que recomienda la EFF — dan ",
      { text: "7776^4 = 3,7 × 10^15", code: true },
      " combinaciones, unos 51,7 bits. Es comparable a una contraseña aleatoria de 8 caracteres del conjunto completo, pero escrita en palabras que un humano sí puede recordar. Hasta una lista más conservadora de 2.048 palabras rinde 11 bits por palabra: 44 bits en cuatro palabras.",
    ]},
    { type: "p", content: [
      "Pon ",
      { text: "Pr3tty!", code: true },
      " al lado de ",
      { text: "correct-horse-battery-staple", code: true },
      ". Las dos parecen defendibles. La primera son 7 caracteres de un conjunto de 95 — en el papel unos 46 bits —, pero es un adjetivo normal más un símbolo, salido del diminuto espacio de las contraseñas que obedecen la plantilla; su valor real es una fracción. La frase son 28 caracteres hechos de cuatro elecciones aleatorias independientes entre miles de palabras; como no hay patrón, el atacante no tiene atajo.",
    ]},
    { type: "p", content: [
      "La trampa — y es real — está en la palabra aleatorio. Una frase que inventas tú, como ",
      { text: "mycatispurple", code: true },
      ", no son cuatro palabras aleatorias; es una sola frase de lenguaje natural, y los atacantes listos también modelan esas. La fuerza viene del dado, no de tu ingenio. Usa diceware o un generador que elija de forma uniforme, y aléjate de cualquier frase que ya brille en un blog o en la letra de una canción.",
    ]},
    { type: "list", items: [
      [{ text: "Memorable:", bold: true }, { text: " cuatro palabras conocidas se retienen mejor que quince caracteres dispersos." }],
      [{ text: "Larga:", bold: true }, { text: " la longitud en bruto bloquea la fuerza bruta offline antes de que importe nada más." }],
      [{ text: "Sin patrón:", bold: true }, { text: " las elecciones uniformes y aleatorias no le dejan plantilla al atacante." }],
      [{ text: "Escala:", bold: true }, { text: " cinco palabras aleatorias rondan los 64,6 bits y siguen siendo memorables." }],
    ]},

    { type: "h2", content: ["El peligro real es reutilizar contraseñas"] },
    { type: "p", content: [
      "Ninguna de esas cuentas de entropía te protege si la misma contraseña guarda diez cuentas. Las filtraciones no son raras; son rutina, y les pasan a empresas cuidadosas con equipos de seguridad competentes. Cuando se filtra una base de datos con hashes, se descifran offline — primero con diccionario, luego mutaciones —, y la contraseña que usaste cae en texto plano.",
    ]},
    { type: "p", content: [
      "Los atacantes luego pasan esa lista contra todos los demás sitios que usas. Esto es el relleno de credenciales: scripts automáticos prueban cada par de usuario y contraseña filtrados contra miles de objetivos, y funciona porque la reutilización es la norma. Lo más valioso que puedes hacer no es una contraseña más lista — es una por sitio.",
    ]},
    { type: "p", content: [
      "Esa unicidad a escala es justo lo que automatizan los gestores de contraseñas. Y ese es también el reverso: la contraseña maestra de tu gestor es el único secreto irremplazable que tienes; reutilizarla en otro sitio anula todo el modelo.",
    ]},

    { type: "h2", content: ["Los vectores de ataque a los que te enfrentas"] },
    { type: "list", items: [
      [{ text: "Ataque de diccionario: ", bold: true }, { text: " recorre una lista ordenada de contraseñas probables — filtradas antes, palabras, nombres, secuencias de teclado. " }, { text: "sunshine1", code: true }, { text: " lo resuelve en milisegundos." }],
      [{ text: "Fuerza bruta: ", bold: true }, { text: " prueba todas las combinaciones de un conjunto de caracteres hasta un límite de longitud. Simple y lenta, y precisamente por eso importa la tabla de arriba: a mil millones de intentos por segundo, una contraseña de 8 caracteres del conjunto completo está lista en menos de un día." }],
      [{ text: "Relleno de credenciales: ", bold: true }, { text: " automatiza los pares de usuario y contraseña filtrados contra miles de sitios. Su éxito es una medida directa de la reutilización." }],
      [{ text: "Phishing: ", bold: true }, { text: " imita una página de inicio de sesión real y le roba al humano la contraseña — o el código de doble factor —. Se salta todas las reglas de fortaleza; por eso importan un segundo factor y el autocompletado del gestor." }],
    ]},
    { type: "p", content: [
      "Fíjate en lo que falta: nadie te está atacando a ti personalmente. Estos ataques son automáticos y oportunistas; van donde la matemática es más débil y la reutilización más densa.",
    ]},

    { type: "h2", content: ["Cómo generan y guardan credenciales los gestores de contraseñas"] },
    { type: "p", content: [
      "Un gestor de contraseñas guarda cada credencial en una bóveda cifrada con una clave derivada de tu contraseña maestra — estirada con una función lenta como PBKDF2 o Argon2 para que adivinar la maestra offline sea difícil por diseño. La bóveda es el único hogar de tus secretos; la contraseña maestra es la clave que la abre.",
    ]},
    { type: "p", content: [
      "La generación es donde un buen gestor gana su mantenimiento. Crea una contraseña nueva, criptográficamente aleatoria, por sitio — normalmente de 15 a 20 caracteres sobre el conjunto completo —, porque nunca tiene que memorizarlas. El ecosistema es más amplio de lo que crees: los navegadores traen gestores integrados, Bitwarden y 1Password sincronizan bóvedas cifradas por la nube, las apps estilo KeePass mantienen un archivo cifrado local. El principio es el mismo en todas partes: una clave maestra fuerte y contraseñas únicas y aleatorias para todo lo demás.",
    ]},
    { type: "p", content: [
      "Al otro lado del formulario, un sitio responsable no guarda tu contraseña. Guarda un hash con sal mediante una función lenta y costosa en memoria — bcrypt o argon2id. Con sal significa que se mezcla un valor aleatorio por usuario, de modo que la misma contraseña en un millón de sitios genera un millón de hashes distintos; lenta significa que los intentos por segundo del atacante caen de miles de millones a unos pocos miles. Por eso una contraseña decente sobrevive a una base de datos filtrada — y una corta no; la misma conclusión que la tabla de arriba.",
    ]},
    { type: "note", tone: "warning", title: "Tu contraseña maestra es toda la bóveda", content: [
      "La única contraseña que debes poder teclear cuando tu portátil desaparezca es la maestra de la bóveda. Haz que sea una frase larga y realmente aleatoria — y no la reutilices en ningún otro sitio: ni en una visita de invitado, ni en una prueba gratis. Si esa clave aparece en una lista de filtraciones, cada contraseña generada dentro vale nada.",
    ]},
    { type: "note", tone: "success", title: "Añádele un segundo factor", content: [
      "Las contraseñas fuertes y únicas vencen al descifrado offline. Lo que no vencen es una página de phishing bien construida. Activa la verificación en dos pasos — passkeys o una llave de hardware si lo ofrecen, códigos de app si no — al menos en correo y cuentas financieras, para que una contraseña robada no baste por sí sola.",
    ]},

    { type: "h2", content: ["Qué hace distinto a un buen generador"] },
    { type: "p", content: [
      "La diferencia entre un generador de juguete y uno seguro está en de dónde sale el azar. ",
      { text: "Math.random()", code: true },
      " es un generador pseudoaleatorio sembrado desde el tiempo; es rápido, nunca pensado para secretos, y en cuanto observas bastante de su salida se puede reconstruir su estado interno — la contraseña aleatoria se vuelve predecible. Los navegadores, en cambio, exponen ",
      { text: "crypto.getRandomValues()", code: true },
      ", alimentado por la aleatoriedad criptográfica del sistema operativo: la única fuente adecuada para esta tarea.",
    ]},
    { type: "p", content: [
      "La fuente es solo media historia. El muestreo debe ser uniforme: tomar un número aleatorio módulo la longitud del conjunto es la forma clásica de sesgar la salida; los generadores serios usan muestreo por rechazo. Y el conjunto debe ser tan amplio como puedas tolerar, porque cada clase que incluyes son bits que ganas gratis — mientras que los caracteres ambiguos como ",
      { text: "1/l", code: true },
      " y ",
      { text: "0/O", code: true },
      " se quitan por legibilidad, no por fortaleza.",
    ]},
    { type: "p", content: [
      "Un generador fuerte tampoco hace nada más: sin telemetría, sin copia en un log del servidor, sin recuérdalo por mí. Una contraseña debería existir en exactamente un lugar — unos segundos en tu portapapeles y luego en la bóveda.",
    ]},

    { type: "h2", content: ["Genera contraseñas fuertes en Convrs"] },
    { type: "p", content: [
      "El ",
      { text: "generador de contraseñas", bold: true },
      " de Convrs funciona por completo en tu navegador: elige la longitud, activa las clases de caracteres que quieras y genera varias de una vez en un solo clic. El azar viene de la API criptográfica del navegador, todo el cálculo se queda en tu dispositivo y nada se transmite, registra o almacena — la única copia de tu contraseña es la que tú mismo copias.",
    ]},
  ],
};

const passwordSecurityGuide: GuideDefinition = {
  slug: "password-security-guide",
  content: { en, tr, de, es },
};

export default passwordSecurityGuide;