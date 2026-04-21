import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const contentMap: Record<string, { title: string; description: string; sections: string[] }> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information.',
    sections: [
      'We collect order and contact details required to fulfill orders and provide support.',
      'We do not sell your personal data to third parties.',
      'Payments are processed securely through approved payment methods.',
      'You may contact us to update or remove your personal information from our records.',
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    description: 'General terms for using Vasanth\'s Kitchen website and services.',
    sections: [
      'By using this website, you agree to our ordering, payment, and service terms.',
      'Menu availability and prices may change without prior notice.',
      'We reserve the right to cancel or reject fraudulent or invalid orders.',
      'For disputes, please contact support first for resolution.',
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    description: 'Conditions and timelines for refunds and cancellations.',
    sections: [
      'Refunds are processed for eligible failed payments or non-fulfilled confirmed orders.',
      'Cancelled confirmed orders may incur charges based on preparation status.',
      'Refund timelines depend on payment method and banking channels.',
      'To request a refund, contact support with order number and transaction details.',
    ],
  },
  'shipping-delivery': {
    title: 'Shipping and Delivery Policy',
    description: 'Delivery scope, timings, and service commitments.',
    sections: [
      'Delivery service is available in supported zones around Puducherry.',
      'Estimated delivery time depends on order load, traffic, and weather conditions.',
      'Delivery charges and minimum order values may vary by platform and zone.',
      'Customers should ensure accurate address and phone details for successful delivery.',
    ],
  },
};

const PolicyPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');
  const page = useMemo(() => contentMap[slug] || contentMap.terms, [slug]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEO title={page.title} description={page.description} path={`/${slug}`} />
      <Header />

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-3 text-4xl font-bold text-primary">{page.title}</h1>
        <p className="mb-8 text-muted-foreground">{page.description}</p>

        <div className="space-y-4">
          {page.sections.map((section) => (
            <div key={section} className="rounded-lg border bg-white p-5 shadow-sm">
              <p className="text-foreground">{section}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PolicyPage;
