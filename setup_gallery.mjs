const endpoint = 'https://varsys.co.in/v1';
const projectId = '69e0a488000bb42b2af2';
const apiKey = 'standard_14ea226540353f4bb711ec36c9fa812eedcf2ceb5e66685fb16c254b40fe5c9b15bfc3705924ae3f86ec78deb0e3cbcd86e6bd1365239fd04bfd8f7001d75bec0586a3cf4a3789afc66dfc4cb7d8bbea6b9f1d83583c72eb9f9ef606e1ca469efe3fb3b6fe4117a8db8a7284b441a5fb82a7e6518e4a0cb22c7521cd04a59b33';
const databaseId = 'kitchen_site_db';
const collectionId = 'gallery_photos';

const headers = {
  'Content-Type': 'application/json',
  'X-Appwrite-Project': projectId,
  'X-Appwrite-Key': apiKey,
};

async function setup() {
  try {
    console.log('Creating collection...');
    const resCol = await fetch(`${endpoint}/databases/${databaseId}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collectionId,
        name: 'Gallery Photos',
        permissions: [
          'read("any")',
          'create("users")',
          'update("users")',
          'delete("users")'
        ],
        documentSecurity: false
      })
    });
    const colData = await resCol.json();
    console.log('Collection response:', colData.message || 'Success');
    if (colData.code >= 400 && colData.code !== 409) return; // 409 is conflict (already exists)

    console.log('Creating attribute: image_file_id...');
    await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/string`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ key: 'image_file_id', size: 255, required: true })
    }).then(res => res.json()).then(console.log);

    console.log('Creating attribute: caption...');
    await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/string`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ key: 'caption', size: 512, required: false })
    }).then(res => res.json()).then(console.log);

    console.log('Creating attribute: order...');
    await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/integer`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ key: 'order', required: false })
    }).then(res => res.json()).then(console.log);

    console.log('Setup complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

setup();
