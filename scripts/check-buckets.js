import { Client, Storage } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://varsys.co.in/v1')
    .setProject('69e0a488000bb42b2af2')
    .setKey('standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33');

const storage = new Storage(client);

async function check() {
    // List all buckets
    const buckets = await storage.listBuckets();
    console.log('=== BUCKETS ===');
    for (const b of buckets.buckets) {
        console.log(`ID: "${b.$id}"  Name: "${b.name}"  Permissions:`, JSON.stringify(b.$permissions));
    }

    // If kitchen_images exists, get its files
    try {
        const files = await storage.listFiles('kitchen_images');
        console.log(`\nkitchen_images files: ${files.total}`);
    } catch(e) {
        console.error('\nkitchen_images error:', e.message);
    }
}

check().catch(console.error);
