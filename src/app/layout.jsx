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
      {/* w-full ebong overflow-x-hidden add kora holo jeno kono vabei screen baire na jay */}
      <body className="bg-[#0f1115] text-white min-h-screen flex flex-col antialiased w-full overflow-x-hidden">
        <PlanProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{ 
              style: { background: '#1c2029', color: '#fff' } 
            }} 
          />
          <Navbar />
          {/* main tag e w-full dewa holo jeno vitore sob component center e thake */}
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}