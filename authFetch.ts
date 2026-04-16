// Wrapper around the native fetch API that automatically attaches the JWT authentication token to outgoing requests.
// This helper ensures that every request made by the frontend includes the stored token without
// requiring developers to manually add it each time.
export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  const headers = {
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(input, { ...init, headers });
}
