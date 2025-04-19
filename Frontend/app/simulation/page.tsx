"use client";

import { SimulationSection } from "./Section/Simulation";
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
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function SimulationPage() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Analytics", link: "/analytics" },
    { name: "Simulation", link: "/simulation" },
    { name: "About", link: "/about" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar className="mt-0 top-0">
        <NavBody>
          <div className="relative z-20 flex items-center">
            <span className="text-xl font-bold text-black dark:text-white">Sim-Fluence</span>
          </div>
          <NavItems items={navItems} />
          <div className="relative z-20 flex flex-row items-center justify-end gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <NavbarButton as="button" variant="secondary">
                  Login
                </NavbarButton>
              </SignInButton>
              <SignUpButton mode="modal">
                <NavbarButton as="button">
                  Get Started
                </NavbarButton>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </NavBody>
        
        <MobileNav>
          <MobileNavHeader>
            <div className="relative z-20 flex items-center">
              <span className="text-xl font-bold text-black dark:text-white">Sim-Fluence</span>
            </div>
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
            <SignedOut>
              <SignInButton mode="modal">
                <NavbarButton as="button" variant="secondary" className="w-full justify-start">
                  Login
                </NavbarButton>
              </SignInButton>
              <SignUpButton mode="modal">
                <NavbarButton as="button" className="w-full justify-start">
                  Get Started
                </NavbarButton>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      
      <SimulationSection />
    </main>
  );
}