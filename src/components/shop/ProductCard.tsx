
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/pages/Shop";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          {product.stock < 10 && (
            <div className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded">
              Low stock
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="text-primary font-bold">${product.price.toFixed(2)}</div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1 gap-2"
          onClick={onAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </Button>
        <Link to={`/shop/product/${product.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Eye className="h-4 w-4" />
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
