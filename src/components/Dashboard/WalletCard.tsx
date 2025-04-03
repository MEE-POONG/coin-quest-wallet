
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../../contexts/AuthContext";
import { Coins } from "lucide-react";

const WalletCard = () => {
  const { user } = useAuth();

  return (
    <Card className="nft-gradient-border glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Coins className="text-nft-orange animate-coin-spin" size={24} />
          <span>Your Wallet</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-gradient mb-2">{user?.balance || 0}</div>
          <p className="text-sm text-gray-400">Available Coins</p>
          
          <div className="mt-6 w-full bg-black/40 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-nft-purple to-nft-blue rounded-full"
              style={{ width: `${Math.min((user?.balance || 0) / 100, 100)}%` }}
            ></div>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">Level Progress</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
