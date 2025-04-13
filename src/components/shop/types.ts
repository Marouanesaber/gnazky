
export interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sales: number;
  image: string;
  stock: number;
}

// Sample data for purchase history
export const samplePurchaseHistory: Order[] = [
  {
    id: "ORD-123456",
    date: "2023-04-10",
    items: [
      { name: "Premium Dog Food", quantity: 2, price: 29.99 },
      { name: "Dog Chew Toy", quantity: 1, price: 8.99 }
    ],
    status: "delivered" as const,
    total: 68.97
  },
  {
    id: "ORD-123457",
    date: "2023-03-25",
    items: [
      { name: "Cat Scratching Post", quantity: 1, price: 24.99 },
      { name: "Gourmet Cat Food", quantity: 3, price: 24.99 }
    ],
    status: "delivered" as const,
    total: 99.96
  },
  {
    id: "ORD-123458",
    date: "2023-04-05",
    items: [
      { name: "Pet Shampoo", quantity: 1, price: 12.99 },
      { name: "Nail Clippers", quantity: 1, price: 9.99 }
    ],
    status: "processing" as const,
    total: 22.98
  }
];

// Sample data for popular products
export const samplePopularProducts: Product[] = [
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
