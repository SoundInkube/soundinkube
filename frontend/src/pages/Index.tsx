import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Homepage() {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      {/* Netflix-style Hero Section */}
      <section className="netflix-hero relative bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        <div className="netflix-container relative z-10 py-24 md:py-32">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 space-y-8 netflix-fade-in">
              <h1 className="netflix-title">
                Connect with the <span className="text-netflix-red">Music Community</span>
              </h1>
              <p className="netflix-subtitle max-w-2xl">
                Book jam pads, find music lessons, connect with musicians, and buy/sell gear all in one place. 
                Your complete music platform awaits.
              </p>
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated ? (
                  <>
                    <Button size="lg" asChild className="netflix-button-primary netflix-hover-glow">
                      <Link to="/signup">Join Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="netflix-button-secondary">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                ) : (
                  <Button size="lg" asChild className="netflix-button-primary netflix-hover-glow">
                    <Link to="/marketplace">Explore Marketplace</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="netflix-image-overlay rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                  alt="Musicians jamming together" 
                  className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Netflix-style Features Section */}
      <section className="netflix-section-dark">
        <div className="netflix-container">
          <div className="text-center mb-16 netflix-fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Explore all the features that SoundInkube has to offer</p>
          </div>
          
          <div className="netflix-grid">
            <div className="netflix-card group">
              <div className="p-8">
                <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center mb-6 group-hover:bg-red-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Jam Pad Booking</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Find and book rehearsal spaces easily with our simple booking system. Perfect for bands and solo artists.</p>
                <Button variant="link" className="text-netflix-red hover:text-red-400 font-semibold" asChild>
                  <Link to="/jampads">Explore Jam Pads →</Link>
                </Button>
              </div>
            </div>
            
            <div className="netflix-card group">
              <div className="p-8">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Music Schools</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Discover classes and lessons from top music education providers. Learn from the best instructors.</p>
                <Button variant="link" className="text-netflix-red hover:text-red-400 font-semibold" asChild>
                  <Link to="/music-schools">Find Lessons →</Link>
                </Button>
              </div>
            </div>
            
            <div className="netflix-card group">
              <div className="p-8">
                <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Collaborations</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Find other musicians to collaborate with on your next project. Build your network.</p>
                <Button variant="link" className="text-netflix-red hover:text-red-400 font-semibold" asChild>
                  <Link to="/collaborations">Find Musicians →</Link>
                </Button>
              </div>
            </div>
            
            <div className="netflix-card group">
              <div className="p-8">
                <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Marketplace</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Buy and sell music gear from other musicians in your area. Find the perfect equipment.</p>
                <Button variant="link" className="text-netflix-red hover:text-red-400 font-semibold" asChild>
                  <Link to="/marketplace">Shop Now →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Netflix-style Testimonials */}
      <section className="netflix-section">
        <div className="netflix-container">
          <div className="text-center mb-16 netflix-fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Join thousands of musicians who love SoundInkube</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="netflix-card">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">J</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">James Peterson</h4>
                    <p className="text-gray-400">Guitarist, London</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "Finding rehearsal space used to be a nightmare. With SoundInkube, I can book jam pads instantly and focus on what matters - the music."
                </p>
              </div>
            </div>
            
            <div className="netflix-card">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">S</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Sarah Kim</h4>
                    <p className="text-gray-400">Piano Teacher, New York</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "The music school platform has helped me grow my teaching business enormously. The scheduling and payment system makes everything so much easier."
                </p>
              </div>
            </div>
            
            <div className="netflix-card">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">M</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Michael Torres</h4>
                    <p className="text-gray-400">Producer, Los Angeles</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "I sold my old synth and found two collaborators through SoundInkube in the same week. It's become an essential tool for my music career."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Netflix-style CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-red-700 to-red-800">
        <div className="netflix-container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 netflix-fade-in">Ready to Join the Community?</h2>
          <p className="text-xl text-red-100 mb-12 max-w-4xl mx-auto leading-relaxed netflix-fade-in">
            SoundInkube connects you with everything you need for your music journey, all in one place. Start your musical adventure today.
          </p>
          {!isAuthenticated ? (
            <Button size="lg" variant="secondary" asChild className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 text-lg netflix-hover-scale">
              <Link to="/signup">Get Started Today</Link>
            </Button>
          ) : (
            <Button size="lg" variant="secondary" asChild className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 text-lg netflix-hover-scale">
              <Link to="/profile">Complete Your Profile</Link>
            </Button>
          )}
        </div>
      </section>
    </MainLayout>
  );
}