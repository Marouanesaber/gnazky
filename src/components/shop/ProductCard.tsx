
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ExternalLink, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { apiRequest } from "@/utils/api";
import { useLanguage } from "@/components/LanguageSwitcher";
import { emitEvent } from "@/utils/eventBus";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col group bg-white border-gray-200"
      >
        <div 
          className="relative aspect-square overflow-hidden bg-gray-100"
          onClick={handleViewDetails}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
          />
          
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium px-3 py-1 bg-red-500 rounded-full text-sm">
                {t('outOfStock')}
              </span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="sm"
              variant="secondary"
              className="text-primary"
              onClick={handleViewDetails}
            >
              <Eye className="h-4 w-4 mr-2" />
              {t('viewDetails')}
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="font-medium mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-end justify-between mt-auto pt-2">
            <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
            <Button 
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding || product.stock <= 0}
              className="h-9 px-3"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isAdding ? t('adding') : t('addToCart')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
