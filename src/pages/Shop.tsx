
import React, { useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import ItemCard from "../components/Shop/ItemCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { mockItems } from "../data/mockData";
import { Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  const categories = ["All", ...Array.from(new Set(mockItems.map(item => item.category)))];
  
  const filteredItems = category === "All" 
    ? mockItems 
    : mockItems.filter(item => item.category === category);
    
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rarity":
        const rarityOrder = { COMMON: 0, UNCOMMON: 1, RARE: 2, EPIC: 3, LEGENDARY: 4 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      default:
        return 0;
    }
  });
  
  return (
    <AppLayout>
      <div className="mb-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Item Shop</h1>
          
          <Card className="glass-card">
            <CardContent className="p-3 flex items-center gap-3">
              <Coins className="text-nft-orange" />
              <div>
                <p className="text-sm text-gray-400">Your Balance</p>
                <p className="font-bold">{user.balance} coins</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-48">
            <p className="text-sm text-gray-400 mb-1">Category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-black/30 border-nft-purple/30">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-nft-darkbg border-nft-purple/30">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:w-48">
            <p className="text-sm text-gray-400 mb-1">Sort by</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-black/30 border-nft-purple/30">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-nft-darkbg border-nft-purple/30">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        
        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No items found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Shop;
