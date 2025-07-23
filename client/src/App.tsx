import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { WalletProvider } from "@/contexts/wallet-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/layout/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Home } from "@/pages/home";
import { WalletConnect } from "@/pages/wallet-connect";
import { QRScanner } from "@/pages/qr-scanner";
import { PaymentForm } from "@/pages/payment-form";
import { UPIPayment } from "@/pages/upi-payment";
import { TransactionStatus } from "@/pages/transaction-status";
import { UserAuth } from "@/pages/user-auth";
import { AdminDashboard } from "@/pages/admin-dashboard";
import OnmetaPayment from './pages/payment-page';


function handleSectionChange(section: string) {
  // Default handler: you can implement navigation or logging here
  console.log('Section change requested:', section);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <TooltipProvider>
          <Router>
            <div className="min-h-screen bg-slate-50">
              <Navigation />
              <main className="pt-16 pb-20 lg:pb-0">
                <Routes>
                  <Route path="/" element={<Home onSectionChange={handleSectionChange} />} />
                  <Route path="/wallet-connect" element={<WalletConnect onSectionChange={handleSectionChange} />} />
                  <Route path="/qr-scanner" element={<QRScanner onSectionChange={handleSectionChange} onQRProcessed={() => {}} />} />
                  <Route path="/payment-form" element={<PaymentForm onSectionChange={handleSectionChange} />} />
                  <Route path="/upi-payment" element={<UPIPayment onSectionChange={handleSectionChange} />} />
                  <Route path="/transaction-status" element={<TransactionStatus onSectionChange={handleSectionChange} />} />
                  <Route path="/user-auth" element={<UserAuth onSectionChange={handleSectionChange} />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard onSectionChange={handleSectionChange} />} />
                  <Route path="/payment" element={<OnmetaPayment />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <MobileNav />
            </div>
          </Router>
          <Toaster />
        </TooltipProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
