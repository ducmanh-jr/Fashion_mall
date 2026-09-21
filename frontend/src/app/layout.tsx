import type { Metadata } from 'next';
import './globals.css';
import '@/styles/style.css';
import '@/styles/inventory.css';
import '@/styles/orders.css';
import '@/styles/income-statistics.css';
import '@/styles/shop-profile.css';
import '@/styles/profile-shoppe.css';
import '@/styles/login-sketch.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';

export const metadata: Metadata = {
  title: 'Aethelgard Shopping Mall — AI Powered Luxury Fashion',
  description: 'Sàn thương mại điện tử thời trang & sneaker cao cấp tích hợp AI thông minh',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-purple-500 selection:text-white">
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
