import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronDown, Book, Video, MessageCircle, Download, Users, Music, Calendar, CreditCard, Shield, Settings } from "lucide-react";

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: <Book className="text-white h-4 w-4" /> },
    { id: "getting-started", name: "Getting Started", icon: <Users className="text-white h-4 w-4" /> },
    { id: "collaboration", name: "Collaboration", icon: <Music className="text-white h-4 w-4" /> },
    { id: "booking", name: "Booking & Scheduling", icon: <Calendar className="text-white h-4 w-4" /> },
    { id: "payments", name: "Payments & Billing", icon: <CreditCard className="text-white h-4 w-4" /> },
    { id: "account", name: "Account & Settings", icon: <Settings className="text-white h-4 w-4" /> },
    { id: "security", name: "Security & Privacy", icon: <Shield className="text-white h-4 w-4" /> }
  ];

  const faqs = [
    {
      category: "getting-started",
      question: "How do I create an account on SoundInkube?",
      answer: "Creating an account is simple! Click 'Sign Up' in the top right corner, choose your account type (Client, Music Professional, or Artist Manager/Label), fill in your details, and verify your email. You'll be ready to start collaborating in minutes."
    },
    {
      category: "getting-started",
      question: "What's the difference between account types?",
      answer: "• Client: Perfect for artists and creators looking to hire professionals, book studios, and collaborate on projects.\n• Music Professional: For producers, engineers, musicians offering services and managing their business.\n• Artist Manager/Label: Designed for talent managers and record labels to oversee multiple artists and projects."
    },
    {
      category: "collaboration",
      question: "How do I start a collaboration project?",
      answer: "Navigate to the Collaboration tab and click 'New Project'. Define your project scope, set deadlines, invite team members, and establish your budget. You can manage all aspects of your project through our comprehensive project management tools."
    },
    {
      category: "collaboration",
      question: "How do real-time collaboration tools work?",
      answer: "Our platform includes integrated audio workstations, file sharing, real-time chat, and version control. Multiple users can work on the same project simultaneously, with all changes tracked and synchronized across devices."
    },
    {
      category: "booking",
      question: "How do I book a jam pad or studio space?",
      answer: "Browse available spaces in the Jam Pads section, use filters to find what you need, check availability, and book directly through the platform. You'll receive instant confirmation and can manage your bookings in 'My Bookings'."
    },
    {
      category: "payments",
      question: "How do payments work on SoundInkube?",
      answer: "We use secure escrow-style payments. Funds are held safely until project milestones are met. Multiple payment methods are accepted including credit cards, PayPal, and bank transfers. All transactions are protected by our payment guarantee."
    },
    {
      category: "account",
      question: "How do I change my account type?",
      answer: "Contact our support team to upgrade or change your account type. Some features may require verification of credentials or experience. Account changes typically take 24-48 hours to process."
    },
    {
      category: "security",
      question: "How is my data protected?",
      answer: "We use industry-standard encryption, secure servers, and regular security audits. Your personal information is never shared without permission, and all audio files are stored with enterprise-grade security measures."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const resources = [
    {
      icon: <Video className="text-white h-8 w-8 text-netflix-red" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all platform features",
      link: "#"
    },
    {
      icon: <Book className="text-white h-8 w-8 text-netflix-red" />,
      title: "User Manual",
      description: "Comprehensive documentation and best practices",
      link: "#"
    },
    {
      icon: <Download className="text-white h-8 w-8 text-netflix-red" />,
      title: "Quick Start Guide",
      description: "PDF guide to get you started in 10 minutes",
      link: "#"
    },
    {
      icon: <MessageCircle className="text-white h-8 w-8 text-netflix-red" />,
      title: "Community Forum",
      description: "Connect with other users and share tips",
      link: "#"
    }
  ];

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="text-white bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">
            <h1 className="text-white text-4xl lg:text-5xl font-bold text-white mb-6">
              Help &
              <span className="text-white block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                Support Center
              </span>
            </h1>
            <p className="text-white text-xl text-white max-w-3xl mx-auto">
              Find answers to common questions, learn how to use SoundInkube features, 
              and get the help you need to succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white relative">
          <Search className="text-white absolute left-4 top-4 h-5 w-5 text-white" />
          <Input
            placeholder="Search for help articles, tutorials, or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white netflix-input pl-12 text-lg py-6"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-white grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="text-white lg:col-span-1">
            <Card className="text-white netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-white">Browse by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeCategory === category.id
                          ? "netflix-button-primary"
                          : "text-white hover:text-white hover:bg-netflix-dark"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.icon}
                      <span className="text-white ml-2">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card className="text-white netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-white text-white">Quick Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  {resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.link}
                      className="text-white flex items-start space-x-3 p-3 rounded-lg hover:bg-netflix-dark/50 transition-colors"
                    >
                      {resource.icon}
                      <div>
                        <h4 className="text-white text-white font-medium text-sm">{resource.title}</h4>
                        <p className="text-white text-white text-xs">{resource.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="text-white lg:col-span-3">
            <div className="text-white mb-6">
              <h2 className="text-white text-2xl font-bold text-white mb-2">
                {activeCategory === "all" ? "Frequently Asked Questions" : 
                 categories.find(c => c.id === activeCategory)?.name + " FAQ"}
              </h2>
              <p className="text-white text-white">
                {filteredFaqs.length} article{filteredFaqs.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="text-white space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Collapsible key={index}>
                  <Card className="text-white netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="text-white cursor-pointer hover:bg-netflix-dark/20 transition-colors">
                        <div className="text-white flex items-center justify-between">
                          <CardTitle className="text-white text-white text-lg font-medium">
                            {faq.question}
                          </CardTitle>
                          <ChevronDown className="text-white h-5 w-5 text-white" />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="text-white pt-0">
                        <div className="text-white text-white whitespace-pre-line leading-relaxed">
                          {faq.answer}
                        </div>
                        <div className="text-white mt-4 pt-4 border-t border-gray-700">
                          <Badge className="text-white bg-netflix-red/20 text-netflix-red border-netflix-red/30 mr-2">
                            {categories.find(c => c.id === faq.category)?.name}
                          </Badge>
                          <span className="text-white text-xs text-white">
                            Was this helpful?
                          </span>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <Card className="text-white netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <CardContent className="text-white text-center py-12">
                  <Search className="text-white h-16 w-16 text-white mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold text-white mb-2">No articles found</h3>
                  <p className="text-white text-white mb-6">
                    Try adjusting your search terms or browse different categories
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                    className="text-white netflix-button-primary"
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <Card className="text-white netflix-card bg-gradient-to-br from-netflix-red/10 to-gray-900/50 backdrop-blur-sm mt-12 border-netflix-red/30">
          <CardContent className="text-white text-center py-12">
            <MessageCircle className="text-white h-16 w-16 text-netflix-red mx-auto mb-6" />
            <h3 className="text-white text-2xl font-bold text-white mb-4">Still need help?</h3>
            <p className="text-white text-white mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 
              get the most out of SoundInkube.
            </p>
            <div className="text-white flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = "/contact"}
                className="text-white netflix-button-primary"
              >
                <MessageCircle className="text-white h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="text-white netflix-button-secondary"
              >
                <Video className="text-white h-4 w-4 mr-2" />
                Schedule a Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}