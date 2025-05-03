
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { Coins, User as UserIcon, Package, Wallet, Bell, Gift } from "lucide-react";
import Avatar from "../Common/Avatar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      name: "Shop",
      path: "/shop",
      icon: <Package className="w-5 h-5" />,
    },
    // {
    //   name: "Gifts",
    //   path: "/gifts",
    //   icon: <Gift className="w-5 h-5" />,
    // },
  ];

  const adminItems = [
    {
      name: "Admin Panel",
      path: "/admin",
      icon: <UserIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-nft-purple" />
            <h1 className="text-xl font-bold text-gradient">MeCoins</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="flex items-center gap-2 hover:bg-white/10"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
            
            {isAdmin && adminItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="flex items-center gap-2 hover:bg-white/10 text-nft-purple"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost">
              <Bell className="w-5 h-5" />
            </Button>
            
            <div className="relative group">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
              >
                <Avatar 
                  alt={user?.username || 'User'} 
                  src={user?.avatar} 
                  size="sm" 
                />
                <span className="hidden md:inline">{user?.username}</span>
              </Button>
              
              <div className="absolute right-0 mt-1 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="p-3 border-b border-white/10">
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <div className="p-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => navigate('/profile')}
                  >
                    Profile Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-red-400 hover:text-red-300 hover:bg-red-950/50"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
            
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col md:hidden animate-fade-in">
          <div className="p-4 flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="lg"
                className="flex items-center gap-3 text-xl"
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
            
            {isAdmin && adminItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="lg"
                className="flex items-center gap-3 text-xl text-nft-purple"
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
            
            <Button
              variant="ghost"
              size="lg"
              className="flex items-center gap-3 text-xl"
              onClick={() => {
                navigate("/profile");
                setIsMobileMenuOpen(false);
              }}
            >
              <UserIcon className="w-5 h-5" />
              Profile Settings
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="flex items-center gap-3 text-xl text-red-400 hover:text-red-300"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-nft-purple" />
            <p className="text-sm font-medium">MeCoins Wallet</p>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} MeCoins. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
