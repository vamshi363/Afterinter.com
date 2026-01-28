const fs = require('fs');
const path = require('path');

const garbageFiles = [
  'index.html',
  'index.tsx',
  'main.tsx',
  'App.tsx',
  'vite.config.ts',
  'vercel.json', // Remove legacy SPA rewrites
  'metadata.json' // Not needed in root for Next.js
];

const garbageDirs = ['pages', 'dist', 'build'];

console.log('🚀 CLEANING LEGACY FILES...');

garbageFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✅ Deleted: ${file}`);
  }
});

garbageDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✅ Purged: ${dir}`);
  }
});

console.log('✨ Build environment is now 100% Next.js compatible.');