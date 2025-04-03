
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Item } from "../../types";
import { RARITY_COLORS } from "../../constants";
import { useToast } from "../../hooks/use-toast";
import { Coins } from "lucide-react";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Item Purchased!",
      description: `You've successfully purchased ${item.name}.`,
    });
    
    setIsLoading(false);
  };

  return (
    <Card className="nft-gradient-border glass-card overflow-hidden h-full flex flex-col">
      <div className={`p-0.5 ${RARITY_COLORS[item.rarity]}`}>
        <div className="aspect-square relative bg-nft-darkbg overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transform transition-transform hover:scale-110 duration-500"
            style={{ backgroundImage: `url(${item.image || '/placeholder.svg'})` }}
          ></div>
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs backdrop-blur-sm">
            {item.rarity}
          </div>
        </div>
      </div>
      
      <CardContent className="py-4 flex-grow">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="text-sm text-gray-400 mb-2">{item.category}</p>
        <p className="text-xs text-gray-500">{item.description}</p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Button
          className="w-full bg-nft-purple hover:bg-nft-purple/80 gap-2"
          onClick={handlePurchase}
          disabled={isLoading}
        >
          <Coins className="w-4 h-4" />
          {isLoading ? "Processing..." : `Buy for ${item.price}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
