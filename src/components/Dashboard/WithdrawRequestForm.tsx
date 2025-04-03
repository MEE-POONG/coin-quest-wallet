
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../../hooks/use-toast";
import { transactionService } from "../../services/transactionService";
import { useAuth } from "../../contexts/AuthContext";

const WithdrawRequestForm = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please provide a valid amount to withdraw",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user has sufficient balance
    if (user && user.balance < Number(amount)) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough coins for this withdrawal",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await transactionService.createWithdrawRequest({
        amount: Number(amount)
      });
      
      toast({
        title: "Withdrawal Request Submitted",
        description: "Your withdrawal request has been sent for review.",
      });
      
      // Reset form
      setAmount("");
    } catch (error) {
      console.error("Withdrawal request error:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your withdrawal request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="nft-gradient-border glass-card mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Withdrawal Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount (Coins)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="Enter amount to withdraw"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black/30 border-nft-purple/30"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-nft-blue hover:bg-nft-blue/80"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Withdrawal Request"}
          </Button>
          
          <p className="text-xs text-center text-gray-400 mt-2">
            Your request will be reviewed by an admin.
            You'll receive a notification once it's approved.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default WithdrawRequestForm;
