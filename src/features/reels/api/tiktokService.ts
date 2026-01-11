import { Reel } from '../../../types';

export const fetchTikTokVideos = async (username: string): Promise<Reel[]> => {
  return new Promise((resolve) => {
    console.log(`Fetching videos for user: ${username}`);
    
    // Simulate network delay
    setTimeout(() => {
      // Return generated reels that look like they came from the user
      // Note: This is simulated data
      const newReels: any[] = [
        {
          id: `tk-${Date.now()}-1`,
          videoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          title: `Menu spécial de @${username} 🥗`,
          chefName: username,
          likes: Math.floor(Math.random() * 5000),
          comments: Math.floor(Math.random() * 200),
          dishId: 'd5'
        },
        // ...
      ];
      resolve(newReels);
    }, 1500);
  });
};