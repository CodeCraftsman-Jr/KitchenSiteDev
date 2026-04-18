/**
 * @deprecated Use `getImageUrl(fileId)` from `@/services/api` directly.
 * The official Appwrite SDK `storage.getFileView()` returns a URL string
 * that works directly in <img src=""> when the bucket has `Any: Read` permission.
 *
 * Docs: https://appwrite.io/docs/references/cloud/client-web/storage#getFileView
 */
export { getImageUrl as useAppwriteImage } from '@/services/api';
