import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: <Shield className="text-white h-6 w-6 text-netflix-red" />,
      title: "Information We Collect",
      content: [
        "Account information (name, email, profile details)",
        "Usage data (how you interact with our platform)",
        "Device information (browser type, IP address)",
        "Communication data (messages, support tickets)",
        "Payment information (processed securely through third parties)",
        "Audio files and project data you upload"
      ]
    },
    {
      icon: <Eye className="text-white h-6 w-6 text-netflix-red" />,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our platform services",
        "Facilitate connections between users",
        "Process payments and transactions",
        "Send important updates and notifications",
        "Provide customer support",
        "Analyze usage patterns to enhance user experience",
        "Ensure platform security and prevent fraud"
      ]
    },
    {
      icon: <Users className="text-white h-6 w-6 text-netflix-red" />,
      title: "Information Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Profile information is visible to other users as needed for collaboration",
        "Project data is shared only with your chosen collaborators",
        "We may share anonymized usage data for analytics",
        "Legal compliance may require information disclosure",
        "Service providers help us operate the platform securely"
      ]
    },
    {
      icon: <Lock className="text-white h-6 w-6 text-netflix-red" />,
      title: "Data Security",
      content: [
        "End-to-end encryption for sensitive communications",
        "Secure cloud storage for all audio files and projects",
        "Regular security audits and vulnerability assessments",
        "Two-factor authentication available for all accounts",
        "Industry-standard SSL encryption for all data transmission",
        "Limited access controls for our staff and systems"
      ]
    },
    {
      icon: <FileText className="text-white h-6 w-6 text-netflix-red" />,
      title: "Your Rights",
      content: [
        "Access and download your personal data",
        "Correct inaccurate information in your profile",
        "Delete your account and associated data",
        "Control privacy settings and data sharing preferences",
        "Opt-out of non-essential communications",
        "Request data portability to other platforms"
      ]
    },
    {
      icon: <Mail className="text-white h-6 w-6 text-netflix-red" />,
      title: "Contact & Updates",
      content: [
        "We'll notify you of significant privacy policy changes",
        "Contact privacy@soundinkube.com for questions",
        "Policy updates are posted on this page",
        "You can request clarification on any privacy matters",
        "Data protection officer available for GDPR inquiries",
        "Regular transparency reports published annually"
      ]
    }
  ];

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="text-white bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">
            <h1 className="text-white text-4xl lg:text-5xl font-bold text-white mb-6">
              Privacy
              <span className="text-white block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-white text-xl text-white max-w-3xl mx-auto">
              Your privacy is fundamental to us. This policy explains how we collect, use, 
              and protect your personal information on SoundInkube.
            </p>
            <div className="text-white mt-6 text-sm text-white">
              Last updated: January 25, 2024
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <Card className="text-white netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm mb-8">
          <CardContent className="text-white p-8">
            <div className="text-white text-white space-y-4">
              <p className="text-white text-lg">
                At SoundInkube, we believe in transparency about how we handle your data. 
                This Privacy Policy describes our practices regarding the collection, use, 
                and disclosure of your information when you use our platform.
              </p>
              <p>
                We are committed to protecting your privacy and ensuring you have control 
                over your personal information. By using SoundInkube, you agree to the 
                practices described in this policy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy Sections */}
        <div className="text-white space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="text-white netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-white text-xl">
                  {section.icon}
                  <span className="text-white ml-3">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-white space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-white flex items-start text-white">
                      <div className="text-white w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <Card className="text-white netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white text-white text-xl">International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white text-white space-y-4">
              <p>
                SoundInkube operates globally, and your information may be transferred to and 
                processed in countries other than your country of residence. We ensure appropriate 
                safeguards are in place for international transfers, including:
              </p>
              <ul className="text-white space-y-2 ml-4">
                <li className="text-white flex items-start">
                  <div className="text-white w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3"></div>
                  Standard contractual clauses approved by the European Commission
                </li>
                <li className="text-white flex items-start">
                  <div className="text-white w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3"></div>
                  Adequacy decisions by relevant data protection authorities
                </li>
                <li className="text-white flex items-start">
                  <div className="text-white w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3"></div>
                  Certification under approved international frameworks
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="text-white netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white text-white text-xl">Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white text-white space-y-4">
              <p>
                SoundInkube is not intended for use by children under 13 years of age. 
                We do not knowingly collect personal information from children under 13. 
                If you are a parent or guardian and believe your child has provided us with 
                personal information, please contact us immediately.
              </p>
              <p>
                For users between 13 and 18 years of age, we recommend parental guidance 
                and supervision when using our platform, especially when engaging in 
                collaborative projects or communications with other users.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="text-white netflix-card bg-gradient-to-br from-netflix-red/10 to-gray-900/50 backdrop-blur-sm mt-8 border-netflix-red/30">
          <CardHeader>
            <CardTitle className="text-white text-white text-xl">Questions About This Policy?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white text-white space-y-4">
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, 
                please don't hesitate to contact us:
              </p>
              <div className="text-white space-y-2">
                <p><strong className="text-white text-netflix-red">Email:</strong> privacy@soundinkube.com</p>
                <p><strong className="text-white text-netflix-red">Address:</strong> SoundInkube, Inc., 123 Music Ave, Los Angeles, CA 90028</p>
                <p><strong className="text-white text-netflix-red">Data Protection Officer:</strong> dpo@soundinkube.com</p>
              </div>
              <p className="text-white text-sm text-white mt-6">
                We typically respond to privacy inquiries within 48 hours and are committed 
                to resolving any concerns you may have about your personal information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}