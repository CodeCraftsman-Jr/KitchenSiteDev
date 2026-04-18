import { Client, Databases, ID } from 'node-appwrite';

const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const API_KEY = 'standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33';

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
const databases = new Databases(client);

const DB_ID = 'kitchen_site_db';

const reviewsData = [
  { name: "Rahul S.", rating: 5, comment: "Absolutely incredible food! The biryani is to die for.", date: "Oct 12, 2023", verified: true },
  { name: "Priya M.", rating: 4, comment: "Very authentic Dosa and chutney. Delivery was fast too.", date: "Oct 10, 2023", verified: true },
  { name: "Aman K.", rating: 5, comment: "I've been ordering every day. The best food for students in Pondicherry!", date: "Oct 1, 2023", verified: true }
];

const blogPosts = [
  { 
      title: "The Heart of South Indian Cooking", 
      excerpt: "Discover the secret spices that make our curries so aromatic and special.",
      content: "South Indian cooking relies heavily on spices like mustard seeds, curry leaves, tamarind, and coconut. Here at Vasanth's kitchen, we source our spices locally to maintain the ultimate freshness in every bite...",
      date: "October 16, 2023",
      author: "Vasanth"
  },
  { 
      title: "Why our Biryani hits different", 
      excerpt: "A deep dive into our slow-cook process for the ultimate Chicken Biryani.",
      content: "Biryani is more than a dish, it's an emotion. We let our meat marinate for 24 hours in a blend of secret spices passed down from parents. The slow cooking ensures the rice absorbs all the rich flavors...",
      date: "September 28, 2023",
      author: "Vasanth"
  }
];

async function seed() {
    console.log('Seeding Reviews...');
    for (const r of reviewsData) {
        try {
            await databases.createDocument(DB_ID, 'reviews', ID.unique(), r);
        } catch(e) { console.error(e) }
    }

    console.log('Seeding Blogs...');
    for (const b of blogPosts) {
        try {
            await databases.createDocument(DB_ID, 'blogs', ID.unique(), b);
        } catch(e) { console.error(e) }
    }
    
    console.log('Done Seeding Reviews and Blogs!');
}

seed().catch(console.error);
