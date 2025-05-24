
import { ProductDTO } from "@/types/dto";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: ProductDTO;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  
  const defaultImageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl || defaultImageUrl} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImageUrl;
          }}
        />
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="mb-2">
          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {product.category || "Sans catégorie"}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-2">
          {product.description || "Aucune description disponible."}
        </p>
        <p className="text-lg font-bold">{product.price.toFixed(2)} €</p>
        <p className="text-sm text-gray-500">
          {product.quantity > 0 ? `${product.quantity} en stock` : "Rupture de stock"}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={() => navigate(`/products/${product.id}`)}
          disabled={product.quantity <= 0}
        >
          {product.quantity > 0 ? "Voir le détail" : "Indisponible"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
