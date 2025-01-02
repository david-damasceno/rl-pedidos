import { supabase } from '@/lib/supabase'

export const createInitialUser = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('create-user', {
      body: {
        email: 'daviddamasceno@rlrepresentacoes.com.br',
        password: 'Inter@120499',
        role: 'vendor',
        name: 'David Damasceno'
      }
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}