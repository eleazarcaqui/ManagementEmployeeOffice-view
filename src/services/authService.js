import { environment } from '../environments/environment';

const API_URL = `${environment.authUrl}`;

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      let errorMessage = 'Su correo o contraseña está incorrecto';
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return { token: data.token, user: data.user }; 
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


export const register = async (username, email, password, role = 'user', active = true) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
        active
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Error al registrar usuario';
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};


export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (token) {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
    }
    
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const validateToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/validate-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

