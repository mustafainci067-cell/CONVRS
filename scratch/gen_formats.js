const fs = require('fs');
const path = require('path');
const https = require('https');

// Load env manually
const envPath = path.join(__dirname, '../.env.local');
let GEMINI_API_KEY = 'AQ.Ab8RN6KMCGtlbZDVNumMNGjOmViQllgRjGw7Dok-pRuxZAzXwg';
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const match = envFile.match(/^GEMINI_API_KEY=(.*)$/m);
  if (match) GEMINI_API_KEY = match[1].trim();
}
const MODEL = 'gemini-flash-latest';

const OUTPUT_DIR = path.join(__dirname, '../src/content/guides');
const LANGUAGES = ['en', 'tr', 'de', 'es'];

const FORMATS = ['JPG', 'PNG', 'PDF', 'WEBP', 'CSV'];

async function generateContent(prompt, retries = 5) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  const payload = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await new Promise((resolve, reject) => {
        const req = https.request(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
          }
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              if (json.error) reject(new Error(json.error.message));
              else resolve(json.candidates[0].content.parts[0].text);
            } catch (e) {
              reject(e);
            }
          });
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
      });
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`     ⚠️ Quota error... Waiting 60s (Attempt ${attempt}/${retries})`);
      await new Promise(r => setTimeout(r, 60000));
    }
  }
}

function getPrompt(format, lang) {
  const langNames = { en: "English", tr: "Turkish", de: "German", es: "Spanish" };
  return `You are an expert tech writer and SEO specialist. Write a comprehensive, SEO-friendly educational article of at least 1000 words about the "${format}" file format.
The article MUST be written entirely in ${langNames[lang]}.

Topics to cover:
- What is the ${format} file format? (History, definition)
- What is it used for and where?
- What are its main advantages and disadvantages?
- Comparison with other similar formats.
- How to open, edit, or convert this file type.

Formatting Rules:
- Return ONLY valid Markdown content. No markdown code blocks (do not wrap in \`\`\`markdown).
- Must include a frontmatter block at the very top with 'title', 'description', 'date' (today's date), and 'tags' (array).
- Use proper headings (H2, H3), bold text, and bullet points.
- The content must be highly informative, professional, and detailed.

Ensure the final output is directly savable as a .md file. DO NOT wrap the output in \`\`\`markdown or \`\`\`. Start directly with the --- frontmatter.`;
}

async function main() {
  for (const format of FORMATS) {
    console.log(`\nProcessing format: ${format}`);
    for (const lang of LANGUAGES) {
      const fileName = `${format.toLowerCase()}-format-guide.md`;
      const filePath = path.join(OUTPUT_DIR, lang, fileName);
      
      // ensure lang dir exists
      const langDir = path.join(OUTPUT_DIR, lang);
      if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

      if (fs.existsSync(filePath)) {
        console.log(`  ⏭️ Skipped [${lang.toUpperCase()}] (File exists)`);
        continue;
      }

      console.log(`  ✍️ Generating [${lang.toUpperCase()}] article for ${format}...`);
      try {
        let md = await generateContent(getPrompt(format, lang));
        md = md.replace(/^```markdown\n?/g, '').replace(/\n?```$/g, '').trim();
        fs.writeFileSync(filePath, md, 'utf8');
        console.log(`  ✅ Saved: ${filePath}`);
        await new Promise(r => setTimeout(r, 5000)); // 5s delay to respect 15 RPM
      } catch (err) {
        console.error(`  ❌ Failed for ${lang}:`, err.message);
      }
    }
  }
  console.log('🎉 Done!');
}

main();
