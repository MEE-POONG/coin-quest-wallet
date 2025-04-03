
import React, { useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { mockUsers, mockGifts } from "../data/mockData";
import { useToast } from "../hooks/use-toast";
import { Gift, Coins } from "lucide-react";

const Gifts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  // Filter out current user from potential recipients
  const potentialRecipients = mockUsers.filter(u => u.id !== user.id);
  
  // Get gifts sent by current user
  const sentGifts = mockGifts.filter(gift => gift.senderId === user.id);
  
  // Get gifts received by current user
  const receivedGifts = mockGifts.filter(gift => gift.recipientId === user.id);
  
  const handleSendGift = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Amount must be greater than zero",
        variant: "destructive",
      });
      return;
    }
    
    if (Number(amount) > user.balance) {
      toast({
        title: "Error",
        description: "Insufficient funds",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Gift Sent!",
      description: `You've successfully sent a gift of ${amount} coins.`,
    });
    
    // Reset form
    setRecipient("");
    setAmount("");
    setMessage("");
    setIsLoading(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getUsername = (userId: string) => {
    const foundUser = mockUsers.find(u => u.id === userId);
    return foundUser ? foundUser.username : 'Unknown User';
  };
  
  return (
    <AppLayout>
      <div className="mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Gifts & Transfers</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="nft-gradient-border glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="text-nft-pink" />
                  <span>Sent Gifts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sentGifts.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-400">You haven't sent any gifts yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sentGifts.map((gift) => (
                      <div key={gift.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium">
                            To: <span className="text-nft-blue">{getUsername(gift.recipientId)}</span>
                          </p>
                          <p className="text-sm text-gray-400">{formatDate(gift.createdAt)}</p>
                          <p className="text-sm mt-1 text-gray-300">{gift.message}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-nft-orange">
                            {gift.amount ? `${gift.amount} coins` : 'Item Gift'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="nft-gradient-border glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="text-nft-orange" />
                  <span>Received Gifts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {receivedGifts.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-400">You haven't received any gifts yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {receivedGifts.map((gift) => (
                      <div key={gift.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium">
                            From: <span className="text-nft-purple">{getUsername(gift.senderId)}</span>
                          </p>
                          <p className="text-sm text-gray-400">{formatDate(gift.createdAt)}</p>
                          <p className="text-sm mt-1 text-gray-300">{gift.message}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-nft-orange">
                            {gift.amount ? `${gift.amount} coins` : 'Item Gift'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="nft-gradient-border glass-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="text-nft-purple" />
                  <span>Send a Gift</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendGift} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="balance">Your Balance</Label>
                    <div className="flex items-center gap-2 p-3 bg-black/30 rounded-md border border-nft-purple/30">
                      <Coins className="text-nft-orange w-5 h-5" />
                      <span className="font-bold">{user.balance} coins</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Select value={recipient} onValueChange={setRecipient}>
                      <SelectTrigger className="bg-black/30 border-nft-purple/30">
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent className="bg-nft-darkbg border-nft-purple/30">
                        {potentialRecipients.map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
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
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Write a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-black/30 border-nft-purple/30"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-nft-purple hover:bg-nft-purple/80"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Gift"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Gifts;
