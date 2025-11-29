import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { ITEMS_PER_PAGE } from './constants';
import { getCategories, getProducts } from './products-api';
import {
    hideLoadMoreButton,
  renderCategoryList,
  renderProducts,
  showLoadMoreButton,
} from './render-function';
 let currentPage = 1;
 let totalPages;
export async function initHomepage() {
  const categories = await getCategories();
  renderCategoryList(categories);
  const { products } = await getProducts();
  renderProducts(products);
  showLoadMoreButton();
}
export async function loadMoreBtnClicked() {
  currentPage += 1;
  const { products, total } = await getProducts(currentPage);
  console.log({products, total});
  totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  if (currentPage <= totalPages) {
    renderProducts(products);
  }
  else {
iziToast.warning({
     title: '❌',
          titleColor: '#fafafb',
          message: `You reached end of the catalogue`,
          messageColor: '#fafafb',
          backgroundColor: '#ef4040',
          position: 'bottomRight',
})
  hideLoadMoreButton();
return;
  }
}

