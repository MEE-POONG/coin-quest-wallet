/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
import { Pencil, User, UserRound, Shield, Save, RotateCcw, Eye, EyeOff } from "lucide-react";

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      avatar: "",
      bio: user?.bio || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        avatar: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user, form]);

  if (!user) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Validate username
      if (!data.username || data.username.trim().length < 3) {
        toast({
          title: "Validation Error",
          description: "Username must be at least 3 characters long.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Check if username has changed
      const hasChanges = 
        data.username !== user?.username || 
        data.bio !== (user?.bio || "") || 
        avatarPreview !== user?.avatar;

      if (!hasChanges) {
        toast({
          title: "No Changes",
          description: "No changes were made to your profile.",
        });
        setIsSubmitting(false);
        return;
      }
      
      const success = await updateUser({
        username: data.username.trim(),
        bio: data.bio?.trim() || "",
        avatar: avatarPreview || user?.avatar
      });
      
      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        // Reset form to reflect the new values
        form.reset({
          username: data.username.trim(),
          email: user?.email || "",
          bio: data.bio?.trim() || "",
          avatar: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        avatar: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setAvatarPreview(user.avatar || null);
      toast({
        title: "Form Reset",
        description: "All changes have been discarded.",
      });
    }
  };

  const onSubmitPassword = async (data: any) => {
    try {
      setIsChangingPassword(true);
      
      // Validate current password (in a real app, this would be checked against the server)
      if (!data.currentPassword) {
        toast({
          title: "Validation Error",
          description: "Current password is required.",
          variant: "destructive",
        });
        setIsChangingPassword(false);
        return;
      }

      // Validate new password
      if (!data.newPassword || data.newPassword.length < 6) {
        toast({
          title: "Validation Error",
          description: "New password must be at least 6 characters long.",
          variant: "destructive",
        });
        setIsChangingPassword(false);
        return;
      }

      // Validate password confirmation
      if (data.newPassword !== data.confirmPassword) {
        toast({
          title: "Validation Error",
          description: "New password and confirmation do not match.",
          variant: "destructive",
        });
        setIsChangingPassword(false);
        return;
      }

      // Check if new password is different from current
      if (data.currentPassword === data.newPassword) {
        toast({
          title: "Validation Error",
          description: "New password must be different from current password.",
          variant: "destructive",
        });
        setIsChangingPassword(false);
        return;
      }

      // In a real app, this would make an API call to change the password
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });

      // Reset password fields
      form.setValue("currentPassword", "");
      form.setValue("newPassword", "");
      form.setValue("confirmPassword", "");
      
      // Reset password visibility states
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      
      setIsChangingPassword(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
      setIsChangingPassword(false);
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
                      rules={{
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message: "Username must be at least 3 characters"
                        },
                        maxLength: {
                          value: 20,
                          message: "Username must be less than 20 characters"
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9_]+$/,
                          message: "Username can only contain letters, numbers, and underscores"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormDescription>
                            Choose a unique username (3-20 characters, letters, numbers, and underscores only)
                          </FormDescription>
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
                      rules={{
                        maxLength: {
                          value: 500,
                          message: "Bio must be less than 500 characters"
                        }
                      }}
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
                          <FormDescription>
                            Tell others about yourself (optional, max 500 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="bg-transparent border-gray-600 hover:bg-gray-800/50"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-nft-purple hover:bg-nft-purple/80"
                      >
                        <Save className="w-4 h-4 mr-2" />
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
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitPassword)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      rules={{
                        required: "Current password is required"
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showCurrentPassword ? "text" : "password"} 
                                placeholder="Enter your current password" 
                                {...field} 
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-400" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter your current password to verify your identity
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="newPassword"
                      rules={{
                        required: "New password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        },
                        maxLength: {
                          value: 50,
                          message: "Password must be less than 50 characters"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showNewPassword ? "text" : "password"} 
                                placeholder="Enter your new password" 
                                {...field} 
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-400" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Choose a strong password (6-50 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      rules={{
                        required: "Please confirm your new password",
                        validate: (value) => {
                          const newPassword = form.getValues("newPassword");
                          return value === newPassword || "Passwords do not match";
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Confirm your new password" 
                                {...field} 
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-400" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Re-enter your new password to confirm
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          form.setValue("currentPassword", "");
                          form.setValue("newPassword", "");
                          form.setValue("confirmPassword", "");
                          setShowCurrentPassword(false);
                          setShowNewPassword(false);
                          setShowConfirmPassword(false);
                        }}
                        disabled={isChangingPassword}
                        className="bg-transparent border-gray-600 hover:bg-gray-800/50"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isChangingPassword}
                        className="bg-nft-purple hover:bg-nft-purple/80"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        {isChangingPassword ? "Changing..." : "Change Password"}
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
