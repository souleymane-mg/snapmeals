
import { downloadTikTokVideo } from './tiktokDownloader.js';

// Get URL from command line arguments
const url = process.argv[2];

if (!url) {
  console.log('\n❌ Erreur: Veuillez fournir un lien TikTok.');
  console.log('Usage: npm run get-video <lien_tiktok>');
  console.log('Exemple: npm run get-video https://www.tiktok.com/@user/video/123456\n');
  process.exit(1);
}

console.log(`\n🔄 Traitement de la vidéo...`);
console.log(`Lien: ${url}\n`);

try {
  const directUrl = await downloadTikTokVideo(url);
  console.log('✅ SUCCÈS ! Voici le lien à copier dans videoUrl :\n');
  console.log('\x1b[32m%s\x1b[0m', directUrl); // Green color
  console.log('\n___________________________________________________\n');
} catch (error) {
  console.error('\n❌ Erreur:', error.message);
}
