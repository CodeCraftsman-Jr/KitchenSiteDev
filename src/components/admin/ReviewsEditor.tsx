import { useEffect, useState } from 'react';
import { api, uploadImage, deleteImage } from '@/services/api';
import AppwriteImage from '@/components/AppwriteImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ReviewsEditor = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await api.getReviews();
      setItems(data);
    } catch (e) {
      toast({ title: 'Failed to load', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem({
      name: '',
      rating: 5,
      comment: '',
      date: new Date().toLocaleDateString(),
      verified: true,
      avatar_file_id: '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, imageId?: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      await api.deleteDocument('reviews', id);
      if (imageId) await deleteImage(imageId);
      toast({ title: 'Item deleted' });
      loadItems();
    } catch (e) {
      toast({ title: 'Failed to delete', variant: 'destructive' });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...editingItem };
      const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...dataToSave } = payload;
      
      dataToSave.rating = parseInt(dataToSave.rating);
      
      if ($id) {
        await api.updateDocument('reviews', $id, dataToSave);
      } else {
        await api.createDocument('reviews', dataToSave);
      }
      toast({ title: 'Saved successfully!' });
      setIsDialogOpen(false);
      loadItems();
    } catch (e: any) {
      toast({ title: 'Error saving', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileId = await uploadImage(file);
      if (fileId) setEditingItem({ ...editingItem, avatar_file_id: fileId });
    } catch (error) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
  };

  if (loading) return <div className="py-8 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Review</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.$id} className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <AppwriteImage
                fileId={item.avatar_file_id}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
                fallback={
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">{item.name[0]}</div>
                }
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <div className="text-sm text-yellow-500">{"★".repeat(item.rating)}</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm flex-1 break-words line-clamp-4">"{item.comment}"</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">{item.date}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="w-4 h-4" /></Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.$id, item.avatar_file_id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editingItem?.$id ? 'Edit Review' : 'New Review'}</DialogTitle></DialogHeader>
          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Rating (1-5)</Label>
                  <Input type="number" min="1" max="5" value={editingItem.rating || 5} onChange={e => setEditingItem({...editingItem, rating: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Comment</Label>
                <Textarea value={editingItem.comment || ''} onChange={e => setEditingItem({...editingItem, comment: e.target.value})} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Avatar Image (optional)</Label>
                {editingItem.avatar_file_id && <AppwriteImage fileId={editingItem.avatar_file_id} alt="Avatar preview" className="h-16 rounded mb-2 object-cover" />}
                <Input type="file" onChange={handleImageUpload} accept="image/*" />
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Checkbox checked={editingItem.verified} onCheckedChange={c => setEditingItem({...editingItem, verified: !!c})} id="verified" />
                  <Label htmlFor="verified">Verified Customer</Label>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save Review</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsEditor;
