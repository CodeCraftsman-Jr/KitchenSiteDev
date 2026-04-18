const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const BUCKET_ID = 'kitchen_images';
const FILE_ID = '69e0c40a003b12587b3f';

async function testFetch() {
    // Test 1: list files WITH project header
    const listUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files`;
    console.log('Test 1 - List files with project header:');
    const r1 = await fetch(listUrl + '?queries%5B0%5D=%7B%22method%22%3A%22limit%22%2C%22values%22%3A%5B5%5D%7D', {
        headers: { 'X-Appwrite-Project': PROJECT_ID }
    });
    console.log('Status:', r1.status, (await r1.json()).message || 'OK');

    // Test 2: view file WITH project header
    console.log('\nTest 2 - File view with header:');
    const r2 = await fetch(`${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${FILE_ID}/view`, {
        headers: { 'X-Appwrite-Project': PROJECT_ID }
    });
    console.log('Status:', r2.status, r2.headers.get('content-type'));

    // Test 3: check if it's a platform restriction (need a web platform registered)
    console.log('\nTest 3 - Check account (is project accessible):');
    const r3 = await fetch(`${ENDPOINT}/account`, {
        headers: { 'X-Appwrite-Project': PROJECT_ID }
    });
    const j3 = await r3.json();
    console.log('Account Status:', r3.status, j3.message || j3.name || JSON.stringify(j3).slice(0,200));
}

testFetch().catch(console.error);
