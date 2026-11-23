import React from 'react';
import { DemoProvider, useDemo } from './store/DemoContext';
import { TopBar } from './components/TopBar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { BuyerApp } from './components/buyer/BuyerApp';
import { SellerApp } from './components/seller/SellerApp';

const AppShell: React.FC = () => {
  const { mode } = useDemo();

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <TopBar />

      {mode === 'buyer' ? (
        <main className="lg:max-w-6xl lg:mx-auto lg:px-6 lg:py-8 lg:flex lg:items-center lg:justify-center lg:gap-12">
          <DesktopSidebar />
          <BuyerApp />
        </main>
      ) : (
        <SellerApp />
      )}
    </div>
  );
};

export default function App() {
  return (
    <DemoProvider>
      <AppShell />
    </DemoProvider>
  );
}
