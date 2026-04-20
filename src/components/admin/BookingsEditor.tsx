import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type BookingDoc = {
  $id: string;
  customer_name?: string;
  customer_phone?: string;
  booking_date?: string;
  booking_time?: string;
  party_size?: number;
  status?: string;
};

const BOOKING_STATUSES = ['pending', 'confirmed', 'seated', 'completed', 'cancelled'];

const BookingsEditor = () => {
  const [bookings, setBookings] = useState<BookingDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadBookings = async () => {
    try {
      const data = await api.getBookings();
      setBookings(data as BookingDoc[]);
    } catch {
      toast({ title: 'Failed to load bookings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (booking: BookingDoc, status: string) => {
    setSavingId(booking.$id);
    try {
      await api.updateBookingStatus(booking.$id, status);
      toast({ title: 'Booking status updated' });
      await loadBookings();
    } catch {
      toast({ title: 'Failed to update booking', variant: 'destructive' });
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <div className="py-8 text-center text-muted-foreground">Loading bookings...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Bookings</h2>
        <Button variant="outline" onClick={loadBookings}>Refresh</Button>
      </div>

      <div className="space-y-3">
        {bookings.length === 0 && (
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">No bookings yet.</div>
        )}

        {bookings.map((booking) => (
          <div key={booking.$id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{booking.customer_name || 'Guest'}</p>
                <p className="text-sm text-muted-foreground">{booking.customer_phone || '-'} · {booking.booking_date || '-'} at {booking.booking_time || '-'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Party: {booking.party_size || 1}</Badge>
                <Badge>{booking.status || 'pending'}</Badge>
              </div>
            </div>

            <Select
              value={booking.status || 'pending'}
              onValueChange={(status) => updateStatus(booking, status)}
              disabled={savingId === booking.$id}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BOOKING_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsEditor;
