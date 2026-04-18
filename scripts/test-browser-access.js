// Test fetching a file via plain fetch (simulating browser SDK unauthenticated request)
const ENDPOINT = 'https://varsys.co.in/v1';
const PROJECT_ID = '69e0a488000bb42b2af2';
const BUCKET_ID = 'kitchen_images';

async function testFetch() {
    // Test list files as unauthenticated (like a browser guest)
    const listUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files?queries[]=%7B%22method%22%3A%22limit%22%2C%22values%22%3A%5B5%5D%7D`;

    console.log('Testing URL:', listUrl);
    try {
        const res = await fetch(listUrl, {
            headers: {
                'X-Appwrite-Project': PROJECT_ID,
            }
        });
        const json = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', JSON.stringify(json, null, 2).slice(0, 500));
    } catch(e) {
        console.error('Error:', e.message);
    }

    // Test direct file view (image)
    const fileId = '69e0c40a003b12587b3f'; // biryani.jpg
    const viewUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
    console.log('\nTesting image view URL:', viewUrl);
    try {
        const res = await fetch(viewUrl);
        console.log('Image Status:', res.status, res.statusText);
        console.log('Content-Type:', res.headers.get('content-type'));
    } catch(e) {
        console.error('Image Error:', e.message);
    }
}

testFetch();
