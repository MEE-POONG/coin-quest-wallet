
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../../hooks/use-toast";
import { DISCORD_WEBHOOK_URL } from "../../constants";

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

  const sendDiscordNotification = async (amount: number) => {
    try {
      // In a real app, this would be a secure API call through your backend
      if (!DISCORD_WEBHOOK_URL.startsWith('http')) {
        console.log('Discord webhook not configured');
        return;
      }

      const payload = {
        embeds: [{
          title: '🔔 New Deposit Request',
          description: `A new deposit request has been submitted.`,
          color: 0x8B5CF6, // Purple color in hex
          fields: [
            {
              name: 'Username',
              value: 'User123', // Replace with actual username
              inline: true
            },
            {
              name: 'Amount',
              value: `${amount} coins`,
              inline: true
            },
            {
              name: 'Date/Time',
              value: new Date().toLocaleString(),
              inline: true
            },
            {
              name: 'Status',
              value: '⏳ Pending Approval',
              inline: false
            }
          ],
          footer: {
            text: 'CoinQuest Wallet | Admin Panel'
          }
        }]
      };

      console.log(`Sending Discord notification for deposit of ${amount} coins`);
      // This is a stub - in a real implementation you'd call the Discord webhook
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Send Discord notification in a real app
    await sendDiscordNotification(Number(amount));
    
    toast({
      title: "Deposit Request Submitted",
      description: "Your deposit request has been sent for review.",
    });
    
    // Reset form
    setAmount("");
    setSlipImage(null);
    setIsLoading(false);
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
