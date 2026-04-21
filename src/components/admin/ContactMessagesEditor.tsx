import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type ContactMessage = {
  $id: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  status?: string;
  source?: string;
  $createdAt?: string;
};

const ContactMessagesEditor = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadMessages = async () => {
    try {
      const data = await api.getContactMessages();
      setMessages(data as ContactMessage[]);
    } catch {
      toast({ title: 'Failed to load contact messages', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  if (loading) return <div className="py-8 text-center text-muted-foreground">Loading contact messages...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Contact Messages</h2>
        <Button variant="outline" onClick={loadMessages}>Refresh</Button>
      </div>

      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">No messages yet.</div>
        )}

        {messages.map((message) => (
          <div key={message.$id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{message.subject || 'No Subject'}</p>
                <p className="text-sm text-muted-foreground">{message.name || 'Anonymous'} · {message.email || '-'} · {message.phone || '-'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{message.status || 'new'}</Badge>
                <Badge variant="secondary">{message.source || 'website'}</Badge>
              </div>
            </div>
            <p className="text-sm text-foreground">{message.message || '-'}</p>
            <p className="mt-2 text-xs text-muted-foreground">{message.$createdAt || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMessagesEditor;
