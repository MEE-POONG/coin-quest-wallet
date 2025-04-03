
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserRole } from "../../types";
import { useToast } from "../../hooks/use-toast";

interface UserManagementCardProps {
  user: User;
  onUpdateRole: (userId: string, newRole: UserRole) => void;
  onToggleStatus: (userId: string, isBanned: boolean) => void;
}

const UserManagementCard: React.FC<UserManagementCardProps> = ({
  user,
  onUpdateRole,
  onToggleStatus,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const { toast } = useToast();

  const handleRoleChange = async (newRole: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onUpdateRole(user.id, newRole as UserRole);
    
    toast({
      title: "Role Updated",
      description: `${user.username}'s role has been updated to ${newRole}.`,
    });
    
    setIsLoading(false);
  };

  const handleToggleStatus = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStatus = !isBanned;
    setIsBanned(newStatus);
    onToggleStatus(user.id, newStatus);
    
    toast({
      title: newStatus ? "User Banned" : "User Unbanned",
      description: `${user.username} has been ${newStatus ? "banned" : "unbanned"}.`,
      variant: newStatus ? "destructive" : "default",
    });
    
    setIsLoading(false);
  };

  return (
    <Card className="nft-gradient-border glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${user.avatar || '/placeholder.svg'})` }}
          ></div>
          <span>{user.username}</span>
          {user.role === UserRole.ADMIN && (
            <span className="px-2 py-0.5 bg-nft-purple/20 text-nft-purple rounded-full text-xs ml-2">ADMIN</span>
          )}
          {user.role === UserRole.PREMIUM && (
            <span className="px-2 py-0.5 bg-nft-orange/20 text-nft-orange rounded-full text-xs ml-2">PREMIUM</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-400">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Balance:</p>
            <p>{user.balance} coins</p>
          </div>
          <div>
            <p className="text-gray-400">Joined:</p>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-400">Status:</p>
            <p className={isBanned ? "text-red-400" : "text-green-400"}>
              {isBanned ? "Banned" : "Active"}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-400 mb-1">Role:</p>
            <Select
              defaultValue={user.role}
              onValueChange={handleRoleChange}
              disabled={isLoading || user.role === UserRole.ADMIN}
            >
              <SelectTrigger className="bg-black/30 border-nft-purple/30">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-nft-darkbg border-nft-purple/30">
                <SelectItem value={UserRole.NORMAL}>Normal</SelectItem>
                <SelectItem value={UserRole.PREMIUM}>Premium</SelectItem>
                <SelectItem value={UserRole.ADMIN} disabled={user.role !== UserRole.ADMIN}>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Actions:</p>
            <Button 
              className={`w-full ${isBanned ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              onClick={handleToggleStatus}
              disabled={isLoading || user.role === UserRole.ADMIN}
            >
              {isBanned ? "Unban User" : "Ban User"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagementCard;
