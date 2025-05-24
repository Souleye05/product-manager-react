
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <div className="bg-white p-4 border-b">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Rechercher des produits</h1>
          
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Que recherchez-vous ?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  autoFocus
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <Button type="submit" disabled={!searchQuery.trim()}>
                Rechercher
              </Button>
            </div>
          </form>

          <div className="mt-12">
            <h2 className="font-medium text-gray-700 mb-4">Recherches populaires</h2>
            <div className="flex flex-wrap gap-2">
              {["Électronique", "Vêtements", "Livres", "Maison", "Sport"].map((term) => (
                <button
                  key={term}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                  onClick={() => {
                    setSearchQuery(term);
                    navigate(`/products?search=${encodeURIComponent(term)}`);
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
