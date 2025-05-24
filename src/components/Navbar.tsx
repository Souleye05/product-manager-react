
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, LogIn, ShoppingCart, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              JulesShop
            </Link>
          </div>

          {/* Search - visible on desktop */}
          <div className="flex-grow hidden max-w-md mx-4 md:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <button
                type="submit"
                className="absolute transform -translate-y-1/2 right-2 top-1/2"
              >
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            </form>
          </div>

          {/* Nav links - visible on desktop */}
          <div className="items-center hidden space-x-4 md:flex">
            <Link to="/products" className="hover:text-blue-600">
              Produits
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/account" className="flex items-center hover:text-blue-600">
                  <User className="w-4 h-4 mr-1" />
                  {user?.username}
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="font-medium text-violet-600 hover:text-violet-800"
                  >
                    Administration
                  </Link>
                )}
                <Button onClick={logout} variant="ghost" size="sm">
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <LogIn className="w-4 h-4 mr-1" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button>S'inscrire</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/search" className="p-2">
              <Search className="w-5 h-5" />
            </Link>
            <button onClick={toggleMenu} className="p-2 mobile-menu-container">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-white border-t shadow-lg md:hidden mobile-menu-container">
          <div className="container px-4 py-3 mx-auto">
            <Link to="/products" className="block py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              Produits
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/account" className="flex items-center py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4 mr-1" />
                  Mon compte
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block py-2 font-medium text-violet-600 hover:text-violet-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Administration
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full py-2 text-left hover:text-blue-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="block py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  Connexion
                </Link>
                <Link to="/auth/register" className="block py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
