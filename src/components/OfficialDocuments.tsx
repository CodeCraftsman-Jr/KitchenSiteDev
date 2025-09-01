import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Award, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OfficialDocuments = () => {
  const { toast } = useToast();

  const handleDownload = (docPath: string, docName: string) => {
    try {
      const link = document.createElement('a');
      link.href = docPath;
      link.download = docName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: `Downloading ${docName}...`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the document. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewExternal = (docPath: string, docName: string) => {
    try {
      window.open(docPath, '_blank');
      toast({
        title: "Opening Document",
        description: `Opening ${docName} in new window...`,
      });
    } catch (error) {
      toast({
        title: "View Failed",
        description: "Unable to open the document. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRequestVerification = () => {
    const email = "vasanthan.ngc@gmail.com";
    const subject = "Document Verification Request - Vasanth's Kitchen";
    const body = "Dear Vasanth's Kitchen Team,\n\nI would like to request verification of your official documents and certifications.\n\nPlease provide verification for:\n- FSSAI License\n- GST Registration\n- Fire Safety Certificate\n- ISO 22000 Certification\n\nThank you.";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    toast({
      title: "Verification Request",
      description: "Opening email client to send verification request...",
    });
  };
  const documents = [
    {
      id: 1,
      title: "FSSAI Certificate",
      description: "Food Safety and Standards Authority of India License",
      number: "10019022001234",
      status: "Active",
      validUntil: "March 2025",
      issueDate: "March 2024",
      renewalHistory: ["March 2023", "March 2022", "March 2021"],
      filePath: "/src/assets/documents/Fssai/2025 licence.pdf",
      icon: Shield,
      color: "text-green-600"
    },
    {
      id: 2,
      title: "GST Registration",
      description: "Goods and Services Tax Registration Certificate",
      number: "33AABCU9603R1ZV",
      status: "Active",
      validUntil: "Ongoing",
      issueDate: "January 2024",
      renewalHistory: ["Annual filing completed"],
      filePath: "/src/assets/documents/GST_Registration.pdf",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      id: 3,
      title: "Fire Safety Certificate",
      description: "Fire Department Safety Clearance Certificate",
      number: "FSC/2024/0789",
      status: "Active",
      validUntil: "January 2025",
      issueDate: "January 2024",
      renewalHistory: ["January 2023", "January 2022"],
      filePath: "/src/assets/documents/Fire_Safety_Certificate.pdf",
      icon: Shield,
      color: "text-red-600"
    },
    {
      id: 4,
      title: "ISO 22000 Certification",
      description: "Food Safety Management System Certification",
      number: "ISO22000/2024/456",
      status: "Active",
      validUntil: "June 2025",
      issueDate: "June 2024",
      renewalHistory: ["June 2021 (3-year certification)"],
      filePath: "/src/assets/documents/ISO_22000_Certificate.pdf",
      icon: Award,
      color: "text-indigo-600"
    }
  ];

  const certifications = [
    "FSSAI Licensed Kitchen Facility - Valid until March 2025",
    "ISO 22000:2018 Food Safety Management System",
    "GST Registered Business - Compliant with Tax Regulations",
    "Fire Safety Clearance - Annual Inspections Completed",
    "Regular Health Department Inspections",
    "Student-Focused Healthy Food Standards"
  ];

  return (
    <section id="documents" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Official Documents & Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We maintain the highest standards of compliance and safety. All our licenses and certifications are up-to-date and regularly renewed.
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {documents.map((doc) => (
            <Card key={doc.id} className="shadow-card hover:shadow-warm transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-warm flex items-center justify-center ${doc.color}`}>
                    <doc.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary mb-1">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                  <Badge variant={doc.status === "Active" ? "default" : "secondary"} className="bg-green-100 text-green-800">
                    {doc.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">License Number:</span>
                    <span className="font-mono text-primary">{doc.number}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Issue Date:</span>
                    <span className="font-semibold">{doc.issueDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valid Until:</span>
                    <span className="font-semibold">{doc.validUntil}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Renewal History:</span>
                    <div className="mt-1">
                      {doc.renewalHistory.map((renewal, index) => (
                        <div key={index} className="text-xs text-gray-600 ml-2">
                          • {renewal}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(doc.filePath, `${doc.title}.pdf`)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewExternal(doc.filePath, doc.title)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications Summary */}
        <div className="bg-background rounded-2xl p-8 shadow-card max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">Our Certifications & Standards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-muted-foreground">{cert}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              All documents are verified and maintained as per regulatory requirements. 
              Last updated: March 2024
            </p>
            <Button variant="hero" onClick={handleRequestVerification}>
              Request Document Verification
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficialDocuments;