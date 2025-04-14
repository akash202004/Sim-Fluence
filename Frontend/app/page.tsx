
"use client";
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
import { useState, Suspense, lazy } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
// Import testimonial images
import person1 from "../public/testimonial/Soumaditya.jpg";
import person2 from "../public/testimonial/Akash.jpg"; 
import person3 from "../public/testimonial/Nachiketa.jpg";
import person4 from "../public/testimonial/MU.jpg"

// Add loading options to reduce layout shift
const AnimatedTestimonials = dynamic(
  () => import('@/components/ui/animated-testimonials').then(mod => mod.AnimatedTestimonials),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-black/20 rounded-lg animate-pulse"></div>
  }
);

const DynamicContainerScroll = dynamic(
  () => import('@/components/ui/container-scroll-animation').then(mod => mod.ContainerScroll),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[500px] bg-black/20 rounded-lg animate-pulse"></div>
  }
);

const FeaturesSectionDemo = dynamic(
  () => import('@/components/ui/Feature').then((mod) => mod.FeaturesSectionDemo),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-black/20 rounded-lg animate-pulse"></div>
  }
);


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

  // Memoize testimonials data to prevent unnecessary re-renders
  const testimonials = [
    {
      quote: "Sim-Fluence has transformed how we approach social media marketing. The predictive analytics are incredibly accurate and have helped us optimize our content strategy.",
      name: "Soumaditya Pal",
      designation: "Marketing Director",
      src: person1
    },
    {
      quote: "The simulation capabilities of this platform are outstanding. We've seen a 40% increase in engagement since implementing the insights from Sim-Fluence.",
      name: "Akash Laha",
      designation: "Social Media Manager",
      src: person2
    },
    {
      quote: "As a content creator, Sim-Fluence has been invaluable in helping me understand what resonates with my audience before I publish.",
      name: "Nachiketa Pahari",
      designation: "Content Strategist",
      src: person3
    },
    {
      quote: "The AI-powered audience simulation is like nothing I've seen before. It's given us unprecedented insights into how our campaigns will perform.",
      name: "MU Ahemad",
      designation: "Digital Marketing Specialist",
      src: person4
    }
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
        
        {/* Lazy load components with proper suspense boundaries */}
        <Suspense fallback={<div className="w-full h-[400px] bg-black/20 rounded-lg animate-pulse"></div>}>
          <FeaturesSectionDemo />
        </Suspense>
        
        <div className="mt-0">
          <Suspense fallback={<div className="w-full h-[500px] bg-black/20 rounded-lg animate-pulse"></div>}>
            <DynamicContainerScroll
              titleComponent={
                <h1 className="text-4xl font-semibold text-white mb-6">
                  <span className="text-blue-500">How</span> We Predict the Buzz 
                </h1>
              }
            >
              <div className="flex items-center justify-center h-full">
                <div className="w-full h-full flex flex-col items-center justify-center text-white p-4 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    <div className="bg-black/30 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-bold mb-3">Define Your Audience</h3>
                      <p className="text-gray-300">
                      Start by selecting your ideal audience — like 500 product managers in the US or early-stage founders. Sim-Fluence creates AI agents that mirror real people with varied traits, moods, and influence levels.
                      </p>
                    </div>
                    <div className="bg-black/30 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-bold mb-3">Submit Your Post Link</h3>
                      <p className="text-gray-300">
                      Enter your post, campaign idea, or pitch. Choose the platform (LinkedIn, Twitter, etc.) to simulate how it would perform in a real-world feed environment.
                      </p>
                    </div>
                    <div className="bg-black/30 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-bold mb-3">Run the Simulation</h3>
                      <p className="text-gray-300">
                      Our engine uses AI agents powered by LLMs and social graph modeling. Agents react authentically — liking, sharing, or ignoring posts — based on personality, mood, and peer influence.
                      </p>
                    </div>
                    <div className="bg-black/30 p-6 rounded-xl border border-white/10">
                      <h3 className="text-xl font-bold mb-3">Get Actionable Insights</h3>
                      <p className="text-gray-300">
                      View virality scores, sentiment analysis, reaction summaries, and feedback trends on a sleek dashboard. Export results and refine your content — before it goes live.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DynamicContainerScroll>
          </Suspense>
        </div>
        
        <div className="w-full max-w-6xl mt-16">
          <h2 className="text-4xl font-semibold text-white mb-6">
            <span className="text-blue-500">What</span> Our Users Say
          </h2>
          <Suspense fallback={<div className="w-full h-[400px] bg-black/20 rounded-lg animate-pulse"></div>}>
            <AnimatedTestimonials 
              testimonials={testimonials.map(t => ({ ...t, src: t.src.src }))} 
              autoplay={true} 
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
