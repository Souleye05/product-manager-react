
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "@/services/apiService";
import { ProductDTO } from "@/types/dto";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await apiService.getProductById(parseInt(id));
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Impossible de charger les détails du produit.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!product || !window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
    
    try {
      await apiService.deleteProduct(product.id);
      navigate("/products");
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/2 aspect-square rounded-lg" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <div className="py-12 bg-gray-50 rounded-lg">
          <p className="text-red-500 text-xl mb-4">{error || "Produit non trouvé"}</p>
          <Button onClick={() => navigate("/products")}>
            Voir tous les produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product image */}
        <div className="w-full md:w-1/2 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"}
            alt={product.name}
            className="w-full h-full object-contain aspect-square"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
            }}
          />
        </div>
        
        {/* Product details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {product.category && (
            <div className="mb-4">
              <span className="text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {product.category}
              </span>
            </div>
          )}
          
          <p className="text-2xl font-bold text-blue-600 mb-4">
            {product.price.toFixed(2)} €
          </p>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              {product.description || "Aucune description disponible pour ce produit."}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Disponibilité</h2>
            {product.quantity > 0 ? (
              <p className="text-green-600">
                En stock - {product.quantity} unité{product.quantity > 1 ? "s" : ""} disponible{product.quantity > 1 ? "s" : ""}
              </p>
            ) : (
              <p className="text-red-600">Rupture de stock</p>
            )}
          </div>
          
          {/* Admin actions */}
          {isAdmin && (
            <div className="flex gap-4 mt-8 border-t pt-4">
              <Button 
                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                variant="outline"
              >
                Modifier
              </Button>
              <Button 
                onClick={handleDelete}
                variant="destructive"
              >
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
