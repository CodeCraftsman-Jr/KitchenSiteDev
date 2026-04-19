import { databases, DATABASE_ID, storage, BUCKET_ID, ID } from '@/lib/appwrite';
import { Models, Query } from 'appwrite';

type JsonRecord = Record<string, string | number | boolean | null>;

type BookingPayload = {
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    booking_date: string;
    booking_time: string;
    party_size: number;
    special_request?: string;
    status?: string;
};

export const COLLECTIONS = {
    SITE_CONFIG: 'site_config',
    MENU_CATEGORIES: 'menu_categories',
    MENU_ITEMS: 'menu_items',
    REVIEWS: 'reviews',
    BLOGS: 'blogs',
    OFFERS: 'offers',
    STAFF_MEMBERS: 'staff_members',
    GALLERY_PHOTOS: 'gallery_photos',
    BOOKINGS: 'bookings',
};

// Generic Fetch All
export const fetchAllDocuments = async <T extends Models.Document>(collectionId: string, queries: string[] = []): Promise<T[]> => {
    try {
        const response = await databases.listDocuments<T>(DATABASE_ID, collectionId, queries);
        return response.documents;
    } catch (e) {
        console.error(`Error fetching from ${collectionId}:`, e);
        return [];
    }
};

// Site Config singleton
export const fetchSiteConfig = async () => {
    const docs = await fetchAllDocuments(COLLECTIONS.SITE_CONFIG, [Query.limit(1)]);
    return docs.length > 0 ? docs[0] : null;
};

// File Upload helper
export const uploadImage = async (file: File) => {
    try {
        const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
        return response.$id;
    } catch (e) {
        console.error('Error uploading image:', e);
        return null;
    }
};

export const deleteImage = async (fileId: string) => {
    try {
        await storage.deleteFile(BUCKET_ID, fileId);
        return true;
    } catch (e) {
        console.error('Error deleting image:', e);
        return false;
    }
};

// Official Appwrite SDK URL builders — these return a URL string directly.
// The bucket must have `Any: Read` permission for public access.
export const getImageUrl = (fileId: string): string => {
    if (!fileId) return '';
    return storage.getFileView({ bucketId: BUCKET_ID, fileId }).toString();
};

export const getFileDownloadUrl = (fileId: string): string => {
    if (!fileId) return '';
    return storage.getFileDownload({ bucketId: BUCKET_ID, fileId }).toString();
};

// Preview URL with optional width/height for responsive images
export const getImagePreviewUrl = (fileId: string, width = 800, height = 0): string => {
    if (!fileId) return '';
    return storage.getFilePreview({ bucketId: BUCKET_ID, fileId, width, height }).toString();
};

// Specific API Services
export const api = {
    async getMenuItems() {
        return fetchAllDocuments(COLLECTIONS.MENU_ITEMS);
    },
    async getCategories() {
        return fetchAllDocuments(COLLECTIONS.MENU_CATEGORIES);
    },
    async getReviews() {
        return fetchAllDocuments(COLLECTIONS.REVIEWS, [Query.orderDesc('$createdAt'), Query.limit(100)]);
    },
    async getBlogs() {
        return fetchAllDocuments(COLLECTIONS.BLOGS, [Query.orderDesc('$createdAt'), Query.limit(100)]);
    },
    async getOffers() {
        return fetchAllDocuments(COLLECTIONS.OFFERS);
    },
    async getStaffMembers() {
        return fetchAllDocuments(COLLECTIONS.STAFF_MEMBERS);
    },
    async getGalleryPhotos() {
        return fetchAllDocuments(COLLECTIONS.GALLERY_PHOTOS, [Query.orderAsc('order')]);
    },
    async getSiteConfig() {
        return fetchSiteConfig();
    },
    async getFiles() {
        try {
            // Use the official Appwrite SDK — bucket must have Users: Read permission
            const response = await storage.listFiles({
                bucketId: BUCKET_ID,
                queries: [Query.limit(500)],
            });
            return response.files ?? [];
        } catch (e) {
            console.error('Error fetching files:', e);
            return [];
        }
    },

    async createBooking(data: BookingPayload) {
        const primaryPayload: JsonRecord = {
            customer_name: data.customer_name,
            customer_phone: data.customer_phone,
            customer_email: data.customer_email || '',
            booking_date: data.booking_date,
            booking_time: data.booking_time,
            party_size: data.party_size,
            special_request: data.special_request || '',
            status: data.status || 'pending',
        };

        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.BOOKINGS,
                ID.unique(),
                primaryPayload
            );
        } catch (primaryError) {
            console.warn('Primary booking payload failed, retrying with minimal payload.', primaryError);
            const fallbackPayload: JsonRecord = {
                customer_name: data.customer_name,
                customer_phone: data.customer_phone,
                booking_date: data.booking_date,
                booking_time: data.booking_time,
                party_size: data.party_size,
            };

            return databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.BOOKINGS,
                ID.unique(),
                fallbackPayload
            );
        }
    },

    // Mutations
    async createDocument(collectionId: string, data: JsonRecord) {
        return databases.createDocument(DATABASE_ID, collectionId, ID.unique(), data);
    },
    async updateDocument(collectionId: string, documentId: string, data: JsonRecord) {
        return databases.updateDocument(DATABASE_ID, collectionId, documentId, data);
    },
    async deleteDocument(collectionId: string, documentId: string) {
        return databases.deleteDocument(DATABASE_ID, collectionId, documentId);
    }
};
