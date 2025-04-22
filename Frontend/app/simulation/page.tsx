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
import { useState, useEffect } from "react";
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SimulationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  
  // Protect the page - redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);
  
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Simulation", link: "/simulation" },
    { name: "About", link: "/about" },
  ];

  // Show loading or authentication required message while checking auth status
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need to be logged in to access the simulation features.
          </p>
          <div className="flex justify-center space-x-4">
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </motion.div>
      </div>
    );
  }

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