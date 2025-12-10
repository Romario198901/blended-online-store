import axios from 'axios';
import { API_ENDPOINTS, BASE_URL, ITEMS_PER_PAGE } from './constants';
axios.defaults.baseURL = BASE_URL;

export async function getCategories() {
  const { data } = await axios.get(API_ENDPOINTS.CATEGORIES);
  return data;
}
export async function getProducts(page = 1) {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
}
export async function getProductsbyQuery(query, page = 1) {
  if (!query || query.trim() === '') {
    return { products: [], total: 0, skip: 0, limit: ITEMS_PER_PAGE };
  }
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const encodedQuery = encodeURIComponent(query);
  try {
    const { data } = await axios.get(
      `${API_ENDPOINTS.SEARCH}?q=${encodedQuery}&limit=${ITEMS_PER_PAGE}&skip=${skip}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProductsbyCategory(category, page = 1) {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const { data } = await axios.get(
    `${API_ENDPOINTS.CATEGORY}${category}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
}
export async function getProductById(id) {
  const product = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  return product.data;
}
