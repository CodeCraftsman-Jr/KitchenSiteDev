import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, uploadImage } from '@/services/api';
import AppwriteImage from '@/components/AppwriteImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const StaffEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    specialty: '',
    image_file_id: ''
  });

  const { data: staff = [], isLoading } = useQuery({
    queryKey: ['staff_members'],
    queryFn: api.getStaffMembers,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (editingItem) {
        return api.updateDocument('staff_members', editingItem.$id, data);
      }
      return api.createDocument('staff_members', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff_members'] });
      toast({ title: `Staff member ${editingItem ? 'updated' : 'created'} successfully` });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: 'Error saving staff member', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteDocument('staff_members', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff_members'] });
      toast({ title: 'Staff member deleted' });
    }
  });

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      role: '',
      experience: '',
      specialty: '',
      image_file_id: ''
    });
  };

  const handleEdit = (staffMember: any) => {
    setEditingItem(staffMember);
    setFormData({
      name: staffMember.name,
      role: staffMember.role,
      experience: staffMember.experience || '',
      specialty: staffMember.specialty || '',
      image_file_id: staffMember.image_file_id || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileId = await uploadImage(file);
      if (fileId) {
        setFormData({ ...formData, image_file_id: fileId });
        toast({ title: 'Image uploaded successfully' });
      }
    } catch (error) {
      toast({ title: 'Error uploading image', variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="py-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Staff Members</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Staff</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Staff Member' : 'Add New Staff Member'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <Input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Owner, Head Chef, etc." />
              </div>

              <div className="space-y-2">
                <Label>Experience</Label>
                <Input value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label>Specialty</Label>
                <Input value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label>Profile Picture</Label>
                {formData.image_file_id && (
                  <AppwriteImage fileId={formData.image_file_id} alt="Preview" className="h-24 w-24 object-cover rounded-full bg-gray-100" />
                )}
                <Input type="file" onChange={handleImageUpload} accept="image/*" />
              </div>

              <div className="flex justify-end pt-4 space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Staff
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member: any) => (
          <div key={member.$id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <AppwriteImage
                    fileId={member.image_file_id}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-xl">
                        {member.name.charAt(0)}
                      </div>
                    }
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-warm-orange font-medium">{member.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(member.$id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              {member.experience && <p><strong>Exp:</strong> {member.experience}</p>}
              {member.specialty && <p><strong>Spec:</strong> {member.specialty}</p>}
            </div>
          </div>
        ))}
        {staff.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
            No staff members. Click "Add Staff" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffEditor;
