import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "../hooks/use-toast";
import { Pencil, User, UserRound, Shield } from "lucide-react";
import api from "../services/api";

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);
  
  const form = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      avatar: "",
      bio: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  if (!user) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would make an API call to update the user profile
      // For now we'll just simulate a successful update
      
      setTimeout(() => {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl py-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <Card className="md:col-span-1 glass-card nft-gradient-border">
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-nft-purple via-nft-pink to-nft-orange blur-xl opacity-50"></div>
                <div className="relative">
                  {avatarPreview ? (
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-nft-purple/30 backdrop-blur-sm">
                      <img 
                        src={avatarPreview} 
                        alt={user.username} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label htmlFor="avatar-upload" className="cursor-pointer p-2 rounded-full bg-black/60 hover:bg-black/80">
                          <Pencil size={18} />
                          <input 
                            id="avatar-upload" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleAvatarChange} 
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="h-32 w-32 bg-nft-purple/20 rounded-full flex items-center justify-center border-4 border-nft-purple/30">
                      <UserRound className="h-16 w-16 text-nft-purple" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold">{user.username}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs bg-nft-purple/20 text-nft-purple">
                  {user.role}
                </div>
              </div>
              
              <div className="w-full pt-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-400">Balance</span>
                  <span className="font-bold text-nft-orange">{user.balance.toFixed(2)} MC</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-400">Member since</span>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main settings form */}
          <div className="md:col-span-2 space-y-6">
            <Card className="glass-card nft-gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            Email cannot be changed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us a bit about yourself" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-nft-purple hover:bg-nft-purple/80"
                      >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card className="glass-card nft-gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4">
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        disabled={isSubmitting}
                        className="bg-nft-purple hover:bg-nft-purple/80"
                      >
                        Change Password
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileSettings;
