
import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Navigation } from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import ProductCategory from "@/components/shop/ProductCategory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/utils/api";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageSwitcher";
import { emitEvent } from "@/utils/eventBus";
import BackToTop from "@/components/home/BackToTop";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface Category {
  name: string;
  products: Product[];
}

// Updated mock products with 30 professional looking items
const getMockProducts = (): Product[] => {
  return [
    // Food Category
    {
      id: 1,
      name: "Premium Dog Food",
      description: "High-quality nutrition for adult dogs with balanced vitamins and minerals",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&auto=format&fit=crop",
      category: "food",
      stock: 50
    },
    {
      id: 2,
      name: "Organic Cat Food",
      description: "All-natural organic food for cats with sensitive digestion",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop",
      category: "food",
      stock: 45
    },
    {
      id: 3,
      name: "Puppy Growth Formula",
      description: "Specially formulated food for growing puppies up to 12 months",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1602584386319-fa8eb4361a25?w=800&auto=format&fit=crop",
      category: "food",
      stock: 60
    },
    {
      id: 4,
      name: "Senior Dog Food",
      description: "Easy to digest nutrition for senior dogs with joint support",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop",
      category: "food",
      stock: 30
    },
    {
      id: 5,
      name: "Fish Food Flakes",
      description: "Premium flakes for tropical fish with color enhancers",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&auto=format&fit=crop",
      category: "food",
      stock: 100
    },
    {
      id: 6,
      name: "Bird Seed Mix",
      description: "Complete nutrition mix for small to medium sized birds",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1603387910771-1ba4e026f5ae?w=800&auto=format&fit=crop",
      category: "food",
      stock: 80
    },
    
    // Toys Category
    {
      id: 7,
      name: "Dog Chew Toy",
      description: "Durable rubber toy for aggressive chewers",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1544116507-4448f4765f95?w=800&auto=format&fit=crop",
      category: "toys",
      stock: 75
    },
    {
      id: 8,
      name: "Cat Scratching Post",
      description: "Sisal-covered post with platform for cats",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1526336179256-1347bdb18b1f?w=800&auto=format&fit=crop",
      category: "toys",
      stock: 30
    },
    {
      id: 9,
      name: "Interactive Ball Launcher",
      description: "Automatic ball launcher for dogs to play fetch",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop",
      category: "toys",
      stock: 15
    },
    {
      id: 10,
      name: "Cat Teaser Wand",
      description: "Interactive feather teaser for cats with bell",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1621046240055-63f9d0864b3e?w=800&auto=format&fit=crop",
      category: "toys",
      stock: 90
    },
    {
      id: 11,
      name: "Treat Puzzle Toy",
      description: "Mental stimulation toy that dispenses treats",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1580740135507-30ec7dba840c?w=800&auto=format&fit=crop",
      category: "toys",
      stock: 40
    },
    {
      id: 12,
      name: "Small Animal Play Tube",
      description: "Colorful tube for hamsters, gerbils and small pets",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1535591534197-1d134a341270?w=800&auto=format&fit=crop",
      category: "toys",
      stock: 50
    },
    
    // Health Category
    {
      id: 13,
      name: "Flea & Tick Treatment",
      description: "Monthly treatment for dogs and cats",
      price: 35.99,
      image: "https://images.unsplash.com/photo-1581935458632-087f7aa280dc?w=800&auto=format&fit=crop",
      category: "health",
      stock: 60
    },
    {
      id: 14,
      name: "Pet Vitamins",
      description: "Daily multivitamin supplement for dogs",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1631643351093-e9909efc4985?w=800&auto=format&fit=crop",
      category: "health",
      stock: 70
    },
    {
      id: 15,
      name: "Joint Support Supplement",
      description: "Glucosamine supplement for aging pets",
      price: 27.99,
      image: "https://images.unsplash.com/photo-1585435557698-3db1f98001b9?w=800&auto=format&fit=crop",
      category: "health",
      stock: 45
    },
    {
      id: 16,
      name: "Pet First Aid Kit",
      description: "Essential first aid supplies for pet emergencies",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&auto=format&fit=crop",
      category: "health",
      stock: 25
    },
    {
      id: 17,
      name: "Dental Chews",
      description: "Dental treats to reduce plaque and tartar",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1568640407821-331c9a255324?w=800&auto=format&fit=crop",
      category: "health",
      stock: 85
    },
    {
      id: 18,
      name: "Calming Aid",
      description: "Natural calming supplement for anxious pets",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1624957436758-08de9f344ad5?w=800&auto=format&fit=crop",
      category: "health",
      stock: 35
    },
    
    // Grooming Category
    {
      id: 19,
      name: "Pet Shampoo",
      description: "Gentle formula for all pets with sensitive skin",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1590493413832-1108333f4c51?w=800&auto=format&fit=crop",
      category: "grooming",
      stock: 100
    },
    {
      id: 20,
      name: "Slicker Brush",
      description: "Professional grade brush for removing tangles",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=800&auto=format&fit=crop",
      category: "grooming",
      stock: 50
    },
    {
      id: 21,
      name: "Nail Clippers",
      description: "Safe and easy-to-use pet nail clippers with safety guard",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1603736029103-dafcf92f7ac3?w=800&auto=format&fit=crop",
      category: "grooming",
      stock: 60
    },
    {
      id: 22,
      name: "Pet Cologne",
      description: "Fresh scented spray for between bath freshness",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=800&auto=format&fit=crop",
      category: "grooming",
      stock: 75
    },
    {
      id: 23,
      name: "Deshedding Tool",
      description: "Reduces shedding up to 90% for medium to long hair pets",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=800&auto=format&fit=crop",
      category: "grooming",
      stock: 40
    },
    {
      id: 24,
      name: "Ear Cleaning Solution",
      description: "Gentle ear cleaner to prevent infections",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1587830315379-d298407b3b15?w=800&auto=format&fit=crop",
      category: "grooming",
      stock: 65
    },
    
    // Housing Category
    {
      id: 25,
      name: "Cat Litter Box",
      description: "Spacious and easy to clean with odor control",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1550019029-a156a1dfa9e6?w=800&auto=format&fit=crop",
      category: "housing",
      stock: 25
    },
    {
      id: 26,
      name: "Dog Bed",
      description: "Memory foam orthopedic bed for large dogs",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1604472762943-732c6ce9b06d?w=800&auto=format&fit=crop",
      category: "housing",
      stock: 20
    },
    {
      id: 27,
      name: "Bird Cage",
      description: "Spacious cage with multiple perches and feeding stations",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1591259943707-86a9276d9fbe?w=800&auto=format&fit=crop",
      category: "housing",
      stock: 15
    },
    {
      id: 28,
      name: "Aquarium Kit",
      description: "10-gallon starter kit with filter and lighting",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1523437345381-db5ee4df9c72?w=800&auto=format&fit=crop",
      category: "housing",
      stock: 10
    },
    {
      id: 29,
      name: "Small Animal Cage",
      description: "Multilevel habitat for hamsters, gerbils and mice",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=800&auto=format&fit=crop",
      category: "housing",
      stock: 18
    },
    {
      id: 30,
      name: "Pet Carrier",
      description: "Airline approved carrier for small to medium pets",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1624713864713-67a92fe28fcd?w=800&auto=format&fit=crop",
      category: "housing",
      stock: 30
    }
  ];
};

const Shop = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const data = await apiRequest('/shop/products');
        return data;
      } catch (err) {
        console.error("Failed to fetch products, using mock data:", err);
        return getMockProducts();
      }
    }
  });

  const getCategories = (): string[] => {
    if (!products) return [];
    
    const categories = new Set<string>();
    products.forEach((product: Product) => {
      if (product.category) categories.add(product.category);
    });
    
    return Array.from(categories);
  };

  const getFilteredProducts = () => {
    if (!products) return [];
    
    return products.filter((product: Product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = searchTerm === "" || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  };

  const getCategorizedProducts = () => {
    const filteredProducts = getFilteredProducts();
    const categorized: Record<string, Product[]> = {};
    
    filteredProducts.forEach((product: Product) => {
      const category = product.category || 'uncategorized';
      
      if (!categorized[category]) {
        categorized[category] = [];
      }
      
      categorized[category].push(product);
    });
    
    return Object.entries(categorized).map(([name, products]) => ({
      name,
      products
    }));
  };

  const handleAddedToCart = () => {
    emitEvent('cart-updated');
  };

  useEffect(() => {
    const handleCartUpdated = () => {
      // Handle cart updates
    };
    
    window.addEventListener('cart-updated', handleCartUpdated);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdated);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-montserrat">
      <Navigation />
      
      <div className="flex-1 animate-fade-in">
        <div className="bg-primary/5 py-12">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-3 font-playfair text-primary">{t('petShop')}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">{t('shopDescription') || "Find everything your pet needs with our wide selection of quality products."}</p>
            </div>
          </Container>
        </div>
        
        <Container className="py-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder={t('searchProducts') || "Search products..."}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs 
              value={activeCategory} 
              onValueChange={setActiveCategory}
              className="w-full md:w-auto"
            >
              <TabsList className="w-full md:w-auto overflow-auto flex-wrap">
                <TabsTrigger value="all">
                  {t('all') || "All"}
                </TabsTrigger>
                {getCategories().map(category => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {t(category) || category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4 h-72">
                  <div className="bg-gray-200 w-full h-40 rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-5 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('somethingWentWrong')}</h2>
              <p className="text-gray-600 mb-6">{t('couldNotLoadProducts')}</p>
              {toast.error(t('errorLoadingProducts'))}
            </div>
          ) : (
            <div className="space-y-16">
              {getCategorizedProducts().map((category) => (
                <ProductCategory
                  key={category.name}
                  name={category.name}
                  products={category.products}
                  onAddedToCart={handleAddedToCart}
                />
              ))}
              
              {getCategorizedProducts().length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('noProductsFound')}</h2>
                  <p className="text-gray-600">{t('tryAnotherSearch')}</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Shop;
