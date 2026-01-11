// TikTok Video Downloader
// Uses free API to extract direct video URL without watermark

import axios from 'axios';

export async function downloadTikTokVideo(tiktokUrl) {
  try {
    // Extract video ID
    const videoIdMatch = tiktokUrl.match(/video\/(\d+)/);
    if (!videoIdMatch) {
      throw new Error('Invalid TikTok URL');
    }

    // Try multiple APIs for reliability
    const apis = [
      {
        url: `https://www.tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}&hd=1`,
        extractUrl: (data) => data.data?.play || data.data?.wmplay
      },
      {
        url: `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(tiktokUrl)}`,
        extractUrl: (data) => data.video?.noWatermark
      }
    ];

    for (const api of apis) {
      try {
        console.log(`Trying API: ${api.url}`);
        const response = await axios.get(api.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        const videoUrl = api.extractUrl(response.data);
        if (videoUrl) {
          console.log('✅ Video URL extracted successfully');
          return videoUrl;
        }
      } catch (err) {
        console.warn(`API failed: ${err.message}`);
        continue;
      }
    }

    throw new Error('All APIs failed to extract video URL');
  } catch (error) {
    console.error('Error downloading TikTok video:', error.message);
    throw error;
  }
}
