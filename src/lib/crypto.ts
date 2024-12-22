// Uma implementação simples para desenvolvimento
// Em produção, use uma biblioteca de criptografia adequada
export const hash = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const compare = async (text: string, hashedText: string): Promise<boolean> => {
  const hashedInput = await hash(text);
  return hashedInput === hashedText;
};