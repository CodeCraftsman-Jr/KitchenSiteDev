import React, { useState } from 'react';
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
import { 
  ArrowLeft, 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CheckoutPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ isOpen, onClose }) => {
  const { cartItems, getTotalAmount, clearCart } = useCart();
  const { toast } = useToast();
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
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

  const sendToTelegram = async (orderData: any) => {
    try {
      // Telegram Bot API integration
      const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
      
      if (!botToken || !chatId) {
        console.warn('Telegram credentials not configured');
        return;
      }

      const message = `🍽️ *New Order Received*\n\n` +
        `👤 *Customer:* ${orderData.name}\n` +
        `📞 *Phone:* ${orderData.phone}\n` +
        `📍 *Address:* ${orderData.address}\n` +
        `🚚 *Delivery:* ${orderData.delivery}\n\n` +
        `*Items:*\n${orderData.items.map((item: any) => 
          `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
        ).join('\n')}\n\n` +
        `💰 *Total: ₹${orderData.total}*\n\n` +
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

  const handlePlaceOrder = async () => {
    if (!selectedDelivery) {
      toast({
        title: "Select Delivery Option",
        description: "Please choose a delivery method to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        delivery: selectedDelivery,
        items: cartItems,
        total: getTotalAmount(),
        notes: customerInfo.notes,
        timestamp: new Date().toISOString()
      };

      // Send to Telegram
      await sendToTelegram(orderData);

      if (selectedDelivery === 'own-delivery') {
        // Show WhatsApp message for own delivery
        const whatsappMessage = encodeURIComponent(
          `Hi! I'd like to place an order:\n\n` +
          `Items:\n${cartItems.map(item => 
            `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
          ).join('\n')}\n\n` +
          `Total: ₹${getTotalAmount()}\n` +
          `Name: ${customerInfo.name}\n` +
          `Phone: ${customerInfo.phone}\n` +
          `Address: ${customerInfo.address}\n` +
          `Notes: ${customerInfo.notes || 'None'}`
        );
        
        window.open(`https://wa.me/919442434269?text=${whatsappMessage}`, '_blank');
        
        toast({
          title: "Order Sent!",
          description: "Items are sent to kitchen manager. Kindly contact restaurant with the contact number below.",
          duration: 5000
        });
      } else {
        // Redirect to external platforms
        const platformUrls = {
          'swiggy': 'https://www.swiggy.com/city/pondicherry/vasanths-kitchen-kalapet-auroville-rest967996',
          'zomato': 'https://www.zomato.com/puducherry/vasanths-kitchen-auroville'
        };
        
        window.open(platformUrls[selectedDelivery as keyof typeof platformUrls], '_blank');
        
        toast({
          title: "Redirecting...",
          description: `Opening ${selectedDelivery} to complete your order.`,
        });
      }

      clearCart();
      onClose();
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
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
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>₹{getTotalAmount()}</span>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div>
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
          <div>
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

          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Restaurant Contact</h4>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>+91 9442434269</span>
            </div>
          </div>

          {/* Place Order Button */}
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
