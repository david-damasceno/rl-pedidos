import prisma from '@/lib/prisma';
import { hash, compare } from '@/lib/crypto';

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  const isPasswordValid = await compare(password, user.senha);

  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas');
  }

  const { senha: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const createUser = async (email: string, nome: string, senha: string, role: 'vendor' | 'admin' = 'vendor') => {
  const hashedPassword = await hash(senha);
  
  return prisma.usuario.create({
    data: {
      email,
      nome,
      senha: hashedPassword,
      role,
    },
    select: {
      id: true,
      email: true,
      nome: true,
      role: true,
    },
  });
};