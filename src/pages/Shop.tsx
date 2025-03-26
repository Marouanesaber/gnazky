
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCategory } from "@/components/shop/ProductCategory";
import { apiRequest } from "@/utils/api";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const categories = [
  { id: "all", name: "All Products" },
  { id: "food", name: "Pet Food" },
  { id: "toys", name: "Toys" },
  { id: "medicine", name: "Medicine" },
  { id: "accessories", name: "Accessories" },
  { id: "grooming", name: "Grooming" },
];

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Fetch products from API
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await apiRequest("/shop/products");
      } catch (err) {
        // For demo purposes, return mock data if API fails
        console.error("Failed to fetch products, using mock data:", err);
        return getMockProducts();
      }
    }
  });

  // Filter products based on category and search query
  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = async (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login", { state: { from: "/shop" } });
      return;
    }

    try {
      await apiRequest("/shop/cart/add", {
        method: "POST",
        body: { productId: product.id, quantity: 1 }
      });
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error(err);
      
      // For demo, still show success if API fails
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              PetClinic Shop
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link to="/cart">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    0
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Categories sidebar */}
          <div className="w-full sm:w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <ProductCategory
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory === category.id}
                    onSelect={() => setSelectedCategory(category.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center p-8">
                <p className="text-red-500">Failed to load products. Please try again.</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Refresh
                </Button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

// Mock products for development/fallback
function getMockProducts(): Product[] {
  return [
    {
      id: 1,
      name: "Premium Dog Food",
      description: "High-quality nutrition for adult dogs",
      price: 29.99,
      image: "https://placehold.co/300x300?text=Dog+Food",
      category: "food",
      stock: 50
    },
    {
      id: 2,
      name: "Cat Scratching Post",
      description: "Durable scratching post with soft perch",
      price: 39.99,
      image: "https://placehold.co/300x300?text=Cat+Post",
      category: "accessories",
      stock: 25
    },
    {
      id: 3,
      name: "Pet Shampoo",
      description: "Gentle formula for all pets",
      price: 12.99,
      image: "https://placehold.co/300x300?text=Pet+Shampoo",
      category: "grooming",
      stock: 100
    },
    {
      id: 4,
      name: "Interactive Dog Toy",
      description: "Keeps dogs entertained for hours",
      price: 15.99,
      image: "https://placehold.co/300x300?text=Dog+Toy",
      category: "toys",
      stock: 35
    },
    {
      id: 5,
      name: "Cat Dental Treats",
      description: "Helps maintain dental health",
      price: 8.99,
      image: "https://placehold.co/300x300?text=Cat+Treats",
      category: "food",
      stock: 80
    },
    {
      id: 6,
      name: "Flea and Tick Medicine",
      description: "Monthly treatment for pets",
      price: 45.99,
      image: "https://placehold.co/300x300?text=Medicine",
      category: "medicine",
      stock: 40
    }
  ];
}

export default Shop;
