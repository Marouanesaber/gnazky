
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/utils/api";
import { DashboardHeader } from "@/components/shop/DashboardHeader";
import { OrderStatistics } from "@/components/shop/OrderStatistics";
import { PurchaseHistoryTab } from "@/components/shop/PurchaseHistoryTab";
import { PopularProductsTab } from "@/components/shop/PopularProductsTab";
import { Order, Product, samplePurchaseHistory, samplePopularProducts } from "@/components/shop/types";

const DashboardShop = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        // Try to fetch real data
        const ordersData = await apiRequest('/shop/orders', { useCredentials: true })
          .catch(() => null);
        
        const productsData = await apiRequest('/shop/products', { useCredentials: true })
          .catch(() => null);
        
        // Update with real data or fall back to sample data
        setOrders(ordersData || samplePurchaseHistory);
        setPopularProducts(productsData?.slice(0, 8) || samplePopularProducts);
      } catch (error) {
        console.error('Error fetching shop data:', error);
        // Fallback to demo data
        setOrders(samplePurchaseHistory);
        setPopularProducts(samplePopularProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShopData();
  }, []);

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Dashboard Header */}
      <DashboardHeader 
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />

      {/* Order Statistics */}
      <OrderStatistics orders={orders} loading={loading} />

      {/* Shop Management Content */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="orders">Purchase History</TabsTrigger>
          <TabsTrigger value="products">Popular Products</TabsTrigger>
        </TabsList>
        
        {/* Purchase History Tab */}
        <TabsContent value="orders">
          <PurchaseHistoryTab 
            orders={orders}
            filteredOrders={filteredOrders}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
          />
        </TabsContent>
        
        {/* Popular Products Tab */}
        <TabsContent value="products">
          <PopularProductsTab 
            products={popularProducts}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardShop;
