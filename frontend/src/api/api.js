const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const headers = (auth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

const req = async (method, path, body, auth = false) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(auth),
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const api = {
  register: (body) => req('POST', '/auth/register', body),
  login: (body) => req('POST', '/auth/login', body),
  getProfile: () => req('GET', '/auth/profile', null, true),
  updateProfile: (body) => req('PUT', '/auth/profile', body, true),

  getAllBlogs: () => req('GET', '/blogs/all'),
  createBlog: (body) => req('POST', '/blogs/create', body, true),
  updateBlog: (id, body) => req('PUT', `/blogs/update/${id}`, body, true),
  deleteBlog: (id) => req('DELETE', `/blogs/delete/${id}`, null, true),
};