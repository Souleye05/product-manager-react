
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, Shield } from "lucide-react";

const AccountPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="text-center">
          <p className="text-xl">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="shadow-md">
        <CardHeader className="bg-blue-50 border-b">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <User size={24} />
            </div>
            <div>
              <CardTitle className="text-2xl">Mon profil</CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Nom d'utilisateur</h3>
              <p className="text-lg">{user.username}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Email</h3>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Rôle</h3>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-violet-600" />
                <span className={`${user.role === 'admin' ? 'text-violet-600 font-medium' : ''}`}>
                  {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Membre depuis</h3>
              <p className="text-lg">{formatDate(user.createdAt)}</p>
            </div>
          </div>
          
          {user.role === 'admin' && (
            <div className="mt-6 p-4 bg-violet-50 rounded-lg border border-violet-200">
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-3 text-violet-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-violet-800">Accès administrateur</h3>
                  <p className="text-violet-600">
                    Vous avez des droits d'administrateur. Vous pouvez gérer les produits et accéder au panneau d'administration.
                  </p>
                  <Button 
                    className="mt-3 bg-violet-600 hover:bg-violet-700" 
                    onClick={() => navigate("/admin")}
                  >
                    Accéder à l'administration
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button variant="outline" onClick={handleLogout} className="flex items-center">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountPage;
