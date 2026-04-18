import { Client, Storage, Databases, Query } from 'node-appwrite';

const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const API_KEY = 'standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33';

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
const storage = new Storage(client);
const databases = new Databases(client);

async function test() {
    try {
        const files = await storage.listFiles('kitchen_images', [Query.orderDesc('$createdAt'), Query.limit(5)]);
        console.log(`Storage files: ${files.total}`);
        
        const menuItems = await databases.listDocuments('kitchen_site_db', 'menu_items');
        console.log(`Menu Items: ${menuItems.total}`);
        
        const staff = await databases.listDocuments('kitchen_site_db', 'staff_members');
        console.log(`Staff Members: ${staff.total}`);
    } catch (e) {
        console.error(e);
    }
}
test();
