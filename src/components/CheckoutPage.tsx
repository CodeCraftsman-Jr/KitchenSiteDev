import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { trackEvent } from '@/lib/analytics';
import { 
  ArrowLeft, 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle,
  AlertCircle,
  CreditCard,
  Wallet,
  Banknote,
} from 'lucide-react';

interface CheckoutPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ isOpen, onClose }) => {
  const { cartItems, getTotalAmount, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNumber, setOrderNumber] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryOptions = [
    {
      id: 'swiggy',
      name: 'Swiggy',
      icon: '🛵',
      time: '25-30 mins',
      fee: 'Free above ₹199',
      description: 'Order through Swiggy platform'
    },
    {
      id: 'zomato',
      name: 'Zomato',
      icon: '🍽️',
      time: '30-35 mins',
      fee: 'Free above ₹249',
      description: 'Order through Zomato platform'
    },
    {
      id: 'own-delivery',
      name: 'Own Delivery',
      icon: '🚚',
      time: '20-25 mins',
      fee: 'Free above ₹149',
      description: 'Direct delivery from restaurant'
    }
  ];

  const subtotal = getTotalAmount();
  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const deliveryFee = useMemo(() => {
    if (selectedDelivery === 'own-delivery') {
      return subtotal >= 149 ? 0 : 25;
    }
    if (selectedDelivery === 'swiggy') {
      return subtotal >= 199 ? 0 : 35;
    }
    if (selectedDelivery === 'zomato') {
      return subtotal >= 249 ? 0 : 40;
    }
    return 0;
  }, [selectedDelivery, subtotal]);
  const grandTotal = subtotal + tax + deliveryFee;

  const createOrderNo = () => `VK-${Date.now().toString().slice(-8)}`;

  const sendToTelegram = async (orderData: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    delivery: string;
    paymentMethod: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    notes: string;
    orderNo: string;
  }) => {
    try {
      // Telegram Bot API integration
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      
      if (!botToken || !chatId) {
        console.warn('Telegram credentials not configured');
        return;
      }

      const message = `🍽️ *New Order Received*\n\n` +
        `👤 *Customer:* ${orderData.name}\n` +
        `📞 *Phone:* ${orderData.phone}\n` +
        `📧 *Email:* ${orderData.email || 'N/A'}\n` +
        `📍 *Address:* ${orderData.address}\n` +
        `🚚 *Delivery:* ${orderData.delivery}\n\n` +
        `💳 *Payment:* ${orderData.paymentMethod}\n` +
        `*Items:*\n${orderData.items.map((item) => 
          `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
        ).join('\n')}\n\n` +
        `🧾 *Subtotal:* ₹${orderData.subtotal}\n` +
        `📦 *Delivery:* ₹${orderData.deliveryFee}\n` +
        `🧮 *Tax:* ₹${orderData.tax}\n` +
        `💰 *Total:* ₹${orderData.total}\n` +
        `🔖 *Order No:* ${orderData.orderNo}\n\n` +
        `📝 *Notes:* ${orderData.notes || 'None'}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });
    } catch (error) {
      console.error('Failed to send to Telegram:', error);
    }
  };

  const validateStepOne = () => {
    if (!selectedDelivery) {
      toast({
        title: 'Select delivery option',
        description: 'Please choose your delivery method to continue.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const validateStepTwo = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: 'Missing information',
        description: 'Please fill your name and phone number.',
        variant: 'destructive',
      });
      return false;
    }

    if (!/^\+?[0-9\s-]{10,15}$/.test(customerInfo.phone)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid phone number.',
        variant: 'destructive',
      });
      return false;
    }

    if (selectedDelivery === 'own-delivery' && !customerInfo.address.trim()) {
      toast({
        title: 'Address required',
        description: 'Please provide address for own delivery.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const verifyOnlinePayment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      transactionRef: `TXN-${Date.now().toString().slice(-10)}`,
    };
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    trackEvent('begin_checkout', {
      value: grandTotal,
      items: cartItems.length,
      delivery_type: selectedDelivery,
      payment_method: paymentMethod,
    });

    try {
      const orderNo = createOrderNo();

      const order = await api.createOrder({
        order_no: orderNo,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email,
        address: customerInfo.address,
        delivery_type: selectedDelivery,
        notes: customerInfo.notes,
        subtotal,
        tax,
        delivery_fee: deliveryFee,
        discount: 0,
        grand_total: grandTotal,
        order_status: 'pending',
        payment_status: paymentMethod === 'cod' ? 'pending' : 'initiated',
        payment_method: paymentMethod,
        placed_at: new Date().toISOString(),
      });

      await api.createOrderItems(
        cartItems.map((item) => ({
          order_id: order.$id,
          item_id: item.id,
          item_name: item.name,
          unit_price: item.price,
          quantity: item.quantity,
          line_total: item.price * item.quantity,
        }))
      );

      let paymentStatus = 'pending';
      let transactionRef = '';

      if (paymentMethod !== 'cod') {
        const paymentResult = await verifyOnlinePayment();
        if (!paymentResult.success) {
          throw new Error('Payment verification failed.');
        }

        paymentStatus = 'paid';
        transactionRef = paymentResult.transactionRef;
      }

      await api.createPayment({
        order_id: order.$id,
        payment_method: paymentMethod,
        amount: grandTotal,
        payment_status: paymentStatus,
        transaction_ref: transactionRef,
        paid_at: paymentStatus === 'paid' ? new Date().toISOString() : '',
      });

      await api.updateOrderStatus(order.$id, 'confirmed', paymentStatus);

      const orderData = {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email,
        address: customerInfo.address,
        delivery: selectedDelivery,
        paymentMethod,
        items: cartItems,
        subtotal,
        tax,
        deliveryFee,
        total: grandTotal,
        notes: customerInfo.notes,
        timestamp: new Date().toISOString(),
        orderNo,
      };

      // Send to Telegram
      await sendToTelegram(orderData);

      setOrderNumber(orderNo);
      trackEvent('payment_success', {
        value: grandTotal,
        payment_method: paymentMethod,
        order_no: orderNo,
      });
      toast({
        title: 'Order placed successfully',
        description: `Your order ${orderNo} is confirmed.`,
      });

      clearCart();
    } catch (error) {
      trackEvent('payment_failed', {
        value: grandTotal,
        payment_method: paymentMethod,
      });
      toast({
        title: 'Order failed',
        description: 'We could not process your order now. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            Checkout
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-sm">{item.name} x{item.quantity}</span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant={step >= 1 ? 'default' : 'secondary'}>1. Delivery</Badge>
            <Badge variant={step >= 2 ? 'default' : 'secondary'}>2. Customer</Badge>
            <Badge variant={step >= 3 ? 'default' : 'secondary'}>3. Payment</Badge>
          </div>

          {/* Delivery Options */}
          <div className={step === 1 ? '' : 'opacity-60'}>
            <h3 className="font-semibold mb-3">Choose Delivery Option</h3>
            <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery}>
              {deliveryOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {option.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            {option.fee}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedDelivery === 'own-delivery' && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Own Delivery Benefits:</p>
                    <p>Since automated delivery is coming soon, kindly send your items through WhatsApp or order through Zomato or Swiggy with no struggle. The benefit you get with own delivery is no GST and delivery charges are comparatively less than Zomato and Swiggy.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Customer Information */}
          <div className={step === 2 ? '' : 'opacity-60'}>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your delivery address"
                />
              </div>
              <div>
                <Label htmlFor="notes">Special Instructions</Label>
                <Textarea
                  id="notes"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special requests or notes"
                />
              </div>
            </div>
          </div>

          <div className={step === 3 ? '' : 'opacity-60'}>
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer"><Banknote className="h-4 w-4" />Cash on Delivery</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer"><Wallet className="h-4 w-4" />UPI</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer"><CreditCard className="h-4 w-4" />Card</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Restaurant Contact</h4>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>+91 9442434269</span>
            </div>
          </div>

          {/* Place Order Button */}
          {!orderNumber ? (
            <div className="flex gap-2">
              {step > 1 && (
                <Button variant="outline" className="w-full" onClick={() => setStep((prev) => Math.max(1, (prev - 1) as 1 | 2 | 3))}>
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => {
                    if (step === 1 && !validateStepOne()) return;
                    if (step === 2 && !validateStepTwo()) return;
                    setStep((prev) => Math.min(3, (prev + 1) as 1 | 2 | 3));
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold text-green-800">
                <CheckCircle className="h-5 w-5" />
                Order Confirmed
              </div>
              <p className="text-sm text-green-700">Your order number is <span className="font-bold">{orderNumber}</span>.</p>
              <div className="mt-4 flex gap-2">
                <Button className="w-full" onClick={() => {
                  setOrderNumber('');
                  onClose();
                }}>
                  Done
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
