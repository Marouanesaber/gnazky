
import React from "react";
import { ShoppingBag, Check, Package, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "./types";

interface OrderStatisticsProps {
  orders: Order[];
  loading: boolean;
}

export const OrderStatistics: React.FC<OrderStatisticsProps> = ({ orders, loading }) => {
  return (
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
  );
};
