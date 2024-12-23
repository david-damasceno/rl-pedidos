import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"vendor" | "admin">("vendor");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, selectedRole);
      navigate(selectedRole === "admin" ? "/admin" : "/vendor");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Credenciais inválidas. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Redefinição de senha",
      description: "Por favor, entre em contato com o administrador do sistema para redefinir sua senha.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite suas credenciais para acessar o sistema
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant={selectedRole === "vendor" ? "default" : "outline"}
            onClick={() => setSelectedRole("vendor")}
            className="flex-1"
          >
            Vendedor
          </Button>
          <Button
            variant={selectedRole === "admin" ? "default" : "outline"}
            onClick={() => setSelectedRole("admin")}
            className="flex-1"
          >
            Administrativo
          </Button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Digite sua senha"
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Esqueceu sua senha?
            </button>
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;