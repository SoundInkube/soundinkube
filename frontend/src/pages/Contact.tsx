import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageCircle, HeadphonesIcon } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", category: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-netflix-red" />,
      title: "Email Support",
      description: "Get help with your account, billing, or technical issues",
      contact: "support@soundinkube.com",
      responseTime: "Usually responds within 4 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-netflix-red" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-SOUND",
      responseTime: "Available Mon-Fri, 9AM-6PM PST"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-netflix-red" />,
      title: "Live Chat",
      description: "Get instant help through our chat system",
      contact: "Available in-app",
      responseTime: "Average response: 2 minutes"
    },
    {
      icon: <MapPin className="h-6 w-6 text-netflix-red" />,
      title: "Headquarters",
      description: "Visit us at our Los Angeles office",
      contact: "123 Music Ave, Los Angeles, CA 90028",
      responseTime: "By appointment only"
    }
  ];

  const departments = [
    {
      title: "General Support",
      email: "support@soundinkube.com",
      description: "Account help, technical issues, general questions"
    },
    {
      title: "Business Partnerships",
      email: "partnerships@soundinkube.com",
      description: "Collaborations, integrations, business opportunities"
    },
    {
      title: "Press & Media",
      email: "press@soundinkube.com",
      description: "Media inquiries, press releases, interviews"
    },
    {
      title: "Legal & Privacy",
      email: "legal@soundinkube.com",
      description: "Terms of service, privacy policy, legal matters"
    }
  ];

  return (
    <div className="min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Contact
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Support
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Need help? Have a question? Want to partner with us? We're here to help 
              and would love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-400">We'll get back to you as soon as possible</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="netflix-label">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                        className="netflix-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="netflix-label">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                        className="netflix-input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="netflix-label">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger className="netflix-input">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-netflix-dark border-gray-600">
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="netflix-label">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Brief description of your inquiry"
                      required
                      className="netflix-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="netflix-label">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Provide as much detail as possible about your inquiry..."
                      required
                      className="netflix-input min-h-32"
                    />
                  </div>

                  <Button type="submit" className="w-full netflix-button-primary">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{info.description}</p>
                          <p className="text-netflix-red font-medium mb-1">{info.contact}</p>
                          <p className="text-xs text-gray-500">{info.responseTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Department Contacts */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Department Contacts</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card key={index} className="netflix-card bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-white mb-1">{dept.title}</h4>
                      <p className="text-netflix-red text-sm font-medium mb-1">{dept.email}</p>
                      <p className="text-gray-400 text-xs">{dept.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <Card className="netflix-card bg-gradient-to-br from-netflix-red/10 to-gray-900/50 backdrop-blur-sm border-netflix-red/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-netflix-red" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-4">
                    <p className="text-sm text-gray-400">
                      <HeadphonesIcon className="h-4 w-4 inline mr-1" />
                      24/7 support available through our in-app chat system
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">How quickly do you respond to support requests?</h4>
                    <p className="text-gray-400 text-sm">We aim to respond to all support requests within 4 hours during business hours, and within 24 hours on weekends.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Do you offer phone support?</h4>
                    <p className="text-gray-400 text-sm">Yes! Phone support is available Monday-Friday, 9AM-6PM PST. You can also use our live chat feature for immediate assistance.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Can I schedule a demo or consultation?</h4>
                    <p className="text-gray-400 text-sm">Absolutely! Contact our partnerships team to schedule a personalized demo or consultation for your organization.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">How do I report a bug or technical issue?</h4>
                    <p className="text-gray-400 text-sm">Use our contact form above with the "Technical Support" category, or email support@soundinkube.com with detailed information about the issue.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Do you offer enterprise or educational discounts?</h4>
                    <p className="text-gray-400 text-sm">Yes! We offer special pricing for educational institutions and enterprise customers. Contact partnerships@soundinkube.com for details.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">How can I provide feedback or suggestions?</h4>
                    <p className="text-gray-400 text-sm">We love hearing from our community! Use the contact form with "Feedback & Suggestions" category, or join our community forums.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}