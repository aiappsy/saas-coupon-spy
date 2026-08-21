const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Building SaaS Coupon Spy Extension...');
execSync('npm run build', { stdio: 'inherit' });

const distDir = path.join(__dirname, 'dist');
const zipFile = path.join(__dirname, '..', '..', 'saas-coupon-spy-v1.0.0.zip');

if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

console.log('🗜️ Creating store-ready ZIP archive...');
execSync(`powershell Compress-Archive -Path "${distDir}/*" -DestinationPath "${zipFile}" -Force`);

console.log(`✅ Success! Your Chrome Web Store package is ready:`);
console.log(`📍 ${zipFile}`);
