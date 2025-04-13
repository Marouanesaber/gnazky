
import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  ShoppingBag, 
  Package, 
  Clock, 
  Check, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronsUpDown 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/utils/api";
import { toast } from "sonner";

// Sample data for purchase history
const samplePurchaseHistory = [
  {
    id: "ORD-123456",
    date: "2023-04-10",
    items: [
      { name: "Premium Dog Food", quantity: 2, price: 29.99 },
      { name: "Dog Chew Toy", quantity: 1, price: 8.99 }
    ],
    status: "delivered",
    total: 68.97
  },
  {
    id: "ORD-123457",
    date: "2023-03-25",
    items: [
      { name: "Cat Scratching Post", quantity: 1, price: 24.99 },
      { name: "Gourmet Cat Food", quantity: 3, price: 24.99 }
    ],
    status: "delivered",
    total: 99.96
  },
  {
    id: "ORD-123458",
    date: "2023-04-05",
    items: [
      { name: "Pet Shampoo", quantity: 1, price: 12.99 },
      { name: "Nail Clippers", quantity: 1, price: 9.99 }
    ],
    status: "processing",
    total: 22.98
  }
];

// Sample data for popular products
const samplePopularProducts = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Food",
    price: 29.99,
    sales: 128,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 42
  },
  {
    id: 2,
    name: "Cat Scratching Post",
    category: "Toys",
    price: 24.99,
    sales: 96,
    image: "https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 18
  },
  {
    id: 3,
    name: "Pet Shampoo",
    category: "Grooming",
    price: 12.99,
    sales: 85,
    image: "https://images.unsplash.com/photo-1532202193792-e95ef22f1bcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 54
  },
  {
    id: 4,
    name: "Flea & Tick Treatment",
    category: "Health",
    price: 35.99,
    sales: 76,
    image: "https://images.unsplash.com/photo-1595952618311-b68b72c9575f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 32
  }
];

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sales: number;
  image: string;
  stock: number;
}

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

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
      processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
      shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
    };
    
    return (
      <Badge variant="outline" className={`${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shop Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your orders and view product performance.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="h-8 w-[160px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Yesterday">Yesterday</SelectItem>
              <SelectItem value="Last 7 days">Last 7 days</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Last Month">Last Month</SelectItem>
              <SelectItem value="This Year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <Filter className="h-3.5 w-3.5" />
            Filter
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/30">
                  <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {loading ? "..." : orders.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Orders</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/30">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {loading ? "..." : orders.filter(o => o.status === "delivered").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30">
                  <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {loading ? "..." : orders.filter(o => o.status === "shipped" || o.status === "processing").length}
                  </div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/30">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {loading ? "..." : orders.filter(o => o.status === "pending").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shop Management Content */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="orders">Purchase History</TabsTrigger>
          <TabsTrigger value="products">Popular Products</TabsTrigger>
        </TabsList>
        
        {/* Purchase History Tab */}
        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Purchase History</h2>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>
                          <div className="max-w-[280px]">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-sm">
                                {item.quantity} × {item.name}
                                {idx < order.items.length - 1 && ", "}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right font-medium">GHS {order.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No orders found.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {orders.length} orders
              </div>
              <Button variant="outline" size="sm">View All Orders</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Popular Products Tab */}
        <TabsContent value="products" className="space-y-4">
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
              popularProducts.map((product) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardShop;
