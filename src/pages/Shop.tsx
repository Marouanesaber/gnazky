
import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Navigation } from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/utils/api";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageSwitcher";
import { emitEvent } from "@/utils/eventBus";
import { ProductsGrid } from "@/components/shop/ProductsGrid";
import { ProductCategory } from "@/components/shop/ProductCategory";
import BackToTop from "@/components/home/BackToTop";

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

const getMockProducts = (): Product[] => {
  return [
    // Food category
    {
      id: 1,
      name: "Premium Dog Food",
      description: "High-quality nutrition for adult dogs",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "food",
      stock: 50
    },
    {
      id: 2,
      name: "Gourmet Cat Food",
      description: "Premium wet food for adult cats",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "food",
      stock: 35
    },
    {
      id: 3,
      name: "Puppy Formula",
      description: "Specially formulated for growing puppies",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1611071358506-84dac75c7d2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "food",
      stock: 28
    },
    {
      id: 4,
      name: "Senior Dog Food",
      description: "Gentle formula for aging dogs",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "food",
      stock: 42
    },
    {
      id: 5,
      name: "Fish Food",
      description: "Complete nutrition for aquarium fish",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1520443240718-fce21901db79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "food",
      stock: 60
    },
    {
      id: 6,
      name: "Bird Seed Mix",
      description: "Balanced seed mix for pet birds",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1522856339183-c84e5301e342?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "food",
      stock: 75
    },
    
    // Toys category
    {
      id: 7,
      name: "Dog Chew Toy",
      description: "Durable rubber toy for dogs",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "toys",
      stock: 75
    },
    {
      id: 8,
      name: "Cat Scratching Post",
      description: "Sisal-covered post for cats",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "toys",
      stock: 30
    },
    {
      id: 9,
      name: "Interactive Feather Toy",
      description: "Feather wand to entertain your cat",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "toys",
      stock: 45
    },
    {
      id: 10,
      name: "Dog Fetch Ball",
      description: "Bouncy ball for fetch games",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1575859431774-2e57ed632664?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "toys",
      stock: 100
    },
    {
      id: 11,
      name: "Bird Swing",
      description: "Colorful swing for pet birds",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1566864222010-d45675442c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "toys",
      stock: 38
    },
    {
      id: 12,
      name: "Small Animal Tunnel",
      description: "Fun tunnel for hamsters and gerbils",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "toys",
      stock: 52
    },
    
    // Grooming category
    {
      id: 13,
      name: "Pet Shampoo",
      description: "Gentle formula for all pets",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1532202193792-e95ef22f1bcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "grooming",
      stock: 100
    },
    {
      id: 14,
      name: "Dog Brush",
      description: "Removes loose fur and detangles",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "grooming",
      stock: 85
    },
    {
      id: 15,
      name: "Nail Clippers",
      description: "Safe clippers for pet nails",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "grooming",
      stock: 65
    },
    {
      id: 16,
      name: "Cat Deshedding Tool",
      description: "Reduces shedding significantly",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1550414487-7a5313396b0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "grooming",
      stock: 43
    },
    {
      id: 17,
      name: "Pet Toothbrush Set",
      description: "Complete dental care for pets",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1559741033-d85618ce7e8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "grooming",
      stock: 37
    },
    {
      id: 18,
      name: "Pet Cologne",
      description: "Fresh scent for after bath",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "grooming",
      stock: 28
    },
    
    // Health category
    {
      id: 19,
      name: "Flea & Tick Treatment",
      description: "Monthly treatment for pets",
      price: 35.99,
      image: "https://images.unsplash.com/photo-1595952618311-b68b72c9575f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "health",
      stock: 60
    },
    {
      id: 20,
      name: "Pet Vitamins",
      description: "Daily vitamins for optimal health",
      price: 21.99,
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "health",
      stock: 85
    },
    {
      id: 21,
      name: "Joint Supplement",
      description: "Supports hip and joint health",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "health",
      stock: 70
    },
    {
      id: 22,
      name: "Pet First Aid Kit",
      description: "Emergency supplies for pets",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "health",
      stock: 45
    },
    {
      id: 23,
      name: "Calming Aid",
      description: "Reduces anxiety in pets",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "health",
      stock: 55
    },
    {
      id: 24,
      name: "Dental Care Treats",
      description: "Treats that clean teeth",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "health",
      stock: 90
    },
    
    // Accessories category
    {
      id: 25,
      name: "Cat Litter Box",
      description: "Spacious and easy to clean",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      stock: 25
    },
    {
      id: 26,
      name: "Dog Collar",
      description: "Adjustable nylon collar",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1583337426008-2fef51aa488e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      stock: 110
    },
    {
      id: 27,
      name: "Pet Carrier",
      description: "Comfortable travel carrier",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1604848698030-c434ba08ece1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      stock: 30
    },
    {
      id: 28,
      name: "Water Fountain",
      description: "Filtered water fountain for pets",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1548247654-ca0f9203cbc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      stock: 40
    },
    {
      id: 29,
      name: "Dog Leash",
      description: "Strong leash with comfortable grip",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1601758066681-243acf0d0881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      stock: 85
    },
    {
      id: 30,
      name: "Pet ID Tag",
      description: "Customizable identification tag",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1559045831-e61d9b3c141f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      stock: 120
    }
  ];
};

const Shop = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
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

  const categories = React.useMemo(() => {
    if (!products) return [];
    
    const categoryMap: Record<string, Category> = {};
    
    products.forEach((product: Product) => {
      const category = product.category?.toLowerCase() || 'uncategorized';
      
      if (!categoryMap[category]) {
        categoryMap[category] = {
          name: product.category || 'Uncategorized',
          products: []
        };
      }
      
      categoryMap[category].products.push(product);
    });
    
    return Object.values(categoryMap);
  }, [products]);

  const handleAddedToCart = () => {
    emitEvent('cart-updated');
  };

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].name.toLowerCase());
    }
  }, [categories, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 animate-fade-in">
        <div className="bg-gradient-to-b from-primary/5 to-white py-8">
          <Container>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-primary font-serif">{t('petShop') || "Pet Shop"}</h1>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">{t('home') || "Home"}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/shop">{t('shop') || "Shop"}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </Container>
        </div>
        
        <Container className="py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {Array(8).fill(0).map((_, i) => (
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
            <div>
              <Tabs defaultValue={activeCategory || categories[0]?.name?.toLowerCase()} onValueChange={(value) => setActiveCategory(value)}>
                <div className="border-b mb-6">
                  <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
                    <TabsTrigger value="all" className="px-4 py-2">
                      {t('all') || "All Products"}
                    </TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger key={category.name} value={category.name.toLowerCase()} className="px-4 py-2">
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="space-y-12">
                  {categories.map((category) => (
                    <ProductCategory 
                      key={category.name}
                      name={category.name}
                      products={category.products}
                      onAddedToCart={handleAddedToCart}
                    />
                  ))}
                </TabsContent>
                
                {categories.map((category) => (
                  <TabsContent key={category.name} value={category.name.toLowerCase()}>
                    <ProductsGrid>
                      {category.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddedToCart={handleAddedToCart}
                        />
                      ))}
                    </ProductsGrid>
                  </TabsContent>
                ))}
              </Tabs>
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
