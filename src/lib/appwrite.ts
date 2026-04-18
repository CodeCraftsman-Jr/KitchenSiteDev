import { Client, Account, Databases, Storage, ID } from 'appwrite';

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://varsys.co.in/v1';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '69e0a488000bb42b2af2';

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'kitchen_site_db';
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'kitchen_images';

const client = new Client();
client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };
