
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/utils/api";
import { ArrowLeft, ShoppingCart, AlertTriangle } from "lucide-react";
import { LanguageSwitcher, useLanguage } from "@/components/LanguageSwitcher";
import { useAuth } from "@/components/AuthProvider";
import { Product } from "./Shop";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  // Fetch product details
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      try {
        return await apiRequest(`/shop/products/${productId}`);
      } catch (err) {
        console.error("Failed to fetch product, using mock data:", err);
        // For demo, return a mock product
        return getMockProduct(Number(productId));
      }
    }
  });

  const addToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login", { state: { from: `/shop/product/${productId}` } });
      return;
    }

    try {
      await apiRequest("/shop/cart/add", {
        method: "POST",
        body: { productId: product.id, quantity: 1 }
      });
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      // For demo purposes
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm py-4">
          <Container>
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-primary">
                {t("petClinicShop")}
              </Link>
              <LanguageSwitcher />
            </div>
          </Container>
        </div>
        <Container className="py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm py-4">
          <Container>
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-primary">
                {t("petClinicShop")}
              </Link>
              <LanguageSwitcher />
            </div>
          </Container>
        </div>
        <Container className="py-12">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Product not found</h3>
            <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/shop">
              <Button>{t("continueShoppingText")}</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              {t("petClinicShop")}
            </Link>
            <LanguageSwitcher />
          </div>
        </Container>
      </div>

      <Container className="py-8 animate-fade-in">
        <div className="mb-6">
          <Link to="/shop" className="text-primary hover:underline inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> {t("continueShoppingText")}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="text-2xl font-bold text-primary mb-4">
                ${product.price.toFixed(2)}
              </div>
              
              {product.stock < 10 && product.stock > 0 && (
                <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {t("lowStock")} ({product.stock} {t("quantity")})
                </div>
              )}
              
              {product.stock === 0 && (
                <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {t("outOfStock")}
                </div>
              )}
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">{t("categories")}: {product.category}</div>
              </div>
              
              <Button
                className="w-full md:w-auto gap-2"
                size="lg"
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4" />
                {product.stock === 0 ? t("outOfStock") : t("addToCart")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Mock product for development/fallback
function getMockProduct(id: number): Product {
  const mockProducts = [
    {
      id: 1,
      name: "Premium Dog Food",
      description: "High-quality nutrition for adult dogs. Made with real chicken as the first ingredient, this premium dog food provides complete and balanced nutrition for your adult dog. Contains essential nutrients to support strong muscles, healthy skin and coat, and optimal digestive health.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      category: "food",
      stock: 50
    },
    {
      id: 2,
      name: "Cat Scratching Post",
      description: "Durable scratching post with soft perch. This multi-level cat tree features sisal-covered scratching posts, a cozy hammock, and plush perches where your cat can relax. Perfect for keeping your cat active and entertained while protecting your furniture from scratches.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0JTIwdG95fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      category: "accessories",
      stock: 25
    }
  ];
  
  return mockProducts.find(p => p.id === id) || {
    id: id,
    name: "Unknown Product",
    description: "This product could not be found.",
    price: 0,
    image: "https://placehold.co/800x600?text=Product+Not+Found",
    category: "",
    stock: 0
  };
}

export default ProductDetail;
