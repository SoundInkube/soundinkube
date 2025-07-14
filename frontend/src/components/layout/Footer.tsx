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
    <footer className="text-white bg-netflix-black border-t border-gray-800">
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="text-white lg:col-span-1">
            <Link to="/" className="text-white flex items-center mb-4">
              <Music className="text-white h-8 w-8 text-netflix-red mr-2" />
              <span className="text-white text-2xl font-bold text-white">
                SoundInkube
              </span>
            </Link>
            <p className="text-white text-white text-sm mb-6 leading-relaxed">
              Connecting music professionals and creators worldwide. 
              Build your network, collaborate on projects, and grow your music career.
            </p>
            
            {/* Social Media Links */}
            <div className="text-white flex space-x-4">
              <a
                href="#"
                className="text-white text-white hover:text-netflix-red transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="text-white h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white text-white hover:text-netflix-red transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="text-white h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white text-white hover:text-netflix-red transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="text-white h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white text-white hover:text-netflix-red transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="text-white h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="text-white lg:col-span-1">
              <h3 className="text-white text-white font-semibold mb-4">{section.title}</h3>
              <ul className="text-white space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-white text-white hover:text-white transition-colors duration-200 text-sm"
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
        <div className="text-white border-t border-gray-800 mt-12 pt-8">
          <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-white flex items-center text-white">
              <Mail className="text-white h-5 w-5 mr-3 text-netflix-red" />
              <div>
                <p className="text-white text-sm font-medium">Email</p>
                <a 
                  href="mailto:hello@soundinkube.com" 
                  className="text-white text-xs hover:text-white transition-colors duration-200"
                >
                  hello@soundinkube.com
                </a>
              </div>
            </div>
            <div className="text-white flex items-center text-white">
              <Phone className="text-white h-5 w-5 mr-3 text-netflix-red" />
              <div>
                <p className="text-white text-sm font-medium">Phone</p>
                <a 
                  href="tel:+15551234567" 
                  className="text-white text-xs hover:text-white transition-colors duration-200"
                >
                  +1 (555) 123-SOUND
                </a>
              </div>
            </div>
            <div className="text-white flex items-center text-white">
              <MapPin className="text-white h-5 w-5 mr-3 text-netflix-red" />
              <div>
                <p className="text-white text-sm font-medium">Address</p>
                <p className="text-white text-xs">
                  123 Music Ave<br />
                  Los Angeles, CA 90028
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-white border-t border-gray-800 pt-8 mb-8">
          <div className="text-white max-w-md">
            <h3 className="text-white text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-white text-white text-sm mb-4">
              Get the latest news, updates, and opportunities delivered to your inbox.
            </p>
            <div className="text-white flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="text-white flex-1 px-4 py-2 bg-netflix-dark border border-gray-700 rounded-l-md text-white text-sm focus:outline-none focus:border-netflix-red"
              />
              <button className="text-white px-6 py-2 bg-netflix-red text-white text-sm font-medium rounded-r-md hover:bg-red-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-white border-t border-gray-800 pt-8">
          <div className="text-white flex flex-col md:flex-row justify-between items-center">
            <div className="text-white text-white text-sm mb-4 md:mb-0">
              © {currentYear} SoundInkube, Inc. All rights reserved.
            </div>
            <div className="text-white flex flex-wrap items-center space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-white text-white hover:text-white transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-white text-white hover:text-white transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                to="/contact"
                className="text-white text-white hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
              <span className="text-white text-white">
                Made with ❤️ for music creators
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}