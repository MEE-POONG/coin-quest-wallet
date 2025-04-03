
import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import WalletCard from "../components/Dashboard/WalletCard";
import TransactionList from "../components/Dashboard/TransactionList";
import DepositRequestForm from "../components/Dashboard/DepositRequestForm";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return (
    <AppLayout>
      <div className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Wallet Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <WalletCard />
            <TransactionList />
          </div>
          
          <div>
            <DepositRequestForm />
            
            {/* Withdrawal section only shown to Premium and Admin users */}
            {(user.role === 'PREMIUM' || user.role === 'ADMIN') && (
              <div className="mt-6">
                <Button 
                  className="w-full bg-nft-blue hover:bg-nft-blue/80"
                >
                  Request Withdrawal
                </Button>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Premium feature: You can request to withdraw your coins.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
