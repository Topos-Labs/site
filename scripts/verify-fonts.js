#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Expected SRI hashes for font files
const expectedHashes = {
  'assets/fonts/nunito-400.woff2': 'sha384-TdhPSiVJVcGjVklNrvJUueB5292zwZm3/GaS6Bhf3Zv9skX7Y+J0y+FDoKxDxvtf',
  'assets/fonts/nunito-600.woff2': 'sha384-ZdMLMxAgOS7JRi+m9pOdRFKX0gmmitBtnfJ0OLrUdcqZLeGRW3V/e0zz3cpgaO+J',
  'assets/fonts/nunito-700.woff2': 'sha384-TuM9bX6+Pryf9yXAZMAmB1Q8RjekNt0e7zYKSUj5ogp5Hxb7cBOC4HN4mU6z+E4d',
  'assets/fonts/jetbrains-mono-400.woff2': 'sha384-/4dCc3INKaFZBsZMku6bd44i8Gr1uXW1GYvdcNjsbHXHh2nGnk9G4RAhHf8hx3GT'
};

console.log('🔍 Verifying font file integrity...\n');

let allValid = true;
let errors = [];

Object.entries(expectedHashes).forEach(([filePath, expectedHash]) => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ MISSING: ${filePath}`);
      errors.push(`File not found: ${filePath}`);
      allValid = false;
      return;
    }

    // Read file and compute hash
    const fileBuffer = fs.readFileSync(filePath);
    const hash = 'sha384-' + crypto.createHash('sha384').update(fileBuffer).digest('base64');

    // Verify hash matches
    if (hash !== expectedHash) {
      console.error(`❌ INTEGRITY FAILURE: ${filePath}`);
      console.error(`   Expected: ${expectedHash}`);
      console.error(`   Got:      ${hash}`);
      errors.push(`Integrity mismatch for ${filePath}`);
      allValid = false;
    } else {
      console.log(`✅ ${filePath}`);
    }

    // Verify file type (WOFF2 magic number)
    const magicNumber = fileBuffer.slice(0, 4);
    const woff2Magic = Buffer.from([0x77, 0x4F, 0x46, 0x32]); // "wOF2"

    if (!magicNumber.equals(woff2Magic)) {
      console.error(`❌ INVALID FORMAT: ${filePath} is not a valid WOFF2 file`);
      errors.push(`Invalid WOFF2 format: ${filePath}`);
      allValid = false;
    }

    // Verify file size is reasonable (>10KB, <100KB)
    const sizeKB = fileBuffer.length / 1024;
    if (sizeKB < 10) {
      console.error(`❌ SUSPICIOUS SIZE: ${filePath} is only ${sizeKB.toFixed(1)}KB (possibly corrupted)`);
      errors.push(`File too small: ${filePath} (${sizeKB.toFixed(1)}KB)`);
      allValid = false;
    } else if (sizeKB > 100) {
      console.warn(`⚠️  LARGE SIZE: ${filePath} is ${sizeKB.toFixed(1)}KB (may need optimization)`);
    }

  } catch (error) {
    console.error(`❌ ERROR reading ${filePath}: ${error.message}`);
    errors.push(`Error: ${error.message}`);
    allValid = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allValid) {
  console.log('✅ All font files verified successfully!');
  console.log('   - Integrity hashes match');
  console.log('   - File formats valid');
  console.log('   - File sizes reasonable');
  process.exit(0);
} else {
  console.error('❌ Font verification failed!');
  console.error('\nErrors found:');
  errors.forEach(err => console.error(`   - ${err}`));
  console.error('\n⚠️  DO NOT DEPLOY - Fix font issues first');
  process.exit(1);
}
