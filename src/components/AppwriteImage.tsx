import React from 'react';
import { getImageUrl } from '@/services/api';

interface AppwriteImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fileId: string | null | undefined;
  fallback?: React.ReactNode;
}

/**
 * AppwriteImage — renders an Appwrite-hosted image using the official SDK URL.
 *
 * The SDK's `storage.getFileView()` returns a URL string that includes the
 * correct project ID. As long as the bucket has `Any: Read` permission enabled
 * in the Appwrite console, the URL works directly in <img src=""> with no
 * extra headers or blob-fetch tricks needed.
 *
 * Docs: https://appwrite.io/docs/references/cloud/client-web/storage#getFileView
 */
const AppwriteImage: React.FC<AppwriteImageProps> = ({
  fileId,
  fallback = null,
  alt = '',
  onError,
  ...imgProps
}) => {
  const [hasError, setHasError] = React.useState(false);

  // Reset error state if fileId changes
  React.useEffect(() => {
    setHasError(false);
  }, [fileId]);

  if (!fileId || hasError) {
    return <>{fallback}</>;
  }

  const src = getImageUrl(fileId);

  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
      {...imgProps}
    />
  );
};

export default AppwriteImage;
