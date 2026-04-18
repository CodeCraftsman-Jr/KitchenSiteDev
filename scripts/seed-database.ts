import fs from 'fs';
import path from 'path';
import { Client, Databases, ID } from 'node-appwrite';
import { fileURLToPath } from 'url';

// Provide mock path for assets map
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mapPath = path.join(__dirname, '..', 'assets_map.json');

const assetsMap = fs.existsSync(mapPath) ? JSON.parse(fs.readFileSync(mapPath, 'utf8')) : {};

const getAssetId = (p) => {
    if(!p) return '';
    // e.g. "/src/assets/MenuItems/Idli with sambar.png"
    const cleaned = p.replace('/src/assets/', '');
    return assetsMap[cleaned] || '';
};

// We will import menuData directly
import { menuData } from '../src/data/menuData';

const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const API_KEY = 'standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33';

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
const databases = new Databases(client);

const DB_ID = 'kitchen_site_db';

const staff = [
    { name: "Vasanthan", role: "Owner", experience: "Founder & Student Entrepreneur", specialty: "Business Operations", image: "/src/assets/Staff/owner.JPG" },
    { name: "Kitchen Manager", role: "Manager", experience: "Operations Management", specialty: "Quality Control & Coordination", image: "/src/assets/Staff/Manager.jpg" },
    { name: "Head Cook", role: "Cook", experience: "Traditional South Indian Cuisine", specialty: "Dosa & Idli Specialist", image: "/src/assets/Staff/cook.jpg" },
    { name: "Kitchen Staff", role: "Staff", experience: "Food Preparation & Service", specialty: "Customer Service", image: "/src/assets/Staff/staff.jpg" },
    { name: "Assistant Cook", role: "Assistant Cook", experience: "Food Preparation Support", specialty: "Ingredient Preparation", image: "/src/assets/Staff/assistant cook.jpg" }
];

async function seed() {
    console.log('Seeding Database...');
    
    // Seed Categories & Items
    for (const cat of menuData.categories) {
        console.log('Category:', cat.name);
        try {
            const catDoc = await databases.createDocument(DB_ID, 'menu_categories', ID.unique(), {
                name: cat.name,
                description: cat.description || '',
                is_popular: cat.isPopular || false
            });
            
            for (const item of cat.items) {
                await databases.createDocument(DB_ID, 'menu_items', ID.unique(), {
                    name: item.name,
                    description: item.description || '',
                    price: Number(item.price),
                    image_file_id: getAssetId(item.image),
                    is_veg: item.isVeg || false,
                    is_popular: item.isPopular || false,
                    is_spicy: item.isSpicy || false,
                    rating: Number(item.rating || 0),
                    review_count: Number(item.reviewCount || 0),
                    category_id: catDoc.$id,
                    preparation_time: item.preparationTime || '',
                });
            }
        } catch (e) {
            console.error('Error seeding category/items:', e.message);
        }
    }
    
    // Seed Staff
    console.log('Seeding Staff...');
    for (const member of staff) {
        try {
            await databases.createDocument(DB_ID, 'staff_members', ID.unique(), {
                name: member.name,
                role: member.role,
                experience: member.experience,
                specialty: member.specialty,
                image_file_id: getAssetId(member.image)
            });
        } catch(e) {
            console.error(e.message);
        }
    }

    console.log('Done Seeding!');
}

seed().catch(console.error);
