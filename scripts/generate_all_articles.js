const fs = require('fs');
const path = require('path');
const https = require('https');

// ==========================================
// CONFIGURATION
// ==========================================
// Paste your Gemini API Key here before running the script:
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
const MODEL = 'gemini-2.5-pro';

const MESSAGES_FILE = path.join(__dirname, '../src/messages/en.json');
const OUTPUT_DIR = path.join(__dirname, '../src/content/guides');
const LANGUAGES = ['en', 'tr', 'de', 'es'];

// Add any tools here that you want to SKIP (e.g. they already have articles)
const SKIP_TOOLS = [];

// ==========================================
// HELPER: Fetch from Gemini API
// ==========================================
async function generateContent(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = JSON.stringify({
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    }
  });

  return new Promise((resolve, reject) => {
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
          if (json.error) {
            reject(new Error(json.error.message));
          } else {
            resolve(json.candidates[0].content.parts[0].text);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ==========================================
// MAIN GENERATION LOGIC
// ==========================================
async function main() {
  if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ ERROR: Please set your GEMINI_API_KEY in the script or environment variables.');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load tools from en.json
  const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
  const tools = messages.Sidebar.tools;
  const toolIds = Object.keys(tools).filter(id => !SKIP_TOOLS.includes(id));

  console.log(`🚀 Found ${toolIds.length} tools to generate articles for...`);
  console.log(`📚 This will generate ${toolIds.length * LANGUAGES.length} articles in total.\n`);

  for (let i = 0; i < toolIds.length; i++) {
    const toolId = toolIds[i];
    const toolName = tools[toolId];
    
    console.log(`[${i + 1}/${toolIds.length}] Generating articles for: ${toolName} (${toolId})`);

    // Generate for each language
    for (const lang of LANGUAGES) {
      const outputPath = path.join(OUTPUT_DIR, `${toolId}_${lang}.md`);
      
      // Skip if already exists
      if (fs.existsSync(outputPath)) {
        console.log(`   ⏭️ Skipped [${lang.toUpperCase()}] (File already exists)`);
        continue;
      }

      console.log(`   ✍️ Writing [${lang.toUpperCase()}]...`);

      const prompt = `You are an expert SEO content writer and tech blogger.
Write a comprehensive, 1000+ word article in ${lang.toUpperCase()} about "${toolName}". 
The URL slug for this tool is "/${toolId}".

Requirements:
1. MUST be at least 1000 words.
2. Output MUST be valid Markdown.
3. Start directly with the title (e.g. # Title). Do not include any meta conversation.
4. Structure the article with clear H2 and H3 headings.
5. Cover topics such as: What are these file formats/concepts? Why do people need to convert/use them? What are the advantages? How does our tool help? What are the best practices?
6. Ensure the tone is professional, informative, and clean (elegant language, no keyword stuffing, but highly SEO optimized).
7. Language MUST be exclusively ${lang.toUpperCase()}.

Do not include frontmatter, just the raw Markdown content.`;

      try {
        const content = await generateContent(prompt);
        fs.writeFileSync(outputPath, content, 'utf-8');
        console.log(`   ✅ Saved: ${outputPath}`);
      } catch (err) {
        console.error(`   ❌ Failed for ${lang}:`, err.message);
        // Wait a bit before retrying next one to avoid aggressive rate limits
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    
    console.log('   ---');
    // Pause to respect API rate limits (15 requests per minute usually for free tier)
    await new Promise(r => setTimeout(r, 4000));
  }

  console.log(`\n🎉 All articles generated successfully!`);
}

main().catch(console.error);
