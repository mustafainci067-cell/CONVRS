const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/i18n/guides/html-encoding-guide.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace unescaped `${` with `\${`
// But we need to make sure we replace it correctly in backtick strings.
// Since all instances of `${` in this data file are inside markdown/code blocks and should be escaped,
// we can safely replace all of them.
content = content.replace(/\$\{/g, '\\${');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed html-encoding-guide.ts');
