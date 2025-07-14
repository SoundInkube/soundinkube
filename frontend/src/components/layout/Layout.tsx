import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="text-white min-h-screen bg-netflix-black">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}