import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Key, Trash2, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  email: string;
  nome: string;
  role: string;
}

const UserManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState<"vendor" | "admin">("vendor");
  const [newUserPassword, setNewUserPassword] = useState("");

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de usuários.",
        variant: "destructive",
      });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserEmail,
        password: newUserPassword,
        email_confirm: true,
        user_metadata: {
          name: newUserName,
          role: newUserRole,
        },
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso!",
      });

      setNewUserEmail("");
      setNewUserName("");
      setNewUserPassword("");
      fetchUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o usuário.",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Email de redefinição de senha enviado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o email de redefinição de senha.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Voltar
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Formulário de Novo Usuário */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Novo Usuário
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Função</Label>
                <select
                  id="role"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as "vendor" | "admin")}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="vendor">Vendedor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                Criar Usuário
              </Button>
            </form>
          </Card>

          {/* Lista de Usuários */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Usuários Cadastrados
            </h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.nome}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      {user.role === "admin" ? "Administrador" : "Vendedor"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResetPassword(user.email)}
                    className="flex items-center gap-2"
                  >
                    <Key className="h-4 w-4" />
                    Resetar Senha
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;