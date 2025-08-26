import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Award, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OfficialDocuments = () => {
  const { toast } = useToast();

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
    // In a real app, this would trigger the actual download
  };

  const handleViewExternal = (docName: string) => {
    toast({
      title: "Opening Document",
      description: `Opening ${docName} in new window...`,
    });
    // In a real app, this would open the document in a new window
  };
  const documents = [
    {
      id: 1,
      title: "FSSAI License",
      description: "Food Safety and Standards Authority of India License",
      number: "10019022001234",
      status: "Active",
      validUntil: "March 2025",
      icon: Shield,
      color: "text-green-600"
    },
    {
      id: 2,
      title: "GST Registration",
      description: "Goods and Services Tax Registration Certificate",
      number: "27AABCU9603R1ZM",
      status: "Active",
      validUntil: "Ongoing",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      id: 3,
      title: "Trade License",
      description: "Municipal Corporation Trade License",
      number: "TL/2024/12345",
      status: "Active",
      validUntil: "December 2024",
      icon: Award,
      color: "text-purple-600"
    },
    {
      id: 4,
      title: "Fire Safety Certificate",
      description: "Fire Department Safety Clearance Certificate",
      number: "FSC/2024/0789",
      status: "Active",
      validUntil: "January 2025",
      icon: Shield,
      color: "text-red-600"
    },
    {
      id: 5,
      title: "ISO 22000 Certification",
      description: "Food Safety Management System Certification",
      number: "ISO22000/2024/456",
      status: "Active",
      validUntil: "June 2025",
      icon: Award,
      color: "text-indigo-600"
    },
    {
      id: 6,
      title: "Halal Certification",
      description: "Halal Food Certification Authority",
      number: "HC/2024/789",
      status: "Active",
      validUntil: "August 2024",
      icon: Shield,
      color: "text-emerald-600"
    }
  ];

  const certifications = [
    "FSSAI Licensed Kitchen Facility",
    "ISO 22000:2018 Food Safety Management",
    "HACCP Certified Processes",
    "Halal Certified Kitchen",
    "Regular Health Department Inspections",
    "Comprehensive Insurance Coverage"
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
                    <span className="text-muted-foreground">Valid Until:</span>
                    <span className="font-semibold">{doc.validUntil}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(doc.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewExternal(doc.name)}
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
            <Button variant="hero">
              Request Document Verification
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficialDocuments;