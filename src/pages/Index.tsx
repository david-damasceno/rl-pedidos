import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Sistema de Gestão de Pedidos
          </h1>
          <div className="space-y-4">
            <Link to="/login" className="block">
              <Button className="w-full py-6 text-lg">
                Acessar Sistema
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;