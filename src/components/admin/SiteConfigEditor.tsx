import { useEffect, useState } from 'react';
import { api, uploadImage, getImageUrl } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const SiteConfigEditor = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await api.getSiteConfig();
      if (data) {
        setConfig(data);
      } else {
        // Init empty config
        setConfig({
          site_name: '',
          hero_title: '',
          hero_subtitle: '',
          address: '',
          phone: '',
          email: '',
          restaurant_description: '',
        });
      }
    } catch (e) {
      toast({ title: 'Failed to load config', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (config.$id) {
        const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...dataToSave } = config;
        await api.updateDocument('site_config', $id, dataToSave);
      } else {
        await api.createDocument('site_config', config);
      }
      toast({ title: 'Configuration saved successfully!' });
      loadConfig();
    } catch (e: any) {
      toast({ title: 'Error saving config', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, attrName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileId = await uploadImage(file);
      if (fileId) {
        setConfig({ ...config, [attrName]: fileId });
        toast({ title: 'Image uploaded successfully' });
      }
    } catch (error) {
      toast({ title: 'Error uploading image', variant: 'destructive' });
    }
  };

  if (loading) return <div className="py-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Global Site Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input 
              value={config?.site_name || ''} 
              onChange={e => setConfig({...config, site_name: e.target.value})} 
              placeholder="Vasanth's Kitchen"
            />
          </div>

          <div className="space-y-2">
            <Label>Logo Image</Label>
            {config?.logo_file_id && (
              <img src={getImageUrl(config.logo_file_id)} alt="Logo Preview" className="h-12 object-contain bg-gray-100 p-2 rounded" />
            )}
            <Input type="file" onChange={e => handleImageUpload(e, 'logo_file_id')} accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input 
              value={config?.phone || ''} 
              onChange={e => setConfig({...config, phone: e.target.value})} 
              placeholder="+91 9442434269"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              type="email" 
              value={config?.email || ''} 
              onChange={e => setConfig({...config, email: e.target.value})} 
              placeholder="vasanthskitchen@example.com"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <h2 className="text-xl font-bold mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Hero Title</Label>
            <Input 
              value={config?.hero_title || ''} 
              onChange={e => setConfig({...config, hero_title: e.target.value})} 
              placeholder="Authentic Flavors Delivered Fresh"
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Textarea 
              value={config?.hero_subtitle || ''} 
              onChange={e => setConfig({...config, hero_subtitle: e.target.value})} 
              rows={3} 
              placeholder="Experience the finest cloud kitchen with traditional recipes, modern techniques, and exceptional taste delivered to your doorstep."
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Background Image</Label>
            {config?.hero_image_file_id && (
              <img src={getImageUrl(config.hero_image_file_id)} alt="Hero Preview" className="h-32 object-cover rounded" />
            )}
            <Input type="file" onChange={e => handleImageUpload(e, 'hero_image_file_id')} accept="image/*" />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <h2 className="text-xl font-bold mb-4">Restaurant Details</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Address</Label>
            <Input 
              value={config?.address || ''} 
              onChange={e => setConfig({...config, address: e.target.value})} 
              placeholder="Plot No: 50, 51 Mettu Street, Chinna Kalapet, Puducherry"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              value={config?.restaurant_description || ''} 
              onChange={e => setConfig({...config, restaurant_description: e.target.value})} 
              rows={5} 
              placeholder="Vasanth's Kitchen was founded with a passion to serve healthy home-style foods which mainly focuses on students. As myself, I am a 19-year-old student and entrepreneur who started this business at a young age during my college days to solve the problems which I faced. This is the first step I took with the efforts I made. I had opened up this cloud kitchen and will do more in the future. Hope everyone does support me as you usually do. Thank you, Vasanthan From Pondicherry (Owner of Vasanth's Kitchen) - one important thing, all these can't be achieved without my parents' support (Elumalai (Dad) - Staff At Pondicherry University, Abirami (Mom))"
            />
          </div>
        </div>
      </div>
      
      <Button onClick={handleSave} disabled={saving} className="mt-8">
        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Save Configurations
      </Button>
    </div>
  );
};

export default SiteConfigEditor;
