import axios from "axios";
import { API_ENDPOINTS, BASE_URL, ITEMS_PER_PAGE } from "./constants";
axios.defaults.baseURL = BASE_URL;

export async function getCategories() {
    const {data} = await axios.get(API_ENDPOINTS.CATEGORIES);
    return data;
}
export async function getProducts(page = 1) {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const {data} = await axios.get(`${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`);
    return data;
}