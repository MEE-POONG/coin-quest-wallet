
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Coins } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nft-darkbg p-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-nft-purple via-nft-pink to-nft-orange blur-xl opacity-50 animate-pulse-glow"></div>
          <div className="relative bg-black/50 backdrop-blur-sm p-4 rounded-full border border-nft-purple/30">
            <Coins className="w-16 h-16 text-nft-purple" />
          </div>
        </div>
      </div>
      
      <h1 className="text-6xl font-bold mb-2 text-gradient">404</h1>
      <p className="text-2xl mb-8 text-gray-300">Page Not Found</p>
      
      <Button 
        className="bg-nft-purple hover:bg-nft-purple/80 animate-pulse-glow"
        onClick={() => navigate(user ? '/dashboard' : '/')}
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
