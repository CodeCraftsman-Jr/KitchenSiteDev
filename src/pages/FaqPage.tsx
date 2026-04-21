import Header from '@/components/Header';
import SEO from '@/components/SEO';
import JSONLD from '@/components/JSONLD';
import { Card, CardContent } from '@/components/ui/card';

const faqItems = [
  {
    q: 'What are your operating hours?',
    a: 'We are open daily from 9:00 AM to 12:00 PM for breakfast and morning meals.',
  },
  {
    q: 'How can I place an order?',
    a: 'You can order directly from our website menu and checkout flow, or use Swiggy and Zomato.',
  },
  {
    q: 'Do you support table booking?',
    a: 'Yes, use the Book Table page to request your slot. Our team confirms by phone.',
  },
  {
    q: 'How can I contact support quickly?',
    a: 'Call +91 9442434269 or use WhatsApp from the contact page.',
  },
];

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEO
        title="Frequently Asked Questions"
        description="Find quick answers about ordering, delivery, dine-in booking, and support at Vasanth's Kitchen."
        path="/faq"
      />
      <JSONLD
        id="faq-page"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />
      <Header />

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-primary">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <Card key={item.q} className="shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-primary">{item.q}</h2>
                <p className="text-muted-foreground">{item.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
