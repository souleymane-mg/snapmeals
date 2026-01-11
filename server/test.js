// Test script to process TikTok video
// Run with: node server/test.js

import { writeFileSync } from 'fs';

const tiktokUrl = 'https://www.tiktok.com/@abdra_cly/video/7485033749336296710';
const dishId = 'd-tiktok-tacos';

console.log('🧪 Testing TikTok video processing...\n');

fetch('http://localhost:3001/api/process-tiktok', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ tiktokUrl, dishId })
})
  .then(res => res.json())
  .then(data => {
    console.log('\n✅ SUCCESS!');
    console.log('Original URL:', data.originalUrl);
    console.log('Cloudinary URL:', data.cloudinaryUrl);
    console.log('\n📋 Copy this URL to constants.ts:');
    console.log(data.cloudinaryUrl);
    
    // Save to file
    writeFileSync('server/cloudinary-url.txt', data.cloudinaryUrl);
    console.log('\n✅ URL saved to server/cloudinary-url.txt');
  })
  .catch(error => {
    console.error('\n❌ ERROR:', error.message);
  });
