import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite';

const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const API_KEY = 'standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33';

const DATABASE_ID = 'kitchen_site_db';
const BUCKET_ID = 'kitchen_images';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

async function setup() {
    console.log('Starting Appwrite setup...');

    // 1. Create Database
    try {
        await databases.create(DATABASE_ID, 'Kitchen Site DB');
        console.log(`Database '${DATABASE_ID}' created.`);
    } catch (e) {
        if (e.code === 409) console.log(`Database '${DATABASE_ID}' already exists.`);
        else throw e;
    }

    // 2. Create Storage Bucket
    try {
        await storage.createBucket(
            BUCKET_ID, 
            'Kitchen Images', 
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ],
            false,
            false,
            undefined,
            ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif']
        );
        console.log(`Bucket '${BUCKET_ID}' created.`);
    } catch (e) {
        if (e.code === 409) console.log(`Bucket '${BUCKET_ID}' already exists.`);
        else throw e;
    }

    const collections = [
        {
            id: 'site_config', name: 'Site Config', 
            attributes: [
                { type: 'string', key: 'site_name', size: 255, required: false },
                { type: 'string', key: 'logo_file_id', size: 255, required: false },
                { type: 'string', key: 'hero_title', size: 255, required: false },
                { type: 'string', key: 'hero_subtitle', size: 1000, required: false },
                { type: 'string', key: 'hero_image_file_id', size: 255, required: false },
                { type: 'string', key: 'address', size: 1000, required: false },
                { type: 'string', key: 'phone', size: 50, required: false },
                { type: 'string', key: 'email', size: 255, required: false },
                { type: 'string', key: 'restaurant_description', size: 5000, required: false },
                { type: 'string', key: 'future_plans_text', size: 5000, required: false },
                { type: 'string', key: 'future_plans_image_file_id', size: 255, required: false },
                { type: 'string', key: 'delivery_options_json', size: 10000, required: false },
                { type: 'string', key: 'stats_json', size: 10000, required: false },
                { type: 'string', key: 'official_documents_json', size: 10000, required: false },
            ]
        },
        {
            id: 'menu_categories', name: 'Menu Categories',
            attributes: [
                { type: 'string', key: 'name', size: 255, required: true },
                { type: 'string', key: 'description', size: 1000, required: false },
                { type: 'boolean', key: 'is_popular', required: false, default: false },
            ]
        },
        {
            id: 'menu_items', name: 'Menu Items',
            attributes: [
                { type: 'string', key: 'name', size: 255, required: true },
                { type: 'string', key: 'description', size: 2000, required: false },
                { type: 'float', key: 'price', required: true },
                { type: 'string', key: 'image_file_id', size: 255, required: false },
                { type: 'boolean', key: 'is_veg', required: false, default: true },
                { type: 'boolean', key: 'is_popular', required: false, default: false },
                { type: 'boolean', key: 'is_spicy', required: false, default: false },
                { type: 'float', key: 'rating', required: false },
                { type: 'integer', key: 'review_count', required: false },
                { type: 'string', key: 'category_id', size: 50, required: false },
                { type: 'string', key: 'preparation_time', size: 50, required: false },
            ]
        },
        {
            id: 'reviews', name: 'Reviews',
            attributes: [
                { type: 'string', key: 'name', size: 255, required: true },
                { type: 'integer', key: 'rating', required: true },
                { type: 'string', key: 'comment', size: 2000, required: false },
                { type: 'string', key: 'date', size: 50, required: false },
                { type: 'boolean', key: 'verified', required: false, default: false },
                { type: 'string', key: 'avatar_file_id', size: 255, required: false },
            ]
        },
        {
            id: 'blogs', name: 'Blogs',
            attributes: [
                { type: 'string', key: 'title', size: 255, required: true },
                { type: 'string', key: 'excerpt', size: 1000, required: false },
                { type: 'string', key: 'content', size: 10000, required: true },
                { type: 'string', key: 'image_file_id', size: 255, required: false },
                { type: 'string', key: 'date', size: 50, required: false },
                { type: 'string', key: 'author', size: 255, required: false },
            ]
        },
        {
            id: 'offers', name: 'Offers',
            attributes: [
                { type: 'string', key: 'title', size: 255, required: true },
                { type: 'string', key: 'description', size: 1000, required: false },
                { type: 'string', key: 'code', size: 50, required: true },
                { type: 'float', key: 'discount', required: true },
                { type: 'float', key: 'minimum_order', required: false },
            ]
        },
        {
            id: 'staff_members', name: 'Staff Members',
            attributes: [
                { type: 'string', key: 'name', size: 255, required: true },
                { type: 'string', key: 'role', size: 255, required: true },
                { type: 'string', key: 'experience', size: 255, required: false },
                { type: 'string', key: 'specialty', size: 255, required: false },
                { type: 'string', key: 'image_file_id', size: 255, required: false },
            ]
        }
    ];

    for (const col of collections) {
        try {
            await databases.createCollection(
                DATABASE_ID, 
                col.id, 
                col.name,
                [
                    Permission.read(Role.any()),
                    Permission.create(Role.users()),
                    Permission.update(Role.users()),
                    Permission.delete(Role.users()),
                ]
            );
            console.log(`Collection '${col.id}' created.`);
        } catch (e) {
            if (e.code === 409) {
                console.log(`Collection '${col.id}' already exists.`);
            } else {
                throw e;
            }
        }

        // Add attributes sequentially
        for (const attr of col.attributes) {
            try {
                if (attr.type === 'string') {
                    await databases.createStringAttribute(DATABASE_ID, col.id, attr.key, attr.size, attr.required, attr.default);
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(DATABASE_ID, col.id, attr.key, attr.required, attr.default);
                } else if (attr.type === 'integer') {
                    await databases.createIntegerAttribute(DATABASE_ID, col.id, attr.key, attr.required, attr.min, attr.max, attr.default);
                } else if (attr.type === 'float') {
                    await databases.createFloatAttribute(DATABASE_ID, col.id, attr.key, attr.required, attr.min, attr.max, attr.default);
                }
                console.log(`  - Attribute '${attr.key}' created in '${col.id}'. Waiting briefly...`);
                // Wait to avoid rate limits / attribute creation latency
                await new Promise(r => setTimeout(r, 1500));
            } catch (e) {
                if (e.code === 409) {
                    console.log(`  - Attribute '${attr.key}' already exists in '${col.id}'.`);
                } else {
                    console.error(`Error creating attribute ${attr.key}:`, e.message);
                }
            }
        }
    }

    console.log('Setup finished successfully!');
}

setup().catch(console.error);
