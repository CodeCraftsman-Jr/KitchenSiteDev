import { useEffect, useState } from 'react';
import { api, uploadImage, getImageUrl, deleteImage } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const MenuItemsEditor = () => {
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
      const data = await api.getMenuItems();
      setItems(data);
    } catch (e) {
      toast({ title: 'Failed to load menu items', variant: 'destructive' });
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
      description: '',
      price: 0,
      image_file_id: '',
      is_veg: true,
      is_popular: false,
      is_spicy: false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, imageId?: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.deleteDocument('menu_items', id);
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
      
      dataToSave.price = parseFloat(dataToSave.price); // ensure float
      
      if ($id) {
        await api.updateDocument('menu_items', $id, dataToSave);
      } else {
        await api.createDocument('menu_items', dataToSave);
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
      if (fileId) {
        setEditingItem({ ...editingItem, image_file_id: fileId });
      }
    } catch (error) {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
  };

  if (loading) return <div className="py-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Menu Items</h2>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.$id} className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
            {item.image_file_id && (
              <img src={getImageUrl(item.image_file_id)} alt={item.name} className="h-32 object-cover rounded-md mb-4" />
            )}
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-muted-foreground text-sm flex-1">{item.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold">₹{item.price}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Edit className="w-4 h-4" /></Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.$id, item.image_file_id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem?.$id ? 'Edit Item' : 'New Item'}</DialogTitle>
          </DialogHeader>
          
          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" value={editingItem.price || ''} onChange={e => setEditingItem({...editingItem, price: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} rows={3} />
              </div>

              <div className="space-y-2">
                <Label>Image</Label>
                {editingItem.image_file_id && (
                  <img src={getImageUrl(editingItem.image_file_id)} alt="Preview" className="h-24 object-cover rounded mb-2" />
                )}
                <Input type="file" onChange={handleImageUpload} accept="image/*" />
              </div>

              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Checkbox checked={editingItem.is_veg} onCheckedChange={c => setEditingItem({...editingItem, is_veg: !!c})} id="veg" />
                  <Label htmlFor="veg">Vegetarian</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={editingItem.is_popular} onCheckedChange={c => setEditingItem({...editingItem, is_popular: !!c})} id="popular" />
                  <Label htmlFor="popular">Popular</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox checked={editingItem.is_spicy} onCheckedChange={c => setEditingItem({...editingItem, is_spicy: !!c})} id="spicy" />
                  <Label htmlFor="spicy">Spicy</Label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Item
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuItemsEditor;
