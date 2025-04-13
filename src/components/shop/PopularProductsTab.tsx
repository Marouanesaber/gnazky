
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "./types";

interface PopularProductsTabProps {
  products: Product[];
  loading: boolean;
}

export const PopularProductsTab: React.FC<PopularProductsTabProps> = ({ products, loading }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Popular Products</h2>
        <Button variant="outline" size="sm">Manage Inventory</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-slate-100">
                    {product.category}
                  </Badge>
                  <span className="text-sm font-medium">GHS {product.price.toFixed(2)}</span>
                </div>
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <span>{product.sales} sales</span>
                  <span>{product.stock} in stock</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline">View All Products</Button>
      </div>
    </div>
  );
};
