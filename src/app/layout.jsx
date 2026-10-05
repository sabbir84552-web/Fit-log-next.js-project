import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlanProvider } from '@/context/PlanContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'FitLog — Workout Library & Planner',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f1115] text-white min-h-screen flex flex-col antialiased">
        <PlanProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{ 
              style: { background: '#1c2029', color: '#fff' } 
            }} 
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}