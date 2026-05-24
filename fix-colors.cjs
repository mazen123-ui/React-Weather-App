const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Text colors
  content = content.replace(/color:\s*['"]#fff['"]/g, 'color: "text.primary"');
  content = content.replace(/color:\s*['"]rgba\(255,\s*255,\s*255,\s*0\.\d+\)['"]/g, 'color: "text.secondary"');
  content = content.replace(/color:\s*['"]rgba\(255,255,255,0\.\d+\)['"]/g, 'color: "text.secondary"');

  // Background colors
  content = content.replace(/backgroundColor:\s*['"]rgba\(255,255,255,0\.0[68]\)['"]/g, 'bgcolor: "background.paper"');
  content = content.replace(/backgroundColor:\s*['"]rgba\(255,255,255,0\.1[02]?\)['"]/g, 'bgcolor: "action.hover"');
  content = content.replace(/backgroundColor:\s*['"]#1e1b3a['"]/g, 'bgcolor: "background.paper"');

  // Hover backgrounds
  content = content.replace(/"&:hover":\s*{\s*backgroundColor:\s*['"]rgba\(255,255,255,0\.08\)['"]\s*}/g, '"&:hover": { bgcolor: "action.hover" }');
  
  // Borders
  content = content.replace(/borderColor:\s*['"]rgba\(255,255,255,0\.15\)['"]/g, 'borderColor: "divider"');
  content = content.replace(/borderColor:\s*['"]rgba\(255,255,255,0\.3\)['"]/g, 'borderColor: "text.disabled"');

  fs.writeFileSync(filePath, content, 'utf8');
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
for (const file of files) {
  if (file !== 'ThemeToggle.jsx') { // leave our toggle alone just in case
    replaceInFile(path.join(dir, file));
  }
}

console.log("Colors updated!");
