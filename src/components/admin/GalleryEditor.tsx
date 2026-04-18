import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, COLLECTIONS, getImageUrl, deleteImage, uploadImage } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import AppwriteImage from '@/components/AppwriteImage';

const GalleryEditor = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);
    
    // New photo state
    const [newPhoto, setNewPhoto] = useState<{ caption: string; file: File | null; order: number }>({
        caption: '',
        file: null,
        order: 0
    });

    const { data: photos = [], isLoading } = useQuery({
        queryKey: ['gallery_photos'],
        queryFn: api.getGalleryPhotos,
    });

    const createMutation = useMutation({
        mutationFn: async () => {
            if (!newPhoto.file) throw new Error('Please select an image');
            
            setIsUploading(true);
            const fileId = await uploadImage(newPhoto.file);
            
            if (!fileId) throw new Error('Failed to upload image');

            return api.createDocument(COLLECTIONS.GALLERY_PHOTOS, {
                caption: newPhoto.caption,
                image_file_id: fileId,
                order: newPhoto.order
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery_photos'] });
            toast({ title: 'Success', description: 'Gallery photo added successfully' });
            setNewPhoto({ caption: '', file: null, order: 0 }); // reset form
        },
        onError: (error: any) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        },
        onSettled: () => setIsUploading(false)
    });

    const deleteMutation = useMutation({
        mutationFn: async (photo: any) => {
            await api.deleteDocument(COLLECTIONS.GALLERY_PHOTOS, photo.$id);
            if (photo.image_file_id) {
                await deleteImage(photo.image_file_id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery_photos'] });
            toast({ title: 'Success', description: 'Gallery photo deleted' });
        },
        onError: (error: any) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gallery Photos</h2>
                    <p className="text-muted-foreground mt-1">Manage the dome gallery photos shown on the website.</p>
                </div>
            </div>

            {/* Add New Photo */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-primary" />
                        Add New Gallery Photo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label>Select Image *</Label>
                                <Input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={e => setNewPhoto({...newPhoto, file: e.target.files?.[0] || null})}
                                    className="cursor-pointer" 
                                />
                            </div>
                            <div>
                                <Label>Caption (Optional)</Label>
                                <Input 
                                    placeholder="E.g., Kitchen upgrades 2024" 
                                    value={newPhoto.caption}
                                    onChange={e => setNewPhoto({...newPhoto, caption: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label>Display Order</Label>
                                <Input 
                                    type="number" 
                                    value={newPhoto.order}
                                    onChange={e => setNewPhoto({...newPhoto, order: parseInt(e.target.value) || 0})}
                                />
                            </div>
                            <Button 
                                onClick={() => createMutation.mutate()}
                                disabled={createMutation.isPending || isUploading || !newPhoto.file}
                                className="w-full"
                            >
                                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                Upload Photo
                            </Button>
                        </div>

                        {/* Image Preview */}
                        <div className="flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed h-[250px]">
                            {newPhoto.file ? (
                                <img 
                                    src={URL.createObjectURL(newPhoto.file)} 
                                    alt="Preview" 
                                    className="max-h-full object-contain p-2 rounded-lg" 
                                />
                            ) : (
                                <p className="text-muted-foreground text-sm">Image preview will appear here</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Current Photos */}
            {isLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {photos.map((photo: any) => (
                        <Card key={photo.$id} className="overflow-hidden group">
                            <div className="aspect-square relative bg-gray-100">
                                <AppwriteImage 
                                    fileId={photo.image_file_id}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button 
                                        variant="destructive" 
                                        size="icon"
                                        onClick={() => {
                                            if(window.confirm('Are you sure you want to delete this photo?')) {
                                                deleteMutation.mutate(photo);
                                            }
                                        }}
                                        disabled={deleteMutation.isPending}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-4 bg-white border-t">
                                <p className="font-medium text-gray-900 truncate" title={photo.caption || 'No caption'}>
                                    {photo.caption || <span className="text-gray-400 italic">No caption</span>}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">Order: {photo.order || 0}</p>
                            </CardContent>
                        </Card>
                    ))}
                    {photos.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-muted-foreground">No gallery photos added yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GalleryEditor;
