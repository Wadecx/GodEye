export interface JWTPayload {
  id: number;
  email: string;
  name?: string;
  iat: number;
  exp: number;
}

export function getToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function getUser(): JWTPayload | null {
  const token = getToken();
  if (!token) return null;
  return decodeJWT(token);
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload) return true;
  return Date.now() >= payload.exp * 1000;
}

export function logout() {
  document.cookie = 'token=; path=/; max-age=0';
  window.location.href = '/login';
}
