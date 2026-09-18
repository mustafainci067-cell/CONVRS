const fs = require('fs');
const path = require('path');
const https = require('https');

// ==========================================
// CONFIGURATION
// ==========================================
// Paste your Gemini API Key here before running the script (or add to .env.local as GEMINI_API_KEY):
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
const MODEL = 'gemini-flash-latest';

const MESSAGES_FILE = path.join(__dirname, '../src/messages/en.json');
const OUTPUT_DIR = path.join(__dirname, '../src/content/guides');
const LANGUAGES = ['en', 'tr', 'de', 'es'];

// Add any tools here that you want to SKIP (e.g. they already have articles)
const SKIP_TOOLS = [];

// Get limit from command line arguments (e.g. `node script.js 5` to process 5 tools)
const limitArg = parseInt(process.argv[2], 10);
const PROCESS_LIMIT = isNaN(limitArg) ? Infinity : limitArg;

// ==========================================
// HELPER: Fetch from Gemini API
// ==========================================
async function generateContent(prompt, retries = 5) {
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
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`     ⚠️ High demand/Quota error... Waiting 60 seconds to reset quota (Attempt ${attempt}/${retries})`);
      await new Promise(r => setTimeout(r, 60000)); // Wait 60s for RPM quota to reset
    }
  }
}

// ==========================================
// MAIN FUNCTION
// ==========================================
async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const enMessages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
  const tools = enMessages.Sidebar.tools;
  let toolIds = Object.keys(tools).filter(id => !SKIP_TOOLS.includes(id));
  
  // Filter out tools that already have all 4 language files generated
  toolIds = toolIds.filter(id => {
    return LANGUAGES.some(lang => !fs.existsSync(path.join(OUTPUT_DIR, `${id}_${lang}.md`)));
  });

  if (toolIds.length === 0) {
    console.log('✅ All articles have already been generated!');
    return;
  }

  if (PROCESS_LIMIT !== Infinity) {
    console.log(`⏱️ Limiting execution to ${PROCESS_LIMIT} tools out of ${toolIds.length} missing tools.`);
    toolIds = toolIds.slice(0, PROCESS_LIMIT);
  }

  console.log(`🚀 Generating articles for ${toolIds.length} tools...`);
  console.log(`📚 This will generate up to ${toolIds.length * 4} articles in this run.\n`);

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

      console.log(`   ✍️Writing [${lang.toUpperCase()}]...`);
      const prompt = `Write a comprehensive, professional, and SEO-optimized guide (minimum 1000 words) about the tool "${toolName}" (ID: ${toolId}). 
      
Language of the article: ${lang === 'en' ? 'English' : lang === 'tr' ? 'Turkish' : lang === 'de' ? 'German' : 'Spanish'}.

The article should include:
1. What the tool is and its primary use case.
2. Why users need to convert or use this format/tool.
3. Step-by-step guide on how to use it effectively.
4. Technical details about the formats involved (e.g., benefits of JPG vs PNG).
5. FAQ section.

Format the output entirely in beautiful Markdown. Do NOT include a generic introduction like "Here is the article". Start directly with the # H1 Title. Use appropriate ## H2 and ### H3 headings.`;

      try {
        const content = await generateContent(prompt);
        fs.writeFileSync(outputPath, content, 'utf8');
        console.log(`   ✅ Saved: ${outputPath}`);
      } catch (error) {
        console.log(`   ❌ Failed for ${lang}: ${error.message}`);
      }

      // Mandatory 5-second delay AFTER EVERY SINGLE ARTICLE to respect the 15 Requests Per Minute free tier quota limit.
      await new Promise(r => setTimeout(r, 5000));
    }

    console.log('   ---');
  }

  console.log('🎉 All articles generated successfully!');
}

main().catch(console.error);
