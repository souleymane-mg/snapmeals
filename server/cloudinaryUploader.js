// Cloudinary Uploader
// Uploads videos to Cloudinary cloud storage

import { v2 as cloudinary } from 'cloudinary';

export async function uploadVideoToCloudinary(videoUrl, publicId) {
  try {
    // Configure Cloudinary (credentials from .env)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    console.log('📤 Uploading video to Cloudinary...');
    
    // Upload video directly from URL
    const result = await cloudinary.uploader.upload(videoUrl, {
      resource_type: 'video',
      public_id: publicId,
      folder: 'snapmeal/reels',
      overwrite: true,
      transformation: [
        { quality: 'auto', fetch_format: 'mp4' }
      ]
    });

    console.log('✅ Video uploaded successfully');
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.message);
    throw error;
  }
}
