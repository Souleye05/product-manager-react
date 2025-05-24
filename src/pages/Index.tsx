
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Découvrez nos produits</h2>
        <FeaturedProducts />
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => navigate("/products")}
            className="bg-primary hover:bg-primary/90"
          >
            Voir tous les produits
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
