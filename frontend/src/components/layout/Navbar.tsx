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
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/marketplace"
                className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Marketplace
              </Link>
              <Link
                to="/jampads"
                className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Jam Pads
              </Link>
              <Link
                to="/music-schools"
                className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Music Schools
              </Link>
              <Link
                to="/collaborations"
                className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium"
              >
                Collaborations
              </Link>
            </div>
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
                    <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-800 hover:text-white">
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-800 hover:text-white">
                      <Link to="/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-800 hover:text-white">
                      <Link to="/listings">My Listings</Link>
                    </DropdownMenuItem>
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
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/marketplace"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            Marketplace
          </Link>
          <Link
            to="/jampads"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            Jam Pads
          </Link>
          <Link
            to="/music-schools"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            Music Schools
          </Link>
          <Link
            to="/collaborations"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            Collaborations
          </Link>
        </div>
        
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
                <div className="text-sm font-medium text-gray-400">
                  {user?.role}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              >
                Profile
              </Link>
              <Link
                to="/bookings"
                className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              >
                My Bookings
              </Link>
              <Link
                to="/listings"
                className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              >
                My Listings
              </Link>
              <button
                onClick={logout}
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
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="justify-center netflix-button-primary">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}