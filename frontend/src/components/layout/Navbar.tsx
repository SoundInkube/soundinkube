import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Exact navigation items based on user role as specified
  const getNavigationItems = () => {
    if (!isAuthenticated || !user) {
      return [];
    }

    if (user.role === "CLIENT") {
      return [
        { name: "Hire Music Professionals", href: "/hire-professionals", description: "Find music talent" },
        { name: "Find Music Schools", href: "/find-music-schools", description: "Discover music education" }
      ];
    } else if (user.role === "MUSIC_PROFESSIONAL") {
      return [
        { name: "Collaboration", href: "/collaboration", description: "Work together" },
        { name: "Marketplace", href: "/marketplace", description: "Buy/sell equipment" },
        { name: "Jampads", href: "/jampads", description: "Book studio spaces" },
        { name: "Gigs", href: "/gigs", description: "Find work opportunities" },
        { name: "Music Schools", href: "/music-schools", description: "Learn & teach" }
      ];
    } else if (user.role === "ARTIST_MANAGER") {
      return [
        { name: "Manage Talent", href: "/manage-talent", description: "Artist management" },
        { name: "Scout Artists", href: "/scout-artists", description: "Discover new talent" },
        { name: "Dashboard", href: "/dashboard", description: "Business operations" }
      ];
    }

    return [];
  };

  // Get role-specific profile dropdown items
  const getProfileDropdownItems = () => {
    if (!isAuthenticated || !user) {
      return [];
    }

    if (user.role === "CLIENT") {
      return [
        { name: "Profile Settings", href: "/profile" },
        { name: "My Bookings", href: "/my-bookings" },
        { name: "Saved Professionals", href: "/saved-professionals" },
        { name: "Payment History", href: "/payment-history" }
      ];
    } else if (user.role === "MUSIC_PROFESSIONAL") {
      return [
        { name: "Profile Settings", href: "/profile" },
        { name: "My Equipment Listings", href: "/my-listings" },
        { name: "My Collaborations", href: "/my-collaborations" },
        { name: "My Students", href: "/my-students" },
        { name: "Analytics", href: "/analytics" }
      ];
    } else if (user.role === "ARTIST_MANAGER") {
      return [
        { name: "Profile Settings", href: "/profile" },
        { name: "Manage Artists", href: "/manage-artists" },
        { name: "Contracts", href: "/contracts" },
        { name: "Revenue Analytics", href: "/revenue-analytics" }
      ];
    }

    return [];
  };

  const navigationItems = getNavigationItems();
  const profileDropdownItems = getProfileDropdownItems();

  return (
    <nav className="netflix-navbar border-b border-gray-800">
      <div className="netflix-container">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-netflix-red">
                SoundInkube
              </span>
            </Link>
            
            {/* Desktop Navigation - Role-based navigation items */}
            {isAuthenticated && navigationItems.length > 0 && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium group relative"
                    title={item.description}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/messages"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="sr-only">Messages</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative hover:bg-gray-800">
                      <span className="sr-only">User menu</span>
                      <div className="h-8 w-8 rounded-full bg-netflix-red flex items-center justify-center text-sm font-bold text-white">
                        {user?.email.charAt(0).toUpperCase()}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700">
                    <DropdownMenuLabel className="text-gray-300">
                      My Account
                      <div className="text-xs text-gray-500 mt-1 capitalize">
                        {user?.role === "ARTIST_MANAGER" ? "Artist Manager" : user?.role.replace('_', ' ').toLowerCase()}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    
                    {/* Role-specific dropdown items */}
                    {profileDropdownItems.map((item) => (
                      <DropdownMenuItem key={item.name} asChild className="text-gray-300 hover:bg-gray-800 hover:text-white">
                        <Link to={item.href}>{item.name}</Link>
                      </DropdownMenuItem>
                    ))}
                    
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={logout} className="text-gray-300 hover:bg-gray-800 hover:text-white">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="netflix-button-primary">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-black border-t border-gray-800`}>
        {isAuthenticated && navigationItems.length > 0 && (
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
        
        {isAuthenticated ? (
          <div className="pt-4 pb-3 border-t border-gray-800">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-netflix-red flex items-center justify-center text-sm font-bold text-white">
                  {user?.email.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {user?.email}
                </div>
                <div className="text-sm font-medium text-gray-400 capitalize">
                  {user?.role === "ARTIST_MANAGER" ? "Artist Manager" : user?.role.replace('_', ' ').toLowerCase()}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {/* Role-specific mobile dropdown items */}
              {profileDropdownItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-800">
            <div className="flex flex-col space-y-2 px-4">
              <Button variant="ghost" asChild className="justify-center text-gray-300 hover:text-white hover:bg-gray-800">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="justify-center netflix-button-primary">
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}