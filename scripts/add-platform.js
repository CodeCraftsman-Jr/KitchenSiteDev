const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const API_KEY = 'standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33';

async function addPlatform(name, hostname) {
    console.log(`Adding platform: ${name} (${hostname})`);
    const r = await fetch(`${ENDPOINT}/projects/${PROJECT_ID}/platforms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Appwrite-Project': PROJECT_ID,
            'X-Appwrite-Key': API_KEY,
        },
        body: JSON.stringify({
            type: 'web',
            name,
            hostname,
        })
    });
    const j = await r.json();
    console.log('Status:', r.status, JSON.stringify(j, null, 2));
}

async function run() {
    await addPlatform('Localhost Dev', 'localhost');
    await addPlatform('Production', 'varsys.co.in');
}

run().catch(console.error);
