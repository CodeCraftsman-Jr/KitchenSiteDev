import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type OrderDoc = {
  $id: string;
  order_no?: string;
  customer_name?: string;
  customer_phone?: string;
  delivery_type?: string;
  grand_total?: number;
  order_status?: string;
  payment_status?: string;
  payment_method?: string;
  placed_at?: string;
};

const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

const OrdersEditor = () => {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data as OrderDoc[]);
    } catch {
      toast({ title: 'Failed to load orders', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (order: OrderDoc, status: string) => {
    setSavingId(order.$id);
    try {
      await api.updateOrderStatus(order.$id, status, order.payment_status || 'pending');
      toast({ title: `Order ${order.order_no || order.$id} updated` });
      await loadOrders();
    } catch {
      toast({ title: 'Failed to update order', variant: 'destructive' });
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <div className="py-8 text-center text-muted-foreground">Loading orders...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Orders</h2>
        <Button variant="outline" onClick={loadOrders}>Refresh</Button>
      </div>

      <div className="space-y-3">
        {orders.length === 0 && (
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">No orders yet.</div>
        )}

        {orders.map((order) => (
          <div key={order.$id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{order.order_no || order.$id}</p>
                <p className="text-sm text-muted-foreground">{order.customer_name || 'Customer'} · {order.customer_phone || '-'}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{order.delivery_type || 'delivery'}</Badge>
                <Badge variant={order.payment_status === 'paid' ? 'default' : 'outline'}>{order.payment_status || 'pending'}</Badge>
                <Badge variant="outline">{order.payment_method || 'cod'}</Badge>
                <Badge>{`₹${order.grand_total || 0}`}</Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={order.order_status || 'pending'}
                onValueChange={(status) => updateStatus(order, status)}
                disabled={savingId === order.$id}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground">Placed: {order.placed_at || '-'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersEditor;
