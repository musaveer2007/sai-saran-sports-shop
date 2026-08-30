const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');

async function processFrames() {
  const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} PNGs. Converting to high-quality WEBP...`);
  
  for (const file of files) {
    const inputPath = path.join(framesDir, file);
    const outputPath = path.join(framesDir, file.replace('.png', '.webp'));
    
    // We use high quality to ensure it doesn't look "very bad"
    await sharp(inputPath)
      .webp({ quality: 85, alphaQuality: 100 })
      .toFile(outputPath);
      
    // Delete the bulky PNG
    fs.unlinkSync(inputPath);
    process.stdout.write('.');
  }
  
  console.log('\nDone compressing frames to WEBP!');
}

processFrames().catch(console.error);
