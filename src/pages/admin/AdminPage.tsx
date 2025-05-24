
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Package, Users, Settings } from "lucide-react";

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Panneau d'administration</h1>
          <p className="text-gray-600">
            Gérez vos produits et votre boutique.
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/admin/products/new")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un produit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/products">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="bg-blue-50 pb-4 border-b">
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5 text-blue-600" />
                Gestion des produits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600">
                Ajoutez, modifiez ou supprimez des produits de votre catalogue.
              </p>
              <Button variant="link" className="mt-2 p-0 text-blue-600">
                Gérer les produits
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/users">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="bg-blue-50 pb-4 border-b">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Gestion des utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600">
                Consultez et gérez les comptes utilisateur.
              </p>
              <Button variant="link" className="mt-2 p-0 text-blue-600">
                Gérer les utilisateurs
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="bg-blue-50 pb-4 border-b">
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-blue-600" />
                Paramètres
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600">
                Configurez les paramètres de votre boutique.
              </p>
              <Button variant="link" className="mt-2 p-0 text-blue-600">
                Accéder aux paramètres
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
