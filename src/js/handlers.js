import { getCategories, getProducts } from "./products-api";
import { renderCategoryList } from "./render-function";

export async function initHomepage () {
    const categories = await getCategories();
    renderCategoryList(categories);
    getProducts();
}