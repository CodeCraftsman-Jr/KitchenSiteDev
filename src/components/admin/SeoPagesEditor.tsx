import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit } from 'lucide-react';

type SeoPage = {
  $id?: string;
  route: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  schema_type?: string;
};

const SeoPagesEditor = () => {
  const [items, setItems] = useState<SeoPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SeoPage | null>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      const data = await api.getSeoPages();
      setItems(data as SeoPage[]);
    } catch {
      toast({ title: 'Failed to load SEO pages', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onNew = () => {
    setEditing({ route: '/', meta_title: '', meta_description: '', canonical_url: '', schema_type: 'website' });
    setOpen(true);
  };

  const onEdit = (item: SeoPage) => {
    setEditing({ ...item });
    setOpen(true);
  };

  const onSave = async () => {
    if (!editing) return;

    try {
      const payload = {
        route: editing.route,
        meta_title: editing.meta_title || '',
        meta_description: editing.meta_description || '',
        canonical_url: editing.canonical_url || '',
        schema_type: editing.schema_type || 'website',
      };

      if (editing.$id) {
        await api.updateDocument('seo_pages', editing.$id, payload);
      } else {
        await api.createDocument('seo_pages', payload);
      }
      toast({ title: 'SEO page saved' });
      setOpen(false);
      await load();
    } catch {
      toast({ title: 'Failed to save SEO page', variant: 'destructive' });
    }
  };

  if (loading) return <div className="py-8 text-center text-muted-foreground">Loading SEO pages...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">SEO Pages</h2>
        <Button onClick={onNew}><Plus className="mr-2 h-4 w-4" /> Add SEO Page</Button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && <div className="rounded-lg border p-4 text-sm text-muted-foreground">No SEO page entries yet.</div>}
        {items.map((item) => (
          <div key={item.$id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{item.route}</p>
                <p className="text-sm text-muted-foreground">{item.meta_title || 'No title set'}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.$id ? 'Edit SEO Page' : 'Add SEO Page'}</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Route</Label>
                <Input value={editing.route} onChange={(e) => setEditing({ ...editing, route: e.target.value })} placeholder="/menu" />
              </div>

              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input value={editing.meta_title || ''} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea rows={4} value={editing.meta_description || ''} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Canonical URL</Label>
                <Input value={editing.canonical_url || ''} onChange={(e) => setEditing({ ...editing, canonical_url: e.target.value })} placeholder="https://vasanthskitchen.com/menu" />
              </div>

              <div className="space-y-2">
                <Label>Schema Type</Label>
                <Input value={editing.schema_type || ''} onChange={(e) => setEditing({ ...editing, schema_type: e.target.value })} placeholder="Menu / BlogPosting / FAQPage" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={onSave}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeoPagesEditor;
