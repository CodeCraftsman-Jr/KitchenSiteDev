import { useEffect, useState } from 'react';
import { api, uploadImage, deleteImage } from '@/services/api';
import AppwriteImage from '@/components/AppwriteImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const BlogsEditor = () => {
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
      const data = await api.getBlogs();
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
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toLocaleDateString(),
      author: 'Admin',
      image_file_id: '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, imageId?: string) => {
    if (!confirm('Delete this article?')) return;
    try {
      await api.deleteDocument('blogs', id);
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
      
      if ($id) {
        await api.updateDocument('blogs', $id, dataToSave);
      } else {
        await api.createDocument('blogs', dataToSave);
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
      if (fileId) setEditingItem({ ...editingItem, image_file_id: fileId });
    } catch (error) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
  };

  if (loading) return <div className="py-8 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Blog Posts</h2>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Post</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.$id} className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
            <AppwriteImage
              fileId={item.image_file_id}
              alt="Blog cover"
              className="h-32 w-full object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm flex-1 mt-2 line-clamp-3">{item.excerpt}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">{item.date}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="w-4 h-4" /></Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.$id, item.image_file_id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingItem?.$id ? 'Edit Post' : 'New Post'}</DialogTitle></DialogHeader>
          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea value={editingItem.excerpt || ''} onChange={e => setEditingItem({...editingItem, excerpt: e.target.value})} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Content (Markdown or Text)</Label>
                <Textarea value={editingItem.content || ''} onChange={e => setEditingItem({...editingItem, content: e.target.value})} rows={10} />
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                {editingItem.image_file_id && <AppwriteImage fileId={editingItem.image_file_id} alt="Cover preview" className="h-24 w-full object-cover rounded mb-2" />}
                <Input type="file" onChange={handleImageUpload} accept="image/*" />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save Post</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogsEditor;
