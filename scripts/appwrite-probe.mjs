import dotenv from 'dotenv';
import { Client, Databases, TablesDB } from 'node-appwrite';

dotenv.config();

const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const blogsId = process.env.APPWRITE_BLOGS_COLLECTION_ID || 'blogs';
const categoriesId = process.env.APPWRITE_MENU_CATEGORIES_COLLECTION_ID || 'menu_categories';
const itemsId = process.env.APPWRITE_MENU_ITEMS_COLLECTION_ID || 'menu_items';

if (!endpoint || !projectId || !databaseId || !apiKey) {
  console.log('Missing required env vars for Appwrite probe.');
  process.exit(1);
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);
const tablesDB = new TablesDB(client);

const printResult = (label, ok, details) => {
  const state = ok ? 'OK' : 'FAIL';
  console.log(`${state} :: ${label} :: ${details}`);
};

const run = async () => {
  try {
    const response = await databases.list();
    printResult('Databases.list', true, `${response.databases?.length ?? 0} database(s)`);
  } catch (error) {
    printResult('Databases.list', false, error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    const response = await databases.get({ databaseId });
    printResult('Databases.get', true, `databaseId=${response.$id}`);
  } catch (error) {
    printResult('Databases.get', false, error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    const response = await databases.listCollections({ databaseId });
    const ids = (response.collections || []).map((collection) => collection.$id).join(', ');
    printResult('Databases.listCollections', true, ids || 'no collections');
  } catch (error) {
    printResult('Databases.listCollections', false, error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    const response = await tablesDB.list();
    printResult('TablesDB.list', true, `${response.databases?.length ?? 0} database(s)`);
  } catch (error) {
    printResult('TablesDB.list', false, error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    const response = await tablesDB.listTables({ databaseId });
    const ids = (response.tables || []).map((table) => table.$id).join(', ');
    printResult('TablesDB.listTables', true, ids || 'no tables');
  } catch (error) {
    printResult('TablesDB.listTables', false, error instanceof Error ? error.message : 'Unknown error');
  }

  for (const collectionId of [blogsId, categoriesId, itemsId]) {
    try {
      const response = await databases.listDocuments({
        databaseId,
        collectionId,
      });
      printResult(`Databases.listDocuments(${collectionId})`, true, `${response.documents?.length ?? 0} document(s)`);
    } catch (error) {
      printResult(`Databases.listDocuments(${collectionId})`, false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  for (const tableId of [blogsId, categoriesId, itemsId]) {
    try {
      const response = await tablesDB.listRows({
        databaseId,
        tableId,
      });
      printResult(`TablesDB.listRows(${tableId})`, true, `${response.rows?.length ?? 0} row(s)`);
    } catch (error) {
      printResult(`TablesDB.listRows(${tableId})`, false, error instanceof Error ? error.message : 'Unknown error');
    }
  }
};

await run();
