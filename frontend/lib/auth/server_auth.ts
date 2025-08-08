'use server';

import { cookies } from 'next/headers';
import { LoginForm } from '@/app/schemas/login_schema';
import api from '../login/login_api';

export async function loginAction(data: LoginForm) {
  try {
    const response = await api.post('/login', {
      email: data.email,
      password: data.password,
    });

    const { token } = response.data;

    (await cookies()).set('auth_token', token, {
      path: '/',
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        'Erro ao fazer login. Tente novamente.',
    };
  }
}

export async function removeAuthCookie() {
  try {
    (await cookies()).delete('auth_token');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao remover cookie de autenticação' };
  }
}
