
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, User, UserCheck, Check, X, Eye } from "lucide-react";
import { DepositRequest } from "@/types";

// Mock data for approval status
const mockApprovalData: DepositRequest[] = [
  {
    id: "1",
    userId: "user1",
    username: "john_doe",
    amount: 1000,
    slipImage: "/placeholder.svg",
    status: "PENDING",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    userId: "user2",
    username: "jane_smith",
    amount: 2500,
    slipImage: "/placeholder.svg",
    status: "APPROVED",
    comment: "Approved by admin",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T16:45:00Z"
  },
  {
    id: "3",
    userId: "user3",
    username: "bob_wilson",
    amount: 500,
    slipImage: "/placeholder.svg",
    status: "REJECTED",
    comment: "Invalid slip image",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T11:30:00Z"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "APPROVED":
      return <CheckCircle className="text-green-500" size={20} />;
    case "REJECTED":
      return <XCircle className="text-red-500" size={20} />;
    default:
      return <Clock className="text-yellow-500" size={20} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "REJECTED":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }
};

const ApprovalStatusCard = ({ 
  request, 
  onApprove, 
  onReject, 
  onViewSlip 
}: { 
  request: DepositRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewSlip: (id: string) => void;
}) => {
  return (
    <Card className="nft-gradient-border glass-card overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="text-nft-blue" size={20} />
            <span>{request.username}</span>
          </CardTitle>
          <Badge className={`${getStatusColor(request.status)} border`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(request.status)}
              <span className="text-xs font-medium">{request.status}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Amount:</span>
            <span className="text-lg font-bold text-gradient">{request.amount.toLocaleString()}</span>
          </div>
          
          {/* Request Date */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Request Date:</span>
            <span className="text-sm text-gray-300">
              {new Date(request.createdAt).toLocaleDateString('th-TH')}
            </span>
          </div>
          
          {/* Approver (if approved) */}
          {request.status === "APPROVED" && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Approved by:</span>
              <div className="flex items-center gap-1">
                <UserCheck className="text-green-500" size={16} />
                <span className="text-sm text-green-400">Admin</span>
              </div>
            </div>
          )}
          
          {/* Comment (if exists) */}
          {request.comment && (
            <div className="pt-2 border-t border-gray-700/50">
              <span className="text-sm text-gray-400">Comment:</span>
              <p className="text-sm text-gray-300 mt-1">{request.comment}</p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="pt-3 border-t border-gray-700/50">
            <div className="flex gap-2">
              {/* View Slip Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewSlip(request.id)}
                className="flex-1 bg-transparent border-gray-600 hover:bg-gray-800/50"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Slip
              </Button>
              
              {/* Approve/Reject Buttons (only for pending requests) */}
              {request.status === "PENDING" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApprove(request.id)}
                    className="flex-1 bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReject(request.id)}
                    className="flex-1 bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ApprovalStatus = () => {
  const [approvalData, setApprovalData] = useState<DepositRequest[]>(mockApprovalData);

  const handleApprove = (id: string) => {
    setApprovalData(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: "APPROVED" as const, comment: "Approved by admin", updatedAt: new Date().toISOString() }
          : request
      )
    );
    console.log(`Approved request ${id}`);
  };

  const handleReject = (id: string) => {
    setApprovalData(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: "REJECTED" as const, comment: "Rejected by admin", updatedAt: new Date().toISOString() }
          : request
      )
    );
    console.log(`Rejected request ${id}`);
  };

  const handleViewSlip = (id: string) => {
    const request = approvalData.find(req => req.id === id);
    if (request) {
      // In a real app, this would open a modal or navigate to slip image
      console.log(`Viewing slip for request ${id}:`, request.slipImage);
      // You could implement a modal here to show the slip image
      alert(`Viewing slip image: ${request.slipImage}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-nft-orange" size={24} />
          <h2 className="text-2xl font-bold text-gradient">Approval Status</h2>
        </div>
        <div className="text-sm text-gray-400">
          Total: {approvalData.length} requests
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvalData.map((request) => (
          <ApprovalStatusCard 
            key={request.id} 
            request={request}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewSlip={handleViewSlip}
          />
        ))}
      </div>
    </div>
  );
};

export default ApprovalStatus;
