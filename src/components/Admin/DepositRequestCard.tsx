
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DepositRequest } from "../../types";
import { useToast } from "../../hooks/use-toast";

interface DepositRequestCardProps {
  request: DepositRequest;
  onApprove: (id: string, comment: string) => void;
  onReject: (id: string, comment: string) => void;
}

const DepositRequestCard: React.FC<DepositRequestCardProps> = ({
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
      title: "Deposit Approved",
      description: `You've approved a deposit of ${request.amount} coins for ${request.username}.`,
    });
    
    setIsLoading(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onReject(request.id, comment);
    
    toast({
      title: "Deposit Rejected",
      description: `You've rejected a deposit request from ${request.username}.`,
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
          Deposit Request by <span className="text-nft-purple">{request.username}</span>
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
          <p className="text-sm text-gray-400 mb-2">Bank Transfer Slip:</p>
          <div className="bg-black/20 rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-nft-darkbg flex items-center justify-center">
              {request.slipImage ? (
                <div className="w-full h-full bg-contain bg-center bg-no-repeat" 
                     style={{ backgroundImage: `url(${request.slipImage})` }}>
                </div>
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>
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

export default DepositRequestCard;
