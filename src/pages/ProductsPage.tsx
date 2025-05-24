
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductDTO } from "@/types/dto";
import { apiService } from "@/services/apiService";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  // Fetch products based on search params
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data: ProductDTO[];

        const searchQuery = searchParams.get("search");
        const category = searchParams.get("category");

        if (searchQuery) {
          data = await apiService.searchProducts(searchQuery);
        } else if (category) {
          data = await apiService.getProductsByCategory(category);
        } else {
          data = await apiService.getAllProducts();
        }

        setProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);

        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (category) params.set("category", category);
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos Produits</h1>

      {/* Search and filter section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow relative">
            <Input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button type="submit">Rechercher</Button>
        </form>

        {/* Categories */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filtrer par catégorie:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedCategory ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect(null)}
            >
              Toutes
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "outline"}
                size="sm"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Active filters */}
        {(searchQuery || selectedCategory) && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Filtres actifs:</span>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Recherche: {searchQuery}
                </span>
              )}
              {selectedCategory && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Catégorie: {selectedCategory}
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 hover:text-red-800 underline"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="w-full h-48 mb-4" />
              <Skeleton className="w-2/3 h-4 mb-2" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-1/4 h-4 mb-4" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => setSearchParams({})}>Réessayer</Button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">Aucun produit trouvé</p>
          {(searchQuery || selectedCategory) && (
            <Button onClick={resetFilters}>Voir tous les produits</Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
