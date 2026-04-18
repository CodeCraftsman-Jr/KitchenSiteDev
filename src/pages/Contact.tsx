import Header from "@/components/Header";
import ContactUs from "@/components/ContactUs";
import OfficialDocuments from "@/components/OfficialDocuments";
import SEO from "@/components/SEO";
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
      <Header />
      <div className="pt-20">
        <ContactUs />
        <OfficialDocuments />
      </div>
    </div>
  );
};

export default Contact;
