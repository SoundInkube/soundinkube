import { Link } from "react-router-dom";
import { Music, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Marketplace", href: "/marketplace" },
        { name: "Collaboration", href: "/collaboration" },
        { name: "Jam Pads", href: "/jampads" },
        { name: "Music Schools", href: "/music-schools" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Help Center", href: "/help" },
        { name: "Careers", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "#" },
        { name: "DMCA", href: "#" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Blog", href: "#" },
        { name: "Forums", href: "#" },
        { name: "Discord", href: "#" },
        { name: "Newsletter", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-netflix-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Music className="h-8 w-8 text-netflix-red mr-2" />
              <span className="text-2xl font-bold text-white">
                SoundInkube
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Connecting music professionals and creators worldwide. 
              Build your network, collaborate on projects, and grow your music career.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-netflix-red transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-netflix-red transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-netflix-red transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-netflix-red transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center text-gray-400">
              <Mail className="h-5 w-5 mr-3 text-netflix-red" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a 
                  href="mailto:hello@soundinkube.com" 
                  className="text-xs hover:text-white transition-colors duration-200"
                >
                  hello@soundinkube.com
                </a>
              </div>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone className="h-5 w-5 mr-3 text-netflix-red" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <a 
                  href="tel:+15551234567" 
                  className="text-xs hover:text-white transition-colors duration-200"
                >
                  +1 (555) 123-SOUND
                </a>
              </div>
            </div>
            <div className="flex items-center text-gray-400">
              <MapPin className="h-5 w-5 mr-3 text-netflix-red" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-xs">
                  123 Music Ave<br />
                  Los Angeles, CA 90028
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest news, updates, and opportunities delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white text-sm focus:outline-none focus:border-netflix-red"
              />
              <button className="px-6 py-2 bg-netflix-red text-white text-sm font-medium rounded-r-md hover:bg-red-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} SoundInkube, Inc. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
              <span className="text-gray-400">
                Made with ❤️ for music creators
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}