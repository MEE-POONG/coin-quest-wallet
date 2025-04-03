
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WithdrawRequest } from "../../types";
import { useToast } from "../../hooks/use-toast";

interface WithdrawRequestCardProps {
  request: WithdrawRequest;
  onApprove: (id: string, comment: string) => void;
  onReject: (id: string, comment: string) => void;
}

const WithdrawRequestCard: React.FC<WithdrawRequestCardProps> = ({
  request,
  onApprove,
  onReject,
}) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleApprove = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onApprove(request.id, comment);
    
    toast({
      title: "Withdrawal Approved",
      description: `You've approved a withdrawal of ${request.amount} coins for ${request.username}.`,
    });
    
    setIsLoading(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onReject(request.id, comment);
    
    toast({
      title: "Withdrawal Rejected",
      description: `You've rejected a withdrawal request from ${request.username}.`,
      variant: "destructive",
    });
    
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="nft-gradient-border glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Withdrawal Request by <span className="text-nft-blue">{request.username}</span>
        </CardTitle>
        <p className="text-xs text-gray-400">{formatDate(request.createdAt)}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Amount:</p>
            <p className="text-xl font-bold text-nft-orange">{request.amount} coins</p>
          </div>
          <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
            PENDING
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-2">Admin Comment:</p>
          <Textarea
            placeholder="Add a comment (optional)"
            className="bg-black/30 border-nft-purple/30"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button 
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={handleApprove}
          disabled={isLoading}
        >
          Approve
        </Button>
        <Button 
          className="flex-1 bg-red-600 hover:bg-red-700"
          variant="destructive"
          onClick={handleReject}
          disabled={isLoading}
        >
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WithdrawRequestCard;
