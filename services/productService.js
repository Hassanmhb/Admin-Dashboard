const API_URL = 'http://localhost:8000/api/products';

// 1. Fetch All Products
export const fetchProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

// 2. Create Product with Image Upload
export const createProduct = async (formData, token) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`, // Pass JWT Token
    },
    body: formData, // Pass FormData directly (Browser auto-sets boundary)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Product creation failed');
  return data;
};

// 3. Update Product (Naya Function)
export const updateProduct = async (id, formData, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Product update failed');
  return data;
};

// 4. Delete Product
export const deleteProduct = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete product');
  return data;
};