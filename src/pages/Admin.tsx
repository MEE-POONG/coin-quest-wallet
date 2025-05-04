import React, { useState, useEffect } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepositRequestCard from "../components/Admin/DepositRequestCard";
import WithdrawRequestCard from "../components/Admin/WithdrawRequestCard";
import UserManagementCard from "../components/Admin/UserManagementCard";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { mockDepositRequests, mockWithdrawRequests, mockUsers } from "../data/mockData";
import { UserRole } from "../types";
import { userService } from "@/services/userService";
import { transactionService } from "@/services/transactionService";
import { startProgress, doneProgress } from "@/utils/nprogress";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [depositRequests, setDepositRequests] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      startProgress();
      try {
        const [deposits, withdrawals, userList] = await Promise.all([
          transactionService.getDepositRequests(),
          transactionService.getWithdrawRequests(),
          userService.getUsers()
        ]);
        
        setDepositRequests(deposits);
        setWithdrawRequests(withdrawals);
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
        doneProgress();
      }
    };

    fetchData();
  }, []);
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  const handleApproveDeposit = (id: string, comment: string) => {
    setDepositRequests(prev => prev.filter(req => req.id !== id));
    // In a real app, this would update the database and user balance
  };
  
  const handleRejectDeposit = (id: string, comment: string) => {
    setDepositRequests(prev => prev.filter(req => req.id !== id));
    // In a real app, this would update the database
  };
  
  const handleApproveWithdraw = (id: string, comment: string) => {
    setWithdrawRequests(prev => prev.filter(req => req.id !== id));
    // In a real app, this would update the database and user balance
  };
  
  const handleRejectWithdraw = (id: string, comment: string) => {
    setWithdrawRequests(prev => prev.filter(req => req.id !== id));
    // In a real app, this would update the database
  };
  
  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    // In a real app, this would update the database
  };
  
  const handleToggleUserStatus = (userId: string, isBanned: boolean) => {
    // In a real app, this would update the user's banned status in the database
    console.log(`User ${userId} is now ${isBanned ? 'banned' : 'active'}`);
  };
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-400">Loading admin data...</p>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        
        <Tabs defaultValue="deposits" className="space-y-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="deposits">Deposit Requests</TabsTrigger>
            {/* <TabsTrigger value="withdrawals">Withdrawal Requests</TabsTrigger> */}
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposits">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {depositRequests.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400">No pending deposit requests.</p>
                </div>
              ) : (
                depositRequests.map((request) => (
                  <DepositRequestCard
                    key={request.id}
                    request={request}
                    onApprove={handleApproveDeposit}
                    onReject={handleRejectDeposit}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="withdrawals">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {withdrawRequests.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400">No pending withdrawal requests.</p>
                </div>
              ) : (
                withdrawRequests.map((request) => (
                  <WithdrawRequestCard
                    key={request.id}
                    request={request}
                    onApprove={handleApproveWithdraw}
                    onReject={handleRejectWithdraw}
                  />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {users.map((user) => (
                <UserManagementCard
                  key={user.id}
                  user={user}
                  onUpdateRole={handleUpdateUserRole}
                  onToggleStatus={handleToggleUserStatus}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
