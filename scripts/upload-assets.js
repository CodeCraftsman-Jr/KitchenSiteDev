import fs from 'fs';
import path from 'path';
import { Client, Storage, ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const API_KEY = 'standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33';
const BUCKET_ID = 'kitchen_images';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const storage = new Storage(client);

const assetsMap = {};
const mapPath = path.join(__dirname, '..', 'assets_map.json');

async function uploadFile(filePath, subPath) {
    console.log(`Uploading ${subPath}...`);
    try {
        const file = InputFile.fromPath(filePath, path.basename(filePath));
        const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
        assetsMap[subPath] = response.$id;
        console.log(`Success: ${subPath} -> ${response.$id}`);
    } catch (e) {
        console.error(`Failed to upload ${subPath}: ${e.message}`);
    }
}

async function scanAndUpload(dir, baseDir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await scanAndUpload(fullPath, baseDir);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(ext)) {
                // Calculate relative path using posix style (with forward slashes)
                const relativePath = path.relative(baseDir, fullPath).split(path.sep).join('/');
                await uploadFile(fullPath, relativePath);
            }
        }
    }
}

async function main() {
    const assetsDir = path.join(__dirname, '..', 'src', 'assets');
    
    // Load existing map if any
    if (fs.existsSync(mapPath)) {
        Object.assign(assetsMap, JSON.parse(fs.readFileSync(mapPath, 'utf8')));
    }

    console.log(`Scanning assets directory: ${assetsDir}`);
    await scanAndUpload(assetsDir, assetsDir);

    fs.writeFileSync(mapPath, JSON.stringify(assetsMap, null, 2));
    console.log(`Finished uploading. Map saved to ${mapPath}`);
}

main().catch(console.error);
