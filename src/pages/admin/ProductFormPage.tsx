
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "@/services/apiService";
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from "@/types/dto";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, ArrowLeft } from "lucide-react";

const ProductFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  
  const [formData, setFormData] = useState<CreateProductDTO | UpdateProductDTO>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    imageUrl: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const product = await apiService.getProductById(parseInt(id));
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        quantity: product.quantity,
        category: product.category || "",
        imageUrl: product.imageUrl || "",
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Impossible de récupérer les données du produit");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle number fields
    if (name === "price" || name === "quantity") {
      const parsedValue = parseFloat(value);
      setFormData({
        ...formData,
        [name]: isNaN(parsedValue) ? 0 : parsedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name) {
      toast.error("Le nom du produit est obligatoire");
      return;
    }
    
    if (formData.price <= 0) {
      toast.error("Le prix doit être supérieur à zéro");
      return;
    }
    
    if (formData.quantity < 0) {
      toast.error("La quantité ne peut pas être négative");
      return;
    }

    try {
      setSubmitting(true);
      
      if (isEditMode && id) {
        await apiService.updateProduct(parseInt(id), formData as UpdateProductDTO);
      } else {
        await apiService.createProduct(formData as CreateProductDTO);
      }
      
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/admin/products")} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la liste
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Modifier le produit" : "Ajouter un produit"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <Label htmlFor="name">Nom du produit *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nom du produit"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description du produit"
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Prix (€) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
          </div>
          
          <div>
            <Label htmlFor="quantity">Quantité en stock *</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="0"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Input
            id="category"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            placeholder="Catégorie du produit"
          />
        </div>
        
        <div>
          <Label htmlFor="imageUrl">URL de l'image</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            placeholder="https://exemple.com/image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Laissez vide pour utiliser une image par défaut
          </p>
        </div>
        
        <div className="pt-4 border-t flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </span>
            ) : (
              <span className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? "Mettre à jour" : "Créer le produit"}
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
