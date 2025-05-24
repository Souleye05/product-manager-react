
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue dans notre boutique en ligne
          </h1>
          <p className="text-xl mb-6">
            Découvrez notre sélection de produits de qualité à des prix compétitifs
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => navigate("/products")}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Parcourir les produits
            </Button>
            <Button 
              onClick={() => navigate("/auth/register")}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              S'inscrire
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
              alt="Shopping online" 
              className="rounded-lg w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
