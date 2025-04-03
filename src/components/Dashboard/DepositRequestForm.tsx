import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../../hooks/use-toast";
import { transactionService } from "../../services/transactionService";

const DepositRequestForm = () => {
  const [amount, setAmount] = useState("");
  const [slipImage, setSlipImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSlipImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !slipImage) {
      toast({
        title: "Error",
        description: "Please provide both amount and slip image",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await transactionService.createDepositRequest({
        amount: Number(amount),
        slipImage: slipImage
      });
      
      toast({
        title: "Deposit Request Submitted",
        description: "Your deposit request has been sent for review.",
      });
      
      // Reset form
      setAmount("");
      setSlipImage(null);
    } catch (error) {
      console.error("Deposit request error:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your deposit request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="nft-gradient-border glass-card">
      <CardHeader>
        <CardTitle className="text-xl">Deposit Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Coins)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black/30 border-nft-purple/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slip-image">Upload Bank Transfer Slip</Label>
            <div className="border-2 border-dashed border-nft-purple/30 rounded-lg p-6 text-center cursor-pointer hover:border-nft-purple/50 transition-colors">
              <input
                id="slip-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label htmlFor="slip-image" className="cursor-pointer">
                {slipImage ? (
                  <div className="text-sm text-green-400">
                    ✅ {slipImage.name}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    Click to upload or drag and drop<br />
                    PNG, JPG (max 5MB)
                  </div>
                )}
              </label>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-nft-purple hover:bg-nft-purple/80"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Deposit Request"}
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

export default DepositRequestForm;
