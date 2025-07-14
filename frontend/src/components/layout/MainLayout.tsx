import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="text-white flex flex-col min-h-screen">
      <Navbar />
      <main className="text-white flex-grow">{children}</main>
      <Footer />
    </div>
  );
}