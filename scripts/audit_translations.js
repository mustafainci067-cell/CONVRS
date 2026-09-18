const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../src/messages');
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['tr', 'de', 'es'];

function flattenObject(ob) {
  var toReturn = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

function loadJson(lang) {
  const filePath = path.join(MESSAGES_DIR, `${lang}.json`);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return flattenObject(JSON.parse(rawData));
}

function audit() {
  console.log(`\n🔍 Auditing translations using '${SOURCE_LANG}.json' as the source of truth...\n`);
  
  const sourceKeys = loadJson(SOURCE_LANG);
  let hasErrors = false;

  for (const lang of TARGET_LANGS) {
    const targetKeys = loadJson(lang);
    
    let missingKeys = [];
    let englishValues = [];

    for (const key of Object.keys(sourceKeys)) {
      if (!targetKeys.hasOwnProperty(key)) {
        missingKeys.push(key);
      } else if (targetKeys[key] === sourceKeys[key] && typeof sourceKeys[key] === 'string' && sourceKeys[key].length > 0) {
        // Simple heuristic: If the value is EXACTLY the same as English, it might not be translated.
        // Ignore single words or short acronyms that are identical in all languages like "PDF" or "URL"
        const val = sourceKeys[key];
        const ignoreList = ['PDF', 'URL', 'JSON', 'CSV', 'YAML', 'XML', 'SQL', 'WEBP', 'PNG', 'JPG', 'HEIC', 'ICO', 'MP4', 'MP3', 'WAV', 'GIF', 'WEBM', 'SVG', 'Base64'];
        if (!ignoreList.includes(val) && val.length > 5) {
             englishValues.push(key);
        }
      }
    }

    if (missingKeys.length > 0 || englishValues.length > 0) {
      hasErrors = true;
      console.log(`❌ Language: [${lang.toUpperCase()}] has issues:`);
      if (missingKeys.length > 0) {
        console.log(`   🚨 Missing Keys (${missingKeys.length}):`);
        missingKeys.forEach(k => console.log(`      - ${k}`));
      }
      if (englishValues.length > 0) {
        console.log(`   ⚠️ Potential Untranslated (Exact match with EN) (${englishValues.length}):`);
        englishValues.forEach(k => console.log(`      - ${k} => "${sourceKeys[k]}"`));
      }
      console.log('');
    } else {
      console.log(`✅ Language: [${lang.toUpperCase()}] is fully translated!`);
    }
  }

  if (!hasErrors) {
    console.log(`\n🎉 All languages are up to date with no missing keys!\n`);
  }
}

audit();
