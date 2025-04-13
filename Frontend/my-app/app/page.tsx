"use client";
import Image from "next/image";
import { Cover } from "@/components/ui/cover";
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle, 
  NavbarButton 
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled and add loading component
const FeaturesSectionDemo = dynamic(
  () => import('@/components/ui/Feature').then((mod) => mod.FeaturesSectionDemo),
  { 
    ssr: false,
    loading: () => <div className="w-full py-10 text-center">Loading features...</div>
  }
);

// Custom NavbarLogo component to avoid the external image issue
const CustomNavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <span className="font-bold text-2xl text-white">SF</span>
      <span className="font-medium text-white">Sim-Fluence</span>
    </Link>
  );
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Analytics", link: "/analytics" },
    { name: "Simulation", link: "/simulation" },
    { name: "About", link: "/about" },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pt-0 pb-20 gap-16 sm:p-20 sm:pt-0 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <Navbar className="mt-0 top-0">
        <NavBody>
          <CustomNavbarLogo />
          <NavItems items={navItems} />
          <div className="relative z-20 flex flex-row items-center justify-end gap-2">
            <NavbarButton href="/login" variant="secondary">
              Login
            </NavbarButton>
            <NavbarButton href="/signup">
              Get Started
            </NavbarButton>
          </div>
        </NavBody>
        
        <MobileNav>
          <MobileNavHeader>
            <CustomNavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navItems.map((item, idx) => (
              <NavbarButton
                key={idx}
                href={item.link}
                variant="secondary"
                className="w-full justify-start"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavbarButton>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            Analyze your Post Reach
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            at{" "}
            <Cover className="inline-block px-4 py-2">
              <span className="text-white">Sim-Fluence</span>
            </Cover>
          </h1>
        </div>
        <p className="text-xl mt-2 text-gray-400 max-w-2xl">
          Understand your social media influence with powerful analytics and simulation tools
        </p>
        
        <FeaturesSectionDemo />
      </main>
    </div>
  );
}
