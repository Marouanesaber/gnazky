
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  itemCount: number;
}

export function CartButton({ itemCount }: CartButtonProps) {
  return (
    <Link to="/cart">
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {itemCount}
        </span>
      </Button>
    </Link>
  );
}

export default CartButton;
