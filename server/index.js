// Express Backend Server
// Handles TikTok video download and Cloudinary upload

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { downloadTikTokVideo } from './tiktokDownloader.js';
import { uploadVideoToCloudinary } from './cloudinaryUploader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SnapMeal Backend Server Running' });
});

// Process TikTok video endpoint
app.post('/api/process-tiktok', async (req, res) => {
  try {
    const { tiktokUrl, dishId } = req.body;

    if (!tiktokUrl) {
      return res.status(400).json({ error: 'TikTok URL is required' });
    }

    console.log(`\n🎬 Processing TikTok video for dish: ${dishId}`);
    console.log(`URL: ${tiktokUrl}`);

    // Step 1: Download TikTok video (extract direct URL)
    const videoUrl = await downloadTikTokVideo(tiktokUrl);

    // Step 2: Upload to Cloudinary
    const publicId = `dish_${dishId}_${Date.now()}`;
    const cloudinaryUrl = await uploadVideoToCloudinary(videoUrl, publicId);

    console.log(`✅ Process complete! Cloudinary URL: ${cloudinaryUrl}\n`);

    res.json({
      success: true,
      originalUrl: tiktokUrl,
      cloudinaryUrl: cloudinaryUrl
    });
  } catch (error) {
    console.error('❌ Error processing TikTok video:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 SnapMeal Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/process-tiktok\n`);
});
