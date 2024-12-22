import type { Usuario } from '@prisma/client';

interface LoginResponse {
  user: Omit<Usuario, 'senha'>;
  token: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    return response.json();
  },
};