import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, getFileDownloadUrl, uploadImage, deleteImage } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, Trash2, Upload, FileImageIcon } from 'lucide-react';
import AppwriteImage from '@/components/AppwriteImage';

const MediaLibrary = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: files = [], isLoading } = useQuery({
    queryKey: ['media_files'],
    queryFn: api.getFiles,
  });

  const deleteMutation = useMutation({
    mutationFn: (fileId: string) => deleteImage(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media_files'] });
      toast({ title: 'File deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete file', variant: 'destructive' });
    }
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const id = await uploadImage(file);
    setUploading(false);

    if (id) {
      toast({ title: 'File uploaded successfully' });
      queryClient.invalidateQueries({ queryKey: ['media_files'] });
    } else {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
    
    // Reset file input
    e.target.value = '';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return <div className="py-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Media Library</h2>
        <div className="relative">
          <Input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={handleFileUpload} 
            accept="image/*"
            disabled={uploading}
          />
          <Button disabled={uploading}>
            {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
            Upload Image
          </Button>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
          <FileImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No media files found</h3>
          <p className="text-muted-foreground">Upload images to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file: any) => (
            <div key={file.$id} className="border rounded-lg overflow-hidden group bg-white shadow-sm flex flex-col">
              <div className="aspect-square bg-gray-100 relative">
                <AppwriteImage
                  fileId={file.$id}
                  alt={file.name}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                  fallback={
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">{file.name}</div>
                  }
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a 
                    href={getFileDownloadUrl(file.$id)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-primary" />
                  </a>
                  <button
                    onClick={() => {
                        if(confirm('Are you sure you want to delete this image? It might be in use.')) {
                            deleteMutation.mutate(file.$id);
                        }
                    }}
                    className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-white mt-auto truncate text-xs">
                <p className="font-medium truncate" title={file.name}>{file.name}</p>
                <p className="text-muted-foreground">{formatFileSize(file.sizeOriginal)}</p>
                <p className="text-muted-foreground mt-1 text-[10px]">ID: {file.$id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
