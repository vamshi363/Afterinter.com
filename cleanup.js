const fs = require('fs');
const path = require('path');

// 🚨 FILES TO DESTROY (Legacy React/Vite/SPA files)
const garbageFiles = [
  'index.html',
  'index.tsx',
  'main.tsx',
  'App.tsx',
  'vite.config.ts',
  'vercel.json',
  'components/Layout.tsx',       // Replaced by app/layout.tsx
  'components/ClientLayout.tsx', // Legacy wrapper
  'public/sitemap.xml',          // Replaced by app/sitemap.ts
  'public/robots.txt'            // Replaced by app/robots.ts
];

// 🚨 FOLDERS TO DESTROY
const garbageDirs = [
  'pages' // ⚠️ CRITICAL: Deletes the old 'pages' folder. Next.js uses 'app/'.
];

console.log('🧹 STARTING NUCLEAR CLEANUP FOR NEXT.JS...');

garbageFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Deleted Legacy File: ${file}`);
    } catch (e) {
      console.error(`⚠️ Could not delete ${file}:`, e.message);
    }
  }
});

garbageDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Deleted Legacy Directory: ${dir}`);
    } catch (e) {
      console.error(`⚠️ Could not delete ${dir}:`, e.message);
    }
  }
});

console.log('✨ Project cleaned. Ready for Next.js build.');
