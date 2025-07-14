import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pages that should have full-width layout
  const fullWidthPages = ['/'];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <Navbar isScrolled={isScrolled} />
      <main className={`flex-1 ${fullWidthPages.includes(location.pathname) ? '' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
