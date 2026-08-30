const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');
const mobileFramesDir = path.join(__dirname, 'public', 'frames-mobile');

if (!fs.existsSync(mobileFramesDir)) {
  fs.mkdirSync(mobileFramesDir);
}

async function processMobileFrames() {
  const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp'));
  console.log(`Found ${files.length} WEBP frames. Scaling for mobile...`);
  
  for (const file of files) {
    const inputPath = path.join(framesDir, file);
    const outputPath = path.join(mobileFramesDir, file);
    
    // Scale down to max 854 width to dramatically save RAM on mobile (1920 -> 854)
    await sharp(inputPath)
      .resize(854, 480, { fit: 'inside' })
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    process.stdout.write('.');
  }
  
  console.log('\nDone creating mobile frames!');
}

processMobileFrames().catch(console.error);
