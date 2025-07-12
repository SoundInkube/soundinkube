import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Homepage() {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:flex md:items-center md:space-x-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Connect with the <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Music Community</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Book jam pads, find music lessons, connect with musicians, and buy/sell gear all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated ? (
                  <>
                    <Button size="lg" asChild>
                      <Link to="/signup">Join Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                ) : (
                  <Button size="lg" asChild>
                    <Link to="/marketplace">Explore Marketplace</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img 
                src="/assets/images/hero-image.jpg" 
                alt="Musicians jamming together" 
                className="rounded-lg shadow-xl max-h-96 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80";
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,138.7C672,149,768,139,864,122.7C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything You Need in One Place</h2>
            <p className="mt-4 text-xl text-gray-600">Explore all the features that SoundInkube has to offer</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Jam Pad Booking</h3>
              <p className="text-gray-600">Find and book rehearsal spaces easily with our simple booking system.</p>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link to="/jampads">Explore Jam Pads</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Music Schools</h3>
              <p className="text-gray-600">Discover classes and lessons from top music education providers.</p>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link to="/music-schools">Find Lessons</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Collaborations</h3>
              <p className="text-gray-600">Find other musicians to collaborate with on your next project.</p>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link to="/collaborations">Find Musicians</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Marketplace</h3>
              <p className="text-gray-600">Buy and sell music gear from other musicians in your area.</p>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link to="/marketplace">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600">Join thousands of musicians who love SoundInkube</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blue-600">J</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">James Peterson</h4>
                  <p className="text-sm text-gray-500">Guitarist, London</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Finding rehearsal space used to be a nightmare. With SoundInkube, I can book jam pads instantly and focus on what matters - the music."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-purple-600">S</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Kim</h4>
                  <p className="text-sm text-gray-500">Piano Teacher, New York</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The music school platform has helped me grow my teaching business enormously. The scheduling and payment system makes everything so much easier."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-green-600">M</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Michael Torres</h4>
                  <p className="text-sm text-gray-500">Producer, Los Angeles</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I sold my old synth and found two collaborators through SoundInkube in the same week. It's become an essential tool for my music career."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join the Community?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            SoundInkube connects you with everything you need for your music journey, all in one place.
          </p>
          {!isAuthenticated ? (
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Get Started Today</Link>
            </Button>
          ) : (
            <Button size="lg" variant="secondary" asChild>
              <Link to="/profile">Complete Your Profile</Link>
            </Button>
          )}
        </div>
      </section>
    </MainLayout>
  );
}