import Header from "@/components/Header";
import ContactUs from "@/components/ContactUs";
import OfficialDocuments from "@/components/OfficialDocuments";
import SEO from "@/components/SEO";
import JSONLD from "@/components/JSONLD";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative font-sans text-foreground bg-background">
      <SEO
        title="Contact, Support and Certifications"
        description="Contact Vasanth's Kitchen for orders, support, partnership inquiries, and official certifications and compliance documents."
        path="/contact"
      />
      <JSONLD
        id="faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What are your operating hours?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We are open daily from 9:00 AM to 12:00 PM for breakfast and morning meals.',
              },
            },
            {
              '@type': 'Question',
              name: 'How can I place an order?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can order from our website menu, or use Swiggy and Zomato links available on the delivery options section.',
              },
            },
            {
              '@type': 'Question',
              name: 'How can I contact support quickly?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'For urgent help, call +91 9442434269 or message us on WhatsApp from the contact page.',
              },
            },
          ],
        }}
      />
      <Header />
      <div className="pt-20">
        <ContactUs />
        <OfficialDocuments />
      </div>
    </div>
  );
};

export default Contact;
