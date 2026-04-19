import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { CalendarCheck, Clock, Users } from "lucide-react";
import { useMemo, useState } from "react";

const BookTable = () => {
  const { toast } = useToast();
  const [partySize, setPartySize] = useState("2");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slots = useMemo(
    () => ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const date = formData.get("date")?.toString().trim();
    const notes = formData.get("notes")?.toString().trim();
    const parsedPartySize = partySize === '8+' ? 8 : Number(partySize);

    if (!name || !phone || !date || !timeSlot || Number.isNaN(parsedPartySize)) {
      toast({
        title: "Missing details",
        description: "Please fill name, phone, date, and preferred time slot.",
        variant: "destructive",
      });
      return;
    }

    if (!/^\+?[0-9\s-]{10,15}$/.test(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.createBooking({
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        booking_date: date,
        booking_time: timeSlot,
        party_size: parsedPartySize,
        special_request: notes,
        status: 'pending',
      });

      toast({
        title: "Booking request received",
        description: `We have received your booking for ${date} at ${timeSlot}.`,
      });

      event.currentTarget.reset();
      setPartySize("2");
      setTimeSlot("");
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "We could not submit your request now. Please call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEO
        title="Book Table"
        description="Reserve your table at Vasanth's Kitchen in a few quick steps. Choose your date, time, and party size."
        path="/book-table"
      />
      <Header />

      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-primary md:text-5xl">Book Your Table</h1>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Quick reservation for breakfast and morning meals. We will confirm your booking by call.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" placeholder="Enter your phone" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label>Time Slot</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {slots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label>Party Size</Label>
                    <Select value={partySize} onValueChange={setPartySize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4", "5", "6", "7", "8+"].map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Request</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="High chair, birthday setup, dietary notes, etc."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full md:w-auto" disabled={isSubmitting}>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Confirm Booking Request'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <p>Available slots: 9:00 AM to 11:30 AM</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 text-primary" />
                <p>Large groups are supported, but confirmation depends on availability.</p>
              </div>
              <p>
                Need urgent reservation help? Call <a className="font-semibold text-primary" href="tel:+919442434269">+91 9442434269</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BookTable;
