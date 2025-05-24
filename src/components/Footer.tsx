
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">JulesShop</h3>
            <p className="mb-4 text-gray-400">
              Votre destination pour des produits de qualité à des prix compétitifs.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-gray-400 hover:text-white">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-gray-400 hover:text-white">
                  S'inscrire
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="not-italic text-gray-400">
              <p>123 Rue de la Paix</p>
              <p>Dakar, Senegal</p>
              <p className="mt-2">Email: contact@juleshop.com</p>
              <p>Téléphone: +221 77 167 02 10</p>
            </address>
          </div>
        </div>
        
        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
          <p>© {new Date().getFullYear()} JulesShop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
