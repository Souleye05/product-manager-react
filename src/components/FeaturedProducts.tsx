
import { useEffect, useState } from "react";
import { ProductDTO } from "@/types/dto";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { apiService } from "@/services/apiService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllProducts();
        // Get only 4 featured products
        setProducts(data.slice(0, 4));
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="w-full h-48 mb-4" />
            <Skeleton className="w-2/3 h-4 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-1/4 h-4 mb-4" />
            <Skeleton className="w-full h-10" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
