import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Shield, DollarSign, AlertTriangle, Scale } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      icon: <Users className="h-6 w-6 text-netflix-red" />,
      title: "Account Registration & Use",
      content: [
        "You must be at least 13 years old to use SoundInkube",
        "Provide accurate and complete information during registration",
        "You are responsible for maintaining the security of your account",
        "One person may not maintain multiple accounts",
        "Account sharing is prohibited and may result in termination",
        "You must notify us immediately of any unauthorized use"
      ]
    },
    {
      icon: <FileText className="h-6 w-6 text-netflix-red" />,
      title: "Intellectual Property & Content",
      content: [
        "You retain ownership of all original content you create",
        "By uploading content, you grant us a license to host and distribute it",
        "You must have all necessary rights to any content you upload",
        "Respect others' intellectual property rights",
        "Report any suspected copyright infringement immediately",
        "We reserve the right to remove infringing content"
      ]
    },
    {
      icon: <DollarSign className="h-6 w-6 text-netflix-red" />,
      title: "Payments & Transactions",
      content: [
        "All payments are processed through secure third-party providers",
        "Service fees are clearly disclosed before transactions",
        "Refunds are subject to our refund policy",
        "Users are responsible for applicable taxes",
        "Payment disputes should be reported within 30 days",
        "We may suspend accounts with unpaid balances"
      ]
    },
    {
      icon: <Shield className="h-6 w-6 text-netflix-red" />,
      title: "Platform Rules & Conduct",
      content: [
        "Treat all community members with respect and professionalism",
        "No harassment, discrimination, or abusive behavior",
        "Do not upload malicious software or harmful content",
        "Respect project deadlines and professional commitments",
        "No spam, unauthorized advertising, or promotional content",
        "Report violations to our community team immediately"
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-netflix-red" />,
      title: "Disclaimers & Limitations",
      content: [
        "Platform provided 'as is' without warranties of any kind",
        "We don't guarantee continuous, uninterrupted service",
        "Users collaborate at their own risk and discretion",
        "We're not responsible for disputes between users",
        "Technical issues may occasionally affect platform functionality",
        "Backup your important projects and files regularly"
      ]
    },
    {
      icon: <Scale className="h-6 w-6 text-netflix-red" />,
      title: "Termination & Account Closure",
      content: [
        "Either party may terminate these terms at any time",
        "We may suspend accounts for terms violations",
        "Account data will be retained according to our privacy policy",
        "Outstanding obligations survive account termination",
        "Appeal suspended accounts through our support system",
        "Deleted accounts cannot be recovered after 30 days"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Terms of
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              These terms govern your use of SoundInkube and define the rights and 
              responsibilities of all community members.
            </p>
            <div className="mt-6 text-sm text-gray-400">
              Last updated: January 25, 2024
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <Card className="netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="text-gray-300 space-y-4">
              <p className="text-lg">
                Welcome to SoundInkube! These Terms of Service ("Terms") govern your use 
                of our platform and services. By creating an account or using SoundInkube, 
                you agree to be bound by these Terms.
              </p>
              <p>
                SoundInkube is a platform that connects music professionals, artists, and 
                creators worldwide. We facilitate collaborations, provide educational resources, 
                and offer tools to help you succeed in the music industry.
              </p>
              <p className="text-sm text-gray-400">
                Please read these Terms carefully. If you don't agree with any part of these 
                Terms, you may not use our platform.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-xl">
                  {section.icon}
                  <span className="ml-3">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Availability */}
        <Card className="netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white text-xl">Service Availability & Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 space-y-4">
              <p>
                We strive to provide reliable service but cannot guarantee 100% uptime. 
                SoundInkube may be temporarily unavailable due to:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3"></div>
                  Scheduled maintenance and updates
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3"></div>
                  Technical issues beyond our control
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-netflix-red rounded-full mt-2 mr-3"></div>
                  Force majeure events
                </li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our 
                service with reasonable notice to users.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="netflix-card bg-gradient-to-br from-netflix-red/10 to-gray-900/50 backdrop-blur-sm mt-8 border-netflix-red/30">
          <CardHeader>
            <CardTitle className="text-white text-xl">Questions About These Terms?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 space-y-4">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong className="text-netflix-red">Email:</strong> legal@soundinkube.com</p>
                <p><strong className="text-netflix-red">Address:</strong> SoundInkube, Inc., 123 Music Ave, Los Angeles, CA 90028</p>
                <p><strong className="text-netflix-red">Business Hours:</strong> Monday-Friday, 9AM-5PM PST</p>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                These Terms are effective as of the date listed above and will remain in 
                effect until modified or terminated. We may update these Terms periodically, 
                and will notify users of significant changes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}