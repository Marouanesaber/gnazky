
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { apiRequest } from "@/utils/api";
import { useLanguage } from "@/components/LanguageSwitcher";
import { emitEvent } from "@/utils/eventBus";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddedToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddedToCart }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleViewDetails = () => {
    navigate(`/shop/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering

    if (!isAuthenticated) {
      toast.error(t('loginToAddToCart'));
      navigate('/login', { state: { from: '/shop' } });
      return;
    }

    if (product.stock <= 0) {
      toast.error(t('productOutOfStock'));
      return;
    }

    setIsAdding(true);
    try {
      await apiRequest('/shop/cart/add', {
        method: 'POST',
        body: {
          productId: product.id,
          quantity: 1
        }
      });
      
      toast.success(t('addedToCart'));
      
      // Emit event to update cart
      emitEvent('cart-updated');
      
      // Call the callback if provided
      if (onAddedToCart) {
        onAddedToCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(t('errorAddingToCart'));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg group cursor-pointer h-full flex flex-col border-0 shadow-md bg-white"
      onClick={handleViewDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="px-3 py-1 text-sm">
              {t('outOfStock')}
            </Badge>
          </div>
        )}
        
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleViewDetails}
              className="h-10 px-3 bg-white text-primary hover:bg-white/90 hover:text-primary/90"
            >
              <Eye className="h-4 w-4 mr-1" />
              {t('viewDetails')}
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium mb-1 line-clamp-1 font-playfair">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-semibold text-lg text-primary">${product.price.toFixed(2)}</span>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={isAdding || product.stock <= 0}
            className="bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {isAdding ? t('adding') : t('addToCart')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
