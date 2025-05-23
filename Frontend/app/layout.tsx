import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sim-Fluence',
  description: 'Understand your social media influence with powerful analytics and simulation tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider 
      appearance={{
        // Your appearance settings if any
      }}
      afterSignInUrl="/simulation"
      afterSignUpUrl="/simulation"
      // Use the correct navigate prop type
      redirectUrl="/simulation"
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
