
import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import WalletCard from "../components/Dashboard/WalletCard";
import TransactionList from "../components/Dashboard/TransactionList";
import DepositRequestForm from "../components/Dashboard/DepositRequestForm";
import WithdrawRequestForm from "../components/Dashboard/WithdrawRequestForm";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isPremium } = useAuth();
  
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
            {isPremium && <WithdrawRequestForm />}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
