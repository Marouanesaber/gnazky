
import React from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingAnimation } from "@/components/dashboard/LoadingAnimation";
import { Order } from "./types";

interface PurchaseHistoryTabProps {
  orders: Order[];
  filteredOrders: Order[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading: boolean;
}

export const PurchaseHistoryTab: React.FC<PurchaseHistoryTabProps> = ({
  orders,
  filteredOrders,
  searchQuery,
  setSearchQuery,
  loading
}) => {
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function for status badges
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

  return (
    <div className="space-y-4">
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
            <LoadingAnimation message="Loading orders..." />
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
    </div>
  );
};
